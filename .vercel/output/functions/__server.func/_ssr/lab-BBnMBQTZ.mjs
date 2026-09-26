import { i as __toESM } from "../_runtime.mjs";
import { t as DNA } from "./hydrate-fmjOcMXR.mjs";
import { i as require_jsx_runtime } from "../_libs/@radix-ui/react-primitive+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as Play, o as Square } from "../_libs/lucide-react.mjs";
import { $ as DNA_NOTES, B as nearlyEqual, Ct as logBarPct, Et as Textarea, G as u1RoundTrip, Gt as useLive, It as cn, L as jacobiResidual, Pt as StatusBadge, Q as BOLTZMANN_K, R as lorentzRoundTrip, St as formatBytes, Tt as stopTableMarkdown, U as so11RoundTrip, V as planckEinsteinRoundTrip, W as so3RoundTrip, Z as znRoundTrip, _t as INDALEKO_PAPER, at as energyFromFrequency, bt as PLATFORMS, ct as n8Index, dt as ANCHOR_MAP, et as G_NEWTON, ft as CORPUS, gt as INDALEKO_NODES, ht as INDALEKO_LAYERS, it as bekensteinHawkingSOverK, jt as Button, lt as parseDnaSequence, mt as HELD_ROWS, nt as PLANCK_LENGTH, ot as formatScientific, pt as CORPUS_ROWS, rt as SPEED_OF_LIGHT, st as massEquivalent, tt as PLANCK_H, ut as schwarzschildRadius, vt as OPEN_STOPS, wt as runCorpusAudit, xt as STOP_REPLY_HINT, y as Input, yt as PHYSICS_SOURCES } from "./router-D7EnYDiY.mjs";
import { t as XMap } from "./x-map--txeuFfU.mjs";
import { i as encodeGolay, r as decodeGolay } from "./golay-B0mI-8nX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/lab-BBnMBQTZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var DEDUP_METHODS = [
	{
		id: "whole",
		title: "Whole-object hash",
		keep: "keep",
		status: "EST",
		meaning: "SHA-family or FNV identity of a file. Same bytes, same id. This lab uses FNV-1a so the round-trip is synchronous."
	},
	{
		id: "fixed",
		title: "Fixed-size chunks",
		keep: "keep",
		status: "EST",
		meaning: "Split on a byte boundary. Fast. Insert one byte and every later chunk shifts. Backup systems still use it for cold blocks."
	},
	{
		id: "cdc",
		title: "Content-defined chunks",
		keep: "keep",
		status: "EST",
		meaning: "Cut when a rolling hash hits a mask. Insertions stay local. restic, borg, casync. Not a measurement of Indaleko."
	},
	{
		id: "replica",
		title: "Replica arithmetic",
		keep: "keep",
		status: "DER",
		meaning: "unique = raw / copies. Algebra. Using it to read 160 TB as copies of 16.2 TB is HYP until the author names that rule."
	},
	{
		id: "embed",
		title: "Embedding near-dup",
		keep: "drop",
		status: "SYM",
		meaning: "Similar meaning is not the same bytes. Must not close a payload STOP."
	},
	{
		id: "uuid",
		title: "UUID semantic map",
		keep: "drop",
		status: "STOP",
		meaning: "Indaleko’s privacy identifiers. Not content-addressed storage."
	}
];
function fnv1aRange(bytes, start, end) {
	let h = 2166136261;
	for (let i = start; i < end; i++) {
		h ^= bytes[i];
		h = Math.imul(h, 16777619) >>> 0;
	}
	return h.toString(16).padStart(8, "0");
}
function fnv1a(bytes) {
	return fnv1aRange(bytes, 0, bytes.length);
}
function encodeUtf8(text) {
	return new TextEncoder().encode(text);
}
function fixedChunks(bytes, size) {
	const n = Math.max(8, Math.floor(size));
	const out = [];
	for (let i = 0; i < bytes.length; i += n) {
		const end = Math.min(bytes.length, i + n);
		out.push({
			hash: fnv1aRange(bytes, i, end),
			start: i,
			length: end - i
		});
	}
	return out;
}
/** Gear-style CDC: cut when the rolling hash hits a mask. min/max bound the chunk. */
function cdcChunks(bytes, avg = 64) {
	const target = Math.max(16, Math.floor(avg));
	const mask = target - 1;
	const min = Math.max(8, Math.floor(target / 2));
	const max = target * 4;
	const out = [];
	let start = 0;
	let rh = 0;
	for (let i = 0; i < bytes.length; i++) {
		rh = Math.imul(rh, 257) + bytes[i] >>> 0;
		const len = i - start + 1;
		if (len >= max || len >= min && (rh & mask) === 0 || i === bytes.length - 1) {
			out.push({
				hash: fnv1aRange(bytes, start, i + 1),
				start,
				length: i + 1 - start
			});
			start = i + 1;
			rh = 0;
		}
	}
	return out;
}
function wholeChunks(bytes) {
	if (bytes.length === 0) return [];
	return [{
		hash: fnv1a(bytes),
		start: 0,
		length: bytes.length
	}];
}
function chunk(bytes, mode, size = 64) {
	if (mode === "whole") return wholeChunks(bytes);
	if (mode === "fixed") return fixedChunks(bytes, size);
	return cdcChunks(bytes, size);
}
function uniqueStore(bytes, chunks) {
	const store = /* @__PURE__ */ new Map();
	for (const c of chunks) if (!store.has(c.hash)) store.set(c.hash, bytes.slice(c.start, c.start + c.length));
	let unique = 0;
	for (const part of store.values()) unique += part.length;
	return {
		store,
		unique,
		distinct: store.size
	};
}
function replay(chunks, store) {
	let total = 0;
	for (const c of chunks) total += c.length;
	const out = new Uint8Array(total);
	let o = 0;
	for (const c of chunks) {
		const part = store.get(c.hash);
		if (!part) return null;
		out.set(part, o);
		o += part.length;
	}
	return out;
}
function equalBytes(a, b) {
	if (a.length !== b.length) return false;
	for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
	return true;
}
function runDedup(bytes, mode, size = 64) {
	const chunks = chunk(bytes, mode, size);
	const stored = uniqueStore(bytes, chunks);
	const rebuilt = replay(chunks, stored.store);
	const closed = rebuilt !== null && equalBytes(bytes, rebuilt);
	return {
		mode,
		raw: bytes.length,
		unique: stored.unique,
		distinct: stored.distinct,
		copies: stored.unique === 0 ? 0 : bytes.length / stored.unique,
		closed,
		hash: fnv1a(bytes)
	};
}
/** 160 TB / 16.2 TB used. Algebra only — not a measurement. */
function corpusReplicaFactor() {
	return CORPUS.abstract.bytes / CORPUS.body.usedBytes;
}
function uniqueFromCopies(rawBytes, copies) {
	if (copies <= 0) return NaN;
	return rawBytes / copies;
}
function replicaAligns(copies) {
	const target = corpusReplicaFactor();
	return Math.abs(copies - target) / target < .02;
}
var SAMPLE_TWIN = [
	"Planck: E = hf.",
	"Einstein: E = mc².",
	"Planck: E = hf.",
	"Einstein: E = mc²."
].join("\n");
var SAMPLE_UNIQUE = "abcdefghijklmnopqrstuvwxyz 0123456789 Planck Einstein Lorentz.";
var SAMPLE_BLOCK = "E = hf.\n".repeat(24);
var MODES = [
	{
		id: "whole",
		label: "Whole"
	},
	{
		id: "fixed",
		label: "Fixed"
	},
	{
		id: "cdc",
		label: "CDC"
	}
];
function DedupLab() {
	const [text, setText] = (0, import_react.useState)(SAMPLE_BLOCK);
	const [mode, setMode] = (0, import_react.useState)("cdc");
	const [size, setSize] = (0, import_react.useState)(32);
	const [copies, setCopies] = (0, import_react.useState)(corpusReplicaFactor());
	const [sel, setSel] = (0, import_react.useState)("cdc");
	const method = DEDUP_METHODS.find((m) => m.id === sel) ?? DEDUP_METHODS[0];
	const keep = DEDUP_METHODS.filter((m) => m.keep === "keep");
	const drop = DEDUP_METHODS.filter((m) => m.keep === "drop");
	const bytes = (0, import_react.useMemo)(() => encodeUtf8(text), [text]);
	const result = (0, import_react.useMemo)(() => runDedup(bytes, mode, size), [
		bytes,
		mode,
		size
	]);
	const uniqueAtCopies = uniqueFromCopies(CORPUS.abstract.bytes, copies);
	const aligns = replicaAligns(copies);
	const factor = corpusReplicaFactor();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-xs uppercase tracking-widest text-subtle",
				children: "unique vs copies · verification_type: software_test"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl tracking-tight",
					children: "Dedup"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: result.closed ? "EST" : "ERR" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-2xl text-sm text-muted",
				children: "Same bytes, same id. Reconstruct from unique chunks. That loop is EST. Reading 160 TB as replicas of 16.2 TB used is HYP until a counting rule is named."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-5 grid gap-2 sm:grid-cols-2",
				children: keep.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MethodChip, {
					method: m,
					active: sel === m.id,
					onSelect: setSel
				}, m.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "chip-row mt-3",
				children: drop.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "shrink-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MethodChip, {
						method: m,
						active: sel === m.id,
						onSelect: setSel,
						wide: true
					})
				}, m.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 rounded-xl bg-bg p-4 shadow-[var(--shadow-border)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-mono text-xs uppercase tracking-widest text-subtle",
						children: [
							method.keep,
							" · ",
							method.id
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-1 flex flex-wrap items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-2xl tracking-tight",
							children: method.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: method.status })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: method.meaning
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs uppercase tracking-widest text-subtle",
						children: "byte identity on this text"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "chip-row mt-2",
						children: [
							MODES.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setMode(m.id),
								className: cn("h-11 shrink-0 rounded-md px-3 text-sm", mode === m.id ? "bg-accent text-accent-fg" : "bg-bg text-muted hover:text-fg"),
								children: m.label
							}, m.id)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "h-11 shrink-0 rounded-md bg-bg px-3 text-sm text-muted hover:text-fg",
								onClick: () => setText(SAMPLE_TWIN),
								children: "Twin"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "h-11 shrink-0 rounded-md bg-bg px-3 text-sm text-muted hover:text-fg",
								onClick: () => setText(SAMPLE_BLOCK),
								children: "Block"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "h-11 shrink-0 rounded-md bg-bg px-3 text-sm text-muted hover:text-fg",
								onClick: () => setText(SAMPLE_UNIQUE),
								children: "Unique"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "mt-3 grid gap-1.5 text-sm font-medium",
						children: ["Sample", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							value: text,
							onChange: (e) => setText(e.target.value),
							rows: 5
						})]
					}),
					mode !== "whole" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "mt-3 grid gap-2 text-sm font-medium",
						children: [
							"Target chunk ",
							size,
							" B",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "range",
								min: 16,
								max: 128,
								step: 8,
								value: size,
								onChange: (e) => setSize(Number(e.target.value)),
								className: "upi-range w-full"
							})
						]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-4 grid gap-0 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "Raw",
								value: `${result.raw} B`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "Unique",
								value: `${result.unique} B`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "Distinct chunks",
								value: String(result.distinct)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "Copies",
								value: result.copies.toFixed(3)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "Round-trip",
								value: result.closed ? "closed" : "broken",
								tone: result.closed ? "est" : "stop"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "FNV-1a",
								value: result.hash
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs uppercase tracking-widest text-subtle",
						children: "160 TB as replicas · HYP counting rule"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "mt-3 grid gap-2 text-sm font-medium",
						children: [
							"Copies ",
							copies.toFixed(2),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "range",
								min: 1,
								max: 16,
								step: .01,
								value: copies,
								onChange: (e) => setCopies(Number(e.target.value)),
								className: "upi-range w-full"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							size: "sm",
							variant: "secondary",
							onClick: () => setCopies(factor),
							children: "Align to 16.2 TB"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							size: "sm",
							variant: "outline",
							onClick: () => setCopies(8),
							children: "One copy / platform"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-4 grid gap-0 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "Raw (abstract)",
								value: formatBytes(CORPUS.abstract.bytes)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "Unique at this copies",
								value: formatBytes(uniqueAtCopies)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "Body used",
								value: formatBytes(CORPUS.body.usedBytes)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "160 / 16.2",
								value: factor.toFixed(3)
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: cn("mt-3 text-sm", aligns ? "text-hyp" : "text-muted"),
						children: aligns ? "Aligns with body used. That is a candidate counting rule, not a closed STOP. Someone still has to name replication." : "Move copies until unique meets 16.2 TB, or leave it. Arithmetic does not promote the claim."
					})
				]
			})
		]
	});
}
function Row({ label, value, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-baseline justify-between gap-3 border-t border-border py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: cn("font-mono text-xs tabular-nums", tone === "est" && "text-est", tone === "stop" && "text-stop"),
			children: value
		})]
	});
}
function MethodChip({ method, active, onSelect, wide }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: () => onSelect(method.id),
		className: cn("flex h-11 items-center justify-between gap-2 rounded-md px-3 text-left text-sm", wide ? "w-auto min-w-44" : "w-full", active ? "bg-surface-2 text-fg" : "bg-bg text-muted hover:text-fg", method.keep === "drop" && !active ? "opacity-70" : null),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "truncate",
			children: method.title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: method.status })]
	});
}
function FrequencyLab({ frequency, onFrequency }) {
	const hz = Number(frequency);
	const valid = Number.isFinite(hz) && hz >= 0;
	const energy = (0, import_react.useMemo)(() => valid ? energyFromFrequency(hz) : NaN, [hz, valid]);
	const mass = (0, import_react.useMemo)(() => valid ? massEquivalent(hz) : NaN, [hz, valid]);
	const n8 = (0, import_react.useMemo)(() => valid ? n8Index(hz) : NaN, [hz, valid]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-[11px] uppercase tracking-[0.16em] text-subtle",
				children: "verification_type: software_test"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl tracking-tight",
					children: "Information mass"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: "HYP" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-xl text-sm text-muted",
				children: "T€@X (2026): when information is a frequency quantum, m_I = hf / c². Same kilogram as the derived mass equivalent — a named referent, not a second law. A trademark is authorship, not a measurement."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
				className: "mt-5 grid gap-2 font-mono text-xs uppercase tracking-widest text-subtle",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Planck 1900 · E = hf" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Einstein 1905 · inertia of energy, Δm = E/c²" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Composition · m = hf / c² · DER" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "T€@X 2026 · m_I = hf / c² · HYP" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "mt-6 grid gap-2 text-sm font-medium",
				children: ["Frequency", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "number",
						min: 0,
						step: "any",
						value: frequency,
						onChange: (e) => onFrequency(e.target.value),
						className: "h-14 w-full rounded-lg border border-border bg-bg px-3 pr-12 font-mono text-2xl tabular-nums text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
						className: "absolute right-3 top-1/2 -translate-y-1/2 text-sm not-italic text-subtle",
						children: "Hz"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "mt-6 grid gap-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-baseline justify-between gap-4 border-t border-border py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-xs text-muted",
							children: "Energy · E = h·f"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
							className: "font-mono text-sm tabular-nums",
							children: [formatScientific(energy), " J"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-baseline justify-between gap-4 border-t border-border py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-xs text-muted",
							children: "Mass equivalent · m = h·f / c² · DER"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
							className: "font-mono text-sm tabular-nums",
							children: [formatScientific(mass), " kg"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-baseline justify-between gap-4 border-t border-border py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-xs text-muted",
							children: "Information mass · m_I = h·f / c² · HYP"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
							className: "font-mono text-sm tabular-nums",
							children: [formatScientific(mass), " kg"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-baseline justify-between gap-4 border-t border-border py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-xs text-muted",
							children: `N8 index · f / 8 Hz`
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "font-mono text-sm tabular-nums",
							children: formatScientific(n8, 4)
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 text-xs text-muted",
				children: [
					"m and m_I print the same kilogram because they are the same formula. The hypothesis is that this kilogram is of a frequency-encoded information carrier — not photon rest mass, not Landauer's kT ln 2 / c², not a bit in a static well.",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/n/$slug",
						params: { slug: "upi-information-physics-1-inertia-information-mass" },
						className: "text-fg underline-offset-2 hover:underline",
						children: "Open the HYP record"
					}),
					" · ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/n/$slug",
						params: { slug: "upi-information-physics-1-inertia-frequency-mass-equivalent" },
						className: "text-fg underline-offset-2 hover:underline",
						children: "Open the DER record"
					}),
					"."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
				className: "mt-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/figures/mass-frequency.jpg",
					alt: "Observatory plate of m equals h f over c squared",
					className: "w-full rounded-xl outline outline-1 -outline-offset-1 outline-white/10"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
					className: "mt-2 text-xs text-subtle",
					children: "Plate of the identification. T€@X 2026 names it information mass. Status HYP. The arithmetic is DER."
				})]
			})
		]
	});
}
var STORAGE_KEY = "upi-gap-ledger-v1";
function containsSensitive(value) {
	return /(https?:\/\/|(?:\d{1,3}\.){3}\d{1,3}|\b(?:api[-_ ]?key|password|secret|token)\b|\S+@\S+)/i.test(value);
}
async function hashText(value) {
	const bytes = new TextEncoder().encode(value);
	const digest = await crypto.subtle.digest("SHA-256", bytes);
	return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, "0")).join("");
}
function GapLedger() {
	const [nodes, setNodes] = (0, import_react.useState)([]);
	const [error, setError] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		try {
			const raw = window.localStorage.getItem(STORAGE_KEY);
			if (raw) setNodes(JSON.parse(raw));
		} catch {
			window.localStorage.removeItem(STORAGE_KEY);
		}
	}, []);
	function persist(next) {
		setNodes(next);
		window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
	}
	async function onSubmit(event) {
		event.preventDefault();
		const form = new FormData(event.currentTarget);
		const topic = String(form.get("topic") ?? "").trim();
		const scale = String(form.get("scale") ?? "").trim();
		const gap = String(form.get("gap") ?? "").trim();
		if (!topic || !scale || !gap) return;
		if (containsSensitive(`${topic} ${scale} ${gap}`)) {
			setError("Remove URLs, addresses, credentials, and personal identifiers.");
			return;
		}
		const id = (await hashText(`${topic.toLowerCase()}|${scale.toLowerCase()}`)).slice(0, 16);
		persist(nodes.find((n) => n.id === id) ? nodes.map((n) => n.id === id ? {
			...n,
			revisits: n.revisits + 1,
			gap
		} : n) : [...nodes, {
			id,
			topic,
			scale,
			gap,
			status: "STOP",
			revisits: 1
		}]);
		setError("");
		event.currentTarget.reset();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-[11px] uppercase tracking-[0.16em] text-subtle",
				children: "local only · no account"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-2 font-display text-3xl tracking-tight",
				children: "Knowledge-gap ledger"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-xl text-sm text-muted",
				children: "Map missing public physics — not people or networks. Repeating a topic and scale increments its revisit count via a content hash."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit,
				className: "mt-6 grid gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid gap-1.5 text-sm font-medium",
						children: ["Public physics topic", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							name: "topic",
							required: true,
							placeholder: "e.g. decoherence timescale"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid gap-1.5 text-sm font-medium",
						children: ["Declared scale", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							name: "scale",
							required: true,
							placeholder: "e.g. mesoscopic · 10⁻⁶ m"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid gap-1.5 text-sm font-medium",
						children: ["What is missing?", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							name: "gap",
							required: true,
							placeholder: "Missing observation or mechanism. No private data."
						})]
					}),
					error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-err",
						role: "alert",
						children: error
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						className: "justify-self-start",
						children: "Add or revisit gap"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid gap-3",
				children: nodes.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg border border-dashed border-border-strong px-4 py-8 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: "STOP" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 font-display text-xl",
							children: "No local gaps yet"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: "Add a public physics question to begin."
						})
					]
				}) : nodes.map((node) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-lg bg-bg p-4 shadow-[var(--shadow-border)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: node.status }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
								className: "font-mono text-[11px] text-subtle",
								children: node.id.slice(0, 8)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-3 font-display text-xl",
							children: node.topic
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: node.gap
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 flex justify-between font-mono text-[11px] text-subtle",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: node.scale }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["revisits ", node.revisits] })]
						})
					]
				}, node.id))
			})
		]
	});
}
var CHAIN_BEADS = [
	{
		id: "f",
		title: "Frequency quantum",
		kicker: "Planck",
		status: "EST",
		slug: "upi-quantum-mechanics-1-quanta-planck-einstein-relation",
		symbol: "f"
	},
	{
		id: "E",
		title: "Energy",
		kicker: "E = hf",
		status: "EST",
		slug: "upi-quantum-mechanics-1-quanta-planck-einstein-relation",
		symbol: "E"
	},
	{
		id: "m",
		title: "Inertial equivalent",
		kicker: "Einstein / Lorentz",
		status: "EST",
		slug: "upi-relativity-1-t-energy-n-mass-energy",
		symbol: "m"
	},
	{
		id: "mI",
		title: "Information mass",
		kicker: "T€@X™ 2026",
		status: "HYP",
		slug: "upi-information-physics-1-inertia-information-mass",
		symbol: "m_I"
	},
	{
		id: "S",
		title: "Horizon entropy",
		kicker: "Bekenstein–Hawking",
		status: "EST",
		slug: "upi-gravity-1-horizon-bekenstein-hawking-entropy",
		symbol: "S"
	},
	{
		id: "B",
		title: "11D M-brane",
		kicker: "substrate",
		status: "SYM",
		slug: "upi-theories-1-m-theory-eleven-d-brane",
		symbol: "11d"
	}
];
var CHAIN_LINKS = [
	{
		id: "planck",
		from: "f",
		to: "E",
		relation: "DERIVED_FROM",
		status: "EST",
		formula: "E = h f",
		meaning: "Planck–Einstein: a frequency quantum carries energy hf. Inverse is f = E/h.",
		composable: true
	},
	{
		id: "einstein",
		from: "E",
		to: "m",
		relation: "DERIVED_FROM",
		status: "EST",
		formula: "m = E / c²",
		meaning: "Inertia of energy. Lorentz rest-energy is the same map. so(1,1) generates the boosts; this is the rest-frame reading.",
		composable: true,
		generator: {
			label: "Lorentz so(1,1)",
			href: "/symmetry",
			search: {
				layer: "group",
				g: "lorentz"
			}
		}
	},
	{
		id: "name",
		from: "m",
		to: "mI",
		relation: "CANDIDATE_BRIDGE",
		status: "HYP",
		formula: "m_I := m",
		meaning: "T€@X™ (2026) names that kilogram information mass. Same number as the DER equivalent. A name is not a second law.",
		composable: true
	},
	{
		id: "horizon",
		from: "mI",
		to: "S",
		relation: "MEASURED_BY",
		status: "EST",
		formula: "S/k = A / 4ℓ_P²",
		meaning: "Bekenstein–Hawking from the Schwarzschild radius of m. EST as a formula. STOPS when R_s < ℓ_P.",
		composable: true
	},
	{
		id: "brane",
		from: "S",
		to: "B",
		relation: "DUAL_TO",
		status: "SYM",
		formula: "S ↔ 11d brane",
		meaning: "Proposed substrate. Symbolic. Entropy as a number does not put the sky in eleven dimensions.",
		composable: false
	},
	{
		id: "close",
		from: "B",
		to: "f",
		relation: "STOPS_AT",
		status: "STOP",
		formula: "11d ↛ f",
		meaning: "The return is not an inverse. There is no map from an 11d brane back to a frequency that recovers f. Opening the loop is the honest drawing.",
		composable: false
	}
];
var RANK = {
	EST: 0,
	DER: 1,
	HYP: 2,
	SYM: 3,
	STOP: 4,
	ERR: 5
};
function weakest(statuses) {
	return statuses.reduce((a, b) => RANK[b] > RANK[a] ? b : a);
}
function defaultMerges() {
	return CHAIN_LINKS.map((l) => ({ ids: [l.id] }));
}
function canShorten(merges, index) {
	const here = merges[index];
	const next = merges[index + 1];
	if (!here || !next) return false;
	return [...here.ids, ...next.ids].map((id) => CHAIN_LINKS.find((l) => l.id === id)).every((l) => l.composable);
}
function shortenAt(merges, index) {
	if (!canShorten(merges, index)) return merges;
	const next = merges[index + 1];
	return merges.map((m, i) => i === index ? { ids: [...m.ids, ...next.ids] } : m).filter((_, i) => i !== index + 1);
}
function expandAt(merges, index) {
	const m = merges[index];
	if (!m || m.ids.length < 2) return merges;
	const [first, ...rest] = m.ids;
	const out = [...merges];
	out.splice(index, 1, { ids: [first] }, { ids: rest });
	return out;
}
function mergeView(merge) {
	const links = merge.ids.map((id) => CHAIN_LINKS.find((l) => l.id === id));
	const first = links[0];
	const last = links[links.length - 1];
	const ids = merge.ids;
	const named = ids.includes("planck") && ids.includes("einstein");
	const status = named && !ids.some((id) => id !== "planck" && id !== "einstein") ? "DER" : weakest(links.map((l) => l.status));
	const formula = named && ids.length === 2 ? "m = h f / c²" : links.map((l) => l.formula).join(" then ");
	return {
		id: ids.join("+"),
		ids,
		from: first.from,
		to: last.to,
		status,
		formula,
		relation: named && ids.length === 2 ? "DERIVED_FROM" : links[links.length - 1].relation,
		meaning: links.map((l) => l.meaning).join(" "),
		composable: links.every((l) => l.composable),
		generator: links.find((l) => l.generator)?.generator,
		links
	};
}
function walk(hz) {
	const valid = Number.isFinite(hz) && hz >= 0;
	const E = valid ? energyFromFrequency(hz) : NaN;
	const m = valid ? massEquivalent(hz) : NaN;
	const rs = valid ? schwarzschildRadius(m) : NaN;
	const S = valid ? bekensteinHawkingSOverK(m) : NaN;
	const trip = valid ? planckEinsteinRoundTrip(hz) : null;
	return {
		valid,
		f: hz,
		E,
		m,
		rs,
		S,
		inDomain: valid && rs >= 1616255e-41,
		trip,
		readout: {
			f: `${formatScientific(hz)} Hz`,
			E: `${formatScientific(E)} J`,
			m: `${formatScientific(m)} kg`,
			mI: `${formatScientific(m)} kg`,
			S: formatScientific(S, 3),
			B: "symbolic"
		}
	};
}
function beadById(id) {
	return CHAIN_BEADS.find((b) => b.id === id);
}
var ELECTRON_KG = 91093837139e-41;
var MASS_PRESETS = [
	{
		id: "electron",
		label: "electron",
		kg: ELECTRON_KG
	},
	{
		id: "proton",
		label: "proton",
		kg: 167262192595e-38
	},
	{
		id: "kilogram",
		label: "1 kg",
		kg: 1
	},
	{
		id: "photon",
		label: "photon",
		kg: 0
	}
];
function restEnergy(massKg) {
	return massKg * SPEED_OF_LIGHT * SPEED_OF_LIGHT;
}
function fourMomentum(massKg, phi, photonEnergyJ = restEnergy(ELECTRON_KG)) {
	if (massKg <= 0) {
		const E = photonEnergyJ;
		return {
			E,
			p: E / SPEED_OF_LIGHT,
			E0: 0,
			gamma: Number.POSITIVE_INFINITY,
			vOverC: 1,
			lightlike: true
		};
	}
	const E0 = restEnergy(massKg);
	const ch = Math.cosh(phi);
	const sh = Math.sinh(phi);
	return {
		E: E0 * ch,
		p: E0 / SPEED_OF_LIGHT * sh,
		E0,
		gamma: ch,
		vOverC: Math.tanh(phi),
		lightlike: false
	};
}
function invariantMass(energyJ, momentumKgMs) {
	const c = SPEED_OF_LIGHT;
	const m2 = energyJ * energyJ / c ** 4 - momentumKgMs * momentumKgMs / c ** 2;
	if (!Number.isFinite(m2)) return NaN;
	if (m2 < 0 && Math.abs(m2) < 1e-48) return 0;
	return m2 <= 0 ? 0 : Math.sqrt(m2);
}
function naiveMass(energyJ) {
	return energyJ / (SPEED_OF_LIGHT * SPEED_OF_LIGHT);
}
function einsteinRoundTrip(massKg, phi) {
	const four = fourMomentum(massKg, phi);
	const mInv = invariantMass(four.E, four.p);
	const mNaive = naiveMass(four.E);
	const EBack = restEnergy(mInv);
	const residual = massKg === 0 ? Math.abs(mInv) : Math.abs(mInv - massKg);
	const closed = massKg === 0 ? mInv === 0 : nearlyEqual(mInv, massKg, 1e-9);
	return {
		...four,
		mInv,
		mNaive,
		EBack,
		residual,
		naiveResidual: Math.abs(mNaive - massKg),
		restMapHolds: Math.abs(phi) < 1e-9 && massKg > 0,
		closed,
		forward: "E₀ → Λ(φ) → (E, p)",
		back: "m = √(E²/c⁴ − p²/c²)"
	};
}
var PHI_MAX = 1.6;
function r3(n) {
	return Math.round(n * 1e3) / 1e3;
}
function hyperbolaPath(ox, oy, s, steps = 48) {
	let d = "";
	for (let i = 0; i <= steps; i++) {
		const phi = -1.6 + 2 * PHI_MAX * i / steps;
		const x = r3(ox + Math.sinh(phi) * s);
		const y = r3(oy - Math.cosh(phi) * s);
		d += `${i === 0 ? "M" : "L"}${x} ${y}`;
	}
	return d;
}
function EinsteinMap() {
	const [preset, setPreset] = (0, import_react.useState)("electron");
	const [phi, setPhi] = (0, import_react.useState)(.7);
	const massKg = MASS_PRESETS.find((p) => p.id === preset).kg;
	const trip = (0, import_react.useMemo)(() => einsteinRoundTrip(massKg, phi), [massKg, phi]);
	const ox = 120;
	const oy = 208;
	const s = 52;
	const toPx = (x, y) => [r3(ox + x * s), r3(oy - y * s)];
	const rest = toPx(0, trip.lightlike ? 0 : 1);
	const now = trip.lightlike ? toPx(Math.sign(phi || 1) * 1.6, 1.6) : toPx(Math.sinh(phi), Math.cosh(phi));
	const inv = trip.lightlike ? now : toPx(Math.sinh(-phi), Math.cosh(-phi));
	const d = hyperbolaPath(ox, oy, s);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-bg p-4 shadow-[var(--shadow-border)] sm:p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-[11px] uppercase tracking-[0.16em] text-subtle",
				children: "Einstein map · four-momentum · verification_type: software_test"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-2xl tracking-tight",
					children: "m = E₀ / c²"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: trip.lightlike ? "STOP" : "EST" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-2xl text-sm text-muted",
				children: "Rest energy is the intercept of the mass shell. Lorentz slides you along the hyperbola. E/c² in a moving frame is γm, not m. The invariant √(E² − p²c²)/c² is the map that closes. Photons have no rest frame."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "chip-row mt-4",
				children: MASS_PRESETS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setPreset(p.id),
					className: cn("h-11 shrink-0 rounded-full px-4 text-sm", preset === p.id ? "bg-surface-2 text-fg" : "text-muted hover:text-fg"),
					children: p.label
				}, p.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 grid gap-6 lg:grid-cols-[minmax(0,240px)_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
					viewBox: "0 0 240 240",
					className: "mx-auto aspect-square w-full max-w-56 text-fg",
					"aria-hidden": true,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
							x1: "24",
							y1: oy,
							x2: "216",
							y2: oy,
							stroke: "var(--color-subtle)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
							x1: ox,
							y1: "16",
							x2: ox,
							y2: "224",
							stroke: "var(--color-subtle)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
							x1: ox,
							y1: oy,
							x2: 213.60000000000002,
							y2: oy - 1.8 * s,
							stroke: "var(--color-border-strong)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
							x1: ox,
							y1: oy,
							x2: ox - 1.8 * s,
							y2: oy - 1.8 * s,
							stroke: "var(--color-border-strong)"
						}),
						trip.lightlike ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d,
							fill: "none",
							stroke: "var(--color-est)",
							strokeOpacity: .85
						}),
						trip.lightlike ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: rest[0],
							cy: rest[1],
							r: "6",
							fill: "var(--color-est)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: now[0],
							cy: now[1],
							r: "6",
							fill: "var(--color-der)"
						}),
						trip.lightlike || Math.abs(phi) < .02 ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: inv[0],
							cy: inv[1],
							r: "5",
							fill: "var(--color-hyp)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
							x: "196",
							y: 222,
							fontSize: "9",
							fontFamily: "var(--font-mono)",
							className: "fill-subtle",
							children: "pc"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
							x: 126,
							y: "22",
							fontSize: "9",
							fontFamily: "var(--font-mono)",
							className: "fill-subtle",
							children: "E"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid gap-2 text-sm font-medium",
						children: ["Rapidity φ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "upi-range w-full",
							type: "range",
							min: -1.6,
							max: PHI_MAX,
							step: .01,
							value: phi,
							disabled: trip.lightlike,
							onChange: (e) => setPhi(Number(e.target.value))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "secondary",
								disabled: trip.lightlike,
								onClick: () => setPhi(0),
								children: "Rest"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "outline",
								disabled: trip.lightlike,
								onClick: () => setPhi((v) => -v),
								children: "Apply inverse"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "ghost",
								disabled: trip.lightlike,
								onClick: () => setPhi(.7),
								children: "Boost"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
						className: "mt-4 grid gap-0 text-sm",
						children: [
							["v/c", trip.lightlike ? "1" : trip.vOverC.toFixed(4)],
							["γ", trip.lightlike ? "∞" : trip.gamma.toFixed(4)],
							["E", `${formatScientific(trip.E)} J`],
							["E/c² (frame)", `${formatScientific(trip.mNaive)} kg`],
							["√(E²/c⁴ − p²/c²)", `${formatScientific(trip.mInv)} kg`],
							["m rest", trip.lightlike ? "0" : `${formatScientific(massKg)} kg`]
						].map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-baseline justify-between gap-3 border-t border-border py-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "font-mono text-xs text-muted",
								children: k
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "font-mono text-xs tabular-nums",
								children: v
							})]
						}, k))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 font-mono text-xs uppercase tracking-widest",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: trip.closed ? "text-est" : "text-stop",
							children: trip.lightlike ? "no rest frame" : trip.closed ? "loop closed" : "loop broken"
						}), trip.lightlike ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "ml-2 text-subtle",
							children: ["|m′ − m| = ", trip.residual.toExponential(2)]
						})]
					})
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 text-xs text-muted",
				children: [
					trip.lightlike ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Photon: E = pc. The intercept is the origin. m = E/c² would assign a false rest mass. Status STOP for a rest-frame reading." }) : Math.abs(phi) < .02 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Rest: E = E₀, p = 0, so m = E/c². That is the Einstein map. Status EST." }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						"Moving: E/c² is γm. Naive residual ",
						trip.naiveResidual.toExponential(2),
						" kg. The invariant recovers m."
					] }),
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/symmetry",
						search: {
							layer: "group",
							g: "lorentz"
						},
						className: "text-fg underline-offset-4 hover:underline",
						children: "Open Lorentz"
					}),
					".",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/n/$slug",
						params: { slug: "upi-relativity-1-t-energy-n-mass-energy" },
						className: "text-fg underline-offset-4 hover:underline",
						children: "Open E = mc²"
					}),
					"."
				]
			})
		]
	});
}
function MeasureLoop({ frequencyHz }) {
	const [merges, setMerges] = (0, import_react.useState)(defaultMerges);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [sel, setSel] = (0, import_react.useState)({
		kind: "link",
		index: 1
	});
	const data = walk(frequencyHz);
	const visible = (0, import_react.useMemo)(() => open ? merges.filter((m) => !m.ids.includes("close")) : merges, [merges, open]);
	const views = visible.map(mergeView);
	const selectedView = sel.kind === "link" ? views[sel.index] : null;
	const selectedBead = sel.kind === "bead" ? beadById(sel.id) : null;
	const shortenOk = sel.kind === "link" && canShorten(visible, sel.index);
	const expandOk = Boolean(selectedView && selectedView.ids.length > 1);
	function onShorten() {
		if (sel.kind !== "link" || !shortenOk) return;
		const next = shortenAt(visible, sel.index);
		setMerges(open ? [...next, { ids: ["close"] }] : next);
	}
	function onExpand() {
		if (sel.kind !== "link" || !expandOk) return;
		const next = expandAt(visible, sel.index);
		setMerges(open ? [...next, { ids: ["close"] }] : next);
	}
	function reset() {
		setMerges(defaultMerges());
		setSel({
			kind: "link",
			index: 0
		});
	}
	const readout = (id) => {
		if (id === "f") return data.readout.f;
		if (id === "E") return data.readout.E;
		if (id === "m") return data.readout.m;
		if (id === "mI") return data.readout.mI;
		if (id === "S") return data.readout.S;
		return data.readout.B;
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-[11px] uppercase tracking-[0.16em] text-subtle",
				children: "chain · walk link by link · verification_type: software_test"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl tracking-tight",
					children: "Planck–Einstein–T€@X loop"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: "HYP" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-2xl text-sm text-muted",
				children: "Lorentz generates the Einstein map. Planck then Einstein is m = hf/c². T€@X™ names that kilogram. Horizon and 11d are later stations. Click a link. Shorten only what composes. Open the loop to see that 11d does not invert back to f."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: open ? "secondary" : "outline",
						onClick: () => setOpen((v) => !v),
						children: open ? "Close the loop" : "Open the loop"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "outline",
						disabled: !shortenOk,
						onClick: onShorten,
						children: "Shorten"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "outline",
						disabled: !expandOk,
						onClick: onExpand,
						children: "Expand"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "ghost",
						onClick: reset,
						children: "Full chain"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "chip-row mt-6 items-center pb-2",
				children: views.map((view, i) => {
					const from = beadById(view.from);
					const to = beadById(view.to);
					const showFrom = i === 0 || views[i - 1]?.to !== view.from;
					const isReturn = view.ids.includes("close");
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex shrink-0 items-center gap-1",
						children: [
							showFrom && from ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BeadButton, {
								bead: from,
								active: sel.kind === "bead" && sel.id === from.id,
								value: readout(from.id),
								onClick: () => setSel({
									kind: "bead",
									id: from.id
								})
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setSel({
									kind: "link",
									index: i
								}),
								className: cn("flex h-11 min-w-16 max-w-40 shrink-0 flex-col items-center justify-center rounded-md px-2", sel.kind === "link" && sel.index === i ? "bg-surface-2 text-fg" : "text-muted hover:text-fg"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "max-w-36 truncate font-mono text-[10px] uppercase tracking-widest",
									children: isReturn ? "not an inverse" : view.formula
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-0.5 block h-px w-12",
									style: { background: `var(--color-${view.status.toLowerCase()})` }
								})]
							}),
							to && !isReturn ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BeadButton, {
								bead: to,
								active: sel.kind === "bead" && sel.id === to.id,
								value: readout(to.id),
								onClick: () => setSel({
									kind: "bead",
									id: to.id
								})
							}) : null
						]
					}, view.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 rounded-xl bg-bg p-4 shadow-[var(--shadow-border)] sm:p-5",
				children: selectedBead ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-mono text-[11px] uppercase tracking-widest text-subtle",
						children: [selectedBead.kicker, " · bead"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex flex-wrap items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-2xl tracking-tight",
							children: selectedBead.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: selectedBead.status })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 font-mono text-sm tabular-nums",
						children: readout(selectedBead.id)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/n/$slug",
							params: { slug: selectedBead.slug },
							className: "text-fg underline-offset-4 hover:underline",
							children: "Open the record"
						})
					}),
					selectedBead.id === "m" || selectedBead.id === "E" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EinsteinMap, {})
					}) : null
				] }) : selectedView ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-mono text-[11px] uppercase tracking-widest text-subtle",
						children: [
							selectedView.relation,
							" · ",
							selectedView.ids.length > 1 ? "composed" : "one link"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex flex-wrap items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-2xl tracking-tight",
							children: selectedView.formula
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: selectedView.status })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-2xl text-sm text-muted",
						children: selectedView.meaning
					}),
					selectedView.generator ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-sm",
						children: [
							"Generator:",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: selectedView.generator.href,
								search: selectedView.generator.search,
								className: "text-fg underline-offset-4 hover:underline",
								children: selectedView.generator.label
							})
						]
					}) : null,
					selectedView.ids.includes("planck") && selectedView.ids.includes("einstein") && data.trip ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 font-mono text-xs uppercase tracking-widest",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: data.trip.closed ? "text-est" : "text-stop",
							children: data.trip.closed ? "loop closed" : "loop broken"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "ml-2 text-subtle",
							children: ["|f′ − f| = ", data.trip.residual.toExponential(2)]
						})]
					}) : null,
					selectedView.ids.includes("horizon") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-muted",
						children: data.inDomain ? "R_s ≥ ℓ_P. Geometric station in-domain." : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							"Geometric station STOPS: R_s below ℓ_P.",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/n/$slug",
								params: { slug: "upi-information-physics-1-measure-sub-planck-horizon" },
								className: "text-fg underline-offset-4 hover:underline",
								children: "Open the STOP"
							}),
							"."
						] })
					}) : null,
					selectedView.ids.includes("close") ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-sm text-muted",
						children: [
							"Open the loop. The return is a claim, not an inverse. AdS/CFT is a different dictionary.",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/holography",
								className: "text-fg underline-offset-4 hover:underline",
								children: "Open AdS/CFT"
							}),
							"."
						]
					}) : null,
					selectedView.ids.includes("einstein") || selectedView.ids.includes("planck") && selectedView.ids.includes("einstein") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EinsteinMap, {})
					}) : null
				] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Select a bead or a link."
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 text-xs text-muted",
				children: [
					"Shorten composes maps. Weakest status wins, except Planck+Einstein which is the named DER step. A trademark is authorship. Photon rest mass remains 0.",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/n/$slug",
						params: { slug: "upi-information-physics-1-measure-universal-information-measure" },
						className: "text-fg underline-offset-4 hover:underline",
						children: "Open the measure"
					}),
					"."
				]
			})
		]
	});
}
function BeadButton({ bead, active, value, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		className: cn("flex h-14 min-w-16 shrink-0 flex-col items-center justify-center rounded-full px-3 shadow-[var(--shadow-border)]", active ? "bg-surface-2 text-fg" : "bg-bg text-muted hover:text-fg"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-mono text-xs text-fg",
			children: bead.symbol
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "max-w-20 truncate font-mono text-[10px] tabular-nums text-subtle",
			children: value
		})]
	});
}
var ODIN_NODES = [
	{
		id: "planck-einstein",
		layer: "micro",
		keep: "keep",
		title: "Planck ↔ Einstein",
		status: "DER",
		meaning: "f → hf → hf/c² → mc² → E/h. Invertible maps. Software test.",
		href: "/lab"
	},
	{
		id: "mass-shell",
		layer: "micro",
		keep: "keep",
		title: "Einstein map",
		status: "EST",
		meaning: "Rest intercept m = E₀/c². Boost slides the hyperbola. Photon STOP.",
		href: "/lab"
	},
	{
		id: "lorentz",
		layer: "micro",
		keep: "keep",
		title: "Lorentz inverse",
		status: "EST",
		meaning: "Λ(φ) then Λ(−φ) is identity. so(1,1) generates the boosts.",
		href: "/symmetry"
	},
	{
		id: "golay",
		layer: "micro",
		keep: "keep",
		title: "Golay encode/decode",
		status: "EST",
		meaning: "G₂₄: encode then decode recovers the word. Perfect code is G₂₃.",
		href: "/lattice"
	},
	{
		id: "chain",
		layer: "meso",
		keep: "keep",
		title: "Chain compose",
		status: "HYP",
		meaning: "Walk link by link. Shorten only composable maps. Weakest status wins.",
		href: "/lab"
	},
	{
		id: "open-loop",
		layer: "meso",
		keep: "keep",
		title: "Open the loop",
		status: "STOP",
		meaning: "11d does not invert back to frequency. Opening is the honest drawing.",
		href: "/lab"
	},
	{
		id: "dna",
		layer: "macro",
		keep: "keep",
		title: "GitHub DNA",
		status: "EST",
		meaning: "Main is canonical memory. UI is RNA. A PR is not DNA until merge.",
		href: "/dna"
	},
	{
		id: "rl-alloc",
		layer: "micro",
		keep: "drop",
		title: "RL memory allocator",
		status: "SYM",
		meaning: "Odin Omega claims a host OS with reinforcement learning. This index has no host to reconfigure."
	},
	{
		id: "dnn-cache",
		layer: "micro",
		keep: "drop",
		title: "DNN predictive cache",
		status: "SYM",
		meaning: "Transformers predicting L1/L2/L3 fills are not a physics result. Constants here are CODATA, not inferred."
	},
	{
		id: "pid-mcts",
		layer: "meso",
		keep: "drop",
		title: "PID / MCTS / PPO",
		status: "SYM",
		meaning: "Control-theory names without a plant. Dropped. The meso loop here is typed composition, not Monte Carlo search."
	},
	{
		id: "indaleko",
		layer: "macro",
		keep: "drop",
		title: "Indaleko / ArangoDB",
		status: "STOP",
		meaning: "A different UPI: personal file memory. Mapped as a cited 160TB corpus on Lab, not as infrastructure. Do not fork the name.",
		href: "/lab"
	},
	{
		id: "hft",
		layer: "macro",
		keep: "drop",
		title: "HFT / climate OS",
		status: "SYM",
		meaning: "Application fiction in the document. Out of domain for a physics index."
	}
];
var ODIN_LAYERS = [
	{
		id: "micro",
		title: "Micro",
		kicker: "software_test"
	},
	{
		id: "meso",
		title: "Meso",
		kicker: "compose / STOP"
	},
	{
		id: "macro",
		title: "Macro",
		kicker: "DNA / RNA"
	}
];
function runMirrors() {
	const pe = planckEinsteinRoundTrip(8);
	const lor = lorentzRoundTrip({
		t: 1,
		x: 0
	}, .7);
	const ein = einsteinRoundTrip(ELECTRON_KG, .7);
	const z8 = znRoundTrip(8, 3);
	const u1 = u1RoundTrip(1.2);
	const so11 = so11RoundTrip(.7);
	const so3 = so3RoundTrip([
		0,
		0,
		1
	], .8);
	const jac = jacobiResidual([
		1,
		0,
		0
	], [
		0,
		1,
		0
	], [
		0,
		0,
		1
	]);
	const cw = encodeGolay(2748);
	const dec = decodeGolay(cw);
	return [
		{
			id: "planck-einstein",
			title: "Planck ↔ Einstein",
			closed: pe.closed,
			residual: pe.residual,
			status: "DER"
		},
		{
			id: "lorentz",
			title: "Lorentz Λ(φ)Λ(−φ)",
			closed: lor.closed,
			residual: lor.residual,
			status: "EST"
		},
		{
			id: "mass-shell",
			title: "Einstein invariant m",
			closed: ein.closed,
			residual: ein.residual,
			status: "EST"
		},
		{
			id: "z8",
			title: "Z₈ inverse",
			closed: z8.closed,
			residual: z8.residual,
			status: "EST"
		},
		{
			id: "u1",
			title: "U(1) conjugate",
			closed: u1.closed,
			residual: u1.residual,
			status: "EST"
		},
		{
			id: "so11",
			title: "exp so(1,1)",
			closed: so11.closed,
			residual: so11.residual,
			status: "EST"
		},
		{
			id: "so3",
			title: "SO(3) Rodrigues",
			closed: so3.closed,
			residual: so3.residual,
			status: "EST"
		},
		{
			id: "jacobi",
			title: "so(3) Jacobi",
			closed: jac < 1e-12,
			residual: jac,
			status: "EST"
		},
		{
			id: "golay",
			title: "Golay encode/decode",
			closed: dec.distance === 0 && dec.codeword === cw,
			residual: dec.distance,
			status: "EST"
		}
	];
}
var CONSTANT_CACHE = [
	{
		name: "h",
		value: PLANCK_H,
		unit: "J s",
		source: "SI exact",
		status: "EST"
	},
	{
		name: "c",
		value: SPEED_OF_LIGHT,
		unit: "m/s",
		source: "SI exact",
		status: "EST"
	},
	{
		name: "G",
		value: G_NEWTON,
		unit: "m³ kg⁻¹ s⁻²",
		source: "CODATA recommended",
		status: "EST"
	},
	{
		name: "ℓ_P",
		value: PLANCK_LENGTH,
		unit: "m",
		source: "CODATA recommended",
		status: "EST"
	},
	{
		name: "k",
		value: BOLTZMANN_K,
		unit: "J/K",
		source: "SI exact",
		status: "EST"
	}
];
function OdinMap() {
	const [sel, setSel] = (0, import_react.useState)("planck-einstein");
	const [mirrors, setMirrors] = (0, import_react.useState)(null);
	const node = ODIN_NODES.find((n) => n.id === sel) ?? ODIN_NODES[0];
	const keep = ODIN_NODES.filter((n) => n.keep === "keep");
	const drop = ODIN_NODES.filter((n) => n.keep === "drop");
	const closed = mirrors?.every((m) => m.closed) ?? null;
	const byLayer = (0, import_react.useMemo)(() => {
		return ODIN_LAYERS.map((layer) => ({
			...layer,
			nodes: keep.filter((n) => n.layer === layer.id)
		}));
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-[11px] uppercase tracking-[0.16em] text-subtle",
				children: "mind map · keep / drop · verification_type: software_test"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl tracking-tight",
					children: "Knotted loops"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: "HYP" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-2xl text-sm text-muted",
				children: "Odin Omega is a document about order in chaos. Three loop levels survive: micro tests, meso composition, macro DNA. Reinforcement learning, HFT, and a different UPI named Indaleko do not. Click a node. Run the mirrors."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid gap-3 sm:grid-cols-3",
				children: byLayer.map((layer) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl bg-bg p-3 shadow-[var(--shadow-border)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[10px] uppercase tracking-widest text-subtle",
							children: layer.kicker
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-1 font-display text-xl tracking-tight",
							children: layer.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-3 grid gap-2",
							children: layer.nodes.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NodeChip$1, {
								node: n,
								active: sel === n.id,
								onSelect: setSel
							}) }, n.id))
						})
					]
				}, layer.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[10px] uppercase tracking-widest text-subtle",
					children: "dropped from the document"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "chip-row mt-2",
					children: drop.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "shrink-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NodeChip$1, {
							node: n,
							active: sel === n.id,
							onSelect: setSel
						})
					}, n.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 rounded-xl bg-bg p-4 shadow-[var(--shadow-border)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-mono text-[11px] uppercase tracking-widest text-subtle",
						children: [
							node.keep === "keep" ? "keep" : "drop",
							" · ",
							node.layer
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex flex-wrap items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-2xl tracking-tight",
							children: node.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: node.status })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-2xl text-sm text-muted",
						children: node.meaning
					}),
					node.href ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: node.href,
							search: node.href === "/symmetry" ? {
								layer: "group",
								g: "lorentz"
							} : void 0,
							className: "text-fg underline-offset-4 hover:underline",
							children: "Open in the index"
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-muted",
						children: "No implementation. Left as a document claim."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 flex flex-wrap items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					onClick: () => setMirrors(runMirrors()),
					children: "Run mirrors"
				}), closed === null ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("font-mono text-xs uppercase tracking-widest", closed ? "text-est" : "text-stop"),
					children: closed ? "all loops closed" : "a loop is broken"
				})]
			}),
			mirrors ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
				className: "mt-4 grid gap-0 text-sm",
				children: mirrors.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-baseline justify-between gap-3 border-t border-border py-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "font-mono text-xs text-muted",
						children: m.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
						className: "font-mono text-xs tabular-nums",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: m.closed ? "text-est" : "text-stop",
							children: m.closed ? "closed" : "broken"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-2 text-subtle",
							children: m.residual.toExponential(2)
						})]
					})]
				}, m.id))
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[10px] uppercase tracking-widest text-subtle",
						children: "constant cache · CODATA / SI"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
						className: "mt-2 grid gap-0 text-sm",
						children: CONSTANT_CACHE.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-baseline justify-between gap-3 border-t border-border py-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dt", {
								className: "font-mono text-xs text-muted",
								children: [
									c.name,
									" · ",
									c.source
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
								className: "font-mono text-xs tabular-nums",
								children: [
									formatScientific(c.value),
									" ",
									c.unit
								]
							})]
						}, c.name))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-xs text-muted",
						children: "Constants are not predicted by a cache model. They are exact or recommended values. The productive “cache” is this table plus the mirrors above."
					})
				]
			})
		]
	});
}
function NodeChip$1({ node, active, onSelect }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: () => onSelect(node.id),
		className: cn("flex h-11 items-center justify-between gap-2 rounded-md px-3 text-left text-sm", node.keep === "drop" ? "w-auto min-w-44" : "w-full", active ? "bg-surface-2 text-fg" : "text-muted hover:text-fg", node.keep === "drop" && !active ? "opacity-70" : null),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "truncate",
			children: node.title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: node.status })]
	});
}
var STORAGE = "upi-stop-replies-v1";
var ISSUE_URL = `${DNA.html}/issues/8`;
function loadReplies() {
	try {
		const raw = localStorage.getItem(STORAGE);
		return raw ? JSON.parse(raw) : {};
	} catch {
		return {};
	}
}
function StopDesk() {
	const [copied, setCopied] = (0, import_react.useState)(false);
	const [sel, setSel] = (0, import_react.useState)(OPEN_STOPS[0].id);
	const [replies, setReplies] = (0, import_react.useState)({});
	const [draft, setDraft] = (0, import_react.useState)("");
	const row = [...OPEN_STOPS, ...HELD_ROWS].find((r) => r.id === sel) ?? OPEN_STOPS[0];
	const open = OPEN_STOPS.length;
	(0, import_react.useEffect)(() => {
		setReplies(loadReplies());
	}, []);
	(0, import_react.useEffect)(() => {
		setDraft(replies[sel] ?? "");
	}, [sel, replies]);
	function saveReply() {
		const next = {
			...replies,
			[sel]: draft.trim()
		};
		setReplies(next);
		localStorage.setItem(STORAGE, JSON.stringify(next));
	}
	async function copyTable() {
		const extra = Object.entries(replies).filter(([, v]) => v).map(([id, v]) => `\n\n### Reply · ${id}\n${v}`).join("");
		const text = `${stopTableMarkdown()}\n\n${STOP_REPLY_HINT}${extra}\n`;
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-bg p-4 shadow-[var(--shadow-border)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-mono text-xs uppercase tracking-widest text-subtle",
				children: [
					"open STOP · ",
					open,
					" waiting for a counting rule"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-1 font-display text-2xl tracking-tight",
				children: "Correction desk"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 max-w-2xl text-sm text-muted",
				children: [
					"If you know what 160 TB counts, write it. STOP stays until the identity is named. Paper:",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: INDALEKO_PAPER.abs,
						target: "_blank",
						rel: "noreferrer",
						className: "text-fg underline-offset-4 hover:underline",
						children: ["arXiv:", INDALEKO_PAPER.arxiv]
					}),
					"."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[36rem] text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "font-mono text-xs uppercase tracking-widest text-subtle",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 pr-3 font-medium",
								children: "Claim"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 pr-3 font-medium",
								children: "Cited"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 pr-3 font-medium",
								children: "Status"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 font-medium",
								children: "Closes if"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: [...OPEN_STOPS, ...HELD_ROWS].map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: cn("cursor-pointer border-t border-border", sel === r.id ? "bg-surface-2" : "hover:bg-surface"),
						onClick: () => setSel(r.id),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 pr-3 align-top",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "text-left",
									children: r.claim
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 pr-3 align-top font-mono text-xs text-muted",
								children: r.cited
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 pr-3 align-top",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: r.status })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 align-top text-muted",
								children: r.closesIf
							})
						]
					}, r.id)) })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 border-t border-border pt-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs uppercase tracking-widest text-subtle",
						children: row.id
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-1 flex flex-wrap items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "font-display text-xl tracking-tight",
							children: row.claim
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: row.status })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: row.conflict
					}),
					row.status === "STOP" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "mt-3 grid gap-2",
						onSubmit: (e) => {
							e.preventDefault();
							saveReply();
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "grid gap-1.5 text-sm font-medium",
							children: ["Your counting rule", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								value: draft,
								onChange: (e) => setDraft(e.target.value),
								placeholder: "160 TB is … (raw / replicated / provisioned / draft leftover). Source: …",
								rows: 4
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								size: "sm",
								children: "Save reply"
							}), replies[row.id] ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "self-center font-mono text-xs uppercase tracking-widest text-est",
								children: "saved locally"
							}) : null]
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-muted",
						children: "Not waiting. This row already holds."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "secondary",
						size: "sm",
						onClick: () => void copyTable(),
						children: copied ? "Copied" : "Copy table"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						size: "sm",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/stop",
							search: {
								id: sel,
								group: "indaleko"
							},
							children: "All STOP"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						size: "sm",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: ISSUE_URL,
							target: "_blank",
							rel: "noreferrer",
							children: "Open DNA issue"
						})
					})
				]
			})
		]
	});
}
function SourceMap() {
	const catalog = useLive((s) => s.catalog);
	const [sel, setSel] = (0, import_react.useState)("two-names");
	const [audit, setAudit] = (0, import_react.useState)(null);
	const node = INDALEKO_NODES.find((n) => n.id === sel) ?? INDALEKO_NODES[0];
	const drop = INDALEKO_NODES.filter((n) => n.keep === "drop");
	const catalogBytes = (0, import_react.useMemo)(() => JSON.stringify(catalog).length, [catalog]);
	const maxBytes = CORPUS.abstract.bytes;
	const closed = audit ? audit.filter((a) => a.id !== "abstract-body").every((a) => a.closed) : null;
	const byLayer = (0, import_react.useMemo)(() => INDALEKO_LAYERS.map((layer) => ({
		...layer,
		nodes: INDALEKO_NODES.filter((n) => n.keep === "keep" && n.layer === layer.id)
	})), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-mono text-xs uppercase tracking-widest text-subtle",
				children: [
					"source map · arXiv:",
					INDALEKO_PAPER.arxiv,
					" · 160 TB cited, not loaded"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl tracking-tight",
					children: "Indaleko corpus"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: "STOP" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 max-w-2xl text-sm text-muted",
				children: [
					INDALEKO_PAPER.author,
					", ",
					INDALEKO_PAPER.affiliation,
					". Unified Personal Index — a different UPI. Abstract: ",
					CORPUS.abstract.files.toLocaleString(),
					" files, 160 TB, eight platforms. Body: ",
					formatBytes(CORPUS.body.usedBytes),
					" used of ",
					formatBytes(CORPUS.body.capacityBytes),
					", index ",
					formatBytes(CORPUS.body.indexBytes),
					". This catalog is ",
					formatBytes(catalogBytes),
					"."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: INDALEKO_PAPER.abs,
						target: "_blank",
						rel: "noreferrer",
						className: "text-fg underline-offset-4 hover:underline",
						children: ["arXiv:", INDALEKO_PAPER.arxiv]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-subtle",
						children: " · "
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: INDALEKO_PAPER.code,
						target: "_blank",
						rel: "noreferrer",
						className: "text-fg underline-offset-4 hover:underline",
						children: "ubc-systopia/Indaleko"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StopDesk, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs uppercase tracking-widest text-subtle",
					children: "log₁₀ scale · payload vs index vs this ledger"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-3 grid gap-3",
					children: [CORPUS_ROWS.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-baseline justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm",
								children: row.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-xs tabular-nums text-muted",
								children: formatBytes(row.bytes)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1 h-2 overflow-hidden rounded-full bg-bg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: cn("h-2 rounded-full", row.status === "STOP" ? "bg-stop" : row.status === "EST" ? "bg-est" : "bg-der"),
								style: { width: `${logBarPct(row.bytes, maxBytes)}%` }
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-subtle",
							children: row.note
						})
					] }, row.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-baseline justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm",
								children: "This catalog (RNA)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-xs tabular-nums text-muted",
								children: formatBytes(catalogBytes)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1 h-2 overflow-hidden rounded-full bg-bg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-2 rounded-full bg-accent",
								style: { width: `${logBarPct(catalogBytes, maxBytes)}%` }
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-xs text-subtle",
							children: [
								catalog.nodes.length,
								" nodes, ",
								catalog.bridges.length,
								" bridges, ",
								catalog.sources.length,
								" ",
								"sources. Not a slice of the personal-file corpus."
							]
						})
					] })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs uppercase tracking-widest text-subtle",
					children: "eight storage platforms · activity extras"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "chip-row mt-2",
					children: PLATFORMS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "shrink-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: cn("inline-flex h-11 items-center gap-2 rounded-md px-3 text-sm", p.keep === "cite" ? "bg-bg text-fg" : "bg-bg text-muted"),
							title: p.meaning,
							children: [p.title, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-xs uppercase tracking-widest text-subtle",
								children: p.keep
							})]
						})
					}, p.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid gap-3 sm:grid-cols-3",
				children: byLayer.map((layer) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl bg-bg p-3 shadow-[var(--shadow-border)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-xs uppercase tracking-widest text-subtle",
							children: layer.kicker
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-1 font-display text-xl tracking-tight",
							children: layer.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-3 grid gap-2",
							children: layer.nodes.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NodeChip, {
								node: n,
								active: sel === n.id,
								onSelect: setSel
							}) }, n.id))
						})
					]
				}, layer.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs uppercase tracking-widest text-subtle",
					children: "dropped from the stack"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "chip-row mt-2",
					children: drop.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "shrink-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NodeChip, {
							node: n,
							active: sel === n.id,
							onSelect: setSel
						})
					}, n.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 rounded-xl bg-bg p-4 shadow-[var(--shadow-border)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-mono text-xs uppercase tracking-widest text-subtle",
						children: [
							node.keep === "keep" ? "keep" : "drop",
							" · ",
							node.layer
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex flex-wrap items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-2xl tracking-tight",
							children: node.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: node.status })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-2xl text-sm text-muted",
						children: node.meaning
					}),
					node.href ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: node.href,
							className: "text-fg underline-offset-4 hover:underline",
							children: "Open in the index"
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-muted",
						children: "No implementation. Left as a document claim."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs uppercase tracking-widest text-subtle",
					children: "memory anchors → physics provenance"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
					className: "mt-2 grid gap-0 text-sm",
					children: ANCHOR_MAP.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-t border-border py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "font-medium",
								children: a.paper
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: a.status })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
							className: "mt-1 text-muted",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-subtle",
									children: a.paperCue
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-subtle",
									children: " → "
								}),
								a.physics
							]
						})]
					}, a.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs uppercase tracking-widest text-subtle",
					children: "our sources mapped onto the 160 TB"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-2 grid gap-0",
					children: PHYSICS_SOURCES.map((s) => {
						const live = catalog.sources.find((c) => c.slug === s.id || c.source_id === s.id || c.slug.endsWith(s.id));
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "border-t border-border py-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: live?.canonical_url || s.url,
										target: "_blank",
										rel: "noreferrer",
										className: "text-sm text-fg underline-offset-4 hover:underline",
										children: s.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: s.status })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 font-mono text-xs uppercase tracking-widest text-subtle",
									children: [s.relation.replaceAll("_", " "), s.bytesHeld === 0 ? " · 0 B held" : null]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-muted",
									children: s.onto160
								})
							]
						}, s.id);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 flex flex-wrap items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					onClick: () => setAudit(runCorpusAudit(catalog.sources.map((s) => ({
						slug: s.slug,
						canonical_url: s.canonical_url
					})), catalogBytes)),
					children: "Audit the corpus"
				}), closed === null ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("font-mono text-xs uppercase tracking-widest", closed ? "text-est" : "text-stop"),
					children: closed ? "audits hold · 160 TB gap stays open" : "an audit failed"
				})]
			}),
			audit ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
				className: "mt-4 grid gap-0 text-sm",
				children: audit.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-baseline justify-between gap-3 border-t border-border py-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dt", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-xs text-muted",
							children: m.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-0.5 block text-xs text-subtle",
							children: m.note
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "shrink-0 font-mono text-xs tabular-nums",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: m.closed ? "text-est" : "text-stop",
							children: m.closed ? "closed" : "open"
						})
					})]
				}, m.id))
			}) : null
		]
	});
}
function NodeChip({ node, active, onSelect }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: () => onSelect(node.id),
		className: cn("flex h-11 items-center justify-between gap-2 rounded-md px-3 text-left text-sm", node.keep === "drop" ? "w-auto min-w-44" : "w-full", active ? "bg-surface-2 text-fg" : "text-muted hover:text-fg", node.keep === "drop" && !active ? "opacity-70" : null),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "truncate",
			children: node.title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: node.status })]
	});
}
function Sonifier() {
	const [sequence, setSequence] = (0, import_react.useState)("ATGCGATACGA");
	const [playing, setPlaying] = (0, import_react.useState)(false);
	const [cursor, setCursor] = (0, import_react.useState)(-1);
	const stopRef = (0, import_react.useRef)(false);
	const ctxRef = (0, import_react.useRef)(null);
	const bases = parseDnaSequence(sequence);
	(0, import_react.useEffect)(() => {
		return () => {
			stopRef.current = true;
			ctxRef.current?.close();
		};
	}, []);
	function stop() {
		stopRef.current = true;
		setPlaying(false);
		setCursor(-1);
	}
	async function play() {
		if (bases.length === 0) return;
		stopRef.current = false;
		setPlaying(true);
		const ctx = ctxRef.current ?? new AudioContext();
		ctxRef.current = ctx;
		if (ctx.state === "suspended") await ctx.resume();
		for (let i = 0; i < bases.length; i += 1) {
			if (stopRef.current) break;
			setCursor(i);
			const spec = DNA_NOTES[bases[i]];
			const osc = ctx.createOscillator();
			const gain = ctx.createGain();
			osc.type = "triangle";
			osc.frequency.value = spec.hz;
			gain.gain.setValueAtTime(1e-4, ctx.currentTime);
			gain.gain.exponentialRampToValueAtTime(.12, ctx.currentTime + .02);
			gain.gain.exponentialRampToValueAtTime(1e-4, ctx.currentTime + .28);
			osc.connect(gain);
			gain.connect(ctx.destination);
			osc.start();
			osc.stop(ctx.currentTime + .3);
			await new Promise((r) => window.setTimeout(r, 320));
		}
		setPlaying(false);
		setCursor(-1);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-[11px] uppercase tracking-[0.16em] text-subtle",
				children: "status DER · software_test"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-2 font-display text-3xl tracking-tight",
				children: "DNA sonifier"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-xl text-sm text-muted",
				children: "Maps A→A4, C→C4, G→G4, T/U→E4. The mapping is derived acoustics for pattern reading — DNA strands do not emit these pitches."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "mt-6 grid gap-2 text-sm font-medium",
				children: ["Nucleotide sequence", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					value: sequence,
					onChange: (e) => setSequence(e.target.value),
					spellCheck: false,
					className: "min-h-24 font-mono uppercase"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: playing ? stop : play,
					disabled: !playing && bases.length === 0,
					children: [playing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {}), playing ? "Stop" : "Play sequence"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "self-center font-mono text-xs text-subtle",
					children: [bases.length, " bases"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-6 grid grid-cols-4 gap-2 sm:grid-cols-6",
				children: bases.map((b, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: `rounded-md px-2 py-2 text-center font-mono text-xs ${i === cursor ? "bg-accent text-accent-fg" : "bg-bg text-muted"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block text-sm font-medium",
						children: b
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block opacity-80",
						children: DNA_NOTES[b].note
					})]
				}, `${b}-${i}`))
			}),
			cursor >= 0 && bases[cursor] ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 font-mono text-xs tabular-nums text-der",
				children: [
					DNA_NOTES[bases[cursor]].hz.toFixed(2),
					" Hz · N8",
					" ",
					formatScientific(n8Index(DNA_NOTES[bases[cursor]].hz), 3)
				]
			}) : null
		]
	});
}
function LabPage() {
	const [frequency, setFrequency] = (0, import_react.useState)("8");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-10 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-xs uppercase tracking-widest text-subtle",
				children: "Software utilities"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl tracking-tight sm:text-5xl",
				children: "Lab"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-2xl text-muted",
				children: "Walk the Einstein map on the mass shell. Rest is the intercept. Lorentz is the slide. Shorten only maps that compose. Open the loop: 11d does not invert back to frequency."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/stop",
						search: {
							id: "abstract-payload",
							group: "indaleko"
						},
						className: "text-fg underline-offset-4 hover:underline",
						children: "Open the STOP desk"
					}),
					" · ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/symmetry",
						search: {
							layer: "algebra",
							a: "so11"
						},
						className: "text-fg underline-offset-4 hover:underline",
						children: "Open the Lie algebra lab"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MeasureLoop, { frequencyHz: Number(frequency) })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OdinMap, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SourceMap, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(XMap, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DedupLab, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid gap-6 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FrequencyLab, {
					frequency,
					onFrequency: setFrequency
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sonifier, {})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GapLedger, {})
			})
		]
	});
}
//#endregion
export { LabPage as component };
