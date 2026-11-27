import assert from "node:assert/strict";
import { PGlite } from "@electric-sql/pglite";
import { test } from "node:test";
import type { Sql } from "../../lib/db.ts";
import type { RuntimeCapability, RuntimeCapabilityPolicy } from "./contracts.ts";
import { PostgresRuntimeGrantService } from "./postgres-grant-service.ts";

const now = 1_800_000_000_000;
const commit = "a".repeat(40);
const principalId = "principal-1";
const sessionId = "session-1";
const bootId = "boot-1";

const schema = `
create table boot_sessions (
 boot_id text primary key, principal_id text not null, session_id text not null,
 dna_commit char(40) not null, state text not null, expires_at_ms bigint not null
);
create table runtime_grants (
 grant_id text primary key, boot_id text not null unique references boot_sessions(boot_id),
 principal_id text not null, session_id text not null, dna_commit char(40) not null,
 capabilities text[] not null, status text not null, issued_at_ms bigint not null,
 expires_at_ms bigint not null, revoked_at_ms bigint
);
create table runtime_grant_events (
 event_id text primary key, grant_id text not null references runtime_grants(grant_id),
 event_type text not null, principal_id text not null, session_id text not null,
 operation_id text, capability text, occurred_at_ms bigint not null
);
create table runtime_operations (
 operation_id text primary key, grant_id text not null references runtime_grants(grant_id),
 principal_id text not null, session_id text not null, dna_commit char(40) not null,
 capability text not null, status text not null, started_at_ms bigint not null,
 lease_expires_at_ms bigint not null, finished_at_ms bigint
);`;

function makeSql(pg: PGlite): Sql {
  const make = (run: <T>(text: string, params?: unknown[]) => Promise<T[]>): Sql => {
    const sql = (async <T>(strings: TemplateStringsArray, ...values: unknown[]) => {
      let text = strings[0];
      for (let i = 0; i < values.length; i++) text += `$${i + 1}${strings[i + 1]}`;
      return run<T>(text, values);
    }) as unknown as Sql;
    sql.query = run;
    sql.transaction = async <T>(work: (tx: Sql) => Promise<T>) =>
      pg.transaction(async (tx) => work(make(async <R>(text: string, params: unknown[] = []) => {
        const result = await tx.query<R>(text, params);
        return result.rows;
      })));
    return sql;
  };
  return make(async <T>(text: string, params: unknown[] = []) => {
    const result = await pg.query<T>(text, params);
    return result.rows;
  });
}

async function setup(options: {
  state?: string;
  capabilities?: readonly RuntimeCapability[];
  lifetime?: number;
  lease?: number;
} = {}) {
  const pg = new PGlite();
  await pg.waitReady;
  await pg.exec(schema);
  await pg.query(
    "insert into boot_sessions (boot_id,principal_id,session_id,dna_commit,state,expires_at_ms) values ($1,$2,$3,$4,$5,$6)",
    [bootId, principalId, sessionId, commit, options.state ?? "ADMITTED", now + 120_000],
  );
  let clock = now;
  let id = 0;
  const policy: RuntimeCapabilityPolicy = {
    selectCapabilities: () => options.capabilities ?? ["READ_PERSONA", "RUN_BOUNDED_INFERENCE"],
    maxGrantLifetimeMs: options.lifetime ?? 60_000,
  };
  const service = new PostgresRuntimeGrantService({
    sql: makeSql(pg), policy, now: () => clock,
    createId: () => `id-${++id}`, operationLeaseMs: options.lease ?? 10_000,
  });
  return { pg, service, setNow: (value: number) => { clock = value; } };
}

async function issue(service: PostgresRuntimeGrantService) {
  return service.issueForAdmittedBoot({ bootId, principalId, sessionId, dnaCommit: commit });
}

function startInput(grantId: string, overrides: Partial<{
  principalId: string; sessionId: string; capability: RuntimeCapability;
  currentDnaCommit: string; operationId: string;
}> = {}) {
  return {
    grantId, principalId, sessionId, capability: "READ_PERSONA" as RuntimeCapability,
    currentDnaCommit: commit, operationId: "operation-1", ...overrides,
  };
}

test("issues a bounded grant only for an ADMITTED boot", async () => {
  const { pg, service } = await setup({ state: "INFERENCE_VERIFIED" });
  await assert.rejects(issue(service), /BOOT_NOT_ADMITTED/);
  const rows = await pg.query("select * from runtime_grants");
  assert.equal(rows.rows.length, 0);
  await pg.close();
});

test("issues a grant bound to principal, session and exact DNA commit", async () => {
  const { pg, service } = await setup();
  const grant = await issue(service);
  assert.equal(grant.status, "ACTIVE");
  assert.equal(grant.principalId, principalId);
  assert.equal(grant.sessionId, sessionId);
  assert.equal(grant.dnaCommit, commit);
  assert.deepEqual(grant.capabilities, ["READ_PERSONA", "RUN_BOUNDED_INFERENCE"]);
  await pg.close();
});

test("grant issuance is idempotent for the same admitted boot", async () => {
  const { pg, service } = await setup();
  const first = await issue(service);
  const second = await issue(service);
  assert.equal(second.grantId, first.grantId);
  assert.equal((await pg.query("select * from runtime_grants")).rows.length, 1);
  assert.equal((await pg.query("select * from runtime_grant_events")).rows.length, 1);
  await pg.close();
});

