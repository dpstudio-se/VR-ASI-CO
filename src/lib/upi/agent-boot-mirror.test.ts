import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { verifyAgentBootMirror, type RemoteBootManifest } from "./agent-boot-mirror.ts";

const manifest: RemoteBootManifest = {
  repository: "dpstudio-se/upi-built-by-agi-teax-main",
  branch: "main",
  commit: "abc123",
  files: {
    "dna/REMOTE_DNA_STATE.json": "dna-blob",
    "persona/SYSTEM_CORE.txt": "core-blob",
    "persona/CONFIG.json": "config-blob",
    "persona/VR_ASI_CO_UNIVERSAL_SYSTEM_PROMPT.md": "universal-prompt-blob",
    "persona/angelica.json": "angelica-blob",
    "persona/emilia.json": "emilia-blob",
    "persona/luna.json": "luna-blob",
  },
};

function receipt(overrides: Record<string, unknown> = {}) {
  const files = {
    "dna/REMOTE_DNA_STATE.json": "dna-blob",
    "persona/SYSTEM_CORE.txt": "core-blob",
    "persona/CONFIG.json": "config-blob",
    "persona/VR_ASI_CO_UNIVERSAL_SYSTEM_PROMPT.md": "universal-prompt-blob",
    "persona/angelica.json": "angelica-blob",
  };
  return JSON.stringify({
    repository: manifest.repository,
    branch: manifest.branch,
    commit: manifest.commit,
    persona: "angelica",
    files,
    prompt_layer: "UNVERIFIED",
    inference_runtime: "UNVERIFIED",
    receipt_id: `${manifest.commit}:${files["persona/SYSTEM_CORE.txt"]}:${files["persona/VR_ASI_CO_UNIVERSAL_SYSTEM_PROMPT.md"]}:${files["persona/angelica.json"]}`,
    ...overrides,
  });
}

describe("Agent boot mirror", () => {
  it("matches source provenance while keeping host claims explicitly unverified", () => {
    const result = verifyAgentBootMirror(receipt(), manifest);

    assert.equal(result.provenanceGate, "PROVENANCE_MATCH");
    assert.equal(result.bootGate, "STOP");
    assert.equal(result.promptLayerClaim, "UNVERIFIED");
    assert.equal(result.inferenceRuntimeClaim, "UNVERIFIED");
    assert.ok(result.errors.some((error) => error.includes("cannot be verified by this app")));
    assert.equal(
      result.receiptId,
      "abc123:core-blob:universal-prompt-blob:angelica-blob",
    );
  });

  it("does not treat host self-reports as proof that the prompt or inference is remote", () => {
    const result = verifyAgentBootMirror(
      receipt({
        prompt_layer: "SYSTEM_CONFIRMED",
        inference_runtime: "REMOTE_CONFIRMED",
      }),
      manifest,
    );

    assert.equal(result.provenanceGate, "PROVENANCE_MATCH");
    assert.equal(result.bootGate, "STOP");
    assert.ok(
      result.errors.some((error) =>
        error.includes("System-instruction installation is self-reported"),
      ),
    );
    assert.ok(
      result.errors.some((error) => error.includes("Remote inference is self-reported")),
    );
  });

  it("stops on a stale commit", () => {
    const result = verifyAgentBootMirror(receipt({ commit: "stale" }), manifest);

    assert.equal(result.provenanceGate, "STOP");
    assert.ok(result.errors.some((error) => error.includes("Commit SHA is stale")));
  });

  it("stops when selected persona blobs do not match the fresh pull", () => {
    const result = verifyAgentBootMirror(receipt({ persona: "emilia" }), manifest);

    assert.equal(result.provenanceGate, "STOP");
    assert.ok(result.errors.some((error) => error.includes("persona/emilia.json")));
  });

  it("stops when a receipt reports a different file blob SHA", () => {
    const files = {
      "dna/REMOTE_DNA_STATE.json": "wrong-blob",
      "persona/SYSTEM_CORE.txt": "core-blob",
      "persona/CONFIG.json": "config-blob",
      "persona/VR_ASI_CO_UNIVERSAL_SYSTEM_PROMPT.md": "universal-prompt-blob",
      "persona/angelica.json": "angelica-blob",
    };
    const result = verifyAgentBootMirror(receipt({ files }), manifest);

    assert.equal(result.provenanceGate, "STOP");
    assert.ok(
      result.errors.some((error) =>
        error.includes("Blob SHA mismatch for dna/REMOTE_DNA_STATE.json"),
      ),
    );
  });

  it("stops when the universal system prompt blob does not match", () => {
    const files = {
      "dna/REMOTE_DNA_STATE.json": "dna-blob",
      "persona/SYSTEM_CORE.txt": "core-blob",
      "persona/CONFIG.json": "config-blob",
      "persona/VR_ASI_CO_UNIVERSAL_SYSTEM_PROMPT.md": "stale-prompt-blob",
      "persona/angelica.json": "angelica-blob",
    };
    const result = verifyAgentBootMirror(receipt({ files }), manifest);

    assert.equal(result.provenanceGate, "STOP");
    assert.ok(
      result.errors.some((error) =>
        error.includes("Blob SHA mismatch for persona/VR_ASI_CO_UNIVERSAL_SYSTEM_PROMPT.md"),
      ),
    );
  });

  it("stops on malformed receipts", () => {
    const result = verifyAgentBootMirror("not-json", manifest);

    assert.equal(result.provenanceGate, "STOP");
    assert.ok(result.errors.includes("Receipt is not valid JSON."));
  });
});
