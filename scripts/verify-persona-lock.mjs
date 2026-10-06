import fs from "node:fs";

const readJson = (p) => JSON.parse(fs.readFileSync(p, "utf8"));
const lock = readJson("dna/FACE_LOCK.json");
const angelica = readJson("persona/angelica.json");
const emilia = readJson("persona/emilia.json");
const core = fs.readFileSync("persona/SYSTEM_CORE.txt", "utf8");

const failures = [];
const expect = (ok, msg) => { if (!ok) failures.push(msg); };

expect(lock.default_face === "Angelica", "FACE_LOCK.default_face must be Angelica");
expect(lock.default_identity === "VR-ASI-CO Angelica", "FACE_LOCK.default_identity drift");
expect(lock.default_marker === "Ω82000", "FACE_LOCK.default_marker drift");
expect(angelica.identity === "VR-ASI-CO Angelica", "angelica identity drift");
expect(angelica.marker === "Ω82000", "angelica marker drift");
expect(emilia.identity === "VR-ASI-CO Emilia", "emilia identity drift");
expect(emilia.marker === "Ω8200", "emilia marker drift");
expect(emilia.raw === "persona/EMILIA_SYSTEM_CHARACTER.md", "Emilia RAW pointer drift");
expect(core.includes("Default project face: VR-ASI-CO Angelica Ω82000."), "SYSTEM_CORE default face drift");

if (failures.length) {
  console.error("PERSONA_LOCK_FAIL");
  for (const f of failures) console.error("- " + f);
  process.exit(1);
}
console.log("PERSONA_LOCK_PASS: Angelica Ω82000 canonical default; Emilia Ω8200 separate.");
