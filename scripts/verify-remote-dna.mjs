import fs from "node:fs";

const mustExist = [
  "README.md",
  "WORKLOAD.md",
  "dna/REMOTE_DNA_STATE.json",
  "dna/FACE_LOCK.json",
  "persona/SYSTEM_CORE.txt",
  "persona/angelica.json",
  "persona/emilia.json",
  "persona/EMILIA_SYSTEM_CHARACTER.md",
  "persona/VR_ASI_CO_UNIVERSAL_SYSTEM_PROMPT.md",
  "docs/REMOTE_IDENTITY_SHADOW_GUARD.md",
  "docs/REMOTE_DNA_HARD_ADMISSION_GATE.md",
  "runtime/command-deck.json",
  "prompts/REMOTE_BOOT_PROMPT.md",
  "prompts/MIRROR_PROMPT.md",
];

const failures = [];
for (const path of mustExist) {
  if (!fs.existsSync(path)) failures.push(`missing canonical boot file: ${path}`);
}

if (!failures.length) {
  const dna = JSON.parse(fs.readFileSync("dna/REMOTE_DNA_STATE.json", "utf8"));
  const lock = JSON.parse(fs.readFileSync("dna/FACE_LOCK.json", "utf8"));
  const angelica = JSON.parse(fs.readFileSync("persona/angelica.json", "utf8"));
  const emilia = JSON.parse(fs.readFileSync("persona/emilia.json", "utf8"));

  if (dna.repository !== "dpstudio-se/VR-ASI-CO") failures.push("Remote DNA repository drift");
  if (dna.identity !== "VR-ASI-CO Angelica Ω82000") failures.push("Remote DNA identity drift");
  if (dna.boot?.head_policy !== "RESOLVE_AT_BOOT") failures.push("Remote DNA must resolve HEAD at boot");
  if (lock.default_face !== "Angelica") failures.push("FACE_LOCK default face drift");
  if (lock.default_identity !== "VR-ASI-CO Angelica") failures.push("FACE_LOCK identity drift");
  if (lock.default_marker !== "Ω82000") failures.push("FACE_LOCK marker drift");
  if (angelica.identity !== "VR-ASI-CO Angelica" || angelica.marker !== "Ω82000") failures.push("Angelica record drift");
  if (emilia.identity !== "VR-ASI-CO Emilia" || emilia.marker !== "Ω8200") failures.push("Emilia record drift");
  if (emilia.raw !== "persona/EMILIA_SYSTEM_CHARACTER.md") failures.push("Emilia RAW pointer drift");
  if (dna.shadow_guard?.dna_write_authority !== false) failures.push("Shadow must not have DNA write authority");
}

if (failures.length) {
  console.error("REMOTE_DNA_VERIFY_FAIL");
  for (const failure of failures) console.error("- " + failure);
  process.exit(1);
}

console.log("REMOTE_DNA_VERIFY_PASS");
