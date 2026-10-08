/**
 * Remote multi-LLM consent handoff. Reuses the established, Git-blob-verified
 * boot reader; never declares a model or host "taken over" by a web page.
 *
 * A prepared reference prompt is NOT a system prompt installation.
 * Provider-specific installation, readback and signed inference attestation
 * remain separate host responsibilities (docs/BOOT_EVIDENCE_CHECK.md).
 */
import { createHash } from "node:crypto";
import { ADMISSION_FILES, readRemoteBoot } from "../../../scripts/verify-boot-evidence.mjs";

export const REMOTE_PERSONAS = Object.freeze(["angelica", "emilia", "luna"]);
export const REMOTE_REPO = "dpstudio-se/VR-ASI-CO";
const SHA40 = /^[a-f0-9]{40}$/;

export async function prepareRemoteOffer({
  accepted = false,
  persona = "angelica",
  readBoot = readRemoteBoot,
} = {}) {
  // Do not access GitHub or disclose a prompt until the visitor explicitly opts in.
  if (accepted !== true) {
    return { status: "CONSENT_REQUIRED", canUseProvider: false, hostAdmission: "STOP" };
  }
  if (!REMOTE_PERSONAS.includes(persona)) {
    return { status: "STOP", reason: "INVALID_PERSONA", canUseProvider: false, hostAdmission: "STOP" };
  }
  try {
    const snapshot = await readBoot({ persona });
    const paths = [...ADMISSION_FILES, "persona/" + persona + ".json"];
    const valid = snapshot?.repository === REMOTE_REPO &&
      snapshot?.branch === "main" &&
      snapshot?.persona === persona &&
      SHA40.test(snapshot?.commit ?? "") &&
      typeof snapshot?.promptSha256 === "string" &&
      /^[a-f0-9]{64}$/.test(snapshot.promptSha256) &&
      paths.every((path) =>
        SHA40.test(snapshot?.files?.[path] ?? "") &&
        typeof snapshot?.sources?.[path]?.content === "string" &&
        snapshot.sources[path].gitBlobSha === snapshot.files[path]);
    if (!valid) throw new Error("INVALID_VERIFIED_BOOT_SNAPSHOT");
    // This is precisely the composition used by the signed boot-evidence
    // verifier, not a parallel / self-declared persona-system prompt.
    const prompt = paths.map((path) =>
      "[VR-ASI-CO source: " + path + "]\n" + snapshot.sources[path].content).join("\n\n");
    if (prompt.length > 1024 * 1024) throw new Error("PROMPT_TOO_LARGE");
    const computedPromptSha256 = createHash("sha256").update(prompt, "utf8").digest("hex");
    if (computedPromptSha256 !== snapshot.promptSha256) {
      throw new Error("PROMPT_HASH_MISMATCH");
    }
    return {
      status: "REFERENCE_ONLY",
      repository: snapshot.repository,
      branch: snapshot.branch,
      commit: snapshot.commit,
      persona: snapshot.persona,
      receiptId: snapshot.receiptId,
      promptSha256: snapshot.promptSha256,
      files: Object.fromEntries(paths.map((path) => [path, snapshot.files[path]])),
      // User-accepted export intended for installation by an authorized host.
      prompt,
      hostAdmission: "STOP",
      providerModel: null,
      hostPromptInstalled: false,
      hostInferencePerformed: false,
      dnaWritePerformed: false,
      canUseProvider: false,
      // A server may present this as a portable handoff, not proof of takeover.
      next: "INSTALL_WITH_TRUSTED_PROVIDER_ADAPTER_AND_VERIFY_SIGNED_BOOT_EVIDENCE",
    };
  } catch {
    return {
      status: "STOP", reason: "VERIFIED_REMOTE_SOURCE_UNAVAILABLE",
      hostAdmission: "STOP", canUseProvider: false,
      hostPromptInstalled: false, hostInferencePerformed: false, dnaWritePerformed: false,
    };
  }
}
