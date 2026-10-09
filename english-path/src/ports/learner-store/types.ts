/** AD-12 shared contracts — field identities must stay exact. */

export type EvidenceStatus = 'confirmed' | 'unstable' | 'goes_into_review'

export type EvidenceKind =
  | 'phonics_contrast'
  | 'letter'
  | 'grammar'
  | 'vocab'
  | 'speaking'
  | 'interview_block'
  | 'cefr_dimension'

export interface LessonRef {
  lesson_id: string
  label: string
}

export interface PathPosition {
  level: string
  topic_id: string
  lesson_id: string
}

export interface NextStepPlan {
  level: string
  topic: string
  session_goal: string
  /** Prefer LessonRef arrays (AD-12 plural convention). */
  available: LessonRef[]
  recommended: LessonRef[]
}

export interface EvidenceItem {
  id: string
  kind: EvidenceKind
  status: EvidenceStatus
  updated_at: string
  payload?: Record<string, unknown>
}

export interface ProfileSnapshot {
  learner_id: string
  prefs: Record<string, unknown>
  path: PathPosition
  plan: NextStepPlan
  evidence: EvidenceItem[]
  voice_thresholds: Record<string, unknown>
  updated_at: string
}

export type JournalEventType =
  | 'session_start'
  | 'prefs_set'
  | 'phase'
  | 'handoff_grant'
  | 'handoff_reclaim'
  | 'attempt'
  | 'evidence_propose'
  | 'plan_set'
  | 'finale'
  | 'level_advance'
  | 'session_end'

export interface JournalEvent {
  type: JournalEventType
  at: string
  payload: Record<string, unknown>
}

export interface SessionStartPayload {
  session_id: string
  learner_id: string
  started_at: string
}

export interface PlanSetPayload {
  level: string
  topic: string
  session_goal: string
  available: LessonRef[]
  recommended: LessonRef[]
  topic_id?: string
  lesson_id?: string
}

export interface EvidenceProposePayload {
  deltas: EvidenceItem[]
}
