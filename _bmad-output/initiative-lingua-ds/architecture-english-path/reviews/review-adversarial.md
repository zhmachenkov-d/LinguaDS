# Adversarial Review — Architecture Spine: English Path

**Lens:** Construct two units one level down that each obey every AD to the letter yet still build incompatibly.  
**Spine:** `architecture-english-path.md` (status: draft, altitude: feature)  
**Date:** 2026-10-08  
**Verdict:** **Holes found — not ready to finalize without AD tightenings.** The spine correctly prevents peer coach negotiation and coach→store writes, but leaves shared contracts (evidence deltas, journal events, schema ownership, assess duality, channel reclaim, PathPosition mutation) as convention sketches or Deferred — which is exactly how two compliant epics diverge.

---

## Method

For each pair below: Unit A and Unit B are independent epics/stories one level down from this feature spine. Each cites only ADOPTED ADs + Consistency Conventions. Neither violates a Rule wording. The clash is therefore an AD hole, not an implementation mistake.

Deferred item *"Handoff/plan JSON schemas beyond convention sketch — Epic/story detail once supervisor scaffold exists"* is treated as an **open invitation to diverge**, not a safe deferral: at feature altitude, those schemas *are* the divergence points the spine exists to close.

---

## Incompatibility pairs

### Pair 1 — Clashing `evidence_deltas[]` / EvidenceItem shapes  
**(vocab+SRS epic vs phonics grade epic)**

| | Unit A — `epic: vocab-srs-persistence` | Unit B — `epic: phonics-grade-handoff` |
| --- | --- | --- |
| Obeys | AD-1, AD-4, AD-6; Handoff result convention | Same |
| Builds | Delta = `{ lemma, srs_box: 0..5, due_iso, confidence: 0..1 }` committed into snapshot as SRS rows | Delta = `{ skill_tag, status, score, attempt_id }` committed into snapshot as EvidenceItem statuses |

**Clash:** Shared store entity “evidence / durable learner skill state” has two incompatible shapes. Supervisor “merge/commit” has no merge algebra (union? keyed upsert? status lattice?). Vocab may never emit `confirmed|unstable|goes into review`; phonics may never emit SRS fields — yet both claim to be `evidence_deltas[]`.

**Why ADs don’t catch it:** AD-1 only forbids coaches writing the store; AD-4 names evidence *statuses* on the snapshot but not the item schema; convention lists vocabulary for *status words*, not payload fields; handoff sketch leaves `evidence_deltas[]` untyped. Deferred explicitly postpones the JSON schema.

**Hole to close:** Tighten AD-4 (or new AD-9) with a single EvidenceItem / delta contract: required keys, status enum as sole durable skill state, where SRS schedule lives (snapshot field vs journal-only), and supervisor merge rules (id key + status lattice).

---

### Pair 2 — Two owners of one entity: Assess  
**(coach/assess story vs ports/assess story)**

| | Unit A — `story: coach-assess-cefr` | Unit B — `story: port-assess-adapter` |
| --- | --- | --- |
| Obeys | AD-5 (“thin Assess”), AD-6 (supervisor → assess coach + Assess port), AD-7 (rubrics with assess) | Same wording |
| Builds | CEFR / gate evaluation + rubric loading live in `coaches/assess/`; port is a trivial LLM/prompt shim | Rubric eval + readiness computation live in `ports/assess/` adapter; `coaches/assess/` is a façade that calls the port |

**Clash:** One conceptual entity (assessment / gate readiness) has two legitimate homes. Capability map says “supervisor + assess + content gates”; structural seed lists both `coaches/assess/` and `ports/assess/`. “Thin” is not defined (I/O only? scoring? rubric I/O?).

**Why ADs don’t catch it:** AD-5 names the port and says “thin” without a responsibility cut. AD-7 binds rubrics to “assess” without saying coach vs port. AD-6 diagram shows both `As` and `AC` under supervisor with no exclusive owner.

**Hole to close:** New or tightened AD: **Assess coach owns rubric interpretation and readiness_rows; Assess port is I/O only** (model call / file read) — or the inverse. Delete ambiguity; one writer of readiness semantics.

---

### Pair 3 — Conflicting PathPosition / level-advance mutation paths  
**(level-advance epic vs return/resume epic)**

| | Unit A — `epic: fr14-level-advance` | Unit B — `epic: fr7-return-resume` |
| --- | --- | --- |
| Obeys | AD-1 (supervisor commits), AD-4 (supervisor projects journal→snapshot), AD-7 (gates in content pack) | Same |
| Builds | On assess handback, supervisor **immediately** patches `ProfileSnapshot.PathPosition` from `readiness_rows` (snapshot is live) | PathPosition changes **only** via append of `JournalEvent{type:'level_advance'}` then batch projection at finale / session close |

