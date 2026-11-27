import { dbSource, getSql } from "../../lib/db.ts";
import { PostgresHostAttestationReplayStore } from "./postgres-replay-store.ts";

export async function createProductionHostAttestationReplayStore(): Promise<PostgresHostAttestationReplayStore> {
  if (typeof window !== "undefined") throw new Error("HOST_ATTESTATION_SERVER_ONLY");
  if (dbSource !== "neon") throw new Error("PRODUCTION_POSTGRES_REQUIRED");
  return new PostgresHostAttestationReplayStore(await getSql());
}
