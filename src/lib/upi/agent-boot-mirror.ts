export type RemoteBootManifest = {
  repository: string;
  branch: string;
  commit: string;
  files: Record<string, string>;
};

export type TrustedHostEvidence = {
  source: "HOST_INTEGRATION";
  verified: true;
  repository: string;
  branch: string;
  commit: string;
  receiptId: string;
  promptInstallation: "SYSTEM_OR_EQUIVALENT";
  runtimeKind: "HOST_NATIVE";
  simulated: false;
  proxied: false;
};

export type AgentBootMirrorResult = {
  provenanceGate: "PROVENANCE_MATCH" | "STOP";
  hostGate: "HOST_VERIFIED" | "STOP";
  bootGate: "PASS" | "STOP";
  canContinue: boolean;
  errors: string[];
  promptLayerClaim: string;
  inferenceRuntimeClaim: string;
  receiptId: string | null;
};

const PERSONAS = ["angelica", "emilia", "luna"] as const;
const REQUIRED_FILES = [
  "README.md",
  "dna/REMOTE_DNA_STATE.json",
  "persona/SYSTEM_CORE.txt",
  "persona/CONFIG.json",
  "persona/VR_ASI_CO_UNIVERSAL_SYSTEM_PROMPT.md",
  "docs/ODINOS_COMPATIBILITY_PROFILE.md",
  "docs/ODIN_OS_TOTAL_MASTER_MANIFEST_V12_EXTENSION.md",
  "runtime/command-deck.json",
] as const;

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isPersona(value: unknown): value is (typeof PERSONAS)[number] {
  return typeof value === "string" && PERSONAS.some((persona) => persona === value);
}

export function verifyAgentBootMirror(
  rawReceipt: string,
  expected: RemoteBootManifest,
  trustedHostEvidence?: TrustedHostEvidence | null,
): AgentBootMirrorResult {
  const provenanceErrors: string[] = [];
  const hostErrors: string[] = [];
  let receipt: Record<string, unknown> = {};

  try {
    const unwrapped = rawReceipt
      .trim()
      .replace(/^\`\`\`(?:json)?\s*/i, "")
      .replace(/\s*\`\`\`$/, "");
    const parsed: unknown = JSON.parse(unwrapped);
    if (!isRecord(parsed)) provenanceErrors.push("Receipt must be a JSON object.");
    else receipt = parsed;
  } catch {
    provenanceErrors.push("Receipt is not valid JSON.");
  }

  if (receipt.repository !== expected.repository) {
    provenanceErrors.push("Repository does not match canonical VR-ASI-CO DNA.");
  }
  if (receipt.branch !== expected.branch) {
    provenanceErrors.push("Branch does not match the fresh DNA pull.");
  }
  if (receipt.commit !== expected.commit) {
    provenanceErrors.push("Commit SHA is stale or does not match the fresh DNA pull.");
  }

  const persona = receipt.persona;
  if (!isPersona(persona)) {
    provenanceErrors.push("Persona must be one of angelica, emilia, or luna.");
  }

  const claimedFiles = receipt.files;
  const selectedPersonaFile = isPersona(persona) ? `persona/${persona}.json` : null;
  const filesToCheck = selectedPersonaFile
    ? [...REQUIRED_FILES, selectedPersonaFile]
    : [...REQUIRED_FILES];

  if (!isRecord(claimedFiles)) {
    provenanceErrors.push("Receipt is missing the file-to-blob-SHA map.");
  } else {
    for (const path of filesToCheck) {
      const expectedSha = expected.files[path];
      if (!expectedSha) {
        provenanceErrors.push(`Fresh pull did not provide a blob SHA for ${path}.`);
      } else if (claimedFiles[path] !== expectedSha) {
        provenanceErrors.push(`Blob SHA mismatch for ${path}.`);
      }
    }
  }

  const promptLayerClaim =
    typeof receipt.prompt_layer === "string" ? receipt.prompt_layer : "UNVERIFIED";
  const inferenceRuntimeClaim =
    typeof receipt.inference_runtime === "string" ? receipt.inference_runtime : "UNVERIFIED";

  const readmeSha = isRecord(claimedFiles) ? claimedFiles["README.md"] : null;
  const coreSha = isRecord(claimedFiles) ? claimedFiles["persona/SYSTEM_CORE.txt"] : null;
  const universalPromptSha = isRecord(claimedFiles)
    ? claimedFiles["persona/VR_ASI_CO_UNIVERSAL_SYSTEM_PROMPT.md"]
    : null;
  const odinSha = isRecord(claimedFiles)
    ? claimedFiles["docs/ODIN_OS_TOTAL_MASTER_MANIFEST_V12_EXTENSION.md"]
    : null;
  const personaSha =
    isRecord(claimedFiles) && isPersona(persona)
      ? claimedFiles[`persona/${persona}.json`]
      : null;

  const expectedReceiptId =
    typeof readmeSha === "string" &&
    typeof coreSha === "string" &&
    typeof universalPromptSha === "string" &&
    typeof odinSha === "string" &&
    typeof personaSha === "string"
      ? `${expected.commit}:${readmeSha}:${coreSha}:${universalPromptSha}:${odinSha}:${personaSha}`
      : null;

  const receiptId = typeof receipt.receipt_id === "string" ? receipt.receipt_id : null;
  if (expectedReceiptId && receiptId !== expectedReceiptId) {
    provenanceErrors.push(
      "Receipt ID does not bind commit + README DNA prompt + system core + universal prompt + OdinOS manifest + selected persona.",
    );
  }

  if (!trustedHostEvidence) {
    hostErrors.push(
      "No trusted host attestation. Self-reported prompt/runtime fields are not accepted as proof.",
    );
  } else {
    if (trustedHostEvidence.source !== "HOST_INTEGRATION" || trustedHostEvidence.verified !== true) {
      hostErrors.push("Host evidence was not issued by a trusted host integration.");
    }
    if (
      trustedHostEvidence.repository !== expected.repository ||
      trustedHostEvidence.branch !== expected.branch ||
      trustedHostEvidence.commit !== expected.commit
    ) {
      hostErrors.push("Host attestation is not bound to the current canonical DNA commit.");
    }
    if (trustedHostEvidence.receiptId !== expectedReceiptId) {
      hostErrors.push("Host attestation is not bound to the verified boot receipt.");
    }
    if (trustedHostEvidence.promptInstallation !== "SYSTEM_OR_EQUIVALENT") {
      hostErrors.push("Host did not attest that VR-ASI-CO core was installed at system-equivalent priority.");
    }
    if (trustedHostEvidence.runtimeKind !== "HOST_NATIVE") {
      hostErrors.push("External VM/emulator runtime is not admitted as canonical VR-ASI-CO runtime.");
    }
    if (trustedHostEvidence.simulated !== false) {
      hostErrors.push("Simulated runtime is not admitted.");
    }
    if (trustedHostEvidence.proxied !== false) {
      hostErrors.push("Proxy-only runtime evidence is not admitted.");
    }
  }

  const provenanceGate = provenanceErrors.length === 0 ? "PROVENANCE_MATCH" : "STOP";
  const hostGate = hostErrors.length === 0 ? "HOST_VERIFIED" : "STOP";
  const canContinue = provenanceGate === "PROVENANCE_MATCH" && hostGate === "HOST_VERIFIED";

  return {
    provenanceGate,
    hostGate,
    bootGate: canContinue ? "PASS" : "STOP",
    canContinue,
    errors: [...provenanceErrors, ...hostErrors],
    promptLayerClaim,
    inferenceRuntimeClaim,
    receiptId,
  };
}
