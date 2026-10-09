import { spawn, type ChildProcessWithoutNullStreams } from 'node:child_process'
import { createInterface } from 'node:readline'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const PACKAGE_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..')
export const DEFAULT_SIDECAR_SCRIPT = path.join(PACKAGE_ROOT, 'sidecar', 'main.py')

export interface SpeechBandResult {
  score: number
  band: string
  fail: boolean
}

export interface SidecarClientOptions {
  pythonPath?: string
  scriptPath?: string
  /** When true, do not spawn; every call soft-fails. */
  forceDown?: boolean
  requestTimeoutMs?: number
}

type Pending = {
  resolve: (value: SpeechBandResult) => void
  reject: (err: Error) => void
  timer: NodeJS.Timeout
}

/**
 * JSON-lines over stdio to the local Python speech sidecar.
 * Soft-fails with fail=true when the process is down or a request times out.
 * Never opens learner SQLite.
 */
export class SidecarClient {
  private readonly pythonPath: string
  private readonly scriptPath: string
  private readonly forceDown: boolean
  private readonly requestTimeoutMs: number
  private child: ChildProcessWithoutNullStreams | null = null
  private readonly pending = new Map<string, Pending>()
  private nextId = 1
  private starting: Promise<void> | null = null

  constructor(options: SidecarClientOptions = {}) {
    this.pythonPath = options.pythonPath ?? process.env.ENGLISH_PATH_PYTHON ?? 'python3'
    this.scriptPath = options.scriptPath ?? DEFAULT_SIDECAR_SCRIPT
    this.forceDown = options.forceDown ?? false
    this.requestTimeoutMs = options.requestTimeoutMs ?? 5_000
  }

  async ensureStarted(): Promise<boolean> {
    if (this.forceDown) return false
    if (this.child && !this.child.killed) return true
    if (this.starting) {
      try {
        await this.starting
        return !!(this.child && !this.child.killed)
      } catch {
        return false
      }
    }

    this.starting = this.spawnChild()
    try {
      await this.starting
      return true
    } catch {
      return false
    } finally {
      this.starting = null
    }
  }

  async request(
    method: 'speech_in' | 'speech_out',
    params: Record<string, unknown> = {},
  ): Promise<SpeechBandResult> {
    const up = await this.ensureStarted()
    if (!up || !this.child?.stdin.writable) {
      return softFail()
    }

    const id = `req-${this.nextId++}`
    const line = JSON.stringify({ id, method, params }) + '\n'

    return new Promise<SpeechBandResult>((resolve) => {
      const timer = setTimeout(() => {
        this.pending.delete(id)
        resolve(softFail())
      }, this.requestTimeoutMs)

      this.pending.set(id, {
        resolve,
        reject: () => undefined,
        timer,
      })

      try {
        this.child!.stdin.write(line)
      } catch {
        clearTimeout(timer)
        this.pending.delete(id)
        resolve(softFail())
      }
    })
  }

  async dispose(): Promise<void> {
    for (const [, pending] of this.pending) {
      clearTimeout(pending.timer)
      pending.resolve(softFail())
    }
    this.pending.clear()

    if (!this.child) return
    const child = this.child
    this.child = null
    child.stdin.end()
    child.kill('SIGTERM')
  }

  private async spawnChild(): Promise<void> {
    return new Promise((resolve, reject) => {
      let settled = false
      const child = spawn(this.pythonPath, [this.scriptPath], {
        stdio: ['pipe', 'pipe', 'pipe'],
        env: { ...process.env, PYTHONUNBUFFERED: '1' },
      })

      const fail = (err: Error) => {
        if (settled) return
        settled = true
        this.child = null
        reject(err)
      }

      child.once('error', (err) => fail(err))
      child.once('spawn', () => {
        if (settled) return
        settled = true
        this.child = child
        const rl = createInterface({ input: child.stdout })
        rl.on('line', (raw) => this.onLine(raw))
        resolve()
      })
      child.once('exit', (code) => {
        this.child = null
        for (const [, pending] of this.pending) {
          clearTimeout(pending.timer)
          pending.resolve(softFail())
        }
        this.pending.clear()
        if (!settled) {
          fail(new Error(`sidecar exited early with code ${code}`))
        }
      })
    })
  }

  private onLine(raw: string): void {
    let message: {
      id?: string
      score?: number
      band?: string
      fail?: boolean
    }
    try {
      message = JSON.parse(raw) as typeof message
    } catch {
      return
    }
    if (!message.id) return
    const pending = this.pending.get(message.id)
    if (!pending) return
    clearTimeout(pending.timer)
    this.pending.delete(message.id)
    pending.resolve({
      score: typeof message.score === 'number' ? message.score : 0,
      band: typeof message.band === 'string' ? message.band : 'unknown',
      fail: Boolean(message.fail),
    })
  }
}

function softFail(): SpeechBandResult {
  return { score: 0, band: 'fail', fail: true }
}
