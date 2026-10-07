# PRD Quality Review — English Path

## Overall verdict
English Path is a coherent, decision-ready product bet: anti-gamification path coaching for Russian L1 adults toward B1+/interview on local DeepSeek Harness, with sharp UJs, glossary discipline, explicit Non-Goals, and counter-metrics that actually guard the thesis. What is at risk is mid-path done-ness — A0→B1+ syllabus between phonics and interview is asserted as MVP ship (SM-5 / FR-22) with far less testable detail than UJ-4/UJ-5 — plus several FRs without consequences and pilot metrics (SM-3/SM-4) that may not fire for A0 starters in the first 30 days. Ready for Finalize with targeted hardening, not a rewrite.

## Decision-readiness — strong
Trade-offs are named as choices, not smoothed. Vision and Non-Goals give up streaks/XP, SaaS polish, C1-as-ship, binary interview pass, and scored placement (§1, §6.1). UJ-2 locks a product-wide decision in plain language: “Return opens never present a mode/topic/continue-vs-review chooser.” FR-19 and §8.2 record generated-first + spot-check as a resolved content-ops bet. Addendum conflict table (“Brief wins” on gamification, B2/C1 ship, hard unlocks) shows objections were entertained, not buried.

§8 claims “No open product questions remaining for Finalize triage” while parking Critical criteria lists, interview cadence, and ms latency as owned calibration (§8.1). That split is honest enough for Finalize: principles constrain the answer space; a decision-maker is not being sold fake closure on thresholds. Remaining risk is that green-light-to-build still depends on assessment design before A0→A1 hard-blocks are real — surfaced, not dodged.

### Findings
- **medium** Assessment calibration is a ship dependency without a PM tension callout (§8.1, FR-16) — Critical criteria “exact lists and evidence thresholds are assessment-design calibration” means level hard-blocks cannot be verified until that work lands; §8 frames this as closed for Finalize. *Fix:* Add a short `[NOTE FOR PM]` that pilot A0→A1 cannot ship a working hard-block without the assessment matrix, and name the gate (e.g. “block level-transition QA until A0→A1 Critical set exists”).

## Substance over theater — strong
Content is earned. One protagonist (Alex) drives all five UJs; there is no persona parade. Differentiation is specific to Discovery: Agent-named plan vs “false freedom,” Self-check without praise, soft/conditional Level transition, RU L1-interference phonics, local privacy vs tutor schedules — not a generic “AI tutor” claim. NFRs in §5.6 / FR-33 carry product-specific STT/TTS numbers, not “must be scalable/secure.” Vision cannot be swapped into another ESL PRD without breaking Russian L1, A0 phonics, B1+/interview milestone, and Harness-local framing.

### Findings
_(none — dimension holds without furniture flags)_

## Strategic coherence — strong
Thesis is clear and repeated with consistency: retention from “clear plan, session transparency, and soft/conditional level advance — not streaks, badges, or XP” (§1); near-term “B1+/interview readiness”; C1 as map horizon only. Feature groups follow that arc (first-launch → session shell → level transition → phonics → path → interview → voice). Success Metrics include counter-metrics that match the bet (SM-C1 gamification, SM-C2 hollow sessions, SM-C3 premature C1) — rare and load-bearing. MVP kind fits a problem-solving / experience pilot for “builder + trusted circle” (§6.2).

The weak seam is metric timing vs audience: an A0-start circle in “first 30 days” (SM-1) will rarely exercise Interview practice or show B1+ trend, so SM-3/SM-4 risk measuring a later band while SM-1 carries the whole pilot.

### Findings
- **high** SM-3 / SM-4 misaligned with A0-start 30-day pilot (§7) — SM-3 asks for “Assessment trending toward B1+”; SM-4 asks for “Interview practice in use as a success path”; SM-1’s window is “first 30 days” for builder + circle who may still be in A0 phonics (UJ-1/UJ-5). *Fix:* Scope SM-3/SM-4 to learners at/near the B1+ milestone (or a later window), and add an A0-band leading indicator (e.g. phonics Self-check usability / unstable→confirmed movement) for the 30-day pilot.
- **medium** Mid-path syllabus carries thesis weight with thin narrative (§4.5, SM-5) — “Syllabus travel A0 → B1+” and “usable iterative assessment rubrics” are MVP-in-scope, but only phonics and interview get journey-depth; grammar/vocab/speaking between bands are named in the multi-coach list (§6.2) without UJ-level arcs. *Fix:* Either add one mid-path UJ (or FR consequences) for a typical A1–A2 return block, or explicitly de-scope “full band content” vs “path + coach roles with iterative materials” in §6.2.

