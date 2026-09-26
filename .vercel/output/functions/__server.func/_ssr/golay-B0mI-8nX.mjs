//#region node_modules/.nitro/vite/services/ssr/assets/golay-B0mI-8nX.js
/** Extended binary Golay code G24 = [24, 12, 8]. Software test, not a quantum device. */
var GEN_POLY = 2787;
function polyMul(info, g) {
	let a = info;
	let factor = g;
	let out = 0;
	while (a) {
		if (a & 1) out ^= factor;
		a >>>= 1;
		factor <<= 1;
	}
	return out;
}
function parityBit(n) {
	let p = 0;
	let x = n >>> 0;
	while (x) {
		p ^= x & 1;
		x >>>= 1;
	}
	return p;
}
function popcnt(n) {
	n = n - (n >>> 1 & 1431655765);
	n = (n & 858993459) + (n >>> 2 & 858993459);
	return (n + (n >>> 4) & 252645135) * 16843009 >>> 24;
}
function encodeGolay(info) {
	const c23 = polyMul(info & 4095, GEN_POLY) & 8388607;
	return c23 | parityBit(c23) << 23;
}
var CODEWORDS = /* @__PURE__ */ new Uint32Array(4096);
for (let m = 0; m < 4096; m++) CODEWORDS[m] = encodeGolay(m);
function randomCodeword() {
	return CODEWORDS[Math.random() * 4096 | 0];
}
function decodeGolay(received) {
	const r = received >>> 0;
	let best = 0;
	let bestD = 25;
	for (let i = 0; i < CODEWORDS.length; i++) {
		const c = CODEWORDS[i];
		const d = popcnt(c ^ r);
		if (d < bestD) {
			bestD = d;
			best = c;
			if (d === 0) break;
		}
	}
	const diff = best ^ r;
	const errors = [];
	for (let i = 0; i < 24; i++) if (diff & 1 << i) errors.push(i);
	return {
		codeword: best,
		errors,
		distance: bestD
	};
}
function bitsOf(word) {
	const bits = [];
	for (let i = 0; i < 24; i++) bits.push(word >>> i & 1);
	return bits;
}
function flipBit(word, i) {
	return word ^ 1 << i;
}
function injectRandomErrors(word, count) {
	const idx = [...Array(24).keys()];
	for (let i = idx.length - 1; i > 0; i--) {
		const j = Math.random() * (i + 1) | 0;
		const tmp = idx[i];
		idx[i] = idx[j];
		idx[j] = tmp;
	}
	let out = word;
	for (let k = 0; k < count; k++) out ^= 1 << idx[k];
	return out;
}
var GOLAY = {
	n: 24,
	k: 12,
	d: 8,
	t: 3,
	octads: 759
};
//#endregion
export { flipBit as a, randomCodeword as c, encodeGolay as i, bitsOf as n, injectRandomErrors as o, decodeGolay as r, popcnt as s, GOLAY as t };
