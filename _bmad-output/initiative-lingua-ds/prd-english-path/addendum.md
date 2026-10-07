---
title: "English Path PRD Addendum"
status: final
created: 2026-10-07
updated: 2026-10-07
---

# Addendum — English Path PRD

Depth parked for architecture / UX / solution design. Not PRD requirements until promoted.

## UJ-1 first-launch detail (user-contributed recreate, 2026-10-07)

Install / runtime (architecture — not learner-facing PRD):

- DeepSeek Harness desktop; `english-path` profile; `DEEPSEEK_API_KEY` in env; empty profile triggers onboarding
- Persist: e.g. `learner.db`, illustrative `phonics_mastery.*` / `weak_point` fields

Product beats beyond UJ-1 narrative:

- Greeting copy (bilingual EN+RU) as reference; sparse screen (no cards/progress bars/illustrations at first paint)
- Setup defaults: mixed instructions, whatever format, 10 min sessions; defer interests/goals prefs
- Diagnostic probe tree + early-stop / silence handling; no aloud right/wrong
- Path map shows full A0→C1; Goal C1 = long-term horizon; B1+/interview = near-term milestone (v1 ship) — decided 2026-10-07
- First lesson = phonics A0.0 compressed (~8 min) inside same session
- Explicit anti-vocab: never unlocked / level up / reward / streak in UI

## Sample lesson shapes (user-contributed, 2026-10-07)

User supplied five CEFR-linked lesson plan options (A0 → C1) with stage timings, agent modes, and DeepSeek Harness tool names (`phonics_grade`, `grammar_rag`, `writing_coach`, `speaking_coach`, `vocab_srs`, `motivation_engine`, `cefr_assess`, `pronunciation_grade`, `dictionary_lookup`, `mistake_recorder`, `level_unlock`, etc.).

**Conflict resolution (2026-10-07): keep the brief.** Gamification, B2/C1 as v1 ship scope, and hard unlock thresholds are **not** promoted into the PRD. Lesson _shape_ and soft unlock remain candidates.

| Source claim                         | Brief                            | Resolution                    |
| ------------------------------------ | -------------------------------- | ----------------------------- |
| Streaks, badges, `motivation_engine` | Gamification out of v1           | **Brief wins**                |
| B2 essay + C1 debate options         | v1 stops at B1+                  | **Brief wins** — post-v1 only |
| Hard unlock thresholds               | Soft unlock + recommended review | **Brief wins**                |
| Adaptivity on `streak_days`          | No streak framing                | **Brief wins**                |

**Still useful downstream (architecture / UX):**

- Lesson micro-structure patterns (warm-up → input → practice → production → wrap-up) for A0 phonics, A1 grammar/writing, A2/B1 functional speaking
- Tool inventory names as candidate Harness plugins (implementation detail)
- SRS at lesson end as a capability candidate (distinct from streak/badge framing)
- `mistake_recorder` → personalization loop
- Supervisor adapts duration / difficulty / tool set to learner profile
- Combining short blocks in one session (e.g. phonics + grammar)

**v1 coach shape (PRD decision):** named multi-coach pilot — distinct phonics, speaking (interview), grammar, vocab(+SRS), assess. Writing coach deferred. Map to plugin names in architecture (`phonics_grade`, `speaking_coach`, `grammar_rag`, `vocab_srs`, `cefr_assess`, `mistake_recorder`, etc.; no `motivation_engine`).

Full verbatim lesson tables retained in conversation transcript; promote selectively after conflict resolution with PM.

## UJ-2 return-session detail (user-contributed recreate, 2026-10-07)

Illustrative A0 return (example, not the only level shape):

- Open line: last session duration + stop point; Start + input; agent-named plan (e.g. unstable /θ/ + A–F, then introduce /w/, 10 min)
- Review blocks: discrimination hold-check → /θ/ articulation stability → letters A–F name + ear recognition
- Key moment: 3× _think_ → learner recording vs reference → “Do you hear the difference?”
- New /w/: ear /w/–/v/ → articulation → picture words → mini-contrast; deferrable if fatigue
- Finale may show attempt counts vs prior session as facts (e.g. 2/7 vs 4/7)
- Persist examples: phonics_mastery updates, weak_point priority may drop without clearing

