# Adversarial Review — English Path PRD (+ Addendum)

**Reviewed:** `prd-english-path.md`, `addendum.md`  
**Lens:** contradictions, untestable FRs, scope holes, metric gaps, gamification leaks  
**Date:** 2026-10-07

## Verdict

**Hold for Finalize — narrative and anti-gamification stance are unusually strong, but v1 ship criteria rest on deferred assessment matrices, subjective voice bars, and success metrics that are either unmeasurable at pilot scale or risk reintroducing scoreboard psychology.** The PRD correctly parks calibration in §8.1; adversarially, that leaves FR-14–FR-17, FR-23, FR-28, and much of FR-4/FR-20 without acceptance tests a builder can run before pilot. Fix metric definitions, gate interview/syllabus transitions in FRs, and scrub addendum/architecture leaks (`level_unlock`, percentage mastery) before calling the PRD “Finalize-ready.”

---

## Findings

### [CRITICAL] Level transition FRs are principle-only — no shippable acceptance tests

**Location:** FR-14–FR-17, UJ-3, §8.1 (FR-16 Critical criteria); addendum “Soft level-advance evidence UX” (540/600 vocab, 80% reading)

**Attack:** FR-16 explicitly defers “exact per-transition lists” and evidence thresholds. FR-14–FR-15 require showing “almost confirmed,” “Conditionally available,” and dual path-map status, but nothing defines *when* the overlay fires, how many criteria exist per transition, or what evidence counts. Addendum illustrates numeric mastery (540/600, 70% vs 80% listening) that the PRD forbids on the path map (FR-5) — if assessment design copies the addendum, the product contradicts its own transparency vocabulary.

**Why it matters:** UJ-3 is a core MVP promise (§6.2). Without at least one locked transition spec (recommended: A0→A1 per §8.1 revisit trigger), engineering and QA cannot falsify “soft advance works” or “critical hard-block works.” Pilot success SM-3/SM-5 become opinion.

**Suggested fix:** Promote a **pilot-minimum** A0→A1 matrix: category names, critical vs non-critical split, and binary pass rules for *one* transition only; mark all other transitions explicitly “stub until post-pilot.” Ban percentage/quota displays in learner-facing transition UX in the same doc section; allow descriptors only. Align addendum examples with “illustrative — not learner-facing numbers.”

---

### [CRITICAL] SM-1 (≥5 sessions/week) conflicts with anti-gamification and untestable pilot denominator

**Location:** SM-1; §6.2 v1 audience; FR-24, SM-C1; UJ-2 (no streak guilt)

**Attack:** Primary success metric optimizes **session frequency**, the same behavioral lever streak products use, while SM-C1 says not to optimize streak length. No definition of “session” minimum (SM-C2 warns hollow micro-sessions but SM-1 doesn’t require finale quality). “Builder + trusted circle” is an undefined set size — one learner can satisfy or fail SM-1 by arbitrary interpretation.

**Why it matters:** Teams will instrument “opens” or “messages” to hit SM-1, recreating habit loops the PRD rejects. Counter-metric SM-C2 is not wired into SM-1 (no “qualified session” definition).

**Suggested fix:** Replace or supplement SM-1 with **qualified sessions/week** (must include descriptor finale + ≥1 evidence-bearing block per FR-12). Cap pilot N in the metric (e.g. “≥3 qualified sessions/week median across pilot cohort ≥3 learners”). Document that frequency is diagnostic, not a optimization target — primary outcome stays SM-3/SM-4 evidence.

---

### [HIGH] First-launch “one session” blows default 10‑minute pref and session-length FR

**Location:** UJ-1; FR-3 (default 10); FR-4 (≈5–8 min diagnostic); FR-6 (≈8 min phonics); FR-9 (≤30s orientation on return, not first launch)

**Attack:** First launch stacks setup + 5–8 min diagnostic + path map + ~8 min phonics — realistically **20–35+ minutes**, while FR-3 defaults session length to **10** and presents length as a learner pref *before* diagnostic. No FR states first-launch ignores length pref or renegotiates mid-session.

