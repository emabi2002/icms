# ICAC Electronic Case Management System (Prototype)

A functional, database-free prototype for the Independent Commission Against Corruption (ICAC), Papua New Guinea.

## Prototype modules

- Executive operational dashboard
- Complaints and case registers
- Investigation tracking
- Evidence and chain-of-custody register
- Investigator task management
- Reports and performance summaries
- Case search, filtering, detailed timelines and new-case creation

## Data and security note

This demonstration uses seeded sample data held in the browser session. It does not connect to a production database and must not be used to store real complaints, evidence, personal information or classified records.

## Run locally

1. Install Node.js 22 or newer.
2. Run `npm install`.
3. Run `npm run dev`.
4. Open the local address shown in the terminal.

## Validation

Run `npm run lint` and `npm run build`.

## Production roadmap

A production implementation should add secure authentication, role-based access, encrypted database and file storage, immutable audit logging, evidence integrity controls, backups, workflow approvals, retention policies and security monitoring.