Product rule (product-wide): agent proposes plan on return; no mode/topic/continue-vs-review chooser at open; learner accepts, interrupts, or stops. Phonics (UJ-5) and interview (UJ-4) are named next steps / available scenarios — not menu modes.

Gate scope: critical hard-block = CEFR/level transitions (UJ-3); within-level weak items (e.g. A0 phonemes) queue into review and do not make the next lesson not-available.

Session length: default pref (often 10 min); special scenarios (interview ~45–60 min) override with plan stated up front.

## Soft level-advance evidence UX (user-contributed, 2026-10-07)

Illustrative A1→A2 evidence summary (not locked thresholds):

- Confirmed examples: speaking A1+, vocab 540/600 active, grammar Present/Past/Future Simple without systemic errors, reading ~80% on A2 texts
- Almost-confirmed examples: writing coherence below A2, listening 70% vs 80% target
- Agent voice: sufficient evidence for conditional transition; weak criteria will be brought back
- Status vocabulary: open / conditionally available / recommended to reinforce / threshold reached
- Critical vs non-critical weak points: non-critical → soft transition + review queue; critical → hard block until met (e.g. A0→A1 alphabet / SRS floor — examples only until PRD locks the list)
- No rollback / no burned progress; worsening → reinforcement cycle, not demotion spectacle

Promote exact criterion matrices into architecture / assessment design after PM locks critical set.

## B1+ interview practice detail (user-contributed, 2026-10-07)

Mechanism / role notes for architecture & UX (journey narrative lives in UJ-4):

- Why B1+ is threshold: genre skills beyond “can converse” — register, STAR, unprepared self-talk, unexpected Qs, pause tolerance
- Session length target ~45–60 min; optional second run ~10–15 min
- Agent roles in one session: interviewer / observer / debriefer (not motivational coach or judge)
- Candidate tool mapping (implementation): supervisor leads; speaking-coach as interviewer; cefr_assess descriptors; mistake_recorder patterns; grammar_rag for functional chunks
- Mock block table: small talk, about yourself, experience, skills, scenario, learner questions
- PRD decision: Readiness list **rows** = those mock question-type blocks; “enough runs” / thresholds remain assessment calibration
- Weak-spot handling patterns: accuracy→SRS/grammar/speaking weave; precision→homework STAR cases with numbers; pressure→more interruptions in later mocks; register→formal replacement chunks + fragment debrief
- Level contrast: A2 = simple self-Q; B1+ = first full format with support; B2+ = complex scenarios, support removed (post-v1)
- Anti-gamification rationale for adults in hiring prep: relevance + concrete weak steps, not game goals

## A0 phonics lesson detail (user-contributed, 2026-10-07)

Mechanism notes for architecture & UX (journey narrative lives in UJ-5):

- Mode: dedicated phonics-coach; sound/image/movement; no IPA at A0
- Duration rationale: 10–12 min attention ceiling
- Contrast-over-volume; L1-interference map drives pair choice for RU L1
- Content ops (PRD decision): **generated-first** contrast pairs / phonics assets with **human spot-check** — not curated-only catalog for v1
- Tool candidates: TTS speed control; phonics_grade (recognition / discrimination+production); pronunciation_grade
- Profile fields (illustrative): phonics_mastery.\*, weak_point strings — implementation detail
- Course coupling: feeds vocab_srs (words enter with practiced pronunciation), speaking-coach, A0→A1 phonics Level transition criteria (product language: Available / Not available — never game “unlock”), mistake_recorder feedback loop into next phonics focus
- Addendum tool names like `level_unlock` and percentage mastery examples are **illustrative architecture only** — not Learner-facing UI (FR-5, FR-24)
- Alphabet/spelling introduced separately from phonics mode
- Feedback tone: neutral “closer” / specific physical cue — no fireworks “correct!”

Align with brief-english-path addendum phonics/TTS notes when architecture is drafted.

## A0 RU L1 STT/TTS thresholds (user-contributed, 2026-10-07)

Product-locked defaults live in PRD FR-33 / §5.6. Depth below for architecture / assessment calibration.

