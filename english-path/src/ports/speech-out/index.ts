import { SidecarClient, type SidecarClientOptions, type SpeechBandResult } from '../shared/sidecar-client.js'

export type { SpeechBandResult }

export interface SpeechOutPort {
  /** Stub TTS scoring — returns score / accept band / fail only. */
  score(input?: { text?: string; voice?: string }): Promise<SpeechBandResult>
  dispose(): Promise<void>
}

export function createSpeechOut(options: SidecarClientOptions = {}): SpeechOutPort {
  const client = new SidecarClient(options)
  return {
    score(input = {}) {
      return client.request('speech_out', input)
    },
    dispose() {
      return client.dispose()
    },
  }
}
