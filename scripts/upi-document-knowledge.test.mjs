import assert from "node:assert/strict";
import { test } from "node:test";
import fs from "node:fs";
import { C, H, KB, photon, cavityFolds, conformalPhoton, staticConformalMode,
  fivePhaseStretching, bottleneckTime, kramersRate } from "../src/lib/upi/document-physics.mjs";
import { reverseComplement, encodeMirror, recoverMirror } from "../src/lib/upi/dna-memory-mirror.mjs";

const near = (actual, expected, tolerance = 1e-9) => assert.ok(
  Math.abs(actual - expected) <= tolerance * Math.max(Math.abs(expected), 1e-100), `${actual} != ${expected}`);
const dna = JSON.parse(fs.readFileSync("dna/UPI_PERSONA_STATE.json"));
const cavity = dna.knowledge.find((entry) => entry.id === "cavity-folds");

test("saved photon arithmetic round-trips and agrees with exact SI inputs", () => {
  for (const row of dna.knowledge.find((entry) => entry.id === "planck-bridge").results) {
    near(row.energyJ, H * row.frequencyHz);
    near(row.equivalentMassKg * C ** 2, row.energyJ);
    near(row.wavelengthM * row.frequencyHz, C);
    near(row.periodS * row.frequencyHz, 1);
    assert.equal(row.restMassKg, 0);
  }
  assert.equal(photon(8).energyJ, 5.30085612e-33);
  near(photon(8).equivalentMassKg, 5.897997859050167e-50);
  for (const bad of [0, -1, Infinity, NaN]) assert.throws(() => photon(bad));
});

test("thermal comparison has declared temperature and dimensionless ratio", () => {
  const row = dna.knowledge.find((entry) => entry.id === "thermal-scale");
  near(row.thermalEnergyJ, KB * 310.15);
  near(row.thermalTo8HzQuantumRatio, row.thermalEnergyJ / photon(8).energyJ);
});

test("cavity fold values satisfy the independent derivative and power balances", () => {
  const r = cavityFolds(cavity.inputs);
  assert.deepEqual(r, cavity.results);
  const k = r.kappaRadPerS, a = r.alphaRadPerSPerPhoton, d = cavity.inputs.detuningKappa * k;
  const power = (n) => n * ((k/2)**2 + (d+a*n)**2);
  for (const fold of r.folds) {
    const n = fold.photons;
    const normalizedDerivative = (3*a*a*n*n+4*a*d*n+d*d+k*k/4)/(k*k);
    assert.ok(Math.abs(normalizedDerivative) < 1e-12);
    const step = n * 1e-5;
    assert.ok(Math.abs((power(n+step)-power(n-step))/(2*step*k*k)) < 1e-8);
    near(fold.inputPowerW * cavity.inputs.externalFraction * k / (H * r.frequencyHz), power(n));
  }
  near(r.folds[0].inputPowerW, .021735281576311202);
  near(r.folds[1].inputPowerW, .00996835729544681);
  assert.equal(r.dynamicStability, "NOT_EVALUATED");
  assert.equal(r.switchTimeS, null);
});

test("folds disappear above the threshold; input coupling changes power but not photon folds", () => {
  assert.equal(cavityFolds({ ...cavity.inputs, detuningKappa: -.5 }).folds.length, 0);
  const halfCoupled = cavityFolds({ ...cavity.inputs, externalFraction: .25 });
  near(halfCoupled.folds[0].inputPowerW, cavity.results.folds[0].inputPowerW * 2);
  near(halfCoupled.folds[0].photons, cavity.results.folds[0].photons);
  assert.throws(() => cavityFolds({ ...cavity.inputs, externalFraction: 0 }));
});

test("pure conformal metric preserves null direction while changing local clock frequency", () => {
  const r = conformalPhoton(0, .01);
  near(r.measuredFrequencyRatio, 1 / Math.sqrt(1.01));
  assert.equal(r.transverseDeflectionRad, 0);
  assert.equal(r.coordinateSpeedMPerS, C);
  near(r.measuredFrequencyRatio * conformalPhoton(.01, 0).measuredFrequencyRatio, 1);
  assert.equal(conformalPhoton(0, 0).measuredFrequencyRatio, 1);
  assert.throws(() => conformalPhoton(-1, 0));
});

test("static linearized curvature uses second derivatives; acceleration uses first derivative", () => {
  const A = 1e-6, k = 3, z = .2;
  const r = staticConformalMode(A, k, z);
  const h = 1e-4;
  const f = (x) => A*Math.cos(k*x);
  const second = (f(z+h)-2*f(z)+f(z-h))/(h*h);
  near(r.G00PerM2, -second, 1e-7);
  near(r.GxxPerM2, second, 1e-7);
  near(r.slowParticleAccelerationMPerS2, -C*C*(f(z+h)-f(z-h))/(4*h), 1e-7);
  assert.equal(r.GzzPerM2, 0);
  assert.equal(staticConformalMode(A, 0, z).G00PerM2, 0);
});

