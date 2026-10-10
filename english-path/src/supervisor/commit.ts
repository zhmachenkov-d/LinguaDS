import type {
  AttemptPayload,
  EvidenceProposePayload,
  FinalePayload,
  HandoffGrantPayload,
  HandoffReclaimPayload,
  JournalEventType,
  LearnerSession,
  LevelAdvancePayload,
  PhasePayload,
  PlanSetPayload,
  PrefsSetPayload,
  SessionEndPayload,
  SessionStartPayload,
} from "../ports/learner-store/index.js";

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
  return session.append(type, payload, at);
}

export function commitSessionStart(
  session: LearnerSession,
  payload: SessionStartPayload,
  at?: string,
) {
  return commitJournal(session, "session_start", { ...payload }, at);
}

export function commitPrefsSet(
  session: LearnerSession,
  payload: PrefsSetPayload,
  at?: string,
) {
  return commitJournal(session, "prefs_set", { ...payload }, at);
}

export function commitPhase(
  session: LearnerSession,
  payload: PhasePayload,
  at?: string,
) {
  return commitJournal(session, "phase", { ...payload }, at);
}

export function commitHandoffGrant(
  session: LearnerSession,
  payload: HandoffGrantPayload,
  at?: string,
) {
  return commitJournal(session, "handoff_grant", { ...payload }, at);
}

export function commitHandoffReclaim(
  session: LearnerSession,
  payload: HandoffReclaimPayload,
  at?: string,
) {
  return commitJournal(session, "handoff_reclaim", { ...payload }, at);
}

export function commitAttempt(
  session: LearnerSession,
  payload: AttemptPayload,
  at?: string,
) {
  return commitJournal(session, "attempt", { ...payload }, at);
}

export function commitPlanSet(
  session: LearnerSession,
  payload: PlanSetPayload,
  at?: string,
) {
  return commitJournal(session, "plan_set", { ...payload }, at);
}

export function commitEvidencePropose(
  session: LearnerSession,
  payload: EvidenceProposePayload,
  at?: string,
) {
  return commitJournal(session, "evidence_propose", { ...payload }, at);
}

export function commitFinale(
  session: LearnerSession,
  payload: FinalePayload,
  at?: string,
) {
  return commitJournal(session, "finale", { ...payload }, at);
}

export function commitLevelAdvance(
  session: LearnerSession,
  payload: LevelAdvancePayload,
  at?: string,
) {
  return commitJournal(session, "level_advance", { ...payload }, at);
}

export function commitSessionEnd(
  session: LearnerSession,
  payload: SessionEndPayload,
  at?: string,
) {
  return commitJournal(session, "session_end", { ...payload }, at);
}
