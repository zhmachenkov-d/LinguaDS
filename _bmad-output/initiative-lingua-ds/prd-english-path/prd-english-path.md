---
title: "English Path"
status: final
created: 2026-10-07
updated: 2026-10-07
---

# Product Requirements: English Path

_Final — Seeded from product brief English Path (Lingua DS). Journeys UJ-1…UJ-5 locked; Features FR-1…FR-33; NFRs; MVP scope; Calibration §8.1._

## 1. Vision

English Path is a local/desktop AI English coach on DeepSeek Harness for Russian-speaking adults (builder + trusted circle in v1) who need **work-ready English**, especially **job-interview readiness at B1+**, without depending on a tutor’s sparse schedule or on consumer apps that hide the learning thread behind opaque paths and game loops.

It carries the learner from **A0** — with phonics, voice, and systematic **Russian→English L1-interference** coaching — along a **visible path** to the near-term **B1+/interview** milestone, while **Goal: C1** remains the long-term horizon on the map (v1 does not ship C1 content as a goal). Retention comes from a **clear plan**, **session transparency**, and **soft/conditional level advance** (with a small set of critical level gates where needed) — not streaks, badges, or XP. Every session ends in **evidence and next steps**.

## 2. Target User

### 2.1 Jobs To Be Done

- **Functional:** Reach work-ready English; near-term, be ready to **pass a job interview at B1+**.
- **Functional:** Practice on their own schedule without booking a tutor.
- **Emotional / cognitive:** Always know where they are on the path, what was covered, what is next, and what is still unstable — progress that feels real, not XP.
- **Contextual:** Russian L1 adult starting from A0 or climbing toward B1+; privacy-preferring local/desktop runtime.

### 2.2 Non-Users (v1)

- Learners seeking a polished multi-user SaaS, accounts-at-scale, or monetized consumer app.
- Learners whose primary goal is C1 essay/stylistics or exam prep as the v1 ship target.
- Users who want Duolingo-style streaks, badges, or XP as the retention loop.
- Absolute beginners who refuse any voice or sound work (A0 phonics/voice is first-class).

### 2.3 Key User Journeys

- **UJ-1. Alex’s first launch — greeting, light setup, diagnostic conversation, path map, and first phonics lesson in one session.**
  Alex, 32, Russian L1, needs English for a remote job interview and is starting from scratch. After DeepSeek Harness is ready with the english-path profile (empty profile → first-launch onboarding), he enters **one continuous session** — not a multi-step setup wizard — that ends with a real lesson.
  1. **Greeting:** sparse UI (short line, input, mic). Bilingual voice+text: English coach intro as sample; instructions that he may answer voice or text, switch to Russian if unclear, and **stop anytime**. Mic preferred, not mandatory — text field appears without reproach.
  2. **Setup (≤3 questions):** instruction language (RU / EN / mixed; default mixed), format (voice / text / whatever; default whatever), session length (10 / 20 / 30; default **10** for later returns). No interests, career goals, or topic prefs on first launch. Default long-term goal shown in one line: **Goal: C1** — path is long; start from the beginning. **First-launch Session may exceed the default pref** (diagnostic ≈5–8 min + path map + ~8 min phonics); the agent states that longer plan up front — same pattern as UJ-4 length override.
  3. **Diagnostic conversation (≈5–8 min, adaptive — not a scored test):** slow clear English probes with RU hints; order name → origin/home → alphabet → letter reading → contrast sounds → one production word. Agent does not prompt answers or judge aloud (“thank you, next”); stops early when the picture is clear; on silence → **slower repeat → RU → move on** (timings calibrated; sequence is fixed) — pause does not pressure.
  4. **Profile / path map (before any lesson):** current level (e.g. A0), confirmed vs not confirmed evidence, **full path A0→C1 with “you are here”**, what is **available** now (e.g. A0.0 alphabet and first sounds), recommended mode. Status words only: available / open / recommended — never “unlocked,” points, or percentages.
  5. **First lesson immediately (same session):** short A0.0 phonics (~8 min) — ear → articulation → picture-words → mini-contrast → fixation (aligns with UJ-5); alphabet as small audio-first letter batches, not a full list dump.
  6. **Session end:** same neutral profile updated — confirmed / unstable / goes into review / next session focus + length. Progress persists; next launch resumes without streak or “missed days” guilt.
  - **Outcome:** Alex finishes first launch having oriented (language/format/length), been placed without test anxiety, seen the whole path, and completed a real learning act — not a “done” onboarding screen.
  - **Path framing:** map shows **Goal: C1** as long-term horizon; **B1+ / interview readiness** is the near-term milestone (v1 ship success). Both are visible without implying v1 includes C1 content.
  - **Silence / early-stop:** Normative **sequence** only (slower repeat → RU → move on; early-stop when placement evidence is enough). Milliseconds and exact evidence cutoffs are calibration, not PRD locks.

