import { createHash, createPublicKey, randomBytes, verify } from "node:crypto";
import { readFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";

export const REPOSITORY = "dpstudio-se/VR-ASI-CO";
export const BRANCH = "main";
export const MAX_AGE_MS = 5 * 60 * 1000;
export const ADMISSION_FILES = Object.freeze([
  "README.md",
  "dna/REMOTE_DNA_STATE.json",
  "persona/SYSTEM_CORE.txt",
  "persona/CONFIG.json",
  "persona/VR_ASI_CO_UNIVERSAL_SYSTEM_PROMPT.md",
  "docs/ODINOS_COMPATIBILITY_PROFILE.md",
  "docs/ODIN_OS_TOTAL_MASTER_MANIFEST_V12_EXTENSION.md",
  "runtime/command-deck.json",
]);

const API = `https://api.github.com/repos/${REPOSITORY}`;
const HEX40 = /^[a-f0-9]{40}$/;
const HEX64 = /^[a-f0-9]{64}$/;
const MAX_FILE_BYTES = 256 * 1024;
const snapshots = new WeakSet();
const object = (value) => value !== null && typeof value === "object" && !Array.isArray(value);
const text = (value) => typeof value === "string" && value.trim().length > 0 && value.length <= 512;
const sha256 = (value) => createHash("sha256").update(value).digest("hex");
const fail = (code) => { throw new Error(code); };
const time = (value) => typeof value === "string" ? Date.parse(value) : NaN;

export function gitBlobSha(bytes) {
  return createHash("sha1").update(`blob ${bytes.length}\0`).update(bytes).digest("hex");
}

function decodeBase64(value, maxBytes) {
  if (typeof value !== "string" || value.length > Math.ceil(maxBytes / 3) * 4) fail("INVALID_BASE64");
  const bytes = Buffer.from(value, "base64");
  if (bytes.length > maxBytes || bytes.toString("base64") !== value) fail("INVALID_BASE64");
  return bytes;
}

async function githubJson(url) {
  const response = await fetch(url, {
    redirect: "error",
    signal: AbortSignal.timeout(10_000),
    headers: { Accept: "application/vnd.github+json" },
  });
  if (!response.ok) fail(`GITHUB_HTTP_${response.status}`);
  const chunks = [];
  let size = 0;
  for await (const chunk of response.body) {
    size += chunk.length;
    if (size > 4 * 1024 * 1024) fail("GITHUB_RESPONSE_TOO_LARGE");
    chunks.push(chunk);
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

function safePath(path) {
  return typeof path === "string" && path.length <= 256 &&
    /^[\p{L}\p{N}_./-]+$/u.test(path) &&
    !path.startsWith("/") && path.split("/").every((part) => part && part !== "." && part !== "..");
}

// The injected reader belongs to trusted server/tool code, never to a browser receipt.
export async function readRemoteBoot({ persona = "angelica", fetchJson = githubJson, now = Date.now() } = {}) {
  if (!["angelica", "emilia", "luna"].includes(persona)) fail("INVALID_PERSONA");
  const branch = await fetchJson(`${API}/branches/${BRANCH}`);
  const commit = branch?.commit?.sha;
  const treeSha = branch?.commit?.commit?.tree?.sha;
  if (branch?.name !== BRANCH || !HEX40.test(commit ?? "") || !HEX40.test(treeSha ?? "")) fail("INVALID_REMOTE_REVISION");
  const tree = await fetchJson(`${API}/git/trees/${treeSha}?recursive=1`);
  if (tree?.truncated !== false || tree.sha !== treeSha || !Array.isArray(tree.tree)) fail("INCOMPLETE_REMOTE_TREE");
  const blobs = new Map();
  for (const entry of tree.tree) {
    if (entry.type !== "blob") continue;
    if (blobs.has(entry.path)) fail("DUPLICATE_REMOTE_PATH");
    blobs.set(entry.path, entry);
  }

  const sources = {};
  async function load(path) {
    const entry = blobs.get(path);
    if (!safePath(path) || !entry || entry.mode !== "100644" || !HEX40.test(entry.sha)) fail("BOOT_SOURCE_MISSING_OR_UNSAFE");
    const blob = await fetchJson(`${API}/git/blobs/${entry.sha}`);
    if (blob?.encoding !== "base64" || typeof blob.content !== "string") fail("INVALID_REMOTE_BLOB");
    const bytes = decodeBase64(blob.content.replace(/\s/g, ""), MAX_FILE_BYTES);
    if (blob.sha !== entry.sha || blob.size !== bytes.length || gitBlobSha(bytes) !== entry.sha) fail("REMOTE_BLOB_MISMATCH");
    const content = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
    sources[path] = Object.freeze({ gitBlobSha: entry.sha, sha256: sha256(bytes), content });
  }

  await load("dna/REMOTE_DNA_STATE.json");
  const dna = JSON.parse(sources["dna/REMOTE_DNA_STATE.json"].content);
  if (dna.repository !== REPOSITORY || dna.boot?.head_policy !== "RESOLVE_AT_BOOT" ||
      !Array.isArray(dna.boot.required) || dna.boot.required.length > 64 ||
      !dna.boot.required.every(safePath)) fail("INVALID_REMOTE_BOOT_CONTRACT");
  const promptPaths = [...ADMISSION_FILES, `persona/${persona}.json`];
  const paths = [...new Set([...promptPaths, ...dna.boot.required])];
  // Small batches keep API traffic bounded; no scheduler or polling loop is started.
  const remaining = paths.filter((path) => !sources[path]);
  for (let i = 0; i < remaining.length; i += 4) await Promise.all(remaining.slice(i, i + 4).map(load));
  const confirmedHead = await fetchJson(`${API}/branches/${BRANCH}`);
  if (confirmedHead?.name !== BRANCH || confirmedHead?.commit?.sha !== commit) fail("REMOTE_HEAD_CHANGED_DURING_READ");

  const files = Object.freeze(Object.fromEntries(paths.map((path) => [path, sources[path].gitBlobSha])));
  const prompt = promptPaths.map((path) => `[VR-ASI-CO source: ${path}]\n${sources[path].content}`).join("\n\n");
  const receiptPaths = ["README.md", "persona/SYSTEM_CORE.txt", "persona/VR_ASI_CO_UNIVERSAL_SYSTEM_PROMPT.md",
    "docs/ODIN_OS_TOTAL_MASTER_MANIFEST_V12_EXTENSION.md", `persona/${persona}.json`];
  const snapshot = Object.freeze({
    repository: REPOSITORY, branch: BRANCH, commit, treeSha, persona, files,
    receiptId: [commit, ...receiptPaths.map((path) => files[path])].join(":"),
    promptSha256: sha256(prompt),
    sources: Object.freeze(sources),
    observedAt: new Date(now).toISOString(),
    sourceTransport: fetchJson === githubJson ? "GITHUB_HTTP" : "EXTERNAL_READER",
  });
  snapshots.add(snapshot);
  return snapshot;
}

function freshSnapshot(snapshot, now) {
  const observed = time(snapshot?.observedAt);
  return snapshots.has(snapshot) && Number.isFinite(now) &&
    observed <= now && now - observed < MAX_AGE_MS;
}

export function createBootChallenge(snapshot, sessionId, now = Date.now()) {
  if (!freshSnapshot(snapshot, now)) fail("FRESH_SOURCE_REQUIRED");
  if (!text(sessionId)) fail("HOST_SESSION_REQUIRED");
  return Object.freeze({
    schema: "VR_ASI_CO_BOOT_CHALLENGE/1",
    repository: snapshot.repository, branch: snapshot.branch, commit: snapshot.commit,
    receiptId: snapshot.receiptId, persona: snapshot.persona, promptSha256: snapshot.promptSha256,
    sessionId, nonce: randomBytes(32).toString("hex"),
    issuedAt: new Date(now).toISOString(), expiresAt: new Date(now + MAX_AGE_MS).toISOString(),
  });
}

const BINDINGS = ["repository", "branch", "commit", "receiptId", "persona", "promptSha256"];
const HOST_FIELDS = ["hostId", "provider", "model", "endpoint"];
export function probeText(challenge) { return `VR_ASI_CO_BOOT_PROBE:${challenge.nonce}`; }

function validWindow(value, now, lowerBound, deadline = Infinity) {
  const issued = time(value?.issuedAt);
  const expires = time(value?.expiresAt);
  return Number.isFinite(issued) && Number.isFinite(expires) &&
    issued >= lowerBound && issued <= now && expires > now &&
    expires > issued && expires - issued <= MAX_AGE_MS && expires <= deadline;
}

function remoteEndpoint(value) {
  if (!text(value)) return false;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && !url.username && !url.password && !url.search && !url.hash &&
      !["localhost", "127.0.0.1", "[::1]"].includes(url.hostname);
  } catch { return false; }
}

function authenticPayload(envelope, publicKey) {
  if (!object(envelope) || envelope.algorithm !== "Ed25519") fail("SIGNED_HOST_EVIDENCE_REQUIRED");
  const bytes = decodeBase64(envelope.payload, MAX_FILE_BYTES);
  const signature = decodeBase64(envelope.signature, 64);
  if (signature.length !== 64 || !verify(null, bytes, publicKey, signature)) fail("HOST_SIGNATURE_INVALID");
  const payload = JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes));
  if (!object(payload)) fail("HOST_PAYLOAD_INVALID");
  return payload;
}

