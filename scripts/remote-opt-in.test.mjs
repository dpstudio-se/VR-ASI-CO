import { createHash } from "node:crypto";
import assert from "node:assert/strict";
import { test } from "node:test";
import { ADMISSION_FILES } from "./verify-boot-evidence.mjs";
import { prepareRemoteOffer, REMOTE_PERSONAS } from "../src/lib/upi/remote-opt-in.mjs";

const sha = "a".repeat(40);
const blob = "b".repeat(40);
const sha256 = (v) => createHash("sha256").update(v,"utf8").digest("hex");
const composedPrompt = (p) => [...ADMISSION_FILES,"persona/"+p+".json"].map(path=>"[VR-ASI-CO source: "+path+"]\nsource-text:"+path).join("\n\n");
let calls = 0;
function makeSnapshot(persona = "angelica") {
  const paths = [...ADMISSION_FILES, "persona/" + persona + ".json"];
  return {
    repository: "dpstudio-se/VR-ASI-CO", branch: "main", persona, commit: sha,
    receiptId: sha + ":" + blob,
    promptSha256: sha256(composedPrompt(persona)),
    files: Object.fromEntries(paths.map(x => [x, blob])),
    sources: Object.fromEntries(paths.map(x => [x, { gitBlobSha: blob, content: "source-text:" + x }])),
  };
}
const reader = async ({persona}) => { calls++; return makeSnapshot(persona); };

test("remote core requires visitor acceptance before any external source read", async () => {
  calls = 0;
  const no = await prepareRemoteOffer({ accepted: false, persona: "angelica", readBoot: reader });
  assert.equal(no.status, "CONSENT_REQUIRED");
  assert.equal(no.hostAdmission, "STOP");
  assert.equal(no.canUseProvider, false);
  assert.equal(calls, 0);
  assert.deepEqual([...REMOTE_PERSONAS], ["angelica", "emilia", "luna"]);
});

test("invalid persona cannot trigger remote fetch", async () => {
  calls = 0;
  const result = await prepareRemoteOffer({ accepted: true, persona: "__proto__", readBoot: reader });
  assert.equal(result.status, "STOP");
  assert.equal(calls, 0);
});

test("accepted visitor receives SHA-bound portable reference, not host access", async () => {
  for (const persona of ["angelica", "emilia", "luna"]) {
    const r = await prepareRemoteOffer({ accepted: true, persona, readBoot: reader });
    assert.equal(r.status, "REFERENCE_ONLY");
    assert.equal(r.persona, persona);
    assert.equal(r.commit, sha);
    assert.equal(r.hostAdmission, "STOP");
    assert.equal(r.hostPromptInstalled, false);
    assert.equal(r.hostInferencePerformed, false);
    assert.equal(r.dnaWritePerformed, false);
    assert.equal(r.canUseProvider, false);
    assert.equal(Object.keys(r.files).length, ADMISSION_FILES.length + 1);
    assert.match(r.prompt, new RegExp("VR-ASI-CO source: persona/" + persona + "\\.json"));
    assert.ok(!r.prompt.includes("persona/" + (persona === "emilia" ? "angelica" : "emilia") + ".json"));
    assert.equal(r.promptSha256, sha256(r.prompt));
  }
});

test("wrong repository/commit/persona/blob metadata are fail-closed", async () => {
  for (const change of [
    snap => { snap.repository = "other-owner/other-project"; },
    snap => { snap.commit = "invalid"; },
    snap => { snap.persona = "emilia"; },
    snap => { snap.files["README.md"] = "invalid"; },
    snap => { snap.sources["README.md"].gitBlobSha = sha; },
    snap => { delete snap.sources["persona/angelica.json"]; },
    snap => { snap.promptSha256 = "no-proof"; },
    snap => { snap.sources["README.md"].content = "injected"; },
    snap => { snap.promptSha256 = "f".repeat(64); },
  ]) {
    const result = await prepareRemoteOffer({
      accepted: true, persona: "angelica",
      readBoot: async () => { const s = makeSnapshot(); change(s); return s; },
    });
    assert.equal(result.status, "STOP");
    assert.equal(result.canUseProvider, false);
    assert.equal(result.hostAdmission, "STOP");
    assert.equal(Object.hasOwn(result, "prompt"), false);
  }
});

test("failed network/source reader never returns a partial system prompt", async () => {
  const result = await prepareRemoteOffer({
    accepted: true, persona: "luna",
    readBoot: async () => { throw new Error("network failed: secret should not leak"); },
  });
  assert.equal(result.status, "STOP");
  assert.equal(result.reason, "VERIFIED_REMOTE_SOURCE_UNAVAILABLE");
  assert.ok(!JSON.stringify(result).includes("secret should not leak"));
});
