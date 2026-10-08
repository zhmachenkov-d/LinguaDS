---
name: English Path
status: final
created: "2026-10-08"
updated: "2026-10-08"
sources:
  - ../prd-english-path/prd-english-path.md
  - ../spec-english-path/spec-english-path.md
  - ../spec-english-path/glossary.md
  - ../spec-english-path/user-journeys.md
---

# English Path — Experience Spine

Behavior, IA, states, and journeys for the local DeepSeek Harness English coach. Visual identity lives in `DESIGN.md`. Cross-refs use `{path.to.token}` into that file. Spines win on conflict with mocks, wireframes, and imports.

Discovery imports (illustrative; spines win): `imports/uj-1-first-launch-walkthrough.md`, `imports/uj-2-first-30-seconds.md`, `imports/uj-3-level-transition-overlay.md`, `imports/uj-4-interview-practice.md`, `imports/uj-5-phonics-lesson.md`.

## Foundation

- **Form-factor:** local desktop DeepSeek Harness shell (not a separate mobile/web app).
- **Channels:** voice + text simultaneous and equal; mic optional without reproach; Esc / explicit stop ends speech anytime.
- **Mode:** system light/dark per `DESIGN.md`.
- **Density:** sparse forever — UJ-1 first-paint emptiness on every surface.
- **Motion:** truly static UI — no CSS/UI animation; audio and still diagrams carry time; lamp wash is static. Honor `prefers-reduced-motion` with the same rule (instant text, static diagrams).
- **Stakes:** internal / pilot (builder + trusted circle).
- **Anti-gamification:** no streaks, XP, badges, points, unlock language, victory chrome, praise theater, or % as progress framing.

## Inspiration & Anti-patterns

- **Lifted:** private lesson / quiet desk — one agent voice, one plan, one act.
- **Rejected — Duolingo-style streaks / XP / badges:** retention is plan transparency + soft advance, not calendar punishment.
- **Rejected — scored diagnostic / aloud “wrong”:** adaptive conversation; silence → slower → L1 → move on.
- **Rejected — victory Level-up modal:** Level transition is a calm end-of-session canvas with evidence.
- **Rejected — IPA-first drill UI:** canvases are sound + mouth diagrams + pictures; slash IPA only on agent plan and fixation/queue naming — not on open-state status lines (use orthography / plain names there).

## Information Architecture

| Surface                 | Reached from                        | Purpose                                                                                            |
| ----------------------- | ----------------------------------- | -------------------------------------------------------------------------------------------------- |
| Session shell           | Harness open                        | Sparse host: plan/status lines, input, mic, quiet Start, Path map when shown                       |
| First-launch Session    | Cold install / first open           | Greeting → ≤3 prefs → diagnostic → Path map → first Phonics → finale (UJ-1)                        |
| Return open state       | Later Session open                  | Three lines + compact Path map + focused field/mic + quiet Start; plan speech; auto Block A (UJ-2) |
| Orientation strip       | Any Session                         | Level · Topic · Session goal · Available / Recommended — facts only; never a Review strip token    |
| Phonics lesson          | Agent-named step                    | Ear → articulation → words → mini-contrast → Self-check → Fixation (UJ-5)                          |
| Level transition canvas | End of Session when evidence enough | Criteria table + Path map + Goes into review + next Session (UJ-3)                                 |
| Interview practice      | Agent-named B1+ scenario            | Prep → mock → debrief readiness map → optional second pass (UJ-4)                                  |
| Session finale          | End of ordinary Session             | Confirmed / Unstable / Goes into review / next — no celebration                                    |

No mode/topic/continue-vs-review chooser. Review is Block A of the lesson, not a separate screen or heading.

