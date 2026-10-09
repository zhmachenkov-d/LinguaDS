import assert from 'node:assert/strict'
import { mkdtempSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { after, describe, it } from 'node:test'
import { createEnglishPath } from '../index.js'
import { createLearnerStore } from '../ports/learner-store/index.js'
import { createSpeechIn } from '../ports/speech-in/index.js'
import { createSpeechOut } from '../ports/speech-out/index.js'

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
