---
id: 2
type: story
title: "AD-12 journal and projector"
parent: epic-platform-substrate
after: ["21"]
hitl: false
risk: high
tracker_id: "22"
remote: "https://github.com/zhmachenkov-d/LinguaDS/issues/22"
tracker_status: done
---

# AD-12 journal and projector

## Description

Completes closed JournalEvent types and full minimal AD-12 envelopes under the same schema_version and LearnerStore path established by the tracer — no parallel journal.

## Acceptance Criteria

Verify: Fixture appends each closed event type; projected ProfileSnapshot fields match the AD-12 table (PathPosition, NextStepPlan, EvidenceItem included).

## References

- parent — _bmad-output/initiative-lingua-ds/epic-platform-substrate/epic-platform-substrate.md
- architecture-english-path/architecture-english-path.md#ad-12--shared-contracts--schema-ownership-adopted
