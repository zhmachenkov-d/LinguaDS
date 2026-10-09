---
tracker_status: in-progress
remote: "https://github.com/zhmachenkov-d/LinguaDS/issues/13"
tracker_id: 13
key: ""
type: epic
title: "Platform substrate"
parent: initiative-lingua-ds
covers: []
after: []
assignee: ""
risk: high
status: in-progress
---

# Platform substrate

## Description

Stands up the installable `english-path` Cordis/Harness bundle with persistence (AD-12 journal → snapshot projection), speech sidecar, and edge ports so every later English Path epic builds on one runtime substrate.

## Outcome

The builder can install `english-path` on DeepSeek Harness and round-trip durable Learner state plus speech port bands locally — the teach-the-rest foundation for the UJ-1 tracer and all coaches.

## Done when

1. One installable `english-path` bundle installs on the pinned Harness host without a cloud Learner account.
2. Journal events project `PathPosition`, `NextStepPlan`, `ProfileSnapshot`, and `EvidenceItem` per AD-12 under a single `persistence/` `schema_version`.
3. SpeechIn/SpeechOut adapters (via local Python sidecar) report scores/bands/fail flags; LearnerStore and Assess-IO ports exist at the Harness edge (Assess may be stub I/O).
4. Multiple local Learner identities isolate to one SQLite file per learner id (AD-8); switch is pre-session only.
5. Substrate ships inside the installable bundle ready for Session epics to consume.

## Boundaries

Platform baseline: scaffold, ports, persistence, sidecar — not Session UX, not coach pedagogy, not CAP covers. Learner-facing voice quality bar (CAP-8) is owned by epic-a0-phonics-voice; this epic only provides ports. Not: multi-plugin split, cloud sync, product analytics.

## References

- parent — `_bmad-output/initiative-lingua-ds/initiative-lingua-ds.md`
- constraint — `architecture-english-path.md` AD-2, AD-5, AD-8, AD-12; spec Constraints (local Harness, single bundle, persistence ownership)
- architecture — `_bmad-output/initiative-lingua-ds/architecture-english-path/architecture-english-path.md`, Structural Seed + AD-12
- voice — `_bmad-output/initiative-lingua-ds/spec-english-path/voice-quality-bar.md` (port reporting bands only)

## Notes

- Decision: opening platform epic; empty covers; cite AD-2/5/8/12 on requirements at inception (2026-10-08).
- Unknown: exact Harness 0.2.0-rc.2 / Cordis pin stability at implement time — re-pin allowed per spec Assumptions; settle in first stories.
- Decision: inception tracer is full-layer (bundle load + thin journal/projection + speech band via sidecar) (2026-10-09).
- Decision: Harness pin + load is hitl on the tracer; speech deepened next after tracer (2026-10-09).
- Decision: real SpeechIn (faster-whisper) and SpeechOut (Kokoro) adapters ship in this epic behind ports (2026-10-09).
- Decision: sequencing — tracer first; then parallel lanes persistence (AD-12 → multi-learner), speech (sidecar+SpeechIn → SpeechOut), Assess-IO stub; Session-ready packaging joins; refactor sweep; E2E suite (2026-10-09).
- Decision: tracer bullet is entry 1 (Harness pin+load hitl + thin journal/projection + sidecar speech band stubs); speech adapters deepen in place; speech must not touch learner SQLite; thin LearnerStore on tracer, AD-12 completed by entry 2 (2026-10-09).
- Decision: approved 9-story breakdown written to tickets.toml (2026-10-09).
