# Spine Pair Review — English Path

## Overall verdict

The spine pair is an **adequate** contract for downstream consumers: UJ-1…UJ-5 are fully keyed with climax and failure, Paper Lamp tokens ship with hex + light/dark pairs, and both spines declare spines-win-on-conflict. Load-bearing gaps remain in **component dual-coverage** (several EXPERIENCE behavioral components have no DESIGN visual row) and **name/glossary inheritance drift**, so architecture and story-dev will invent visuals for interview/phonics subcomponents and must reconcile non-verbatim UJ titles. Treat `status: draft` as not yet finalize-locked.

## 1. Flow coverage — strong

Checked EXPERIENCE.md Key Flows against sources frontmatter (PRD §2.3 UJ-1…UJ-5, `user-journeys.md`). All five journeys have named protagonist (Alex), numbered steps, a marked climax beat, and a failure path.

### Findings

- **medium** UJ-2 Key Flow covers only the 0–30s open-state contract; source UJ-2 also requires Recommended review → Self-check → new material → fatigue deferral → finale (and optional UJ-3 attach). Those beats exist elsewhere (UJ-5 Self-check, Finale descriptors, State Patterns) but fatigue deferral (FR-13 / user-journeys UJ-2 step 4) has no Key Flow or State Patterns row. (`EXPERIENCE.md` § Key Flows → UJ-2; sources `user-journeys.md` UJ-2). *Fix:* Add a short post-30s continuation beat or a State Patterns row for fatigue / early-stop deferral without failure framing.
- **low** UJ-1 Key Flow omits explicit “alphabet as small audio-first letter batches” called out in PRD/spec UJ-1 first lesson. (`EXPERIENCE.md` UJ-1 step 6; `user-journeys.md` UJ-1 step 5). *Fix:* One clause under first Phonics / UJ-5 open naming letter batches as non-goal dump.

## 2. Token completeness — strong

Extracted all frontmatter tokens in `DESIGN.md` and every `{path.to.token}` in both spines. Colors are hex; light/dark pairs exist for load-bearing surfaces/ink/mute/hairline/accent; `{colors.lamp}` light-only with `{colors.frame-dark}` documented for dark outer frame. Contrast target WCAG AA stated for ink/mute on bg/surface (and dark pairs). Platform spacing/type are literal (desktop Harness), not semantic-platform notes — appropriate. All prose/component `{…}` refs resolve to defined tokens.

### Findings

- **low** Hairline is dual-described as focus ring in the Colors table while Components/State Patterns use `{colors.accent}` for focus — table cell is slightly over-broad. (`DESIGN.md` § Colors hairline row vs § Components Input field). *Fix:* Drop “focus ring” from hairline role; keep accent as focus only.
- **low** Component frontmatter maps `{typography.body}` (object) as a single token value — valid per design.md-spec, but consumers must flatten nested fields. (`DESIGN.md` frontmatter `components.*.typography`). *Fix:* Optional note in Components intro that typography refs mean the full role object.

## 3. Component coverage — thin

Extracted every component name from DESIGN frontmatter + body, EXPERIENCE Component Patterns, and Key Flows / IA. Paired visual+behavioral coverage holds for the core shell set (plan line, input, mic, Quiet Start, Path map, criteria table, twin play, Yes/No, caption toggle) with only naming drift. Multiple journey-critical components are behavioral-only.

### Findings

- **high** EXPERIENCE Component Patterns rows with **no** DESIGN.md Components visual row / frontmatter entry: Orientation strip, Mouth diagrams, Picture words, Interview prep strip, Mock stage, Readiness rows, Finale descriptors. Downstream must invent anatomy, color, and sizing for UJ-4/UJ-5 surfaces. (`EXPERIENCE.md` § Component Patterns; `DESIGN.md` § Components). *Fix:* Add DESIGN subsections + frontmatter stubs for each (even if “text + hairline only”).
- **medium** DESIGN `shell` has visual + frontmatter tokens but no EXPERIENCE Component Patterns behavioral row (Session shell exists only as IA surface). (`DESIGN.md` Components → Shell; `EXPERIENCE.md` § Component Patterns). *Fix:* Add Shell row (host vs content, what Harness may add, what English Path owns).
- **medium** Cross-spine name drift on paired components: frontmatter `play-twin` vs prose/EXPERIENCE “Twin play”; `caption-toggle` vs “Caption toggle”; DESIGN “Input field + mic” combined vs EXPERIENCE split “Input field” / “Mic control”. (`DESIGN.md` frontmatter `components` + § Components; `EXPERIENCE.md` § Component Patterns). *Fix:* Canonicalize one kebab id + display label used identically in both spines.
- **low** Criteria table / Path map / Quiet Start are adequately dual-specified; no further miss beyond naming.

