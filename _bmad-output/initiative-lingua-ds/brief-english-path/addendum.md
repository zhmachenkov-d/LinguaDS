---
title: "English Path — Addendum"
status: draft
---

Parking lot: discovery research, agreed decisions/scope, and architecture pointers — not the executive brief.

## Research notes (Discovery)

### AI phonics / pronunciation (A0–A1, Russian L1)

- Stack signal: Whisper/WhisperX + phoneme aligners (wav2vec2 / MFA) for phone-level feedback; pin `language=en`; Whisper token probs alone yield noisy scores.
- ELSA-style segmental scores help accuracy drills; humans are still stronger on prosody/communicative judgment — AI for practice volume, not sole holistic assessor.
- Pedagogy for RU→EN: letter–sound + articulatory cues before IPA; high-load contrasts (`th`, `w/v`, `h/x`, vowel length `/ɪ–iː/`, `/æ–e/`).
- TTS: temporary slowdown (preserve pitch; ~≤20%) then normal-rate replay to avoid dependence.
- Implications for product: `phonics_grade` should prioritize articulatory visuals + minimal pairs over IPA-first UI; soft-score + human-like speaking check later via `assessor`.

### AI English tutor landscape (2025–2026)

- Market is a stack, not one product: Duolingo (habit/A0 path), Speak/Langua (conversation), ELSA (phoneme scoring), Babbel/Busuu (curriculum ± community).
- Open wedges: gated personal coach A0→C1; systematic Russian→English L1-interference; privacy-first desktop (commercial apps are cloud; local OSS ESL immature).
- DeepSeek Harness: developer-preview plugin runtime; education plugins experimental (`dsh-plugin-education`, deeptutor-like) — not a shipped A0–C1 English product; breaking-change risk.
- Competitor retention pattern (not adopted): streak = one short lesson/day; Day-7 cliff → soft slack (streak freeze); optimize ~15 min/day + path progress over raw minutes. For product retention, see Product decisions.
- Risks: vendor CEFR claims often self-reported; local ASR quality for Russian-accented A0 unproven at scale; DSH education stack young/unstable.

## User discovery notes

- v1 audience: builder + narrow trusted circle (not broad market launch).
- Primary motivation: work-ready English; near-term outcome = job interview readiness at B1+ (C1 remains long-term path).
- Status quo failures: tutor — schedule/frequency insufficient; Duolingo — opaque curriculum (unclear what topic was covered / what we are doing now) and unclear outcome.

## Product decisions (Discovery)

- **Anti-Duolingo gamification:** no streaks/badges/XP as primary retention loop.
- **Retention levers:** clear syllabus/plan visibility («что прошли / чем занимаемся / до чего»), soft level unlock with «рекомендуется повторить» for weak criteria.
- Architecture implication: `motivation_engine` streaks/badges out of v1 product story; micro-goals only if they read as plan clarity, not game rewards. See Architecture dump.

## Success criteria (agreed)

- Retention: ≥5 sessions/week (~15 min session) in first 30 days for builder + narrow circle.
- Transparency: every session shows level · current topic · session goal · unlock status / recommended review.
- Progress signals: `cefr_assess` toward B1+ **and** an interview-practice scenario (mock Q&A / roleplay) as part of v1 success — not CEFR-only.
- v1 path: A0 → B1+ (not full C1 in first ship); C1 remains long-horizon vision.

## Scope (agreed for brief)

**In (v1):**

- Start diagnostic + transparent plan (topic / now / unlock)
- Phonics + voice at A0
- Supervisor + modes needed through B1+
- Soft unlock + «рекомендуется повторить»
- Local profile/progress on DeepSeek Harness
- `cefr_assess` + interview practice scenario
- CEFR rubric calibration as in-scope workstream for A0→B1+ (+ interview): usable iterative rubrics, not academically perfect through C1

**Out (v1):**

- Full path to C1 / C1-level essay work
- Streaks, badges, XP gamification
- Polished multi-user product / monetization

## Architecture dump (reference)

User-supplied architecture for DeepSeek Harness English Path (supervisor, phonics/grammar/writing/speaking coaches, tools, memory, RAG, roadmap) is the implementation candidate for PRD/architecture. The product brief intentionally omits plugin tables; use the original architecture note plus this addendum for technical depth.

**Overrides vs original architecture narrative:** no streaks/XP; v1 ends at B1+ with interview practice; CEFR rubrics A0–B1+ only — see Product decisions, Success criteria, and Scope.
