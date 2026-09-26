import { i as __toESM } from "../_runtime.mjs";
import { i as require_jsx_runtime } from "../_libs/@radix-ui/react-primitive+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { At as xCounts, Dt as X_ACCOUNT, It as cn, Ot as X_CLAIMS, Pt as StatusBadge, jt as Button, kt as X_PEERS } from "./router-D7EnYDiY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/x-map--txeuFfU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function XMap() {
	const counts = xCounts();
	const [sel, setSel] = (0, import_react.useState)("sm-close");
	const claim = X_CLAIMS.find((c) => c.id === sel) ?? X_CLAIMS[0];
	const layers = (0, import_react.useMemo)(() => {
		return [...new Set(X_CLAIMS.map((c) => c.layer))].map((id) => ({
			id,
			rows: X_CLAIMS.filter((c) => c.layer === id)
		}));
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-mono text-xs uppercase tracking-widest text-subtle",
				children: [
					"X graph · @",
					X_ACCOUNT.handle,
					" · ",
					counts.already,
					" already DNA · ",
					counts.cite,
					" unmapped · ",
					counts.drop,
					" drop"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl tracking-tight",
					children: "Feed map"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: "STOP" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 max-w-2xl text-sm text-muted",
				children: [
					"Public posts from",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: X_ACCOUNT.url,
						target: "_blank",
						rel: "noreferrer",
						className: "text-fg underline-offset-4 hover:underline",
						children: ["@", X_ACCOUNT.handle]
					}),
					". Follower and following lists are not in this search surface — replies and critiques are. A tweet is a source, not DNA, until it lands as a typed node."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Claims",
						value: String(counts.claims)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Already",
						value: String(counts.already)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Cite",
						value: String(counts.cite)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "STOP",
						value: String(counts.stop)
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4",
					children: layers.map((layer) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[11px] uppercase tracking-widest text-subtle",
						children: layer.id
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-2 grid gap-1",
						children: layer.rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setSel(row.id),
							className: cn("flex w-full items-center justify-between gap-3 rounded-md px-3 py-2.5 text-left text-sm", sel === row.id ? "bg-bg shadow-[var(--shadow-border)]" : "hover:bg-bg/60"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "min-w-0 truncate",
								children: row.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex shrink-0 items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeepChip, { keep: row.keep }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: row.status })]
							})]
						}) }, row.id))
					})] }, layer.id))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, { claim })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 border-t border-border pt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs uppercase tracking-widest text-subtle",
					children: "interaction graph"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 grid gap-2 sm:grid-cols-2",
					children: X_PEERS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-xl bg-bg p-3 shadow-[var(--shadow-border)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: `https://x.com/${p.handle}`,
								target: "_blank",
								rel: "noreferrer",
								className: "font-mono text-sm hover:underline",
								children: ["@", p.handle]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeepChip, { keep: p.keep })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-xs text-muted",
							children: [
								p.role,
								" · ",
								p.note
							]
						})]
					}, p.handle))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/stop",
						search: {
							group: "x",
							id: "x-sm-close"
						},
						children: "Open X STOP"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "outline",
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: X_ACCOUNT.url,
						target: "_blank",
						rel: "noreferrer",
						children: ["@", X_ACCOUNT.handle]
					})
				})]
			})
		]
	});
}
function Detail({ claim }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-bg p-4 shadow-[var(--shadow-border)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-[11px] uppercase tracking-widest text-subtle",
				children: claim.id
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-1 flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-2xl tracking-tight",
					children: claim.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: claim.status })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: claim.meaning
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 font-mono text-xs text-subtle",
				children: claim.cited
			}),
			claim.mapsTo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/n/$slug",
					params: { slug: claim.mapsTo },
					className: "text-sm text-fg underline-offset-4 hover:underline",
					children: "Open DNA node"
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted",
				children: "No DNA node. Cite only, or drop."
			}),
			claim.post ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: `https://x.com/${X_ACCOUNT.handle}/status/${claim.post}`,
					target: "_blank",
					rel: "noreferrer",
					className: "font-mono text-xs text-muted underline-offset-4 hover:underline",
					children: ["post ", claim.post]
				})
			}) : null
		]
	});
}
function KeepChip({ keep }) {
	const label = keep === "already" ? "DNA" : keep;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("font-mono text-[11px] uppercase tracking-widest", keep === "drop" ? "text-subtle" : keep === "already" ? "text-est" : "text-der"),
		children: label
	});
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-bg px-3 py-2 shadow-[var(--shadow-border)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "font-mono text-[11px] uppercase tracking-widest text-subtle",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "font-display text-2xl tracking-tight",
			children: value
		})]
	});
}
//#endregion
export { XMap as t };
