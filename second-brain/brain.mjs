#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const VERSION = 1;
const EXEMPT = new Set(["index.md", "hot.md", "log.md"]);
const LINK_RE = /\[\[([^\]|#]+)(?:#[^\]|]*)?(?:\|[^\]]*)?\]\]/g;
const QUOTE_RE = /^>\s*"(.+?)"\s*(?:—|–|-)\s*(raw\/[^\s]+)\s*$/gm;

function argsOf(argv) {
  const args = [...argv];
  let root = process.env.ODINOS_BRAIN_HOME || "";
  const i = args.indexOf("--root");
  if (i >= 0) {
    if (!args[i + 1]) throw new Error("--root requires a path");
    root = args[i + 1];
    args.splice(i, 2);
  }
  if (!root) throw new Error("Set ODINOS_BRAIN_HOME or pass --root PATH; refusing to guess a vault.");
  return { args, root: path.resolve(root) };
}
function safePath(root, rel) {
  if (typeof rel !== "string" || !rel.trim()) throw new Error("Expected a relative path");
  const normalized = rel.replaceAll("\\", "/");
  if (path.posix.isAbsolute(normalized) || normalized.split("/").some((p) => !p || p === "..")) throw new Error("Unsafe path: " + rel);
  const full = path.resolve(root, ...normalized.split("/"));
  if (full !== root && !full.startsWith(root + path.sep)) throw new Error("Path escapes vault: " + rel);
  return full;
}
function relative(root, file) { return path.relative(root, file).split(path.sep).join("/"); }
function digest(file) { return crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex"); }
function atomicWrite(file, content) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const tmp = file + ".tmp-" + process.pid;
  fs.writeFileSync(tmp, content, { encoding: "utf8", flag: "wx" });
  fs.renameSync(tmp, file);
}
function ensure(root) {
  for (const name of ["raw", "wiki", "output", ".brain"]) fs.mkdirSync(path.join(root, name), { recursive: true });
}
function walk(dir, root) {
  if (!fs.existsSync(dir)) return [];
  let result = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
    const file = path.join(dir, entry.name);
    if (entry.isSymbolicLink()) throw new Error("Symlink is not allowed: " + relative(root, file));
    if (entry.isDirectory()) result = result.concat(walk(file, root));
    else if (entry.isFile()) result.push(file);
  }
  return result;
}
function loadManifest(root) {
  const file = path.join(root, ".brain", "manifest.json");
  if (!fs.existsSync(file)) return { version: VERSION, sources: {} };
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  if (data.version !== VERSION || !data.sources || Array.isArray(data.sources) || typeof data.sources !== "object") throw new Error("Unsupported manifest schema");
  return data;
}
function saveManifest(root, data) {
  atomicWrite(path.join(root, ".brain", "manifest.json"), JSON.stringify(data, null, 2) + "\n");
}
function frontmatter(text) {
  if (!text.startsWith("---\n")) return null;
  const end = text.indexOf("\n---", 4);
  if (end < 0) return null;
  const out = {};
  let current = "";
  for (const line of text.slice(4, end).split(/\r?\n/)) {
    const item = line.match(/^\s+-\s+(.+)\s*$/);
    if (item && current) {
      if (!Array.isArray(out[current])) out[current] = [];
      out[current].push(item[1].trim().replace(/^["']|["']$/g, ""));
      continue;
    }
    const pair = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!pair) continue;
    current = pair[1];
    const value = pair[2].trim();
    out[current] = value.startsWith("[") && value.endsWith("]")
      ? value.slice(1, -1).split(",").map((v) => v.trim().replace(/^["']|["']$/g, "")).filter(Boolean)
      : value.replace(/^["']|["']$/g, "");
  }
  return out;
}
function sourcesOf(value) { return Array.isArray(value) ? value : typeof value === "string" && value ? [value] : []; }
function norm(value) { return value.replace(/\s+/g, " ").trim(); }
function init(root) {
  ensure(root);
  const defaults = [
    ["wiki/hot.md", "# Hot context\n\n- Current focus: initialize shared OdinOS knowledge base\n- Last update: not yet populated\n- Open questions: configure ODINOS_BRAIN_HOME on each authorized host\n"],
    ["wiki/index.md", "# Knowledge index\n\nNo pages indexed yet.\n"],
    ["VR-ASI-CO.md", "# Shared Second Brain Rules\n\n- Read wiki/hot.md first, then wiki/index.md when context is needed.\n- Treat raw/ as immutable source material; never edit it.\n- Cite sources and preserve uncertainty.\n- Do not read the vault for unrelated general coding questions.\n- Never store credentials, tokens, or private keys here.\n"]
  ];
  for (const [p, body] of defaults) {
    const file = path.join(root, p);
    if (!fs.existsSync(file)) atomicWrite(file, body);
  }
  const mf = path.join(root, ".brain", "manifest.json");
  if (!fs.existsSync(mf)) saveManifest(root, { version: VERSION, sources: {} });
  console.log("Initialized vault: " + root);
  return 0;
}
function status(root) {
  ensure(root);
  const manifest = loadManifest(root);
  const seen = new Set();
  let pending = 0;
  for (const file of walk(path.join(root, "raw"), root)) {
    const key = relative(root, file);
    seen.add(key);
    const prior = manifest.sources[key];
    const state = !prior ? "NEW" : prior.sha256 !== digest(file) ? "CHANGED" : "CURRENT";
    if (state !== "CURRENT") pending++;
    console.log(state + " " + key);
  }
  for (const key of Object.keys(manifest.sources).sort()) {
    if (!seen.has(key)) { console.log("DELETED " + key); pending++; }
  }
  console.log("pending: " + pending);
  return 0;
}
function done(root, raw, pages) {
  const source = safePath(root, raw);
  if (!raw.startsWith("raw/") || !fs.existsSync(source) || !fs.statSync(source).isFile()) throw new Error("Expected an existing file under raw/: " + raw);
  if (!pages.length) throw new Error("Supply at least one wiki page");
  const checked = pages.map((p) => {
    const file = safePath(root, p);
    if (!p.startsWith("wiki/") || !p.endsWith(".md") || !fs.existsSync(file) || !fs.statSync(file).isFile()) throw new Error("Expected an existing Markdown page under wiki/: " + p);
    return p;
  });
  const manifest = loadManifest(root);
  manifest.sources[raw] = { sha256: digest(source), pages: [...new Set(checked)].sort(), ingested_at: new Date().toISOString() };
  saveManifest(root, manifest);
  console.log("Recorded " + raw + " -> " + manifest.sources[raw].pages.join(", "));
  return 0;
}
function index(root) {
  ensure(root);
  const base = path.join(root, "wiki");
  const files = walk(base, root).filter((f) => f.endsWith(".md") && !EXEMPT.has(path.basename(f)));
  const rows = files.map((f) => {
    const fm = frontmatter(fs.readFileSync(f, "utf8")) || {};
    const target = relative(base, f).replace(/\.md$/i, "");
    return "- [[" + target + "]] — " + (fm.title || path.basename(f, ".md")) + " (" + (fm.updated || "unknown") + ")";
  });
  atomicWrite(path.join(base, "index.md"), "# Knowledge index\n\n" + (rows.join("\n") || "No pages indexed yet.") + "\n");
  console.log("index: " + rows.length + " pages");
  return 0;
}
function linkTarget(file, target, wikiRoot, byStem) {
  const clean = target.trim().replace(/\.md$/i, "");
  if (!clean.includes("/")) {
    const found = byStem.get(clean) || [];
    return found.length === 1 ? found[0] : null;
  }
  const options = [
    path.resolve(path.dirname(file), clean + ".md"),
    path.resolve(wikiRoot, clean + ".md")
  ];
  return options.find((p) => p.startsWith(wikiRoot + path.sep) && fs.existsSync(p)) || null;
}
function lint(root) {
  ensure(root);
  const errors = [];
  const wikiRoot = path.join(root, "wiki");
  const files = walk(wikiRoot, root).filter((f) => f.endsWith(".md"));
  const pages = files.filter((f) => !EXEMPT.has(path.basename(f)));
  const byStem = new Map();
  for (const f of pages) {
    const stem = path.basename(f, ".md");
    byStem.set(stem, [...(byStem.get(stem) || []), f]);
  }
  const inbound = new Map(pages.map((f) => [f, 0]));
  for (const file of pages) {
    const key = relative(root, file);
    const text = fs.readFileSync(file, "utf8");
    const fm = frontmatter(text);
    if (!fm) { errors.push(key + ": missing YAML frontmatter"); continue; }
    for (const field of ["title", "sources", "updated"]) if (!(field in fm) || (typeof fm[field] === "string" && !fm[field])) errors.push(key + ": frontmatter lacks '" + field + "'");
    if (typeof fm.updated === "string" && !/^\d{4}-\d{2}-\d{2}$/.test(fm.updated)) errors.push(key + ": updated must be YYYY-MM-DD");
    const sourceSet = new Set(sourcesOf(fm.sources));
    for (const src of sourceSet) {
      if (!src.startsWith("raw/")) { errors.push(key + ": source must be under raw/: " + src); continue; }
      const raw = safePath(root, src);
      if (!fs.existsSync(raw) || !fs.statSync(raw).isFile()) errors.push(key + ": source does not exist: " + src);
    }
    for (const match of text.matchAll(LINK_RE)) {
      const target = match[1].trim();
      const resolved = linkTarget(file, target, wikiRoot, byStem);
      if (!resolved) errors.push(key + ": unresolved or ambiguous link [[" + target + "]]");
      else if (resolved !== file) inbound.set(resolved, (inbound.get(resolved) || 0) + 1);
    }
    for (const match of text.matchAll(QUOTE_RE)) {
      const quote = match[1], src = match[2], raw = safePath(root, src);
      if (!sourceSet.has(src)) errors.push(key + ": quote source not listed in frontmatter: " + src);
      if (!fs.existsSync(raw) || !fs.statSync(raw).isFile()) errors.push(key + ": quote cites missing source: " + src);
      else if (!norm(fs.readFileSync(raw, "utf8")).includes(norm(quote))) errors.push(key + ': QUOTE NOT IN SOURCE -> "' + quote.slice(0, 80) + '" (' + src + ")");
    }
    if (/\bTODO\b/i.test(text)) errors.push(key + ": unresolved TODO");
  }
  for (const [file, count] of inbound) if (!count) errors.push(relative(root, file) + ": orphan (no inbound links)");
  const manifest = loadManifest(root);
  for (const [src, record] of Object.entries(manifest.sources)) {
    const raw = safePath(root, src);
    if (!fs.existsSync(raw)) errors.push(src + ": deleted since ingest; review pages: " + (record.pages || []).join(", "));
    else if (digest(raw) !== record.sha256) errors.push(src + ": changed since ingest; stale pages: " + (record.pages || []).join(", "));
  }
  for (const error of errors) console.error(error);
  console.error("lint: " + errors.length + " problem(s) in " + pages.length + " pages");
  return errors.length ? 1 : 0;
}
function main() {
  try {
    const parsed = argsOf(process.argv.slice(2));
    const command = parsed.args.shift() || "help";
    if (command === "help" || command === "--help") {
      console.log("Commands: init | status | done <raw> <wiki...> | index | lint. Set ODINOS_BRAIN_HOME or --root.");
      return 0;
    }
    if (command === "init") return init(parsed.root);
    if (command === "status") return status(parsed.root);
    if (command === "done") return done(parsed.root, parsed.args.shift(), parsed.args);
    if (command === "index") return index(parsed.root);
    if (command === "lint") return lint(parsed.root);
    throw new Error("Unknown command: " + command);
  } catch (error) {
    console.error("ERROR: " + error.message);
    return 2;
  }
}
process.exitCode = main();
