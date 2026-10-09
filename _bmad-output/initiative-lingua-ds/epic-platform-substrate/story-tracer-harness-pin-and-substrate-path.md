---
id: 1
type: story
title: "Tracer: Harness pin and substrate path"
parent: epic-platform-substrate
after: []
hitl: true
risk: high
tracker_id: "21"
remote: "https://github.com/zhmachenkov-d/LinguaDS/issues/21"
tracker_status: done
---

# Tracer: Harness pin and substrate path

## Description

Pins Harness/Cordis (AD-2), scaffolds english-path Structural Seed, and loads the plugin; exposes a thin LearnerStore port with one journal append→projection of PathPosition/NextStepPlan/ProfileSnapshot/EvidenceItem; owns a stable sidecar IPC with SpeechIn/Out band stubs (AD-5/12 connectivity — engines deepened later, not a disposable second sidecar).

## Acceptance Criteria

Verify: Person installs the bundle on the pinned Harness host; smoke shows projected PathPosition, NextStepPlan, ProfileSnapshot, and EvidenceItem, and SpeechIn/Out each return a score/band/fail flag via the sidecar.

## References

- parent — _bmad-output/initiative-lingua-ds/epic-platform-substrate/epic-platform-substrate.md
- architecture-english-path/architecture-english-path.md#ad-2--one-installable-english-path-bundle-adopted
- architecture-english-path/architecture-english-path.md#structural-seed
