---
title: "Speech sidecar and SpeechIn adapter"
type: "feature"
ticket: "4"
created: "2026-10-10"
status: "built"
baseline_revision: "26dc635e2e96305d1eeed166d741bb5277366de6"
route: "full"
route_source: "auto"
risk: "high"
review: "quick"
review_source: "pinned"
lenses_ran: ["quick"]
review_loop_iteration: 0
context:
  - "{project-root}/_bmad-output/initiative-lingua-ds/architecture-english-path/architecture-english-path.md"
  - "{project-root}/_bmad-output/initiative-lingua-ds/spec-english-path/voice-quality-bar.md"
  - "{project-root}/_bmad-output/initiative-lingua-ds/epic-platform-substrate/story-speech-sidecar-and-speechin-adapter.md"
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** The tracer's speech sidecar still returns fixed stub bands, so fixture audio cannot prove a real SpeechIn score/band/fail path and there is no managed lifecycle around the Python process or model.

**Approach:** Deepen the existing stdio JSON-lines sidecar in place: add process/model lifecycle, pin faster-whisper 1.2.1 as the SpeechIn adapter, and prove fixture audio → `{ score, band, fail }` without touching learner SQLite. SpeechOut stays stub until its own story.

**Decisions:**

- Python env: sidecar `pyproject.toml` + `uv sync` into `sidecar/.venv` with Python 3.12 (`uv venv --python 3.12`); `SidecarClient` prefers that interpreter when present; `ENGLISH_PATH_PYTHON` overrides. Require `uv` + network for bootstrap; if `.venv` missing/wrong version and no override, fail closed with a clear message (no silent host-3.14 soft-fail).
- Ready handshake: after warm model load, child prints one ready JSON line on stdout (`{"event":"ready"}`), then reads stdin; client settles `ensureStarted` only after that line (not on `spawn`). Ready-wait timeout **120s** (cold model download); on timeout/exit without ready → soft-fail (`fail: true`, no throw).
- Fixture: commit a short clear-English speech wav under `english-path/sidecar/fixtures/` (public-domain or self-recorded; one-line rights note beside the file).
- Whisper model: `ENGLISH_PATH_WHISPER_MODEL` (default `tiny.en`); document in README.
- Score mapping: enable word timestamps; `score` = mean word probability; bands — `<0.35` → `band: "fail"` + `fail: true`; `0.35–0.50` → `accept_low`; `>0.50` → `accept`.
- Request timeout: SpeechIn inference timeout **60s** after ready (CPU-safe); soft-fail on timeout.

## Boundaries & Constraints

**Always:**

- One sidecar, same JSON-lines stdio IPC (`id`/`method`/`params` → `score`/`band`/`fail`); deepen in place — no second process or transport.
- SpeechIn engine: faster-whisper **1.2.1** via `sidecar/pyproject.toml` + `uv sync`; sidecar Python **`>=3.10,<3.13`**; SpeechOut remains stub handler.
- Prefer `sidecar/.venv` interpreter; `ENGLISH_PATH_PYTHON` overrides; missing/invalid env fails closed with a clear error/skip message.
- Ready line `{"event":"ready"}` after model load; client ready-wait 120s then soft-fail; never treat bare spawn as ready.
- Model id from `ENGLISH_PATH_WHISPER_MODEL` (default `tiny.en`).
- Word-prob mean → score; bands `fail` / `accept_low` / `accept` as above; soft-fail never throws.
- Speech artifacts ephemeral; sidecar and speech ports never open or write learner SQLite.
- Reuse shared `SidecarClient` in `createEnglishPath`.

**Never:**

- Kokoro / real SpeechOut, Session UX, coach pedagogy, Assess-IO, FR-33 full WER measurement campaign, cloud ASR, product telemetry.
- Alternate IPC (HTTP/gRPC/sockets); coaches writing LearnerStore; inventing learner evidence from speech scores.
- Silent fallback to host `python3` when it is outside the pin.

## I/O & Edge-Case Matrix

