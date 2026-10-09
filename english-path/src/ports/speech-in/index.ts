import { SidecarClient, type SidecarClientOptions, type SpeechBandResult } from '../shared/sidecar-client.js'

export type { SpeechBandResult }

export interface SpeechInPort {
  /** Stub STT scoring — returns score / accept band / fail only. */
  score(input?: { audio_ref?: string; text?: string }): Promise<SpeechBandResult>
  dispose(): Promise<void>
}

export function createSpeechIn(options: SidecarClientOptions = {}): SpeechInPort {
  const client = new SidecarClient(options)
  return {
    score(input = {}) {
      return client.request('speech_in', input)
    },
    dispose() {
      return client.dispose()
    },
  }
}
