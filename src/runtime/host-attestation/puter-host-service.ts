import type {
  ExpectedHostBinding,
  HostAttestationReplayStore,
  PuterHostAttestationPort,
  TrustedHostAttestorKey,
  VerifiedHostAttestation,
} from "./contracts.ts";
import { verifyAndConsumeHostAttestation } from "./verify-and-consume.ts";

/**
 * Server-side orchestration only. The injected port must be implemented by a
 * trusted Puter host integration that obtains evidence independently of
 * browser/user-layer claims. This function does not manufacture attestation.
 */
export async function collectAndVerifyPuterHostAttestation(
  port: PuterHostAttestationPort,
  input: {
    bootId: string;
    sessionId: string;
    dnaCommit: string;
    challengeNonce: string;
    expectedPromptSha256: string;
  },
  expected: ExpectedHostBinding,
  trustedKey: TrustedHostAttestorKey,
  replayStore: HostAttestationReplayStore,
  now = Date.now(),
): Promise<VerifiedHostAttestation> {
  if (typeof window !== "undefined") throw new Error("HOST_ATTESTATION_SERVER_ONLY");
  const raw = await port.requestAttestation(input);
  return verifyAndConsumeHostAttestation(raw, expected, trustedKey, replayStore, now);
}
