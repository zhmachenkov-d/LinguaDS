# english-path

Installable DeepSeek Harness / Cordis bundle for the English Path substrate (AD-2).

Tracer scope: pin Harness/Cordis, thin LearnerStore journal→projection, and SpeechIn/Out stubs over a durable stdio JSON-lines sidecar IPC (engines later).

## Pins

| Component | Version |
| --- | --- |
| `@deepseek-ai/dsh` | `0.2.0-rc.2` |
| `@deepseek-ai/cordis` | `4.0.4` |
| `better-sqlite3` | `13.0.3` |
| Node | `^22.19 \|\| >=24` |
| Sidecar Python | `>=3.10,<3.13` (Kokoro constraint for later engines; stubs are stdlib-only) |

## Layout

```text
english-path/
  cordis.patch.yml          # bundle patch (package-name rows)
  package.json              # dsh.bundle → ./cordis.patch.yml
  src/                      # Cordis apply(ctx), supervisor commit, ports
  persistence/              # schema + per-learner SQLite files
  sidecar/main.py           # SpeechIn/Out stubs (JSON-lines stdio)
```

## Install (local smoke)

```sh
cd english-path
npm install
npm run smoke
```

## Install into a Harness profile (HITL)

Requires `dsh` on PATH (from `@deepseek-ai/dsh@0.2.0-rc.2`).

```sh
# From the directory that contains this package:
dsh plugin --profile english-path-dev add ./english-path

# Inspect composed layers (should include "# == english-path"):
dsh --profile english-path-dev --dump-config

# Boot (web surface example):
dsh --profile english-path-dev web
```

Person confirmation still required: plugin loads on the pinned host without a cloud Learner account. Desktop/`dsh web` load is HITL for this story.

### Local scratch overlay (not the install path)

Absolute-path `--patch` overlays are for scratch only. The durable install shape is `dsh.bundle` + package-name rows in `cordis.patch.yml`.

## Smoke coverage

`npm run smoke` exercises the plan I/O matrix without desktop chrome:

1. Journal happy path → projected PathPosition / NextStepPlan / ProfileSnapshot / EvidenceItem[]
2. SpeechIn/Out stub round-trip → `{ score, band, fail }`
3. Missing learner DB → create under `persistence/learners/` with `schema_version`
4. Sidecar down → soft-fail (`fail: true`), no crash

Speech traffic never writes learner SQLite.

## LearnerStore

- Append typed `JournalEvent`, then project AD-12 envelopes
- One SQLite file per learner id under `persistence/learners/`
- `persistence/` owns `schema_version` (currently `1`)
