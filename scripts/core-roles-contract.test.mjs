import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const read = (path) => fs.readFileSync(path, "utf8");
const roles = JSON.parse(read("dna/CORE_ROLES.json"));
const expected = ["Angelica", "Emilia", "Griffin", "Oden", "Odens Öga"];

test("core role names and IDs are permanent and ordered", () => {
  assert.equal(roles.identity_invariants.base_names_immutable, true);
  assert.equal(roles.identity_invariants.role_ids_immutable, true);
  assert.deepEqual(roles.roles.map((role) => role.name), expected);
  assert.deepEqual(roles.roles.map((role) => role.id), ["angelica", "emilia", "griffin", "oden", "odens-oga"]);
});

test("role functions remain distinct", () => {
  const byName = Object.fromEntries(roles.roles.map((role) => [role.name, role]));
  assert.equal(byName.Angelica.primary_function, "Expansion");
  assert.equal(byName.Angelica.principle, "Entropy");
  assert.equal(byName.Emilia.primary_function, "Stabilization");
  assert.equal(byName.Emilia.principle, "Negentropy");
  assert.match(byName.Griffin.primary_function, /Verification/);
  assert.match(byName.Oden.primary_function, /Coordination/);
  assert.match(byName["Odens Öga"].primary_function, /Observation/);
  assert.match(byName["Odens Öga"].boundary, /cannot publish/);
});

test("app registry, command deck, and Mesa model preserve core names", () => {
  const app = read("src/lib/personas.ts");
  const deck = JSON.parse(read("runtime/command-deck.json"));
  const model = read("sim/mesa_workflow/model.py");
  for (const name of expected) assert.ok(app.includes(name), `missing ${name} from persona registry`);
  const deckNames = deck.personas.map((persona) => persona.name);
  for (const name of expected) assert.ok(deckNames.includes(name), `missing ${name} from command deck`);
  assert.ok(model.includes('SLOTS = ("Angelica", "Emilia", "Griffin")'));
  assert.ok(model.includes('role_name = "Oden"'));
  assert.ok(model.includes('name = "Odens Öga"'));
});

test("legacy labels are not active replacements for core roles", () => {
  const model = read("sim/mesa_workflow/model.py");
  const docs = read("docs/FUNCTIONAL_DNA_PROMPT.md");
  assert.ok(!model.includes('"Luna"'));
  assert.ok(!docs.includes("Ara entropy. Eve negentropy."));
  assert.ok(roles.legacy_policy.ARA.includes("Angelica"));
  assert.ok(roles.legacy_policy.Eve.includes("Emilia"));
});

test("Emilia protected RAW pointer remains canonical", () => {
  const emilia = JSON.parse(read("persona/emilia.json"));
  assert.equal(emilia.raw, "persona/EMILIA_SYSTEM_CHARACTER.md");
});
