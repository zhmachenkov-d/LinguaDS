import Database from 'better-sqlite3'
import { accessSync, constants } from 'node:fs'
import path from 'node:path'
import { ensureDataDir, learnerDbPath } from './paths.js'
import { SCHEMA_SQL, SCHEMA_VERSION } from './schema.js'

export interface OpenLearnerDbOptions {
  dataDir: string
  learnerId: string
}

export interface LearnerDb {
  learnerId: string
  filePath: string
  db: Database.Database
  close(): void
}

function assertParentWritable(filePath: string): void {
  const dir = path.dirname(filePath)
  try {
    accessSync(dir, constants.W_OK)
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    throw new Error(`LearnerStore path is not writable: ${dir} (${message})`)
  }
}

export function openLearnerDb(options: OpenLearnerDbOptions): LearnerDb {
  const { dataDir, learnerId } = options
  if (!learnerId || !learnerId.trim()) {
    throw new Error('learner id is required')
  }

  ensureDataDir(dataDir)
  const filePath = learnerDbPath(dataDir, learnerId)
  assertParentWritable(filePath)

  let db: Database.Database
  try {
    db = new Database(filePath)
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    throw new Error(`Failed to open learner SQLite at ${filePath}: ${message}`)
  }

  db.pragma('journal_mode = WAL')
  db.exec(SCHEMA_SQL)

  const existing = db.prepare('SELECT value FROM meta WHERE key = ?').get('schema_version') as
    | { value: string }
    | undefined

  if (!existing) {
    db.prepare('INSERT INTO meta (key, value) VALUES (?, ?)').run(
      'schema_version',
      String(SCHEMA_VERSION),
    )
  } else if (Number(existing.value) !== SCHEMA_VERSION) {
    db.close()
    throw new Error(
      `Unsupported schema_version ${existing.value} at ${filePath}; expected ${SCHEMA_VERSION}`,
    )
  }

  return {
    learnerId,
    filePath,
    db,
    close() {
      db.close()
    },
  }
}

export function readSchemaVersion(db: Database.Database): number {
  const row = db.prepare('SELECT value FROM meta WHERE key = ?').get('schema_version') as
    | { value: string }
    | undefined
  if (!row) {
    throw new Error('schema_version missing from learner DB')
  }
  return Number(row.value)
}