→ Composition references (spines win on conflict): [mockups/direction-paper-lamp.html](mockups/direction-paper-lamp.html) (Brand), [mockups/first-paint.html](mockups/first-paint.html), [mockups/setup-prefs.html](mockups/setup-prefs.html), [mockups/diagnostic.html](mockups/diagnostic.html), [mockups/path-map-first.html](mockups/path-map-first.html), [mockups/return-open.html](mockups/return-open.html), [mockups/orientation.html](mockups/orientation.html), [mockups/phonics-ear.html](mockups/phonics-ear.html), [mockups/phonics-articulation.html](mockups/phonics-articulation.html), [mockups/self-check.html](mockups/self-check.html), [mockups/finale.html](mockups/finale.html), [mockups/level-transition.html](mockups/level-transition.html), [mockups/interview-prep.html](mockups/interview-prep.html), [mockups/interview-mock.html](mockups/interview-mock.html), [mockups/interview-debrief.html](mockups/interview-debrief.html).

## Voice and Tone

Microcopy. Brand posture lives in `DESIGN.md`.

| Do                                                                       | Don't                                                             |
| ------------------------------------------------------------------------ | ----------------------------------------------------------------- |
| Agent-named plan: unstable → one new element → length (one number)       | Welcome back / missed days / “ready to crush it?”                 |
| Glossary statuses as plain facts                                         | Unlocked / level up / almost there / Good!                        |
| “Do you hear the difference?”                                            | Aloud “wrong”; auto-grade without Learner judgment                |
| “Noted.” (or equivalent neutral fact) after Self-check yes               | Green check, praise, score                                        |
| “Listening…” / “Playing…”                                                | Animated pulse on mic                                             |
| Interview readiness: устойчиво / частично / неустойчиво / не проверялось | Apply-for-jobs verdict; ordinary glossary terms on interview rows |
| Stop anytime stated once                                                 | Continue? gates; Start-lesson menus                               |

Instruction language: Learner preference (default mixed). Practice language: English. Bilingual samples allowed on first greeting.

## Component Patterns

Behavioral. Visual specs: `DESIGN.md` Components.

| Component            | Use                       | Behavioral rules                                                                                                                                       |
| -------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Shell                | Every Session             | English Path owns centered column content; Harness may own window chrome only — no host streak/progress injection                                      |
| Plan line            | Open state, lesson open   | First speech on return is the plan; appears as text with voice; no animation                                                                           |
| Input field          | Always present in shell   | Accepts typed answers; focused on return open; no placeholder required; transparent + `{colors.ui-line}`                                                |
| Mic control          | Shell                     | Optional; idle/active = static glyph swap; never reproach if unused                                                                                    |
| Quiet Start          | Return open (UJ-2)        | Transparent outline only; does **not** block plan speech or auto auditory Block A; unused while Block A plays is valid                                 |
| Path map             | UJ-1, UJ-2 compact, UJ-3  | A0→C1; you-are-here; Goal C1 horizon; B1+/interview near-term; Available/Recommended only — never unlocked/points/%/fill; same emptiness as UJ-1       |
| Orientation strip    | Session                   | Level · Topic · Session goal · Available / Recommended — never a Review token                                                                          |
| Criteria table       | UJ-3                      | name / threshold / evidence / status; statuses: Available · Conditionally available · Not available (glossary); criterion Almost confirmed when needed |
| Twin play            | Articulation + Self-check | Identical unlabeled controls; Self-check order **random** each time; SR (both surfaces): “Recording one” / “Recording two” — never yours/model/reference |
| Yes / No             | Self-check                | Quiet text controls + typed/spoken accepted; same ink weight; no green/red                                                                             |
| Caption toggle       | Learner-facing audio      | Adjacent to every **play** control and to the shell while **plan/agent speech** is audible; default off; label follows instruction-language pref (≥14px meta). **Exception:** UJ-4 mock take has no live transcript mid-answer; fragment caption/transcript only in debrief when a clip is replayed |
| Mouth diagrams       | Articulation              | Static profiles only; no IPA labels on canvas; no animated tongue; always paired with text/voice physical cue on the same canvas                                                                                      |
| Picture words        | Phonics words block       | Pictures + play; auto-record on repeat; no spelling goal                                                                                               |
| Interview prep strip | UJ-4 prep                 | Posting + keywords + raw facts field + functional strip + one STAR on own case                                                                         |
| Mock stage           | UJ-4 take                 | Minimal: dim keywords, in-progress, Stop only; no transcript/feedback/block meter/pause mid-answer                                                     |
| Readiness rows       | UJ-4 debrief              | Six rows; interview-only vocab; never hide не проверялось; no row colors; readiness-only finale (no ordinary next-step line)                           |
| Finale descriptors   | Ordinary Session end      | Confirmed / Unstable / Goes into review / next                                                                                                         |

