---
title: "Input reconciliation — brief-english-path → prd-english-path"
status: final
created: 2026-10-07
updated: 2026-10-07
inputs:
  - _bmad-output/initiative-lingua-ds/brief-english-path/brief-english-path.md
  - _bmad-output/initiative-lingua-ds/brief-english-path/addendum.md
outputs:
  - _bmad-output/initiative-lingua-ds/prd-english-path/prd-english-path.md
  - _bmad-output/initiative-lingua-ds/prd-english-path/addendum.md
---

# Reconciliation: Product Brief → PRD (English Path)

This document compares the **English Path product brief** (+ addendum) against the **English Path PRD** (+ addendum) after Finalize input reconciliation. Purpose: confirm traceability, surface gaps (especially qualitative tone / voice / feel), and record intentional PRD overrides.

---

## 1. Input summary

| Input | Role |
| ----- | ---- |
| `brief-english-path.md` | Executive product brief: problem, audience, solution pillars, differentiators, success criteria, v1 scope, open questions for PRD |
| `brief-english-path/addendum.md` | Discovery parking lot: phonics/ASR research, competitor stack, anti-gamification decisions, agreed success/scope, architecture pointer + overrides vs legacy architecture narrative |
| `prd-english-path.md` | Full requirements: vision, JTBD, UJ-1…UJ-5, glossary, FR-1…FR-33, NFRs, MVP, success metrics, calibration split |
| `prd-english-path/addendum.md` | UX/architecture depth, lesson-shape conflict resolution (brief wins), STT/TTS tables, cross-ref to brief addendum |

---

## 2. Covered well

Brief intent is **substantially realized** in the PRD. The following brief themes have explicit PRD homes (not exhaustive, but spine-complete).

### 2.1 Vision, problem, and audience

| Brief | PRD |
| ----- | --- |
| Russian L1 adult; builder + narrow trusted circle | §2 Learner, §6.2 v1 audience |
| Work-ready English; near-term **B1+ job interview**; C1 long-term | §1 Vision, Path map glossary, SM-4, SM-C3 |
| Tutor schedule vs mass-app opacity (unclear topic / next step / unlock) | §1, §2.1 emotional JTBD, SM-2 |
| A0 start; phonics + voice first-class | UJ-1, UJ-5, FR-18…FR-21, FR-31…FR-33 |
| Systematic **RU→EN L1-interference** | FR-19, UJ-5, glossary **L1-interference** |
| **DeepSeek Harness** local/desktop, privacy, durable progress | FR-29, §5.1, §6.2 MVP |
| **Supervisor-led multi-mode coach** (capabilities through B1+) | §6.2 named multi-coach pilot; journeys realize modes without menu picking |

### 2.2 Solution pillars and differentiators

| Brief pillar | PRD realization |
| ------------ | --------------- |
| Diagnose + visible A0→B1+ path | UJ-1 diagnostic + path map; FR-4, FR-5, FR-22 |
| Session transparency (level · topic · goal · unlock/review) | FR-9, SM-2; glossary status terms |
| Soft unlock + «реcommended review» | UJ-3, FR-14…FR-17, FR-10; **Recommended review** / **Goes into review** |
| `cefr_assess` + **interview practice** as success signals | FR-23, UJ-4, FR-26…FR-28, SM-3, SM-4 |
| Anti-Duolingo: **no streaks, badges, XP** | FR-24, §5.5, SM-C1, §6.1 non-goals |
| Iterative CEFR rubrics A0→B1+ (usable, not academic C1-perfect) | FR-23, §6.3 out-of-scope row |
| Consumer stack vs one privacy-first L1-aware A0-capable coach | Preserved in brief/addendum; PRD §1 echoes wedge without market essay |

### 2.3 Success criteria and scope

Brief success table maps cleanly to **SM-1…SM-5** (retention ≥5 sessions/week ~15 min, transparency, progress toward B1+, interview scenario, A0→B1+ travel).

