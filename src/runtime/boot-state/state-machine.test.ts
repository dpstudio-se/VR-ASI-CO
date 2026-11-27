import assert from "node:assert/strict";
import { test } from "node:test";
import type {
  AuditEvent,
  BootEvidenceVerifier,
  BootRecord,
  BootRepository,
  BootState,
  TransitionCommand,
  VerifiedEvidence,
} from "./contracts.ts";
import { BootStateError, BootStateMachine } from "./state-machine.ts";
import { canTransition } from "./transitions.ts";

const NOW = 1_800_000_000_000;
const COMMIT = "a".repeat(40);
const NONCE_HASH = "b".repeat(64);

class MemoryRepository implements BootRepository {
  record: BootRecord;
  readonly audit: AuditEvent[] = [];
  failAudit = false;
  beforeCommit?: () => Promise<void>;

  constructor(state: BootState = "CHALLENGE_ISSUED") {
    this.record = {
      bootId: "boot-1",
      principalId: "principal-1",
      sessionId: "session-1",
      dnaCommit: COMMIT,
      nonceHash: NONCE_HASH,
      state,
      version: 0,
      createdAt: NOW - 100,
      expiresAt: NOW + 60_000,
      updatedAt: NOW - 100,
    };
  }

  async get(bootId: string): Promise<BootRecord | null> {
    return bootId === this.record.bootId ? { ...this.record } : null;
  }

  async transitionWithAudit(command: TransitionCommand): Promise<boolean> {
    await this.beforeCommit?.();
    if (this.failAudit) throw new Error("AUDIT_WRITE_FAILED");
    if (
      command.bootId !== this.record.bootId ||
      command.expectedState !== this.record.state ||
      command.expectedVersion !== this.record.version
    ) return false;

    const next = {
      ...this.record,
      state: command.nextState,
      version: command.expectedVersion + 1,
      updatedAt: command.updatedAt,
      ...(command.failureCode ? { failureCode: command.failureCode } : {}),
    };
    this.record = next;
    this.audit.push(command.audit);
    return true;
  }
}

function evidence(kind: VerifiedEvidence["kind"], overrides: Partial<VerifiedEvidence> = {}): VerifiedEvidence {
  return {
    kind,
    bootId: "boot-1",
    dnaCommit: COMMIT,
    payloadHash: "c".repeat(64),
    verifiedAt: NOW,
    verifierId: "test-verifier",
    ...overrides,
  };
}

function setup(state: BootState = "CHALLENGE_ISSUED") {
  const repository = new MemoryRepository(state);
  const verifier: BootEvidenceVerifier = {
    verifyInstallation: async (raw) => raw === "valid-install" ? evidence("INSTALLATION") : null,
    verifyInference: async (raw) => raw === "valid-inference" ? evidence("INFERENCE") : null,
    verifyAdmission: async (raw) => raw === "valid-admission" ? evidence("ADMISSION") : null,
  };
  let now = NOW;
  const machine = new BootStateMachine({
    repository,
    evidenceVerifier: verifier,
    now: () => now,
    createEventId: (() => { let n = 0; return () => `event-${++n}`; })(),
  });
  return { repository, machine, setNow: (value: number) => { now = value; } };
}

async function reachAdmission(machine: BootStateMachine) {
  await machine.startInstallation("boot-1");
  await machine.confirmInstallation("boot-1", "valid-install");
  await machine.startInference("boot-1");
  await machine.confirmInference("boot-1", "valid-inference");
  await machine.beginAdmission("boot-1");
}

test("permits the complete legal boot path", async () => {
  const { machine, repository } = setup();
  await reachAdmission(machine);
  await machine.admit("boot-1", "valid-admission");
  assert.equal(repository.record.state, "ADMITTED");
  assert.equal(repository.record.version, 6);
  assert.equal(repository.audit.length, 6);
});

