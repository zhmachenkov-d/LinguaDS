#!/usr/bin/env python3
"""English Path speech sidecar — JSON-lines over stdio.

Protocol:
  ready:    {"event": "ready"}   # once after model warm-load, before request loop
  request:  {"id": str, "method": "speech_in"|"speech_out", "params": object}
  response: {"id": str, "score": float, "band": str, "fail": bool, "error"?: str}

SpeechIn uses faster-whisper; SpeechOut remains a stub.
Never opens or writes learner SQLite.
"""

from __future__ import annotations

import json
import os
import sys
from pathlib import Path
from typing import Any

# Score bands (voice-quality-bar word confidence):
#   <0.35 → fail; 0.35–0.50 → accept_low; >0.50 → accept
BAND_FAIL = 0.35
BAND_ACCEPT = 0.50
WHISPER_SAMPLE_RATE = 16_000


def soft_fail(error: str) -> dict[str, Any]:
    return {"score": 0.0, "band": "fail", "fail": True, "error": error}


def score_to_band(score: float) -> tuple[str, bool]:
    if score < BAND_FAIL:
        return "fail", True
    if score <= BAND_ACCEPT:
        return "accept_low", False
    return "accept", False


def load_model():
    from faster_whisper import WhisperModel

    model_id = os.environ.get("ENGLISH_PATH_WHISPER_MODEL", "tiny.en")
    # CPU-safe defaults for local sidecar; model download on first ready.
    return WhisperModel(model_id, device="cpu", compute_type="int8")


def load_audio_f32(path: Path, sampling_rate: int = WHISPER_SAMPLE_RATE):
    """Decode audio to mono float32 without av.open(..., metadata_errors=...).

    faster-whisper 1.2.1 passes metadata_errors to PyAV; newer av wheels reject
    that kwarg. Loading here keeps the pinned engine while staying compatible.
    """
    import av
    import numpy as np

    container = av.open(str(path), mode="r")
    try:
        resampler = av.audio.resampler.AudioResampler(
            format="s16",
            layout="mono",
            rate=sampling_rate,
        )
        chunks: list[Any] = []
        for frame in container.decode(audio=0):
            frame.pts = None
            for resampled in resampler.resample(frame):
                chunks.append(resampled.to_ndarray().reshape(-1))
        for resampled in resampler.resample(None):
            chunks.append(resampled.to_ndarray().reshape(-1))
    finally:
        container.close()

    if not chunks:
        raise ValueError("empty_audio")
    audio = np.concatenate(chunks).astype(np.float32) / 32768.0
    return audio


def handle_speech_in(params: dict[str, Any], model) -> dict[str, Any]:
    audio_ref = params.get("audio_ref")
    if not audio_ref or not isinstance(audio_ref, str):
        return soft_fail("missing_audio_ref")

    path = Path(audio_ref)
    if not path.is_file():
        return soft_fail("unreadable_audio")

    try:
        audio = load_audio_f32(path)
        segments, _info = model.transcribe(
            audio,
            word_timestamps=True,
            language="en",
        )
        probs: list[float] = []
        for segment in segments:
            words = getattr(segment, "words", None) or []
            for word in words:
                prob = getattr(word, "probability", None)
                if isinstance(prob, (int, float)):
                    probs.append(float(prob))
        if not probs:
            return soft_fail("no_word_probs")
        score = sum(probs) / len(probs)
        band, fail = score_to_band(score)
        return {"score": score, "band": band, "fail": fail}
    except OSError:
        return soft_fail("unreadable_audio")
    except Exception as exc:  # noqa: BLE001 — soft-fail to caller
        return soft_fail(str(exc))


def handle_speech_out(_params: dict[str, Any]) -> dict[str, Any]:
    # Stub until SpeechOut / Kokoro story.
    return {"score": 0.81, "band": "accept", "fail": False}


def emit(obj: dict[str, Any]) -> None:
    sys.stdout.write(json.dumps(obj) + "\n")
    sys.stdout.flush()


def main() -> None:
    try:
        model = load_model()
    except Exception as exc:  # noqa: BLE001 — report via stderr; no ready line
        sys.stderr.write(f"sidecar model load failed: {exc}\n")
        sys.stderr.flush()
        sys.exit(1)

    emit({"event": "ready"})

    for raw in sys.stdin:
        line = raw.strip()
        if not line:
            continue
        try:
            message = json.loads(line)
        except json.JSONDecodeError:
            emit(
                {
                    "id": "unknown",
                    "score": 0.0,
                    "band": "fail",
                    "fail": True,
                    "error": "invalid_json",
                }
            )
            continue

        req_id = message.get("id", "unknown")
        method = message.get("method")
        params = message.get("params") or {}
        if not isinstance(params, dict):
            params = {}

        try:
            if method == "speech_in":
                body = handle_speech_in(params, model)
            elif method == "speech_out":
                body = handle_speech_out(params)
            else:
                body = soft_fail(f"unknown_method:{method}")
            emit({"id": req_id, **body})
        except Exception as exc:  # noqa: BLE001 — soft-fail to caller
            emit(
                {
                    "id": req_id,
                    "score": 0.0,
                    "band": "fail",
                    "fail": True,
                    "error": str(exc),
                }
            )


if __name__ == "__main__":
    main()
