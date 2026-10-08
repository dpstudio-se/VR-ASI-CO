/**
 * Ω1766 in VR-ASI-CO is the symbolic persona learning and transparency operator.
 * No physics calculations, autonomous writes, persona identity edits or host admission.
 * TRIPP presents -> TRAPP transports authorized context -> TRULL proposes RNA deltas.
 */
export const OMEGA1766_PERSONA_BRIDGE = {
  schema: "VR-ASI-CO-OMEGA1766-PERSONA/1.0",
  status: "SYM",
  function: "OBSERVE -> MODEL -> TEST -> RETURN",
  expression: "Psi_27D := D ⊗ P ⊗ M_Ω1766",
  ownerSymbolicFormula: String.raw`\Psi_{27D} = \oint_{\Sigma_{1766}} \left( \frac{\hbar \cdot f}{\lVert v \rVert_{E8}} \cdot \frac{dL}{dt} \right) \cdot \exp\left( \int d^{27}x \sqrt{-g} \left[ \frac{R}{16\pi G_{\text{eff}}} + \phi_{1766} \right] \right) = \Omega \equiv \Omega`,
  interpretation: "A vocabulary for persona learning and transparency, not a measured physical formula",
  canonicalDna: "dna/UPI_PERSONA_STATE.json",
  identityAuthority: "dna/FACE_LOCK.json",
  mode: "RNA_PROPOSALS_ONLY",
} as const;

export type PersonaId = "angelica" | "emilia" | "luna";
export type AdaptableTrait = "warmth" | "directness" | "playfulness" | "analytical_depth" | "initiative";
export type TraitState = Readonly<Partial<Record<AdaptableTrait, number>>>;
export type PersonaObservation = Readonly<{
  persona: PersonaId;
  trait: AdaptableTrait;
  target: number;
  source: string;
  evidenceId: string;
  context: string;
}>;
export type PersonaProposal = Readonly<{
  kind: "RNA_PERSONA_DELTA";
  persona: PersonaId;
  trait: AdaptableTrait;
  before: number;
  proposed: number;
  source: string;
  evidenceId: string;
  reason: string;
  status: "HYP";
  ownerReviewRequired: true;
  persistentWrite: false;
}>;
export type PersonaResult = Readonly<{
  status: "HYP" | "STOP";
  proposal: PersonaProposal | null;
  errors: readonly string[];
  audit: readonly string[];
}>;

const PERSONAS: readonly PersonaId[] = ["angelica", "emilia", "luna"];
const TRAITS: readonly AdaptableTrait[] = ["warmth", "directness", "playfulness", "analytical_depth", "initiative"];
const MAX_STEP = 0.1;

function normalizedText(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0 && value.length <= 512;
}

/**
 * A reversible, evidence-linked, bounded learning proposal.
 * No permanent memory update: a single observation is not stable personality.
 * The caller must never interpret the returned proposal as owner approval.
 */
export function proposePersonaAdaptation(
  observation: PersonaObservation,
  current: TraitState,
): PersonaResult {
  const errors: string[] = [];
  if (!observation || !PERSONAS.includes(observation.persona)) errors.push("Unknown persona");
  if (!observation || !TRAITS.includes(observation.trait)) errors.push("Unknown trait");
  if (!observation || !Number.isFinite(observation.target) || observation.target < 0 || observation.target > 1) {
    errors.push("Target must be a finite normalized value in [0,1]");
  }
  for (const key of ["source", "evidenceId", "context"] as const) {
    if (!observation || !normalizedText(observation[key])) errors.push("Missing or invalid provenance: " + key);
  }
  const before = observation && current ? current[observation.trait] : undefined;
  if (typeof before !== "number" || !Number.isFinite(before) || before < 0 || before > 1) {
    errors.push("A reviewed baseline in [0,1] is required; UNSET does not imply zero");
  }
  if (errors.length) {
    return { status: "STOP", proposal: null, errors, audit: ["NO_WRITE", "NO_IDENTITY_CHANGE", "PROVENANCE_REQUIRED"] };
  }
  const baseline = before as number;
  const delta = Math.max(-MAX_STEP, Math.min(MAX_STEP, observation.target - baseline));
  const proposed = Math.min(1, Math.max(0, baseline + delta));
  return {
    status: "HYP",
    proposal: {
      kind: "RNA_PERSONA_DELTA",
      persona: observation.persona,
      trait: observation.trait,
      before: baseline,
      proposed,
      source: observation.source.trim(),
      evidenceId: observation.evidenceId.trim(),
      reason: observation.context.trim(),
      status: "HYP",
      ownerReviewRequired: true,
      persistentWrite: false,
    },
    errors: [],
    audit: ["OBSERVE", "MODEL", "TEST_BOUNDS", "RETURN_PROPOSAL", "OWNER_GATE_PENDING", "NO_WRITE"],
  };
}