| Scenario                   | Input / State                                                      | Expected Output / Behavior                                 | Error Handling                        |
| -------------------------- | ------------------------------------------------------------------ | ---------------------------------------------------------- | ------------------------------------- |
| Fixture audio happy path   | Committed clear-English fixture wav via `audio_ref`; sidecar ready | `{ score: number, band: accept\|accept_low, fail: false }` | No error expected                     |
| Missing / unreadable audio | `audio_ref` absent or path unreadable                              | `{ score: 0, band: fail, fail: true }`                     | Soft-fail; optional `error`; no throw |
| Text-only call             | `score({ text })` without `audio_ref`                              | Same soft-fail as missing audio                            | Soft-fail (Whisper needs audio)       |
| Ready timeout / model down | No ready within 120s, forceDown, spawn fail, or engine unavailable | Soft-fail shape; no throw                                  | Soft-fail; no SQLite write            |
| No SQLite from speech      | SpeechIn (+ stub SpeechOut) traffic only                           | No files under learner `dataDir`                           | Assert empty dir                      |
| Lifecycle dispose          | After ready + ≥1 request, `dispose()`                              | Child exits; pending soft-fail                             | SIGTERM (+ brief wait); no hang       |

</frozen-after-approval>

## Code Map

- `english-path/sidecar/main.py` — JSON-lines loop; **change** warm-load Whisper, emit `{"event":"ready"}`, real `speech_in` from `audio_ref`, keep `speech_out` stub; never SQLite
- `english-path/sidecar/pyproject.toml` _(new)_ — pin `faster-whisper==1.2.1`; `uv sync` target for `.venv`
- `english-path/sidecar/fixtures/` _(new)_ — short clear-English wav + one-line rights note
- `english-path/.gitignore` — ignore `sidecar/.venv` (and model caches if local)
- `english-path/src/ports/shared/sidecar-client.ts` — prefer `.venv` python; wait for ready (120s); SpeechIn timeout 60s; soft-fail on ready/request timeout; dispose
- `english-path/src/ports/speech-in/index.ts` — thin facade; pass `audio_ref`
- `english-path/src/ports/speech-out/index.ts` — unchanged beyond shared-client lifecycle
- `english-path/src/index.ts` — keep single shared `SidecarClient`
- `english-path/src/scripts/smoke.test.ts` — fixture `audio_ref` happy path; separate text-only/missing-audio soft-fail; forceDown; no-SQLite; dispose; **replace** stub `text: "cat"` expect-success
- `english-path/README.md` — `uv` bootstrap, `ENGLISH_PATH_PYTHON`, `ENGLISH_PATH_WHISPER_MODEL`, fixture smoke
- Do **not** change: `persistence/**`, LearnerStore, AD-12 journal, Cordis `apply`/`provide`

## Tasks & Acceptance

**Execution:**

- [x] `english-path/sidecar/pyproject.toml` + bootstrap + `english-path/.gitignore` -- pin `faster-whisper==1.2.1`; `uv venv --python 3.12` + `uv sync`; ignore `sidecar/.venv` -- reproducible pinned env
- [x] `english-path/sidecar/main.py` -- load model from `ENGLISH_PATH_WHISPER_MODEL` (default `tiny.en`); print `{"event":"ready"}`; word-prob score/bands; `speech_in` via `audio_ref`; `speech_out` stub -- real SpeechIn + handshake
- [x] `english-path/src/ports/shared/sidecar-client.ts` -- resolve `.venv` python (or override); ready-wait 120s; request timeout 60s; soft-fail on miss; dispose -- managed lifecycle
- [x] `english-path/sidecar/fixtures/**` + `smoke.test.ts` -- clear-English wav + rights note; fixture happy path; text-only soft-fail; forceDown; no-SQLite; dispose -- story AC + I/O matrix
- [x] `english-path/README.md` -- `uv` prerequisite, bootstrap, env vars, fixture smoke -- operator can run locally

**Acceptance Criteria:**

- Given sidecar `.venv` (Python `>=3.10,<3.13`) with pinned faster-whisper and a ready sidecar, when SpeechIn scores the committed fixture via `audio_ref`, then the result has a numeric score, band `accept` or `accept_low`, and `fail: false`.
- Given speech traffic (fixture and/or soft-fail paths), when learner `dataDir` is inspected, then no learner SQLite files were created by the speech path.
- Given a ready sidecar, when `dispose()` runs, then the child exits and later calls soft-fail without throwing.
- Given no ready line within 120s (or forceDown), when SpeechIn is called, then the result is soft-fail (`fail: true`) without throwing.

