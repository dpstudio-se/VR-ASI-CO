export type Status = "EST" | "DER" | "HYP" | "STOP" | "ERR" | "SYM";

export type Quantity = {
  name: string;
  value: number;
  unit: string;
  uncertainty?: number;
  reference?: string;
};

export type Evidence = {
  type: string;
  source: string;
  date?: string;
  confidence?: number;
  notes?: string;
};

export type AddressParts = {
  domain_code: string;
  generation: string;
  torus: string;
  node_id: string;
};

export type UpiNode = {
  kind: "node";
  slug: string;
  file: string;
  domain: string;
  address: string;
  title: string;
  description: string;
  status: Status;
  quantities: Quantity[];
  definitions: string[];
  equations: string[];
  assumptions: string[];
  mechanism: string;
  evidence: Evidence[];
  primary_sources: string[];
  predictions: string[];
  falsification_conditions: string[];
  confusion_guard: string;
  stop_reason: string;
  tags: string[];
  verification_type: string;
  claims_experimental_verification: boolean;
  information_layer: string;
  version: string;
  scope: string;
  scope_limits: string;
  key_concepts: string[];
  related_theories: string[];
  address_parts: AddressParts;
};

export type UpiBridge = {
  kind: "bridge";
  slug: string;
  file: string;
  domain: string;
  source: string;
  target: string;
  relation: string;
  status: Status;
  equations: string[];
  assumptions: string[];
  mechanism: string;
  confusion_guard: string;
  stop_reason: string;
  version: string;
};

export type UpiSource = {
  kind: "source";
  slug: string;
  file: string;
  domain: string;
  source_id: string;
  title: string;
  canonical_url: string;
  status: Status | string;
  evidence_boundary: string;
  confusion_guard: string;
  classification_rules: string[];
  declared_license: string;
  source_type: string;
  retrieved_at: string;
};

export type Catalog = {
  version: string;
  sourceRepo: string;
  nodes: UpiNode[];
  bridges: UpiBridge[];
  sources: UpiSource[];
};
