import { i as require_jsx_runtime } from "../_libs/@radix-ui/react-primitive+[...].mjs";
import { s as Search } from "../_libs/lucide-react.mjs";
import { Gt as useLive, It as cn, Lt as domainLabel, Mt as STATUSES, Rt as domainsOf, Ut as searchNodes, g as Route$9, y as Input } from "./router-D7EnYDiY.mjs";
import { t as NodeCard } from "./node-card-BWU4dM7i.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/catalog-CKiUv4ef.js
var import_jsx_runtime = require_jsx_runtime();
function CatalogPage() {
	const catalog = useLive((s) => s.catalog);
	const origin = useLive((s) => s.origin);
	const { q = "", status = "ALL", domain = "all" } = Route$9.useSearch();
	const navigate = Route$9.useNavigate();
	const results = searchNodes(q, status, domain, catalog);
	const domains = domainsOf(catalog);
	function patch(next) {
		navigate({ search: (prev) => ({
			q: next.q ?? prev.q ?? "",
			status: next.status ?? prev.status ?? "ALL",
			domain: next.domain ?? prev.domain ?? "all"
		}) });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-10 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-xs uppercase tracking-widest text-subtle",
				children: "Catalog"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl tracking-tight sm:text-5xl",
				children: "Every typed node"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 max-w-2xl text-muted",
				children: [
					"Filter by scientific status and domain. Addresses follow the form",
					" ",
					"UPI<Domain, Generation, Torus, Node>",
					"."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mt-8 max-w-xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-subtle" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: q,
					onChange: (e) => patch({ q: e.target.value }),
					placeholder: "Search titles, equations, tags…",
					className: "pl-10",
					"aria-label": "Search nodes"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 flex flex-wrap gap-2",
				children: ["ALL", ...STATUSES].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => patch({ status: s }),
					className: cn("h-11 rounded-md px-3 font-mono text-xs uppercase tracking-wide transition-colors", status === s ? "bg-accent text-accent-fg" : "bg-surface text-muted hover:text-fg"),
					children: s
				}, s))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 flex flex-wrap gap-2",
				children: ["all", ...domains].map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => patch({ domain: d }),
					className: cn("h-11 rounded-md px-3 text-xs transition-colors", domain === d ? "bg-surface-2 text-fg shadow-[var(--shadow-border)]" : "text-muted hover:text-fg"),
					children: d === "all" ? "All domains" : domainLabel(d)
				}, d))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-6 font-mono text-xs tabular-nums text-subtle",
				children: [
					results.length,
					" record",
					results.length === 1 ? "" : "s",
					origin === "dna" ? " · DNA" : " · snapshot"
				]
			}),
			results.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-10 text-muted",
				children: "No nodes match those filters."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
				children: results.map((node) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NodeCard, { node }, node.slug))
			})
		]
	});
}
//#endregion
export { CatalogPage as component };
