---
title: "Reconcile — English Path PRD ↔ Architecture Spine"
status: draft
created: 2026-10-08
updated: 2026-10-08
sources:
  - ../prd-english-path/prd-english-path.md
  - ../prd-english-path/addendum.md
  - ../architecture-english-path.md
---

# Reconcile: PRD / Addendum → Architecture Spine

**Verdict:** The spine correctly lands the major structural substrate (supervisor + coaches, ports, local store, hybrid content, anti-game vocabulary, FR→module map, §8.1 deferrals). It **drops or under-binds quiet product requirements** — tone, session UX integrity, within-level vs level-gate semantics, orientation transparency fields, voice adaptation/fallback loops, and several NFR bars. One **stack choice tensions** the FR-33 WER bar.

Severity:

| Tag | Meaning |
| --- | --- |
| **GAP** | PRD/addendum requirement with no AD, convention, or capability-row bind (or bind too coarse to enforce) |
| **SOFT** | Mentioned only via FR range mapping or one-line convention; easy to lose in implementation |
| **CONFLICT** | Spine rule/stack contradicts or risks contradicting PRD |
| **OK** | Landed with enough force to survive epic/story work |
| **EXT** | Spine adds beyond PRD (compatible amplification — flag, do not treat as drop) |

---

## 1. What landed (OK)

| Area | PRD bind | Spine landing |
| --- | --- | --- |
| Paradigm / coach set | §6.2 multi-coach; writing deferred | Design Paradigm + coaches list; writing in Deferred |
| Plan ownership / no peer negotiation | FR-8 Agent-named plan | **AD-1**, **AD-3** (supervisor mouth for plan/finale) |
| Evidence single-writer | FR-12, FR-29 | **AD-1**, **AD-4**, **AD-6** |
| Local privacy / no analytics | NFR §5.1; FR-29 | **AD-5**, Logging convention, Operational envelope |
| Speech + store as ports | FR-33; §5.1 | **AD-5**, Stack adapters |
| Anti-gamification vocabulary | FR-24; SM-C1; Glossary | Consistency Conventions (evidence vocab; never unlock/XP/streak/badge) |
| Path structure + gates + generated lesson surface | FR-5, FR-22, FR-19, FR-14…17 | **AD-7** Hybrid content truth |
| Interview as genre handoff | UJ-4; FR-26…28 | **AD-3** + capability map; `readiness_rows?` on handoff |
| Snapshot + journal / resume | FR-29, FR-30; finale fact comparisons | **AD-4** |
| Prefs / next-step durable | FR-3, FR-7, FR-29 | Profile snapshot rule in AD-4 |
| Adaptive A0 thresholds (seeded) | FR-33 / §5.6 | Config convention |
| Soft-fail STT → text; no aloud “wrong” | FR-31, FR-33 | Errors convention |
| §8.1 calibration deferrals | Critical matrices; enough-runs; ms latency | Deferred table |
| Non-goals: SaaS, C1 ship, gamification, motivation_engine | §6.1 / §6.3 | Deferred + Operational envelope |
| FR capability map coverage | FR-1…FR-33 | Capability → Architecture Map (range-level) |
| Bundle packaging | Install / trusted circle | **AD-2** one `english-path` bundle |
| Host sparse UI (weak) | Addendum first-paint sparse | Host layer: “sparse UI shell” |

---

## 2. Quiet tone requirements (GAP / SOFT)

Product tone is first-class in UJ-1…UJ-5 and FR consequences. The spine mostly encodes **structure**, not **voice**. These are easy to implement as a chatty, chooser-heavy, praise-heavy coach unless bound.