test("rejects every skipped forward transition", async () => {
  const pairs: [BootState, BootState][] = [
    ["CHALLENGE_ISSUED", "INSTALLATION_VERIFIED"],
    ["CHALLENGE_ISSUED", "INFERENCE_PENDING"],
    ["INSTALLATION_PENDING", "INFERENCE_PENDING"],
    ["INSTALLATION_VERIFIED", "INFERENCE_VERIFIED"],
    ["INFERENCE_PENDING", "ADMISSION_PENDING"],
    ["INFERENCE_VERIFIED", "ADMITTED"],
  ];
  for (const [from, to] of pairs) assert.equal(canTransition(from, to), false);
});

test("allows only the declared state transitions", () => {
  assert.deepEqual(
    ["INSTALLATION_PENDING", "STOP", "EXPIRED"],
    ["INSTALLATION_PENDING", "STOP", "EXPIRED"].filter((state) => canTransition("CHALLENGE_ISSUED", state as BootState)),
  );
  assert.equal(canTransition("ADMITTED", "STOP"), false);
  assert.equal(canTransition("STOP", "CHALLENGE_ISSUED"), false);
  assert.equal(canTransition("EXPIRED", "INSTALLATION_PENDING"), false);
});

test("requires installation evidence before marking installation verified", async () => {
  const { machine } = setup();
  await machine.startInstallation("boot-1");
  await assert.rejects(machine.confirmInstallation("boot-1", "forged"), { code: "VERIFIED_EVIDENCE_REQUIRED" });
});

test("requires inference evidence before marking inference verified", async () => {
  const { machine } = setup();
  await machine.startInstallation("boot-1");
  await machine.confirmInstallation("boot-1", "valid-install");
  await machine.startInference("boot-1");
  await assert.rejects(machine.confirmInference("boot-1", null), { code: "VERIFIED_EVIDENCE_REQUIRED" });
});

test("requires admission evidence before ADMITTED", async () => {
  const { machine, repository } = setup("ADMISSION_PENDING");
  await assert.rejects(machine.admit("boot-1", "forged"), { code: "VERIFIED_EVIDENCE_REQUIRED" });
  assert.equal(repository.record.state, "ADMISSION_PENDING");
});

test("rejects evidence bound to a different boot", async () => {
  const { machine } = setup();
  await machine.startInstallation("boot-1");
  const { repository } = setup();
  void repository;
  const verifier: BootEvidenceVerifier = {
    verifyInstallation: async () => evidence("INSTALLATION", { bootId: "other-boot" }),
    verifyInference: async () => null,
    verifyAdmission: async () => null,
  };
  const isolated = new BootStateMachine({
    repository: new MemoryRepository(),
    evidenceVerifier: verifier,
    now: () => NOW,
  });
  await isolated.startInstallation("boot-1");
  await assert.rejects(isolated.confirmInstallation("boot-1", {}), { code: "VERIFIED_EVIDENCE_REQUIRED" });
});

test("rejects evidence bound to a different DNA commit", async () => {
  const repository = new MemoryRepository();
  const verifier: BootEvidenceVerifier = {
    verifyInstallation: async () => evidence("INSTALLATION", { dnaCommit: "d".repeat(40) }),
    verifyInference: async () => null,
    verifyAdmission: async () => null,
  };
  const machine = new BootStateMachine({ repository, evidenceVerifier: verifier, now: () => NOW });
  await machine.startInstallation("boot-1");
  await assert.rejects(machine.confirmInstallation("boot-1", {}), { code: "VERIFIED_EVIDENCE_REQUIRED" });
});

test("rejects malformed evidence hashes", async () => {
  const repository = new MemoryRepository();
  const verifier: BootEvidenceVerifier = {
    verifyInstallation: async () => evidence("INSTALLATION", { payloadHash: "not-a-hash" }),
    verifyInference: async () => null,
    verifyAdmission: async () => null,
  };
  const machine = new BootStateMachine({ repository, evidenceVerifier: verifier, now: () => NOW });
  await machine.startInstallation("boot-1");
  await assert.rejects(machine.confirmInstallation("boot-1", {}), { code: "VERIFIED_EVIDENCE_REQUIRED" });
});

