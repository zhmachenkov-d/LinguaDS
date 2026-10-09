#!/usr/bin/env python3
"""English Path speech sidecar — JSON-lines over stdio (stubs only; no engines).

Protocol (durable for later deepen-in-place):
  request:  {"id": str, "method": "speech_in"|"speech_out", "params": object}
  response: {"id": str, "score": float, "band": str, "fail": bool, "error"?: str}

Never opens or writes learner SQLite.
"""

from __future__ import annotations

import json
import sys
from typing import Any


def handle_speech_in(_params: dict[str, Any]) -> dict[str, Any]:
    # Stub accept band — engines land in later stories.
    return {"score": 0.72, "band": "accept", "fail": False}


def handle_speech_out(_params: dict[str, Any]) -> dict[str, Any]:
    return {"score": 0.81, "band": "accept", "fail": False}


HANDLERS = {
    "speech_in": handle_speech_in,
    "speech_out": handle_speech_out,
}


def main() -> None:
    for raw in sys.stdin:
        line = raw.strip()
        if not line:
            continue
        try:
            message = json.loads(line)
        except json.JSONDecodeError:
            sys.stdout.write(
                json.dumps(
                    {
                        "id": "unknown",
                        "score": 0.0,
                        "band": "fail",
                        "fail": True,
                        "error": "invalid_json",
                    }
                )
                + "\n"
            )
            sys.stdout.flush()
            continue

        req_id = message.get("id", "unknown")
        method = message.get("method")
        params = message.get("params") or {}
        handler = HANDLERS.get(method)
        if handler is None:
            response = {
                "id": req_id,
                "score": 0.0,
                "band": "fail",
                "fail": True,
                "error": f"unknown_method:{method}",
            }
        else:
            try:
                body = handler(params if isinstance(params, dict) else {})
                response = {"id": req_id, **body}
            except Exception as exc:  # noqa: BLE001 — soft-fail to caller
                response = {
                    "id": req_id,
                    "score": 0.0,
                    "band": "fail",
                    "fail": True,
                    "error": str(exc),
                }

        sys.stdout.write(json.dumps(response) + "\n")
        sys.stdout.flush()


if __name__ == "__main__":
    main()
