import { dbSource, getSql } from "../../lib/db.ts";
import type { RuntimeCapabilityPolicy } from "./contracts.ts";
import { PostgresRuntimeGrantService } from "./postgres-grant-service.ts";

export async function createProductionGrantService(
  policy: RuntimeCapabilityPolicy,
): Promise<PostgresRuntimeGrantService> {
  if (typeof window !== "undefined") throw new Error("RUNTIME_GRANTS_SERVER_ONLY");
  if (dbSource !== "neon") throw new Error("PRODUCTION_POSTGRES_REQUIRED");
  return new PostgresRuntimeGrantService({ sql: await getSql(), policy });
}
