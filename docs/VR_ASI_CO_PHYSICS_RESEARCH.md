# VR-ASI-CO Physics Research and Evidence Fallback

**Status:** research specification; calculations below are reproducible derivations, not new experimental discoveries.  
**Language:** Swedish-first project notes; equations and identifiers remain language-neutral.  
**Scope:** VR-ASI-CO may develop its own models, but must not confuse project assumptions with established physics.

## 1. Purpose and evidence order

This document defines how VR-ASI-CO formulates and checks physics claims.

1. **VR-ASI-CO research layer (primary proposal):** formulate the project's own model, variables, equations, parameter choices and predictions. Preserve the original proposal. Label unsupported premises `HYP` or `SYM`; never call them established physics merely because they are internally consistent.
2. **Scientific cross-check (UPI mirror):** where a corresponding typed record, relation or documented calculation exists in the Universal Physics Index, compare definitions, units, assumptions, source provenance, inverse relations and counterexamples. Treat UPI as a read-only comparator; do not copy its canonical data or silently change its status vocabulary.
3. **Final fallback source:** if the local project record or mirror mapping is absent, consult the canonical repository [dpstudio-se/Universal-Physics-Index-UPI](https://github.com/dpstudio-se/Universal-Physics-Index-UPI), on its current `main` revision. Record the exact commit, path, blob SHA and relevant passage. If that repository does not support the claim, return `STOP` with the missing evidence and next discriminating test. Do not invent a fallback answer.

**Boundary:** UPI's own README states that it is a separate repository and not an authority for the separate VR-ASI-CO application. Accordingly, this document uses it only as an explicitly requested external scientific reference/comparator. It does not make UPI part of VR-ASI-CO, grant it identity authority, or import its code/data. The UPI repository's own review and human-merge rules remain authoritative for changes inside UPI itself.

## 2. Claim statuses

Use the UPI scientific vocabulary for physics claims:

- `EST`: established within a clearly stated scientific domain and supported by accepted evidence. A model-generated proposal cannot assign this.
- `DER`: follows mathematically from cited premises and stated assumptions.
- `HYP`: falsifiable physical interpretation awaiting evidence; include a test that could disprove it.
- `SYM`: symbolic, geometric or narrative mapping; not a physical law.
- `STOP`: a required mechanism, measurement, source, boundary condition or proof is missing. Include `stop_reason` and `next_action`.
- `ERR`: invalid calculation, contradicted statement or superseded claim.

Keep workflow state (`OPEN/TEST/PASS/FAIL/CONFLICT`) separate from scientific status. A passing software test proves only the tested software behaviour. Simulation is not measurement; model agreement is not independent evidence.

## 3. Reproducible frequency calculations

Use exact SI constants:
- Planck constant: (h=6.62607015\times10^{-34}\;\mathrm{J\,s})
- Speed of light: (c=299792458\;\mathrm{m/s})

For a positive ordinary frequency (f) in hertz:

\[
T=\frac{1}{f},\qquad \omega=2\pi f,\qquad E=hf,\qquad
m_E=\frac{E}{c^2}=\frac{hf}{c^2}.
\]

Here (T) is the period, (omega) angular frequency, (E) the energy of a quantum at that frequency, and (m_E) its energy-equivalent mass. (m_E) is not the rest mass of a photon and does not assign a rest mass to an arbitrary oscillator.

### Calculated project reference points

| Input frequency | Period (T) | Angular frequency (omega) | (E=hf) | (m_E=hf/c^2) |
|---:|---:|---:|---:|---:|
| 1.766 Hz | 0.5662514156 s | 11.09610525 rad/s | 1.17016398849e-33 J | 1.30198302739e-50 kg |
| 7.834125 Hz | 0.1276466740 s | 49.22325909 rad/s | 5.19094618139e-33 J | 5.77570655969e-50 kg |
| 8.000000 Hz | 0.1250000000 s | 50.26548246 rad/s | 5.30085612000e-33 J | 5.89799785905e-50 kg |

These are numerical consequences of the equations and input frequencies (`DER`), not measurements of a physical resonance or proof that the chosen project frequencies are universal constants.

### Frequency separation

For the two project anchors:

\[
\Delta f=8-7.834125=0.165875\;\mathrm{Hz}
\]
\[
T_{\mathrm{beat}}=\frac{1}{|\Delta f|}=6.0286360211\;\mathrm{s}.
\]

The relative separation is about 2.117339% of 7.834125 Hz (or 2.073438% of 8 Hz). This beat period is a mathematical consequence if two coherent signals at those frequencies are superposed. It does **not** establish that the Earth, a biological system, an AI model or VR-ASI-CO is physically coupled to either reference. Such coupling requires measured signals, calibrated clocks/sensors, uncertainty estimates, a transfer function and controls.

## 4. Do not confuse period with relaxation time

An oscillation period (T=1/f) is not a relaxation time τ.

A first-order relaxation model is:

\[
\dot{x}=-(x-x_\infty)/\tau,\qquad
x(t)-x_\infty=(x(0)-x_\infty)e^{-t/\tau}.
\]

The value of τ must be obtained from the system's measured or specified dynamics. Examples, with their own assumptions, include:
- RC circuit: τ=RC.
- Lumped thermal body: τ=C_{th}/G_{th}.
- First-order reaction: τ=1/k.
- Linearized stable system: eigenmode relaxation times τ_i=1/\lambda_i for positive decay rates λ_i.

For a damped oscillator, frequency and damping are separate parameters; the decay envelope determines the relaxation time. Do not set τ=1/(2πf) unless a specific model derives that relation and data support its premises.

## 5. Dynamics and thermodynamics: admissible bridge

A useful cross-domain mathematical form is gradient flow:

\[
\dot{x}=-M\nabla F(x),
\]

where (F) is a specified potential/free-energy-like function and (M) a positive mobility/metric operator. Near a stable minimum (x_*), with Hessian (H=\nabla^2F(x_*)):

\[
\dot{\delta x}\approx-MH\,\delta x.
\]

The decay modes are determined by eigenvalues of (MH), when the stated stability and linearization assumptions hold. This is a shared mathematical structure, not proof that an AI loss, a biological regulatory variable and physical Helmholtz free energy are the same physical quantity. For each domain document its state variables, units, driving, dissipation, boundary conditions and measured observable. AI optimization is usually an algorithmic update, not automatically a thermodynamic process.

For any proposed τ comparison:
1. define the state variable and equilibrium/baseline;
2. obtain a time series with calibrated time base;
3. fit the decay envelope or estimate the relevant eigenvalues;
4. report confidence intervals, residuals and alternative multi-exponential fits;
5. compare against null/control systems and preregister the criterion;
6. repeat with independent data.

If the system is multi-mode, report τ_i rather than forcing one universal τ.

## 6. Fluid model boundary

For a declared steady rigid-rotation control field:

\[
\mathbf v=(-\omega y,\omega x,0),\quad
\nabla\cdot\mathbf v=0,\quad
\nabla\times\mathbf v=(0,0,2\omega).
\]

For a constant-density incompressible fluid in a cylinder, the pressure field

\[
p-p_0=\tfrac12\rho\omega^2(x^2+y^2)
\]

balances centripetal acceleration under the assumptions of steady rigid rotation, uniform positive density, no axial flow and a rotating boundary. This is a reduced analytical control solution. It is not a general Navier–Stokes solution, a model of a biological vortex, or evidence for a TF1766 force. A time-varying ω requires the temporal acceleration term and an explicitly specified tangential force; do not silently manufacture that force.

## 7. Project-specific claims and present classification

| Claim | Classification | What is actually supported | What is still needed |
|---|---|---|---|
| (E=hf), (E=mc^2), (m_E=hf/c^2) | `DER` within the stated quantum-energy interpretation | Dimensional and algebraic derivation | Independent experiment only if making a new empirical claim |
| 7.834125 Hz and 8 Hz as project anchors | `SYM` / project parameters | Values can be used as declared inputs | Calibration and evidence before asserting a natural resonance or coupling |
| Δf=0.165875 Hz and 6.028636 s beat period | `DER` conditional on two coherent tones | Arithmetic from the two input frequencies | Actual simultaneous signals and measured coherence |
| Five 72-degree sectors | `SYM` | (5\times72^\circ=360^\circ) as a partition | A physical mechanism and measurements before physical interpretation |
| TF1766 as a universal physical driver | `HYP/STOP` | A project label and candidate hypothesis | Identified system, calibrated drive/response, transfer function, boundary conditions, control spectrum and independent replication |
| μ=0 as a universal zero-resistance/zero-friction condition | `STOP` | A declared idealization may be used in a model | Operational definition, material/system, measurement and uncertainty; it is not established universally |
| 27D-to-4D compactification | `HYP` for the proposed construction; conditional sub-results may be `DER` | Under fixed unwarped product assumptions: (G_4=G_{27}/V_{23}), (Λ_4=Λ_{27}-\langle R_K\rangle/2) | Specify internal manifold/metric, stabilization and vacuum contributions; derive observational predictions |
| Golay [24,12,8] | `DER` mathematical coding bound | Minimum distance 8 guarantees correction of up to 3 bit errors | A physical field-to-code mapping and energy/dynamics evidence for any physical interpretation |

The UPI lab explicitly treats the 27D ansatz as proposed and notes that its assumptions do not by themselves guarantee singularity freedom. It also distinguishes the Golay correction bound from any physical entropy or dissipation law. VR-ASI-CO must preserve those qualifications.

## 8. Research record format

Every new research note should include:

- claim ID and exact statement;
- status and domain;
- source repository, full commit SHA, path and blob SHA;
- inputs, units, constants and assumptions;
- equation and derivation;
- forward and inverse calculation (where defined);
- numerical tolerance, residual and code/test version;
- counterexample and competing/null model;
- falsification condition for `HYP`;
- `stop_reason` and `next_action` for `STOP`;
- independent measurement needed, if any.

Suggested sequence:

`VR-ASI-CO PROPOSAL → UNIT CHECK → CALCULATE → COUNTEREXAMPLE → UPI MIRROR → FINAL UPI REPOSITORY FALLBACK → CLASSIFY → HUMAN REVIEW`

A missing or contradictory result is retained as `STOP`/`ERR`; it is never silently replaced with a more attractive number. Never promote a model-generated claim to `EST`, and never write to UPI's canonical `data/` from VR-ASI-CO.

## 9. Source baseline inspected for this document

- VR-ASI-CO `README.md`, main blob `20862825b84c68c46710eccd4aeee8396a532f6e`.
- VR-ASI-CO `dna/REMOTE_DNA_STATE.json`, main blob `e1ee7f89ec8b408698f6915baf973f794ada9c66`.
- VR-ASI-CO `prompts/MIRROR_PROMPT.md`, main blob `00c6f36f6ee05c2e50044aec8cfb9e93bdc42d1a`.
- UPI `README.md`, main blob `0e48ac5c490a3eee73ef7411492985866327fa63`.
- UPI `src/upi/physics.py`, main blob `0fd76b819690751b494bb118ff8adce7a7d8c942`.
- UPI `docs/DNA_EXECUTION.md`, main blob `5a1c360d24b820ce83675693530cfdc8577ca380`.
- UPI `docs/TEAX_LAB_V1.md`, main blob `fa2f529a40a153c6d549dc08b4d051701bf104d1`.
- UPI `docs/DYNAMIC_SPIRAL_FLOW.md`, main blob `f3186d20b6f0eae631d092addfb4ae2f4e48337f`.
- UPI `prompts/upi-research-master.md`, main blob `c4f185f9c5c2bea31f9a4541990ca268663c45a5`.
- UPI `docs/UPI_MODEL_COMPATIBILITY_CONTRACT_SV.md`, main blob `5013b36d9bdca7ca3b1dcd6407905f244556a213`.

These are the source revisions read during preparation. Re-resolve current `main` and re-read the referenced files before a later publication or scientific update.
