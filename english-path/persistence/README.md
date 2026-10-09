# Persistence

Owns the single spine `schema_version` and per-learner SQLite files (AD-8 / AD-12).

## Layout

- `schema.sql` — single DDL source of truth (loaded at runtime by `src/persistence/schema.ts`)
- `learners/` — one SQLite file per learner id (`<id>.sqlite`; id must match `[a-zA-Z0-9._-]+`)
- Runtime open/migrate/project code lives in `src/persistence/` and is used only via `LearnerStore`

## Rules

- Coaches never open these files
- Speech sidecar never writes here
- First open for a new learner id creates the file and stamps `schema_version = 1`
