---
remote: "https://github.com/zhmachenkov-d/LinguaDS/milestone/1"
tracker_id: 1
key: ""
type: initiative
title: "Lingua DS"
parent: none
covers: [CAP-1, CAP-2, CAP-3, CAP-4, CAP-5, CAP-6, CAP-7, CAP-8]
after: []
assignee: ""
risk: high
---

# Lingua DS

## Description

Lingua DS is the product home for local/desktop language-learning coaches. This initiative’s first ship is **English Path** — the CAP-1…CAP-8 contract in `spec-english-path/` — for Russian L1 adults (builder + trusted circle in v1) toward B1+/interview readiness on DeepSeek Harness. Later products may join the same initiative folder; they are out of scope for the current epic set.

## Outcome

The builder and trusted circle sustain the English Path success signal (qualified Sessions, transparency strip, descriptor movement, Interview practice at/near B1+) within the first 30 days of pilot use — the spec’s Success signal, not restated here.

## Done when

1. Every CAP-1…CAP-8 capability is live in the installable `english-path` bundle for the pilot audience, not behind a chooser that contradicts Agent-named plan.
2. The spec’s Success signal holds for the builder + trusted circle over the first 30 days of use.
3. No Learner-facing streaks, badges, XP, or “unlocked” reward language ships in the pilot UI.
4. No cloud Learner account, multi-device sync, or product analytics pipeline is required for the pilot path.
5. Future Lingua DS products remain out of this epic set until separately sliced.

## Boundaries

Initiative boundary: Lingua DS as the multi-product container; **this epic set** is English Path v1 only (capability cuts + opening platform). Not: writing coach, full day-one curriculum volume, Critical matrices beyond A0→A1, C1 content as ship target, SaaS/accounts/cloud sync, or Duolingo-style gamification (see spec Non-goals). Tracer path across epics: installable bundle with journal/projection and speech ports → empty-profile UJ-1 continuous Session on real persistence → return shell → full A0 phonics/voice → level transition → path/coaches → interview practice.

- Touch point: DeepSeek Harness host (desktop runtime, LLM/agent loop, sparse UI shell) — consumed/configured; owner: epic-platform-substrate
- Touch point: content-pack files under `content/` — authored inside English Path epics via the pack manifest; owner: epic-first-launch-session (seeds), deepened by later epics

## References

- spec — `_bmad-output/initiative-lingua-ds/spec-english-path/spec-english-path.md`, section Capabilities
- constraint — same spec, section Constraints; architecture AD-1…AD-12
- architecture — `_bmad-output/initiative-lingua-ds/architecture-english-path/architecture-english-path.md`
- ux — `_bmad-output/initiative-lingua-ds/ux-english-path/DESIGN.md`, `EXPERIENCE.md`
- prd — `_bmad-output/initiative-lingua-ds/prd-english-path/prd-english-path.md` (traceability)

## Notes

- Parked: full curriculum volume; writing coach; Critical matrices beyond A0→A1; future Lingua DS products — user’s call 2026-10-08.
- Decision: initiative holds more products later; current epic set is English Path v1 only (2026-10-08).
- Decision: cut epics by capability + opening platform (2026-10-08).
- Decision: first demo is UJ-1 tracer on real local persistence (2026-10-08).
- Decision: least-certain / teach-the-rest work is Harness plugin install + speech sidecar + journal/projection (2026-10-08).
- Decision: CAP-7 covered only by return-session-shell; platform owns AD-12 substrate without CAP covers (tree check, 2026-10-08).
- Decision: CAP-8 product success on a0-phonics-voice; speech ports stay in platform (2026-10-08).
- Decision: shared cross-epic contracts live in architecture AD-1…AD-12; no parallel schemas (2026-10-08).
