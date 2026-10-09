---
id: 4
type: story
title: "Speech sidecar and SpeechIn adapter"
parent: epic-platform-substrate
after: ["21"]
hitl: false
risk: high
tracker_id: "23"
remote: "https://github.com/zhmachenkov-d/LinguaDS/issues/23"
tracker_status: backlog
---

# Speech sidecar and SpeechIn adapter

## Description

Deepens the tracer's sidecar IPC in place with lifecycle management and a real faster-whisper SpeechIn adapter reporting scores/bands/fail flags (AD-5); speech artifacts stay ephemeral and must not touch learner SQLite.

## Acceptance Criteria

Verify: Fixture audio through SpeechIn yields a score, accept band, and fail flag.

## References

- parent — _bmad-output/initiative-lingua-ds/epic-platform-substrate/epic-platform-substrate.md
- architecture-english-path/architecture-english-path.md#ad-5--own-ports-for-speech-and-store-harness-is-hostllm-adopted
- spec-english-path/voice-quality-bar.md
