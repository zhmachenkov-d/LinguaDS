---
id: SPEC-english-path
companions:
  - glossary.md
  - user-journeys.md
  - voice-quality-bar.md
  - ../architecture-english-path/architecture-english-path.md
  - ../ux-english-path/DESIGN.md
  - ../ux-english-path/EXPERIENCE.md
sources:
  - ../brief-english-path/brief-english-path.md
  - ../brief-english-path/addendum.md
  - ../prd-english-path/prd-english-path.md
  - ../prd-english-path/addendum.md
---

> **Canonical contract.** This SPEC and the files in `companions:` are the complete, preservation-validated contract for what to build, test, and validate. Source documents listed in frontmatter are for traceability — consult them only if you need narrative rationale or prose color this contract intentionally omits.

# English Path

## Why

**Pain + vision:** Russian L1 adults (builder + trusted circle in v1) need **work-ready English** — near-term **job-interview readiness at B1+** — without a tutor’s sparse calendar or consumer apps that hide the learning thread behind opaque paths and game loops. Starting from **A0** requires phonics, voice, and systematic **RU→EN L1-interference** coaching on a **privacy-first local DeepSeek Harness** runtime, with a visible path, soft progression, and honest evidence — not streaks, badges, or XP. Long-term **Goal: C1** stays on the map; v1 ships through the B1+/interview milestone.

## Capabilities

- **CAP-1** — First-launch continuous Session
  - **intent:** An empty-profile Learner can complete one continuous first Session: bilingual greeting, ≤3 setup prefs, Diagnostic conversation, Path map, same-Session first Phonics lesson, and descriptor finale.
  - **success:** Empty profile triggers first-launch (not a multi-step wizard); Session does not end on a “done” onboarding screen without a learning act; status language never uses unlocked/points/%; prefs persist for return. Shapes: `user-journeys.md` UJ-1.

- **CAP-2** — Return Session shell & Agent-named plan
  - **intent:** On return, the Learner resumes without streak guilt into a Session where the agent names the plan, orientation shows the transparency strip, Recommended review is the first lesson block, Self-check and fatigue deferral work, and the Session ends in descriptors + next step.
  - **success:** No welcome-back / missed-days / mode-topic-continue chooser; orientation ≤30s with **level · Topic · Session goal · Available / Recommended (map) / review status**; early stop does not write failure solely for ending early. Shapes: UJ-2.

- **CAP-3** — Soft / conditional Level transition
  - **intent:** When Level criteria are assessed, the Session finale can show evidence and dual Path-map access status (Available / Conditionally available / Not available) without rewards, hard-blocking only on unmet Critical criteria while Within-level queue items never block the next lesson.
  - **success:** Soft advance allows next-level materials with named Goes-into-review items; no level rollback or burned-progress spectacle; Unstable phonemes leave next Phonics lesson Available. Overlay is not a standalone open flow. Shapes: UJ-3.

- **CAP-4** — A0 Phonics lesson
  - **intent:** The Learner can complete short Phonics lessons (2–3 phonemes by RU L1-interference contrast) via Agent-named plan: ear → articulation → words → mini-contrast → Self-check → descriptor finale, without IPA or spelling-as-goal.
  - **success:** Discrimination holds before forced production; contrast pairs are generated-first with human spot-check; Unstable phonemes queue within-level without making the next lesson Not available. Shapes: UJ-5.

- **CAP-5** — A0→B1+ path & multi-coach progression
  - **intent:** The Learner can travel A0→B1+ under Level transition rules with path infrastructure and named coaches (phonics, speaking incl. interview, grammar, vocab+SRS, assess); C1 remains Path-map horizon only; recurring mistake patterns enter review; no gamification surfaces.
  - **success:** v1 ships path + coaches with iterative materials (not complete day-one curriculum volume); writing coach deferred; no streak/XP/badge/unlocked reward UI. First-pilot depth strongest at A0 phonics and B1+ Interview practice.

- **CAP-6** — B1+ Interview practice
  - **intent:** At/near the B1+/interview milestone, the Learner can run Interview practice via Agent-named plan (prep → mock → debrief → optional second run) and leave with descriptors plus a Readiness list — not a binary pass/fail.
  - **success:** Stated length typically ~45–60 min (may override pref); mock holds formal/neutral register with no mid-answer prompting and includes pause/interrupt + 1–2 unexpected questions; Readiness list rows = small talk · about yourself · experience · skills · scenario · his questions. Shapes: UJ-4.

