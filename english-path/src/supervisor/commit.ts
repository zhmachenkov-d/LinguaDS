import type {
  EvidenceItem,
  JournalEventType,
  LearnerSession,
  PlanSetPayload,
  SessionStartPayload,
} from '../ports/learner-store/index.js'

/**
 * Thin supervisor commit helper — sole writer path into LearnerStore (AD-1 / AD-4).
 * Coaches must not call LearnerStore directly.
 */
export function commitJournal(
  session: LearnerSession,
  type: JournalEventType,
  payload: Record<string, unknown>,
  at?: string,
) {
  return session.append(type, payload, at)
}

export function commitSessionStart(session: LearnerSession, payload: SessionStartPayload) {
  return commitJournal(session, 'session_start', { ...payload })
}

export function commitPlanSet(session: LearnerSession, payload: PlanSetPayload) {
  return commitJournal(session, 'plan_set', { ...payload })
}

export function commitEvidencePropose(session: LearnerSession, deltas: EvidenceItem[]) {
  return commitJournal(session, 'evidence_propose', { deltas })
}
