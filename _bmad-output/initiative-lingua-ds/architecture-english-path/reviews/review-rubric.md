# Rubric Walker Review — Architecture Spine: English Path

**Lens:** good-spine checklist (feature altitude → epics)  
**Spine:** `architecture-english-path.md`  
**Memlog:** `.memlog.md`  
**Lint:** `lint_spine.py` — 0 findings  
**Reviewed:** 2026-10-08 (re-gate after AD-9…AD-11 + UX/voice/Plan tightenings)

## Verdict

**pass-with-fixes**

Load-bearing divergence points for parallel epic builders are locked (ownership, packaging, channel handoff, journal projection, ports, deps, content truth, multi-learner, evidence merge, assess split, within-level vs Level gates). Prior high gaps (handoff/plan schema under-constraint, assess coach/port fork, silent sidecar, silent isolation) are closed. Capability map covers FR-1…FR-33 / UJ / NFR privacy+voice. Stack pins re-verified live. Remaining issues are medium/low: Deferred *field* calibration still needs an explicit schema owner so coach epics cannot invent incompatible `EvidenceItem.payload` shapes, plus thin operational matrix polish (OS/Node). No rewrite; close the medium item before slicing parallel coach epics.

---

## Checklist scorecard

| Checklist item | Result | Notes |
| --- | --- | --- |
| Fixes real divergence points for level below; misses none that matter | **pass** | AD-1…AD-11 + conventions cover composition, persistence, channel, evidence, gates, voice adaptation, plan strip. Residual: non-vocab payload field ownership (Finding 1) — not a missing AD theme, a Deferred seam. |
| Every AD Rule enforceable and prevents stated divergence | **pass** | All eleven ADs have Binds/Prevents/Rule; AD-6 diagram matches. Softest: AD-7 human spot-check (ops), AD-8 offers file **or** schema-namespace isolation (port-abstracted → low risk). |
| Nothing under Deferred could let two units diverge unsafely | **mostly** | Gate matrices / latency / multi-plugin / writing / C1 / gamification / aligner / SenseVoice are safe. **Field calibration** row is the residual unsafe seam if coach epics invent kind payloads unilaterally (Finding 1). |
| Named tech verified-current | **pass** | Re-checked 2026-10-08 via npm/PyPI (see Stack verification). `better-sqlite3` intentionally “pin at implement.” |
| Greenfield OK (no brownfield contradiction) | **pass** | Memlog: no app code; paradigm/stack are seeds, not ratification conflicts. |
| Covers driving PRD capabilities if claimed | **pass** | Capability map bins FR-1…FR-33; UJ-1…UJ-5 via AD-3 + map; NFR §5.1/§5.6 via AD-5 + envelope + Voice adaptation. |
| Every owned dimension decided / deferred / open — esp. operational envelope | **mostly** | Local/desktop envelope, install shape, privacy, API network, sidecar required, multi-learner pre-session — decided. Silent/thin: OS + Node pilot matrix (Finding 3). No whole dimension missing. |

---

## Findings

### 1. Deferred EvidenceItem/Journal *field* calibration lacks a schema owner — **medium**

- **Where:** Deferred → “Journal/EvidenceItem _field_ calibration beyond closed types”; AD-4 closed event types; AD-9 closed `kind` + vocab SRS payload (`due_at`, `box`); Handoff `artifacts?` open bag.
- **Why it fails the checklist:** Types/kinds are locked (good), but five coaches can still invent incompatible `payload` / `artifacts` field sets for the same `kind` before `schema_version` exists. Merge-by-`id` (AD-9) then silently clobbers shapes. That is unsafe Deferred for feature→epic parallel builds — not calibration of numbers, but of contracts.
- **Disposition:** **autofix** — extend the Deferred why-wait (or Conventions) with: “payload/artifact schemas owned by supervisor+persistence (publish under `persistence/` or `content/`); coach epics must not invent keys for a `kind` until that schema lands; unknown optional bags ignored by projector.” Optionally name minimal stubs for non-vocab kinds later.
- **Does not block** paradigm or other ADs.

### 2. AD-8 isolation offers two mechanisms — **low**

- **Where:** AD-8 “one SQLite file (or schema namespace) per learner id.”
- **Why:** Both satisfy no-cross-learner-reads. Persistence epic vs install docs could still fork path/migration stories. Mitigated because LearnerStore port abstracts the store (AD-5/AD-6).
- **Disposition:** **autofix (light)** — pick seed default (prefer one file per learner id) and leave schema-namespace as Deferred alternative; or state “mechanism is LearnerStore-private; epics must not assume paths.”

