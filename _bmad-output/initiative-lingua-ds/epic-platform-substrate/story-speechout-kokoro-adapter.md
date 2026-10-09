---
id: 5
type: story
title: "SpeechOut Kokoro adapter"
parent: epic-platform-substrate
after: ["23"]
hitl: false
risk: high
tracker_id: "26"
remote: "https://github.com/zhmachenkov-d/LinguaDS/issues/26"
tracker_status: backlog
---

# SpeechOut Kokoro adapter

## Description

Adds real Kokoro TTS on the same sidecar; SpeechOut reports scores/bands/fail flags (AD-5); no learner SQLite writes.

## Acceptance Criteria

Verify: TTS request returns an audio artifact plus band/fail flags on SpeechOut.

## References

- parent — _bmad-output/initiative-lingua-ds/epic-platform-substrate/epic-platform-substrate.md
- architecture-english-path/architecture-english-path.md#ad-5--own-ports-for-speech-and-store-harness-is-hostllm-adopted
