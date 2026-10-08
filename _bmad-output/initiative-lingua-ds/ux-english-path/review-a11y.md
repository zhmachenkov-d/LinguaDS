# Accessibility Review — English Path

Adversarial pass against `DESIGN.md`, `EXPERIENCE.md` (Accessibility Floor, Self-check, Interaction Primitives), memlog locks **A1A / A2C / A3A / A4A**, `.working/self-check-a11y-motion-locks.md`, and mockups under `mockups/`. Contrast measured with relative-luminance ratios (WCAG 2.x).

## Overall verdict

**Conditionally fail AA as claimed.** Behavioral floor for keyboard, Esc, SR twin names, dual channel, mic-optional, and reduced-motion-as-static is largely coherent in the spines. The **light `{colors.mute}` token fails WCAG AA for normal text** on bg/surface while DESIGN/EXPERIENCE/A1A assert AA for mute — that is a blocked claim. Caption toggles are specified and shown on Self-check twins, but **not on other audio surfaces** in key mocks. Focus-ring token language is internally inconsistent; mock focus is incomplete. Fix mute (and clarify caption scope + focus) before treating the Accessibility Floor as shippable.

## Findings

### Critical

1. **Light mute fails AA normal text (A1A / DESIGN claim broken)**  
   Measured: `{colors.mute}` `#8A8378` on `{colors.bg}` `#F7F3EC` ≈ **3.39:1**; on `{colors.surface}` `#FBF8F2` ≈ **3.54:1**. Need **4.5:1** for normal text. Meta/caption/path/status lines use mute at 11–14px regular (not large text). Dark mute ≈ **5.2–5.7:1** passes — asymmetry hides the light-mode hole.  
   **Used as:** Path map, meta, caption toggle, criteria headers, “Playing…/Listening…”, table mute cells.  
   **Fix:** Darken light mute to ≥4.5:1 on bg **and** surface (and lamp wash if mute sits on it); re-measure; update DESIGN tokens + mocks. Do not claim AA until locked.

2. **A2C “every audio” caption toggle not evidenced outside Self-check twins**  
   Floor + Interaction Primitives + A2C require an adjacent caption/transcript toggle on **every** audio affordance (default off). `self-check.html` shows Caption under each twin. `return-open.html` / `direction-paper-lamp.html` have plan/agent speech with **no** caption control; no ear/words/articulation audio mocks; UJ-4 mock stage explicitly suppresses transcript mid-take (conflict risk with “every audio” unless scoped as “Learner-facing play controls, not interviewer stream”).  
   **Fix:** Spine: define which surfaces count as audio affordances (plan speech, Block A, twin plays, picture-word plays, etc.) vs interview-mock exception. Mocks: show adjacent caption toggles on return-open plan audio and any play control; document UJ-4 exception if intentional.

### High

3. **Focus ring token conflict + incomplete mock focus (A1A)**  
   A1A / Components: focus = thin **`{colors.accent}`** hairline, never glow. Colors table Role for `{colors.hairline}` also lists **“focus ring”**. Only `return-open.html` hardcodes field `outline: 1px solid` accent; `self-check.html` / `level-transition.html` / direction field have **no** `:focus` / `:focus-visible` styles; plays/Yes/No/Caption/mic/Start unfocused in mocks.  
   **Fix:** Single source: accent-only for focus; remove “focus ring” from hairline role. Spec `:focus-visible` for all interactive controls; show in at least one mock per control type.

4. **Hairline as sole “point” cue fails non-text contrast (S3B + 1.4.11)**  
   Self-check “after no” underline uses `#D9D2C6` on `#F7F3EC` ≈ **1.36:1** (need **3:1** for UI indicators). Spines say agent may also point in speech/text (good dual channel), but the **visual** point alone is near-invisible.  
   **Fix:** Raise point underline contrast (≥3:1) **or** rely only on speech/text point and demote underline to optional decoration; keep tracks unlabeled per S1A/A3A.

