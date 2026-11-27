import { createHash, createPublicKey, verify as verifySignature } from "node:crypto";
import type {
  ExpectedHostBinding,
  HostAttestationClaims,
  SignedHostAttestation,
  TrustedHostAttestorKey,
  VerifiedHostAttestation,
} from "./contracts.ts";

const HEX40 = /^[a-f0-9]{40}$/;
const HEX64 = /^[a-f0-9]{64}$/;
const NONCE = /^[A-Za-z0-9_-]{43}$/;
const DOMAIN = "VR-ASI-CO/HOST-ATTESTATION/V1\n";
const MAX_LIFETIME_MS = 5 * 60 * 1000;
const CLOCK_SKEW_MS = 30 * 1000;

const CLAIM_KEYS = [
  "version", "issuer", "audience", "keyId", "hostId", "bootId", "sessionId",
  "dnaCommit", "issuedAt", "expiresAt", "nonce", "promptSha256",
  "runtimeMeasurementSha256", "provider", "model", "endpoint",
  "inferenceRequestId", "inferenceResponseSha256", "requestCount",
  "promptReadBack", "remoteInferenceObserved",
].sort();

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function canonicalClaims(claims: HostAttestationClaims): string {
  return JSON.stringify({
    version: claims.version,
    issuer: claims.issuer,
    audience: claims.audience,
    keyId: claims.keyId,
    hostId: claims.hostId,
    bootId: claims.bootId,
    sessionId: claims.sessionId,
    dnaCommit: claims.dnaCommit,
    issuedAt: claims.issuedAt,
    expiresAt: claims.expiresAt,
    nonce: claims.nonce,
    promptSha256: claims.promptSha256,
    runtimeMeasurementSha256: claims.runtimeMeasurementSha256,
    provider: claims.provider,
    model: claims.model,
    endpoint: claims.endpoint,
    inferenceRequestId: claims.inferenceRequestId,
    inferenceResponseSha256: claims.inferenceResponseSha256,
    requestCount: claims.requestCount,
    promptReadBack: claims.promptReadBack,
    remoteInferenceObserved: claims.remoteInferenceObserved,
  });
}

function assertClaimsShape(value: unknown): asserts value is HostAttestationClaims {
  if (!isRecord(value)) throw new Error("HOST_ATTESTATION_CLAIMS_INVALID");
  const keys = Object.keys(value).sort();
  if (keys.length !== CLAIM_KEYS.length || keys.some((key, index) => key !== CLAIM_KEYS[index])) {
    throw new Error("HOST_ATTESTATION_CLAIMS_SHAPE_INVALID");
  }
}

function validEndpoint(value: string, allowedHosts: readonly string[]): boolean {
  try {
    const url = new URL(value);
    const host = url.hostname.toLowerCase();
    return allowedHosts.includes(host) && url.protocol === "https:" &&
      !url.username && !url.password &&
      !url.search && !url.hash &&
      host !== "localhost" && host !== "127.0.0.1" &&
      host !== "::1" && !host.endsWith(".local");
  } catch {
    return false;
  }
}

export function verifyHostAttestation(
  input: unknown,
  expected: ExpectedHostBinding,
  trusted: TrustedHostAttestorKey,
  now = Date.now(),
): VerifiedHostAttestation {
  if (!isRecord(input) || !isRecord(input.claims) || typeof input.signature !== "string") {
    throw new Error("HOST_ATTESTATION_ENVELOPE_INVALID");
  }
  assertClaimsShape(input.claims);
  const claims = input.claims as unknown as HostAttestationClaims;

  if (
    claims.version !== 1 ||
    claims.issuer !== trusted.issuer ||
    claims.audience !== expected.audience ||
    claims.audience !== trusted.audience ||
    claims.keyId !== trusted.keyId ||
    claims.hostId !== trusted.hostId ||
    claims.bootId !== expected.bootId ||
    claims.sessionId !== expected.sessionId ||
    claims.dnaCommit !== expected.dnaCommit ||
    claims.nonce !== expected.challengeNonce ||
    claims.promptSha256 !== expected.promptSha256 ||
    !HEX40.test(claims.dnaCommit) ||
    !HEX64.test(claims.promptSha256) ||
    !HEX64.test(claims.runtimeMeasurementSha256) ||
    !HEX64.test(claims.inferenceResponseSha256) ||
    !NONCE.test(claims.nonce) ||
    !Number.isSafeInteger(claims.issuedAt) ||
    !Number.isSafeInteger(claims.expiresAt) ||
    claims.issuedAt > now + CLOCK_SKEW_MS ||
    claims.issuedAt < now - MAX_LIFETIME_MS ||
    claims.expiresAt <= now ||
    claims.expiresAt <= claims.issuedAt ||
    claims.expiresAt - claims.issuedAt > MAX_LIFETIME_MS ||
    claims.requestCount !== 1 ||
    claims.promptReadBack !== true ||
    claims.remoteInferenceObserved !== true ||
    typeof claims.provider !== "string" || !claims.provider.trim() ||
    typeof claims.model !== "string" || !claims.model.trim() ||
    typeof claims.inferenceRequestId !== "string" || !claims.inferenceRequestId.trim() ||
    typeof claims.endpoint !== "string" || !validEndpoint(claims.endpoint, trusted.allowedEndpointHosts)
  ) {
    throw new Error("HOST_ATTESTATION_BINDING_INVALID");
  }

  const signature = Buffer.from(input.signature, "base64url");
  if (signature.length !== 64 || signature.toString("base64url") !== input.signature) {
    throw new Error("HOST_ATTESTATION_SIGNATURE_ENCODING_INVALID");
  }

  const signedBytes = Buffer.from(DOMAIN + canonicalClaims(claims), "utf8");
  const publicKey = createPublicKey(trusted.publicKeyPem);
  if (!verifySignature(null, signedBytes, publicKey, signature)) {
    throw new Error("HOST_ATTESTATION_SIGNATURE_INVALID");
  }

  const payloadHash = createHash("sha256").update(signedBytes).digest("hex");
  const nonceHash = createHash("sha256").update(claims.nonce).digest("hex");
  return { claims, payloadHash, nonceHash, verifiedAt: now };
}

export function signableHostAttestationBytes(claims: HostAttestationClaims): Buffer {
  return Buffer.from(DOMAIN + canonicalClaims(claims), "utf8");
}