| Quiet requirement | Source | Spine | Tag |
| --- | --- | --- | --- |
| **Stop anytime** without punishment framing (first-launch, return, phonics, interview) | UJ-1…UJ-5; NFR §5.4; FR-2 | No AD/convention for interrupt/stop as a session-phase right; only soft-fail ports | **GAP** |
| **No false freedom** — agent names the plan; never asks “what do you want to do?”; no mode/topic/continue-vs-review chooser | UJ-2 Decision; FR-7, FR-8; NFR §5.2 | AD-1/AD-3 cover naming + sole mouth; **no explicit anti-chooser UI invariant** (easy to add a host menu) | **SOFT** |
| **Silence without pressure** — slower repeat → RU → move on; pause does not pressure | UJ-1; FR-4 | Absent | **GAP** |
| **No welcome-back / missed-days / streak guilt** on return open | UJ-2; FR-7, FR-30 | Anti-game language bans streak/XP; **does not ban event/guilt copy** (“Welcome back!”, “you missed a day”) | **GAP** |
| **Self-check: production + reference side by side without comment; wait for Learner judgment**; no praise theater | UJ-2, UJ-5; FR-11 | Errors: never aloud “wrong” on STT reject. **No rule that Self-check channel stays silent until Learner speaks** — AD-3 handoff can let phonics/speaking coach talk over the moment | **GAP** (tone) / **SOFT** (vs AD-3) |
| **Fatigue deferral is not failure** — early stop must not write Unstable/failure solely because Session ended early; deferred material returns in next plan | FR-13 | FR-7…13 mapped to supervisor; **no evidence-commit rule for early-stop** | **GAP** |
| **Neutral finale / fact comparison** — descriptors + optional counts; never praise or points | FR-12; UJ-2 | AD-4 journal “finale facts”; conventions ban XP language; **praise/celebration screen not forbidden by name** | **SOFT** |
| **Diagnostic: no aloud right/wrong; thank-you-next; not a scored test** | FR-4; §6.1 | Folded into FR-1…6 map only | **GAP** |
| **Interview: no mid-answer prompting; formal/neutral register; critical-for-role gaps without drama; no scoreboard** | FR-27, FR-28 | Handoff to speaking coach; **no genre behavior constraints** on interviewer mouth | **GAP** |
| **Mic never mandatory with reproach**; text equal | FR-31; NFR §5.4 | Soft-fail to text; **reproach copy not banned** | **SOFT** |
| **Instruction language** RU / EN / mixed per prefs; practice content stays activity-appropriate (interview in EN) | FR-3, FR-32; NFR §5.4 | Prefs in snapshot (unnamed); **no instruction-language convention** | **GAP** |
| **Worsening → reinforcement cycle; never “burned progress” / level rollback spectacle** | UJ-3; FR-15, FR-16 | Soft/conditional advance implied via FR map + AD-7 gates; **no explicit no-rollback / no-demotion-spectacle rule** | **GAP** |
| First-paint **sparse UI** (no cards/progress bars/illustrations) | Addendum UJ-1 | Host “sparse UI shell” only — not a bind with testable UI rules | **SOFT** |

**Implication:** Without a tone/UX-integrity AD (or conventions block for session copy + Self-check silence + stop-anytime + anti-chooser), implementers can satisfy AD-1…AD-8 and still violate UJ tone.

---

## 3. Capability & constraint gaps

### 3.1 Orientation / transparency strip vs Plan object — **GAP**

| PRD | Spine |
| --- | --- |
| FR-9 / SM-2: every Session shows **level · Topic · Session goal · Available / Recommended (map status) / review status** (+ Path map context); ≤30s orientation | Plan object: `{ focus, blocks[], length_min, genre? }` |

**Drop:** Topic, Session goal, map Available/Recommended, review status are not in the plan schema or conventions. NFR §5.2 **≤30s** orientation bar is unbound.

**Risk:** SM-2 fails while “Agent-named plan” still appears to pass.

### 3.2 Within-level queue vs Critical level gates — **GAP** (high product risk)

| PRD | Spine |
| --- | --- |
| FR-17 / FR-21 / UJ-3↔UJ-5: Unstable phonemes (within-level) **never** flip next lesson to Not available; only unmet **Critical criteria** hard-block a **Level transition** | AD-7: content pack owns “level-transition criteria / critical gates”; FR-14…17 mapped to supervisor + assess + content |

**Drop:** No explicit architectural rule distinguishing **lesson availability** from **level access**. Easy to implement a single “gate” engine that blocks the next phonics lesson.

**Needed bind:** Supervisor + content: `Not available` applies only to Level transition; Within-level queue updates evidence/next focus only.

### 3.3 Soft / conditional advance semantics — **SOFT**

FR-15: Conditionally available ⇒ Learner **may start next-level materials** while named weak items remain Goes into review; no punishment/rollback.

Spine: overlay statuses listed in conventions; access semantics (may start vs blocked) not ruled.

### 3.4 Session length override announcement — **GAP**

