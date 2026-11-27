import assert from "node:assert/strict";
import { PGlite } from "@electric-sql/pglite";
import { test } from "node:test";
import type { Sql } from "../../lib/db.ts";
import type { RuntimeCapabilityPolicy } from "../grants/contracts.ts";
import { PostgresRuntimeGrantService } from "../grants/postgres-grant-service.ts";
import { executeWithRuntimeGrant } from "./execute-with-grant.ts";

const now = 1_800_000_000_000;
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

async function setup() {
  const pg = new PGlite();
  await pg.waitReady;
  await pg.exec(schema);
  await pg.query(
    "insert into boot_sessions values ($1,$2,$3,$4,'ADMITTED',$5)",
    ["boot-1","principal-1","session-1","a".repeat(40),now+60_000],
  );
  const policy: RuntimeCapabilityPolicy = {
    selectCapabilities: () => ["RUN_BOUNDED_INFERENCE"],
    maxGrantLifetimeMs: 30_000,
  };
  let id = 0;
  const service = new PostgresRuntimeGrantService({
    sql: makeSql(pg), policy, now: () => now,
    createId: () => `id-${++id}`,
  });
  const grant = await service.issueForAdmittedBoot({
    bootId: "boot-1", principalId: "principal-1", sessionId: "session-1", dnaCommit: "a".repeat(40),
  });
  return { pg, service, grantId: grant.grantId };
}

test("capability broker runs a granted operation once and persists completion", async () => {
  const { pg, service, grantId } = await setup();
  let calls = 0;
  const input = {
    grantId, operationId: "tool-call-1", principalId: "principal-1",
    sessionId: "session-1", currentDnaCommit: "a".repeat(40),
    capability: "RUN_BOUNDED_INFERENCE" as const,
  };
  const first = await executeWithRuntimeGrant(service, input, async () => {
    calls += 1;
    return "inference-result";
  });
  const second = await executeWithRuntimeGrant(service, input, async () => {
    calls += 1;
    return "duplicate";
  });
  assert.equal(first.status, "COMPLETED");
  assert.equal(first.result, "inference-result");
  assert.equal(second.executed, false);
  assert.equal(calls, 1);
  assert.equal((await pg.query<{ status: string }>("select status from runtime_operations")).rows[0].status, "COMPLETED");
  await pg.close();
});

test("capability broker does not invoke action when grant check fails", async () => {
  const { pg, service, grantId } = await setup();
  await service.revokeGrant(grantId, "principal-1", "session-1");
  let calls = 0;
  await assert.rejects(executeWithRuntimeGrant(service, {
    grantId, operationId: "tool-call-2", principalId: "principal-1",
    sessionId: "session-1", currentDnaCommit: "a".repeat(40),
    capability: "RUN_BOUNDED_INFERENCE",
  }, async () => { calls += 1; }));
  assert.equal(calls, 0);
  await pg.close();
});
