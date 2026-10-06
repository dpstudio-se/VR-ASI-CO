import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { execFileSync } from "node:child_process";
import { auditRepository, gitBlobSha } from "./audit-repository.mjs";

function fixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "vr-asi-co-audit-"));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const write = (name, value) => { fs.mkdirSync(path.dirname(path.join(root, name)), { recursive: true }); fs.writeFileSync(path.join(root, name), value); };
  execFileSync("git", ["init", "-q", root]);
  write("dna/REMOTE_DNA_STATE.json", JSON.stringify({ repository: "dpstudio-se/VR-ASI-CO", boot: { required: ["persona/emilia.json"] }, shadow_guard: { dna_write_authority: false } }));
  write("dna/FACE_LOCK.json", JSON.stringify({ default_face: "Angelica", default_identity: "VR-ASI-CO Angelica", default_marker: "Ω82000" }));
  write("persona/angelica.json", JSON.stringify({ identity: "VR-ASI-CO Angelica", marker: "Ω82000" }));
  write("persona/emilia.json", JSON.stringify({ identity: "VR-ASI-CO Emilia", marker: "Ω8200", raw: "persona/EMILIA_SYSTEM_CHARACTER.md" }));
  const stage = () => execFileSync("git", ["-C", root, "add", "."]);
  return { root, write, stage };
}

test("inventories only tracked files, preserves binary metadata, and hashes working changes", (t) => {
  const f = fixture(t);
  f.write("public/image.png", Buffer.from([0, 255, 8]));
  f.write("docs/map.md", "# Map\n"); f.stage();
  f.write("docs/untracked.md", "not part of the audit");
  f.write("docs/map.md", "# Changed map\n");
  const before = execFileSync("git", ["-C", f.root, "status", "--porcelain"]);
  const report = auditRepository(f.root);
  assert.equal(report.summary.errors, 0);
  assert.equal(report.files.some((file) => file.path.endsWith("untracked.md")), false);
  assert.equal(report.files.find((file) => file.path === "public/image.png").loadState, "INDEX_ONLY");
  assert.equal(report.files.find((file) => file.path === "docs/map.md").workingBlob, gitBlobSha(Buffer.from("# Changed map\n")));
  assert(report.findings.some((finding) => finding.code === "WORKTREE_DIFFERS_FROM_INDEX"));
  assert.deepEqual(execFileSync("git", ["-C", f.root, "status", "--porcelain"]), before);
  assert.equal(report.runtimeAdmission, "NOT_ASSESSED");
});

test("missing declared boot content and malformed JSON cannot produce an error-free report", (t) => {
  const f = fixture(t); f.stage();
  f.write("persona/emilia.json", "{ broken");
  const report = auditRepository(f.root, { dnaOnly: true });
  assert(report.summary.errors > 0);
  assert(report.findings.some((finding) => finding.code === "INVALID_JSON"));
  fs.unlinkSync(path.join(f.root, "persona/emilia.json"));
  assert(auditRepository(f.root).findings.some((finding) => finding.code === "BOOT_FILE_NOT_READABLE"));
});

test("resolves local imports in both graph directions and reports missing document paths", (t) => {
  const f = fixture(t);
  f.write("src/lib/value.ts", "export const value = 1;\n");
  f.write("src/routes/index.tsx", ["import", "{ value }", "from", "'@/lib/value';"].join(" ") + "\n");
  f.write("src/styles.css", "body {}\n");
  f.write("src/routes/style.ts", ["import", "css", "from", "'../styles.css?url';"].join(" ") + "\n");
  f.write("docs/map.md", "[valid](../src/lib/value.ts) [missing](missing.md) [external](https://example.com)\n");
  f.stage();
  const report = auditRepository(f.root);
  assert(report.imports.some((edge) => edge.from === "src/routes/index.tsx" && edge.to === "src/lib/value.ts" && edge.resolved));
  assert(report.imports.some((edge) => edge.to === "src/styles.css" && edge.resolved));
  assert.equal(report.findings.filter((finding) => finding.code === "LOCAL_DOC_LINK_MISSING").length, 1);
});