- **CAP-7** — Local profile persistence & guilt-free resume
  - **intent:** The system can persist prefs, Path position, evidence statuses, and next-step plan locally across launches and resume from the saved next step without streak or missed-days messaging.
  - **success:** After quit/relaunch, prefs and next-step match prior finale; no cloud Learner account required; empty vs non-empty profile never cross-trigger first-launch vs return. Architecture: journal write path + snapshot projection; multi local Learner identities pre-session only.

- **CAP-8** — Channels & A0 RU L1 voice usability
  - **intent:** The Learner can complete Sessions by voice and/or text per prefs with RU/EN/mixed instructions, and where Self-check/phonics apply, play Learner recording beside reference audio that meets the adaptive A0 RU L1 quality bar.
  - **success:** Mic never mandatory with reproach; Interview practice content stays in English even when instructions are RU/mixed; STT/TTS defaults and adaptation match `voice-quality-bar.md`; text remains valid if audio path fails.

## Constraints

- Local/desktop **DeepSeek Harness** runtime only; no cloud Learner account, multi-device sync, or product analytics pipeline in v1.
- **No** streaks, badges, XP, or “unlocked” reward language in Learner-facing UI.
- Product-wide **Agent-named plan** — no mode/topic/continue-vs-review chooser at open.
- **Supervisor alone** names the plan, drives phase transitions, and commits durable Learner mutations; coaches return structured results only (`architecture-english-path.md` AD-1, AD-3, AD-4).
- Ship **one** installable `english-path` Cordis plugin bundle with internal module seams (AD-2).
- Learner-facing status vocabulary is exclusive to `glossary.md` terms.
- Prefer soft/conditional Level advance; **hard-block only** when a Critical criterion for that Level transition is unmet; Within-level queue never flips next lesson to Not available.
- A0 STT/TTS defaults in `voice-quality-bar.md` are product-locked but **must remain adaptive** per Learner.
- v1 audience = builder + trusted circle; stop anytime always honored; fatigue deferral is not failure.
- Named multi-coach set is fixed for first pilot; **writing coach out**; tool-ish names map to internal functions, not separate Harness plugins in v1.

## Non-goals

- Duolingo-style habit game (streaks, badges, XP, freeze/repair).
- Polished multi-user SaaS, accounts-at-scale, monetization, or cloud sync.
- C1 essay/stylistics or full C1 path as v1 ship target (C1 = Path-map horizon only).
- Human-tutor booking / live-teacher marketplace.
- Scored placement test product (Diagnostic conversation is adaptive placement).
- Binary “interview pass/fail” certification.
- Exact Critical-criteria item lists, Interview “enough runs” numeric cadence, and ms audio latency budgets as PRD-locked constants (calibration — see Open Questions).
- Dedicated writing coach in first pilot.
- Interests / career / topic preference onboarding at first launch.

## Success signal

In the first **30 days**, the builder and trusted circle sustain **≥5 qualified Sessions/week** (each ends in Confirmed / Unstable / Goes into review / next — not a hollow open/close), every Session shows the transparency strip fields, and A0-start Learners show **descriptor movement** on current-band criteria (not a forced B1+ trend). Learners at/near the B1+/interview milestone use **Interview practice** (prep → mock → debrief → Readiness list). Path infrastructure + coaches let a Learner travel **A0→B1+** under Level rules as materials land. Do **not** optimize streak/XP/badge counts, hollow micro-sessions, or premature C1 coverage.

## Assumptions

- Architecture stack pins (Harness 0.2.0-rc.2 preview, faster-whisper, Kokoro, etc.) are implement-time seeds — re-pin allowed when FR-33 measurement or host stability requires it.
- “Can travel A0→B1+” means path + coaches + iterative materials under Level rules — not complete curriculum volume on day one of the pilot.

## Open Questions

- **A0→A1 Critical criteria matrix** (categories, items, evidence/transition thresholds) — assessment design; do not mark A0→A1 Critical hard-block QA as pass until it exists.
- **Interview Readiness list** numeric “enough runs” cadence and exact evidence for naming Interview practice as next step beyond at/near B1+ milestone — assessment design.
- **Millisecond audio latency budgets** for Self-check / STT / TTS — architecture after path is instrumented.
