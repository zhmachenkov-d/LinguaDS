import { mkdirSync } from 'node:fs'
import path from 'node:path'

const LEARNER_ID_RE = /^[a-zA-Z0-9._-]+$/

/** Exact learner id → filename (AD-8: one file per learner; no collapsing). */
export function learnerDbFileName(learnerId: string): string {
  if (!LEARNER_ID_RE.test(learnerId)) {
    throw new Error(
      `invalid learner id ${JSON.stringify(learnerId)}; must match [a-zA-Z0-9._-]+`,
    )
  }
  return `${learnerId}.sqlite`
}

export function learnerDbPath(dataDir: string, learnerId: string): string {
  return path.join(dataDir, learnerDbFileName(learnerId))
}

export function ensureDataDir(dataDir: string): void {
  try {
    mkdirSync(dataDir, { recursive: true })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    throw new Error(`LearnerStore data directory is not writable: ${dataDir} (${message})`)
  }
}