## 4. State coverage — adequate

Walked IA surfaces (Session shell, First-launch, Return open, Orientation strip, Phonics, Level transition, Interview, Session finale). Core cold paint, greeting, setup, diagnostic, return open, Self-check pending/yes/no, within-level queue, level transition, interview mock/debrief, listening/playing/recording, focus, and offline/local are covered.

### Findings

- **medium** No State Patterns row for **mic permission-denied** (UJ-1 failure mentions mic denial; Foundation says mic optional). (`EXPERIENCE.md` § State Patterns; UJ-1 Failure). *Fix:* Add permission-denied → typed path + one neutral line; never shame.
- **medium** No explicit **fatigue / early-stop deferral** state (source UJ-2 / FR-13). (`EXPERIENCE.md` § State Patterns; `user-journeys.md` UJ-2). *Fix:* State row: stop anytime / tired / agent early-stop after review → defer new material; finale still uses glossary descriptors.
- **low** No general **error** / recovery state (local runtime reduces need; still useful for TTS/STT soft-fail copy). (`EXPERIENCE.md` § State Patterns). *Fix:* One row: soft-fail → slower / typed fallback; no alarm chrome (aligns FR-33 soft-reject posture if desired).
- **low** Orientation strip and Session finale lack dedicated empty/cold variants (usually agent-populated; acceptable if noted). *Fix:* Optional one-liner that strip/finale never show placeholder chrome when data missing — agent speech carries facts.

## 5. Visual reference coverage — adequate

Listed `mockups/` (4) and `imports/` (5); no `wireframes/`. Both spines state spines-win-on-conflict once. All nine files are linked from EXPERIENCE (imports per Key Flow + intro list; mockups in IA + flows). DESIGN links all four mockups in a footer block.

### Findings

- **medium** DESIGN references mockups only in a closing list without naming what each illustrates at the relevant Components / Brand section. (`DESIGN.md` closing → Visual references). *Fix:* Inline each mock at the component/surface it proves (return-open → Path map/Quiet Start; self-check → Twin play; level-transition → Criteria table; direction-paper-lamp → Brand & Style).
- **low** `mockups/direction-paper-lamp.html` is listed as a composition/visual reference but never captioned as “locked Paper Lamp direction / token proof.” (`EXPERIENCE.md` § IA; `DESIGN.md` footer; `.memlog.md` direction lock). *Fix:* One explicit illustrate clause.
- **low** UJ-1 and UJ-4 have imports but no dedicated mockups (not orphans; coverage gap for first-launch and interview frames). *Fix:* Optional later mocks; not blocking if spines stay source of truth.

No orphan files in `mockups/` or `imports/`.

## 6. Bloat & overspecification — strong

DESIGN prose carries editorial Quiet Study voice appropriately; EXPERIENCE is mostly tables and imperative rules. Little pixel overspecification where tokens suffice. Anti-gamification is restated across Foundation / Inspiration / Voice / Don'ts — intentional lock, mild repetition. Glossary bind and Inspiration earn their place. No large source-PRD restatement blocks.

### Findings

- **low** Anti-gamification / “no cards/progress/XP” repeats in DESIGN Brand, Colors Not-for, Don'ts, and EXPERIENCE Foundation + Inspiration + Interaction banned. (`DESIGN.md` / `EXPERIENCE.md` multiple). *Fix:* Keep one hard Don'ts + Foundation line; trim duplicate lists elsewhere to cross-refs.
- **low** EXPERIENCE Key Flow steps sometimes restate Component Patterns rules already tabulated (Self-check random order, readiness vocab). Acceptable for journey readability. *Fix:* Prefer “see Twin play / Readiness rows” where the flow only needs the beat order.

## 7. Inheritance discipline — adequate

`sources` paths resolve on disk. EXPERIENCE includes glossary + user-journeys; DESIGN lists PRD + spec only (visual spine — defensible). Documented memlog overrides (UJ-2 quiet Start + compact map; UJ-3 canvas not modal; UJ-4 interview-only readiness vocab + readiness-only finale; UJ-5 IPA on plan only) are committed in EXPERIENCE. Token refs into DESIGN resolve. Glossary bind covers core status vocabulary with explicit interview override.

