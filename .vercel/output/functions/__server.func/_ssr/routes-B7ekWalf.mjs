import { i as require_jsx_runtime } from "../_libs/@radix-ui/react-primitive+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as ArrowRight } from "../_libs/lucide-react.mjs";
import { Gt as useLive, Mt as STATUSES, Nt as STATUS_COPY, Pt as StatusBadge, Wt as statusCounts, jt as Button, zt as featuredNodes } from "./router-D7EnYDiY.mjs";
import { t as NodeCard } from "./node-card-BWU4dM7i.mjs";
import { n as HeroOrbit } from "./constellation-DqVPFqDX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-B7ekWalf.js
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const catalog = useLive((s) => s.catalog);
	const featured = featuredNodes(catalog);
	const counts = statusCounts(catalog);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:py-24",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "stagger-in",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-mono text-xs uppercase tracking-widest text-der",
						children: ["Open scientific ledger · v", catalog.version]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-4 font-display text-5xl leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl",
						children: "A ledger for what physics actually knows."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 max-w-xl text-lg text-muted",
						children: "Universal Physics Index stores typed nodes — quantities, equations, hypotheses, and sources — with strict status labels. Metaphor never becomes evidence."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-wrap gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/catalog",
								children: ["Browse the catalog", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/graph",
								children: "Open the graph"
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
						className: "mt-10 grid grid-cols-3 gap-4 border-t border-border pt-6",
						children: [
							[String(catalog.nodes.length), "Nodes"],
							[String(catalog.bridges.length), "Bridges"],
							[String(catalog.sources.length), "Sources"]
						].map(([n, l]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "font-mono text-xs uppercase tracking-widest text-subtle",
							children: l
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "mt-1 font-display text-3xl tabular-nums",
							children: n
						})] }, l))
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroOrbit, {})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-y border-border bg-surface/60",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto grid max-w-6xl gap-px sm:grid-cols-2 lg:grid-cols-3",
				children: STATUSES.map((status) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/catalog",
					search: {
						status,
						domain: "all",
						q: ""
					},
					className: "grid gap-2 px-5 py-6 transition-colors hover:bg-surface-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-sm tabular-nums text-muted",
							children: counts[status]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: STATUS_COPY[status].meaning
					})]
				}, status))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-t border-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-6xl items-center gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/figures/lattice-cloud.jpg",
					alt: "Filament portrait labelling E8, Leech Λ24, Golay G24, and syndrome repair",
					className: "w-full rounded-2xl outline outline-1 -outline-offset-1 outline-white/10"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs uppercase tracking-widest text-subtle",
						children: "Coding theory"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 font-display text-4xl tracking-tight",
						children: "E8, Leech, Golay"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-muted",
						children: "240 roots, a 24-dimensional packing lattice, and a perfect [24,12,8] code that repairs three bit flips. The plates are pictures. The records are mathematics."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/lattice",
								children: ["Open the lattice", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
							})
						})
					})
				] })]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-t border-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-6xl items-center gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs uppercase tracking-widest text-subtle",
						children: "Holography"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 font-display text-4xl tracking-tight",
						children: "AdS/CFT"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-muted",
						children: "A bulk geodesic whose length is the entanglement of a boundary interval. Maldacena is still a conjecture. Ryu–Takayanagi is the dictionary’s entropy. Not our sky: observed Λ has the wrong sign."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/holography",
								children: ["Open the Poincaré disk", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
							})
						})
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl bg-surface p-6 shadow-[var(--shadow-border)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[11px] uppercase tracking-widest text-subtle",
						children: "Dictionary"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-4 grid gap-3 text-sm text-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Bulk · Einstein gravity in AdS" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Boundary · CFT generating functional" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "S_A = Area(γ_A) / 4G_N" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "AdS4 × S7 · M2 / ABJM" })
						]
					})]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-t border-border bg-surface/60",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-6xl items-center gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs uppercase tracking-widest text-subtle",
						children: "Co-working"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 font-display text-4xl tracking-tight",
						children: "DNA-memory, RNA-engine"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-muted",
						children: "GitHub holds the typed JSON. This UI transcribes it into a graph and writes proposals back as pull requests. Co-working means merging into the ledger."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/dna",
								children: ["Open the RNA engine", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
							})
						})
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "grid gap-0 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-t border-border py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "font-mono text-[11px] uppercase tracking-widest text-subtle",
								children: "DNA"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-1 text-muted",
								children: "data/ on GitHub main — canonical records"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-t border-border py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "font-mono text-[11px] uppercase tracking-widest text-subtle",
								children: "RNA"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-1 text-muted",
								children: "This explorer — read, filter, propose"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-t border-border py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "font-mono text-[11px] uppercase tracking-widest text-subtle",
								children: "Guard"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-1 text-muted",
								children: "A metaphor for memory vs transcription. Not biology."
							})]
						})
					]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-4 py-16 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs uppercase tracking-widest text-subtle",
					children: "Featured records"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 font-display text-4xl tracking-tight",
					children: "Established core"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/catalog",
						children: ["All nodes", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: featured.map((node) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NodeCard, { node }, node.slug))
			})]
		})
	] });
}
//#endregion
export { Home as component };