5. **Field/control borders at hairline contrast**  
   Input, mic, Start, play frames use hairline ≈ **1.36:1** (light) / **~1.4:1** (dark) vs bg — below **3:1** non-text UI contrast if border is the only shape cue.  
   **Fix:** Darken hairline for interactive borders, or add a second cue (accent border on idle interactive chrome) while keeping decorative rules softer if needed.

### Medium

6. **Esc / stop speech discoverability**  
   Floor: Esc stops speech; Voice: “stop anytime stated once.” No persistent Stop chrome on return/Self-check mocks; interview has Stop. Keyboard users who miss the one-time utterance may not know Esc.  
   **Fix:** Keep one-time utterance; add non-blocking status affordance when speaking (e.g. “Esc to stop” in mute **after** mute passes AA) or ensure SR live region announces stop gesture.

7. **Diagrams-not-sole-channel under-specified in mocks**  
   Floor correctly requires text/voice physical-cue equivalents for mouth diagrams. No articulation mock; risk of diagram-only canvas at build time.  
   **Fix:** Add a one-state articulation mock or EXPERIENCE example line showing cue + diagram together; accept criterion in implement checklist.

8. **Caption control legibility + bilingual labeling**  
   Caption at 11px mute fails contrast (see #1). Label is English-only while instruction language may be L1/mixed (UJ-1 bilingual lock).  
   **Fix:** After mute fix, use ≥14px meta; localize Caption/transcript control to instruction language preference.

9. **Tab order / landmark silence**  
   Primitives: Tab → plays / Yes-No / field / toggles. Mocks do not document order when Quiet Start + mic + field + plan audio compete; no `role`/live-region guidance for “Playing…/Listening…”.  
   **Fix:** Explicit reading-order Tab sequence for UJ-2 and Self-check; `aria-live` polite for Listening/Playing/Recording copy (M2B).

### Low

10. **Mic optional — OK in spines; weak in chrome**  
    Mic optional without reproach is locked and consistent. Mock `aria-label="microphone"` is fine; ensure denial/silence paths never change mic styling to error/alarm (already banned).  

11. **A3A SR names — mock OK, incomplete matrix**  
    `aria-label="Recording one|two"` on Self-check twins matches A3A. Articulation “unlabeled dual tracks” should reuse the same SR names — state that explicitly.  

12. **A4A / M1B reduced motion — OK**  
    Product-static policy matches prefers-reduced-motion; mocks have no CSS animation. Residual risk: host Harness chrome animating outside spine control — note as host dependency.  

13. **DESIGN vs EXPERIENCE plan-line color**  
    DESIGN plan line = ink; return-open plan = accent/secondary. Not a11y-critical (accent passes AA) but dilutes contrast discipline for “primary spoken text.” Prefer ink for plan body.

## Gaps vs locked memlog decisions

| Lock | Spine status | Gap |
| ---- | ------------ | --- |
| **A1A** AA ink/mute; accent focus, no glow | Claimed in DESIGN + Accessibility Floor | **Mute light fails AA**; hairline listed as focus ring; mock focus incomplete |
| **A2C** Full keyboard + Esc; caption on every audio | Stated in Floor + Primitives | Keyboard/Esc text OK; **caption not shown on non-Self-check audio**; UJ-4 transcript ban vs “every audio” unresolved |
| **A3A** SR “Recording one/two” | Twin play component + self-check mock | Articulation dual tracks not explicitly bound to same names |
| **A4A** prefers-reduced-motion → static | Aligned with M1B/M2B | No host-Harness motion carve-out; otherwise locked |
| **S1A–S4B** (related) | Reflected in EXPERIENCE + self-check mock | Point underline contrast weak; dual channel (speech) mitigates |
| **Bilingual / mic optional** | UJ-1 + Foundation | Caption chrome not bilingual; otherwise OK |

**Bottom line for locks:** A4A holds; A3A holds on Self-check evidence; **A1A and A2C do not hold as written** until mute is fixed and caption scope is closed across audio surfaces.
