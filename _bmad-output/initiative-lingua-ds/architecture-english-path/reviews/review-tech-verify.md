# Tech-verify review — Architecture Spine (English Path)

**Lens:** Verify every committed decision was web-researched or reality-checked rather than asserted from training data: current library/framework versions, that each named technology still exists and fits, and — greenfield — the live defaults of any starter it leans on. Flag anything that could be out of date and wasn't confirmed against the web, the existing project, or the current starter.

**Spine:** `architecture-english-path.md`  
**Checked:** 2026-10-08 (independent re-check)  
**Project posture:** greenfield (repo has BMAD artifacts only; no app code to ratify)  
**Evidence used:** npm registry (`@deepseek-ai/dsh`, `@deepseek-ai/cordis`, related packages), PyPI (`faster-whisper`, `kokoro`), DeepSeek Harness docs/README (first-plugin tutorial, providers guide, dsh CLI README), memlog version note

---

## Verdict

**pass-with-findings**

Named Stack pins for dsh / Cordis / faster-whisper / Kokoro largely match live npm/PyPI as of this check, and the spine’s “verified 2026-10-08” claim is credible for those versions. Remaining issues are incomplete constraint reality-checks (Kokoro Python upper bound), incomplete greenfield starter/profile defaults vs live Harness, and a slightly stale Harness voice-gap claim (experimental ASR bundle now ships). No fabricated or dead technologies found.

---

## Check matrix (Stack + related claims)

| Claim in spine | Live check (2026-10-08) | Status |
| --- | --- | --- |
| `@deepseek-ai/dsh` **0.2.0-rc.2** | npm `latest` = `0.2.0-rc.2`; also published `0.2.1-alpha.1`. Package exists; preview + breaking-changes disclaimer matches official README. | **OK** (pin + “re-pin at implement” appropriate) |
| `@deepseek-ai/cordis` **4.0.4** | npm latest stable = `4.0.4`; `4.0.5-alpha.1` exists. `dsh@0.2.0-rc.2` depends on `@deepseek-ai/cordis` `~4.0.4`. | **OK** |
| Plugin language **TypeScript** (Harness Cordis plugin) | Official first-plugin docs: TS module exporting `apply(ctx)`, `import type { Context } from '@deepseek-ai/cordis'`. | **OK** |
| `cordis.yml` overlay / registration | Live: tutorial uses `cordis.yml` as `--patch` overlay; profiles use **`cordis.patch.yml`**; installable plugins land via profile `dsh.profile.bundles` / `dsh plugin`. | **Partial** — see F2 |
| DeepSeek LLM via Harness + **`DEEPSEEK_API_KEY`** | `dsh-llm-deepseek` default `apiKeyEnv` = `DEEPSEEK_API_KEY`; also UI → `$DSH_HOME/.credentials.yaml`. | **OK** |
| SpeechIn **faster-whisper 1.2.1** | PyPI latest = `1.2.1`; SYSTRAN/faster-whisper still live; `Requires-Python: >=3.9`. | **OK** |
| SpeechOut **Kokoro TTS 0.9.4** | PyPI `kokoro` (hexgrad) latest = `0.9.4`; not yanked. `Requires-Python: >=3.10,<3.13`. | **Version OK; constraint gap** — see F1 |
| Speech sidecar **Python 3.11+** | Conflicts with Kokoro’s `<3.13` ceiling; open-ended “3.11+” admits 3.13/3.14 which cannot install 0.9.4. | **Out of date / unchecked** — F1 |
| LearnerStore **SQLite 3** | SQLite 3.x family still current (local Python linked lib 3.46.1). No Node driver named. | **Family OK; adapter underspecified** — F4 |
| Operational envelope: desktop app or `dsh web` | Official: `npx @deepseek-ai/dsh web` → `:3080`; Desktop is a real carrier; CLI reserves `desktop` profile name. | **OK** |
| Developer preview / breaking changes | Official README: developer preview, compatibility-breaking changes expected. | **OK** |
| AD-5 “Harness-native voice gaps” | Host ships `@deepseek-ai/dsh-experimental-voice-input-bundle` (SenseVoice local ASR; no official TTS). Own ports still justified for FR-33/TTS/quality, but “gaps” claim is broader than current host. | **Stale framing** — F3 |
| Memlog: “verified via npm/PyPI 2026-10-08” | Independent re-check agrees on the four package pins. | **Credible** |

