import { i as __toESM } from "../_runtime.mjs";
import { i as require_jsx_runtime } from "../_libs/@radix-ui/react-primitive+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { Gt as useLive, Pt as StatusBadge, Vt as getNode, jt as Button } from "./router-D7EnYDiY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/holography-B1uys_2k.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** AdS3 / Poincaré disk utilities. Software geometry, not a proof of Maldacena. */
var ADS = {
	/** AdS radius in pedagogical units. */
	L: 1,
	/** 4 G_N = 1 so Ryu–Takayanagi entropy equals hyperbolic length. */
	fourG: 1,
	/** Radial cutoff of the geodesic endpoints. */
	rho: .92
};
/** Brown–Henneaux central charge c = 3L / (2 G_N), with 4G_N = 1 ⇒ G_N = 1/4. */
function brownHenneauxC(L = ADS.L, fourG = ADS.fourG) {
	const G = fourG / 4;
	return 3 * L / (2 * G);
}
function mag2(p) {
	return p.x * p.x + p.y * p.y;
}
function cis(theta, r = 1) {
	return {
		x: r * Math.cos(theta),
		y: r * Math.sin(theta)
	};
}
function wrapPi(theta) {
	let t = theta;
	while (t <= -Math.PI) t += 2 * Math.PI;
	while (t > Math.PI) t -= 2 * Math.PI;
	return t;
}
/** Poincaré disk hyperbolic distance (curvature −1). */
function poincareDistance(z, w) {
	const num = (z.x - w.x) ** 2 + (z.y - w.y) ** 2;
	const den = (1 - mag2(z)) * (1 - mag2(w));
	if (den <= 0) return Number.POSITIVE_INFINITY;
	const arg = 1 + 2 * num / den;
	return Math.acosh(Math.max(1, arg));
}
/** Geodesic through two cutoff-surface points at angles a, b. */
function geodesicOnCutoff(a, b, rho = ADS.rho) {
	const z1 = cis(a, rho);
	const z2 = cis(b, rho);
	const length = poincareDistance(z1, z2);
	const sx = z1.x + z2.x;
	const sy = z1.y + z2.y;
	const s = Math.hypot(sx, sy);
	if (s < 1e-8) return {
		kind: "diameter",
		z1,
		z2,
		length
	};
	const lambda = (rho * rho + 1) / s;
	if (lambda < 1 + 1e-6) return {
		kind: "diameter",
		z1,
		z2,
		length
	};
	return {
		kind: "arc",
		z1,
		z2,
		center: {
			x: lambda * sx / s,
			y: lambda * sy / s
		},
		radius: Math.sqrt(Math.max(0, lambda * lambda - 1)),
		length
	};
}
/** Sample an interior geodesic arc for drawing (points in the disk). */
function sampleGeodesic(g, steps = 64) {
	if (g.kind === "diameter" || !g.center || g.radius == null) {
		const pts = [];
		for (let i = 0; i <= steps; i++) {
			const t = i / steps;
			pts.push({
				x: g.z1.x * (1 - t) + g.z2.x * t,
				y: g.z1.y * (1 - t) + g.z2.y * t
			});
		}
		return pts;
	}
	const c = g.center;
	const r = g.radius;
	let a1 = Math.atan2(g.z1.y - c.y, g.z1.x - c.x);
	let delta = wrapPi(Math.atan2(g.z2.y - c.y, g.z2.x - c.x) - a1);
	if (mag2({
		x: c.x + r * Math.cos(a1 + delta / 2),
		y: c.y + r * Math.sin(a1 + delta / 2)
	}) > 1) delta -= Math.sign(delta) * 2 * Math.PI;
	const pts = [];
	for (let i = 0; i <= steps; i++) {
		const t = i / steps;
		const ang = a1 + delta * t;
		pts.push({
			x: c.x + r * Math.cos(ang),
			y: c.y + r * Math.sin(ang)
		});
	}
	return pts;
}
function ryuTakayanagi(length, fourG = ADS.fourG) {
	return length / fourG;
}
/**
* CFT2 interval entropy on a circle, UV-cutoff matched to radial ρ as ε ≈ 1 − ρ.
* Pedagogical: S = (c/3) ln((2/ε) sin(φ/2)).
*/
function cftIntervalEntropy(phi, rho = ADS.rho) {
	const c = brownHenneauxC();
	const eps = Math.max(1e-9, 1 - rho);
	const s = Math.max(1e-9, Math.sin(Math.abs(phi) / 2));
	return c / 3 * Math.log(2 / eps * s);
}
function clampOpening(phi) {
	return Math.min(2.9, Math.max(.28, phi));
}
function token(el, name, fallback) {
	return getComputedStyle(el).getPropertyValue(name).trim() || fallback;
}
function AdsPortrait() {
	const canvasRef = (0, import_react.useRef)(null);
	const [mu, setMu] = (0, import_react.useState)(-.35);
	const [phi, setPhi] = (0, import_react.useState)(1.35);
	const dragRef = (0, import_react.useRef)(null);
	const sliderId = (0, import_react.useId)();
	const a = mu - phi / 2;
	const b = mu + phi / 2;
	const geo = geodesicOnCutoff(a, b);
	const sRt = ryuTakayanagi(geo.length);
	const sCft = cftIntervalEntropy(phi);
	const c = brownHenneauxC();
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		let live = true;
		const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		const draw = () => {
			if (!live) return;
			const cssW = canvas.parentElement?.clientWidth ?? 640;
			const cssH = Math.max(340, Math.round(Math.min(cssW, 720) * .78));
			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			if (canvas.width !== Math.round(cssW * dpr) || canvas.height !== Math.round(cssH * dpr)) {
				canvas.width = Math.round(cssW * dpr);
				canvas.height = Math.round(cssH * dpr);
				canvas.style.width = `${cssW}px`;
				canvas.style.height = `${cssH}px`;
			}
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			ctx.clearRect(0, 0, cssW, cssH);
			const gold = token(canvas, "--color-hyp", "#c4a574");
			const cyan = token(canvas, "--color-der", "#8aa4b8");
			const fg = token(canvas, "--color-fg", "#eceae4");
			const muted = token(canvas, "--color-subtle", "#5e636c");
			const cx = cssW / 2;
			const cy = cssH / 2;
			const R = Math.min(cssW, cssH) * .42;
			const toPix = (p) => ({
				x: cx + p.x * R,
				y: cy - p.y * R
			});
			ctx.beginPath();
			ctx.arc(cx, cy, R, 0, Math.PI * 2);
			ctx.fillStyle = "rgba(17,19,24,0.9)";
			ctx.fill();
			ctx.save();
			ctx.beginPath();
			ctx.arc(cx, cy, R, 0, Math.PI * 2);
			ctx.clip();
			ctx.strokeStyle = muted;
			ctx.globalAlpha = .35;
			ctx.lineWidth = 1;
			for (let i = 1; i <= 4; i++) {
				ctx.beginPath();
				ctx.arc(cx, cy, i / 5 * R, 0, Math.PI * 2);
				ctx.stroke();
			}
			for (let k = 0; k < 8; k++) {
				const t = k * Math.PI / 8;
				const p = toPix(cis(t, .999));
				const q = toPix(cis(t + Math.PI, .999));
				ctx.beginPath();
				ctx.moveTo(p.x, p.y);
				ctx.lineTo(q.x, q.y);
				ctx.stroke();
			}
			ctx.globalAlpha = 1;
			const aa = mu - phi / 2;
			const bb = mu + phi / 2;
			ctx.beginPath();
			ctx.strokeStyle = cyan;
			ctx.lineWidth = 6;
			ctx.lineCap = "butt";
			ctx.arc(cx, cy, R - 1.5, -bb, -aa, false);
			ctx.stroke();
			const samples = sampleGeodesic(geodesicOnCutoff(aa, bb), reduced ? 32 : 80).map(toPix);
			ctx.beginPath();
			ctx.strokeStyle = gold;
			ctx.lineWidth = 2.4;
			ctx.lineJoin = "round";
			samples.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
			ctx.stroke();
			ctx.restore();
			ctx.beginPath();
			ctx.arc(cx, cy, R, 0, Math.PI * 2);
			ctx.strokeStyle = fg;
			ctx.globalAlpha = .55;
			ctx.lineWidth = 1.25;
			ctx.stroke();
			ctx.globalAlpha = 1;
			ctx.beginPath();
			ctx.setLineDash([3, 4]);
			ctx.arc(cx, cy, ADS.rho * R, 0, Math.PI * 2);
			ctx.strokeStyle = muted;
			ctx.lineWidth = 1;
			ctx.stroke();
			ctx.setLineDash([]);
			for (const ang of [aa, bb]) {
				const p = toPix(cis(ang, 1));
				ctx.beginPath();
				ctx.arc(p.x, p.y, 7, 0, Math.PI * 2);
				ctx.fillStyle = gold;
				ctx.fill();
				ctx.lineWidth = 2;
				ctx.strokeStyle = fg;
				ctx.stroke();
			}
			ctx.font = "12px 'IBM Plex Mono', monospace";
			ctx.fillStyle = muted;
			ctx.fillText("CFT  (boundary)", cx + R * .62, cy - R * .82);
			ctx.fillStyle = gold;
			ctx.fillText("bulk geodesic γ_A", cx - R * .92, cy + 8);
			ctx.fillStyle = cyan;
			ctx.fillText("region A", toPix(cis((aa + bb) / 2, 1.12)).x - 28, toPix(cis((aa + bb) / 2, 1.12)).y);
		};
		draw();
		const ro = new ResizeObserver(() => draw());
		if (canvas.parentElement) ro.observe(canvas.parentElement);
		return () => {
			live = false;
			ro.disconnect();
		};
	}, [mu, phi]);
	function hitHandle(clientX, clientY) {
		const canvas = canvasRef.current;
		if (!canvas) return null;
		const rect = canvas.getBoundingClientRect();
		const x = clientX - rect.left;
		const y = clientY - rect.top;
		const cssW = rect.width;
		const cssH = rect.height;
		const cx = cssW / 2;
		const cy = cssH / 2;
		const R = Math.min(cssW, cssH) * .42;
		const toPix = (p) => ({
			x: cx + p.x * R,
			y: cy - p.y * R
		});
		const pa = toPix(cis(a, 1));
		const pb = toPix(cis(b, 1));
		const da = Math.hypot(x - pa.x, y - pa.y);
		const db = Math.hypot(x - pb.x, y - pb.y);
		if (da < 22) return "a";
		if (db < 22) return "b";
		const nx = (x - cx) / R;
		const ny = (cy - y) / R;
		if (Math.hypot(nx, ny) < 1.08) return "body";
		return null;
	}
	function angleOf(clientX, clientY) {
		const canvas = canvasRef.current;
		if (!canvas) return 0;
		const rect = canvas.getBoundingClientRect();
		const cssW = rect.width;
		const cssH = rect.height;
		const cx = cssW / 2;
		const cy = cssH / 2;
		const R = Math.min(cssW, cssH) * .42;
		const nx = (clientX - rect.left - cx) / R;
		const ny = (cy - (clientY - rect.top)) / R;
		return Math.atan2(ny, nx);
	}
	function onPointerDown(e) {
		const which = hitHandle(e.clientX, e.clientY);
		if (!which) return;
		dragRef.current = which;
		e.currentTarget.setPointerCapture(e.pointerId);
	}
	function onPointerMove(e) {
		const which = dragRef.current;
		if (!which) return;
		const t = angleOf(e.clientX, e.clientY);
		if (which === "a") {
			const delta = wrapPi(b - t);
			const opening = clampOpening(Math.abs(delta));
			const sign = delta >= 0 ? 1 : -1;
			setPhi(opening);
			setMu(wrapPi(b - sign * opening / 2));
		} else if (which === "b") {
			const delta = wrapPi(t - a);
			const opening = clampOpening(Math.abs(delta));
			const sign = delta >= 0 ? 1 : -1;
			setPhi(opening);
			setMu(wrapPi(a + sign * opening / 2));
		} else setMu(t);
	}
	function onPointerUp() {
		dragRef.current = null;
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-[11px] uppercase tracking-[0.16em] text-subtle",
				children: "AdS3 / CFT2 · verification_type: software_test"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl tracking-tight",
					children: "Ryu–Takayanagi geodesic"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: "DER" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-2xl text-sm text-muted",
				children: "Drag the handles on the conformal boundary. The bulk geodesic γ_A is the unique curve homologous to region A. Its hyperbolic length is the entanglement entropy of A — that is the dictionary, in AdS3."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-5 overflow-hidden rounded-xl bg-bg",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
					ref: canvasRef,
					className: "block w-full touch-none",
					onPointerDown,
					onPointerMove,
					onPointerUp,
					onPointerCancel: onPointerUp,
					role: "img",
					"aria-label": "Poincaré disk with a Ryu-Takayanagi geodesic"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "mt-5 grid gap-2 text-sm font-medium",
				htmlFor: sliderId,
				children: ["Boundary interval", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					id: sliderId,
					type: "range",
					min: .28,
					max: 2.9,
					step: .01,
					value: phi,
					onChange: (e) => setPhi(Number(e.target.value)),
					className: "upi-range h-11 w-full"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
				className: "mt-5 grid gap-0 sm:grid-cols-2",
				children: [
					["Opening φ", `${phi.toFixed(3)} rad`],
					["Hyperbolic length of γ_A", geo.length.toFixed(4)],
					["S_RT = Length / 4G_N", sRt.toFixed(4)],
					["S_CFT ≈ (c/3) ln((2/ε) sin(φ/2))", sCft.toFixed(4)],
					["Brown–Henneaux c = 3L/(2G_N)", c.toFixed(2)],
					["Cutoff ρ", ADS.rho.toFixed(2)]
				].map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-baseline justify-between gap-4 border-t border-border py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-xs text-muted",
						children: k
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "font-mono text-sm tabular-nums",
						children: v
					})]
				}, k))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 text-xs text-muted",
				children: [
					"Pedagogical units L = 1, 4G_N = 1. S_RT and S_CFT share the same divergence structure; they need not print as equal at a finite cutoff. This is AdS3, not our sky.",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/n/$slug",
						params: { slug: "upi-theories-1-holography-ryu-takayanagi" },
						className: "text-fg underline-offset-2 hover:underline",
						children: "Open the RT record"
					}),
					"."
				]
			})
		]
	});
}
var RECORDS = [
	"upi-gravity-1-spacetime-anti-de-sitter",
	"upi-quantum-field-1-symmetry-conformal-field-theory",
	"upi-theories-1-holography-ads-cft",
	"upi-theories-1-holography-ryu-takayanagi",
	"upi-theories-1-holography-not-our-sky"
];
function HolographyPage() {
	const catalog = useLive((s) => s.catalog);
	const nodes = RECORDS.map((slug) => getNode(slug, catalog)).filter((n) => n != null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-10 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-xs uppercase tracking-widest text-subtle",
				children: "Holography"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl tracking-tight sm:text-5xl",
				children: "AdS/CFT"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-2xl text-muted",
				children: "Gravity in an asymptotically anti-de Sitter bulk is dual to a conformal field theory on the boundary. Maldacena (1997) is still a conjecture — status HYP — and it is the most tightly tested duality in string theory. The geodesic on this page is the Ryu–Takayanagi formula in AdS3: bulk length equals boundary entanglement entropy."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdsPortrait, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-8 grid gap-3 sm:grid-cols-2",
				children: nodes.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: n.status }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-[10px] uppercase tracking-widest text-subtle",
								children: n.domain
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/n/$slug",
							params: { slug: n.slug },
							className: "mt-3 block font-display text-2xl tracking-tight hover:underline",
							children: n.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted",
							children: n.description
						})
					]
				}, n.slug))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10 border-t border-border pt-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl tracking-tight",
						children: "The dictionary"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
						className: "mt-4 grid gap-0 sm:grid-cols-2",
						children: [
							["Bulk", "Einstein gravity (plus strings / M-theory) in AdS"],
							["Boundary", "CFT generating functional"],
							["GKP–Witten", "Z_bulk[φ₀] = ⟨exp ∫ φ₀ O⟩_CFT"],
							["Ryu–Takayanagi", "S_A = Area(γ_A) / 4G_N"],
							["AdS5 × S5", "Type IIB  ↔  4d N=4 SYM"],
							["AdS4 × S7", "M-theory on the 11D Freund–Rubin vacuum  ↔  ABJM"]
						].map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-t border-border py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "font-mono text-[11px] uppercase tracking-widest text-subtle",
								children: k
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-1 text-sm text-muted",
								children: v
							})]
						}, k))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-2xl text-sm text-muted",
						children: "This is the in-domain holographic entropy — entanglement of a boundary region, dual to a bulk area. It is not S_BH of a laboratory frequency quantum, and it is not a photograph of de Sitter sky."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex flex-wrap gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/lab",
								children: "Open the measure lab"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/n/$slug",
								params: { slug: "upi-theories-1-holography-ads-cft" },
								children: "Open the correspondence"
							})
						})]
					})
				]
			})
		]
	});
}
//#endregion
export { HolographyPage as component };
