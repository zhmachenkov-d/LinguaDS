import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  openLearnerDb,
  readSchemaVersion,
  type LearnerDb,
} from "../../persistence/db.js";
import { projectSnapshot } from "./project.js";
import type {
  EvidenceItem,
  JournalEvent,
  JournalEventType,
  NextStepPlan,
  PathPosition,
  ProfileSnapshot,
} from "./types.js";

const PACKAGE_ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../..",
);
export const DEFAULT_DATA_DIR = path.join(
  PACKAGE_ROOT,
  "persistence",
  "learners",
);

export interface LearnerStoreOptions {
  dataDir?: string;
}

export interface LearnerStore {
  readonly dataDir: string;
  open(learnerId: string): LearnerSession;
  closeAll(): void;
}

export interface LearnerSession {
  readonly learnerId: string;
  readonly dbPath: string;
  schemaVersion(): number;
  append(
    type: JournalEventType,
    payload: Record<string, unknown>,
    at?: string,
  ): JournalEvent;
  listEvents(): JournalEvent[];
  getSnapshot(): ProfileSnapshot;
  getPathPosition(): PathPosition;
  getPlan(): NextStepPlan;
  getEvidence(): EvidenceItem[];
  close(): void;
}

export function createLearnerStore(
  options: LearnerStoreOptions = {},
): LearnerStore {
  const dataDir = options.dataDir ?? DEFAULT_DATA_DIR;
  const openSessions = new Map<
    string,
    { session: LearnerSession; handle: LearnerDb }
  >();

  return {
    dataDir,
    open(learnerId: string): LearnerSession {
      const existing = openSessions.get(learnerId);
      if (existing) return existing.session;

      const handle = openLearnerDb({ dataDir, learnerId });
      const session = createSession(handle, () => {
        openSessions.delete(learnerId);
      });
      openSessions.set(learnerId, { session, handle });
      return session;
    },
    closeAll() {
      for (const { handle } of openSessions.values()) {
        handle.close();
      }
      openSessions.clear();
    },
  };
}

function createSession(handle: LearnerDb, onClose: () => void): LearnerSession {
  const insert = handle.db.prepare(
    `INSERT INTO journal_events (seq, type, at, payload_json) VALUES (?, ?, ?, ?)`,
  );
  const nextSeq = handle.db.prepare(
    `SELECT COALESCE(MAX(seq), 0) + 1 AS seq FROM journal_events`,
  );
  const selectAll = handle.db.prepare(
    `SELECT type, at, payload_json AS payloadJson FROM journal_events ORDER BY seq ASC`,
  );
  const upsertSnapshot = handle.db.prepare(
    `INSERT INTO profile_snapshot (learner_id, snapshot_json, updated_at)
     VALUES (?, ?, ?)
     ON CONFLICT(learner_id) DO UPDATE SET
       snapshot_json = excluded.snapshot_json,
       updated_at = excluded.updated_at`,
  );

  const listEvents = (): JournalEvent[] => {
    const rows = selectAll.all() as Array<{
      type: string;
      at: string;
      payloadJson: string;
    }>;
    return rows.map((row) => ({
      type: row.type as JournalEvent["type"],
      at: row.at,
      payload: JSON.parse(row.payloadJson) as Record<string, unknown>,
    }));
  };

  const projectAndPersist = (): ProfileSnapshot => {
    const events = listEvents();
    const snapshot = projectSnapshot(handle.learnerId, events);
    upsertSnapshot.run(
      handle.learnerId,
      JSON.stringify(snapshot),
      snapshot.updated_at,
    );
    return snapshot;
  };

  return {
    learnerId: handle.learnerId,
    dbPath: handle.filePath,
    schemaVersion() {
      return readSchemaVersion(handle.db);
    },
    append(type, payload, at = new Date().toISOString()) {
      const seq = (nextSeq.get() as { seq: number }).seq;
      const event: JournalEvent = { type, at, payload };
      insert.run(seq, type, at, JSON.stringify(payload));
      projectAndPersist();
      return event;
    },
    listEvents,
    getSnapshot() {
      return projectAndPersist();
    },
    getPathPosition() {
      return projectAndPersist().path;
    },
    getPlan() {
      return projectAndPersist().plan;
    },
    getEvidence() {
      return projectAndPersist().evidence;
    },
    close() {
      handle.close();
      onClose();
    },
  };
}

export type {
  AttemptPayload,
  EvidenceItem,
  EvidenceProposePayload,
  FinalePayload,
  GateEval,
  HandoffGrantPayload,
  HandoffReclaimPayload,
  JournalEvent,
  JournalEventType,
  LevelAdvanceMode,
  LevelAdvancePayload,
  NextStepPlan,
  PathPosition,
  PhaseId,
  PhasePayload,
  PlanSetPayload,
  PrefsSetPayload,
  ProfileSnapshot,
  SessionEndPayload,
  SessionStartPayload,
} from "./types.js";
