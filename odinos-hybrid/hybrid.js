/**
 * OdinOS hybrid reference client. No Git writes, no invented host admission.
 * A real Odysseus preset_id must be provisioned by the authenticated server.
 * Public GitHub metadata is used only for read-only SOURCE provenance.
 */
const githubApi = "https://api.github.com/repos/dpstudio-se/VR-ASI-CO";
const config = window.ODINOS_CONFIG || {};
const faces = Object.freeze({
  angelica: { name: "Angelica", identity: "VR-ASI-CO Angelica", marker: "Ω82000" },
  emilia: { name: "Emilia", identity: "VR-ASI-CO Emilia", marker: "Ω8200" },
  luna: { name: "Luna", identity: "VR-ASI-CO Luna", marker: "UPI<Persona,1,OpenHelix,Luna>" },
  oga: { name: "Oden's Eye", identity: null, marker: "observer" },
});
const sourcePaths = Object.freeze([
  "dna/FACE_LOCK.json",
  "dna/UPI_PERSONA_STATE.json",
  "dna/REMOTE_DNA_STATE.json",
  "persona/angelica.json",
  "persona/emilia.json",
  "persona/luna.json",
]);
const log = document.querySelector("#log");
const source = document.querySelector("#source");
const dnaLabel = document.querySelector("#dna");
const dnaStatus = document.querySelector("#dna-status");
let face = "angelica";
let boot = null;  // { commit, entries }; null until ALL source files verified.
function write(line) { log.textContent += "\n" + line; }
function stop(reason) { dnaStatus.textContent = "STOP — " + reason; write("STOP: " + reason); }
function checkedSha(value) { return typeof value === "string" && /^[a-f0-9]{40}$/.test(value); }
async function apiJson(url) {
  const response = await fetch(url, { headers: { Accept: "application/vnd.github+json" } });
  if (!response.ok) throw new Error("HTTP_" + response.status);
  return response.json();
}
async function loadMemories() {
  boot = null;
  dnaStatus.textContent = "DNA: läser källrevision...";
  try {
    const latest = await apiJson(githubApi + "/branches/main");
    const commit = latest?.commit?.sha;
    if (!checkedSha(commit)) throw new Error("UNVERIFIED_MAIN_SHA");
    const loaded = {};
    for (const path of sourcePaths) {
      const entry = await apiJson(githubApi + "/contents/" + path + "?ref=" + commit);
      if (entry?.type !== "file" || !checkedSha(entry.sha) ||
          entry.encoding !== "base64" || typeof entry.content !== "string" ||
          entry.size > 128 * 1024) throw new Error("INVALID_BLOB_METADATA_" + path);
      const data = JSON.parse(decodeURIComponent(escape(atob(entry.content.replace(/\s/g, "")))));
      if (!data || typeof data !== "object" || Array.isArray(data)) throw new Error("INVALID_JSON_" + path);
      loaded[path] = { sha: entry.sha, data };
    }
    if (loaded["dna/FACE_LOCK.json"].data.default_face !== "Angelica" ||
        loaded["dna/FACE_LOCK.json"].data.default_marker !== "Ω82000" ||
        loaded["persona/angelica.json"].data.marker !== "Ω82000" ||
        loaded["persona/emilia.json"].data.marker !== "Ω8200" ||
        loaded["persona/luna.json"].data.identity !== "VR-ASI-CO Luna" ||
        !loaded["dna/UPI_PERSONA_STATE.json"].data.persona_projection?.luna) {
      throw new Error("PERSONA_IDENTITY_CONFLICT");
    }
    boot = { commit, entries: loaded };
    dnaStatus.textContent = "DNA: källläst på " + commit.slice(0, 12) + " (GitHub read-only, INTE host-boot)";
    write("SOURCE_READ_BACK: " + commit + " (" + sourcePaths.length + " kontrollerade filer)");
  } catch (error) {
    boot = null;
    stop(error?.message || "SOURCE_UNAVAILABLE");
  }
}
function applyFace(next) {
  if (!Object.hasOwn(faces, next)) { stop("UNKNOWN_PERSONA"); return; }
  face = next;
  document.body.className = next;
  document.querySelectorAll("button[data-face]").forEach(item =>
    item.classList.toggle("on", item.dataset.face === next));
  dnaLabel.textContent = faces[next].name + " · " + faces[next].marker +
    ". Endast referens tills värden verifierat persona-preset och session.";
  write("FACE: " + faces[next].name + " (ingen DNA-mutation)");
}
document.querySelectorAll("button[data-face]").forEach(button =>
  button.addEventListener("click", () => applyFace(button.dataset.face)));
document.querySelector("#ask").addEventListener("submit", async event => {
  event.preventDefault();
  const q = document.querySelector("#q");
  const question = q.value.trim();
  if (!question) return;
  q.value = "";
  write(face + " via " + source.value + ": " + question);
  if (!boot) return stop("SOURCE_NOT_VERIFIED");
  if (source.value !== "odysseus") return stop("PUTER_PERSONA_INSTALLATION_NOT_VERIFIED");
  // The operator must configure the actual server version, authenticated origin
  // and per-persona preset_id. A text prefix never installs a system prompt.
  const base = config.odysseusBase;
  const preset = config.presetIds?.[face];
  if (typeof base !== "string" || !/^https?:\/\/(?:localhost|127\.0\.0\.1)(?::\d+)?$/.test(base) ||
      typeof preset !== "string" || !/^[a-zA-Z0-9_-]{1,100}$/.test(preset)) {
    return stop("ODYSSEUS_PRESET_OR_LOCAL_ENDPOINT_NOT_CONFIGURED");
  }
  try {
    const response = await fetch(base + "/api/chat", {
      method: "POST", credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ message: question, preset_id: preset, session: "vr-asi-co-" + face }),
    });
    if (!response.ok) throw new Error("HTTP_" + response.status);
    const data = await response.json();
    write(String(data.response || data.message || data.content || "NO_RESPONSE_CONTENT"));
    write("HOST_PROMPT_READ_BACK: NOT_VERIFIED; session was transport-only");
  } catch (error) { stop("ODYSSEUS_REQUEST_FAILED_" + (error?.message || "UNKNOWN")); }
});
applyFace("angelica");
loadMemories();
