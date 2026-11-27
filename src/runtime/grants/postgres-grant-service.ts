import { randomUUID, createHash } from "node:crypto";
import type { Sql } from "../../lib/db.ts";
import { RUNTIME_CAPABILITIES } from "./contracts.ts";
import type {
  GrantPolicyContext,
  IssueGrantInput,
  OperationStartResult,
  OperationStatus,
  RuntimeCapability,
  RuntimeCapabilityPolicy,
  RuntimeGrant,
  StartOperationInput,
} from "./contracts.ts";

interface BootAdmissionRow {
  boot_id: string;
  principal_id: string;
  session_id: string;
  dna_commit: string;
  state: string;
  expires_at_ms: number | string;
}
interface GrantRow {
  grant_id: string;
  boot_id: string;
  principal_id: string;
  session_id: string;
  dna_commit: string;
  capabilities: string[];
  status: "ACTIVE" | "REVOKED" | "EXPIRED";
  issued_at_ms: number | string;
  expires_at_ms: number | string;
}
interface OperationRow {
  operation_id: string;
  grant_id: string;
  principal_id: string;
  session_id: string;
  dna_commit: string;
  capability: string;
  status: OperationStatus;
  lease_expires_at_ms: number | string;
}

function asNumber(value: number | string): number {
  const number = Number(value);
  if (!Number.isSafeInteger(number)) throw new Error("RUNTIME_GRANT_INTEGER_INVALID");
  return number;
}

function normalizeCapabilities(values: readonly RuntimeCapability[]): RuntimeCapability[] {
  const allowed = new Set<string>(RUNTIME_CAPABILITIES);
  const unique = [...new Set(values)];
  if (unique.length !== values.length || unique.length === 0 || unique.some((value) => !allowed.has(value))) {
    throw new Error("RUNTIME_CAPABILITY_POLICY_INVALID");
  }
  return unique.slice().sort() as RuntimeCapability[];
}

function sameCapabilities(a: readonly string[], b: readonly string[]): boolean {
  return [...a].sort().join("|") === [...b].sort().join("|");
}

export class PostgresRuntimeGrantService {
  private readonly sql: Sql;
  private readonly policy: RuntimeCapabilityPolicy;
  private readonly now: () => number;
  private readonly createId: () => string;
  private readonly operationLeaseMs: number;

  constructor(options: {
    sql: Sql;
    policy: RuntimeCapabilityPolicy;
    now?: () => number;
    createId?: () => string;
    operationLeaseMs?: number;
  }) {
    this.sql = options.sql;
    this.policy = options.policy;
    this.now = options.now ?? Date.now;
    this.createId = options.createId ?? randomUUID;
    this.operationLeaseMs = options.operationLeaseMs ?? 30_000;
  }

  async issueForAdmittedBoot(input: IssueGrantInput): Promise<RuntimeGrant> {
    if (!/^[a-f0-9]{40}$/.test(input.dnaCommit)) throw new Error("DNA_COMMIT_INVALID");
    const context: GrantPolicyContext = {
      bootId: input.bootId,
      principalId: input.principalId,
      sessionId: input.sessionId,
      dnaCommit: input.dnaCommit,
    };
    const capabilities = normalizeCapabilities(await this.policy.selectCapabilities(context));
    if (!Number.isSafeInteger(this.policy.maxGrantLifetimeMs) || this.policy.maxGrantLifetimeMs <= 0) {
      throw new Error("GRANT_POLICY_LIFETIME_INVALID");
    }

    return this.sql.transaction(async (tx) => {
      const boots = await tx.query<BootAdmissionRow>(
        `select boot_id, principal_id, session_id, dna_commit, state, expires_at_ms
           from boot_sessions where boot_id = $1 for update`,
        [input.bootId],
      );
      const boot = boots[0];
      if (!boot || boot.state !== "ADMITTED") throw new Error("BOOT_NOT_ADMITTED");
      if (
        boot.principal_id !== input.principalId ||
        boot.session_id !== input.sessionId ||
        boot.dna_commit !== input.dnaCommit
      ) throw new Error("BOOT_GRANT_BINDING_MISMATCH");

      const now = this.now();
      const bootExpiry = asNumber(boot.expires_at_ms);
      if (bootExpiry <= now) throw new Error("BOOT_EXPIRED");
      const expiresAt = Math.min(bootExpiry, now + this.policy.maxGrantLifetimeMs);

      const existingRows = await tx.query<GrantRow>(
        `select grant_id, boot_id, principal_id, session_id, dna_commit, capabilities,
                status, issued_at_ms, expires_at_ms
           from runtime_grants where boot_id = $1 for update`,
        [input.bootId],
      );
      const existing = existingRows[0];
      if (existing) {
        if (
          existing.status !== "ACTIVE" ||
          existing.principal_id !== input.principalId ||
          existing.session_id !== input.sessionId ||
          existing.dna_commit !== input.dnaCommit ||
          !sameCapabilities(existing.capabilities, capabilities) ||
          asNumber(existing.expires_at_ms) <= now
        ) throw new Error("GRANT_ALREADY_FINALIZED");
        return this.toGrant(existing);
      }

      const grantId = this.createId();
      await tx.query(
        `insert into runtime_grants
          (grant_id, boot_id, principal_id, session_id, dna_commit, capabilities,
           status, issued_at_ms, expires_at_ms)
         values ($1,$2,$3,$4,$5,$6,'ACTIVE',$7,$8)`,
        [grantId, input.bootId, input.principalId, input.sessionId, input.dnaCommit, capabilities, now, expiresAt],
      );
      await this.insertEvent(tx, {
        grantId, type: "GRANT_ISSUED", principalId: input.principalId,
        sessionId: input.sessionId, occurredAt: now,
      });
      return {
        grantId, bootId: input.bootId, principalId: input.principalId,
        sessionId: input.sessionId, dnaCommit: input.dnaCommit,
        capabilities, status: "ACTIVE", issuedAt: now, expiresAt,
      };
    });
  }

