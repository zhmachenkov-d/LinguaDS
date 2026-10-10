# Walkthrough: PR #36 — Speech sidecar and SpeechIn adapter

Target: [PR #36](https://github.com/zhmachenkov-d/LinguaDS/pull/36) (`feat/1-4-speech-sidecar-speechin` → `main`)
Plan: [story-speech-sidecar-and-speechin-adapter-plan.md](../epic-platform-substrate/story-speech-sidecar-and-speechin-adapter-plan.md)
Purpose: before-merge review of story 1.4

Current block: **3 — Sidecar SpeechIn engine**

## Blocks

- [x] **1 — Intent** — done (Thoughts + Test; local smoke 16/16; no remote CI)
- [x] **2 — Broad strokes** — done (entry 4 → index.ts; Thoughts + Test 16/16)
- [ ] **3 — Sidecar SpeechIn engine** — in progress (formal review patches applied)
- [ ] **4 — SidecarClient lifecycle** — unvisited
- [ ] **5 — Smoke & soft-fail matrix** — unvisited
- [ ] **6 — Periphery** — unvisited

---

## 1 — Intent

Status: done · Changed during review: no

Source: plan Intent section pasted verbatim from [story-speech-sidecar-and-speechin-adapter-plan.md](../epic-platform-substrate/story-speech-sidecar-and-speechin-adapter-plan.md).

**Problem:** The tracer's speech sidecar still returns fixed stub bands, so fixture audio cannot prove a real SpeechIn score/band/fail path and there is no managed lifecycle around the Python process or model.

**Approach:** Deepen the existing stdio JSON-lines sidecar in place: add process/model lifecycle, pin faster-whisper 1.2.1 as the SpeechIn adapter, and prove fixture audio → `{ score, band, fail }` without touching learner SQLite. SpeechOut stays stub until its own story.

**Decisions:**

- Python env: sidecar `pyproject.toml` + `uv sync` into `sidecar/.venv` with Python 3.12 (`uv venv --python 3.12`); `SidecarClient` prefers that interpreter when present; `ENGLISH_PATH_PYTHON` overrides. Require `uv` + network for bootstrap; if `.venv` missing/wrong version and no override, fail closed with a clear message (no silent host-3.14 soft-fail).
- Ready handshake: after warm model load, child prints one ready JSON line on stdout (`{"event":"ready"}`), then reads stdin; client settles `ensureStarted` only after that line (not on `spawn`). Ready-wait timeout **120s** (cold model download); on timeout/exit without ready → soft-fail (`fail: true`, no throw).
- Fixture: commit a short clear-English speech wav under `english-path/sidecar/fixtures/` (public-domain or self-recorded; one-line rights note beside the file).
- Whisper model: `ENGLISH_PATH_WHISPER_MODEL` (default `tiny.en`); document in README.
- Score mapping: enable word timestamps; `score` = mean word probability; bands — `<0.35` → `band: "fail"` + `fail: true`; `0.35–0.50` → `accept_low`; `>0.50` → `accept`.
- Request timeout: SpeechIn inference timeout **60s** after ready (CPU-safe); soft-fail on timeout.

---

## 2 — Broad strokes

Status: done · Changed during review: yes (entry 4 → index.ts shared SidecarClient)

Mechanism (one line): Shared `SidecarClient` waits for ready, then SpeechIn scores fixture audio via faster-whisper over the same JSON-lines stdio IPC; soft-fail never throws; SpeechOut stays stub.

A reviewer must open these in order and confirm each:

- [ ] [english-path/sidecar/main.py](../../../english-path/sidecar/main.py) — warm-load Whisper, emit ready, real `speech_in` from `audio_ref`, stub `speech_out`
- [ ] [english-path/sidecar/pyproject.toml](../../../english-path/sidecar/pyproject.toml) — pin `faster-whisper==1.2.1` for `uv sync` / `.venv`
- [ ] [english-path/src/ports/shared/sidecar-client.ts](../../../english-path/src/ports/shared/sidecar-client.ts) — prefer `.venv` python; ready-wait 120s; SpeechIn timeout 60s; dispose; soft-fail
- [ ] [english-path/src/index.ts](../../../english-path/src/index.ts) — `createEnglishPath` owns one shared `SidecarClient` for SpeechIn/Out
- [ ] [english-path/src/scripts/smoke.test.ts](../../../english-path/src/scripts/smoke.test.ts) — fixture happy path + soft-fails + no-SQLite + dispose

---

## 3 — Sidecar SpeechIn engine

Status: in progress · Changed during review: yes (formal review patches on SidecarClient teardown + ready-timeout smoke)

Mechanism: Sidecar warm-loads faster-whisper, emits one `{"event":"ready"}` line, then maps mean word probability to score/band/fail from `audio_ref`. SpeechOut remains the stub handler. Missing/unreadable audio soft-fails.

Places:

- [ ] [english-path/sidecar/main.py](../../../english-path/sidecar/main.py) — ready handshake + `speech_in` scoring + stub `speech_out`
- [ ] [english-path/sidecar/pyproject.toml](../../../english-path/sidecar/pyproject.toml) — `faster-whisper==1.2.1`; Python `>=3.10,<3.13`
- [ ] [english-path/sidecar/fixtures/clear-english.wav](../../../english-path/sidecar/fixtures/clear-english.wav) — committed clear-English fixture
- [ ] [english-path/sidecar/fixtures/RIGHTS.txt](../../../english-path/sidecar/fixtures/RIGHTS.txt) — one-line rights note

---

## 4 — SidecarClient lifecycle

Status: unvisited · Changed during review: no

Mechanism: Client prefers `sidecar/.venv` (or `ENGLISH_PATH_PYTHON`), treats ready only after the ready line (not spawn), applies 120s ready-wait and 60s SpeechIn timeout, soft-fails without throw, and disposes the child cleanly.

Places:

- [ ] [english-path/src/ports/shared/sidecar-client.ts](../../../english-path/src/ports/shared/sidecar-client.ts) — interpreter pin, ready wait, timeouts, dispose, soft-fail
- [ ] [english-path/src/ports/speech-in/index.ts](../../../english-path/src/ports/speech-in/index.ts) — pass-through `audio_ref`
- [ ] [english-path/src/index.ts](../../../english-path/src/index.ts) — single shared `SidecarClient` (unchanged ownership)

---

## 5 — Smoke & soft-fail matrix

Status: unvisited · Changed during review: no

Mechanism: Smoke replaces stub `text: "cat"` success with fixture `audio_ref` accept path plus soft-fail and isolation cases from the plan I/O matrix.

Places:

- [ ] [english-path/src/scripts/smoke.test.ts](../../../english-path/src/scripts/smoke.test.ts) — fixture accept; text-only/missing-audio soft-fail; forceDown; no-SQLite; dispose; ready-timeout as covered

---

## 6 — Periphery

Status: unvisited · Changed during review: no

- [ ] [english-path/.gitignore](../../../english-path/.gitignore) — ignore `sidecar/.venv` (and local model caches if listed)
- [ ] [english-path/README.md](../../../english-path/README.md) — bootstrap (`uv venv`/`uv sync`), `ENGLISH_PATH_PYTHON`, `ENGLISH_PATH_WHISPER_MODEL`
- [ ] [english-path/sidecar/uv.lock](../../../english-path/sidecar/uv.lock) — lockfile for pinned sidecar env
- [ ] [story-speech-sidecar-and-speechin-adapter-plan.md](../epic-platform-substrate/story-speech-sidecar-and-speechin-adapter-plan.md) — plan artifact shipped with the PR