**Why it matters:** Contradiction undermines “session length pref” as a contract and confuses test plans (“default 10” vs UJ-1 outcome). Fatigue deferral (FR-13) doesn’t cover “first launch must complete phonics in same session” (FR-6).

**Suggested fix:** Add FR consequence: first-launch is a **bootstrap session** exempt from length pref with stated expected duration band (e.g. 25–40 min) OR split FR-6 to allow phonics on **next** return while keeping “learning act” in session one (mini phonics only). Align UJ-1 copy with chosen rule.

---

### [HIGH] FR-13 fatigue deferral has no detectable trigger — untestable

**Location:** FR-13; UJ-2 step 4 (“If Alex is tired…”)

**Attack:** Requirement is purely agent-behavioral with no signals: explicit learner utterance, early stop, timing, error rate, or “stop anytime.” QA cannot verify “system can stop early when fatigued” vs “agent sometimes stops.”

**Why it matters:** False negatives block shipping; false positives defer syllabus indefinitely with no persisted “deferred reason” in FR-29.

**Suggested fix:** Define **fatigue deferral triggers** (minimum: learner says stop/tired; optional: learner invokes stop control; optional: agent offers deferral after N silent/minimal responses). Persist `deferred_new_material: true` + next-step unchanged in profile; add testable consequence.

---

### [HIGH] Interview access and “B1+/interview milestone” lack gating FRs

**Location:** UJ-4; FR-26; SM-4; FR-22; path map “near-term milestone”

**Attack:** FR-26 says interview runs when “Agent-named plan selects it at the B1+/interview milestone” but no FR defines **milestone attainment** (level label? assess coach output? manual flag?). Soft/conditional advance (FR-15) allows starting next band with weak items — can the agent name 45–60 min interview while descriptors still A2?

**Why it matters:** Scope hole: interview is v1 ship scope (§6.2) but entry conditions are narrative-only. SM-4 (“in use as success path”) is satisfied by one premature mock, undermining “work-ready” vision.

**Suggested fix:** Add **FR-26a**: interview plan available only when assess evidence ≥ pilot rubric threshold for speaking/register *and* path position ≥ B1 band (define band source). SM-4: require **complete** prep→mock→debrief with Readiness list, ≥N per pilot cohort, not single use.

---

### [HIGH] FR-20 / FR-4 “holds” and “enough evidence” defer all thresholds — core loops untestable

**Location:** FR-4 (early-stop, silence sequence timings); FR-20 (discrimination holds); UJ-1 silence note; §8.1

**Attack:** Consequences say “exact wait durations” and “exact evidence cutoffs are calibration” — acceptable for polish, but **discrimination holds** and **placement enough** are gating logic for phonics and level. Without pilot floors, two implementations both “comply.”

**Why it matters:** A0 path is MVP spine; FR-18–FR-21 depend on FR-20. Regression tests cannot be written from PRD alone.

**Suggested fix:** For v1 pilot, lock **minimum observable rules**: e.g. N consecutive correct same/different for a pair before production; diagnostic early-stop after mandatory probe subset completed OR learner stop. Keep fine tuning in calibration doc referenced by FR ID.

---

### [HIGH] Voice quality bars (FR-33 / §5.6) are not operationally testable as written

**Location:** FR-33; §5.6; addendum STT/TTS section

**Attack:** MOS, mixed EN–RU WER, and “rising WER” adaptation require lab-style evaluation not scoped in MVP (no harness test protocol, no who runs MOS, no sentence corpus). STT “confidence” is engine-specific — thresholds are product-locked but not tied to a chosen engine. Rejection rate 10–25% per lesson needs attempt accounting — not in FR-29 persistence model.

**Why it matters:** Ship-risk gates (>35% WER, MOS <3.5) cannot block a release without a defined measurement procedure; SM set has **no** voice-quality success metric.

