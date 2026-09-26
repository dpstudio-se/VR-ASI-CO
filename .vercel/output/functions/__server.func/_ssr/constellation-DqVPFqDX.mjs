import { i as __toESM } from "../_runtime.mjs";
import { i as require_jsx_runtime } from "../_libs/@radix-ui/react-primitive+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as RotateCcw, f as Maximize2, l as Play, n as ZoomOut, p as LocateFixed, s as Search, t as ZoomIn, u as Pause } from "../_libs/lucide-react.mjs";
import { Bt as getLiveCatalog, Gt as useLive, Ht as getNodeByAddress, It as cn, Lt as domainLabel, Mt as STATUSES, Pt as StatusBadge, jt as Button, y as Input } from "./router-D7EnYDiY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/constellation-DqVPFqDX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var RELATIONS = [
	"DERIVED_FROM",
	"MEASURED_BY",
	"DUAL_TO",
	"STOPS_AT"
];
var RELATION_COPY = {
	DERIVED_FROM: {
		label: "Derived from",
		meaning: "Follows from the target record under named assumptions.",
		dash: "0"
	},
	MEASURED_BY: {
		label: "Measured by",
		meaning: "Observable or measurement rule for the source.",
		dash: "0"
	},
	DUAL_TO: {
		label: "Dual to",
		meaning: "Fourier or algebraic dual of the target.",
		dash: "6 5"
	},
	STOPS_AT: {
		label: "Stops at",
		meaning: "Hits a named computational or evidence boundary.",
		dash: "2 4"
	}
};
var RELATION_COLOR = {
	DERIVED_FROM: "var(--color-der)",
	MEASURED_BY: "var(--color-est)",
	DUAL_TO: "var(--color-hyp)",
	STOPS_AT: "var(--color-stop)"
};
var STATUS_COLOR = {
	EST: "var(--color-est)",
	DER: "var(--color-der)",
	HYP: "var(--color-hyp)",
	STOP: "var(--color-stop)",
	ERR: "var(--color-err)",
	SYM: "var(--color-sym)"
};
var GRAPH_WIDTH = 1e3;
/** Editorial seed for the single bridged component in this snapshot. */
var CLUSTER_SEED = {
	"UPI<quantum_information,1,finite_dimensional,hilbert_state_space>": {
		x: 0,
		y: -24
	},
	"UPI<quantum_information,1,measurement,born_probability_rule>": {
		x: 10,
		y: -168
	},
	"UPI<quantum_information,1,multi_qudit,tensor_product_register>": {
		x: -168,
		y: 42
	},
	"UPI<quantum_information,1,qudit,generalized_weyl_gates>": {
		x: 18,
		y: 132
	},
	"UPI<quantum_information,1,qudit,fourier_dual_basis>": {
		x: 168,
		y: 34
	},
	"UPI<information_physics,3,qudit_torus,digital_multi_state_search>": {
		x: 0,
		y: 248
	},
	"UPI<quantum_algorithms,1,amplitude_amplification,phase_oracle_diffusion>": {
		x: -200,
		y: 338
	},
	"UPI<computational_physics,2,state_vector,classical_resource_boundary>": {
		x: 210,
		y: 324
	},
	"UPI<coding_theory,1,root_system,e8_lattice>": {
		x: -360,
		y: -90
	},
	"UPI<coding_theory,1,sphere_packing,leech_lattice>": {
		x: -220,
		y: 50
	},
	"UPI<coding_theory,1,binary_code,extended_golay>": {
		x: -350,
		y: 140
	},
	"UPI<quantum_information,1,error_correction,syndrome_measurement>": {
		x: -168,
		y: -40
	},
	"UPI<information_physics,1,inertia,frequency_mass_equivalent>": {
		x: 280,
		y: -200
	},
	"UPI<information_physics,1,inertia,information_mass>": {
		x: 420,
		y: -140
	},
	"UPI<information_physics,1,measure,universal_information_measure>": {
		x: 520,
		y: -40
	},
	"UPI<gravity,1,horizon,bekenstein_hawking_entropy>": {
		x: 640,
		y: -160
	},
	"UPI<theories,1,m_theory,eleven_d_brane>": {
		x: 560,
		y: 80
	},
	"UPI<theories,1,holography,ads_cft>": {
		x: 480,
		y: 180
	},
	"UPI<theories,1,holography,ryu_takayanagi>": {
		x: 680,
		y: -40
	},
	"UPI<gravity,1,spacetime,anti_de_sitter>": {
		x: 760,
		y: -180
	},
	"UPI<quantum_field,1,symmetry,conformal_field_theory>": {
		x: 640,
		y: 200
	},
	"UPI<theories,1,holography,not_our_sky>": {
		x: 800,
		y: 80
	},
	"UPI<information_physics,1,measure,sub_planck_horizon>": {
		x: 700,
		y: 20
	},
	"UPI<QUANTUM_MECHANICS,1,QUANTA,PLANCK_EINSTEIN_RELATION>": {
		x: 170,
		y: -280
	},
	"UPI<RELATIVITY,1,T_ENERGY,N_MASS_ENERGY>": {
		x: 390,
		y: -270
	},
	"UPI<physics,1,fundamental,planck_constant>": {
		x: 260,
		y: -360
	}
};
var ISOLATE_DOMAIN_ORDER = [
	"established",
	"constants",
	"theories",
	"mechanics",
	"biology",
	"open-problems",
	"examples",
	"information_physics",
	"quantum_information",
	"coding_theory"
];
function isRelation(value) {
	return RELATIONS.includes(value);
}
function nodeRadius(degree) {
	return 7 + Math.min(degree, 5) * 2.35;
}
function wrapTitle(title, max = 18, maxLines = 2) {
	const words = title.split(/\s+/);
	const lines = [];
	let cur = "";
	for (let i = 0; i < words.length; i++) {
		const word = words[i];
		const next = cur ? `${cur} ${word}` : word;
		if (next.length > max && cur) {
			lines.push(cur);
			cur = word;
			if (lines.length >= maxLines - 1) {
				const rest = [cur, ...words.slice(i + 1)].join(" ");
				lines.push(rest.length > max ? `${rest.slice(0, max - 1)}…` : rest);
				return lines;
			}
		} else cur = next;
	}
	if (cur) lines.push(cur);
	return lines;
}
function shortTitle(title, max = 28) {
	if (title.length <= max) return title;
	const cut = title.slice(0, max - 1);
	const at = cut.lastIndexOf(" ");
	return `${(at > 12 ? cut.slice(0, at) : cut).trimEnd()}…`;
}
function degreeMap(nodes, bridges) {
	const map = /* @__PURE__ */ new Map();
	for (const n of nodes) map.set(n.address, 0);
	for (const b of bridges) {
		if (map.has(b.source)) map.set(b.source, (map.get(b.source) ?? 0) + 1);
		if (map.has(b.target)) map.set(b.target, (map.get(b.target) ?? 0) + 1);
	}
	return map;
}
function neighborAddresses(address, bridges = getLiveCatalog().bridges) {
	const out = /* @__PURE__ */ new Set();
	for (const b of bridges) {
		if (b.source === address) out.add(b.target);
		if (b.target === address) out.add(b.source);
	}
	return out;
}
function incidentBridges(address, bridges = getLiveCatalog().bridges) {
	return bridges.filter((b) => b.source === address || b.target === address);
}
function fallbackSeed(index, total) {
	const angle = Math.PI * 2 * index / Math.max(total, 1) - Math.PI / 2;
	return {
		x: Math.cos(angle) * 110,
		y: Math.sin(angle) * 110
	};
}
function layoutGraph(nodes = getLiveCatalog().nodes, bridges = getLiveCatalog().bridges, width = GRAPH_WIDTH, height = 760) {
	const cx = width / 2;
	const cy = height * .49;
	const degrees = degreeMap(nodes, bridges);
	const connected = nodes.filter((n) => (degrees.get(n.address) ?? 0) > 0);
	const isolated = nodes.filter((n) => (degrees.get(n.address) ?? 0) === 0);
	const byAddress = /* @__PURE__ */ new Map();
	connected.forEach((node, i) => {
		const seed = CLUSTER_SEED[node.address] ?? fallbackSeed(i, connected.length);
		byAddress.set(node.address, {
			x: cx + seed.x,
			y: cy + seed.y,
			node,
			degree: degrees.get(node.address) ?? 0
		});
	});
	const groups = /* @__PURE__ */ new Map();
	for (const node of isolated) {
		const list = groups.get(node.domain) ?? [];
		list.push(node);
		groups.set(node.domain, list);
	}
	for (const list of groups.values()) list.sort((a, b) => a.title.localeCompare(b.title));
	const orderedDomains = [...ISOLATE_DOMAIN_ORDER.filter((d) => groups.has(d)), ...[...groups.keys()].filter((d) => !ISOLATE_DOMAIN_ORDER.includes(d)).sort()];
	const total = isolated.length || 1;
	const gap = .14;
	const usable = Math.PI * 2 - gap * orderedDomains.length;
	let theta = -Math.PI / 2;
	const rx = width * .42;
	const ry = height * .4;
	const domainAnchors = [];
	for (const domain of orderedDomains) {
		const group = groups.get(domain) ?? [];
		const groupSpan = group.length / total * usable;
		const mids = [];
		group.forEach((node, i) => {
			const angle = theta + (i + .5) / group.length * groupSpan;
			const jitter = (i % 3 - 1) * 10;
			const px = cx + Math.cos(angle) * (rx + jitter);
			const py = cy + Math.sin(angle) * (ry + jitter * .6);
			mids.push({
				x: px,
				y: py
			});
			byAddress.set(node.address, {
				x: px,
				y: py,
				node,
				degree: 0
			});
		});
		if (mids.length) {
			const mx = mids.reduce((s, p) => s + p.x, 0) / mids.length;
			const my = mids.reduce((s, p) => s + p.y, 0) / mids.length;
			const dx = mx - cx;
			const dy = my - cy;
			const len = Math.hypot(dx, dy) || 1;
			domainAnchors.push({
				domain,
				x: cx + dx / len * (len + 26),
				y: cy + dy / len * (len + 22)
			});
		}
		theta += groupSpan + gap;
	}
	return {
		width,
		height,
		cx,
		cy,
		points: [...byAddress.values()],
		byAddress,
		domainAnchors,
		bridgedCount: connected.length,
		isolatedCount: isolated.length
	};
}
function edgeTips(a, b) {
	const r1 = nodeRadius(a.degree);
	const r2 = nodeRadius(b.degree);
	const dx = b.x - a.x;
	const dy = b.y - a.y;
	const d = Math.hypot(dx, dy) || 1;
	const ux = dx / d;
	const uy = dy / d;
	return {
		x1: a.x + ux * (r1 + 1.5),
		y1: a.y + uy * (r1 + 1.5),
		x2: b.x - ux * (r2 + 9),
		y2: b.y - uy * (r2 + 9),
		mx: (a.x + b.x) / 2,
		my: (a.y + b.y) / 2,
		nx: -uy,
		ny: ux
	};
}
var FORCE_ALGOS = [
	"editorial",
	"fruchterman",
	"atlas",
	"spring"
];
var FORCE_COPY = {
	editorial: {
		label: "Editorial",
		title: "Editorial",
		year: "seed",
		meaning: "Hand-placed cluster and domain ring. A reading order, not a physical model."
	},
	fruchterman: {
		label: "F–R",
		title: "Fruchterman–Reingold",
		year: "1991",
		meaning: "Edge springs attract, every pair of nodes repels, and a falling temperature caps how far a node may move each step. Unlinked records have no springs, so they migrate to the periphery as the system cools."
	},
	atlas: {
		label: "Atlas2",
		title: "ForceAtlas2",
		year: "2014",
		meaning: "Gephi’s model: degree-weighted repulsion and lin-log attraction. Hubs claim space; chains stretch. Gravity stops the cloud from expanding without bound."
	},
	spring: {
		label: "Spring",
		title: "Spring–Coulomb",
		year: "1984",
		meaning: "Eades / d3-force: 1/r² electrostatic repulsion, Hooke springs on bridges, hard-sphere collision, and a weak centering force. Closest to a particle system."
	}
};
var DEFAULT_FORCE_PARAMS = {
	repulsion: 1,
	link: 1,
	gravity: 1
};
var MIN_D = .35;
function createSim(points, bridges, width = GRAPH_WIDTH, height = 760) {
	const nodes = points.map((p) => ({
		id: p.node.address,
		x: p.x,
		y: p.y,
		vx: 0,
		vy: 0,
		fx: null,
		fy: null,
		mass: 1 + p.degree,
		r: nodeRadius(p.degree),
		isolated: p.degree === 0
	}));
	const byId = new Map(nodes.map((n) => [n.id, n]));
	const links = [];
	for (const b of bridges) if (byId.has(b.source) && byId.has(b.target)) links.push({
		source: b.source,
		target: b.target
	});
	return {
		nodes,
		byId,
		links,
		alpha: 1,
		temp: 42,
		cx: width / 2,
		cy: height * .49,
		width,
		height
	};
}
function reheat(state, amount = 1) {
	state.alpha = Math.min(1, Math.max(state.alpha, amount));
	state.temp = Math.max(state.temp, 12 + 24 * amount);
}
function pinNode(state, id, x, y) {
	const n = state.byId.get(id);
	if (!n) return;
	n.fx = x;
	n.fy = y;
	n.x = x;
	n.y = y;
	n.vx = 0;
	n.vy = 0;
}
function unpinNode(state, id) {
	const n = state.byId.get(id);
	if (!n) return;
	n.fx = null;
	n.fy = null;
}
function applyPinAndBounds(state) {
	const m = 40;
	for (const n of state.nodes) {
		if (n.fx != null && n.fy != null) {
			n.x = n.fx;
			n.y = n.fy;
			n.vx = 0;
			n.vy = 0;
			continue;
		}
		n.x = Math.min(state.width - m, Math.max(m, n.x));
		n.y = Math.min(state.height - m, Math.max(m, n.y));
	}
}
function collide(state, strength) {
	const nodes = state.nodes;
	for (let i = 0; i < nodes.length; i++) {
		const a = nodes[i];
		for (let j = i + 1; j < nodes.length; j++) {
			const b = nodes[j];
			const dx = b.x - a.x;
			const dy = b.y - a.y;
			const d = Math.hypot(dx, dy) || MIN_D;
			const min = a.r + b.r + 10;
			if (d >= min) continue;
			const push = (min - d) / d * .5 * strength;
			const ux = dx * push;
			const uy = dy * push;
			if (a.fx == null) {
				a.x -= ux;
				a.y -= uy;
			}
			if (b.fx == null) {
				b.x += ux;
				b.y += uy;
			}
		}
	}
}
function kineticEnergy(state) {
	let e = 0;
	for (const n of state.nodes) e += .5 * n.mass * (n.vx * n.vx + n.vy * n.vy);
	return e;
}
/** Fruchterman & Reingold 1991 — displacement clamped by a cooling temperature. */
function stepFruchterman(state, params) {
	const n = Math.max(state.nodes.length, 1);
	const k = .42 * Math.sqrt(state.width * state.height / n) / Math.max(params.link, .2);
	const kr = k * k * params.repulsion;
	const kg = .004 * params.gravity;
	const disp = /* @__PURE__ */ new Map();
	for (const node of state.nodes) disp.set(node.id, {
		x: 0,
		y: 0
	});
	for (let i = 0; i < state.nodes.length; i++) {
		const a = state.nodes[i];
		for (let j = i + 1; j < state.nodes.length; j++) {
			const b = state.nodes[j];
			const dx = a.x - b.x;
			const dy = a.y - b.y;
			const d = Math.hypot(dx, dy) || MIN_D;
			const f = kr / d;
			const ux = dx / d * f;
			const uy = dy / d * f;
			const da = disp.get(a.id);
			const db = disp.get(b.id);
			da.x += ux;
			da.y += uy;
			db.x -= ux;
			db.y -= uy;
		}
	}
	for (const link of state.links) {
		const a = state.byId.get(link.source);
		const b = state.byId.get(link.target);
		if (!a || !b) continue;
		const dx = a.x - b.x;
		const dy = a.y - b.y;
		const d = Math.hypot(dx, dy) || MIN_D;
		const f = d * d / k;
		const ux = dx / d * f;
		const uy = dy / d * f;
		const da = disp.get(a.id);
		const db = disp.get(b.id);
		da.x -= ux;
		da.y -= uy;
		db.x += ux;
		db.y += uy;
	}
	for (const node of state.nodes) {
		const da = disp.get(node.id);
		da.x += (state.cx - node.x) * kg * (node.isolated ? .18 : 1) * node.mass;
		da.y += (state.cy - node.y) * kg * (node.isolated ? .18 : 1) * node.mass;
		const len = Math.hypot(da.x, da.y) || MIN_D;
		const limited = Math.min(len, state.temp);
		if (node.fx == null) {
			node.x += da.x / len * limited;
			node.y += da.y / len * limited;
			node.vx = da.x / len * limited;
			node.vy = da.y / len * limited;
		}
	}
	collide(state, .85);
	applyPinAndBounds(state);
	state.temp *= .978;
	state.alpha = Math.min(1, state.temp / 42);
	return kineticEnergy(state);
}
/** ForceAtlas2 (Jacomy et al., 2014) — lin-log attraction, degree-weighted repulsion. */
function stepAtlas(state, params) {
	const kr = 160 * params.repulsion;
	const ka = 2.1 * params.link;
	const kg = .01 * params.gravity;
	const damping = .82;
	const fx = /* @__PURE__ */ new Map();
	for (const node of state.nodes) fx.set(node.id, {
		x: 0,
		y: 0
	});
	for (let i = 0; i < state.nodes.length; i++) {
		const a = state.nodes[i];
		for (let j = i + 1; j < state.nodes.length; j++) {
			const b = state.nodes[j];
			const dx = a.x - b.x;
			const dy = a.y - b.y;
			const d = Math.hypot(dx, dy) || MIN_D;
			const f = kr * a.mass * b.mass / d;
			const ux = dx / d * f;
			const uy = dy / d * f;
			const fa = fx.get(a.id);
			const fb = fx.get(b.id);
			fa.x += ux;
			fa.y += uy;
			fb.x -= ux;
			fb.y -= uy;
		}
	}
	for (const link of state.links) {
		const a = state.byId.get(link.source);
		const b = state.byId.get(link.target);
		if (!a || !b) continue;
		const dx = b.x - a.x;
		const dy = b.y - a.y;
		const d = Math.hypot(dx, dy) || MIN_D;
		const f = ka * Math.log(1 + d);
		const ux = dx / d * f;
		const uy = dy / d * f;
		const fa = fx.get(a.id);
		const fb = fx.get(b.id);
		fa.x += ux;
		fa.y += uy;
		fb.x -= ux;
		fb.y -= uy;
	}
	for (const node of state.nodes) {
		const f = fx.get(node.id);
		f.x += (state.cx - node.x) * kg * (node.isolated ? .2 : 1) * node.mass;
		f.y += (state.cy - node.y) * kg * (node.isolated ? .2 : 1) * node.mass;
		if (node.fx != null) continue;
		node.vx = (node.vx + f.x / node.mass) * damping;
		node.vy = (node.vy + f.y / node.mass) * damping;
		node.x += node.vx;
		node.y += node.vy;
	}
	collide(state, 1);
	applyPinAndBounds(state);
	state.alpha *= .988;
	state.temp = 8 + 36 * state.alpha;
	return kineticEnergy(state);
}
/** Eades 1984 / d3-force — Coulomb charge, Hooke springs, collision, centering. */
function stepSpring(state, params) {
	const charge = -2200 * params.repulsion;
	const rest = 88 * params.link;
	const stiffness = .065;
	const kg = .008 * params.gravity;
	const alpha = state.alpha;
	const fx = /* @__PURE__ */ new Map();
	for (const node of state.nodes) fx.set(node.id, {
		x: 0,
		y: 0
	});
	for (let i = 0; i < state.nodes.length; i++) {
		const a = state.nodes[i];
		for (let j = i + 1; j < state.nodes.length; j++) {
			const b = state.nodes[j];
			const dx = b.x - a.x;
			const dy = b.y - a.y;
			const d2 = dx * dx + dy * dy || MIN_D;
			const d = Math.sqrt(d2);
			const f = charge * alpha / d2;
			const ux = dx / d * f;
			const uy = dy / d * f;
			const fa = fx.get(a.id);
			const fb = fx.get(b.id);
			fa.x += ux;
			fa.y += uy;
			fb.x -= ux;
			fb.y -= uy;
		}
	}
	for (const link of state.links) {
		const a = state.byId.get(link.source);
		const b = state.byId.get(link.target);
		if (!a || !b) continue;
		const dx = b.x - a.x;
		const dy = b.y - a.y;
		const d = Math.hypot(dx, dy) || MIN_D;
		const f = (d - rest) * stiffness * alpha;
		const ux = dx / d * f;
		const uy = dy / d * f;
		const fa = fx.get(a.id);
		const fb = fx.get(b.id);
		fa.x += ux;
		fa.y += uy;
		fb.x -= ux;
		fb.y -= uy;
	}
	for (const node of state.nodes) {
		const f = fx.get(node.id);
		f.x += (state.cx - node.x) * kg * (node.isolated ? .2 : 1) * alpha;
		f.y += (state.cy - node.y) * kg * (node.isolated ? .2 : 1) * alpha;
		if (node.fx != null) continue;
		node.vx = (node.vx + f.x) * .62;
		node.vy = (node.vy + f.y) * .62;
		node.x += node.vx;
		node.y += node.vy;
	}
	collide(state, 1.1);
	applyPinAndBounds(state);
	state.alpha += (0 - state.alpha) * .0228;
	state.temp = 6 + 40 * state.alpha;
	return kineticEnergy(state);
}
function stepForce(state, algo, params) {
	if (algo === "fruchterman") return stepFruchterman(state, params);
	if (algo === "atlas") return stepAtlas(state, params);
	if (algo === "spring") return stepSpring(state, params);
	return 0;
}
function settle(state, algo, params, steps = 420) {
	reheat(state, 1);
	for (let i = 0; i < steps; i++) stepForce(state, algo, params);
}
function livePoint(p, state, algo) {
	if (!state || algo === "editorial") return p;
	const n = state.byId.get(p.node.address);
	if (!n) return p;
	return {
		...p,
		x: n.x,
		y: n.y
	};
}
var IDENTITY = {
	x: 0,
	y: 0,
	k: 1
};
var EMPTY = /* @__PURE__ */ new Set();
function clamp(n, a, b) {
	return Math.max(a, Math.min(b, n));
}
function fitPoints(pts, pad = 64) {
	if (!pts.length) return IDENTITY;
	let minX = Infinity;
	let minY = Infinity;
	let maxX = -Infinity;
	let maxY = -Infinity;
	for (const p of pts) {
		minX = Math.min(minX, p.x);
		minY = Math.min(minY, p.y);
		maxX = Math.max(maxX, p.x);
		maxY = Math.max(maxY, p.y);
	}
	minX -= pad;
	minY -= pad;
	maxX += pad;
	maxY += pad;
	const bw = Math.max(maxX - minX, 80);
	const bh = Math.max(maxY - minY, 80);
	const k = clamp(Math.min(GRAPH_WIDTH / bw, 760 / bh), .45, 2.6);
	return {
		k,
		x: (GRAPH_WIDTH - (minX + maxX) * k) / 2,
		y: (760 - (minY + maxY) * k) / 2
	};
}
function clientToViewBox(svg, clientX, clientY) {
	const rect = svg.getBoundingClientRect();
	const s = Math.min(rect.width / GRAPH_WIDTH, rect.height / 760);
	const ox = (rect.width - GRAPH_WIDTH * s) / 2;
	const oy = (rect.height - 760 * s) / 2;
	return {
		s,
		vx: (clientX - rect.left - ox) / s,
		vy: (clientY - rect.top - oy) / s
	};
}
function zoomAt(view, vx, vy, factor) {
	const wx = (vx - view.x) / view.k;
	const wy = (vy - view.y) / view.k;
	const k = clamp(view.k * factor, .45, 3.4);
	return {
		k,
		x: vx - wx * k,
		y: vy - wy * k
	};
}
function Constellation({ className, focusSlug, onFocusSlug }) {
	const navigate = useNavigate();
	const CATALOG = useLive((s) => s.catalog);
	const layout = (0, import_react.useMemo)(() => layoutGraph(CATALOG.nodes, CATALOG.bridges), [CATALOG]);
	const [algo, setAlgo] = (0, import_react.useState)("fruchterman");
	const [paused, setPaused] = (0, import_react.useState)(false);
	const [params, setParams] = (0, import_react.useState)(DEFAULT_FORCE_PARAMS);
	const [frame, setFrame] = (0, import_react.useState)(0);
	const [view, setView] = (0, import_react.useState)(IDENTITY);
	const [hovered, setHovered] = (0, import_react.useState)(null);
	const [selected, setSelected] = (0, import_react.useState)(null);
	const [query, setQuery] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)("ALL");
	const [relation, setRelation] = (0, import_react.useState)("ALL");
	const [showIsolated, setShowIsolated] = (0, import_react.useState)(true);
	const [box, setBox] = (0, import_react.useState)({
		w: GRAPH_WIDTH,
		h: 760
	});
	const lastFittedSlug = (0, import_react.useRef)(void 0);
	const svgRef = (0, import_react.useRef)(null);
	const frameRef = (0, import_react.useRef)(null);
	const asideRef = (0, import_react.useRef)(null);
	const simRef = (0, import_react.useRef)(null);
	const paramsRef = (0, import_react.useRef)(params);
	const viewRef = (0, import_react.useRef)(view);
	const prevAlgo = (0, import_react.useRef)("editorial");
	const nodeDragRef = (0, import_react.useRef)(null);
	const dragRef = (0, import_react.useRef)({
		pointers: /* @__PURE__ */ new Map(),
		moved: false
	});
	paramsRef.current = params;
	viewRef.current = view;
	(0, import_react.useEffect)(() => {
		const el = frameRef.current;
		if (!el) return;
		const ro = new ResizeObserver(() => {
			setBox({
				w: el.clientWidth,
				h: el.clientHeight
			});
		});
		ro.observe(el);
		setBox({
			w: el.clientWidth,
			h: el.clientHeight
		});
		return () => ro.disconnect();
	}, []);
	(0, import_react.useEffect)(() => {
		const svg = svgRef.current;
		if (!svg) return;
		const onWheel = (e) => {
			e.preventDefault();
			const { vx, vy } = clientToViewBox(svg, e.clientX, e.clientY);
			const factor = Math.exp(-e.deltaY * .0016);
			setView((v) => zoomAt(v, vx, vy, factor));
		};
		svg.addEventListener("wheel", onWheel, { passive: false });
		return () => svg.removeEventListener("wheel", onWheel);
	}, []);
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			if (e.key !== "Escape") return;
			setSelected(null);
			setHovered(null);
			lastFittedSlug.current = void 0;
			onFocusSlug?.(null);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [onFocusSlug]);
	(0, import_react.useEffect)(() => {
		if (!simRef.current) simRef.current = createSim(layout.points, CATALOG.bridges);
		if (algo !== "editorial" && prevAlgo.current === "editorial") {
			simRef.current = createSim(layout.points, CATALOG.bridges);
			reheat(simRef.current, 1);
			setView(IDENTITY);
		} else if (algo !== "editorial" && prevAlgo.current !== algo) reheat(simRef.current, 1);
		else if (algo === "editorial") setView(fitPoints(layout.points.filter((p) => p.degree > 0), 92));
		prevAlgo.current = algo;
	}, [algo, layout.points]);
	(0, import_react.useEffect)(() => {
		if (algo === "editorial") return;
		const delay = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 40 : 1200;
		const t = window.setTimeout(() => {
			const sim = simRef.current;
			if (!sim) return;
			setView(fitPoints(sim.nodes, 64));
		}, delay);
		return () => window.clearTimeout(t);
	}, [algo]);
	(0, import_react.useEffect)(() => {
		if (algo === "editorial" || paused) return;
		if (!simRef.current) simRef.current = createSim(layout.points, CATALOG.bridges);
		if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			settle(simRef.current, algo, paramsRef.current);
			setFrame((f) => f + 1);
			return;
		}
		let raf = 0;
		let live = true;
		const loop = () => {
			if (!live || !simRef.current) return;
			stepForce(simRef.current, algo, paramsRef.current);
			setFrame((f) => f + 1);
			raf = requestAnimationFrame(loop);
		};
		raf = requestAnimationFrame(loop);
		return () => {
			live = false;
			cancelAnimationFrame(raf);
		};
	}, [
		algo,
		paused,
		layout.points
	]);
	const q = query.trim().toLowerCase();
	const visible = (0, import_react.useMemo)(() => {
		return layout.points.filter((p) => {
			if (!showIsolated && p.degree === 0) return false;
			if (status !== "ALL" && p.node.status !== status) return false;
			if (q) {
				if (!`${p.node.title} ${p.node.address} ${p.node.domain} ${p.node.tags.join(" ")}`.toLowerCase().includes(q)) return false;
			}
			if (relation !== "ALL") {
				if (!CATALOG.bridges.some((b) => b.relation === relation && (b.source === p.node.address || b.target === p.node.address)) && p.degree > 0) return false;
				if (p.degree === 0) return false;
			}
			return true;
		});
	}, [
		layout.points,
		showIsolated,
		status,
		q,
		relation
	]);
	const visibleSet = (0, import_react.useMemo)(() => new Set(visible.map((p) => p.node.address)), [visible]);
	const liveByAddress = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		for (const p of layout.points) map.set(p.node.address, livePoint(p, simRef.current, algo));
		return map;
	}, [
		layout.points,
		algo,
		frame
	]);
	const visibleLive = (0, import_react.useMemo)(() => visible.map((p) => liveByAddress.get(p.node.address) ?? p), [visible, liveByAddress]);
	(0, import_react.useEffect)(() => {
		if (!focusSlug) return;
		const node = CATALOG.nodes.find((n) => n.slug === focusSlug);
		if (!node) return;
		setSelected(node.address);
		if (lastFittedSlug.current === focusSlug) return;
		lastFittedSlug.current = focusSlug;
		const nb = neighborAddresses(node.address);
		const pts = layout.points.filter((p) => p.node.address === node.address || nb.has(p.node.address));
		const self = layout.byAddress.get(node.address);
		setView(fitPoints(pts.length ? pts : self ? [self] : layout.points, 90));
	}, [focusSlug, layout]);
	function selectAddress(address) {
		setSelected(address);
		const slug = address ? getNodeByAddress(address)?.slug ?? null : null;
		lastFittedSlug.current = slug ?? void 0;
		onFocusSlug?.(slug);
		if (address && box.w < 560) requestAnimationFrame(() => {
			const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
			asideRef.current?.scrollIntoView({
				block: "nearest",
				behavior: reduced ? "auto" : "smooth"
			});
		});
	}
	const focus = hovered ?? selected;
	const neighborhood = (0, import_react.useMemo)(() => focus ? neighborAddresses(focus) : EMPTY, [focus]);
	const inspectAddr = selected ?? hovered;
	const inspect = inspectAddr ? layout.byAddress.get(inspectAddr)?.node : void 0;
	const inspectBridges = inspect ? incidentBridges(inspect.address) : [];
	function litNode(addr) {
		if (!focus) return true;
		return addr === focus || neighborhood.has(addr);
	}
	function worldToPixel(x, y) {
		const s = Math.min(box.w / GRAPH_WIDTH, box.h / 760);
		const ox = (box.w - GRAPH_WIDTH * s) / 2;
		const oy = (box.h - 760 * s) / 2;
		return {
			left: ox + (view.x + x * view.k) * s,
			top: oy + (view.y + y * view.k) * s
		};
	}
	function worldFromClient(clientX, clientY) {
		const svg = svgRef.current;
		if (!svg) return null;
		const { vx, vy } = clientToViewBox(svg, clientX, clientY);
		const v = viewRef.current;
		return {
			x: (vx - v.x) / v.k,
			y: (vy - v.y) / v.k
		};
	}
	function onNodePointerDown(address, ev) {
		ev.stopPropagation();
		ev.currentTarget.setPointerCapture(ev.pointerId);
		nodeDragRef.current = {
			id: address,
			moved: false
		};
		if (algo !== "editorial" && simRef.current) {
			const w = worldFromClient(ev.clientX, ev.clientY);
			if (w) pinNode(simRef.current, address, w.x, w.y);
		}
	}
	function onNodePointerMove(address, ev) {
		const drag = nodeDragRef.current;
		if (!drag || drag.id !== address) return;
		const w = worldFromClient(ev.clientX, ev.clientY);
		if (!w || !simRef.current || algo === "editorial") return;
		pinNode(simRef.current, address, w.x, w.y);
		reheat(simRef.current, .55);
		drag.moved = true;
		setFrame((f) => f + 1);
	}
	function onNodePointerUp(address, ev) {
		ev.stopPropagation();
		const drag = nodeDragRef.current;
		if (simRef.current) unpinNode(simRef.current, address);
		const moved = Boolean(drag?.moved);
		nodeDragRef.current = null;
		if (!moved) selectAddress(address);
	}
	function onPointerDown(e) {
		const svg = svgRef.current;
		if (!svg) return;
		svg.setPointerCapture(e.pointerId);
		dragRef.current.pointers.set(e.pointerId, {
			x: e.clientX,
			y: e.clientY
		});
		dragRef.current.last = {
			x: e.clientX,
			y: e.clientY
		};
		dragRef.current.moved = false;
		if (dragRef.current.pointers.size === 2) {
			const pts = [...dragRef.current.pointers.values()];
			dragRef.current.pinch = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
		}
	}
	function onPointerMove(e) {
		const svg = svgRef.current;
		if (!svg) return;
		const store = dragRef.current;
		if (!store.pointers.has(e.pointerId)) return;
		store.pointers.set(e.pointerId, {
			x: e.clientX,
			y: e.clientY
		});
		if (store.pointers.size === 2) {
			const pts = [...store.pointers.values()];
			const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
			const prev = store.pinch ?? dist;
			store.pinch = dist;
			const { vx, vy } = clientToViewBox(svg, (pts[0].x + pts[1].x) / 2, (pts[0].y + pts[1].y) / 2);
			const factor = dist / (prev || dist);
			setView((v) => zoomAt(v, vx, vy, factor));
			store.moved = true;
			return;
		}
		const last = store.last;
		if (!last) return;
		const dx = e.clientX - last.x;
		const dy = e.clientY - last.y;
		if (Math.hypot(dx, dy) > 3) store.moved = true;
		store.last = {
			x: e.clientX,
			y: e.clientY
		};
		const { s } = clientToViewBox(svg, e.clientX, e.clientY);
		setView((v) => ({
			...v,
			x: v.x + dx / s,
			y: v.y + dy / s
		}));
	}
	function onPointerUp(e) {
		const svg = svgRef.current;
		if (svg) try {
			svg.releasePointerCapture(e.pointerId);
		} catch {}
		dragRef.current.pointers.delete(e.pointerId);
		dragRef.current.pinch = void 0;
		if (dragRef.current.pointers.size === 0) dragRef.current.last = void 0;
	}
	function openRecord(node) {
		navigate({
			to: "/n/$slug",
			params: { slug: node.slug }
		});
	}
	const wide = box.w >= 560;
	const labelTargets = [];
	if (inspectAddr) {
		const p = liveByAddress.get(inspectAddr);
		if (p) labelTargets.push(p);
		for (const n of neighborhood) {
			const qn = liveByAddress.get(n);
			if (qn && qn.node.address !== inspectAddr) labelTargets.push(qn);
		}
	}
	const isolatesOnScreen = visibleLive.some((p) => {
		if (p.degree > 0) return false;
		const x = view.x + p.x * view.k;
		const y = view.y + p.y * view.k;
		return x > 24 && x < 976 && y > 24 && y < 736;
	});
	const showDomainLabels = wide && showIsolated && !inspectAddr && isolatesOnScreen && algo === "editorial";
	const energy = simRef.current && algo !== "editorial" ? kineticEnergy(simRef.current) : 0;
	const cooling = simRef.current && algo !== "editorial" ? simRef.current.alpha : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("grid min-w-0 gap-5", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-w-0 flex-col gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative max-w-md",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-subtle" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: query,
						onChange: (e) => setQuery(e.target.value),
						placeholder: "Filter nodes by title, tag, address…",
						className: "pl-10",
						"aria-label": "Filter graph nodes"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "chip-row",
					children: FORCE_ALGOS.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => {
							setAlgo(a);
							if (a !== "editorial") setPaused(false);
						},
						className: cn("h-11 shrink-0 whitespace-nowrap rounded-md px-3 font-mono text-xs uppercase tracking-wide transition-colors duration-150", algo === a ? "bg-accent text-accent-fg" : "bg-surface text-muted hover:text-fg"),
						title: FORCE_COPY[a].meaning,
						children: [FORCE_COPY[a].label, a !== "editorial" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-1.5 opacity-60",
							children: FORCE_COPY[a].year
						}) : null]
					}, a))
				}),
				algo !== "editorial" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-3 gap-3",
					children: [
						["repulsion", "Repulsion"],
						["link", "Link"],
						["gravity", "Gravity"]
					].map(([key, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid min-w-0 gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center justify-between font-mono text-xs uppercase tracking-widest text-subtle",
							children: [label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tabular-nums text-muted",
								children: params[key].toFixed(1)
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-11 items-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "range",
								min: .4,
								max: 2,
								step: .05,
								value: params[key],
								onChange: (e) => {
									const value = Number(e.target.value);
									setParams((p) => ({
										...p,
										[key]: value
									}));
									if (simRef.current) reheat(simRef.current, .45);
								},
								className: "force-range",
								"aria-label": label
							})
						})]
					}, key))
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "chip-row",
					children: [
						["ALL", ...STATUSES].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setStatus(s),
							className: cn("h-11 shrink-0 whitespace-nowrap rounded-md px-3 font-mono text-xs uppercase tracking-wide transition-colors duration-150", status === s ? "bg-accent text-accent-fg" : "bg-surface text-muted hover:text-fg"),
							children: s
						}, s)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mx-1 h-6 w-px shrink-0 self-center bg-border" }),
						RELATIONS.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setRelation(relation === r ? "ALL" : r),
							className: cn("flex h-11 shrink-0 items-center gap-2 whitespace-nowrap rounded-md px-3 font-mono text-xs uppercase tracking-wide transition-colors duration-150", relation === r ? "bg-surface-2 text-fg" : "bg-surface text-muted hover:text-fg"),
							title: RELATION_COPY[r].meaning,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "size-2 rounded-full",
								style: { background: RELATION_COLOR[r] },
								"aria-hidden": true
							}), RELATION_COPY[r].label]
						}, r)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								setShowIsolated((v) => {
									const next = !v;
									if (!next) setView(fitPoints(visibleLive.filter((p) => p.degree > 0), 88));
									return next;
								});
							},
							className: cn("h-11 shrink-0 whitespace-nowrap rounded-md px-3 text-xs transition-colors duration-150", showIsolated ? "bg-surface text-muted hover:text-fg" : "bg-surface-2 text-fg"),
							children: showIsolated ? "Hide unlinked" : "Show unlinked"
						})
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid min-w-0 gap-6 lg:grid-cols-[minmax(0,1fr)_280px]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				ref: frameRef,
				className: "relative h-96 min-w-0 overflow-hidden rounded-2xl bg-surface shadow-[var(--shadow-border)] md:h-auto",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
						ref: svgRef,
						viewBox: `0 0 ${GRAPH_WIDTH} 760`,
						className: "size-full max-w-full touch-none cursor-grab active:cursor-grabbing md:h-auto md:w-full",
						role: "img",
						"aria-label": "Interactive graph of UPI nodes and typed bridges",
						onPointerDown,
						onPointerMove,
						onPointerUp,
						onPointerCancel: onPointerUp,
						onClick: () => {
							if (!dragRef.current.moved) selectAddress(null);
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: RELATIONS.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("marker", {
								id: `upi-arrow-${r}`,
								markerWidth: "8",
								markerHeight: "8",
								refX: "6.5",
								refY: "3",
								orient: "auto",
								markerUnits: "userSpaceOnUse",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									d: "M0,0 L7,3 L0,6 Z",
									fill: RELATION_COLOR[r]
								})
							}, r)) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
								width: GRAPH_WIDTH,
								height: 760,
								fill: "var(--color-surface)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
								transform: `translate(${view.x} ${view.y}) scale(${view.k})`,
								children: [
									algo === "editorial" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
										cx: layout.cx,
										cy: layout.cy,
										rx: GRAPH_WIDTH * .42,
										ry: 304,
										fill: "none",
										stroke: "var(--color-border)"
									}) : null,
									showDomainLabels ? layout.domainAnchors.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
										x: d.x,
										y: d.y,
										textAnchor: "middle",
										className: "pointer-events-none fill-subtle font-mono uppercase",
										style: {
											fontSize: 11,
											letterSpacing: "0.14em"
										},
										children: domainLabel(d.domain)
									}, d.domain)) : null,
									CATALOG.bridges.map((b) => {
										const a = liveByAddress.get(b.source);
										const c = liveByAddress.get(b.target);
										if (!a || !c) return null;
										if (!visibleSet.has(a.node.address) || !visibleSet.has(c.node.address)) return null;
										const rel = isRelation(b.relation) ? b.relation : "DERIVED_FROM";
										if (relation !== "ALL" && rel !== relation) return null;
										const onPath = !focus || focus === b.source || focus === b.target;
										const tips = edgeTips(a, c);
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
											className: "graph-fade",
											opacity: onPath ? 1 : .16,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
												x1: tips.x1,
												y1: tips.y1,
												x2: tips.x2,
												y2: tips.y2,
												stroke: RELATION_COLOR[rel],
												strokeWidth: onPath ? 1.7 : 1,
												strokeDasharray: RELATION_COPY[rel].dash === "0" ? void 0 : RELATION_COPY[rel].dash,
												markerEnd: `url(#upi-arrow-${rel})`
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
												x1: tips.x1,
												y1: tips.y1,
												x2: tips.x2,
												y2: tips.y2,
												stroke: "transparent",
												strokeWidth: 14,
												className: "cursor-pointer",
												onMouseEnter: () => setHovered(b.source),
												onMouseLeave: () => setHovered(null),
												onClick: (ev) => {
													ev.stopPropagation();
													selectAddress(b.source);
												}
											})]
										}, b.slug);
									}),
									visibleLive.map((p) => {
										const lit = litNode(p.node.address);
										const isSel = selected === p.node.address;
										const isHov = hovered === p.node.address;
										const r = nodeRadius(p.degree) + (isSel || isHov ? 1.8 : 0);
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
											className: "graph-fade",
											opacity: lit ? 1 : .22,
											children: [
												isSel ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
													cx: p.x,
													cy: p.y,
													r: r + 6,
													fill: "none",
													stroke: "var(--color-accent)",
													strokeWidth: 1.2
												}) : null,
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
													cx: p.x,
													cy: p.y,
													r: Math.max(r + 16, 22),
													fill: "transparent",
													className: algo === "editorial" ? "cursor-pointer" : "cursor-grab active:cursor-grabbing",
													role: "button",
													"aria-label": p.node.title,
													tabIndex: 0,
													onPointerDown: (ev) => onNodePointerDown(p.node.address, ev),
													onPointerMove: (ev) => onNodePointerMove(p.node.address, ev),
													onPointerUp: (ev) => onNodePointerUp(p.node.address, ev),
													onPointerCancel: (ev) => onNodePointerUp(p.node.address, ev),
													onClick: (ev) => ev.stopPropagation(),
													onMouseEnter: () => setHovered(p.node.address),
													onMouseLeave: () => setHovered(null),
													onDoubleClick: (ev) => {
														ev.stopPropagation();
														openRecord(p.node);
													},
													onKeyDown: (ev) => {
														if (ev.key === "Enter" || ev.key === " ") {
															ev.preventDefault();
															ev.stopPropagation();
															selectAddress(p.node.address);
														}
													},
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("title", { children: p.node.title })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
													cx: p.x,
													cy: p.y,
													r,
													fill: STATUS_COLOR[p.node.status],
													stroke: "var(--color-surface)",
													strokeWidth: 1.4,
													className: "pointer-events-none"
												})
											]
										}, p.node.slug);
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "pointer-events-none absolute inset-0 overflow-hidden",
						children: labelTargets.map((p) => {
							if (!visibleSet.has(p.node.address)) return null;
							const { left, top } = worldToPixel(p.x, p.y);
							const lines = wrapTitle(p.node.title, 17);
							const active = p.node.address === inspectAddr;
							const s = Math.min(box.w / GRAPH_WIDTH, box.h / 760);
							const screenR = nodeRadius(p.degree) * view.k * s;
							const dx = p.x - layout.cx;
							const dy = p.y - layout.cy;
							const len = Math.hypot(dx, dy) || 1;
							const ux = len < 50 ? 1 : dx / len;
							const uy = len < 50 ? 0 : dy / len;
							const dist = screenR + 12;
							const lx = left + ux * dist;
							const ly = top + uy * dist;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute max-w-40",
								style: {
									left: lx,
									top: ly,
									transform: `translate(${ux < -.4 ? "-100%" : ux > .4 ? "0%" : "-50%"}, ${uy < -.35 ? "-100%" : uy > .45 ? "0%" : "-50%"})`
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("inline-block rounded-sm px-1.5 py-0.5 text-xs leading-tight", active ? "bg-bg/90 text-fg" : "bg-bg/80 text-muted"),
									children: lines.map((ln) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block",
										children: ln
									}, ln))
								})
							}, `lbl-${p.node.slug}`);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute bottom-3 left-3 flex gap-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								size: "icon",
								variant: "secondary",
								"aria-label": "Zoom in",
								onClick: () => setView((v) => zoomAt(v, GRAPH_WIDTH / 2, 380, 1.22)),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoomIn, {})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								size: "icon",
								variant: "secondary",
								"aria-label": "Zoom out",
								onClick: () => setView((v) => zoomAt(v, GRAPH_WIDTH / 2, 380, .82)),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoomOut, {})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								size: "icon",
								variant: "secondary",
								"aria-label": "Fit all nodes",
								onClick: () => setView(fitPoints(visibleLive.length ? visibleLive : layout.points, 48)),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Maximize2, {})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								size: "icon",
								variant: "secondary",
								"aria-label": "Focus bridged cluster",
								onClick: () => {
									setShowIsolated(false);
									setRelation("ALL");
									const pts = visibleLive.filter((p) => p.degree > 0);
									setView(fitPoints(pts.length ? pts : layout.points.filter((p) => p.degree > 0), 80));
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocateFixed, {})
							}),
							algo !== "editorial" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								size: "icon",
								variant: "secondary",
								"aria-label": paused ? "Resume layout" : "Pause layout",
								onClick: () => setPaused((v) => !v),
								children: paused ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, {})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								size: "icon",
								variant: "secondary",
								"aria-label": "Reheat layout",
								onClick: () => {
									if (simRef.current) reheat(simRef.current, 1);
									setPaused(false);
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {})
							})] }) : null
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "pointer-events-none absolute right-3 top-3 text-right font-mono text-xs uppercase tracking-widest text-subtle",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "block",
							children: [
								visible.length,
								"/",
								layout.points.length,
								" nodes"
							]
						}), algo !== "editorial" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "mt-1 block tabular-nums",
							children: [
								paused ? "paused" : cooling > .05 ? "cooling" : "settled",
								" · E ",
								energy.toFixed(1)
							]
						}) : null]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
				ref: asideRef,
				className: "rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]",
				children: inspect ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: inspect.status }), selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-xs uppercase tracking-widest text-subtle",
								children: "Pinned"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-xs uppercase tracking-widest text-subtle",
								children: "Hover"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-2xl leading-snug",
							children: inspect.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: inspect.description
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-xs text-subtle",
							children: domainLabel(inspect.domain)
						}),
						inspectBridges.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "grid gap-2",
							children: inspectBridges.map((b) => {
								const other = b.source === inspect.address ? b.target : b.source;
								const otherNode = getNodeByAddress(other);
								const outbound = b.source === inspect.address;
								const rel = isRelation(b.relation) ? b.relation : "DERIVED_FROM";
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "flex w-full items-start justify-between gap-3 rounded-lg bg-surface-2 p-3 text-left text-sm transition-colors duration-150 hover:bg-bg",
									onClick: () => otherNode && selectAddress(otherNode.address),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-2 font-mono text-xs text-subtle",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "size-1.5 rounded-full",
												style: { background: RELATION_COLOR[rel] }
											}),
											outbound ? "out" : "in",
											" · ",
											RELATION_COPY[rel].label
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mt-1 block text-fg",
										children: otherNode ? shortTitle(otherNode.title, 42) : other
									})] })
								}) }, b.slug);
							})
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: "No typed bridges in this snapshot — an unlinked record, not a missing law."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							className: "mt-1",
							onClick: () => openRecord(inspect),
							children: "Open record"
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3 text-sm text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-2xl text-fg",
							children: FORCE_COPY[algo].title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-xs uppercase tracking-widest text-subtle",
							children: FORCE_COPY[algo].year
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: FORCE_COPY[algo].meaning }),
						algo === "editorial" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							layout.bridgedCount,
							" bridged records, ",
							layout.isolatedCount,
							" unlinked. Hover to inspect, click to pin, double-click to open."
						] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Drag a node to pin it against the field; release to let it go. Pause, reheat, or switch models to compare how the same bridges settle." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "grid gap-1.5 font-mono text-xs uppercase tracking-wide",
							children: RELATIONS.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center gap-2 text-subtle",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "inline-block h-px w-6",
									style: { background: RELATION_COLOR[r] }
								}), RELATION_COPY[r].label]
							}, r))
						})
					]
				})
			})]
		})]
	});
}
function HeroOrbit() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative mx-auto aspect-square w-full max-w-md overflow-hidden",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-3 rounded-full border border-border" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "orbit-spin absolute inset-8 rounded-full border border-border-strong",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute left-1/2 top-0 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-est" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "orbit-spin-rev absolute inset-14 rounded-full border border-der/40",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute left-0 top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-der" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-20 rounded-full border border-hyp/35",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute right-6 top-3 size-1.5 rounded-full bg-hyp" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-24 grid place-items-center rounded-full bg-fg text-bg",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-display text-4xl italic leading-none",
					children: "Φ"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute left-6 top-10 font-mono text-xs uppercase tracking-widest text-subtle",
				children: "provenance"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute bottom-12 right-5 font-mono text-xs uppercase tracking-widest text-subtle",
				children: "status"
			})
		]
	});
}
//#endregion
export { HeroOrbit as n, Constellation as t };
