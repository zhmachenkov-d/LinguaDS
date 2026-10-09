---
title: "Tracer: Harness pin and substrate path"
type: "feature"
ticket: "1"
created: "2026-10-09"
status: "built"
baseline_revision: "4ed56b58f935c6d3e7ca932e53484c43f4b5da8a"
route: "full"
route_source: "auto"
risk: "high"
review: "quick"
review_source: "pinned"
lenses_ran: ["quick"]
review_loop_iteration: 0
context:
  - "{project-root}/_bmad-output/initiative-lingua-ds/architecture-english-path/architecture-english-path.md"
  - "{project-root}/_bmad-output/initiative-lingua-ds/epic-platform-substrate/story-tracer-harness-pin-and-substrate-path.md"
  - "{project-root}/_bmad-output/initiative-lingua-ds/spec-english-path/voice-quality-bar.md"
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** The repo has no installable `english-path` Cordis/Harness bundle yet, so later epics have no shared substrate for LearnerStore, speech ports, or persistence.

**Approach:** Pin Harness/Cordis, scaffold the Structural Seed as one installable bundle, prove thin journal→projection for PathPosition/NextStepPlan/ProfileSnapshot/EvidenceItem, and own a stable sidecar IPC with SpeechIn/Out band stubs (engines later).

**Decisions:**

- Sidecar IPC = JSON-lines over stdio (child process); deepen in place later — not a second transport.
- Harness load proof = CLI attempt (`dsh` load/headless where possible) + HITL desktop/profile confirmation still required.
- Keep `@deepseek-ai/dsh` at `0.2.0-rc.2`; re-pin only if install fails (record in Implementation Notes).

## Boundaries & Constraints

**Always:**

- One installable `english-path` bundle (AD-2); Structural Seed layout under `english-path/`.
- Pins: `@deepseek-ai/dsh` 0.2.0-rc.2 (re-pin only on install failure), `@deepseek-ai/cordis` 4.0.4, `better-sqlite3` 13.0.3, Node `^22.19 || >=24`, sidecar Python `>=3.10,<3.13`.
- Bundle registration: `package.json` `dsh.bundle` + `cordis.patch.yml` using package name rows (not absolute-path `--patch` scratch overlays).
- Thin LearnerStore: append typed JournalEvent → project AD-12 envelopes; one SQLite file per learner id; `persistence/` owns `schema_version`.
- SpeechIn/Out stubs via JSON-lines stdio sidecar return `{ score, band, fail }` only; speech must not write learner SQLite.
- That stdio IPC is the durable protocol later speech stories deepen in place.

**Never:**

- Session UX, coach pedagogy, CAP covers, Assess-IO, multi-learner switch UI, cloud sync/telemetry.
- Real faster-whisper/Kokoro engines (later stories).
- Disposable/second sidecar; coaches writing LearnerStore; alternate PathPosition/Plan/Snapshot field identities.

## I/O & Edge-Case Matrix

| Scenario               | Input / State                                                                                    | Expected Output / Behavior                                                                       | Error Handling                                  |
| ---------------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ | ----------------------------------------------- |
| Journal happy path     | Append `session_start` + `plan_set` (+ minimal `evidence_propose` if needed) for learner `alice` | Projected snapshot exposes PathPosition, NextStepPlan, ProfileSnapshot, EvidenceItem[] per AD-12 | No error expected                               |
| Speech stub round-trip | SpeechIn/Out stub request over stdio JSON-lines                                                  | Each returns score, accept band, fail flag                                                       | Soft-fail: fail=true, no SQLite write           |
| Missing learner DB     | First open for new learner id                                                                    | Create per-learner SQLite under `persistence/` with `schema_version`                             | Fail closed with clear error if path unwritable |
| Sidecar down           | Port call when process not running                                                               | Ports report fail flag; no crash of plugin load                                                  | Soft-fail; no LearnerStore mutation             |

</frozen-after-approval>

## Code Map

