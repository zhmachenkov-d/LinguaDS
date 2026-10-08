# Rubric Walker Review — Architecture Spine: English Path

**Lens:** good-spine checklist (feature altitude → epics)  
**Spine:** `architecture-english-path.md`  
**Memlog:** `.memlog.md` (skimmed)  
**Lint:** `lint_spine.py` — 0 findings  
**Reviewed:** 2026-10-08  

## Verdict

**pass-with-fixes**

The spine fixes the load-bearing divergences for parallel epic builders (ownership, packaging, channel, persistence, ports, deps, content truth, multi-learner) with enforceable ADs, a usable capability map for FR-1…FR-33, verified stack pins, and an explicit local/desktop operational envelope. Greenfield is correctly assumed. Remaining gaps are medium: a few Deferred or silent items could still let coach/persistence epics invent incompatible shapes before a shared schema or isolation rule exists. Close those (or promote them to Deferred/Open with a named owner) before splitting coach work across epics; no rewrite needed.

---

## Checklist scorecard

| Checklist item | Result | Notes |
| --- | --- | --- |
| Fixes real divergence points for level below; misses none that matter | **mostly** | Core composition risks covered (AD-1…AD-8). Gaps: phase vocabulary, Assess coach vs port role split, LearnerStore isolation *mechanism*, Speech process topology. |
| Every AD Rule enforceable and prevents stated divergence | **pass** | All eight ADs have Binds/Prevents/Rule; AD-6 diagram matches the rule. Softest is AD-7 “human spot-check” (content ops), still prevents path-structure drift. |
| Nothing under Deferred could let two units diverge unsafely | **fail→fix** | Gate matrices / latency / writing / multi-plugin / C1 / gamification / aligner are safe. **Handoff/plan JSON schemas** deferred while five coaches ship in parallel is the unsafe seam. |
| Named tech verified-current | **pass** | Re-checked 2026-10-08 against npm/PyPI (see Stack verification). |
| Greenfield OK (no brownfield contradiction) | **pass** | Memlog: no app code yet; paradigm/stack are greenfield seeds, not ratification conflicts. |
| Covers driving PRD capabilities if claimed | **pass** | Capability map bins FR-1…FR-33 + NFR §5.1/§5.6; UJs via AD-3. FR-32 thin but mapped under channels. |
| Every owned dimension decided / deferred / open — esp. operational envelope | **mostly** | Deployment topology + privacy/local + API network called out. Silent: OS/Node matrix, Speech sidecar vs in-process, store isolation mechanism, session phase set — not decided, not Deferred, not Open. |

---

## Findings

### 1. Deferred handoff/plan schemas under-constrain parallel coach epics — **high**

- **Where:** Deferred → “Handoff/plan JSON schemas beyond convention sketch”; Consistency Conventions only sketch `{ focus, blocks[], … }` and `{ evidence_deltas[], … }`.
- **Why it fails the checklist:** Feature altitude must keep *epics* from diverging. Five coaches (`phonics`…`assess`) can be epic-sliced in parallel; if each invents evidence_delta / artifact shapes, supervisor merge (AD-1/AD-3/AD-4) breaks silently. Deferring “beyond sketch” without naming a single schema-owning epic or a minimal required field set is unsafe divergence, not safe deferral.
- **Disposition:** **autofix** — either (a) promote a minimal required handoff/plan field set into Conventions (required keys + “extensions via namespaced optional bags”), or (b) keep Deferred but add “schema owner = supervisor epic; coach epics must not invent keys until that lands,” or (c) add an Open Question with that owner.
- **Does not block** paradigm or other ADs.

### 2. `coaches/assess` vs `ports/assess` role split unspoken — **medium**

- **Where:** Structural Seed (`coaches/assess/`, `ports/assess/`); AD-5 “thin Assess”; AD-7 rubrics “with assess”; Capability map FR-14…FR-17 / FR-22…FR-25.
- **Why:** Two modules share the name “assess.” Epic builders can put CEFR scoring, rubric IO, or dialogue assessment in either place and still claim AD compliance. That is a real module-boundary divergence AD-6 does not resolve (Assess is both a coach and a port).
- **Disposition:** **autofix** — one convention or AD footnote: e.g. `ports/assess` = rubric/score evaluation API (no learner mouth); `coaches/assess` = session-facing assessment dialogue/results packaging; only supervisor commits. Or collapse to one module if “thin port” is only an adapter seam.

