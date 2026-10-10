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

/** AD-10 closed wire shape for gate evaluation on level_advance. */
export interface GateEval {
  gate_id: string
  critical: boolean
  met: boolean
  evidence_ids: string[]
}

export type PhaseId = 'orient' | 'plan' | 'block' | 'handoff' | 'finale' | 'level_overlay'

export type LevelAdvanceMode = 'soft' | 'conditional' | 'blocked'

export interface PrefsSetPayload {
  prefs_patch: Record<string, unknown>
}

export interface PhasePayload {
  phase_id: PhaseId
}

export interface HandoffGrantPayload {
  coach_id: string
  block_id?: string
  reason?: string
}

export interface HandoffReclaimPayload {
  coach_id: string
  block_id?: string
  reason?: string
}

export interface AttemptPayload {
  attempt_id: string
  evidence_key?: string
  band?: string
  score?: number
  artifact_ref?: string
}

export interface FinalePayload {
  descriptors: string[]
  next_step?: string
  artifact_refs?: string[]
}

export interface LevelAdvancePayload {
  from_level: string
  to_level: string
  gate_evals: GateEval[]
  mode: LevelAdvanceMode
}

export interface SessionEndPayload {
  session_id: string
  reason: string
}
