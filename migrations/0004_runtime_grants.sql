-- P59: server-side grants and idempotent operation leases.
create table if not exists runtime_grants (
  grant_id text primary key,
  boot_id text not null unique references boot_sessions(boot_id) on delete restrict,
  principal_id text not null,
  session_id text not null,
  dna_commit char(40) not null check (dna_commit ~ '^[0-9a-f]{40}$'),
  capabilities text[] not null check (cardinality(capabilities) > 0),
  status text not null check (status in ('ACTIVE','REVOKED','EXPIRED')),
  issued_at_ms bigint not null,
  expires_at_ms bigint not null,
  revoked_at_ms bigint,
  check (expires_at_ms > issued_at_ms)
);

create table if not exists runtime_grant_events (
  event_id text primary key,
  grant_id text not null references runtime_grants(grant_id) on delete restrict,
  event_type text not null check (event_type in (
    'GRANT_ISSUED','GRANT_REVOKED','OPERATION_STARTED',
    'OPERATION_COMPLETED','OPERATION_FAILED','OPERATION_UNKNOWN'
  )),
  principal_id text not null,
  session_id text not null,
  operation_id text,
  capability text,
  occurred_at_ms bigint not null
);

create table if not exists runtime_operations (
  operation_id text primary key,
  grant_id text not null references runtime_grants(grant_id) on delete restrict,
  principal_id text not null,
  session_id text not null,
  dna_commit char(40) not null,
  capability text not null,
  status text not null check (status in ('STARTED','COMPLETED','FAILED','UNKNOWN')),
  started_at_ms bigint not null,
  lease_expires_at_ms bigint not null,
  finished_at_ms bigint
);

create index if not exists runtime_grants_principal_idx
  on runtime_grants (principal_id, status, expires_at_ms);
create index if not exists runtime_operations_grant_idx
  on runtime_operations (grant_id, started_at_ms desc);
