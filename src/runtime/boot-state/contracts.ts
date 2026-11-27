export const BOOT_STATES = [
  "CHALLENGE_ISSUED",
  "INSTALLATION_PENDING",
  "INSTALLATION_VERIFIED",
  "INFERENCE_PENDING",
  "INFERENCE_VERIFIED",
  "ADMISSION_PENDING",
  "ADMITTED",
  "STOP",
  "EXPIRED",
] as const;

export type BootState = (typeof BOOT_STATES)[number];

export interface BootRecord {
  bootId: string;
  principalId: string;
  sessionId: string;
  dnaCommit: string;
  nonceHash: string;
  state: BootState;
  version: number;
  createdAt: number;
  expiresAt: number;
  updatedAt: number;
  failureCode?: string;
}

export type EvidenceKind = "INSTALLATION" | "INFERENCE" | "ADMISSION";

export interface VerifiedEvidence {
  kind: EvidenceKind;
  bootId: string;
  dnaCommit: string;
  payloadHash: string;
  verifiedAt: number;
  verifierId: string;
}

export interface AuditEvent {
  eventId: string;
  eventType: "BOOT_STATE_TRANSITION" | "BOOT_STOPPED" | "BOOT_EXPIRED";
  bootId: string;
  fromState: BootState;
  toState: BootState;
  fromVersion: number;
  toVersion: number;
  occurredAt: number;
  reason?: string;
  evidenceHash?: string;
}

export interface TransitionCommand {
  bootId: string;
  expectedState: BootState;
  expectedVersion: number;
  nextState: BootState;
  updatedAt: number;
  failureCode?: string;
  audit: AuditEvent;
}

/**
 * Implementations must commit the state CAS and audit append in one transaction.
 * Returning false means the expected state/version no longer matches.
 */
export interface BootRepository {
  get(bootId: string): Promise<BootRecord | null>;
  transitionWithAudit(command: TransitionCommand): Promise<boolean>;
}

export interface BootEvidenceVerifier {
  verifyInstallation(
    evidence: unknown,
    record: Readonly<BootRecord>,
  ): Promise<VerifiedEvidence | null>;
  verifyInference(
    evidence: unknown,
    record: Readonly<BootRecord>,
  ): Promise<VerifiedEvidence | null>;
  verifyAdmission(
    evidence: unknown,
    record: Readonly<BootRecord>,
  ): Promise<VerifiedEvidence | null>;
}

export interface BootStateMachineOptions {
  repository: BootRepository;
  evidenceVerifier: BootEvidenceVerifier;
  now?: () => number;
  createEventId?: () => string;
}
