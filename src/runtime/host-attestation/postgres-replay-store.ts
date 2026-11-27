import type { Sql } from "../../lib/db.ts";
import type { HostAttestationReplayStore, VerifiedHostAttestation } from "./contracts.ts";

export class PostgresHostAttestationReplayStore implements HostAttestationReplayStore {
  private readonly sql: Sql;

  constructor(sql: Sql) {
    this.sql = sql;
  }

  async consume(receipt: VerifiedHostAttestation): Promise<void> {
    await this.sql.transaction(async (tx) => {
      await tx.query(
        `insert into host_attestation_receipts
          (nonce_hash, boot_id, key_id, payload_hash, verified_at_ms, expires_at_ms)
         values ($1,$2,$3,$4,$5,$6)`,
        [
          receipt.nonceHash,
          receipt.claims.bootId,
          receipt.claims.keyId,
          receipt.payloadHash,
          receipt.verifiedAt,
          receipt.claims.expiresAt,
        ],
      );
    });
  }
}