### 3. OS / Node pilot matrix thin in operational envelope — **low**

- **Where:** Operational envelope (desktop / `dsh web`); Stack pins dsh/Cordis/Python but not Node engine or OS targets. Live `@deepseek-ai/dsh@0.2.0-rc.2` publishes no `engines` field.
- **Why:** Install/docs epics may assume Linux-native desktop or an arbitrary Node LTS. Envelope otherwise complete (local-only, model network, no SaaS, required Python sidecar range).
- **Disposition:** **autofix (light)** — Stack/envelope note: “Node per current dsh host; pilot OS = Harness desktop (macOS/Windows) + `dsh web` (incl. Linux)” **or** Deferred: “OS matrix = pilot machines only.”

### 4. Session phase id vocabulary not named — **low**

- **Where:** AD-1 “session phase transitions”; JournalEvent type `phase`; no closed phase id list in Conventions.
- **Why:** Supervisor alone owns the phase machine (AD-1), so coach epics should not invent parallel machines. Residual risk is return vs interview vs phonics stories naming incompatible phase strings inside supervisor-owned code if sliced poorly.
- **Disposition:** **defer or light convention** — e.g. stable ids: `orient | block | handoff | finale | level_overlay` (product copy free). Not a fail alone.

### 5. Capability map under-names grammar coach for FR-22…FR-25 — **low**

- **Where:** Capability map row “FR-22…FR-25 … supervisor + assess + vocab” (grammar coach exists in paradigm/seed).
- **Why:** Cosmetic map miss, not an ownership hole — grammar coach is in AD-6 graph and coach ids convention.
- **Disposition:** **autofix (light)** — add `grammar` to that map cell.

---

## AD enforceability pass (detail)

| AD | Prevents claimed? | Enforceable? | Notes |
| --- | --- | --- | --- |
| AD-1 Supervisor owns plan/transitions/evidence | Yes | Yes | Coaches return structured results; store writes supervisor-only. |
| AD-2 One `english-path` bundle | Yes | Yes | Multi-plugin correctly Deferred. |
| AD-3 Hybrid channel + grant/reclaim | Yes | Yes | Reclaim wins; Self-check silence binds active coach; no dual mouths. |
| AD-4 Journal write path; snapshot projection | Yes | Yes | Closed event types; dual writers blocked. |
| AD-5 Own ports; Harness host+LLM | Yes | Yes | Required Python sidecar range; SenseVoice as candidate only; no product telemetry. |
| AD-6 Dependency direction | Yes | Yes | Mermaid matches; handoff-only Speech for active coach. |
| AD-7 Hybrid content truth | Yes | Adequate | Pack vs generated surface vs iterative rubrics; spot-check is ops. |
| AD-8 Multiple local Learner identities | Yes | Yes (soft on *how*) | Cross-learner + mid-session switch blocked; dual mechanism = Finding 2. |
| AD-9 EvidenceItem + delta merge + SRS-in-payload | Yes | Yes | Closed kinds + status lattice + vocab SRS fields; payload depth = Finding 1. |
| AD-10 Assess coach owns semantics | Yes | Yes | Port I/O only; closes prior coach/port name collision. |
| AD-11 Within-level queue vs Level gates | Yes | Yes | Hard-block only on `level_advance`; aligns UJ-3 vs UJ-5. |

No AD weakens another. No parent spine / Inherited Invariants (standalone feature altitude) — N/A.

Prior review findings **resolved in current distill:** handoff/plan minimal shapes + Plan UX strip keys; assess coach vs port (AD-10); LearnerStore isolation stated; Speech sidecar required with Kokoro-compatible Python range; EvidenceItem merge (AD-9); within-level gates (AD-11); voice adaptation convention; UX sources bound.

---

## Deferred safety audit

| Deferred item | Unsafe if parallel epics invent answers? | Judgment |
| --- | --- | --- |
| Exact Level-gate matrices / interview “enough runs” | No — AD-11 + content pack ownership | Safe |
| ms audio latency budgets | No — soft-fail conventions; calibrate later | Safe |
| Journal/EvidenceItem *field* calibration beyond closed types | **Partial** — kinds/types locked; payload/artifact fields can still fork | **Unsafe until Finding 1** |
| True multi-plugin Harness split | No — AD-2 | Safe |
| Writing coach | No — out of pilot | Safe |
| Phoneme aligner beyond Whisper | No — stays behind SpeechIn | Safe |
| SenseVoice as SpeechIn adapter | No — candidate; FR-33 decides | Safe |
| Cloud sync / accounts | No — banned by NFR | Safe |
| Gamification / motivation_engine | No — non-goal + Tone pack | Safe |
| C1 as ship target | No — horizon only | Safe |