- **UJ-2. Alex returns — seamless continuation; agent names the plan; review is the first lesson block.**
  Alex opens Harness on a later day. **No** “Welcome back!” event, missed-days reminder, or streak. The UI loads into the **same neutral state** as last session end: a short line (e.g. last session length + where they stopped), **Start** + input — **no** intermediate “choose mode / topic / continue or start over.” **Product-wide:** the agent **does not ask what he wants to do** (false freedom); it **names the plan** (voice without small talk) — including when the next step is phonics (UJ-5), interview practice (UJ-4), or ordinary syllabus work. Alex may accept, interrupt, or **stop anytime**. Prefs from UJ-1 stay fixed (no re-onboarding). Default session length remains his pref (often **10**); special scenarios may name a longer plan (see UJ-4).
  1. **Orientation (≤30s):** compact profile — level, unstable items, available now, next step — plus the same A0→C1 path map with “you are here” (C1 horizon; B1+/interview near-term milestone). Silence 10–15s is fine; if it drags, agent repeats the plan once, slower — no pressure.
  2. **Recommended review = first lesson block (not a separate mode/screen):** neutral wording (“start with what remained unstable”), never “check if you remember.” Example A0 shape: short discrimination check on prior contrast → articulation on unstable production → letter batch recognition (eye + ear). Blocks shorten if stable; return to ear-tuning if not. At higher levels, the same pattern applies to whatever remained unstable (grammar, STAR precision, etc.).
  3. **Key moment — Alex’s self-check, not agent praise:** produce target item; **his recording + reference side by side without comment**; agent asks if he hears (or notices) the difference and waits. Confirm neutrally if yes; slow + point to the moment if no. If no shift — record “still unstable, we’ll come back” without dramatizing. Progress felt as **perceiving himself**, not receiving a grade.
  4. **New material only after unstable check:** next planned step — not an “unlock,” just the next step. If the plan is phonics, same micro-structure as UJ-5. Fatigue deferral triggers (any one): Learner says they are tired / wants to stop; Learner uses **stop anytime**; or agent offers an early stop after review when energy is clearly low — then defer new material without failure framing.
  5. **Finale — same status format as UJ-1:** session length; confirmed / unstable / goes into review / next session (+ length). Optional neutral **fact comparison** to prior session (e.g. 2/7 vs 4/7 attempts) — not praise or points. Progress persists; next launch resumes from the named next step. If transition evidence warrants it, finale may also include the **UJ-3** level-advance overlay.
  - **Outcome:** Returning is continuation, not an event; review is woven in; Alex can perceive his own shift; session ends in descriptors and a next step.
  - **Decision:** Return opens never present a mode/topic/continue-vs-review chooser — product-wide.

- **UJ-3. Soft (or conditional) level-advance — an end-of-session overlay, not a standalone day.**
  **Relationship:** UJ-3 is the **transition moment** that may conclude a working session (e.g. after UJ-2 syllabus work, UJ-4 interview, or UJ-5 phonics) when evidence against **level** criteria is assessed. It is not how Alex opens the app.
  At session end, Alex does **not** see a victory animation or reward. He sees an **evidence summary against transition criteria**, hears access status in plain language, and lands on the **same path map family as UJ-1** — full route with “you are here,” Goal C1 as horizon, B1+/interview as near-term milestone — showing **both** next-level status and pending review.
  - Core finale vocab stays **confirmed / unstable / goes into review / next**. Transition overlay may add: **almost confirmed**, **conditionally available**, **threshold reached**, **open / available**, **not available / not open**.
  - Enough evidence on all criteria → next level **open / available**.
  - Almost enough → **conditionally available** + items that go into review; he may start next-level materials while weak topics return in later sessions.
  - **Non-critical weak points** → soft/conditional advance; items stay as goes-into-review; woven into later sessions — no punishment, no level rollback.
  - **Critical weak points** → next **level** stays **not available / not open** until met (hard block for that **level transition** only).
  - **Scope split vs UJ-5:** critical hard-block applies to **CEFR/level gates**. Within a level (e.g. A0 phonics contrasts), weak items queue into review and **do not** make the next phonics lesson “not available” (see UJ-5).
  - No improvement → more repetition priority; worsening → reinforcement cycle — never “burned progress,” never game “unlock” language.
  - **Outcome:** Alex moves forward with eyes open — next level in reach when earned, weak topics still on the learning task list.
  - **Critical criteria:** Principle only in PRD — small foundation set that can hard-block a Level transition; exact lists and evidence thresholds are assessment-design calibration (see §8.1).

- **UJ-4. Alex runs B1+ job-interview practice as a scenario, not a game.**
  Alex is at the **near-term B1+/interview milestone** on the path (C1 still the horizon). Interview practice is reached the same way as any return work: the agent **names it as the next step / available scenario** when the plan calls for it — **not** via a mode picker. It is a **separate genre** from general conversation (register, STAR, unprepared self-talk, unexpected questions, holding pauses). No points, interviewer “levels,” or rewards — only scenario, roles, criteria, and debrief. He may **stop anytime**; this is a run-through, not an exam.
  - **Length:** may **override** the default 10‑min pref — typically **~45–60 min** (prep → mock → debrief → optional second run). Agent states the longer plan up front.
  1. **Prep (≈10–12 min):** real or typical job posting; raw material about himself (coach helps into English, no canned phrases); B1+ functional language; STAR on his own case. L1 instructions available if needed; practice stays in English.
  2. **Mock (≈15–20 min):** coach as hiring manager (small talk → about yourself → experience → skills → scenario → his questions). No mid-answer prompting; may pause, politely interrupt, ask 1–2 unexpected questions; holds formal/neutral register.
  3. **Debrief (≈15–20 min):** descriptors — **confirmed / unstable / goes into review** — no scoreboard; fragment-by-fragment why it held or collapsed; patterns become review items. May include UJ-2-style self-perception (replay fragment vs stronger alternative) without praise theater.
  4. **Optional second run:** same pressure; compare in words, not progress points.
  - **Finale = profile, not victory:** confirmed / unstable / goes into review; **readiness list** (which question types he’s ready for / needs another run); concrete next steps. Critical-for-role gaps stated honestly without drama. Voice preferred (pauses/tempo are the skill); text run-through valid especially early — same channel equality as UJ-1. May include **UJ-3** if level-transition evidence is in play.
  - **Outcome:** Alex practices the hiring scenario he needs and leaves with evidence + next steps — not a badge.
  - **Interview readiness:** Readiness list + descriptors; no binary “practice pass.” List **rows** = mock question-type blocks (small talk, about yourself, experience, skills, scenario, his questions). “Enough runs” / evidence thresholds remain assessment calibration.