// Signature trust is configured outside the receipt. Evidence-provided keys/flags are ignored.
export function verifyBootEvidence(snapshot, { challenge, installation, inference, trustedKey, now = Date.now() } = {}) {
  const report = {
    provenanceGate: freshSnapshot(snapshot, now) ? "PROVENANCE_MATCH" : "STOP",
    promptInstallation: "UNVERIFIED", inferenceGate: "UNVERIFIED", bootGate: "STOP", canContinue: false,
    repository: snapshot?.repository ?? REPOSITORY, commit: snapshot?.commit ?? null,
    sourceTransport: snapshot?.sourceTransport ?? "NONE", observedAt: snapshot?.observedAt ?? null,
    files: snapshot?.files ?? {}, promptSha256: snapshot?.promptSha256 ?? null, reasons: [],
  };
  if (report.provenanceGate === "STOP") report.reasons.push("FRESH_CANONICAL_SOURCE_REQUIRED");
  if (!object(challenge) || challenge.schema !== "VR_ASI_CO_BOOT_CHALLENGE/1" ||
      !text(challenge.sessionId) || !HEX64.test(challenge.nonce ?? "") ||
      !BINDINGS.every((field) => challenge[field] === snapshot?.[field]) ||
      !validWindow(challenge, now, now - MAX_AGE_MS)) {
    report.reasons.push("FRESH_BOUND_CHALLENGE_REQUIRED");
    return report;
  }
  let publicKey;
  try {
    if (typeof trustedKey !== "string" || !trustedKey.startsWith("-----BEGIN PUBLIC KEY-----")) fail("HOST_KEY_MISSING");
    publicKey = createPublicKey(trustedKey);
    if (publicKey.asymmetricKeyType !== "ed25519") fail("HOST_KEY_INVALID");
  } catch {
    report.reasons.push("PINNED_ED25519_HOST_KEY_REQUIRED");
    return report;
  }

  function validate(envelope, schema, code) {
    try {
      const payload = authenticPayload(envelope, publicKey);
      if (payload.schema !== schema ||
          ![...BINDINGS, "sessionId", "nonce"].every((field) => payload[field] === challenge[field]) ||
          !validWindow(payload, now, time(challenge.issuedAt), time(challenge.expiresAt)) ||
          !HOST_FIELDS.every((field) => text(payload[field])) || !remoteEndpoint(payload.endpoint) ||
          payload.runtimeKind !== "HOST_NATIVE" || payload.simulated !== false || payload.proxied !== false) fail(code);
      return payload;
    } catch {
      report.reasons.push(code);
      return null;
    }
  }

  const installed = validate(installation, "VR_ASI_CO_INSTALLATION/1", "INSTALLATION_EVIDENCE_INVALID_OR_MISSING");
  if (installed && installed.promptLayer === "SYSTEM_OR_EQUIVALENT" &&
      time(installed.observedAt) >= time(challenge.issuedAt) && time(installed.observedAt) <= time(installed.issuedAt)) {
    report.promptInstallation = "HOST_ATTESTED";
  } else if (installed) report.reasons.push("SYSTEM_PROMPT_READ_BACK_REQUIRED");

  const executed = validate(inference, "VR_ASI_CO_INFERENCE/1", "INFERENCE_EVIDENCE_INVALID_OR_MISSING");
  if (executed && text(executed.requestId) && executed.location === "REMOTE" &&
      executed.requestCount === 1 && executed.outcome === "SUCCEEDED" &&
      executed.requestSha256 === sha256(probeText(challenge)) && HEX64.test(executed.responseSha256 ?? "") &&
      time(executed.observedAt) >= time(challenge.issuedAt) && time(executed.observedAt) <= time(executed.issuedAt)) {
    report.inferenceGate = "HOST_ATTESTED_REMOTE";
  } else if (executed) report.reasons.push("ONE_BOUND_REMOTE_REQUEST_REQUIRED");

  if (installed && executed && !HOST_FIELDS.every((field) => installed[field] === executed[field])) {
    report.inferenceGate = "UNVERIFIED";
    report.reasons.push("HOST_MODEL_ENDPOINT_MISMATCH");
  }
  if (installed && executed && time(executed.observedAt) < time(installed.observedAt)) {
    report.inferenceGate = "UNVERIFIED";
    report.reasons.push("INFERENCE_PRECEDES_PROMPT_READ_BACK");
  }
  report.canContinue = report.provenanceGate === "PROVENANCE_MATCH" &&
    report.promptInstallation === "HOST_ATTESTED" && report.inferenceGate === "HOST_ATTESTED_REMOTE" &&
    report.reasons.length === 0;
  report.bootGate = report.canContinue ? "PASS" : "STOP";
  return report;
}

