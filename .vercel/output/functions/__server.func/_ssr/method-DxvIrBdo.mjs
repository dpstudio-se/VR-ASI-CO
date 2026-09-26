import { i as require_jsx_runtime } from "../_libs/@radix-ui/react-primitive+[...].mjs";
import { Gt as useLive, Mt as STATUSES, Nt as STATUS_COPY, Pt as StatusBadge } from "./router-D7EnYDiY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/method-DxvIrBdo.js
var import_jsx_runtime = require_jsx_runtime();
var RULES = [
	{
		title: "Status is strict",
		body: "EST, DER, HYP, STOP, ERR, and SYM are not vibes. Promotion requires evidence and review. Elegance, repeated numbers, or a simulation’s shape are insufficient."
	},
	{
		title: "8 Hz is a reference",
		body: "The N8 index is f / 8 Hz — a configurable example coordinate in this repository, not a universal constant or proof of a mechanism."
	},
	{
		title: "Walk the chain link by link",
		body: "Lorentz generates the Einstein map. Planck then Einstein is m = hf/c² (DER). T€@X™ names that kilogram (HYP). Shortening is composition; the weakest status wins. Opening the loop is the honest picture: 11d does not invert back to frequency."
	},
	{
		title: "A pull request is not DNA",
		body: "Propose writes a branch. A PR asks to copy that branch into main. CI checks software. UPI merge-check checks schema and STOP reasons. Review is a person. Only a merge on main transcribes into the index. Squash is the default so DNA stays linear."
	},
	{
		title: "AdS/CFT is a duality, not the sky",
		body: "Maldacena’s correspondence is HYP: unproven, tightly tested inside AdS. Ryu–Takayanagi (DER) is the holographic entropy — entanglement as bulk area. Observed cosmology has Λ > 0. Applying the dictionary to the night sky STOPS."
	},
	{
		title: "A document is not DNA",
		body: "Odin Omega describes host reconfiguration, RL caches, and HFT. Keep the three-level loop as a map onto software_test, chain compose, and GitHub. Drop ArangoDB and vendor OS claims. Status stays on each node."
	},
	{
		title: "Two UPIs. Cite the 160 TB. Do not ingest it",
		body: "Mason’s Unified Personal Index (arXiv:2602.20507) is a personal-file dissertation. This ledger is the Universal Physics Index. The abstract’s 160TB / 31M files / eight platforms is a cited corpus. The body reports 16.2TB used of 35.1TB, with 78.6GB of metadata. That gap stays STOP. unique = raw / copies is DER arithmetic; using it to read 160 TB as replicas is HYP until named. Memory anchors map SYM onto provenance. Collectors here are GitHub, arXiv, CODATA — not Drive or Spotify."
	},
	{
		title: "A tweet is not DNA",
		body: "Public posts from @DrPepper_se are a source graph. m = hf/c² is already DER. Information mass stays HYP. Landauer and Schumann were unmapped EST and are now cited. TF¹⁷⁶⁶ = Gravity and “closes the Standard Model” stay STOP. Follower lists are not ingested."
	},
	{
		title: "Software tests prove software",
		body: "When a calculation or simulation is run, label it verification_type: software_test. Do not promote the result to experimental_observation."
	}
];
function MethodPage() {
	const catalog = useLive((s) => s.catalog);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl px-4 py-10 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-xs uppercase tracking-widest text-subtle",
				children: "Method"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl tracking-tight sm:text-5xl",
				children: "How the index stays honest"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 text-muted",
				children: [
					"UPI is a classification, validation, and audit layer — not a new physical theory. This snapshot is ",
					catalog.nodes.length,
					" nodes from the public repository."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-12 grid gap-4",
				children: STATUSES.map((status) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, {
						status,
						withLabel: true
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-muted",
						children: STATUS_COPY[status].meaning
					})]
				}, status))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-14 font-display text-3xl tracking-tight",
				children: "Boundary rules"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid gap-6",
				children: RULES.map((rule, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "border-t border-border pt-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-xs text-subtle",
							children: String(i + 1).padStart(2, "0")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-1 font-display text-2xl",
							children: rule.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted",
							children: rule.body
						})
					]
				}, rule.title))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-14 font-display text-3xl tracking-tight",
				children: "Contribute"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted",
				children: "A hypothesis needs status, equation, definitions, units, assumptions, provenance, uncertainty, a measurable variable, a test method, a prediction, and falsification conditions. Mark symbolic readings as SYM."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: `${catalog.sourceRepo}/issues`,
				target: "_blank",
				rel: "noreferrer",
				className: "mt-5 inline-flex h-11 items-center rounded-md bg-accent px-4 text-sm font-medium text-accent-fg",
				children: "Open an issue on GitHub"
			})
		]
	});
}
//#endregion
export { MethodPage as component };