**Clash:** Same entity, two legal mutation paths. Mid-session crash: Unit A’s learner is advanced; Unit B’s learner is not. Finale fact comparison (AD-4 bind) disagrees with live snapshot depending on which epic shipped first.

**Why ADs don’t catch it:** AD-4 says supervisor alone *projects* journal→snapshot but never says snapshot is **journal-projected-only** vs **directly writable**. AD-1 allows supervisor commits without specifying commit medium (direct snapshot write vs journal append then project).

**Hole to close:** Tighten AD-4: **all durable mutations are journal appends; snapshot is a pure projection** (or: snapshot may be patched only for listed fields, with mandatory journal twin). Name PathPosition / EvidenceItem / NextStepPlan write path explicitly.

---

### Pair 4 — Clashing SessionJournal / JournalEvent shapes  
**(session-journal epic vs interview-handoff epic)**

| | Unit A — `epic: journal-schema` | Unit B — `epic: interview-genre-block` |
| --- | --- | --- |
| Obeys | AD-3, AD-4 (“attempts, handoffs, finale facts”); Ids & time convention | Same |
| Builds | Strict discriminated union: `{ type: 'attempt'\|'handoff'\|'finale'\|'phase', ts, payload }` with typed payloads | Appends freeform `{ ts, role, text, meta?: object }` transcript lines; handoff “structured result” stuffed into `meta` occasionally |

**Clash:** Resume, finale fact comparison, and audit trail cannot interoperate. Both are append-only local journals with the named concerns present somewhere.

**Why ADs don’t catch it:** AD-4 lists *contents* not *schema*. Convention timestamps/ids only. Deferred again parks handoff/plan JSON — and by implication journal event schema — at epic level.

**Hole to close:** AD-4 must fix a closed JournalEvent type set (or versioned schema id in `persistence/`) before epics land. Pull the Deferred schema item **up** into an AD; leave only field-level calibration deferred.

---

### Pair 5 — Dual speech/channel reclaim during handoff  
**(speaking-interview story vs supervisor-finale story)**

| | Unit A — `story: interview-handoff` | Unit B — `story: supervisor-phase-timer` |
| --- | --- | --- |
| Obeys | AD-3 (hand off channel for genre block; handback returns structured results); AD-6 (active coach may use SpeechIn/Out) | Same |
| Builds | Coach holds exclusive SpeechOut until it emits handback; supervisor is mute and does not reclaim | Supervisor owns a block `length_min` timer; on expiry reclaims SpeechOut and may speak orientation/finale while coach may still be producing audio or a late handback |

**Clash:** Dual mouths / conflicting channel ownership transition — the exact failure AD-3’s Prevents clause names — while both units stay inside the Rule’s wording (“may hand off”; “on handback”).

**Why ADs don’t catch it:** AD-3 defines who *may* speak in which *mode*, not the **state machine** (enter handoff → exclusive owner → reclaim triggers → late handback discard/queue). AD-6 only gates *which* coaches may touch ports, not preemption.

**Hole to close:** Tighten AD-3 with handoff lifecycle: exclusive channel owner token; reclaim only on handback or explicit abort; late results after reclaim are dropped or journaled as `superseded`, never spoken.

---

### Pair 6 — Two owners of LearnerStore schema  
**(ports/learner-store epic vs persistence/ migrations epic)**

| | Unit A — `epic: learner-store-port` | Unit B — `epic: sqlite-persistence` |
| --- | --- | --- |
| Obeys | AD-2 (both folders exist), AD-4, AD-5 (LearnerStore port + SQLite adapter), AD-8 | Same |
| Builds | DDL + migrations live beside the SQLite adapter under `ports/learner-store/` | Canonical schema + migrations live in `persistence/`; port adapter is a thin repository over migrated tables |

**Clash:** Two owners of one entity (store schema / migrations). Bundle builds break or silently fork tables (`evidence` vs `evidence_items`, journal as table vs JSON file).

**Why ADs don’t catch it:** Structural seed lists **both** `ports/learner-store/` and `persistence/` with no ownership AD. AD-5 binds the port; AD-4 binds snapshot+journal conceptually; neither assigns schema authority.

**Hole to close:** AD-2 or AD-5: **`persistence/` owns schemas/migrations; `ports/learner-store` is the only runtime API** coaches/supervisor call. Forbid DDL in the adapter epic.

---

### Pair 7 — Conflicting evidence identity authority  
**(mistake/evidence story vs assess readiness story)**

