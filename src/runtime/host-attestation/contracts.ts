export interface HostAttestationClaims {
  version: 1;
  issuer: string;
  audience: string;
  keyId: string;
  hostId: string;
  bootId: string;
  sessionId: string;
  dnaCommit: string;
  issuedAt: number;
  expiresAt: number;
  nonce: string;
  promptSha256: string;
  runtimeMeasurementSha256: string;
  provider: string;
  model: string;
  endpoint: string;
  inferenceRequestId: string;
  inferenceResponseSha256: string;
  requestCount: 1;
  promptReadBack: true;
  remoteInferenceObserved: true;
}

export interface SignedHostAttestation {
  claims: HostAttestationClaims;
  signature: string;
}

export interface TrustedHostAttestorKey {
  keyId: string;
  issuer: string;
  hostId: string;
  audience: string;
  publicKeyPem: string;
  allowedEndpointHosts: readonly string[];
}

export interface ExpectedHostBinding {
  audience: string;
  bootId: string;
  sessionId: string;
  dnaCommit: string;
  challengeNonce: string;
  promptSha256: string;
}

export interface VerifiedHostAttestation {
  claims: HostAttestationClaims;
  payloadHash: string;
  nonceHash: string;
  verifiedAt: number;
}

export interface HostAttestationReplayStore {
  consume(receipt: VerifiedHostAttestation): Promise<void>;
}

/** Implemented by a trusted server-side host integration, never by browser input. */
export interface PuterHostAttestationPort {
  requestAttestation(input: {
    bootId: string;
    sessionId: string;
    dnaCommit: string;
    challengeNonce: string;
    expectedPromptSha256: string;
  }): Promise<unknown>;
}