---

## Stack verification (2026-10-08)

| Pin | Claimed | Verified (npm/PyPI this review) | Status |
| --- | --- | --- | --- |
| `@deepseek-ai/dsh` | 0.2.0-rc.2 | npm `latest` = 0.2.0-rc.2; newer alpha `0.2.1-alpha.1` exists | **OK** (RC + re-pin note appropriate) |
| `@deepseek-ai/cordis` | 4.0.4 | npm latest 4.0.4 | **OK** |
| faster-whisper | 1.2.1 | PyPI 1.2.1; Requires-Python ≥3.9 | **OK** |
| Kokoro TTS | 0.9.4 | PyPI 0.9.4; Requires-Python `≥3.10,<3.13` | **OK** (matches sidecar range) |
| Speech sidecar Python | `≥3.10,<3.13` | Aligns with Kokoro 0.9.4 | **OK** |
| LearnerStore | SQLite 3 via `better-sqlite3` (pin at implement) | Family current; npm `better-sqlite3` latest observed 13.0.3 — unpinned intentionally | **OK with note** |
| TypeScript / DeepSeek API / `DEEPSEEK_API_KEY` | language + host env | Fits Harness plugin shape; not version-critical | **OK** |

Web re-verify: registry queries succeeded; no invented versions. Harness remains developer preview (spine states breaking changes expected).

---

## PRD capability coverage

| Area | Covered? |
| --- | --- |
| FR-1…FR-6 first launch | Yes — map + AD-1/3/7 + Host UI |
| FR-7…FR-13 return / review / finale / fatigue | Yes — supervisor + Tone pack + Plan |
| FR-14…FR-17 level advance | Yes — AD-10/AD-11 + content gates |
| FR-18…FR-21 phonics / L1 | Yes — phonics + AD-3/6/7/11 |
| FR-22…FR-25 path / assess / anti-game / mistakes | Yes — AD-9 + conventions; grammar coach present (map polish Finding 5) |
| FR-26…FR-28 interview | Yes — speaking handoff + AD-10 readiness |
| FR-29…FR-30 persistence / resume | Yes — AD-4/8/9 |
| FR-31…FR-33 channels / voice bar | Yes — AD-3/5 + Voice adaptation + Config |
| UJ-1…UJ-5 | Yes — AD-3 hybrid channel; UJ-3 gates via AD-11 |
| NFR §5.1 privacy/local | Yes — AD-5/4 + envelope |
| NFR §5.6 / FR-33 voice bar | Yes — ports + adaptive thresholds |

No claimed capability left without a home. Mid-path grammar/vocab *journey* thinness is a PRD content gap, not an architecture miss.

---

## Operational / environmental envelope

**Decided:** local/desktop Harness only (desktop app or `dsh web`); install `english-path` via patch/`dsh plugin`; multi-learner switch pre-session; no SaaS/sync/cloud analytics; model calls may use network; progress + self-check audio local; required Python speech sidecar; container diagram (Harness ↔ API, bundle ↔ SQLite/sidecar).

**Silent/thin:** OS + Node pilot matrix (Finding 3).

**Appropriately Deferred:** cloud sync, multi-plugin, ms latency, gate numeric matrices.

Envelope dimension is present — not a silent whole-dimension failure.

---

## Strengths (no action)

- Paradigm is specific and durable for epic slicing.
- AD-3 grant/reclaim + reclaim-wins closes the hardest channel/evidence smuggle path.
- AD-9/AD-10/AD-11 close the seams the prior rubric pass flagged as high/medium.
- Tone pack + Plan object + Voice adaptation bind UX/PRD session integrity without a bloated AD-12.
- Capability → Architecture Map is a usable consistency auditor.
- Memlog decisions match the distill; lint clean.

---

## Recommended actions (for Finalize gate owner)

1. **Should fix before parallel coach epics:** Finding 1 (schema owner for payload/artifact fields under Deferred).
2. **Optional polish:** Findings 2–5 (isolation seed wording, OS/Node note, phase ids, map cell).

After Finding 1, this spine should clear the rubric as **pass**.