| | Unit A — `story: mistake-recorder` | Unit B — `story: assess-readiness-rows` |
| --- | --- | --- |
| Obeys | AD-1 (supervisor commits); convention “evidence item ids stable within learner”; coach ids / tool names | Same |
| Builds | Coaches mint `evidence_item_id` in deltas (e.g. hash of skill_tag); supervisor persists as-is | Coaches return skill keys only; supervisor allocates opaque ids; `readiness_rows` key by CEFR can-do ids from content pack |

**Clash:** Duplicate or orphan EvidenceItems; assess rows don’t join phonics/vocab evidence; anti-game / mistake flows (capability map) disagree on identity.

**Why ADs don’t catch it:** Convention requires stability, not **who allocates**. Content-pack gate ids vs coach skill tags vs evidence ids are three namespaces with no join rule.

**Hole to close:** AD-4/conventions: single id authority (supervisor or content-pack stable ids); deltas reference `evidence_key` from content/rubric catalog; no coach-minted store ids.

---

### Pair 8 — Generated lesson surface: ephemeral vs durable artifact  
**(content-surface epic vs resume epic)**

| | Unit A — `epic: generated-lesson-surface` | Unit B — `epic: uj2-return-resume` |
| --- | --- | --- |
| Obeys | AD-7 (generated-first lesson surface); AD-4 journal | Same |
| Builds | Surface held in process memory / content cache; new generation each session; handoff `artifacts?` optional and discarded | Requires prior contrast pairs / mock prompts in journal `artifacts` to compare finale facts and continue mid-path |

**Clash:** Shared-data lifetime for “what the learner just practiced” unspecified. Resume and finale fact comparison diverge.

**Why ADs don’t catch it:** AD-7 decides generation policy, not persistence. Handoff `artifacts?` is optional with no retention rule. AD-4 journal list omits generated surface.

**Hole to close:** AD-4 or AD-7: session-generated surface that affects resume/finale **must** be journaled (artifact event); pure display fluff may be ephemeral — say which is which.

---

## Cross-cutting diagnosis

| Pattern | Spine weakness |
| --- | --- |
| Clashing shared-data shapes | Conventions sketch types; Deferred parks schemas at epic level |
| Two owners of one entity | Assess coach vs Assess port; `persistence/` vs learner-store adapter |
| Conflicting state-mutation paths | Snapshot direct write vs journal projection; channel reclaim vs handback |

**What the spine already gets right (not holes):** coach↔coach imports forbidden; coaches never write LearnerStore; single bundle; multi-learner isolation pre-session; no gamification vocab; speech ports not Harness-native. Those Prevents clauses hold under adversarial construction.

---

## Minimal AD tightenings (recommended)

Priority order — smallest text that closes the pairs above:

1. **AD-4 (critical):** Snapshot is a **pure projection** of the append-only journal (or list any direct-write exceptions). Close JournalEvent type set + EvidenceItem/delta schema (required fields, status lattice, SRS field home). Single **evidence_key** authority. Session artifacts needed for resume/finale are journal events.
2. **AD-3 (high):** Handoff **lifecycle** — exclusive channel owner, reclaim only on handback/abort, late handback policy.
3. **AD-5 + structural note (high):** Split Assess: coach = rubric/readiness semantics; port = I/O. **`persistence/` owns DDL/migrations**; learner-store port is API-only.
4. **Lift Deferred schemas (high):** Remove “Handoff/plan JSON schemas → epic detail”; replace with AD-level contracts (plan object fields, handoff result, journal events). Keep only *threshold numbers* / gate matrices deferred.
5. **Conventions (medium):** Define supervisor merge algebra for `evidence_deltas[]` (keyed upsert + status transition table).

Optional new **AD-9 — Shared contracts are spine-owned:** plan, handoff result, journal events, evidence items versioned in `persistence/` or `content/schemas/`; epics may extend with additive optional fields only behind a schema version bump.

---

## Severity rollup

| Severity | Count | Pairs |
| --- | --- | --- |
| Critical | 3 | 1 (delta/EvidenceItem shape), 3 (PathPosition mutation), 4 (JournalEvent shape) |
| High | 3 | 2 (Assess dual owner), 5 (channel reclaim), 6 (schema dual owner) |
| Medium | 2 | 7 (id authority), 8 (generated surface lifetime) |

**Gate recommendation:** Do **not** set spine `status: final` until at least tightenings 1–4 land (or equivalent new ADs). Pairs 7–8 can ship as convention bullets if AD-4 absorbs id + artifact retention.

---

## Out of scope / non-findings

- Stack pin freshness (other finalize lens).
- Exact gate matrices / interview run counts (legitimately Deferred if mutation *path* is fixed).
- Writing coach absence, Cordis single-bundle choice, local-only envelope — no adversarial fork found that still obeys ADs.
