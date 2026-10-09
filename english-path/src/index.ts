import type { Context } from '@deepseek-ai/cordis'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createLearnerStore, type LearnerStore, type LearnerStoreOptions } from './ports/learner-store/index.js'
import { createSpeechIn, type SpeechInPort } from './ports/speech-in/index.js'
import { createSpeechOut, type SpeechOutPort } from './ports/speech-out/index.js'
import { SidecarClient, type SidecarClientOptions } from './ports/shared/sidecar-client.js'
import * as commit from './supervisor/commit.js'

export const name = 'english-path'

export interface EnglishPathConfig {
  dataDir?: string
  sidecar?: SidecarClientOptions
}

export interface EnglishPathApi {
  learnerStore: LearnerStore
  speechIn: SpeechInPort
  speechOut: SpeechOutPort
  commit: typeof commit
  dispose(): Promise<void>
}

const PACKAGE_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

export function createEnglishPath(config: EnglishPathConfig = {}): EnglishPathApi {
  const dataDir = config.dataDir ?? path.join(PACKAGE_ROOT, 'persistence', 'learners')
  const learnerStore = createLearnerStore({ dataDir } satisfies LearnerStoreOptions)
  const sidecar = new SidecarClient(config.sidecar)
  const speechIn: SpeechInPort = {
    score: (input) => sidecar.request('speech_in', input ?? {}),
    dispose: () => sidecar.dispose(),
  }
  const speechOut: SpeechOutPort = {
    score: (input) => sidecar.request('speech_out', input ?? {}),
    dispose: () => sidecar.dispose(),
  }

  return {
    learnerStore,
    speechIn,
    speechOut,
    commit,
    async dispose() {
      learnerStore.closeAll()
      await sidecar.dispose()
    },
  }
}

declare module '@deepseek-ai/cordis' {
  interface Context {
    englishPath: EnglishPathApi
  }
}

/** Cordis plugin entry — Harness loads this via cordis.patch.yml package-name row. */
export function apply(ctx: Context, config: EnglishPathConfig = {}): void {
  const api = createEnglishPath(config)
  ctx.provide('englishPath', api)
  ctx.effect(() => {
    return () => {
      void api.dispose()
    }
  })
}

export { createLearnerStore, DEFAULT_DATA_DIR } from './ports/learner-store/index.js'
export { createSpeechIn } from './ports/speech-in/index.js'
export { createSpeechOut } from './ports/speech-out/index.js'
export { SidecarClient } from './ports/shared/sidecar-client.js'
export {
  commitAttempt,
  commitEvidencePropose,
  commitFinale,
  commitHandoffGrant,
  commitHandoffReclaim,
  commitJournal,
  commitLevelAdvance,
  commitPhase,
  commitPlanSet,
  commitPrefsSet,
  commitSessionEnd,
  commitSessionStart,
} from './supervisor/commit.js'
export type {
  AttemptPayload,
  EvidenceItem,
  FinalePayload,
  GateEval,
  HandoffGrantPayload,
  HandoffReclaimPayload,
  JournalEvent,
  LevelAdvanceMode,
  LevelAdvancePayload,
  NextStepPlan,
  PathPosition,
  PhaseId,
  PhasePayload,
  PrefsSetPayload,
  ProfileSnapshot,
  SessionEndPayload,
} from './ports/learner-store/types.js'
