import type {
  ExpectedHostBinding,
  HostAttestationReplayStore,
  TrustedHostAttestorKey,
  VerifiedHostAttestation,
} from "./contracts.ts";
import { verifyHostAttestation } from "./verifier.ts";

export async function verifyAndConsumeHostAttestation(
  input: unknown,
  expected: ExpectedHostBinding,
  trusted: TrustedHostAttestorKey,
  replayStore: HostAttestationReplayStore,
  now = Date.now(),
): Promise<VerifiedHostAttestation> {
  const verified = verifyHostAttestation(input, expected, trusted, now);
  // A unique nonce constraint makes concurrent replay attempts single-winner.
  await replayStore.consume(verified);
  return verified;
}
