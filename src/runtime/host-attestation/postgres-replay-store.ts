import type { Sql } from "../../lib/db.ts";
import type { HostAttestationReplayStore, VerifiedHostAttestation } from "./contracts.ts";

export class PostgresHostAttestationReplayStore implements HostAttestationReplayStore {
  private readonly sql: Sql;

  constructor(sql: Sql) {
    this.sql = sql;
  }

  async consume(receipt: VerifiedHostAttestation): Promise<void> {
    await this.sql.transaction(async (tx) => {
      const boots = await tx.query<{
        session_id: string;
        dna_commit: string;
        state: string;
        expires_at_ms: number | string;
      }>(
        `select session_id, dna_commit, state, expires_at_ms
           from boot_sessions where boot_id = $1 for update`,
        [receipt.claims.bootId],
      );
      const boot = boots[0];
      if (
        !boot ||
        boot.session_id !== receipt.claims.sessionId ||
        boot.dna_commit !== receipt.claims.dnaCommit ||
        boot.state !== "INFERENCE_PENDING" ||
        Number(boot.expires_at_ms) <= receipt.verifiedAt
      ) throw new Error("HOST_ATTESTATION_BOOT_BINDING_INVALID");

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