FR-6 / FR-8 / UJ-1 / UJ-4: special Sessions (first-launch, Interview ~45–60) **may exceed** default pref; **agent states the longer plan up front**.

Plan has `length_min` but no rule that override ⇒ explicit Learner-facing length announcement before genre start.

### 3.5 Fatigue deferral evidence integrity — **GAP**

Covered in §2 (FR-13). Also missing: deferred new material **must** appear in next Agent-named plan (plan projection from snapshot).

### 3.6 Diagnostic conversation as a first-class phase — **GAP**

FR-4: adaptive placement, fixed silence sequence, early-stop when evidence enough, probe coverage, not scored.

Spine: only “FR-1…FR-6 → supervisor + phonics”. No phase ownership (supervisor vs assess), no early-stop commit rules, no silence policy.

### 3.7 Discrimination-before-production (FR-20) — **SOFT**

Mapped under phonics + AD-7. No coach invariant: production not forced while same/different discrimination fails.

### 3.8 Interview readiness structure — **SOFT**

PRD locks Readiness list **rows** = mock blocks (small talk · about yourself · experience · skills · scenario · his questions); no binary pass/fail.

Spine: `readiness_rows?` optional on handoff — **row taxonomy not locked** in conventions. Enough-runs correctly Deferred (§8.1).

### 3.9 Mistake patterns → review (FR-25) — **SOFT**

Capability map: FR-22…25 → supervisor + assess + vocab. No convention that recurring patterns become Goes into review / plan blocks (vs coach-private notes).

### 3.10 Empty vs non-empty profile cross-trigger (NFR §5.3) — **GAP**

FR-1 / FR-7 reliability: first-launch and return must never cross-trigger after quit/relaunch. Spine has FR-1 detection only via range map; no persistence invariant for empty-profile detection.

### 3.11 Qualified Session / SM-C2 hollow sessions — **GAP**

SM-1 / SM-C2: qualified Session = descriptor finale; hollow open/close must not inflate counts.

Spine: finale owned by supervisor; **no definition of qualified Session** for local journal/metrics (even pilot-local).

### 3.12 Glossary dual “Recommended” — **SOFT**

PRD distinguishes **Recommended (map status)** vs **Recommended review** (first lesson block). Conventions list statuses but do not separate the two senses — naming collision risk in plan/UI.

### 3.13 Prefs field set — **SOFT**

FR-3 locks three prefs + defaults (instruction language, format, session length). AD-4 says “prefs” without enumerating. Risk of re-adding interests/career/topic onboarding (explicitly out).

### 3.14 Path map dual milestone framing — **OK** (weak)

AD-7 states A0→C1 horizon + B1+/interview near-term. Sufficient if content pack encodes both; no UI convention that both are visible without implying C1 content ships (SM-C3).

---

## 4. Voice / STT-TTS quiet requirements

| Requirement | Source | Spine | Tag |
| --- | --- | --- | --- |
| A0 defaults table (word 0.35 / sentence 0.40 / phoneme 0.50; WER; rejection rate; TTS MOS/slowdown) | FR-33; §5.6; addendum | Config: seeded from FR-33; Stack notes Kokoro must pass MOS/slowdown or swap | **OK** (seed) / **SOFT** (full table not mirrored) |
| **Accept-but-low band** → attempt accepted + recorded **Unstable**, not failure | FR-33 banding | Errors only cover soft-fail + no “wrong”; **banding → Unstable commit rule missing** | **GAP** |
| **Rejection-rate adaptation** under Learner (>30% lower threshold; <10% + rising WER raise) | FR-33; §5.6 | “learner-adaptive profile fields” — **no adaptation loop owner** (supervisor vs SpeechIn) | **GAP** |
| **TTS phoneme fail → do not use that voice for that Self-check**; fall back engine/human ref; text remains valid | FR-33 | Stack: swap voice/engine if MOS/slowdown fail — **not per-phoneme**; Self-check fallback path unbound | **SOFT** |
| Self-check / phonics audio = **learner-local practice material**, not analytics | NFR §5.1 | AD-5 explicit | **OK** |
| ms latency open to architecture | §8.1 | Deferred | **OK** |

### CONFLICT — SpeechIn stack vs FR-33 WER bar

| PRD / addendum | Spine Stack |
| --- | --- |
| STT WER mixed EN–RU: **<25%** acceptable; **>35%** ship-risk. Addendum: open Whisper-class on mixed spontaneous often **70–80%** (unsuitable) | SpeechIn adapter: **faster-whisper 1.2.1** |

