import catalogJson from "./catalog.json";
import { getLiveCatalog } from "./live";
import type { Catalog, Status, UpiBridge, UpiNode } from "./types";

export type { Catalog, Status, UpiBridge, UpiNode, UpiSource, Quantity, Evidence } from "./types";
export type { Relation } from "./graph";
export {
  RELATIONS,
  RELATION_COPY,
  RELATION_COLOR,
  STATUS_COLOR,
  layoutGraph,
  neighborAddresses,
  incidentBridges,
  isRelation,
  nodeRadius,
  shortTitle,
  wrapTitle,
} from "./graph";
export { DNA } from "./hydrate";
export { useLive, getLiveCatalog, SNAPSHOT } from "./live";

/** Bundled snapshot. Prefer getLiveCatalog() after DNA transcription. */
export const CATALOG = catalogJson as Catalog;

export const STATUSES: Status[] = ["EST", "DER", "HYP", "STOP", "ERR", "SYM"];

export const STATUS_COPY: Record<
  Status,
  { label: string; meaning: string }
> = {
  EST: {
    label: "Established",
    meaning: "Accepted within the stated domain and supported by provenance.",
  },
  DER: {
    label: "Derived",
    meaning: "Follows from explicit assumptions — not automatically a new law.",
  },
  HYP: {
    label: "Hypothesis",
    meaning: "Falsifiable, unverified claim with test metadata.",
  },
  STOP: {
    label: "Stopped",
    meaning: "Unresolved boundary. Named evidence is still missing.",
  },
  ERR: {
    label: "Error",
    meaning: "Invalid, inconsistent, rejected, or superseded.",
  },
  SYM: {
    label: "Symbolic",
    meaning: "Conceptual mapping only — never hidden physical proof.",
  },
};

export const DOMAIN_LABELS: Record<string, string> = {
  established: "Established",
  constants: "Constants",
  theories: "Theories",
  quantum_information: "Quantum information",
  quantum_algorithms: "Quantum algorithms",
  information_physics: "Information physics",
  computational_physics: "Computational",
  coding_theory: "Coding theory",
  quantum_field: "Quantum field",
  mechanics: "Mechanics",
  biology: "Biology",
  geophysics: "Geophysics",
  relativity: "Relativity",
  gravity: "Gravity",
  "open-problems": "Open problems",
  examples: "Examples",
  bridges: "Bridges",
  sources: "Sources",
};

export function domainLabel(domain: string) {
  return DOMAIN_LABELS[domain] ?? domain.replace(/[_-]/g, " ");
}

export function domainsOf(catalog: Catalog = getLiveCatalog()) {
  return [...new Set(catalog.nodes.map((n) => n.domain))].sort();
}

export const DOMAINS = domainsOf(CATALOG);

export function getNode(slug: string, catalog: Catalog = getLiveCatalog()): UpiNode | undefined {
  return catalog.nodes.find((n) => n.slug === slug);
}

export function getNodeByAddress(
  address: string,
  catalog: Catalog = getLiveCatalog(),
): UpiNode | undefined {
  return catalog.nodes.find((n) => n.address === address);
}

export function nodeHref(node: Pick<UpiNode, "slug">) {
  return `/n/${node.slug}`;
}

export function bridgesFor(address: string, catalog: Catalog = getLiveCatalog()): UpiBridge[] {
  return catalog.bridges.filter((b) => b.source === address || b.target === address);
}

export function searchNodes(
  query: string,
  status: Status | "ALL",
  domain: string,
  catalog: Catalog = getLiveCatalog(),
) {
  const q = query.trim().toLowerCase();
  return catalog.nodes.filter((n) => {
    if (status !== "ALL" && n.status !== status) return false;
    if (domain !== "all" && n.domain !== domain) return false;
    if (!q) return true;
    const hay = [
      n.title,
      n.description,
      n.address,
      n.domain,
      n.mechanism,
      ...n.tags,
      ...n.equations,
      ...n.definitions,
    ]
      .join(" ")
      .toLowerCase();
    return hay.includes(q);
  });
}

export function statusCounts(catalog: Catalog = getLiveCatalog()) {
  return STATUSES.reduce(
    (acc, status) => {
      acc[status] = catalog.nodes.filter((n) => n.status === status).length;
      return acc;
    },
    {} as Record<Status, number>,
  );
}

export const STATUS_COUNTS = statusCounts(CATALOG);

export const FEATURED_SLUGS = [
  "upi-physics-1-fundamental-planck-constant",
  "upi-electromagnetism-1-field-maxwell-equations",
  "upi-quantum-mechanics-1-dynamics-schrodinger-equation",
  "upi-relativity-1-spacetime-lorentz-interval",
  "upi-thermodynamics-1-energy-entropy-first-second-laws",
  "upi-theories-1-holography-ads-cft",
  "upi-information-physics-1-inertia-information-mass",
  "upi-information-physics-1-measure-universal-information-measure",
];

export function featuredNodes(catalog: Catalog = getLiveCatalog()): UpiNode[] {
  return FEATURED_SLUGS.map((slug) => getNode(slug, catalog)).filter((n): n is UpiNode => Boolean(n));
}


export { TF1766_AXIS, CURRENT_RULES, runTf1766Shield, isCurrentLaw, isPreparatoryWork } from "./tf1766-shield";
export type { LegalLayer, ShieldStatus, TfAxisNode, CurrentRule, NormTransform, ShieldInput, ShieldResult } from "./tf1766-shield";
