# Review log: PR #30 english-path substrate

Target: https://github.com/zhmachenkov-d/LinguaDS/pull/30

## 1 — orientation — target locked

Session: unavailable · Timestamp: 2026-10-09T11:52:00+03:00

- Action: Locked walkthrough target to PR #30; narrative scaffolded from story plan Intent + PR files
- Result: Target accepted; current block = Intent; no findings yet
- Evidence: PR #30; epic-platform-substrate/story-tracer-harness-pin-and-substrate-path-plan.md
- Open: User acceptance of Intent block

## 2 — Intent — Thoughts

Session: unavailable · Timestamp: 2026-10-09T12:05:00+03:00

- Action: Compared PR #30 body/diff to story-plan Intent (Problem/Approach/Decisions)
- Result: Strong match — installable english-path bundle, pins (dsh 0.2.0-rc.2, cordis 4.0.4, better-sqlite3 13.0.3), journal→projection, stdio JSON-lines SpeechIn/Out stubs, no engines. Soft gap only: Harness load proof still HITL/unchecked in PR test plan; smoke covers I/O matrix not full dsh profile load. Disposition: open for reviewer (not a Intent mismatch).
- Evidence: english-path/package.json; english-path/sidecar/main.py; english-path/src/ports/shared/sidecar-client.ts; PR #30 summary/test plan
- Open: User acceptance of Intent block

## 3 — Intent — rewrite shape

Session: unavailable · Timestamp: 2026-10-09T12:07:00+03:00

- Action: User rejected plan-verbatim Intent; chose reviewer-checklist shape
- Result: Constraint for remainder of review: prefer reviewer-checklist framing ("what must be true") over long prose when presenting blocks. Intent rewritten accordingly.
- Evidence: walkthrough-pr-30-english-path-substrate.md §1
- Open: User acceptance of Intent block

## 4 — Intent — Thoughts (checklist)

Session: unavailable · Timestamp: 2026-10-09T12:10:00+03:00

- Action: Tick each Intent checklist item against PR #30 tree
- Result: 5/6 satisfied in code; item 6 (Harness HITL load proof) still open/unchecked in PR test plan — disposition open for reviewer acceptance
- Evidence: english-path/package.json; learner-store/project.ts; sidecar/main.py; smoke.test.ts; PR test plan
- Open: User acceptance of Intent block

## 5 — Intent — item 6 deferred

Session: unavailable · Timestamp: 2026-10-09T12:11:00+03:00

- Action: User accepted Intent checklist item 6 (Harness HITL load proof) as deferred
- Result: Disposition deferred — not a merge blocker for this review; narrative checkbox marked done with deferred note
- Evidence: walkthrough-pr-30-english-path-substrate.md §1 item 6; PR #30 HITL test-plan checkbox
- Open: User acceptance of Intent block as a whole

## 6 — Intent — done; Broad strokes opened

Session: unavailable · Timestamp: 2026-10-09T12:20:00+03:00

- Action: User marked Intent done; advanced to Broad strokes; reframed Broad strokes as ordered entry-point checklist
- Result: Intent accepted (item 6 deferred earlier). Current block = Broad strokes. Dirty tree: untracked walkthrough-pr-30-english-path-substrate/ — ask commit.
- Evidence: walkthrough-pr-30-english-path-substrate.md
- Open: Broad strokes review; whether to commit walkthrough artifacts

## 7 — Broad strokes — Thoughts

Session: unavailable · Timestamp: 2026-10-09T12:21:00+03:00

- Action: Walked five Broad-strokes entry points for mechanism coherence
- Result: All five check out. Soft note: apply() inlines SpeechIn/Out on shared SidecarClient while createSpeechIn/Out factories are also exported (dual path, not harmful). Disposition: accepted as-is unless reviewer objects.
- Evidence: english-path/package.json; cordis.patch.yml; src/index.ts; learner-store/index.ts; sidecar-client.ts
- Open: Broad strokes acceptance

## 8 — Broad strokes — focus apply()

Session: unavailable · Timestamp: 2026-10-09T12:50:00+03:00