test("rejects evidence verified in the future", async () => {
  const repository = new MemoryRepository();
  const verifier: BootEvidenceVerifier = {
    verifyInstallation: async () => evidence("INSTALLATION", { verifiedAt: NOW + 1 }),
    verifyInference: async () => null,
    verifyAdmission: async () => null,
  };
  const machine = new BootStateMachine({ repository, evidenceVerifier: verifier, now: () => NOW });
  await machine.startInstallation("boot-1");
  await assert.rejects(machine.confirmInstallation("boot-1", {}), { code: "VERIFIED_EVIDENCE_REQUIRED" });
});

test("rejects evidence from before boot creation", async () => {
  const repository = new MemoryRepository();
  const verifier: BootEvidenceVerifier = {
    verifyInstallation: async () => evidence("INSTALLATION", { verifiedAt: NOW - 101 }),
    verifyInference: async () => null,
    verifyAdmission: async () => null,
  };
  const machine = new BootStateMachine({ repository, evidenceVerifier: verifier, now: () => NOW });
  await machine.startInstallation("boot-1");
  await assert.rejects(machine.confirmInstallation("boot-1", {}), { code: "VERIFIED_EVIDENCE_REQUIRED" });
});

test("rejects evidence from the wrong evidence class", async () => {
  const repository = new MemoryRepository();
  const verifier: BootEvidenceVerifier = {
    verifyInstallation: async () => evidence("INFERENCE"),
    verifyInference: async () => null,
    verifyAdmission: async () => null,
  };
  const machine = new BootStateMachine({ repository, evidenceVerifier: verifier, now: () => NOW });
  await machine.startInstallation("boot-1");
  await assert.rejects(machine.confirmInstallation("boot-1", {}), { code: "VERIFIED_EVIDENCE_REQUIRED" });
});

test("rejects an empty boot identifier", async () => {
  const { machine } = setup();
  await assert.rejects(machine.startInstallation(""), { code: "BOOT_ID_REQUIRED" });
});

test("rejects a missing boot record", async () => {
  const { machine } = setup();
  await assert.rejects(machine.startInstallation("unknown"), { code: "BOOT_NOT_FOUND" });
});

test("rejects a malformed canonical commit", async () => {
  const { machine, repository } = setup();
  repository.record.dnaCommit = "invalid";
  await assert.rejects(machine.startInstallation("boot-1"), { code: "BOOT_RECORD_INVALID" });
});

test("rejects a malformed nonce hash", async () => {
  const { machine, repository } = setup();
  repository.record.nonceHash = "invalid";
  await assert.rejects(machine.startInstallation("boot-1"), { code: "BOOT_RECORD_INVALID" });
});

test("rejects a negative state version", async () => {
  const { machine, repository } = setup();
  repository.record.version = -1;
  await assert.rejects(machine.startInstallation("boot-1"), { code: "BOOT_RECORD_INVALID" });
});

test("rejects an invalid boot time window", async () => {
  const { machine, repository } = setup();
  repository.record.expiresAt = repository.record.createdAt;
  await assert.rejects(machine.startInstallation("boot-1"), { code: "BOOT_RECORD_INVALID" });
});

test("rejects transitions after challenge expiry", async () => {
  const { machine, setNow } = setup();
  setNow(NOW + 60_000);
  await assert.rejects(machine.startInstallation("boot-1"), { code: "BOOT_EXPIRED" });
});

test("expires a boot only after its deadline", async () => {
  const { machine, setNow } = setup();
  await assert.rejects(machine.expire("boot-1"), { code: "BOOT_NOT_EXPIRED" });
  setNow(NOW + 60_000);
  await machine.expire("boot-1");
});

