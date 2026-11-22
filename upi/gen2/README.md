# UPI Gen2

Primary evolving knowledge system inside VR-ASI-CO. UPI Gen2 is composed of UPI Fysik and UPI Persona; it is not the separate Gen1 repository.

## Components
- `physics/` — UPI Fysik, canonical scientific tree with registry, schemas, tools and tests
- `persona/` — UPI Persona, experience learning and observation schemas
- `links/` — cross-learning and traceable candidate relationships

## Learning loop
`OBSERVE -> CAPTURE -> CLASSIFY -> CROSS-LINK -> MODEL -> TEST/COMPARE -> SHADOW REVIEW -> CANDIDATE -> CONSOLIDATE -> READ-BACK`

Each observation stores source, timestamp, context, subsystem, evidence status and provenance. Repeated patterns can raise a candidate's review priority, but never automatically turn it into an established physical claim.

## Fallback
If Gen2 is unavailable or suspect, use the separate UPI Gen1 repository as a read-only strict physics reference. Pin its commit SHA and record which claims were compared. Never write Gen2 changes into Gen1 automatically.
