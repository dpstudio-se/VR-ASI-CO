import assert from "node:assert/strict";
import { createHash, generateKeyPairSync, sign } from "node:crypto";
import { test } from "node:test";
import {
  ADMISSION_FILES, BRANCH, MAX_AGE_MS, REPOSITORY,
  createBootChallenge, gitBlobSha, probeText, readRemoteBoot, verifyBootEvidence,
} from "./verify-boot-evidence.mjs";

const NOW = Date.parse("2026-10-06T02:00:00.000Z");
const COMMIT = "a".repeat(40);
const TREE = "b".repeat(40);
const keys = generateKeyPairSync("ed25519");
const publicKey = keys.publicKey.export({ type: "spki", format: "pem" });
const hash = (value) => createHash("sha256").update(value).digest("hex");

// These fixtures exercise verifier behavior. They are not live host evidence.
function fixture({ alterTree, alterBlob, required = [] } = {}) {
  const sources = Object.fromEntries([...ADMISSION_FILES, "persona/angelica.json"].map((path) => [path, `fixture:${path}\n`]));
  sources["dna/REMOTE_DNA_STATE.json"] = JSON.stringify({
    repository: REPOSITORY, boot: { head_policy: "RESOLVE_AT_BOOT", required },
  });
  const blobs = new Map();
  const entries = Object.entries(sources).map(([path, content]) => {
    const bytes = Buffer.from(content);
    const sha = gitBlobSha(bytes);
    blobs.set(sha, { sha, size: bytes.length, encoding: "base64", content: bytes.toString("base64") });
    return { path, type: "blob", mode: "100644", sha };
  });
  const calls = [];
  async function fetchJson(url) {
    calls.push(url);
    if (url.endsWith(`/branches/${BRANCH}`)) return { name: BRANCH, commit: { sha: COMMIT, commit: { tree: { sha: TREE } } } };
    if (url.includes("/git/trees/")) {
      const tree = { sha: TREE, truncated: false, tree: structuredClone(entries) };
      return alterTree ? alterTree(tree) : tree;
    }
    const blob = structuredClone(blobs.get(url.split("/").at(-1)));
    if (!blob) throw new Error("UNKNOWN_BLOB");
    return alterBlob ? alterBlob(blob) : blob;
  }
  return { fetchJson, calls, sources };
}

function signed(payload, privateKey = keys.privateKey) {
  const bytes = Buffer.from(JSON.stringify(payload));
  return { algorithm: "Ed25519", payload: bytes.toString("base64"), signature: sign(null, bytes, privateKey).toString("base64") };
}

async function setup() {
  const snapshot = await readRemoteBoot({ fetchJson: fixture().fetchJson, now: NOW });
  const challenge = createBootChallenge(snapshot, "host-session-42", NOW);
  const common = {
    repository: challenge.repository, branch: challenge.branch, commit: challenge.commit,
    receiptId: challenge.receiptId, persona: challenge.persona, promptSha256: challenge.promptSha256,
    sessionId: challenge.sessionId, nonce: challenge.nonce,
    issuedAt: new Date(NOW + 200).toISOString(), expiresAt: challenge.expiresAt,
    hostId: "host-1", provider: "fixture-provider", model: "fixture-model", endpoint: "https://inference.example.test/v1/chat",
    runtimeKind: "HOST_NATIVE", simulated: false, proxied: false,
  };
  const installation = { ...common, schema: "VR_ASI_CO_INSTALLATION/1", promptLayer: "SYSTEM_OR_EQUIVALENT", observedAt: new Date(NOW + 50).toISOString() };
  const inference = { ...common, schema: "VR_ASI_CO_INFERENCE/1", observedAt: new Date(NOW + 100).toISOString(),
    location: "REMOTE", requestId: "request-1", requestCount: 1, outcome: "SUCCEEDED",
    requestSha256: hash(probeText(challenge)), responseSha256: hash("fixture-response") };
  const evaluate = (changes = {}) => verifyBootEvidence(snapshot, { challenge,
    installation: signed(installation), inference: signed(inference), trustedKey: publicKey, now: NOW + 250, ...changes });
  return { snapshot, challenge, installation, inference, evaluate };
}

