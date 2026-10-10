import { spawn, type ChildProcessWithoutNullStreams } from 'node:child_process'
import { existsSync } from 'node:fs'
import { createInterface } from 'node:readline'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFileSync } from 'node:child_process'

const PACKAGE_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..')
export const DEFAULT_SIDECAR_SCRIPT = path.join(PACKAGE_ROOT, 'sidecar', 'main.py')
export const DEFAULT_VENV_PYTHON = path.join(PACKAGE_ROOT, 'sidecar', '.venv', 'bin', 'python')

const READY_WAIT_MS = 120_000
const DEFAULT_REQUEST_TIMEOUT_MS = 60_000
const DISPOSE_WAIT_MS = 2_000

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
  readyTimeoutMs?: number
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
  private readonly pythonPath: string | null
  private readonly pythonResolveError: string | null
  private readonly scriptPath: string
  private readonly forceDown: boolean
  private readonly requestTimeoutMs: number
  private readonly readyTimeoutMs: number
  private child: ChildProcessWithoutNullStreams | null = null
  private readonly pending = new Map<string, Pending>()
  private nextId = 1
  private starting: Promise<void> | null = null
  private ready = false
  private disposed = false
  private resolveErrorLogged = false

  constructor(options: SidecarClientOptions = {}) {
    const resolved = resolvePythonPath(options.pythonPath)
    this.pythonPath = resolved.pythonPath
    this.pythonResolveError = resolved.error
    this.scriptPath = options.scriptPath ?? DEFAULT_SIDECAR_SCRIPT
    this.forceDown = options.forceDown ?? false
    this.requestTimeoutMs = options.requestTimeoutMs ?? DEFAULT_REQUEST_TIMEOUT_MS
    this.readyTimeoutMs = options.readyTimeoutMs ?? READY_WAIT_MS
  }

  async ensureStarted(): Promise<boolean> {
    if (this.forceDown || this.disposed) return false
    if (this.pythonPath === null) {
      this.logResolveErrorOnce()
      return false
    }
    if (this.child && !this.child.killed && this.ready) return true
    if (this.starting) {
      try {
        await this.starting
        return !this.disposed && !!(this.child && !this.child.killed && this.ready)
      } catch {
        return false
      }
    }

    this.starting = this.spawnChild()
    try {
      await this.starting
      return !this.disposed && !!(this.child && !this.child.killed && this.ready)
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
    if (this.disposed) return softFail()
    const up = await this.ensureStarted()
    if (this.disposed || !up || !this.child?.stdin.writable) {
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
    this.disposed = true
    this.ready = false
    for (const [, pending] of this.pending) {
      clearTimeout(pending.timer)
      pending.resolve(softFail())
    }
    this.pending.clear()

    if (!this.child) return
    const child = this.child
    this.child = null
    await stopChildProcess(child)
  }

  private logResolveErrorOnce(): void {
    if (this.resolveErrorLogged || !this.pythonResolveError) return
    this.resolveErrorLogged = true
    console.error(`[english-path sidecar] ${this.pythonResolveError}`)
  }

  private async spawnChild(): Promise<void> {
    if (this.pythonPath === null) {
      throw new Error(this.pythonResolveError ?? 'sidecar python unavailable')
    }
    if (this.disposed) {
      throw new Error('sidecar disposed')
    }
    const pythonPath = this.pythonPath

    return new Promise((resolve, reject) => {
      let settled = false
      this.ready = false
      const child = spawn(pythonPath, [this.scriptPath], {
        stdio: ['pipe', 'pipe', 'pipe'],
        env: { ...process.env, PYTHONUNBUFFERED: '1' },
      })
      // Assign immediately so dispose during ready-wait can kill the child.
      this.child = child

      // Drain stderr so model-load logs cannot fill the pipe and stall the child.
      child.stderr.on('data', (chunk: Buffer | string) => {
        process.stderr.write(chunk)
      })

      const fail = (err: Error) => {
        if (settled) return
        settled = true
        this.ready = false
        if (this.child === child) this.child = null
        void stopChildProcess(child)
        reject(err)
      }

      const readyTimer = setTimeout(() => {
        fail(new Error(`sidecar ready timeout after ${this.readyTimeoutMs}ms`))
      }, this.readyTimeoutMs)

      child.once('error', (err) => {
        clearTimeout(readyTimer)
        fail(err)
      })

      const rl = createInterface({ input: child.stdout })
      rl.on('line', (raw) => {
        if (!settled) {
          let message: { event?: string; id?: string }
          try {
            message = JSON.parse(raw) as typeof message
          } catch {
            return
          }
          if (message.event === 'ready') {
            clearTimeout(readyTimer)
            settled = true
            if (this.disposed) {
              this.ready = false
              if (this.child === child) this.child = null
              void stopChildProcess(child)
              reject(new Error('sidecar disposed during ready'))
              return
            }
            this.child = child
            this.ready = true
            resolve()
            return
          }
        }
        this.onLine(raw)
      })

      child.once('exit', (code) => {
        clearTimeout(readyTimer)
        rl.close()
        if (this.child === child) this.child = null
        this.ready = false
        for (const [, pending] of this.pending) {
          clearTimeout(pending.timer)
          pending.resolve(softFail())
        }
        this.pending.clear()
        if (!settled) {
          settled = true
          reject(new Error(`sidecar exited early with code ${code}`))
        }
      })
    })
  }

  private onLine(raw: string): void {
    let message: {
      event?: string
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
    if (message.event === 'ready') return
    if (!message.id) return
    const pending = this.pending.get(message.id)
    if (!pending) return
    clearTimeout(pending.timer)
    this.pending.delete(message.id)
    if (this.disposed) {
      pending.resolve(softFail())
      return
    }
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

async function stopChildProcess(child: ChildProcessWithoutNullStreams): Promise<void> {
  await new Promise<void>((resolve) => {
    let settled = false
    const done = () => {
      if (settled) return
      settled = true
      resolve()
    }
    child.once('exit', () => done())
    try {
      child.stdin.end()
    } catch {
      // already closed
    }
    try {
      child.kill('SIGTERM')
    } catch {
      // ignore
    }
    setTimeout(() => {
      if (!settled) {
        try {
          child.kill('SIGKILL')
        } catch {
          // ignore
        }
        done()
      }
    }, DISPOSE_WAIT_MS)
  })
}

function resolvePythonPath(explicit?: string): {
  pythonPath: string | null
  error: string | null
} {
  if (explicit) {
    return acceptPinnedOrFail(
      explicit,
      `ENGLISH_PATH_PYTHON / pythonPath ${explicit} is not Python >=3.10,<3.13.`,
    )
  }
  const fromEnv = process.env.ENGLISH_PATH_PYTHON
  if (fromEnv) {
    return acceptPinnedOrFail(
      fromEnv,
      `ENGLISH_PATH_PYTHON=${fromEnv} is not Python >=3.10,<3.13.`,
    )
  }
  if (!existsSync(DEFAULT_VENV_PYTHON)) {
    return {
      pythonPath: null,
      error:
        `sidecar .venv missing at ${DEFAULT_VENV_PYTHON}. ` +
        `Run: cd sidecar && uv venv --python 3.12 && uv sync. ` +
        `Or set ENGLISH_PATH_PYTHON to a Python >=3.10,<3.13 interpreter.`,
    }
  }
  return acceptPinnedOrFail(
    DEFAULT_VENV_PYTHON,
    `sidecar .venv at ${DEFAULT_VENV_PYTHON} is not Python >=3.10,<3.13. ` +
      `Recreate with: cd sidecar && uv venv --python 3.12 && uv sync. ` +
      `Or set ENGLISH_PATH_PYTHON.`,
  )
}

function acceptPinnedOrFail(
  pythonPath: string,
  outOfRangeMessage: string,
): { pythonPath: string | null; error: string | null } {
  if (!isPinnedPython(pythonPath)) {
    return { pythonPath: null, error: outOfRangeMessage }
  }
  return { pythonPath, error: null }
}

function isPinnedPython(pythonPath: string): boolean {
  try {
    const out = execFileSync(
      pythonPath,
      ['-c', 'import sys; print(f"{sys.version_info[0]}.{sys.version_info[1]}")'],
      { encoding: 'utf8', timeout: 5_000 },
    ).trim()
    const [majorRaw, minorRaw] = out.split('.')
    const major = Number(majorRaw)
    const minor = Number(minorRaw)
    if (!Number.isFinite(major) || !Number.isFinite(minor)) return false
    // >=3.10,<3.13
    if (major !== 3) return false
    return minor >= 10 && minor < 13
  } catch {
    return false
  }
}
