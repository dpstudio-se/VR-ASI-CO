import assert from "node:assert/strict";
import { test } from "node:test";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

const cli = path.resolve("scripts/vortex-audit.mjs");
function invoke(args) {
  return spawnSync(process.execPath, [cli, ...args], { encoding: "utf8", timeout: 3000 });
}
test("VORTEX CLI returns bounded STOP instead of tracebacks for missing/bad files", () => {
  for (const args of [["r0"], ["r0", "/no-such-vortex-input.json"], ["r0", "/no-such-vortex-input.json", "extra"], ["unsupported"]]) {
    const r = invoke(args);
    assert.notEqual(r.status, 0);
    const v = JSON.parse(r.stdout);
    assert.equal(v.result.status, "STOP");
    assert.equal(v.dnaWritePerformed, false);
    assert.doesNotMatch(r.stderr, /ENOENT|SyntaxError|stack:/);
  }
});
test("VORTEX CLI rejects malformed JSON and oversize payload without writing to Git", () => {
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), "vortex-cli-"));
  try {
    const invalid = path.join(temp, "invalid.json");
    const large = path.join(temp, "large.json");
    fs.writeFileSync(invalid, "{bad-json");
    fs.writeFileSync(large, " ".repeat(65537));
    for (const file of [invalid,large]) {
      const r = invoke(["r0", file]);
      assert.equal(JSON.parse(r.stdout).result.status, "STOP");
      assert.notEqual(r.status, 0);
    }
  } finally { fs.rmSync(temp, { recursive: true, force: true }); }
});
test("VORTEX CLI r0 is DER only, and read is explicitly not persistent", () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "vortex-cli-ok-"));
  try {
    const f = path.join(tmp, "in.json");
    fs.writeFileSync(f, JSON.stringify({ verifiedSignal: 8, noise: 1, compression: 0, manipulation: 0, uncertainty: 1, source: "fixture" }));
    const good = invoke(["r0",f]);
    assert.equal(good.status,0);
    const v = JSON.parse(good.stdout);
    assert.equal(v.result.score, .8);
    assert.equal(v.remoteAdmission, false);
    const read = JSON.parse(invoke(["vortex-read"]).stdout);
    assert.equal(read.result.persisted, false);
    assert.equal(read.result.reason, "NO_PERSISTENT_LEDGER_CONFIGURED");
  } finally { fs.rmSync(tmp, { recursive: true, force: true }); }
});