test("reads exact Git blobs and all boot-contract files without mutation or polling", async () => {
  const f = fixture();
  const snapshot = await readRemoteBoot({ fetchJson: f.fetchJson, now: NOW });
  assert.equal(snapshot.commit, COMMIT);
  assert.equal(snapshot.sourceTransport, "EXTERNAL_READER");
  assert.equal(snapshot.files["README.md"], gitBlobSha(Buffer.from(f.sources["README.md"])));
  assert.ok(f.calls.every((url) => url.includes("/branches/main") || url.includes(`/git/trees/${TREE}?recursive=1`) || url.includes("/git/blobs/")));
  assert.equal(f.calls.length, Object.keys(snapshot.files).length + 3);
  assert.equal(Object.isFrozen(snapshot.sources), true);
});

test("perfect provenance leaves prompt, inference and boot unverified without host evidence", async () => {
  const { snapshot } = await setup();
  const report = verifyBootEvidence(snapshot, { now: NOW + 250 });
  assert.equal(report.provenanceGate, "PROVENANCE_MATCH");
  assert.equal(report.promptInstallation, "UNVERIFIED");
  assert.equal(report.inferenceGate, "UNVERIFIED");
  assert.equal(report.bootGate, "STOP");
  assert.equal(report.canContinue, false);
});

test("admits only authenticated, fresh and bound installation plus one remote request", async () => {
  const { evaluate } = await setup();
  const report = evaluate();
  assert.equal(report.promptInstallation, "HOST_ATTESTED");
  assert.equal(report.inferenceGate, "HOST_ATTESTED_REMOTE");
  assert.equal(report.bootGate, "PASS");
});

test("cannot turn a copied snapshot or client flag into provenance", async () => {
  const { snapshot, evaluate } = await setup();
  const copy = structuredClone(snapshot);
  const result = verifyBootEvidence(copy, { now: NOW });
  assert.equal(result.provenanceGate, "STOP");
  assert.equal(evaluate({ installation: { source: "HOST_INTEGRATION", verified: true } }).bootGate, "STOP");
});

test("requires a separately pinned public key", async () => {
  const { evaluate } = await setup();
  assert.equal(evaluate({ trustedKey: undefined }).bootGate, "STOP");
  assert.equal(evaluate({ trustedKey: keys.privateKey.export({ type: "pkcs8", format: "pem" }) }).bootGate, "STOP");
  const other = generateKeyPairSync("ed25519").publicKey.export({ type: "spki", format: "pem" });
  assert.equal(evaluate({ trustedKey: other }).bootGate, "STOP");
});

test("rejects payload tampering and malformed envelopes", async () => {
  const { installation, evaluate } = await setup();
  const envelope = signed(installation);
  envelope.payload = Buffer.from(JSON.stringify({ ...installation, verified: true })).toString("base64");
  for (const evidence of [envelope, { payload: "!", signature: "!", algorithm: "Ed25519" }, signed({})]) {
    assert.equal(evaluate({ installation: evidence }).bootGate, "STOP");
  }
});

test("rejects replay against another nonce, session, persona, commit or prompt", async () => {
  const { installation, evaluate } = await setup();
  for (const [field, value] of Object.entries({ nonce: "c".repeat(64), sessionId: "another-session", persona: "emilia", commit: "c".repeat(40), promptSha256: "d".repeat(64) })) {
    assert.equal(evaluate({ installation: signed({ ...installation, [field]: value }) }).bootGate, "STOP", field);
  }
});

test("rejects expired sources, challenges and host evidence and future timestamps", async () => {
  const { installation, challenge, evaluate } = await setup();
  assert.equal(evaluate({ now: NOW + MAX_AGE_MS }).bootGate, "STOP");
  assert.equal(evaluate({ challenge: { ...challenge, issuedAt: new Date(NOW + 1000).toISOString() } }).bootGate, "STOP");
  for (const change of [
    { expiresAt: new Date(NOW + 200).toISOString() },
    { issuedAt: new Date(NOW - 1).toISOString() },
    { issuedAt: new Date(NOW + 1000).toISOString() },
    { expiresAt: new Date(NOW + MAX_AGE_MS + 1).toISOString() },
  ]) assert.equal(evaluate({ installation: signed({ ...installation, ...change }) }).bootGate, "STOP");
});