## State Patterns

| State                           | Surface         | Treatment                                                                                                                                                                                       |
| ------------------------------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Cold first paint                | Session shell   | Short line + input + mic; no cards/progress/illustrations                                                                                                                                       |
| Greeting (UJ-1)                 | First-launch    | Simultaneous voice+text; stop anytime explicit; mic optional                                                                                                                                    |
| Setup prefs                     | First-launch    | ≤3 only: instruction language / format / length; defaults mixed / whatever / 10; Goal C1 one-liner; no interests/career/topics                                                                  |
| Diagnostic                      | First-launch    | Adaptive conversation not scored test; probe tree; no aloud right/wrong; early-stop; silence→slower→RU→move on; ~5–8 min; default silence wait 5–7s                                             |
| Return open (0–30s)             | Session         | Three lines (last stop / Unstable+Available / Next step) + compact Path map + focused field/mic + quiet Start; silence 0–2s; plan 2–6s; wait; slower repeat once ~15–25s; Block A auditory ~25s |
| Lesson underway                 | Phonics / other | Agent names step + timings; no Start-lesson menu                                                                                                                                                |
| Self-check pending              | Phonics         | Two plays + question; agent waits; no auto-grade                                                                                                                                                |
| Self-check no                   | Phonics         | Slower twin replay + `{colors.ui-line}` underline under pointed track **and** agent points in speech/text (dual channel)                                                                        |
| Self-check yes                  | Phonics         | One neutral fact line (“Noted.”) → Fixation                                                                                                                                                     |
| Within-level queue              | Fixation        | Unstable sound → queue; next lesson stays Available (not hard-blocked)                                                                                                                          |
| Level transition                | End Session     | Only when enough evidence; else ordinary finale; never mid-session; full canvas not modal                                                                                                       |
| Interview mock                  | UJ-4            | No mid-answer help; Stop anytime; interviewer formal/neutral with interrupt + unexpected Qs; no live caption mid-take                                                                           |
| Interview debrief               | UJ-4            | Descriptor summary + readiness rows + fragment review without praise; optional second pass with arrow comparison only; caption on replayed clips only                                           |
| Listening / Playing / Recording | Any audio       | Copy state + static glyph; `aria-live="polite"`; no animation                                                                                                                                   |
| Agent speaking                  | Any             | Mute meta “Esc to stop” (instruction language); Esc works without it                                                                                                                            |
| Focus                           | Interactive     | Thin `{colors.accent}` `:focus-visible` ring on every control; Tab order per Interaction Primitives                                                                                             |
| Mic permission denied           | Any             | Typed path remains; one neutral line; never shame or alarm mic styling                                                                                                                          |
| Fatigue / early-stop deferral   | Session         | Stop anytime / tired / agent early-stop after review → defer new material; finale still uses glossary descriptors — not failure                                                                 |
| Soft audio fail                 | Any audio       | Slower replay or typed fallback; no alarm chrome                                                                                                                                                |
| Offline / local                 | All             | Assumed local runtime; no telemetry banners; no cloud-sync guilt                                                                                                                                |

## Interaction Primitives

