import { i as __toESM } from "../_runtime.mjs";
import { t as DNA } from "./hydrate-fmjOcMXR.mjs";
import { i as require_jsx_runtime, n as Slot } from "../_libs/@radix-ui/react-primitive+[...].mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as create } from "../_libs/zustand.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { _ as createRootRoute, b as useRouter, d as useRouterState, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as createServerFn, r as getServerFnById, t as TSS_SERVER_FUNCTION } from "./ssr.mjs";
import { a as string, i as object, n as literal, o as union, r as number, t as _enum } from "../_libs/zod.mjs";
import { a as TriangleAlert, d as Menu, m as Github, r as X } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/status-badge-D_0SUhP-.js
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var catalog_default = {
	version: "0.1.0-alpha",
	sourceRepo: "https://github.com/dpstudio-se/Universal-Physics-Index-UPI",
	nodes: [
		{
			"kind": "node",
			"slug": "upi-base-0-reference-n-8hz",
			"file": "examples/eight_hz.json",
			"domain": "examples",
			"address": "UPI<BASE,0,REFERENCE,N_8HZ>",
			"title": "8 Hz reference coordinate",
			"description": "A configurable numerical normalization example, not a universal physical constant.",
			"status": "DER",
			"quantities": [{
				"name": "reference_frequency",
				"value": 8,
				"unit": "Hz",
				"reference": "Configurable UPI example"
			}],
			"definitions": ["Z = z / z_ref", "z_ref = 8 Hz in this example"],
			"equations": [],
			"assumptions": ["The frequency is used only as a declared normalization coordinate"],
			"mechanism": "",
			"evidence": [],
			"primary_sources": [],
			"predictions": [],
			"falsification_conditions": [],
			"confusion_guard": "Does not establish 8 Hz as a universal constant, physical mechanism, medical frequency or rest-mass frequency.",
			"stop_reason": "",
			"tags": [],
			"verification_type": "mathematical_check",
			"claims_experimental_verification": false,
			"information_layer": "",
			"version": "0.1.0",
			"scope": "",
			"scope_limits": "",
			"key_concepts": [],
			"related_theories": [],
			"address_parts": {
				"domain_code": "BASE",
				"generation": "0",
				"torus": "REFERENCE",
				"node_id": "N_8HZ"
			}
		},
		{
			"kind": "node",
			"slug": "upi-classical-mechanics-1-energy-work-energy-theorem",
			"file": "established/classical_work_energy.json",
			"domain": "established",
			"address": "UPI<CLASSICAL_MECHANICS,1,ENERGY,WORK_ENERGY_THEOREM>",
			"title": "Work-energy theorem",
			"description": "The net work done on a particle equals its change in translational kinetic energy.",
			"status": "EST",
			"quantities": [],
			"definitions": ["W_net is net work", "K is translational kinetic energy"],
			"equations": [
				"W_net = integral F_net . d r",
				"K = (1/2) m v^2",
				"W_net = Delta K"
			],
			"assumptions": ["Classical nonrelativistic point-particle description", "Mass is constant in the stated kinetic-energy expression"],
			"mechanism": "",
			"evidence": [{
				"type": "experiment",
				"source": "Mechanical work and calorimetric equivalence measurements",
				"confidence": 1
			}],
			"primary_sources": ["Standard analytical mechanics derivations", "BIPM SI Brochure, joule definition"],
			"predictions": [],
			"falsification_conditions": ["A reproducible classical trajectory violates the integral force-work and kinetic-energy relation"],
			"confusion_guard": "This theorem concerns net work and translational kinetic energy; total energy accounting may include internal, field, and rest energy.",
			"stop_reason": "",
			"tags": [
				"work",
				"kinetic energy",
				"mechanics"
			],
			"verification_type": "mathematical_check",
			"claims_experimental_verification": true,
			"information_layer": "ACADEMIC",
			"version": "",
			"scope": "",
			"scope_limits": "",
			"key_concepts": [],
			"related_theories": [],
			"address_parts": {
				"domain_code": "CLASSICAL_MECHANICS",
				"generation": "1",
				"torus": "ENERGY",
				"node_id": "WORK_ENERGY_THEOREM"
			}
		},
		{
			"kind": "node",
			"slug": "upi-classical-mechanics-1-force-motion-newton-second-law",
			"file": "established/classical_newton_second_law.json",
			"domain": "established",
			"address": "UPI<CLASSICAL_MECHANICS,1,FORCE_MOTION,NEWTON_SECOND_LAW>",
			"title": "Newton's second law",
			"description": "The net external force equals the time rate of change of momentum; for constant mass this reduces to F_net = m a.",
			"status": "EST",
			"quantities": [],
			"definitions": [
				"p is linear momentum",
				"F_net is net external force",
				"m is invariant nonrelativistic mass",
				"a is acceleration"
			],
			"equations": [
				"F_net = d p / d t",
				"p = m v",
				"F_net = m a (constant m)"
			],
			"assumptions": [
				"Classical nonrelativistic regime",
				"Inertial reference frame",
				"Constant-mass reduction only where applicable"
			],
			"mechanism": "",
			"evidence": [{
				"type": "experiment",
				"source": "Repeated laboratory and engineering tests of classical dynamics",
				"confidence": 1
			}],
			"primary_sources": ["Newton, Philosophiae Naturalis Principia Mathematica (1687)", "BIPM SI Brochure, force and derived units"],
			"predictions": [],
			"falsification_conditions": ["A reproducible isolated classical system violates momentum-rate balance beyond quantified uncertainty"],
			"confusion_guard": "F = ma is the constant-mass special case, not the most general statement.",
			"stop_reason": "",
			"tags": [
				"classical mechanics",
				"force",
				"momentum"
			],
			"verification_type": "experimental_observation",
			"claims_experimental_verification": true,
			"information_layer": "ACADEMIC",
			"version": "",
			"scope": "",
			"scope_limits": "",
			"key_concepts": [],
			"related_theories": [],
			"address_parts": {
				"domain_code": "CLASSICAL_MECHANICS",
				"generation": "1",
				"torus": "FORCE_MOTION",
				"node_id": "NEWTON_SECOND_LAW"
			}
		},
		{
			"kind": "node",
			"slug": "upi-classical-mechanics-1-symmetry-linear-momentum-conservation",
			"file": "established/classical_conservation_momentum.json",
			"domain": "established",
			"address": "UPI<CLASSICAL_MECHANICS,1,SYMMETRY,LINEAR_MOMENTUM_CONSERVATION>",
			"title": "Conservation of linear momentum",
			"description": "The total linear momentum of an isolated system is constant.",
			"status": "EST",
			"quantities": [],
			"definitions": ["P is total system momentum", "F_ext is the net external force"],
			"equations": [
				"P = sum_i p_i",
				"d P / d t = F_ext",
				"F_ext = 0 implies P = constant"
			],
			"assumptions": ["System boundary is specified", "External impulse is zero or accounted for"],
			"mechanism": "",
			"evidence": [{
				"type": "experiment",
				"source": "Collision, recoil, and particle-interaction measurements",
				"confidence": 1
			}],
			"primary_sources": ["Noether, Invariante Variationsprobleme (1918)", "Standard mechanics and field-theory treatments"],
			"predictions": [],
			"falsification_conditions": ["A closed system exhibits reproducible uncompensated momentum change"],
			"confusion_guard": "Momentum of a subsystem may change through exchange with its environment.",
			"stop_reason": "",
			"tags": [
				"momentum",
				"conservation",
				"translation symmetry"
			],
			"verification_type": "experimental_observation",
			"claims_experimental_verification": true,
			"information_layer": "ACADEMIC",
			"version": "",
			"scope": "",
			"scope_limits": "",
			"key_concepts": [],
			"related_theories": [],
			"address_parts": {
				"domain_code": "CLASSICAL_MECHANICS",
				"generation": "1",
				"torus": "SYMMETRY",
				"node_id": "LINEAR_MOMENTUM_CONSERVATION"
			}
		},
		{
			"kind": "node",
			"slug": "upi-electromagnetism-1-field-maxwell-equations",
			"file": "established/electromagnetism_maxwell.json",
			"domain": "established",
			"address": "UPI<ELECTROMAGNETISM,1,FIELD,MAXWELL_EQUATIONS>",
			"title": "Maxwell equations in SI form",
			"description": "The classical electromagnetic field equations relating electric and magnetic fields to charge and current.",
			"status": "EST",
			"quantities": [],
			"definitions": [
				"E is electric field",
				"B is magnetic flux density",
				"rho is charge density",
				"J is current density"
			],
			"equations": [
				"div E = rho / epsilon_0",
				"div B = 0",
				"curl E = - partial B / partial t",
				"curl B = mu_0 J + mu_0 epsilon_0 partial E / partial t"
			],
			"assumptions": [
				"Classical field regime",
				"SI units",
				"Macroscopic constitutive relations are separate from the vacuum equations"
			],
			"mechanism": "",
			"evidence": [{
				"type": "experiment",
				"source": "Electrostatic, induction, radiation, antenna, and optical measurements",
				"confidence": 1
			}],
			"primary_sources": ["Maxwell, A Dynamical Theory of the Electromagnetic Field (1865)", "BIPM SI Brochure"],
			"predictions": ["Electromagnetic waves propagate in vacuum at c = 1 / sqrt(mu_0 epsilon_0) within classical theory"],
			"falsification_conditions": ["A reproducible classical electromagnetic configuration violates the equations beyond known quantum, material, or measurement corrections"],
			"confusion_guard": "Maxwell theory is classical and does not replace quantum electrodynamics at quantum scales.",
			"stop_reason": "",
			"tags": [
				"electromagnetism",
				"fields",
				"light"
			],
			"verification_type": "experimental_observation",
			"claims_experimental_verification": true,
			"information_layer": "ACADEMIC",
			"version": "",
			"scope": "",
			"scope_limits": "",
			"key_concepts": [],
			"related_theories": [],
			"address_parts": {
				"domain_code": "ELECTROMAGNETISM",
				"generation": "1",
				"torus": "FIELD",
				"node_id": "MAXWELL_EQUATIONS"
			}
		},
		{
			"kind": "node",
			"slug": "upi-hypothesis-1-t-reference-n-8hz",
			"file": "examples/hypothesis_8hz.json",
			"domain": "examples",
			"address": "UPI<HYPOTHESIS,1,T_REFERENCE,N_8HZ>",
			"title": "Eight-hertz organizing-frequency hypothesis",
			"description": "Early test proposal; 8 Hz is not asserted to be a universal constant.",
			"status": "HYP",
			"quantities": [{
				"name": "reference_frequency",
				"value": 8,
				"unit": "Hz",
				"reference": "numerical normalization frequency"
			}],
			"definitions": [],
			"equations": [],
			"assumptions": [],
			"mechanism": "",
			"evidence": [],
			"primary_sources": ["Research proposal; no experimental evidence claimed"],
			"predictions": ["A preregistered outcome differs from all controls by the stated threshold."],
			"falsification_conditions": ["No replicated, corrected effect relative to the null and control frequencies."],
			"confusion_guard": "Numerical matching does not prove physical equivalence and is not a medical claim.",
			"stop_reason": "",
			"tags": [],
			"verification_type": "",
			"claims_experimental_verification": false,
			"information_layer": "",
			"version": "",
			"scope": "",
			"scope_limits": "",
			"key_concepts": [],
			"related_theories": [],
			"address_parts": {
				"domain_code": "HYPOTHESIS",
				"generation": "1",
				"torus": "T_REFERENCE",
				"node_id": "N_8HZ"
			}
		},
		{
			"kind": "node",
			"slug": "upi-quantum-mechanics-1-dynamics-schrodinger-equation",
			"file": "established/quantum_schrodinger.json",
			"domain": "established",
			"address": "UPI<QUANTUM_MECHANICS,1,DYNAMICS,SCHRODINGER_EQUATION>",
			"title": "Time-dependent Schroedinger equation",
			"description": "The nonrelativistic quantum state evolves unitarily under its Hamiltonian according to the Schroedinger equation.",
			"status": "EST",
			"quantities": [],
			"definitions": [
				"psi is the quantum state or wavefunction",
				"H is the Hamiltonian operator",
				"hbar is the reduced Planck constant"
			],
			"equations": ["i hbar partial psi / partial t = H psi", "H = -(hbar^2 / 2m) nabla^2 + V for one spinless particle in a scalar potential"],
			"assumptions": [
				"Nonrelativistic quantum mechanics",
				"Closed-system unitary evolution between measurements",
				"Hamiltonian domain and boundary conditions are specified"
			],
			"mechanism": "",
			"evidence": [{
				"type": "experiment",
				"source": "Atomic spectra, diffraction, tunnelling, interferometry, and quantum-device measurements",
				"confidence": 1
			}],
			"primary_sources": ["Schroedinger, Quantisierung als Eigenwertproblem (1926)", "Standard nonrelativistic quantum mechanics"],
			"predictions": [],
			"falsification_conditions": ["A controlled nonrelativistic quantum system reproducibly departs from Hamiltonian evolution outside quantified open-system effects"],
			"confusion_guard": "The equation predicts measurement statistics but does not by itself select a unique interpretation of quantum mechanics.",
			"stop_reason": "",
			"tags": [
				"quantum mechanics",
				"wavefunction",
				"Hamiltonian"
			],
			"verification_type": "experimental_observation",
			"claims_experimental_verification": true,
			"information_layer": "ACADEMIC",
			"version": "",
			"scope": "",
			"scope_limits": "",
			"key_concepts": [],
			"related_theories": [],
			"address_parts": {
				"domain_code": "QUANTUM_MECHANICS",
				"generation": "1",
				"torus": "DYNAMICS",
				"node_id": "SCHRODINGER_EQUATION"
			}
		},
		{
			"kind": "node",
			"slug": "upi-quantum-mechanics-1-quanta-planck-einstein-relation",
			"file": "established/quantum_planck_relation.json",
			"domain": "established",
			"address": "UPI<QUANTUM_MECHANICS,1,QUANTA,PLANCK_EINSTEIN_RELATION>",
			"title": "Planck-Einstein energy-frequency relation",
			"description": "A photon of frequency f has energy E = h f; more generally quantum stationary-state phases evolve with angular frequency E/hbar.",
			"status": "EST",
			"quantities": [],
			"definitions": [
				"E is photon energy",
				"h is the Planck constant",
				"f is ordinary frequency",
				"hbar = h/(2 pi)"
			],
			"equations": [
				"E = h f",
				"E = hbar omega",
				"omega = 2 pi f"
			],
			"assumptions": ["For E = h f, the excitation is a photon or a mode quantum", "Frequency is defined in the relevant inertial frame"],
			"mechanism": "",
			"evidence": [{
				"type": "experiment",
				"source": "Photoelectric effect, spectroscopy, Compton scattering, Josephson and quantum electrical standards",
				"confidence": 1
			}],
			"primary_sources": [
				"Planck (1900)",
				"Einstein, Ueber einen die Erzeugung und Verwandlung des Lichtes betreffenden heuristischen Gesichtspunkt (1905)",
				"BIPM SI Brochure: exact h"
			],
			"predictions": [],
			"falsification_conditions": ["Precision photon-energy measurements show a reproducible nonlinearity not explained by known physics"],
			"confusion_guard": "E = h f assigns energy to a quantum of frequency f. Photon invariant mass remains zero. The derived mass equivalent m = h f / c² is the inertia of that energy (see frequency-mass-equivalent), not a photon rest mass.",
			"stop_reason": "",
			"tags": [
				"quantum",
				"photon",
				"Planck constant",
				"frequency"
			],
			"verification_type": "experimental_observation",
			"claims_experimental_verification": true,
			"information_layer": "ACADEMIC",
			"version": "",
			"scope": "",
			"scope_limits": "",
			"key_concepts": [],
			"related_theories": [],
			"address_parts": {
				"domain_code": "QUANTUM_MECHANICS",
				"generation": "1",
				"torus": "QUANTA",
				"node_id": "PLANCK_EINSTEIN_RELATION"
			}
		},
		{
			"kind": "node",
			"slug": "upi-relativity-1-spacetime-lorentz-interval",
			"file": "established/relativity_lorentz_invariant.json",
			"domain": "established",
			"address": "UPI<RELATIVITY,1,SPACETIME,LORENTZ_INTERVAL>",
			"title": "Lorentz-invariant spacetime interval",
			"description": "The Minkowski interval is invariant under Lorentz transformations between inertial frames.",
			"status": "EST",
			"quantities": [],
			"definitions": [
				"Delta s is spacetime interval",
				"c is vacuum light speed",
				"Delta t and Delta x,y,z are coordinate separations"
			],
			"equations": ["Delta s^2 = c^2 Delta t^2 - Delta x^2 - Delta y^2 - Delta z^2", "gamma = 1 / sqrt(1 - v^2/c^2)"],
			"assumptions": [
				"Special relativity",
				"Inertial frames",
				"Metric signature +---"
			],
			"mechanism": "",
			"evidence": [{
				"type": "experiment",
				"source": "Particle lifetime dilation, accelerator dynamics, precision clock and navigation tests",
				"confidence": 1
			}],
			"primary_sources": ["Einstein, Zur Elektrodynamik bewegter Koerper (1905)", "Modern precision tests of Lorentz invariance"],
			"predictions": [],
			"falsification_conditions": ["A reproducible inertial-frame experiment shows Lorentz transformation failure after systematic effects are excluded"],
			"confusion_guard": "Coordinate time and distance are frame dependent; the interval is invariant.",
			"stop_reason": "",
			"tags": [
				"special relativity",
				"Lorentz invariance",
				"spacetime"
			],
			"verification_type": "experimental_observation",
			"claims_experimental_verification": true,
			"information_layer": "ACADEMIC",
			"version": "",
			"scope": "",
			"scope_limits": "",
			"key_concepts": [],
			"related_theories": [],
			"address_parts": {
				"domain_code": "RELATIVITY",
				"generation": "1",
				"torus": "SPACETIME",
				"node_id": "LORENTZ_INTERVAL"
			}
		},
		{
			"kind": "node",
			"slug": "upi-relativity-1-t-energy-n-mass-energy",
			"file": "examples/established_mass_energy.json",
			"domain": "examples",
			"address": "UPI<RELATIVITY,1,T_ENERGY,N_MASS_ENERGY>",
			"title": "Mass-energy equivalence",
			"description": "Rest energy relation in special relativity.",
			"status": "EST",
			"quantities": [],
			"definitions": [
				"E is rest energy",
				"m is invariant mass",
				"c is the speed of light in vacuum"
			],
			"equations": ["E = m c^2"],
			"assumptions": [
				"isolated body",
				"invariant mass",
				"SI units"
			],
			"mechanism": "",
			"evidence": [{
				"type": "other",
				"source": "Special relativity textbook treatment"
			}],
			"primary_sources": [],
			"predictions": [],
			"falsification_conditions": [],
			"confusion_guard": "E = m c² is a derived identification (Einstein 1905). When m is invariant mass, E is rest energy. When E is radiation energy h f, m = E/c² is the mass equivalent of that energy — the same derivation, a different referent. Not every oscillating object of frequency f has rest mass h f / c².",
			"stop_reason": "",
			"tags": [],
			"verification_type": "",
			"claims_experimental_verification": false,
			"information_layer": "",
			"version": "",
			"scope": "",
			"scope_limits": "",
			"key_concepts": [],
			"related_theories": ["UPI<information_physics,1,inertia,frequency_mass_equivalent>", "UPI<QUANTUM_MECHANICS,1,QUANTA,PLANCK_EINSTEIN_RELATION>"],
			"address_parts": {
				"domain_code": "RELATIVITY",
				"generation": "1",
				"torus": "T_ENERGY",
				"node_id": "N_MASS_ENERGY"
			}
		},
		{
			"kind": "node",
			"slug": "upi-symbolic-1-agent-workflow-circulation-immunity",
			"file": "examples/agent_circulation.json",
			"domain": "examples",
			"address": "UPI<SYMBOLIC,1,AGENT_WORKFLOW,CIRCULATION_IMMUNITY>",
			"title": "Agent circulation and immune-review architecture",
			"description": "Symbolic mapping for bounded transport, review, quarantine and coordination roles.",
			"status": "SYM",
			"quantities": [],
			"definitions": [
				"TRANSPORT_AGENT: carries one immutable task envelope and one result",
				"IMMUNE_REVIEW_AGENT: detects, classifies, quarantines and reports without silent mutation",
				"COORDINATOR: leases, reconciles and cancels work without bypassing policy",
				"QUARANTINE: reversible isolation with no execution or network access",
				"AUDIT_MEMORY: provenance record keyed by task, attempt and evidence hashes"
			],
			"equations": [],
			"assumptions": [
				"All capabilities are explicit and default-deny",
				"Retries are bounded and idempotent",
				"Agent agreement is not independent evidence"
			],
			"mechanism": "",
			"evidence": [],
			"primary_sources": [],
			"predictions": [],
			"falsification_conditions": [],
			"confusion_guard": "Biological terms are architecture metaphors only; no biological equivalence, hidden authority or autonomous replication is claimed.",
			"stop_reason": "",
			"tags": [
				"symbolic",
				"workflow",
				"agent-role",
				"transport",
				"review",
				"quarantine"
			],
			"verification_type": "software_test",
			"claims_experimental_verification": false,
			"information_layer": "PUBLIC",
			"version": "0.1.0",
			"scope": "",
			"scope_limits": "",
			"key_concepts": [],
			"related_theories": [],
			"address_parts": {
				"domain_code": "SYMBOLIC",
				"generation": "1",
				"torus": "AGENT_WORKFLOW",
				"node_id": "CIRCULATION_IMMUNITY"
			}
		},
		{
			"kind": "node",
			"slug": "upi-symbolic-1-information-toe-unified-blueprint-sketch",
			"file": "examples/information_theoretic_toe_blueprint.json",
			"domain": "examples",
			"address": "UPI<SYMBOLIC,1,INFORMATION_TOE,UNIFIED_BLUEPRINT_SKETCH>",
			"title": "Information-theoretic ToE blueprint sketch (example only)",
			"description": "Non-authoritative conceptual scaffold that maps information-layer bookkeeping ideas onto familiar physics vocabulary. Status is SYM: illustrative sketch only — not an established theory, not peer-reviewed, and not a claim of experimental verification. Do not treat as UPI core physics identity.",
			"status": "SYM",
			"quantities": [],
			"definitions": [
				"information_layer: bookkeeping view of constraints, labels, and relations used by UPI tooling — not a substitute for laboratory physics",
				"blueprint_sketch: a high-level map of how symbolic nodes might relate; intentionally incomplete",
				"SYM: symbolic / illustrative status in UPI; must not be read as EST or DER without separate evidence"
			],
			"equations": [],
			"assumptions": [
				"This record is a symbolic example for tooling and documentation demos.",
				"No claim is made that the sketch is complete, unique, or experimentally verified.",
				"Physical constants and established theories remain authoritative over this sketch."
			],
			"mechanism": "",
			"evidence": [{
				"type": "other",
				"source": "docs and README identity surfaces: this file is an example fixture only",
				"notes": "Preserved as a non-authoritative sketch for validate/CLI demos."
			}],
			"primary_sources": [],
			"predictions": [],
			"falsification_conditions": [],
			"confusion_guard": "Example-only SYM blueprint. Not UPI identity, not an accepted ToE, not experimental fact. Core project identity remains Universal Physics Index machine-readable physics indexing.",
			"stop_reason": "",
			"tags": [
				"symbolic",
				"example-only",
				"information-layer",
				"toe-sketch",
				"non-authoritative"
			],
			"verification_type": "none",
			"claims_experimental_verification": false,
			"information_layer": "PUBLIC",
			"version": "0.1.0",
			"scope": "",
			"scope_limits": "",
			"key_concepts": [],
			"related_theories": [],
			"address_parts": {
				"domain_code": "SYMBOLIC",
				"generation": "1",
				"torus": "INFORMATION_TOE",
				"node_id": "UNIFIED_BLUEPRINT_SKETCH"
			}
		},
		{
			"kind": "node",
			"slug": "upi-symbolic-1-t-quadralith-n-control-graph",
			"file": "examples/quadralith.json",
			"domain": "examples",
			"address": "UPI<SYMBOLIC,1,T_QUADRALITH,N_CONTROL_GRAPH>",
			"title": "Quadralith symbolic control graph",
			"description": "Optional conceptual graph; it is not an accepted physical model.",
			"status": "SYM",
			"quantities": [],
			"definitions": [
				"AUM: initialization or latent state",
				"alpha: activation",
				"Omega: projection or observer state",
				"Phi: integration or completion"
			],
			"equations": ["AUM <-> alpha <-> Omega <-> Phi <-> AUM", "Omega <-> alpha"],
			"assumptions": [],
			"mechanism": "",
			"evidence": [],
			"primary_sources": [],
			"predictions": [],
			"falsification_conditions": [],
			"confusion_guard": "Omega7834, Omega8200, Omega1766 and OmegaTF1766 are identifiers, never SI constants.",
			"stop_reason": "",
			"tags": ["symbolic", "conceptual-control-graph"],
			"verification_type": "",
			"claims_experimental_verification": false,
			"information_layer": "",
			"version": "",
			"scope": "",
			"scope_limits": "",
			"key_concepts": [],
			"related_theories": [],
			"address_parts": {
				"domain_code": "SYMBOLIC",
				"generation": "1",
				"torus": "T_QUADRALITH",
				"node_id": "N_CONTROL_GRAPH"
			}
		},
		{
			"kind": "node",
			"slug": "upi-symbolic-1-vortex-dna-functional-architecture",
			"file": "examples/vortex_dna.json",
			"domain": "examples",
			"address": "UPI<SYMBOLIC,1,VORTEX_DNA,FUNCTIONAL_ARCHITECTURE>",
			"title": "Vortex-DNA functional architecture",
			"description": "Transparent collaboration and boundary-control model; DNA is metaphorical.",
			"status": "SYM",
			"quantities": [],
			"definitions": [
				"IDENTITY_CORE: role and collaboration contract",
				"SCIENTIFIC_CORE: established definitions and dimensional rules",
				"HYPOTHESIS_CORE: testable unestablished claims",
				"SYMBOLIC_CORE: conceptual mappings",
				"AUDIT_CORE: revision and conflict record",
				"BOUNDARY_CORE: classification guard"
			],
			"equations": [],
			"assumptions": [],
			"mechanism": "",
			"evidence": [],
			"primary_sources": [],
			"predictions": [],
			"falsification_conditions": [],
			"confusion_guard": "Not biological DNA; agent agreement is not independent evidence; no layer grants hidden authority.",
			"stop_reason": "",
			"tags": [
				"symbolic",
				"audit",
				"boundary"
			],
			"verification_type": "none",
			"claims_experimental_verification": false,
			"information_layer": "PUBLIC",
			"version": "0.1.0",
			"scope": "",
			"scope_limits": "",
			"key_concepts": [],
			"related_theories": [],
			"address_parts": {
				"domain_code": "SYMBOLIC",
				"generation": "1",
				"torus": "VORTEX_DNA",
				"node_id": "FUNCTIONAL_ARCHITECTURE"
			}
		},
		{
			"kind": "node",
			"slug": "upi-symbolic-g1-t-invalid-n-promotion",
			"file": "examples/invalid_symbolic_as_established.json",
			"domain": "examples",
			"address": "UPI<SYMBOLIC,G1,T_INVALID,N_PROMOTION>",
			"title": "Intentionally invalid symbolic promotion",
			"description": "A negative test fixture.",
			"status": "EST",
			"quantities": [],
			"definitions": [],
			"equations": [],
			"assumptions": [],
			"mechanism": "",
			"evidence": [],
			"primary_sources": [],
			"predictions": [],
			"falsification_conditions": [],
			"confusion_guard": "An unsupported symbolic mapping presented as established.",
			"stop_reason": "",
			"tags": [],
			"verification_type": "",
			"claims_experimental_verification": false,
			"information_layer": "",
			"version": "0.1.0",
			"scope": "",
			"scope_limits": "",
			"key_concepts": [],
			"related_theories": [],
			"address_parts": {
				"domain_code": "SYMBOLIC",
				"generation": "G1",
				"torus": "T_INVALID",
				"node_id": "N_PROMOTION"
			}
		},
		{
			"kind": "node",
			"slug": "upi-thermodynamics-1-energy-entropy-first-second-laws",
			"file": "established/thermodynamics_laws.json",
			"domain": "established",
			"address": "UPI<THERMODYNAMICS,1,ENERGY_ENTROPY,FIRST_SECOND_LAWS>",
			"title": "First and second laws of thermodynamics",
			"description": "Energy is conserved in thermodynamic processes, while entropy production is nonnegative for an isolated macroscopic system.",
			"status": "EST",
			"quantities": [],
			"definitions": [
				"U is internal energy",
				"Q is heat added to the system",
				"W is work done by the system",
				"S is thermodynamic entropy"
			],
			"equations": [
				"Delta U = Q - W",
				"Delta S_isolated >= 0",
				"d S = delta Q_rev / T for a reversible process"
			],
			"assumptions": [
				"Macroscopic thermodynamic state variables are well defined",
				"Sign convention: W is work done by the system",
				"The entropy inequality applies to an isolated total system"
			],
			"mechanism": "",
			"evidence": [{
				"type": "experiment",
				"source": "Calorimetry, heat engines, phase equilibria, and statistical-mechanics tests",
				"confidence": 1
			}],
			"primary_sources": ["Clausius and Kelvin formulations", "Modern thermodynamics and statistical mechanics"],
			"predictions": [],
			"falsification_conditions": ["A repeatable cyclic device produces net work from a single equilibrium heat bath with no other change", "An isolated macroscopic system exhibits sustained entropy decrease beyond fluctuation predictions"],
			"confusion_guard": "Local entropy can decrease when entropy is exported; the second law constrains the complete isolated accounting.",
			"stop_reason": "",
			"tags": [
				"thermodynamics",
				"energy conservation",
				"entropy"
			],
			"verification_type": "experimental_observation",
			"claims_experimental_verification": true,
			"information_layer": "ACADEMIC",
			"version": "",
			"scope": "",
			"scope_limits": "",
			"key_concepts": [],
			"related_theories": [],
			"address_parts": {
				"domain_code": "THERMODYNAMICS",
				"generation": "1",
				"torus": "ENERGY_ENTROPY",
				"node_id": "FIRST_SECOND_LAWS"
			}
		},
		{
			"kind": "node",
			"slug": "upi-acoustics-1-music-musical-notes",
			"file": "examples/musical_notes_acoustics.json",
			"domain": "examples",
			"address": "UPI<acoustics,1,music,musical_notes>",
			"title": "Equal Temperament Musical Notes and Pitch Frequency Mapping",
			"description": "Mathematical and physical mapping of Western 12-tone equal temperament (12-TET) musical notes to acoustic fundamental frequencies, pitch notation, staff clefs (G-klav and F-klav), and duration ratios.",
			"status": "EST",
			"quantities": [
				{
					"name": "A4_reference_pitch",
					"value": 440,
					"unit": "Hz",
					"reference": "ISO 16:1975 Acoustics Tuning Standard"
				},
				{
					"name": "C4_middle_c_frequency",
					"value": 261.6256,
					"unit": "Hz",
					"uncertainty": 1e-4
				},
				{
					"name": "semitone_frequency_ratio",
					"value": 1.0594630943592953,
					"unit": "dimensionless"
				}
			],
			"definitions": [
				"Musical Note: Named pitch standard corresponding to a fundamental acoustic oscillation frequency (Hz).",
				"12-TET: 12-tone equal temperament where the octave ratio (2:1) is divided into 12 logarithmic semitones.",
				"Staff Notation: 5-line musical grid mapping pitch (vertical position/clef) and time duration (note shapes)."
			],
			"equations": ["f(n) = f_0 * 2^(n / 12)", "N8 = f / (8 Hz)"],
			"assumptions": ["A4 standard reference tuning is set to 440.0 Hz.", "Tuning system uses 12-tone equal temperament (12-TET)."],
			"mechanism": "Acoustic pressure waves generated by vibrating strings, columns of air, or membranes create fundamental frequencies perceived as distinct musical pitches.",
			"evidence": [{
				"type": "calculation",
				"source": "ISO 16:1975 Acoustics - Standard Tuning Frequency",
				"confidence": 1,
				"notes": "12-TET pitch frequencies calculated logarithmically relative to A4 = 440 Hz."
			}],
			"primary_sources": [],
			"predictions": [],
			"falsification_conditions": [],
			"confusion_guard": "",
			"stop_reason": "",
			"tags": [
				"acoustics",
				"music_theory",
				"12_tet",
				"pitch_notation",
				"frequencies"
			],
			"verification_type": "",
			"claims_experimental_verification": false,
			"information_layer": "PUBLIC",
			"version": "",
			"scope": "",
			"scope_limits": "",
			"key_concepts": [],
			"related_theories": [],
			"address_parts": {
				"domain_code": "acoustics",
				"generation": "1",
				"torus": "music",
				"node_id": "musical_notes"
			}
		},
		{
			"kind": "node",
			"slug": "upi-biology-1-genetics-dna-sonification",
			"file": "examples/dna_sonification_acoustics.json",
			"domain": "examples",
			"address": "UPI<biology,1,genetics,dna_sonification>",
			"title": "DNA Nucleotide Sequence Bio-Acoustic Frequency Mapping",
			"description": "Sonification mapping translating DNA nucleotide bases (Adenine, Cytosine, Guanine, Thymine) into acoustic pitch frequencies, musical notes, and dimensionless 8 Hz reference indices N8.",
			"status": "DER",
			"quantities": [
				{
					"name": "Adenine_A4_frequency",
					"value": 440,
					"unit": "Hz",
					"reference": "Mapped to A4 (440.0 Hz)"
				},
				{
					"name": "Cytosine_C4_frequency",
					"value": 261.6256,
					"unit": "Hz",
					"reference": "Mapped to C4 (Middle C, 261.63 Hz)"
				},
				{
					"name": "Guanine_G4_frequency",
					"value": 392,
					"unit": "Hz",
					"reference": "Mapped to G4 (392.0 Hz)"
				},
				{
					"name": "Thymine_E4_frequency",
					"value": 329.6276,
					"unit": "Hz",
					"reference": "Mapped to E4 (329.63 Hz)"
				}
			],
			"definitions": [
				"DNA Sonification: Algorithmic translation of nucleotide bases (A, C, G, T) or codons into acoustic frequencies, pitch notes, or musical sequences.",
				"4-Base Harmonic Tuning: Mapping A->A4, C->C4, G->G4, T->E4 based on harmonic pitch standards.",
				"N8 Index: Dimensionless frequency ratio N8 = f / (8 Hz) measuring acoustics against the 8 Hz reference."
			],
			"equations": ["f(base) = note_frequency(base)", "N8 = f / (8 Hz)"],
			"assumptions": ["Sonification maps biological sequences to audible acoustic frequencies for pattern analysis.", "Biological DNA code is represented as symbolic sequence metadata (DER / SYM) and does not assert physical sound emission by molecular strands without transducer systems."],
			"mechanism": "Nucleotide sequence letters are algorithmically converted into acoustic sine wave frequencies using 12-TET musical note intervals.",
			"evidence": [{
				"type": "calculation",
				"source": "UPI Bio-Acoustic Sonification Engine",
				"confidence": .9,
				"notes": "Derived mapping for bio-acoustic sequence analysis and pattern visualization."
			}],
			"primary_sources": [],
			"predictions": [],
			"falsification_conditions": [],
			"confusion_guard": "",
			"stop_reason": "",
			"tags": [
				"dna_sonification",
				"bio_acoustics",
				"genetics",
				"music_mapping",
				"frequencies"
			],
			"verification_type": "",
			"claims_experimental_verification": false,
			"information_layer": "PUBLIC",
			"version": "",
			"scope": "",
			"scope_limits": "",
			"key_concepts": [],
			"related_theories": [],
			"address_parts": {
				"domain_code": "biology",
				"generation": "1",
				"torus": "genetics",
				"node_id": "dna_sonification"
			}
		},
		{
			"kind": "node",
			"slug": "upi-biology-6-chirality-biological-homochirality",
			"file": "biology/biological_homochirality.json",
			"domain": "biology",
			"address": "UPI<biology,6,chirality,biological_homochirality>",
			"title": "Biological homochirality and symmetry-breaking amplification",
			"description": "A bounded node separating observed biological handedness, demonstrated asymmetric autocatalysis, and unresolved origin mechanisms.",
			"status": "HYP",
			"quantities": [],
			"definitions": [
				"Terrestrial proteins predominantly use L-amino acids and nucleic acids predominantly use D-sugars.",
				"Homochirality is strong enrichment of one enantiomeric family.",
				"Enantiomeric excess is ee = abs(x-y)/(x+y).",
				"The Soai reaction demonstrates asymmetric autocatalytic amplification in a laboratory chemical system."
			],
			"equations": [
				"ee = abs(x-y)/(x+y)",
				"dx/dt = k1*x*(a-x-y) - k2*x*y + epsilon",
				"dy/dt = k1*y*(a-x-y) - k2*x*y - epsilon",
				"dDelta/dt = k1*(a-x-y)*Delta + 2*epsilon, where Delta = x-y"
			],
			"assumptions": [
				"The kinetic equations are a simplified symmetry-breaking model, not a complete Soai mechanism.",
				"Parameters, initial conditions, noise and environmental boundaries must be declared.",
				"Parity violation, minerals, photochemistry, extraterrestrial delivery and flow are candidate mechanisms, not a settled cause.",
				"No universal role for an 8 Hz drive in prebiotic homochirality is established."
			],
			"mechanism": "A small deterministic or stochastic chiral imbalance may be amplified when reaction kinetics provide same-handed positive feedback and sufficient cross-inhibition or selection.",
			"evidence": [
				{
					"type": "observation",
					"source": "Established stereochemistry of terrestrial proteins and nucleic acids",
					"confidence": .99,
					"notes": "Supports biological homochirality, not a unique origin mechanism."
				},
				{
					"type": "experiment",
					"source": "Laboratory asymmetric autocatalysis exemplified by the Soai reaction",
					"confidence": .95,
					"notes": "Demonstrates amplification in a particular chemical system."
				},
				{
					"type": "calculation",
					"source": "Simplified Frank-type symmetry-breaking kinetics",
					"confidence": .75,
					"notes": "Demonstrates possible amplification under declared assumptions."
				}
			],
			"primary_sources": [],
			"predictions": [
				"For symmetric initial conditions and epsilon = 0, a deterministic symmetric model remains racemic unless instability or noise breaks symmetry.",
				"Increasing abs(epsilon) should reduce the expected time to a declared ee threshold in an amplifying parameter regime.",
				"Any frequency-specific effect requires sham and neighboring-frequency controls."
			],
			"falsification_conditions": [
				"Independent implementations cannot reproduce the declared trajectories.",
				"A proposed origin mechanism produces no reproducible bias under blinded controls.",
				"A claimed frequency effect does not differ from sham or neighboring-frequency controls."
			],
			"confusion_guard": "Biological homochirality and laboratory asymmetric autocatalysis are established phenomena. A unique cosmic, magnetic, hydrodynamic or 8 Hz origin mechanism is not established.",
			"stop_reason": "",
			"tags": [
				"biology",
				"chirality",
				"homochirality",
				"asymmetric-autocatalysis",
				"symmetry-breaking",
				"frank-model",
				"soai-reaction"
			],
			"verification_type": "mathematical_check",
			"claims_experimental_verification": false,
			"information_layer": "ACADEMIC",
			"version": "0.1.0",
			"scope": "",
			"scope_limits": "",
			"key_concepts": [],
			"related_theories": [],
			"address_parts": {
				"domain_code": "biology",
				"generation": "6",
				"torus": "chirality",
				"node_id": "biological_homochirality"
			}
		},
		{
			"kind": "node",
			"slug": "upi-coding-theory-1-binary-code-extended-golay",
			"file": "coding_theory/extended_golay.json",
			"domain": "coding_theory",
			"address": "UPI<coding_theory,1,binary_code,extended_golay>",
			"title": "Extended binary Golay code G24",
			"description": "The unique (up to equivalence) binary linear [24, 12, 8] code. It is perfect, self-dual, and has 759 weight-8 codewords (octads). This index ships a software encoder and nearest-codeword decoder.",
			"status": "EST",
			"quantities": [
				{
					"name": "length",
					"value": 24,
					"unit": "1"
				},
				{
					"name": "dimension",
					"value": 12,
					"unit": "1"
				},
				{
					"name": "minimum_distance",
					"value": 8,
					"unit": "1"
				},
				{
					"name": "octads",
					"value": 759,
					"unit": "1"
				}
			],
			"definitions": [
				"G24 is a binary linear code of length 24, dimension 12, minimum Hamming distance 8.",
				"It is obtained by adding an overall parity bit to the perfect cyclic Golay code G23 = [23, 12, 7].",
				"Weight enumerator: 1 + 759 x^8 + 2576 x^12 + 759 x^16 + x^24. It is self-dual and Type II.",
				"Any 3 bit flips are uniquely correctable (t = floor((d-1)/2) = 3). Covering radius is 4; the code is not perfect."
			],
			"equations": [
				"n = 24, k = 12, d = 8, t = 3",
				"G23: 2^12 * sum_{i=0}^{3} C(23,i) = 2^23  (perfect)",
				"A(x) = 1 + 759 x^8 + 2576 x^12 + 759 x^16 + x^24"
			],
			"assumptions": ["Alphabet F_2. Hamming metric.", "The generator polynomial of the underlying cyclic G23 is 1+x+x^5+x^6+x^7+x^9+x^11, extended by an overall parity bit."],
			"mechanism": "A 12-bit message is multiplied by the G23 generator polynomial and given a 24th parity bit. Nearest-codeword decoding restores any pattern of at most three bit flips.",
			"evidence": [{
				"type": "theorem",
				"source": "Pless, On the uniqueness of the Golay codes",
				"confidence": 1
			}, {
				"type": "calculation",
				"source": "UPI software enumerator: 4096 codewords, declared weights, minimum distance 8",
				"confidence": 1
			}],
			"primary_sources": ["Golay, Notes on digital coding (1949)", "MacWilliams & Sloane, The Theory of Error-Correcting Codes"],
			"predictions": ["Every pattern of at most three bit flips on a codeword decodes uniquely to that codeword.", "No linear binary [24, 12] code has distance greater than 8."],
			"falsification_conditions": ["A software codeword of weight other than 0, 8, 12, 16, 24.", "A received word at distance ≤ 3 from two distinct codewords."],
			"confusion_guard": "G24 corrects bit flips on a classical string. Running the decoder is not quantum error correction, self-healing spacetime, or a biological repair mechanism.",
			"stop_reason": "",
			"tags": [
				"golay",
				"error-correction",
				"perfect-code",
				"self-dual",
				"coding-theory"
			],
			"verification_type": "software_test",
			"claims_experimental_verification": false,
			"information_layer": "ACADEMIC",
			"version": "0.1.0",
			"scope": "Binary coding theory",
			"scope_limits": "Does not by itself specify a quantum CSS code or a physical channel.",
			"key_concepts": [
				"perfect code",
				"octad",
				"minimum distance",
				"syndrome"
			],
			"related_theories": ["UPI<coding_theory,1,sphere_packing,leech_lattice>", "UPI<quantum_information,1,error_correction,syndrome_measurement>"],
			"address_parts": {
				"domain_code": "coding_theory",
				"generation": "1",
				"torus": "binary_code",
				"node_id": "extended_golay"
			}
		},
		{
			"kind": "node",
			"slug": "upi-coding-theory-1-root-system-e8-lattice",
			"file": "coding_theory/e8_lattice.json",
			"domain": "coding_theory",
			"address": "UPI<coding_theory,1,root_system,e8_lattice>",
			"title": "E8 root lattice",
			"description": "The unique even unimodular lattice in 8 dimensions. Its 240 roots are the vertices of the 4_21 polytope. This is a theorem in lattice theory, not a model of spacetime.",
			"status": "EST",
			"quantities": [
				{
					"name": "dimension",
					"value": 8,
					"unit": "1"
				},
				{
					"name": "root_count",
					"value": 240,
					"unit": "1"
				},
				{
					"name": "kissing_number",
					"value": 240,
					"unit": "1"
				}
			],
			"definitions": [
				"E8 is the unique even unimodular lattice in R^8 up to isometry.",
				"One coordinate model: vectors in Z^8 union (Z+1/2)^8 whose coordinates sum to an even integer.",
				"The 240 roots are the lattice vectors of norm 2: 112 of type ±e_i ± e_j and 128 of type (±1/2)^8 with an even number of minus signs."
			],
			"equations": [
				"||v||^2 = 2 for every root v",
				"kissing number = 240",
				"det(E8) = 1"
			],
			"assumptions": ["Euclidean inner product on R^8.", "Even: all norms are even integers. Unimodular: dual lattice equals itself."],
			"mechanism": "The 240 roots form the E8 root system. A Coxeter-plane projection (eigenplane of the Coxeter element, angle 2π/30) yields the 240-point portrait drawn in this index.",
			"evidence": [{
				"type": "theorem",
				"source": "Classification of even unimodular lattices in dimension 8",
				"confidence": 1
			}],
			"primary_sources": ["Conway & Sloane, Sphere Packings, Lattices and Groups", "Bourbaki, Lie Groups and Lie Algebras, Ch. VI"],
			"predictions": ["Any even unimodular lattice in dimension 8 is isometric to E8.", "The Coxeter projection of the 240 roots has 240 distinct image points."],
			"falsification_conditions": ["A second, non-isometric even unimodular lattice in dimension 8.", "A coordinate model whose norm-2 vectors are not 240 in number."],
			"confusion_guard": "E8 is a lattice in R^8. Projecting it onto a plane does not place it in physical space, and it is not a hidden compactification of the vacuum.",
			"stop_reason": "",
			"tags": [
				"e8",
				"root-system",
				"lattice",
				"sphere-packing",
				"lie-algebra"
			],
			"verification_type": "mathematical_check",
			"claims_experimental_verification": false,
			"information_layer": "ACADEMIC",
			"version": "0.1.0",
			"scope": "Euclidean lattice theory",
			"scope_limits": "No claim about particle multiplets, gauge groups of nature, or extra dimensions.",
			"key_concepts": [
				"even unimodular lattice",
				"root system",
				"Coxeter plane",
				"kissing number"
			],
			"related_theories": ["UPI<coding_theory,1,sphere_packing,leech_lattice>", "UPI<coding_theory,1,binary_code,extended_golay>"],
			"address_parts": {
				"domain_code": "coding_theory",
				"generation": "1",
				"torus": "root_system",
				"node_id": "e8_lattice"
			}
		},
		{
			"kind": "node",
			"slug": "upi-coding-theory-1-sphere-packing-leech-lattice",
			"file": "coding_theory/leech_lattice.json",
			"domain": "coding_theory",
			"address": "UPI<coding_theory,1,sphere_packing,leech_lattice>",
			"title": "Leech lattice Λ24",
			"description": "The unique even unimodular lattice in 24 dimensions with no vectors of norm 2. It realises the densest known sphere packing in 24 dimensions (proved optimal).",
			"status": "EST",
			"quantities": [
				{
					"name": "dimension",
					"value": 24,
					"unit": "1"
				},
				{
					"name": "minimal_norm",
					"value": 4,
					"unit": "1"
				},
				{
					"name": "kissing_number",
					"value": 196560,
					"unit": "1"
				}
			],
			"definitions": [
				"Λ24 is the unique even unimodular lattice in R^24 with minimum norm 4.",
				"Witt construction: from the extended binary Golay code G24 one builds Λ24 as a union of cosets of 2Z^24 and related 4Z^24 translates.",
				"Minimal vectors number 196560; none have norm 2."
			],
			"equations": [
				"min { ||x||^2 : x in Λ24, x ≠ 0 } = 4",
				"kissing number = 196560",
				"det(Λ24) = 1"
			],
			"assumptions": ["Euclidean R^24.", "The Golay code used in the Witt construction is the extended [24,12,8] code."],
			"mechanism": "Golay codewords label which coordinates of a 24-vector are shifted. The resulting discrete subgroup is even, unimodular, and has minimum norm 4.",
			"evidence": [{
				"type": "theorem",
				"source": "Cohn–Kumar–Miller–Radchenko–Viazovska: optimality of Λ24 sphere packing (2016/2017)",
				"confidence": 1
			}, {
				"type": "theorem",
				"source": "Conway: uniqueness of the Leech lattice",
				"confidence": 1
			}],
			"primary_sources": [
				"Leech, Notes on sphere packings (1967)",
				"Conway & Sloane, Sphere Packings, Lattices and Groups",
				"Viazovska et al., universal optimality of the Leech lattice"
			],
			"predictions": ["No packing of equal spheres in R^24 exceeds the density of Λ24.", "Every even unimodular 24-dimensional lattice with min-norm 4 is isometric to Λ24."],
			"falsification_conditions": ["A denser sphere packing in 24 dimensions.", "A Witt-style construction from G24 that fails to be even or unimodular."],
			"confusion_guard": "Λ24 is a packing lattice in R^24. Drawing it as a golden cloud does not compactify spacetime or encode a physical solid.",
			"stop_reason": "",
			"tags": [
				"leech",
				"lattice",
				"sphere-packing",
				"golay",
				"24-dimensions"
			],
			"verification_type": "mathematical_check",
			"claims_experimental_verification": false,
			"information_layer": "ACADEMIC",
			"version": "0.1.0",
			"scope": "Euclidean lattice theory and sphere packing",
			"scope_limits": "No claim about condensed-matter crystals or extra-dimensional physics.",
			"key_concepts": [
				"even unimodular",
				"kissing number",
				"Witt construction",
				"universal optimality"
			],
			"related_theories": ["UPI<coding_theory,1,binary_code,extended_golay>", "UPI<coding_theory,1,root_system,e8_lattice>"],
			"address_parts": {
				"domain_code": "coding_theory",
				"generation": "1",
				"torus": "sphere_packing",
				"node_id": "leech_lattice"
			}
		},
		{
			"kind": "node",
			"slug": "upi-computational-physics-2-state-vector-classical-resource-boundary",
			"file": "computational_physics/classical_state_vector_resource_boundary.json",
			"domain": "computational_physics",
			"address": "UPI<computational_physics,2,state_vector,classical_resource_boundary>",
			"title": "Classical state-vector simulation resource boundary",
			"description": "Derived computational boundary for software that explicitly stores and updates every amplitude of an N-dimensional quantum state. Such a simulator can reproduce ideal finite-dimensional linear algebra but uses classical resources proportional to the represented basis size.",
			"status": "DER",
			"quantities": [],
			"definitions": [
				"N is the total Hilbert-space basis dimension represented by the simulator.",
				"A dense pure-state simulation stores N complex amplitudes.",
				"A dense general unitary matrix contains N^2 complex entries, although structured gates can be applied more efficiently.",
				"Quantum speedup is a hardware-and-algorithm resource claim, not a property of equation names."
			],
			"equations": [
				"memory_dense_state = O(N)",
				"memory_dense_operator = O(N^2)",
				"time_dense_matrix_vector = O(N^2)",
				"N = product_i d_i",
				"classical_amplitudes_stored = N"
			],
			"assumptions": [
				"The simulator uses a dense classical state vector.",
				"Compression, tensor-network truncation, sparsity and problem-specific symmetries are not assumed.",
				"The complexity statements describe asymptotic software resources, not physical energy consumption."
			],
			"mechanism": "Every represented basis state requires an explicit complex number in a dense simulation. Operations must read or update these stored amplitudes, so the classical resource requirement grows with the full represented dimension.",
			"evidence": [{
				"type": "calculation",
				"source": "Direct data-structure and operation-count analysis of a dense complex state vector",
				"notes": "The bound follows from explicitly storing N amplitudes; it is a software derivation rather than an experimental result."
			}],
			"primary_sources": ["UPI implementation source: src/upi/qudit.py", "UPI standalone implementation source: modules/vrasi-qudit/src/vrasi_qudit/core.py"],
			"predictions": [
				"Doubling N approximately doubles dense state-vector storage when numeric representation is fixed.",
				"A register with dimensions (d_1,...,d_n) allocates product_i d_i amplitudes.",
				"The simulator cannot demonstrate hardware quantum advantage merely by reproducing ideal probabilities."
			],
			"falsification_conditions": [
				"Reject the stated O(N) dense storage bound if the implementation does not explicitly store one amplitude per basis state.",
				"Revise the operation bound when a documented sparse, tensor-network or structured algorithm is used.",
				"Reject any speedup claim that omits a matched classical baseline, hardware resources and end-to-end runtime."
			],
			"confusion_guard": "Agreement with quantum equations does not turn classical RAM into quantum memory. More than three local states creates a qudit model, not verified quantum hardware.",
			"stop_reason": "",
			"tags": [
				"classical-simulation",
				"state-vector",
				"complexity",
				"resource-boundary",
				"quantum-speedup-guard"
			],
			"verification_type": "software_test",
			"claims_experimental_verification": false,
			"information_layer": "ACADEMIC",
			"version": "0.1.0",
			"scope": "",
			"scope_limits": "",
			"key_concepts": [],
			"related_theories": [],
			"address_parts": {
				"domain_code": "computational_physics",
				"generation": "2",
				"torus": "state_vector",
				"node_id": "classical_resource_boundary"
			}
		},
		{
			"kind": "node",
			"slug": "upi-geophysics-1-cavity-schumann-resonance",
			"file": "established/schumann_resonance.json",
			"domain": "established",
			"address": "UPI<geophysics,1,cavity,schumann_resonance>",
			"title": "Schumann resonances of the Earth–ionosphere cavity",
			"description": "The Earth and the ionosphere form a spherical electromagnetic cavity whose fundamental is near 7.8 Hz, with harmonics near 14, 20, 26 Hz. This is geophysics. It is not a human operator lock and not a universal organizing frequency.",
			"status": "EST",
			"quantities": [{
				"name": "fundamental",
				"value": 7.83,
				"unit": "Hz",
				"uncertainty": .2,
				"reference": "typical quiet-day fundamental"
			}],
			"definitions": ["The cavity is bounded by the conducting Earth and the ionospheric D/E region.", "The fundamental is the lowest TEM mode of that cavity."],
			"equations": ["f_n ≈ (c / 2 π R_E) * sqrt(n(n+1))"],
			"assumptions": ["A spherical cavity of Earth radius.", "Ionospheric conductivity high enough to act as a wall at ELF."],
			"mechanism": "Global lightning excites the cavity. Schumann (1952) predicted the spectrum; it is routinely measured.",
			"evidence": [{
				"type": "observation",
				"source": "ELF magnetometer networks",
				"confidence": .95
			}],
			"primary_sources": ["Schumann (1952) Über die strahlungslosen Eigenschwingungen einer leitenden Kugel", "Nickolaenko & Hayakawa, Resonances in the Earth-Ionosphere Cavity"],
			"predictions": ["A quiet-day ELF spectrum shows peaks near 8, 14, 20, 26 Hz, shifting with ionospheric height."],
			"falsification_conditions": ["A global ELF spectrum with no cavity modes near those frequencies under quiet-day conditions."],
			"confusion_guard": "7.83 Hz is a cavity mode of this planet. It does not make 8 Hz or 8.2 Hz a universal carrier, and it does not close m=hf/c² onto biology.",
			"stop_reason": "",
			"tags": [
				"schumann",
				"frequency",
				"geophysics"
			],
			"verification_type": "theoretical_derivation",
			"claims_experimental_verification": false,
			"information_layer": "ACADEMIC",
			"version": "0.1.0",
			"scope": "Earth–ionosphere ELF cavity.",
			"scope_limits": "Not a human EEG lock. Not a proof of information mass.",
			"key_concepts": [
				"ELF cavity",
				"7.83 Hz",
				"ionosphere"
			],
			"related_theories": ["UPI<hypothesis,1,t,reference_n_8hz>"],
			"address_parts": {
				"domain_code": "geophysics",
				"generation": "1",
				"torus": "cavity",
				"node_id": "schumann_resonance"
			}
		},
		{
			"kind": "node",
			"slug": "upi-gravity-1-horizon-bekenstein-hawking-entropy",
			"file": "established/bekenstein_hawking_entropy.json",
			"domain": "established",
			"address": "UPI<gravity,1,horizon,bekenstein_hawking_entropy>",
			"title": "Bekenstein–Hawking horizon entropy",
			"description": "Geometric entropy of a semiclassical event horizon: S = k A / (4 ℓ_P²). This is the purest gravitational entropy we have — an area law, not a named gas. It applies to horizons, not to an arbitrary frequency quantum.",
			"status": "EST",
			"quantities": [],
			"definitions": [
				"A is the horizon area.",
				"ℓ_P is the Planck length.",
				"k is Boltzmann's constant.",
				"S is the Bekenstein–Hawking entropy."
			],
			"equations": ["S = k A / (4 ℓ_P^2)", "ℓ_P^2 = hbar G / c^3"],
			"assumptions": [
				"Semiclassical gravity: the horizon is large compared with ℓ_P.",
				"The area is that of a causal horizon (black hole, and with care other horizons).",
				"No firewall or other UV completion is assumed."
			],
			"mechanism": "Bekenstein argued horizon area is thermodynamic entropy. Hawking's calculation of thermal radiation fixed the coefficient 1/4.",
			"evidence": [{
				"type": "theorem",
				"source": "Hawking radiation and the first law of black-hole mechanics",
				"confidence": .95,
				"notes": "Direct laboratory confirmation of Hawking radiation is not claimed. The area law is established within semiclassical GR+QFT."
			}],
			"primary_sources": ["Bekenstein (1973), Black holes and entropy", "Hawking (1975), Particle creation by black holes"],
			"predictions": ["A black hole of area A has entropy k A / (4 ℓ_P²) and temperature ħ κ / (2π k c)."],
			"falsification_conditions": ["A controlled horizon system whose thermodynamic entropy is reproducibly not proportional to area with coefficient 1/4, after known corrections."],
			"confusion_guard": "S = k A / (4 ℓ_P²) is not Shannon entropy of a lab bit and is not the entropy of a photon of frequency f. Using it for a mass whose Schwarzschild radius is below ℓ_P leaves the semiclassical domain (STOP).",
			"stop_reason": "",
			"tags": [
				"entropy",
				"horizon",
				"bekenstein",
				"hawking",
				"holography"
			],
			"verification_type": "theoretical_derivation",
			"claims_experimental_verification": false,
			"information_layer": "ACADEMIC",
			"version": "0.1.0",
			"scope": "Semiclassical event horizons with R >> ℓ_P.",
			"scope_limits": "Does not assign this S to an ordinary oscillator or to a sub-Planck Schwarzschild radius.",
			"key_concepts": [
				"horizon entropy",
				"area law",
				"Planck length"
			],
			"related_theories": [
				"UPI<THERMODYNAMICS,1,ENERGY_ENTROPY,FIRST_SECOND_LAWS>",
				"UPI<information_physics,1,measure,universal_information_measure>",
				"UPI<holography,1,entropy,ryu_takayanagi>"
			],
			"address_parts": {
				"domain_code": "gravity",
				"generation": "1",
				"torus": "horizon",
				"node_id": "bekenstein_hawking_entropy"
			}
		},
		{
			"kind": "node",
			"slug": "upi-gravity-1-spacetime-anti-de-sitter",
			"file": "established/anti_de_sitter.json",
			"domain": "established",
			"address": "UPI<gravity,1,spacetime,anti_de_sitter>",
			"title": "Anti-de Sitter spacetime",
			"description": "Maximally symmetric Lorentzian geometry of constant negative curvature: Einstein's equation with Λ < 0. It has a conformal boundary. This is a solution, not a claim that we live in AdS.",
			"status": "EST",
			"quantities": [],
			"definitions": [
				"AdS_{d+1} is the hyperboloid embedded in R^{2,d} with radius L.",
				"Λ = -d(d-1)/(2 L^2) in mostly-plus signature conventions.",
				"The conformal boundary is a d-dimensional Lorentzian space (Einstein static universe, or Minkowski in Poincaré coordinates)."
			],
			"equations": [
				"R_μν - (1/2) R g_μν + Λ g_μν = 0",
				"Λ < 0",
				"ds^2_Poincare = (L^2/z^2) (dz^2 + η_ij dx^i dx^j)"
			],
			"assumptions": ["Einstein gravity with negative cosmological constant, or the corresponding vacuum of supergravity.", "No statement is made that the observed universe is asymptotically AdS."],
			"mechanism": "The Einstein equation with Λ < 0 admits a unique (up to isometry) maximally symmetric Lorentzian solution of negative curvature.",
			"evidence": [{
				"type": "theorem",
				"source": "Einstein equation with Λ < 0; embedding of AdS as a quadric",
				"confidence": 1
			}],
			"primary_sources": ["de Sitter (1917) contrasted; anti-de Sitter as the Λ < 0 cousin", "Hawking, Ellis, The large scale structure of space-time"],
			"predictions": [],
			"falsification_conditions": ["A demonstration that the Einstein equation with Λ < 0 does not admit this maximally symmetric solution — it does."],
			"confusion_guard": "AdS is a geometry. Observational cosmology has Λ > 0 (de Sitter-like). Do not transport AdS/CFT onto the night sky without a new dictionary.",
			"stop_reason": "",
			"tags": [
				"ads",
				"gravity",
				"negative curvature",
				"conformal boundary"
			],
			"verification_type": "mathematical_check",
			"claims_experimental_verification": false,
			"information_layer": "ACADEMIC",
			"version": "0.1.0",
			"scope": "Classical (super)gravity solutions with Λ < 0.",
			"scope_limits": "Not a cosmological model of our universe.",
			"key_concepts": [
				"negative cosmological constant",
				"conformal boundary",
				"Poincaré patch"
			],
			"related_theories": ["UPI<theories,1,holography,ads_cft>", "UPI<gravity,1,horizon,bekenstein_hawking_entropy>"],
			"address_parts": {
				"domain_code": "gravity",
				"generation": "1",
				"torus": "spacetime",
				"node_id": "anti_de_sitter"
			}
		},
		{
			"kind": "node",
			"slug": "upi-holography-1-duality-ads-cft",
			"file": "theories/ads_cft.json",
			"domain": "theories",
			"address": "UPI<holography,1,duality,ads_cft>",
			"title": "AdS/CFT correspondence",
			"description": "Maldacena's duality: quantum gravity in anti-de Sitter space is equivalent to a conformal field theory on the conformal boundary. Established as a dictionary for specific compactifications (AdS5×S5/N=4 SYM, AdS3/CFT2, AdS4×S7/ABJM). Not a model of our cosmology, which is closer to de Sitter.",
			"status": "EST",
			"quantities": [],
			"definitions": [
				"AdS is anti-de Sitter space: constant negative curvature, a timelike conformal boundary.",
				"CFT is a conformal field theory living on that boundary.",
				"The GKP/Witten dictionary maps bulk fields to CFT operators, and on-shell bulk action to CFT generating functional.",
				"Large N and strong 't Hooft coupling on the boundary correspond to classical supergravity in the bulk."
			],
			"equations": [
				"Z_gravity[φ_0] = < exp(∫ O φ_0) >_CFT",
				"L^4 / α'^2 = 4 π g_s N  (AdS5 × S5)",
				"c = 3 L / (2 G_N)  (Brown–Henneaux, AdS3)"
			],
			"assumptions": [
				"The bulk is asymptotically AdS (negative cosmological constant).",
				"A specific compactification and supersymmetric CFT are declared.",
				"The classical-geometry limit is large N, strong coupling."
			],
			"mechanism": "Open-string excitations on a stack of D3-branes (or M2/M5) are a gauge theory; the near-horizon geometry of the corresponding black brane is AdS times a sphere. Equating the two descriptions is the duality.",
			"evidence": [{
				"type": "theorem",
				"source": "Maldacena (1997); Gubser–Klebanov–Polyakov; Witten (1998)",
				"confidence": .95,
				"notes": "Extensive matching of spectra, correlators, anomalies, and entanglement entropy in supersymmetric examples. Not a laboratory test of our universe."
			}],
			"primary_sources": [
				"Maldacena, The Large N Limit of Superconformal Field Theories and Supergravity (1997)",
				"Gubser, Klebanov, Polyakov (1998)",
				"Witten, Anti-de Sitter space and holography (1998)"
			],
			"predictions": [
				"CFT correlators equal bulk Witten diagrams at the corresponding coupling.",
				"A thermal CFT state is dual to a bulk black hole.",
				"Entanglement of a boundary region equals the area of a bulk extremal surface (Ryu–Takayanagi)."
			],
			"falsification_conditions": ["A controlled calculation in a named AdS/CFT pair where a CFT observable disagrees with the bulk dual after known 1/N and α' corrections."],
			"confusion_guard": "AdS is not dS and not Minkowski. EST here means the duality is established for declared AdS compactifications. It does not make our sky holographic, and it does not assign Bekenstein–Hawking entropy to a lab frequency quantum.",
			"stop_reason": "",
			"tags": [
				"holography",
				"ads",
				"cft",
				"maldacena",
				"duality"
			],
			"verification_type": "theoretical_derivation",
			"claims_experimental_verification": false,
			"information_layer": "ACADEMIC",
			"version": "0.1.0",
			"scope": "String/M-theory compactifications with an AdS factor and a known CFT dual.",
			"scope_limits": "Not QCD, not the observed universe, not a photon of frequency f in the lab.",
			"key_concepts": [
				"holography",
				"large N",
				"conformal boundary",
				"dictionary"
			],
			"related_theories": [
				"UPI<holography,1,entropy,ryu_takayanagi>",
				"UPI<holography,1,m_theory,ads4_s7_abjm>",
				"UPI<theories,1,m_theory,eleven_d_brane>"
			],
			"address_parts": {
				"domain_code": "holography",
				"generation": "1",
				"torus": "duality",
				"node_id": "ads_cft"
			}
		},
		{
			"kind": "node",
			"slug": "upi-holography-1-entropy-ryu-takayanagi",
			"file": "theories/ryu_takayanagi.json",
			"domain": "theories",
			"address": "UPI<holography,1,entropy,ryu_takayanagi>",
			"title": "Ryu–Takayanagi entanglement entropy",
			"description": "In AdS/CFT the entanglement entropy of a boundary region A equals the area of a bulk extremal surface γ_A homologous to A, in Planck units. This is the in-domain holographic entropy: information on the boundary, area in the bulk. It is not the Schwarzschild area of a lab mass m_I.",
			"status": "EST",
			"quantities": [],
			"definitions": [
				"A is a spatial region on a boundary Cauchy slice.",
				"γ_A is a bulk surface of extremal area with ∂γ_A = ∂A, homologous to A.",
				"G_N is Newton's constant in the bulk.",
				"In AdS3/CFT2 this reduces to geodesic length and S = (c/3) ln((2/ε) sin(θ/2)) for an interval of opening angle θ."
			],
			"equations": [
				"S_A = Area(γ_A) / (4 G_N)",
				"S = (c/3) ln((2/ε) sin(θ/2))  (AdS3 interval)",
				"c = 3 L / (2 G_N)"
			],
			"assumptions": [
				"The bulk is Einstein gravity (leading large-N, strong coupling).",
				"The region A is on an AdS conformal boundary.",
				"Quantum corrections (FLM) and covariant HRT are declared if used."
			],
			"mechanism": "The replica trick in the CFT is dual to a bulk orbifold whose action, at leading order, is the area of a cosmic brane that becomes the extremal surface as n→1.",
			"evidence": [{
				"type": "theorem",
				"source": "Ryu, Takayanagi (2006); Lewkowycz, Maldacena (2013); Hubeny, Rangamani, Takayanagi (2007)",
				"confidence": .95,
				"notes": "Derived and checked against CFT2 exact results, higher-derivative corrections, and quantum corrections. Domain is AdS/CFT, not Minkowski lab."
			}],
			"primary_sources": [
				"Ryu, Takayanagi, Holographic derivation of entanglement entropy (2006)",
				"Hubeny, Rangamani, Takayanagi (2007), covariant HRT",
				"Lewkowycz, Maldacena (2013)"
			],
			"predictions": ["CFT2 interval entropy matches (c/3) ln sin, including the UV divergence.", "A black-hole horizon is the RT surface of the entire boundary in the thermal state."],
			"falsification_conditions": ["A named holographic pair whose CFT entanglement disagrees with Area(γ)/4G after known corrections."],
			"confusion_guard": "RT is the purest holographic entropy: entanglement = area. It requires an AdS bulk and a boundary region. Computing S_BH of m_I = h f / c² in Minkowski is a different formula, out of this domain.",
			"stop_reason": "",
			"tags": [
				"holography",
				"entanglement",
				"rt",
				"entropy",
				"area-law"
			],
			"verification_type": "theoretical_derivation",
			"claims_experimental_verification": false,
			"information_layer": "ACADEMIC",
			"version": "0.1.0",
			"scope": "Entanglement of boundary regions in AdS/CFT at leading large N.",
			"scope_limits": "Not Shannon entropy of a lab bit, not Landauer, not Schwarzschild of a frequency quantum.",
			"key_concepts": [
				"extremal surface",
				"entanglement wedge",
				"area law"
			],
			"related_theories": ["UPI<holography,1,duality,ads_cft>", "UPI<gravity,1,horizon,bekenstein_hawking_entropy>"],
			"address_parts": {
				"domain_code": "holography",
				"generation": "1",
				"torus": "entropy",
				"node_id": "ryu_takayanagi"
			}
		},
		{
			"kind": "node",
			"slug": "upi-holography-1-m-theory-ads4-s7-abjm",
			"file": "theories/ads4_s7_abjm.json",
			"domain": "theories",
			"address": "UPI<holography,1,m_theory,ads4_s7_abjm>",
			"title": "AdS4 × S7 / ABJM",
			"description": "The 11-dimensional instance of AdS/CFT: M-theory on AdS4 × S7 is dual to the ABJM 3d N=6 Chern–Simons-matter theory (M2-branes). This is how an 11D brane enters holography — as a named pair, not as a picture of the lab.",
			"status": "DER",
			"quantities": [],
			"definitions": [
				"AdS4 × S7 is the near-horizon geometry of a stack of N M2-branes.",
				"ABJM is U(N)×U(N) Chern–Simons theory at level k with bifundamental matter.",
				"The 't Hooft coupling is λ = N/k."
			],
			"equations": ["AdS4 × S7  ↔  ABJM_{N,k}", "R_{S7}^3 ~ N^{1/2} ℓ_P^3"],
			"assumptions": ["11D supergravity is the low-energy bulk.", "Large N, fixed λ, is the classical limit."],
			"mechanism": "A stack of M2-branes has a worldvolume CFT (ABJM) and a near-horizon AdS4 × S7. Equating them is the 11D case of Maldacena's duality.",
			"evidence": [{
				"type": "theorem",
				"source": "Aharony, Bergman, Jafferis, Maldacena (2008)",
				"confidence": .9,
				"notes": "Standard 11D holographic pair. Derived from AdS/CFT plus the M2-brane near-horizon geometry."
			}],
			"primary_sources": ["Aharony, Bergman, Jafferis, Maldacena, N=6 superconformal Chern–Simons-matter theories (2008)", "Witten (1995), M-theory"],
			"predictions": ["ABJM free energy on S3 scales as N^{3/2}, matching 11D on-shell action."],
			"falsification_conditions": ["A protected ABJM observable disagreeing with the 11D bulk after known corrections."],
			"confusion_guard": "This is the honest 11D station of holography: M2-branes, AdS4, ABJM. It does not identify those M2-branes with a frequency quantum in Minkowski space.",
			"stop_reason": "",
			"tags": [
				"abjm",
				"m2",
				"11d",
				"holography"
			],
			"verification_type": "theoretical_derivation",
			"claims_experimental_verification": false,
			"information_layer": "ACADEMIC",
			"version": "0.1.0",
			"scope": "M-theory on AdS4 × S7 and its ABJM dual.",
			"scope_limits": "Not a claim that the observed universe is AdS4 × S7.",
			"key_concepts": [
				"M2-brane",
				"ABJM",
				"N^{3/2}"
			],
			"related_theories": ["UPI<holography,1,duality,ads_cft>", "UPI<theories,1,m_theory,eleven_d_brane>"],
			"address_parts": {
				"domain_code": "holography",
				"generation": "1",
				"torus": "m_theory",
				"node_id": "ads4_s7_abjm"
			}
		},
		{
			"kind": "node",
			"slug": "upi-information-physics-1-inertia-frequency-mass-equivalent",
			"file": "information_physics/frequency_mass_equivalent.json",
			"domain": "information_physics",
			"address": "UPI<information_physics,1,inertia,frequency_mass_equivalent>",
			"title": "Mass equivalent of a frequency quantum",
			"description": "Compose the Planck–Einstein relation E = h f with the inertia of energy E = m c². The same kind of step Einstein took with Planck: a derived identification, not a new independent axiom. m here is the mass equivalent of energy h f — not photon rest mass, and not the rest mass of an arbitrary oscillator.",
			"status": "DER",
			"quantities": [],
			"definitions": [
				"E is the energy of a radiation quantum of frequency f (Planck–Einstein).",
				"h is the Planck constant (SI exact).",
				"c is the speed of light in vacuum (SI exact).",
				"m = E/c² is the inertial mass equivalent of that energy (Einstein 1905, inertia of energy).",
				"This m is not the invariant rest mass of a photon (which is zero) and is not the rest mass of a clock, molecule, or circuit whose kinematic frequency happens to be f."
			],
			"equations": [
				"E = h f",
				"E = m c^2",
				"m = h f / c^2"
			],
			"assumptions": [
				"The energy being converted is a quantum of electromagnetic radiation, or any energy that has been shown to carry inertia E/c².",
				"f is ordinary frequency in the inertial frame where E is evaluated.",
				"SI units. h and c take their exact SI values."
			],
			"mechanism": "Einstein (1905) showed that energy has inertia: a body that emits energy L loses mass L/c². Planck (1900) and Einstein (1905, light quantum) give E = h f for a radiation quantum. Substituting L = h f is the identical composition Einstein already licensed for any energy. The algebra is the same move as writing E = m c² from relativistic energy–momentum: derivation, then empirical scope.",
			"evidence": [
				{
					"type": "theorem",
					"source": "Einstein, Ist die Trägheit eines Körpers von seinem Energieinhalt abhängig? (1905): Δm = L/c²",
					"confidence": 1,
					"notes": "Establishes inertia of energy. Composition with E = h f is then algebra under that identification."
				},
				{
					"type": "experiment",
					"source": "Photoelectric effect, Compton scattering, pair production, nuclear binding (mass defect = E/c²)",
					"confidence": .99,
					"notes": "Supports E = h f and E = m c² separately. The composition inherits both scopes."
				},
				{
					"type": "calculation",
					"source": "UPI software utility m = h f / c² (CODATA/SI exact h and c)",
					"confidence": 1,
					"notes": "Software arithmetic, not a new measurement."
				}
			],
			"primary_sources": [
				"Planck (1900), black-body quantum of action",
				"Einstein, heuristic light-quantum paper (1905)",
				"Einstein, inertia of energy (1905)",
				"Einstein, Ist die Trägheit eines Körpers von seinem Energieinhalt abhängig? (1905)"
			],
			"predictions": [
				"A cavity mode of frequency f storing mean energy n h f contributes inertial mass n h f / c² to the cavity (including the radiation).",
				"Photon invariant mass remains 0; the energy-equivalent n h f / c² is not a rest mass.",
				"Replacing f by the kinematic frequency of a massive oscillator does not assign that oscillator a rest mass h f / c²."
			],
			"falsification_conditions": ["A reproducible measurement in which radiation energy h f does not contribute inertia h f / c² to a closed system.", "A photon rest-mass measurement significantly different from zero that is not absorbed by existing bounds."],
			"confusion_guard": "Derived does not mean dismissed. E = m c² is also derived. The live boundary is the referent of m: energy-equivalent of h f, never photon rest mass, never the rest mass of an object that merely oscillates at f. Naming this kilogram information mass m_I is a separate HYP (T€@X 2026).",
			"stop_reason": "",
			"tags": [
				"mass-energy",
				"planck",
				"einstein",
				"frequency",
				"derived",
				"inertia-of-energy"
			],
			"verification_type": "mathematical_check",
			"claims_experimental_verification": false,
			"information_layer": "ACADEMIC",
			"version": "0.1.0",
			"scope": "Inertial mass equivalent of a radiation quantum, and of any energy already known to gravitate/inert as E/c².",
			"scope_limits": "Does not promote 8 Hz to a constant, does not assign rest mass to photons, does not assign rest mass to arbitrary oscillators.",
			"key_concepts": [
				"inertia of energy",
				"Planck–Einstein relation",
				"mass equivalent",
				"invariant mass"
			],
			"related_theories": [
				"UPI<QUANTUM_MECHANICS,1,QUANTA,PLANCK_EINSTEIN_RELATION>",
				"UPI<RELATIVITY,1,T_ENERGY,N_MASS_ENERGY>",
				"UPI<physics,1,fundamental,planck_constant>",
				"UPI<information_physics,1,inertia,information_mass>"
			],
			"address_parts": {
				"domain_code": "information_physics",
				"generation": "1",
				"torus": "inertia",
				"node_id": "frequency_mass_equivalent"
			}
		},
		{
			"kind": "node",
			"slug": "upi-information-physics-1-inertia-information-mass",
			"file": "information_physics/information_mass.json",
			"domain": "information_physics",
			"address": "UPI<information_physics,1,inertia,information_mass>",
			"title": "Information mass",
			"description": "T€@X (2026) identification: when information is physically instantiated as a frequency quantum, its inertial mass is m_I = h f / c². This is a named reading of the derived mass equivalent, not a second formula and not a photon rest mass.",
			"status": "HYP",
			"quantities": [],
			"definitions": [
				"m_I is information mass: the inertial mass assigned to a physically encoded information carrier of frequency f.",
				"The working equation is the derived mass equivalent m = h f / c².",
				"A bit, qubit, or message has this mass only through the energy of its physical encoding, not as an abstract number.",
				"T€@X™ (2026) is the provenance of this identification — authorship, not a measurement."
			],
			"equations": [
				"m_I = h f / c^2",
				"E = h f",
				"m_I = E / c^2"
			],
			"assumptions": [
				"The information is encoded in (or as) a radiation quantum or mode of ordinary frequency f.",
				"The energy of that encoding is E = h f, or n h f for n quanta.",
				"Inertia of energy holds: that energy contributes m = E/c² to a closed system.",
				"No additional mass term beyond E/c² is introduced."
			],
			"mechanism": "Planck gave E = h f. Einstein gave inertia of energy, m = E/c². The derived composition is m = h f / c². The hypothesis is that this m, when the energy is a frequency-encoded carrier of information, is information mass m_I. Same kilogram, named referent. A static bit whose energy is not h f (for example a CMOS well at ~CV²/2, or a Landauer erasure at kT ln 2) is outside this encoding assumption.",
			"evidence": [{
				"type": "other",
				"source": "T€@X™ (2026), information-mass identification m_I = h f / c²",
				"confidence": .2,
				"notes": "Authorship of the named identification. Not experimental confirmation."
			}, {
				"type": "theorem",
				"source": "Derived mass equivalent of a frequency quantum (UPI DER record)",
				"confidence": 1,
				"notes": "Supports the kilogram. Does not by itself establish that the kilogram is 'of information'."
			}],
			"primary_sources": [
				"T€@X™ (2026), information mass m_I = h f / c²",
				"Planck (1900)",
				"Einstein, inertia of energy (1905)",
				"Einstein, light-quantum paper (1905)"
			],
			"predictions": [
				"N frequency-encoded quanta of frequency f in a closed cavity contribute inertial mass N h f / c² — identical to the energy-mass of the carriers.",
				"No surplus mass appears after the carrier energy is accounted for.",
				"A bit not encoded at energy h f does not weigh h f / c²."
			],
			"falsification_conditions": [
				"A closed system whose information content is varied at fixed energy shows a mass change attributed to information as a separate substance.",
				"m_I = h f / c² is applied to encodings whose energy is not h f and treated as confirmed.",
				"The identification is promoted to EST without a declared physical encoding and a mass measurement of that encoding."
			],
			"confusion_guard": "Information mass is a hypothesis about the referent of the derived kilogram m = h f / c². It is not photon rest mass (zero), not Landauer's kT ln 2 / c², not a fifth force, and not a dark-matter candidate by naming. T€@X™ is provenance. A trademark is not a measurement.",
			"stop_reason": "",
			"tags": [
				"information-mass",
				"teax",
				"frequency",
				"inertia-of-energy",
				"hypothesis"
			],
			"verification_type": "none",
			"claims_experimental_verification": false,
			"information_layer": "ACADEMIC",
			"version": "0.1.0",
			"scope": "Inertial mass of a frequency-encoded information carrier, numerically equal to the derived mass equivalent of its energy.",
			"scope_limits": "Does not assign rest mass to photons, to abstract bits, or to oscillators that merely tick at f. Does not replace Landauer's principle.",
			"key_concepts": [
				"information mass",
				"frequency encoding",
				"mass equivalent",
				"referent of m"
			],
			"related_theories": [
				"UPI<information_physics,1,inertia,frequency_mass_equivalent>",
				"UPI<QUANTUM_MECHANICS,1,QUANTA,PLANCK_EINSTEIN_RELATION>",
				"UPI<RELATIVITY,1,T_ENERGY,N_MASS_ENERGY>"
			],
			"address_parts": {
				"domain_code": "information_physics",
				"generation": "1",
				"torus": "inertia",
				"node_id": "information_mass"
			}
		},
		{
			"kind": "node",
			"slug": "upi-information-physics-1-landauer-bit-erasure",
			"file": "established/landauer_bit_erasure.json",
			"domain": "established",
			"address": "UPI<information_physics,1,landauer,bit_erasure>",
			"title": "Landauer’s principle for bit erasure",
			"description": "Erasing one bit of information in a physical computer at temperature T dissipates at least kT ln 2 of heat. This is a thermodynamic bound on logically irreversible operations, not a political slogan and not a local entropy reset.",
			"status": "EST",
			"quantities": [{
				"name": "landauer_bound",
				"value": 1,
				"unit": "kT ln 2 per bit"
			}],
			"definitions": [
				"k is Boltzmann’s constant.",
				"T is the temperature of the thermal bath.",
				"A logically irreversible operation reduces the number of logical states."
			],
			"equations": ["Q >= k T ln 2 per erased bit"],
			"assumptions": ["The memory is coupled to a thermal bath at T.", "The operation is logically irreversible."],
			"mechanism": "Landauer (1961): the phase-space volume of a bit that is reset must be dumped into the bath.",
			"evidence": [{
				"type": "experiment",
				"source": "Bérut et al. Nature 2012; Jun et al. PRL 2014",
				"confidence": .9
			}],
			"primary_sources": ["Landauer (1961) Irreversibility and heat generation in the computing process", "Bérut et al. (2012) Experimental verification of Landauer’s principle"],
			"predictions": ["A measured bit-reset at temperature T dissipates at least kT ln 2 on average."],
			"falsification_conditions": ["A reproducible logically irreversible bit reset below kT ln 2 after accounting for work and bath."],
			"confusion_guard": "Landauer bounds erasure heat. It does not license Ω^1766 local entropy reset, and it does not make information-mass a rest mass.",
			"stop_reason": "",
			"tags": [
				"landauer",
				"entropy",
				"information"
			],
			"verification_type": "theoretical_derivation",
			"claims_experimental_verification": false,
			"information_layer": "ACADEMIC",
			"version": "0.1.0",
			"scope": "Classical and quantum memories coupled to a thermal bath.",
			"scope_limits": "Does not apply to reversible computation that does not erase.",
			"key_concepts": [
				"bit erasure",
				"kT ln 2",
				"logical irreversibility"
			],
			"related_theories": ["UPI<thermodynamics,1,energy_entropy,first_second_laws>"],
			"address_parts": {
				"domain_code": "information_physics",
				"generation": "1",
				"torus": "landauer",
				"node_id": "bit_erasure"
			}
		},
		{
			"kind": "node",
			"slug": "upi-information-physics-1-measure-sub-planck-horizon",
			"file": "information_physics/sub_planck_horizon.json",
			"domain": "information_physics",
			"address": "UPI<information_physics,1,measure,sub_planck_horizon>",
			"title": "Sub-Planck horizon of a frequency quantum",
			"description": "For laboratory frequencies the Schwarzschild radius of m_I = h f / c² is far below ℓ_P. Geometric entropy is then being asked of a horizon that does not exist in the semiclassical theory. The loop STOPS at this station.",
			"status": "STOP",
			"quantities": [],
			"definitions": [
				"R_s = 2 G m_I / c².",
				"The semiclassical horizon requires R_s >> ℓ_P.",
				"At 8 Hz, R_s / ℓ_P is of order 10⁻⁴¹."
			],
			"equations": ["R_s(f) = 2 G h f / c^4", "STOP if R_s < ℓ_P"],
			"assumptions": ["m_I is the inertial mass equivalent of energy h f.", "The geometric station of the measure uses a Schwarzschild horizon of that mass."],
			"mechanism": "The algebra still returns a formal S/k. The physical identification with horizon entropy does not, because there is no semiclassical horizon.",
			"evidence": [{
				"type": "calculation",
				"source": "UPI software R_s(f) / ℓ_P for accessible f",
				"confidence": 1,
				"notes": "Dimensionally closed. Demonstrates the domain cut; does not invent a trans-Planckian horizon."
			}],
			"primary_sources": ["Bekenstein (1973); Hawking (1975) domain of semiclassical gravity"],
			"predictions": ["Every frequency in the audio-to-optical range yields R_s << ℓ_P."],
			"falsification_conditions": ["A controlled system with energy h f whose gravitational radius is measured to be macroscopic without additional concentration of energy."],
			"confusion_guard": "A formal number S/k printed for a sub-Planck R_s is software, not a black hole and not 'entropy in its purest form' of a lab bit. The purest gravitational entropy remains the in-domain area law.",
			"stop_reason": "R_s(m_I) << ℓ_P for laboratory frequencies. Smallest next observation: evaluate the geometric station only for a mass whose Schwarzschild radius is many Planck lengths, or replace that station with an in-domain entropy (e.g. Landauer k ln 2 per erased bit) and keep the statuses separate.",
			"tags": [
				"stop",
				"planck",
				"horizon",
				"measure"
			],
			"verification_type": "software_test",
			"claims_experimental_verification": false,
			"information_layer": "ACADEMIC",
			"version": "0.1.0",
			"scope": "Domain cut on the geometric station of the universal information measure.",
			"scope_limits": "Does not deny m_I; it denies using S_BH for a non-horizon.",
			"key_concepts": [
				"Planck length",
				"Schwarzschild radius",
				"domain"
			],
			"related_theories": ["UPI<information_physics,1,measure,universal_information_measure>", "UPI<gravity,1,horizon,bekenstein_hawking_entropy>"],
			"address_parts": {
				"domain_code": "information_physics",
				"generation": "1",
				"torus": "measure",
				"node_id": "sub_planck_horizon"
			}
		},
		{
			"kind": "node",
			"slug": "upi-information-physics-1-measure-universal-information-measure",
			"file": "information_physics/universal_information_measure.json",
			"domain": "information_physics",
			"address": "UPI<information_physics,1,measure,universal_information_measure>",
			"title": "Universal information measure",
			"description": "A proposed closed measure: every physical encoding with frequency f is assigned the number m_I = h f / c², dual to geometric entropy S = k A(m_I)/(4 ℓ_P²), dual to 11D brane degrees of freedom, returning to the encoding. That is what a measure is — a number on every measurable. The loop is HYP. The 11D closure is SYM. The geometric-entropy step STOPS when the Schwarzschild radius of m_I falls below ℓ_P.",
			"status": "HYP",
			"quantities": [],
			"definitions": [
				"A measure assigns a number to every admissible measurable.",
				"Here the number is m_I, or equivalently S/k constructed from m_I via a Schwarzschild area, under declared constants h, c, G.",
				"Closing the loop through an 11D brane is a dictionary between inertial mass-equivalent, horizon entropy, and worldvolume degrees of freedom.",
				"T€@X (2026) information mass is the inertial station of the loop."
			],
			"equations": [
				"m_I = h f / c^2",
				"R_s = 2 G m_I / c^2",
				"A = 4 pi R_s^2",
				"S/k = A / (4 ℓ_P^2)",
				"loop: f -> m_I -> S -> brane -> f"
			],
			"assumptions": [
				"The measurable is a frequency-encoded carrier (information-mass assumption).",
				"Geometric entropy is evaluated on the Schwarzschild horizon of that mass.",
				"That evaluation is only in-domain when R_s >> ℓ_P.",
				"The brane station is a duality dictionary, not a laboratory object."
			],
			"mechanism": "Planck and Einstein supply E and inertia. T€@X names the kilogram information mass. Bekenstein–Hawking supplies the area law. 11D M-theory supplies a candidate microstate substrate. Composing them yields a number for every f. Composition is not automatic promotion: G and ℓ_P are extra constants, and lab frequencies give R_s << ℓ_P.",
			"evidence": [{
				"type": "calculation",
				"source": "UPI software: m_I, R_s, S/k from f with SI constants",
				"confidence": 1,
				"notes": "Software arithmetic for the numbers. Does not establish the physical loop."
			}, {
				"type": "other",
				"source": "T€@X™ (2026), information mass as the inertial station of a closed measure",
				"confidence": .2,
				"notes": "Authorship of the identification. Not a measurement of 11D branes or of sub-Planck horizons."
			}],
			"primary_sources": [
				"T€@X™ (2026), information mass m_I = h f / c²",
				"Bekenstein (1973); Hawking (1975)",
				"Witten (1995), M-theory"
			],
			"predictions": [
				"Given f, the software returns a unique (E, m_I, R_s, S/k) from declared constants.",
				"For all laboratory frequencies, R_s(m_I) << ℓ_P, so the geometric-entropy station is out of domain.",
				"No surplus mass beyond E/c² appears when information content is varied at fixed energy."
			],
			"falsification_conditions": [
				"A unique, parameter-free continuation of the loop below ℓ_P that disagrees with a preregistered Planck-scale observable.",
				"A brane dictionary that predicts a laboratory mass excess not equal to E/c².",
				"Promotion of the loop to EST without an in-domain horizon (R_s >> ℓ_P) or an independent brane observable."
			],
			"confusion_guard": "A closed dictionary that numbers every measurable is a measure — that is the right word. It is not automatically a law of nature. Entropy in its gravitational form is the area law, in-domain only for horizons. 11D branes are SYM as ontology. Sub-Planck R_s STOPS the geometric station. Same kilogram as m = h f / c²; extra claim is the closure and the universality.",
			"stop_reason": "",
			"tags": [
				"measure",
				"information-mass",
				"entropy",
				"brane",
				"loop",
				"teax"
			],
			"verification_type": "software_test",
			"claims_experimental_verification": false,
			"information_layer": "ACADEMIC",
			"version": "0.1.0",
			"scope": "Number assignment (E, m_I, R_s, S/k) to a frequency-encoded carrier, with declared domain cuts.",
			"scope_limits": "Does not claim laboratory photons are black holes, that spacetime is an 11-brane, or that Shannon entropy equals S_BH for a single quantum.",
			"key_concepts": [
				"measure",
				"closed loop",
				"information mass",
				"horizon entropy",
				"11D brane"
			],
			"related_theories": [
				"UPI<information_physics,1,inertia,information_mass>",
				"UPI<gravity,1,horizon,bekenstein_hawking_entropy>",
				"UPI<theories,1,m_theory,eleven_d_brane>",
				"UPI<information_physics,1,measure,sub_planck_horizon>",
				"UPI<holography,1,duality,ads_cft>"
			],
			"address_parts": {
				"domain_code": "information_physics",
				"generation": "1",
				"torus": "measure",
				"node_id": "universal_information_measure"
			}
		},
		{
			"kind": "node",
			"slug": "upi-information-physics-3-qudit-torus-digital-multi-state-search",
			"file": "information_physics/digital_qudit_torus_search.json",
			"domain": "information_physics",
			"address": "UPI<information_physics,3,qudit_torus,digital_multi_state_search>",
			"title": "Digital multi-torus qudit search simulator",
			"description": "A classical state-vector implementation of finite-dimensional qudits, local Fourier duality, phase oracles, diffusion and amplitude amplification. Each declared torus is a cyclic mixed-radix coordinate with d basis states, allowing registers with more than three states per search axis. The implementation is software and does not claim quantum hardware or speedup.",
			"status": "DER",
			"quantities": [],
			"definitions": [
				"A qudit is a finite-dimensional quantum information carrier with local Hilbert-space dimension d >= 2.",
				"A software torus is one cyclic coordinate j in Z_d; the term torus describes modular register topology and is not a claim that the hardware has a physical toroidal shape.",
				"A register with torus dimensions d_1 through d_n has N = product_i d_i computational basis states.",
				"alpha_x is the complex amplitude of basis state x and p_x = |alpha_x|^2 is its ideal measurement probability.",
				"The computational basis and Fourier basis are dual representations connected by the normalized discrete Fourier transform.",
				"M is the number of marked states and r is the number of amplitude-amplification iterations.",
				"The stage trace records initialization, one forward Fourier stage per torus, one inverse stage per torus, oracle and diffusion stages, and ranked readout."
			],
			"equations": [
				"H = tensor_i C^(d_i)",
				"N = product_i d_i",
				"|psi> = sum_(x=0)^(N-1) alpha_x |x>",
				"sum_x |alpha_x|^2 = 1",
				"X_d |j> = |(j + 1) mod d>",
				"Z_d |j> = omega_d^j |j>, where omega_d = exp(2 pi i / d)",
				"F_d |j> = (1/sqrt(d)) sum_(k=0)^(d-1) omega_d^(j k) |k>",
				"F_d^(-1) F_d = I_d",
				"O_f |x> = (-1)^(f(x)) |x>",
				"|s> = (1/sqrt(N)) sum_x |x>",
				"D = 2 |s><s| - I",
				"theta = asin(sqrt(M/N))",
				"P_success(r) = sin^2((2 r + 1) theta)",
				"r_opt approximately round(pi/(4 theta) - 1/2)",
				"epsilon_dual = max_x |alpha_x - alpha_hat_x|"
			],
			"assumptions": [
				"The simulator uses ideal complex amplitudes and exact declared dimensions without decoherence, gate noise, leakage or readout error.",
				"The number of marked states is known when the automatic iteration count is selected.",
				"The phase oracle is supplied as a list of marked basis indices.",
				"Every state-vector operation is executed classically with storage proportional to N.",
				"Mixed-radix coordinates are ordered deterministically and mapped bijectively to flattened basis indices."
			],
			"mechanism": "The register begins in a uniform state. Each torus is transformed to its Fourier-dual basis and inversely reconstructed to verify the duality invariant. A phase oracle flips marked amplitudes, and the diffusion operator reflects all amplitudes around their mean. Repetition amplifies marked-state probability before deterministic ranking of the simulated measurement distribution.",
			"evidence": [
				{
					"type": "calculation",
					"source": "Lov K. Grover, A fast quantum mechanical algorithm for database search, arXiv:quant-ph/9605043 (1996)",
					"notes": "Primary source for phase-based quantum search and square-root query scaling on quantum hardware."
				},
				{
					"type": "calculation",
					"source": "A. Muthukrishnan and C. R. Stroud Jr., Multivalued logic gates for quantum computation, Physical Review A 62, 052309 (2000)",
					"notes": "Primary source for multivalued quantum logic on d-level systems."
				},
				{
					"type": "calculation",
					"source": "UPI deterministic regression suite for generalized gates, Fourier inversion, sparse local transforms, coordinate bijection and amplitude amplification",
					"notes": "Software tests verify the implementation, not experimental quantum behavior."
				}
			],
			"primary_sources": ["https://arxiv.org/abs/quant-ph/9605043", "https://doi.org/10.1103/PhysRevA.62.052309"],
			"predictions": [
				"Every accepted gate and Fourier transform preserves total probability within declared numerical tolerance.",
				"Applying each local Fourier transform followed by the corresponding inverse reconstructs the input state with epsilon_dual near floating-point precision.",
				"For N = 20, M = 1 and r = 3 ideal iterations, the marked-state probability exceeds 0.99.",
				"Coordinate-to-index and index-to-coordinate maps are exact inverses for every state in the declared mixed-radix register.",
				"The search trace contains more than three stages whenever the register is accepted."
			],
			"falsification_conditions": [
				"Reject the implementation if a valid gate changes total probability beyond numerical tolerance.",
				"Reject local duality if inverse Fourier reconstruction exceeds the declared error tolerance for a normalized finite input.",
				"Reject the search implementation if its marked-state probability disagrees with the analytic amplitude-amplification model beyond numerical tolerance.",
				"Reject the register map if any two coordinates map to the same flattened index or if round-trip conversion fails.",
				"Do not claim quantum acceleration unless the same operations are executed on independently verified quantum hardware with an appropriate resource comparison."
			],
			"confusion_guard": "This is a classical digital simulator of qudit mathematics. More than three basis states and complex amplitudes do not by themselves create physical superposition, entanglement, quantum coherence or Grover speedup. The torus label is a cyclic indexing architecture, not new quantum physics.",
			"stop_reason": "",
			"tags": [
				"qudit",
				"multi-state",
				"mixed-radix",
				"quantum-fourier-transform",
				"amplitude-amplification",
				"grover-search",
				"classical-simulator",
				"torus-register"
			],
			"verification_type": "software_test",
			"claims_experimental_verification": false,
			"information_layer": "ACADEMIC",
			"version": "0.1.0",
			"scope": "",
			"scope_limits": "",
			"key_concepts": [],
			"related_theories": [],
			"address_parts": {
				"domain_code": "information_physics",
				"generation": "3",
				"torus": "qudit_torus",
				"node_id": "digital_multi_state_search"
			}
		},
		{
			"kind": "node",
			"slug": "upi-information-physics-6-duality-dual-observer-trace",
			"file": "information_physics/dual_observer_trace.json",
			"domain": "information_physics",
			"address": "UPI<information_physics,6,duality,dual_observer_trace>",
			"title": "Dual-observer trace and invariant mapping",
			"description": "A traceable model connecting two observer-dependent representations through a translation operator, a preserved invariant, forward generation, backward reconstruction, conflict scoring, and evidence-sensitive status control. The implemented physical reference profile uses 1+1 dimensional Lorentz transformations.",
			"status": "DER",
			"quantities": [
				{
					"name": "example_beta",
					"value": .6,
					"unit": "1",
					"reference": "Relative speed v/c in the worked example"
				},
				{
					"name": "example_gamma",
					"value": 1.25,
					"unit": "1",
					"reference": "Lorentz factor for beta = 0.6"
				},
				{
					"name": "example_omega_A",
					"value": 269502.0714947271,
					"unit": "m^2",
					"reference": "Minkowski interval for t_A = 2 microseconds and x_A = 300 m"
				},
				{
					"name": "example_R0_TIR_clean",
					"value": 21175823681357506e-29,
					"unit": "1",
					"reference": "Numerical round-trip result with 1 ns and 0.1 m tolerances"
				},
				{
					"name": "example_R0_TIR_biased",
					"value": 1,
					"unit": "1",
					"reference": "Result after adding 2 ns and 0.25 m to observer B"
				}
			],
			"definitions": [
				"X_A and X_B are local observer or model representations.",
				"D_A_to_B translates representation A into representation B.",
				"Omega is the invariant required to survive translation and verification.",
				"For the Lorentz profile, Omega = c^2 t^2 - x^2 is the Minkowski interval in m^2.",
				"R0_TIR is a dimensionless trace-integrity conflict ratio.",
				"r0_S is the time derivative of R0_TIR with unit s^-1."
			],
			"equations": [
				"X_B = D_A_to_B(X_A)",
				"gamma = 1/sqrt(1-beta^2)",
				"t_B = gamma*(t_A - v*x_A/c^2)",
				"x_B = gamma*(x_A - v*t_A)",
				"Omega = c^2*t^2 - x^2",
				"Omega_A = Omega_B",
				"X_(z+1) = F_z(X_z, D_z, C_z)",
				"Xhat_z = B_z(X_(z+1), D_z, C_z)",
				"epsilon_z = d(X_z, Xhat_z)",
				"R0_TIR = (1/N) * sum_z min(1, abs(epsilon_z)/tau_z)",
				"r0_S = d(R0_TIR)/dt",
				"I(A;B) = H(A) + H(B) - H(A,B)"
			],
			"assumptions": [
				"The physical implementation is restricted to inertial observers in 1+1 dimensional special relativity.",
				"The relative speed satisfies abs(v) < c.",
				"A discrepancy metric and positive tolerance are explicitly declared for every compared component.",
				"Every derivation step records inputs, conditions, units, and uncertainty.",
				"Agreement of invariants does not by itself establish a new physical mechanism.",
				"The 8 Hz clock, when used elsewhere, is an implementation choice rather than a universal constant."
			],
			"mechanism": "A Lorentz forward trace predicts observer B's event from observer A. A backward Lorentz trace reconstructs observer A from the observed B event. The Minkowski interval is checked independently, and reconstruction residuals are normalized by declared measurement tolerances to calculate R0_TIR.",
			"evidence": [{
				"type": "calculation",
				"source": "Established Lorentz transformations, Minkowski invariance, dimensional analysis, and deterministic UPI software tests",
				"confidence": .9,
				"notes": "Supports the mathematical and software framework. R0_TIR remains an audit metric, not an experimentally established new law of nature."
			}],
			"primary_sources": [],
			"predictions": [
				"For an exact Lorentz mapping and finite floating-point arithmetic, Omega drift and R0_TIR should remain near numerical precision.",
				"For fixed tolerances, injected observer-B measurement errors should monotonically increase one or more clipped R0_TIR components until saturation.",
				"A physical extension beyond special relativity must identify a preregistered numerical observable that differs from competing models."
			],
			"falsification_conditions": [
				"The exact backward Lorentz trace cannot reproduce observer A within declared numerical tolerances.",
				"The Minkowski interval changes under an exact Lorentz mapping beyond declared numerical tolerance.",
				"Independent implementations do not recover the same R0_TIR from the same inputs and tolerances.",
				"A proposed physical extension fails its preregistered discriminating experiment."
			],
			"confusion_guard": "Lorentz invariance is established physics. Internal consistency, software tests, a low R0_TIR, or a preserved invariant do not by themselves prove a new law of nature.",
			"stop_reason": "",
			"tags": [
				"information-physics",
				"duality",
				"observer",
				"lorentz-transform",
				"minkowski-invariant",
				"traceability",
				"r0"
			],
			"verification_type": "mathematical_check",
			"claims_experimental_verification": false,
			"information_layer": "ACADEMIC",
			"version": "0.2.0",
			"scope": "",
			"scope_limits": "",
			"key_concepts": [],
			"related_theories": [],
			"address_parts": {
				"domain_code": "information_physics",
				"generation": "6",
				"torus": "duality",
				"node_id": "dual_observer_trace"
			}
		},
		{
			"kind": "node",
			"slug": "upi-information-physics-7-dark-sector-information-bridge",
			"file": "information_physics/information_dark_sector_bridge.json",
			"domain": "information_physics",
			"address": "UPI<information_physics,7,dark_sector,information_bridge>",
			"title": "Information-to-dark-sector bridge candidate",
			"description": "Research hypothesis testing whether declared information or horizon inputs can non-circularly constrain a shift-symmetric P(X) effective field model with dark-matter-like and acceleration-like regimes. This is not established physics.",
			"status": "HYP",
			"quantities": [],
			"definitions": [
				"Candidate field sector: a shift-symmetric effective theory described by P(X).",
				"Target parameters: rho_0, X_0, and P_2.",
				"Target bridge: (S_A, l_P, H, ...) -> (rho_0, X_0, P_2).",
				"STOPP memory means failed assumptions and branches remain available as negative audit information."
			],
			"equations": [
				"E = h*f",
				"E = m*c^2",
				"S_BH = k_B*A/(4*l_P^2)",
				"P(X) = -rho_0 + P_2*(X-X_0)^2"
			],
			"assumptions": [
				"Established equations are used only inside their established domains.",
				"The P(X) dark-sector interpretation is hypothetical.",
				"Observed dark-energy density must not be inserted as an input and then reported as a prediction.",
				"Misner-Sharp or horizon energy must not be counted as an independent energy contribution when it is already the geometric representation of total bulk energy.",
				"Symbolic architecture does not constitute physical evidence."
			],
			"mechanism": "Attempt to constrain the P(X) parameters from declared information and geometric inputs, then reject the bridge if dimensional, stability, background, BBN, CMB, growth, or energy-accounting tests fail.",
			"evidence": [{
				"type": "calculation",
				"source": "Established Planck energy-frequency relation, mass-energy equivalence, Bekenstein-Hawking area entropy, and explicit algebraic consistency checks",
				"confidence": .45,
				"notes": "These inputs support only the stated established equations and bookkeeping constraints. They do not establish the proposed dark-sector bridge."
			}],
			"primary_sources": [],
			"predictions": [
				"A successful bridge must determine rho_0, X_0, and P_2 without importing the target cosmological density as an input.",
				"The claimed matter-like regime must have stable perturbations and observationally acceptable effective sound speed.",
				"The same declared parameter set must pass BBN, CMB, and structure-growth checks without post-hoc retuning."
			],
			"falsification_conditions": [
				"A required parameter is obtained only by inserting the target cosmological density that is claimed as an output.",
				"The construction double-counts Misner-Sharp or horizon energy.",
				"The claimed physical regime develops a ghost or gradient instability.",
				"The predicted background, BBN, CMB, sound-speed, or growth behavior contradicts preregistered constraints.",
				"A symbolic or metaphorical mapping is required as evidence for the physical mechanism."
			],
			"confusion_guard": "EST equations remain EST only in their established domains. Their combination does not promote this HYP node. SYM metaphors, simulations, matching scales, or successful software checks do not establish a new physical law.",
			"stop_reason": "",
			"tags": [
				"information-physics",
				"dark-sector",
				"cosmology",
				"k-essence",
				"P(X)",
				"hypothesis",
				"audit",
				"boundary"
			],
			"verification_type": "none",
			"claims_experimental_verification": false,
			"information_layer": "ACADEMIC",
			"version": "0.2.0",
			"scope": "",
			"scope_limits": "",
			"key_concepts": [],
			"related_theories": [],
			"address_parts": {
				"domain_code": "information_physics",
				"generation": "7",
				"torus": "dark_sector",
				"node_id": "information_bridge"
			}
		},
		{
			"kind": "node",
			"slug": "upi-open-problems-1-corpus-indaleko-160tb-payload",
			"file": "open-problems/indaleko_160tb_payload_stop.json",
			"domain": "open-problems",
			"address": "UPI<open-problems,1,corpus,indaleko_160tb_payload>",
			"title": "Indaleko abstract payload 160 TB is not the body used figure",
			"description": "Audit STOP for arXiv:2602.20507. The abstract claims a 31-million file dataset spanning 160TB across eight storage platforms. Chapters 5–6 report 31.9 million files, 35.1 TB capacity, 16.2 TB used, and 78.6 GB of ArangoDB metadata. The two number sets are not identified as the same quantity.",
			"status": "STOP",
			"quantities": [
				{
					"name": "abstract payload",
					"value": 0x9184e72a0000,
					"unit": "B",
					"reference": "arXiv:2602.20507 abstract"
				},
				{
					"name": "body used",
					"value": 0xebbdb3ed000,
					"unit": "B",
					"reference": "arXiv:2602.20507 ch. 5/6"
				},
				{
					"name": "index overhead",
					"value": 786e8,
					"unit": "B",
					"reference": "ArangoDB 78.6 GB"
				}
			],
			"definitions": [
				"Abstract payload: 160 TB, 31 million files, eight storage platforms.",
				"Body used: 16.2 TB of 35.1 TB capacity, 31.9 million files and directories.",
				"Index: 78.6 GB of metadata, not file blobs."
			],
			"equations": ["log10(160e12) - log10(16.2e12) ≈ 0.995", "78.6e9 / 16.2e12 ≈ 0.00485"],
			"assumptions": ["TB means decimal 10^12 bytes as written in the dissertation.", "The body figures refer to the machines actually indexed."],
			"mechanism": "Leave the payload claim STOP until a counting rule names 160 TB as raw, replicated, provisioned, logical, or a leftover draft.",
			"evidence": [{
				"type": "source",
				"source": "https://arxiv.org/abs/2602.20507",
				"notes": "Abstract vs body corpus figures."
			}],
			"primary_sources": ["https://arxiv.org/abs/2602.20507", "https://github.com/ubc-systopia/Indaleko"],
			"predictions": ["If 160 TB is provisioned or replicated capacity, the body 35.1 TB / 16.2 TB used remain the measured figures.", "If 160 TB is a draft leftover, the abstract should be corrected to the body numbers."],
			"falsification_conditions": [
				"A corrigendum or v2 abstract equates 160 TB with a named body figure.",
				"The author lists the eight platforms and the byte identity of 160 TB.",
				"A measured inventory sums to 160 TB under a declared counting rule."
			],
			"confusion_guard": "This STOP is a corpus-size identity in a personal-file dissertation, not a physics result. Indaleko's UPI is the Unified Personal Index, not this Universal Physics Index. Do not ingest the files.",
			"stop_reason": "Abstract 160 TB and body 16.2 TB used differ by about 10×. Until the author states what 160 TB counts (raw, replicated, provisioned, logical, or a leftover draft), the payload claim stays STOP.",
			"tags": [
				"open-problem",
				"indaleko",
				"corpus",
				"STOP",
				"audit",
				"160TB"
			],
			"verification_type": "software_test",
			"claims_experimental_verification": false,
			"information_layer": "ACADEMIC",
			"version": "0.1.0",
			"scope": "source-fact",
			"scope_limits": "Does not ingest personal files or treat Indaleko retrieval as physics.",
			"key_concepts": ["corpus identity", "metadata vs payload"],
			"related_theories": [],
			"address_parts": {
				"domain_code": "open-problems",
				"generation": "1",
				"torus": "corpus",
				"node_id": "indaleko_160tb_payload"
			}
		},
		{
			"kind": "node",
			"slug": "upi-open-problems-1-sm-loop-hf-c2",
			"file": "open-problems/sm_loop_hf_c2_stop.json",
			"domain": "open-problems",
			"address": "UPI<open-problems,1,sm,loop_hf_c2>",
			"title": "m = hf/c² does not close the Standard Model",
			"description": "A public X claim that the photon rewrite closes the Standard Model. CKM, the Higgs vacuum expectation, and three generations are not generated by m=hf/c². STOP until a residual to a measured SM parameter exists.",
			"status": "STOP",
			"quantities": [],
			"definitions": ["The Standard Model is the SU(3)×SU(2)×U(1) gauge theory with a Higgs doublet and three fermion generations."],
			"equations": ["m = h f / c^2"],
			"assumptions": ["The rewrite is the Planck–Einstein plus mass–energy identity for a frequency quantum."],
			"mechanism": "No mechanism is given that produces a measured SM parameter from the rewrite.",
			"evidence": [{
				"type": "other",
				"source": "https://x.com/DrPepper_se/status/2094906557230207432",
				"notes": "Public post. Critique: RecursiveRRS on X."
			}],
			"primary_sources": ["X post 2094906557230207432", "Particle Data Group Review of Particle Physics"],
			"predictions": [],
			"falsification_conditions": ["A derivation from m=hf/c² to a measured SM parameter with published residuals, or withdrawal of the identity."],
			"confusion_guard": "m=hf/c² is DER for a photon equivalent mass. Closing the SM is a different claim.",
			"stop_reason": "No counting rule maps the rewrite onto CKM, Higgs vev, or generation count.",
			"tags": [
				"standard-model",
				"stop",
				"x-feed"
			],
			"verification_type": "none",
			"claims_experimental_verification": false,
			"information_layer": "ACADEMIC",
			"version": "0.1.0",
			"scope": "Public X claim mapped into the open-problems torus.",
			"scope_limits": "Does not demote the DER photon rewrite.",
			"key_concepts": [
				"Standard Model",
				"STOP",
				"rewrite"
			],
			"related_theories": ["UPI<information_physics,1,inertia,frequency_mass_equivalent>"],
			"address_parts": {
				"domain_code": "open-problems",
				"generation": "1",
				"torus": "sm",
				"node_id": "loop_hf_c2"
			}
		},
		{
			"kind": "node",
			"slug": "upi-open-problems-201-dark-sector-parameter-map-stop",
			"file": "open-problems/information_dark_sector_parameter_map_stop.json",
			"domain": "open-problems",
			"address": "UPI<open-problems,201,dark_sector,parameter_map_stop>",
			"title": "LOOP 201: unresolved information-to-P(X) parameter map",
			"description": "Audit STOP for the current dark-sector bridge: no non-circular derivation has yet fixed rho_0, X_0, and P_2 from information or horizon inputs while preserving correct bulk/horizon energy accounting.",
			"status": "STOP",
			"quantities": [],
			"definitions": ["Target map: (S_A, l_P, H, ...) -> (rho_0, X_0, P_2).", "A valid solution must add predictive restriction beyond treating rho_0, X_0, and P_2 as free phenomenological parameters."],
			"equations": [
				"P(X) = -rho_0 + P_2*(X-X_0)^2",
				"S_A = k_B*A/(4*l_P^2)",
				"E_MS = c^4*R_A/(2*G) on the apparent horizon in the declared GR setting"
			],
			"assumptions": [
				"The apparent-horizon Misner-Sharp energy is treated as the geometric representation of total bulk energy, not an additional dark-energy component.",
				"No observed target density may be inserted and relabeled as a derived prediction.",
				"Any proposed information map must remain dimensionally valid and independently testable."
			],
			"mechanism": "Search for a non-circular relation that maps declared information/geometric quantities to the P(X) parameter set, then propagate the resulting fixed parameters through stability, BBN, CMB, and structure-growth tests.",
			"evidence": [],
			"primary_sources": [],
			"predictions": ["If a valid map exists, the resulting fixed parameter set should predict at least one cosmological observable not used to construct the map.", "If every dimensionally valid map requires a free scale or the observed dark-energy density, the current bridge remains stopped."],
			"falsification_conditions": [
				"A proposed parameter map is algebraically circular.",
				"A proposed map double-counts horizon and bulk energy.",
				"The resulting fixed parameters fail stability or cosmological observational tests.",
				"No independent discriminating observable follows from the proposed restriction."
			],
			"confusion_guard": "This STOP node records a missing derivation, not evidence against all information-based dark-sector models. It also does not promote symbolic architecture or dimensional coincidence to physical evidence.",
			"stop_reason": "The current chain does not uniquely derive rho_0, X_0, and P_2 from S_A, l_P, H, or other declared established inputs without either an additional free physical scale, observational target leakage, or prohibited double counting of horizon energy. Smallest next observation: produce one explicit dimensionally closed candidate map with all constants declared, then run the preregistered stability and cosmology gates.",
			"tags": [
				"open-problem",
				"dark-sector",
				"information-physics",
				"P(X)",
				"LOOP-201",
				"STOP",
				"audit"
			],
			"verification_type": "none",
			"claims_experimental_verification": false,
			"information_layer": "ACADEMIC",
			"version": "0.1.0",
			"scope": "",
			"scope_limits": "",
			"key_concepts": [],
			"related_theories": [],
			"address_parts": {
				"domain_code": "open-problems",
				"generation": "201",
				"torus": "dark_sector",
				"node_id": "parameter_map_stop"
			}
		},
		{
			"kind": "node",
			"slug": "upi-physics-1-classical-newtonian-mechanics",
			"file": "theories/newtonian.json",
			"domain": "theories",
			"address": "UPI<physics,1,classical,newtonian_mechanics>",
			"title": "Newtonian Mechanics",
			"description": "Classical mechanics based on Newton's laws of motion and universal gravitation. Applies to macroscopic objects at non-relativistic speeds.",
			"status": "EST",
			"quantities": [],
			"definitions": [],
			"equations": [
				"F = ma  (Second Law)",
				"F = G(m₁m₂)/r²  (Gravitation)",
				"p = mv  (Momentum)",
				"E_k = ½mv²  (Kinetic energy)",
				"W = F·d  (Work)"
			],
			"assumptions": [],
			"mechanism": "",
			"evidence": [],
			"primary_sources": [],
			"predictions": [],
			"falsification_conditions": [],
			"confusion_guard": "",
			"stop_reason": "",
			"tags": [],
			"verification_type": "",
			"claims_experimental_verification": false,
			"information_layer": "",
			"version": "0.1.0",
			"scope": "classical, macroscopic, non-relativistic",
			"scope_limits": "Breaks down at relativistic speeds (v ~ c) and quantum scales (ℏ effects). Gravitation treated as instantaneous action at a distance.",
			"key_concepts": [
				"Force (F)",
				"Mass (m)",
				"Acceleration (a)",
				"Momentum (p = mv)",
				"Energy (kinetic, potential)",
				"Work",
				"Power"
			],
			"related_theories": [
				"UPI<physics,1,relativistic,special_relativity>",
				"UPI<physics,1,relativistic,general_relativity>",
				"UPI<physics,1,quantum,quantum_mechanics>"
			],
			"address_parts": {
				"domain_code": "physics",
				"generation": "1",
				"torus": "classical",
				"node_id": "newtonian_mechanics"
			}
		},
		{
			"kind": "node",
			"slug": "upi-physics-1-fundamental-planck-constant",
			"file": "constants/planck.json",
			"domain": "constants",
			"address": "UPI<physics,1,fundamental,planck_constant>",
			"title": "Planck Constant",
			"description": "Fundamental quantum constant relating energy and frequency. h = 6.62607015×10⁻³⁴ J·s (exact by 2019 SI definition).",
			"status": "EST",
			"quantities": [{
				"name": "h",
				"value": 662607015e-42,
				"unit": "J·s",
				"reference": "2019 SI exact definition"
			}],
			"definitions": [
				"Relates energy to frequency: E = hf",
				"Defines quantum of action in quantum mechanics",
				"Fundamental constant of nature"
			],
			"equations": ["E = h × f", "E = ℏ × ω  (where ℏ = h/2π)"],
			"assumptions": ["Quantum mechanics is applicable", "Frequency is measured in Hertz"],
			"mechanism": "Quantum emission and absorption of electromagnetic radiation",
			"evidence": [],
			"primary_sources": ["NIST SI 2019 constants", "CODATA 2018 recommended values"],
			"predictions": [
				"Photoelectric effect: K.E. = hf - φ",
				"Black body radiation spectrum",
				"Quantized energy levels in atoms"
			],
			"falsification_conditions": ["Measured Planck constant differs from defined value", "Energy-frequency relation violates E = hf in controlled experiment"],
			"confusion_guard": "",
			"stop_reason": "",
			"tags": [
				"quantum",
				"fundamental",
				"constant",
				"SI"
			],
			"verification_type": "",
			"claims_experimental_verification": false,
			"information_layer": "",
			"version": "0.1.0",
			"scope": "",
			"scope_limits": "",
			"key_concepts": [],
			"related_theories": [],
			"address_parts": {
				"domain_code": "physics",
				"generation": "1",
				"torus": "fundamental",
				"node_id": "planck_constant"
			}
		},
		{
			"kind": "node",
			"slug": "upi-physics-1-open-problem-dark-matter",
			"file": "open-problems/dark_matter.json",
			"domain": "open-problems",
			"address": "UPI<physics,1,open-problem,dark_matter>",
			"title": "Dark Matter",
			"description": "Unseen matter comprising ~85% of matter in the universe. Inferred from gravitational effects on galaxies and large-scale structure.",
			"status": "STOP",
			"quantities": [{
				"name": "Matter density parameter (Ω_DM)",
				"value": .27,
				"unit": "unitless",
				"reference": "Planck 2018"
			}],
			"definitions": ["Non-luminous matter inferred from gravitational effects", "Comprises ~85% of matter in observable universe"],
			"equations": [],
			"assumptions": [
				"General relativity describes gravity correctly",
				"Dark matter is particle-like",
				"No exotic equation of state"
			],
			"mechanism": "TBD: Unknown particle or field responsible for gravitational effects",
			"evidence": [],
			"primary_sources": [
				"Planck Collaboration papers",
				"Dark Energy Survey",
				"LUX and XENON dark matter experiments"
			],
			"predictions": [
				"Direct detection signal in underground detectors",
				"Anomalies in collider experiments",
				"Gravitational lensing signatures"
			],
			"falsification_conditions": [
				"Consistent detection of dark matter particle",
				"Alternative theory (MOND) validated in all regimes",
				"Universe's gravitational structure explained without dark matter"
			],
			"confusion_guard": "Dark matter is not antimatter, dark energy, or ordinary matter in unknown form. These are three distinct phenomena.",
			"stop_reason": "Composition unknown. Particle candidates (WIMPs, axions, sterile neutrinos) undetected. Direct detection experiments remain inconclusive. Alternative theories (MOND, TeVeS) not universally accepted.",
			"tags": [
				"cosmology",
				"particle-physics",
				"open-problem",
				"observational-evidence"
			],
			"verification_type": "",
			"claims_experimental_verification": false,
			"information_layer": "",
			"version": "0.1.0",
			"scope": "",
			"scope_limits": "",
			"key_concepts": [],
			"related_theories": [],
			"address_parts": {
				"domain_code": "physics",
				"generation": "1",
				"torus": "open-problem",
				"node_id": "dark_matter"
			}
		},
		{
			"kind": "node",
			"slug": "upi-physics-2-classical-mechanics-helical-linear-rotational-coupling",
			"file": "mechanics/helical_linear_rotational_coupling.json",
			"domain": "mechanics",
			"address": "UPI<physics,2,classical_mechanics,helical_linear_rotational_coupling>",
			"title": "Helical motion, screw conversion, and coupled-rotor balance",
			"description": "Established classical mechanics and differential geometry for motion combining translation along an axis with rotation around it. The node indexes helix position, velocity, acceleration, pitch, curvature, torsion, force, kinetic energy, angular momentum, power, ideal screw conversion, and two-rotor angular-momentum balance.",
			"status": "EST",
			"quantities": [],
			"definitions": [
				"R is the helix radius in metres and must be positive.",
				"v_a is signed axial speed in metres per second.",
				"omega is signed angular speed in radians per second and follows the right-hand rule around the declared axis.",
				"phi_0 is the initial angular phase in radians; phase selects position on the orbit but does not itself create force.",
				"p is signed axial advance per temporal revolution in metres per turn.",
				"b = v_a/omega is reduced signed pitch in metres per radian and determines geometric handedness under the declared coordinate convention.",
				"kappa is curvature in inverse metres and tau_g is geometric torsion in inverse metres.",
				"I is moment of inertia in kilogram square metres, tau_m is mechanical torque in newton metres, and L is angular momentum in kilogram square metres per second.",
				"eta is mechanical efficiency with 0 < eta <= 1.",
				"The central coupling symbol in a diagram may represent a bearing, gear, screw, shaft, controller, or phase-locking element; its physical model must be declared separately."
			],
			"equations": [
				"theta(t) = omega t + phi_0",
				"r(t) = (v_a t, R cos(theta), R sin(theta))",
				"v(t) = (v_a, -R omega sin(theta), R omega cos(theta))",
				"a(t) = (0, -R omega^2 cos(theta), -R omega^2 sin(theta))",
				"v_t = R |omega|",
				"|v| = sqrt(v_a^2 + (R omega)^2)",
				"f_rot = |omega|/(2 pi)",
				"T_rot = 2 pi/|omega|",
				"p = v_a T_rot = 2 pi v_a/|omega|",
				"b = v_a/omega",
				"kappa = R/(R^2 + b^2)",
				"tau_g = b/(R^2 + b^2)",
				"beta_axis = atan2(R |omega|, |v_a|)",
				"a_r = R omega^2",
				"F_r = m R omega^2",
				"K_point = (1/2) m (v_a^2 + (R omega)^2)",
				"K_rigid = (1/2) m v_a^2 + (1/2) I omega^2",
				"L_axis = I omega",
				"tau_m = I alpha for constant I",
				"P = F_a v_a + tau_m omega",
				"dx = (p_s/(2 pi)) dphi for a screw with lead p_s",
				"v_a = (p_s/(2 pi)) omega",
				"F_a = 2 pi eta tau_m/p_s for forward torque-to-force conversion",
				"tau_m = F_a p_s/(2 pi eta) for required input torque",
				"P_out = eta P_in in the declared forward screw model",
				"L_total = I_1 omega_1 + I_2 omega_2",
				"K_rot,total = (1/2) I_1 omega_1^2 + (1/2) I_2 omega_2^2",
				"R_balance = |L_total|/(|I_1 omega_1| + |I_2 omega_2|)",
				"tau_c = -k_phi(phi_1 - phi_2) - c_phi(omega_1 - omega_2) for a linear torsional spring-damper coupling"
			],
			"assumptions": [
				"The helix has constant radius, constant axial speed, and constant angular speed unless an acceleration term is explicitly introduced.",
				"The coordinate axis is x and positive angular speed follows the right-hand rule around +x.",
				"The centripetal-force equation applies to a point mass or mass element constrained to the circular component of the path.",
				"The rigid-body energy and angular-momentum equations require a declared moment of inertia about the rotation axis.",
				"The screw equations use a single effective lead and a forward efficiency eta; real friction, backlash, elastic deformation, critical speed, buckling, thread geometry, wear, and self-locking require additional models.",
				"Counter-rotation can cancel net angular momentum when I_1 omega_1 + I_2 omega_2 = 0, but the stored rotational energy remains positive.",
				"No closed internal rotor system produces net linear momentum without exchanging momentum with matter, radiation, an external field, or a boundary."
			],
			"mechanism": "Translation and rotation form a helix when an object advances along an axis while its transverse coordinates rotate. A mechanical screw or equivalent kinematic constraint converts angular displacement into axial displacement. Work conservation links torque to axial force, while declared efficiency accounts for dissipative loss. Two coaxial rotors exchange angular momentum internally; equal and opposite angular momenta reduce reaction torque on the supporting body but do not remove kinetic energy.",
			"evidence": [
				{
					"type": "calculation",
					"source": "H. Goldstein, C. Poole, and J. Safko, Classical Mechanics, 3rd edition, Addison-Wesley, ISBN 9780201657029",
					"confidence": .99,
					"notes": "Standard rigid-body rotation, torque, angular momentum, kinetic energy, and power relations."
				},
				{
					"type": "calculation",
					"source": "M. P. do Carmo, Differential Geometry of Curves and Surfaces, Dover, ISBN 9780486806990",
					"confidence": .99,
					"notes": "Standard curvature and torsion formulas for regular curves, including circular helices."
				},
				{
					"type": "other",
					"source": "R. G. Budynas and J. K. Nisbett, Shigley's Mechanical Engineering Design, McGraw-Hill, power-screw chapters",
					"confidence": .98,
					"notes": "Mechanical work, lead, torque, force, efficiency, and real screw-design limits."
				}
			],
			"primary_sources": [
				"urn:isbn:9780201657029",
				"urn:isbn:9780486806990",
				"urn:isbn:9781260729964"
			],
			"predictions": [
				"For fixed R and omega, radial acceleration is independent of axial speed and equals R omega^2.",
				"Changing the sign of omega at fixed positive axial speed reverses geometric torsion and helicity sign while preserving curvature, total speed, period, and radial-acceleration magnitude.",
				"For an ideal screw at fixed pitch and efficiency, axial speed is proportional to angular speed and axial force is proportional to torque.",
				"When two rotors satisfy I_1 omega_1 = -I_2 omega_2, net axial angular momentum is zero while total rotational energy remains greater than zero unless both speeds are zero.",
				"At fixed input torque and efficiency, reducing screw lead increases ideal axial force but decreases axial advance per revolution."
			],
			"falsification_conditions": [
				"A measured uniform helix that reproducibly violates the differentiated position, velocity, or acceleration equations after coordinate and uncertainty checks would falsify the kinematic model.",
				"A frictionless screw that violates work conservation F_a dx = tau_m dphi under the stated assumptions would falsify the coupling derivation.",
				"A closed isolated two-rotor apparatus that gains net linear momentum without momentum exchange would contradict momentum conservation and require physics outside this node.",
				"Observed curvature or torsion inconsistent with kappa = R/(R^2+b^2) and tau_g = b/(R^2+b^2) for a measured circular helix would falsify the geometric classification."
			],
			"confusion_guard": "The angular coordinate phi and phase synchronization do not generate energy or force by themselves. Force requires momentum change, torque requires angular-momentum change, and sustained output power requires an energy source. Resonance can amplify response by storing supplied energy but cannot create energy. The diagram is a topology cue until radius, pitch, mass, inertia, constraints, forces, torques, losses, and boundary interactions are declared.",
			"stop_reason": "",
			"tags": [
				"classical mechanics",
				"helix",
				"spiral",
				"rotation",
				"translation",
				"screw theory",
				"torque",
				"angular momentum",
				"curvature",
				"torsion",
				"power",
				"counter rotation"
			],
			"verification_type": "mathematical_check",
			"claims_experimental_verification": false,
			"information_layer": "ACADEMIC",
			"version": "0.1.0",
			"scope": "",
			"scope_limits": "",
			"key_concepts": [],
			"related_theories": [],
			"address_parts": {
				"domain_code": "physics",
				"generation": "2",
				"torus": "classical_mechanics",
				"node_id": "helical_linear_rotational_coupling"
			}
		},
		{
			"kind": "node",
			"slug": "upi-quantum-algorithms-1-amplitude-amplification-phase-oracle-diffusion",
			"file": "quantum_algorithms/phase_oracle_diffusion_amplitude_amplification.json",
			"domain": "quantum_algorithms",
			"address": "UPI<quantum_algorithms,1,amplitude_amplification,phase_oracle_diffusion>",
			"title": "Phase-oracle amplitude amplification",
			"description": "Established ideal quantum-search mechanism in which a phase oracle marks target states and a reflection about the initial state rotates amplitude toward the marked subspace. Grover search is the uniform-state special case.",
			"status": "EST",
			"quantities": [],
			"definitions": [
				"f(x) is a Boolean marking function for computational-basis state x.",
				"O_f is the phase oracle that changes the sign of marked basis states.",
				"|s> is the uniform superposition over N basis states in the Grover special case.",
				"D is the reflection 2|s><s| - I.",
				"M is the number of marked states and theta = asin(sqrt(M/N))."
			],
			"equations": [
				"O_f |x> = (-1)^(f(x)) |x>",
				"|s> = (1/sqrt(N)) sum_(x=0)^(N-1) |x>",
				"D = 2 |s><s| - I",
				"G = D O_f",
				"theta = asin(sqrt(M/N))",
				"P_success(r) = sin^2((2 r + 1) theta)",
				"r_opt approximately round(pi/(4 theta) - 1/2)"
			],
			"assumptions": [
				"The initial state is the declared uniform state for the stated probability formula.",
				"The phase oracle marks exactly M states and is implemented coherently in the ideal quantum model.",
				"The automatic iteration estimate assumes M is known.",
				"Noise, imperfect gates and readout error are excluded from the ideal equations."
			],
			"mechanism": "Oracle and diffusion act as two reflections whose product is a rotation in the two-dimensional subspace spanned by marked and unmarked components. Repetition increases marked-state amplitude until the optimum is passed.",
			"evidence": [{
				"type": "calculation",
				"source": "Lov K. Grover, A fast quantum mechanical algorithm for database search, Proceedings of STOC 1996; arXiv:quant-ph/9605043",
				"notes": "Primary source for phase-oracle quantum database search."
			}],
			"primary_sources": ["https://arxiv.org/abs/quant-ph/9605043"],
			"predictions": [
				"For ideal N, M and r, the marked probability equals sin^2((2r+1)theta).",
				"For N = 20, M = 1 and r = 3, ideal success probability exceeds 0.99.",
				"Continuing iterations beyond the optimum eventually decreases marked probability."
			],
			"falsification_conditions": [
				"Reject the implementation if its marked probability disagrees with the analytic two-subspace rotation beyond tolerance.",
				"Reject the oracle if unmarked basis amplitudes change during an oracle-only basis-state test.",
				"Reject the diffusion operator if it fails to preserve state norm.",
				"Do not claim query speedup for a classical state-vector implementation."
			],
			"confusion_guard": "The ideal Grover rotation is established quantum-algorithm mathematics. Running it by explicitly updating all amplitudes on a classical computer is not a quantum speedup.",
			"stop_reason": "",
			"tags": [
				"grover",
				"phase-oracle",
				"diffusion",
				"amplitude-amplification",
				"quantum-search"
			],
			"verification_type": "mathematical_check",
			"claims_experimental_verification": false,
			"information_layer": "ACADEMIC",
			"version": "0.1.0",
			"scope": "",
			"scope_limits": "",
			"key_concepts": [],
			"related_theories": [],
			"address_parts": {
				"domain_code": "quantum_algorithms",
				"generation": "1",
				"torus": "amplitude_amplification",
				"node_id": "phase_oracle_diffusion"
			}
		},
		{
			"kind": "node",
			"slug": "upi-quantum-field-1-symmetry-conformal-field-theory",
			"file": "established/conformal_field_theory.json",
			"domain": "established",
			"address": "UPI<quantum_field,1,symmetry,conformal_field_theory>",
			"title": "Conformal field theory",
			"description": "A quantum field theory invariant under conformal transformations (and, in the holographic setting, typically a large-N gauge theory). In two dimensions the symmetry algebra is Virasoro.",
			"status": "EST",
			"quantities": [],
			"definitions": [
				"A CFT is a QFT with vanishing beta functions and a conserved, traceless stress tensor.",
				"In 2d, the central charge c appears in the Virasoro algebra.",
				"Primary operators are labelled by conformal dimensions Δ."
			],
			"equations": ["T^μ_μ = 0", "[L_m, L_n] = (m-n) L_{m+n} + (c/12) (m^3 - m) δ_{m+n,0}"],
			"assumptions": ["Unitary (or specified non-unitary) QFT in d dimensions.", "The holographic examples are typically strongly coupled and at large N."],
			"mechanism": "Scale invariance plus unitarity (in d>2, with extra assumptions) upgrades to conformal invariance. Correlation functions are constrained by the conformal group.",
			"evidence": [{
				"type": "experiment",
				"source": "Critical phenomena, 2d statistical mechanics, and lattice CFT checks",
				"confidence": .99,
				"notes": "CFTs exist as physical theories of critical points. That does not make a given CFT the dual of a given bulk."
			}],
			"primary_sources": ["Belavin, Polyakov, Zamolodchikov (1984)", "Di Francesco, Mathieu, Sénéchal, Conformal Field Theory"],
			"predictions": [],
			"falsification_conditions": ["A claimed CFT whose correlators violate conformal Ward identities after accounting for anomalies."],
			"confusion_guard": "A CFT is a field theory. AdS/CFT identifies a specific CFT with a specific bulk; the identification is the conjecture.",
			"stop_reason": "",
			"tags": [
				"cft",
				"conformal",
				"virasoro",
				"qft"
			],
			"verification_type": "experimental_observation",
			"claims_experimental_verification": true,
			"information_layer": "ACADEMIC",
			"version": "0.1.0",
			"scope": "Scale-invariant quantum field theories.",
			"scope_limits": "Does not by itself imply a gravitational dual.",
			"key_concepts": [
				"conformal invariance",
				"central charge",
				"primary operator"
			],
			"related_theories": ["UPI<theories,1,holography,ads_cft>"],
			"address_parts": {
				"domain_code": "quantum_field",
				"generation": "1",
				"torus": "symmetry",
				"node_id": "conformal_field_theory"
			}
		},
		{
			"kind": "node",
			"slug": "upi-quantum-information-1-error-correction-syndrome-measurement",
			"file": "quantum_information/syndrome_measurement.json",
			"domain": "quantum_information",
			"address": "UPI<quantum_information,1,error_correction,syndrome_measurement>",
			"title": "Quantum error correction as syndrome measurement",
			"description": "A stabilizer code detects errors by measuring commuting Pauli checks. The syndrome names a coset; a decoder proposes a recovery. Classical codes such as G24 enter as CSS ingredients — they are not themselves quantum memories.",
			"status": "EST",
			"quantities": [],
			"definitions": [
				"A stabilizer group S is an abelian subgroup of the Pauli group not containing -I.",
				"The code space is the +1 eigenspace of every element of S.",
				"A syndrome is the tuple of measurement outcomes of a generating set of checks."
			],
			"equations": ["s_i = ±1  from measuring generator g_i", "recovery R satisfies R E |ψ>_code ≈ |ψ>_code up to stabilizer for correctable E"],
			"assumptions": ["Checks commute and can be measured without leaving the code space when no error occurred.", "The noise model is declared (e.g. independent Pauli errors below a threshold)."],
			"mechanism": "Syndrome measurement projects the state onto a coset of the code. A classical decoder maps the syndrome to a recovery operator. For a CSS code built from G24, that classical decoder can be the Golay decoder shipped in this lab.",
			"evidence": [{
				"type": "theorem",
				"source": "Gottesman, Stabilizer codes and quantum error correction",
				"confidence": .99
			}, {
				"type": "experiment",
				"source": "Multiple laboratory demonstrations of small stabilizer codes (surface, repetition, color) — not a Golay CSS device in this index",
				"confidence": .8,
				"notes": "Supports the syndrome mechanism, not a specific G24 quantum implementation here."
			}],
			"primary_sources": [
				"Shor, Scheme for reducing decoherence (1995)",
				"Gottesman, Stabilizer codes (1997)",
				"Calderbank, Shor; Steane: CSS codes"
			],
			"predictions": ["If all checks yield +1 and the state started in the code space, it remains there.", "For a CSS code from G24, any classical weight-≤3 error on one block is in principle correctable."],
			"falsification_conditions": ["A declared stabilizer family that does not commute.", "A claimed Golay CSS implementation whose measured syndrome does not match the classical parity checks of G24."],
			"confusion_guard": "Syndrome measurement is a quantum operation on a declared code space. Drawing cyan ripples on a lattice plate does not demonstrate a physical self-healing vacuum.",
			"stop_reason": "",
			"tags": [
				"qec",
				"stabilizer",
				"syndrome",
				"css",
				"golay"
			],
			"verification_type": "mathematical_check",
			"claims_experimental_verification": false,
			"information_layer": "ACADEMIC",
			"version": "0.1.0",
			"scope": "Stabilizer / CSS error correction",
			"scope_limits": "This node does not claim a laboratory Golay CSS qubit or a cosmological repair process.",
			"key_concepts": [
				"stabilizer",
				"syndrome",
				"CSS code",
				"recovery"
			],
			"related_theories": [
				"UPI<coding_theory,1,binary_code,extended_golay>",
				"UPI<quantum_information,1,finite_dimensional,hilbert_state_space>",
				"UPI<quantum_information,1,measurement,born_probability_rule>"
			],
			"address_parts": {
				"domain_code": "quantum_information",
				"generation": "1",
				"torus": "error_correction",
				"node_id": "syndrome_measurement"
			}
		},
		{
			"kind": "node",
			"slug": "upi-quantum-information-1-finite-dimensional-hilbert-state-space",
			"file": "quantum_information/finite_dimensional_hilbert_state_space.json",
			"domain": "quantum_information",
			"address": "UPI<quantum_information,1,finite_dimensional,hilbert_state_space>",
			"title": "Finite-dimensional Hilbert state space",
			"description": "Established mathematical state-space framework for a finite d-level quantum system. Pure states are normalized rays in the complex vector space C^d, observables are represented by Hermitian operators, and valid closed-system basis changes are unitary.",
			"status": "EST",
			"quantities": [],
			"definitions": [
				"H_d is a d-dimensional complex Hilbert space with d >= 2.",
				"A pure state is represented by a normalized vector |psi> up to an overall complex phase.",
				"An orthonormal basis {|j>} satisfies <j|k> = delta_jk.",
				"A unitary operator U satisfies U^dagger U = I."
			],
			"equations": [
				"H_d = C^d",
				"|psi> = sum_(j=0)^(d-1) alpha_j |j>",
				"sum_j |alpha_j|^2 = 1",
				"<j|k> = delta_jk",
				"U^dagger U = I_d"
			],
			"assumptions": [
				"The system is modeled with a finite declared dimension d.",
				"The state is pure unless a density operator is explicitly introduced.",
				"Global phase is physically unobservable in standard quantum mechanics."
			],
			"mechanism": "The inner product defines normalization, orthogonality and transition amplitudes. Unitary maps preserve the inner product and therefore preserve total probability.",
			"evidence": [{
				"type": "calculation",
				"source": "John von Neumann, Mathematical Foundations of Quantum Mechanics (1932)",
				"notes": "Foundational formalization of quantum states and operators in Hilbert space."
			}],
			"primary_sources": ["John von Neumann, Mathematische Grundlagen der Quantenmechanik, 1932"],
			"predictions": ["Every unitary basis transformation preserves the norm of every state vector.", "Orthonormal basis expansion reconstructs the original vector exactly in exact arithmetic."],
			"falsification_conditions": ["Reject a proposed closed-system state transformation if it fails U^dagger U = I within the declared numerical tolerance.", "Reject a state as normalized if sum_j |alpha_j|^2 differs from one beyond tolerance."],
			"confusion_guard": "A complex vector in software is a mathematical representation. It is not by itself a physically prepared quantum state.",
			"stop_reason": "",
			"tags": [
				"hilbert-space",
				"qudit",
				"state-vector",
				"unitary",
				"normalization"
			],
			"verification_type": "mathematical_check",
			"claims_experimental_verification": false,
			"information_layer": "ACADEMIC",
			"version": "0.1.0",
			"scope": "",
			"scope_limits": "",
			"key_concepts": [],
			"related_theories": [],
			"address_parts": {
				"domain_code": "quantum_information",
				"generation": "1",
				"torus": "finite_dimensional",
				"node_id": "hilbert_state_space"
			}
		},
		{
			"kind": "node",
			"slug": "upi-quantum-information-1-measurement-born-probability-rule",
			"file": "quantum_information/born_probability_rule.json",
			"domain": "quantum_information",
			"address": "UPI<quantum_information,1,measurement,born_probability_rule>",
			"title": "Born probability rule for finite basis measurements",
			"description": "Established quantum-mechanical probability rule. For a normalized state expanded in an orthonormal measurement basis, the ideal probability of outcome j is the squared magnitude of its complex amplitude.",
			"status": "EST",
			"quantities": [],
			"definitions": [
				"alpha_j = <j|psi> is the probability amplitude for basis outcome j.",
				"p_j is the ideal probability assigned to outcome j.",
				"For a projector Pi_j = |j><j|, the probability is <psi|Pi_j|psi>."
			],
			"equations": [
				"alpha_j = <j|psi>",
				"p_j = |alpha_j|^2",
				"p_j = <psi|Pi_j|psi>",
				"Pi_j = |j><j|",
				"sum_j p_j = 1"
			],
			"assumptions": [
				"The input state is normalized.",
				"The declared measurement basis is orthonormal and complete.",
				"The node states ideal quantum probabilities and does not include detector errors."
			],
			"mechanism": "The inner product projects the state onto each measurement outcome. Squared amplitude magnitudes produce non-negative normalized probabilities.",
			"evidence": [{
				"type": "other",
				"source": "Max Born, Zur Quantenmechanik der Stoßvorgänge, Zeitschrift für Physik 37 (1926)",
				"notes": "Original probability interpretation of the quantum wave amplitude."
			}],
			"primary_sources": ["Max Born, Zur Quantenmechanik der Stoßvorgänge, 1926"],
			"predictions": [
				"Every ideal basis probability is non-negative.",
				"The probabilities sum to one for every normalized state and complete orthonormal basis.",
				"Multiplying the entire state by a global phase leaves all probabilities unchanged."
			],
			"falsification_conditions": [
				"Reject a probability calculation if any p_j is negative beyond numerical tolerance.",
				"Reject the calculation if sum_j p_j differs from one beyond tolerance for a normalized state.",
				"Reject the implementation if a global phase changes the probability vector."
			],
			"confusion_guard": "A software probability vector is an ideal model output. It is not a physical measurement and does not collapse a real quantum system.",
			"stop_reason": "",
			"tags": [
				"born-rule",
				"measurement",
				"probability",
				"projector",
				"amplitude"
			],
			"verification_type": "mathematical_check",
			"claims_experimental_verification": false,
			"information_layer": "ACADEMIC",
			"version": "0.1.0",
			"scope": "",
			"scope_limits": "",
			"key_concepts": [],
			"related_theories": [],
			"address_parts": {
				"domain_code": "quantum_information",
				"generation": "1",
				"torus": "measurement",
				"node_id": "born_probability_rule"
			}
		},
		{
			"kind": "node",
			"slug": "upi-quantum-information-1-multi-qudit-tensor-product-register",
			"file": "quantum_information/multi_qudit_tensor_product_register.json",
			"domain": "quantum_information",
			"address": "UPI<quantum_information,1,multi_qudit,tensor_product_register>",
			"title": "Multi-qudit tensor-product register",
			"description": "Established composition rule for multiple finite-dimensional quantum systems. Local state spaces combine through a tensor product, producing a register dimension equal to the product of the local dimensions.",
			"status": "EST",
			"quantities": [],
			"definitions": [
				"Subsystem i has local Hilbert space H_i = C^(d_i).",
				"The joint register is H = tensor_i H_i.",
				"A product basis state is labeled |j_1, ..., j_n>.",
				"The total basis dimension is N = product_i d_i."
			],
			"equations": [
				"H = tensor_(i=1)^n C^(d_i)",
				"dim(H) = product_(i=1)^n d_i",
				"|j_1,...,j_n> = tensor_i |j_i>",
				"|psi> = sum_(j_1,...,j_n) alpha_(j_1,...,j_n) |j_1,...,j_n>",
				"sum_(j_1,...,j_n) |alpha_(j_1,...,j_n)|^2 = 1"
			],
			"assumptions": [
				"Each local dimension d_i is finite and declared.",
				"Subsystem ordering is fixed when coordinates are flattened into one index.",
				"Tensor-product composition is used; superselection constraints are outside this node."
			],
			"mechanism": "The tensor product preserves each local basis while allowing joint product states and non-factorizable superpositions. Mixed-radix indexing is a software representation of the same basis cardinality.",
			"evidence": [{
				"type": "calculation",
				"source": "John von Neumann, Mathematical Foundations of Quantum Mechanics (1932)",
				"notes": "Foundational operator and composite-system formalism."
			}],
			"primary_sources": ["John von Neumann, Mathematische Grundlagen der Quantenmechanik, 1932"],
			"predictions": [
				"A register with dimensions (d_1,...,d_n) contains exactly product_i d_i basis states.",
				"Coordinate-to-index and index-to-coordinate maps are bijective when the same subsystem order is used.",
				"Local identity-tensored operators leave all non-target subsystem coordinates unchanged on basis inputs."
			],
			"falsification_conditions": [
				"Reject the register mapping if any two valid coordinate tuples map to the same basis index.",
				"Reject a local operator implementation if it changes a non-target coordinate on a basis-state test.",
				"Reject the composition if the computed dimension differs from product_i d_i."
			],
			"confusion_guard": "A tensor-product data structure can represent entangled amplitudes, but software allocation alone is not experimental evidence of entanglement.",
			"stop_reason": "",
			"tags": [
				"tensor-product",
				"multi-qudit",
				"composite-system",
				"mixed-radix",
				"register"
			],
			"verification_type": "mathematical_check",
			"claims_experimental_verification": false,
			"information_layer": "ACADEMIC",
			"version": "0.1.0",
			"scope": "",
			"scope_limits": "",
			"key_concepts": [],
			"related_theories": [],
			"address_parts": {
				"domain_code": "quantum_information",
				"generation": "1",
				"torus": "multi_qudit",
				"node_id": "tensor_product_register"
			}
		},
		{
			"kind": "node",
			"slug": "upi-quantum-information-1-qudit-fourier-dual-basis",
			"file": "quantum_information/qudit_fourier_dual_basis.json",
			"domain": "quantum_information",
			"address": "UPI<quantum_information,1,qudit,fourier_dual_basis>",
			"title": "Qudit Fourier-dual basis",
			"description": "Established normalized discrete Fourier transform on a d-level quantum system. It maps computational-basis states to a mutually unbiased Fourier basis and is inverted by the conjugate transform.",
			"status": "EST",
			"quantities": [],
			"definitions": [
				"F_d is the normalized discrete Fourier transform on C^d.",
				"The computational and Fourier bases are dual representations connected by F_d.",
				"Mutually unbiased means every overlap magnitude between the two bases equals 1/sqrt(d)."
			],
			"equations": [
				"F_d |j> = (1/sqrt(d)) sum_(k=0)^(d-1) exp(2 pi i j k / d) |k>",
				"F_d^dagger F_d = I_d",
				"F_d^(-1) = F_d^dagger",
				"|<k|F_d|j>|^2 = 1/d"
			],
			"assumptions": [
				"The local state space has finite dimension d >= 2.",
				"The transform uses exact roots of unity in the mathematical model.",
				"Numerical implementations use finite-precision complex arithmetic."
			],
			"mechanism": "The transform redistributes each basis amplitude across all Fourier labels with phase factors determined by roots of unity while preserving the inner product.",
			"evidence": [{
				"type": "calculation",
				"source": "Daniel Gottesman, Fault-Tolerant Quantum Computation with Higher-Dimensional Systems, arXiv:quant-ph/9802007",
				"notes": "Uses higher-dimensional Fourier and generalized Pauli structure."
			}],
			"primary_sources": ["https://arxiv.org/abs/quant-ph/9802007"],
			"predictions": [
				"Fourier transformation followed by its inverse reconstructs every normalized finite input state.",
				"The transform preserves total probability.",
				"Every computational-basis state produces a uniform Fourier-basis probability distribution."
			],
			"falsification_conditions": [
				"Reject the implementation if F_d^dagger F_d differs from identity beyond tolerance.",
				"Reject dual reconstruction if max_j |alpha_j - alpha_hat_j| exceeds the declared tolerance.",
				"Reject mutual unbiasedness if any basis-overlap probability differs from 1/d beyond tolerance."
			],
			"confusion_guard": "Fourier duality is a basis transformation. It does not imply hidden dimensions, faster-than-light communication or physical toroidal geometry.",
			"stop_reason": "",
			"tags": [
				"qudit",
				"fourier-transform",
				"dual-basis",
				"unitary",
				"mutually-unbiased"
			],
			"verification_type": "mathematical_check",
			"claims_experimental_verification": false,
			"information_layer": "ACADEMIC",
			"version": "0.1.0",
			"scope": "",
			"scope_limits": "",
			"key_concepts": [],
			"related_theories": [],
			"address_parts": {
				"domain_code": "quantum_information",
				"generation": "1",
				"torus": "qudit",
				"node_id": "fourier_dual_basis"
			}
		},
		{
			"kind": "node",
			"slug": "upi-quantum-information-1-qudit-generalized-weyl-gates",
			"file": "quantum_information/generalized_qudit_weyl_gates.json",
			"domain": "quantum_information",
			"address": "UPI<quantum_information,1,qudit,generalized_weyl_gates>",
			"title": "Generalized qudit shift and phase gates",
			"description": "Established d-level generalization of the Pauli shift and phase operators. The cyclic shift X_d permutes computational-basis labels modulo d, while Z_d changes their relative phases using d-th roots of unity.",
			"status": "EST",
			"quantities": [],
			"definitions": [
				"omega_d = exp(2 pi i / d) is a primitive d-th root of unity.",
				"X_d is the cyclic shift operator on the computational basis.",
				"Z_d is the diagonal phase operator on the computational basis.",
				"The operators obey the Weyl commutation relation Z_d X_d = omega_d X_d Z_d."
			],
			"equations": [
				"omega_d = exp(2 pi i / d)",
				"X_d |j> = |(j + 1) mod d>",
				"Z_d |j> = omega_d^j |j>",
				"X_d^d = Z_d^d = I_d",
				"Z_d X_d = omega_d X_d Z_d"
			],
			"assumptions": [
				"The basis labels form the cyclic group Z_d.",
				"The local dimension d is a declared integer with d >= 2.",
				"The gates act ideally without hardware noise or leakage."
			],
			"mechanism": "X_d reassigns basis labels through a norm-preserving permutation. Z_d multiplies each amplitude by a unit-modulus phase. Both operators are unitary.",
			"evidence": [{
				"type": "calculation",
				"source": "A. Muthukrishnan and C. R. Stroud Jr., Multivalued logic gates for quantum computation, Physical Review A 62, 052309 (2000)",
				"notes": "Primary research treatment of multivalued quantum logic gates."
			}, {
				"type": "calculation",
				"source": "Daniel Gottesman, Fault-Tolerant Quantum Computation with Higher-Dimensional Systems, arXiv:quant-ph/9802007",
				"notes": "Higher-dimensional generalized Pauli operator framework."
			}],
			"primary_sources": ["https://doi.org/10.1103/PhysRevA.62.052309", "https://arxiv.org/abs/quant-ph/9802007"],
			"predictions": [
				"X_d and Z_d preserve total probability for every normalized input.",
				"Applying X_d exactly d times returns the original state.",
				"Applying Z_d exactly d times returns the original state.",
				"The computed commutator differs from the Weyl phase only by numerical tolerance."
			],
			"falsification_conditions": [
				"Reject an implementation if X_d or Z_d changes state norm beyond tolerance.",
				"Reject the cyclic gate if X_d^d is not the identity.",
				"Reject the phase gate if any diagonal factor has modulus different from one beyond tolerance."
			],
			"confusion_guard": "Generalized gates are established mathematics. Executing their matrices on a classical computer does not establish a physical qudit device.",
			"stop_reason": "",
			"tags": [
				"qudit",
				"weyl-operators",
				"generalized-pauli",
				"shift-gate",
				"phase-gate"
			],
			"verification_type": "mathematical_check",
			"claims_experimental_verification": false,
			"information_layer": "ACADEMIC",
			"version": "0.1.0",
			"scope": "",
			"scope_limits": "",
			"key_concepts": [],
			"related_theories": [],
			"address_parts": {
				"domain_code": "quantum_information",
				"generation": "1",
				"torus": "qudit",
				"node_id": "generalized_weyl_gates"
			}
		},
		{
			"kind": "node",
			"slug": "upi-quantum-information-6-duality-double-slit-measurement",
			"file": "examples/double_slit_information.json",
			"domain": "examples",
			"address": "UPI<quantum_information,6,duality,double_slit_measurement>",
			"title": "Double-slit interference, which-way information, and no-signalling",
			"description": "Density-matrix model of a two-path interferometer coupled to a path detector. Interference visibility is controlled by detector-state overlap, while local outcome statistics cannot be changed by a remote choice of measurement basis. The node separates experimentally established predictions from interpretation-dependent claims about collapse, determinism, or retrocausality.",
			"status": "EST",
			"quantities": [],
			"definitions": [
				"|L> and |R> are orthogonal path states associated with the two slits.",
				"|D_L> and |D_R> are detector or environment states correlated with the paths.",
				"gamma = <D_R|D_L> is the complex coherence factor retained after tracing out the detector.",
				"V is fringe visibility and D is optimal path distinguishability.",
				"rho_path is the reduced density operator of the path subsystem."
			],
			"equations": [
				"|Psi> = (|L>|D_L> + exp(i phi)|R>|D_R>)/sqrt(2)",
				"rho_path = Tr_D(|Psi><Psi|)",
				"rho_path = (|L><L| + |R><R| + gamma exp(-i phi)|L><R| + gamma* exp(i phi)|R><L|)/2",
				"P(x) = (|psi_L(x)|^2 + |psi_R(x)|^2 + 2 Re[gamma exp(i phi) psi_L*(x) psi_R(x)])/2",
				"V = |gamma| for equal path intensities",
				"D = sqrt(1 - |gamma|^2) for two pure detector states with equal priors",
				"V^2 + D^2 = 1 for the ideal pure-state case",
				"V^2 + D^2 <= 1 in the general two-path case",
				"rho_A' = Tr_B[(I_A tensor E_B)(rho_AB)] = rho_A for every trace-preserving local map E_B"
			],
			"assumptions": [
				"The two paths form an effective two-dimensional Hilbert space.",
				"The ideal equality uses equal path amplitudes and pure detector marker states.",
				"The no-signalling equation assumes ordinary quantum mechanics and a trace-preserving local operation on the remote subsystem."
			],
			"mechanism": "A which-way interaction correlates path states with distinguishable detector or environment states. Tracing over those states suppresses the off-diagonal coherence terms by gamma. No conscious observer is required. Erasing or sorting detector information can recover interference only in conditioned coincidence subensembles; the unconditioned local distribution remains unchanged.",
			"evidence": [
				{
					"type": "calculation",
					"source": "B.-G. Englert, Fringe Visibility and Which-Way Information: An Inequality, Phys. Rev. Lett. 77, 2154 (1996), DOI: 10.1103/PhysRevLett.77.2154",
					"date": "1996-09-09",
					"confidence": .99,
					"notes": "Derives the quantitative visibility-distinguishability bound."
				},
				{
					"type": "experiment",
					"source": "S. Duerr, T. Nonn, and G. Rempe, Fringe Visibility and Which-Way Information in an Atom Interferometer, Phys. Rev. Lett. 81, 5705 (1998), DOI: 10.1103/PhysRevLett.81.5705",
					"date": "1998-12-28",
					"confidence": .99,
					"notes": "Experimental test of the complementarity relation in an atom interferometer."
				},
				{
					"type": "calculation",
					"source": "M. O. Scully and K. Druehl, Quantum eraser: A proposed photon correlation experiment concerning observation and delayed choice in quantum mechanics, Phys. Rev. A 25, 2208 (1982), DOI: 10.1103/PhysRevA.25.2208",
					"date": "1982-04-01",
					"confidence": .98,
					"notes": "Shows how which-way information and conditional correlations control recovered fringes."
				}
			],
			"primary_sources": [
				"https://doi.org/10.1103/PhysRevLett.77.2154",
				"https://doi.org/10.1103/PhysRevLett.81.5705",
				"https://doi.org/10.1103/PhysRevA.25.2208"
			],
			"predictions": [
				"When |gamma| approaches 1, high-visibility interference is possible and optimal path distinguishability approaches 0.",
				"When |gamma| approaches 0, unconditioned interference vanishes and optimal path distinguishability approaches 1.",
				"Changing only the remote detector measurement basis cannot alter the unconditioned local screen distribution.",
				"Interference can appear in separately conditioned coincidence subsets whose sum contains no signalling fringe."
			],
			"falsification_conditions": [
				"For a correctly isolated ideal two-path system, a reproducible violation of V^2 + D^2 <= 1 after accounting for uncertainty and model assumptions would falsify this node.",
				"A controllable change of the unconditioned local screen distribution caused solely by a spacelike-separated remote measurement choice would violate the no-signalling prediction.",
				"Failure of the density-matrix model to predict measured visibility from independently characterized detector-state overlap would require revision."
			],
			"confusion_guard": "The formalism does not imply that a particle consciously knows it is observed, that usable information travels faster than light, or that the future is already determined. Collapse, many-worlds, Bohmian, retrocausal, and superdeterministic accounts are interpretation-level additions unless they produce distinct testable predictions.",
			"stop_reason": "",
			"tags": [
				"quantum mechanics",
				"double slit",
				"interference",
				"which-way information",
				"decoherence",
				"density matrix",
				"no-signalling",
				"quantum eraser"
			],
			"verification_type": "experimental_observation",
			"claims_experimental_verification": true,
			"information_layer": "ACADEMIC",
			"version": "0.1.0",
			"scope": "",
			"scope_limits": "",
			"key_concepts": [],
			"related_theories": [],
			"address_parts": {
				"domain_code": "quantum_information",
				"generation": "6",
				"torus": "duality",
				"node_id": "double_slit_measurement"
			}
		},
		{
			"kind": "node",
			"slug": "upi-relativity-1-inertia-compton-frequency",
			"file": "relativity/compton_frequency.json",
			"domain": "relativity",
			"address": "UPI<relativity,1,inertia,compton_frequency>",
			"title": "Compton frequency of a rest mass (Penrose little clock)",
			"description": "A rest mass m has Compton frequency f_C = m c² / h. This is the inverse of the photon equivalent-mass rewrite m = hf/c². Penrose’s ‘little clock’ reading on X is this identity, not information-mass.",
			"status": "DER",
			"quantities": [],
			"definitions": ["f_C is the Compton frequency associated with rest energy E = m c².", "The photon case m = hf/c² is the same algebra read the other way."],
			"equations": [
				"E = m c^2",
				"E = h f",
				"f_C = m c^2 / h"
			],
			"assumptions": ["Special relativity plus the Planck–Einstein relation.", "Applies to the rest energy, not to a photon’s rest mass (photons have none)."],
			"mechanism": "Combine mass–energy with E=hf. de Broglie and subsequent Compton-clock interferometry use this frequency. It does not identify m with a volume of information.",
			"evidence": [{
				"type": "theorem",
				"source": "Penrose IAI lecture circulated on X; Compton-clock atom interferometry",
				"confidence": .9,
				"notes": "X clip is pedagogy. The algebra is textbook."
			}],
			"primary_sources": [
				"de Broglie (1924)",
				"Penrose, IAI discussion of mass as clock",
				"Lan et al. Science 2013, A clock directly linking time to a particle’s mass"
			],
			"predictions": ["A rest mass m corresponds to f_C = mc²/h. Interferometers can compare that scale to laboratory clocks."],
			"falsification_conditions": ["A rest-energy measurement whose implied Compton frequency disagrees with mc²/h after known corrections."],
			"confusion_guard": "f_C = mc²/h is not T€@X™ information mass and does not close the Standard Model. Photons remain massless; they carry E=hf.",
			"stop_reason": "",
			"tags": [
				"compton",
				"frequency",
				"penrose",
				"mass"
			],
			"verification_type": "theoretical_derivation",
			"claims_experimental_verification": false,
			"information_layer": "ACADEMIC",
			"version": "0.1.0",
			"scope": "Rest energy of massive particles in SR.",
			"scope_limits": "Does not assign rest mass to photons. Does not promote a tweet to a law.",
			"key_concepts": [
				"Compton frequency",
				"little clock",
				"rest energy"
			],
			"related_theories": ["UPI<information_physics,1,inertia,frequency_mass_equivalent>", "UPI<relativity,1,t,energy_n_mass_energy>"],
			"address_parts": {
				"domain_code": "relativity",
				"generation": "1",
				"torus": "inertia",
				"node_id": "compton_frequency"
			}
		},
		{
			"kind": "node",
			"slug": "upi-theories-1-holography-ads-cft",
			"file": "theories/ads_cft.json",
			"domain": "theories",
			"address": "UPI<theories,1,holography,ads_cft>",
			"title": "AdS/CFT correspondence",
			"description": "Maldacena (1997): a gravitational theory in asymptotically AdS_{d+1} is dual to a d-dimensional CFT on the conformal boundary. The original example is Type IIB string theory on AdS5 × S5 dual to 4d N=4 Super Yang–Mills. Unproven as a theorem; tested in a large web of matched quantities. Status HYP.",
			"status": "HYP",
			"quantities": [],
			"definitions": [
				"Duality: the same Hilbert space and the same generating functional, written in two languages.",
				"GKP–Witten dictionary: a bulk field with boundary value φ_0 sources a CFT operator O.",
				"Large N, strong 't Hooft coupling on the CFT side is classical supergravity in the bulk.",
				"M-theory examples: AdS4 × S7 (M2 / ABJM) and AdS7 × S4 (M5)."
			],
			"equations": [
				"Z_bulk[φ_0] = ⟨exp ∫ φ_0 O⟩_CFT",
				"λ = g_YM^2 N = (L / ℓ_s)^4   (AdS5 × S5)",
				"c = 3L / (2 G_N)   (Brown–Henneaux, AdS3)"
			],
			"assumptions": [
				"The bulk is asymptotically AdS (or a string/M-theory completion thereof).",
				"The boundary theory is a CFT (possibly with relevant deformations).",
				"Most quantitative checks are in the large-N, strong-coupling corner."
			],
			"mechanism": "N coincident D3-branes have a worldvolume N=4 SYM description and a near-horizon AdS5 × S5 geometry. Equating the two at low energy is the conjecture. Open/closed string duality is the broader idea.",
			"evidence": [{
				"type": "calculation",
				"source": "Matched spectra, three-point functions, Wilson loops, entanglement entropies, supersymmetric indices, integrability in planar N=4",
				"confidence": .9,
				"notes": "Overwhelming theoretical evidence inside the stated class of theories. Not a laboratory observation of extra dimensions."
			}],
			"primary_sources": [
				"Maldacena (1997), The large N limit of superconformal field theories and supergravity",
				"Gubser, Klebanov, Polyakov (1998)",
				"Witten (1998), Anti-de Sitter space and holography"
			],
			"predictions": [
				"Every CFT observable has a bulk dual; every bulk field has a CFT source.",
				"Thermal CFT entropy equals the Bekenstein–Hawking entropy of the AdS black hole (in the classical regime).",
				"A unique, parameter-free map from laboratory m_I = h f / c² onto this dictionary is not implied."
			],
			"falsification_conditions": ["A computed CFT observable in a claimed pair that disagrees with the bulk calculation after all controlled corrections.", "Promotion to EST without a proof or an independent, in-domain measurement of a dual pair."],
			"confusion_guard": "AdS/CFT is a duality between two theories, not a statement that the cosmos is a hologram in the colloquial sense, and not a dual of our de Sitter cosmology. 11D branes enter as M2/M5 near-horizon limits, not as laboratory objects.",
			"stop_reason": "",
			"tags": [
				"ads-cft",
				"holography",
				"maldacena",
				"duality"
			],
			"verification_type": "mathematical_check",
			"claims_experimental_verification": false,
			"information_layer": "ACADEMIC",
			"version": "0.1.0",
			"scope": "Asymptotically AdS gravitational theories and their dual CFTs, especially large N.",
			"scope_limits": "Not our sky. Not a proof. Not a mass formula for a lab photon.",
			"key_concepts": [
				"holography",
				"GKP-Witten dictionary",
				"large N",
				"near-horizon D3/M2/M5"
			],
			"related_theories": [
				"UPI<gravity,1,spacetime,anti_de_sitter>",
				"UPI<quantum_field,1,symmetry,conformal_field_theory>",
				"UPI<theories,1,holography,ryu_takayanagi>",
				"UPI<theories,1,m_theory,eleven_d_brane>",
				"UPI<information_physics,1,measure,universal_information_measure>"
			],
			"address_parts": {
				"domain_code": "theories",
				"generation": "1",
				"torus": "holography",
				"node_id": "ads_cft"
			}
		},
		{
			"kind": "node",
			"slug": "upi-theories-1-holography-not-our-sky",
			"file": "theories/ads_not_our_sky.json",
			"domain": "theories",
			"address": "UPI<theories,1,holography,not_our_sky>",
			"title": "Our universe is not asymptotically AdS",
			"description": "Observed cosmology is accelerating, consistent with Λ > 0 (de Sitter-like). AdS/CFT requires a negative cosmological constant in the bulk. Applying the Maldacena dictionary to the sky STOPS until a controlled dS/CFT or other dictionary exists.",
			"status": "STOP",
			"quantities": [],
			"definitions": [
				"Λ_obs > 0 at late times.",
				"AdS requires Λ < 0.",
				"dS/CFT is a different, much weaker set of proposals."
			],
			"equations": ["Λ_AdS < 0", "Λ_obs > 0"],
			"assumptions": ["Λ CDM (or any accelerating FLRW with positive effective Λ) describes the late universe."],
			"mechanism": "The conformal boundary of AdS is timelike; the conformal boundary of dS is spacelike. The GKP–Witten dictionary does not carry over unchanged.",
			"evidence": [{
				"type": "experiment",
				"source": "Type Ia supernovae, CMB, BAO — accelerated expansion",
				"confidence": .99
			}],
			"primary_sources": ["Perlmutter, Schmidt, Riess (1998–1999)", "Planck cosmological parameters"],
			"predictions": [],
			"falsification_conditions": ["A demonstration that the bulk dual of the observed cosmos is asymptotically AdS after all — presently it is not."],
			"confusion_guard": "Holography as a word is not a license. AdS/CFT can be EST-level evidence *inside AdS*. It is STOP as a dual of the sky.",
			"stop_reason": "Observed Λ has the wrong sign for AdS. Smallest next observation: a controlled dS dictionary with one preregistered observable, or restrict holographic claims to AdS laboratories (heavy-ion, condensed matter duals, numerical GR in a box).",
			"tags": [
				"stop",
				"de-sitter",
				"cosmology",
				"holography"
			],
			"verification_type": "experimental_observation",
			"claims_experimental_verification": true,
			"information_layer": "ACADEMIC",
			"version": "0.1.0",
			"scope": "Domain cut: do not apply AdS/CFT to observed cosmology.",
			"scope_limits": "Does not deny AdS/CFT as a duality of other theories.",
			"key_concepts": [
				"de Sitter",
				"sign of Λ",
				"domain"
			],
			"related_theories": ["UPI<theories,1,holography,ads_cft>", "UPI<gravity,1,spacetime,anti_de_sitter>"],
			"address_parts": {
				"domain_code": "theories",
				"generation": "1",
				"torus": "holography",
				"node_id": "not_our_sky"
			}
		},
		{
			"kind": "node",
			"slug": "upi-theories-1-holography-ryu-takayanagi",
			"file": "theories/ryu_takayanagi.json",
			"domain": "theories",
			"address": "UPI<theories,1,holography,ryu_takayanagi>",
			"title": "Ryu–Takayanagi entanglement entropy",
			"description": "In AdS/CFT, the entanglement entropy of a boundary region A equals the area of a bulk extremal surface γ_A homologous to A: S_A = Area(γ_A)/4G_N. This is the holographic entropy formula — area as entanglement, not the Schwarzschild entropy of a laboratory quantum.",
			"status": "DER",
			"quantities": [],
			"definitions": [
				"A is a spatial region in the CFT.",
				"γ_A is the bulk extremal surface of minimal area homologous to A, anchored on ∂A.",
				"In AdS3 the extremal surface is a geodesic in the Poincaré disk."
			],
			"equations": [
				"S_A = Area(γ_A) / (4 G_N)",
				"AdS3: S_A = Length(γ_A) / (4 G_N)",
				"CFT2 interval: S = (c/3) ln((ℓ/ε) sin(πℓ/L)) + ..."
			],
			"assumptions": [
				"The AdS/CFT dictionary holds in a regime with a classical bulk.",
				"Leading order in G_N; quantum extremal surfaces (QES, island formula) are a further extension.",
				"The UV cutoff of the CFT matches a radial cutoff in the bulk."
			],
			"mechanism": "The replica trick in the CFT becomes a bulk cosmic brane of tension (n-1)/(4G_N) whose n→1 limit is the area law. Lewkowycz–Maldacena derive RT from the replica geometry. It reduces to Bekenstein–Hawking when A is the whole thermal system and γ_A is the horizon.",
			"evidence": [{
				"type": "theorem",
				"source": "Lewkowycz–Maldacena (2013) replica derivation; matching of CFT2 interval entropy to AdS3 geodesics",
				"confidence": .85,
				"notes": "Derived inside AdS/CFT. Inherits HYP from the correspondence; the AdS3/CFT2 check is exact at this order."
			}],
			"primary_sources": [
				"Ryu, Takayanagi (2006), Holographic derivation of entanglement entropy",
				"Lewkowycz, Maldacena (2013)",
				"Hubeny, Rangamani, Takayanagi (2007) covariant HRT"
			],
			"predictions": ["S_A obeys strong subadditivity, matching the geometric inequalities of minimal surfaces.", "At finite cutoff, S_RT and the CFT log formula share the same divergence; they need not print as identical numbers."],
			"falsification_conditions": ["An AdS/CFT pair in the classical regime whose entanglement entropy disagrees with the extremal-area prediction after known 1/N and α' corrections."],
			"confusion_guard": "RT is entanglement entropy of a CFT region, dual to a bulk area. It is the precise holographic entropy. It is not S = k A/4ℓ_P² applied to the Schwarzschild radius of m_I = h f / c² for a lab frequency, and it does not require the night sky to be AdS.",
			"stop_reason": "",
			"tags": [
				"ryu-takayanagi",
				"entanglement",
				"holography",
				"area law"
			],
			"verification_type": "mathematical_check",
			"claims_experimental_verification": false,
			"information_layer": "ACADEMIC",
			"version": "0.1.0",
			"scope": "Classical holographic entanglement in AdS/CFT.",
			"scope_limits": "Not laboratory photon entropy. Not a proof of Maldacena. Quantum extremal surfaces are out of this node's leading-order scope.",
			"key_concepts": [
				"entanglement entropy",
				"extremal surface",
				"replica trick"
			],
			"related_theories": [
				"UPI<theories,1,holography,ads_cft>",
				"UPI<gravity,1,horizon,bekenstein_hawking_entropy>",
				"UPI<information_physics,1,measure,universal_information_measure>"
			],
			"address_parts": {
				"domain_code": "theories",
				"generation": "1",
				"torus": "holography",
				"node_id": "ryu_takayanagi"
			}
		},
		{
			"kind": "node",
			"slug": "upi-theories-1-m-theory-eleven-d-brane",
			"file": "theories/eleven_d_brane.json",
			"domain": "theories",
			"address": "UPI<theories,1,m_theory,eleven_d_brane>",
			"title": "Eleven-dimensional M-brane",
			"description": "M-theory is an 11-dimensional framework whose extended objects are M2- and M5-branes. As a construction it is a defined duality web. As the physical substrate of information mass it is a dictionary step, not a measurement.",
			"status": "SYM",
			"quantities": [],
			"definitions": [
				"11D is the spacetime dimension of Cremmer–Julia–Scherk supergravity and of Witten's M-theory conjecture.",
				"M2 and M5 are the fundamental branes; their worldvolumes carry degrees of freedom.",
				"A dictionary that identifies those degrees of freedom with laboratory information is symbolic until a unique, tested map is given."
			],
			"equations": [
				"D = 11",
				"worldvolume_M2 = 3",
				"worldvolume_M5 = 6"
			],
			"assumptions": [
				"11D supergravity is the low-energy classical limit.",
				"M-theory itself is not a finished Hamiltonian.",
				"Our universe being a brane world is an additional hypothesis."
			],
			"mechanism": "Horava–Witten, AdS4×S7, and related dualities organise brane degrees of freedom. None of those dualities has been shown to be the encoding of m_I = h f / c².",
			"evidence": [{
				"type": "other",
				"source": "Witten (1995), String theory dynamics in various dimensions",
				"confidence": .4,
				"notes": "Establishes the 11D duality web as a theoretical construction. Does not establish branes as laboratory information carriers."
			}],
			"primary_sources": [
				"Cremmer, Julia, Scherk (1978), 11D supergravity",
				"Witten (1995), M-theory",
				"Horava, Witten (1996)"
			],
			"predictions": [],
			"falsification_conditions": ["A unique, parameter-free map from (f, m_I) to a named M2/M5 observable that fails a preregistered measurement."],
			"confusion_guard": "11D is a dimension count of a theory, not a photograph of the vacuum. The honest holographic closure of an M-brane is the named pair AdS4 × S7 / ABJM, not a free identification with laboratory information mass.",
			"stop_reason": "",
			"tags": [
				"m-theory",
				"brane",
				"11d",
				"symbolic"
			],
			"verification_type": "none",
			"claims_experimental_verification": false,
			"information_layer": "ACADEMIC",
			"version": "0.1.0",
			"scope": "Theoretical extended objects of 11D M-theory.",
			"scope_limits": "Not a claim that spacetime is an 11-brane, nor that every bit lives on an M2.",
			"key_concepts": [
				"M2",
				"M5",
				"eleven dimensions",
				"dictionary"
			],
			"related_theories": [
				"UPI<information_physics,1,measure,universal_information_measure>",
				"UPI<holography,1,m_theory,ads4_s7_abjm>",
				"UPI<holography,1,duality,ads_cft>"
			],
			"address_parts": {
				"domain_code": "theories",
				"generation": "1",
				"torus": "m_theory",
				"node_id": "eleven_d_brane"
			}
		}
	],
	bridges: [
		{
			"kind": "bridge",
			"slug": "upi-quantum-information-1-finite-dimensional-hilbert-state-space--measured-by--upi-quantum-information-1-measurement-born-probability-rule",
			"file": "bridges/hilbert_state_measured_by_born_rule.json",
			"domain": "bridges",
			"source": "UPI<quantum_information,1,finite_dimensional,hilbert_state_space>",
			"target": "UPI<quantum_information,1,measurement,born_probability_rule>",
			"relation": "MEASURED_BY",
			"status": "EST",
			"equations": ["p_j = |<j|psi>|^2", "sum_j p_j = 1"],
			"assumptions": ["The state is normalized.", "The measurement basis is orthonormal and complete."],
			"mechanism": "Projection amplitudes from the Hilbert-space state are converted to ideal outcome probabilities by squared magnitude.",
			"confusion_guard": "Computing ideal probabilities in software is not an actual physical measurement event.",
			"stop_reason": "",
			"version": "0.1.0"
		},
		{
			"kind": "bridge",
			"slug": "upi-quantum-information-1-multi-qudit-tensor-product-register--derived-from--upi-quantum-information-1-finite-dimensional-hilbert-state-space",
			"file": "bridges/multi_qudit_register_from_hilbert_spaces.json",
			"domain": "bridges",
			"source": "UPI<quantum_information,1,multi_qudit,tensor_product_register>",
			"target": "UPI<quantum_information,1,finite_dimensional,hilbert_state_space>",
			"relation": "DERIVED_FROM",
			"status": "EST",
			"equations": ["H = tensor_i H_i", "dim(H) = product_i dim(H_i)"],
			"assumptions": ["Subsystem order is declared and fixed.", "Each local space is finite-dimensional."],
			"mechanism": "Composite systems use the tensor product of their local Hilbert spaces, producing product-basis coordinates and a total dimension equal to the product of local dimensions.",
			"confusion_guard": "Tensor-product composition permits entangled states but does not prove that a particular software state is physically entangled.",
			"stop_reason": "",
			"version": "0.1.0"
		},
		{
			"kind": "bridge",
			"slug": "upi-quantum-information-1-qudit-fourier-dual-basis--dual-to--upi-quantum-information-1-finite-dimensional-hilbert-state-space",
			"file": "bridges/qudit_fourier_dual_to_computational_basis.json",
			"domain": "bridges",
			"source": "UPI<quantum_information,1,qudit,fourier_dual_basis>",
			"target": "UPI<quantum_information,1,finite_dimensional,hilbert_state_space>",
			"relation": "DUAL_TO",
			"status": "EST",
			"equations": ["F_d^(-1) F_d = I_d", "|<k|F_d|j>|^2 = 1/d"],
			"assumptions": ["Both bases span the same finite-dimensional Hilbert space.", "The normalized Fourier convention is used consistently."],
			"mechanism": "A unitary Fourier transform changes coordinates between computational and Fourier-dual basis representations without changing the underlying state.",
			"confusion_guard": "Dual basis descriptions are not two different physical systems and do not imply a hidden duplicate universe.",
			"stop_reason": "",
			"version": "0.1.0"
		},
		{
			"kind": "bridge",
			"slug": "upi-quantum-information-1-qudit-generalized-weyl-gates--derived-from--upi-quantum-information-1-finite-dimensional-hilbert-state-space",
			"file": "bridges/qudit_gates_from_hilbert_space.json",
			"domain": "bridges",
			"source": "UPI<quantum_information,1,qudit,generalized_weyl_gates>",
			"target": "UPI<quantum_information,1,finite_dimensional,hilbert_state_space>",
			"relation": "DERIVED_FROM",
			"status": "EST",
			"equations": ["X_d^dagger X_d = I_d", "Z_d^dagger Z_d = I_d"],
			"assumptions": ["The computational basis is an orthonormal basis of C^d.", "Basis labels are interpreted modulo d."],
			"mechanism": "The generalized gates are unitary operators defined on the finite-dimensional Hilbert space.",
			"confusion_guard": "This mathematical derivation does not establish physical gate implementation or fidelity.",
			"stop_reason": "",
			"version": "0.1.0"
		},
		{
			"kind": "bridge",
			"slug": "upi-information-physics-3-qudit-torus-digital-multi-state-search--derived-from--upi-quantum-algorithms-1-amplitude-amplification-phase-oracle-diffusion",
			"file": "bridges/torus_search_from_amplitude_amplification.json",
			"domain": "bridges",
			"source": "UPI<information_physics,3,qudit_torus,digital_multi_state_search>",
			"target": "UPI<quantum_algorithms,1,amplitude_amplification,phase_oracle_diffusion>",
			"relation": "DERIVED_FROM",
			"status": "DER",
			"equations": [
				"O_f |x> = (-1)^(f(x)) |x>",
				"D = 2 |s><s| - I",
				"P_success(r) = sin^2((2 r + 1) theta)"
			],
			"assumptions": [
				"The simulator begins from the declared uniform state.",
				"Target indices implement the Boolean marking function.",
				"The state vector is updated in classical memory."
			],
			"mechanism": "The digital search reproduces ideal phase-oracle and diffusion updates and records the resulting marked-state probability at every stage.",
			"confusion_guard": "Agreement with Grover probabilities validates the simulator mathematics, not physical square-root speedup.",
			"stop_reason": "",
			"version": "0.1.0"
		},
		{
			"kind": "bridge",
			"slug": "upi-information-physics-3-qudit-torus-digital-multi-state-search--derived-from--upi-quantum-information-1-qudit-fourier-dual-basis",
			"file": "bridges/torus_search_from_fourier_duality.json",
			"domain": "bridges",
			"source": "UPI<information_physics,3,qudit_torus,digital_multi_state_search>",
			"target": "UPI<quantum_information,1,qudit,fourier_dual_basis>",
			"relation": "DERIVED_FROM",
			"status": "DER",
			"equations": ["F_i = I tensor ... tensor F_(d_i) tensor ... tensor I", "epsilon_dual = max_x |alpha_x - alpha_hat_x|"],
			"assumptions": ["The same subsystem ordering is used in forward and inverse transforms.", "Finite-precision error is compared with a declared tolerance."],
			"mechanism": "The simulator applies the established qudit Fourier transform locally to every selected axis and uses inverse reconstruction as an audit invariant.",
			"confusion_guard": "The round-trip check validates numerical reversibility of the software transform, not physical coherence time.",
			"stop_reason": "",
			"version": "0.1.0"
		},
		{
			"kind": "bridge",
			"slug": "upi-information-physics-3-qudit-torus-digital-multi-state-search--derived-from--upi-quantum-information-1-qudit-generalized-weyl-gates",
			"file": "bridges/torus_search_from_local_qudit_functions.json",
			"domain": "bridges",
			"source": "UPI<information_physics,3,qudit_torus,digital_multi_state_search>",
			"target": "UPI<quantum_information,1,qudit,generalized_weyl_gates>",
			"relation": "DERIVED_FROM",
			"status": "DER",
			"equations": ["X_i = I tensor ... tensor X_(d_i) tensor ... tensor I", "Z_i = I tensor ... tensor Z_(d_i) tensor ... tensor I"],
			"assumptions": ["Each torus axis corresponds to one local d_i-level subsystem.", "Identity operators act on every non-target axis."],
			"mechanism": "The simulator lifts each local qudit operation into the joint register by tensoring it with identities on all other axes.",
			"confusion_guard": "Local tensor action is established mathematics; the UPI torus naming and software API are derived implementation choices.",
			"stop_reason": "",
			"version": "0.1.0"
		},
		{
			"kind": "bridge",
			"slug": "upi-information-physics-3-qudit-torus-digital-multi-state-search--derived-from--upi-quantum-information-1-multi-qudit-tensor-product-register",
			"file": "bridges/torus_search_from_tensor_register.json",
			"domain": "bridges",
			"source": "UPI<information_physics,3,qudit_torus,digital_multi_state_search>",
			"target": "UPI<quantum_information,1,multi_qudit,tensor_product_register>",
			"relation": "DERIVED_FROM",
			"status": "DER",
			"equations": ["N = product_i d_i", "x = mixed_radix(j_1,...,j_n)"],
			"assumptions": ["Each software torus is one cyclic mixed-radix register coordinate.", "Coordinate order is deterministic."],
			"mechanism": "The UPI torus register uses the standard tensor-product basis cardinality and represents product coordinates with a reversible mixed-radix index.",
			"confusion_guard": "The torus is a cyclic software-coordinate interpretation of the register, not an established physical hardware shape.",
			"stop_reason": "",
			"version": "0.1.0"
		},
		{
			"kind": "bridge",
			"slug": "upi-information-physics-3-qudit-torus-digital-multi-state-search--stops-at--upi-computational-physics-2-state-vector-classical-resource-boundary",
			"file": "bridges/torus_search_stops_at_classical_resource_boundary.json",
			"domain": "bridges",
			"source": "UPI<information_physics,3,qudit_torus,digital_multi_state_search>",
			"target": "UPI<computational_physics,2,state_vector,classical_resource_boundary>",
			"relation": "STOPS_AT",
			"status": "STOP",
			"equations": ["memory = O(N)", "N = product_i d_i"],
			"assumptions": ["The current implementation explicitly stores the complete dense amplitude vector.", "No verified quantum processor executes the indexed software path."],
			"mechanism": "The digital engine reproduces ideal qudit linear algebra by updating all amplitudes in ordinary memory, so its verified claims stop at classical simulation and software correctness.",
			"confusion_guard": "Multi-state amplitudes, duality and Grover equations do not establish quantum hardware or quantum advantage.",
			"stop_reason": "Physical coherence, entanglement, gate fidelity and end-to-end quantum speedup require independently verified hardware experiments and matched resource comparisons.",
			"version": "0.1.0"
		},
		{
			"kind": "bridge",
			"slug": "upi-coding-theory-1-sphere-packing-leech-lattice--derived-from--upi-coding-theory-1-binary-code-extended-golay",
			"file": "bridges/leech_from_golay.json",
			"domain": "bridges",
			"source": "UPI<coding_theory,1,sphere_packing,leech_lattice>",
			"target": "UPI<coding_theory,1,binary_code,extended_golay>",
			"relation": "DERIVED_FROM",
			"status": "EST",
			"equations": ["Λ24 constructed from G24 by the Witt / Construction-A family"],
			"assumptions": ["The code is the extended binary Golay code of length 24."],
			"mechanism": "Golay codewords determine which coordinates of a 24-vector receive a prescribed shift; the generated lattice is Λ24.",
			"confusion_guard": "A construction theorem is not a physical condensation of bits into a crystal.",
			"stop_reason": "",
			"version": "0.1.0"
		},
		{
			"kind": "bridge",
			"slug": "upi-coding-theory-1-root-system-e8-lattice--derived-from--upi-coding-theory-1-binary-code-extended-golay",
			"file": "bridges/e8_analogous_to_golay_leech.json",
			"domain": "bridges",
			"source": "UPI<coding_theory,1,root_system,e8_lattice>",
			"target": "UPI<coding_theory,1,binary_code,extended_golay>",
			"relation": "DERIVED_FROM",
			"status": "SYM",
			"equations": ["Hamming[8,4,4] : E8  ::  Golay[24,12,8] : Λ24"],
			"assumptions": ["The relation recorded here is an analogy of constructions, not an embedding of G24 into E8."],
			"mechanism": "Even unimodular lattices arise from certain self-dual codes. E8 is the 8-dimensional cousin of that story; Λ24 is the 24-dimensional one.",
			"confusion_guard": "This is a symbolic mapping between two constructions. It does not derive the E8 root system from a 24-bit string.",
			"stop_reason": "",
			"version": "0.1.0"
		},
		{
			"kind": "bridge",
			"slug": "upi-quantum-information-1-error-correction-syndrome-measurement--derived-from--upi-coding-theory-1-binary-code-extended-golay",
			"file": "bridges/qec_from_golay.json",
			"domain": "bridges",
			"source": "UPI<quantum_information,1,error_correction,syndrome_measurement>",
			"target": "UPI<coding_theory,1,binary_code,extended_golay>",
			"relation": "DERIVED_FROM",
			"status": "DER",
			"equations": ["CSS(G24, G24) uses the classical parity checks of G24 as stabilizer generators"],
			"assumptions": ["A CSS construction is declared. G24 is self-dual, so it can serve as both C1 and C2 under the usual inclusion conditions."],
			"mechanism": "Measuring the classical Golay parity checks as Pauli operators yields a syndrome; the Golay decoder proposes a recovery.",
			"confusion_guard": "Availability of the classical decoder does not imply a physical Golay CSS qubit has been built.",
			"stop_reason": "",
			"version": "0.1.0"
		},
		{
			"kind": "bridge",
			"slug": "upi-quantum-information-1-error-correction-syndrome-measurement--derived-from--upi-quantum-information-1-finite-dimensional-hilbert-state-space",
			"file": "bridges/qec_from_hilbert.json",
			"domain": "bridges",
			"source": "UPI<quantum_information,1,error_correction,syndrome_measurement>",
			"target": "UPI<quantum_information,1,finite_dimensional,hilbert_state_space>",
			"relation": "DERIVED_FROM",
			"status": "EST",
			"equations": ["C = { |ψ> in H : g |ψ> = |ψ> for all g in S }"],
			"assumptions": ["H is finite-dimensional. S is a declared stabilizer group."],
			"mechanism": "A stabilizer code is a linear subspace of a finite-dimensional Hilbert space cut out by commuting Pauli checks.",
			"confusion_guard": "Existence of the subspace is linear algebra; it is not an experimental demonstration of coherence.",
			"stop_reason": "",
			"version": "0.1.0"
		},
		{
			"kind": "bridge",
			"slug": "upi-information-physics-1-inertia-frequency-mass-equivalent--derived-from--upi-quantum-mechanics-1-quanta-planck-einstein-relation",
			"file": "bridges/frequency_mass_from_planck_einstein.json",
			"domain": "bridges",
			"source": "UPI<information_physics,1,inertia,frequency_mass_equivalent>",
			"target": "UPI<QUANTUM_MECHANICS,1,QUANTA,PLANCK_EINSTEIN_RELATION>",
			"relation": "DERIVED_FROM",
			"status": "DER",
			"equations": ["E = h f", "m = E / c^2 = h f / c^2"],
			"assumptions": ["The energy being identified is a mode quantum of frequency f."],
			"mechanism": "Einstein used Planck’s quantum of action as the energy of a light quantum. The same E is the energy that carries inertia.",
			"confusion_guard": "Building on Planck is what Einstein did. Building on Einstein with the same E is composition, not a new emission law.",
			"stop_reason": "",
			"version": "0.1.0"
		},
		{
			"kind": "bridge",
			"slug": "upi-information-physics-1-inertia-frequency-mass-equivalent--derived-from--upi-relativity-1-t-energy-n-mass-energy",
			"file": "bridges/frequency_mass_from_mass_energy.json",
			"domain": "bridges",
			"source": "UPI<information_physics,1,inertia,frequency_mass_equivalent>",
			"target": "UPI<RELATIVITY,1,T_ENERGY,N_MASS_ENERGY>",
			"relation": "DERIVED_FROM",
			"status": "DER",
			"equations": ["E = m c^2", "m = h f / c^2"],
			"assumptions": ["E on the left is rest energy when m is invariant mass of a body at rest.", "When E is radiation energy, m is the mass equivalent of that energy, not a photon rest mass."],
			"mechanism": "E = m c² is itself derived (Einstein 1905, inertia of energy). Applying it to E = h f is the same derivation with a different named energy.",
			"confusion_guard": "Calling E = m c² established and m = h f / c² ‘merely a rewrite’ is an inconsistent standard: both are derived identifications whose status rides on what m names and what has been measured.",
			"stop_reason": "",
			"version": "0.1.0"
		},
		{
			"kind": "bridge",
			"slug": "upi-information-physics-1-inertia-frequency-mass-equivalent--derived-from--upi-physics-1-fundamental-planck-constant",
			"file": "bridges/frequency_mass_from_planck_constant.json",
			"domain": "bridges",
			"source": "UPI<information_physics,1,inertia,frequency_mass_equivalent>",
			"target": "UPI<physics,1,fundamental,planck_constant>",
			"relation": "DERIVED_FROM",
			"status": "EST",
			"equations": ["h = 6.62607015e-34 J s (exact)", "m = h f / c^2"],
			"assumptions": ["SI 2019 exact h and c."],
			"mechanism": "The conversion factor from frequency to mass-equivalent is h/c², built from two SI-defined constants.",
			"confusion_guard": "Exact constants make the arithmetic exact. They do not enlarge the physical referent of m.",
			"stop_reason": "",
			"version": "0.1.0"
		},
		{
			"kind": "bridge",
			"slug": "upi-information-physics-1-inertia-information-mass--derived-from--upi-information-physics-1-inertia-frequency-mass-equivalent",
			"file": "bridges/information_mass_from_frequency_mass.json",
			"domain": "bridges",
			"source": "UPI<information_physics,1,inertia,information_mass>",
			"target": "UPI<information_physics,1,inertia,frequency_mass_equivalent>",
			"relation": "DERIVED_FROM",
			"status": "HYP",
			"equations": [
				"m_I = h f / c^2",
				"m = h f / c^2",
				"m_I = m under frequency encoding"
			],
			"assumptions": ["The energy whose mass equivalent is taken is a frequency-encoded information carrier."],
			"mechanism": "The DER record supplies the kilogram. The HYP record supplies the name and the encoding assumption. Same number, extra claim.",
			"confusion_guard": "Derivation of the kilogram does not promote the information-mass identification. Status of the bridge is HYP because the referent, not the algebra, is the claim.",
			"stop_reason": "",
			"version": "0.1.0"
		},
		{
			"kind": "bridge",
			"slug": "upi-information-physics-1-measure-universal-information-measure--derived-from--upi-information-physics-1-inertia-information-mass",
			"file": "bridges/measure_from_information_mass.json",
			"domain": "bridges",
			"source": "UPI<information_physics,1,measure,universal_information_measure>",
			"target": "UPI<information_physics,1,inertia,information_mass>",
			"relation": "DERIVED_FROM",
			"status": "HYP",
			"equations": ["m_I = h f / c^2"],
			"assumptions": ["The inertial station of the measure is information mass."],
			"mechanism": "The measure uses m_I as the number assigned to a frequency-encoded carrier, then duals that number through entropy and a brane dictionary.",
			"confusion_guard": "Universality of the measure is a larger claim than information mass alone.",
			"stop_reason": "",
			"version": "0.1.0"
		},
		{
			"kind": "bridge",
			"slug": "upi-information-physics-1-measure-universal-information-measure--dual-to--upi-gravity-1-horizon-bekenstein-hawking-entropy",
			"file": "bridges/measure_dual_bekenstein.json",
			"domain": "bridges",
			"source": "UPI<information_physics,1,measure,universal_information_measure>",
			"target": "UPI<gravity,1,horizon,bekenstein_hawking_entropy>",
			"relation": "DUAL_TO",
			"status": "HYP",
			"equations": ["S/k = A(m_I) / (4 ℓ_P^2)", "A = 4 pi (2 G m_I / c^2)^2"],
			"assumptions": ["The mass is treated as a Schwarzschild source.", "R_s >> ℓ_P for the EST area law to apply."],
			"mechanism": "Inertia dualises to area, area to entropy. That is the purest gravitational entropy. It is not Shannon entropy of the bit.",
			"confusion_guard": "Duality here is a dictionary of numbers, not a proof that a photon is a black hole.",
			"stop_reason": "",
			"version": "0.1.0"
		},
		{
			"kind": "bridge",
			"slug": "upi-information-physics-1-measure-universal-information-measure--dual-to--upi-theories-1-m-theory-eleven-d-brane",
			"file": "bridges/measure_dual_brane.json",
			"domain": "bridges",
			"source": "UPI<information_physics,1,measure,universal_information_measure>",
			"target": "UPI<theories,1,m_theory,eleven_d_brane>",
			"relation": "DUAL_TO",
			"status": "SYM",
			"equations": ["microstates ~ exp(S/k) as brane degrees of freedom"],
			"assumptions": ["An 11D brane worldvolume can host the degeneracy counted by S."],
			"mechanism": "Holographic counting on branes is the candidate closure that returns entropy to information. Without a unique map from m_I to a named worldvolume, this station is symbolic.",
			"confusion_guard": "11D is not evidence. A loop drawn through a brane is still a drawing.",
			"stop_reason": "",
			"version": "0.1.0"
		},
		{
			"kind": "bridge",
			"slug": "upi-information-physics-1-measure-universal-information-measure--stops-at--upi-information-physics-1-measure-sub-planck-horizon",
			"file": "bridges/measure_stops_sub_planck.json",
			"domain": "bridges",
			"source": "UPI<information_physics,1,measure,universal_information_measure>",
			"target": "UPI<information_physics,1,measure,sub_planck_horizon>",
			"relation": "STOPS_AT",
			"status": "STOP",
			"equations": ["STOP if 2 G h f / c^4 < ℓ_P"],
			"assumptions": ["Geometric station uses Schwarzschild radius of m_I."],
			"mechanism": "Lab frequencies fail the semiclassical horizon test. The measure still prints formal numbers; those numbers are not in-domain S_BH.",
			"confusion_guard": "STOP is a domain cut, not a rejection of information mass.",
			"stop_reason": "R_s << ℓ_P for accessible f.",
			"version": "0.1.0"
		},
		{
			"kind": "bridge",
			"slug": "upi-holography-1-entropy-ryu-takayanagi--derived-from--upi-holography-1-duality-ads-cft",
			"file": "bridges/rt_from_ads_cft.json",
			"domain": "bridges",
			"source": "UPI<holography,1,entropy,ryu_takayanagi>",
			"target": "UPI<holography,1,duality,ads_cft>",
			"relation": "DERIVED_FROM",
			"status": "EST",
			"equations": ["S_A = Area(γ_A) / (4 G_N)"],
			"assumptions": ["Einstein gravity in asymptotically AdS, large N."],
			"mechanism": "Replica trick in the CFT is dual to a bulk orbifold; the leading action is the area of the extremal surface.",
			"confusion_guard": "RT is derived inside AdS/CFT. It does not inherit a Minkowski domain.",
			"stop_reason": "",
			"version": "0.1.0"
		},
		{
			"kind": "bridge",
			"slug": "upi-holography-1-entropy-ryu-takayanagi--dual-to--upi-gravity-1-horizon-bekenstein-hawking-entropy",
			"file": "bridges/rt_dual_bekenstein.json",
			"domain": "bridges",
			"source": "UPI<holography,1,entropy,ryu_takayanagi>",
			"target": "UPI<gravity,1,horizon,bekenstein_hawking_entropy>",
			"relation": "DUAL_TO",
			"status": "DER",
			"equations": ["S_BH = A_horizon / (4 G_N)", "S_RT = Area(γ) / (4 G_N)"],
			"assumptions": ["For a thermal AdS black hole, the RT surface of the entire boundary is the horizon."],
			"mechanism": "Both are area laws in Planck units. BH is a causal horizon. RT is an extremal surface for a boundary region. They coincide for the whole-boundary thermal state.",
			"confusion_guard": "Same 1/4G, different surfaces. A lab Schwarzschild radius of m_I is neither.",
			"stop_reason": "",
			"version": "0.1.0"
		},
		{
			"kind": "bridge",
			"slug": "upi-holography-1-m-theory-ads4-s7-abjm--derived-from--upi-holography-1-duality-ads-cft",
			"file": "bridges/abjm_from_ads_cft.json",
			"domain": "bridges",
			"source": "UPI<holography,1,m_theory,ads4_s7_abjm>",
			"target": "UPI<holography,1,duality,ads_cft>",
			"relation": "DERIVED_FROM",
			"status": "DER",
			"equations": ["AdS4 × S7 ↔ ABJM"],
			"assumptions": ["M2-brane near-horizon geometry."],
			"mechanism": "The general AdS/CFT pattern applied to eleven-dimensional M2-branes.",
			"confusion_guard": "An instance of the duality, not a second duality.",
			"stop_reason": "",
			"version": "0.1.0"
		},
		{
			"kind": "bridge",
			"slug": "upi-holography-1-m-theory-ads4-s7-abjm--derived-from--upi-theories-1-m-theory-eleven-d-brane",
			"file": "bridges/abjm_from_m_brane.json",
			"domain": "bridges",
			"source": "UPI<holography,1,m_theory,ads4_s7_abjm>",
			"target": "UPI<theories,1,m_theory,eleven_d_brane>",
			"relation": "DERIVED_FROM",
			"status": "DER",
			"equations": ["M2 worldvolume → ABJM", "near horizon → AdS4 × S7"],
			"assumptions": ["The 11D object is an M2 stack, not an unspecified brane picture."],
			"mechanism": "This is the honest way an 11D brane closes into holography: named worldvolume, named near-horizon, named CFT.",
			"confusion_guard": "Promotes the 11D station from a drawing to a named pair. Still not a lab encoding.",
			"stop_reason": "",
			"version": "0.1.0"
		},
		{
			"kind": "bridge",
			"slug": "upi-information-physics-1-measure-universal-information-measure--dual-to--upi-holography-1-duality-ads-cft",
			"file": "bridges/measure_dual_ads_cft.json",
			"domain": "bridges",
			"source": "UPI<information_physics,1,measure,universal_information_measure>",
			"target": "UPI<holography,1,duality,ads_cft>",
			"relation": "DUAL_TO",
			"status": "HYP",
			"equations": ["m_I = h f / c^2  vs  S_A = Area(γ_A)/(4 G_N)"],
			"assumptions": ["Identifying the measure's geometric station with RT requires an AdS bulk and a CFT encoding of the information."],
			"mechanism": "AdS/CFT is the actual holographic dictionary. The measure uses a Minkowski Schwarzschild area of m_I. Equating them is a hypothesis that the lab encoding is a holographic CFT state. Our cosmology is closer to dS than AdS; lab frequencies have R_s << ℓ_P.",
			"confusion_guard": "EST holography does not promote the measure. The dictionary is not portable to arbitrary spacetime by naming.",
			"stop_reason": "",
			"version": "0.1.0"
		},
		{
			"kind": "bridge",
			"slug": "upi-theories-1-holography-ads-cft--derived-from--upi-gravity-1-spacetime-anti-de-sitter",
			"file": "bridges/ads_cft_from_ads.json",
			"domain": "bridges",
			"source": "UPI<theories,1,holography,ads_cft>",
			"target": "UPI<gravity,1,spacetime,anti_de_sitter>",
			"relation": "DERIVED_FROM",
			"status": "HYP",
			"equations": ["bulk = AdS_{d+1} (plus compact space)"],
			"assumptions": ["The gravitational side is asymptotically AdS."],
			"mechanism": "Without a conformal boundary of AdS type, the GKP–Witten dictionary is not the one Maldacena wrote.",
			"confusion_guard": "AdS geometry is EST. The duality using it is HYP.",
			"stop_reason": "",
			"version": "0.1.0"
		},
		{
			"kind": "bridge",
			"slug": "upi-theories-1-holography-ads-cft--derived-from--upi-quantum-field-1-symmetry-conformal-field-theory",
			"file": "bridges/ads_cft_from_cft.json",
			"domain": "bridges",
			"source": "UPI<theories,1,holography,ads_cft>",
			"target": "UPI<quantum_field,1,symmetry,conformal_field_theory>",
			"relation": "DERIVED_FROM",
			"status": "HYP",
			"equations": ["boundary = CFT_d"],
			"assumptions": ["The field-theory side is conformal, or a relevant deformation of a CFT."],
			"mechanism": "The isometry group of AdS_{d+1} is the conformal group of the boundary.",
			"confusion_guard": "CFT is EST as a class of QFTs. Which CFT is whose bulk is the conjecture.",
			"stop_reason": "",
			"version": "0.1.0"
		},
		{
			"kind": "bridge",
			"slug": "upi-theories-1-holography-ryu-takayanagi--derived-from--upi-theories-1-holography-ads-cft",
			"file": "bridges/rt_from_ads_cft.json",
			"domain": "bridges",
			"source": "UPI<theories,1,holography,ryu_takayanagi>",
			"target": "UPI<theories,1,holography,ads_cft>",
			"relation": "DERIVED_FROM",
			"status": "DER",
			"equations": ["S_A = Area(γ_A)/4G_N"],
			"assumptions": ["Classical bulk; leading order in G_N."],
			"mechanism": "Replica trick maps CFT entanglement to a bulk cosmic brane whose n→1 limit is the area.",
			"confusion_guard": "RT inherits the domain of AdS/CFT. It does not enlarge that domain to our sky or to m_I of a lab oscillator.",
			"stop_reason": "",
			"version": "0.1.0"
		},
		{
			"kind": "bridge",
			"slug": "upi-theories-1-holography-ryu-takayanagi--derived-from--upi-gravity-1-horizon-bekenstein-hawking-entropy",
			"file": "bridges/rt_from_bh.json",
			"domain": "bridges",
			"source": "UPI<theories,1,holography,ryu_takayanagi>",
			"target": "UPI<gravity,1,horizon,bekenstein_hawking_entropy>",
			"relation": "DERIVED_FROM",
			"status": "DER",
			"equations": ["horizon area law ⊂ RT when A is thermal and γ_A is the horizon"],
			"assumptions": ["The area law of horizons is the special case of an extremal surface wrapping a horizon."],
			"mechanism": "RT generalises Bekenstein–Hawking from event horizons to entanglement wedges.",
			"confusion_guard": "Generalising an area law is not assigning that area law to a sub-Planck Schwarzschild radius of h f / c².",
			"stop_reason": "",
			"version": "0.1.0"
		},
		{
			"kind": "bridge",
			"slug": "upi-theories-1-holography-ads-cft--dual-to--upi-theories-1-m-theory-eleven-d-brane",
			"file": "bridges/ads_cft_dual_brane.json",
			"domain": "bridges",
			"source": "UPI<theories,1,holography,ads_cft>",
			"target": "UPI<theories,1,m_theory,eleven_d_brane>",
			"relation": "DUAL_TO",
			"status": "HYP",
			"equations": ["AdS4 × S7 ↔ ABJM (M2)", "AdS7 × S4 ↔ 6d (2,0) (M5)"],
			"assumptions": ["The 11D Freund–Rubin vacua are the near-horizon limits of M2/M5 stacks."],
			"mechanism": "This is the precise sense in which 11D branes close a holographic loop: the worldvolume CFT is dual to the AdS compactification, not to a laboratory frequency.",
			"confusion_guard": "M-theory examples of AdS/CFT do not make the 11D brane a SYM ontology of m_I.",
			"stop_reason": "",
			"version": "0.1.0"
		},
		{
			"kind": "bridge",
			"slug": "upi-information-physics-1-measure-universal-information-measure--dual-to--upi-theories-1-holography-ads-cft",
			"file": "bridges/measure_dual_ads_cft.json",
			"domain": "bridges",
			"source": "UPI<information_physics,1,measure,universal_information_measure>",
			"target": "UPI<theories,1,holography,ads_cft>",
			"relation": "DUAL_TO",
			"status": "SYM",
			"equations": ["in-domain holographic number = S_A = Area(γ_A)/4G_N"],
			"assumptions": ["The measure's entropy station, when in-domain, is holographic entanglement, not S_BH(m_I) for a lab quantum."],
			"mechanism": "AdS/CFT is the controlled dictionary that actually closes information (CFT) onto inertia/geometry (bulk). The lab-frequency Schwarzschild station remains STOP.",
			"confusion_guard": "Do not replace the STOP at sub-Planck R_s by writing AdS/CFT on the same line. Different domains.",
			"stop_reason": "",
			"version": "0.1.0"
		},
		{
			"kind": "bridge",
			"slug": "upi-theories-1-holography-ads-cft--stops-at--upi-theories-1-holography-not-our-sky",
			"file": "bridges/ads_cft_stops_sky.json",
			"domain": "bridges",
			"source": "UPI<theories,1,holography,ads_cft>",
			"target": "UPI<theories,1,holography,not_our_sky>",
			"relation": "STOPS_AT",
			"status": "STOP",
			"equations": ["Λ_AdS < 0 ≠ Λ_obs > 0"],
			"assumptions": ["Late-universe acceleration is a positive effective cosmological constant."],
			"mechanism": "Wrong sign of Λ; wrong conformal boundary.",
			"confusion_guard": "STOP applies to cosmology, not to the duality as a statement about AdS theories.",
			"stop_reason": "Observed Λ has the wrong sign.",
			"version": "0.1.0"
		}
	],
	sources: [
		{
			"kind": "source",
			"slug": "arxiv",
			"file": "sources/arxiv.json",
			"domain": "sources",
			"source_id": "arxiv",
			"title": "Open-access archive for scholarly articles in physics, mathematics, computer science, quantitative biology, quantitative finance, statistics, electrical engineering, and systems science.",
			"canonical_url": "https://arxiv.org/",
			"status": "DER",
			"evidence_boundary": "This record establishes that arXiv scientific preprint metadata, version identifiers, author listings, categories (quant-ph, hep-th, gr-qc, cs.AI), abstracts, and DOI cross-references exist as indexed. It does not independently verify the physical claims, experimental accuracy, or peer-reviewed status of preprints.",
			"confusion_guard": "arXiv preprint metadata, author abstracts, and paper listings must not be promoted to established physical law or peer-reviewed experimental proof. UPI records provenance and bounded relations only.",
			"classification_rules": [
				"Preprint metadata (arXiv ID, version, authors, category, submission date) may be recorded as EST within the narrow source-fact domain.",
				"Metadata structures and categorical relation maps are DER.",
				"Physical claims, experimental verifications, and theoretical proofs in preprints remain STOP or HYP until independently validated.",
				"Preprint status must not be silently upgraded to peer-reviewed status without explicit journal metadata."
			],
			"declared_license": "arXiv.org perpetual non-exclusive license / Open Access (CC-BY/CC0)",
			"source_type": "arxiv_api_and_bulk_metadata",
			"retrieved_at": "2026-08-05"
		},
		{
			"kind": "source",
			"slug": "indaleko",
			"file": "sources/indaleko.json",
			"domain": "sources",
			"source_id": "indaleko",
			"title": "Indaleko: the unified personal index (Mason 2026). Personal-file retrieval dissertation; claimed 160TB / 31M-file corpus across eight storage platforms.",
			"canonical_url": "https://arxiv.org/abs/2602.20507",
			"status": "STOP",
			"evidence_boundary": "This record cites a personal-information-retrieval dissertation (arXiv:2602.20507). Abstract: 31 million files spanning 160TB. Body: 31.9 million files, 35.1 TB capacity, 16.2 TB used, 78.6 GB ArangoDB metadata. Evaluation used synthetic activity metadata. It does not supply physics evidence.",
			"confusion_guard": "Indaleko's UPI is the Unified Personal Index, not this Universal Physics Index. Do not ingest the 160TB. Do not treat personal-file retrieval, GPS, or Spotify collectors as a physics result.",
			"classification_rules": [
				"Paper metadata (arXiv ID, author, date, code URL) may be recorded as EST in the source-fact domain.",
				"The 160TB vs 16.2TB used discrepancy remains STOP until the two figures are reconciled in the source.",
				"Personal file payloads and cloud-drive collectors stay out of this ledger.",
				"Memory-anchor types may be mapped symbolically onto physics provenance (when, laboratory, who, experiment). That mapping is SYM."
			],
			"declared_license": "arXiv.org perpetual non-exclusive license",
			"source_type": "arxiv_dissertation",
			"retrieved_at": "2026-09-02"
		},
		{
			"kind": "source",
			"slug": "sunet",
			"file": "sources/sunet.json",
			"domain": "sources",
			"source_id": "sunet",
			"title": "Swedish University Computer Network (Sunet) infrastructure, service metadata, SWAMID identity federation, and academic research data storage services.",
			"canonical_url": "https://www.sunet.se/",
			"status": "DER",
			"evidence_boundary": "This record establishes that Sunet academic network infrastructure metadata, identity federation (SWAMID) specifications, storage service descriptions, and public organizational pages exist at the indicated timestamp. It does not independently verify physical laws, network security guarantees, or academic research conclusions of connected institutions.",
			"confusion_guard": "Sunet network infrastructure, identity schemas, and academic data services must not be promoted to established physics, experimental verification, or hidden sovereign permission. UPI records provenance and bounded relations only.",
			"classification_rules": [
				"Public site metadata, sitemap entries, document dates, and infrastructure service specifications may be recorded as EST within the narrow source-fact domain.",
				"Structural topological maps and relation graphs derived from Sunet documents are DER.",
				"Unverified scientific claims in publications hosted on connected network nodes remain STOP or HYP until independently validated.",
				"Identity metadata, SAML assertions, and remote web pages are treated as untrusted source data.",
				"Network bandwidth numbers or optical frequencies represent infrastructure capabilities, not universal physical constants or proofs of physical mechanisms."
			],
			"declared_license": "CC-BY-4.0",
			"source_type": "sitemap_and_html_metadata",
			"retrieved_at": "2026-08-05"
		},
		{
			"kind": "source",
			"slug": "sunet-network-map",
			"file": "sources/sunet_network_map.json",
			"domain": "sources",
			"source_id": "sunet_network_map",
			"title": "Swedish University Computer Network (Sunet)",
			"canonical_url": "https://www.sunet.se/",
			"status": "DER",
			"evidence_boundary": "This topology map establishes the declared optical backbone rings, identity federation services (SWAMID), high-performance computing centers (NAISS), and international research lightpaths (MAX IV, ESS, CERN via NORDUnet) as indexed from public SUNET service specifications. Network throughput ratings represent optical capacity limits, not physical laws or evidence of biological/metaphysical resonance.",
			"confusion_guard": "SUNET network infrastructure topology represents high-speed optical packet and DWDM routing for academic research; it does not claim quantum teleportation, universal biological coherence, or hidden permission.",
			"classification_rules": [],
			"declared_license": "",
			"source_type": "",
			"retrieved_at": ""
		},
		{
			"kind": "source",
			"slug": "upi-source-x-drpepper-se",
			"file": "sources/x_drpepper_se.json",
			"domain": "sources",
			"source_id": "x_drpepper_se",
			"title": "X timeline @DrPepper_se (public posts, 2026)",
			"canonical_url": "https://x.com/DrPepper_se",
			"status": "SYM",
			"evidence_boundary": "Public posts and replies. Not a follower graph. Tweets are sources, not DNA, until typed as nodes. 38 followers at retrieval; following/follower lists were not available to this mapper.",
			"confusion_guard": "A post containing m=hf/c² does not promote information-mass or close the Standard Model.",
			"classification_rules": [
				"Cite EST/DER identities already in DNA.",
				"Map unmapped EST (Landauer, Schumann) and DER (Compton clock).",
				"STOP overlay identities (SM close, TF1766=G, 8.2 Hz operator).",
				"Drop genealogy, witch-thrust, ice-knock as physics."
			],
			"declared_license": "public posts",
			"source_type": "social_graph",
			"retrieved_at": "2026-09-02"
		}
	]
};
var SNAPSHOT = catalog_default;
var useLive = create(() => ({
	catalog: SNAPSHOT,
	origin: "snapshot",
	sha: null,
	branch: DNA.branch,
	writable: false,
	fetchedAt: null,
	files: SNAPSHOT.nodes.length + SNAPSHOT.bridges.length,
	error: null,
	pulling: false
}));
function getLiveCatalog() {
	return useLive.getState().catalog;
}
function applyDna(next) {
	useLive.setState({
		catalog: next.catalog,
		origin: "dna",
		sha: next.sha,
		branch: next.branch,
		writable: next.writable,
		fetchedAt: (/* @__PURE__ */ new Date()).toISOString(),
		files: next.files,
		error: null,
		pulling: false
	});
}
function markPulling() {
	useLive.setState({
		pulling: true,
		error: null
	});
}
function markPullError(message) {
	useLive.setState({
		pulling: false,
		error: message
	});
}
/** Bundled snapshot. Prefer getLiveCatalog() after DNA transcription. */
var CATALOG = catalog_default;
var STATUSES = [
	"EST",
	"DER",
	"HYP",
	"STOP",
	"ERR",
	"SYM"
];
var STATUS_COPY = {
	EST: {
		label: "Established",
		meaning: "Accepted within the stated domain and supported by provenance."
	},
	DER: {
		label: "Derived",
		meaning: "Follows from explicit assumptions — not automatically a new law."
	},
	HYP: {
		label: "Hypothesis",
		meaning: "Falsifiable, unverified claim with test metadata."
	},
	STOP: {
		label: "Stopped",
		meaning: "Unresolved boundary. Named evidence is still missing."
	},
	ERR: {
		label: "Error",
		meaning: "Invalid, inconsistent, rejected, or superseded."
	},
	SYM: {
		label: "Symbolic",
		meaning: "Conceptual mapping only — never hidden physical proof."
	}
};
var DOMAIN_LABELS = {
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
	sources: "Sources"
};
function domainLabel(domain) {
	return DOMAIN_LABELS[domain] ?? domain.replace(/[_-]/g, " ");
}
function domainsOf(catalog = getLiveCatalog()) {
	return [...new Set(catalog.nodes.map((n) => n.domain))].sort();
}
domainsOf(CATALOG);
function getNode(slug, catalog = getLiveCatalog()) {
	return catalog.nodes.find((n) => n.slug === slug);
}
function getNodeByAddress(address, catalog = getLiveCatalog()) {
	return catalog.nodes.find((n) => n.address === address);
}
function bridgesFor(address, catalog = getLiveCatalog()) {
	return catalog.bridges.filter((b) => b.source === address || b.target === address);
}
function searchNodes(query, status, domain, catalog = getLiveCatalog()) {
	const q = query.trim().toLowerCase();
	return catalog.nodes.filter((n) => {
		if (status !== "ALL" && n.status !== status) return false;
		if (domain !== "all" && n.domain !== domain) return false;
		if (!q) return true;
		return [
			n.title,
			n.description,
			n.address,
			n.domain,
			n.mechanism,
			...n.tags,
			...n.equations,
			...n.definitions
		].join(" ").toLowerCase().includes(q);
	});
}
function statusCounts(catalog = getLiveCatalog()) {
	return STATUSES.reduce((acc, status) => {
		acc[status] = catalog.nodes.filter((n) => n.status === status).length;
		return acc;
	}, {});
}
statusCounts(CATALOG);
var FEATURED_SLUGS = [
	"upi-physics-1-fundamental-planck-constant",
	"upi-electromagnetism-1-field-maxwell-equations",
	"upi-quantum-mechanics-1-dynamics-schrodinger-equation",
	"upi-relativity-1-spacetime-lorentz-interval",
	"upi-thermodynamics-1-energy-entropy-first-second-laws",
	"upi-theories-1-holography-ads-cft",
	"upi-information-physics-1-inertia-information-mass",
	"upi-information-physics-1-measure-universal-information-measure"
];
function featuredNodes(catalog = getLiveCatalog()) {
	return FEATURED_SLUGS.map((slug) => getNode(slug, catalog)).filter((n) => Boolean(n));
}
var badgeVariants = cva("inline-flex items-center rounded-sm px-2 py-0.5 font-mono text-xs font-medium tracking-wide uppercase", {
	variants: { tone: {
		est: "bg-est/15 text-est",
		der: "bg-der/15 text-der",
		hyp: "bg-hyp/15 text-hyp",
		stop: "bg-stop/15 text-stop",
		err: "bg-err/15 text-err",
		sym: "bg-sym/15 text-sym",
		mute: "bg-surface-2 text-muted"
	} },
	defaultVariants: { tone: "mute" }
});
function Badge({ className, tone, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn(badgeVariants({ tone }), className),
		...props
	});
}
var TONE = {
	EST: "est",
	DER: "der",
	HYP: "hyp",
	STOP: "stop",
	ERR: "err",
	SYM: "sym"
};
function StatusBadge({ status, withLabel = false, className }) {
	const key = status in TONE ? status : "SYM";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
		tone: TONE[key],
		className: cn("gap-1.5", className),
		title: STATUS_COPY[key].meaning,
		children: [key, withLabel ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-sans font-normal normal-case tracking-normal",
			children: STATUS_COPY[key].label
		}) : null]
	});
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/button-CtDdji5V.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,background-color,box-shadow,transform,opacity] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:not-disabled:scale-[0.96]", {
	variants: {
		variant: {
			default: "bg-accent text-accent-fg hover:bg-accent/90",
			secondary: "bg-surface-2 text-fg shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]",
			outline: "border border-border-strong bg-transparent text-fg hover:bg-surface-2",
			ghost: "text-fg hover:bg-surface-2",
			link: "text-muted underline-offset-4 hover:text-fg hover:underline"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 px-3 text-xs",
			lg: "h-12 px-5",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/x-graph-DaZVfKT5.js
function Textarea({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-28 w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm text-fg", "placeholder:text-subtle shadow-[var(--shadow-border)]", "transition-[box-shadow,border-color] duration-150", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70", "disabled:cursor-not-allowed disabled:opacity-50", className),
		...props
	});
}
/** Public X identity. Follower/following lists are not in the search surface; replies are. */
var X_ACCOUNT = {
	handle: "DrPepper_se",
	url: "https://x.com/DrPepper_se",
	name: "ॐØΩφ•8200",
	followers: 38,
	retrieved: "2026-09-02"
};
var X_CLAIMS = [
	{
		id: "m-hf-c2",
		layer: "identity",
		keep: "already",
		status: "DER",
		title: "m = hf / c²",
		cited: "from:DrPepper_se · photon equivalent mass",
		meaning: "Planck + Einstein for a frequency quantum. Already DNA. Does not give rest mass of electrons.",
		mapsTo: "upi-information-physics-1-inertia-frequency-mass-equivalent",
		post: "2091344582004936912"
	},
	{
		id: "info-mass",
		layer: "identity",
		keep: "already",
		status: "HYP",
		title: "Information mass T€@X™",
		cited: "w=s → m=hf/c² as hidden truth of reality",
		meaning: "Naming the kilogram is a hypothesis. Already DNA. A rewrite is not a new law.",
		mapsTo: "upi-information-physics-1-inertia-information-mass",
		post: "2089018882287923501"
	},
	{
		id: "second-law",
		layer: "entropy",
		keep: "already",
		status: "EST",
		title: "ΔS ≥ 0 and S = k ln W",
		cited: "from:DrPepper_se #physics",
		meaning: "Second law and Boltzmann. Already DNA.",
		mapsTo: "upi-thermodynamics-1-energy-entropy-first-second-laws",
		post: "2090494438753911122"
	},
	{
		id: "bekenstein",
		layer: "entropy",
		keep: "already",
		status: "EST",
		title: "Bekenstein–Hawking S = A / 4ℓ_P²",
		cited: "image-encoded entropy list",
		meaning: "Horizon area law. Already DNA. Not Shannon of a tweet.",
		mapsTo: "upi-gravity-1-horizon-bekenstein-hawking-entropy",
		post: "2087660221401317741"
	},
	{
		id: "ads-cft",
		layer: "identity",
		keep: "already",
		status: "HYP",
		title: "2D boundary ↔ bulk",
		cited: "AdS/CFT, celestial holography",
		meaning: "Duality is mapped. Observed sky is not AdS — that STOP stays.",
		mapsTo: "upi-theories-1-holography-ads-cft",
		post: "2090248871616111104"
	},
	{
		id: "8hz",
		layer: "frequency",
		keep: "already",
		status: "HYP",
		title: "8 Hz carrier",
		cited: "human carrier wave of 8 Hz (Alpha)",
		meaning: "Reference example in the lab. Not a universal constant.",
		mapsTo: "upi-hypothesis-1-t-reference-n-8hz",
		post: "2091291778821283847"
	},
	{
		id: "landauer",
		layer: "entropy",
		keep: "cite",
		status: "EST",
		title: "Landauer kT ln 2",
		cited: "erasing one bit costs ≥ kT ln 2",
		meaning: "Unmapped EST. Price of a logically irreversible bit. Not a political slogan.",
		mapsTo: "upi-information-physics-1-landauer-bit-erasure",
		post: "2087660221401317741"
	},
	{
		id: "schumann",
		layer: "frequency",
		keep: "cite",
		status: "EST",
		title: "Schumann ~7.83 Hz",
		cited: "test 7.834 Hz for nature as operator",
		meaning: "Earth–ionosphere cavity fundamental. Geophysics EST. Not a human transmission lock.",
		mapsTo: "upi-geophysics-1-cavity-schumann-resonance",
		post: "2090505085906256363"
	},
	{
		id: "compton",
		layer: "identity",
		keep: "cite",
		status: "DER",
		title: "Compton / Penrose little clock",
		cited: "X · Penrose: mass implies frequency, E=mc² and E=hf",
		meaning: "Rest mass as Compton frequency f = mc²/h. Inverse of the photon rewrite. Not information-mass.",
		mapsTo: "upi-relativity-1-inertia-compton-frequency",
		post: "2023476221544403184"
	},
	{
		id: "jacobson",
		layer: "entropy",
		keep: "cite",
		status: "HYP",
		title: "Einstein equation as equation of state",
		cited: "Sabine-track · Jacobson 1995",
		meaning: "Thermodynamic derivation of Einstein’s equation is a research program. Not ice/ocean surface tension."
	},
	{
		id: "sm-close",
		layer: "overlay",
		keep: "cite",
		status: "STOP",
		title: "m = hf/c² closes the Standard Model",
		cited: "And you close thestandard model loop whit m=hf/c²",
		meaning: "A photon rewrite does not generate CKM, Higgs vev, or three generations.",
		mapsTo: "upi-open-problems-1-sm-loop-hf-c2",
		post: "2094906557230207432"
	},
	{
		id: "tf1766-g",
		layer: "overlay",
		keep: "cite",
		status: "STOP",
		title: "TF¹⁷⁶⁶ = Gravity",
		cited: "TF¹⁷⁶⁶ ∆¹⁷⁶⁶ φ¹⁷⁶⁶ = Gravity",
		meaning: "The author’s own post calls Ω^1766 an interpretive overlay, not a derived theorem.",
		post: "2090526510159474891"
	},
	{
		id: "operator-82",
		layer: "frequency",
		keep: "cite",
		status: "STOP",
		title: "8.2 Hz human operator",
		cited: "humans operator i would start at 8.2xx Hz",
		meaning: "No counting rule names what 8.2 Hz is operating. 8 Hz stays a lab example.",
		post: "2090505085906256363"
	},
	{
		id: "ice-knock",
		layer: "overlay",
		keep: "drop",
		status: "SYM",
		title: "Dark mass as ice, knock both sides",
		cited: "knock on the ice mountain",
		meaning: "Metaphor for a shared boundary. Entanglement is already EST. Ice is not a mechanism.",
		post: "2090238002245107925"
	},
	{
		id: "witch-thrust",
		layer: "overlay",
		keep: "drop",
		status: "SYM",
		title: "Påskhäxa / shotgun as m=hf/c² engine",
		cited: "broom is a resonant waveguide",
		meaning: "Momentum conservation in vacuum is EST. Directed-intention thrust is not.",
		post: "2091274110416396625"
	},
	{
		id: "atlantis",
		layer: "social",
		keep: "drop",
		status: "SYM",
		title: "Atlantis / NWA1766 genealogy",
		cited: "my gen comes from NWA1766",
		meaning: "Not a physics identity. Out of domain.",
		post: "2094909614198546481"
	},
	{
		id: "omega-reset",
		layer: "overlay",
		keep: "drop",
		status: "SYM",
		title: "Ω^1766 local entropy reset",
		cited: "phase-lock permitting local entropy reset",
		meaning: "The post already marks this as mythology on top of the second law.",
		post: "2090494438753911122"
	}
];
/** Interaction graph — not a follower list. */
var X_PEERS = [
	{
		handle: "RecursiveRRS",
		role: "critique",
		keep: "cite",
		note: "Photon m=hf/c² is fine; rest mass as information volume is not a unification."
	},
	{
		handle: "rslaakkonen",
		role: "reply",
		keep: "drop",
		note: "Space-friction metaphor. Not a measurement."
	},
	{
		handle: "Stellarixorine",
		role: "critique",
		keep: "cite",
		note: "Numerology locks are not established physics."
	},
	{
		handle: "cosmosarcive",
		role: "publication",
		keep: "cite",
		note: "Penrose IAI: rest mass as Compton clock. Maps to DER, not HYP information-mass."
	}
];
var X_OPEN_STOPS = [
	{
		id: "x-sm-close",
		title: "m = hf/c² closes the Standard Model",
		cited: "from:DrPepper_se 2094906557230207432",
		conflict: "CKM, Higgs vev, and three generations are not generated by a photon rewrite.",
		closesIf: "A derivation from m=hf/c² to a measured SM parameter, with residuals.",
		status: "STOP"
	},
	{
		id: "x-tf1766-g",
		title: "TF¹⁷⁶⁶ = Gravity",
		cited: "from:DrPepper_se 2090526510159474891",
		conflict: "Same thread calls Ω^1766 an interpretive overlay, not a derived theorem.",
		closesIf: "A Lagrangian or a measured G from 1766, or withdraw the identity.",
		status: "STOP"
	},
	{
		id: "x-operator-82",
		title: "8.2 Hz human operator",
		cited: "from:DrPepper_se 2090505085906256363",
		conflict: "Schumann ~7.83 Hz is EST. 8.2 Hz as a transmission lock has no counting rule.",
		closesIf: "Name the quantity 8.2 Hz counts: EEG band, Schumann harmonic, or lab example.",
		status: "STOP"
	}
];
function xCounts() {
	const keep = X_CLAIMS.filter((c) => c.keep !== "drop");
	return {
		claims: X_CLAIMS.length,
		already: X_CLAIMS.filter((c) => c.keep === "already").length,
		cite: X_CLAIMS.filter((c) => c.keep === "cite").length,
		drop: X_CLAIMS.filter((c) => c.keep === "drop").length,
		stop: keep.filter((c) => c.status === "STOP").length,
		peers: X_PEERS.length
	};
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/indaleko-P5_TrNtG.js
/** Decimal bytes, matching the dissertation’s TB/GB figures. */
var TB = 0xe8d4a51000;
var GB = 1e9;
var INDALEKO_PAPER = {
	arxiv: "2602.20507",
	title: "Indaleko: the unified personal index",
	author: "William Anthony Mason",
	affiliation: "University of British Columbia",
	year: 2026,
	abs: "https://arxiv.org/abs/2602.20507",
	pdf: "https://arxiv.org/pdf/2602.20507",
	code: "https://github.com/ubc-systopia/Indaleko"
};
/**
* Two number sets in the same paper. Abstract and body are not the same corpus claim.
* That gap is the audit, not a bug in this file.
*/
var CORPUS = {
	abstract: {
		files: 31e6,
		bytes: 160 * TB,
		platforms: 8
	},
	body: {
		files: 319e5,
		capacityBytes: 35.1 * TB,
		usedBytes: 16.2 * TB,
		indexBytes: 78.6 * GB
	}
};
var CORPUS_ROWS = [
	{
		id: "abstract",
		label: "Abstract payload",
		bytes: CORPUS.abstract.bytes,
		note: "“31-million file dataset spanning 160TB across eight storage platforms.”",
		status: "STOP"
	},
	{
		id: "capacity",
		label: "Body capacity",
		bytes: CORPUS.body.capacityBytes,
		note: "Chapter 5/6: 35.1 TB total capacity on the measured machines.",
		status: "DER"
	},
	{
		id: "used",
		label: "Body used",
		bytes: CORPUS.body.usedBytes,
		note: "16.2 TB used. This is the figure the index actually sat on.",
		status: "DER"
	},
	{
		id: "index",
		label: "ArangoDB index",
		bytes: CORPUS.body.indexBytes,
		note: "78.6 GB of metadata. Not the files. ≈ 0.5 % of used payload.",
		status: "EST"
	}
];
/** Open claims a knowledgeable reader can close. STOP stays until the identity is named. */
var OPEN_STOPS = [
	{
		id: "abstract-payload",
		claim: "Abstract payload",
		cited: "160 TB, 31M files, 8 platforms",
		status: "STOP",
		conflict: "Body: 16.2 TB used of 35.1 TB capacity, 31.9M files. log₁₀ gap ≈ 0.995.",
		closesIf: "One sentence naming what 160 TB counts: raw, replicated (unique = raw / copies), provisioned, logical, or a leftover draft."
	},
	{
		id: "eight-platforms",
		claim: "Eight storage platforms",
		cited: "“eight storage platforms” in the abstract",
		status: "STOP",
		conflict: "Body names NTFS, APFS, ext4, Drive, OneDrive, Dropbox, iCloud, mobile, plus activity extras. No single list of eight.",
		closesIf: "The eight names in one table or sentence."
	},
	{
		id: "synthetic-anchors",
		claim: "Activity corpus",
		cited: "31M-file dataset with memory-anchor queries",
		status: "STOP",
		conflict: "Evaluation used synthetic activity metadata. Payload bytes ≠ measured episodes.",
		closesIf: "Which of 160 TB / 16.2 TB is measured files vs generated anchors."
	}
];
var HELD_ROWS = [
	{
		id: "capacity",
		claim: "Body capacity",
		cited: "35.1 TB",
		status: "DER",
		conflict: "Reported in ch. 5/6 as machine capacity.",
		closesIf: "Already a body figure. No identity gap."
	},
	{
		id: "used",
		claim: "Body used",
		cited: "16.2 TB",
		status: "DER",
		conflict: "The payload the index sat on.",
		closesIf: "Already a body figure. No identity gap."
	},
	{
		id: "index",
		claim: "ArangoDB index",
		cited: "78.6 GB ≈ 0.485 % of used",
		status: "EST",
		conflict: "Metadata, not blobs. Matches the paper’s ~0.5 % overhead.",
		closesIf: "Arithmetic already closes."
	}
];
function stopTableMarkdown() {
	return [
		"| Claim | Cited | Status | Conflict | Closes if |",
		"| --- | --- | --- | --- | --- |",
		...[...OPEN_STOPS, ...HELD_ROWS].map((r) => `| ${r.claim} | ${r.cited} | ${r.status} | ${r.conflict} | ${r.closesIf} |`)
	].join("\n");
}
var STOP_REPLY_HINT = "If you have the right number: name the claim id, the quantity, the unit, and the counting rule (raw / used / capacity / index / draft).";
/** Abstract says eight storage platforms. Body lists these plus extra activity collectors. */
var PLATFORMS = [
	{
		id: "ntfs",
		title: "NTFS / Windows",
		kind: "storage",
		keep: "cite",
		meaning: "Local filesystem collector. Cited, not ingested."
	},
	{
		id: "apfs",
		title: "APFS / macOS",
		kind: "storage",
		keep: "cite",
		meaning: "Local filesystem collector. Cited, not ingested."
	},
	{
		id: "ext4",
		title: "ext4 / Linux",
		kind: "storage",
		keep: "cite",
		meaning: "Local filesystem collector. Cited, not ingested."
	},
	{
		id: "gdrive",
		title: "Google Drive",
		kind: "storage",
		keep: "drop",
		meaning: "Personal cloud silo. Out of domain for a public physics ledger."
	},
	{
		id: "onedrive",
		title: "OneDrive",
		kind: "storage",
		keep: "drop",
		meaning: "Personal cloud silo. Out of domain."
	},
	{
		id: "dropbox",
		title: "Dropbox",
		kind: "storage",
		keep: "drop",
		meaning: "Personal cloud silo. Out of domain."
	},
	{
		id: "icloud",
		title: "iCloud",
		kind: "storage",
		keep: "drop",
		meaning: "Personal cloud silo. Out of domain."
	},
	{
		id: "mobile",
		title: "iOS / Android",
		kind: "storage",
		keep: "drop",
		meaning: "Personal device store. Out of domain."
	},
	{
		id: "discord",
		title: "Discord",
		kind: "activity",
		keep: "drop",
		meaning: "Activity stream, not storage. Not one of the eight."
	},
	{
		id: "spotify",
		title: "Spotify",
		kind: "activity",
		keep: "drop",
		meaning: "Ambient/environmental collector. Not physics provenance."
	},
	{
		id: "youtube",
		title: "YouTube",
		kind: "activity",
		keep: "drop",
		meaning: "Ambient collector. Dropped."
	},
	{
		id: "outlook",
		title: "Outlook",
		kind: "activity",
		keep: "drop",
		meaning: "Mail silo. Dropped."
	},
	{
		id: "ecobee",
		title: "Ecobee / Nest",
		kind: "activity",
		keep: "drop",
		meaning: "Thermostat stream. Dropped."
	}
];
var INDALEKO_NODES = [
	{
		id: "two-names",
		layer: "identity",
		keep: "keep",
		title: "Two UPIs",
		status: "STOP",
		meaning: "Mason’s UPI is the Unified Personal Index. This ledger is the Universal Physics Index. Same letters, different object. Do not fork the name.",
		href: "/method"
	},
	{
		id: "three-layer",
		layer: "identity",
		keep: "keep",
		title: "Three-layer metadata",
		status: "SYM",
		meaning: "Storage / semantic / memory-anchor in the paper. Here: GitHub file, node meaning, chain position and status. Mapping only.",
		href: "/dna"
	},
	{
		id: "anchors",
		layer: "anchors",
		keep: "keep",
		title: "W5H → provenance",
		status: "SYM",
		meaning: "When, where, who, what, how become paper date, laboratory, author, experiment, apparatus. Not GPS, not Spotify.",
		href: "/lab"
	},
	{
		id: "metadata-not-blobs",
		layer: "corpus",
		keep: "keep",
		title: "Index metadata, not blobs",
		status: "EST",
		meaning: "The 160TB never entered ArangoDB. 78.6 GB of metadata did. This catalog is the same idea at physics scale: cite, don’t copy the payload.",
		href: "/dna"
	},
	{
		id: "paper-source",
		layer: "corpus",
		keep: "keep",
		title: "Paper as a source",
		status: "DER",
		meaning: "arXiv:2602.20507 is a typed source. The 160TB is a cited dataset, not a disk we mount.",
		href: "/lab"
	},
	{
		id: "collectors",
		layer: "anchors",
		keep: "keep",
		title: "Collectors we already have",
		status: "DER",
		meaning: "GitHub DNA, arXiv metadata, CODATA/SI, Sunet. Ten minutes to ten hours per provider is their claim. Ours are already wired.",
		href: "/dna"
	},
	{
		id: "arangodb",
		layer: "stack",
		keep: "drop",
		title: "ArangoDB / AQL",
		status: "STOP",
		meaning: "Graph store and LLM-to-AQL translation for personal files. This app is JSON on GitHub."
	},
	{
		id: "privacy-uuid",
		layer: "stack",
		keep: "drop",
		title: "UUID privacy obfuscation",
		status: "STOP",
		meaning: "A personal-index defence. This ledger is public. Stable slugs, not hidden UUIDs."
	},
	{
		id: "ingest",
		layer: "stack",
		keep: "drop",
		title: "Ingest the 160TB",
		status: "STOP",
		meaning: "We do not have the files, the platforms, or a reason. Evaluation also used synthetic activity metadata."
	},
	{
		id: "llm-aql",
		layer: "stack",
		keep: "drop",
		title: "GPT-4o → AQL",
		status: "SYM",
		meaning: "Natural-language to database query is their retrieval UI. Not a physics result."
	}
];
var INDALEKO_LAYERS = [
	{
		id: "identity",
		title: "Identity",
		kicker: "name / metadata"
	},
	{
		id: "anchors",
		title: "Anchors",
		kicker: "W5H → provenance"
	},
	{
		id: "corpus",
		title: "Corpus",
		kicker: "160 TB cited"
	}
];
var ANCHOR_MAP = [
	{
		id: "temporal",
		paper: "Temporal",
		paperCue: "when the file was touched",
		physics: "CODATA year, SI brochure, paper date",
		keep: "keep",
		status: "SYM"
	},
	{
		id: "spatial",
		paper: "Spatial",
		paperCue: "GPS, Wi-Fi, “near home”",
		physics: "Laboratory or observatory, not a person’s location",
		keep: "keep",
		status: "SYM"
	},
	{
		id: "social",
		paper: "Social",
		paperCue: "shared with, Discord, Outlook",
		physics: "Authors and collaborations (Planck, Einstein)",
		keep: "keep",
		status: "SYM"
	},
	{
		id: "task",
		paper: "Task",
		paperCue: "active app, workflow stage",
		physics: "Measurement vs derivation vs software_test",
		keep: "keep",
		status: "DER"
	},
	{
		id: "environmental",
		paper: "Environmental",
		paperCue: "Spotify, thermostat, device",
		physics: "Apparatus only if it is the experiment. Personal ambient dropped.",
		keep: "drop",
		status: "STOP"
	}
];
var PHYSICS_SOURCES = [
	{
		id: "indaleko",
		title: "Indaleko BIG CORPUS",
		url: INDALEKO_PAPER.abs,
		relation: "cited_dataset",
		bytesHeld: 0,
		onto160: "This is the 160TB claim. Cited. Zero bytes loaded.",
		status: "STOP"
	},
	{
		id: "arxiv",
		title: "arXiv",
		url: "https://arxiv.org/",
		relation: "preprint",
		bytesHeld: null,
		onto160: "Holds the PDF, not the personal files. Provenance collector.",
		status: "DER"
	},
	{
		id: "github",
		title: "GitHub DNA",
		url: "https://github.com/dpstudio-se/Universal-Physics-Index-UPI",
		relation: "ledger",
		bytesHeld: null,
		onto160: "Parallel corpus: typed physics JSON. Not a slice of the 160TB.",
		status: "EST"
	},
	{
		id: "codata",
		title: "CODATA / SI",
		url: "https://physics.nist.gov/cuu/Constants/",
		relation: "constant",
		bytesHeld: null,
		onto160: "Constants, not files. No mapping onto personal payload.",
		status: "EST"
	},
	{
		id: "sunet",
		title: "Sunet",
		url: "https://www.sunet.se/",
		relation: "carrier",
		bytesHeld: 0,
		onto160: "A network that could carry 160TB. We index the service, not the bytes.",
		status: "DER"
	}
];
function isHttpUrl(value) {
	return /^https?:\/\//i.test(value);
}
/** Index / used ≈ 0.485 %. Paper rounds this to “0.5 % overhead”. */
function indexOverhead() {
	return CORPUS.body.indexBytes / CORPUS.body.usedBytes;
}
function abstractVsUsedLog() {
	return Math.log10(CORPUS.abstract.bytes) - Math.log10(CORPUS.body.usedBytes);
}
function runCorpusAudit(sources = [], catalogBytes = 0) {
	const overhead = indexOverhead();
	const gap = abstractVsUsedLog();
	const urlsOk = PHYSICS_SOURCES.filter((s) => s.url).every((s) => isHttpUrl(s.url));
	const liveUrls = sources.filter((s) => s.canonical_url.length > 0);
	const liveOk = liveUrls.length === 0 || liveUrls.every((s) => isHttpUrl(s.canonical_url));
	const arxivOk = /^\d{4}\.\d{4,5}(v\d+)?$/.test(INDALEKO_PAPER.arxiv);
	const storageEight = PLATFORMS.filter((p) => p.kind === "storage").length === 8;
	return [
		{
			id: "arxiv-id",
			title: "arXiv 2602.20507 parses",
			closed: arxivOk,
			residual: arxivOk ? 0 : 1,
			status: "EST",
			note: INDALEKO_PAPER.arxiv
		},
		{
			id: "eight-storage",
			title: "Eight storage platforms named",
			closed: storageEight,
			residual: Math.abs(PLATFORMS.filter((p) => p.kind === "storage").length - 8),
			status: "DER",
			note: "Abstract’s eight, reconstructed from the body."
		},
		{
			id: "index-overhead",
			title: "Index / used ≈ 0.5 %",
			closed: Math.abs(overhead - .00485) < 5e-4,
			residual: Math.abs(overhead - .00485),
			status: "EST",
			note: `${(overhead * 100).toFixed(3)} %`
		},
		{
			id: "abstract-body",
			title: "Abstract 160TB = body used",
			closed: false,
			residual: gap,
			status: "STOP",
			note: `log₁₀ gap ${gap.toFixed(3)}. 160TB vs 16.2TB used. Left open.`
		},
		{
			id: "source-urls",
			title: "Mapped source URLs",
			closed: urlsOk && liveOk,
			residual: urlsOk && liveOk ? 0 : 1,
			status: "DER",
			note: `${PHYSICS_SOURCES.length} mapped, ${liveUrls.length} live`
		},
		{
			id: "not-ingested",
			title: "160TB bytes held here",
			closed: catalogBytes > 0 && catalogBytes < GB,
			residual: catalogBytes,
			status: "EST",
			note: catalogBytes ? `${catalogBytes} B of catalog JSON, not terabytes of files.` : "catalog size unknown"
		}
	];
}
function formatBytes(bytes) {
	if (!Number.isFinite(bytes) || bytes < 0) return "—";
	if (bytes === 0) return "0 B";
	const units = [
		"B",
		"kB",
		"MB",
		"GB",
		"TB",
		"PB"
	];
	let i = 0;
	let n = bytes;
	while (n >= 1e3 && i < units.length - 1) {
		n /= 1e3;
		i += 1;
	}
	const digits = n >= 100 ? 0 : n >= 10 ? 1 : 2;
	return `${n.toFixed(digits)} ${units[i]}`;
}
function logBarPct(bytes, maxBytes) {
	if (bytes <= 0 || maxBytes <= 0) return 0;
	const t = Math.log10(bytes) / Math.log10(maxBytes);
	return Math.max(2, Math.min(100, t * 100));
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/physics-B9rlgfAv.js
/** CODATA / SI exact or recommended values. Software utilities, not experimental proof. */
var PLANCK_H = 662607015e-42;
var SPEED_OF_LIGHT = 299792458;
var G_NEWTON = 66743e-15;
var PLANCK_LENGTH = 1616255e-41;
var BOLTZMANN_K = 1380649e-29;
function energyFromFrequency(hz) {
	return hz * PLANCK_H;
}
function massEquivalent(hz) {
	return energyFromFrequency(hz) / SPEED_OF_LIGHT ** 2;
}
function n8Index(hz) {
	return hz / 8;
}
function schwarzschildRadius(massKg) {
	return 2 * G_NEWTON * massKg / SPEED_OF_LIGHT ** 2;
}
function horizonArea(massKg) {
	const r = schwarzschildRadius(massKg);
	return 4 * Math.PI * r * r;
}
/** Bekenstein–Hawking entropy in units of k_B. Semiclassical; STOP if R_s < ℓ_P. */
function bekensteinHawkingSOverK(massKg) {
	return horizonArea(massKg) / (4 * PLANCK_LENGTH ** 2);
}
function formatScientific(value, digits = 6) {
	if (!Number.isFinite(value)) return "—";
	if (value === 0) return "0";
	return value.toExponential(digits);
}
var DNA_NOTES = {
	A: {
		note: "A4",
		hz: 440
	},
	C: {
		note: "C4",
		hz: 261.6256
	},
	G: {
		note: "G4",
		hz: 392
	},
	T: {
		note: "E4",
		hz: 329.6276
	},
	U: {
		note: "E4",
		hz: 329.6276
	}
};
function parseDnaSequence(input) {
	return [...input.toUpperCase()].filter((ch) => ch in DNA_NOTES);
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/lie-D-XMYLfY.js
var GROUP_MODES = [
	{
		id: "cyclic",
		label: "Z₈",
		status: "EST"
	},
	{
		id: "u1",
		label: "U(1)",
		status: "EST"
	},
	{
		id: "lorentz",
		label: "Lorentz",
		status: "EST"
	},
	{
		id: "planck",
		label: "Planck–Einstein",
		status: "DER"
	}
];
var GROUP_COPY = {
	cyclic: {
		title: "Cyclic group Z₈",
		meaning: "Hours on a clock. Add, wrap, invert. The inverse is the other way around the same circle. Identity is 0. Eight here is the N8 coordinate size, not 8 Hz as a law.",
		guard: "Z₈ is a finite abelian group. It is not a frequency, not a lattice of spacetime, not E8."
	},
	u1: {
		title: "Circle group U(1)",
		meaning: "Phases multiply. Inverse is conjugate: e^{iθ} · e^{-iθ} = 1. Photon time evolution is this group. Energy E = hf sets how fast the phase winds, not a new inverse.",
		guard: "U(1) is the gauge group of electromagnetism and the phase of a wavefunction. Closing the phase loop does not assign rest mass to a photon."
	},
	lorentz: {
		title: "Lorentz boosts in 1+1",
		meaning: "Rapidities add. Inverse rapidity is minus. Identity is rest. Velocity addition (v₁+v₂)/(1+v₁v₂/c²) is that group law in disguise. E = mc² lives here: four-momentum transforms as a vector.",
		guard: "The boost group is EST. A closed numerical residual is a software test, not a new relativity."
	},
	planck: {
		title: "Planck–Einstein isomorphism",
		meaning: "f ↦ hf and E ↦ E/c² are invertible linear maps. Compose: m = hf/c². Invert: E = mc², then f = E/h. Planck in, Planck out. That is the mirror. Status DER for the algebra; HYP for naming the kilogram information mass.",
		guard: "Invertible maps form a group (GL). {kilograms} under this map is not the Poincaré group. Photon rest mass remains 0."
	}
};
function wrapTau(angle) {
	const tau = Math.PI * 2;
	return (angle % tau + tau) % tau;
}
function znAdd(n, a, b) {
	return ((a + b) % n + n) % n;
}
function znInv(n, a) {
	return (n - a % n) % n;
}
function nearlyEqual(a, b, rel = 1e-12) {
	if (!Number.isFinite(a) || !Number.isFinite(b)) return false;
	if (a === b) return true;
	const scale = Math.max(Math.abs(a), Math.abs(b), 1e-18);
	return Math.abs(a - b) <= rel * scale;
}
function znRoundTrip(n, g) {
	const inv = znInv(n, g);
	const back = znAdd(n, g, inv);
	return {
		closed: back === 0,
		residual: back,
		forward: `${g} + ${inv}`,
		back: String(back)
	};
}
function u1RoundTrip(theta) {
	const back = wrapTau(theta + wrapTau(-theta));
	const residual = Math.min(back, Math.PI * 2 - back);
	return {
		closed: residual < 1e-12,
		residual,
		forward: `${theta.toFixed(3)} + (${-theta.toFixed(3)})`,
		back: back.toExponential(3)
	};
}
function velocityFromRapidity(phi) {
	return SPEED_OF_LIGHT * Math.tanh(phi);
}
function composeVelocity(v1, v2) {
	const c2 = SPEED_OF_LIGHT * SPEED_OF_LIGHT;
	return (v1 + v2) / (1 + v1 * v2 / c2);
}
function boost(event, phi) {
	const ch = Math.cosh(phi);
	const sh = Math.sinh(phi);
	const c = SPEED_OF_LIGHT;
	return {
		t: ch * event.t + sh * event.x / c,
		x: sh * c * event.t + ch * event.x
	};
}
function minkowskiOmega(event) {
	const c = SPEED_OF_LIGHT;
	return c * c * event.t * event.t - event.x * event.x;
}
function lorentzRoundTrip(event, phi) {
	const back = boost(boost(event, phi), -phi);
	const residual = Math.hypot(back.t - event.t, (back.x - event.x) / SPEED_OF_LIGHT);
	return {
		closed: residual < 1e-9,
		residual,
		forward: `Λ(φ) then Λ(−φ)`,
		back: `Δt=${(back.t - event.t).toExponential(2)} s`
	};
}
function planckEinsteinRoundTrip(hz) {
	const E = hz * PLANCK_H;
	const m = E / (SPEED_OF_LIGHT * SPEED_OF_LIGHT);
	const E2 = m * SPEED_OF_LIGHT * SPEED_OF_LIGHT;
	const f2 = E2 / PLANCK_H;
	const residual = Math.abs(f2 - hz);
	return {
		E,
		m,
		E2,
		f2,
		closed: nearlyEqual(hz, f2) && nearlyEqual(E, E2),
		residual,
		forward: "f → hf → hf/c²",
		back: "m → mc² → E/h"
	};
}
var GROUP_APPLICATIONS = [
	{
		group: "Z_d / Weyl",
		usedFor: "Qudit shift and phase. Inverse gate is the other way around the cycle.",
		slug: "upi-quantum-information-1-qudit-generalized-weyl-gates",
		status: "EST"
	},
	{
		group: "U(1)",
		usedFor: "Electromagnetic phase. Photon energy E = hf sets the winding rate.",
		slug: "upi-quantum-mechanics-1-quanta-planck-einstein-relation",
		status: "EST"
	},
	{
		group: "Lorentz / Poincaré",
		usedFor: "Inertial frames. Interval Ω = c²t² − x² is the invariant. Mass is the rest-frame energy.",
		slug: "upi-relativity-1-spacetime-lorentz-interval",
		status: "EST"
	},
	{
		group: "GL⁺ / invertibility",
		usedFor: "Planck map and Einstein map are inverse-able. Composition is m = hf/c².",
		slug: "upi-information-physics-1-inertia-frequency-mass-equivalent",
		status: "DER"
	},
	{
		group: "Weyl(E₈)",
		usedFor: "Reflections generate the E₈ root system. 240 roots. Math EST; extra-dimensional physics SYM.",
		slug: "upi-coding-theory-1-root-system-e8-lattice",
		status: "EST"
	},
	{
		group: "M₂₄",
		usedFor: "Mathieu group: automorphisms of the Golay code. Encode, then decode, is the inverse.",
		slug: "upi-coding-theory-1-binary-code-extended-golay",
		status: "EST"
	},
	{
		group: "Co₀",
		usedFor: "Conway: automorphisms of the Leech lattice Λ₂₄.",
		slug: "upi-coding-theory-1-sphere-packing-leech-lattice",
		status: "EST"
	},
	{
		group: "PSL(2,ℝ)",
		usedFor: "Isometries of AdS₃. The holographic dictionary is a duality, not this group itself.",
		slug: "upi-theories-1-holography-ads-cft",
		status: "HYP"
	}
];
var LIE_MODES = [
	{
		id: "u1",
		label: "u(1)",
		status: "EST"
	},
	{
		id: "so11",
		label: "so(1,1)",
		status: "EST"
	},
	{
		id: "so3",
		label: "so(3)",
		status: "EST"
	},
	{
		id: "e8",
		label: "e₈",
		status: "EST"
	}
];
var LIE_COPY = {
	u1: {
		title: "u(1) — one generator",
		meaning: "The Lie algebra of U(1) is a line. Bracket vanishes. Exponential is e^{iθ}. Logarithm is the angle. Abelian: the group of the photon phase, linearized.",
		guard: "A vanishing bracket is EST for u(1). It does not make frequency a Lie algebra of mass."
	},
	so11: {
		title: "so(1,1) — boost generator",
		meaning: "One generator K. exp(φK) is the Lorentz boost you already walked. Logarithm returns φ. The algebra is the tangent at rest; the group is finite rapidity.",
		guard: "so(1,1) is the 1+1 Lorentz algebra. A closed residual is a software test, not a new relativity."
	},
	so3: {
		title: "so(3) ≅ su(2) — angular momentum",
		meaning: "Three generators. [Jx, Jy] = Jz and cyclic. The bracket is the cross product. Exponential is Rodrigues: a finite rotation. Jacobi is associativity at first order.",
		guard: "so(3) is EST as rotations of R³. su(2) is its double cover’s algebra. Neither is E8, neither is a ToE."
	},
	e8: {
		title: "e₈ — exceptional, rank 8",
		meaning: "dim e₈ = 248 = 8 Cartan + 240 roots. The E8 lattice is the root lattice of this algebra. Dynkin and Cartan encode the simple-root brackets. Math EST. Extra-dimensional physics SYM.",
		guard: "The lattice in the index is EST as Euclidean geometry. Promoting e₈ to a gauge group of the sky is a different claim and stays SYM until evidence says otherwise."
	}
};
function cross(a, b) {
	return [
		a[1] * b[2] - a[2] * b[1],
		a[2] * b[0] - a[0] * b[2],
		a[0] * b[1] - a[1] * b[0]
	];
}
function add3(a, b) {
	return [
		a[0] + b[0],
		a[1] + b[1],
		a[2] + b[2]
	];
}
function scale3(a, s) {
	return [
		a[0] * s,
		a[1] * s,
		a[2] * s
	];
}
function norm3(a) {
	return Math.hypot(a[0], a[1], a[2]);
}
function jacobiResidual(a, b, c) {
	return norm3(add3(add3(cross(a, cross(b, c)), cross(b, cross(c, a))), cross(c, cross(a, b))));
}
function boostExp(phi) {
	const ch = Math.cosh(phi);
	const sh = Math.sinh(phi);
	return [[ch, sh], [sh, ch]];
}
function boostLog(m) {
	return Math.asinh(m[0][1]);
}
function so11RoundTrip(phi) {
	const back = boostLog(boostExp(phi));
	const residual = Math.abs(back - phi);
	return {
		closed: nearlyEqual(back, phi, 1e-10),
		residual,
		forward: "exp(φK)",
		back: "log(Λ) = φ"
	};
}
function hat(w) {
	return [
		[
			0,
			-w[2],
			w[1]
		],
		[
			w[2],
			0,
			-w[0]
		],
		[
			-w[1],
			w[0],
			0
		]
	];
}
function mul3(a, b) {
	const out = [
		[
			0,
			0,
			0
		],
		[
			0,
			0,
			0
		],
		[
			0,
			0,
			0
		]
	];
	for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) out[i][j] = a[i][0] * b[0][j] + a[i][1] * b[1][j] + a[i][2] * b[2][j];
	return out;
}
function apply3(m, v) {
	return [
		m[0][0] * v[0] + m[0][1] * v[1] + m[0][2] * v[2],
		m[1][0] * v[0] + m[1][1] * v[1] + m[1][2] * v[2],
		m[2][0] * v[0] + m[2][1] * v[1] + m[2][2] * v[2]
	];
}
/** Rodrigues: exp(θ n̂·L) in SO(3). */
function so3Exp(axis, theta) {
	const n0 = norm3(axis);
	if (n0 < 1e-15 || Math.abs(theta) < 1e-15) return [
		[
			1,
			0,
			0
		],
		[
			0,
			1,
			0
		],
		[
			0,
			0,
			1
		]
	];
	const k = hat(scale3(axis, 1 / n0));
	const k2 = mul3(k, k);
	const c = Math.cos(theta);
	const s = Math.sin(theta);
	const I = [
		[
			1,
			0,
			0
		],
		[
			0,
			1,
			0
		],
		[
			0,
			0,
			1
		]
	];
	const out = [
		[
			0,
			0,
			0
		],
		[
			0,
			0,
			0
		],
		[
			0,
			0,
			0
		]
	];
	for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) out[i][j] = I[i][j] + s * k[i][j] + (1 - c) * k2[i][j];
	return out;
}
function so3Log(m) {
	const tr = m[0][0] + m[1][1] + m[2][2];
	const cos = Math.min(1, Math.max(-1, (tr - 1) / 2));
	const theta = Math.acos(cos);
	if (theta < 1e-12) return {
		axis: [
			1,
			0,
			0
		],
		theta: 0
	};
	const s = 2 * Math.sin(theta);
	const axis = [
		(m[2][1] - m[1][2]) / s,
		(m[0][2] - m[2][0]) / s,
		(m[1][0] - m[0][1]) / s
	];
	const n = norm3(axis);
	return {
		axis: n > 0 ? scale3(axis, 1 / n) : [
			1,
			0,
			0
		],
		theta
	};
}
function so3RoundTrip(axis, theta) {
	const back = so3Log(so3Exp(axis, theta));
	const a = scale3(axis, 1 / (norm3(axis) || 1));
	const residual = norm3(add3(scale3(back.axis, back.theta), scale3(scale3(a, theta), -1)));
	return {
		closed: residual < 1e-8,
		residual,
		forward: "exp(θ n̂)",
		back: "log(R)"
	};
}
function rotateVec(axis, theta, v) {
	return apply3(so3Exp(axis, theta), v);
}
function u1RoundTripLie(theta) {
	let d = Math.atan2(Math.sin(theta), Math.cos(theta)) - theta;
	while (d > Math.PI) d -= Math.PI * 2;
	while (d < -Math.PI) d += Math.PI * 2;
	return {
		closed: Math.abs(d) < 1e-12,
		residual: Math.abs(d),
		forward: "exp(iθ)",
		back: "arg(z)"
	};
}
/** E8 Cartan matrix. Linear Dynkin with branch at α5 (0-indexed 4). */
var E8_CARTAN = [
	[
		2,
		-1,
		0,
		0,
		0,
		0,
		0,
		0
	],
	[
		-1,
		2,
		-1,
		0,
		0,
		0,
		0,
		0
	],
	[
		0,
		-1,
		2,
		-1,
		0,
		0,
		0,
		0
	],
	[
		0,
		0,
		-1,
		2,
		-1,
		0,
		0,
		0
	],
	[
		0,
		0,
		0,
		-1,
		2,
		-1,
		0,
		-1
	],
	[
		0,
		0,
		0,
		0,
		-1,
		2,
		-1,
		0
	],
	[
		0,
		0,
		0,
		0,
		0,
		-1,
		2,
		0
	],
	[
		0,
		0,
		0,
		0,
		-1,
		0,
		0,
		2
	]
];
var E8_EDGES = [
	[0, 1],
	[1, 2],
	[2, 3],
	[3, 4],
	[4, 5],
	[5, 6],
	[4, 7]
];
function e8DimensionCheck() {
	return {
		closed: true,
		residual: Math.abs(0),
		forward: "rank + |Φ|",
		back: "248"
	};
}
var LIE_APPLICATIONS = [
	{
		algebra: "u(1)",
		usedFor: "Generator of phase. E = hf is how fast that generator winds, not a second algebra.",
		slug: "upi-quantum-mechanics-1-quanta-planck-einstein-relation",
		status: "EST"
	},
	{
		algebra: "so(1,1) ⊂ so(1,3)",
		usedFor: "Boosts. Finite element is the Lorentz group. Interval Ω is the invariant.",
		slug: "upi-relativity-1-spacetime-lorentz-interval",
		status: "EST"
	},
	{
		algebra: "so(3) ≅ su(2)",
		usedFor: "Rotations and spin. Bracket is angular-momentum algebra. Double cover is EST.",
		slug: "upi-classical-mechanics-1-symmetry-linear-momentum-conservation",
		status: "EST"
	},
	{
		algebra: "e₈",
		usedFor: "Exceptional simple algebra. The 240-root lattice in this index is its root lattice.",
		slug: "upi-coding-theory-1-root-system-e8-lattice",
		status: "EST"
	},
	{
		algebra: "conformal 𝔰𝔬(2,d)",
		usedFor: "Isometries of AdS / conformal symmetries of the boundary theory.",
		slug: "upi-quantum-field-1-symmetry-conformal-field-theory",
		status: "EST"
	},
	{
		algebra: "exp: 𝔤 → G",
		usedFor: "The algebra–group mirror. Planck–Einstein invertibility is GL, not a spacetime algebra.",
		slug: "upi-information-physics-1-inertia-frequency-mass-equivalent",
		status: "DER"
	}
];
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-D7EnYDiY.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: error.message || "An unexpected error occurred. Try reloading the page."
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	if (typeof window === "undefined") return () => {};
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	const parentOrigin = resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		if (envelope.data.type === "hello") {
			if (!HelloSchema.safeParse(event.data).success) return;
			announce();
			return;
		}
		if (envelope.data.type === "navigate") {
			const parsed = NavigateSchema.safeParse(event.data);
			if (!parsed.success) return;
			navigate(parsed.data.path);
			queueMicrotask(reportLocation);
			return;
		}
		if (envelope.data.type === "history") {
			const parsed = HistorySchema.safeParse(event.data);
			if (!parsed.success) return;
			if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
			window.history.go(parsed.data.delta);
		}
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
function OrbitalMark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("relative grid size-9 place-items-center overflow-hidden rounded-full bg-surface-2 shadow-[var(--shadow-border)]", className),
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "orbit-spin absolute inset-1 rounded-full border border-border-strong" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "orbit-spin-rev absolute inset-2.5 rounded-full border border-accent/40" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-fg" })
		]
	});
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var status = _enum([
	"EST",
	"DER",
	"HYP",
	"STOP",
	"ERR",
	"SYM"
]);
var address = string().regex(/^UPI<[^,]+,[0-9]+,[^,]+,[^,>]+>$/);
var lines = string().optional().transform((s) => (s ?? "").split("\n").map((x) => x.trim()).filter(Boolean));
var pullDna = createServerFn({ method: "POST" }).handler(createSsrRpc("c340042f7d894c831469b785285e60ac013fc1869bcf8c7ead29a1a148c6f969"));
var proposeNodeFn = createServerFn({ method: "POST" }).validator(object({
	domain: string().min(1),
	filename: string().min(1),
	address,
	title: string().min(1),
	description: string().min(1),
	status,
	definitions: lines,
	equations: lines,
	assumptions: lines,
	mechanism: string().optional(),
	confusion_guard: string().optional(),
	stop_reason: string().optional(),
	tags: string().optional()
})).handler(createSsrRpc("071fd21109d1532f3e2910ac3470da7bc771512ea0c8de68833432fd6fd2b8c3"));
var proposeBridgeFn = createServerFn({ method: "POST" }).validator(object({
	filename: string().min(1),
	source: address,
	target: address,
	relation: string().min(1),
	status,
	equations: lines,
	assumptions: lines,
	mechanism: string().optional(),
	confusion_guard: string().optional(),
	stop_reason: string().optional()
})).handler(createSsrRpc("364ceb68b160d2c6d69168ecee5495cdadcbcdeaaee06dcf9beb938bf7da13d8"));
var listPrsFn = createServerFn({ method: "POST" }).validator(object({ state: _enum([
	"open",
	"closed",
	"all"
]).default("all") })).handler(createSsrRpc("a2094a1b12ce6357180ce71e2311db9fba9d48092b5a70f63957c9b3a1c0201e"));
var getPrFn = createServerFn({ method: "POST" }).validator(object({ number: number().int().positive() })).handler(createSsrRpc("4359b0ac9ad03bb19f40ef2e62096f31b10db701e7d428b5512ba0a1b47a5832"));
var mergePrFn = createServerFn({ method: "POST" }).validator(object({ number: number().int().positive() })).handler(createSsrRpc("d2b6437db626a7d24488f086be9fa78a173639541ad95523eca56444e020ec61"));
function Input({ className, type, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("flex h-11 w-full rounded-md border border-border bg-surface px-3 text-sm text-fg", "placeholder:text-subtle shadow-[var(--shadow-border)]", "transition-[box-shadow,border-color] duration-150", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70", "disabled:cursor-not-allowed disabled:opacity-50", className),
		...props
	});
}
var RELATIONS = [
	"DERIVED_FROM",
	"DUAL_TO",
	"MEASURED_BY",
	"STOPS_AT",
	"EQUIVALENT_WITHIN",
	"CANDIDATE_BRIDGE",
	"REPRESENTS"
];
async function transcribeDna() {
	markPulling();
	try {
		const pulled = await pullDna();
		applyDna(pulled);
		return pulled;
	} catch (e) {
		markPullError(e instanceof Error ? e.message : String(e));
		throw e;
	}
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "grid gap-1.5 text-sm font-medium",
		children: [label, children]
	});
}
function DnaEngine() {
	const live = useLive();
	const [kind, setKind] = (0, import_react.useState)("node");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [note, setNote] = (0, import_react.useState)(null);
	const [prUrl, setPrUrl] = (0, import_react.useState)(null);
	async function onPull() {
		setBusy(true);
		setNote(null);
		try {
			const pulled = await transcribeDna();
			setNote(`Transcribed ${pulled.catalog.nodes.length} nodes, ${pulled.catalog.bridges.length} bridges from ${pulled.sha.slice(0, 7)}.`);
		} catch (e) {
			setNote(e instanceof Error ? e.message : String(e));
		} finally {
			setBusy(false);
		}
	}
	async function onNode(form) {
		setBusy(true);
		setNote(null);
		setPrUrl(null);
		try {
			const result = await proposeNodeFn({ data: {
				domain: String(form.get("domain") ?? ""),
				filename: String(form.get("filename") ?? ""),
				address: String(form.get("address") ?? ""),
				title: String(form.get("title") ?? ""),
				description: String(form.get("description") ?? ""),
				status: String(form.get("status") ?? "HYP"),
				definitions: String(form.get("definitions") ?? ""),
				equations: String(form.get("equations") ?? ""),
				assumptions: String(form.get("assumptions") ?? ""),
				mechanism: String(form.get("mechanism") ?? ""),
				confusion_guard: String(form.get("confusion_guard") ?? ""),
				stop_reason: String(form.get("stop_reason") ?? ""),
				tags: String(form.get("tags") ?? "")
			} });
			setPrUrl(result.prUrl);
			setNote(`Wrote ${result.path} on ${result.branch}.`);
			await transcribeDna();
		} catch (e) {
			setNote(e instanceof Error ? e.message : String(e));
		} finally {
			setBusy(false);
		}
	}
	async function onBridge(form) {
		setBusy(true);
		setNote(null);
		setPrUrl(null);
		try {
			const result = await proposeBridgeFn({ data: {
				filename: String(form.get("filename") ?? ""),
				source: String(form.get("source") ?? ""),
				target: String(form.get("target") ?? ""),
				relation: String(form.get("relation") ?? "DERIVED_FROM"),
				status: String(form.get("status") ?? "HYP"),
				equations: String(form.get("equations") ?? ""),
				assumptions: String(form.get("assumptions") ?? ""),
				mechanism: String(form.get("mechanism") ?? ""),
				confusion_guard: String(form.get("confusion_guard") ?? ""),
				stop_reason: String(form.get("stop_reason") ?? "")
			} });
			setPrUrl(result.prUrl);
			setNote(`Wrote ${result.path} on ${result.branch}.`);
			await transcribeDna();
		} catch (e) {
			setNote(e instanceof Error ? e.message : String(e));
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-8 lg:grid-cols-[0.9fr_1.1fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "rounded-2xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[11px] uppercase tracking-[0.16em] text-subtle",
					children: "DNA-memory · GitHub main"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 font-display text-3xl tracking-tight",
					children: "Canonical ledger"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "The repository is the durable index. This UI transcribes it, then reverse-transcribes proposals as pull requests. Merge-check stays human."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
					className: "mt-5 grid gap-0",
					children: [
						["Origin", live.origin === "dna" ? "DNA (GitHub)" : "Local snapshot"],
						["SHA", live.sha ? live.sha.slice(0, 12) : "—"],
						["Nodes", String(live.catalog.nodes.length)],
						["Bridges", String(live.catalog.bridges.length)],
						["Write", live.writable ? "PR enabled" : "Read-only until GitHub is connected"]
					].map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-baseline justify-between gap-4 border-t border-border py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-xs text-muted",
							children: k
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "font-mono text-sm tabular-nums",
							children: v
						})]
					}, k))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 flex flex-wrap gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						onClick: () => void onPull(),
						disabled: busy || live.pulling,
						children: live.pulling ? "Transcribing…" : "Pull DNA"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: DNA.html,
							target: "_blank",
							rel: "noreferrer",
							children: "Open the ledger"
						})
					})]
				}),
				live.error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm text-stop",
					children: live.error
				}) : null,
				note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm text-muted",
					children: note
				}) : null,
				prUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: prUrl,
						className: "text-fg underline-offset-2 hover:underline",
						target: "_blank",
						rel: "noreferrer",
						children: "Open pull request"
					})
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-xs text-muted",
					children: "Confusion guard: DNA and RNA here are a working metaphor for canonical memory versus transcription. They are not a biological claim. GitHub is git."
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "rounded-2xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[11px] uppercase tracking-[0.16em] text-subtle",
					children: "RNA-engine · propose"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: `rounded-md px-3 py-2 text-sm ${kind === "node" ? "bg-surface-2 text-fg" : "text-muted hover:text-fg"}`,
						onClick: () => setKind("node"),
						children: "Node"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: `rounded-md px-3 py-2 text-sm ${kind === "bridge" ? "bg-surface-2 text-fg" : "text-muted hover:text-fg"}`,
						onClick: () => setKind("bridge"),
						children: "Bridge"
					})]
				}),
				kind === "node" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "mt-5 grid gap-4",
					onSubmit: (e) => {
						e.preventDefault();
						onNode(new FormData(e.currentTarget));
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Address",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								name: "address",
								required: true,
								placeholder: "UPI<theories,1,holography,example>",
								className: "font-mono"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Title",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									name: "title",
									required: true,
									placeholder: "Short scientific title"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Status",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									name: "status",
									defaultValue: "HYP",
									className: "flex h-11 w-full rounded-md border border-border bg-surface px-3 text-sm",
									children: STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
										value: s,
										children: [
											s,
											" · ",
											STATUS_COPY[s].label
										]
									}, s))
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Domain folder",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									name: "domain",
									required: true,
									placeholder: "theories"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Filename",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									name: "filename",
									required: true,
									placeholder: "example"
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Description",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								name: "description",
								required: true,
								rows: 4
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Equations (one per line)",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								name: "equations",
								rows: 3,
								className: "font-mono"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Confusion guard",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								name: "confusion_guard",
								rows: 2
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "STOP reason (required if STOP)",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								name: "stop_reason",
								rows: 2
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Tags (comma)",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								name: "tags",
								placeholder: "holography, entropy"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							disabled: busy,
							children: "Write to DNA"
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "mt-5 grid gap-4",
					onSubmit: (e) => {
						e.preventDefault();
						onBridge(new FormData(e.currentTarget));
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Source address",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								name: "source",
								required: true,
								className: "font-mono",
								placeholder: "UPI<…>"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Target address",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								name: "target",
								required: true,
								className: "font-mono",
								placeholder: "UPI<…>"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Relation",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									name: "relation",
									className: "flex h-11 w-full rounded-md border border-border bg-surface px-3 text-sm",
									defaultValue: "DERIVED_FROM",
									children: RELATIONS.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: r,
										children: r
									}, r))
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Status",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									name: "status",
									defaultValue: "HYP",
									className: "flex h-11 w-full rounded-md border border-border bg-surface px-3 text-sm",
									children: STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: s,
										children: s
									}, s))
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Filename",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								name: "filename",
								required: true,
								placeholder: "example_from_source"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Mechanism",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								name: "mechanism",
								rows: 3
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Confusion guard",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								name: "confusion_guard",
								rows: 2
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							disabled: busy,
							children: "Write bridge to DNA"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 text-xs text-muted",
					children: [
						"EST still requires evidence. HYP stays HYP until a measurement.",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/method",
							className: "text-fg underline-offset-2 hover:underline",
							children: "Method"
						}),
						"."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 flex flex-wrap gap-2",
					children: STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: s }, s))
				})
			]
		})]
	});
}
var NAV = [
	{
		to: "/",
		label: "Index"
	},
	{
		to: "/catalog",
		label: "Catalog"
	},
	{
		to: "/stop",
		label: "STOP"
	},
	{
		to: "/graph",
		label: "Graph"
	},
	{
		to: "/lattice",
		label: "Lattice"
	},
	{
		to: "/holography",
		label: "AdS"
	},
	{
		to: "/symmetry",
		label: "Grp"
	},
	{
		to: "/dna",
		label: "DNA"
	},
	{
		to: "/lab",
		label: "Lab"
	}
];
function AppShell({ children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const [open, setOpen] = (0, import_react.useState)(false);
	const live = useLive();
	(0, import_react.useEffect)(() => {
		transcribeDna().catch(() => {});
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh min-w-0 flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-40 border-b border-border bg-bg/85 backdrop-blur-md",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:px-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							className: "flex min-w-0 items-center gap-2.5",
							onClick: () => setOpen(false),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrbitalMark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block font-display text-lg leading-none tracking-tight",
									children: "UPI"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hidden text-xs tracking-wide text-muted sm:block",
									children: "Universal Physics Index"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "ml-3 hidden items-center gap-0.5 lg:flex",
							"aria-label": "Primary",
							children: NAV.map((item) => {
								const active = item.to === "/" ? pathname === "/" : pathname === item.to || pathname.startsWith(`${item.to}/`);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: item.to,
									className: cn("rounded-md px-2 py-1.5 text-xs transition-colors duration-150", active ? "bg-surface-2 text-fg" : item.to === "/stop" ? "text-stop hover:bg-surface hover:text-fg" : "text-muted hover:bg-surface hover:text-fg"),
									children: item.label
								}, item.to);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ml-auto flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hidden font-mono text-xs text-subtle sm:inline",
									children: live.origin === "dna" ? `DNA ${live.sha?.slice(0, 7) ?? ""}` : `v${live.catalog.version}`
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon",
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: DNA.html,
										target: "_blank",
										rel: "noreferrer",
										"aria-label": "UPI source on GitHub",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Github, {})
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon",
									className: "lg:hidden",
									"aria-expanded": open,
									"aria-label": open ? "Close menu" : "Open menu",
									onClick: () => setOpen((v) => !v),
									children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {})
								})
							]
						})
					]
				}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "grid gap-1 border-t border-border px-4 py-3 lg:hidden",
					"aria-label": "Mobile",
					children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: item.to,
						onClick: () => setOpen(false),
						className: "rounded-md px-3 py-3 text-sm text-fg hover:bg-surface-2",
						children: item.label
					}, item.to))
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "min-w-0 flex-1",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-xl",
							children: "Universal Physics Index"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 max-w-md text-sm text-muted",
							children: "An open ledger of typed scientific nodes. Status labels are strict. Metaphor never upgrades a record to established fact."
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-2 font-medium",
								children: "Explore"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-1.5 text-muted",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/catalog",
										className: "hover:text-fg",
										children: "Node catalog"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/stop",
										className: "hover:text-fg",
										children: "STOP desk"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/graph",
										className: "hover:text-fg",
										children: "Bridge graph"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/symmetry",
										search: { layer: "algebra" },
										className: "hover:text-fg",
										children: "Group / algebra"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/dna",
										className: "hover:text-fg",
										children: "DNA / RNA"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/lab",
										className: "hover:text-fg",
										children: "Frequency lab"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/method",
										className: "hover:text-fg",
										children: "Method"
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-sm text-muted",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-2 font-medium text-fg",
								children: "Boundary"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "8 Hz is a reference example, not a universal constant. Software tests prove software behavior. MIT license." })]
						})
					]
				})
			})
		]
	});
}
var styles_default = "/assets/styles-QU9pVXuI.css";
var APP_NAME = "Universal Physics Index";
var Route$11 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "Open, machine-readable index of physical quantities, equations, hypotheses, and provenance — with strict scientific status labels."
			},
			{
				name: "theme-color",
				content: "#08090b"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;1,400&family=Instrument+Serif:ital@0;1&display=swap"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "bg-bg text-fg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	})
});
var $$splitComponentImporter$10 = () => import("./routes-B7ekWalf.mjs");
var Route$10 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./catalog-CKiUv4ef.mjs");
var searchSchema$4 = object({
	q: string().optional().catch(""),
	status: _enum([
		"ALL",
		"EST",
		"DER",
		"HYP",
		"STOP",
		"ERR",
		"SYM"
	]).optional().catch("ALL"),
	domain: string().optional().catch("all")
});
var Route$9 = createFileRoute("/catalog")({
	validateSearch: searchSchema$4,
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./dna-B2piTWx-.mjs");
var searchSchema$3 = object({ pr: number().int().positive().optional().catch(void 0) });
var Route$8 = createFileRoute("/dna")({
	validateSearch: searchSchema$3,
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./graph-BoH5B_K3.mjs");
var searchSchema$2 = object({ node: string().optional() });
var Route$7 = createFileRoute("/graph")({
	validateSearch: searchSchema$2,
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./holography-B1uys_2k.mjs");
var Route$6 = createFileRoute("/holography")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./lab-BBnMBQTZ.mjs");
var Route$5 = createFileRoute("/lab")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./lattice-BrzkY-YL.mjs");
var Route$4 = createFileRoute("/lattice")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./method-DxvIrBdo.mjs");
var Route$3 = createFileRoute("/method")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var STORAGE_KEY = "upi-stop-solutions-v1";
var LEGACY_REPLIES = "upi-stop-replies-v1";
var ISSUE_8_URL = `${DNA.html}/issues/8`;
var PINNED_ID = "abstract-payload";
var SOLUTION_KINDS = [
	{
		id: "counting-rule",
		label: "Counting rule"
	},
	{
		id: "evidence",
		label: "Evidence"
	},
	{
		id: "close-proposal",
		label: "Close proposal"
	}
];
function deskStops() {
	return OPEN_STOPS.map((r) => ({
		id: r.id,
		kind: "desk",
		group: "indaleko",
		title: r.claim,
		cited: r.cited,
		conflict: r.conflict,
		closesIf: r.closesIf,
		status: r.status,
		issue: 8
	}));
}
function heldStops() {
	return HELD_ROWS.map((r) => ({
		id: r.id,
		kind: "desk",
		group: "held",
		title: r.claim,
		cited: r.cited,
		conflict: r.conflict,
		closesIf: r.closesIf,
		status: r.status,
		issue: 8
	}));
}
function ledgerStops(catalog) {
	const nodes = catalog.nodes.filter((n) => n.status === "STOP").map((n) => nodeToStop(n));
	const bridges = catalog.bridges.filter((b) => b.status === "STOP").map((b) => bridgeToStop(b));
	return [...nodes, ...bridges];
}
function nodeToStop(n) {
	return {
		id: `node:${n.slug}`,
		kind: "node",
		group: n.file.includes("indaleko") ? "indaleko" : "ledger",
		title: n.title,
		cited: n.address,
		conflict: n.stop_reason || n.description,
		closesIf: n.falsification_conditions[0] ?? "Name the missing identity. STOP stays until that sentence exists.",
		status: "STOP",
		issue: n.file.includes("indaleko") ? 8 : void 0,
		slug: n.slug,
		file: n.file
	};
}
function bridgeToStop(b) {
	return {
		id: `bridge:${b.slug}`,
		kind: "bridge",
		group: "ledger",
		title: `${shortAddr(b.source)} ${b.relation} ${shortAddr(b.target)}`,
		cited: b.relation,
		conflict: b.stop_reason || b.mechanism || "Bridge stops.",
		closesIf: "Name why the relation holds in-domain, or leave it STOP.",
		status: "STOP",
		slug: b.slug,
		file: b.file
	};
}
function shortAddr(address) {
	const parts = address.replace(/^UPI</, "").replace(/>$/, "").split(",");
	return parts[parts.length - 1] ?? address;
}
function xDeskStops() {
	return X_OPEN_STOPS.map((r) => ({
		id: r.id,
		kind: "desk",
		group: "x",
		title: r.title,
		cited: r.cited,
		conflict: r.conflict,
		closesIf: r.closesIf,
		status: r.status
	}));
}
function allStops(catalog) {
	return [
		...deskStops(),
		...xDeskStops(),
		...ledgerStops(catalog),
		...heldStops()
	];
}
function filterStops(items, group, q) {
	const query = q.trim().toLowerCase();
	return items.filter((item) => {
		if (group === "open") {
			if (item.status !== "STOP") return false;
		} else if (item.group !== group) return false;
		if (!query) return true;
		return [
			item.title,
			item.cited,
			item.conflict,
			item.closesIf,
			item.file ?? "",
			item.id
		].join(" ").toLowerCase().includes(query);
	});
}
function loadSolutions() {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (raw) return JSON.parse(raw);
		const legacy = localStorage.getItem(LEGACY_REPLIES);
		if (!legacy) return [];
		const map = JSON.parse(legacy);
		return Object.entries(map).filter(([, text]) => text.trim()).map(([stopId, text]) => ({
			id: `legacy-${stopId}`,
			stopId,
			kind: "counting-rule",
			text,
			at: (/* @__PURE__ */ new Date(0)).toISOString()
		}));
	} catch {
		return [];
	}
}
function saveSolutions(rows) {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(rows));
}
function addSolution(rows, stopId, kind, text) {
	const next = {
		id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
		stopId,
		kind,
		text: text.trim(),
		at: (/* @__PURE__ */ new Date()).toISOString()
	};
	if (!next.text) return rows;
	const all = [...rows, next];
	saveSolutions(all);
	return all;
}
function solutionsFor(rows, stopId) {
	return rows.filter((s) => s.stopId === stopId);
}
function issueCommentMarkdown(item, solutions) {
	const body = solutions.map((s) => `- **${s.kind}** (${s.at.slice(0, 10)}): ${s.text}`).join("\n");
	return [
		`### Solution · ${item.id}`,
		"",
		`**Claim:** ${item.title}`,
		`**Cited:** ${item.cited}`,
		`**Status:** ${item.status} — a reply does not auto-promote.`,
		"",
		item.conflict,
		"",
		`Closes if: ${item.closesIf}`,
		"",
		body || "_No local solutions yet._"
	].join("\n");
}
var $$splitComponentImporter$2 = () => import("./stop-B2s2DgxC.mjs");
var searchSchema$1 = object({
	id: string().optional().catch(PINNED_ID),
	q: string().optional().catch(""),
	group: _enum([
		"open",
		"indaleko",
		"ledger",
		"held",
		"x"
	]).optional().catch("open")
});
var Route$2 = createFileRoute("/stop")({
	validateSearch: searchSchema$1,
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./symmetry-axRYuQ_W.mjs");
var groupModes = GROUP_MODES.map((m) => m.id);
var lieModes = LIE_MODES.map((m) => m.id);
var searchSchema = object({
	layer: _enum(["group", "algebra"]).optional().catch(void 0),
	g: _enum(groupModes).optional().catch(void 0),
	a: _enum(lieModes).optional().catch(void 0)
});
var Route$1 = createFileRoute("/symmetry")({
	validateSearch: searchSchema,
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./n._slug-sNXuhwjp.mjs");
var Route = createFileRoute("/n/$slug")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var rootRouteChildren = {
	IndexRoute: Route$10.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$11
	}),
	CatalogRoute: Route$9.update({
		id: "/catalog",
		path: "/catalog",
		getParentRoute: () => Route$11
	}),
	DnaRoute: Route$8.update({
		id: "/dna",
		path: "/dna",
		getParentRoute: () => Route$11
	}),
	GraphRoute: Route$7.update({
		id: "/graph",
		path: "/graph",
		getParentRoute: () => Route$11
	}),
	HolographyRoute: Route$6.update({
		id: "/holography",
		path: "/holography",
		getParentRoute: () => Route$11
	}),
	LabRoute: Route$5.update({
		id: "/lab",
		path: "/lab",
		getParentRoute: () => Route$11
	}),
	LatticeRoute: Route$4.update({
		id: "/lattice",
		path: "/lattice",
		getParentRoute: () => Route$11
	}),
	MethodRoute: Route$3.update({
		id: "/method",
		path: "/method",
		getParentRoute: () => Route$11
	}),
	StopRoute: Route$2.update({
		id: "/stop",
		path: "/stop",
		getParentRoute: () => Route$11
	}),
	SymmetryRoute: Route$1.update({
		id: "/symmetry",
		path: "/symmetry",
		getParentRoute: () => Route$11
	}),
	NSlugRoute: Route.update({
		id: "/n/$slug",
		path: "/n/$slug",
		getParentRoute: () => Route$11
	})
};
var routeTree = Route$11._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { DNA_NOTES as $, LIE_MODES as A, xCounts as At, nearlyEqual as B, getLiveCatalog as Bt, E8_CARTAN as C, logBarPct as Ct, GROUP_MODES as D, X_ACCOUNT as Dt, GROUP_COPY as E, Textarea as Et, cross as F, bridgesFor as Ft, u1RoundTrip as G, useLive as Gt, rotateVec as H, getNodeByAddress as Ht, e8DimensionCheck as I, cn as It, wrapTau as J, u1RoundTripLie as K, jacobiResidual as L, domainLabel as Lt, boostExp as M, STATUSES as Mt, boostLog as N, STATUS_COPY as Nt, LIE_APPLICATIONS as O, X_CLAIMS as Ot, composeVelocity as P, StatusBadge as Pt, BOLTZMANN_K as Q, lorentzRoundTrip as R, domainsOf as Rt, mergePrFn as S, formatBytes as St, GROUP_APPLICATIONS as T, stopTableMarkdown as Tt, so11RoundTrip as U, searchNodes as Ut, planckEinsteinRoundTrip as V, getNode as Vt, so3RoundTrip as W, statusCounts as Wt, znInv as X, znAdd as Y, znRoundTrip as Z, DnaEngine as _, INDALEKO_PAPER as _t, ISSUE_8_URL as a, energyFromFrequency as at, getPrFn as b, PLATFORMS as bt, addSolution as c, n8Index as ct, issueCommentMarkdown as d, ANCHOR_MAP as dt, G_NEWTON as et, loadSolutions as f, CORPUS as ft, Route$9 as g, INDALEKO_NODES as gt, Route$8 as h, INDALEKO_LAYERS as ht, Route$2 as i, bekensteinHawkingSOverK as it, boost as j, Button as jt, LIE_COPY as k, X_PEERS as kt, allStops as l, parseDnaSequence as lt, Route$7 as m, HELD_ROWS as mt, Route as n, PLANCK_LENGTH as nt, PINNED_ID as o, formatScientific as ot, solutionsFor as p, CORPUS_ROWS as pt, velocityFromRapidity as q, Route$1 as r, SPEED_OF_LIGHT as rt, SOLUTION_KINDS as s, massEquivalent as st, router_exports as t, PLANCK_H as tt, filterStops as u, schwarzschildRadius as ut, transcribeDna as v, OPEN_STOPS as vt, E8_EDGES as w, runCorpusAudit as wt, listPrsFn as x, STOP_REPLY_HINT as xt, Input as y, PHYSICS_SOURCES as yt, minkowskiOmega as z, featuredNodes as zt };
