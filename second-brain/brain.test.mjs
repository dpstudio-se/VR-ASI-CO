import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

const script = path.join(import.meta.dirname, "brain.mjs");
function run(root, ...args) {
  return spawnSync(process.execPath, [script, ...args, "--root", root], { encoding: "utf8" });
}
function vault() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "odin-brain-"));
  const init = run(root, "init");
  assert.equal(init.status, 0, init.stderr);
  return root;
}
function put(root, rel, text) {
  const file = path.join(root, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, text);
}
const page = (title, quote, extra = "") =>
  "---\ntitle: " + title + "\nsources:\n  - raw/source.md\nupdated: 2026-11-24\n---\n\n" +
  quote + "\n\n" + extra;

test("init creates isolated vault skeleton and status finds new sources", () => {
  const root = vault();
  put(root, "raw/source.md", "The source says the sky is blue.");
  const result = run(root, "status");
  assert.match(result.stdout, /NEW raw\/source\.md/);
  assert.match(result.stdout, /pending: 1/);
});

test("lint accepts exact source quote and resolves links", () => {
  const root = vault();
  put(root, "raw/source.md", "The essential feature is the association of ideas.");
  put(root, "wiki/memex.md", page("Memex", '> "The essential feature is the association of ideas." — raw/source.md', "Related: [[associative-trails]]"));
  put(root, "wiki/associative-trails.md", page("Associative trails", "> Source-backed note — raw/source.md", "See [[memex]]."));
  assert.equal(run(root, "done", "raw/source.md", "wiki/memex.md", "wiki/associative-trails.md").status, 0);
  assert.equal(run(root, "lint").status, 0);
});

test("lint rejects fabricated quotes, broken links, missing sources and TODO", () => {
  const root = vault();
  put(root, "raw/source.md", "A source sentence.");
  put(root, "wiki/topic.md", page("Topic", '> "Bush invented hypertext in 1941" — raw/source.md', "Broken [[missing-page]] TODO"));
  const result = run(root, "lint");
  assert.equal(result.status, 1);
  assert.match(result.stderr, /QUOTE NOT IN SOURCE/);
  assert.match(result.stderr, /unresolved or ambiguous link/);
  assert.match(result.stderr, /unresolved TODO/);
});

test("manifest detects source drift after ingest", () => {
  const root = vault();
  put(root, "raw/source.md", "Original wording.");
  put(root, "wiki/a.md", page("A", '> "Original wording." — raw/source.md', "See [[b]]."));
  put(root, "wiki/b.md", page("B", "> Original wording — raw/source.md", "See [[a]]."));
  assert.equal(run(root, "done", "raw/source.md", "wiki/a.md", "wiki/b.md").status, 0);
  put(root, "raw/source.md", "Changed wording.");
  const result = run(root, "lint");
  assert.equal(result.status, 1);
  assert.match(result.stderr, /changed since ingest; stale pages/);
});

test("path traversal is rejected", () => {
  const root = vault();
  const result = run(root, "done", "../outside.md", "wiki/a.md");
  assert.equal(result.status, 2);
  assert.match(result.stderr, /Unsafe path/);
});

test("index is generated from topic frontmatter", () => {
  const root = vault();
  put(root, "wiki/area/topic.md", "---\ntitle: Topic title\nsources:\n  - raw/source.md\nupdated: 2026-11-24\n---\n");
  assert.equal(run(root, "index").status, 0);
  assert.match(fs.readFileSync(path.join(root, "wiki/index.md"), "utf8"), /\[\[area\/topic\]\].*Topic title/);
});