- **UJ-5. Alex does a short A0 phonics lesson — sound, image, movement; not conversation.**
  At A0, phonics is the **agent-named next step** (also the shape of UJ-1’s first lesson) — **not** entered via a mode picker. Standalone sessions typically **~10–12 min**; first-launch may compress to ~8. Focus: 2–3 phonemes by **contrast** from his **RU L1-interference** map; instructions may stay in L1/mixed per prefs; he may **stop anytime**. Not conversation, not grammar.
  1. **Tune the ear (~2 min):** minimal pairs by sound only; same/different; slow + exaggerate until discrimination works.
  2. **Articulation (~3 min):** tongue/lip visuals (not IPA); one physical correction at a time; his take next to the reference.
  3. **Words (~3 min):** picture + sound (little/no spelling); errors return to the phoneme, not punishment.
  4. **Mini-contrast (~2 min):** hear→picture, picture→produce.
  5. **Key moment — same self-check pattern as UJ-2:** produce the target; **his recording + reference side by side without comment**; “Do you hear the difference?” — wait for Alex. Neutral confirm or slow + point; no dramatizing if still unstable.
  6. **Fixation (~1 min):** same finale vocabulary as UJ-1 — **confirmed / unstable / goes into review / next phonics focus** — profile only, no points. May attach **UJ-3** only when **level**-transition evidence is being assessed (rare mid-A0).
  - **Errors:** auditory → stay in discrimination; articulation → one cue; unstable → next lesson; systematic substitution → high-priority review. Weak sounds **do not** make the next phonics lesson “not available” (**within-level queue**, not a UJ-3 level gate); if critical for upcoming vocab, coach warns those words will sound inaccurate for now.
  - **Not in this lesson:** full alphabet dump as the goal (letter batches are separate/audio-first per UJ-1), IPA, grammar/vocab-as-goal, lecture rules, grades/rewards.
  - **Outcome:** Better contrast hearing/production, honest profile note, clear next phonics focus — feeds later vocab/speaking as a recurring planned step, not a one-off intro or menu mode.
  - **Voice quality:** A0 RU L1 STT/TTS defaults and soft-reject behavior locked in FR-33 / §5.6; thresholds are adaptive per Learner, not universal forever-constants.
  - **Contrast pairs:** Generated-first with human spot-check (see FR-19); not a curated-only catalog for v1.

<!-- Additional journeys: none required for v1 spine; UJ-1…UJ-5 locked. -->

## 3. Glossary

Downstream artifacts must use these terms exactly; no synonyms elsewhere in the PRD.

- **Learner** — The person using English Path (v1: builder + trusted circle).
- **Path map** — Full A0→C1 route with “you are here”; Goal C1 = long-term horizon; B1+/interview readiness = near-term milestone.
- **Session** — One continuous practice period that ends in a status finale.
- **Agent-named plan** — On return, the coach states the next step; no mode/topic/continue-vs-review chooser. The Learner may accept, interrupt, or stop.
- **Recommended review** — First block of a Session addressing Unstable items — soft, not a hard gate or separate mode.
- **Topic** — What the Session is working on (e.g. phonics contrast, grammar point, interview prep) — shown in orientation / transparency strip with level and Session goal.
- **Confirmed** — Evidence status: criterion holds with enough evidence.
- **Almost confirmed** — Transition overlay: criterion is near the evidence bar but not yet Confirmed.
- **Unstable** — Evidence status: criterion does not yet hold consistently.
- **Goes into review** — Item queued for Recommended review / later Sessions.
- **Available / Open** — Level or material access status: the Learner may start it.
- **Recommended (map status)** — Path map hint for a sensible next Available step; not a hard gate and not the same as Recommended review (the lesson block).
- **Threshold reached** — Transition overlay: evidence bar for a criterion or Level transition has been met.
- **Conditionally available** — Next level may be started while named weak items remain in Goes into review.
- **Not available / Not open** — Level access blocked until Critical criteria for that Level transition are met.
- **Level transition** — Soft/conditional advance between CEFR bands; may hard-block only on Critical criteria for that transition.
- **Critical criteria** — Small set of foundation requirements for a Level transition that keep the next level Not available until met. Exact items per transition are calibrated in assessment design; the PRD locks the principle (prefer soft/conditional advance; hard-block only on Critical criteria).
- **Within-level queue** — Weak items inside a level (e.g. phonemes) that go into review without making the next lesson Not available.
- **Diagnostic conversation** — Adaptive first-launch placement dialogue — not a scored test.
- **Phonics lesson** — A0 sound/image/movement contrast work (UJ-5 shape).
- **Interview practice** — B1+ genre scenario: prep → mock → debrief (± second run).
- **Self-check** — Learner compares own production to a reference and judges the difference (no praise theater).
- **L1-interference** — Systematic Russian→English transfer errors the coach targets.
- **Readiness list** — Interview debrief output: which question types are ready vs need another run. Rows map to mock blocks: **small talk · about yourself · experience · skills · scenario · his questions**. This is the readiness signal (with Confirmed / Unstable / Goes into review); there is no binary “interview practice pass.” Evidence thresholds and “enough runs” cadence are assessment calibration.

## 4. Features

_Capabilities, not implementation. Plugin names, schemas, and storage live in addendum / architecture. No streaks, badges, or XP in any feature._

### 4.1 First-launch & placement

**Description:** Empty profile starts one continuous first Session: bilingual greeting, ≤3 setup prefs, Diagnostic conversation, Path map, then an immediate first Phonics lesson. Realizes UJ-1.

