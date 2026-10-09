---
tracker_status: backlog
remote: "https://github.com/zhmachenkov-d/LinguaDS/issues/16"
tracker_id: 16
key: ""
type: epic
title: "A0 Phonics and voice"
parent: initiative-lingua-ds
covers: [CAP-4, CAP-8]
after:
  [
    epic-platform-substrate,
    epic-first-launch-session,
    epic-return-session-shell,
  ]
assignee: ""
risk: high
---

# A0 Phonics and voice

## Description

Delivers CAP-4 and CAP-8: full A0 Phonics lessons (RU L1-interference contrasts) with ear → articulation → words → mini-contrast → Self-check → descriptor finale, plus adaptive A0 RU L1 voice/channel usability on the speech ports from platform.

## Outcome

An A0 Learner completes short Phonics lessons with honest Self-check audio and Within-level queue, using voice and/or text per prefs without mic reproach.

## Done when

1. Phonics lesson completes the full micro-structure without IPA or spelling-as-goal; contrast pairs generated-first with human spot-check path.
2. Self-check plays Learner recording beside reference audio; Unstable phonemes queue within-level without making the next lesson Not available.
3. STT/TTS defaults and adaptation match `voice-quality-bar.md`; accept-but-low → Unstable not hard failure; text remains valid if audio fails.
4. Thin first-launch phonics path is replaced/deepened by this flow inside the installable bundle.
5. Mic never mandatory with reproach; Interview English-content rule is not this epic’s genre (channels prefs apply).

## Boundaries

CAP-4 + CAP-8 product success. Speech ports/sidecar owned by platform; this epic owns adaptive bar and phonics genre handoff. Not: Critical Level gates (CAP-3), interview mock, full multi-coach path.

## References

- parent — covers CAP-4, CAP-8
- spec — CAP-4, CAP-8; `voice-quality-bar.md`; UJ-5
- architecture — AD-3, AD-5, AD-6, AD-7, AD-11
- calibration — `pilot-calibration.md` priority contrasts seeds

## Notes

- Waits on epic-platform-substrate because: speech sidecar + SpeechIn/Out ports.
- Waits on epic-first-launch-session because: session handoff lifecycle + thin phonics to deepen.
- Waits on epic-return-session-shell because: Self-check pattern + session shell (collision fix, 2026-10-08).
- Decision: CAP-8 primary covers here; ports stay in platform (2026-10-08).
