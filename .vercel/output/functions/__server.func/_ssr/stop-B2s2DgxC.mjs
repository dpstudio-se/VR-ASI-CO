import { i as __toESM } from "../_runtime.mjs";
import { i as require_jsx_runtime } from "../_libs/@radix-ui/react-primitive+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { Et as Textarea, Gt as useLive, It as cn, Pt as StatusBadge, _t as INDALEKO_PAPER, a as ISSUE_8_URL, c as addSolution, d as issueCommentMarkdown, f as loadSolutions, i as Route$2, jt as Button, l as allStops, o as PINNED_ID, p as solutionsFor, s as SOLUTION_KINDS, u as filterStops, y as Input } from "./router-D7EnYDiY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/stop-B2s2DgxC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var GROUPS = [
	{
		id: "open",
		label: "Open"
	},
	{
		id: "indaleko",
		label: "Indaleko #8"
	},
	{
		id: "ledger",
		label: "Ledger"
	},
	{
		id: "x",
		label: "X feed"
	},
	{
		id: "held",
		label: "Held"
	}
];
function StopBoard({ selectedId, group, q, onSelect, onGroup, onQuery }) {
	const catalog = useLive((s) => s.catalog);
	const items = (0, import_react.useMemo)(() => allStops(catalog), [catalog]);
	const visible = (0, import_react.useMemo)(() => filterStops(items, group, q), [
		items,
		group,
		q
	]);
	const openCount = (0, import_react.useMemo)(() => items.filter((i) => i.status === "STOP").length, [items]);
	const selected = visible.find((i) => i.id === selectedId) ?? items.find((i) => i.id === selectedId) ?? visible[0] ?? items.find((i) => i.id === "abstract-payload") ?? items[0];
	const [solutions, setSolutions] = (0, import_react.useState)([]);
	const [kind, setKind] = (0, import_react.useState)("counting-rule");
	const [draft, setDraft] = (0, import_react.useState)("");
	const [copied, setCopied] = (0, import_react.useState)(false);
	const mine = solutionsFor(solutions, selected.id);
	(0, import_react.useEffect)(() => {
		setSolutions(loadSolutions());
	}, []);
	function save() {
		setSolutions(addSolution(solutions, selected.id, kind, draft));
		setDraft("");
	}
	async function copy() {
		const text = issueCommentMarkdown(selected, mine);
		try {
			await navigator.clipboard.writeText(text);
		} catch {
			const area = document.createElement("textarea");
			area.value = text;
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "font-mono text-xs uppercase tracking-widest text-stop",
			children: [
				"open STOP · ",
				openCount,
				" waiting"
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-2 flex flex-wrap items-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl tracking-tight sm:text-5xl",
				children: "STOP desk"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: "STOP" })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-3 max-w-2xl text-muted",
			children: [
				"Every unresolved identity in one place. A solution is a counting rule or a named measurement. Saving it here does not close the node. Issue",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: ISSUE_8_URL,
					target: "_blank",
					rel: "noreferrer",
					className: "text-fg underline-offset-4 hover:underline",
					children: ["#", 8]
				}),
				": Indaleko abstract 160 TB vs body 16.2 TB used."
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 rounded-2xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs uppercase tracking-widest text-subtle",
					children: "pinned · GitHub #8"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-1 font-display text-3xl tracking-tight",
					children: "Indaleko 160 TB"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 max-w-2xl text-sm text-muted",
					children: [
						"Abstract: 160 TB, 31M files, 8 platforms. Body: 16.2 TB used of 35.1 TB capacity. Paper",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: INDALEKO_PAPER.abs,
							target: "_blank",
							rel: "noreferrer",
							className: "text-fg underline-offset-4 hover:underline",
							children: ["arXiv:", INDALEKO_PAPER.arxiv]
						}),
						". If you know what 160 TB counts, add a counting rule below."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						size: "sm",
						onClick: () => onSelect(PINNED_ID),
						children: "Open 160 TB claim"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						size: "sm",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: ISSUE_8_URL,
							target: "_blank",
							rel: "noreferrer",
							children: "Open issue #8"
						})
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 flex flex-wrap gap-2",
			children: GROUPS.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => onGroup(g.id),
				className: cn("h-11 rounded-md px-3 text-sm", group === g.id ? "bg-accent text-accent-fg" : "bg-surface text-muted hover:text-fg"),
				children: g.label
			}, g.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 max-w-xl",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: q,
				onChange: (e) => onQuery(e.target.value),
				placeholder: "Filter claims…",
				"aria-label": "Filter STOP claims"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 overflow-x-auto rounded-2xl bg-surface shadow-[var(--shadow-border)]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full min-w-[36rem] text-left text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "font-mono text-xs uppercase tracking-widest text-subtle",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 font-medium",
							children: "Claim"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-3 py-3 font-medium",
							children: "Cited"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-3 py-3 font-medium",
							children: "Status"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 font-medium",
							children: "Closes if"
						})
					]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: visible.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					colSpan: 4,
					className: "px-4 py-8 text-muted",
					children: "No STOP in this filter."
				}) }) : visible.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: cn("cursor-pointer border-t border-border", selected.id === item.id ? "bg-surface-2" : "hover:bg-bg/60"),
					onClick: () => onSelect(item.id),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							className: "px-4 py-3 align-top",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "text-left",
								children: item.title
							}), item.issue ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "mt-1 block font-mono text-[11px] uppercase tracking-widest text-subtle",
								children: ["issue #", item.issue]
							}) : null]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-3 py-3 align-top font-mono text-xs text-muted",
							children: item.cited
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-3 py-3 align-top",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: item.status })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3 align-top text-muted",
							children: item.closesIf
						})
					]
				}, item.id)) })]
			})
		}),
		selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, {
			item: selected,
			solutions: mine
		}) : null,
		selected?.status === "STOP" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "mt-6 grid gap-3 rounded-2xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6",
			onSubmit: (e) => {
				e.preventDefault();
				save();
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs uppercase tracking-widest text-subtle",
					children: "add a solution"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl tracking-tight",
					children: "Does not close STOP"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Name the quantity, the unit, and the counting rule. A matching number is not an identity."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: SOLUTION_KINDS.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setKind(k.id),
						className: cn("h-11 rounded-md px-3 text-sm", kind === k.id ? "bg-accent text-accent-fg" : "bg-bg text-muted hover:text-fg"),
						children: k.label
					}, k.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "grid gap-1.5 text-sm font-medium",
					children: ["Solution", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						value: draft,
						onChange: (e) => setDraft(e.target.value),
						placeholder: "160 TB is … (raw / replicated / provisioned / draft leftover). Source: …",
						rows: 5
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							disabled: !draft.trim(),
							children: "Save solution"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "secondary",
							onClick: () => void copy(),
							children: copied ? "Copied" : "Copy for issue"
						}),
						selected.issue ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: ISSUE_8_URL,
								target: "_blank",
								rel: "noreferrer",
								children: "Paste on #8"
							})
						}) : null
					]
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-6 text-sm text-muted",
			children: "Held rows are not waiting. No solution box."
		})
	] });
}
function Detail({ item, solutions }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-6 rounded-2xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-xs uppercase tracking-widest text-subtle",
				children: item.id
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-1 flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl tracking-tight",
					children: item.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: item.status })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted",
				children: item.conflict
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "mt-4 grid gap-0 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Cited",
						value: item.cited
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Closes if",
						value: item.closesIf
					}),
					item.file ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "DNA",
						value: item.file
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap gap-2",
				children: [item.slug && item.kind === "node" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "outline",
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/n/$slug",
						params: { slug: item.slug },
						children: "Open node"
					})
				}) : null, item.issue ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "outline",
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: ISSUE_8_URL,
						target: "_blank",
						rel: "noreferrer",
						children: ["Issue #", item.issue]
					})
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 border-t border-border pt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-mono text-xs uppercase tracking-widest text-subtle",
					children: [
						"solutions · ",
						solutions.length,
						" local"
					]
				}), solutions.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "None yet. Add one below."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 grid gap-3",
					children: solutions.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-xl bg-bg p-4 shadow-[var(--shadow-border)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-mono text-[11px] uppercase tracking-widest text-subtle",
							children: [
								s.kind,
								" · ",
								s.at.slice(0, 10)
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 whitespace-pre-wrap text-sm",
							children: s.text
						})]
					}, s.id))
				})]
			})
		]
	});
}
function Row({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-baseline justify-between gap-4 border-t border-border py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "shrink-0 text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "text-right font-mono text-xs",
			children: value
		})]
	});
}
function StopPage() {
	const { id = PINNED_ID, q = "", group = "open" } = Route$2.useSearch();
	const navigate = Route$2.useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-6xl px-4 py-10 sm:px-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StopBoard, {
			selectedId: id,
			group,
			q,
			onSelect: (next) => {
				navigate({ search: (prev) => ({
					...prev,
					id: next
				}) });
			},
			onGroup: (next) => {
				navigate({ search: (prev) => ({
					...prev,
					group: next
				}) });
			},
			onQuery: (next) => {
				navigate({ search: (prev) => ({
					...prev,
					q: next
				}) });
			}
		})
	});
}
//#endregion
export { StopPage as component };