**Functional Requirements:**

#### FR-1: First-launch detection

The system can detect an empty English Path profile and start first-launch onboarding as one Session (not a multi-step setup wizard). Realizes UJ-1.

**Consequences (testable):**

- Empty profile → first-launch flow; non-empty → return flow (FR-7).

#### FR-2: Greeting & stop anytime

The Learner can hear and see a bilingual greeting that states voice or text is allowed, Russian instructions are available if unclear, and they may stop anytime. Realizes UJ-1.

**Consequences (testable):**

- Greeting presents EN sample + L1/instruction clarity; mic is optional without reproach.

#### FR-3: Setup prefs (≤3)

The Learner can set instruction language (RU / EN / mixed; default mixed), format (voice / text / whatever; default whatever), and Session length (10 / 20 / 30; default 10) before the Diagnostic conversation. Realizes UJ-1.

**Consequences (testable):**

- Interests, career goals, and topic prefs are not asked on first launch.
- Defaults apply if the Learner proceeds without changing options.

#### FR-4: Diagnostic conversation

The system can run an adaptive Diagnostic conversation (≈5–8 min) that places the Learner without scored-test framing, early-stops when evidence is enough, and treats silence without pressure. Realizes UJ-1.

**Consequences (testable):**

- No aloud right/wrong during probes; RU hints for instructions allowed.
- Probe coverage includes identity/basics, alphabet, letter reading, contrast sounds, and one production item when needed.
- On silence, the coach follows the fixed sequence: slower repeat → RU → move on (does not pressure). Exact wait durations are calibration.
- Diagnostics early-stops when placement evidence is enough (does not force every probe). Exact evidence cutoffs are calibration.

#### FR-5: Path map before first lesson

After placement, the Learner can see the Path map (full A0→C1, you-are-here, Goal C1 horizon, B1+/interview near-term milestone, Available now) before the first lesson starts. Realizes UJ-1.

**Consequences (testable):**

- Status language uses Available / Open / recommended — never “unlocked,” points, or percentages as the placement result.

#### FR-6: Immediate first Phonics lesson

The system can start a short first Phonics lesson in the same Session after the Path map (≈8 min compressed A0.0 shape). Realizes UJ-1, UJ-5.

**Consequences (testable):**

- First-launch Session does not end on a “done” onboarding screen without a learning act.
- First-launch may exceed the default Session-length pref (FR-3); the agent states the longer plan up front (same override pattern as FR-8 / Interview practice).

### 4.2 Session shell & Agent-named plan

**Description:** Return Sessions resume without streak guilt; Agent-named plan; Recommended review as first block; Self-check; descriptor finale. Realizes UJ-2.

**Functional Requirements:**

#### FR-7: Seamless return open

On return, the Learner can open into the last neutral Session state (where they stopped + Start) with no welcome-back event, missed-days reminder, streak, or mode/topic/continue-vs-review chooser. Realizes UJ-2.

**Consequences (testable):**

- Prefs from FR-3 persist; no re-onboarding questions.

#### FR-8: Agent-named plan

The system can state the Agent-named plan for the Session (including Phonics lesson, Interview practice, or syllabus work). The Learner can accept, interrupt, or stop. Realizes UJ-2, UJ-4, UJ-5.

**Consequences (testable):**

- Product-wide: no start chooser for mode/topic/continue-vs-review.
- Special scenarios may name a longer Session length than the default pref (e.g. Interview practice).

#### FR-9: Orientation strip

At Session start, the Learner can see **level · Topic · Session goal · Available / Recommended (map status) / review status** (Unstable / Goes into review), plus Path map context, within ≤30s orientation. Realizes UJ-2. Supports SM-2.

**Consequences (testable):**

- Orientation uses Glossary status terms; never “unlocked.”
- Field list matches SM-2 (canonical transparency strip).

#### FR-10: Recommended review block

The system can run Recommended review as the first lesson block (not a separate mode), using neutral wording about Unstable items. Realizes UJ-2.

**Consequences (testable):**

- Blocks shorten if items hold; return to foundational checks if they do not.

#### FR-11: Self-check

The Learner can perform a Self-check: own production played beside reference without comment; coach waits for the Learner’s judgment before neutral confirm or specific cue. Realizes UJ-2, UJ-5.

**Consequences (testable):**

- No praise theater or score for the Self-check moment.

#### FR-12: Session finale status

At Session end, the Learner can see Confirmed / Unstable / Goes into review / next Session (+ length), with optional neutral fact comparison to the prior Session. Realizes UJ-1, UJ-2. Supports SM-2; guards SM-C2.

**Consequences (testable):**

- No celebratory reward screen; progress persists for the next return.

#### FR-13: Fatigue deferral

The system can stop early and defer new material when the Learner is fatigued, without treating fatigue as failure. Realizes UJ-2.

**Consequences (testable):**

- Trigger is one of: Learner says tired / wants to stop; Learner uses stop anytime; agent offers early stop after Recommended review when energy is clearly low.
- Early stop does **not** write failure or Unstable solely because the Session ended early; deferred new material appears in the next Agent-named plan.

### 4.3 Level transition

**Description:** End-of-Session overlay for Level transition evidence and access status. Realizes UJ-3.

**Functional Requirements:**

#### FR-14: Level transition overlay

When level criteria are assessed, the Session finale can show evidence (Confirmed / almost confirmed / Unstable), Path map dual status (next level Available / Conditionally available / Not available + Goes into review), without rewards. Realizes UJ-3.

**Consequences (testable):**

- Overlay may conclude UJ-2 / UJ-4 / UJ-5 Sessions; it is not a standalone open flow.

#### FR-15: Soft / conditional advance