### 3. Multi-learner isolation mechanism neither decided nor deferred — **medium**

- **Where:** AD-8 (isolated snapshot+journal; no cross-learner reads); Structural Seed ERD; Stack “SQLite 3 (snapshot + journal tables)”; no Deferred row for store topology.
- **Why:** AD-8 states *what* (isolation) but not *how* (DB-per-learner vs shared DB + `learner_id` + enforced queries vs separate schemas). Persistence epic vs first-launch/multi-profile epic can diverge on paths, migrations, and backup story while both “satisfy” AD-8.
- **Disposition:** **autofix** — pick a seed (e.g. one SQLite file, all tables keyed by opaque learner id; cross-learner queries forbidden) or add a Deferred row naming why mechanism waits and what interim rule epics must follow.
- **Operational envelope:** this is part of local persistence / environments the altitude owns.

### 4. Speech process topology left silent (“optional” sidecar) — **medium**

- **Where:** Stack “Speech sidecar (optional) Python 3.11+”; Operational envelope diagram shows STT/TTS boxes but no decide/defer on in-process vs sidecar.
- **Why:** Not catastrophic (ports still bound adapters), but packaging, install, and Harness-desktop epic stories will fork on whether Python is a hard runtime dependency. “Optional” is neither a decision nor a Deferred reason.
- **Disposition:** **discuss / autofix** — decide seed default (e.g. Python sidecar required for v1 Speech adapters; in-process later) **or** Deferred: “sidecar vs in-process = adapter implementation detail; install docs owned by Speech ports epic.”

### 5. Session phase vocabulary not locked — **low**

- **Where:** AD-1 “session phase transitions”; no named phase set in Conventions.
- **Why:** UJs imply distinct shells (first-launch setup, return orientation, genre blocks, finale, level overlay). Without a shared phase id list, return epic vs interview epic vs phonics epic can invent incompatible phase machines that the supervisor (AD-1) must somehow unify.
- **Disposition:** **defer or light convention** — e.g. stable phase ids: `orient | plan | block | handoff | finale | level_overlay` (product copy stays free). Not a fail alone.

### 6. OS / Node runtime matrix thin in Stack — **low**

- **Where:** Operational envelope “desktop app or `dsh web`”; Stack pins dsh/Cordis but not Node engine or OS targets.
- **Why:** Cordis/dsh ecosystem expects Node 22+; Harness desktop is macOS/Windows-forward. Epic install/docs stories may assume Linux-native desktop or Node 20. Envelope is otherwise good (local-only, API network for models, no SaaS).
- **Disposition:** **autofix (light)** — add Stack rows: Node `≥22.19 || ≥24` (or “per current dsh engines”); target runtimes: Harness desktop (macOS/Windows) + `dsh web` (incl. Linux). Or Deferred: “OS matrix = pilot machines only.”

---

## AD enforceability pass (detail)

| AD | Prevents claimed? | Enforceable? | Notes |
| --- | --- | --- | --- |
| AD-1 Supervisor owns plan/transitions/evidence | Yes | Yes | Code/module: coaches return deltas only; store writes only in supervisor. |
| AD-2 One `english-path` bundle | Yes | Yes | Packaging + internal module seams; multi-plugin correctly Deferred. |
| AD-3 Hybrid learner channel | Yes | Yes (behavioral) | Sole mouth + handoff/handback; evidence still supervisor-only — closes the smuggle path. |
| AD-4 Snapshot + append-only journal | Yes | Yes | Dual persistence shapes blocked; projection ownership clear. |
| AD-5 Own ports; Harness = host+LLM | Yes | Yes | Cloud ASR/TTS/analytics out; adapters swappable. |
| AD-6 Dependency direction | Yes | Yes | Mermaid matches; active-coach speech exception is precise. |
| AD-7 Hybrid content truth | Yes | Adequate | Pack vs generated surface vs iterative rubrics; spot-check is ops, not lintable. |
| AD-8 Multiple local Learner identities | Yes (what) | Partial (how) | Cross-learner reads / mid-session switch blocked; isolation *mechanism* gap = Finding 3. |

No AD weakens another. No parent spine / Inherited Invariants (standalone feature altitude) — N/A.

---

## Deferred safety audit

