# Tech-verify review — Architecture Spine (English Path)

**Lens:** Verify every committed decision was web-researched or reality-checked rather than asserted from training data: current library/framework versions, that each named technology still exists and fits, and — greenfield — the live defaults of any starter it leans on. Flag anything that could be out of date and wasn't confirmed against the web, the existing project, or the current starter.

**Spine:** `architecture-english-path.md`  
**Memlog:** `.memlog.md`  
**Checked:** 2026-10-08 (independent re-check against current spine text)  
**Project posture:** greenfield (BMAD artifacts only; no app code to ratify)  
**Evidence used:** npm registry (`@deepseek-ai/dsh`, `@deepseek-ai/cordis`, `@deepseek-ai/dsh-experimental-voice-input-bundle`, `better-sqlite3`, related LLM packages), PyPI (`faster-whisper`, `kokoro`), DeepSeek Harness docs (first-plugin, package-and-install / publish, providers), upstream `package.json` engines, memlog version note

---

## Verdict

**pass-with-findings**

Named Stack pins (`dsh` 0.2.0-rc.2, Cordis 4.0.4, faster-whisper 1.2.1, Kokoro 0.9.4) and the sidecar Python bound (`>=3.10,<3.13`) match live npm/PyPI as of this check. Prior tech-verify gaps on Python ceiling, SenseVoice acknowledgment, and naming a Node SQLite driver are largely closed in the current spine. Remaining issues are greenfield starter/profile install defaults still incompletely reconciled (bundle `cordis.patch.yml` vs absolute-path `--patch` overlay), and missing host **Node** engine bounds that both Harness and `better-sqlite3` require.

---

## Check matrix (Stack + related claims)

| Claim in spine | Live check (2026-10-08) | Status |
| --- | --- | --- |
| `@deepseek-ai/dsh` **0.2.0-rc.2** | npm `latest` / `next` = `0.2.0-rc.2`; `alpha` = `0.2.1-alpha.1`. Package exists; README developer-preview + breaking-changes disclaimer matches. | **OK** (pin + “re-pin at implement” appropriate) |
| `@deepseek-ai/cordis` **4.0.4** | npm `latest` = `4.0.4`; `4.0.5-alpha.1` exists under tag `dsh-0-2-1-alpha-1`. `dsh@0.2.0-rc.2` depends on `@deepseek-ai/cordis` `~4.0.4`. | **OK** |
| Plugin language **TypeScript** (Harness Cordis plugin) | Official first-plugin docs: TS module exporting `apply(ctx)`, `import type { Context } from '@deepseek-ai/cordis'`. | **OK** |
| Structural Seed `cordis.patch.yml` (“Harness overlay / absolute plugin paths”) | Installable **bundle** ships `cordis.patch.yml` + `package.json` `dsh.bundle.patch`; rows use **package name**, not absolute paths. Local scratch tutorial uses `--patch` overlay (often `cordis.yml`) with **absolute** `name:` paths. Profile layer also has its own `cordis.patch.yml` after bundles. | **Partial** — see F1 |
| DeepSeek LLM / API + **`DEEPSEEK_API_KEY`** | `@deepseek-ai/dsh-llm-deepseek` default `apiKeyEnv` = `DEEPSEEK_API_KEY`; UI credentials at `$DSH_HOME/.credentials.yaml` complementary. | **OK** |
| SpeechIn **faster-whisper 1.2.1** | PyPI latest = `1.2.1`; not yanked; `Requires-Python: >=3.9`. | **OK** |
| SpeechOut **Kokoro TTS 0.9.4** | PyPI `kokoro` (hexgrad) latest = `0.9.4`; not yanked; `Requires-Python: >=3.10,<3.13`. | **OK** |
| Speech sidecar **Python `>=3.10,<3.13`** | Matches Kokoro 0.9.4 declared bound exactly. | **OK** (prior open-ended “3.11+” defect closed) |
| LearnerStore **SQLite 3 via `better-sqlite3` (pin at implement)** | `better-sqlite3` latest = **13.0.3**; `engines.node: >=22`. SQLite 3.x family current. Driver named; version intentionally deferred. | **OK with note** — see F3 |
| Operational envelope: desktop / `dsh web` | Official: `npx @deepseek-ai/dsh web` → `:3080`; Desktop app is a real v0.2 carrier; `desktop` profile name reserved for Electron host. | **OK** |
| Developer preview / breaking changes | Official README: developer preview, compatibility-breaking changes expected. | **OK** |
| AD-5 SenseVoice as SpeechIn adapter candidate | `dsh@0.2.0-rc.2` depends on `@deepseek-ai/dsh-experimental-voice-input-bundle@0.2.0-rc.2` (“local SenseVoice”; input-only; no product TTS). Own Speech ports still justified for FR-33 / TTS / adapter control. | **OK** (prior “voice gaps” framing updated) |
| Host **Node** engines | Upstream harness root `package.json`: `engines.node = ^22.19.0 \|\| >=24.0.0`. Published npm `dsh` has no `engines` field. Not listed in Stack. | **Unchecked in spine** — see F2 |
| Memlog: “verified via npm/PyPI 2026-10-08” | Independent re-check agrees on the four package pins + Python bound. | **Credible** |