TTS side has an explicit “must pass FR-33 or swap” escape hatch. **STT does not.** Spine risks adopting an adapter class the addendum already flags as unsuitable for the product-locked WER bar without a swap/spike gate.

**Resolution needed in spine:** treat faster-whisper as provisional; bind FR-33 WER as adapter acceptance criteria (same force as Kokoro MOS); spike bilingual EN–RU ASR if Whisper fails pilot dialogue.

---

## 5. AD-level contradictions & tensions

| Item | Assessment |
| --- | --- |
| **AD-3 channel handoff vs Self-check silence** | Not a hard contradiction, but **underspecified tension**: genre handoff gives coach the mouth; FR-11 requires no comment until Learner judges. Needs a Self-check sub-protocol (silent playback → wait → then cue). |
| **AD-8 multiple local Learner identities** | **EXT** — PRD audience is builder + trusted circle; does not require multi-identity in one install. Compatible with NFR “no cloud multi-user accounts.” Keep as amplification; do not let “identity switch” UI become a session chooser (AD-8 already forbids in-session switch — good). |
| **AD-7 generated-first + spot-check** | Aligns FR-19. **OK**. |
| **Conventions “open/available”** | Aligns Glossary. **OK**. Ensure internal tool names like addendum `level_unlock` never surface (addendum already warns; spine coach ids avoid it — **OK** with vigilance). |
| **Assess port “thin”** | Compatible with FR-23 iterative rubrics via AD-7. **OK**. |
| **Harness network for LLM vs local progress** | Operational envelope correctly splits model network vs local learner data. Aligns privacy differentiator. **OK**. |

No AD directly contradicts soft/conditional advance, anti-game positioning, or writing-deferred. Main hard tension is **Stack STT choice vs WER bar** (§4).

---

## 6. FR coverage audit (coarse)

| FR | Landed? | Notes |
| --- | --- | --- |
| FR-1 | SOFT | Detection via range map; no empty-profile reliability rule |
| FR-2 | GAP | Greeting + stop anytime tone unbound |
| FR-3 | SOFT | Prefs unnamed in snapshot |
| FR-4 | GAP | Diagnostic phase/silence/early-stop unbound |
| FR-5 | OK | AD-7 path structure |
| FR-6 | SOFT | Immediate phonics via map; length override announce GAP |
| FR-7 | SOFT | Structure OK; guilt/event copy GAP |
| FR-8 | OK/SOFT | AD-1/AD-3; anti-chooser not explicit AD |
| FR-9 | GAP | Plan schema ≠ SM-2 fields; ≤30s unbound |
| FR-10 | SOFT | Review as first block — supervisor responsibility only via range |
| FR-11 | GAP | Self-check silence/wait unbound |
| FR-12 | OK/SOFT | Finale ownership OK; praise screen SOFT |
| FR-13 | GAP | Fatigue non-failure + plan deferral |
| FR-14 | OK | Overlay statuses in conventions; AD-1/AD-7 |
| FR-15 | SOFT | Conditional start-allowed semantics weak |
| FR-16 | OK | Principle + Deferred matrices; no-rollback GAP (§2) |
| FR-17 | GAP | Within-level vs level-gate rule missing |
| FR-18 | OK | Phonics coach + AD-3/AD-7 |
| FR-19 | OK | AD-7 generated-first + spot-check |
| FR-20 | SOFT | Discrimination-before-production unbound |
| FR-21 | GAP | Tied to FR-17 |
| FR-22 | OK | AD-7 + Deferred C1 |
| FR-23 | OK | AD-7 iterative rubrics |
| FR-24 | OK | Conventions |
| FR-25 | SOFT | Mistake → review path weak |
| FR-26 | OK | Speaking handoff + length in plan |
| FR-27 | GAP | Mock interviewer behavior unbound |
| FR-28 | SOFT | readiness_rows?; row taxonomy unlocked |
| FR-29 | OK | AD-4/AD-5/AD-8 |
| FR-30 | SOFT | Resume OK; guilt copy GAP |
| FR-31 | SOFT | Text path OK; reproach SOFT |
| FR-32 | GAP | Instruction language convention missing |
| FR-33 | OK seed / GAP adapt / CONFLICT STT stack | See §4 |

