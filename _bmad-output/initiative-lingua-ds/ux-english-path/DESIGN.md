---
name: English Path
description: Quiet Study / Paper Lamp visual identity for the local DeepSeek Harness English coach.
status: final
created: "2026-10-08"
updated: "2026-10-08"
sources:
  - ../prd-english-path/prd-english-path.md
  - ../spec-english-path/spec-english-path.md
colors:
  bg: "#F7F3EC"
  surface: "#FBF8F2"
  ink: "#2C2A26"
  mute: "#6B655C"
  hairline: "#D9D2C6"
  ui-line: "#8A8378"
  accent: "#5C564C"
  lamp: "#EDE6D8"
  bg-dark: "#1C1A16"
  surface-dark: "#24211C"
  ink-dark: "#E8E2D6"
  mute-dark: "#9A9286"
  hairline-dark: "#3A342C"
  ui-line-dark: "#7A7368"
  accent-dark: "#C8C0B2"
  frame-dark: "#12100C"
typography:
  display:
    fontFamily: '"Iowan Old Style", "Apple Garamond", "Times New Roman", Times, serif'
    fontSize: 22px
    fontWeight: "500"
    lineHeight: "1.35"
    letterSpacing: "0.01em"
  body:
    fontFamily: '"Iowan Old Style", "Apple Garamond", "Times New Roman", Times, serif'
    fontSize: 17px
    fontWeight: "400"
    lineHeight: "1.55"
    letterSpacing: "0.01em"
  meta:
    fontFamily: '"Iowan Old Style", "Apple Garamond", "Times New Roman", Times, serif'
    fontSize: 14px
    fontWeight: "400"
    lineHeight: "1.45"
    letterSpacing: "0.02em"
  chrome:
    fontFamily: 'ui-sans-serif, system-ui, "Segoe UI", sans-serif'
    fontSize: 13px
    fontWeight: "400"
    lineHeight: "1.4"
rounded:
  none: 0
  sm: 2px
  DEFAULT: 2px
spacing:
  "1": 4px
  "2": 8px
  "3": 12px
  "4": 16px
  "5": 24px
  "6": 32px
  "7": 48px
  gutter: 24px
  margin: 48px
  column-max: 36rem
components:
  shell:
    background: "{colors.bg}"
    text: "{colors.ink}"
    meta: "{colors.mute}"
    align: center
  plan-line:
    typography: "{typography.body}"
    color: "{colors.ink}"
  input-field:
    background: transparent
    border: "{colors.ui-line}"
    text: "{colors.ink}"
    focus-ring: "{colors.accent}"
  mic-control:
    glyph-idle: "◉"
    color: "{colors.accent}"
    border: "{colors.ui-line}"
    typography: "{typography.chrome}"
  quiet-start:
    background: transparent
    border: "{colors.ui-line}"
    text: "{colors.ink}"
    typography: "{typography.meta}"
  path-map:
    text: "{colors.ink}"
    meta: "{colors.mute}"
    rule: "{colors.hairline}"
  criteria-table:
    text: "{colors.ink}"
    rule: "{colors.hairline}"
    typography: "{typography.body}"
  play-twin:
    glyph: "◉"
    color: "{colors.accent}"
    border: "{colors.ui-line}"
    point-underline: "{colors.ui-line}"
  yes-no:
    color: "{colors.ink}"
    typography: "{typography.body}"
  caption-toggle:
    color: "{colors.mute}"
    typography: "{typography.meta}"
---

# English Path — Design Spine

Visual identity for the local DeepSeek Harness English coach. Behavior lives in `EXPERIENCE.md`. Spines win on conflict with mocks, wireframes, and imports.

Direction source: `.working/direction-paper-lamp.html` · tokens: `.working/paper-lamp-tokens.md`.

## Brand & Style

**Quiet Study** under a desk lamp. The product is a private lesson surface — not a game, dashboard, or marketing page. Warm paper, still air, medium Garamond. Emptiness is the brand: first paint is a short line, an input, and a mic; that sparseness holds on Path map, debrief, and Level transition alike.

Anti-gamification is visual as well as verbal: no streaks, XP, badges, progress fills, celebration chrome, alarm colors, or terracotta “warm app” accents. Soft lamp wash only — never purple gradient, glow, or pulse.

## Colors

Follow **system** light / dark. Contrast targets (verified): WCAG **AA** (≥4.5:1) for `{colors.ink}` and `{colors.mute}` on `{colors.bg}` / `{colors.surface}` / lamp wash; **≥3:1** non-text for `{colors.ui-line}` on interactive borders and Self-check point underline.

| Token               | Light     | Dark                               | Role |
| ------------------- | --------- | ---------------------------------- | ---- |
| `{colors.bg}`       | `#F7F3EC` | `{colors.bg-dark}` `#1C1A16`       | Page field under lamp wash |
| `{colors.surface}`  | `#FBF8F2` | `{colors.surface-dark}` `#24211C`  | Quiet raised plane (rare; prefer bg) |
| `{colors.ink}`      | `#2C2A26` | `{colors.ink-dark}` `#E8E2D6`      | Body, plan, statuses |
| `{colors.mute}`     | `#6B655C` | `{colors.mute-dark}` `#9A9286`     | Meta, captions, secondary lines (≥4.5:1 on bg/surface/lamp) |
| `{colors.hairline}` | `#D9D2C6` | `{colors.hairline-dark}` `#3A342C` | Decorative rules only — not focus, not interactive borders |
| `{colors.ui-line}`  | `#8A8378` | `{colors.ui-line-dark}` `#7A7368`  | Interactive borders + Self-check point underline (≥3:1) |
| `{colors.accent}`   | `#5C564C` | `{colors.accent-dark}` `#C8C0B2`   | Mic/play glyphs; **sole** focus-ring color — never decorative fill |
| `{colors.lamp}`     | `#EDE6D8` | —                                  | Soft radial wash center (light); dark uses `{colors.frame-dark}` `#12100C` as outer frame only |

