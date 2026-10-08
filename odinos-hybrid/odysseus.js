/**
 * Standalone transport adapter. The host must already have an authenticated
 * session and a REAL installed persona preset; text prefixes are not prompts.
 * No direct Git/DNA write or host-attestation claims.
 */
export async function askOdysseus(message, face, config) {
  if (!["angelica", "emilia", "luna"].includes(face) ||
      typeof message !== "string" || !message.trim()) {
    return { status: "STOP", reason: "INVALID_PERSONA_OR_MESSAGE" };
  }
  const base = config?.base;
  const presetId = config?.presetIds?.[face];
  if (typeof base !== "string" || !/^https?:\/\/(?:127\.0\.0\.1|localhost)(?::\d+)?$/.test(base) ||
      typeof presetId !== "string" || !/^[a-zA-Z0-9_-]{1,100}$/.test(presetId)) {
    return { status: "STOP", reason: "VERIFIED_ODYSSEUS_PRESET_REQUIRED" };
  }
  // Session identity must be provisioned/bound by the trusted operator host.
  // Never share a deterministic session ID between different visitors.
  const session = config?.sessionId;
  if (typeof session !== "string" ||
      !/^vr-asi-co-(?:angelica|emilia|luna)-[0-9a-f-]{36}$/.test(session) ||
      !session.startsWith("vr-asi-co-" + face + "-")) {
    return { status: "STOP", reason: "BOUND_SESSION_ID_REQUIRED" };
  }
  try {
    const response = await fetch(base + "/api/chat", {
      method: "POST", credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ message, preset_id: presetId, session }),
    });
    if (!response.ok) return { status: "STOP", reason: "HTTP_" + response.status };
    return { status: "DER", response: await response.json(), hostPromptVerified: false };
  } catch {
    return { status: "STOP", reason: "ODYSSEUS_UNAVAILABLE" };
  }
}
