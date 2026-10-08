# Adversarial Review — Architecture Spine: English Path

**Lens:** Construct two units one level down that each obey every AD to the letter yet still build incompatibly (clashing shared-data shapes, two owners of one entity, conflicting state-mutation paths). Every pair is a hole to close with a new or tightened AD.  
**Spine:** `architecture-english-path.md` (status: draft; AD-1…AD-11 + Consistency Conventions for UX/tone/plan/voice)  
**Date:** 2026-10-08  
**Prior review:** Overwritten — this assessment is of the **current** spine only (post AD-9…AD-11 and UX/voice/plan convention expand).

**Verdict:** **Holes remain — not ready for final.** Prior critical forks (EvidenceItem envelope, Assess coach vs port, journal-vs-snapshot write path, closed JournalEvent *types*, channel reclaim, persistence DDL ownership) are largely closed. The spine still leaves **payload/identity contracts** and a few ownership forks open — enough for compliant epics to ship incompatible shared data and mutation paths.

---

## Method

Unit A and Unit B are independent epics/stories one level down. Each cites only ADOPTED AD Rules + Consistency Conventions. Neither violates Rule wording. Clash ⇒ AD hole (or convention that needs AD elevation).

**Closed since prior adversarial review (not re-filed as open holes):**

| Prior pair | Closed by |
| --- | --- |
| Clashing `evidence_deltas` / EvidenceItem envelopes | AD-9 |
| Assess coach vs Assess port dual home | AD-10 |
| Snapshot direct patch vs journal projection | AD-4 |
| Freeform vs typed JournalEvent *type* set | AD-4 |
| Dual mouths / reclaim vs handback | AD-3 |
| DDL in `ports/learner-store` vs `persistence/` | AD-5 + Structural Seed |
| Within-level hard-block vs Level gates (principle) | AD-11 |

---

## Incompatibility pairs (current spine)

### Pair 1 — Clashing JournalEvent / snapshot projection payloads  
**(journal-projector epic vs level-advance epic)**  
*Severity: Critical — shared-data shape*

| | Unit A — `epic: supervisor-journal-projector` | Unit B — `epic: fr14-level-advance` |
| --- | --- | --- |
| Obeys | AD-4 (closed types; snapshot = projection; payload calibration under `schema_version`); AD-1 | Same |
| Builds | `level_advance` payload = `{ from_level, to_level, gate_ids_passed[], schema_version: 1 }`; `PathPosition` projected as `{ level, topic_id, lesson_ordinal }` | `level_advance` payload = `{ cefr, reason, readiness_snapshot, schema_version: 1 }`; `PathPosition` = `{ cefr, gate_cursor, unfinished_block_ids[] }` |

**Clash:** Same closed event *types* and same ER entities (`PathPosition`, `NextStepPlan`) with incompatible payloads. Resume, finale fact comparison, and cross-epic projectors cannot interoperate. Both claim AD-4 compliance via independent `schema_version` bumps that never coordinated.

**Why ADs don’t catch it:** AD-4 explicitly defers “payload field calibration” and Deferred repeats it. Closing the *type set* without a minimal required payload envelope (or a single spine-owned schema id + required keys per type) invites the exact fork the type lock was meant to prevent. AD-4 *binds* PathPosition / NextStepPlan but never shapes them.

**Hole to close:** Tighten AD-4 (or new AD-12 Shared contracts): per JournalEvent type, required payload keys + PathPosition / NextStepPlan / ProfileSnapshot field envelopes owned by the spine (versioned once). Defer only *optional* additive fields and numeric thresholds — not the identity of shared projection fields.

---

### Pair 2 — Two minting authorities for one entity: EvidenceItem `id`  
**(phonics-handoff story vs assess-readiness story)**  
*Severity: Critical — two owners / identity*