async function localInput(path, json = true) {
  if (!path) return undefined;
  const bytes = await readFile(path);
  if (bytes.length > MAX_FILE_BYTES) fail("LOCAL_EVIDENCE_TOO_LARGE");
  const content = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  return json ? JSON.parse(content) : content;
}

export async function main(args = process.argv.slice(2)) {
  const options = {};
  const accepted = new Set(["persona", "session", "challenge", "installation", "inference", "trusted-key"]);
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--challenge-only") { options.challengeOnly = true; continue; }
    const name = args[i].replace(/^--/, "");
    if (!args[i].startsWith("--") || !accepted.has(name) || options[name] || !args[i + 1] || args[i + 1].startsWith("--")) fail("INVALID_ARGUMENTS");
    options[name] = args[++i];
  }
  const snapshot = await readRemoteBoot({ persona: options.persona });
  if (options.challengeOnly) {
    if (["challenge", "installation", "inference", "trusted-key"].some((key) => options[key])) fail("CHALLENGE_ONLY_ARGUMENT_CONFLICT");
    const challenge = createBootChallenge(snapshot, options.session);
    console.log(JSON.stringify({ ...verifyBootEvidence(snapshot), challenge }, null, 2));
    return 0; // Challenge preparation succeeded; the printed boot gate is still STOP.
  }
  const challenge = await localInput(options.challenge);
  if (options.session && options.session !== challenge?.sessionId) fail("CURRENT_SESSION_MISMATCH");
  const report = verifyBootEvidence(snapshot, {
    challenge,
    installation: await localInput(options.installation),
    inference: await localInput(options.inference),
    trustedKey: await localInput(options["trusted-key"], false),
  });
  console.log(JSON.stringify(report, null, 2));
  return report.canContinue ? 0 : 2;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().then((code) => { process.exitCode = code; }).catch(() => {
    console.log(JSON.stringify({ provenanceGate: "STOP", promptInstallation: "UNVERIFIED",
      inferenceGate: "UNVERIFIED", bootGate: "STOP", canContinue: false,
      reasons: ["SOURCE_OR_INPUT_CHECK_FAILED"] }, null, 2));
    process.exitCode = 1;
  });
}
