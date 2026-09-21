# Tenant app roadmap

Engineering-first. Local until landlord basics work. Free-tier Azure later.

## V1 — Booking core + Postgres + tenant allowlist

- [ ] Mongo removed from runtime paths (API + Web talk Postgres only)
- [ ] Refresh tokens stored/validated in Postgres
- [ ] Cookie auth flags verified (HttpOnly, Secure, SameSite)
- [ ] Book + cancel slot end-to-end on Postgres
- [ ] Double-booking prevented (constraint + concurrency) + tests
- [ ] Shared-DB tenant key isolation + integration tests (no cross-landlord reads)
- [ ] Landlord creates tenant accounts (invite/create; no open signup for tenants)
- [ ] BuildingSettings: slot length, max bookings/week
- [ ] API versioning basics
- [ ] Web app versioning basics
- [ ] Auth + booking isolation tests in CI locally
- [ ] Landlord panel: manage tenants + view bookings

**V1 done when:** you can run as landlord + tenant with different creds, invite/create a tenant, book without races, and prove isolation with tests — all on Postgres, no Mongo.

## V2 — Landlord value (unlock after V1)

- [ ] Danish i18n (react-i18n)
- [ ] Fault report (text; photos later)
- [ ] Upcoming booking notification
- [ ] Machines down / substitute machine
- [ ] Forward to varmemester
- [ ] Maintenance notes
- [ ] CSV/PDF laundry usage export
- [ ] Stronger isolation if needed (RLS / schema) — only with a written why

## V3 — Growth / ops

- [ ] Notice board (beskedtavle)
- [ ] Slot trading
- [ ] Audit log + retention
- [ ] Rate-limit hardening + abuse tracking
- [ ] App Insights + alerts (still watch free-tier)
- [ ] Deploy lean Azure when product justifies it

## Explicit non-goals for now

Face ID, payments / Bogføringslov, permanent IP bans, cold-start ping as a “feature”.
