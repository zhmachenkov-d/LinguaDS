-- english-path LearnerStore schema (schema_version = 1)
-- Owned by persistence/; applied via the LearnerStore adapter.

CREATE TABLE IF NOT EXISTS meta (
  key TEXT PRIMARY KEY NOT NULL,
  value TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS journal_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  seq INTEGER NOT NULL UNIQUE,
  type TEXT NOT NULL,
  at TEXT NOT NULL,
  payload_json TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS profile_snapshot (
  learner_id TEXT PRIMARY KEY NOT NULL,
  snapshot_json TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