test("rejects user-layer prompts, proxies, simulations and external runtimes", async () => {
  const { installation, evaluate } = await setup();
  for (const change of [{ promptLayer: "USER" }, { proxied: true }, { simulated: true }, { runtimeKind: "EXTERNAL_VM" }]) {
    assert.equal(evaluate({ installation: signed({ ...installation, ...change }) }).bootGate, "STOP");
  }
});

test("installation alone cannot establish inference", async () => {
  const { evaluate } = await setup();
  const report = evaluate({ inference: undefined });
  assert.equal(report.promptInstallation, "HOST_ATTESTED");
  assert.equal(report.inferenceGate, "UNVERIFIED");
  assert.equal(report.bootGate, "STOP");
});

test("rejects failed, local, unbound or multiple inference requests", async () => {
  const { inference, evaluate } = await setup();
  for (const change of [{ outcome: "FAILED" }, { location: "LOCAL" }, { requestCount: 2 },
    { requestSha256: hash("unrelated") }, { responseSha256: "" }, { requestId: "" }]) {
    assert.equal(evaluate({ inference: signed({ ...inference, ...change }) }).bootGate, "STOP");
  }
});

test("binds host, provider, model, endpoint and order across both receipts", async () => {
  const { inference, evaluate } = await setup();
  for (const change of [{ hostId: "another-host" }, { model: "another-model" }, { provider: "another-provider" },
    { endpoint: "https://other.example.test/v1/chat" }, { observedAt: new Date(NOW + 1).toISOString() }]) {
    assert.equal(evaluate({ inference: signed({ ...inference, ...change }) }).bootGate, "STOP");
  }
});

test("rejects endpoint credentials, query secrets and loopback as remote proof", async () => {
  const { installation, evaluate } = await setup();
  for (const endpoint of ["http://host.test/chat", "https://name:secret@host.test/chat", "https://host.test/chat?token=secret", "https://localhost/chat"]) {
    assert.equal(evaluate({ installation: signed({ ...installation, endpoint }) }).bootGate, "STOP");
  }
});

test("rejects missing sources, symlinks, truncated trees and changed blob bytes", async () => {
  for (const options of [
    { alterTree: (tree) => ({ ...tree, truncated: true }) },
    { alterTree: (tree) => ({ ...tree, tree: tree.tree.filter((entry) => entry.path !== "README.md") }) },
    { alterTree: (tree) => ({ ...tree, tree: tree.tree.map((entry) => entry.path === "README.md" ? { ...entry, mode: "120000" } : entry) }) },
    { alterBlob: (blob) => ({ ...blob, content: Buffer.from("tampered").toString("base64"), size: 8 }) },
    { required: ["../secret"] },
    { required: ["missing-required.md"] },
  ]) await assert.rejects(readRemoteBoot({ fetchJson: fixture(options).fetchJson, now: NOW }));
});

test("requires an actual host session to prepare a bounded challenge", async () => {
  const { snapshot, challenge } = await setup();
  assert.throws(() => createBootChallenge(snapshot, "", NOW));
  assert.throws(() => createBootChallenge(snapshot, "session", NOW + MAX_AGE_MS));
  assert.equal(Date.parse(challenge.expiresAt) - Date.parse(challenge.issuedAt), MAX_AGE_MS);
  assert.match(challenge.nonce, /^[a-f0-9]{64}$/);
});

test("rejects HEAD drift while reading the locked source revision", async () => {
  const f = fixture();
  let headReads = 0;
  const fetchJson = async (url) => {
    const value = await f.fetchJson(url);
    if (url.includes("/branches/") && ++headReads > 1) value.commit.sha = "c".repeat(40);
    return value;
  };
  await assert.rejects(readRemoteBoot({ fetchJson, now: NOW }), /REMOTE_HEAD_CHANGED_DURING_READ/);
});
