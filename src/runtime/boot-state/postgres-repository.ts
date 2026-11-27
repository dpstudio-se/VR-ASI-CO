import type { Sql } from "../../lib/db.ts";
import { canTransition } from "./transitions.ts";
import type {
  AuditEvent,
  BootRecord,
  BootRepository,
  TransitionCommand,
} from "./contracts.ts";

interface CreateBootCommand {
  record: BootRecord;
  audit: AuditEvent;
}

interface BootRow {
  boot_id: string;
  principal_id: string;
  session_id: string;
  dna_commit: string;
  nonce_hash: string;
  state: BootRecord["state"];
  version: number | string;
  created_at_ms: number | string;
  expires_at_ms: number | string;
  updated_at_ms: number | string;
  failure_code: string | null;
}

function asNumber(value: number | string): number {
  const result = Number(value);
  if (!Number.isSafeInteger(result)) throw new Error("BOOT_STORAGE_INTEGER_OUT_OF_RANGE");
  return result;
}

function toRecord(row: BootRow): BootRecord {
  return {
    bootId: row.boot_id,
    principalId: row.principal_id,
    sessionId: row.session_id,
    dnaCommit: row.dna_commit,
    nonceHash: row.nonce_hash,
    state: row.state,
    version: asNumber(row.version),
    createdAt: asNumber(row.created_at_ms),
    expiresAt: asNumber(row.expires_at_ms),
    updatedAt: asNumber(row.updated_at_ms),
    ...(row.failure_code ? { failureCode: row.failure_code } : {}),
  };
}

/**
 * PostgreSQL implementation. Every multi-row write uses one connection-scoped
 * database transaction supplied by getSql(). No KV/read-then-write emulation.
 */
export class PostgresBootRepository implements BootRepository {
  constructor(private readonly sql: Sql) {}

  async createBootWithNonce(command: CreateBootCommand): Promise<void> {
    const { record, audit } = command;
    if (
      record.state !== "CHALLENGE_ISSUED" ||
      record.version !== 0 ||
      !/^[a-f0-9]{40}$/.test(record.dnaCommit) ||
      !/^[a-f0-9]{64}$/.test(record.nonceHash) ||
      !Number.isSafeInteger(record.createdAt) ||
      !Number.isSafeInteger(record.expiresAt) ||
      record.expiresAt <= record.createdAt ||
      audit.eventType !== "BOOT_CREATED" ||
      audit.bootId !== record.bootId ||
      audit.fromState !== record.state ||
      audit.toState !== record.state ||
      audit.fromVersion !== 0 ||
      audit.toVersion !== 0
    ) throw new Error("BOOT_CREATE_COMMAND_INVALID");
    await this.sql.transaction(async (tx) => {
      await tx.query(
        `insert into boot_sessions
          (boot_id, principal_id, session_id, dna_commit, nonce_hash, state,
           version, created_at_ms, expires_at_ms, updated_at_ms, failure_code)
         values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`,
        [
          record.bootId, record.principalId, record.sessionId, record.dnaCommit,
          record.nonceHash, record.state, record.version, record.createdAt,
          record.expiresAt, record.updatedAt, record.failureCode ?? null,
        ],
      );
      await tx.query(
        `insert into boot_nonce_claims (nonce_hash, boot_id, claimed_at_ms, expires_at_ms)
         values ($1,$2,$3,$4)`,
        [record.nonceHash, record.bootId, record.createdAt, record.expiresAt],
      );
      await this.insertAudit(tx, audit);
    });
  }

  async get(bootId: string): Promise<BootRecord | null> {
    const rows = await this.sql.query<BootRow>(
      `select boot_id, principal_id, session_id, dna_commit, nonce_hash, state,
              version, created_at_ms, expires_at_ms, updated_at_ms, failure_code
         from boot_sessions where boot_id = $1`,
      [bootId],
    );
    return rows[0] ? toRecord(rows[0]) : null;
  }

  async transitionWithAudit(command: TransitionCommand): Promise<boolean> {
    const expectedEventType =
      command.nextState === "STOP" ? "BOOT_STOPPED" :
      command.nextState === "EXPIRED" ? "BOOT_EXPIRED" : "BOOT_STATE_TRANSITION";
    if (
      !canTransition(command.expectedState, command.nextState) ||
      command.audit.eventType !== expectedEventType ||
      command.audit.bootId !== command.bootId ||
      command.audit.fromState !== command.expectedState ||
      command.audit.toState !== command.nextState ||
      command.audit.fromVersion !== command.expectedVersion ||
      command.audit.toVersion !== command.expectedVersion + 1 ||
      command.audit.occurredAt !== command.updatedAt ||
      (command.audit.evidenceHash !== undefined && !/^[a-f0-9]{64}$/.test(command.audit.evidenceHash))
    ) throw new Error("BOOT_TRANSITION_COMMAND_INVALID");

    return this.sql.transaction(async (tx) => {
      const updated = await tx.query<{ boot_id: string }>(
        `update boot_sessions
            set state = $1, version = version + 1, updated_at_ms = $2,
                failure_code = $3
          where boot_id = $4 and state = $5 and version = $6
            and (($1 = 'EXPIRED' and expires_at_ms <= $2)\n                 or ($1 <> 'EXPIRED' and expires_at_ms > $2))
          returning boot_id`,
        [
          command.nextState,
          command.updatedAt,
          command.failureCode ?? null,
          command.bootId,
          command.expectedState,
          command.expectedVersion,
        ],
      );
      if (updated.length !== 1) return false;
      await this.insertAudit(tx, command.audit);
      return true;
    });
  }

  private async insertAudit(tx: Sql, event: AuditEvent): Promise<void> {
    await tx.query(
      `insert into boot_audit_events
        (event_id, event_type, boot_id, from_state, to_state, from_version,
         to_version, occurred_at_ms, reason, evidence_hash)
       values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
      [
        event.eventId, event.eventType, event.bootId, event.fromState,
        event.toState, event.fromVersion, event.toVersion, event.occurredAt,
        event.reason ?? null, event.evidenceHash ?? null,
      ],
    );
  }
}