| Deferred item | Unsafe if parallel epics invent answers? | Judgment |
| --- | --- | --- |
| Exact gate matrices / interview “enough runs” | No — principle + content pack ownership locked (AD-7); numbers are calibration | Safe |
| ms audio latency budgets | No — PRD calibration; soft-fail conventions exist | Safe |
| True multi-plugin split | No — AD-2 locks single bundle | Safe |
| Writing coach | No — out of pilot | Safe |
| Phoneme aligner beyond Whisper | No — stays behind SpeechIn | Safe |
| Handoff/plan JSON beyond sketch | **Yes** — coach result merge | **Unsafe — Finding 1** |
| Cloud sync / accounts | No — conflicts with NFR; banned | Safe |
| Gamification / motivation_engine | No — non-goal; conventions ban unlock language | Safe |
| C1 as ship target | No — horizon only | Safe |

---

## Stack verification (2026-10-08)

| Pin | Claimed | Verified | Status |
| --- | --- | --- | --- |
| `@deepseek-ai/dsh` | 0.2.0-rc.2 | npm `latest` = 0.2.0-rc.2; newer `0.2.1-alpha.1` exists | **OK** (RC pin + “re-pin at implement” appropriate) |
| `@deepseek-ai/cordis` | 4.0.4 | npm latest 4.0.4 | **OK** |
| faster-whisper | 1.2.1 | PyPI latest 1.2.1 | **OK** |
| Kokoro TTS | 0.9.4 | PyPI `info.version` 0.9.4 | **OK** |
| SQLite 3 | 3 | Family pin; fine for seed | **OK** |
| TypeScript / Python 3.11+ | language pins | Reasonable; Node engine missing → Finding 6 | **OK with note** |

Unsure items: none material. Harness remains developer preview (spine already states breaking changes expected).

---

## PRD capability coverage

| Area | Covered? |
| --- | --- |
| FR-1…FR-6 first launch | Yes — map + AD-1/3/7 |
| FR-7…FR-13 return / fatigue / finale | Yes — supervisor (FR-13 under return bin) |
| FR-14…FR-17 level advance | Yes — supervisor + assess + gates |
| FR-18…FR-21 phonics | Yes — phonics + AD-3/6/7 |
| FR-22…FR-25 path / assess / anti-game / mistakes | Yes — conventions ban gamification language |
| FR-26…FR-28 interview | Yes — speaking handoff |
| FR-29…FR-30 persistence / resume | Yes — AD-4/8 |
| FR-31…FR-33 channels / voice bar | Yes — AD-5 + conventions; FR-32 instruction language only via prefs-in-profile (adequate at this altitude) |
| NFR §5.1 privacy/local | Yes — AD-5/4 + envelope |
| NFR §5.6 / FR-33 voice bar | Yes — ports + adaptive thresholds convention |

No claimed capability left without a home. Mid-path grammar/vocab/speaking thinness is a **PRD** content gap, not an architecture miss — coaches are named and dependency rules lock composition.

---

## Operational / environmental envelope

**Present (decided):** local/desktop Harness only (desktop or `dsh web`); `english-path` profile; multi-learner switch pre-session; no SaaS/sync/analytics; model calls may use network; progress + self-check audio local; container diagram (Harness ↔ API, bundle ↔ SQLite/STT/TTS).

**Silent (Finding 3/4/6):** LearnerStore file/isolation topology; Speech sidecar requirement; OS + Node engine pins / pilot environment matrix.

**Appropriately Deferred:** cloud sync, multi-plugin, ms latency.

No whole dimension is missing in the sense of “no ops paragraph at all,” but the silent mechanism rows should be decided, Deferred, or Open before Finalize polish.

---

## Strengths (no action)

- Paradigm is specific and durable for epic slicing.
- AD-3 closes the hardest smuggle path (channel handoff without evidence-write rights).
- Conventions align evidence vocabulary with PRD anti-gamification.
- Capability → Architecture Map is the right consistency-auditor checklist.
- Memlog and spine agree; distill did not invent beyond logged decisions.
- Lint clean; no placeholder/duplicate-ID mechanical debt.

---

## Recommended actions (for Finalize gate owner)

1. **Required before parallel coach epics:** fix Finding 1 (schema ownership or minimal required keys).
2. **Should fix in distill polish:** Findings 2–4 (Assess split, store isolation seed, sidecar decide/defer).
3. **Optional polish:** Findings 5–6 (phase ids, Node/OS rows).

After 1–4, this spine should clear the rubric as **pass**.
