/**
 * UPI Resonance Kernel
 *
 * Experimental/simulation layer for the UPI concept:
 * - physics engine: evolves resonant states
 * - RNA motor: transforms/executes symbolic instructions
 * - DNA memory: read/write persistent symbolic records
 * - Ω1766: coherence/invariant gate
 *
 * This is a software model, not a claim about physical DNA/RNA, branes,
 * higher-dimensional physics, or a real frequency-based storage medium.
 */

export type ResonanceState = {
  frequencyHz: number;
  phaseRad: number;
  amplitude: number;
  coherence: number;
  timestamp: number;
};

export type DnaRecord = {
  id: string;
  sequence: string;
  state: ResonanceState;
  checksum: string;
  createdAt: number;
  updatedAt: number;
};

export type RnaInstruction =
  | { op: "READ"; id: string }
  | { op: "WRITE"; id: string; sequence: string; state: ResonanceState }
  | { op: "MUTATE_PHASE"; id: string; deltaRad: number }
  | { op: "EVOLVE"; id: string; dt: number };

export type KernelResult =
  | { ok: true; record?: DnaRecord; message: string }
  | { ok: false; reason: string };

export const OMEGA_1766 = Object.freeze({
  id: "Ω1766",
  version: "0.1.0",
  coherenceFloor: 0.80,
  maxAmplitude: 1.0,
});

/** Small deterministic hash for a simulation record; not cryptographic. */
function checksum(input: string): string {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0).toString(16).padStart(8, "0");
}

/** Physics layer: a deliberately simple oscillator model. */
export class ResonancePhysics {
  step(state: ResonanceState, dt: number): ResonanceState {
    if (!Number.isFinite(dt) || dt < 0) throw new Error("dt must be >= 0");

    const phase = state.phaseRad + 2 * Math.PI * state.frequencyHz * dt;
    const damping = Math.exp(-0.01 * dt);
    const amplitude = Math.min(
      OMEGA_1766.maxAmplitude,
      Math.max(0, state.amplitude * damping),
    );

    // Coherence decays with amplitude loss, then is bounded to [0, 1].
    const coherence = Math.max(
      0,
      Math.min(1, state.coherence * (0.995 + 0.005 * amplitude)),
    );

    return { ...state, phaseRad: phase, amplitude, coherence, timestamp: state.timestamp + dt };
  }
}

/**
 * DNA memory: maps symbolic sequences to resonant records.
 * The implementation uses ordinary software memory as the backing store;
 * the "frequency memory" is represented by ResonanceState.
 */
export class DnaMemory {
  private readonly records = new Map<string, DnaRecord>();

  read(id: string): DnaRecord | undefined {
    const record = this.records.get(id);
    return record ? structuredClone(record) : undefined;
  }

  write(id: string, sequence: string, state: ResonanceState): DnaRecord {
    if (!id.trim()) throw new Error("id is required");
    if (!sequence.trim()) throw new Error("sequence is required");

    const now = Date.now();
    const previous = this.records.get(id);
    const record: DnaRecord = {
      id,
      sequence,
      state: { ...state },
      checksum: checksum(JSON.stringify({ id, sequence, state })),
      createdAt: previous?.createdAt ?? now,
      updatedAt: now,
    };

    this.records.set(id, record);
    return structuredClone(record);
  }

  list(): DnaRecord[] {
    return [...this.records.values()].map((r) => structuredClone(r));
  }
}

/** RNA motor: interprets a small instruction set against kernel services. */
export class RnaMotor {
  constructor(
    private readonly memory: DnaMemory,
    private readonly physics: ResonancePhysics,
  ) {}

  execute(instruction: RnaInstruction): KernelResult {
    try {
      switch (instruction.op) {
        case "READ": {
          const record = this.memory.read(instruction.id);
          return record
            ? { ok: true, record, message: "DNA record read" }
            : { ok: false, reason: "DNA record not found" };
        }

        case "WRITE": {
          if (!this.accepts(instruction.state)) {
            return { ok: false, reason: "Ω1766 coherence gate rejected write" };
          }
          const record = this.memory.write(
            instruction.id,
            instruction.sequence,
            instruction.state,
          );
          return { ok: true, record, message: "DNA record written" };
        }

        case "MUTATE_PHASE": {
          const current = this.memory.read(instruction.id);
          if (!current) return { ok: false, reason: "DNA record not found" };

          const state = {
            ...current.state,
            phaseRad: current.state.phaseRad + instruction.deltaRad,
          };

          if (!this.accepts(state)) {
            return { ok: false, reason: "Ω1766 rejected phase mutation" };
          }

          const record = this.memory.write(current.id, current.sequence, state);
          return { ok: true, record, message: "RNA phase mutation committed" };
        }

        case "EVOLVE": {
          const current = this.memory.read(instruction.id);
          if (!current) return { ok: false, reason: "DNA record not found" };

          const state = this.physics.step(current.state, instruction.dt);
          if (!this.accepts(state)) {
            return { ok: false, reason: "Ω1766 rejected evolved state" };
          }

          const record = this.memory.write(current.id, current.sequence, state);
          return { ok: true, record, message: "Resonance state evolved" };
        }
      }
    } catch (error) {
      return { ok: false, reason: error instanceof Error ? error.message : "kernel error" };
    }
  }

  private accepts(state: ResonanceState): boolean {
    return (
      Number.isFinite(state.frequencyHz) &&
      Number.isFinite(state.phaseRad) &&
      Number.isFinite(state.amplitude) &&
      state.amplitude >= 0 &&
      state.amplitude <= OMEGA_1766.maxAmplitude &&
      state.coherence >= OMEGA_1766.coherenceFloor &&
      state.coherence <= 1
    );
  }
}

export class UpiKernel {
  readonly physics = new ResonancePhysics();
  readonly dna = new DnaMemory();
  readonly rna = new RnaMotor(this.dna, this.physics);

  read(id: string): KernelResult {
    return this.rna.execute({ op: "READ", id });
  }

  write(id: string, sequence: string, state: ResonanceState): KernelResult {
    return this.rna.execute({ op: "WRITE", id, sequence, state });
  }

  evolve(id: string, dt: number): KernelResult {
    return this.rna.execute({ op: "EVOLVE", id, dt });
  }
}
