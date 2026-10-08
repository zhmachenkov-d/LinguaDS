---
id: 1
tracker_id: 11
remote: https://github.com/zhmachenkov-d/LinguaDS/issues/11
tracker_status: dropped
type: story
title: "BMad setup test — safe to delete"
parent: none
covers: []
after: []
assignee: zhmachenkov-d
refined: true
hitl: false
risk: low
---

# BMad setup test — safe to delete

## Description

Temporary ticket used only to prove GitHub Issues write and query for the BMad ticketing store. Safe to delete.

## Acceptance Criteria

1. **Issue exists on GitHub**
   **Given** the store is configured for `zhmachenkov-d/LinguaDS`
   **When** this ticket is published
   **Then** an issue with this title is queryable via `gh issue view`

## Boundaries

- Must not change: product code, labels unrelated to this test, other issues.

## References

- store config — `_bmad/custom/ticketing-store-config.toml`

## Notes

- Purpose: store setup prove-it; drop after create → query → in-progress → assign.
- Dropped: store prove-it complete; issue closed as not planned (2026-10-08).
