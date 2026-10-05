import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { DNA, hydrateCatalog, schemaBridge, schemaNode } from "./hydrate";
import { mergeCheck } from "./merge-check";
import type { PrDetail, PrFile, PrListItem } from "./pr-types";
import type { Catalog, Status } from "./types";

export type { PrCheck, PrDetail, PrFile, PrListItem, PrReview } from "./pr-types";

const exec = promisify(execFile);
const API = "https://api.github.com";
const RAW = "https://raw.githubusercontent.com";
const UA = "UPI-RNA-engine";

export type DnaPull = {
  catalog: Catalog;
  sha: string;
  branch: string;
  writable: boolean;
  files: number;
  skipped: number;
  promptSources: Record<string, string>;
};

export type DnaWrite = {
  ok: true;
  branch: string;
  path: string;
  prUrl: string | null;
  htmlUrl: string;
};

type GhFile = { path: string; sha: string; type: string };

function tokenFromEnv() {
  return (
    process.env.GH_TOKEN?.trim() ||
    process.env.GITHUB_TOKEN?.trim() ||
    process.env.UPI_GITHUB_TOKEN?.trim() ||
    null
  );
}

async function tokenFromGhCli() {
  try {
    const { stdout } = await exec("gh", ["auth", "token"], { timeout: 4000 });
    const t = stdout.trim();
    return t || null;
  } catch {
    return null;
  }
}

async function githubToken() {
  return tokenFromEnv() ?? (await tokenFromGhCli());
}

