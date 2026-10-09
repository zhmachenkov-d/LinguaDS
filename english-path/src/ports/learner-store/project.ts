import type {
  EvidenceItem,
  EvidenceProposePayload,
  JournalEvent,
  NextStepPlan,
  PathPosition,
  PlanSetPayload,
  ProfileSnapshot,
  SessionStartPayload,
} from './types.js'

const EMPTY_PATH: PathPosition = {
  level: '',
  topic_id: '',
  lesson_id: '',
}

const EMPTY_PLAN: NextStepPlan = {
  level: '',
  topic: '',
  session_goal: '',
  available: [],
  recommended: [],
}

function emptySnapshot(learnerId: string, at: string): ProfileSnapshot {
  return {
    learner_id: learnerId,
    prefs: {},
    path: { ...EMPTY_PATH },
    plan: {
      ...EMPTY_PLAN,
      available: [],
      recommended: [],
    },
    evidence: [],
    voice_thresholds: {},
    updated_at: at,
  }
}

function asLessonRefs(value: unknown): NextStepPlan['available'] {
  if (!Array.isArray(value)) return []
  return value
    .filter((item): item is { lesson_id: string; label: string } => {
      return (
        !!item &&
        typeof item === 'object' &&
        typeof (item as { lesson_id?: unknown }).lesson_id === 'string' &&
        typeof (item as { label?: unknown }).label === 'string'
      )
    })
    .map((item) => ({ lesson_id: item.lesson_id, label: item.label }))
}

function mergeEvidence(existing: EvidenceItem[], deltas: EvidenceItem[]): EvidenceItem[] {
  const byId = new Map(existing.map((item) => [item.id, item]))
  for (const delta of deltas) {
    byId.set(delta.id, { ...byId.get(delta.id), ...delta })
  }
  return [...byId.values()]
}

/** Rebuild ProfileSnapshot from ordered journal events (AD-4 / AD-12). */
export function projectSnapshot(learnerId: string, events: JournalEvent[]): ProfileSnapshot {
  let snapshot = emptySnapshot(learnerId, new Date(0).toISOString())

  for (const event of events) {
    snapshot = applyEvent(snapshot, event)
  }

  return snapshot
}

function applyEvent(snapshot: ProfileSnapshot, event: JournalEvent): ProfileSnapshot {
  const next: ProfileSnapshot = {
    ...snapshot,
    prefs: { ...snapshot.prefs },
    path: { ...snapshot.path },
    plan: {
      ...snapshot.plan,
      available: [...snapshot.plan.available],
      recommended: [...snapshot.plan.recommended],
    },
    evidence: [...snapshot.evidence],
    voice_thresholds: { ...snapshot.voice_thresholds },
    updated_at: event.at,
  }

  switch (event.type) {
    case 'session_start': {
      const payload = event.payload as unknown as SessionStartPayload
      if (payload.learner_id) {
        next.learner_id = payload.learner_id
      }
      break
    }
    case 'prefs_set': {
      const patch = (event.payload.prefs_patch ?? {}) as Record<string, unknown>
      next.prefs = { ...next.prefs, ...patch }
      if (patch.voice_thresholds && typeof patch.voice_thresholds === 'object') {
        next.voice_thresholds = {
          ...next.voice_thresholds,
          ...(patch.voice_thresholds as Record<string, unknown>),
        }
      }
      break
    }
    case 'plan_set': {
      const payload = event.payload as unknown as PlanSetPayload
      next.plan = {
        level: payload.level,
        topic: payload.topic,
        session_goal: payload.session_goal,
        available: asLessonRefs(payload.available),
        recommended: asLessonRefs(payload.recommended),
      }
      next.path = {
        level: payload.level,
        topic_id: payload.topic_id ?? payload.topic,
        lesson_id:
          payload.lesson_id ??
          payload.recommended?.[0]?.lesson_id ??
          payload.available?.[0]?.lesson_id ??
          '',
      }
      break
    }
    case 'evidence_propose': {
      const payload = event.payload as unknown as EvidenceProposePayload
      const deltas = Array.isArray(payload.deltas) ? payload.deltas : []
      next.evidence = mergeEvidence(next.evidence, deltas)
      break
    }
    default:
      break
  }

  return next
}
