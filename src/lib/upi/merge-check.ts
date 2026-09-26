import { isStatus, parseAddress } from "./hydrate";

const NODE_KEYS = new Set([
  "address",
  "title",
  "description",
  "status",
  "quantities",
  "definitions",
  "equations",
  "assumptions",
  "mechanism",
  "evidence",
  "primary_sources",
  "predictions",
  "falsification_conditions",
  "information_layer",
  "verification_type",
  "claims_experimental_verification",
  "confusion_guard",
  "stop_reason",
  "tags",
  "version",
  "source_status",
  "replaces",
  "superseded_by",
  "reference_frame",
  "normalization_method",
  "normalization_claim",
  "null_model",
  "control_condition",
  "statistical_method",
  "confounders",
  "replication_rule",
  "causal_claim",
  "causal_test_method",
]);

const BRIDGE_KEYS = new Set([
  "source",
  "target",
  "relation",
  "equations",
  "assumptions",
  "mechanism",
  "evidence",
  "status",
  "confusion_guard",
  "stop_reason",
  "version",
]);

const RELATIONS = new Set([
  "DERIVED_FROM",
  "CAUSES",
  "DUAL_TO",
  "EQUIVALENT_WITHIN",
  "COARSE_GRAINS_TO",
  "COMPACTIFIES_TO",
  "EMERGES_AS",
  "FORM_SIMILAR",
  "TOPOLOGY_SHARED",
  "MECHANISM_SHARED",
  "CANDIDATE_BRIDGE",
  "CONTRADICTS",
  "STOPS_AT",
  "REPRESENTS",
  "MEASURED_BY",
  "FALSIFIED_BY",
]);

export type MergeIssue = {
  level: "fail" | "warn";
  code: string;
  message: string;
};

export type FileCheck = {
  path: string;
  kind: "node" | "bridge" | "other" | "invalid";
  status: string | null;
  issues: MergeIssue[];
};

export type MergeCheck = {
  ok: boolean;
  files: FileCheck[];
  fails: number;
  warns: number;
};

function issue(level: MergeIssue["level"], code: string, message: string): MergeIssue {
  return { level, code, message };
}

export function checkRecordFile(path: string, raw: string): FileCheck {
  if (!path.startsWith("data/") || !path.endsWith(".json")) {
    return {
      path,
      kind: "other",
      status: null,
      issues: [issue("warn", "UPI-W001", "Not a data/*.json record. Merge-check skips it.")],
    };
  }
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return {
      path,
      kind: "invalid",
      status: null,
      issues: [issue("fail", "UPI-E001", "File is not valid JSON.")],
    };
  }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    return {
      path,
      kind: "invalid",
      status: null,
      issues: [issue("fail", "UPI-E002", "Record must be a JSON object.")],
    };
  }
  const rec = parsed as Record<string, unknown>;
  if (typeof rec.address === "string") return checkNode(path, rec);
  if (typeof rec.source === "string" && typeof rec.target === "string") return checkBridge(path, rec);
  return {
    path,
    kind: "other",
    status: typeof rec.status === "string" ? rec.status : null,
    issues: [issue("warn", "UPI-W002", "Neither a node (address) nor a bridge (source/target).")],
  };
}

function checkNode(path: string, rec: Record<string, unknown>): FileCheck {
  const issues: MergeIssue[] = [];
  if (typeof rec.title !== "string" || !rec.title.trim()) {
    issues.push(issue("fail", "UPI-E003", "Node needs a title."));
  }
  if (typeof rec.description !== "string" || !rec.description.trim()) {
    issues.push(issue("fail", "UPI-E004", "Node needs a description."));
  }
  if (!isStatus(rec.status)) {
    issues.push(issue("fail", "UPI-E005", "Status must be EST, DER, HYP, STOP, ERR, or SYM."));
  }
  if (!parseAddress(String(rec.address ?? ""))) {
    issues.push(issue("fail", "UPI-E006", "Address must match UPI<Domain,Generation,Torus,Node>."));
  }
  if (rec.status === "STOP" && (typeof rec.stop_reason !== "string" || !rec.stop_reason.trim())) {
    issues.push(issue("fail", "UPI-E007", "STOP records require stop_reason."));
  }
  if (rec.status === "EST") {
    const evidence = rec.evidence;
    const has = Array.isArray(evidence) && evidence.length > 0;
    if (!has) issues.push(issue("warn", "UPI-W003", "EST without evidence. Promotion needs provenance."));
  }
  for (const key of Object.keys(rec)) {
    if (!NODE_KEYS.has(key)) {
      issues.push(issue("fail", "UPI-E008", `Unknown field "${key}". Schema is closed.`));
    }
  }
  return { path, kind: "node", status: isStatus(rec.status) ? rec.status : null, issues };
}

function checkBridge(path: string, rec: Record<string, unknown>): FileCheck {
  const issues: MergeIssue[] = [];
  if (!parseAddress(String(rec.source ?? ""))) {
    issues.push(issue("fail", "UPI-E006", "Bridge source is not a UPI address."));
  }
  if (!parseAddress(String(rec.target ?? ""))) {
    issues.push(issue("fail", "UPI-E006", "Bridge target is not a UPI address."));
  }
  if (typeof rec.relation !== "string" || !RELATIONS.has(rec.relation)) {
    issues.push(issue("fail", "UPI-E009", "Relation is missing or not a typed UPI relation."));
  }
  if (!isStatus(rec.status)) {
    issues.push(issue("fail", "UPI-E005", "Status must be EST, DER, HYP, STOP, ERR, or SYM."));
  }
  if (rec.status === "STOP" && (typeof rec.stop_reason !== "string" || !rec.stop_reason.trim())) {
    issues.push(issue("fail", "UPI-E007", "STOP bridges require stop_reason."));
  }
  for (const key of Object.keys(rec)) {
    if (!BRIDGE_KEYS.has(key)) {
      issues.push(issue("fail", "UPI-E008", `Unknown field "${key}". Schema is closed.`));
    }
  }
  return { path, kind: "bridge", status: isStatus(rec.status) ? rec.status : null, issues };
}

export function mergeCheck(files: { path: string; raw: string }[]): MergeCheck {
  const results = files.map((f) => checkRecordFile(f.path, f.raw));
  const fails = results.reduce((n, f) => n + f.issues.filter((i) => i.level === "fail").length, 0);
  const warns = results.reduce((n, f) => n + f.issues.filter((i) => i.level === "warn").length, 0);
  return { ok: fails === 0, files: results, fails, warns };
}

export const PR_STAGES = [
  {
    id: "propose",
    label: "Propose",
    meaning: "RNA writes a typed JSON record. Status is a claim, not a merge.",
  },
  {
    id: "branch",
    label: "Branch",
    meaning: "A named line of history off main. DNA is untouched.",
  },
  {
    id: "pr",
    label: "Pull request",
    meaning: "A request to copy the branch into main. Still not the index.",
  },
  {
    id: "checks",
    label: "Checks",
    meaning: "CI, schema, STOP reason. Software tests prove software.",
  },
  {
    id: "review",
    label: "Review",
    meaning: "A human reads the science. Merge-check is not a vibe.",
  },
  {
    id: "merge",
    label: "Merge",
    meaning: "Squash into main. That is when DNA changes.",
  },
  {
    id: "dna",
    label: "DNA",
    meaning: "Transcribe main. The graph follows the ledger, not the chat.",
  },
] as const;

export type PrStageId = (typeof PR_STAGES)[number]["id"];