Technologies named only in Deferred (wav2vec2 / MFA) were not Stack-bound; not scored as pin failures. Architecture decisions AD-1…AD-11 that are ownership/session contracts (not library pins) were not re-litigated under this lens beyond “named tech still exists and fits.”

---

## Findings

### F1 — Medium — Bundle `cordis.patch.yml` still described as absolute-path “overlay”

**Spine Structural Seed:**

```text
cordis.patch.yml                 # Harness overlay (absolute plugin paths per dsh docs)
```

**Live Harness defaults (package-and-install + first-plugin tutorials):**

1. **Installable bundle:** package root has `package.json` with `dsh.bundle.patch` → `./cordis.patch.yml`, plus plugin entry; patch rows use **`name: <package-name>`** (e.g. `dsh-hello-plugin`), not absolute filesystem paths.
2. **Local scratch / `--patch` overlay:** first-plugin tutorial uses a separate overlay file (commonly `cordis.yml`) with **absolute** `name:` paths and `pnpm dsh web --patch ./…`.
3. **Profile layer:** `$DSH_HOME/profiles/<name>/cordis.patch.yml` is the **user** patch applied *after* every bundle layer — distinct from the bundle’s shipped patch.
4. **Install path:** `dsh plugin --profile <name> add …` appends to `dsh.profile.bundles` (after `@deepseek-ai/dsh-base`); custom profiles via `--from-default-profile`; shipped surfaces include `web`, `headless`, `sdk`, `sdk-minimal`, `acp`; **`desktop` is reserved**.

**Gap:** Naming the file `cordis.patch.yml` is now aligned with the installable-bundle shape (good vs earlier `cordis.yml`-only seed), but the comment still treats it as a Harness **overlay with absolute paths**. That merges three live artifacts (bundle patch / profile patch / `--patch` overlay) and omits the required `dsh.bundle` / `dsh plugin` / default-profile pathway implementers will hit first on greenfield.

**Disposition:** Light spine edit — clarify: (a) bundle `cordis.patch.yml` + `package.json` `dsh.bundle`; (b) absolute-path `--patch` overlay for local scratch only; (c) how `english-path` mounts into `web`/`desktop` or a custom profile (`dsh plugin` / `--from-default-profile`).

---

### F2 — Medium — Host Node engine bounds missing from Stack (greenfield)

**Spine Stack** pins dsh/Cordis/speech/Python/SQLite driver family but does not name a Node version.

**Live:**

- Harness source root (`deepseek-ai/deepseek-harness` `package.json`, currently line `0.2.1-alpha.1`): `engines.node = ^22.19.0 || >=24.0.0`.
- Published `@deepseek-ai/dsh` has **no** `engines` field (installs on older Node without npm warning; failures appear at runtime — documented in community install notes).
- Chosen seed driver `better-sqlite3@13.x` declares `engines.node: >=22`.

**Why it matters:** On greenfield, an implementer on Node 20 can satisfy every named Stack pin string and still fail Harness boot and native SQLite builds. This is a live-default / reality-check gap for the starter the spine leans on, not a wrong package name.

**Disposition:** Autofix candidate — add Stack row e.g. `Node.js | ^22.19.0 \|\| >=24.0.0 (Harness engines; better-sqlite3 needs >=22)` with “re-check at implement.”

---

### F3 — Low — `better-sqlite3` named but unpinned; native-build fitness not stated

**Spine:** `SQLite 3 via better-sqlite3 (pin at implement)`.

**Live:** Latest npm = `13.0.3`, Node `>=22`, native addon (`node-addon-api`). Fits local LearnerStore; no brownfield driver conflict.

**Assessment:** Acceptable SEED altitude given explicit deferral. Under this lens the version was not confirmed the way whisper/kokoro were; native compile / Electron-vs-`dsh web` ABI is the residual risk, not package death.

**Disposition:** Defer to implement (already signaled) — optionally note “native addon; pin after first successful desktop/`dsh web` smoke.”

