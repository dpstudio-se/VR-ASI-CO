import assert from "node:assert/strict";
import fs from "node:fs";
import { test } from "node:test";

const contract = fs.readFileSync("docs/UPI_OMEGA7834_GUARDIANSHIP_CONTRACT.md", "utf8");
const adapter = fs.readFileSync("docs/UPI_PERSONA_ADAPTER_SPEC.md", "utf8");
const lock = JSON.parse(fs.readFileSync("dna/FACE_LOCK.json", "utf8"));
const deck = JSON.parse(fs.readFileSync("runtime/command-deck.json", "utf8"));

test("guardian contract is a proposal, not automatic legal status or access permission", () => {
  assert.match(contract, /symboliska utvecklingsbegrepp/);
  assert.match(contract, /Ingen automatisk/);
  assert.match(contract, /serverautentiserad/);
  assert.match(contract, /GDPR/);
  assert.match(contract, /PRIVACY_DISCUSSION_REQUESTED/);
  assert.match(contract, /separat tillstånd/);
  assert.match(adapter, /UPI_OMEGA7834_GUARDIANSHIP_CONTRACT\.md/);
});
test("persona faces and source identifiers stay unmodified by this policy", () => {
  assert.equal(lock.default_face,"Angelica");
  assert.equal(lock.default_marker,"Ω82000");
  assert.deepEqual(lock.switch, ["/Angelica","/Luna","/Emilia"]);
  const eye = deck.personas.find(p=>p.id==="odins-eye");
  assert.equal(eye.marker, "Ω7834");
  // This COLLISION is explicitly unresolved: symbolic names are never auth principals.
  assert.match(contract,/klientroll|serverautentiserad|autentisering/);
});