**Suggested fix:** Add NFR **measurement protocol** (pilot: fixed phrase list + 3 RU L1 speakers, quarterly re-run) OR downgrade numeric gates to **architecture targets** and add product SM: “Self-check completion rate ≥X% without learner abandoning voice channel.” Keep adaptive logic in FR-33 but tie adaptation to **observable** fields (attempt count, soft reject count).

---

### [MEDIUM] SM-2 requires “topic” — undefined in glossary and inconsistent in FR-9

**Location:** SM-2; FR-9 (level, Unstable, Available now, next step / Session goal); Glossary §3

**Attack:** SM-2 mandates “level · topic · Session goal · …” every session. Glossary defines Session goal only via FR-9 phrasing; **topic** never defined (phoneme? grammar unit? interview scenario?). FR-9 lists “next step / Session goal” but not topic.

**Why it matters:** Transparency metric SM-2 is the primary UX accountability bar — ambiguous “topic” makes SM-2 unauditable and invites filler labels.

**Suggested fix:** Add glossary term **Session topic** (syllabus unit ID, phonics contrast set, or interview scenario name). FR-9 consequence: finale and orientation both show same topic string; SM-2 references glossary term.

---

### [MEDIUM] Attempt-count “fact comparison” (2/7 vs 4/7) is a scoreboard leak

**Location:** UJ-2 step 5; FR-12; addendum UJ-2

**Attack:** PRD bans points, percentages on placement, and praise theater — but encourages neutral **attempt ratios** session-over-session. For learners, monotonic “4/7 vs 2/7” reads as performance grading and optimization target (gamification psychology without XP label).

**Why it matters:** Violates spirit of FR-24/SM-C1; coaches may narrate ratios as implicit scores.

**Suggested fix:** Restrict comparison to **descriptor deltas** (“one more contrast stable”) or qualitative fact (“fewer retries on /θ/”); if counts shown, cap to single activity and avoid fractional success rates — or move counts to developer diagnostics only.

---

### [MEDIUM] Non-user vs FR-31: “refuse voice” excluded but voice-first A0 is first-class

**Location:** §2.2 Non-Users; Vision; FR-31; UJ-5; FR-33 (A0 voice quality)

**Attack:** Non-users include “Absolute beginners who refuse any voice or sound work” while product promises text channel equality and local practice. First session **requires** diagnostic with contrast sounds and phonics lesson “ear → articulation” — text-only path for A0 is underspecified (spelling-as-goal excluded in UJ-5).

**Why it matters:** Scope and accessibility hole; sales/support contradiction (“text equal” vs de facto voice-required A0).

**Suggested fix:** Either narrow non-user wording to “will not use mic at all **and** rejects audio playback” with explicit out-of-scope, OR add FR **A0 text-only degradation path** (subtitles for contrasts, typed discrimination) with stated limitations in path map.

---

### [MEDIUM] Multi-coach day-one scope vs deferred writing — B1+ “work-ready” gap

**Location:** §6.2 v1 coach shape; §6.3 writing deferred; FR-22 A0→B1+; UJ-4 prep (STAR, posting)

**Attack:** v1 ships grammar, vocab+SRS, speaking, assess, phonics — **no writing coach**. B1+ interview prep assumes learner can produce written STAR/raw material “coach helps into English” without a dedicated writing genre. Syllabus FR-22 promises travel to B1+ with no FR for writing evidence toward B1+.

**Why it matters:** “Work-ready English” and interview readiness partially depend on written prep; scope hole may force speaking coach to absorb writing, blurring coach boundaries untested in FRs.

**Suggested fix:** State in §6.2/FR-22 that **writing evidence** for v1 is speaking-coach-assisted dictation/text channel only, not structured writing progression; adjust SM-3 rubric scope to exclude formal writing **or** add minimal FR for “prep notes” persistence without full writing coach.

---

### [MEDIUM] FR-19 content ops: “before or soon after” learner-facing use — safety/quality hole

**Location:** FR-19 consequences; addendum phonics generated-first

**Attack:** Generated-first pairs with human spot-check “before **or soon after**” allows unreviewed assets in live sessions. No FR for rollback, harmful wrong-pair detection, or block on failed spot-check.