The system can mark the next level Available or Conditionally available when non-Critical items remain Unstable, and queue those items as Goes into review. Realizes UJ-3.

**Consequences (testable):**

- Learner may start next-level materials while named weak items remain Goes into review; no punishment or level rollback.

#### FR-16: Critical criteria hard-block

The system can keep the next level Not available until Critical criteria for that Level transition are met. Realizes UJ-3.

**Consequences (testable):**

- No level rollback or “burned progress” spectacle.
- Critical criteria are a **small set of foundations** without which the next band is unsafe; exact per-transition lists are assessment-design calibration, not PRD-locked itemizations.
- Principle: prefer soft/conditional advance; hard-block only when a Critical criterion for that Level transition is unmet.
- **[NOTE FOR PM]** Pilot cannot ship a working Critical hard-block for A0→A1 until the assessment matrix exists (§8.1). Block Level-transition QA for that gate until the A0→A1 Critical set is written.

#### FR-17: Within-level queue vs level gates

The system can distinguish Critical criteria (level gates) from Within-level queue items that do not make the next lesson Not available. Realizes UJ-3, UJ-5.

**Consequences (testable):**

- Unstable phonemes (or other within-level items) never flip the next lesson to Not available; only unmet Critical criteria block a Level transition.

### 4.4 Phonics (A0)

**Description:** Phonics lesson as Agent-named step: contrast pairs from L1-interference priorities; ear → articulation → words → mini-contrast → Self-check → finale. Realizes UJ-5, UJ-1.

**Functional Requirements:**

#### FR-18: Phonics lesson structure

The Learner can complete a Phonics lesson (~10–12 min standalone; ~8 min first-launch) covering 2–3 phonemes by contrast without IPA or spelling-as-goal. Realizes UJ-5.

**Consequences (testable):**

- Lesson includes ear → articulation → words → mini-contrast → Self-check → descriptor finale; no IPA-first UI and no spelling-as-goal.

#### FR-19: L1-interference pair selection

The system can prioritize contrast pairs from the Learner’s Russian L1-interference map and items not yet reinforced. Realizes UJ-5.

**Consequences (testable):**

- v1 content ops: **generated-first** — the system (or model) produces candidate contrast pairs / related phonics assets; a human **spot-checks** before or soon after Learner-facing use. Not a curated-only catalog requirement; not unreviewed generation at scale.

#### FR-20: Discrimination before production

The system can keep the Learner in ear-tuning until discrimination holds before pushing production. Realizes UJ-5.

**Consequences (testable):**

- Production is not forced while same/different discrimination on the target contrast still fails. Exact N-correct / evidence cutoffs are assessment calibration (same ownership class as FR-16 lists).

#### FR-21: Within-level phonics queue

Unstable phonemes Goes into review and do not make the next Phonics lesson Not available; the coach may warn when upcoming vocab will sound inaccurate. Realizes UJ-5, FR-17.

**Consequences (testable):**

- Next Phonics lesson remains Available when prior phonemes are Unstable; warning about upcoming vocab accuracy is optional and non-blocking.

### 4.5 Syllabus progression A0→B1+

**Description:** Visible path and soft progression through modes needed for A0→B1+ (grammar, vocab/SRS, speaking; dedicated writing coach deferred past first pilot). Supports SM-3, SM-5.

**Functional Requirements:**

#### FR-22: A0→B1+ path travel

The Learner can travel A0→B1+ on the product with materials Available according to Level transition rules; C1 remains horizon on the Path map only. Realizes SM-5.

**Consequences (testable):**

- v1 does not require C1 essay/stylistics as ship scope.
- v1 ships **path infrastructure + named coaches** (phonics, speaking, grammar, vocab(+SRS), assess) with **iterative materials growth** — not a claim that every band has complete day-one content. First-pilot depth is strongest at A0 phonics and B1+ Interview practice; mid-band materials fill iteratively while the Path map and Level transition rules remain live.
- SM-5 “can travel A0→B1+” means: a Learner can progress along the path under Level transition rules with Available materials and coaches for each band as content lands — not that full B1+ curriculum volume ships on day one of the pilot.

#### FR-23: Assessment toward B1+

The system can record and show assessment evidence trending toward B1+ using descriptor status (not XP). Supports SM-3.

**Consequences (testable):**

- v1 ships **usable iterative rubrics for A0→B1+** (and Interview practice descriptors). Rubrics may improve during v1; academic perfection and C1-grade rubrics are out of v1 ship scope.
- For Learners still in early bands, progress is shown via descriptor movement (e.g. Unstable → Confirmed on current-band criteria), not a forced B1+ trend line.

#### FR-24: No gamification surfaces

The product must not present streaks, badges, XP, or “unlocked” reward language in Learner-facing UI. Supports SM-C1.

**Consequences (testable):**

- No streak/XP/badge surfaces in first-launch, return, phonics, interview, or Level transition UI.

#### FR-25: Mistake patterns into review

The system can record recurring mistake patterns as Goes into review / Unstable for later Recommended review and Agent-named plans. Realizes UJ-2, UJ-4.

**Consequences (testable):**

- Recurring patterns appear in a later Agent-named plan or Recommended review block; they are not converted into points or badges.

### 4.6 Interview practice

**Description:** B1+ Interview practice genre via Agent-named plan. Realizes UJ-4. Supports SM-4.

**Functional Requirements:**

#### FR-26: Interview practice session

The Learner can run Interview practice (prep → mock → debrief → optional second run) when the Agent-named plan selects it at the B1+/interview milestone. Realizes UJ-4.

**Consequences (testable):**

