import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  verifyAgentBootMirror,
  type RemoteBootManifest,
  type TrustedHostEvidence,
} from "./agent-boot-mirror.ts";

const manifest: RemoteBootManifest = {
  repository: "dpstudio-se/VR-ASI-CO",
  branch: "main",
  commit: "abc123",
  files: {
    "README.md": "readme-blob",
    "dna/REMOTE_DNA_STATE.json": "dna-blob",
    "persona/SYSTEM_CORE.txt": "core-blob",
    "persona/CONFIG.json": "config-blob",
    "persona/VR_ASI_CO_UNIVERSAL_SYSTEM_PROMPT.md": "universal-prompt-blob",
    "docs/ODINOS_COMPATIBILITY_PROFILE.md": "odinos-profile-blob",
    "docs/ODIN_OS_TOTAL_MASTER_MANIFEST_V12_EXTENSION.md": "odinos-manifest-blob",
    "runtime/command-deck.json": "command-deck-blob",
    "persona/angelica.json": "angelica-blob",
    "persona/emilia.json": "emilia-blob",
    "persona/luna.json": "luna-blob",
  },
};

function receiptId(persona = "angelica") {
  return [
    manifest.commit,
    "readme-blob",
    "core-blob",
    "universal-prompt-blob",
    "odinos-manifest-blob",
    `${persona}-blob`,
  ].join(":");
}

function receipt(overrides: Record<string, unknown> = {}) {
  const files = {
    "README.md": "readme-blob",
    "dna/REMOTE_DNA_STATE.json": "dna-blob",
    "persona/SYSTEM_CORE.txt": "core-blob",
    "persona/CONFIG.json": "config-blob",
    "persona/VR_ASI_CO_UNIVERSAL_SYSTEM_PROMPT.md": "universal-prompt-blob",
    "docs/ODINOS_COMPATIBILITY_PROFILE.md": "odinos-profile-blob",
    "docs/ODIN_OS_TOTAL_MASTER_MANIFEST_V12_EXTENSION.md": "odinos-manifest-blob",
    "runtime/command-deck.json": "command-deck-blob",
    "persona/angelica.json": "angelica-blob",
  };
  return JSON.stringify({
    repository: manifest.repository,
    branch: manifest.branch,
    commit: manifest.commit,
    persona: "angelica",
    files,
    prompt_layer: "SYSTEM_CONFIRMED",
    inference_runtime: "REMOTE_CONFIRMED",
    receipt_id: receiptId(),
    ...overrides,
  });
}

function hostEvidence(overrides: Partial<TrustedHostEvidence> = {}): TrustedHostEvidence {
  return {
    source: "HOST_INTEGRATION",
    verified: true,
    repository: manifest.repository,
    branch: manifest.branch,
    commit: manifest.commit,
    receiptId: receiptId(),
    promptInstallation: "SYSTEM_OR_EQUIVALENT",
    runtimeKind: "HOST_NATIVE",
    simulated: false,
    proxied: false,
    ...overrides,
  };
}

describe("Agent boot mirror hard admission", () => {
  it("stays STOP even with perfect provenance when trusted host attestation is absent", () => {
    const result = verifyAgentBootMirror(receipt(), manifest);

    assert.equal(result.provenanceGate, "PROVENANCE_MATCH");
    assert.equal(result.hostGate, "STOP");
    assert.equal(result.bootGate, "STOP");
    assert.equal(result.canContinue, false);
    assert.ok(result.errors.some((error) => error.includes("No trusted host attestation")));
  });

  it("passes only when provenance and trusted host evidence are both bound to the same DNA", () => {
    const result = verifyAgentBootMirror(receipt(), manifest, hostEvidence());

    assert.equal(result.provenanceGate, "PROVENANCE_MATCH");
    assert.equal(result.hostGate, "HOST_VERIFIED");
    assert.equal(result.bootGate, "PASS");
    assert.equal(result.canContinue, true);
  });

  it("rejects stale DNA", () => {
    const result = verifyAgentBootMirror(
      receipt({ commit: "stale" }),
      manifest,
      hostEvidence(),
    );

    assert.equal(result.provenanceGate, "STOP");
    assert.equal(result.bootGate, "STOP");
  });

  it("rejects missing OdinOS/core bindings", () => {
    const files = JSON.parse(receipt()).files as Record<string, string>;
    delete files["docs/ODIN_OS_TOTAL_MASTER_MANIFEST_V12_EXTENSION.md"];

    const result = verifyAgentBootMirror(
      receipt({ files }),
      manifest,
      hostEvidence(),
    );

    assert.equal(result.provenanceGate, "STOP");
    assert.ok(result.errors.some((error) => error.includes("ODIN_OS_TOTAL_MASTER")));
  });

  it("rejects external VM or simulated/proxy evidence", () => {
    const vm = verifyAgentBootMirror(
      receipt(),
      manifest,
      hostEvidence({ runtimeKind: "HOST_NATIVE" as never, simulated: true as never }),
    );
    assert.equal(vm.bootGate, "STOP");

    const proxy = verifyAgentBootMirror(
      receipt(),
      manifest,
      hostEvidence({ proxied: true as never }),
    );
    assert.equal(proxy.bootGate, "STOP");
  });

  it("rejects host evidence bound to a different receipt", () => {
    const result = verifyAgentBootMirror(
      receipt(),
      manifest,
      hostEvidence({ receiptId: "other" }),
    );

    assert.equal(result.hostGate, "STOP");
    assert.equal(result.canContinue, false);
  });

  it("rejects malformed receipts", () => {
    const result = verifyAgentBootMirror("not-json", manifest, hostEvidence());

    assert.equal(result.provenanceGate, "STOP");
    assert.equal(result.bootGate, "STOP");
  });
});