Technologies named in Deferred (wav2vec2 / MFA) were not Stack-bound; not scored as pin failures.

---

## Findings

### F1 — High — Sidecar Python floor/ceiling not reality-checked against Kokoro

**Spine:** “Speech sidecar (optional) | Python 3.11+” with SpeechOut = Kokoro **0.9.4**.

**Live:** `kokoro==0.9.4` declares `Requires-Python: >=3.10,<3.13`. On this runner (Python 3.14), `pip install kokoro==0.9.4` refuses the pin; only ≤0.7.16 is visible to that interpreter.

**Why it matters:** An implementer following “3.11+” can pick 3.13+ and fail cold-start for the seeded TTS adapter. The lower bound “3.11” is stricter than Kokoro’s 3.10 floor without stated reason; the missing upper bound is the real defect.

**Disposition:** Autofix candidate — change to `Python >=3.11,<3.13` (or `>=3.10,<3.13` if 3.10 is acceptable) and note that Kokoro 0.9.4 blocks 3.13+.

---

### F2 — High — Greenfield Harness starter / profile defaults not fully reconciled

**Spine leans on:** single installable `english-path` Cordis plugin bundle; Structural Seed root `cordis.yml` (“Harness overlay / plugin registration”); operational note of an `english-path` profile; `dsh web` / desktop.

**Live starter defaults (first-plugin + CLI README):**

1. **Local scratch path:** `scratch-plugin/src/*.ts` + overlay YAML with `- insert:` / **absolute** `name:` path; launch `pnpm dsh web --patch ./…/cordis.yml`.
2. **Profile patches:** user/profile layer is **`cordis.patch.yml`** under `$DSH_HOME/profiles/<name>/`, not a package-root `cordis.yml` as the durable install shape.
3. **Shipped profiles:** `web`, `headless`, `sdk`, `sdk-minimal`, `acp` auto-init; custom profiles via `--from-default-profile`; **`desktop` is reserved** for the Electron host.
4. **Out-of-tree install:** `dsh plugin --profile <name> …` installs into the profile’s `node_modules` and `dsh.profile.bundles` composition — distinct from a tutorial overlay file.

**Gap:** The Structural Seed reads like a product module tree (fine) but labels `cordis.yml` as if it were the canonical Harness registration artifact without distinguishing overlay vs profile patch vs installable bundle. The phrase “`english-path` profile” is plausible as a **custom** profile but was not pinned to the live create/boot pathway (`--from-default-profile` / which template / whether the bundle instead mounts into `web`/`desktop`).

**Disposition:** Discuss / light spine edit — add one sentence under Structural Seed or Stack clarifying: (a) installable package + profile bundle entry vs `--patch` overlay for dev, (b) custom profile creation command or “overlay on `web`/`desktop`”, (c) prefer naming `cordis.patch.yml` where the host expects it.

---

### F3 — Medium — AD-5 voice-gap rationale not re-checked against current Harness speech surface

**Spine AD-5 Prevents:** “coupling A0 quality bar to Harness-native voice gaps.”

**Live:** `dsh@0.2.0-rc.2` depends on `@deepseek-ai/dsh-experimental-voice-input-bundle` (same version line). That bundle provides local **SenseVoice** ASR (sherpa-onnx), mic capture, transcript insert; shipped profiles leave it disabled; it is **input-only** (no product TTS). Community plugins pair SenseVoice / faster-whisper with Kokoro or Edge TTS.