**Principle:** thresholds are configurable and adaptive — on A0, do not punish accent or block progress with false rejects. Numbers change under the Learner (profile), not the Learner under fixed game-like gates.

### STT confidence modes (VLP / CALL empirics)

| Level                | Confidence threshold | Behavior                                                      |
| -------------------- | -------------------- | ------------------------------------------------------------- |
| Beginner (A0–A1)     | **35%**              | Forgives pronunciation difficulty; accepts imperfect attempts |
| Intermediate (A2–B1) | 45%                  | Moderate strictness                                           |
| Advanced (B2+)       | 55%                  | Expects precise pronunciation                                 |

**A0 RU L1 recommended bundle:** word accept **0.35**, sentence **0.40**, phoneme check **0.50**. Below accept → neutral “try again” (no “wrong”). Alt CALL anchors noted by user: 0.4 balance; phoneme reliability ~0.5; some systems accept utterance at 0.2+ with “green” from 0.5.

**Banding for production attempts (UJ-1 / UJ-5):** &lt;0.35 → retry + cue + reference; 0.35–0.50 → accept as **Unstable**; &gt;0.50 → stable enough to move on.

### STT WER (mixed EN–RU)

- Open Whisper-class on mixed spontaneous: often WER 70–80% (unsuitable). Specialized bilingual EN–RU ASR cited ~19.6% on telephone mixed speech.
- Targets: **&lt;25%** acceptable instructional dialogue; **&lt;15%** good; **&gt;35%** ship-risk. Do not use native-speaker WER (90–99%) as the bar; non-native often ~70–72% accuracy class; strong A0 accent can hit 25–35% WER even on clean words.

### Rejection rate / lesson (A0)

- Target **10–25%**. &gt;40–50% on one lesson ⇒ threshold too high. Persistently **&gt;30%** ⇒ lower (e.g. toward 0.30) in profile. **&lt;10%** with rising WER ⇒ raise. Soft reject = “repeat,” not punishment.

### TTS (Self-check reference)

| MOS         | Quality   | A0 fitness                              |
| ----------- | --------- | --------------------------------------- |
| &lt;2.5     | Poor      | Unusable — phonemes not discriminable   |
| 2.5–3.4     | Fair      | Marginal; voice may annoy               |
| **3.5–3.9** | Good      | **Minimum band**; phoneme diffs audible |
| 4.0–4.4     | Very good | Recommended reference                   |
| 4.5+        | Excellent | Fine but not required for A0            |

- **A0 minimum MOS 3.8; target 4.0–4.2.** Production voice-bot floor often cited MOS ≥3.8; &lt;3.5 feels slightly annoying — costly under A0 anxiety.
- Intelligibility via ASR round-trip: instructional A0 **&lt;8%** WER; production **&lt;5%** good.
- Must slow to **60–70%** normal speed without losing intelligibility; slowdown MOS **≥3.0** (fail &lt;2.5). If TTS fails for a phoneme → do not use that voice for phonetic Self-check; switch engine or human reference (UJ-2).

### Summary table (same as PRD §5.6)

| Metric                      | Accept / target        | Reject / risk                 |
| --------------------------- | ---------------------- | ----------------------------- |
| STT confidence (word)       | ≥0.35                  | &lt;0.35                      |
| STT confidence (sentence)   | ≥0.40                  | &lt;0.40                      |
| STT confidence (phoneme)    | ≥0.50                  | &lt;0.50                      |
| STT WER (mixed)             | &lt;25% (&lt;15% good) | &gt;35%                       |
| STT rejection rate / lesson | 10–25%                 | &gt;30% (or &lt;10% too soft) |
| TTS MOS                     | ≥3.8 (target 4.0–4.2)  | &lt;3.5                       |
| TTS intelligibility WER     | &lt;8% (&lt;5% good)   | &gt;12%                       |
| TTS slowdown MOS @ 60–70%   | ≥3.0                   | &lt;2.5                       |

## Related product brief addendum

See also `_bmad-output/initiative-lingua-ds/brief-english-path/addendum.md` for competitive detail, phonics/TTS notes, and rejected streak-freeze retention patterns.