## Done-ness clarity — adequate
Where the PRD cares most — first launch, return shell, level-transition principle, interview genre, A0 voice bar — FRs often ship testable consequences (FR-1–FR-12, FR-14, FR-16, FR-19, FR-21, FR-24, FR-26, FR-28, FR-33). Adjectives that usually rot NFRs are largely replaced by numbers in §5.6. Calibration deferrals are labeled as such rather than fake precision.

Gaps remain for story creation: several FRs have no Consequences block; fatigue and “discrimination holds” are unbound; and FR-22/FR-23 assert an entire A0→B1+ curriculum surface without a verifiable “done” bar beyond “usable iterative rubrics” and “C1 not required.”

### Findings
- **high** A0→B1+ path FRs under-specify done (§4.5 FR-22, FR-23) — FR-22 only locks “v1 does not require C1 essay/stylistics”; FR-23 locks “usable iterative rubrics for A0→B1+” without saying what minimum materials, modes, or evidence artifacts must exist per band for SM-5 (“Learner can travel A0 → B1+”) to pass. *Fix:* Add consequences per band or an MVP content matrix (e.g. A0 phonics + A1…B1 minimum lesson shapes / assess outputs) or reword SM-5/FR-22 to “path infrastructure + coach roles with iterative content growth” if full travel is not first-pilot ship.
- **high** Multiple FRs lack testable consequences (§4.2–4.8) — FR-13, FR-15, FR-17, FR-18, FR-20, FR-25, FR-27, FR-29–FR-32 state capability without a Consequences block; engineers cannot derive fail/pass from the FR alone (UJ prose helps but is not a substitute for FR-level checks). *Fix:* Add at least one verifiable consequence per FR (even negative: “fatigue deferral never writes failure/Unstable solely for early stop”).
- **medium** Fatigue detection undefined (FR-13, UJ-2 step 4) — “when the Learner is fatigued” has no signal (explicit stop, silence pattern, Learner utterance, agent offer). *Fix:* Lock the trigger (e.g. Learner stop / “tired” / agent offer after N blocks) and a consequence that deferred new material appears in next Agent-named plan.
- **medium** “Discrimination holds” unbound (FR-20) — no observable condition for leaving ear-tuning; conflicts with the PRD’s own habit of marking thresholds as calibration or numbers. *Fix:* Point to assessment calibration (like FR-16) or a minimal observable (e.g. N correct same/different before production).
- **low** Reliability NFR uses an adjective (§5.3) — “reliable enough that first-launch and return flows do not false-trigger” restates FR-1/FR-7 without a bound. *Fix:* One operational check (e.g. empty vs non-empty profile never cross-triggers across quit/relaunch in pilot scenarios).

## Scope honesty — strong
Omissions do real work. §2.2 Non-Users, §6.1 Non-Goals, and §6.3’s out-of-scope table with Why cover gamification, SaaS, C1 ship content, Critical lists, ms latency, writing coach, telemetry, and first-launch interest prefs. Multi-coach shape and writing deferral are explicit in §6.2. Addendum keeps architecture depth “Not PRD requirements until promoted” and records brief-vs-lesson-table conflict resolution. Open-item density is low for product questions and high for named calibration owners — appropriate for “Ready for Finalize.”

Honesty soft spot: full A0→B1+ travel is in MVP (§6.2, SM-5) while mid-band lesson substance lives largely as addendum “candidates,” so readers may assume complete band content is in v1 ship. Also, zero `[ASSUMPTION]` tags despite several unconfirmed operational bets (circle retention bar, Harness meeting STT/TTS floor, spot-check ops capacity).