- Stated length typically ~45–60 min; may override default Session length pref.
- Agent names Interview practice only when the Learner is at/near the B1+/interview milestone (Path map near-term milestone) and the plan selects that scenario — not via a mode picker. Exact readiness-to-enter evidence is assessment calibration (§8.1 companion to enough-runs).

#### FR-27: Mock interviewer behavior

During mock, the coach can hold formal/neutral register, avoid mid-answer prompting, and include pauses, polite interruption, and 1–2 unexpected questions. Realizes UJ-4.

**Consequences (testable):**

- No mid-answer prompting; at least one pause/interrupt pattern and 1–2 unexpected questions are possible in a full mock; register stays formal/neutral.

#### FR-28: Interview debrief & Readiness list

After mock, the Learner can see Confirmed / Unstable / Goes into review, fragment-level debrief, and a Readiness list with concrete next steps. Realizes UJ-4.

**Consequences (testable):**

- No scoreboard or badge; critical-for-role gaps stated without drama.
- Interview readiness is the **Readiness list + Confirmed / Unstable / Goes into review** descriptors — **no single pass/fail**.
- Readiness list **rows** are the mock question-type blocks: small talk, about yourself, experience, skills, scenario, his questions. Evidence thresholds and “enough runs” cadence are assessment-design calibration, not PRD-locked.

### 4.7 Learner profile & persistence

**Description:** Local durable profile for prefs, evidence statuses, and resume. Supports privacy-first desktop runtime.

**Functional Requirements:**

#### FR-29: Persist profile locally

The system can persist Learner prefs, Path map position, Confirmed / Unstable / Goes into review items, and next-step plan across launches on the local DeepSeek Harness runtime. Realizes UJ-1, UJ-2.

**Consequences (testable):**

- After quit/relaunch, prefs and next-step plan match the prior Session finale; no cloud account required.

#### FR-30: Resume without guilt

On return, the system can resume from the saved next step without streak or missed-days messaging. Realizes UJ-2. Supports SM-C1.

**Consequences (testable):**

- Return open never shows streak, freeze, or “you missed a day” copy.

### 4.8 Voice & channel

**Description:** Voice preferred, text equal; L1/mixed instructions per prefs.

**Functional Requirements:**

#### FR-31: Voice and text channels

The Learner can complete Sessions by voice and/or text per prefs; mic is never mandatory with reproach. Realizes UJ-1, UJ-4, UJ-5.

**Consequences (testable):**

- Text-only completion is valid for first-launch, return, phonics (where applicable), and Interview practice; mic absence never triggers reproach copy.

#### FR-32: Instruction language

The system can deliver instructions in RU, EN, or mixed per prefs while practice content stays appropriate to the activity (e.g. Interview practice in English). Realizes UJ-1, UJ-4.

**Consequences (testable):**

- Instruction language follows FR-3 prefs; Interview practice content stays in English even when instructions are RU/mixed.

#### FR-33: Reference vs Learner audio

Where Self-check or phonics correction applies, the system can play Learner recording beside reference audio. Realizes UJ-2, UJ-5.

**Consequences (testable):**

- v1 requires Self-check and reference-vs-Learner audio to be **usable for A0 RU L1** (discrimination and self-perception must work).
- Accept/reject thresholds are **configurable and adaptive**, not universal forever-constants. On A0 the priority is: do not punish accent; do not block progress with false rejects.
- **A0 RU L1 default STT confidence:** word ≥ **0.35** accept; sentence ≥ **0.40**; phoneme check ≥ **0.50**. Below accept → neutral “try again” + reference replay / one physical cue — **never** aloud “wrong.”
- **Banding:** confidence in accept-but-low band (e.g. word 0.35–0.50) → attempt **accepted** and recorded **Unstable** (data for next Session), not failure.
- **Session rejection rate (A0 target):** about **10–25%** of attempts per lesson. Persistently **>30%** → lower confidence threshold (e.g. toward 0.30) in profile; **<10%** with rising WER → raise threshold. Adaptation under the Learner, not gamification.
- **STT WER (mixed EN–RU dialogue):** **<25%** acceptable for instructional dialogue; **<15%** good; **>35%** ship-risk (false rejects annoy). Native-speaker WER benchmarks are not the bar.
- **TTS as Self-check reference:** MOS ≥ **3.8** minimum for phonics/Self-check (target **4.0–4.2**); intelligibility WER **<8%** (**<5%** good). Must slow to **~60–70%** speed with slowdown MOS ≥ **3.0**. If a TTS voice fails this for a phoneme, do **not** use it for that phonetic Self-check — fall back to another engine or human reference audio; text channel remains valid (FR-31).
- Full metric tables and CALL/VLP rationale live in addendum; ms latency budgets remain architecture calibration.

## 5. Non-Functional Requirements

Cross-cutting quality attributes. Latency ms and disk budgets remain architecture calibration unless stated below. A0 RU L1 STT/TTS defaults in §5.6 / FR-33 are product-locked.

### 5.1 Privacy & local persistence

- Learner prefs, Path map position, evidence statuses (Confirmed / Unstable / Goes into review), and next-step plan persist on the **local DeepSeek Harness** runtime across launches (FR-29).
- v1 does **not** require a cloud learner account, multi-device sync, or accounts-at-scale identity.
- Self-check / phonics audio used for reference-vs-Learner playback is treated as **Learner-local practice material**, not a product analytics feed. Telemetry/product-analytics pipeline is out of v1 ship scope.
- Privacy preference is a product differentiator: the Learner can practice without depending on a third-party tutor schedule or a cloud ESL SaaS account.

### 5.2 Session shell & responsiveness

