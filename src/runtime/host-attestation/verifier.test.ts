import assert from "node:assert/strict";
import { generateKeyPairSync, sign } from "node:crypto";
import { test } from "node:test";
import type {
  ExpectedHostBinding,
  HostAttestationClaims,
  SignedHostAttestation,
  TrustedHostAttestorKey,
} from "./contracts.ts";
import { signableHostAttestationBytes, verifyHostAttestation } from "./verifier.ts";
import { verifyAndConsumeHostAttestation } from "./verify-and-consume.ts";

const now = 1_800_000_000_000;
const nonce = Buffer.alloc(32, 7).toString("base64url");
const { privateKey, publicKey } = generateKeyPairSync("ed25519");
const trusted: TrustedHostAttestorKey = {
  keyId: "puter-attestor-test-1",
  issuer: "vr-asi-co-test-attestor",
  hostId: "puter-host-test",
  audience: "vr-asi-co-runtime",
  publicKeyPem: publicKey.export({ type: "spki", format: "pem" }).toString(),
};
const expected: ExpectedHostBinding = {
  audience: "vr-asi-co-runtime",
  bootId: "boot-1",
  sessionId: "session-1",
  dnaCommit: "a".repeat(40),
  challengeNonce: nonce,
  promptSha256: "b".repeat(64),
};

function claims(overrides: Partial<HostAttestationClaims> = {}): HostAttestationClaims {
  return {
    version: 1,
    issuer: trusted.issuer,
    audience: trusted.audience,
    keyId: trusted.keyId,
    hostId: trusted.hostId,
    bootId: expected.bootId,
    sessionId: expected.sessionId,
    dnaCommit: expected.dnaCommit,
    issuedAt: now - 1_000,
    expiresAt: now + 60_000,
    nonce,
    promptSha256: expected.promptSha256,
    runtimeMeasurementSha256: "c".repeat(64),
    provider: "remote-provider",
    model: "model-id",
    endpoint: "https://api.example.test/v1/inference",
    inferenceRequestId: "request-1",
    inferenceResponseSha256: "d".repeat(64),
    requestCount: 1,
    promptReadBack: true,
    remoteInferenceObserved: true,
    ...overrides,
  };
}

function signed(overrides: Partial<HostAttestationClaims> = {}): SignedHostAttestation {
  const payload = claims(overrides);
  const signature = sign(null, signableHostAttestationBytes(payload), privateKey).toString("base64url");
  return { claims: payload, signature };
}

test("accepts valid Ed25519 attestation bound to one boot and DNA", () => {
  const result = verifyHostAttestation(signed(), expected, trusted, now);
  assert.equal(result.claims.bootId, expected.bootId);
  assert.equal(result.claims.dnaCommit, expected.dnaCommit);
  assert.match(result.payloadHash, /^[a-f0-9]{64}$/);
  assert.match(result.nonceHash, /^[a-f0-9]{64}$/);
});

test("rejects a modified claim after signing", () => {
  const value = signed();
  value.claims.model = "forged-model";
  assert.throws(() => verifyHostAttestation(value, expected, trusted, now), /HOST_ATTESTATION_SIGNATURE_INVALID/);
});

test("rejects wrong boot, session, DNA, nonce and prompt binding", () => {
  const cases: Partial<HostAttestationClaims>[] = [
    { bootId: "other-boot" },
    { sessionId: "other-session" },
    { dnaCommit: "e".repeat(40) },
    { nonce: Buffer.alloc(32, 8).toString("base64url") },
    { promptSha256: "f".repeat(64) },
  ];
  for (const change of cases) {
    assert.throws(() => verifyHostAttestation(signed(change), expected, trusted, now), /HOST_ATTESTATION_BINDING_INVALID/);
  }
});

test("rejects expired, future and excessively long attestations", () => {
  assert.throws(() => verifyHostAttestation(signed({ expiresAt: now - 1 }), expected, trusted, now), /HOST_ATTESTATION_BINDING_INVALID/);
  assert.throws(() => verifyHostAttestation(signed({ issuedAt: now + 31_000 }), expected, trusted, now), /HOST_ATTESTATION_BINDING_INVALID/);
  assert.throws(() => verifyHostAttestation(signed({ expiresAt: now + 600_000 }), expected, trusted, now), /HOST_ATTESTATION_BINDING_INVALID/);
});

test("requires prompt read-back, observed remote inference and exactly one request", () => {
  assert.throws(() => verifyHostAttestation(signed({ promptReadBack: false as true }), expected, trusted, now), /HOST_ATTESTATION_BINDING_INVALID/);
  assert.throws(() => verifyHostAttestation(signed({ remoteInferenceObserved: false as true }), expected, trusted, now), /HOST_ATTESTATION_BINDING_INVALID/);
  assert.throws(() => verifyHostAttestation(signed({ requestCount: 2 as 1 }), expected, trusted, now), /HOST_ATTESTATION_BINDING_INVALID/);
});

test("rejects non-HTTPS, local and credential-bearing inference endpoints", () => {
  for (const endpoint of ["http://api.example.test", "https://localhost/infer", "https://user:pass@example.test/infer", "https://127.0.0.1/infer"]) {
    assert.throws(() => verifyHostAttestation(signed({ endpoint }), expected, trusted, now), /HOST_ATTESTATION_BINDING_INVALID/);
  }
});

test("rejects untrusted key identity and malformed signature encoding", () => {
  assert.throws(() => verifyHostAttestation(signed(), expected, { ...trusted, keyId: "other-key" }, now), /HOST_ATTESTATION_BINDING_INVALID/);
  const value = signed();
  value.signature = "not-base64url!";
  assert.throws(() => verifyHostAttestation(value, expected, trusted, now), /HOST_ATTESTATION_SIGNATURE_ENCODING_INVALID/);
});

test("rejects extra claim fields to prevent unsigned extension ambiguity", () => {
  const value = signed() as SignedHostAttestation & { extra: string };
  value.claims = { ...value.claims, extra: "untrusted" } as HostAttestationClaims;
  assert.throws(() => verifyHostAttestation(value, expected, trusted, now), /HOST_ATTESTATION_CLAIMS_SHAPE_INVALID/);
});

test("consumes a verified nonce once and rejects replay", async () => {
  const seen = new Set<string>();
  const store = {
    async consume(receipt: { nonceHash: string }) {
      if (seen.has(receipt.nonceHash)) throw new Error("HOST_ATTESTATION_REPLAY");
      seen.add(receipt.nonceHash);
    },
  };
  await verifyAndConsumeHostAttestation(signed(), expected, trusted, store, now);
  await assert.rejects(verifyAndConsumeHostAttestation(signed(), expected, trusted, store, now), /HOST_ATTESTATION_REPLAY/);
});
