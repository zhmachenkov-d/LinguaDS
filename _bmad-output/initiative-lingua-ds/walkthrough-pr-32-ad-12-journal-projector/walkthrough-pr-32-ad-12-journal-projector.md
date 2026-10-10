# Walkthrough: PR #32 — AD-12 journal and projector

Target: [PR #32](https://github.com/zhmachenkov-d/LinguaDS/pull/32) (`feat/1-2-ad-12-journal-projector` → `main`)
Plan: [story-ad-12-journal-and-projector-plan.md](../epic-platform-substrate/story-ad-12-journal-and-projector-plan.md)

Current block: **wrap-up**

## Blocks

- [x] **1 — Intent** — done (checklist shape; item 7 wording tightened)
- [x] **2 — Broad strokes** — done (typecheck + smoke 11/11)
- [x] **3 — Types & payload envelopes** — done (package exports widened)
- [x] **4 — Projector (`applyEvent`)** — done (plan.level + unknown-mode smoke)
- [x] **5 — Supervisor `commit*` API** — done (`commitEvidencePropose` payload-shaped)
- [x] **6 — Smoke & I/O matrix** — done (typecheck + smoke 12/12)
- [x] **7 — Periphery** — done (plan 11/11 note left; no sidecar/Cordis drift)

---

## 1 — Intent

Status: done · Changed during review: yes (shape → reviewer checklist; item 7 tightened)

Source: derived from plan Intent + PR #32 scope; reframed per reviewer request (verbatim → checklist). Constraint for later blocks: prefer checklist shape like PR #30.

For this PR to land, these must be true:

- [ ] All 11 closed `JournalEventType` values have typed minimal AD-12 payloads (`GateEval` on `level_advance`; Phase/handoff/attempt/finale/session_end envelopes).
- [ ] Projector covers every closed type on the same LearnerStore / `schema_version=1` path — no parallel journal or version bump for envelopes alone.
- [ ] `level_advance`: `path.level = to_level` only for `soft` / `conditional`; unchanged when `blocked`. `finale` is journal-only (+ `updated_at`); does not merge `next_step` into plan/path.
- [ ] Supervisor `commit*` helpers are the typed writer API; full-type smoke uses them (not raw `session.append`). Runtime `append` stays loosely shaped `Record`.
- [ ] Evidence merge stays id-upsert on `evidence_propose` (last delta wins); no projector-side status lattice.
- [ ] Keep `LessonRef[]` for plan `available` / `recommended`; PathPosition / NextStepPlan / ProfileSnapshot field identities unchanged.
- [ ] Smoke proves the I/O matrix: full closed-type fixture (includes a `blocked` `level_advance`), dedicated suite for `soft` / `conditional` path.level advance, journal-only isolation (+ `listEvents`), evidence upsert.

---

## 2 — Broad strokes

Status: done · Changed during review: yes (Test + Thoughts)

Mechanism (one line): Typed `commit*` → journal append → AD-12 projection on `schema_version=1`; smoke proves all 11 closed types + matrix.

A reviewer must open these in order and confirm each:

- [x] [english-path/src/ports/learner-store/types.ts](../../../english-path/src/ports/learner-store/types.ts) — AD-12/AD-10 payload + envelope types (`GateEval`, closed event payloads)
- [x] [english-path/src/ports/learner-store/project.ts](../../../english-path/src/ports/learner-store/project.ts) — `applyEvent` for all 11 closed types; `level_advance` / journal-only / evidence upsert
- [x] [english-path/src/supervisor/commit.ts](../../../english-path/src/supervisor/commit.ts) — typed `commit*` writer API for every closed type
- [x] [english-path/src/scripts/smoke.test.ts](../../../english-path/src/scripts/smoke.test.ts) — full-type fixture + matrix suites via `commit*`

---

## 3 — Types & payload envelopes

Status: done · Changed during review: yes (shape → checklist; package exports widened)

For typed AD-12/AD-10 envelopes to be complete, these must be true:

- [x] [types.ts:92](../../../english-path/src/ports/learner-store/types.ts#L92) — `GateEval`, `PhaseId`, `LevelAdvanceMode`, and closed-event payload interfaces present
- [x] PathPosition / NextStepPlan / ProfileSnapshot / EvidenceItem field identities unchanged; `LessonRef[]` kept for plan arrays
- [x] [learner-store/index.ts](../../../english-path/src/ports/learner-store/index.ts) — re-exports new payload types (incl. `EvidenceProposePayload`)
- [x] [english-path/src/index.ts](../../../english-path/src/index.ts) — package surface exports `commit*` helpers + payload types used by consumers (incl. `JournalEventType`, `PlanSetPayload`, `SessionStartPayload`, `EvidenceProposePayload`)

Review note: incomplete package-root type exports — **fixed** during review (`typecheck` + smoke 11/11).

---

## 4 — Projector (`applyEvent`)

Status: done · Changed during review: yes (shape → checklist; plan.level + unknown-mode smoke)

For projection behavior to match AD-12 decisions, these must be true:

- [x] [project.ts:137](../../../english-path/src/ports/learner-store/project.ts#L137) — closed-type switch covers journal-only events (`phase`, handoffs, `attempt`, `finale`, `session_end`)
- [x] `level_advance` — `soft` / `conditional` set `path.level = to_level`; `blocked` leaves path unchanged
- [x] Journal-only types do not alter path / plan / evidence except `updated_at` (incl. `finale.next_step` not merged)
- [x] Evidence merge remains id-upsert on `evidence_propose` only (no projector status lattice)

Review note: soft/conditional path vs plan skew — **documented + smoke-asserted** (`plan.level` stays `A0` while `path.level` advances). Unknown `mode` via loose append — **smoke-asserted** (path unchanged). `gate_evals` / `from_level` journal-only for projection — **accepted as-is**.

---

## 5 — Supervisor `commit*` API

Status: done · Changed during review: yes (shape → checklist; `commitEvidencePropose` normalized)

For the typed writer surface to be complete, these must be true:

- [x] [commit.ts](../../../english-path/src/supervisor/commit.ts) — one typed `commit*` helper per closed `JournalEventType` (incl. prefs/phase/handoffs/attempt/finale/level_advance/session_end)
- [x] Optional ISO-8601 UTC `at` forwarded into `session.append`
- [x] No parallel journal or `schema_version` fork; helpers wrap existing LearnerStore path
- [x] Full-type smoke uses `commit*` (not raw `append`); `commitJournal` / public `append` remain loose `Record` by design

Review note: public `append` / `commitJournal` vs sole-writer convention — **accepted as-is** (PR #30 precedent). `commitEvidencePropose` now takes `EvidenceProposePayload` — **fixed**.

---

## 6 — Smoke & I/O matrix

Status: done · Changed during review: yes (shape → checklist; review asserts; 12/12 re-verified)

For story verification to hold, these must be true:

- [x] Full closed-type fixture via `commit*` (incl. `listEvents` payload checks; blocked `level_advance` in the 11-type run)
- [x] Dedicated `level_advance` suite: soft/conditional (`path.level` + `plan.level` unchanged), blocked, unknown mode via loose append
- [x] Journal-only isolation + evidence upsert suites
- [x] `schema_version === 1` / no DDL change; `npm run typecheck` + `npm run smoke` green (**12/12** re-verified)

Review note: suite coverage matches Intent item 7 + review asserts; speech I/O matrix suites still pass unchanged.

---

## 7 — Periphery

Status: done · Changed during review: yes (shape → checklist; plan 11/11 note left as-is)

Confirm peripheral scope and docs:

- [x] [story-ad-12-journal-and-projector-plan.md](../epic-platform-substrate/story-ad-12-journal-and-projector-plan.md) — plan status `built`, triage / verification recorded (smoke count still says 11/11 — accepted as-is for this review)
- [x] No unintended changes: `english-path/sidecar/**`, speech ports, Cordis bundle pin / `cordis.patch.yml`
- [x] Review follow-ups still local (exports, smoke asserts, `commitEvidencePropose`, walkthrough folder) — commit/push when reviewer wants them on the PR
