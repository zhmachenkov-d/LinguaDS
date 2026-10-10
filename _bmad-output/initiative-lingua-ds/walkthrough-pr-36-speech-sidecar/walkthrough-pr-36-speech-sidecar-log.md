# Review log: walkthrough-pr-36-speech-sidecar

Target: PR #36 https://github.com/zhmachenkov-d/LinguaDS/pull/36 (story 1.4 speech sidecar / SpeechIn; before merge)

## 1 — orientation — target confirmed

Session: 2dcc6399-e917-4b14-8741-c2bfe82fce49 · Timestamp: 2026-10-10T11:24:00+03:00

- Action: Confirmed walkthrough target as open PR #36 for story 1.4; purpose before-merge review
- Result: Target locked; narrative skeleton created; current block Intent
- Evidence: https://github.com/zhmachenkov-d/LinguaDS/pull/36 ; plan story-speech-sidecar-and-speechin-adapter-plan.md
- Open: User acceptance of Intent block

## 2 — Intent — Thoughts

Session: 2dcc6399-e917-4b14-8741-c2bfe82fce49 · Timestamp: 2026-10-10T11:25:30+03:00

- Action: Compared plan Intent decisions to PR #36 file set and key symbols (ready/timeouts/bands/pin/smoke)
- Result: Intent matches PR scope; all six Decisions appear implemented; no Intent conflict found. Extra PR items (dispose-during-ready, stderr drain) are compatible extras, not Intent drift.
- Evidence: sidecar-client.ts READY_WAIT_MS/DEFAULT_REQUEST_TIMEOUT_MS/resolvePythonPath; main.py BAND_* + ready emit; pyproject faster-whisper==1.2.1; smoke fixture + soft-fail suites
- Open: User acceptance of Intent block

## 3 — Intent — Test

Session: 2dcc6399-e917-4b14-8741-c2bfe82fce49 · Timestamp: 2026-10-10T11:26:30+03:00

- Action: Ran PR #36 test plan checks relevant to Intent (venv present, fixture, gitignore/README env docs, typecheck, smoke)
- Result: All green. typecheck OK. smoke 16/16 pass (fixture SpeechIn accept, text-only/missing soft-fail, no-SQLite, forceDown, ready-timeout, dispose). sidecar/.venv Python 3.12.15 present; clear-english.wav + RIGHTS present; .gitignore has sidecar/.venv/; README documents uv bootstrap + ENGLISH_PATH_*
- Evidence: `cd english-path && npm run typecheck`; `npm run smoke` → 16 pass / 0 fail; english-path/sidecar/.venv/bin/python; english-path/.gitignore:7; english-path/README.md env table
- Open: User acceptance of Intent block; CI not checked in this move

## 4 — Intent — Test (CI)

Session: 2dcc6399-e917-4b14-8741-c2bfe82fce49 · Timestamp: 2026-10-10T11:27:30+03:00

- Action: Checked GitHub CI for PR #36 (gh pr checks, check-runs on head SHA, Actions workflows/runs)
- Result: No CI to evaluate — zero check runs on head ecdd846; no Actions workflows/runs in repo; statusCheckRollup empty. Local smoke remains the only automated evidence.
- Evidence: `gh pr checks 36` → no checks; `gh run list` empty; no `.github/workflows` in tree
- Open: Accept Intent without remote CI, or require workflow before merge (product decision)

## 5 — Intent — accepted

Session: 2dcc6399-e917-4b14-8741-c2bfe82fce49 · Timestamp: 2026-10-10T11:28:00+03:00

- Action: User accepted Intent block (done)
- Result: Intent closed; advanced to Broad strokes. Constraint noted: merge without remote CI accepted for this review (no workflows in repo)
- Evidence: user said done after Thoughts + Test + CI look
- Open: Broad strokes review

## 6 — Broad strokes — Thoughts

Session: 2dcc6399-e917-4b14-8741-c2bfe82fce49 · Timestamp: 2026-10-10T11:29:30+03:00

- Action: Walked five Broad strokes entry points for mechanism clarity
- Result: Entry set is sufficient to understand mechanism in order. Note: production shared SidecarClient lives in index.ts createEnglishPath (not createSpeechIn); speech-in/index.ts is the thin port used by forceDown smoke / exports. Not Intent conflict; optional narrative tweak if reviewer wants index.ts in the five.
- Evidence: main.py:1-10,124-132; pyproject.toml pin; sidecar-client.ts:12-13,42-65; speech-in/index.ts:11-20; smoke.test.ts:156-283; index.ts:48-55
- Open: User accept Broad strokes or ask to swap/add index.ts

## 7 — Broad strokes — rewrite entry 4

Session: 2dcc6399-e917-4b14-8741-c2bfe82fce49 · Timestamp: 2026-10-10T11:30:30+03:00

- Action: Per user, replaced Broad strokes entry 4 speech-in/index.ts with index.ts (shared SidecarClient ownership)
- Result: Constraint for later: prefer production wiring (createEnglishPath) over thin createSpeechIn in top-level entry maps
- Evidence: narrative §2 Broad strokes
- Open: User acceptance of Broad strokes

