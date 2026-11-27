import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { PGlite } from "@electric-sql/pglite";
import { test } from "node:test";
import type { Sql } from "../../lib/db.ts";
import type { VerifiedHostAttestation } from "./contracts.ts";
import { PostgresHostAttestationReplayStore } from "./postgres-replay-store.ts";

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

const now = 1_800_000_000_000;
const receipt: VerifiedHostAttestation = {
  claims: {
    version: 1, issuer: "test-issuer", audience: "test-audience", keyId: "test-key",
    hostId: "puter-test", bootId: "boot-1", sessionId: "session-1",
    dnaCommit: "a".repeat(40), issuedAt: now - 1000, expiresAt: now + 60_000,
    nonce: Buffer.alloc(32, 1).toString("base64url"), promptSha256: "b".repeat(64),
    runtimeMeasurementSha256: "c".repeat(64), provider: "provider", model: "model",
    endpoint: "https://api.example.test/infer", inferenceRequestId: "request-1",
    inferenceResponseSha256: "d".repeat(64), requestCount: 1,
    promptReadBack: true, remoteInferenceObserved: true,
  },
  payloadHash: "e".repeat(64),
  nonceHash: "f".repeat(64),
  verifiedAt: now,
};

async function setup() {
  const pg = new PGlite();
  await pg.waitReady;
  const bootMigration = await readFile(new URL("../../../migrations/0002_boot_runtime.sql", import.meta.url), "utf8");
  const hostMigration = await readFile(new URL("../../../migrations/0003_host_attestations.sql", import.meta.url), "utf8");
  await pg.exec(bootMigration);
  await pg.exec(hostMigration);
  await pg.query(
    `insert into boot_sessions
      (boot_id,principal_id,session_id,dna_commit,nonce_hash,state,version,created_at_ms,expires_at_ms,updated_at_ms)
     values ($1,$2,$3,$4,$5,'INFERENCE_PENDING',3,$6,$7,$6)`,
    ["boot-1","principal-1","session-1","a".repeat(40),"9".repeat(64),now-1000,now+120_000],
  );
  return { pg, store: new PostgresHostAttestationReplayStore(makeSql(pg)) };
}

test("persists one attestation nonce and rejects replay", async () => {
  const { pg, store } = await setup();
  await store.consume(receipt);
  await assert.rejects(store.consume(receipt));
  assert.equal((await pg.query("select * from host_attestation_receipts")).rows.length, 1);
  await pg.close();
});

test("rejects attestation receipt bound to a different session", async () => {
  const { pg, store } = await setup();
  await assert.rejects(store.consume({
    ...receipt,
    claims: { ...receipt.claims, sessionId: "other-session" },
  }), /HOST_ATTESTATION_BOOT_BINDING_INVALID/);
  await pg.close();
});

test("rejects attestation receipt when boot is not in inference pending", async () => {
  const { pg, store } = await setup();
  await pg.exec("update boot_sessions set state='STOP' where boot_id='boot-1'");
  await assert.rejects(store.consume(receipt), /HOST_ATTESTATION_BOOT_BINDING_INVALID/);
  await pg.close();
});

test("rejects expired boot even when signature was valid earlier", async () => {
  const { pg, store } = await setup();
  await pg.exec(`update boot_sessions set expires_at_ms=${now-1} where boot_id='boot-1'`);
  await assert.rejects(store.consume(receipt), /HOST_ATTESTATION_BOOT_BINDING_INVALID/);
  await pg.close();
});