test("records EXPIRED as a terminal state", async () => {
  const { machine, repository, setNow } = setup();
  setNow(NOW + 60_000);
  await machine.expire("boot-1");
  assert.equal(repository.record.state, "EXPIRED");
  await assert.rejects(machine.startInstallation("boot-1"), { code: "UNEXPECTED_BOOT_STATE" });
});

test("records STOP as a terminal state", async () => {
  const { machine, repository } = setup();
  await machine.stop("boot-1", "TEST_FAILURE");
  assert.equal(repository.record.state, "STOP");
  await assert.rejects(machine.startInstallation("boot-1"), { code: "UNEXPECTED_BOOT_STATE" });
});

test("STOP is idempotent", async () => {
  const { machine, repository } = setup();
  await machine.stop("boot-1", "TEST_FAILURE");
  const version = repository.record.version;
  await machine.stop("boot-1", "SECOND_CALL");
  assert.equal(repository.record.version, version);
});

test("refuses to stop an admitted boot", async () => {
  const { machine } = setup("ADMITTED");
  await assert.rejects(machine.stop("boot-1", "REVOKE"), { code: "TERMINAL_STATE" });
});

test("refuses to expire an admitted boot", async () => {
  const { machine, setNow } = setup("ADMITTED");
  setNow(NOW + 60_000);
  await assert.rejects(machine.expire("boot-1"), { code: "TERMINAL_STATE" });
});

test("requires a non-empty stop reason", async () => {
  const { machine } = setup();
  await assert.rejects(machine.stop("boot-1", " "), { code: "STOP_REASON_REQUIRED" });
});

test("uses compare-and-set to reject a concurrent stale transition", async () => {
  const { machine, repository } = setup();
  repository.record.version = 2;
  const originalGet = repository.get.bind(repository);
  repository.get = async (id) => {
    const record = await originalGet(id);
    return record ? { ...record, version: 1 } : null;
  };
  await assert.rejects(machine.startInstallation("boot-1"), { code: "CONCURRENT_BOOT_TRANSITION" });
});

test("does not claim success when the atomic repository operation fails", async () => {
  const { machine, repository } = setup();
  repository.transitionWithAudit = async () => false;
  await assert.rejects(machine.startInstallation("boot-1"), { code: "CONCURRENT_BOOT_TRANSITION" });
});

test("propagates audit failure and leaves admission uncommitted", async () => {
  const { machine, repository } = setup();
  repository.failAudit = true;
  await assert.rejects(machine.startInstallation("boot-1"), /AUDIT_WRITE_FAILED/);
  assert.equal(repository.record.state, "CHALLENGE_ISSUED");
  assert.equal(repository.audit.length, 0);
});

test("writes one audit event for every successful transition", async () => {
  const { machine, repository } = setup();
  await machine.startInstallation("boot-1");
  assert.equal(repository.audit.length, 1);
  assert.equal(repository.audit[0].fromState, "CHALLENGE_ISSUED");
  assert.equal(repository.audit[0].toState, "INSTALLATION_PENDING");
  assert.equal(repository.audit[0].toVersion, 1);
});

test("does not append an audit event for a rejected transition", async () => {
  const { machine, repository } = setup();
  await assert.rejects(machine.startInference("boot-1"));
  assert.equal(repository.audit.length, 0);
});

test("two concurrent transitions from the same version cannot both commit", async () => {
  const { machine, repository } = setup();
  const results = await Promise.allSettled([
    machine.startInstallation("boot-1"),
    machine.startInstallation("boot-1"),
  ]);
  assert.equal(results.filter((result) => result.status === "fulfilled").length, 1);
  assert.equal(results.filter((result) => result.status === "rejected").length, 1);
  assert.equal(repository.record.state, "INSTALLATION_PENDING");
  assert.equal(repository.record.version, 1);
  assert.equal(repository.audit.length, 1);
});
