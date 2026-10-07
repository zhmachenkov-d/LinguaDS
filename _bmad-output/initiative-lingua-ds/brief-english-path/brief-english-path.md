---
title: "English Path A0→B1+"
status: ready
created: 2026-10-07
updated: 2026-10-07
---

# Product Brief: English Path (Lingua DS)

## Executive Summary

**English Path** is a personal AI English coach for a Russian-speaking adult learner (and a small trusted circle) who needs work-ready English — specifically **job-interview readiness at B1+** — without depending on a tutor’s sparse schedule or on consumer apps that hide the learning thread behind opaque paths and game loops.

Built on **DeepSeek Harness** (local/desktop-first plugins, memory, and tools), the product covers the path **from absolute beginner (A0)** with phonics and voice, through a bottom-up unlocked syllabus, to **B1+**, with CEFR assessment and an **interview-practice** scenario as first-class success signals. Long-term vision remains **C1**; v1 stops at interview-ready B1+.

Retention is not Duolingo-style gamification. It is a **clear plan**, **session transparency**, and **soft level unlock** (with “recommended review” when criteria are weak).

## The Problem

A Russian L1 adult aiming for **work-ready English (interview at B1+)** faces a bad trade-off:

- **Tutors** fit poorly with real schedules: too few sessions, hard to sustain frequency.
- **Mass apps (such as Duolingo)** create habit but fail the learner’s real need: it is often unclear **what topic was covered**, **what we are doing now**, and **what criterion unlocks the next step** — so progress toward interview-ready English does not feel real.

Starting from **A0** makes this worse: without phonics and voice, the learner cannot use text-first tools; without a visible path and honest unlock rules, early progress is slow and easy to abandon. Generic AI chat (conversation-only apps such as Speak) under-serves absolute beginners and does not systematically address **Russian→English interference**.

## Who This Serves

**Primary (v1):** the builder and a **narrow trusted circle** — Russian-speaking adults.

**Job to be done:** reach **work-ready English**, near-term **pass a job interview at B1+**; secondary motivations (emigration, study, exams, general ability) exist but do not drive v1 scope.

**Success for them looks like:** knowing where they are on the path every session; sustaining practice without a tutor’s calendar; hearing and seeing measurable movement via `cefr_assess` and interview drills — not XP.

## The Solution

A **supervisor-led multi-mode coach** on DeepSeek Harness that:

1. Diagnoses starting level (including alphabet/sounds) and places the learner on an **A0→B1+** path.
2. Runs short, explicit sessions: the learner always sees **level · current topic · session goal · unlock / review status**.
3. Treats **phonics + STT/TTS** as first-class at A0; expands into grammar, vocab/SRS, speaking, and writing as levels unlock.
4. Uses **soft unlock**: advance when evidence is enough; flag weak criteria as “recommended review” instead of hard gates or game rewards.
5. Measures progress with **`cefr_assess`** (iteratively calibrated rubrics for A0–B1+) and a dedicated **interview practice** scenario toward B1+.
6. Grounds explanations in **RU L1-interference** knowledge and local cross-session memory/progress, so the coach remembers the learner.

Gamification (streaks, badges, XP) is explicitly **out of product positioning**. CEFR rubric calibration is an ongoing v1 workstream for the A0→B1+ range (usable iterative rubrics, not academically perfect through C1).

## What Makes This Different

| Priority  | Differentiator                                                                           |
| --------- | ---------------------------------------------------------------------------------------- |
| Must      | Full path **from A0** with **phonics and voice**, not conversation-only from A2+         |
| Must      | Systematic **Russian→English L1-interference** coaching (phonology + transfer errors)    |
| Must      | **Local DeepSeek Harness** runtime (privacy, plugin control, durable subagents/memory)   |
| Important | Transparent plan + soft unlock / recommended review (clarity without Duolingo game loop) |

Consumer space is a **stack** (habit + conversation + pronunciation apps). The open wedge is one **privacy-first, L1-aware, A0-capable coach** with explicit progression — accepting that DeepSeek Harness education plugins are still early and unstable. For market detail, see the addendum.

## Success Criteria

| Signal                      | Target (v1)                                                                                   |
| --------------------------- | --------------------------------------------------------------------------------------------- |
| Retention (no gamification) | ≥ **5 sessions/week** (~15 min session) for the builder and circle in the **first 30 days**   |
| Transparency                | Every session shows **level · topic · session goal · unlock / recommended review**            |
| Progress                    | `cefr_assess` trending toward **B1+**                                                         |
| Interview readiness         | **Interview practice** scenario in use as a success path (mock Q&A / roleplay), not CEFR-only |
| Path scope                  | Learner can travel **A0 → B1+** on the product                                                |

## Scope

### In (v1)

Capabilities listed in The Solution, plus ship-scope boundaries:

- Modes and UX needed through **B1+** (not C1)
- Soft unlock + “recommended review”; no streaks/badges/XP
- Interview practice as a success path alongside `cefr_assess`
- Iterative CEFR rubric calibration for **A0→B1+**

### Out (v1)

- Full path to **C1** / C1-level essay and advanced stylistics as ship goals
- Streaks, badges, XP / Duolingo-style gamification
- Polished multi-user product, accounts-at-scale, monetization

If v1 works: extend the same coach **through C1**, deepen workplace scenarios, and optionally open beyond the narrow circle — still without game mechanics. Technical plugin inventory, session micro-blocks, tool schemas, and deployment live in the **addendum** and downstream architecture/PRD.

## Open questions for PRD

- Exact definition of “interview practice pass” at B1+ (rubric dimensions, frequency).
- Minimum coach set for first pilot vs full multi-coach team.
- Local Whisper/TTS quality bar for Russian-accented A0 (accept/reject criteria).
- How aggressively RU L1 content is curated vs generated.
