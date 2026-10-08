# Self-check · Accessibility · Motion — locked 2026-10-08

Updated after `review-a11y.md` critical fixes.

## Self-check polish
- **S1A** Twin plays, same glyph/size; random order each Self-check; no A/B letters.
- **S2C** Quiet Yes/No (body ink weight, no green/red) + typed/spoken via field/mic.
- **S3B** On no: slower twin replay + `{colors.ui-line}` underline under pointed track (≥3:1) **and** speech/text point (dual channel).
- **S4B** On yes: one neutral fact line then Fixation — no praise/check.

## Accessibility floor
- **A1A** WCAG AA ink/mute on bg/surface/lamp; light mute `#6B655C`; focus = thin `{colors.accent}` ring only (never glow / never hairline-as-focus).
- **A2C** Full keyboard + Esc stops speech (“Esc to stop” while speaking); caption on every Learner-facing **play** + during plan/agent speech (default off); **UJ-4 mock take** = no live transcript (debrief replays only).
- **A3A** SR: "Recording one" / "Recording two" on Self-check **and** articulation dual tracks — never yours/model/reference.
- **A4A** `prefers-reduced-motion`: no fades; instant text; static diagrams (matches motion-free product).

## Motion
- **M1B** Truly static UI — no CSS/UI animation; audio + still diagrams carry time; static lamp wash.
- **M2B** Listening/Playing copy + static glyph swap only — no pulse/glow/animation; `aria-live="polite"`.

## Tokens added
- `{colors.ui-line}` `#8A8378` / `{colors.ui-line-dark}` `#7A7368` — interactive borders + Self-check point.