### Findings
- **medium** MVP “travel A0→B1+” vs content completeness ambiguity (§6.2, SM-5, addendum lesson shapes) — PRD lists syllabus travel and five coaches as in scope; addendum still treats many lesson shapes/tools as promote-selectively candidates. *Fix:* One `[NON-GOAL for MVP]` or §6.2 sentence stating whether v1 ships complete materials through B1+ or path + roles with iterative fill-in (and what “SM-5 pass” means in the pilot).
- **medium** Unmarked assumptions / no Assumptions Index (PRD-wide) — Inferences such as ≥5 sessions/week being a fair circle bar (SM-1), generated-first + human spot-check being operable (FR-19), and A0 RU L1 STT/TTS defaults being achievable on Harness (FR-33) are not tagged `[ASSUMPTION]` or indexed. *Fix:* Tag those three (and any others PM did not explicitly confirm) and add a short Assumptions Index.

## Downstream usability — adequate
Chain-top shape is intentional (brief → PRD → UX/architecture/stories). Glossary is present and mostly enforced; UJ-1…UJ-5, FR-1…FR-33, SM-1…SM-5 / SM-C1…SM-C3 are contiguous and cross-linked (“Realizes UJ-…”, “Supports SM-…”). Every UJ names Alex inline. Addendum correctly parks plugin names and sample tables for architecture.

Extractability weakens where Glossary and status vocabulary drift, where SM-2’s field list diverges from FR-9, and where mid-path FRs are too thin to story-split without inventing product behavior.

### Findings
- **medium** Glossary incomplete for status vocabulary in use (§3 vs UJ-3 / FR-14 / FR-5) — Finale/overlay uses “almost confirmed,” “threshold reached,” and Path map “recommended” alongside Available / Open; Glossary defines Confirmed, Unstable, Goes into review, Available / Open, Conditionally available, Not available — but not almost confirmed, threshold reached, or recommended-as-access-status (Recommended review is defined as a block, not a map status). *Fix:* Add the missing status terms to §3 or strike synonyms from UJ-3/FR-14/FR-5.
- **medium** Mid-path thinness blocks clean story extraction (§4.5, §6.2 multi-coach) — Grammar / vocab(+SRS) / speaking (non-interview) / assess are in-scope coaches without FR consequence sets comparable to phonics/interview; UX and story workflows will invent. *Fix:* Same as Strategic coherence — minimum FR/UJ spine for non-phonics mid-path, or explicit deferral of band content.
- **low** SM-2 vs FR-9 orientation fields diverge (§7 SM-2, FR-9) — SM-2 requires “level · topic · Session goal · Available / recommended / review status”; FR-9 lists “level, Unstable items, Available now, next step / Session goal, and Path map context” (no “topic”). *Fix:* Align the field list in one place (Glossary or FR-9) and make SM-2 reference it.

## Shape fit — strong
Product type is a meaningful-UX learning coach (consumer-quality experience, local/single-runtime pilot). UJs with a named protagonist are load-bearing and present at the right density (five spine journeys, not a journey for every button). Capability detail for voice/assessment sits in FRs/NFRs without forcing regulatory traceability theater. Chain-top expectations match the document’s glossary, IDs, and addendum parking. Not over-formalized for a single-operator tool; not under-formalized for a path product.

### Findings
_(none)_

## Mechanical notes
- **ID continuity:** UJ-1…UJ-5, FR-1…FR-33, SM-1…SM-5, SM-C1…SM-C3 — contiguous; cross-refs generally resolve. No duplicates spotted.
- **Glossary drift:** “you are here” / “you-are-here”; “Available / Open” vs lowercase “available / open”; “recommended” dual use (review block vs map status); “almost confirmed” / “threshold reached” used in UJ-3/FR-14 but absent from §3. “Readiness list” rows use “his questions” (UJ-4) vs “learner questions” (addendum) — minor.
- **Assumptions Index roundtrip:** No inline `[ASSUMPTION]` tags and no index — N/A mechanically, but see Scope honesty finding.
- **UJ protagonists:** All five UJs carry Alex with inline context — pass.
- **Addendum naming:** Candidate tools include `level_unlock` / `motivation_engine`; conflict resolution correctly keeps them out of PRD requirements — watch architecture so unlock naming does not leak into Learner-facing copy (FR-24).
- **Required sections:** Vision, users/UJs, Glossary, Features/FRs, NFRs, Non-Goals/MVP, Success Metrics (+ counters), Open Questions — present for agreed stakes.