### Findings

- **high** Component display names / kebab ids are **not identical** across DESIGN frontmatter, DESIGN Components prose, and EXPERIENCE Component Patterns (see §3). Breaks clean source-extract for consumers. *Fix:* Single canonical name list shared by both files.
- **medium** UJ titles are **not verbatim** from `user-journeys.md` / PRD: e.g. source “UJ-2 — Return” vs spine “UJ-2 — First 30 seconds on return”; “UJ-3 — Level transition (end-of-Session overlay)” vs spine “…at Session end” (overlay→canvas intentional). (`EXPERIENCE.md` § Key Flows; `user-journeys.md`). *Fix:* Keep source title stem verbatim; put UX scope in a subtitle (e.g. `UJ-2 — Return` · open-state 0–30s).
- **medium** Glossary bind omits source terms still load-bearing elsewhere: Threshold reached, Critical criteria, Recommended review, Diagnostic conversation, Agent-named plan, Topic, Readiness list (named in components as Readiness rows), Learner. (`EXPERIENCE.md` § Glossary bind; `glossary.md`). *Fix:* Extend bind table to full glossary.md set or “inherits glossary.md verbatim + interview override.”
- **low** DESIGN `sources` omit `glossary.md` / `user-journeys.md` while EXPERIENCE includes them — fine if intentional, but consumers extracting DESIGN alone miss journey vocabulary. (`DESIGN.md` frontmatter). *Fix:* Add glossary to DESIGN sources for status-word consistency, or note “status words inherit EXPERIENCE Glossary bind.”
- **low** Spec/PRD still say UJ-3 “overlay” and UJ-4 “next steps”; spines correctly override — ensure reconcile/docs stay linked so source extract does not reintroduce conflict. (`.memlog.md` overrides; spines). *Fix:* No spine change; optional one-line “overrides PRD wording X” already partially present via Glossary bind / UJ-4 climax.

## 8. Shape fit — strong

DESIGN.md sections present in canonical order: Brand & Style → Colors → Typography → Layout & Spacing → Elevation & Depth → Shapes → Components → Do's and Don'ts. EXPERIENCE.md required defaults present: Foundation, IA, Voice and Tone, Component Patterns, State Patterns, Interaction Primitives, Accessibility Floor, Key Flows. Inspiration & Anti-patterns earned (memlog rejects Duolingo streaks, scored diagnostic, victory modal, IPA-first). Responsive & Platform present and correctly scoped to single desktop Harness (no fake breakpoints). Invented Glossary bind earns its place for downstream term lock.

### Findings

- **low** Both spines `status: draft` while content reads finalize-complete — consumers may under-trust or over-edit. (frontmatter both files; `.memlog.md` Finalize event). *Fix:* Flip to `final` when Update absorbs review findings, or add “draft pending validation” note in Foundation.
- **low** EXPERIENCE Motion rules live under Foundation rather than a dedicated section — fine; ensure DESIGN Plan line “see EXPERIENCE.md Motion” resolves (it does via Foundation Motion bullet). (`DESIGN.md` Plan line; `EXPERIENCE.md` Foundation). *Fix:* Optional anchor heading `### Motion` under Foundation for cross-ref clarity.

## Mechanical notes

- Frontmatter: both `name: English Path`, `status: draft`, dated 2026-10-08; EXPERIENCE sources are the fuller set (includes glossary + user-journeys).
- Spines-win-on-conflict stated in both files; EXPERIENCE also on IA mock block and DESIGN footer.
- Cross-refs: `{colors.accent}` in EXPERIENCE resolves; no broken `{path.to.token}` strings found.
- No Mermaid in either spine.
- Name inconsistencies to normalize: `play-twin` / Twin play; `caption-toggle` / Caption toggle; Input+mic vs split; Shell unpaired; Readiness rows vs glossary Readiness list.
- Relative source paths from `ux-english-path/` resolve to `../prd-english-path/prd-english-path.md` and `../spec-english-path/{spec-english-path,glossary,user-journeys}.md`.
- Mockups present: `direction-paper-lamp.html`, `return-open.html`, `self-check.html`, `level-transition.html`. Imports: `uj-1`…`uj-5`. No wireframes directory.
- Memlog shows Finalize already distilled spines + promoted mocks; this review is Validate-intent rubric walk, not a re-Finalize.
