import { i as require_jsx_runtime } from "../_libs/@radix-ui/react-primitive+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { It as cn, Lt as domainLabel, Pt as StatusBadge } from "./router-D7EnYDiY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/node-card-BWU4dM7i.js
var import_jsx_runtime = require_jsx_runtime();
function NodeCard({ node, className }) {
	const equation = node.equations[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/n/$slug",
		params: { slug: node.slug },
		className: cn("group flex flex-col rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]", "transition-[box-shadow,transform] duration-200 ease-out", "hover:shadow-[var(--shadow-border-hover)] hover:-translate-y-px", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: node.status }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "truncate font-mono text-xs text-subtle",
					children: domainLabel(node.domain)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-4 font-display text-2xl leading-snug tracking-tight group-hover:text-accent",
				children: node.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 line-clamp-3 text-sm text-muted",
				children: node.description
			}),
			equation ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 truncate font-mono text-xs text-der",
				children: equation
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 font-mono text-xs text-subtle",
				children: node.address_parts.node_id
			})
		]
	});
}
//#endregion
export { NodeCard as t };