| | Unit A — `story: phonics-evidence-deltas` | Unit B — `story: assess-readiness-join` |
| --- | --- | --- |
| Obeys | AD-9 (deltas are EvidenceItem shape or status-only patches keyed by `id`; supervisor merges by `id`); Ids & time convention (“stable within learner”); AD-1 | Same |
| Builds | Coach mints `id` = `hash(kind + contrast_pair_text)` on first propose; supervisor upserts as-is | Coach returns status patches with content-pack can-do keys; supervisor allocates opaque UUIDs on first `evidence_propose`; `readiness_rows` key by pack gate ids |

**Clash:** Duplicate or orphan EvidenceItems; assess readiness cannot join phonics/vocab evidence; anti-game / mistake flows disagree on identity. Merge-by-id is well-defined algebra over an undefined namespace.

**Why ADs don’t catch it:** AD-9 specifies merge *by* id, not **who may create** an id, what catalog ids are drawn from, or how `kind` relates to content-pack / rubric keys. Convention requires stability, not authority.

**Hole to close:** AD-9: single id authority — e.g. content-pack / rubric stable `evidence_key` as `id` (coaches never mint), **or** supervisor-only allocation with deltas carrying `evidence_key` separately. Document join rule from EvidenceItem → readiness / gates.

---

### Pair 3 — Clashing `readiness_rows` / gate evaluation shapes  
**(assess-coach epic vs supervisor-level-advance epic)**  
*Severity: High — shared-data shape*

| | Unit A — `epic: coaches-assess-semantics` | Unit B — `epic: supervisor-enforce-gates` |
| --- | --- | --- |
| Obeys | AD-10 (assess owns rubric/gate/readiness semantics; supervisor commits `level_advance`); AD-11; Handoff result convention | Same |
| Builds | `readiness_rows[]` = `{ dimension: 'B1.speaking', status: 'threshold_reached'\|'open', score: 0..1 }` | Expects `{ gate_id, critical: bool, pass: bool, evidence_ids[] }` from content-pack gate ids |

**Clash:** AD-10 assigns *ownership* of semantics but not the **wire shape** supervisor must consume. Level-advance and UJ-3 overlay epics diverge while both cite assess as sole semantic owner.

**Why ADs don’t catch it:** Handoff convention lists `readiness_rows?` untyped. AD-7 / AD-11 say content pack names critical criteria and assess evaluates — no row schema. Ownership without contract ≠ interoperability.

**Hole to close:** Elevate into AD-10 (or AD-9/12): closed `ReadinessRow` / gate-evaluation result shape; map to content-pack gate ids; supervisor may only commit `level_advance` from that shape.

---

### Pair 4 — Conflicting Plan / orientation mutation paths  
**(orientation epic vs path-map epic)**  
*Severity: High — conflicting state-mutation paths*

| | Unit A — `epic: uj2-orientation-strip` | Unit B — `epic: fr22-path-available` |
| --- | --- | --- |
| Obeys | AD-1 (supervisor names plan); Plan object convention (`level` · `topic` · `session_goal` · `available` · `recommended`); AD-7; AD-11 | Same |
| Builds | On return, supervisor invents learner-facing `available` / `recommended` as free-text strip labels from last finale notes; journals `plan_set` with those strings; content pack unused for availability | Supervisor copies `available` / `recommended` from content-pack lesson-graph edges + evidence queue; `plan_set` payload holds structured `{ lesson_id, genre, length_min }`; strip renders labels from ids |

**Clash:** Same Plan keys, incompatible value types and computation owners. Content pack “owns path structure” (AD-7) vs supervisor “alone names the plan” (AD-1) without a cut: who **computes** availability vs who **utters** it. AD-11 forbids within-level `not available` marking but does not say whether availability is pack-derived or supervisor-authored prose.

**Why ADs don’t catch it:** Plan convention locks *key names* and ≤30s budget, not types, id references, or computation authority. `plan_set` payload is under the AD-4 calibration deferral.

**Hole to close:** Tighten Plan convention → AD (or AD-1 appendix): `available` / `recommended` are structured refs into the content pack (not free prose); supervisor selects among pack-legal options; utterance/copy is presentation. Align with Evidence vocabulary overlay enums vs strip labels explicitly.

---

