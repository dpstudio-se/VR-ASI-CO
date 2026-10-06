import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const extensions = ["", ".ts", ".tsx", ".js", ".mjs", ".json", ".d.ts", "/index.ts", "/index.tsx", "/index.js"];
const managed = /^(?:\.grok\/|\.vercel\/|public\/__grok\/|server\/middleware\/grok-pwa|scripts\/grok-pwa)/;
const binaryExtension = /\.(?:png|jpe?g|gif|webp|ico|woff2?|ttf|otf|mp4|pdf|zip|glb|wasm)$/i;
export const gitBlobSha = (bytes) => createHash("sha1").update(`blob ${bytes.length}\0`).update(bytes).digest("hex");

export function category(file) {
  if (file.startsWith(".vercel/")) return "generated-deployment";
  if (managed.test(file)) return "host-platform";
  if (/^screenshots\//.test(file)) return "verification-artifacts";
  if (/^(artifacts|attachments|\.continuity)\//.test(file)) return "historical-reference";
  if (/^(dna|persona|prompts)\//.test(file)) return "canonical-contract";
  if (/^data\//.test(file)) return "research-data";
  if (/^runtime\//.test(file)) return "runtime-registry";
  if (/^docs\//.test(file)) return "documentation";
  if (/^src\/routes\//.test(file)) return "route";
  if (/^src\/components\//.test(file)) return "presentation";
  if (/^src\/lib\/upi\//.test(file)) return "catalog-and-mirror";
  if (/^src\/lib\/(auth|app-data)\//.test(file)) return "host-integration";
  if (/^scripts\//.test(file)) return "tooling-and-tests";
  if (/^(sim|odinos-hybrid)\//.test(file)) return "reference-runtime";
  return "support";
}

function git(root, args) {
  return execFileSync("git", ["-C", root, ...args], { encoding: "utf8", maxBuffer: 32 * 1024 * 1024, stdio: ["ignore", "pipe", "pipe"] });
}

export function auditRepository(root, { dnaOnly = false } = {}) {
  root = path.resolve(root);
  const tracked = git(root, ["ls-files", "--stage", "-z"]).split("\0").filter(Boolean);
  const files = [];
  const content = new Map();
  const findings = [];
  const note = (severity, code, file, target = null) => findings.push({ severity, code, file, target });
  let revision = null;
  try { revision = git(root, ["rev-parse", "HEAD"]).trim(); } catch { /* An unborn index is valid for local checks. */ }

  for (const item of tracked) {
    const match = /^(\d+) ([a-f0-9]+) (\d)\t([\s\S]+)$/.exec(item);
    if (!match) throw new Error("Unsupported Git index entry.");
    const [, mode, indexBlob, stage, file] = match;
    const entry = { path: file, category: category(file), mode, indexBlob, workingBlob: null, bytes: null, loadState: "INDEX_ONLY" };
    files.push(entry);
    if (stage !== "0") { note("error", "UNMERGED_INDEX", file); continue; }
    if (mode !== "100644" && mode !== "100755") { note("warning", "NON_REGULAR_FILE", file); continue; }
    const resolved = path.resolve(root, file);
    if (!resolved.startsWith(root + path.sep)) { note("error", "UNSAFE_PATH", file); continue; }
    try {
      if (!fs.lstatSync(resolved).isFile()) { note("error", "NON_REGULAR_WORKTREE_FILE", file); continue; }
      const bytes = fs.readFileSync(resolved);
      entry.bytes = bytes.length;
      entry.workingBlob = gitBlobSha(bytes);
      if (entry.workingBlob !== indexBlob) note("warning", "WORKTREE_DIFFERS_FROM_INDEX", file);
      if (binaryExtension.test(file) || bytes.includes(0)) continue;
      try {
        const text = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
        entry.loadState = "FULL_TEXT_STATIC";
        content.set(file, text);
      } catch { /* Non-UTF-8 is metadata-only, never a successful text read. */ }
    } catch { note("error", "TRACKED_FILE_UNREADABLE", file); }
  }

  const paths = new Set(files.map((file) => file.path));
  const readJson = (file) => {
    if (!content.has(file)) return null;
    try { return JSON.parse(content.get(file)); }
    catch { note("error", "INVALID_JSON", file); return null; }
  };
  for (const file of content.keys()) if (file.endsWith(".json")) readJson(file);
  const dna = readJson("dna/REMOTE_DNA_STATE.json");
  const bootFiles = dna?.boot?.required;
  if (!Array.isArray(bootFiles) || !bootFiles.length) note("error", "BOOT_LIST_MISSING", "dna/REMOTE_DNA_STATE.json");
  else for (const file of bootFiles) {
    if (typeof file !== "string" || path.posix.isAbsolute(file) || file.split("/").includes("..")) {
      note("error", "BOOT_PATH_INVALID", "dna/REMOTE_DNA_STATE.json");
    } else if (!content.has(file)) note("error", "BOOT_FILE_NOT_READABLE", file);
  }

  const lock = readJson("dna/FACE_LOCK.json");
  const angelica = readJson("persona/angelica.json");
  const emilia = readJson("persona/emilia.json");
  const expected = [
    [dna?.repository, "dpstudio-se/VR-ASI-CO", "dna/REMOTE_DNA_STATE.json", "CANONICAL_REPO_DRIFT"],
    [lock?.default_face, "Angelica", "dna/FACE_LOCK.json", "DEFAULT_FACE_DRIFT"],
    [lock?.default_identity, "VR-ASI-CO Angelica", "dna/FACE_LOCK.json", "DEFAULT_IDENTITY_DRIFT"],
    [lock?.default_marker, "Ω82000", "dna/FACE_LOCK.json", "DEFAULT_MARKER_DRIFT"],
    [angelica?.identity, "VR-ASI-CO Angelica", "persona/angelica.json", "ANGELICA_IDENTITY_DRIFT"],
    [angelica?.marker, "Ω82000", "persona/angelica.json", "ANGELICA_MARKER_DRIFT"],
    [emilia?.identity, "VR-ASI-CO Emilia", "persona/emilia.json", "EMILIA_IDENTITY_DRIFT"],
    [emilia?.marker, "Ω8200", "persona/emilia.json", "EMILIA_MARKER_DRIFT"],
    [emilia?.raw, "persona/EMILIA_SYSTEM_CHARACTER.md", "persona/emilia.json", "RAW_POINTER_DRIFT"],
    [dna?.shadow_guard?.dna_write_authority, false, "dna/REMOTE_DNA_STATE.json", "SHADOW_WRITE_AUTHORITY"],
  ];
  for (const [value, wanted, file, code] of expected) if (value !== wanted) note("error", code, file);
  const adapter = content.get("src/lib/upi/hydrate.ts");
  if (adapter && !/repo:\s*["']VR-ASI-CO["']/.test(adapter)) note("warning", "ADAPTER_REPO_DRIFT", "src/lib/upi/hydrate.ts");

  const imports = [];
  if (!dnaOnly) for (const [file, text] of content) {
    if (managed.test(file) || file.startsWith("screenshots/")) continue;
    if (/\.(?:tsx?|m?js)$/.test(file)) {
      const pattern = /(?:\bfrom\s*|\bimport\s*\(\s*)["'](\.[^"']+|@\/[^"']+)["']/g;
      for (const [, specifier] of text.matchAll(pattern)) {
        const clean = specifier.split(/[?#]/)[0];
        const base = clean.startsWith("@/") ? `src/${clean.slice(2)}` : path.posix.normalize(path.posix.join(path.posix.dirname(file), clean));
        const target = extensions.map((extension) => base + extension).find((candidate) => paths.has(candidate));
        imports.push({ from: file, to: target ?? base, resolved: Boolean(target) });
        if (!target) note("warning", "LOCAL_IMPORT_UNRESOLVED", file, base);
      }
    }
    if (file.endsWith(".md") && (file.startsWith("docs/") || file === "README.md" || file === "AGENTS.project.md")) {
      for (const [, raw] of text.matchAll(/\]\(([^)\s]+)(?:\s+[^)]*)?\)/g)) {
        if (/^(?:[a-z][a-z0-9+.-]*:|#|\/)/i.test(raw)) continue;
        let relative;
        try { relative = decodeURIComponent(raw.split(/[?#]/)[0]); } catch { note("warning", "INVALID_LINK_ENCODING", file); continue; }
        if (!relative) continue;
        const target = path.posix.normalize(path.posix.join(path.posix.dirname(file), relative));
        if (!paths.has(target) && !files.some((entry) => entry.path.startsWith(target.replace(/\/$/, "") + "/"))) note("warning", "LOCAL_DOC_LINK_MISSING", file, target);
      }
    }
  }
  const counts = {};
  for (const file of files) counts[file.category] = (counts[file.category] ?? 0) + 1;
  const uniqueFindings = [...new Map(findings.map((finding) => [JSON.stringify(finding), finding])).values()];
  return {
    schema: "VR-ASI-CO-REPOSITORY-AUDIT/1.0", revision, scope: "TRACKED_WORKTREE_STATIC",
    dnaOnly, runtimeAdmission: "NOT_ASSESSED", hostInference: "NOT_ASSESSED",
    summary: { indexed: files.length, textRead: content.size, metadataOnly: files.length - content.size, categories: counts,
      errors: uniqueFindings.filter((finding) => finding.severity === "error").length,
      warnings: uniqueFindings.filter((finding) => finding.severity === "warning").length },
    findings: uniqueFindings, imports, files,
  };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const args = process.argv.slice(2);
    const index = args.indexOf("--root");
    const report = auditRepository(index >= 0 ? args[index + 1] : process.cwd(), { dnaOnly: args.includes("--dna") });
    if (args.includes("--summary")) { delete report.files; delete report.imports; }
    console.log(JSON.stringify(report, null, 2));
    process.exitCode = report.summary.errors > 0 ? 1 : 0;
  } catch {
    console.error("REPOSITORY_AUDIT_FAILED: run inside a readable Git checkout with a valid --root.");
    process.exitCode = 1;
  }
}
