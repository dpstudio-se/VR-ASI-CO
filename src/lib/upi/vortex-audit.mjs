/**
 * VORTEX v9 operational, pure TRULL checks.
 * All scores are explicit input-based software classifications, never physical
 * measurements, psychological diagnoses, owner permissions or runtime admission.
 */
export const EXO_GATES = Object.freeze([
  "energy", "momentum", "units", "scale", "source_chain",
  "counterexamples", "null_model", "replication",
]);
export const SCALE_CHAMBERS = Object.freeze([
  "core", "motor", "carrier", "selection", "memory",
]);
const fail = (reason) => ({ status: "STOP", reason });
const record = (v) => v !== null && typeof v === "object" && !Array.isArray(v);
const finiteNonnegative = (v) => typeof v === "number" && Number.isFinite(v) && v >= 0;

/** r0 is an evidential ratio, not belief, authority or proof. */
export function evaluateR0(raw) {
  if (!record(raw) ||
      Object.keys(raw).some(k => !["verifiedSignal", "noise", "compression", "manipulation", "uncertainty", "source"].includes(k)) ||
      !["verifiedSignal", "noise", "compression", "manipulation", "uncertainty"].every(k => finiteNonnegative(raw[k])) ||
      typeof raw.source !== "string" || !raw.source.trim() || raw.source.length > 512) {
    return fail("INVALID_R0_INPUT_OR_PROVENANCE");
  }
  const total = raw.verifiedSignal + raw.noise + raw.compression + raw.manipulation + raw.uncertainty;
  if (!Number.isFinite(total) || total <= 0) return fail("R0_ZERO_OR_OVERFLOW_DENOMINATOR");
  const score = raw.verifiedSignal / total;
  // Project thresholds are explicitly conventional, not empirical certainties.
  const band = score >= 0.8 ? "green" : score >= 0.4 ? "yellow" : "red";
  return { status: "DER", score, band, source: raw.source, authority: false, empiricalVerification: false };
}

/** EXO-F: absent gates are unknown; PASS means checked within the declared scope. */
export function evaluateExoF(input) {
  if (!record(input) || typeof input.claim !== "string" || !input.claim.trim() ||
      input.claim.length > 2048 || !record(input.gates) ||
      Object.keys(input.gates).some(k => !EXO_GATES.includes(k))) {
    return fail("INVALID_EXOF_INPUT");
  }
  const checks = {};
  for (const gate of EXO_GATES) {
    const entry = input.gates[gate];
    if (entry === undefined) { checks[gate] = { result: "unknown" }; continue; }
    if (!record(entry) || !["pass", "partial", "fail", "unknown"].includes(entry.result) ||
        typeof entry.evidence !== "string" || !entry.evidence.trim() || entry.evidence.length > 1024) {
      return fail("INVALID_EXOF_GATE_" + gate);
    }
    checks[gate] = { result: entry.result, evidence: entry.evidence };
  }
  const statuses = Object.values(checks).map(x => x.result);
  const verdict = statuses.includes("fail") ? "fail"
    : statuses.includes("unknown") ? "unknown"
    : statuses.includes("partial") ? "partial" : "pass";
  return { status: "DER", verdict, checks, claim: input.claim, scope: "SOFTWARE_REVIEW_ONLY", empiricalVerification: false };
}

/** SCALE LOCK, five explicit chamber scores, never fills absent scores with guessed values. */
export function evaluateScaleLock(input) {
  if (!record(input) || Object.keys(input).some(k => !SCALE_CHAMBERS.includes(k))) return fail("INVALID_SCALE_LOCK");
  const incomplete = SCALE_CHAMBERS.filter(k => !Object.hasOwn(input, k));
  if (incomplete.length) return { status: "STOP", reason: "MISSING_SCALE_CHAMBERS", missing: incomplete };
  if (!SCALE_CHAMBERS.every(k => Number.isInteger(input[k]) && input[k] >= 0 && input[k] <= 2)) {
    return fail("INVALID_SCALE_CHAMBER_SCORE");
  }
  return { status: "DER", total: SCALE_CHAMBERS.reduce((sum,k) => sum + input[k], 0),
    maximum: 10, chambers: { ...input }, physicalEquivalence: false };
}

/** Soft-EOS controls response depth, not model weights or tokenizer. */
export function routeSoftEos(input) {
  const fields = ["novelty", "uncertainty", "evidenceConflict", "conceptualDrift", "bubbleRisk", "criticality"];
  if (!record(input) || Object.keys(input).some(k => !fields.includes(k)) ||
      !fields.every(k => typeof input[k] === "boolean")) return fail("INVALID_SOFT_EOS_INPUT");
  const fullReasons = fields.filter(k => input[k]);
  return { status: "DER", mode: fullReasons.length ? "FULL_REFRESH" : "COMPACT", reasons: fullReasons,
    tokenizerChanged: false, weightsChanged: false };
}

/** In-memory, visible, bounded noise ledger. No hidden store or Git writes. */
export function createOpenNoiseLedger(capacity = 128) {
  if (!Number.isInteger(capacity) || capacity < 1 || capacity > 1024) throw new RangeError("Invalid ledger capacity");
  const allowed = ["uncertain_claim", "failed_test", "source_conflict", "compression_artifact",
    "revision_reason", "rejected_interpretation", "restoration_estimate"];
  const entries = new Map();
  let sealed = false;
  return Object.freeze({
    append(entry) {
      if (sealed) return fail("LEDGER_STOPPED");
      if (!record(entry) || Object.keys(entry).some(k => !["id","kind","detail","source"].includes(k)) ||
          !/^[a-zA-Z0-9_-]{1,80}$/.test(entry.id ?? "") || !allowed.includes(entry.kind) ||
          typeof entry.detail !== "string" || !entry.detail.trim() || entry.detail.length > 2048 ||
          typeof entry.source !== "string" || !entry.source.trim() || entry.source.length > 512) {
        return fail("INVALID_LEDGER_RECORD");
      }
      if (entries.has(entry.id)) {
        return JSON.stringify(entries.get(entry.id)) === JSON.stringify(entry)
          ? { status: "DER", duplicate: true } : fail("LEDGER_ID_CONFLICT");
      }
      if (entries.size >= capacity) return fail("LEDGER_CAPACITY_REACHED");
      entries.set(entry.id, structuredClone(entry));
      return { status: "DER", duplicate: false };
    },
    read() { return { status: "DER", entries: structuredClone([...entries.values()]), persisted: false }; },
    stop() { sealed = true; },
  });
}
