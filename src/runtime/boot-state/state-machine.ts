import { randomUUID } from "node:crypto";
import type {
  BootRecord,
  BootState,
  BootStateMachineOptions,
  EvidenceKind,
  VerifiedEvidence,
} from "./contracts";
import { canTransition } from "./transitions";

const HEX40 = /^[a-f0-9]{40}$/;
const HEX64 = /^[a-f0-9]{64}$/;
const TERMINAL = new Set<BootState>(["ADMITTED", "STOP", "EXPIRED"]);

export class BootStateError extends Error {
  constructor(
    public readonly code: string,
    message = code,
  ) {
    super(message);
    this.name = "BootStateError";
  }
}

export class BootStateMachine {
  private readonly now: () => number;
  private readonly createEventId: () => string;

  constructor(private readonly options: BootStateMachineOptions) {
    this.now = options.now ?? Date.now;
    this.createEventId = options.createEventId ?? randomUUID;
  }

  async startInstallation(bootId: string): Promise<void> {
    await this.move(bootId, "CHALLENGE_ISSUED", "INSTALLATION_PENDING");
  }

  async confirmInstallation(bootId: string, rawEvidence: unknown): Promise<void> {
    await this.confirmEvidence(bootId, "INSTALLATION_PENDING", "INSTALLATION_VERIFIED", "INSTALLATION", rawEvidence);
  }

  async startInference(bootId: string): Promise<void> {
    await this.move(bootId, "INSTALLATION_VERIFIED", "INFERENCE_PENDING");
  }

  async confirmInference(bootId: string, rawEvidence: unknown): Promise<void> {
    await this.confirmEvidence(bootId, "INFERENCE_PENDING", "INFERENCE_VERIFIED", "INFERENCE", rawEvidence);
  }

  async beginAdmission(bootId: string): Promise<void> {
    await this.move(bootId, "INFERENCE_VERIFIED", "ADMISSION_PENDING");
  }

  async admit(bootId: string, rawEvidence: unknown): Promise<void> {
    await this.confirmEvidence(bootId, "ADMISSION_PENDING", "ADMITTED", "ADMISSION", rawEvidence);
  }

  async stop(bootId: string, reason: string): Promise<void> {
    if (!reason.trim()) throw new BootStateError("STOP_REASON_REQUIRED");
    const record = await this.requireRecord(bootId);
    if (record.state === "STOP") return;
    if (record.state === "ADMITTED" || record.state === "EXPIRED") {
      throw new BootStateError("TERMINAL_STATE");
    }
    await this.commit(record, "STOP", { reason });
  }

  async expire(bootId: string): Promise<void> {
    const record = await this.requireRecord(bootId);
    if (record.state === "EXPIRED") return;
    if (TERMINAL.has(record.state)) throw new BootStateError("TERMINAL_STATE");
    if (this.now() < record.expiresAt) throw new BootStateError("BOOT_NOT_EXPIRED");
    await this.commit(record, "EXPIRED", { reason: "CHALLENGE_EXPIRED" });
  }

  private async confirmEvidence(
    bootId: string,
    expectedState: BootState,
    nextState: BootState,
    kind: EvidenceKind,
    rawEvidence: unknown,
  ): Promise<void> {
    const record = await this.requireCurrent(bootId, expectedState);
    const verifier = this.options.evidenceVerifier;
    const verified =
      kind === "INSTALLATION"
        ? await verifier.verifyInstallation(rawEvidence, record)
        : kind === "INFERENCE"
          ? await verifier.verifyInference(rawEvidence, record)
          : await verifier.verifyAdmission(rawEvidence, record);

    if (!this.isBoundEvidence(verified, record, kind)) {
      throw new BootStateError("VERIFIED_EVIDENCE_REQUIRED");
    }
    await this.commit(record, nextState, { evidenceHash: verified.payloadHash });
  }

  private isBoundEvidence(
    evidence: VerifiedEvidence | null,
    record: Readonly<BootRecord>,
    kind: EvidenceKind,
  ): evidence is VerifiedEvidence {
    return Boolean(
      evidence &&
        evidence.kind === kind &&
        evidence.bootId === record.bootId &&
        evidence.dnaCommit === record.dnaCommit &&
        HEX64.test(evidence.payloadHash) &&
        Number.isFinite(evidence.verifiedAt) &&
        evidence.verifiedAt >= record.createdAt &&
        evidence.verifiedAt <= this.now() &&
        typeof evidence.verifierId === "string" &&
        evidence.verifierId.trim().length > 0,
    );
  }

  private async move(bootId: string, from: BootState, to: BootState): Promise<void> {
    const record = await this.requireCurrent(bootId, from);
    await this.commit(record, to);
  }

  private async requireCurrent(bootId: string, expected: BootState): Promise<BootRecord> {
    const record = await this.requireRecord(bootId);
    const now = this.now();
    if (now >= record.expiresAt && !TERMINAL.has(record.state)) {
      throw new BootStateError("BOOT_EXPIRED");
    }
    if (record.state !== expected) throw new BootStateError("UNEXPECTED_BOOT_STATE");
    return record;
  }

  private async requireRecord(bootId: string): Promise<BootRecord> {
    if (!bootId.trim()) throw new BootStateError("BOOT_ID_REQUIRED");
    const record = await this.options.repository.get(bootId);
    if (!record) throw new BootStateError("BOOT_NOT_FOUND");
    if (
      !HEX40.test(record.dnaCommit) ||
      !HEX64.test(record.nonceHash) ||
      !Number.isInteger(record.version) ||
      record.version < 0 ||
      !Number.isFinite(record.createdAt) ||
      !Number.isFinite(record.expiresAt) ||
      record.expiresAt <= record.createdAt
    ) {
      throw new BootStateError("BOOT_RECORD_INVALID");
    }
    return record;
  }

  private async commit(
    record: BootRecord,
    nextState: BootState,
    details: { reason?: string; evidenceHash?: string } = {},
  ): Promise<void> {
    if (!canTransition(record.state, nextState)) {
      throw new BootStateError("ILLEGAL_STATE_TRANSITION");
    }
    const now = this.now();
    if (nextState !== "EXPIRED" && now >= record.expiresAt) {
      throw new BootStateError("BOOT_EXPIRED");
    }
    if (nextState === "EXPIRED" && now < record.expiresAt) {
      throw new BootStateError("BOOT_NOT_EXPIRED");
    }

    const eventType =
      nextState === "STOP"
        ? "BOOT_STOPPED"
        : nextState === "EXPIRED"
          ? "BOOT_EXPIRED"
          : "BOOT_STATE_TRANSITION";

    const committed = await this.options.repository.transitionWithAudit({
      bootId: record.bootId,
      expectedState: record.state,
      expectedVersion: record.version,
      nextState,
      updatedAt: now,
      ...(details.reason ? { failureCode: details.reason } : {}),
      audit: {
        eventId: this.createEventId(),
        eventType,
        bootId: record.bootId,
        fromState: record.state,
        toState: nextState,
        fromVersion: record.version,
        toVersion: record.version + 1,
        occurredAt: now,
        ...(details.reason ? { reason: details.reason } : {}),
        ...(details.evidenceHash ? { evidenceHash: details.evidenceHash } : {}),
      },
    });

    if (!committed) throw new BootStateError("CONCURRENT_BOOT_TRANSITION");
  }
}