- _(greenfield — no app code today)_ — do not invent under `_bmad/`, `.agents/`, or planning trees unless this plan updates docs
- `_bmad-output/initiative-lingua-ds/architecture-english-path/architecture-english-path.md` — AD-2/5/8/12, Structural Seed, Stack pins (authority)
- `_bmad-output/initiative-lingua-ds/architecture-english-path/reviews/review-tech-verify.md` — bundle `cordis.patch.yml` + `dsh.bundle` vs absolute `--patch`; Node engines
- `_bmad-output/initiative-lingua-ds/spec-english-path/voice-quality-bar.md` — SpeechIn/Out report score/band/fail only
- `english-path/` _(create)_ — Cordis plugin bundle root per Structural Seed
- `english-path/package.json` _(create)_ — deps pins, `dsh.bundle` metadata, plugin entry
- `english-path/cordis.patch.yml` _(create)_ — bundle patch rows by package name
- `english-path/src/` _(create)_ — `apply(ctx)` plugin entry; thin supervisor commit path; port facades
- `english-path/src/ports/learner-store/` _(create)_ — append + project API
- `english-path/src/ports/speech-in/`, `speech-out/` _(create)_ — stub clients over sidecar IPC
- `english-path/persistence/` _(create)_ — schema + migrations + per-learner DB path convention
- `english-path/sidecar/` _(create)_ — Python stdio JSON-lines entry + SpeechIn/Out stub handlers (no engines)
- Smoke/script under `english-path/` _(create)_ — CLI-verifiable journal projection + speech stub round-trip without desktop UI
- Harness CLI (`dsh`) where available — attempt load/headless; HITL still confirms profile/desktop

## Tasks & Acceptance

**Execution:**

- [x] `english-path/package.json` (+ lockfile if generated) -- pin dsh/cordis/better-sqlite3/TS toolchain; declare `dsh.bundle` → `./cordis.patch.yml` and plugin entry -- Harness installable bundle shape
- [x] `english-path/cordis.patch.yml` -- register package-name plugin row(s) per live dsh bundle docs -- loadable profile/plugin path
- [x] `english-path/src/**` -- Cordis `apply(ctx)` scaffold; expose LearnerStore + SpeechIn/Out ports; thin journal commit helper -- Structural Seed + AD-5 edge
- [x] `english-path/persistence/**` -- `schema_version`, journal + snapshot tables, one SQLite file per learner id -- AD-8/AD-12 ownership
- [x] `english-path/src/ports/learner-store/**` -- append JournalEvent → project PathPosition, NextStepPlan, ProfileSnapshot, EvidenceItem -- tracer persistence proof
- [x] `english-path/sidecar/**` + speech port clients -- stdio JSON-lines IPC with SpeechIn/Out stubs returning score/band/fail; no SQLite access from sidecar -- AD-5 connectivity for later deepen-in-place
- [x] `english-path/**` smoke (script/test) -- unit-test I/O matrix cases (journal projection, speech stub, missing DB create, sidecar-down soft-fail) -- prove without relying on desktop chrome
- [x] Harness CLI load attempt -- where `dsh` is available, try plugin/headless load and record result -- CLI half of load proof
- [x] README or `english-path/README.md` -- document pin versions, Node/Python bounds, install (`dsh plugin` / profile), HITL load steps -- person can confirm on pinned host

**Acceptance Criteria:**

- Given pinned Harness host and Node/Python bounds, when the person installs the `english-path` bundle (after any agent CLI load attempt), then the plugin loads without a cloud Learner account.
- Given a fresh local learner id, when smoke appends the minimal journal events, then projected PathPosition, NextStepPlan, ProfileSnapshot, and EvidenceItem are visible.
- Given the sidecar running, when SpeechIn and SpeechOut stubs are called over stdio JSON-lines, then each returns a score, accept band, and fail flag.
- Given speech stub traffic, when inspected, then no writes occur to learner SQLite from the sidecar path.

## Implementation Notes

