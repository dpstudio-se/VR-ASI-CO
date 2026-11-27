import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { PGlite } from "@electric-sql/pglite";
import type { Sql } from "../../lib/db.ts";
import type { AuditEvent, BootRecord, TransitionCommand } from "./contracts.ts";
import { PostgresBootRepository } from "./postgres-repository.ts";

function pgliteSql(pg: PGlite): Sql {
  const run = async <T>(text: string, params: unknown[] = []) => {
    const result = await pg.query<T>(text, params);
    return result.rows;
  };
  const make = (runner: typeof run): Sql => {
    const tagged = (async <T>(strings: TemplateStringsArray, ...values: unknown[]) => {
      let text = strings[0];
      for (let i = 0; i < values.length; i++) text += `$${i + 1}${strings[i + 1]}`;
      return runner<T>(text, values);
    }) as unknown as Sql;
    tagged.query = runner;
    tagged.transaction = async <T>(work: (tx: Sql) => Promise<T>) =>
      pg.transaction(async (tx) => {
        const txRun = async <R>(text: string, params: unknown[] = []) => {
          const result = await tx.query<R>(text, params);
          return result.rows;
        };
        return work(make(txRun));
      });
    return tagged;
  };
  return make(run);
}



const now = 1_800_000_000_000;
function fixture(bootId = "boot-1", nonce = "b".repeat(64)) {
  const record: BootRecord = {
    bootId, principalId: "principal-1", sessionId: "session-1",
    dnaCommit: "a".repeat(40), nonceHash: nonce, state: "CHALLENGE_ISSUED",
    version: 0, createdAt: now, expiresAt: now + 60_000, updatedAt: now,
  };
  const audit: AuditEvent = {
    eventId: `created-${bootId}`, eventType: "BOOT_CREATED",
    bootId, fromState: "CHALLENGE_ISSUED", toState: "CHALLENGE_ISSUED",
    fromVersion: 0, toVersion: 0, occurredAt: now,
  };
  return { record, audit };
}

async function setup() {
  const pg = new PGlite();
  await pg.waitReady;
  const migration = await readFile(new URL("../../../migrations/0002_boot_runtime.sql", import.meta.url), "utf8");
  await pg.exec(migration);
  return { pg, repository: new PostgresBootRepository(pgliteSql(pg)) };
}

test("creates boot, nonce claim and audit atomically", async () => {
  const { pg, repository } = await setup();
  const data = fixture();
  await repository.createBootWithNonce(data);
  assert.equal((await repository.get("boot-1"))?.state, "CHALLENGE_ISSUED");
  assert.equal((await pg.query("select * from boot_nonce_claims")).rows.length, 1);
  assert.equal((await pg.query("select * from boot_audit_events")).rows.length, 1);
  await pg.close();
});

test("nonce uniqueness rejects replay and rolls back second boot", async () => {
  const { pg, repository } = await setup();
  await repository.createBootWithNonce(fixture());
  await assert.rejects(repository.createBootWithNonce(fixture("boot-2")));
  assert.equal((await repository.get("boot-2")), null);
  assert.equal((await pg.query("select * from boot_nonce_claims")).rows.length, 1);
  await pg.close();
});

test("CAS state update and audit insert commit together", async () => {
  const { pg, repository } = await setup();
  await repository.createBootWithNonce(fixture());
  const command: TransitionCommand = {
    bootId: "boot-1", expectedState: "CHALLENGE_ISSUED", expectedVersion: 0,
    nextState: "INSTALLATION_PENDING", updatedAt: now + 1,
    audit: {
      eventId: "event-1", eventType: "BOOT_STATE_TRANSITION", bootId: "boot-1",
      fromState: "CHALLENGE_ISSUED", toState: "INSTALLATION_PENDING",
      fromVersion: 0, toVersion: 1, occurredAt: now + 1,
    },
  };
  assert.equal(await repository.transitionWithAudit(command), true);
  assert.equal((await repository.get("boot-1"))?.version, 1);
  assert.equal((await pg.query("select * from boot_audit_events")).rows.length, 2);
  await pg.close();
});

test("stale CAS does not append audit", async () => {
  const { pg, repository } = await setup();
  await repository.createBootWithNonce(fixture());
  const command: TransitionCommand = {
    bootId: "boot-1", expectedState: "CHALLENGE_ISSUED", expectedVersion: 9,
    nextState: "INSTALLATION_PENDING", updatedAt: now + 1,
    audit: {
      eventId: "stale-event", eventType: "BOOT_STATE_TRANSITION", bootId: "boot-1",
      fromState: "CHALLENGE_ISSUED", toState: "INSTALLATION_PENDING",
      fromVersion: 9, toVersion: 10, occurredAt: now + 1,
    },
  };
  assert.equal(await repository.transitionWithAudit(command), false);
  assert.equal((await pg.query("select * from boot_audit_events")).rows.length, 1);
  await pg.close();
});

test("audit failure rolls back the state change", async () => {
  const { pg, repository } = await setup();
  await repository.createBootWithNonce(fixture());
  await pg.exec("create or replace function reject_audit() returns trigger language plpgsql as $$ begin raise exception 'audit blocked'; end $$; create trigger reject_audit_insert before insert on boot_audit_events for each row execute function reject_audit();");
  const command: TransitionCommand = {
    bootId: "boot-1", expectedState: "CHALLENGE_ISSUED", expectedVersion: 0,
    nextState: "INSTALLATION_PENDING", updatedAt: now + 1,
    audit: {
      eventId: "blocked-event", eventType: "BOOT_STATE_TRANSITION", bootId: "boot-1",
      fromState: "CHALLENGE_ISSUED", toState: "INSTALLATION_PENDING",
      fromVersion: 0, toVersion: 1, occurredAt: now + 1,
    },
  };
  await assert.rejects(repository.transitionWithAudit(command));
  assert.equal((await repository.get("boot-1"))?.state, "CHALLENGE_ISSUED");
  assert.equal((await pg.query("select * from boot_audit_events")).rows.length, 1);
  await pg.close();
});

test("expired nonce claim is retained and cannot be reused", async () => {
  const { pg, repository } = await setup();
  await repository.createBootWithNonce(fixture());
  await pg.exec(`update boot_sessions set state='EXPIRED' where boot_id='boot-1'`);
  await assert.rejects(repository.createBootWithNonce(fixture("boot-2")));
  assert.equal((await pg.query("select * from boot_nonce_claims")).rows.length, 1);
  await pg.close();
});

test("repository rejects a skipped transition before opening a transaction", async () => {
  const { pg, repository } = await setup();
  await repository.createBootWithNonce(fixture());
  const command: TransitionCommand = {
    bootId: "boot-1", expectedState: "CHALLENGE_ISSUED", expectedVersion: 0,
    nextState: "ADMITTED", updatedAt: now + 1,
    audit: {
      eventId: "forged-event", eventType: "BOOT_STATE_TRANSITION", bootId: "boot-1",
      fromState: "CHALLENGE_ISSUED", toState: "ADMITTED",
      fromVersion: 0, toVersion: 1, occurredAt: now + 1,
    },
  };
  await assert.rejects(repository.transitionWithAudit(command), { message: "BOOT_TRANSITION_COMMAND_INVALID" });
  assert.equal((await repository.get("boot-1"))?.state, "CHALLENGE_ISSUED");
  await pg.close();
});