- Type or speak into the always-present field/mic.
- **Tab order (UJ-2):** plan caption toggle (if present) → quiet Start → mic → field → Path map links (if any).
- **Tab order (Self-check):** play one → its caption → play two → its caption → Yes → No → field/mic.
- Space/Enter activate; Esc stops speech anytime; while speaking, show “Esc to stop” in mute meta.
- Quiet Start may be pressed but never required to hear the plan or begin Block A.
- Twin plays: activate either; order randomized on each Self-check entry.
- Caption toggle on every Learner-facing play control and during plan/agent speech (default off); UJ-4 mock-take exception above.
- `aria-live="polite"` for Listening… / Playing… / Recording… copy (static glyph swap only).
- **Banned:** carousels, celebration motion, countdown timers as pressure, Skip block, mid-answer interview hints, mode choosers, Start-lesson gates, auto-grade without Self-check.

## Accessibility Floor

Behavioral. Contrast tokens live in `DESIGN.md`.

- WCAG **AA** (≥4.5:1) for ink/mute on bg/surface/lamp (light and dark); interactive borders and Self-check point use `{colors.ui-line}` (≥3:1).
- Visible `:focus-visible` = thin `{colors.accent}` ring on every interactive control — never glow, never hairline-as-focus.
- Full keyboard access to plays, Yes/No, field, Start, caption toggles; Esc stops speech; “Esc to stop” while speaking.
- Caption/transcript toggle on every Learner-facing play control and during plan/agent speech (off by default); **not** during UJ-4 mock take (debrief replays only).
- Self-check **and articulation** dual-track AT names: “Recording one”, “Recording two” — never “yours” / “model” / “reference”.
- `prefers-reduced-motion`: no fades; instant text; static diagrams forever (matches product motion policy). Host Harness chrome motion is out of spine scope — prefer static there too.
- Voice + text channels remain dual; mic never required.
- Mouth diagrams require text/voice physical cue equivalents on the same canvas — diagrams are not the sole channel.

## Responsive & Platform

Single surface: desktop Harness. No mobile breakpoint contract in v1. Host window chrome follows the Harness; English Path content stays centered column per `DESIGN.md` spacing.

## Key Flows

### UJ-1 — First launch · continuous Session (Alex, Russian L1 adult, first open)

1. Alex opens the Harness; sparse shell paints (short line + input + mic).
2. Greeting: simultaneous voice+text; bilingual sample; stop anytime; mic optional.
3. Setup: ≤3 prefs (instruction language / format / length) with defaults; Goal C1 stated once.
4. Diagnostic: adaptive conversation (~5–8 min); no scores aloud; early-stop paths; on-screen probes use letters/sounds spoken — not slash-IPA labels.
5. Path map: A0→C1 you-are-here; Goal C1 horizon **and** B1+/interview near-term; Available/Recommended only — same emptiness as greeting.
6. First Phonics lesson same Session (~8 min), including **Self-check** (see UJ-5); alphabet as small audio-first letter batches, not a dump.
7. **Climax:** Finale lists Confirmed / Unstable / Goes into review / next — no celebration; state persists for guilt-free resume.

Failure: silence or mic denial → slower prompts → L1 → typed path → move on; never shame.

→ Import: `imports/uj-1-first-launch-walkthrough.md` · Mocks: [first-paint](mockups/first-paint.html) · [setup-prefs](mockups/setup-prefs.html) · [diagnostic](mockups/diagnostic.html) · [path-map-first](mockups/path-map-first.html) · [finale](mockups/finale.html)

### UJ-2 — Return · first 30 seconds (Alex, next evening)

1. Frame complete immediately: **three lines** (last stop / Unstable+Available as one line / Next step) + compact Path map (mute, no fill) + focused field/mic + quiet Start (transparent).
2. No greeting in the first 30s; first speech is the Agent-named plan (unstable → one new → length). Open-state status lines use plain/orthographic names — slash IPA only inside the spoken/plan line.
3. Timeline: silence 0–2s → plan 2–6s → wait → slower repeat once ~15–25s → Block A auditory ~25s (Start may sit idle unused).
4. Quiet Start may be used but does not gate hearing or Block A.
5. After 30s: Recommended review remains Block A → Self-check when relevant → one new element; fatigue / early-stop may defer new material without failure framing.
6. **Climax:** Lesson is already underway — continuation, not an event; review is Block A, not a Review screen.