async function gh<T>(path: string, init: RequestInit & { token?: string | null } = {}): Promise<T> {
  const headers: Record<string, string> = {
    accept: "application/vnd.github+json",
    "user-agent": UA,
    "x-github-api-version": "2022-11-28",
    ...(init.headers as Record<string, string> | undefined),
  };
  if (init.token) headers.authorization = `Bearer ${init.token}`;
  const res = await fetch(`${API}${path}`, { ...init, headers });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub ${res.status} ${path}: ${text.slice(0, 280)}`);
  }
  return (await res.json()) as T;
}

async function mapPool<T, R>(items: T[], limit: number, fn: (item: T) => Promise<R>) {
  const out: R[] = new Array(items.length);
  let i = 0;
  async function worker() {
    while (i < items.length) {
      const idx = i++;
      out[idx] = await fn(items[idx]!);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, () => worker()));
  return out;
}

export async function pullDnaCatalog(): Promise<DnaPull> {
  const token = await githubToken();
  const commit = await gh<{
    sha: string;
    commit: { tree: { sha: string } };
  }>(`/repos/${DNA.owner}/${DNA.repo}/commits/${DNA.branch}`, { token });
  const tree = await gh<{ tree: GhFile[]; truncated: boolean }>(
    `/repos/${DNA.owner}/${DNA.repo}/git/trees/${commit.commit.tree.sha}?recursive=1`,
    { token },
  );
  if (tree.truncated) {
    throw new Error(`GitHub tree for ${DNA.owner}/${DNA.repo}@${commit.sha} was truncated; refusing incomplete provenance.`);
  }
  const requiredPromptFiles = [
    "dna/REMOTE_DNA_STATE.json",
    "persona/SYSTEM_CORE.txt",
    "persona/CONFIG.json",
    "persona/VR_ASI_CO_UNIVERSAL_SYSTEM_PROMPT.md",
    "persona/angelica.json",
    "persona/emilia.json",
    "persona/luna.json",
  ];
  const promptSources: Record<string, string> = {};
  for (const path of requiredPromptFiles) {
    const file = tree.tree.find((entry) => entry.type === "blob" && entry.path === path);
    if (!file) {
      throw new Error(`Required Remote DNA/persona file is missing at ${DNA.owner}/${DNA.repo}@${commit.sha}: ${path}`);
    }
    promptSources[path] = file.sha;
  }
  const blobs = tree.tree.filter(
    (t) => t.type === "blob" && t.path.startsWith("data/") && t.path.endsWith(".json"),
  );
  let skipped = 0;
  const files = await mapPool(blobs, 8, async (blob) => {
    const url = `${RAW}/${DNA.owner}/${DNA.repo}/${commit.sha}/${blob.path}`;
    const res = await fetch(url, { headers: { "user-agent": UA } });
    if (!res.ok) {
      skipped += 1;
      return null;
    }
    const text = await res.text();
    try {
      return { path: blob.path, json: JSON.parse(text) as unknown };
    } catch {
      skipped += 1;
      return null;
    }
  });
  const parsed = files.filter((f): f is { path: string; json: unknown } => Boolean(f));
  const catalog = hydrateCatalog(parsed, `dna-${commit.sha.slice(0, 7)}`);
  return {
    catalog,
    sha: commit.sha,
    branch: DNA.branch,
    writable: Boolean(token),
    files: parsed.length,
    skipped,
    promptSources,
  };
}

export async function dnaWritable() {
  return Boolean(await githubToken());
}

function toBase64(text: string) {
  return Buffer.from(text, "utf8").toString("base64");
}

function branchName(slug: string) {
  const safe = slug.replace(/[^a-z0-9-]+/g, "-").replace(/-+/g, "-").slice(0, 48);
  return `rna/${safe}-${Date.now().toString(36)}`;
}

export async function commitRecord(opts: {
  path: string;
  content: string;
  message: string;
  title: string;
  body: string;
}): Promise<DnaWrite> {
  const token = await githubToken();
  if (!token) {
    throw new Error(
      "No GitHub credentials on the RNA engine. Open this app where GitHub is connected, or transcribe a JSON file into data/ by hand.",
    );
  }
  const head = await gh<{ object: { sha: string } }>(
    `/repos/${DNA.owner}/${DNA.repo}/git/ref/heads/${DNA.branch}`,
    { token },
  );
  const branch = branchName(opts.path.replace(/^data\//, "").replace(/\.json$/, ""));
  await gh(`/repos/${DNA.owner}/${DNA.repo}/git/refs`, {
    method: "POST",
    token,
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ ref: `refs/heads/${branch}`, sha: head.object.sha }),
  });

  let existingSha: string | undefined;
  try {
    const existing = await gh<{ sha: string }>(
      `/repos/${DNA.owner}/${DNA.repo}/contents/${opts.path}?ref=${branch}`,
      { token },
    );
    existingSha = existing.sha;
  } catch {
    existingSha = undefined;
  }

  const put = await gh<{ content: { html_url: string }; commit: { sha: string } }>(
    `/repos/${DNA.owner}/${DNA.repo}/contents/${opts.path}`,
    {
      method: "PUT",
      token,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        message: opts.message,
        content: toBase64(opts.content),
        branch,
        ...(existingSha ? { sha: existingSha } : {}),
      }),
    },
  );

  let prUrl: string | null = null;
  try {
    const pr = await gh<{ html_url: string }>(`/repos/${DNA.owner}/${DNA.repo}/pulls`, {
      method: "POST",
      token,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        title: opts.title,
        head: branch,
        base: DNA.branch,
        body: opts.body,
      }),
    });
    prUrl = pr.html_url;
  } catch {
    prUrl = null;
  }

  return {
    ok: true,
    branch,
    path: opts.path,
    prUrl,
    htmlUrl: put.content.html_url,
  };
}

export async function proposeNode(input: {
  domain: string;
  filename: string;
  address: string;
  title: string;
  description: string;
  status: Status;
  definitions?: string[];
  equations?: string[];
  assumptions?: string[];
  mechanism?: string;
  confusion_guard?: string;
  stop_reason?: string;
  tags?: string[];
}) {
  if (input.status === "STOP" && !input.stop_reason?.trim()) {
    throw new Error("STOP records require stop_reason.");
  }
  const file = `${input.domain.replace(/[^a-z0-9_-]/gi, "-")}/${input.filename.replace(/\.json$/i, "")}.json`;
  const path = `data/${file}`;
  const json = schemaNode(input);
  const content = `${JSON.stringify(json, null, 2)}\n`;
  return commitRecord({
    path,
    content,
    message: `rna: propose ${input.address.replace(/[<>]/g, "")}`,
    title: `RNA: ${input.title}`,
    body: [
      "Proposed from the UPI RNA engine (this UI).",
      "",
      `- Address: \`${input.address}\``,
      `- Status: **${input.status}**`,
      `- Path: \`${path}\``,
      "",
      "Human merge-check still required. Metaphor is not evidence.",
    ].join("\n"),
  });
}

export async function proposeBridge(input: {
  filename: string;
  source: string;
  target: string;
  relation: string;
  status: Status;
  equations?: string[];
  assumptions?: string[];
  mechanism?: string;
  confusion_guard?: string;
  stop_reason?: string;
}) {
  if (input.status === "STOP" && !input.stop_reason?.trim()) {
    throw new Error("STOP bridges require stop_reason.");
  }
  const file = input.filename.replace(/\.json$/i, "").replace(/[^a-z0-9_-]/gi, "-");
  const path = `data/bridges/${file}.json`;
  const json = schemaBridge(input);
  const content = `${JSON.stringify(json, null, 2)}\n`;
  return commitRecord({
    path,
    content,
    message: `rna: bridge ${input.relation}`,
    title: `RNA: ${input.relation} ${input.source} → ${input.target}`,
    body: [
      "Proposed typed bridge from the UPI RNA engine.",
      "",
      `- \`${input.source}\` **${input.relation}** \`${input.target}\``,
      `- Status: **${input.status}**`,
      "",
      "Human merge-check still required.",
    ].join("\n"),
  });
}

