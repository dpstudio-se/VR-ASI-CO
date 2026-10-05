export type RemoteBootManifest = {
  repository: string;
  branch: string;
  commit: string;
  files: Record<string, string>;
};

export type AgentBootMirrorResult = {
  provenanceGate: "PROVENANCE_MATCH" | "STOP";
  bootGate: "STOP";
  errors: string[];
  promptLayerClaim: string;
  inferenceRuntimeClaim: string;
  receiptId: string | null;
};

const PERSONAS = ["angelica", "emilia", "luna"] as const;
const REQUIRED_FILES = [
  "dna/REMOTE_DNA_STATE.json",
  "persona/SYSTEM_CORE.txt",
  "persona/CONFIG.json",
  "persona/VR_ASI_CO_UNIVERSAL_SYSTEM_PROMPT.md",
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
): AgentBootMirrorResult {
  const provenanceErrors: string[] = [];
  const limitations: string[] = [];
  let receipt: Record<string, unknown> = {};
  try {
    const unwrapped = rawReceipt
      .trim()
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/\s*```$/, "");
    const parsed: unknown = JSON.parse(unwrapped);
    if (!isRecord(parsed)) {
      provenanceErrors.push("Receipt must be a JSON object.");
    } else {
      receipt = parsed;
    }
  } catch {
    provenanceErrors.push("Receipt is not valid JSON.");
  }

  const repository = `${expected.repository}`;
  if (receipt.repository !== repository) {
    provenanceErrors.push("Repository does not match the selected Remote DNA source.");
  }
  if (receipt.branch !== expected.branch) provenanceErrors.push("Branch does not match the pulled branch.");
  if (receipt.commit !== expected.commit) {
    provenanceErrors.push("Commit SHA is stale or does not match the fresh pull.");
  }

  const persona = receipt.persona;
  if (!isPersona(persona)) {
    provenanceErrors.push("Persona must be one of angelica, emilia, or luna.");
  }

  const claimedFiles = receipt.files;
  if (!isRecord(claimedFiles)) {
    provenanceErrors.push("Receipt is missing the file-to-blob-SHA map.");
  } else {
    const selectedPersonaFile = isPersona(persona) ? `persona/${persona}.json` : null;
    const filesToCheck = selectedPersonaFile
      ? [...REQUIRED_FILES, selectedPersonaFile]
      : [...REQUIRED_FILES];
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
  const coreSha = isRecord(claimedFiles) ? claimedFiles["persona/SYSTEM_CORE.txt"] : null;
  const universalPromptSha = isRecord(claimedFiles)
    ? claimedFiles["persona/VR_ASI_CO_UNIVERSAL_SYSTEM_PROMPT.md"]
    : null;
  const personaSha = isRecord(claimedFiles) && isPersona(persona) ? claimedFiles[`persona/${persona}.json`] : null;
  const expectedReceiptId =
    typeof coreSha === "string" &&
    typeof universalPromptSha === "string" &&
    typeof personaSha === "string"
      ? `${expected.commit}:${coreSha}:${universalPromptSha}:${personaSha}`
      : null;
  const receiptId = typeof receipt.receipt_id === "string" ? receipt.receipt_id : null;
  if (expectedReceiptId && receiptId !== expectedReceiptId) {
    provenanceErrors.push(
      "Receipt ID is missing or does not bind the commit, universal system prompt, core, and selected persona blobs.",
    );
  }
  limitations.push(
    promptLayerClaim === "SYSTEM_CONFIRMED"
      ? "System-instruction installation is self-reported and cannot be verified by this app."
      : "System-instruction installation is not confirmed and cannot be verified by this app.",
  );
  limitations.push(
    inferenceRuntimeClaim === "REMOTE_CONFIRMED"
      ? "Remote inference is self-reported and cannot be verified by this app."
      : "Remote inference is not confirmed and cannot be verified by this app.",
  );

  const errors = [...provenanceErrors, ...limitations];
  return {
    provenanceGate: provenanceErrors.length === 0 ? "PROVENANCE_MATCH" : "STOP",
    bootGate: "STOP",
    errors,
    promptLayerClaim,
    inferenceRuntimeClaim,
    receiptId,
  };
}