test("rejects principal, session and DNA mismatch at grant issuance", async () => {
  const { service } = await setup();
  await assert.rejects(service.issueForAdmittedBoot({ bootId, principalId: "other", sessionId, dnaCommit: commit }), /BOOT_GRANT_BINDING_MISMATCH/);
  await assert.rejects(service.issueForAdmittedBoot({ bootId, principalId, sessionId: "other", dnaCommit: commit }), /BOOT_GRANT_BINDING_MISMATCH/);
  await assert.rejects(service.issueForAdmittedBoot({ bootId, principalId, sessionId, dnaCommit: "b".repeat(40) }), /BOOT_GRANT_BINDING_MISMATCH/);
});

test("rejects an empty or forbidden capability policy", async () => {
  const empty = await setup({ capabilities: [] });
  await assert.rejects(issue(empty.service), /RUNTIME_CAPABILITY_POLICY_INVALID/);
  await empty.pg.close();
  const forbidden = await setup({ capabilities: ["COMMIT_TO_MAIN" as RuntimeCapability] });
  await assert.rejects(issue(forbidden.service), /RUNTIME_CAPABILITY_POLICY_INVALID/);
  await forbidden.pg.close();
});

test("authorizes a capability only for matching live grant and DNA", async () => {
  const { pg, service } = await setup();
  const grant = await issue(service);
  const result = await service.startOperation(startInput(grant.grantId));
  assert.equal(result.shouldExecute, true);
  assert.equal(result.status, "STARTED");
  await pg.close();
});

test("denies wrong principal, session, capability and DNA commit", async () => {
  const { pg, service } = await setup();
  const grant = await issue(service);
  await assert.rejects(service.startOperation(startInput(grant.grantId, { principalId: "other" })), /RUNTIME_GRANT_DENIED/);
  await assert.rejects(service.startOperation(startInput(grant.grantId, { sessionId: "other" })), /RUNTIME_GRANT_DENIED/);
  await assert.rejects(service.startOperation(startInput(grant.grantId, { capability: "APPEND_SHADOW_AUDIT" })), /RUNTIME_GRANT_DENIED/);
  await assert.rejects(service.startOperation(startInput(grant.grantId, { currentDnaCommit: "f".repeat(40) })), /RUNTIME_GRANT_DENIED/);
  await pg.close();
});

test("operation id is idempotent and never starts the same side effect twice", async () => {
  const { pg, service } = await setup();
  const grant = await issue(service);
  const first = await service.startOperation(startInput(grant.grantId));
  const second = await service.startOperation(startInput(grant.grantId));
  assert.equal(first.shouldExecute, true);
  assert.equal(second.shouldExecute, false);
  assert.equal(second.status, "STARTED");
  assert.equal((await pg.query("select * from runtime_operations")).rows.length, 1);
  await pg.close();
});

test("rejects reuse of operation id for a different action", async () => {
  const { pg, service } = await setup();
  const grant = await issue(service);
  await service.startOperation(startInput(grant.grantId));
  await assert.rejects(service.startOperation(startInput(grant.grantId, { capability: "RUN_BOUNDED_INFERENCE" })), /OPERATION_ID_REUSE_MISMATCH/);
  await pg.close();
});

test("revocation atomically blocks new operation starts", async () => {
  const { pg, service } = await setup();
  const grant = await issue(service);
  assert.equal(await service.revokeGrant(grant.grantId, principalId, sessionId), true);
  await assert.rejects(service.startOperation(startInput(grant.grantId, { operationId: "operation-2" })), /RUNTIME_GRANT_DENIED/);
  assert.equal((await pg.query("select status from runtime_grants")).rows[0].status, "REVOKED");
  await pg.close();
});

test("expired operation lease becomes UNKNOWN and is not retried", async () => {
  const { pg, service, setNow } = await setup({ lease: 1_000 });
  const grant = await issue(service);
  await service.startOperation(startInput(grant.grantId));
  setNow(now + 1_001);
  const retry = await service.startOperation(startInput(grant.grantId));
  assert.equal(retry.status, "UNKNOWN");
  assert.equal(retry.shouldExecute, false);
  await pg.close();
});

test("operation completion is one-way and records audit", async () => {
  const { pg, service } = await setup();
  const grant = await issue(service);
  await service.startOperation(startInput(grant.grantId));
  assert.equal(await service.finishOperation("operation-1", "COMPLETED", principalId, sessionId), true);
  assert.equal(await service.finishOperation("operation-1", "FAILED", principalId, sessionId), false);
  const rows = await pg.query("select status from runtime_operations where operation_id = 'operation-1'");
  assert.equal(rows.rows[0].status, "COMPLETED");
  assert.equal((await pg.query("select * from runtime_grant_events")).rows.length, 3);
  await pg.close();
});

test("late completion after lease expiry is permanently UNKNOWN", async () => {
  const { pg, service, setNow } = await setup({ lease: 1_000 });
  const grant = await issue(service);
  await service.startOperation(startInput(grant.grantId));
  setNow(now + 1_001);
  assert.equal(await service.finishOperation("operation-1", "COMPLETED", principalId, sessionId), true);
  const rows = await pg.query("select status from runtime_operations where operation_id = 'operation-1'");
  assert.equal(rows.rows[0].status, "UNKNOWN");
  await pg.close();
});