Brief **In/Out (v1)** aligns with **§6.2 / §6.3**: B1+ ship milestone; C1 content/essay out; gamification out; multi-user/monetization out.

### 2.4 Brief open questions → PRD resolved (§8.2)

| Brief open question | PRD resolution |
| ------------------- | -------------- |
| Exact “interview practice pass” at B1+ | **Readiness list** rows + Confirmed/Unstable/Goes into review; **no binary pass/fail** (FR-28, glossary) |
| Minimum coach set for first pilot | **Multi-coach pilot**: phonics, speaking (incl. interview), grammar, vocab(+SRS), assess; **writing deferred** (§6.2) |
| Local Whisper/TTS quality bar (RU-accented A0) | **FR-33 / §5.6** product-locked defaults + adaptive profile behavior; depth in PRD addendum |
| RU L1 content curated vs generated | **Generated-first + human spot-check** (FR-19); not curated-only catalog |

### 2.5 Brief addendum decisions in PRD

- **Anti-gamification / retention levers** (plan visibility, soft unlock): UJ-2 agent-named plan, FR-7 return without streak guilt, FR-30.
- **Architecture overrides** (no streaks/XP; v1 ends B1+; rubrics A0–B1+): matches §6 and PRD addendum conflict table (**Brief wins** on gamification, B1+ cap, soft unlock vs hard lesson gates).
- **Phonics/TTS research** (articulatory over IPA-first UI, soft scoring): reflected in UJ-5, FR-18, FR-33 TTS slowdown/MOS; research citations remain in brief addendum + PRD addendum cross-ref.

### 2.6 Qualitative tone / voice / feel — brief level vs PRD depth

The brief states **what** to avoid (game loops, opaque paths) and **what** to optimize (clarity, honest progress). The PRD **extends** this into operable UX principles:

- Sparse first paint; no cards/progress bars at greeting (PRD addendum; UJ-1).
- **No** “Welcome back!”, missed-days, streak (UJ-2, FR-7, FR-30).
- **Agent-named plan** — no false freedom / mode chooser (UJ-2 decision, FR-8).
- **Self-check**: learner recording beside reference; **no praise theater** (UJ-2, UJ-5, FR-11).
- Neutral finale vocabulary: **Confirmed / Unstable / Goes into review** — not victory screens (FR-12, UJ-3).
- Interview as **scenario genre**, not game level (UJ-4).
- **Stop anytime** without punishment (UJ-1, §5.4).

These are **faithful elaborations** of brief anti-gamification and transparency; they do not contradict the brief.

---

## 3. Gaps

Items where the **brief (+ addendum) carries meaning** that the **PRD does not carry equally** — including qualitative tone, voice, and feel, plus structural/context gaps.

### 3.1 Qualitative tone, voice, and feel

1. **Russian-forward UX copy and emotional phrasing** — Brief addendum uses learner-facing Russian anchors («что прошли / чем занимаемся / до чего», «рекомендуется повторить»). PRD locks **English glossary terms** for downstream artifacts; it does not require bilingual status/finale strings or RU coach voice guidelines beyond “instructions in RU/EN/mixed” (FR-32). **Gap:** PRD specifies *structure* of transparency and review; brief addendum specifies *felt* plan clarity in the learner’s L1 — copy/tone for RU-primary UI is left to UX, not PRD-locked.

2. **“Progress feels real, not XP” — competitor contrast in product voice** — Brief problem names Duolingo opacity and Speak-style conversation-only limits for A0. PRD encodes behavior (no XP, no choosers) but **does not** state positioning lines or adult-learner rationale (PRD addendum interview section has anti-gamification rationale; **not** in main PRD for general sessions). **Gap:** qualitative *why we feel different* is thinner in PRD than in brief/addendum discovery notes.

3. **Retention philosophy without gamification** — Brief addendum documents competitor **streak / Day-7 cliff / streak-freeze** patterns and explicitly rejects them, while noting **~15 min/day + path progress** as the useful signal. PRD SM-1 counts sessions/week and allows interview length overrides; it **does not** encode “optimize path progress over raw minutes” or “no streak-freeze analog” as an explicit NFR. **Gap:** subtle — behavior is aligned, but **feel** of retention (plan continuation vs habit game) is less narrated for implementers outside UJ text.

