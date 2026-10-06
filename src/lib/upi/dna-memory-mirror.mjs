import { createHash } from "node:crypto";
// Nine bases + nine reverse-complement bases + one SHA-256 record.
// A software analogy, not Enigma encryption, biological repair or indestructible memory.
const pairs = Object.freeze({ A: "T", T: "A", G: "C", C: "G" });
/** @param {string} bases */
export function reverseComplement(bases) {
  if (!/^[ATGC]+$/.test(bases)) throw new Error("Expected A/T/G/C bases");
  return [...bases].reverse().map((base) => pairs[/** @type {keyof typeof pairs} */ (base)]).join("");
}
/** @param {string} bases */
const digest = (bases) => createHash("sha256").update(bases, "ascii").digest("hex");
/** @param {string} bases */
export function encodeMirror(bases) {
  if (!/^[ATGC]{9}$/.test(bases)) throw new Error("9+9+1 requires exactly nine bases");
  return { schema: "VR-ASI-CO-BASE-MIRROR/1", forward: bases, reverse: reverseComplement(bases),
    pivotSha256: digest(bases), positions: 19, payloadBits: 18 };
}
/** @param {{schema:string,forward:string,reverse:string,pivotSha256:string}} record */
export function recoverMirror(record) {
  if (record?.schema !== "VR-ASI-CO-BASE-MIRROR/1" || !/^[ATGC?]{9}$/.test(record.forward) ||
      !/^[ATGC?]{9}$/.test(record.reverse) || !/^[a-f0-9]{64}$/.test(record.pivotSha256)) {
    return { status: "STOP", reason: "INVALID_MIRROR_RECORD" };
  }
  const forward = [...record.forward];
  const reverse = [...record.reverse];
  let repaired = 0;
  for (let i = 0; i < 9; i += 1) {
    const j = 8 - i;
    if (forward[i] === "?" && reverse[j] === "?") return { status: "STOP", reason: "BOTH_COPIES_MISSING" };
    if (forward[i] === "?") { forward[i] = pairs[/** @type {keyof typeof pairs} */ (reverse[j])]; repaired += 1; }
    if (reverse[j] === "?") { reverse[j] = pairs[/** @type {keyof typeof pairs} */ (forward[i])]; repaired += 1; }
    if (pairs[/** @type {keyof typeof pairs} */ (forward[i])] !== reverse[j]) {
      return { status: "STOP", reason: "MIRROR_CONFLICT" };
    }
  }
  if (digest(forward.join("")) !== record.pivotSha256) return { status: "STOP", reason: "CHECKSUM_MISMATCH" };
  return { status: "DER", forward: forward.join(""), reverse: reverse.join(""), repaired,
    authenticated: false, durableWritePerformed: false };
}