### Pair 5 — Two lifetimes for one entity: session artifacts / generated surface  
**(generated-lesson-surface epic vs uj2-resume epic)**  
*Severity: High — shared-data lifetime / mutation path*

| | Unit A — `epic: ad7-lesson-surface` | Unit B — `epic: fr29-resume-finale` |
| --- | --- | --- |
| Obeys | AD-7 (generated-first surface); AD-4 journal types; Handoff `artifacts?` | Same |
| Builds | Contrast pairs / mock prompts live in process memory for the block; handoff omits `artifacts` (optional); next session regenerates | Requires prior surface in journal (`attempt` / custom payload / `artifacts`) for finale fact comparison and mid-path continue |

**Clash:** Shared “what the learner just practiced” has no retention rule. Finale / resume epics break against generated-surface epic. Both obey optional `artifacts?` and AD-7 generation policy.

**Why ADs don’t catch it:** AD-7 decides generation, not durability. AD-4’s closed types omit an `artifact` / `surface` event; handoff leaves artifacts optional with no “must journal if resume/finale depends on it” rule.

**Hole to close:** AD-4 or AD-7: any generated surface that finale, resume, or evidence ids depend on **must** be journaled under a named event/payload key; pure display fluff may be ephemeral — draw the line.

---

### Pair 6 — Dual isolation mechanisms for LearnerStore  
**(multi-learner-files epic vs multi-learner-schema epic)**  
*Severity: High — two owners of isolation entity*

| | Unit A — `epic: ad8-per-file-db` | Unit B — `epic: ad8-schema-namespace` |
| --- | --- | --- |
| Obeys | AD-8 (“one SQLite file **(or schema namespace)** per learner id”); AD-5; AD-2 | Same |
| Builds | `persistence/learners/{id}.sqlite`; host switch opens a different file | Single `english-path.sqlite` with `learner_{id}_*` schemas / attached namespaces |

**Clash:** Backup, migration, LearnerStore adapter, and host switch APIs are incompatible. Both are letter-perfect AD-8.

**Why ADs don’t catch it:** The parenthetical **or** is an unresolved fork written into the Rule.

**Hole to close:** AD-8 pick one v1 isolation mechanism (recommend: one file per learner id — matches Structural Seed “per-learner DB files”). Park the alternate as Deferred.

---

### Pair 7 — Conflicting voice-adaptation journal paths  
**(speech-threshold epic vs phonics-unstable epic)**  
*Severity: Medium — conflicting state-mutation paths*

| | Unit A — `story: fr33-adaptive-thresholds` | Unit B — `story: accept-but-low-unstable` |
| --- | --- | --- |
| Obeys | Voice adaptation + Config conventions; AD-4; AD-1; AD-9 | Same |
| Builds | Every accept-but-low / rejection-rate nudge is a `prefs_set` only; thresholds on `ProfileSnapshot.prefs.stt_*`; evidence unchanged until handback | Every accept-but-low is `attempt` + `evidence_propose` → `unstable`; thresholds on `ProfileSnapshot.voice_adaptation`; `prefs_set` unused for STT |

**Clash:** Same FR-33 behaviors, two legal journal paths and two snapshot field homes. Audit, resume, and projector logic fork. Convention says `prefs_set` **and/or** `attempt` + `evidence_propose` — the **and/or** is the hole.

**Why ADs don’t catch it:** Voice adaptation is convention-only (memlog chose not to add AD-12). “And/or” plus unnamed snapshot fields leave mutation path and field home open.

**Hole to close:** New short AD or elevate Voice adaptation: required event sequence for accept-but-low; single snapshot field path for adaptive thresholds; forbid the unused alternate in v1.

---

### Pair 8 — Overlapping EvidenceItem `kind` for one skill fact  
**(speaking-interview story vs assess-cefr story)**  
*Severity: Medium — clashing shared-data / dual writers of meaning*

