---
title: "English Path — A0 RU L1 voice quality bar"
owned_by: bmad-spec
derived_from: prd-english-path FR-33 / §5.6; prd addendum STT/TTS depth; architecture Voice adaptation (V1)
---

# A0 RU L1 voice quality bar (STT / TTS)

Product-locked defaults for Self-check and phonics. Thresholds are **configurable and adaptive per Learner** — do not punish accent; do not block progress with false rejects. Millisecond latency budgets are **not** locked (architecture after Self-check instrumentation).

## Ownership (V1)

- **SpeechIn / SpeechOut** report scores, accept bands, and fail flags only — they do not own learner evidence or thresholds.
- **Coaches** may propose evidence deltas; **supervisor** journals commits.
- **Accept-but-low path (only):** journal `attempt` (band=accept_low) then `evidence_propose` → **Unstable** — never failure.
- **Threshold adapt path (only):** journal `prefs_set` patching profile `voice_thresholds`.
- TTS Self-check phoneme fail → supervisor selects fallback voice/human reference for that item; text channel remains valid.

## Principles

- Below accept → neutral “try again” + reference replay / one physical cue — **never** aloud “wrong.”
- Accept-but-low band → attempt **accepted** and recorded **Unstable** (data for next Session), not failure.
- If TTS fails MOS/intelligibility for a phoneme → do **not** use that voice for that phonetic Self-check; fall back to another engine or human reference; text channel remains valid.
- Adaptation lives under the Learner profile — not gamification.

## Defaults (A0 RU L1)

| Metric                                       | Accept / target        | Reject / ship-risk        |
| -------------------------------------------- | ---------------------- | ------------------------- |
| STT confidence (word)                        | ≥ 0.35                 | < 0.35                    |
| STT confidence (sentence)                    | ≥ 0.40                 | < 0.40                    |
| STT confidence (phoneme)                     | ≥ 0.50                 | < 0.50                    |
| STT WER (mixed EN–RU instructional dialogue) | < 25% (< 15% good)     | > 35%                     |
| STT rejection rate / lesson                  | 10–25%                 | > 30% (or < 10% too soft) |
| TTS MOS (Self-check reference)               | ≥ 3.8 (target 4.0–4.2) | < 3.5                     |
| TTS intelligibility WER                      | < 8% (< 5% good)       | > 12%                     |
| TTS slowdown MOS @ ~60–70% speed             | ≥ 3.0                  | < 2.5                     |

## Banding (production attempts)

| Band          | Behavior                 |
| ------------- | ------------------------ |
| < 0.35 (word) | Retry + cue + reference  |
| 0.35–0.50     | Accept as **Unstable**   |
| > 0.50        | Stable enough to move on |

## Adaptation triggers

| Signal                                   | Action                                                   |
| ---------------------------------------- | -------------------------------------------------------- |
| Rejection rate persistently **> 30%**    | Lower confidence threshold in profile (e.g. toward 0.30) |
| Rejection rate **< 10%** with rising WER | Raise threshold                                          |

Native-speaker WER benchmarks are **not** the bar.