function toListItem(p: {
  number: number;
  title: string;
  state: string;
  draft: boolean;
  merged_at: string | null;
  html_url: string;
  user: { login: string } | null;
  created_at: string;
  updated_at: string;
  head: { ref: string; sha: string };
  base: { ref: string };
  additions?: number;
  deletions?: number;
  changed_files?: number;
}): PrListItem {
  return {
    number: p.number,
    title: p.title,
    state: p.state === "open" ? "open" : "closed",
    draft: Boolean(p.draft),
    merged: Boolean(p.merged_at),
    htmlUrl: p.html_url,
    user: p.user?.login ?? "unknown",
    createdAt: p.created_at,
    updatedAt: p.updated_at,
    head: p.head.ref,
    base: p.base.ref,
    sha: p.head.sha,
    additions: p.additions ?? null,
    deletions: p.deletions ?? null,
    changedFiles: p.changed_files ?? null,
  };
}

export async function listPullRequests(state: "open" | "closed" | "all" = "all"): Promise<PrListItem[]> {
  const token = await githubToken();
  const pulls = await gh<
    {
      number: number;
      title: string;
      state: string;
      draft: boolean;
      merged_at: string | null;
      html_url: string;
      user: { login: string } | null;
      created_at: string;
      updated_at: string;
      head: { ref: string; sha: string };
      base: { ref: string };
    }[]
  >(`/repos/${DNA.owner}/${DNA.repo}/pulls?state=${state}&per_page=20&sort=updated&direction=desc`, { token });
  return pulls.map(toListItem);
}

export async function getPullRequest(number: number): Promise<PrDetail> {
  const token = await githubToken();
  const [pr, files, reviews] = await Promise.all([
    gh<{
      number: number;
      title: string;
      state: string;
      draft: boolean;
      merged_at: string | null;
      html_url: string;
      user: { login: string } | null;
      created_at: string;
      updated_at: string;
      head: { ref: string; sha: string };
      base: { ref: string };
      body: string | null;
      mergeable: boolean | null;
      mergeable_state: string | null;
      additions: number;
      deletions: number;
      changed_files: number;
    }>(`/repos/${DNA.owner}/${DNA.repo}/pulls/${number}`, { token }),
    gh<
      {
        filename: string;
        status: string;
        additions: number;
        deletions: number;
        patch?: string;
        raw_url: string;
      }[]
    >(`/repos/${DNA.owner}/${DNA.repo}/pulls/${number}/files?per_page=100`, { token }),
    gh<{ user: { login: string } | null; state: string; body: string | null }[]>(
      `/repos/${DNA.owner}/${DNA.repo}/pulls/${number}/reviews`,
      { token },
    ),
  ]);

  const checkRuns = await gh<{ check_runs: { name: string; status: string; conclusion: string | null }[] }>(
    `/repos/${DNA.owner}/${DNA.repo}/commits/${pr.head.sha}/check-runs`,
    { token },
  ).catch(() => ({ check_runs: [] as { name: string; status: string; conclusion: string | null }[] }));

  const mappedFiles: PrFile[] = await mapPool(files, 6, async (f) => {
    let raw = "";
    try {
      const res = await fetch(f.raw_url, {
        headers: {
          "user-agent": UA,
          ...(token ? { authorization: `Bearer ${token}` } : {}),
        },
      });
      if (res.ok) raw = await res.text();
    } catch {
      raw = "";
    }
    return {
      path: f.filename,
      status: f.status,
      additions: f.additions,
      deletions: f.deletions,
      raw,
      patch: (f.patch ?? "").slice(0, 4000),
    };
  });

  return {
    item: toListItem(pr),
    body: pr.body ?? "",
    mergeable: pr.mergeable,
    mergeState: pr.mergeable_state,
    files: mappedFiles,
    reviews: reviews.map((r) => ({
      user: r.user?.login ?? "unknown",
      state: r.state,
      body: r.body ?? "",
    })),
    checks: checkRuns.check_runs.map((c) => ({
      name: c.name,
      status: c.status,
      conclusion: c.conclusion,
    })),
    mergeCheck: mergeCheck(mappedFiles.map((f) => ({ path: f.path, raw: f.raw }))),
  };
}

export async function mergePullRequest(number: number) {
  const token = await githubToken();
  if (!token) throw new Error("No GitHub credentials. Cannot merge.");
  const detail = await getPullRequest(number);
  if (!detail.mergeCheck.ok) {
    throw new Error(
      `Merge-check failed (${detail.mergeCheck.fails} fail). DNA does not take a dirty record.`,
    );
  }
  if (detail.item.merged) throw new Error("Already merged.");
  if (detail.item.state !== "open") throw new Error("Pull request is not open.");
  const result = await gh<{ merged: boolean; sha: string; message: string }>(
    `/repos/${DNA.owner}/${DNA.repo}/pulls/${number}/merge`,
    {
      method: "PUT",
      token,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        merge_method: "squash",
        commit_title: detail.item.title,
        commit_message: "RNA merge. Human merge-check passed in the explorer.",
      }),
    },
  );
  return { merged: result.merged, sha: result.sha, number };
}
