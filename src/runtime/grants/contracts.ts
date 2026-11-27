export const RUNTIME_CAPABILITIES = [
  "READ_CANONICAL_DNA",
  "READ_PERSONA",
  "RUN_BOUNDED_INFERENCE",
  "READ_SESSION_STATE",
  "WRITE_SESSION_PROPOSAL",
  "APPEND_SHADOW_AUDIT",
] as const;

export type RuntimeCapability = (typeof RUNTIME_CAPABILITIES)[number];
export type GrantStatus = "ACTIVE" | "REVOKED" | "EXPIRED";
export type OperationStatus = "STARTED" | "COMPLETED" | "FAILED" | "UNKNOWN";

export interface GrantPrincipalContext {
  principalId: string;
  sessionId: string;
}

export interface GrantPolicyContext extends GrantPrincipalContext {
  bootId: string;
  dnaCommit: string;
}

export interface RuntimeCapabilityPolicy {
  selectCapabilities(context: GrantPolicyContext): Promise<readonly RuntimeCapability[]> | readonly RuntimeCapability[];
  maxGrantLifetimeMs: number;
}

export interface RuntimeGrant {
  grantId: string;
  bootId: string;
  principalId: string;
  sessionId: string;
  dnaCommit: string;
  capabilities: RuntimeCapability[];
  status: GrantStatus;
  issuedAt: number;
  expiresAt: number;
}

export interface IssueGrantInput extends GrantPolicyContext {}

export interface StartOperationInput extends GrantPrincipalContext {
  grantId: string;
  operationId: string;
  capability: RuntimeCapability;
  currentDnaCommit: string;
}

export interface OperationStartResult {
  operationId: string;
  status: OperationStatus;
  shouldExecute: boolean;
  leaseExpiresAt: number;
}