- Return orientation fits in **≤30s** of Learner attention for the orientation strip + Agent-named plan (FR-9).
- Session open must not present mode/topic/continue-vs-review choosers (FR-7, FR-8) — this is a UX integrity NFR as much as a feature rule.
- When voice is in use, Self-check and reference-vs-Learner audio must meet **§5.6 / FR-33** A0 RU L1 defaults (or adapted profile thresholds).
- If the audio path is inadequate, the Session remains completable via text (FR-31) without reproach.

### 5.3 Reliability of progress

- Empty vs non-empty profile: after quit/relaunch in pilot scenarios, first-launch and return flows never cross-trigger each other (FR-1, FR-7).
- Progress and prefs survive normal app quit / relaunch; the Learner never depends on streak recovery or “missed days” messaging to resume (FR-30).

### 5.4 Channel & instruction clarity

- Voice preferred, text equal; mic never mandatory with reproach (FR-31).
- Instructions honor RU / EN / mixed prefs; practice content stays appropriate to the activity (e.g. Interview practice in English) (FR-32).
- The Learner can **stop anytime** in first-launch, return, phonics, and interview Sessions without punishment framing.

### 5.5 Anti-gamification integrity

- No Learner-facing streaks, badges, XP, or “unlocked” reward language (FR-24). Guarding SM-C1 is a ship-quality bar, not a polish nice-to-have.

### 5.6 A0 RU L1 voice quality bar (STT / TTS)

Defaults for the A0 RU L1 agent; full tables in addendum. Thresholds adapt per Learner profile (FR-33).

| Metric                      | Accept / target        | Reject / ship-risk        | Note                         |
| --------------------------- | ---------------------- | ------------------------- | ---------------------------- |
| STT confidence (word)       | ≥ 0.35                 | < 0.35                    | Soft A0 mode                 |
| STT confidence (sentence)   | ≥ 0.40                 | < 0.40                    | Context helps                |
| STT confidence (phoneme)    | ≥ 0.50                 | < 0.50                    | Stricter for contrast checks |
| STT WER (mixed EN–RU)       | < 25% (< 15% good)     | > 35%                     | Not native-speaker WER       |
| STT rejection rate / lesson | 10–25%                 | > 30% (or < 10% too soft) | Triggers threshold adapt     |
| TTS MOS (Self-check ref)    | ≥ 3.8 (target 4.0–4.2) | < 3.5                     | Unusable for phonics if fail |
| TTS intelligibility WER     | < 8% (< 5% good)       | > 12%                     | Phonemes must not collapse   |
| TTS slowdown MOS @ 60–70%   | ≥ 3.0                  | < 2.5                     | Required for A0 ear work     |

## 6. Non-Goals & MVP Scope

### 6.1 Non-Goals (explicit)

English Path v1 is **not**:

- A Duolingo-style habit game (streaks, badges, XP, freeze/repair loops).
- A polished multi-user SaaS, marketplace, or monetized consumer subscription product.
- An exam-prep or academic C1 essay/stylistics product as the v1 ship target.
- A human-tutor booking or live-teacher marketplace.
- A scored placement test product (Diagnostic conversation is adaptive placement, not a grade).
- A binary “interview pass/fail” certifier (Readiness list + descriptors only).

### 6.2 In scope for MVP (v1)

- Local/desktop DeepSeek Harness runtime with durable English Path Learner profile.
- First-launch Session: greeting → ≤3 prefs → Diagnostic conversation → Path map → same-session first Phonics lesson → descriptor finale (UJ-1 / FR-1…FR-6).
- Return Sessions: seamless open, Agent-named plan, Recommended review as first block, Self-check, fatigue deferral, descriptor finale (UJ-2 / FR-7…FR-13).
- Soft / conditional Level transition overlay with Critical criteria hard-block principle (UJ-3 / FR-14…FR-17).
- A0 Phonics lessons (contrast, L1-interference priorities, within-level queue) (UJ-5 / FR-18…FR-21).
- Path infrastructure + named coaches for **A0 → B1+** with **iterative materials** (not complete day-one curriculum volume for every band); C1 on Path map as horizon only (FR-22…FR-25). First-pilot depth strongest at A0 phonics and B1+ Interview practice.
- B1+ Interview practice genre: prep → mock → debrief → Readiness list (± second run) (UJ-4 / FR-26…FR-28).
- Voice + text channels; RU / EN / mixed instructions (FR-31…FR-33).
- Success measured by SM-1…SM-5; counter-metrics SM-C1…SM-C3 honored.

**v1 audience:** builder + trusted circle (pilot). Broader launch is post-v1 intent, not v1 ship requirement.

**v1 coach shape (product scope, not plugin schema):** named multi-coach pilot from day one — distinct **phonics**, **speaking** (incl. Interview practice), **grammar**, **vocab (+SRS)**, and **assess** coaches/roles. **Writing coach deferred** past first pilot. Exact Harness plugin names and schemas are architecture (addendum candidates).

### 6.3 Out of scope for MVP (v1)

| Out                                                              | Why                                                                                      |
| ---------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| C1 content / C1 essay & advanced stylistics as ship goals        | Near-term milestone is B1+/interview; C1 is Path map horizon only (SM-C3)                |
| Streaks, badges, XP, gamified unlock language                    | Product positioning; SM-C1                                                               |
| Multi-user accounts, sync-at-scale, monetization                 | Pilot is local + circle; SaaS polish is post-v1                                          |
| Exact Critical criteria item lists & evidence thresholds         | Assessment-design calibration (principle locked in FR-16)                                |
| Hard-coded forever STT/TTS constants (non-adaptive)              | A0 defaults locked (FR-33 / §5.6) but must remain configurable per Learner               |
| ms audio latency budgets                                         | Architecture calibration (not PRD-locked)                                                |
| Exact “enough runs” / evidence thresholds on Readiness list rows | Row categories locked (FR-28); numeric cadence = assessment calibration                  |
| Academic-perfect CEFR rubrics through C1                         | v1 = usable iterative A0→B1+ only (FR-23)                                                |
| Interests / career / topic preference onboarding at first launch | Explicitly deferred past UJ-1 setup (FR-3)                                               |
| Dedicated writing coach as first-pilot ship                      | Multi-coach pilot: phonics / speaking / grammar / vocab(+SRS) / assess; writing deferred |
| Cloud analytics / telemetry product pipeline                     | Privacy-first local pilot                                                                |