**Assessment:** Keeping **own SpeechIn/SpeechOut ports** still fits FR-33 (MOS/slowdown, phonics bar, swappable adapters, no cloud ASR/TTS). The absolute “Harness has voice gaps” framing was not updated against the experimental ASR service that now exists on the host.

**Disposition:** Autofix candidate (wording only) — acknowledge experimental host ASR; state own ports because FR-33 / TTS / adapter control, not because the host has zero speech surface.

---

### F4 — Low — SQLite “3” is a family label; Node adapter library unchosen

**Spine:** `LearnerStore adapter | SQLite 3 (snapshot + journal tables)`.

**Live:** SQLite 3.x remains the current major line. No brownfield driver exists in-repo. Common Node choices (`better-sqlite3`, `node:sqlite`, `sql.js`, etc.) were not named or web-checked.

**Assessment:** Acceptable SEED altitude if “SQLite 3” means storage format only and the driver is intentionally deferred. As a tech-verify finding: the pin was not confirmed as a concrete library version the way dsh/Cordis/whisper/kokoro were.

**Disposition:** Defer to implement / optional Stack note — “SQLite 3.x via TBD Node driver” so epics do not diverge on driver choice silently; or pin a driver after a short spike.

---

### F5 — Low — Newer alphas exist; evidence trail is in memlog only

- `dsh@0.2.1-alpha.1` and `cordis@4.0.5-alpha.1` exist ahead of the pinned RC/stable.
- Spine Stack line “SEED — verified 2026-10-08” matches memlog; the spine itself does not cite commands/URLs (fine for altitude, but this lens cannot see verification without re-running checks).

**Disposition:** Ignore / already covered by “re-pin at implement.” No spine change required unless the team wants a one-line “npm latest RC / stable as of date” footnote.

---

## What checked out (no finding)

- Cordis-as-Harness plugin framework (`@deepseek-ai/cordis`) exists and is the dsh peer/runtime dependency.
- TypeScript plugin authoring model matches current docs.
- `DEEPSEEK_API_KEY` is the live default credential env name for the DeepSeek LLM plugin (UI credentials path is complementary, not contradictory).
- faster-whisper **1.2.1** and kokoro **0.9.4** exist, are current latest releases, and fit local SpeechIn/SpeechOut adapter roles.
- Local/desktop + `dsh web` operational envelope matches current product surface.
- Preview instability disclaimer is accurate.
- No brownfield contradiction (greenfield repo).

---

## Suggested autofixes (for Finalize parent)

1. Tighten sidecar Python to **`>=3.11,<3.13`** (align with Kokoro 0.9.4).
2. Clarify Structural Seed registration: overlay `cordis.yml` for local `--patch` vs profile `cordis.patch.yml` / `dsh plugin` install; state how `english-path` relates to shipped `web`/`desktop` profiles.
3. Soften AD-5 voice-gap wording to reflect experimental SenseVoice input bundle while keeping own Speech ports.

---

## Sources (this review)

- `npm view @deepseek-ai/dsh@0.2.0-rc.2` / version list; dependency on `@deepseek-ai/cordis ~4.0.4` and `dsh-experimental-voice-input-bundle`
- `npm view @deepseek-ai/cordis` versions (`4.0.4` latest stable)
- PyPI `faster-whisper` / `kokoro` JSON + `pip install kokoro==0.9.4` dry-run on Python 3.14
- https://deepseek-harness.github.io/deepseek-harness/en/develop/basic/
- https://deepseek-harness.github.io/deepseek-harness/en/guide/providers
- https://raw.githubusercontent.com/deepseek-ai/deepseek-harness/master/README.md
- `@deepseek-ai/dsh` packaged README (profiles, `dsh web`, `dsh plugin`)
- https://pypi.org/project/kokoro/0.9.4/ (`Requires-Python: <3.13,>=3.10`)
- Spine `.memlog.md` version verification note