| | Unit A — `story: interview-block-evidence` | Unit B — `story: cefr-dimension-evidence` |
| --- | --- | --- |
| Obeys | AD-9 closed `kind` set; AD-10 assess semantics; AD-3 speaking handoff | Same |
| Builds | Speaking coach proposes `kind=interview_block` per mock turn (status unstable/confirmed) | Assess proposes `kind=cefr_dimension` for the same interview skill; readiness joins only `cefr_dimension` |

**Clash:** Two durable items for one learner fact; status lattices diverge; supervisor merge-by-id never unifies them. Both kinds are explicitly legal.

**Why ADs don’t catch it:** AD-9 lists kinds but not exclusivity, parent/child, or “interview_block is session artifact → assess rolls up to cefr_dimension” rules.

**Hole to close:** AD-9: kind cardinality / rollup rules (which kinds are atomic skill state vs session-scoped blocks); assess-owned rollup before commit if needed.

---

### Pair 9 — Fatigue / early-stop evidence commit policy  
**(fatigue-reclaim story vs partial-block-grade story)**  
*Severity: Medium — conflicting mutation path under Tone pack*

| | Unit A — `story: tone-fatigue-deferral` | Unit B — `story: phonics-partial-handback` |
| --- | --- | --- |
| Obeys | Tone pack (fatigue / early-stop must not write Unstable *solely* for ending early); AD-3 reclaim; AD-1/AD-4 | Same |
| Builds | On fatigue reclaim, supervisor journals `handoff_reclaim` + `session_end`; **drops** all pending `evidence_deltas` from the open block | On fatigue reclaim, supervisor still commits deltas from completed micro-turns (not “solely” for ending — attempts already happened), including `unstable` |

**Clash:** Same stop produces different durable evidence. Both parse Tone pack without violating AD wording.

**Why ADs don’t catch it:** Tone pack forbids Unstable *solely for ending early*, not whether partial-block proposals commit. AD-3 reclaim wins on channel, silent on pending-delta disposition.

**Hole to close:** AD-3 or Tone→AD: on stop/fatigue reclaim, pending deltas policy — commit earned attempts / drop all / commit only `confirmed` — pick one.

---

### Pair 10 — Content pack wire format fork  
**(content-pack epic vs assess-gates epic)**  
*Severity: Medium — clashing shared-data shape*

| | Unit A — `epic: versioned-path-pack` | Unit B — `epic: assess-reads-gates` |
| --- | --- | --- |
| Obeys | AD-7 (versioned content pack owns path/gates/templates) | Same |
| Builds | Single `content/path-pack.v1.json` with embedded gate matrices | TS modules under `content/path/` + separate `content/gates/*.yaml`; assess imports TS |

**Clash:** “Versioned content pack” is a concept, not a load contract. Assess and path-map epics disagree on discovery, versioning, and gate id location.

**Why ADs don’t catch it:** AD-7 names ownership layers, not file/schema contract. Deferred gate *matrices* still assume a shared pack shape that doesn’t exist.

**Hole to close:** AD-7 appendix: one pack manifest format + version field + where gate ids live; assess/supervisor load only through that manifest.

---

## Cross-cutting diagnosis

| Pattern | Current spine weakness |
| --- | --- |
| Clashing shared-data shapes | Types/keys locked; **payloads**, PathPosition, Plan values, readiness_rows, content-pack wire still open; AD-4/`schema_version` explicitly invites uncoordinated payload forks |
| Two owners of one entity | EvidenceItem **id minting**; Plan **availability computation** (supervisor prose vs content pack); Learner isolation **file vs namespace** (AD-8 `or`) |
| Conflicting state-mutation paths | Voice-adapt `prefs_set` and/or attempt+propose; fatigue pending-delta disposition; artifacts optional vs resume-required |

**Still solid (no adversarial fork that obeys the Rules):** coaches never write LearnerStore; no coach↔coach deps; single `english-path` bundle; Assess coach vs port cut (AD-10); journal-only durable writes at the *type* layer; channel grant/reclaim with reclaim wins; SRS-in-EvidenceItem-payload (no parallel SRS schema); within-level must not hard-block via `level_advance`; UX sources win on chrome; no gamification vocabulary.