Failure: no response after slower repeat → agent continues with Block A auditory path or offers typed route without guilt.

→ Import: `imports/uj-2-first-30-seconds.md` · Mock: [mockups/return-open.html](mockups/return-open.html) · [orientation](mockups/orientation.html)

### UJ-3 — Level transition · end-of-Session canvas (Alex, enough evidence gathered)

1. Ordinary Session would end; enough evidence → Level transition canvas (not modal/dimming).
2. Same calm voice: criteria table (name/threshold/evidence/status) + Path map (C1 + B1+/interview) + Goes into review + next Session.
3. Cases use glossary: Available / Conditionally available / Not available; criterion Almost confirmed when applicable; Case C keeps confirmed rows visible.
4. **Climax:** Next Session line closes the Session — factual, reversible, no unlock spectacle.

Failure: insufficient evidence → ordinary finale instead; never mid-session interrupt.

Import filename says “overlay”; product form is **canvas** (not modal). · Mock: [mockups/level-transition.html](mockups/level-transition.html)

### UJ-4 — Interview practice (Alex, B1+ scenario rehearsal)

1. Open: longer plan + blocks; one time confirmation (45/60/other); stop anytime + no mid-answer hints stated up front; prep first.
2. Prep: posting + keywords + raw facts + functional strip + one STAR on own case; sparse agent speech.
3. Mock: minimal UI; interviewer formal/neutral; interrupts + unexpected questions; Stop only; no live transcript; no countdown — mute elapsed optional without remaining-time pressure.
4. Debrief: descriptor summary + six readiness rows (устойчиво / частично / неустойчиво / не проверялось) + fragment review without praise.
5. Optional second pass after debrief; **word** comparison only (no trend/delta arrow chrome).
6. **Climax:** Readiness map alone is the finale — no ordinary next-step line; never certifies apply-for-jobs.

Failure: Stop mid-mock → debrief on what exists; не проверялось rows remain visible.

→ Import: `imports/uj-4-interview-practice.md` · Mocks: [prep](mockups/interview-prep.html) · [mock](mockups/interview-mock.html) · [debrief](mockups/interview-debrief.html)

### UJ-5 — A0 Phonics lesson (Alex, Agent-named step)

1. Open: agent names step + plan timings (slash IPA allowed on plan line only); lesson underway — no Start-lesson menu.
2. Ear (~2): same/different; no right/wrong aloud.
3. Articulation (~2): static mouth diagrams; one record; unlabeled dual tracks.
4. Words (~2): pictures + play; auto-record; no spelling.
5. Mini-contrast (~1): hear→picture, picture→produce; neutral next.
6. Self-check (~2): random-order twin plays; “Do you hear the difference?”; Yes/No + typed/spoken; on no → slower replay + `{colors.ui-line}` point + speech/text; on yes → “Noted.” → Fixation.
7. **Climax:** Fixation states Confirmed / Unstable / Goes into review / Within-level queue / next — next lesson stays Available.

Failure: cannot distinguish → queue entry; no hard-block of next lesson; no skip of Self-check when agent is “sure.”

→ Import: `imports/uj-5-phonics-lesson.md` · Mocks: [ear](mockups/phonics-ear.html) · [articulation](mockups/phonics-articulation.html) · [self-check](mockups/self-check.html)

## Glossary bind

Ordinary Sessions inherit `../spec-english-path/glossary.md` **verbatim**: Confirmed · Almost confirmed · Unstable · Goes into review · Available · Open · Recommended · Recommended review · Threshold reached · Conditionally available · Not available · Not open · Critical criteria · Within-level queue · Diagnostic conversation · Agent-named plan · Topic · Readiness list · Learner. Learner-facing chrome prefers **Available** (not “unlocked”); Open is glossary-synonym only, not a separate UI dialect. Interview readiness rows use the four-term override (устойчиво / частично / неустойчиво / не проверялось) — interview-only.