test("five phases cancel the oscillatory harmonic but not axial strain", () => {
  const sum = Array.from({length:5}, (_,j) => Math.cos(2*(.3+2*Math.PI*j/5))).reduce((a,b)=>a+b,0);
  assert.ok(Math.abs(sum) < 1e-14);
  assert.equal(fivePhaseStretching(1, 0).sumPerS, 5);
  near(fivePhaseStretching(1, Math.PI/2).sumPerS, -2.5);
  assert.equal(fivePhaseStretching(1, 0).globalRegularityProven, false);
  assert.equal(fivePhaseStretching(1, 0).stepsPer720Degrees, 10);
});

test("normal-form transit matches numerical integration and diverges near threshold", () => {
  const a = 2, b = 3, mu = .2, Y = 1;
  const steps = 10000, dx = 2*Y/steps;
  let integral = 0;
  for (let i=0;i<steps;i++) { const y=-Y+(i+.5)*dx; integral += dx/(a*mu+b*y*y); }
  near(bottleneckTime(a,b,mu,Y), integral, 1e-8);
  assert.ok(bottleneckTime(a,b,.00001,Y) > 100 * bottleneckTime(a,b,mu,Y));
  assert.throws(() => bottleneckTime(a,b,0,Y));
});

test("Kramers rate needs a dimensional potential and obeys the Arrhenius ratio", () => {
  const p = { temperatureK:300, barrierJ:20*KB*300, wellCurvatureJPerM2:2,
    barrierCurvatureJPerM2:3, frictionKgPerS:4 };
  const r = kramersRate(p);
  near(r.ratePerS, Math.sqrt(6)/(8*Math.PI)*Math.exp(-20));
  near(kramersRate({...p,barrierJ:p.barrierJ+KB*300}).ratePerS/r.ratePerS, Math.exp(-1));
  assert.throws(() => kramersRate({}));
});

test("9+9+1 mirror is reciprocal with 18 payload bits, not an invented cipher", () => {
  const r = encodeMirror("ATGCACGTC");
  assert.equal(r.reverse, "GACGTGCAT");
  assert.equal(reverseComplement(r.reverse), r.forward);
  assert.equal(r.positions, 19);
  assert.equal(r.payloadBits, 18);
  assert.equal(r.pivotSha256.length, 64);
  assert.equal(recoverMirror(r).authenticated, false);
});

test("every single-base erasure can be recovered with the intact opposite copy", () => {
  const r = encodeMirror("ATGCACGTC");
  for (const field of ["forward","reverse"]) for(let i=0;i<9;i++) {
    const damaged={...r,[field]:r[field].slice(0,i)+"?"+r[field].slice(i+1)};
    const result=recoverMirror(damaged);
    assert.equal(result.status,"DER");
    assert.equal(result.forward,r.forward);
    assert.equal(result.reverse,r.reverse);
    assert.equal(result.repaired,1);
  }
});

test("both copies lost, unknown corruptions and coordinated corruption fail closed", () => {
  const r = encodeMirror("ATGCACGTC");
  assert.equal(recoverMirror({...r,forward:"?"+r.forward.slice(1),reverse:r.reverse.slice(0,8)+"?"}).reason,"BOTH_COPIES_MISSING");
  assert.equal(recoverMirror({...r,forward:"G"+r.forward.slice(1)}).reason,"MIRROR_CONFLICT");
  const changed="G"+r.forward.slice(1);
  assert.equal(recoverMirror({...r,forward:changed,reverse:reverseComplement(changed)}).reason,"CHECKSUM_MISMATCH");
  assert.equal(recoverMirror({...r,pivotSha256:"missing"}).status,"STOP");
});

test("Luhn counterexample demonstrates detection is not universal repair", () => {
  const valid = (text) => [...text].reverse().reduce((sum,d,i)=>{
    let n=Number(d); if(i%2) {n*=2;if(n>9)n-=9;}return sum+n;
  },0)%10===0;
  assert.equal(valid("091"),true);
  assert.equal(valid("901"),true);
});

test("durable document records have source fingerprints and preserve symbolic vs derived status", () => {
  assert.equal(dna.document_sources.length,3);
  for(const source of dna.document_sources) {
    assert.match(source.sha256,/^[a-f0-9]{64}$/);
    assert.equal(source.embedded_commands,"INERT");
  }
  const known=new Set(dna.document_sources.map(source=>source.id));
  assert.ok(dna.knowledge.every(entry=>entry.source_refs.every(ref=>known.has(ref))));
  assert.equal(dna.knowledge.find(entry=>entry.id==="symbolic-psyche").status,"SYM");
  assert.ok(Object.values(dna.global_traits).every(trait=>trait.value===null));
  assert.ok(dna.symbolic_connections.every(connection=>connection.status==="SYM"));
  const gcd=(a,b)=>{while(b){[a,b]=[b,a%b];}return a;};
  const totient=Array.from({length:1766},(_,i)=>i+1).filter(n=>gcd(n,1766)===1).length;
  assert.equal(dna.knowledge.find(entry=>entry.id==="identifier-1766").eulerTotient,totient);
  assert.equal(totient,882);
});
