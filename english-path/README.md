# english-path

Installable DeepSeek Harness / Cordis bundle for the English Path substrate (AD-2).

Substrate scope: pin Harness/Cordis, thin LearnerStore journal→projection, SpeechIn via a local Python sidecar (faster-whisper), and SpeechOut stub over the same stdio JSON-lines IPC.

## Pins

| Component | Version |
| --- | --- |
| `@deepseek-ai/dsh` | `0.2.0-rc.2` |
| `@deepseek-ai/cordis` | `4.0.4` |
| `better-sqlite3` | `13.0.3` |
| Node | `^22.19 \|\| >=24` |
| Sidecar Python | `>=3.10,<3.13` (prefer 3.12 via `uv`) |
| SpeechIn | `faster-whisper==1.2.1` |
| SpeechOut | stub (Kokoro lands in a later story) |

## Layout

```text
english-path/
  cordis.patch.yml          # bundle patch (package-name rows)
  package.json              # dsh.bundle → ./cordis.patch.yml
  src/                      # Cordis apply(ctx), supervisor commit, ports
  persistence/              # schema + per-learner SQLite files
  sidecar/
    main.py                 # SpeechIn (Whisper) + SpeechOut stub (JSON-lines stdio)
    pyproject.toml          # pinned faster-whisper
    fixtures/               # clear-English wav for smoke
    .venv/                  # created locally via uv (gitignored)
```

## Sidecar bootstrap (required for SpeechIn)

Requires [`uv`](https://docs.astral.sh/uv/) and network once (Python 3.12 + model download).

```sh
cd english-path/sidecar
uv venv --python 3.12
uv sync
```

`SidecarClient` prefers `sidecar/.venv/bin/python` when present and in-range (`>=3.10,<3.13`). It does **not** silently fall back to a host `python3` outside that pin.

### Env vars

| Variable | Default | Purpose |
| --- | --- | --- |
| `ENGLISH_PATH_PYTHON` | _(unset → use `.venv`)_ | Override sidecar interpreter |
| `ENGLISH_PATH_WHISPER_MODEL` | `tiny.en` | faster-whisper model id |

## Install (local smoke)

```sh
cd english-path/sidecar && uv venv --python 3.12 && uv sync
cd ..
npm install
npm run smoke
```

First ready may download the Whisper model (ready-wait up to 120s). Fixture smoke scores `sidecar/fixtures/clear-english.wav` via `audio_ref`.

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
2. Fixture SpeechIn via `audio_ref` → `{ score, band: accept|accept_low, fail: false }`
3. Text-only / missing audio → soft-fail (`fail: true`)
4. Missing learner DB → create under `persistence/learners/` with `schema_version`
5. Sidecar down / ready timeout → soft-fail, no crash
6. `dispose()` → child exits; later calls soft-fail
7. Speech traffic never writes learner SQLite

## LearnerStore

- Append typed `JournalEvent`, then project AD-12 envelopes
- One SQLite file per learner id under `persistence/learners/`
- `persistence/` owns `schema_version` (currently `1`)
