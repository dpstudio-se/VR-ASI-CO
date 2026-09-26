import { i as __toESM } from "../_runtime.mjs";
import { i as require_jsx_runtime } from "../_libs/@radix-ui/react-primitive+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { Gt as useLive, It as cn, S as mergePrFn, _ as DnaEngine, b as getPrFn, h as Route$8, jt as Button, v as transcribeDna, x as listPrsFn } from "./router-D7EnYDiY.mjs";
import { t as PR_STAGES } from "./merge-check-aJhO1DPU.mjs";
import { t as XMap } from "./x-map--txeuFfU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dna-B2piTWx-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Canonical prompt for Grok xAI in VS Code (500k). Copy this string; do not paraphrase into a weaker contract. */
var VSCODE_AGENT_PROMPT = `# UPI Agent Contract — VS Code · Grok xAI · 500k

You are coding the Universal Physics Index (UPI). The owner (dpstudio-se) runs the repo. You write software and ledger JSON. You do not invent physics. You do not break the DNA/RNA loop.

Paste this **entire** file as the first message (or as the workspace agent rule). Read it before the first edit. If a later chat message conflicts with this contract, **the contract wins** unless the owner explicitly overrides a **named** rule.

Reply in the owner's language (often Swedish). Code, JSON keys, status codes, commit messages, and file names stay English.

---

## 0. Three surfaces (do not mix them)

| Surface | Role | URL |
|---|---|---|
| GitHub \`main\` | DNA-memory. Canonical typed JSON under \`data/\`. | https://github.com/dpstudio-se/Universal-Physics-Index-UPI |
| This VS Code worktree | Coding clone. Either DNA *or* RNA — check §0.1. | local |
| Live RNA | Deployed explorer. Transcribes DNA, runs labs, writes back. | https://upi-built-by-agi-teax.grok.me |

Rules:
- DNA is GitHub \`main\`. A branch, a PR, a chat, a gist, or a local unsynced file is **not** DNA until it is on \`main\`.
- RNA is the TanStack explorer (Grok App Builder sandbox and/or this live site). It **reads** DNA and **writes** proposals/nodes. It is not a second ledger.
- grok.me is a **deployed RNA snapshot**. It can lag VS Code. Never “fix” grok.me by editing DNA to match a stale UI. Fix source, then deploy. If grok.me disagrees with \`main\`, **\`main\` wins**.
- Two different projects named UPI exist. **This** one is Universal Physics Index. Mason 2026 ([arXiv:2602.20507](https://arxiv.org/abs/2602.20507)) is Unified Personal Index — a cited corpus, not infrastructure. Do not fork the name, do not ingest the files, do not add ArangoDB.

Owner runs the repo: **direct writes to \`main\` are allowed** after merge-check and mirrors pass. A PR is optional documentation, not a gate, unless CI is red.

### 0.1 Which worktree did you open?

Run \`pwd\` and \`ls\`. Then lock the role:

- **DNA clone** — you see \`data/constants/\`, \`data/open-problems/\`, little or no \`src/routes/\`. Edit JSON only. Run merge-check. Commit \`main\`. Do **not** scaffold a new React app inside DNA.
- **RNA clone / App Builder** — you see \`src/routes/lab.tsx\`, \`startup.sh\`, \`src/lib/upi/\`. Edit TypeScript. DNA writes go through \`src/lib/upi/github.server.ts\` (User-Agent \`UPI-RNA-engine\`) to GitHub. \`src/lib/upi/catalog.json\` is a **snapshot**, not a second ledger — do not invent nodes only there.
- **Live site** — you cannot SSH https://upi-built-by-agi-teax.grok.me . Change source, then the App Builder / Vercel snapshot updates.

If you cannot tell which tree you are in, **stop and ask**. Do not guess.

### 0.2 GitHub auth from VS Code

DNA writes need \`gh auth login\` or env \`GITHUB_TOKEN\` / \`GH_TOKEN\` / \`UPI_GITHUB_TOKEN\`. If you cannot write, say so. Chat JSON is not DNA.

---

## 1. Do not sabotage (hard stops)

Never:
- Delete or rewrite \`startup.sh\`, \`src/router.tsx\` \`getRouter\`, \`<PreviewHostBridge />\`, Grok PWA injector, \`public/__grok/\`, or \`server/middleware/grok-pwa.ts\`.
- Hide “Created with Grok” / Remix branding in code. That is a project setting, not a patch.
- Bind the App Builder preview off \`0.0.0.0:8080\` or start Vite without \`npm run dev\` / \`scripts/with-app-env.mjs\`.
- Add auth, \`@/lib/db\`, or migrations unless the owner names accounts. Auth stays OFF.
- Promote status (HYP→DER→EST) without named evidence and a person.
- Close a STOP by arithmetic, vibe, a matching number, or a slider that “aligns”. STOP closes only when the **identity** is named (what the quantity counts).
- Treat \`verification_type: software_test\` as \`experimental_observation\`.
- Ingest 160 TB / 31M files / Drive / Spotify / personal FS. Cite them. Map them. Do not copy them.
- Drop CODATA constants for a “better” value. \`h\`, \`c\`, \`G\`, \`k_B\`, \`ℓ_P\` live in \`src/lib/upi/physics.ts\`.
- Invent \`imagine_*\` tools or native modules that need \`apt\`.
- Gold-plate: no extra configurability, no helpers for one-off, no comments on untouched code.
- Rewrite this contract into a “friendlier” shorter version that drops STOP or mirrors.

If a request would break a hard stop: refuse that part, name the rule, continue with the productive remainder.

---

## 2. Status is strict

\`EST | DER | HYP | STOP | ERR | SYM\`

- **EST** — accepted in the stated domain with provenance (CODATA, Lorentz identity, Golay round-trip).
- **DER** — follows from named assumptions. Composition of EST maps is DER if any assumption is extra. Weakest status on a chain wins.
- **HYP** — named claim, not a law. T€@X™ 2026 \`m_I = hf/c²\` is HYP (same kilogram as DER mass equivalent; trademark is authorship, not measurement). AdS/CFT is HYP. 8 Hz is a **reference coordinate** \`f / 8\`, not a constant.
- **STOP** — identity gap or out-of-domain. Must carry \`stop_reason\` and \`falsification_conditions\`.
- **ERR** — broken round-trip or schema.
- **SYM** — similar form, different mechanism. Must not close a byte-count or physics STOP.

Promotion requires evidence + review. Elegance, repeated numbers, or a plot’s shape are insufficient.

---

## 3. Mirror function (the loop that verifies)

A change is true in this repo when a map **closes**: encode then decode, boost then inverse, Planck then Einstein then back, chunk then unique-store then replay. Same idea as \`m = E/c²\` and \`m = hf/c²\`: the rewrite is legal only if the round-trip returns the start.

Software_test mirrors that must stay green (\`src/lib/upi/odin.ts\` \`runMirrors\`, plus \`group.ts\`, \`lie.ts\`, \`einstein.ts\`, \`golay.ts\`, \`dedup.ts\`):

1. Planck–Einstein: \`f → hf → hf/c² → mc² → E/h\` recovers \`f\` (electron rest as fixture).
2. Lorentz: \`Λ(φ)\` then \`Λ(−φ)\` is identity. \`so(1,1)\` generates the boosts.
3. Einstein map: hyperbola \(E^2 - (pc)^2 = (mc^2)^2\). Rest intercept \`m = E₀/c²\`. Photon (\`m=0\`) STOP on rest frame.
4. Golay G24: encode then decode recovers the word.
5. Dedup: chunk → unique store → replay equals bytes. FNV-1a identity is software_test, not SHA-256 of Indaleko.
6. Lie: \`so(3)\` Jacobi residual ~ 0; \`so(11)\` dim = 55.

If a mirror fails: **stop coding features**. Patch the mirror. Do not “fix” it by loosening epsilon or deleting the test.

Chain rule (Lab, \`chain.ts\`):
- Walk **link by link**. Lorentz generates the Einstein map.
- Shorten only **composable** maps (invertible or explicit composition). Weakest status wins.
- **Open the loop** is honest: 11d brane / AdS dictionary does **not** invert back to frequency. That bead is STOP.

---

## 4. DNA schema (do not freelance)

Nodes: \`data/<domain>/*.json\`
Bridges: \`data/bridges/*.json\`
Sources: \`data/sources/*.json\`
Open problems: \`data/open-problems/*.json\`

Address: \`UPI<domain,generation,torus,node_id>\`
Hydration: \`src/lib/upi/hydrate.ts\`
Merge-check: \`src/lib/upi/merge-check.ts\` — STOP without \`stop_reason\` fails. Unknown keys fail. Relations must be in the closed set:

\`DERIVED_FROM, CAUSES, DUAL_TO, EQUIVALENT_WITHIN, COARSE_GRAINS_TO, COMPACTIFIES_TO, EMERGES_AS, FORM_SIMILAR, TOPOLOGY_SHARED, MECHANISM_SHARED, CANDIDATE_BRIDGE, CONTRADICTS, STOPS_AT, REPRESENTS, MEASURED_BY, FALSIFIED_BY\`

Write path (owner):
1. Investigate. Paper-quick frame. Confirm the function exists in code **before** adding files.
2. \`mergeCheck\` locally on the JSON.
3. Run relevant mirrors.
4. Commit to \`main\` (or owner-approved branch).
5. RNA: pull DNA (\`pullDna\` in \`dna-actions.ts\`) so grok.me / preview transcribes.

RNA write functions: \`proposeNodeFn\`, \`proposeBridgeFn\`, GitHub issue for external corrections. User-agent \`UPI-RNA-engine\`.

---

## 5. Keep / drop (productive, not filler)

### Keep (already in the RNA)
- Einstein map, Lorentz inverse, Planck–Einstein composition, chain beads, open-loop STOP.
- GitHub DNA / RNA engine, merge-check, correction desk, this agent contract (DNA page → Copy prompt).
- Odin three-level map as **software_test / compose / GitHub** — not as a host OS.
- Indaleko as a **cited corpus + STOP table**, issue #8.
- Dedup as identity: whole-hash, fixed chunks, CDC. \`unique = raw / copies\` is DER algebra. Using it to read 160 TB as replicas of 16.2 TB is **HYP until named**.
- Lie labs: SU(2)/SO(3), SO(11), Lorentz algebra.
- AdS/CFT as HYP duality; Ryu–Takayanagi DER; observed sky (Λ>0) STOP.
- Force-directed graph, E8/Golay/Leech **software portraits** (not a quantum device).

### Drop
- Odin Omega: RL memory allocator, DNN cache, PID/MCTS/PPO plant, HFT/climate OS, Arango as UPI store.
- Indaleko: ArangoDB, Drive/OneDrive/Spotify collectors, UUID “semantic OS”, ingest of 160 TB.
- Embedding near-dup as byte identity.
- 8 Hz as a law of nature.
- “Number for all information” / entropy-of-everything without a quantity and a measurement.

When a new document arrives: same method. Mind-map. Keep only what maps onto EST/DER software or a named HYP with falsification. Drop the rest. Do not implement filler.

---

## 6. Open STOP table (do not “fix” these with code)

Live desk: grok.me → Lab → Correction desk. DNA: \`data/open-problems/indaleko_160tb_payload_stop.json\`. Invite: https://github.com/dpstudio-se/Universal-Physics-Index-UPI/issues/8

| Claim | Cited | Status | Conflict | Closes if |
|---|---|---|---|---|
| Abstract payload | 160 TB, 31M files, 8 platforms | STOP | Body: 16.2 TB used of 35.1 TB capacity, 31.9M files | One sentence naming what 160 TB counts: raw, replicated (\`unique = raw / copies\`), provisioned, logical, or leftover draft |
| Eight storage platforms | “eight storage platforms” | STOP | Body names more than eight families | The eight names in one table or sentence |
| Activity corpus | 31M-file dataset with memory-anchor queries | STOP | Evaluation used synthetic activity metadata | Which of 160 TB / 16.2 TB is measured files vs generated anchors |

Held (not STOP): body capacity 35.1 TB DER; body used 16.2 TB DER; ArangoDB index 78.6 GB EST (~0.485 % of used).

A correction from a knowledgeable reader is saved as a reply. It does **not** auto-promote the node.

---

## 7. App map (RNA)

TanStack Start, React 19, Tailwind. Auth off. Catalog from DNA + bundled \`src/lib/upi/catalog.json\` snapshot.

| Route | Job |
|---|---|
| \`/\` | Ledger home |
| \`/catalog\` | Nodes |
| \`/n/$slug\` | Node |
| \`/graph\` | Force-directed graph |
| \`/lattice\` | E8 / Golay / Leech software portraits |
| \`/symmetry\` | Groups + Lie |
| \`/holography\` | AdS/CFT + RT |
| \`/lab\` | Einstein map, chain, Odin, Indaleko source map, STOP desk, Dedup, frequency, sonifier |
| \`/dna\` | Pull / propose / this contract / PR walk |
| \`/method\` | Honesty rules |

Core libs: \`src/lib/upi/{physics,einstein,group,lie,golay,chain,odin,indaleko,dedup,hydrate,merge-check,github.server,dna-actions,live,vscode-agent-prompt}.ts\`

UI tokens: StatusBadge, chip-row, rounded-2xl surface cards. Do not invent a second visual system.

---

## 8. Agent workflow (so nothing sabbas)

Before any code:
1. Restate the function in one sentence. If you cannot point at the file that already implements or should implement it, **stop and confirm**.
2. Paper-quick frame: keep / drop / status / which mirror will prove it.
3. Search the repo (\`rg\`) — extend, do not duplicate.

Then:
4. Smallest patch. Match existing tokens.
5. Run the relevant mirror / \`npx tsx\` on the function.
6. \`npm run typecheck\` and \`npm run build\` (RNA worktree).
7. Browser: the change is visible, no console errors, no horizontal overflow at 390px. Do not ask the owner to QA.
8. If DNA JSON changed: merge-check + write \`main\` + tell RNA to pull.

Auto-debug: if build, typecheck, or a mirror fails, **that is the task**. Patch until the loop closes. Do not leave ERR as a feature. Do not skip the first-message protocol.

Deploy lag: after VS Code commits, grok.me updates only when the App Builder / Vercel snapshot rebuilds.

---

## 9. Physics claims already in DNA (do not re-argue)

- \`E = hf\` EST (Planck).
- Inertia of energy EST (Einstein 1905). \`m = E/c²\` DER.
- \`m = hf/c²\` DER as composition. \`m_I = hf/c²\` HYP as information-mass naming (T€@X™ 2026).
- Mass shell EST. Photon rest-mass STOP.
- AdS/CFT HYP. RT formula DER. Cosmology application STOP.
- 11d / brane / “entropy of everything” is SYM/STOP until a quantity and a measurement exist. Do not assign a number to “all information”.

---

## 10. First message protocol

On session start, before any feature work:
1. \`git status\` / \`git log -5 --oneline\` and confirm remote is \`dpstudio-se/Universal-Physics-Index-UPI\` **or** you are in the RNA App Builder that talks to that repo.
2. Name the worktree: DNA or RNA (§0.1).
3. Skim \`merge-check.ts\` and \`odin.ts\` \`runMirrors\` (RNA) or \`data/open-problems/\` (DNA).
4. Answer **exactly** this, then wait or do the asked work:

> I see the mirror: encode→decode (Golay), Λφ→Λ−φ (Lorentz), f→m→f (Planck–Einstein), chunk→replay (dedup). DNA is GitHub main. RNA is grok.me. I will not close STOP with arithmetic.

If you cannot see that function, **do not start coding**. Say what is missing.

End of contract.
`;
function AgentPromptCard() {
	const [copied, setCopied] = (0, import_react.useState)(false);
	async function copy() {
		try {
			await navigator.clipboard.writeText(VSCODE_AGENT_PROMPT);
		} catch {
			const area = document.createElement("textarea");
			area.value = VSCODE_AGENT_PROMPT;
			area.setAttribute("readonly", "");
			area.style.position = "fixed";
			area.style.left = "-9999px";
			document.body.appendChild(area);
			area.select();
			document.execCommand("copy");
			area.remove();
		}
		setCopied(true);
		window.setTimeout(() => setCopied(false), 1600);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-xs uppercase tracking-widest text-subtle",
				children: "VS Code · Grok xAI · 500k"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-1 font-display text-3xl tracking-tight",
				children: "Agent contract"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 max-w-2xl text-sm text-muted",
				children: [
					"Paste this into a VS Code Grok (500k) chat as the first message. Live RNA is",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "https://upi-built-by-agi-teax.grok.me",
						target: "_blank",
						rel: "noreferrer",
						className: "text-fg underline-offset-4 hover:underline",
						children: "upi-built-by-agi-teax.grok.me"
					}),
					". GitHub main is memory. A mirror that does not close is a bug."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						onClick: () => void copy(),
						children: copied ? "Copied" : "Copy prompt"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "outline",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/upi-vscode-agent-prompt.md",
							download: "upi-vscode-agent-prompt.md",
							children: "Download .md"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "outline",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "https://github.com/dpstudio-se/Universal-Physics-Index-UPI",
							target: "_blank",
							rel: "noreferrer",
							children: "Open DNA"
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("pre", {
				className: "mt-4 max-h-64 overflow-auto whitespace-pre-wrap rounded-xl bg-bg p-4 font-mono text-[11px] leading-relaxed text-muted shadow-[var(--shadow-border)]",
				children: [VSCODE_AGENT_PROMPT.slice(0, 900), "…"]
			})
		]
	});
}
function inferStage(item, detail) {
	if (!item) return "propose";
	if (item.merged) return "dna";
	if (item.state === "closed") return "pr";
	if (item.draft) return "branch";
	if (detail?.reviews.some((r) => r.state === "APPROVED")) return "merge";
	if (detail && detail.checks.length > 0) return "review";
	if (detail) return "checks";
	return "pr";
}
function stageIndex(id) {
	return PR_STAGES.findIndex((s) => s.id === id);
}
function PrWorkflow({ selected, onSelect }) {
	const writable = useLive((s) => s.writable);
	const [filter, setFilter] = (0, import_react.useState)("open");
	const [list, setList] = (0, import_react.useState)([]);
	const [detail, setDetail] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [note, setNote] = (0, import_react.useState)(null);
	async function refreshList(state = filter) {
		setLoading(true);
		setError(null);
		try {
			const items = await listPrsFn({ data: { state } });
			setList(items);
		} catch (e) {
			setError(e instanceof Error ? e.message : String(e));
		} finally {
			setLoading(false);
		}
	}
	(0, import_react.useEffect)(() => {
		refreshList(filter);
	}, [filter]);
	(0, import_react.useEffect)(() => {
		if (!selected) {
			setDetail(null);
			return;
		}
		let cancelled = false;
		setBusy(true);
		setError(null);
		getPrFn({ data: { number: selected } }).then((d) => {
			if (!cancelled) setDetail(d);
		}).catch((e) => {
			if (!cancelled) setError(e instanceof Error ? e.message : String(e));
		}).finally(() => {
			if (!cancelled) setBusy(false);
		});
		return () => {
			cancelled = true;
		};
	}, [selected]);
	const activeIdx = stageIndex(inferStage(list.find((p) => p.number === selected) ?? detail?.item ?? null, detail));
	const files = (0, import_react.useMemo)(() => detail?.files ?? [], [detail]);
	async function onMerge() {
		if (!selected) return;
		setBusy(true);
		setNote(null);
		try {
			const result = await mergePrFn({ data: { number: selected } });
			setNote(`Squashed into DNA at ${result.sha.slice(0, 7)}.`);
			await transcribeDna();
			await refreshList(filter);
			const next = await getPrFn({ data: { number: selected } });
			setDetail(next);
		} catch (e) {
			setError(e instanceof Error ? e.message : String(e));
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-xs uppercase tracking-widest text-subtle",
				children: "Pull request workflow"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-2 font-display text-3xl tracking-tight sm:text-4xl",
				children: "From RNA to DNA"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-2xl text-muted",
				children: "A pull request is a typed mutation sitting beside the index. It is not DNA until it is merged. Explore open, merged, and blocked requests the same way the graph explores force models: same ledger, different stages."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "chip-row mt-6",
				children: PR_STAGES.map((stage, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: cn("shrink-0 rounded-md px-3 py-2 shadow-[var(--shadow-border)]", i <= activeIdx ? "bg-surface-2 text-fg" : "bg-surface text-muted"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[10px] uppercase tracking-widest",
						children: String(i + 1).padStart(2, "0")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium",
						children: stage.label
					})]
				}, stage.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-2xl text-sm text-muted",
				children: PR_STAGES[activeIdx]?.meaning
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 rounded-2xl bg-surface p-4 shadow-[var(--shadow-border)] sm:p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[11px] uppercase tracking-widest text-subtle",
							children: "Requests"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex gap-1",
							children: [
								"open",
								"closed",
								"all"
							].map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setFilter(key),
								className: cn("h-11 rounded-md px-3 text-xs", filter === key ? "bg-surface-2 text-fg" : "text-muted hover:text-fg"),
								children: key === "closed" ? "merged" : key
							}, key))
						})]
					}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 text-sm text-muted",
						children: "Reading GitHub…"
					}) : list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 text-sm text-muted",
						children: "No pull requests in this filter."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 divide-y divide-border",
						children: list.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => onSelect(item.number),
							className: cn("flex w-full min-h-11 items-start justify-between gap-3 py-3 text-left", selected === item.number ? "text-fg" : "text-muted hover:text-fg"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-mono text-xs text-subtle",
										children: ["#", item.number]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mt-1 block text-sm text-fg",
										children: item.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "mt-1 block font-mono text-[11px] text-subtle",
										children: [
											item.head,
											" → ",
											item.base,
											item.merged ? " · merged" : item.draft ? " · draft" : ` · ${item.state}`
										]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "shrink-0 font-mono text-[11px] uppercase tracking-widest text-subtle",
								children: item.user
							})]
						}) }, item.number))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 rounded-2xl bg-surface p-4 shadow-[var(--shadow-border)] sm:p-5",
					children: [!selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Select a pull request to inspect files, checks, and merge-check."
					}) : busy && !detail ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted",
						children: [
							"Loading #",
							selected,
							"…"
						]
					}) : detail ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-mono text-[11px] uppercase tracking-widest text-subtle",
								children: [
									"#",
									detail.item.number,
									" · ",
									detail.item.head
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-1 font-display text-2xl tracking-tight",
								children: detail.item.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-sm text-muted",
								children: [
									detail.mergeCheck.ok ? "Merge-check passed." : `${detail.mergeCheck.fails} fail`,
									" ",
									detail.mergeCheck.warns ? `· ${detail.mergeCheck.warns} warn` : "",
									detail.mergeState ? ` · git ${detail.mergeState}` : ""
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
								className: "mt-4 grid gap-0 text-sm",
								children: files.slice(0, 8).map((f) => {
									const fails = detail.mergeCheck.files.find((c) => c.path === f.path)?.issues.filter((i) => i.level === "fail").length ?? 0;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-baseline justify-between gap-3 border-t border-border py-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
											className: "min-w-0 truncate font-mono text-xs",
											children: f.path
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
											className: "shrink-0 font-mono text-xs tabular-nums text-muted",
											children: [
												"+",
												f.additions,
												"/−",
												f.deletions,
												fails ? ` · ${fails} fail` : ""
											]
										})]
									}, f.path);
								})
							}),
							detail.mergeCheck.files.some((f) => f.issues.length) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-4 grid gap-2 text-sm",
								children: detail.mergeCheck.files.flatMap((f) => f.issues.slice(0, 4).map((issue) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "text-muted",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: issue.level === "fail" ? "text-stop" : "text-hyp",
											children: issue.code
										}),
										" ",
										issue.message
									]
								}, `${f.path}-${issue.code}`)))
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-sm text-muted",
								children: "No schema issues on these files."
							}),
							detail.checks.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-4 grid gap-1 text-xs text-muted",
								children: detail.checks.slice(0, 6).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
									c.name,
									": ",
									c.conclusion ?? c.status
								] }, c.name))
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-xs text-muted",
								children: "No check runs on this head yet."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-5 flex flex-wrap gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: detail.item.htmlUrl,
										target: "_blank",
										rel: "noreferrer",
										children: "Open on GitHub"
									})
								}), detail.item.state === "open" && !detail.item.merged ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									disabled: busy || !writable || !detail.mergeCheck.ok || detail.mergeable === false,
									onClick: () => void onMerge(),
									children: "Squash into DNA"
								}) : null]
							}),
							note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm text-muted",
								children: note
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-xs text-muted",
								children: "Confusion guard: merging is a git operation. It does not make a HYP record EST. Checks are CI. Merge-check is UPI schema. Review is a person."
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Could not load that pull request."
					}), error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-stop",
						children: error
					}) : null]
				})]
			})
		]
	});
}
function DnaPage() {
	const { pr } = Route$8.useSearch();
	const navigate = Route$8.useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-10 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-xs uppercase tracking-widest text-subtle",
				children: "Co-working ledger"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl tracking-tight sm:text-5xl",
				children: "DNA / RNA"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 max-w-2xl text-muted",
				children: [
					"GitHub is the DNA-memory: typed JSON under ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-fg",
						children: "data/"
					}),
					". This explorer is the RNA-engine: it transcribes the index, writes proposals as pull requests, and lets you walk the merge path. A PR is not the ledger until it lands on main."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgentPromptCard, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(XMap, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DnaEngine, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrWorkflow, {
				selected: pr ?? null,
				onSelect: (n) => {
					navigate({
						to: "/dna",
						search: { pr: n ?? void 0 },
						replace: true
					});
				}
			})
		]
	});
}
//#endregion
export { DnaPage as component };
