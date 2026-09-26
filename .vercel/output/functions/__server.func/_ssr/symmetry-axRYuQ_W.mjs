import { i as __toESM } from "../_runtime.mjs";
import { i as require_jsx_runtime } from "../_libs/@radix-ui/react-primitive+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as LIE_MODES, C as E8_CARTAN, D as GROUP_MODES, E as GROUP_COPY, F as cross, G as u1RoundTrip, H as rotateVec, I as e8DimensionCheck, It as cn, J as wrapTau, K as u1RoundTripLie, L as jacobiResidual, M as boostExp, N as boostLog, O as LIE_APPLICATIONS, P as composeVelocity, Pt as StatusBadge, R as lorentzRoundTrip, T as GROUP_APPLICATIONS, U as so11RoundTrip, V as planckEinsteinRoundTrip, W as so3RoundTrip, X as znInv, Y as znAdd, Z as znRoundTrip, j as boost, jt as Button, k as LIE_COPY, ot as formatScientific, q as velocityFromRapidity, r as Route$1, rt as SPEED_OF_LIGHT, w as E8_EDGES, z as minkowskiOmega } from "./router-D7EnYDiY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/symmetry-axRYuQ_W.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var N = 8;
var EVENT = {
	t: 1,
	x: 0
};
function Closed$1({ ok }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("font-mono text-xs uppercase tracking-widest", ok ? "text-est" : "text-stop"),
		children: ok ? "loop closed" : "loop broken"
	});
}
function CyclicPanel({ g, setG }) {
	const inv = znInv(N, g);
	const trip = znRoundTrip(N, g);
	const cx = 120;
	const cy = 120;
	const r = 88;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6 lg:grid-cols-[220px_1fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 240 240",
			className: "mx-auto aspect-square w-full max-w-56 text-fg",
			"aria-hidden": true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx,
				cy,
				r,
				fill: "none",
				stroke: "currentColor",
				strokeOpacity: .18
			}), Array.from({ length: N }, (_, k) => {
				const a = k / N * Math.PI * 2 - Math.PI / 2;
				const x = cx + r * Math.cos(a);
				const y = cy + r * Math.sin(a);
				const isG = k === g;
				const isInv = k === inv && k !== 0;
				const isE = k === 0;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: x,
					cy: y,
					r: isG || isE ? 8 : 5,
					fill: isG ? "var(--color-der)" : isInv ? "var(--color-hyp)" : isE ? "var(--color-est)" : "var(--color-subtle)"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x,
					y: y - 14,
					textAnchor: "middle",
					className: "fill-muted",
					fontSize: "10",
					fontFamily: "var(--font-mono)",
					children: k
				})] }, k);
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-mono text-[11px] uppercase tracking-widest text-subtle",
				children: ["element g = ", g]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm text-muted",
				children: [
					"Inverse g⁻¹ = ",
					inv,
					". Identity e = 0. ",
					trip.forward,
					" = ",
					trip.back,
					"."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "secondary",
						onClick: () => setG(znAdd(N, g, 1)),
						children: "Add 1"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "outline",
						onClick: () => setG(inv),
						children: "Apply inverse"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "ghost",
						onClick: () => setG(0),
						children: "Identity"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Closed$1, { ok: trip.closed })
			})
		] })]
	});
}
function U1Panel({ theta, setTheta }) {
	const inv = wrapTau(-theta);
	const trip = u1RoundTrip(theta);
	const R = 88;
	const toXY = (a) => {
		const t = a - Math.PI / 2;
		return [120 + R * Math.cos(t), 120 + R * Math.sin(t)];
	};
	const [gx, gy] = toXY(theta);
	const [ix, iy] = toXY(inv);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6 lg:grid-cols-[220px_1fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 240 240",
			className: "mx-auto aspect-square w-full max-w-56",
			"aria-hidden": true,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "120",
					cy: "120",
					r: R,
					fill: "none",
					stroke: "var(--color-fg)",
					strokeOpacity: .18
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: "120",
					y1: "120",
					x2: gx,
					y2: gy,
					stroke: "var(--color-der)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: "120",
					y1: "120",
					x2: ix,
					y2: iy,
					stroke: "var(--color-hyp)",
					strokeDasharray: "4 4"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: gx,
					cy: gy,
					r: "6",
					fill: "var(--color-der)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: ix,
					cy: iy,
					r: "5",
					fill: "var(--color-hyp)"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "grid gap-2 text-sm font-medium",
				children: ["Phase θ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "upi-range w-full",
					type: "range",
					min: 0,
					max: 6.283185,
					step: .01,
					value: theta,
					onChange: (e) => setTheta(Number(e.target.value))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "mt-4 grid gap-2 font-mono text-xs text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "θ" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
							className: "tabular-nums text-fg",
							children: [theta.toFixed(3), " rad"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "θ⁻¹" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
							className: "tabular-nums text-fg",
							children: [(-theta).toFixed(3), " rad"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "θ · θ⁻¹" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "tabular-nums text-fg",
							children: trip.residual.toExponential(2)
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Closed$1, { ok: trip.closed })
			})
		] })]
	});
}
function LorentzPanel({ phi, setPhi }) {
	const v = velocityFromRapidity(phi);
	const boosted = boost(EVENT, phi);
	const back = boost(boosted, -phi);
	const trip = lorentzRoundTrip(EVENT, phi);
	const omega0 = minkowskiOmega(EVENT);
	const omega1 = minkowskiOmega(boosted);
	const composed = composeVelocity(v, velocityFromRapidity(-phi));
	const scale = 48;
	const toPx = (tSec, xLightSec) => [120 + xLightSec * scale, 200 - tSec * scale];
	const [e0x, e0y] = toPx(EVENT.t, 0);
	const [bpx, bpy] = toPx(boosted.t, boosted.x / SPEED_OF_LIGHT);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6 lg:grid-cols-[220px_1fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 240 240",
			className: "mx-auto aspect-square w-full max-w-56",
			"aria-hidden": true,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: "30",
					y1: "200",
					x2: "210",
					y2: "200",
					stroke: "var(--color-subtle)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: "120",
					y1: "20",
					x2: "120",
					y2: "220",
					stroke: "var(--color-subtle)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: "30",
					y1: "200",
					x2: "210",
					y2: "20",
					stroke: "var(--color-border-strong)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: "210",
					y1: "200",
					x2: "30",
					y2: "20",
					stroke: "var(--color-border-strong)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: e0x,
					cy: e0y,
					r: "6",
					fill: "var(--color-est)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: bpx,
					cy: bpy,
					r: "6",
					fill: "var(--color-der)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: e0x,
					y1: e0y,
					x2: bpx,
					y2: bpy,
					stroke: "var(--color-hyp)",
					strokeDasharray: "3 3"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "grid gap-2 text-sm font-medium",
				children: ["Rapidity φ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "upi-range w-full",
					type: "range",
					min: -1.2,
					max: 1.2,
					step: .01,
					value: phi,
					onChange: (e) => setPhi(Number(e.target.value))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "mt-4 grid gap-2 font-mono text-xs text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "v/c = tanh φ" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "tabular-nums text-fg",
							children: Math.tanh(phi).toFixed(4)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Ω rest" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "tabular-nums text-fg",
							children: formatScientific(omega0, 4)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Ω boosted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "tabular-nums text-fg",
							children: formatScientific(omega1, 4)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "v ⊕ (−v)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "tabular-nums text-fg",
							children: formatScientific(composed, 3)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "inverse residual" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "tabular-nums text-fg",
							children: trip.residual.toExponential(2)
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-xs text-subtle",
				children: [
					"Rest event (t=1, x=0) → Λ(φ) → Λ(−φ) lands at t=",
					back.t.toFixed(6),
					", x=",
					back.x.toExponential(2),
					"."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Closed$1, { ok: trip.closed })
			})
		] })]
	});
}
function PlanckPanel({ hz, setHz }) {
	const f = Number(hz);
	const valid = Number.isFinite(f) && f >= 0;
	const trip = (0, import_react.useMemo)(() => valid ? planckEinsteinRoundTrip(f) : null, [f, valid]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
			className: "grid gap-2 text-sm font-medium",
			children: ["Frequency f", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "h-11 w-full rounded-md bg-bg px-3 pr-12 font-mono text-sm shadow-[var(--shadow-border)] outline-none focus-visible:shadow-[var(--shadow-border-hover)]",
					value: hz,
					inputMode: "decimal",
					onChange: (e) => setHz(e.target.value)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "pointer-events-none absolute inset-y-0 right-3 flex items-center font-mono text-xs text-subtle",
					children: "Hz"
				})]
			})]
		}),
		trip ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
			className: "mt-5 grid gap-0 text-sm",
			children: [
				["E = hf", `${formatScientific(trip.E)} J`],
				["m = E/c²", `${formatScientific(trip.m)} kg`],
				["E' = mc²", `${formatScientific(trip.E2)} J`],
				["f' = E'/h", `${formatScientific(trip.f2)} Hz`],
				["|f' − f|", formatScientific(trip.residual)]
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
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 text-sm text-muted",
			children: "Enter a non-negative frequency."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Closed$1, { ok: Boolean(trip?.closed) })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-3 text-sm text-muted",
			children: [
				trip?.forward,
				" then ",
				trip?.back,
				". Same f. That is the verification. Naming m information mass is a separate HYP."
			]
		})
	] });
}
function GroupLab({ mode, onMode }) {
	const [g, setG] = (0, import_react.useState)(3);
	const [theta, setTheta] = (0, import_react.useState)(1.2);
	const [phi, setPhi] = (0, import_react.useState)(.6);
	const [hz, setHz] = (0, import_react.useState)(String(8));
	const copy = GROUP_COPY[mode];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-mono text-xs uppercase tracking-widest text-subtle",
			children: "Inverse axiom"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-2 font-display text-4xl tracking-tight sm:text-5xl",
			children: "Group, then mirror"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 max-w-2xl text-muted",
			children: "A group is a set that always has a way back: g · g⁻¹ = e. That is the named form of the Planck–Einstein loop. Walk it. If you land on the start, the map is consistent."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "chip-row mt-6",
			children: GROUP_MODES.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => onMode(m.id),
				className: cn("h-11 shrink-0 rounded-md px-3 text-sm", mode === m.id ? "bg-surface-2 text-fg" : "bg-surface text-muted hover:text-fg"),
				children: m.label
			}, m.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 rounded-2xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl tracking-tight",
						children: copy.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: GROUP_MODES.find((m) => m.id === mode)?.status ?? "EST" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-2xl text-sm text-muted",
					children: copy.meaning
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6",
					children: [
						mode === "cyclic" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CyclicPanel, {
							g,
							setG
						}) : null,
						mode === "u1" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(U1Panel, {
							theta,
							setTheta
						}) : null,
						mode === "lorentz" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LorentzPanel, {
							phi,
							setPhi
						}) : null,
						mode === "planck" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlanckPanel, {
							hz,
							setHz
						}) : null
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-xs text-muted",
					children: copy.guard
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-12 font-display text-3xl tracking-tight",
			children: "Where this sits in the index"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 max-w-2xl text-sm text-muted",
			children: "Same inverse axiom, different groups. Status is per record, not inherited from the algebra."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
			className: "mt-6 grid gap-px overflow-hidden rounded-2xl bg-border sm:grid-cols-2",
			children: GROUP_APPLICATIONS.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/n/$slug",
				params: { slug: row.slug },
				className: "grid gap-2 bg-surface p-5 transition-colors hover:bg-surface-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "font-mono text-xs uppercase tracking-widest text-subtle",
						children: row.group
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: row.status })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
					className: "text-sm text-muted",
					children: row.usedFor
				})]
			}, row.group))
		})
	] });
}
function Closed({ ok }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("font-mono text-xs uppercase tracking-widest", ok ? "text-est" : "text-stop"),
		children: ok ? "loop closed" : "loop broken"
	});
}
function U1LiePanel({ theta, setTheta }) {
	const trip = u1RoundTripLie(theta);
	const R = 88;
	const t = theta - Math.PI / 2;
	const x = 120 + R * Math.cos(t);
	const y = 120 + R * Math.sin(t);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6 lg:grid-cols-[220px_1fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 240 240",
			className: "mx-auto aspect-square w-full max-w-56",
			"aria-hidden": true,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "120",
					cy: "120",
					r: R,
					fill: "none",
					stroke: "var(--color-fg)",
					strokeOpacity: .18
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: "120",
					y1: "120",
					x2: x,
					y2: y,
					stroke: "var(--color-der)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: x,
					cy: y,
					r: "6",
					fill: "var(--color-der)"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "grid gap-2 text-sm font-medium",
				children: ["Generator coefficient θ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "upi-range w-full",
					type: "range",
					min: -3.1416,
					max: 3.1416,
					step: .01,
					value: theta,
					onChange: (e) => setTheta(Number(e.target.value))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "mt-4 grid gap-2 font-mono text-xs text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "exp(iθ)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
							className: "tabular-nums text-fg",
							children: [
								Math.cos(theta).toFixed(4),
								" + i ",
								Math.sin(theta).toFixed(4)
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "[X, X]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "tabular-nums text-fg",
							children: "0"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "log residual" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "tabular-nums text-fg",
							children: trip.residual.toExponential(2)
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Closed, { ok: trip.closed })
			})
		] })]
	});
}
function So11Panel({ phi, setPhi }) {
	const g = boostExp(phi);
	const back = boostLog(g);
	const trip = so11RoundTrip(phi);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
			className: "grid gap-2 text-sm font-medium",
			children: ["Rapidity φ (algebra coordinate)", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				className: "upi-range w-full",
				type: "range",
				min: -1.2,
				max: 1.2,
				step: .01,
				value: phi,
				onChange: (e) => setPhi(Number(e.target.value))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 font-mono text-[11px] uppercase tracking-widest text-subtle",
			children: "K² = I · exp(φK)"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-2 overflow-x-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", {
				className: "w-full min-w-56 text-center font-mono text-sm tabular-nums",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: g.map((row, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: row.map((v, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					className: "border-t border-border py-2",
					children: v.toFixed(4)
				}, j)) }, i)) })
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
			className: "mt-4 grid gap-2 font-mono text-xs text-muted",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "log(Λ)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
					className: "tabular-nums text-fg",
					children: back.toFixed(6)
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "|log − φ|" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
					className: "tabular-nums text-fg",
					children: trip.residual.toExponential(2)
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Closed, { ok: trip.closed })
		})
	] });
}
var AXIS_CHOICE = [
	{
		id: "x",
		axis: [
			1,
			0,
			0
		],
		label: "Jx"
	},
	{
		id: "y",
		axis: [
			0,
			1,
			0
		],
		label: "Jy"
	},
	{
		id: "z",
		axis: [
			0,
			0,
			1
		],
		label: "Jz"
	}
];
function So3Panel({ axisId, theta, setAxisId, setTheta }) {
	const axis = AXIS_CHOICE.find((a) => a.id === axisId)?.axis ?? [
		0,
		0,
		1
	];
	const trip = so3RoundTrip(axis, theta);
	const v0 = [
		1,
		.2,
		.1
	];
	const v1 = rotateVec(axis, theta, v0);
	const jx = [
		1,
		0,
		0
	];
	const jy = [
		0,
		1,
		0
	];
	const jz = [
		0,
		0,
		1
	];
	const bracket = cross(jx, jy);
	const jacobi = jacobiResidual(jx, jy, jz);
	const scale = 70;
	const to = (v) => [120 + v[0] * scale, 120 - v[1] * scale];
	const [x0, y0] = to(v0);
	const [x1, y1] = to(v1);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6 lg:grid-cols-[220px_1fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 240 240",
			className: "mx-auto aspect-square w-full max-w-56",
			"aria-hidden": true,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "120",
					cy: "120",
					r: "90",
					fill: "none",
					stroke: "var(--color-fg)",
					strokeOpacity: .18
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: "30",
					y1: "120",
					x2: "210",
					y2: "120",
					stroke: "var(--color-subtle)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: "120",
					y1: "30",
					x2: "120",
					y2: "210",
					stroke: "var(--color-subtle)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: "120",
					y1: "120",
					x2: x0,
					y2: y0,
					stroke: "var(--color-est)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: "120",
					y1: "120",
					x2: x1,
					y2: y1,
					stroke: "var(--color-der)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: x0,
					cy: y0,
					r: "5",
					fill: "var(--color-est)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: x1,
					cy: y1,
					r: "6",
					fill: "var(--color-der)"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "chip-row",
				children: AXIS_CHOICE.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setAxisId(a.id),
					className: cn("h-11 shrink-0 rounded-md px-3 text-sm", axisId === a.id ? "bg-surface-2 text-fg" : "text-muted hover:text-fg"),
					children: a.label
				}, a.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "mt-4 grid gap-2 text-sm font-medium",
				children: ["Angle θ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "upi-range w-full",
					type: "range",
					min: 0,
					max: 3.1416,
					step: .01,
					value: theta,
					onChange: (e) => setTheta(Number(e.target.value))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "mt-4 grid gap-2 font-mono text-xs text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "[Jx, Jy]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
							className: "tabular-nums text-fg",
							children: [
								"(",
								bracket.map((c) => c.toFixed(0)).join(", "),
								") = Jz"
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Jacobi ‖∑[X,[Y,Z]]‖" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "tabular-nums text-fg",
							children: jacobi.toExponential(2)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "log residual" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "tabular-nums text-fg",
							children: trip.residual.toExponential(2)
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Closed, { ok: trip.closed && jacobi < 1e-12 })
			})
		] })]
	});
}
var DYNKIN_POS = [
	[18, 70],
	[48, 70],
	[78, 70],
	[108, 70],
	[138, 70],
	[168, 70],
	[198, 70],
	[138, 118]
];
function E8Panel({ root, setRoot }) {
	const dim = e8DimensionCheck();
	const row = E8_CARTAN[root] ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 220 150",
			className: "mx-auto w-full max-w-md",
			"aria-hidden": true,
			children: [E8_EDGES.map(([a, b]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: DYNKIN_POS[a][0],
				y1: DYNKIN_POS[a][1],
				x2: DYNKIN_POS[b][0],
				y2: DYNKIN_POS[b][1],
				stroke: "var(--color-fg)",
				strokeOpacity: .35
			}, `${a}-${b}`)), DYNKIN_POS.map(([x, y], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: x,
				cy: y,
				r: "11",
				className: "cursor-pointer",
				fill: i === root ? "var(--color-der)" : "var(--color-surface-2)",
				stroke: "var(--color-fg)",
				strokeOpacity: .35,
				onClick: () => setRoot(i)
			}) }, i))]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "chip-row mt-3",
			children: DYNKIN_POS.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => setRoot(i),
				className: cn("h-11 shrink-0 rounded-md px-3 font-mono text-sm", root === i ? "bg-surface-2 text-fg" : "text-muted hover:text-fg"),
				children: ["α", i + 1]
			}, i))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-4 font-mono text-[11px] uppercase tracking-widest text-subtle",
			children: [
				"Cartan row 〈α",
				root + 1,
				", α∨〉"
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-2 overflow-x-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", {
				className: "w-full text-center font-mono text-xs tabular-nums",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: row.map((v, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					className: "border-t border-border py-2",
					children: v
				}, j)) }) })
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
			className: "mt-4 grid gap-2 font-mono text-xs text-muted",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "rank" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "tabular-nums text-fg",
						children: 8
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "roots |Φ|" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "tabular-nums text-fg",
						children: 240
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "dim = rank + |Φ|" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "tabular-nums text-fg",
						children: 248
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Closed, { ok: dim.closed })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-sm",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/n/$slug",
				params: { slug: "upi-coding-theory-1-root-system-e8-lattice" },
				className: "text-fg underline-offset-4 hover:underline",
				children: "E8 root lattice in the index"
			})
		})
	] });
}
function LieLab({ mode, onMode }) {
	const [theta, setTheta] = (0, import_react.useState)(1.1);
	const [phi, setPhi] = (0, import_react.useState)(.6);
	const [axisId, setAxisId] = (0, import_react.useState)("z");
	const [so3theta, setSo3theta] = (0, import_react.useState)(.9);
	const [root, setRoot] = (0, import_react.useState)(4);
	const copy = LIE_COPY[mode];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-mono text-xs uppercase tracking-widest text-subtle",
			children: "Exponential map"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-2 font-display text-4xl tracking-tight sm:text-5xl",
			children: "Algebra, then group"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 max-w-2xl text-muted",
			children: "A Lie algebra is the group linearized at the identity. The exponential map sends a generator to a finite symmetry; the logarithm walks back. Same mirror. Infinitesimal."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "chip-row mt-6",
			children: LIE_MODES.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => onMode(m.id),
				className: cn("h-11 shrink-0 rounded-md px-3 text-sm", mode === m.id ? "bg-surface-2 text-fg" : "bg-surface text-muted hover:text-fg"),
				children: m.label
			}, m.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 rounded-2xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl tracking-tight",
						children: copy.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: "EST" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-2xl text-sm text-muted",
					children: copy.meaning
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6",
					children: [
						mode === "u1" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(U1LiePanel, {
							theta,
							setTheta
						}) : null,
						mode === "so11" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(So11Panel, {
							phi,
							setPhi
						}) : null,
						mode === "so3" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(So3Panel, {
							axisId,
							theta: so3theta,
							setAxisId,
							setTheta: setSo3theta
						}) : null,
						mode === "e8" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(E8Panel, {
							root,
							setRoot
						}) : null
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-xs text-muted",
					children: copy.guard
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-12 font-display text-3xl tracking-tight",
			children: "Where this sits in the index"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 max-w-2xl text-sm text-muted",
			children: "The exponential map is the dictionary. Status stays on the record, not on the bracket."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
			className: "mt-6 grid gap-px overflow-hidden rounded-2xl bg-border sm:grid-cols-2",
			children: LIE_APPLICATIONS.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/n/$slug",
				params: { slug: row.slug },
				className: "grid gap-2 bg-surface p-5 transition-colors hover:bg-surface-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "font-mono text-xs uppercase tracking-widest text-subtle",
						children: row.algebra
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: row.status })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
					className: "text-sm text-muted",
					children: row.usedFor
				})]
			}, row.algebra))
		})
	] });
}
function SymmetryPage() {
	const { layer: layerQ, g, a } = Route$1.useSearch();
	const navigate = Route$1.useNavigate();
	const layer = layerQ ?? (a ? "algebra" : "group");
	const groupMode = g ?? "planck";
	const lieMode = a ?? "so11";
	function setLayer(next) {
		navigate({
			to: "/symmetry",
			search: next === "algebra" ? {
				layer: next,
				a: lieMode
			} : {
				layer: next,
				g: groupMode
			},
			replace: true
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-10 sm:px-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "chip-row",
			children: [["group", "Group"], ["algebra", "Algebra"]].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setLayer(id),
				className: cn("h-11 shrink-0 rounded-md px-4 text-sm", layer === id ? "bg-surface-2 text-fg" : "bg-surface text-muted hover:text-fg"),
				children: label
			}, id))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8",
			children: layer === "algebra" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LieLab, {
				mode: lieMode,
				onMode: (next) => {
					navigate({
						to: "/symmetry",
						search: {
							layer: "algebra",
							a: next
						},
						replace: true
					});
				}
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GroupLab, {
				mode: groupMode,
				onMode: (next) => {
					navigate({
						to: "/symmetry",
						search: {
							layer: "group",
							g: next
						},
						replace: true
					});
				}
			})
		})]
	});
}
//#endregion
export { SymmetryPage as component };
