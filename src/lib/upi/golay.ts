/** Extended binary Golay code G24 = [24, 12, 8]. Software test, not a quantum device. */

const GEN_POLY = 0xae3; // 1 + x + x^5 + x^6 + x^7 + x^9 + x^11

function polyMul(info: number, g: number) {
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

function parityBit(n: number) {
  let p = 0;
  let x = n >>> 0;
  while (x) {
    p ^= x & 1;
    x >>>= 1;
  }
  return p;
}

export function popcnt(n: number) {
  n = n - ((n >>> 1) & 0x55555555);
  n = (n & 0x33333333) + ((n >>> 2) & 0x33333333);
  return (((n + (n >>> 4)) & 0x0f0f0f0f) * 0x01010101) >>> 24;
}

export function encodeGolay(info: number) {
  const c23 = polyMul(info & 0xfff, GEN_POLY) & 0x7fffff;
  return c23 | (parityBit(c23) << 23);
}

const CODEWORDS = new Uint32Array(4096);
for (let m = 0; m < 4096; m++) CODEWORDS[m] = encodeGolay(m);

export function randomCodeword() {
  return CODEWORDS[(Math.random() * 4096) | 0]!;
}

export function decodeGolay(received: number) {
  const r = received >>> 0;
  let best = 0;
  let bestD = 25;
  for (let i = 0; i < CODEWORDS.length; i++) {
    const c = CODEWORDS[i]!;
    const d = popcnt(c ^ r);
    if (d < bestD) {
      bestD = d;
      best = c;
      if (d === 0) break;
    }
  }
  const diff = best ^ r;
  const errors: number[] = [];
  for (let i = 0; i < 24; i++) if (diff & (1 << i)) errors.push(i);
  return { codeword: best, errors, distance: bestD };
}

export function bitsOf(word: number) {
  const bits: number[] = [];
  for (let i = 0; i < 24; i++) bits.push((word >>> i) & 1);
  return bits;
}

export function flipBit(word: number, i: number) {
  return word ^ (1 << i);
}

export function injectRandomErrors(word: number, count: number) {
  const idx = [...Array(24).keys()];
  for (let i = idx.length - 1; i > 0; i--) {
    const j = (Math.random() * (i + 1)) | 0;
    const tmp = idx[i]!;
    idx[i] = idx[j]!;
    idx[j] = tmp;
  }
  let out = word;
  for (let k = 0; k < count; k++) out ^= 1 << idx[k]!;
  return out;
}

export const GOLAY = {
  n: 24,
  k: 12,
  d: 8,
  t: 3,
  octads: 759,
} as const;
