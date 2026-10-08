---
title: "Reconcile — English Path PRD / UX ↔ Architecture Spine"
status: ready-for-finalize
created: 2026-10-08
updated: 2026-10-08
sources:
  - ../prd-english-path/prd-english-path.md
  - ../prd-english-path/addendum.md
  - ../ux-english-path/EXPERIENCE.md
  - ../ux-english-path/DESIGN.md
  - ../architecture-english-path.md
prior: "Overwrites prior draft that flagged P0/P1 tone/gates/plan/voice gaps."
---

# Reconcile: PRD / Addendum / UX → Architecture Spine

**Verdict: P0/P1 closed.** Spine is fit for finalize on quiet requirements previously flagged. Remaining items are **P2 / SOFT** only (epic-level detail, not substrate blockers).

| Tag | Meaning |
| --- | --- |
| **CLOSED** | Prior GAP/CONFLICT now bound by AD or convention with enough force |
| **GAP** | Still unbound (severity noted) |
| **SOFT** | Landed coarsely; easy to lose if epics ignore UX companions |
| **OK** | Already solid; unchanged |

---

## 1. Prior P0 / P1 — closure check

| # | Prior item | Where it landed | Status |
| --- | --- | --- | --- |
| P0 | Within-level queue vs Critical level-gate (FR-17/21) | **AD-11** | **CLOSED** |
| P0 | faster-whisper vs FR-33 WER / addendum Whisper warning | Stack: provisional + swap; Config: FR-33 WER binds adapter acceptance | **CLOSED** |
| P0 | Self-check silence + wait (FR-11) vs coach handoff | **AD-3** binds FR-11; prevents graded praise; Tone pack “Noted.”; Host UI defers interaction rules to `EXPERIENCE.md` (pending / wait / yes-no) | **CLOSED** |
| P1 | Tone pack (stop / anti-chooser / no guilt / fatigue non-failure / no rollback spectacle) | Conventions **Tone pack** | **CLOSED** |
| P1 | FR-9 / SM-2 Plan strip + ≤30s | Conventions **Plan object** (`level` · `topic` · `session_goal` · `available` · `recommended`; ≤30s) | **CLOSED** |
| P1 | Voice adaptation (accept-but-low → unstable; threshold owner; TTS per-phoneme fallback) | Conventions **Voice adaptation** + Config | **CLOSED** |
| P1 | UX host-shell / token bind | Paradigm + **Host UI shell** → `DESIGN.md` (Paper Lamp) + `EXPERIENCE.md`; spine does not restate tokens | **CLOSED** |

### UX addendum (same file)

| UX claim | Spine | Status |
| --- | --- | --- |
| Orientation strip = Level · Topic · Session goal · Available / Recommended; never Review strip token | Plan object matches `EXPERIENCE.md` (not PRD’s older “review status” wording — UX wins on chrome) | **OK** |
| Caption toggles on play + plan speech; UJ-4 mock-take exception | Host UI shell | **OK** |
| Paper Lamp / sparse shell | Host UI shell → DESIGN tokens | **OK** |
| Twin-play / Self-check state machine detail | EXPERIENCE owns; Host UI “UX sources win” | **OK** (SOFT if builders ignore companions) |

---

## 2. Remaining gaps (P2 / SOFT only)

No remaining **P0** or **P1**. Non-blocking leftovers:

| Item | Source | Tag | Note |
| --- | --- | --- | --- |
| Instruction-language convention (RU/EN/mixed prefs; practice EN) | FR-32; EXPERIENCE | **SOFT P2** | Prefs via `prefs_set`; language rule lives in UX — optional one-liner in Tone pack |
| Prefs field enumeration (3 prefs + defaults) | FR-3 | **SOFT P2** | AD-4 types lock events; field set not listed |
| Diagnostic phase ownership + silence→slower→RU early-stop | FR-4 | **SOFT P2** | Capability map only; detail in EXPERIENCE |
| Interview mock register (no mid-answer help; formal/neutral) | FR-27; EXPERIENCE | **SOFT P2** | AD-3 handoff sufficient; genre copy in UX |
| Readiness row taxonomy lock | FR-28 | **SOFT P2** | AD-10 owns semantics; row names not in spine |
| Soft/conditional advance “may start next-level materials” | FR-15 | **SOFT** | Overlay statuses in conventions; access semantics implicit via AD-11 |
| Length-override announcement before genre | FR-6/8; UJ-4 | **SOFT** | `length_override_reason` optional on Plan |
| Discrimination-before-production | FR-20 | **SOFT** | Phonics + AD-7 map |
| Mistake patterns → review projection | FR-25 | **SOFT** | AD-9 + FR map |
| Empty vs non-empty profile cross-trigger | NFR §5.3 | **SOFT P2** | Persistence stories |
| Qualified Session / SM-C2 hollow guard | SM-1 / SM-C2 | **SOFT P2** | Finale ownership OK; journal flag undefined |
| Dual “Recommended” naming (map vs review block) | Glossary | **SOFT** | Plan forbids Review strip token; Block A is supervisor weave |

---

## 3. What stays OK (no re-audit needed)

Paradigm / coach set · AD-1…AD-10 substrate · anti-game vocabulary · hybrid content · journal/snapshot · ports/privacy · FR capability map · §8.1 deferrals · writing / C1 / gamification deferred · Self-check audio locality (AD-5).

---

## 4. Bottom line

| Severity | Count |
| --- | --- |
| Remaining **P0** | **0** |
| Remaining **P1** | **0** |
| Remaining **P2 / SOFT** | listed in §2 — do not block finalize |

**Recommendation:** Proceed to Reviewer Gate / finalize. Optional polish (not blockers): FR-32 instruction-language one-liner; prefs triad in AD-4 note; AD-3 Rule explicit “wait for Learner judgment before post-Self-check speech” if reviewers want the Rule text to mirror EXPERIENCE without relying on the Host UI deferral.
