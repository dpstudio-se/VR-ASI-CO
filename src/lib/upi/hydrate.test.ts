import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { DNA, hydrateCatalog } from "./hydrate.ts";

describe("Remote DNA hydration", () => {
  it("uses the configured repository and imports its mapped research nodes", () => {
    const catalog = hydrateCatalog(
      [
        {
          path: "data/research/UPI_PHYSICS_MAP.json",
          json: {
            nodes: {
              "UPIcalc,1,E_hf": { equation: "E=hf", status: "EST" },
              "UPIcalc,1,mass_equivalent": { equation: "m=hf/c^2", status: "DER" },
            },
          },
        },
      ],
      "test",
    );

    assert.equal(DNA.repo, "upi-built-by-agi-teax-main");
    assert.equal(catalog.sourceRepo, DNA.html);
    assert.equal(catalog.nodes.length, 2);
    assert.equal(catalog.nodes[0]?.address, "UPI<calc,1,research,E_hf>");
    assert.equal(catalog.nodes[0]?.status, "EST");
    assert.equal(catalog.nodes[1]?.status, "DER");
  });

  it("imports repository bridges and retains STOP conservatively for compound statuses", () => {
    const catalog = hydrateCatalog(
      [
        {
          path: "data/bridges/11d-to-783hz-forward-prediction-001.json",
          json: {
            type: "forward-prediction-bridge",
            status: "HYP/STOP",
            from: ["UPItheory,1,mtheory_witten_1995", "UPIgeo,1,schumann_783"],
            target: "UPIcalc,1,frequency_7_83hz",
            direction: "11D geometry -> R_11 -> f_pred",
          },
        },
      ],
      "test",
    );

    assert.equal(catalog.bridges.length, 1);
    assert.equal(catalog.bridges[0]?.status, "STOP");
    assert.match(catalog.bridges[0]?.stop_reason ?? "", /HYP\/STOP/);
    assert.equal(catalog.bridges[0]?.source, "UPItheory,1,mtheory_witten_1995, UPIgeo,1,schumann_783");
  });

  it("imports top-level research records without promoting their status", () => {
    const catalog = hydrateCatalog(
      [
        {
          path: "data/research/UPI_FORWARD_PREDICTION_11D_783HZ.json",
          json: {
            id: "UPI_FORWARD_PREDICTION_11D_783HZ_001",
            status: "HYP",
            title: "11D geometry forward prediction",
            canonical_expression: "f_pred = F_11D(geometry)",
          },
        },
      ],
      "test",
    );

    assert.equal(catalog.nodes.length, 1);
    assert.equal(catalog.nodes[0]?.status, "HYP");
    assert.equal(catalog.nodes[0]?.description, "f_pred = F_11D(geometry)");
  });

  it("keeps research-source records in the source catalog", () => {
    const catalog = hydrateCatalog(
      [
        {
          path: "data/sources/schumann-783hz.json",
          json: {
            id: "SRC_SCHUMANN_783",
            type: "research_source",
            status: "EST",
            title: "Earth-ionosphere Schumann resonance around 7.83 Hz",
            sources: ["https://example.test/paper"],
            boundary: "This is not an M-theory frequency.",
          },
        },
      ],
      "test",
    );

    assert.equal(catalog.sources.length, 1);
    assert.equal(catalog.sources[0]?.source_id, "SRC_SCHUMANN_783");
    assert.equal(catalog.sources[0]?.canonical_url, "https://example.test/paper");
    assert.match(catalog.sources[0]?.evidence_boundary ?? "", /not an M-theory frequency/);
    assert.equal(catalog.nodes.length, 0);
  });
});
