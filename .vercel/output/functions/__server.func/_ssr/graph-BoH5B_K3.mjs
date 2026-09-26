import { i as require_jsx_runtime } from "../_libs/@radix-ui/react-primitive+[...].mjs";
import { Gt as useLive, m as Route$7 } from "./router-D7EnYDiY.mjs";
import { t as Constellation } from "./constellation-DqVPFqDX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/graph-BoH5B_K3.js
var import_jsx_runtime = require_jsx_runtime();
function GraphPage() {
	const nodes = useLive((s) => s.catalog.nodes.length);
	const { node } = Route$7.useSearch();
	const navigate = Route$7.useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto min-w-0 max-w-6xl px-4 py-10 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-xs uppercase tracking-widest text-subtle",
				children: "Relations"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl tracking-tight sm:text-5xl",
				children: "Force graph"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 max-w-2xl text-muted",
				children: [
					"Compare how Fruchterman–Reingold, ForceAtlas2, and a spring–Coulomb field arrange the same",
					` ${nodes} `,
					"records. Drag a node, reheat, or switch models."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Constellation, {
					focusSlug: node,
					onFocusSlug: (slug) => {
						navigate({
							to: "/graph",
							search: { node: slug ?? void 0 },
							replace: true
						});
					}
				})
			})
		]
	});
}
//#endregion
export { GraphPage as component };