## 8 — Broad strokes — Test

Session: 2dcc6399-e917-4b14-8741-c2bfe82fce49 · Timestamp: 2026-10-10T11:31:30+03:00

- Action: Re-ran typecheck + smoke as end-to-end proof of Broad strokes entry chain (main.py → pin → SidecarClient → createEnglishPath → smoke)
- Result: typecheck OK; smoke 16/16 pass. Shared client wiring confirmed at index.ts:48-55.
- Evidence: `cd english-path && npm run typecheck && npm run smoke`; index.ts:48-55
- Open: User acceptance of Broad strokes

## 9 — Broad strokes — accepted

Session: 2dcc6399-e917-4b14-8741-c2bfe82fce49 · Timestamp: 2026-10-10T11:32:00+03:00

- Action: User accepted Broad strokes (done)
- Result: Closed; advanced to Sidecar SpeechIn engine. Constraint retained: prefer createEnglishPath/index.ts in top-level entry maps
- Evidence: user said done after Thoughts rewrite + Test
- Open: Block 3 review

## 10 — Sidecar SpeechIn engine — Formal review (gather)

Session: 2dcc6399-e917-4b14-8741-c2bfe82fce49 · Timestamp: 2026-10-10T11:33:30+03:00

- Action: Started bmad-code-review (quick) for PR #36; wrote diff/claims temps; loaded plan + context; halted at gather checkpoint
- Result: Diff 11 files / +1302 −83 (~1706 lines); review_mode=full; awaiting user confirm to run lenses
- Evidence: /tmp/pr36-review-kCDG6d.diff; plan story-speech-sidecar-and-speechin-adapter-plan.md
- Open: User confirm proceed with formal review

## 11 — Sidecar SpeechIn engine — Formal review (triage)

Session: 2dcc6399-e917-4b14-8741-c2bfe82fce49 · Timestamp: 2026-10-10T11:35:00+03:00

- Action: Ran quick lens; triaged 3 findings
- Result: 0 decision / 2 patch / 0 defer / 1 rejected. Patch: (1) ready-timeout teardown race clears pending/ready for successor child; (2) ready-timeout smoke lacks assert on DEFAULT_VENV_PYTHON. Rejected: optional error not on SpeechBandResult (low / intentional thin port).
- Evidence: sidecar-client.ts exit handler L220-229; smoke.test.ts L249-268; plan Code Review section pending write
- Open: User choice on patch handling (code-review step 4)

## 12 — Sidecar SpeechIn engine — Formal review (patches applied)

Session: 2dcc6399-e917-4b14-8741-c2bfe82fce49 · Timestamp: 2026-10-10T11:47:30+03:00

- Action: Applied both patch findings; checked them off in plan Code Review
- Result: sidecar-client await stop + exit/onLine guard for current child only; smoke asserts .venv + ~readyTimeoutMs wait. typecheck OK; smoke 16/16.
- Evidence: sidecar-client.ts spawnChild fail/exit/onLine; smoke.test.ts ready-timeout test; plan patch items [x]
- Open: code-review next-steps choice; walkthrough block 3 still open

## 13 — Sidecar SpeechIn engine — Formal review done

Session: 2dcc6399-e917-4b14-8741-c2bfe82fce49 · Timestamp: 2026-10-10T11:49:00+03:00

- Action: User ended code-review workflow (choice 3 Done)
- Result: Formal review closed; 2 patches landed in working tree; walkthrough resumes on block 3
- Evidence: plan Code Review [x] patches; sidecar-client.ts + smoke.test.ts dirty vs PR head
- Open: User accept block 3 or continue moves; ask commit when dirty

## 14 — Sidecar SpeechIn engine — Thoughts

Session: 2dcc6399-e917-4b14-8741-c2bfe82fce49 · Timestamp: 2026-10-10T11:52:30+03:00

- Action: Reviewed main.py scoring/ready, pyproject pin, fixture+RIGHTS after formal-review patches
- Result: Engine matches Intent; no new block-3 defects. load_audio_f32 is intentional av-compat shim. Fixture ~4s mono 44.1kHz public-domain JFK excerpt with RIGHTS. Formal patches were client-side (block 4 surface) but already landed.
- Evidence: main.py:21-37,48-116,124-132; pyproject.toml; fixtures/RIGHTS.txt; wav ch=1 rate=44100 dur~4.09s
- Open: User accept block 3

## 15 — Sidecar SpeechIn engine — Test

Session: 2dcc6399-e917-4b14-8741-c2bfe82fce49 · Timestamp: 2026-10-10T11:53:30+03:00

- Action: Re-ran english-path smoke after review patches (engine + client)
- Result: 16/16 pass. Engine-facing: fixture accept, text-only/missing soft-fail, no-SQLite, ready-timeout (~516ms with venv assert), dispose.
- Evidence: `cd english-path && npm run smoke`
- Open: User accept block 3; dirty tree commit still pending