  async startOperation(input: StartOperationInput): Promise<OperationStartResult> {
    if (!input.operationId.trim()) throw new Error("OPERATION_ID_REQUIRED");
    if (!RUNTIME_CAPABILITIES.includes(input.capability)) throw new Error("CAPABILITY_NOT_ALLOWED");
    if (!/^[a-f0-9]{40}$/.test(input.currentDnaCommit)) throw new Error("DNA_COMMIT_INVALID");

    return this.sql.transaction(async (tx) => {
      const rows = await tx.query<GrantRow & { boot_state: string }>(
        `select g.grant_id, g.boot_id, g.principal_id, g.session_id, g.dna_commit,
                g.capabilities, g.status, g.issued_at_ms, g.expires_at_ms,
                b.state as boot_state
           from runtime_grants g
           join boot_sessions b on b.boot_id = g.boot_id
          where g.grant_id = $1
          for update of g, b`,
        [input.grantId],
      );
      const grant = rows[0];
      const now = this.now();
      if (
        !grant ||
        grant.status !== "ACTIVE" ||
        grant.boot_state !== "ADMITTED" ||
        grant.principal_id !== input.principalId ||
        grant.session_id !== input.sessionId ||
        grant.dna_commit !== input.currentDnaCommit ||
        !grant.capabilities.includes(input.capability) ||
        asNumber(grant.expires_at_ms) <= now
      ) throw new Error("RUNTIME_GRANT_DENIED");

      const priorRows = await tx.query<OperationRow>(
        `select operation_id, grant_id, principal_id, session_id, dna_commit,
                capability, status, lease_expires_at_ms
           from runtime_operations where operation_id = $1 for update`,
        [input.operationId],
      );
      const prior = priorRows[0];
      if (prior) {
        if (
          prior.grant_id !== input.grantId ||
          prior.principal_id !== input.principalId ||
          prior.session_id !== input.sessionId ||
          prior.dna_commit !== input.currentDnaCommit ||
          prior.capability !== input.capability
        ) throw new Error("OPERATION_ID_REUSE_MISMATCH");
        if (prior.status === "STARTED" && asNumber(prior.lease_expires_at_ms) <= now) {
          await tx.query(
            "update runtime_operations set status = 'UNKNOWN', finished_at_ms = $1 where operation_id = $2 and status = 'STARTED'",
            [now, input.operationId],
          );
          await this.insertEvent(tx, {
            grantId: input.grantId, type: "OPERATION_UNKNOWN",
            principalId: input.principalId, sessionId: input.sessionId,
            operationId: input.operationId, capability: input.capability, occurredAt: now,
          });
          return { operationId: input.operationId, status: "UNKNOWN", shouldExecute: false, leaseExpiresAt: asNumber(prior.lease_expires_at_ms) };
        }
        return {
          operationId: input.operationId,
          status: prior.status,
          shouldExecute: false,
          leaseExpiresAt: asNumber(prior.lease_expires_at_ms),
        };
      }

      const leaseExpiresAt = Math.min(now + this.operationLeaseMs, asNumber(grant.expires_at_ms));
      await tx.query(
        `insert into runtime_operations
          (operation_id, grant_id, principal_id, session_id, dna_commit,
           capability, status, started_at_ms, lease_expires_at_ms)
         values ($1,$2,$3,$4,$5,$6,'STARTED',$7,$8)`,
        [input.operationId, input.grantId, input.principalId, input.sessionId,
          input.currentDnaCommit, input.capability, now, leaseExpiresAt],
      );
      await this.insertEvent(tx, {
        grantId: input.grantId, type: "OPERATION_STARTED",
        principalId: input.principalId, sessionId: input.sessionId,
        operationId: input.operationId, capability: input.capability, occurredAt: now,
      });
      return { operationId: input.operationId, status: "STARTED", shouldExecute: true, leaseExpiresAt };
    });
  }