**Not for:** success green, error red as status language, row heat maps, progress fills, badge chips.

## Typography

Lead stack: `{typography.display}` / `{typography.body}` / `{typography.meta}` — Iowan Old Style → Apple Garamond → Times New Roman → Times → serif. Centered. Medium weight for short titles; regular for body. Modest tracking.

`{typography.chrome}` (system sans) only for OS-adjacent control chrome if the serif stack fails legibility on tiny glyphs — never for plan lines or status copy.

No display hero that overpowers the lesson text. No Inter / Roboto / Arial as identity.

## Layout & Spacing

Desktop Harness shell. One centered column (`{spacing.column-max}`), generous `{spacing.margin}`, still gutters. Density = UJ-1 greeting forever: prefer empty field over secondary panels.

No card grids, side rails of metrics, or dashboard chrome. Path map and criteria tables are text + hairlines, not cards.

## Elevation & Depth

Almost none. Atmosphere comes from the **static** lamp radial wash on `{colors.bg}`, not shadows. No multi-layer drop shadows, no modal dimming, no floating sheets. Level transition is a full canvas state, not an elevated overlay.

## Shapes

Near-square: `{rounded.none}`–`{rounded.sm}` only. No pills, no large radii, no badge lozenges.

## Components

### Shell

Full-bleed `{colors.bg}` with static lamp wash. Centered column. No header chrome beyond what the Harness host requires.

### Plan line

`{typography.body}` in `{colors.ink}`. Appears as spoken text into still air — no animation (see EXPERIENCE.md Motion).

### Input field + mic

Transparent field, `{colors.ui-line}` border, `{colors.ink}` text. Focus = thin `{colors.accent}` ring via `:focus-visible` on **every** interactive control (never glow; never `{colors.hairline}`). Mic glyph idle `◉` in `{colors.accent}`; active = filled static glyph (no pulse).

### Quiet Start

Text-outlined control: transparent fill, `{colors.ui-line}` border, `{typography.meta}`. Never filled primary CTA, never blocks hearing the plan.

### Path map

Text lines + optional hairline rules. Shows A0→C1, you-are-here, Goal C1 horizon, B1+/interview near-term. **No** fill gauge, %, unlock icons, or progress bar. Same emptiness budget as UJ-1 greeting on every surface (including first-launch Path map and Level transition) — never denser on debrief/map.

### Criteria table (Level transition)

Four columns as text: name / threshold / evidence / status. Hairline rules only. No checkmarks, icons, or traffic colors.

### Twin play (Self-check / articulation)

Identical glyphs, identical size, `{colors.ui-line}` border. Random left/right order each Self-check. Pointing (on “no”) = one `{colors.ui-line}` underline under the pointed control (≥3:1) — still unlabeled visually; SR names in EXPERIENCE.md.

### Yes / No

Body-weight text links/buttons in `{colors.ink}` — no green/red, no filled chips.

### Caption / transcript toggle

`{colors.mute}` meta (≥14px) beside every Learner-facing play control and while plan/agent speech is audible; default off. Label follows instruction-language preference. UJ-4 mock-take exception: see EXPERIENCE.md.

### Orientation strip

Mute meta lines only (`{typography.meta}`): Level · Topic · Session goal · Available / Recommended. Hairline optional. Never a Review heading or dashboard chips.

### Mouth diagrams

Static profile shapes in `{colors.ink}` / `{colors.mute}`; no IPA labels; always beside a physical-cue line in `{colors.ink}`. No animation.

### Picture words

Picture + play glyph; no spelling orthography as goal. Play uses twin-play visual rules (ui-line border, caption toggle).

### Interview prep strip

Sparse stacked text: posting snippet (`{colors.mute}`), keywords muted, raw-facts field (transparent + ui-line), functional strip, one STAR prompt — no cards.

### Mock stage

Minimal field: dim keywords, “in progress” mute copy, Stop control (ui-line, transparent). No timer bar, transcript, or block meter.

### Readiness rows

Six plain text rows; interview vocab only; no row colors, %, or trend glyphs. Second-pass compare is words, not arrows.

### Finale descriptors

Plain ink lines: Confirmed / Unstable / Goes into review / next. No celebration chrome.

## Do's and Don'ts

**Do**

- Keep surfaces as empty as first paint.
- Use glossary status words as plain ink text.
- Match light/dark to system.
- Prefer hairlines over boxes; interactive borders use `{colors.ui-line}`.

**Don't**

- Cards, progress bars, XP, badges, streaks, confetti, glow, pulse.
- Terracotta accent, purple gradients, alarm status colors.
- Animated tongue diagrams, path-map animations, staggered checkmarks.
- Victory / unlock / level-up chrome; “A0 → A1” as event headline.
- Dense dashboards on debrief or map; filled primary Start CTA.
- Trend/delta arrows as score chrome (second-pass compare is prose only).
- Slash IPA on open-state status lines (plan/fixation naming only).

---

→ Visual references (spines win on conflict): [direction-paper-lamp](mockups/direction-paper-lamp.html) (Brand & Style) · [return-open](mockups/return-open.html) (Quiet Start, Path map) · [self-check](mockups/self-check.html) (Twin play) · [level-transition](mockups/level-transition.html) (Criteria table) · [first-paint](mockups/first-paint.html) · [interview-debrief](mockups/interview-debrief.html) (Readiness rows) · see EXPERIENCE.md IA for full mock index.
