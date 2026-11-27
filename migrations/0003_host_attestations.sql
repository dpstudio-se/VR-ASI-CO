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

create or replace function reject_host_attestation_mutation() returns trigger
language plpgsql as $$ begin
  raise exception 'HOST_ATTESTATION_RECEIPTS_ARE_APPEND_ONLY';
end $$;

drop trigger if exists host_attestation_receipts_no_mutation on host_attestation_receipts;
create trigger host_attestation_receipts_no_mutation
before update or delete on host_attestation_receipts
for each row execute function reject_host_attestation_mutation();
