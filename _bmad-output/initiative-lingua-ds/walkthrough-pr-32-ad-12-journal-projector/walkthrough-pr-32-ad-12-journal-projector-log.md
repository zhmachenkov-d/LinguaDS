# Review log: PR #32 AD-12 journal and projector

Target: https://github.com/zhmachenkov-d/LinguaDS/pull/32

## 1 — orientation — walkthrough started

Session: ecc168dd-594b-4201-b40a-aca561eaf9e3 · Timestamp: 2026-10-09T20:02:00+03:00

- Action: Created walkthrough directory and narrative scaffold; initialized append-only log
- Result: Walkthrough started; awaiting target confirmation (proposed PR #32)
- Evidence: narrative + plan links
- Open: User confirmation of PR #32 as review target

## 2 — orientation — target confirmed

Session: ecc168dd-594b-4201-b40a-aca561eaf9e3 · Timestamp: 2026-10-09T20:04:00+03:00

- Action: User confirmed PR #32 as walkthrough target
- Result: Target locked; narrative filled from plan Intent + PR file set; current block = 1 Intent
- Evidence: https://github.com/zhmachenkov-d/LinguaDS/pull/32; story-ad-12-journal-and-projector-plan.md
- Open: none

## 3 — narrative — scaffold completed

Session: ecc168dd-594b-4201-b40a-aca561eaf9e3 · Timestamp: 2026-10-09T20:05:00+03:00

- Action: Wrote full block shapes (Intent verbatim, Broad strokes entry points, slices 3–6, Periphery); renamed log to walkthrough-*-log.md
- Result: Narrative ready; presenting block 1 Intent to reviewer
- Evidence: walkthrough-pr-32-ad-12-journal-projector.md
- Open: none

## 4 — 1 Intent — Thoughts

Session: ecc168dd-594b-4201-b40a-aca561eaf9e3 · Timestamp: 2026-10-09T21:29:00+03:00

- Action: User chose Thoughts; pressure-tested Intent Decisions against PR implementation
- Result: No Decision found wrong for this PR. Soft notes (open for reviewer, not dispositioned): (1) level_advance updates path.level only — plan.level can drift; (2) commitJournal still loose Record bypass of typed helpers; (3) evidence id-upsert can overwrite status without lattice. All three match stated Decisions.
- Evidence: english-path/src/ports/learner-store/project.ts level_advance + finale cases; english-path/src/supervisor/commit.ts commitJournal; plan Intent Decisions
- Open: reviewer accepts Intent or reshapes; soft notes optional follow-ups

## 5 — 1 Intent — reshape

Session: ecc168dd-594b-4201-b40a-aca561eaf9e3 · Timestamp: 2026-10-09T21:30:00+03:00

- Action: User chose Reshape (move 2); reframed Intent as reviewer checklist
- Result: Constraint recorded — later blocks prefer checklist shape (PR #30 style). Intent still in progress, not done.
- Evidence: walkthrough-pr-32-ad-12-journal-projector.md §1
- Open: reviewer accepts checklist items or Done to Broad strokes

## 6 — 1 Intent — Thoughts (checklist)

Session: ecc168dd-594b-4201-b40a-aca561eaf9e3 · Timestamp: 2026-10-09T21:31:00+03:00

- Action: User chose Thoughts on checklist-shaped Intent
- Result: Checklist items hold against code. Soft notes: (1) commitJournal still bypasses typed helpers — item 4 acknowledges loose Record; (2) level_advance does not sync plan.level — item 3 only claims path.level; (3) smoke full fixture uses mode blocked so soft/conditional path.level advance is covered in separate suite not full fixture. No checklist item found false.
- Evidence: project.ts, commit.ts, smoke.test.ts AD-12 suites
- Open: Done or edit item wording

## 7 — 1 Intent — edit item 7

Session: ecc168dd-594b-4201-b40a-aca561eaf9e3 · Timestamp: 2026-10-09T21:33:00+03:00

- Action: User chose tighten item 7 wording
- Result: Item 7 now states full fixture uses blocked level_advance; soft/conditional covered in dedicated suite. Intent still in progress.
- Evidence: walkthrough-pr-32-ad-12-journal-projector.md §1 item 7
- Open: Done or further wording edits

## 8 — 1 Intent — done → Broad strokes

Session: ecc168dd-594b-4201-b40a-aca561eaf9e3 · Timestamp: 2026-10-09T21:34:00+03:00

- Action: User accepted Intent (Done)
- Result: Intent marked done; current block = 2 Broad strokes. Soft notes from Thoughts left open (not dispositioned as findings).
- Evidence: walkthrough-pr-32-ad-12-journal-projector.md
- Open: ask user whether to commit untracked walkthrough folder

## 9 — 2 Broad strokes — Test

Session: ecc168dd-594b-4201-b40a-aca561eaf9e3 · Timestamp: 2026-10-09T21:35:00+03:00

- Action: User chose Test; running npm run typecheck && npm run smoke in english-path
- Result: (pending — filled after commands)
- Evidence: english-path package scripts
- Open: none

## 10 — 2 Broad strokes — Test result

Session: ecc168dd-594b-4201-b40a-aca561eaf9e3 · Timestamp: 2026-10-09T21:35:30+03:00

- Action: Completed typecheck + smoke in english-path
- Result: typecheck pass; smoke 11/11 pass (0 fail), including AD-12 full-type, level_advance, journal-only, evidence upsert
- Evidence: `cd english-path && npm run typecheck && npm run smoke`
- Open: Broad strokes still in progress; commit walkthrough folder still undecided

## 11 — 2 Broad strokes — Thoughts

Session: ecc168dd-594b-4201-b40a-aca561eaf9e3 · Timestamp: 2026-10-09T21:36:00+03:00

- Action: Skimmed four Broad strokes entry points for mechanism gaps
- Result: Mechanism intact types→commit*→project→smoke. No new gap vs Intent soft notes. Package re-exports commit* + GateEval from english-path/src/index.ts.
- Evidence: types.ts:92+, project.ts:137+, commit.ts:38+, smoke.test.ts imports commit*
- Open: Done or deeper slice review

## 12 — 2 Broad strokes — done → Types

Session: ecc168dd-594b-4201-b40a-aca561eaf9e3 · Timestamp: 2026-10-09T21:36:30+03:00

- Action: User accepted Broad strokes (Done)
- Result: Broad strokes marked done (Test 11/11 + Thoughts); current block = 3 Types & payload envelopes (checklist shape)
- Evidence: walkthrough-pr-32-ad-12-journal-projector.md
- Open: walkthrough folder still untracked; commit undecided

## 13 — 3 Types — Thoughts

Session: ecc168dd-594b-4201-b40a-aca561eaf9e3 · Timestamp: 2026-10-09T21:37:00+03:00

- Action: Checked export completeness and field-identity drift
- Result: Envelope identities hold (PathPosition topic_id vs plan topic; LessonRef[]). Soft finding: package index.ts omits JournalEventType, PlanSetPayload, SessionStartPayload (and EvidenceProposePayload not re-exported from learner-store either) while learner-store/index exports most payloads. Not a story AC miss if consumers use learner-store path; checklist item 4 is only partially met at package root.
- Evidence: english-path/src/index.ts:87-104; learner-store/index.ts:131-151; types.ts:19-85
- Open: accept as-is, or ask to widen package exports before Done

## 14 — 3 Types — fix package exports

Session: ecc168dd-594b-4201-b40a-aca561eaf9e3 · Timestamp: 2026-10-09T21:38:00+03:00

- Action: User chose widen package exports; added missing type re-exports
- Result: Finding fixed. learner-store + package index now export EvidenceProposePayload, JournalEventType, PlanSetPayload, SessionStartPayload. typecheck pass; smoke 11/11.
- Evidence: english-path/src/index.ts; english-path/src/ports/learner-store/index.ts
- Open: Types block still in progress — Done when reviewer accepts

## 15 — 3 Types — Thoughts (further)

Session: ecc168dd-594b-4201-b40a-aca561eaf9e3 · Timestamp: 2026-10-09T21:39:00+03:00

- Action: Further Thoughts after export fix
- Result: Checklist items satisfied. Remaining soft: LessonRef / EvidenceKind / EvidenceStatus / LearnerSession not on package surface (constructors can use EvidenceItem + nested inference). PlanSetPayload omits optional AD-12 internals (blocks[], length_min, …) — intentional minimal. GateEval matches AD-10.
- Evidence: types.ts; index.ts export type block; architecture AD-12 table
- Open: Done, or widen LessonRef/EvidenceKind/EvidenceStatus/LearnerSession too

## 16 — 3 Types — done → Projector

Session: ecc168dd-594b-4201-b40a-aca561eaf9e3 · Timestamp: 2026-10-09T21:39:30+03:00

- Action: User accepted Types (Done); LessonRef/EvidenceKind/Session exports left unexported (accepted as optional)
- Result: Types done; current block = 4 Projector (checklist). Working tree dirty: export fixes + untracked walkthrough.
- Evidence: walkthrough-pr-32-ad-12-journal-projector.md; english-path/src/index.ts
- Open: commit undecided

## 17 — 4 Projector — Thoughts

Session: ecc168dd-594b-4201-b40a-aca561eaf9e3 · Timestamp: 2026-10-09T21:40:00+03:00

- Action: Thoughts on path/plan drift, updated_at, gate_evals
- Result: Checklist holds. Soft: (1) soft/conditional advances path.level only — plan.level can skew; smoke soft suite does not assert plan unchanged. (2) updated_at set for every event before switch (project.ts:88) — journal-only correct. (3) gate_evals + from_level persisted but ignored by projector; mode is sole projection input — matches Intent (supervisor decides mode at commit).
- Evidence: project.ts:76-155; smoke.test.ts level_advance suite
- Open: accept soft notes as-is or ask smoke assert plan.level after soft advance

## 18 — 4 Projector — smoke plan.level assert

Session: ecc168dd-594b-4201-b40a-aca561eaf9e3 · Timestamp: 2026-10-09T21:40:30+03:00

- Action: Added assert snapshot.plan.level === 'A0' after soft/conditional level_advance
- Result: Smoke 11/11. Soft finding disposition: documented + smoke-asserted. gate_evals ignored — accepted as-is.
- Evidence: english-path/src/scripts/smoke.test.ts level_advance suite
- Open: Projector still in progress — Done when reviewer accepts

## 19 — 4 Projector — Thoughts (further)

Session: ecc168dd-594b-4201-b40a-aca561eaf9e3 · Timestamp: 2026-10-09T21:41:00+03:00

- Action: Further Thoughts on projector edge cases
- Result: No new blockers. Soft: (1) unknown mode via loose append acts like blocked (no path change). (2) soft advance touches only path.level — topic_id/lesson_id unchanged. (3) mergeEvidence does not validate kind/status (trust commit*). Matches Intent append-validation decision.
- Evidence: project.ts applyEvent + mergeEvidence
- Open: Done or more smoke for unknown mode

## 20 — 4 Projector — unknown mode smoke

Session: ecc168dd-594b-4201-b40a-aca561eaf9e3 · Timestamp: 2026-10-09T21:42:00+03:00

- Action: Added smoke: unknown level_advance mode via session.append leaves path/plan.level unchanged
- Result: Smoke 12/12. Soft finding disposition: smoke-asserted.
- Evidence: english-path/src/scripts/smoke.test.ts AD-12 level_advance suite
- Open: Projector still in progress — Done when reviewer accepts

## 21 — 4 Projector — done → commit*

Session: ecc168dd-594b-4201-b40a-aca561eaf9e3 · Timestamp: 2026-10-09T21:43:00+03:00

- Action: User accepted Projector (Done)
- Result: Projector done; current block = 5 Supervisor commit* (checklist). Smoke now 12/12 with review asserts.
- Evidence: walkthrough-pr-32-ad-12-journal-projector.md; smoke.test.ts
- Open: commit review code + walkthrough still undecided

## 22 — 5 commit* — Thoughts

Session: ecc168dd-594b-4201-b40a-aca561eaf9e3 · Timestamp: 2026-10-09T21:43:30+03:00

- Action: Thoughts on sole-writer convention vs public append
- Result: Checklist holds for typed helpers. Soft finding unchanged from PR #30: LearnerSession.append + commitJournal(Record) remain public; sole-writer is convention/docs not enforcement. Intent Decision already chose trust commit* + loose append. Minor API asymmetry: commitEvidencePropose(deltas[]) vs other helpers taking payload objects.
- Evidence: commit.ts; learner-store LearnerSession.append; PR #30 walkthrough accepted-as-is note
- Open: accept as-is (PR #30 precedent) or harden (hide append / drop commitJournal export)

## 23 — 5 commit* — normalize evidence + done → Smoke

Session: ecc168dd-594b-4201-b40a-aca561eaf9e3 · Timestamp: 2026-10-09T21:44:00+03:00

- Action: Normalized commitEvidencePropose to EvidenceProposePayload; updated smoke call sites; user Done
- Result: Finding fixed. sole-writer soft finding accepted as-is. typecheck+smoke 12/12. Current block = 6 Smoke & I/O matrix.
- Evidence: commit.ts; smoke.test.ts
- Open: commit review changes undecided

## 24 — 6 Smoke — Test

Session: ecc168dd-594b-4201-b40a-aca561eaf9e3 · Timestamp: 2026-10-09T21:46:00+03:00

- Action: Re-ran typecheck + smoke for Smoke & I/O matrix block
- Result: typecheck pass; smoke 12/12 pass (0 fail). Checklist items marked verified in narrative.
- Evidence: `cd english-path && npm run typecheck && npm run smoke`
- Open: Done → Periphery, or further Thoughts

## 25 — 6 Smoke — Thoughts (matrix gap-check)

Session: ecc168dd-594b-4201-b40a-aca561eaf9e3 · Timestamp: 2026-10-09T21:46:30+03:00

- Action: Gap-checked smoke vs Intent item 7 + plan I/O matrix
- Result: All matrix rows covered. Closed-type surface is compile-time only (no runtime smoke) — expected. Review extras beyond matrix: plan.level after soft, unknown mode. No persistence DDL in PR. No gaps requiring more tests.
- Evidence: plan I/O matrix; smoke AD-12 suites; SCHEMA_VERSION=1
- Open: Done → Periphery

## 26 — 6 Smoke — done → Periphery

Session: ecc168dd-594b-4201-b40a-aca561eaf9e3 · Timestamp: 2026-10-09T21:47:00+03:00

- Action: User accepted Smoke (Done)
- Result: Smoke done; current block = 7 Periphery. Working tree still dirty with review fixes + untracked walkthrough.
- Evidence: walkthrough narrative; git status
- Open: Periphery checklist; commit/push undecided

## 27 — 7 Periphery — done → wrap-up

Session: ecc168dd-594b-4201-b40a-aca561eaf9e3 · Timestamp: 2026-10-09T21:47:30+03:00

- Action: User accepted Periphery (Done); left plan Verification 11/11 note as-is
- Result: All blocks done; current = wrap-up. Dirty: review code fixes + untracked walkthrough folder.
- Evidence: walkthrough-pr-32-ad-12-journal-projector.md; git status
- Open: Wrap-up — commit/push review fixes, merge PR #32, bump plan smoke count optional

## 28 — wrap-up — commit and push

Session: ecc168dd-594b-4201-b40a-aca561eaf9e3 · Timestamp: 2026-10-09T21:48:00+03:00

- Action: User chose Wrap-up; commit+push review fixes (exports, smoke asserts, commitEvidencePropose payload, walkthrough). Stripped accidental formatter noise before commit.
- Result: pending push
- Evidence: english-path src + walkthrough-pr-32 folder
- Open: merge PR #32 after push (ask user)

## 29 — wrap-up — pushed

Session: ecc168dd-594b-4201-b40a-aca561eaf9e3 · Timestamp: 2026-10-09T21:49:00+03:00

- Action: Pushed e4e349c to feat/1-2-ad-12-journal-projector
- Result: Review fixes + walkthrough on PR #32. Working tree clean after push except this log append if uncommitted.
- Evidence: https://github.com/zhmachenkov-d/LinguaDS/pull/32 ; commit e4e349c
- Open: merge PR #32?
