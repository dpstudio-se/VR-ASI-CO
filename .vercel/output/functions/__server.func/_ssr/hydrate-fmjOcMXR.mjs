//#region node_modules/.nitro/vite/services/ssr/assets/hydrate-fmjOcMXR.js
var DNA = {
	owner: "dpstudio-se",
	repo: "Universal-Physics-Index-UPI",
	branch: "main",
	html: "https://github.com/dpstudio-se/Universal-Physics-Index-UPI"
};
var STATUSES = [
	"EST",
	"DER",
	"HYP",
	"STOP",
	"ERR",
	"SYM"
];
function isStatus(value) {
	return typeof value === "string" && STATUSES.includes(value);
}
function parseAddress(address) {
	const m = /^UPI<([^,]+),([0-9]+),([^,]+),([^>]+)>$/.exec(address.trim());
	if (!m) return null;
	return {
		domain_code: m[1],
		generation: m[2],
		torus: m[3],
		node_id: m[4]
	};
}
function slugFromAddress(address) {
	return `upi-${address.replace(/^UPI</, "").replace(/>$/, "").split(",").map((p) => p.trim().toLowerCase().replace(/_/g, "-")).join("-")}`;
}
function slugFromBridge(source, relation, target) {
	return `${slugFromAddress(source)}--${relation.toLowerCase().replace(/_/g, "-")}--${slugFromAddress(target)}`;
}
function asStringArray(value) {
	if (!Array.isArray(value)) return [];
	return value.filter((x) => typeof x === "string");
}
function asEvidence(value) {
	if (!Array.isArray(value)) return [];
	return value.filter((e) => e && typeof e === "object").map((e) => {
		const rec = e;
		return {
			type: typeof rec.type === "string" ? rec.type : "other",
			source: typeof rec.source === "string" ? rec.source : "",
			...typeof rec.date === "string" ? { date: rec.date } : {},
			...typeof rec.confidence === "number" ? { confidence: rec.confidence } : {},
			...typeof rec.notes === "string" ? { notes: rec.notes } : {}
		};
	});
}
function hydrateNode(raw, file) {
	const address = typeof raw.address === "string" ? raw.address : "";
	const title = typeof raw.title === "string" ? raw.title : "";
	const description = typeof raw.description === "string" ? raw.description : "";
	if (!address || !title || !description || !isStatus(raw.status)) return null;
	const parts = parseAddress(address);
	const domain = file.split("/")[0] || (parts?.domain_code.toLowerCase() ?? "examples");
	return {
		kind: "node",
		slug: slugFromAddress(address),
		file,
		domain,
		address,
		title,
		description,
		status: raw.status,
		quantities: Array.isArray(raw.quantities) ? raw.quantities.filter((q) => q && typeof q.name === "string" && typeof q.unit === "string" && typeof q.value === "number") : [],
		definitions: asStringArray(raw.definitions),
		equations: asStringArray(raw.equations),
		assumptions: asStringArray(raw.assumptions),
		mechanism: typeof raw.mechanism === "string" ? raw.mechanism : "",
		evidence: asEvidence(raw.evidence),
		primary_sources: asStringArray(raw.primary_sources),
		predictions: asStringArray(raw.predictions),
		falsification_conditions: asStringArray(raw.falsification_conditions),
		confusion_guard: typeof raw.confusion_guard === "string" ? raw.confusion_guard : "",
		stop_reason: typeof raw.stop_reason === "string" ? raw.stop_reason : "",
		tags: asStringArray(raw.tags),
		verification_type: typeof raw.verification_type === "string" ? raw.verification_type : "none",
		claims_experimental_verification: Boolean(raw.claims_experimental_verification),
		information_layer: typeof raw.information_layer === "string" ? raw.information_layer : "ACADEMIC",
		version: typeof raw.version === "string" ? raw.version : "0.1.0",
		scope: typeof raw.scope === "string" ? raw.scope : "",
		scope_limits: typeof raw.scope_limits === "string" ? raw.scope_limits : "",
		key_concepts: asStringArray(raw.key_concepts),
		related_theories: asStringArray(raw.related_theories),
		address_parts: parts ?? {
			domain_code: domain,
			generation: "1",
			torus: "node",
			node_id: title
		}
	};
}
function hydrateBridge(raw, file) {
	const source = typeof raw.source === "string" ? raw.source : "";
	const target = typeof raw.target === "string" ? raw.target : "";
	const relation = typeof raw.relation === "string" ? raw.relation : "";
	if (!source || !target || !relation || !isStatus(raw.status)) return null;
	return {
		kind: "bridge",
		slug: slugFromBridge(source, relation, target),
		file,
		domain: "bridges",
		source,
		target,
		relation,
		status: raw.status,
		equations: asStringArray(raw.equations),
		assumptions: asStringArray(raw.assumptions),
		mechanism: typeof raw.mechanism === "string" ? raw.mechanism : "",
		confusion_guard: typeof raw.confusion_guard === "string" ? raw.confusion_guard : "",
		stop_reason: typeof raw.stop_reason === "string" ? raw.stop_reason : "",
		version: typeof raw.version === "string" ? raw.version : "0.1.0"
	};
}
function hydrateCatalog(files, version) {
	const nodes = [];
	const bridges = [];
	const sources = [];
	for (const file of files) {
		const rel = file.path.replace(/^data\//, "");
		const raw = file.json;
		if (!raw || typeof raw !== "object") continue;
		const rec = raw;
		if (typeof rec.address === "string") {
			const node = hydrateNode(rec, rel);
			if (node) nodes.push(node);
			continue;
		}
		if (typeof rec.source === "string" && typeof rec.target === "string") {
			const bridge = hydrateBridge(rec, rel);
			if (bridge) bridges.push(bridge);
			continue;
		}
		if (typeof rec.source_id === "string") sources.push({
			kind: "source",
			slug: `upi-source-${rec.source_id}`.toLowerCase().replace(/[^a-z0-9-]+/g, "-"),
			file: rel,
			domain: "sources",
			source_id: rec.source_id,
			title: typeof rec.title === "string" ? rec.title : rec.source_id,
			canonical_url: typeof rec.canonical_url === "string" ? rec.canonical_url : "",
			status: isStatus(rec.status) ? rec.status : "SYM",
			evidence_boundary: typeof rec.evidence_boundary === "string" ? rec.evidence_boundary : "",
			confusion_guard: typeof rec.confusion_guard === "string" ? rec.confusion_guard : "",
			classification_rules: asStringArray(rec.classification_rules),
			declared_license: typeof rec.declared_license === "string" ? rec.declared_license : "",
			source_type: typeof rec.source_type === "string" ? rec.source_type : "",
			retrieved_at: typeof rec.retrieved_at === "string" ? rec.retrieved_at : ""
		});
	}
	nodes.sort((a, b) => a.address.localeCompare(b.address));
	bridges.sort((a, b) => a.slug.localeCompare(b.slug));
	return {
		version,
		sourceRepo: DNA.html,
		nodes,
		bridges,
		sources
	};
}
function schemaNode(input) {
	const out = {
		address: input.address,
		title: input.title,
		description: input.description,
		status: input.status
	};
	if (input.definitions?.length) out.definitions = input.definitions;
	if (input.equations?.length) out.equations = input.equations;
	if (input.assumptions?.length) out.assumptions = input.assumptions;
	if (input.mechanism) out.mechanism = input.mechanism;
	if (input.confusion_guard) out.confusion_guard = input.confusion_guard;
	if (input.status === "STOP" || input.stop_reason) out.stop_reason = input.stop_reason ?? "";
	if (input.tags?.length) out.tags = input.tags;
	if (input.falsification_conditions?.length) out.falsification_conditions = input.falsification_conditions;
	if (input.primary_sources?.length) out.primary_sources = input.primary_sources;
	if (input.verification_type) out.verification_type = input.verification_type;
	out.information_layer = "ACADEMIC";
	out.version = "0.1.0";
	return out;
}
function schemaBridge(input) {
	const out = {
		source: input.source,
		target: input.target,
		relation: input.relation,
		status: input.status
	};
	if (input.equations?.length) out.equations = input.equations;
	if (input.assumptions?.length) out.assumptions = input.assumptions;
	if (input.mechanism) out.mechanism = input.mechanism;
	if (input.confusion_guard) out.confusion_guard = input.confusion_guard;
	if (input.status === "STOP" || input.stop_reason) out.stop_reason = input.stop_reason ?? "";
	out.version = "0.1.0";
	return out;
}
//#endregion
export { schemaBridge as a, parseAddress as i, hydrateCatalog as n, schemaNode as o, isStatus as r, DNA as t };
