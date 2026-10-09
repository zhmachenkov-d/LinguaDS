# Walkthrough: PR #30 — english-path harness pin & substrate

Target: [PR #30](https://github.com/zhmachenkov-d/LinguaDS/pull/30) (`feat/1-1-tracer-harness-pin` → `main`)
Plan: [story-tracer-harness-pin-and-substrate-path-plan.md](../epic-platform-substrate/story-tracer-harness-pin-and-substrate-path-plan.md)

Current block: **wrap-up**

## Blocks

- [x] **1 — Intent** — done (checklist shape; item 6 deferred)
- [x] **2 — Broad strokes** — done (smoke 6/6 + typecheck)
- [x] **3 — Bundle load & Cordis apply** — done
- [x] **4 — LearnerStore journal → projection** — done (append soft finding accepted as-is)
- [x] **5 — Speech sidecar IPC stubs** — done (optional error accepted as-is)
- [x] **6 — Periphery** — done

---

## 1 — Intent

Status: done · Changed during review: yes (shape → reviewer checklist)

Source: derived from story-plan Intent + PR #30 scope; reframed per reviewer request.

For this PR to land, these must be true:

- [ ] Repo ships one installable `english-path` Cordis/Harness bundle (Structural Seed layout under `english-path/`).
- [ ] Pins hold: `@deepseek-ai/dsh` `0.2.0-rc.2`, `@deepseek-ai/cordis` `4.0.4`, `better-sqlite3` `13.0.3`, Node `^22.19 || >=24`.
- [ ] Thin LearnerStore: typed journal append → project PathPosition / NextStepPlan / ProfileSnapshot / EvidenceItem (AD-12); one SQLite file per learner.
- [ ] SpeechIn/Out are stubs over durable JSON-lines stdio sidecar IPC; return `{ score, band, fail }` only; no learner SQLite writes from speech.
- [ ] No real speech engines, session UX, coach pedagogy, or cloud sync in this PR.
- [x] Harness load proof path is known: smoke/CLI where possible; HITL profile confirmation **deferred** (accepted for this review — not a merge blocker).

---

## 2 — Broad strokes

Status: done · Changed during review: yes (shape → reviewer checklist)

Mechanism (one line): Cordis `apply` wires LearnerStore + speech ports; journal projects to AD-12; speech uses stdio JSON-lines stubs.

A reviewer must open these in order and confirm each:

- [x] [english-path/package.json](../../../english-path/package.json) — pins, `dsh.bundle`, `smoke` / `typecheck` scripts
- [x] [english-path/cordis.patch.yml](../../../english-path/cordis.patch.yml) — Harness bundle patch (package-name row)
- [x] [english-path/src/index.ts](../../../english-path/src/index.ts) — `createEnglishPath` / Cordis `apply`, provides `ctx.englishPath`
- [x] [english-path/src/ports/learner-store/index.ts](../../../english-path/src/ports/learner-store/index.ts) — per-learner SQLite journal + snapshot getters
- [x] [english-path/src/ports/shared/sidecar-client.ts](../../../english-path/src/ports/shared/sidecar-client.ts) — stdio JSON-lines client (soft-fail)

---

## 3 — Bundle load & Cordis apply

Status: done · Changed during review: yes (shape → reviewer checklist)

For bundle load to be correct, these must be true:

- [x] [english-path/package.json](../../../english-path/package.json) — `dsh.bundle.patch` → `./cordis.patch.yml`; cordis peer `4.0.4`; dsh pin `0.2.0-rc.2`
- [x] [english-path/cordis.patch.yml](../../../english-path/cordis.patch.yml) — insert row uses package name `english-path` (not absolute path)
- [x] [english-path/src/index.ts](../../../english-path/src/index.ts) — `apply` → `createEnglishPath` → `ctx.provide('englishPath')` + effect dispose
- [x] Package `name` field matches patch `id`/`name` (`english-path`)

---

## 4 — LearnerStore journal → projection

Status: done · Changed during review: yes (shape → reviewer checklist)

For LearnerStore to be correct, these must be true:

- [x] [english-path/src/supervisor/commit.ts](../../../english-path/src/supervisor/commit.ts) — sole intended writer path (`commitSessionStart` / `commitPlanSet` / `commitEvidencePropose`)
- [x] [english-path/src/ports/learner-store/index.ts](../../../english-path/src/ports/learner-store/index.ts) — append journal + getters for PathPosition / plan / snapshot / evidence
- [x] [english-path/src/ports/learner-store/project.ts](../../../english-path/src/ports/learner-store/project.ts) — journal events → AD-12 envelopes
- [x] [english-path/src/ports/learner-store/types.ts](../../../english-path/src/ports/learner-store/types.ts) — typed events and envelopes
- [x] [english-path/src/persistence/db.ts](../../../english-path/src/persistence/db.ts) — one SQLite file per learner id; create on first open
- [x] [english-path/persistence/schema.sql](../../../english-path/persistence/schema.sql) — `schema_version` owned by persistence

Review note: public `append` vs commit\* sole-writer convention — **accepted as-is**.

---

## 5 — Speech sidecar IPC stubs

Status: done · Changed during review: yes (shape → reviewer checklist)

For speech IPC to be correct, these must be true:

- [x] [english-path/src/ports/shared/sidecar-client.ts](../../../english-path/src/ports/shared/sidecar-client.ts) — JSON-lines stdio; soft-fail when down/timeout; no SQLite
- [x] [english-path/sidecar/main.py](../../../english-path/sidecar/main.py) — SpeechIn/Out stubs return `{ score, band, fail }` only
- [x] [english-path/src/ports/speech-in/index.ts](../../../english-path/src/ports/speech-in/index.ts) / [speech-out](../../../english-path/src/ports/speech-out/index.ts) — thin ports over the client
- [x] [english-path/src/scripts/smoke.test.ts](../../../english-path/src/scripts/smoke.test.ts) — round-trip + no SQLite write + sidecar-down soft-fail covered
- [x] Protocol is durable for later engine deepen-in-place (no second transport)

Review note: optional `error` on fail responses — **accepted as-is**.

---

## 6 — Periphery

Status: done · Changed during review: yes (shape → reviewer checklist)

Confirm each peripheral enabler is present and scoped correctly:

- [x] [english-path/README.md](../../../english-path/README.md) — pins, layout, smoke + HITL install notes
- [x] [english-path/persistence/README.md](../../../english-path/persistence/README.md) — persistence ownership note
- [x] [english-path/tsconfig.json](../../../english-path/tsconfig.json) — TypeScript build
- [x] [english-path/.gitignore](../../../english-path/.gitignore) — package ignores
- [x] [.gitignore](../../../.gitignore) — ignore `_bmad/render/`
- [x] [story-tracer-harness-pin-and-substrate-path-plan.md](../epic-platform-substrate/story-tracer-harness-pin-and-substrate-path-plan.md) — story plan (status built)
- [x] Coach/content/port `.gitkeep` placeholders under `english-path/src/` — structural seed only
