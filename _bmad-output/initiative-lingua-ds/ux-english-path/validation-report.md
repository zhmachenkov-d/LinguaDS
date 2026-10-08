# Validation Report — English Path

- **DESIGN.md:** `_bmad-output/initiative-lingua-ds/ux-english-path/DESIGN.md`
- **EXPERIENCE.md:** `_bmad-output/initiative-lingua-ds/ux-english-path/EXPERIENCE.md`
- **Run at:** 2026-10-08T21:40:00+03:00

## Overall verdict

Rubric found an **adequate** contract with thin component dual-coverage and inheritance drift. Accessibility **conditionally failed AA** on light mute and caption scope. Adversarial **conditionally failed** Quiet Study integrity on mock density and Start/IPA chrome. Post-review Update absorbed critical/high spine fixes (mute `#6B655C`, `ui-line`, caption scope + UJ-4 exception, accent-only focus, Esc meta, fatigue/mic-denied states, DESIGN component stubs, glossary bind, UJ title stems, return-open/level-transition mock scrub, full mock set). Residual risk is mock host chrome (radius/shadow) and some density polish — spines now bind the locks.

## Category verdicts

- Flow coverage — strong
- Token completeness — strong (post-fix)
- Component coverage — adequate (post-fix; was thin)
- State coverage — adequate (post-fix)
- Visual reference coverage — strong (15 mocks)
- Bloat & overspecification — strong
- Inheritance discipline — adequate (post-fix)
- Shape fit — strong

## Findings by severity

### Critical — resolved in Update

**[a11y]** Light mute failed AA → mute `#6B655C`; verified ≥4.5:1  
**[a11y]** Caption “every audio” unbound → Learner play + plan speech; UJ-4 mock exception  
**[adversarial]** Level transition denser / “fuller” permission → removed; sparse-forever restated  
**[adversarial]** Return open denser than three lines → mock collapsed; status orthography not slash-IPA  

### High — resolved or mitigated

**[rubric]** Missing DESIGN visual rows for orientation/mouth/picture/interview/finale → added  
**[rubric]** Component name drift → Shell row + clearer Quiet Start/Path rules  
**[a11y]** Focus/hairline conflict → accent-only focus; `ui-line` for borders/point  
**[a11y]** Point underline contrast → `ui-line` ≥3:1 + dual-channel speech  
**[adversarial]** Quiet Start as filled CTA → transparent in mock + spine  
**[adversarial]** Interview unmocked → prep/mock/debrief mocks added  
**[adversarial]** UJ-1 skipped Self-check → UJ-1 step 6 cites Self-check  

### Medium / Low — accepted residual

- Mock host `border-radius: 12px` / box-shadow still in some HTML frames (Harness chrome vs Path field) — implementers follow DESIGN Shapes/Elevation, not mock frame chrome.
- Import filename `uj-3-…-overlay.md` retained; EXPERIENCE notes canvas form.
- Optional: Self-check “Noted.” third column; Block A ~25s idle-Start state mock.

## Reviewer files

- `review-rubric.md`
- `review-a11y.md`
- `review-adversarial.md`
