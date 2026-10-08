import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { OMEGA1766_PERSONA_BRIDGE, proposePersonaAdaptation } from "./omega1766-persona.ts";

const observation = {
  persona: "angelica" as const,
  trait: "directness" as const,
  target: 0.8,
  source: "owner-reviewed-feedback",
  evidenceId: "case-17",
  context: "Prefer concise answers while preserving Angelica's identity",
};

describe("TRULL Ω1766 persona learning and RNA governance", () => {
  it("keeps Psi27D symbolic and identity authority in FACE_LOCK", () => {
    assert.equal(OMEGA1766_PERSONA_BRIDGE.status, "SYM");
    assert.match(OMEGA1766_PERSONA_BRIDGE.ownerSymbolicFormula, /Sigma_\{1766\}/);
    assert.equal(OMEGA1766_PERSONA_BRIDGE.identityAuthority, "dna/FACE_LOCK.json");
    assert.equal(OMEGA1766_PERSONA_BRIDGE.mode, "RNA_PROPOSALS_ONLY");
  });
  it("proposes a bounded reversible adaptation without writing DNA", () => {
    const existing = { directness: 0.3 };
    const result = proposePersonaAdaptation(observation, existing);
    assert.equal(result.status, "HYP");
    assert.equal(result.proposal?.before, 0.3);
    assert.ok(Math.abs((result.proposal?.proposed ?? 0) - 0.4) < 1e-12);
    assert.equal(result.proposal?.persistentWrite, false);
    assert.equal(result.proposal?.ownerReviewRequired, true);
    assert.equal(existing.directness, 0.3);
    assert.ok(result.audit.includes("OWNER_GATE_PENDING"));
  });
  it("requires a reviewed baseline and provenance", () => {
    assert.equal(proposePersonaAdaptation(observation, {}).status, "STOP");
    assert.equal(proposePersonaAdaptation({ ...observation, evidenceId: "" }, { directness: 0.5 }).status, "STOP");
  });
  it("rejects unbounded input and unsupported identities", () => {
    assert.equal(proposePersonaAdaptation({ ...observation, target: 2 }, { directness: 0.5 }).status, "STOP");
    assert.equal(proposePersonaAdaptation({ ...observation, target: NaN }, { directness: 0.5 }).status, "STOP");
    assert.equal(proposePersonaAdaptation({ ...observation, persona: "other" as never }, { directness: 0.5 }).status, "STOP");
  });
  it("keeps each persona separate and caps both change directions", () => {
    const up = proposePersonaAdaptation({ ...observation, persona: "emilia", target: 1 }, { directness: 0.95 });
    const down = proposePersonaAdaptation({ ...observation, persona: "luna", target: 0 }, { directness: 0.05 });
    assert.equal(up.proposal?.persona, "emilia");
    assert.equal(up.proposal?.proposed, 1);
    assert.equal(down.proposal?.persona, "luna");
    assert.equal(down.proposal?.proposed, 0);
  });
});