---

## 7. NFR / success-metric quiet drops

| Item | Tag |
| --- | --- |
| NFR §5.2 ≤30s orientation | **GAP** |
| NFR §5.2 no chooser (UX integrity) | **SOFT** (see §2) |
| NFR §5.3 profile cross-trigger | **GAP** |
| NFR §5.4 stop anytime + channel clarity | **GAP** / **SOFT** |
| NFR §5.5 anti-game as ship-quality bar | **OK** (conventions) — elevate if UI regressions appear |
| SM-1 qualified Session / SM-C2 hollow guard | **GAP** |
| SM-2 field list = FR-9 | **GAP** (same as §3.1) |
| SM-3 / SM-4 / SM-5 | **OK** enough via path/assess/interview maps; calibration Deferred |
| SM-C3 premature C1 content | **OK** (Deferred + AD-7 horizon) |

---

## 8. Addendum items — promote vs leave parked

| Addendum note | Action for spine |
| --- | --- |
| Generated-first + spot-check; multi-coach; no motivation_engine | Already **OK** |
| Whisper WER warning | Promote as **adapter acceptance** / spike — see CONFLICT |
| Sparse first paint; greeting bilingual reference | UX companion; optional Host UI convention |
| Illustrative `phonics_mastery.*` / `weak_point` | Leave to persistence stories; AD-4 statuses sufficient |
| Interview agent roles interviewer/observer/debriefer | Compatible with AD-3 speaking handoff; bind FR-27 behavior |
| Intermediate/Advanced STT % table | Parked — A0 defaults locked; later bands not v1 force |
| Sample lesson tool names (`level_unlock`, etc.) | Keep internal-only; never Learner-facing (**OK** vigilance) |

---

## 9. Recommended spine patches (priority)

1. **P0 — Within-level vs Critical gate rule** (new AD or AD-7 bullet): `Not available` only for Level transition Critical unmet; Within-level queue never blocks next lesson Availability.
2. **P0 — STT adapter acceptance:** FR-33 WER bar binds SpeechIn like MOS binds SpeechOut; mark faster-whisper provisional pending pilot WER.
3. **P0 — Self-check sub-protocol** under AD-3: silent side-by-side playback → wait for Learner → then neutral confirm/cue; coach handoff may not narrate over Self-check.
4. **P1 — Session UX integrity convention (tone):** stop anytime; no chooser; no welcome-back/missed-days; no praise theater; no reproach for text/mic; fatigue early-stop does not write failure/Unstable; no burned-progress/rollback spectacle.
5. **P1 — Expand Plan / orientation schema** to FR-9/SM-2 fields; bind ≤30s orientation.
6. **P1 — Voice adaptation owner:** accept-but-low → Unstable; rejection-rate threshold adapt in profile; TTS per-phoneme fallback.
7. **P2 — Instruction-language convention** (FR-32); prefs enumeration (FR-3); Readiness row taxonomy; FR-27 interviewer constraints; FR-4 diagnostic silence/early-stop; qualified Session journal flag; empty-profile cross-trigger invariant.

---

## 10. Summary table — top gaps

| # | Dropped / contradicted quiet requirement | Severity |
| --- | --- | --- |
| 1 | Within-level queue vs Critical level-gate (FR-17/21) unbound | **GAP** P0 |
| 2 | faster-whisper vs FR-33 mixed WER / addendum Whisper warning | **CONFLICT** P0 |
| 3 | Self-check silence + wait (FR-11) vs coach handoff mouth | **GAP** P0 |
| 4 | Stop anytime / anti-chooser / no guilt-return / fatigue non-failure / no rollback spectacle | **GAP** P1 tone pack |
| 5 | FR-9/SM-2 orientation fields + ≤30s vs thin Plan object | **GAP** P1 |
| 6 | STT banding → Unstable + rejection-rate adaptation owner | **GAP** P1 |
| 7 | Diagnostic silence/early-stop; interview mock behavior; instruction language | **GAP** P2 |
| 8 | Qualified Session / SM-C2; empty-profile cross-trigger | **GAP** P2 |

**Bottom line:** Architecture spine is a solid **build substrate** for modules and ports. It is **not yet a complete product contract** for English Path’s quiet integrity rules (tone, gates-vs-queue, transparency strip, voice adaptation). Patch P0–P1 before epics treat the spine as closed.