4. **Supervisor as orchestration persona** — Brief headline: **“supervisor-led multi-mode coach.”** PRD emphasizes **Agent-named plan** and discrete coach **roles** (§6.2) but rarely uses **Supervisor** as a learner-visible or requirements term. **Gap:** orchestration story from brief is implicit in architecture/addendum, not a FR-level product concept — risk of implementation drifting to disconnected modes if supervisor continuity isn’t designed.

5. **Honest unlock vs conditional/hard level gates — learner-facing feel** — Brief stresses **soft unlock** and weak criteria as “recommended review.” PRD adds **Critical criteria** hard-block for **level transitions** (FR-16) and richer overlay vocabulary (conditionally available, threshold reached). Brief did not describe hard blocks; PRD principle is compatible but **feel** shifts from “never gated” to “rare foundation gates.” Document as partial gap in *brief literalism*; see overrides §4.

6. **Pedagogical warmth vs neutral clinic** — Brief does not demand cold neutrality; PRD strongly mandates **neutral confirm**, no fireworks, no dramatizing unstable items. That is a **PRD enrichment** that brief did not contradict. **Gap (downstream UX):** brief never said “how warm”; PRD locks anti-praise — designers need explicit guidance so neutrality reads as **respectful coach**, not **indifferent grader** (not specified in either doc beyond “no praise theater”).

### 3.2 Scope, capabilities, and context gaps

7. **Writing as an unlocking track** — Brief solution bullet 3: expands into “grammar, vocab/SRS, speaking, and **writing** as levels unlock.” PRD **defers dedicated writing coach** past first pilot (§6.2 / §6.3). **Gap vs brief literal scope** — recorded as intentional override (§4).

8. **Market / competitive / platform risk narrative** — Brief addendum: competitor stack table, vendor CEFR claim skepticism, DSH education plugin immaturity/breaking-change risk. **Not** in PRD requirements body (appropriate for PRD), but **lost** for PM/stakeholder traceability unless they read brief addendum. **Gap:** PRD does not point readers to “why local DSH despite instability” in one line.

9. **Full architecture dump and plugin inventory** — Brief addendum: user-supplied architecture (supervisor, coaches, tools, RAG, roadmap) as PRD seed. PRD points to addendum/architecture; **FRs avoid plugin names**. **Gap:** none for Finalize PRD — intentional — but brief’s “minimum coach set” question is **resolved narrower** on writing (override).

10. **Secondary motivations** — Brief: emigration, study, exams as secondary (non-v1 drivers). PRD JTBD compresses to work-ready/interview + schedule autonomy. **Gap:** minor; no harm to v1 spine.

11. **Non-user mirror of “Speak / conversation-only from A2+”** — Brief problem explicitly. PRD §2.2 non-users list does not name conversation-only apps or voice-refusal edge case is listed (A0 phonics refusal) but not “conversation-only product.” **Gap:** positioning completeness.

12. **Session micro-block templates for A1+ syllabus** — Brief deferrals to addendum/architecture; PRD addendum retains sample lesson **shapes** as architecture candidates, not FRs. **Gap:** expected for v1 spine (UJ-1…5 locked); grammar/vocab/writing session **feel** beyond phonics/interview is **under-specified vs brief’s “modes needed through B1+”** — covered at capability level (FR-22) not journey level.

### 3.3 Brief addendum research not promoted to PRD

- WhisperX / phoneme aligner stack choices, ELSA-style segmental vs human prosody judgment — stays in brief addendum; PRD locks outcomes (FR-33, phonics structure) not toolchain.
- TTS “~≤20% slowdown preserve pitch” (brief addendum) vs PRD **60–70% speed** with MOS floor — **numeric framing differs**; PRD/addendum own v1 bar (see override/enrichment).

---

## 4. Intentional overrides

