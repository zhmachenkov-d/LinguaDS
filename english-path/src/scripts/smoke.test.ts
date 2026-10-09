import assert from 'node:assert/strict'
import { mkdtempSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { after, describe, it } from 'node:test'
import { createEnglishPath } from '../index.js'
import { createLearnerStore } from '../ports/learner-store/index.js'
import { createSpeechIn } from '../ports/speech-in/index.js'
import { createSpeechOut } from '../ports/speech-out/index.js'
import {
  commitAttempt,
  commitEvidencePropose,
  commitFinale,
  commitHandoffGrant,
  commitHandoffReclaim,
  commitLevelAdvance,
  commitPhase,
  commitPlanSet,
  commitPrefsSet,
  commitSessionEnd,
  commitSessionStart,
} from '../supervisor/commit.js'

const tempRoots: string[] = []

function tempDir(prefix: string): string {
  const dir = mkdtempSync(path.join(tmpdir(), prefix))
  tempRoots.push(dir)
  return dir
}

after(() => {
  for (const dir of tempRoots) {
    try {
      rmSync(dir, { recursive: true, force: true })
    } catch {
      // best-effort cleanup
    }
  }
})

describe('I/O matrix: journal happy path', () => {
  it('projects PathPosition, NextStepPlan, ProfileSnapshot, EvidenceItem[]', () => {
    const dataDir = tempDir('ep-journal-')
    const store = createLearnerStore({ dataDir })
    const session = store.open('alice')
    const startedAt = '2026-10-09T08:00:00.000Z'

    session.append('session_start', {
      session_id: 'sess-1',
      learner_id: 'alice',
      started_at: startedAt,
    }, startedAt)

    session.append('plan_set', {
      level: 'A0',
      topic: 'letters',
      topic_id: 'letters',
      lesson_id: 'a0-letters-1',
      session_goal: 'hear and say letter sounds',
      available: [
        { lesson_id: 'a0-letters-1', label: 'Letters 1' },
        { lesson_id: 'a0-letters-2', label: 'Letters 2' },
      ],
      recommended: [{ lesson_id: 'a0-letters-1', label: 'Letters 1' }],
    }, '2026-10-09T08:00:01.000Z')

    session.append('evidence_propose', {
      deltas: [
        {
          id: 'phonics.a_vs_e',
          kind: 'phonics_contrast',
          status: 'unstable',
          updated_at: '2026-10-09T08:00:02.000Z',
        },
      ],
    }, '2026-10-09T08:00:02.000Z')

    const snapshot = session.getSnapshot()
    assert.equal(snapshot.learner_id, 'alice')
    assert.deepEqual(snapshot.path, {
      level: 'A0',
      topic_id: 'letters',
      lesson_id: 'a0-letters-1',
    })
    assert.equal(snapshot.plan.level, 'A0')
    assert.equal(snapshot.plan.topic, 'letters')
    assert.equal(snapshot.plan.session_goal, 'hear and say letter sounds')
    assert.equal(snapshot.plan.available.length, 2)
    assert.equal(snapshot.plan.recommended[0]?.lesson_id, 'a0-letters-1')
    assert.equal(snapshot.evidence.length, 1)
    assert.equal(snapshot.evidence[0]?.id, 'phonics.a_vs_e')
    assert.equal(snapshot.evidence[0]?.status, 'unstable')
    assert.equal(session.schemaVersion(), 1)

    store.closeAll()
  })
})

describe('I/O matrix: missing learner DB', () => {
  it('creates per-learner SQLite under persistence path with schema_version', () => {
    const dataDir = tempDir('ep-missing-db-')
    const store = createLearnerStore({ dataDir })
    const session = store.open('bob')
    assert.equal(session.schemaVersion(), 1)
    assert.ok(statSync(session.dbPath).isFile())
    store.closeAll()
  })

  it('fails closed with a clear error when path is unwritable', () => {
    const root = tempDir('ep-readonly-')
    const blocker = path.join(root, 'not-a-dir')
    writeFileSync(blocker, 'x')
    const store = createLearnerStore({ dataDir: blocker })
    assert.throws(() => store.open('carol'), /not writable|ENOTDIR|Failed to open/i)
  })
})

describe('I/O matrix: speech stub round-trip', () => {
  it('SpeechIn and SpeechOut return score, band, fail', async () => {
    const api = createEnglishPath({
      dataDir: tempDir('ep-speech-'),
    })
    try {
      const speechIn = await api.speechIn.score({ text: 'cat' })
      const speechOut = await api.speechOut.score({ text: 'cat' })
      assert.equal(typeof speechIn.score, 'number')
      assert.equal(typeof speechIn.band, 'string')
      assert.equal(typeof speechIn.fail, 'boolean')
      assert.equal(speechIn.fail, false)
      assert.equal(typeof speechOut.score, 'number')
      assert.equal(typeof speechOut.band, 'string')
      assert.equal(typeof speechOut.fail, 'boolean')
      assert.equal(speechOut.fail, false)
    } finally {
      await api.dispose()
    }
  })

  it('speech path does not write learner SQLite', async () => {
    const dataDir = tempDir('ep-speech-nosql-')
    const api = createEnglishPath({ dataDir })
    try {
      await api.speechIn.score({ text: 'hi' })
      await api.speechOut.score({ text: 'hi' })
      // No LearnerStore.open → no sqlite files created under dataDir.
      let entries: string[] = []
      try {
        entries = readdirSync(dataDir)
      } catch {
        entries = []
      }
      assert.deepEqual(entries, [])
    } finally {
      await api.dispose()
    }
  })
})

describe('I/O matrix: sidecar down soft-fail', () => {
  it('ports report fail flag and do not throw', async () => {
    const speechIn = createSpeechIn({ forceDown: true })
    const speechOut = createSpeechOut({ forceDown: true })
    const inResult = await speechIn.score({ text: 'x' })
    const outResult = await speechOut.score({ text: 'x' })
    assert.equal(inResult.fail, true)
    assert.equal(outResult.fail, true)
    assert.equal(inResult.band, 'fail')
    assert.equal(outResult.band, 'fail')
    await speechIn.dispose()
    await speechOut.dispose()
  })
})

function baselinePlan() {
  return {
    level: 'A0',
    topic: 'letters',
    topic_id: 'letters',
    lesson_id: 'a0-letters-1',
    session_goal: 'hear and say letter sounds',
    available: [
      { lesson_id: 'a0-letters-1', label: 'Letters 1' },
      { lesson_id: 'a0-letters-2', label: 'Letters 2' },
    ],
    recommended: [{ lesson_id: 'a0-letters-1', label: 'Letters 1' }],
  }
}

function establishPathPlanEvidence(session: ReturnType<ReturnType<typeof createLearnerStore>['open']>) {
  const startedAt = '2026-10-09T10:00:00.000Z'
  commitSessionStart(
    session,
    { session_id: 'sess-ad12', learner_id: session.learnerId, started_at: startedAt },
    startedAt,
  )
  commitPlanSet(session, baselinePlan(), '2026-10-09T10:00:01.000Z')
  commitEvidencePropose(
    session,
    [
      {
        id: 'phonics.a_vs_e',
        kind: 'phonics_contrast',
        status: 'unstable',
        updated_at: '2026-10-09T10:00:02.000Z',
      },
    ],
    '2026-10-09T10:00:02.000Z',
  )
}

describe('AD-12: full closed-type journal via commit*', () => {
  it('projects AD-12 envelopes for every closed JournalEvent type', () => {
    const dataDir = tempDir('ep-ad12-full-')
    const store = createLearnerStore({ dataDir })
    const session = store.open('dora')

    const t0 = '2026-10-09T12:00:00.000Z'
    commitSessionStart(
      session,
      { session_id: 'sess-full', learner_id: 'dora', started_at: t0 },
      t0,
    )
    commitPrefsSet(
      session,
      {
        prefs_patch: {
          locale: 'en',
          voice_thresholds: { stt_wer_max: 0.35, tts_mos_min: 3.5 },
        },
      },
      '2026-10-09T12:00:01.000Z',
    )
    commitPlanSet(session, baselinePlan(), '2026-10-09T12:00:02.000Z')
    commitPhase(session, { phase_id: 'orient' }, '2026-10-09T12:00:03.000Z')
    commitHandoffGrant(
      session,
      { coach_id: 'phonics', block_id: 'block-a', reason: 'genre' },
      '2026-10-09T12:00:04.000Z',
    )
    commitHandoffReclaim(
      session,
      { coach_id: 'phonics', block_id: 'block-a', reason: 'block_end' },
      '2026-10-09T12:00:05.000Z',
    )
    commitAttempt(
      session,
      {
        attempt_id: 'att-1',
        evidence_key: 'phonics.a_vs_e',
        band: 'accept_low',
        score: 0.72,
      },
      '2026-10-09T12:00:06.000Z',
    )
    commitEvidencePropose(
      session,
      [
        {
          id: 'phonics.a_vs_e',
          kind: 'phonics_contrast',
          status: 'unstable',
          updated_at: '2026-10-09T12:00:07.000Z',
        },
      ],
      '2026-10-09T12:00:07.000Z',
    )
    commitFinale(
      session,
      { descriptors: ['heard letter contrast'], next_step: 'continue letters' },
      '2026-10-09T12:00:08.000Z',
    )
    commitLevelAdvance(
      session,
      {
        from_level: 'A0',
        to_level: 'A1',
        mode: 'blocked',
        gate_evals: [
          {
            gate_id: 'gate.a0_exit',
            critical: true,
            met: false,
            evidence_ids: ['phonics.a_vs_e'],
          },
        ],
      },
      '2026-10-09T12:00:09.000Z',
    )
    commitSessionEnd(
      session,
      { session_id: 'sess-full', reason: 'learner_stop' },
      '2026-10-09T12:00:10.000Z',
    )

    const snapshot = session.getSnapshot()
    assert.equal(snapshot.learner_id, 'dora')
    assert.deepEqual(snapshot.path, {
      level: 'A0',
      topic_id: 'letters',
      lesson_id: 'a0-letters-1',
    })
    const plan = baselinePlan()
    assert.equal(snapshot.plan.level, plan.level)
    assert.equal(snapshot.plan.topic, plan.topic)
    assert.equal(snapshot.plan.session_goal, plan.session_goal)
    assert.deepEqual(snapshot.plan.available, plan.available)
    assert.deepEqual(snapshot.plan.recommended, plan.recommended)
    assert.equal(snapshot.evidence.length, 1)
    assert.equal(snapshot.evidence[0]?.id, 'phonics.a_vs_e')
    assert.equal(snapshot.evidence[0]?.kind, 'phonics_contrast')
    assert.equal(snapshot.evidence[0]?.status, 'unstable')
    assert.equal(snapshot.evidence[0]?.updated_at, '2026-10-09T12:00:07.000Z')
    assert.equal(snapshot.prefs.locale, 'en')
    assert.equal(snapshot.voice_thresholds.stt_wer_max, 0.35)
    assert.equal(snapshot.voice_thresholds.tts_mos_min, 3.5)
    assert.equal(snapshot.updated_at, '2026-10-09T12:00:10.000Z')
    assert.equal(session.schemaVersion(), 1)

    const events = session.listEvents()
    assert.equal(events.length, 11)
    const expectedTypes = [
      'session_start',
      'prefs_set',
      'plan_set',
      'phase',
      'handoff_grant',
      'handoff_reclaim',
      'attempt',
      'evidence_propose',
      'finale',
      'level_advance',
      'session_end',
    ] as const
    assert.deepEqual(
      events.map((e) => e.type),
      [...expectedTypes],
    )
    assert.equal(events[0]?.payload.session_id, 'sess-full')
    assert.equal(events[0]?.payload.learner_id, 'dora')
    assert.ok(events[1]?.payload.prefs_patch)
    assert.equal(events[2]?.payload.level, plan.level)
    assert.equal(events[2]?.payload.topic, plan.topic)
    assert.equal(events[3]?.payload.phase_id, 'orient')
    assert.equal(events[4]?.payload.coach_id, 'phonics')
    assert.equal(events[5]?.payload.coach_id, 'phonics')
    assert.equal(events[6]?.payload.attempt_id, 'att-1')
    assert.ok(Array.isArray(events[7]?.payload.deltas))
    assert.ok(Array.isArray(events[8]?.payload.descriptors))
    assert.equal(events[9]?.payload.mode, 'blocked')
    assert.ok(Array.isArray(events[9]?.payload.gate_evals))
    assert.equal(events[10]?.payload.reason, 'learner_stop')

    store.closeAll()
  })
})

describe('AD-12: level_advance projection', () => {
  it('soft and conditional modes set path.level to to_level', () => {
    for (const mode of ['soft', 'conditional'] as const) {
      const dataDir = tempDir(`ep-ad12-level-${mode}-`)
      const store = createLearnerStore({ dataDir })
      const session = store.open(`learner-${mode}`)
      establishPathPlanEvidence(session)
      commitLevelAdvance(
        session,
        {
          from_level: 'A0',
          to_level: 'A1',
          mode,
          gate_evals: [],
        },
        '2026-10-09T10:00:03.000Z',
      )
      assert.equal(session.getSnapshot().path.level, 'A1')
      assert.equal(session.getSnapshot().path.topic_id, 'letters')
      store.closeAll()
    }
  })

  it('blocked mode leaves path unchanged', () => {
    const dataDir = tempDir('ep-ad12-level-blocked-')
    const store = createLearnerStore({ dataDir })
    const session = store.open('learner-blocked')
    establishPathPlanEvidence(session)
    const pathBefore = { ...session.getSnapshot().path }
    commitLevelAdvance(
      session,
      {
        from_level: 'A0',
        to_level: 'A1',
        mode: 'blocked',
        gate_evals: [
          { gate_id: 'gate.a0_exit', critical: true, met: false, evidence_ids: [] },
        ],
      },
      '2026-10-09T10:00:03.000Z',
    )
    assert.deepEqual(session.getSnapshot().path, pathBefore)
    store.closeAll()
  })
})

describe('AD-12: journal-only events', () => {
  it('does not alter path, plan, or evidence except updated_at', () => {
    const dataDir = tempDir('ep-ad12-journal-only-')
    const store = createLearnerStore({ dataDir })
    const session = store.open('eve')
    establishPathPlanEvidence(session)
    const before = session.getSnapshot()
    const pathBefore = structuredClone(before.path)
    const planBefore = structuredClone(before.plan)
    const evidenceBefore = structuredClone(before.evidence)

    const baseEventCount = session.listEvents().length
    const journalOnlySteps = [
      {
        commit: () => commitPhase(session, { phase_id: 'block' }, '2026-10-09T11:00:01.000Z'),
        type: 'phase' as const,
        payload: { phase_id: 'block' },
        at: '2026-10-09T11:00:01.000Z',
      },
      {
        commit: () =>
          commitHandoffGrant(
            session,
            { coach_id: 'speaking', block_id: 'mock-1' },
            '2026-10-09T11:00:02.000Z',
          ),
        type: 'handoff_grant' as const,
        payload: { coach_id: 'speaking', block_id: 'mock-1' },
        at: '2026-10-09T11:00:02.000Z',
      },
      {
        commit: () =>
          commitHandoffReclaim(
            session,
            { coach_id: 'speaking', reason: 'reclaim' },
            '2026-10-09T11:00:03.000Z',
          ),
        type: 'handoff_reclaim' as const,
        payload: { coach_id: 'speaking', reason: 'reclaim' },
        at: '2026-10-09T11:00:03.000Z',
      },
      {
        commit: () =>
          commitAttempt(session, { attempt_id: 'att-x', band: 'accept' }, '2026-10-09T11:00:04.000Z'),
        type: 'attempt' as const,
        payload: { attempt_id: 'att-x', band: 'accept' },
        at: '2026-10-09T11:00:04.000Z',
      },
      {
        commit: () =>
          commitFinale(session, { descriptors: ['fact one'] }, '2026-10-09T11:00:05.000Z'),
        type: 'finale' as const,
        payload: { descriptors: ['fact one'] },
        at: '2026-10-09T11:00:05.000Z',
      },
      {
        commit: () =>
          commitSessionEnd(
            session,
            { session_id: 'sess-ad12', reason: 'timebox' },
            '2026-10-09T11:00:06.000Z',
          ),
        type: 'session_end' as const,
        payload: { session_id: 'sess-ad12', reason: 'timebox' },
        at: '2026-10-09T11:00:06.000Z',
      },
    ]

    journalOnlySteps.forEach((step, index) => {
      step.commit()
      const events = session.listEvents()
      assert.equal(events.length, baseEventCount + index + 1)
      const row = events[events.length - 1]
      assert.equal(row?.type, step.type)
      assert.equal(row?.at, step.at)
      assert.deepEqual(row?.payload, step.payload)
      const snap = session.getSnapshot()
      assert.deepEqual(snap.path, pathBefore)
      assert.deepEqual(snap.plan, planBefore)
      assert.deepEqual(snap.evidence, evidenceBefore)
    })
    assert.equal(session.getSnapshot().updated_at, '2026-10-09T11:00:06.000Z')
    store.closeAll()
  })
})

describe('AD-12: evidence upsert', () => {
  it('merges two deltas for the same EvidenceItem id; later fields win', () => {
    const dataDir = tempDir('ep-ad12-evidence-upsert-')
    const store = createLearnerStore({ dataDir })
    const session = store.open('frank')
    commitSessionStart(
      session,
      {
        session_id: 'sess-upsert',
        learner_id: 'frank',
        started_at: '2026-10-09T14:00:00.000Z',
      },
      '2026-10-09T14:00:00.000Z',
    )
    commitEvidencePropose(
      session,
      [
        {
          id: 'vocab.cat',
          kind: 'vocab',
          status: 'unstable',
          updated_at: '2026-10-09T14:00:01.000Z',
          payload: { due_at: '2026-10-10T00:00:00.000Z', box: 1 },
        },
      ],
      '2026-10-09T14:00:01.000Z',
    )
    commitEvidencePropose(
      session,
      [
        {
          id: 'vocab.cat',
          kind: 'vocab',
          status: 'confirmed',
          updated_at: '2026-10-09T14:00:02.000Z',
          payload: { due_at: '2026-10-12T00:00:00.000Z', box: 2 },
        },
      ],
      '2026-10-09T14:00:02.000Z',
    )

    const items = session.getEvidence()
    assert.equal(items.length, 1)
    assert.equal(items[0]?.status, 'confirmed')
    assert.equal(items[0]?.updated_at, '2026-10-09T14:00:02.000Z')
    assert.deepEqual(items[0]?.payload, { due_at: '2026-10-12T00:00:00.000Z', box: 2 })
    store.closeAll()
  })
})