  async finishOperation(
    operationId: string,
    outcome: "COMPLETED" | "FAILED" | "UNKNOWN",
    principalId: string,
    sessionId: string,
  ): Promise<boolean> {
    return this.sql.transaction(async (tx) => {
      const rows = await tx.query<OperationRow>(
        "select operation_id, grant_id, principal_id, session_id, dna_commit, capability, status, lease_expires_at_ms from runtime_operations where operation_id = $1 for update",
        [operationId],
      );
      const operation = rows[0];
      if (!operation || operation.status !== "STARTED" ||
          operation.principal_id !== principalId || operation.session_id !== sessionId) return false;
      const now = this.now();
      const finalOutcome = asNumber(operation.lease_expires_at_ms) <= now ? "UNKNOWN" : outcome;
      await tx.query(
        "update runtime_operations set status = $1, finished_at_ms = $2 where operation_id = $3",
        [finalOutcome, now, operationId],
      );
      const type = finalOutcome === "COMPLETED" ? "OPERATION_COMPLETED" :
        finalOutcome === "FAILED" ? "OPERATION_FAILED" : "OPERATION_UNKNOWN";
      await this.insertEvent(tx, {
        grantId: operation.grant_id, type, principalId, sessionId,
        operationId, capability: operation.capability as RuntimeCapability, occurredAt: now,
      });
      return true;
    });
  }

  async revokeGrant(grantId: string, principalId: string, sessionId: string): Promise<boolean> {
    return this.sql.transaction(async (tx) => {
      const rows = await tx.query<GrantRow>(
        `select grant_id, boot_id, principal_id, session_id, dna_commit, capabilities,
                status, issued_at_ms, expires_at_ms
           from runtime_grants where grant_id = $1 for update`,
        [grantId],
      );
      const grant = rows[0];
      if (!grant || grant.principal_id !== principalId || grant.session_id !== sessionId) return false;
      if (grant.status === "REVOKED") return true;
      if (grant.status !== "ACTIVE") return false;
      const now = this.now();
      await tx.query(
        "update runtime_grants set status = 'REVOKED', revoked_at_ms = $1 where grant_id = $2 and status = 'ACTIVE'",
        [now, grantId],
      );
      await this.insertEvent(tx, {
        grantId, type: "GRANT_REVOKED", principalId, sessionId, occurredAt: now,
      });
      return true;
    });
  }

  private toGrant(row: GrantRow): RuntimeGrant {
    return {
      grantId: row.grant_id, bootId: row.boot_id,
      principalId: row.principal_id, sessionId: row.session_id,
      dnaCommit: row.dna_commit,
      capabilities: row.capabilities as RuntimeCapability[],
      status: row.status,
      issuedAt: asNumber(row.issued_at_ms),
      expiresAt: asNumber(row.expires_at_ms),
    };
  }

  private async insertEvent(
    tx: Sql,
    event: {
      grantId: string;
      type: string;
      principalId: string;
      sessionId: string;
      occurredAt: number;
      operationId?: string;
      capability?: RuntimeCapability;
    },
  ): Promise<void> {
    await tx.query(
      `insert into runtime_grant_events
        (event_id, grant_id, event_type, principal_id, session_id, operation_id, capability, occurred_at_ms)
       values ($1,$2,$3,$4,$5,$6,$7,$8)`,
      [this.createId(), event.grantId, event.type, event.principalId,
        event.sessionId, event.operationId ?? null, event.capability ?? null, event.occurredAt],
    );
  }
}
