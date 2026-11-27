-- P57: transactional boot/runtime persistence.
-- Nonce claims are permanent replay tombstones. Do not delete expired claims.
create table if not exists boot_sessions (
  boot_id text primary key,
  principal_id text not null,
  session_id text not null,
  dna_commit char(40) not null check (dna_commit ~ '^[0-9a-f]{40}$'),
  nonce_hash char(64) not null check (nonce_hash ~ '^[0-9a-f]{64}$'),
  state text not null check (state in (
    'CHALLENGE_ISSUED','INSTALLATION_PENDING','INSTALLATION_VERIFIED',
    'INFERENCE_PENDING','INFERENCE_VERIFIED','ADMISSION_PENDING',
    'ADMITTED','STOP','EXPIRED'
  )),
  version bigint not null check (version >= 0),
  created_at_ms bigint not null,
  expires_at_ms bigint not null,
  updated_at_ms bigint not null,
  failure_code text,
  check (expires_at_ms > created_at_ms)
);

create table if not exists boot_nonce_claims (
  nonce_hash char(64) primary key check (nonce_hash ~ '^[0-9a-f]{64}$'),
  boot_id text not null unique references boot_sessions(boot_id) on delete restrict,
  claimed_at_ms bigint not null,
  expires_at_ms bigint not null
);

create table if not exists boot_audit_events (
  event_id text primary key,
  event_type text not null check (event_type in (
    'BOOT_STATE_TRANSITION','BOOT_STOPPED','BOOT_EXPIRED'
  )),
  boot_id text not null references boot_sessions(boot_id) on delete restrict,
  from_state text not null,
  to_state text not null,
  from_version bigint not null,
  to_version bigint not null,
  occurred_at_ms bigint not null,
  reason text,
  evidence_hash char(64) check (evidence_hash is null or evidence_hash ~ '^[0-9a-f]{64}$')
);

create index if not exists boot_sessions_principal_created_idx
  on boot_sessions (principal_id, created_at_ms desc);
create index if not exists boot_sessions_session_idx
  on boot_sessions (session_id);
create index if not exists boot_audit_events_boot_version_idx
  on boot_audit_events (boot_id, to_version);
