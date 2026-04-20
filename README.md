# TriPPLesPH — Backend API

> Express + TypeScript + PostgreSQL + Redis · PERN Stack

---

## Table of Contents

- [Project Structure](#-project-structure)
- [Naming Conventions](#-naming-conventions)
- [Docker Setup](#-docker-setup-linux-mint)
- [Prisma Setup](#-prisma-7-setup-esm)
- [Adding a New Model](#-adding-a-new-model)
- [Other Prisma Commands](#-other-useful-prisma-commands)

---

### Feature Pattern

When adding a new feature (e.g. `users`, `trips`), follow this structure:

```
routes/user.route.ts            → Express Router only
controllers/user.controller.ts  → Handles req / res
services/user.service.ts        → Business logic + Prisma queries
```

---

## Naming Conventions

| Type | Convention | Example |
|---|---|---|
| Files | `kebab-case` + role suffix | `auth.route.ts`, `auth.middleware.ts` |
| Functions / Variables | `camelCase` | `connectRedis()`, `userRole` |
| Env Variables | `SCREAMING_SNAKE_CASE` | `GOOGLE_CLIENT_ID` |
| Classes / Types | `PascalCase` | `UserService`, `SessionUser` |

---

## Docker Setup (Linux Mint)

### Service Management

```bash
# Check status
sudo systemctl status docker

# Start / Stop
sudo systemctl start docker
sudo systemctl stop docker

# Enable / Disable on boot
sudo systemctl enable docker
sudo systemctl disable docker
```

### Compose

```bash
docker compose down
```

---

## Prisma 7 Setup (ESM)

### Installation

```bash
npm install prisma --save-dev
npm install @prisma/client
npm install @prisma/adapter-pg
```

### Initialize

```bash
# Generates prisma/schema.prisma and prisma.config.ts
npx prisma init
```

### Generate & Migrate

```bash
# Generate Prisma Client — run every time schema.prisma changes
npx prisma generate

# Create and apply initial migration
npx prisma migrate dev --name init
```

### Prisma Studio

```bash
# Opens database GUI at http://localhost:5555
npx prisma studio
```

---

## Adding a New Model

After editing `prisma/schema.prisma`, run in this order:

```bash
# 1. Create and apply migration
npx prisma migrate dev --name add_your_model_name
# e.g. npx prisma migrate dev --name add_users_table

# 2. Regenerate Prisma Client (required in Prisma 7)
npx prisma generate

# 3. Restart dev server
# Ctrl+C → npm run dev
```

---

## Other Useful Prisma Commands

```bash
# Open Prisma Studio (database GUI at http://localhost:5555)
npx prisma studio

# Push schema changes without a migration (quick prototyping only)
npx prisma db push
```