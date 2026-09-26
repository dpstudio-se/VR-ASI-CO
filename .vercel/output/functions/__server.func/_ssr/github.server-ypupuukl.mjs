import { a as schemaBridge, n as hydrateCatalog, o as schemaNode, t as DNA } from "./hydrate-fmjOcMXR.mjs";
import { n as mergeCheck } from "./merge-check-aJhO1DPU.mjs";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
//#region node_modules/.nitro/vite/services/ssr/assets/github.server-ypupuukl.js
var exec = promisify(execFile);
var API = "https://api.github.com";
var RAW = "https://raw.githubusercontent.com";
var UA = "UPI-RNA-engine";
function tokenFromEnv() {
	return process.env.GH_TOKEN?.trim() || process.env.GITHUB_TOKEN?.trim() || process.env.UPI_GITHUB_TOKEN?.trim() || null;
}
async function tokenFromGhCli() {
	try {
		const { stdout } = await exec("gh", ["auth", "token"], { timeout: 4e3 });
		return stdout.trim() || null;
	} catch {
		return null;
	}
}
async function githubToken() {
	return tokenFromEnv() ?? await tokenFromGhCli();
}
async function gh(path, init = {}) {
	const headers = {
		accept: "application/vnd.github+json",
		"user-agent": UA,
		"x-github-api-version": "2022-11-28",
		...init.headers
	};
	if (init.token) headers.authorization = `Bearer ${init.token}`;
	const res = await fetch(`${API}${path}`, {
		...init,
		headers
	});
	if (!res.ok) {
		const text = await res.text();
		throw new Error(`GitHub ${res.status} ${path}: ${text.slice(0, 280)}`);
	}
	return await res.json();
}
async function mapPool(items, limit, fn) {
	const out = new Array(items.length);
	let i = 0;
	async function worker() {
		while (i < items.length) {
			const idx = i++;
			out[idx] = await fn(items[idx]);
		}
	}
	await Promise.all(Array.from({ length: Math.min(limit, items.length) }, () => worker()));
	return out;
}
async function pullDnaCatalog() {
	const token = await githubToken();
	const commit = await gh(`/repos/${DNA.owner}/${DNA.repo}/commits/${DNA.branch}`, { token });
	const blobs = (await gh(`/repos/${DNA.owner}/${DNA.repo}/git/trees/${commit.commit.tree.sha}?recursive=1`, { token })).tree.filter((t) => t.type === "blob" && t.path.startsWith("data/") && t.path.endsWith(".json"));
	let skipped = 0;
	const parsed = (await mapPool(blobs, 8, async (blob) => {
		const url = `${RAW}/${DNA.owner}/${DNA.repo}/${commit.sha}/${blob.path}`;
		const res = await fetch(url, { headers: { "user-agent": UA } });
		if (!res.ok) {
			skipped += 1;
			return null;
		}
		const text = await res.text();
		try {
			return {
				path: blob.path,
				json: JSON.parse(text)
			};
		} catch {
			skipped += 1;
			return null;
		}
	})).filter((f) => Boolean(f));
	return {
		catalog: hydrateCatalog(parsed, `dna-${commit.sha.slice(0, 7)}`),
		sha: commit.sha,
		branch: DNA.branch,
		writable: Boolean(token),
		files: parsed.length,
		skipped
	};
}
function toBase64(text) {
	return Buffer.from(text, "utf8").toString("base64");
}
function branchName(slug) {
	return `rna/${slug.replace(/[^a-z0-9-]+/g, "-").replace(/-+/g, "-").slice(0, 48)}-${Date.now().toString(36)}`;
}
async function commitRecord(opts) {
	const token = await githubToken();
	if (!token) throw new Error("No GitHub credentials on the RNA engine. Open this app where GitHub is connected, or transcribe a JSON file into data/ by hand.");
	const head = await gh(`/repos/${DNA.owner}/${DNA.repo}/git/ref/heads/${DNA.branch}`, { token });
	const branch = branchName(opts.path.replace(/^data\//, "").replace(/\.json$/, ""));
	await gh(`/repos/${DNA.owner}/${DNA.repo}/git/refs`, {
		method: "POST",
		token,
		headers: { "content-type": "application/json" },
		body: JSON.stringify({
			ref: `refs/heads/${branch}`,
			sha: head.object.sha
		})
	});
	let existingSha;
	try {
		existingSha = (await gh(`/repos/${DNA.owner}/${DNA.repo}/contents/${opts.path}?ref=${branch}`, { token })).sha;
	} catch {
		existingSha = void 0;
	}
	const put = await gh(`/repos/${DNA.owner}/${DNA.repo}/contents/${opts.path}`, {
		method: "PUT",
		token,
		headers: { "content-type": "application/json" },
		body: JSON.stringify({
			message: opts.message,
			content: toBase64(opts.content),
			branch,
			...existingSha ? { sha: existingSha } : {}
		})
	});
	let prUrl = null;
	try {
		prUrl = (await gh(`/repos/${DNA.owner}/${DNA.repo}/pulls`, {
			method: "POST",
			token,
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				title: opts.title,
				head: branch,
				base: DNA.branch,
				body: opts.body
			})
		})).html_url;
	} catch {
		prUrl = null;
	}
	return {
		ok: true,
		branch,
		path: opts.path,
		prUrl,
		htmlUrl: put.content.html_url
	};
}
async function proposeNode(input) {
	if (input.status === "STOP" && !input.stop_reason?.trim()) throw new Error("STOP records require stop_reason.");
	const path = `data/${`${input.domain.replace(/[^a-z0-9_-]/gi, "-")}/${input.filename.replace(/\.json$/i, "")}.json`}`;
	const json = schemaNode(input);
	return commitRecord({
		path,
		content: `${JSON.stringify(json, null, 2)}\n`,
		message: `rna: propose ${input.address.replace(/[<>]/g, "")}`,
		title: `RNA: ${input.title}`,
		body: [
			"Proposed from the UPI RNA engine (this UI).",
			"",
			`- Address: \`${input.address}\``,
			`- Status: **${input.status}**`,
			`- Path: \`${path}\``,
			"",
			"Human merge-check still required. Metaphor is not evidence."
		].join("\n")
	});
}
async function proposeBridge(input) {
	if (input.status === "STOP" && !input.stop_reason?.trim()) throw new Error("STOP bridges require stop_reason.");
	const path = `data/bridges/${input.filename.replace(/\.json$/i, "").replace(/[^a-z0-9_-]/gi, "-")}.json`;
	const json = schemaBridge(input);
	return commitRecord({
		path,
		content: `${JSON.stringify(json, null, 2)}\n`,
		message: `rna: bridge ${input.relation}`,
		title: `RNA: ${input.relation} ${input.source} → ${input.target}`,
		body: [
			"Proposed typed bridge from the UPI RNA engine.",
			"",
			`- \`${input.source}\` **${input.relation}** \`${input.target}\``,
			`- Status: **${input.status}**`,
			"",
			"Human merge-check still required."
		].join("\n")
	});
}
function toListItem(p) {
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
		changedFiles: p.changed_files ?? null
	};
}
async function listPullRequests(state = "all") {
	const token = await githubToken();
	return (await gh(`/repos/${DNA.owner}/${DNA.repo}/pulls?state=${state}&per_page=20&sort=updated&direction=desc`, { token })).map(toListItem);
}
async function getPullRequest(number) {
	const token = await githubToken();
	const [pr, files, reviews] = await Promise.all([
		gh(`/repos/${DNA.owner}/${DNA.repo}/pulls/${number}`, { token }),
		gh(`/repos/${DNA.owner}/${DNA.repo}/pulls/${number}/files?per_page=100`, { token }),
		gh(`/repos/${DNA.owner}/${DNA.repo}/pulls/${number}/reviews`, { token })
	]);
	const checkRuns = await gh(`/repos/${DNA.owner}/${DNA.repo}/commits/${pr.head.sha}/check-runs`, { token }).catch(() => ({ check_runs: [] }));
	const mappedFiles = await mapPool(files, 6, async (f) => {
		let raw = "";
		try {
			const res = await fetch(f.raw_url, { headers: {
				"user-agent": UA,
				...token ? { authorization: `Bearer ${token}` } : {}
			} });
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
			patch: (f.patch ?? "").slice(0, 4e3)
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
			body: r.body ?? ""
		})),
		checks: checkRuns.check_runs.map((c) => ({
			name: c.name,
			status: c.status,
			conclusion: c.conclusion
		})),
		mergeCheck: mergeCheck(mappedFiles.map((f) => ({
			path: f.path,
			raw: f.raw
		})))
	};
}
async function mergePullRequest(number) {
	const token = await githubToken();
	if (!token) throw new Error("No GitHub credentials. Cannot merge.");
	const detail = await getPullRequest(number);
	if (!detail.mergeCheck.ok) throw new Error(`Merge-check failed (${detail.mergeCheck.fails} fail). DNA does not take a dirty record.`);
	if (detail.item.merged) throw new Error("Already merged.");
	if (detail.item.state !== "open") throw new Error("Pull request is not open.");
	const result = await gh(`/repos/${DNA.owner}/${DNA.repo}/pulls/${number}/merge`, {
		method: "PUT",
		token,
		headers: { "content-type": "application/json" },
		body: JSON.stringify({
			merge_method: "squash",
			commit_title: detail.item.title,
			commit_message: "RNA merge. Human merge-check passed in the explorer."
		})
	});
	return {
		merged: result.merged,
		sha: result.sha,
		number
	};
}
//#endregion
export { getPullRequest, listPullRequests, mergePullRequest, proposeBridge, proposeNode, pullDnaCatalog };
