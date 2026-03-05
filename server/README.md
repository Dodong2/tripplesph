# Prisma 7 Setup (PERN Stack - ESM)

# install prisma
npm install prisma --save-dev
npm install @prisma/client
npm install @prisma/adapter-pg

# initialize prisma (generates prisma/schema.prisma and prisma.config.ts)
npx prisma init

# generate prisma client (run this every time you change schema.prisma)
npx prisma generate

# create and apply migration
npx prisma migrate dev --name init

# open prisma studio (database GUI at http://localhost:5555)
npx prisma studio

docker compose down

# ==========================================
# PRISMA - ADDING A NEW MODEL/SCHEMA
# ==========================================

# after editing prisma/schema.prisma, run:

# 1. create and apply migration to database
npx prisma migrate dev --name add_your_model_name_here
# example: npx prisma migrate dev --name add_users_table

# 2. generate updated prisma client (required in prisma 7)
npx prisma generate

# 3. restart the dev server to apply new types
# Ctrl + C then npm run dev

# ==========================================
# PRISMA - OTHER USEFUL COMMANDS
# ==========================================

# open prisma studio (database GUI at http://localhost:5555)
npx prisma studio

# push schema changes without creating a migration (for quick prototyping only)
npx prisma db push
