---
tracker_status: backlog
remote: "https://github.com/zhmachenkov-d/LinguaDS/issues/15"
tracker_id: 15
key: ""
type: epic
title: "Return Session shell"
parent: initiative-lingua-ds
covers: [CAP-2, CAP-7]
after: [epic-first-launch-session]
assignee: ""
risk: medium
---

# Return Session shell

## Description

Delivers CAP-2 and CAP-7: return Sessions with Agent-named plan, orientation transparency strip, Recommended review as first lesson block, Self-check pattern, fatigue/stop without Unstable-for-early-stop, and guilt-free resume across quit/relaunch on local persistence.

## Outcome

A returning Learner resumes without streak guilt into a Session where the agent names the plan, the strip is honest, and progress matches the prior finale.

## Done when

1. Non-empty profile never cross-triggers first-launch; empty never looks like return.
2. Orientation ≤30s with strip fields Level · Topic · Session goal · Available / Recommended (structured lesson refs); no welcome-back / missed-days / mode-topic-continue chooser.
3. Recommended review is the first lesson block; Self-check pattern exists for later phonics/interview to deepen; early stop does not write Unstable solely for ending early.
4. After quit/relaunch, prefs and next-step match prior finale (CAP-7 continuity) inside the installable bundle.
5. Session ends in descriptors + next step.

## Boundaries

Return shell + resume continuity. Durable write mechanics remain AD-12 in platform; this epic owns Learner-visible CAP-7 success. Not: full phonics pedagogy, level Critical gates, interview genre, gamification.

## References

- parent — `_bmad-output/initiative-lingua-ds/initiative-lingua-ds.md`; covers CAP-2, CAP-7
- spec — CAP-2, CAP-7
- journey — UJ-2; UX EXPERIENCE orientation strip
- architecture — AD-1, AD-3, AD-4, AD-8, AD-12

## Notes

- Waits on epic-first-launch-session because: prefs + PathPosition/NextStepPlan/Evidence shapes proven in a real first Session.
- Decision: CAP-7 covered here only; platform has no CAP-7 covers (2026-10-08).