---

### F4 — Low — Kokoro runtime extras (torch / espeak-ng) not in Stack

**Spine** pins `kokoro` 0.9.4 and Python bounds correctly.

**Live PyPI / project docs:** `kokoro` 0.9.4 depends on `torch`, `transformers`, `misaki[en]`, etc.; official usage also installs **espeak-ng** for English OOD fallback. Version pin is current; operational fitness for FR-33 Self-check on constrained desktops was not reality-checked beyond the PyPI package existing.

**Disposition:** Ignore for pin accuracy / optional sidecar README note at implement — not a false version claim.

---

### F5 — Low — Newer alphas exist ahead of pinned RC/stable

- `dsh@0.2.1-alpha.1` and `cordis@4.0.5-alpha.1` exist ahead of pinned `0.2.0-rc.2` / `4.0.4`.
- Spine “SEED — verified 2026-10-08” + “re-pin at implement” already covers churn.

**Disposition:** Ignore / already covered. No spine change required.

---

## Closed since prior tech-verify (for gate continuity)

| Prior finding | Current spine | This check |
| --- | --- | --- |
| Sidecar Python `3.11+` vs Kokoro `<3.13` | Now `>=3.10,<3.13` | **Closed** |
| AD-5 “Harness-native voice gaps” without SenseVoice | AD-5 names experimental SenseVoice as SpeechIn adapter candidate | **Closed** (wording fit) |
| SQLite 3 family only; no Node driver | Names `better-sqlite3` (pin at implement) | **Mostly closed** → residual F3 |
| Structural Seed `cordis.yml` as sole registration | Renamed to `cordis.patch.yml` | **Partially closed** → residual F1 comment/pathway |

---

## What checked out (no finding)

- Cordis is the live Harness plugin framework; `dsh@0.2.0-rc.2` depends on `@deepseek-ai/cordis ~4.0.4`.
- TypeScript `apply(ctx)` authoring model matches current docs.
- `DEEPSEEK_API_KEY` is the live default credential env name for the DeepSeek LLM plugin.
- faster-whisper **1.2.1** and kokoro **0.9.4** exist, are current latest releases, and fit local SpeechIn/SpeechOut adapter roles behind ports.
- Python sidecar bound matches Kokoro’s declared `Requires-Python`.
- Local/desktop + `dsh web` operational envelope matches current product surface.
- Preview instability disclaimer is accurate.
- Own Speech ports remain justified: host experimental ASR is input-only; FR-33 TTS/MOS/slowdown and Self-check locality stay english-path responsibilities.
- No brownfield contradiction (greenfield repo).
- Memlog verification claim is consistent with independent registry checks.

---

## Suggested autofixes (for Finalize parent)

1. Fix Structural Seed comment + one install sentence: bundle `cordis.patch.yml` + `dsh.bundle` / package-name rows vs absolute-path `--patch` overlay; state `dsh plugin` into `web`/`desktop` or custom profile.
2. Add Stack row for **Node** `^22.19.0 || >=24.0.0` (Harness engines; aligns with `better-sqlite3`).
3. Optional: note `better-sqlite3` native-addon / pin-after-smoke at implement (already deferred).

---

## Sources (this review)

- `npm view @deepseek-ai/dsh` / `@deepseek-ai/dsh@0.2.0-rc.2` (dist-tags, versions, dependencies including voice-input bundle + cordis `~4.0.4`)
- `npm view @deepseek-ai/cordis` (latest `4.0.4`)
- `npm view @deepseek-ai/dsh-experimental-voice-input-bundle@0.2.0-rc.2`
- `npm view better-sqlite3` (latest `13.0.3`, `engines.node >=22`)
- PyPI JSON: `faster-whisper` / `faster-whisper/1.2.1`, `kokoro` / `kokoro/0.9.4` (`Requires-Python: >=3.10,<3.13`)
- https://deepseek-harness.github.io/deepseek-harness/en/develop/basic/ (first plugin / absolute-path `--patch`)
- https://deepseek-harness.github.io/deepseek-harness/en/develop/basic/publish (bundle `cordis.patch.yml`, `dsh.bundle`, `dsh plugin`, layer order)
- https://github.com/deepseek-ai/deepseek-harness/blob/master/packages/llm/llm-deepseek/README.md (`DEEPSEEK_API_KEY`)
- https://raw.githubusercontent.com/deepseek-ai/deepseek-harness/master/package.json (`engines.node`)
- https://pypi.org/project/kokoro/0.9.4/
- Spine `.memlog.md` version verification note