- Created installable `english-path/` bundle: pins `@deepseek-ai/dsh@0.2.0-rc.2`, `@deepseek-ai/cordis@4.0.4`, `better-sqlite3@13.0.3`; `dsh.bundle.patch` → `./cordis.patch.yml` with package-name row `id: english-path` / `name: english-path`. Lockfile generated (`english-path/package-lock.json`). No re-pin required — install succeeded on pinned versions.
- Host runtimes at implement: Node `v26.11.1` (meets `^22.19 || >=24`); Python `3.14.8` is **outside** sidecar bound `>=3.10,<3.13`. Stdlib-only stubs still run; real Kokoro later will need a Python 3.10–3.12 host.
- LearnerStore: append typed journal → project AD-12 envelopes; DBs under `persistence/learners/<id>.sqlite`; `schema_version=1` in `meta`. NextStepPlan `available`/`recommended` projected as `LessonRef[]`.
- Speech: shared stdio JSON-lines sidecar (`sidecar/main.py`); SpeechIn/Out return `{ score, band, fail }` only; sidecar never opens SQLite. Soft-fail when down (`forceDown` / spawn failure).
- Cordis entry: `apply(ctx)` uses `ctx.provide('englishPath', api)` (direct ctx property assignment is rejected by Cordis 4.0.4).
- Verification: `npm run smoke` — 6/6 I/O matrix tests pass; `npm run typecheck` clean.
- Harness CLI load (agent half): `dsh plugin --profile english-path-dev add ./english-path` with `DSH_HOME=/tmp/dsh-home-english-path-tracer` succeeded; `--dump-config` shows `# == english-path` layer. Initial headless failed with `cannot set property "englishPath" without provide` (fixed). After fix, headless no longer reports the activation warning; process waits on LLM/task (no API key) until timeout — plugin load itself OK. Direct Cordis `Context.plugin(apply)` confirms `ctx.get('englishPath')` present.
- HITL still required: person installs into pinned host profile / desktop and confirms load without cloud Learner account.
- Review patches: strict learner-id filenames; sidecar ready only after spawn; SpeechBandResult = score/band/fail only; SCHEMA_SQL loaded from `persistence/schema.sql`.

## Plan Change Log

- 2026-10-09: Implemented tracer substrate under `english-path/`; recorded pin/runtime/CLI load results; marked execution tasks done. No frozen-intent changes.
- 2026-10-09: Applied quick-review patches (learner-id isolation, spawn soft-fail, speech result shape, schema.sql single source).

## Review Triage Log

- 2026-10-09 / quick / `paths.ts` learnerDbFileName + `learner-store` open — distinct ids collapse to one SQLite file (e.g. `a/b` vs `a_b`) — **medium** — verified: both open the same path and share journal state — route **patch**
- 2026-10-09 / quick / `sidecar-client.ts` spawnChild — failed spawn treated as up, soft-fail only after timeout — **medium** — verified: `/nonexistent/python-bin` returns `timeout` after ~800ms — route **patch**
- 2026-10-09 / quick / speech `{ score, band, fail }` vs extra `error` — **low** — verified: `SpeechBandResult` and softFail include `error`; plan Always says those three only — route **patch**
- 2026-10-09 / quick / NextStepPlan `LessonRef` vs `LessonRef[]` — **false** — AD-12 prose treats available/recommended as plural refs; plan Design Notes require arrays; table type name is not cardinality-1
- 2026-10-09 / quick / persistence migrations missing — **low** (rejected) — schema_version stamp + mismatch reject is enough for tracer v1; adding a migration runner is more than a direct fix
- 2026-10-09 / quick / `persistence/schema.sql` unused vs `schema.ts` duplicate DDL — **medium** — verified: `db.exec(SCHEMA_SQL)` never reads `schema.sql`; drift risk on next schema edit — route **patch**
- 2026-10-09 / quick / HITL load AC unmet — **false** — intentional hitl gate; agent CLI half recorded; not a code defect

## Design Notes

- Tracer is full-layer but thin: one projection path and stub speech bands — not full AD-12 event coverage or multi-learner UX.
- Prefer arrays of `LessonRef` for `available`/`recommended` when projecting NextStepPlan (AD-12 table types + plural convention); keep field identities exact.
- Load proof: agent attempts `dsh` CLI/headless when available; story `hitl: true` still requires person-confirmed profile/desktop load.

## Verification

**Commands:**

- `node -v` / `python3 --version` -- meet Node `^22.19 \|\| >=24` and Python `>=3.10,<3.13`
- Package install + smoke under `english-path/` -- journal projection + SpeechIn/Out stub assertions pass
- `dsh` CLI load/headless attempt (when installed) -- record success or blocker in Implementation Notes
- Typecheck/lint if configured in the new package -- clean

**Manual checks (HITL):**

- Install bundle into pinned Harness profile (`dsh plugin` / profile docs); confirm plugin load on host
- Optionally `dsh web` / desktop: no cloud Learner account required for substrate smoke