---

## Minimal tightenings (recommended)

Priority — smallest AD text that closes the pairs:

1. **AD-4 / new AD-12 Shared contracts (critical):** Minimal required payloads for each JournalEvent type; PathPosition + NextStepPlan + ProfileSnapshot envelopes; single spine `schema_version` owner. Narrow Deferred to optional fields / numeric thresholds only.
2. **AD-9 (critical):** EvidenceItem id authority + join to gates/readiness; kind rollup/exclusivity (Pair 8 can ride along).
3. **AD-10 (high):** Closed `ReadinessRow` / gate-evaluation result shape.
4. **AD-1 or Plan→AD (high):** `available` / `recommended` structured pack refs; supervisor selects, does not invent parallel availability models.
5. **AD-4/AD-7 (high):** Journal retention rule for resume/finale-affecting generated surface / artifacts.
6. **AD-8 (high):** Pick one isolation mechanism for v1.
7. **Voice adaptation → AD or tighten convention (medium):** One journal path + one snapshot field home.
8. **AD-3 + Tone (medium):** Pending-delta policy on fatigue/stop reclaim.
9. **AD-7 (medium):** Content pack manifest / wire contract.

---

## Severity rollup

| Severity | Count | Pairs |
| --- | --- | --- |
| Critical | 2 | 1 (Journal/PathPosition payloads), 2 (EvidenceItem id authority) |
| High | 4 | 3 (readiness_rows), 4 (Plan availability path), 5 (artifacts lifetime), 6 (AD-8 isolation or) |
| Medium | 4 | 7 (voice-adapt path), 8 (kind overlap), 9 (fatigue deltas), 10 (content pack wire) |

**Gate recommendation:** **Not ready for final.** Do not set `status: final` until at least tightenings 1–2 land (payload envelopes + id authority). Prefer also 3–6 before independent epic builders start — otherwise “closed types” create false confidence while shared projection still forks.

---

## Out of scope / non-findings

- Stack pin freshness / Harness RC churn (other finalize lens).
- Exact critical gate matrices & interview run counts (legitimately Deferred **if** readiness_rows + PathPosition envelopes exist).
- Writing coach absence, Cordis single-bundle, local-only envelope, Paper Lamp token restatement — no adversarial fork found that still obeys ADs.
- Prior-review pairs listed under “Closed since prior” — not re-opened unless the current wording regresses (it does not).

---

## Post-fix delta

**Re-assessment date:** 2026-10-08  
**Scope:** Critical/high pairs 1–6 only, against updated spine (AD-1…AD-12).

| Pair | Severity | Status | Why |
| --- | --- | --- | --- |
| 1 — JournalEvent / PathPosition payloads | Critical | **CLOSED** | AD-12 owns single `schema_version` plus required envelopes for PathPosition, NextStepPlan, ProfileSnapshot, and every closed JournalEvent type (incl. `level_advance`). |
| 2 — EvidenceItem `id` authority | Critical | **CLOSED** | AD-9 sets `id` = pack/rubric `evidence_key`; coaches never mint; supervisor upserts by that key. |
| 3 — `readiness_rows` / gate shapes | High | **CLOSED** | AD-10 closes GateEval and ReadinessRow wire shapes; supervisor may commit advance/readiness only from them. |
| 4 — Plan availability mutation path | High | **CLOSED** | AD-1 + AD-12: `available`/`recommended` are pack `LessonRef`s; supervisor selects among pack-legal options, no free-text availability model. |
| 5 — Generated surface / artifacts lifetime | High | **CLOSED** | AD-4 requires journaling any generated surface that finale/resume/evidence ids depend on; AD-12 names `artifact_ref(s)` keys. |
| 6 — LearnerStore isolation fork | High | **CLOSED** | AD-8 picks one SQLite file per learner id; schema-namespace is Deferred. |

**Still-open critical/high:** none.

**Gate (pairs 1–6):** ready-for-final **yes** (medium pairs 7–10 not re-assessed here).
