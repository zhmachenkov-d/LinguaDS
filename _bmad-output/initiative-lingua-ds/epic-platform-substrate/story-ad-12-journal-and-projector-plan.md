---
title: "AD-12 journal and projector"
type: "feature"
ticket: "2"
created: "2026-10-09"
status: "built"
baseline_revision: "3fc59330a2cd4f5922f7493f23f83d0b37b0dd34"
route: "full"
route_source: "auto"
risk: "high"
review: "quick"
review_source: "pinned"
lenses_ran: ["quick"]
review_loop_iteration: 0
context:
  - "{project-root}/_bmad-output/initiative-lingua-ds/architecture-english-path/architecture-english-path.md"
  - "{project-root}/_bmad-output/initiative-lingua-ds/epic-platform-substrate/story-ad-12-journal-and-projector.md"
  - "{project-root}/_bmad-output/initiative-lingua-ds/epic-platform-substrate/story-tracer-harness-pin-and-substrate-path-plan.md"
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** Tracer LearnerStore accepts all 11 closed JournalEvent type names but only projects four (`session_start`, `prefs_set`, `plan_set`, `evidence_propose`); the rest append as journal no-ops without typed AD-12 envelopes or commit helpers, so later epics cannot rely on one persistence contract.

**Approach:** Complete typed minimal payloads and projector behavior for every closed event on the same LearnerStore / `schema_version=1` path, with a smoke fixture that commits each type via supervisor `commit*` helpers and asserts projected PathPosition, NextStepPlan, ProfileSnapshot, and EvidenceItem match AD-12.

**Decisions:**

- Keep `LessonRef[]` for `available` / `recommended` (tracer Design Notes + built plan).
- Keep `schema_version=1` under `persistence/` — no parallel journal, no version bump for envelope completion alone.
- Continuity: deepen `english-path/src/ports/learner-store/**` + supervisor commits + smoke; do not fork storage.
- `level_advance`: set `path.level = to_level` only when `mode` is `soft` or `conditional`; leave path unchanged when `blocked`.
- `finale`: journal-only + `updated_at` — does not merge `next_step` into plan/path.
- Append validation: trust typed supervisor helpers; runtime `append` stays loosely shaped `Record` (tracer style). Closed types enforced by TS `JournalEventType` + `commit*` signatures — no extra runtime reject for unknown type strings.
- Evidence merge (v1): keep tracer id-upsert on `evidence_propose` (field spread / last delta wins per id). AD-9 “no silent downgrade” means no status change without an `evidence_propose` event — do not add a separate lattice rejector in the projector.

## Boundaries & Constraints

**Always:**

- One LearnerStore append → project → cached snapshot path; `persistence/` owns `schema_version`.
- Closed event types and AD-12/AD-9/AD-10 minimal envelopes (incl. `GateEval` = `{ gate_id, critical, met, evidence_ids[] }`).
- Evidence: durable statuses `confirmed` | `unstable` | `goes_into_review`; closed `EvidenceKind` set; merge = id-upsert on `evidence_propose` only (see Decisions).
- Supervisor `commit*` helpers are the typed writer API; full-type smoke uses them (not raw `session.append`).
- ISO-8601 UTC `at` on journal rows; field identities exact (PathPosition `topic_id` vs plan `topic`).

**Never:**

- Parallel journal/schema, Session UX, coach pedagogy, CAP covers, multi-learner switch UI, Assess-IO, real speech engines.
- Touch speech sidecar / Cordis bundle packaging unless forced.
- Invent alternate PathPosition / NextStepPlan / ProfileSnapshot field names.
- Projector-side status-lattice rejection beyond id-upsert; runtime unknown-type reject beyond the TS union.

## I/O & Edge-Case Matrix

| Scenario                 | Input / State                                                          | Expected Output / Behavior                                                                                                       | Error Handling                                            |
| ------------------------ | ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| Full closed-type fixture | `commit*` each of 11 types with minimal AD-12 payloads for one learner | Snapshot exposes AD-12 PathPosition, NextStepPlan, EvidenceItem[]; prefs/voice_thresholds from `prefs_set`; `schema_version===1` | No error expected                                         |
| level_advance projection | `commitLevelAdvance` after a `plan_set`                                | `soft`/`conditional` → `path.level = to_level`; `blocked` → path unchanged                                                       | Typed helpers; no hard-reject append                      |
| Journal-only events      | `phase`, handoffs, `attempt`, `finale`, `session_end` via `commit*`    | Persist with typed payloads; path/plan/evidence unchanged except `updated_at`                                                    | Same                                                      |
| Evidence upsert          | Two `evidence_propose` deltas same `id`                                | One EvidenceItem per id; last delta fields win                                                                                   | v1: no delta filtering (helpers supply well-formed items) |
| Closed-type surface      | Call sites use `JournalEventType` / `commit*`                          | Non-closed type strings are not part of the public typed API                                                                     | Compile-time / helper signatures                          |

</frozen-after-approval>

## Code Map

- `english-path/src/ports/learner-store/types.ts` (+ re-exports from `index.ts`) — extend payload interfaces (`PhasePayload`, handoffs, `AttemptPayload`, `FinalePayload`, `LevelAdvancePayload`, `SessionEndPayload`, `PrefsSetPayload`, `GateEval`); keep envelope types
- `english-path/src/ports/learner-store/project.ts` — `applyEvent` cases for remaining types; `mergeEvidence` keep tracer id-upsert; reuse `asLessonRefs` / empty snapshot helpers
- `english-path/src/ports/learner-store/index.ts` — append/project path already correct; re-export new payload types; do not change DB layout
- `english-path/src/supervisor/commit.ts` — add typed `commit*` helpers for all closed types (mirror start/plan/evidence)
- `english-path/src/scripts/smoke.test.ts` — full-type fixture via `commit*`; assert matrix rows (envelopes, level_advance modes, journal-only, evidence upsert)
- `english-path/persistence/schema.sql` + `src/persistence/schema.ts` — leave `SCHEMA_VERSION=1` unless investigation forces DDL (prefer no change)
- `_bmad-output/.../architecture-english-path.md` AD-4/9/10/12 — authority for envelopes; do not edit architecture in this story
- Do not change: `sidecar/**`, `ports/speech-*`, `cordis.patch.yml`, bundle pin metadata

