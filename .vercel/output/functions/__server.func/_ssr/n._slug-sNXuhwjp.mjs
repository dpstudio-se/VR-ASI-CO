import { i as __toESM } from "../_runtime.mjs";
import { i as require_jsx_runtime } from "../_libs/@radix-ui/react-primitive+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as ArrowRight, g as Check, h as Copy, i as Waypoints, v as ArrowLeft } from "../_libs/lucide-react.mjs";
import { Ft as bridgesFor, Gt as useLive, Ht as getNodeByAddress, It as cn, Lt as domainLabel, Nt as STATUS_COPY, Pt as StatusBadge, Vt as getNode, jt as Button, n as Route, ot as formatScientific } from "./router-D7EnYDiY.mjs";
import { t as Root } from "../_libs/radix-ui__react-separator.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/n._slug-sNXuhwjp.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Separator({ className, orientation = "horizontal", decorative = true, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
		decorative,
		orientation,
		className: cn("shrink-0 bg-border", orientation === "horizontal" ? "h-px w-full" : "h-full w-px", className),
		...props
	});
}
function Section({ title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "grid gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-mono text-xs uppercase tracking-widest text-subtle",
			children: title
		}), children]
	});
}
function NodeDetail({ node }) {
	const [copied, setCopied] = (0, import_react.useState)(false);
	const bridges = bridgesFor(node.address);
	async function copyAddress() {
		await navigator.clipboard.writeText(node.address);
		setCopied(true);
		window.setTimeout(() => setCopied(false), 1400);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "mx-auto max-w-3xl px-4 py-10 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/catalog",
				className: "inline-flex items-center gap-1.5 text-sm text-muted hover:text-fg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "Catalog"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mt-8 grid gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, {
								status: node.status,
								withLabel: true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-xs text-subtle",
								children: domainLabel(node.domain)
							}),
							node.verification_type ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-mono text-xs text-subtle",
								children: ["verification_type: ", node.verification_type]
							}) : null
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-4xl leading-tight tracking-tight sm:text-5xl",
						children: node.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-2xl text-base text-muted",
						children: node.description
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
								className: "max-w-full truncate rounded-md bg-surface-2 px-2.5 py-1.5 font-mono text-xs text-muted",
								children: node.address
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "ghost",
								size: "sm",
								onClick: copyAddress,
								"aria-label": "Copy address",
								children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3.5" }), copied ? "Copied" : "Copy"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								size: "sm",
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/graph",
									search: { node: node.slug },
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Waypoints, { className: "size-3.5" }), "View in graph"]
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: STATUS_COPY[node.status].meaning
					})
				]
			}),
			node.confusion_guard ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "mt-8 rounded-xl border border-hyp/30 bg-hyp/10 p-4 text-sm text-fg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs uppercase tracking-widest text-hyp",
					children: "Confusion guard"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-muted",
					children: node.confusion_guard
				})]
			}) : null,
			node.stop_reason ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "mt-4 rounded-xl border border-stop/30 bg-stop/10 p-4 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs uppercase tracking-widest text-stop",
					children: "Stop reason"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-muted",
					children: node.stop_reason
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 grid gap-10",
				children: [
					node.equations.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
						title: "Equations",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "grid gap-2",
							children: node.equations.map((eq) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: "rounded-lg bg-surface px-4 py-3 font-mono text-sm text-der shadow-[var(--shadow-border)]",
								children: eq
							}, eq))
						})
					}) : null,
					node.quantities.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
						title: "Quantities",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "overflow-x-auto rounded-xl bg-surface shadow-[var(--shadow-border)]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
								className: "w-full min-w-80 text-left text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
									className: "border-b border-border text-xs uppercase tracking-wide text-subtle",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-4 py-2.5 font-medium",
											children: "Name"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-4 py-2.5 font-medium",
											children: "Value"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-4 py-2.5 font-medium",
											children: "Unit"
										})
									] })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: node.quantities.map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "border-b border-border last:border-0",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-2.5",
											children: q.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "px-4 py-2.5 font-mono tabular-nums",
											children: [formatScientific(q.value, 8), q.uncertainty != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-subtle",
												children: [" ± ", formatScientific(q.uncertainty, 2)]
											}) : null]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-2.5 text-muted",
											children: q.unit
										})
									]
								}, q.name)) })]
							})
						})
					}) : null,
					node.definitions.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
						title: "Definitions",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "grid gap-2 text-sm text-muted",
							children: node.definitions.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: "border-l border-border-strong pl-3",
								children: item
							}, item))
						})
					}) : null,
					node.assumptions.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
						title: "Assumptions",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "grid gap-2 text-sm text-muted",
							children: node.assumptions.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["· ", item] }, item))
						})
					}) : null,
					node.mechanism ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
						title: "Mechanism",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: node.mechanism
						})
					}) : null,
					node.evidence.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
						title: "Evidence",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "grid gap-3",
							children: node.evidence.map((ev) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "rounded-lg bg-surface p-4 text-sm shadow-[var(--shadow-border)]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-mono text-xs uppercase tracking-wide text-subtle",
										children: ev.type
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1",
										children: ev.source
									}),
									ev.notes ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-muted",
										children: ev.notes
									}) : null
								]
							}, ev.source))
						})
					}) : null,
					node.primary_sources.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
						title: "Primary sources",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "grid gap-1.5 text-sm text-muted",
							children: node.primary_sources.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: s }, s))
						})
					}) : null,
					node.predictions.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
						title: "Predictions",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "grid gap-1.5 text-sm text-muted",
							children: node.predictions.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: s }, s))
						})
					}) : null,
					node.falsification_conditions.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
						title: "Falsification",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "grid gap-1.5 text-sm text-muted",
							children: node.falsification_conditions.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: s }, s))
						})
					}) : null,
					node.key_concepts.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
						title: "Key concepts",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-2",
							children: node.key_concepts.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-sm bg-surface-2 px-2 py-1 text-xs text-muted",
								children: c
							}, c))
						})
					}) : null,
					node.tags.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
						title: "Tags",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-2",
							children: node.tags.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-sm bg-surface-2 px-2 py-1 font-mono text-xs text-muted",
								children: c
							}, c))
						})
					}) : null,
					bridges.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
						title: "Bridges",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "grid gap-2",
							children: bridges.map((b) => {
								const other = b.source === node.address ? b.target : b.source;
								const otherNode = getNodeByAddress(other);
								const outbound = b.source === node.address;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: otherNode ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/n/$slug",
									params: { slug: otherNode.slug },
									className: "flex items-start justify-between gap-3 rounded-lg bg-surface p-4 text-sm shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-mono text-xs text-subtle",
										children: [
											outbound ? "out" : "in",
											" · ",
											b.relation
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mt-1 block",
										children: otherNode.title
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "mt-0.5 size-4 shrink-0 text-subtle" })]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-lg bg-surface p-4 text-sm shadow-[var(--shadow-border)]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-mono text-xs text-subtle",
										children: b.relation
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 break-all font-mono text-xs text-muted",
										children: other
									})]
								}) }, b.slug);
							})
						})
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, { className: "my-10" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-xs text-subtle",
				children: node.file
			})
		]
	});
}
function NodePage() {
	const catalog = useLive((s) => s.catalog);
	const { slug } = Route.useParams();
	const node = getNode(slug, catalog);
	if (!node) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-lg px-4 py-24 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-xs uppercase tracking-widest text-subtle",
				children: "STOP"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-4xl",
				children: "Record not in this snapshot"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-muted",
				children: "The address is unknown in the transcribed index."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/catalog",
				className: "mt-6 inline-block text-sm text-accent hover:underline",
				children: "Return to catalog"
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NodeDetail, { node });
}
//#endregion
export { NodePage as component };