- Action: User said apply; interpreted as focus on Cordis apply() entry (Broad strokes #3)
- Result: apply provides englishPath and effect-dispose; inlines speech ports on shared SidecarClient. No findings. If user meant something else (Done / jump to block 3 / check narrative boxes), await clarification.
- Evidence: english-path/src/index.ts:58-67
- Open: Broad strokes still current

## 9 — Broad strokes — Test

Session: unavailable · Timestamp: 2026-10-09T12:52:00+03:00

- Action: Ran `cd english-path && npm run smoke && npm run typecheck`
- Result: smoke 6/6 pass (journal happy path, missing DB create + fail-closed, speech stub round-trip + no SQLite write, sidecar down soft-fail); typecheck clean. Unverified: HITL dsh profile load (deferred earlier).
- Evidence: english-path/src/scripts/smoke.test.ts; command exit 0
- Open: Broad strokes acceptance

## 10 — Broad strokes done; block 3 opened

Session: unavailable · Timestamp: 2026-10-09T12:52:30+03:00

- Action: User marked Broad strokes done after Thoughts/Test; opened Bundle load & Cordis apply as checklist
- Result: Block 2 accepted. Current = block 3. Dirty tree still has untracked walkthrough folder.
- Evidence: walkthrough-pr-30-english-path-substrate.md; smoke 6/6 earlier
- Open: Block 3 review; commit walkthrough artifacts?

## 11 — Bundle load — Thoughts

Session: unavailable · Timestamp: 2026-10-09T13:27:00+03:00

- Action: Ticked block 3 checklist (dsh.bundle, patch package-name row, apply provide/dispose, name match)
- Result: All four met in tree. HITL dsh load still deferred (not reopened). No new findings.
- Evidence: english-path/package.json; cordis.patch.yml; src/index.ts apply
- Open: Block 3 acceptance

## 12 — Bundle load done; LearnerStore opened

Session: unavailable · Timestamp: 2026-10-09T14:27:00+03:00

- Action: User marked block 3 done; opened block 4 as checklist
- Result: Current = LearnerStore journal→projection. Walkthrough folder still untracked.
- Evidence: walkthrough-pr-30-english-path-substrate.md
- Open: Block 4 review; commit?

## 13 — LearnerStore — Thoughts

Session: unavailable · Timestamp: 2026-10-09T16:57:00+03:00

- Action: Ticked block 4 checklist against commit/store/project/types/db/schema
- Result: All six mechanism items met. Soft finding: commit.ts is documented sole writer but LearnerSession.append is public — convention not enforced (open, accepted-as-is unless reviewer objects). Unused journal event types no-op in project switch — expected for thin seed.
- Evidence: supervisor/commit.ts; learner-store/index.ts append; project.ts applyEvent; persistence/db.ts; schema.sql
- Open: Block 4 acceptance

## 14 — LearnerStore — soft finding accepted as-is

Session: unavailable · Timestamp: 2026-10-09T16:58:00+03:00

- Action: User accepted soft finding (public LearnerSession.append vs commit* sole-writer convention)
- Result: Disposition accepted as-is — not a merge blocker; no code change requested
- Evidence: english-path/src/ports/learner-store/index.ts append; supervisor/commit.ts comment
- Open: Block 4 acceptance

## 15 — LearnerStore — Test

Session: unavailable · Timestamp: 2026-10-09T17:05:00+03:00

- Action: Ran `cd english-path && npm run smoke` for block 4
- Result: 6/6 pass. LearnerStore-relevant: journal happy path + missing DB create + fail-closed. Note: smoke uses session.append not commit* (consistent with accepted soft finding). Speech suites incidental for this block.
- Evidence: english-path/src/scripts/smoke.test.ts:29-84; command exit 0
- Open: Block 4 acceptance

## 16 — LearnerStore done; Speech opened

Session: unavailable · Timestamp: 2026-10-09T17:06:00+03:00

- Action: User marked block 4 done; opened block 5 Speech sidecar as checklist
- Result: Current = Speech sidecar IPC stubs. Soft finding remains accepted as-is. If ## 15 Test missing, also append it (smoke 6/6, journal via append not commit*).
- Evidence: walkthrough-pr-30-english-path-substrate.md
- Open: Block 5; commit walkthrough folder?

## 17 — Speech — Thoughts

Session: unavailable · Timestamp: 2026-10-09T17:07:00+03:00

- Action: Ticked block 5 speech IPC checklist
- Result: All five met. Soft note: protocol allows optional error field on fail paths beyond score/band/fail — consistent with deepen-in-place, not a second transport. Disposition: accepted as-is unless reviewer objects.
- Evidence: sidecar-client.ts; sidecar/main.py; smoke.test.ts speech suites
- Open: Block 5 acceptance

## 18 — Speech — soft note accepted as-is

Session: unavailable · Timestamp: 2026-10-09T17:09:00+03:00

- Action: User accepted soft note (optional error field on fail paths)
- Result: Disposition accepted as-is — not a merge blocker
- Evidence: english-path/sidecar/main.py fail responses; narrative §5 review note
- Open: Block 5 acceptance

## 19 — Speech — Test

Session: unavailable · Timestamp: 2026-10-09T17:09:30+03:00

- Action: Ran `cd english-path && npm run smoke` for block 5
- Result: 6/6 pass. Speech-relevant: round-trip score/band/fail; no SQLite write; sidecar forceDown soft-fail. Soft note (optional error) already accepted as-is.
- Evidence: smoke.test.ts speech suites; exit 0
- Open: Block 5 acceptance

## 20 — Speech done; Periphery opened

Session: unavailable · Timestamp: 2026-10-09T17:14:00+03:00

- Action: User marked block 5 done; opened block 6 Periphery as checklist
- Result: Current = Periphery (last block). Walkthrough folder still untracked.
- Evidence: walkthrough-pr-30-english-path-substrate.md
- Open: Block 6; then wrap-up; commit?

## 21 — Periphery — Thoughts

Session: unavailable · Timestamp: 2026-10-09T17:15:00+03:00

- Action: Ticked periphery checklist
- Result: All seven items met. Soft note: also ports/assess/.gitkeep if present — structural seed. No blockers.
- Evidence: README.md; persistence/README.md; tsconfig; gitignores; plan status built; gitkeeps under src/
- Open: Block 6 Done / Wrap-up

## 22 — Periphery done; suggest wrap-up

Session: unavailable · Timestamp: 2026-10-09T17:15:30+03:00

- Action: User marked last block done; all six blocks accepted
- Result: Review ready for Wrap-up. Deferred HITL dsh load; accepted-as-is: public append, optional error. Untracked walkthrough folder.
- Evidence: narrative all blocks checked
- Open: Wrap-up — merge PR #30? commit walkthrough artifacts?