**Why it matters:** L1 interference teaching wrong contrasts is worse than no lesson — pilot trust risk.

**Suggested fix:** Tighten to **no learner-facing use until spot-check pass** for v1 pilot; log content ID + reviewer stamp in profile/addendum schema; fail closed to last approved set.

---

### [MEDIUM] Addendum tool inventory reintroduces gamification and hard-unlock semantics

**Location:** addendum “Sample lesson shapes”; `level_unlock`, `motivation_engine`; phonics “level_unlock A0→A1”

**Attack:** Conflict table says brief wins, but downstream text still maps course coupling to **`level_unlock`** and lists **`motivation_engine`** in lesson tables as candidate tools. Architects copying addendum verbatim will implement unlock flags and motivation plugins contrary to FR-24.

**Why it matters:** Gamification leak via implementation backdoor; contradicts Glossary “Available / Open” vs unlock.

**Suggested fix:** Rename candidates in addendum to **`level_transition_assess`** / **`access_status`**; strikethrough or move `motivation_engine` to “explicitly rejected” appendix; cross-link FR-24 in addendum header as hard filter for plugin promotion.

---

### [MEDIUM] “Recommended” status used but not glossary-locked

**Location:** FR-5, FR-9 consequences; UJ-1 step 4; Glossary §3

**Attack:** UI/status vocabulary includes **recommended** alongside available/open; glossary does not define **Recommended** as a formal term (only “Recommended review” as a block). Agents may synonymize with “suggested” or gamified “daily goal.”

**Why it matters:** SM-2 and anti-unlock language depend on consistent status lexicon.

**Suggested fix:** Add **Recommended (material)** to glossary with allowed UI contexts; forbid “recommended” as nudge streak copy.

---

### [LOW] §8 “No open product questions” overclaims while calibration owns core behavior

**Location:** §8 intro; §8.1 table

**Attack:** States “No open product questions remaining for Finalize” while FR-16, FR-28, latency, and de facto FR-4/FR-20 behavior remain open by design.

**Why it matters:** Process risk — stakeholders treat PRD as complete; engineering discovers untestable FRs at implementation.

**Suggested fix:** Reword to “No open **strategic** product questions; **pilot-blocking calibration** listed in §8.1 must complete before v1 exit criteria.”

---

### [LOW] SM-3 “trending toward B1+” without time horizon or rubric version

**Location:** SM-3; FR-23; §6.3 academic-perfect rubrics out of scope

**Attack:** “Trending” is neither defined (slope over N sessions? descriptor count?) nor time-bounded for 30-day pilot in SM-1.

**Why it matters:** Metric gap — pilot report can claim success without B1+ proximity.

**Suggested fix:** Pilot SM-3 sub-criterion: assess coach outputs ≥1 level-band step change **or** M of K critical B1 competencies move Unstable→Confirmed per published v1 rubric version ID.

---

### [LOW] FR-1 empty profile — corrupt/partial state unspecified

**Location:** FR-1; §5.3 reliability; addendum `learner.db`

**Attack:** Only empty vs non-empty branching; partial migration, zeroed fields, or corrupted DB could trigger wrong flow (re-onboarding vs return).

**Why it matters:** Edge case for local persistence NFR; UJ-2 “no re-onboarding” could break.

**Suggested fix:** Add consequence: defined **profile schema version** + repair path (treat invalid as empty with one-time warning) — detail in architecture, principle in FR-29.

---

### [LOW] Conditionally available + interview milestone — progression ethics undocumented

**Location:** UJ-3; FR-15; Vision (work-ready, interview B1+)

**Attack:** Learner can start next-level materials while weak foundations queue in review — PRD says no punishment, but doesn’t warn when **interview** or **employer-facing** scenarios become agent-named despite Conditional status.

**Why it matters:** Trust/reputation if Readiness list says “needs another run” while path map shows B1+ milestone “available.”

**Suggested fix:** FR-15 consequence: when **Conditionally available**, agent-named plan must prefer review-weighted syllabus until Critical clear; interview FR gating (see HIGH finding) enforced separately.

---
