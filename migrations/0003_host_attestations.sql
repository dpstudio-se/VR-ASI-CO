-- P58: one-time host attestation replay protection.
create table if not exists host_attestation_receipts (
  nonce_hash char(64) primary key check (nonce_hash ~ '^[0-9a-f]{64}$'),
  boot_id text not null references boot_sessions(boot_id) on delete restrict,
  key_id text not null,
  payload_hash char(64) not null check (payload_hash ~ '^[0-9a-f]{64}$'),
  verified_at_ms bigint not null,
  expires_at_ms bigint not null
);
create index if not exists host_attestation_receipts_boot_idx
  on host_attestation_receipts (boot_id, verified_at_ms desc);