Post-v1 (if v1 works): extend the same coach toward C1, deepen workplace scenarios, optionally open beyond the circle — still without game mechanics.

## 7. Success Metrics

**Primary**

- **SM-1 — Retention without gamification:** ≥ **5 qualified Sessions/week** for the builder and trusted circle in the **first 30 days**. A **qualified Session** ends in a descriptor finale (Confirmed / Unstable / Goes into review / next) and is not a hollow open/close (guards SM-C2). Typical length per prefs (~10–15 min; first-launch and interview may be longer). Validates FR-7, FR-12, FR-24, FR-30.
- **SM-2 — Session transparency:** Every Session shows **level · Topic · Session goal · Available / Recommended (map status) / review status** (never game “unlock” language) — same field list as FR-9. Realizes UJ-1, UJ-2. Validates FR-5, FR-9, FR-12.
- **SM-3 — Progress (band-appropriate):**
  - **30-day A0-start pilot:** descriptor movement on current-band criteria (e.g. phonics Unstable → Confirmed / Self-check usable) — not a forced B1+ trend.
  - **Learners at/near B1+ milestone:** assessment evidence trending toward **B1+** along the path.
  - Validates FR-23, FR-14, FR-18.
- **SM-4 — Interview readiness:** **Interview practice** in use as a success path (prep → mock → debrief → Readiness list) for Learners **at/near the B1+/interview milestone** — not required inside the first 30 days for A0 starters. Realizes UJ-4. Validates FR-26, FR-28.
- **SM-5 — Path scope:** Learner can travel **A0 → B1+** via path infrastructure + coaches + iterative materials under Level transition rules (FR-22) — not “complete curriculum volume on day one.” Realizes UJ-1…UJ-5. Validates FR-22, FR-18, FR-26.

**Counter-metrics (do not optimize)**

- **SM-C1:** Streak length / XP / badge counts — explicitly out of product positioning.
- **SM-C2:** Session count inflated by hollow micro-sessions that skip review or evidence finales (defeats SM-1 if counted).
- **SM-C3:** Premature C1 content coverage before the B1+/interview milestone is solid.

## 8. Open Questions

Items still open for assessment design, content, or architecture — **not** silent PRD gaps. Principles above already constrain the answer space.

_No open product questions remaining for Finalize triage._ Calibration workstreams below are explicit locked/open splits — not silent gaps, not UJ dependencies.

### 8.1 Calibration (pilot roadmap)

Decision log: what the PRD locks vs what stays open for assessment design / architecture.

#### FR-16 — Critical criteria matrices (Level transitions)

- **Locked in PRD:** principles only (small foundation set; prefer soft/conditional advance; hard-block only when Critical unmet).
- **Not locked:** categories, items within categories, evidence / transition thresholds.
- **Owner:** assessment design.
- **Revisit:** implement / calibrate first Level transition — priority **A0→A1**, pilot.
- **[NOTE FOR PM]** Do not mark A0→A1 Critical hard-block QA as pass until the matrix exists (FR-16).

#### FR-28 — Interview “enough runs” thresholds

- **Locked in PRD:** Readiness list **row categories** = mock blocks (small talk, about yourself, experience, skills, scenario, his questions) — structure of what is checked.
- **Not locked:** numeric cadence (N runs, evidence thresholds for “needs another run”); exact evidence for naming Interview practice as next step beyond “at/near B1+ milestone” (FR-26).
- **Owner:** assessment design.
- **Revisit:** calibrate Interview practice debrief and entry plan, pilot.

#### Audio latency budgets (ms)

- **Locked in PRD:** none (no ms values).
- **Not locked:** all millisecond budgets for Self-check / STT / TTS path.
- **Owner:** architecture.
- **Revisit:** Self-check path instrumented in Harness.

| Item                    | Locked                        | Open                                    | Owner             | Revisit trigger                       |
| ----------------------- | ----------------------------- | --------------------------------------- | ----------------- | ------------------------------------- |
| FR-16 Critical criteria | Principles only               | Categories, items, thresholds           | Assessment design | A0→A1 / pilot                         |
| FR-28 enough runs       | Readiness list row categories | Numeric cadence / entry evidence detail | Assessment design | Interview debrief calibration / pilot |
| Audio latency (ms)      | —                             | All ms values                           | Architecture      | Self-check integration in Harness     |

### 8.2 Resolved (audit trail)

- ~~RU L1 contrast curated vs generated~~ → **generated-first + human spot-check** (FR-19).
- ~~Minimum coach set for first pilot~~ → **named multi-coach**: phonics, speaking (incl. interview), grammar, vocab(+SRS), assess; **writing deferred** (§6.2 / §6.3).
- ~~Critical criteria matrices~~ → **defer all lists**; principle-only remains (FR-16); see §8.1.
- ~~Interview Readiness list dimensions~~ → rows = mock blocks; numeric cadence still open (§8.1 / FR-28).
- ~~Exact “interview practice pass” definition~~ → Readiness list + descriptors; no binary pass/fail (FR-28).
- ~~STT/TTS accept-reject for A0 RU L1~~ → configurable/adaptive defaults locked (FR-33 / §5.6); full tables in addendum; ms latency open (§8.1).