PRD choices that **narrow, sharpen, or reinterpret** the brief — documented for audit, not treated as silent drift.

| # | Brief / addendum | PRD decision | Rationale |
| - | ---------------- | ------------ | --------- |
| 1 | Solution includes **writing** as levels unlock; architecture dump includes writing coach | **Writing coach deferred** past first pilot (§6.2, §6.3) | MVP focus: phonics, speaking/interview, grammar, vocab+SRS, assess sufficient for A0→B1+ pilot |
| 2 | **Soft unlock** emphasized; brief open questions silent on hard gates | **Critical criteria** may **hard-block level transitions** only (FR-16, UJ-3); within-level queue stays soft (FR-17, UJ-5) | Safety for foundation skills; still no rollback spectacle; aligns with user-journey evidence UX |
| 3 | Brief open questions (four items) | **Resolved in §8.2** with concrete rules (Readiness list, multi-coach set, STT/TTS defaults, generated-first L1 content) | Finalize triage: no remaining open *product* questions; calibration matrices deferred to assessment design |
| 4 | PRD addendum sample lessons: streaks, `motivation_engine`, B2/C1 v1, hard unlock thresholds | **Brief wins** on gamification, B1+ cap, soft unlock (PRD addendum conflict table) | Explicit reconciliation with user-contributed architecture/lesson tables |
| 5 | Path to **C1** as long-term vision | **Goal: C1** always on **Path map** as horizon; v1 ship milestone **B1+/interview** (UJ-1 path framing, glossary) | UX decision 2026-10-07 — clarifies brief’s “vision C1 / v1 B1+” split for every session |
| 6 | Brief: “soft level unlock” wording | Glossary forbids **“unlocked”** reward language; uses **Available / Open** (FR-5, FR-24) | Anti-gamification integrity beyond brief vocabulary |
| 7 | Brief addendum TTS slowdown note (~≤20%, preserve pitch) | Product-locked **60–70%** slowdown with **MOS ≥ 3.0** (FR-33, §5.6, PRD addendum) | Empirical A0 bar superseded informal research note; brief addendum still referenced for CALL context |

---

## 5. Reconciliation verdict

| Dimension | Assessment |
| --------- | ---------- |
| **Traceability** | Brief executive scope, success criteria, anti-gamification, A0 phonics/voice, L1-interference, local Harness, interview + CEFR signals → **mapped** to PRD vision, journeys, FRs, SMs |
| **Open questions** | Brief §“Open questions for PRD” → **closed** in PRD §8.2 with auditable decisions |
| **Qualitative feel** | Brief states principles; PRD **UJ-1…5** is the authoritative tone spec (neutral, agent-led, self-check, no streak guilt). **Remaining gaps:** RU copy/voice guidelines, supervisor persona, retention narrative without gamification, warmth-under-neutrality — **UX / content design**, not missing FR spine |
| **Overrides** | Writing coach deferral and critical level gates are the main **scope/feel** deltas vs brief literal text; documented above |

**Recommendation for downstream work:** Treat PRD user journeys + glossary as the **tone source of truth**; pull brief addendum competitive/phonic research into **architecture** and **UX copy deck**; promote supervisor orchestration and RU finale strings in UX spec to close §3.1 gaps.

---

## 6. Document cross-reference index

| Brief section | Primary PRD anchor |
| ------------- | ------------------ |
| Executive summary | §1 Vision |
| Problem / Who | §2 Target User |
| Solution (6 bullets) | §4 Features, UJ-1…5 |
| Differentiators | §1, FR-19, FR-29, FR-24, UJ-3 |
| Success criteria | §7 Success Metrics |
| Scope In/Out | §6 MVP |
| Open questions | §8.2 Resolved, §8.1 Calibration |
| Addendum: Product decisions | FR-24, UJ-2, FR-10 |
| Addendum: Phonics research | FR-18…21, FR-33, PRD addendum §A0 phonics |
| Addendum: Architecture dump | PRD addendum, §6.2 coach shape; full plugins → architecture |
