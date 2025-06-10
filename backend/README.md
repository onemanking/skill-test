# Backend

This backend uses **Express** and **Prisma** with a **PostgreSQL** database.

## Prerequisites

- Node.js 18+ (recommended: Node 22)
- Yarn
- Docker Desktop (for local DB)
- [Optional] PostgreSQL client

---

## Setup

1. **Install dependencies:**

   ```bash
   yarn
   ```

2. **Start Docker containers:**

   ```bash
   sh docker.sh
   ```

---

## Important: Run in Docker

> **Note:**  
> This backend is designed to run inside a Docker container.  
> Do **not** run it directly on your local machine (host OS).  
> Use the provided Docker setup to ensure all dependencies and environment variables are correctly configured.

---

## Database Migration & Seed

1. **Run migration** (creates tables):

   ```bash
   yarn db:migration
   ```

2. **Seed the database** (imports countries from `mockup/country.json`):

   ```bash
   yarn db:seed
   ```

---

## Development

1. **Start the backend server:**

   ```bash
   yarn dev
   ```

   The server runs on [http://localhost:3000](http://localhost:3000).

---

## Useful Scripts

- `yarn db:migration` - Run Prisma migrations.
- `yarn db:seed` - Seed the database with country data.
- `yarn dev` - Start the development server.

---

## Notes

- The Prisma schema is in `prisma/schema.prisma`.
- Seed data is in `mockup/country.json`.
- If you change the schema, re-run migration and seed.
- The backend expects the database to be available at the URL in `.env`.

---
