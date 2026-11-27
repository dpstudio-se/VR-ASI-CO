import { dbSource, getSql } from "../../lib/db.ts";
import { PostgresBootRepository } from "./postgres-repository.ts";

/**
 * Server-only production factory. PGlite remains suitable for tests and local
 * preview, but is deliberately rejected for runtime admission.
 */
export async function createProductionBootRepository(): Promise<PostgresBootRepository> {
  if (typeof window !== "undefined") {
    throw new Error("BOOT_STORAGE_SERVER_ONLY");
  }
  if (dbSource !== "neon") {
    throw new Error("PRODUCTION_POSTGRES_REQUIRED");
  }
  return new PostgresBootRepository(await getSql());
}