## Implementation Notes

- Bootstrapped `sidecar/.venv` with Python 3.12 via `uv`; pinned `faster-whisper==1.2.1` in `pyproject.toml` + `uv.lock`.
- Ready handshake `{"event":"ready"}` after warm load; client ready-wait 120s, request timeout 60s; no silent host-3.14 fallback.
- Fixture `sidecar/fixtures/clear-english.wav` + `RIGHTS.txt`; smoke 16/16 pass including fixture accept, text-only/missing soft-fail, forceDown, ready-timeout, no-SQLite, dispose.
- PyAV workaround: faster-whisper 1.2.1 calls `av.open(..., metadata_errors=...)` which current `av` rejects; sidecar decodes to float32 and passes the array to `transcribe` (engine pin kept).
- Quick-review patches: spawn-time child so dispose kills mid-ready-wait; drain stderr; pin-check `ENGLISH_PATH_PYTHON`/`pythonPath`; ready-timeout smoke forces `DEFAULT_VENV_PYTHON`.

## Plan Change Log

- 2026-10-10: Plan review — patched ready-timeout/soft-fail, named `ENGLISH_PATH_WHISPER_MODEL`, fixture content/rights, word-prob score mapping, smoke text→fixture split, `.venv` fail-closed, 60s inference timeout, `pyproject`+`uv sync`, `band: "fail"` wording, `.gitignore` path.

## Review Triage Log

- 2026-10-10 / plan-review / ready-wait vs 5s spawn — **blocker** — route **patch** (120s ready-wait + soft-fail)
- 2026-10-10 / plan-review / unnamed model env — **high** — route **patch** (`ENGLISH_PATH_WHISPER_MODEL`)
- 2026-10-10 / plan-review / fixture content/rights — **high** — route **patch**
- 2026-10-10 / plan-review / Whisper→score mapping — **high** — route **patch** (mean word prob)
- 2026-10-10 / plan-review / smoke text success vs audio_ref — **high** — route **patch**
- 2026-10-10 / plan-review / silent 3.14 fallback — **medium** — route **patch** (fail closed)
- 2026-10-10 / plan-review / 5s inference timeout — **medium** — route **patch** (60s)
- 2026-10-10 / plan-review / requirements vs pyproject — **medium** — route **patch** (pyproject + uv sync)
- 2026-10-10 / plan-review / fail/retry wording — **low** — route **patch**
- 2026-10-10 / plan-review / which gitignore — **low** — route **patch** (`english-path/.gitignore`)
- 2026-10-10 / quick / `sidecar-client.ts` dispose during ready-wait — **medium** — verified: dispose ~300ms into slow ready still returned `fail:false` for in-flight request; child assigned only after ready so dispose cannot kill it — route **patch**
- 2026-10-10 / quick / `sidecar-client.ts` stderr piped unread — **medium** — verified: stdio stderr is `pipe` with no reader; model-load logs can fill the buffer and stall ready/`speech_in` — route **patch**
- 2026-10-10 / quick / `resolvePythonPath` skips pin for `ENGLISH_PATH_PYTHON` — **medium** — verified: only `.venv` runs `isPinnedPython`; env/explicit paths accepted unchecked against `>=3.10,<3.13` — route **patch**
- 2026-10-10 / quick / ready-timeout smoke may skip spawn — **medium** — verified: test omits `pythonPath`; if `.venv` missing, soft-fail is immediate without ready-wait — route **patch**

## Design Notes

- Ready line is a one-shot stdout event before the request loop — not a request method; requests stay `speech_in` / `speech_out`.
- `uv venv --python 3.12` may fetch a managed 3.12 even when host PATH is 3.14 — needs `uv` + network once.
- Band mapping is port reporting only; do not journal evidence from SpeechIn here.

## Verification

**Commands:**

- `cd english-path/sidecar && uv venv --python 3.12 && uv sync` -- `.venv` with faster-whisper 1.2.1
- `cd english-path && npm run smoke` -- fixture + soft-fail + no-SQLite + dispose + ready-timeout behavior
- `cd english-path && npm run typecheck` -- clean

**Manual checks:**

- First model download during bootstrap/first ready; ready line before any request response
