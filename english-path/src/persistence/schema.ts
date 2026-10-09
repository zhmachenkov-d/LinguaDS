import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

/** Single spine schema_version owned by persistence/ (AD-8 / AD-12). */
export const SCHEMA_VERSION = 1

const PACKAGE_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')

/** Loaded from persistence/schema.sql — single DDL source of truth. */
export const SCHEMA_SQL = readFileSync(
  path.join(PACKAGE_ROOT, 'persistence', 'schema.sql'),
  'utf8',
)