## Tasks & Acceptance

**Execution:**

- [x] `english-path/src/ports/learner-store/types.ts` (+ `index.ts` exports) -- add remaining AD-12/AD-10 payload + GateEval types; tighten unions (phase_id, level_advance mode); re-export new types -- typed envelopes for every closed event
- [x] `english-path/src/ports/learner-store/project.ts` -- project all closed types per Intent decisions; keep LessonRef[] + tracer evidence id-upsert (no lattice rejector) -- full AD-12 projector
- [x] `english-path/src/supervisor/commit.ts` -- typed commit helpers for every closed JournalEvent type -- supervisor-only write API
- [x] `english-path/src/scripts/smoke.test.ts` -- fixture commits each closed type via `commit*`; assert AD-12 envelopes + matrix rows (level_advance soft/blocked, journal-only updated_at-only, evidence upsert) -- story verify
- [x] `english-path/**` typecheck + smoke -- green on matrix + existing speech cases unchanged

**Acceptance Criteria:**

- Given a fresh learner DB at `schema_version=1`, when a full-type fixture commits each closed JournalEvent type via supervisor `commit*` helpers with minimal AD-12 payloads (order may include projection events; journal-only types must not alter path/plan/evidence), then projected ProfileSnapshot fields match the AD-12 table (PathPosition, NextStepPlan, EvidenceItem included), including prefs/voice_thresholds from `prefs_set`. Projection-sensitive cases (`level_advance` modes, journal-only isolation, evidence upsert) are asserted in separate smoke scenarios (ACs below), not only as end-state of one unordered dump.
- Given path/plan/evidence established by earlier commits, when `phase`, `handoff_grant`, `handoff_reclaim`, `attempt`, `finale`, or `session_end` is committed, then those snapshot fields are unchanged except `updated_at`.
- Given a prior `plan_set`, when `level_advance` is committed with `mode` `soft` or `conditional`, then `path.level` equals `to_level`; when `mode` is `blocked`, then `path` is unchanged.
- Given two `evidence_propose` commits with the same EvidenceItem `id`, when the snapshot is read, then one item remains for that id and fields match the later delta (tracer id-upsert; v1 does not filter malformed deltas).
- Given only the tracer LearnerStore path, when events are committed, then no second journal or schema_version fork exists.
- Given speech/smoke unrelated cases, when the suite runs, then speech stub behavior remains unchanged.

## Implementation Notes

- Extended `types.ts` with AD-12/AD-10 payloads (`PhasePayload`, handoffs, `AttemptPayload`, `FinalePayload`, `LevelAdvancePayload`, `SessionEndPayload`, `PrefsSetPayload`, `GateEval`) and closed unions (`PhaseId`, `LevelAdvanceMode`); re-exported from `learner-store/index.ts` and package `src/index.ts`.
- `project.ts`: journal-only types (`phase`, handoffs, `attempt`, `finale`, `session_end`) advance `updated_at` only; `level_advance` sets `path.level = to_level` for `soft`/`conditional`, unchanged for `blocked`; evidence merge unchanged (id-upsert).
- `supervisor/commit.ts`: typed `commit*` for all 11 closed types with optional ISO `at`; package exports updated.
- Smoke: full-type fixture via `commit*` (level_advance `blocked` in dump); separate scenarios for soft/conditional/blocked level advance, journal-only isolation, evidence upsert. Tracer I/O matrix + speech cases unchanged.
- Verification: `npm run typecheck` clean; `npm run smoke` — 11/11 pass (`schema_version` remains 1; no DDL changes).

## Plan Change Log

## Review Triage Log

- 2026-10-09 / quick / smoke full-type + journal-only — never `listEvents()` to assert 11 types and typed payloads persisted; snapshot-only checks — **medium** — verified: journal-only loop asserts path/plan/evidence + final `updated_at` only; intermediate `commit*` could fail to append and still pass if last event stamps `updated_at`; matrix row requires persist with typed payloads — route **patch**
- 2026-10-09 / quick / smoke full-type — EvidenceItem/NextStepPlan asserts omit `kind`/`status`/`updated_at` and LessonRef `label` — **low** — verified: full fixture checks evidence `id` and plan lengths/`lesson_id` only; AD-12 table includes those fields; upsert/tracer cases cover some but not this AC fixture — route **patch**
- 2026-10-09 / quick / `index.ts` missing `EvidenceProposePayload` export — **false** — verified: plan task re-exports _new_ payload types; `EvidenceProposePayload` was defined but unexported before this change; all new AD-12 payloads are exported

## Design Notes

- Tracer already projects four types; this story fills the remaining seven plus typed payloads/helpers — deepen in place.
- Events with no ProfileSnapshot-owned fields still must journal typed payloads and advance `updated_at` so the audit trail is complete.
- `GateEval` shape is locked by AD-10; store it on `level_advance` payload even if snapshot does not yet surface gate rows (Assess projection later).
- Smoke proves the supervisor write path: import `commit*` from `supervisor/commit.ts` (or package export) rather than calling `session.append` in the full-type fixture.

## Verification

**Commands:**

- `cd english-path && npm run typecheck` -- clean
- `cd english-path && npm run smoke` -- journal full-type fixture + existing speech/DB cases pass
