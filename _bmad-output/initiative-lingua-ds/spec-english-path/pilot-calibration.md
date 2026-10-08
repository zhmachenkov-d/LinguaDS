---
title: "English Path — Pilot calibration (locked)"
owned_by: bmad-spec
derived_from: user walk 1A/2A/3A; prd-english-path §8.1; brief L1 phonics priorities; architecture AD-10/AD-11
---

# Pilot calibration

Assessment floors locked for first pilot. Learner-facing UI stays descriptor vocabulary (`glossary.md`) — no %/points as placement or progress framing. Numbers below are **internal assess/supervisor rules**.

## A0→A1 Critical matrix (pilot-minimum)

**Scope:** Only the **A0→A1** Level transition. All other Level transitions remain principle-only (FR-16) until post-pilot calibration — assess may return stub `GateEval`s with `critical=false` or omit them; supervisor must not invent Critical hard-blocks for unlisted transitions.

**Within-level still soft:** Unstable individual phonemes / extra letter batches never flip the next within-level lesson to Not available (AD-11 / UJ-5).

### Critical gates (all must `met=true` for A1 Available)

| gate_id                     | Category            | Met when (binary)                                                                                                                                                                                                                 | Evidence kinds                          |
| --------------------------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| `a0_letter_batches_1_2`     | Alphabet foundation | Pack letter batches `letters_1` and `letters_2` each have an EvidenceItem per letter; every letter status ∈ {confirmed, unstable}; vowels **A E I O U** are **confirmed**.                                                        | `letter`                                |
| `a0_priority_contrasts_ear` | L1 contrast ear     | Discrimination **confirmed** for each pack priority contrast in set `priority_contrasts_a0` (default seed: **/θ/ vs /s/ or /f/**, **/w/ vs /v/**, **/ɪ/ vs /iː/** — pack may rename keys). Production Confirmed **not** required. | `phonics_contrast`                      |
| `a0_one_picture_word`       | Minimal production  | ≥1 picture-word production attempt journaled (any accept band, including accept-but-low → Unstable) with Self-check completed for that item.                                                                                      | `phonics_contrast` or speaking artifact |

Assess returns `GateEval { gate_id, critical: true, met, evidence_ids[] }` per row. Supervisor commits `level_advance` mode `blocked` if any Critical `met=false`; else soft or conditional per non-critical weak items.

### Non-critical (soft / conditional only)

- Remaining alphabet letters beyond batches 1–2.
- Production stability of priority contrasts (Unstable → Goes into review / Within-level queue).
- Vocab SRS floor, grammar, speaking fluency.
- Full “all phonemes Confirmed.”

### Content-pack duties

- Manifest lists `gate_id`s above under A0→A1.
- Pack defines `letters_1`, `letters_2`, and `priority_contrasts_a0` evidence_keys.
- Generated contrast surface may vary tokens; **gate identity** stays the pack keys above.

---

## Interview practice — entry & enough-runs (soft heuristics)

### Entry (when agent may name Interview practice)

Agent may name Interview practice when **either**:

1. **Path:** `PathPosition.level` is at/near the B1+/interview near-term milestone (pack milestone node / level band ≥ B1), **or**
2. **Assess propose:** assess returns a plan recommendation / genre hint for interview and supervisor accepts it into `plan_set`.

Not via a mode picker. Exact CEFR subscore cutoffs beyond “at/near B1+” stay soft — prefer naming when milestone is in view; do not require a binary “interview unlock.”

### Enough-runs / row status (heuristics, not a pass certificate)

Readiness rows = `small_talk` · `about_yourself` · `experience` · `skills` · `scenario` · `his_questions` with statuses устойчиво · частично · неустойчиво · не проверялось.

| Rule                          | Heuristic                                                                                                                           |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Never attempted in any mock   | **не проверялось**                                                                                                                  |
| Attempted in a completed mock | assess sets устойчиво / частично / неустойчиво from debrief; never hide не проверялось for unattempted rows                         |
| “Needs another run”           | Row is **неустойчиво**, or **частично** when assess notes a critical-for-role gap on that block                                     |
| Cadence floor                 | A row should not move to **устойчиво** until that `block_id` was attempted in **≥2 completed mocks** (second run in-session counts) |
| No binary pass                | Finale is the Readiness map + descriptors — never “interview practice passed”                                                       |

---

## Audio latency (explicitly deferred)

No millisecond budgets in this contract. Revisit after Self-check / STT / TTS path is instrumented on Harness (architecture owner). FR-33 quality bars and soft-fail-to-text still bind.
