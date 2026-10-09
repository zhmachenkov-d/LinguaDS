---
id: 3
type: story
title: "Multi-learner SQLite isolation"
parent: epic-platform-substrate
after: ["22"]
hitl: false
risk: medium
tracker_id: "25"
remote: "https://github.com/zhmachenkov-d/LinguaDS/issues/25"
tracker_status: backlog
---

# Multi-learner SQLite isolation

## Description

Enforces AD-8: one SQLite file per learner id, pre-session switch only, no cross-learner reads (learner-file routing and switch API only).

## Acceptance Criteria

Verify: Two learner ids create two DB files; cross-read fails; switch API refuses mid-session use.

## References

- parent — _bmad-output/initiative-lingua-ds/epic-platform-substrate/epic-platform-substrate.md
- architecture-english-path/architecture-english-path.md#ad-8--multiple-local-learner-identities-adopted
