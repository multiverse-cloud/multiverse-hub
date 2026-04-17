# ShopElite

ShopElite is a full-stack ecommerce demo built with Next.js 16, React 19, Tailwind CSS 4, Prisma, SQLite, Zustand, and Framer Motion.

This README is written for a new developer opening the project for the first time.

## What This Project Includes

- Storefront home page with hero, featured products, categories, deals, reviews, and newsletter sections
- Product listing with search, sorting, and client-side filtering
- Cart and wishlist UI
- Sign in and sign up pages
- Admin/dashboard pages
- App Router API routes for products, categories, auth, cart, orders, reviews, search, wishlist, and dashboard
- SQLite database via Prisma

## Tech Stack

- Next.js 16
- React 19
- TypeScript 5
- Tailwind CSS 4
- Prisma ORM
- SQLite
- NextAuth
- Zustand
- Framer Motion
- shadcn/ui

## Quick Start

### 1. Requirements

- Node.js 18+ or newer
- npm

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env`

Create a file named `.env` in the project root with:

```env
DATABASE_URL="file:../db/custom.db"
NEXTAUTH_SECRET="change-this-in-real-projects"
NEXTAUTH_URL="http://localhost:3000"
```

Notes:

- The app uses the SQLite database file at `db/custom.db`.
- Because Prisma resolves the SQLite path from `prisma/schema.prisma`, the correct value is `file:../db/custom.db`.
- A `db/custom.db` file already exists in this workspace.
- There is no `.env.example` file yet, so create `.env` manually.

### 4. Generate Prisma client

```bash
npx prisma generate
```

This is required before running a production build.

### 5. Start the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Daily Commands

```bash
npm run dev
npm run lint
npm run build
npm run start
```

Database commands:

```bash
npm run db:generate
npm run db:push
npm run db:migrate
npm run db:reset
```

## Recommended First-Time Setup

If you want a clean setup from scratch:

```bash
npm install
npx prisma generate
npx prisma db push
npm run dev
```

If you want to use the existing local SQLite database already in the repo, the minimum setup is:

```bash
npm install
npx prisma generate
npm run dev
```

## Production Check

Before shipping changes, run:

```bash
npm run lint
npm run build
```

The project was recently verified to pass both.

## Authentication Notes

- Auth uses NextAuth credentials login
- Password hashing now uses a local crypto-based helper in `src/lib/password.ts`
- Seeded users in `prisma/seed.ts` do not include passwords
- That means seeded users are useful as database demo data, but not as ready-to-use login accounts

For login testing:

- Use the sign-up page to create a real account with a password
- Or manually create/update a user record with a hashed password if you are testing admin/auth flows directly

## Database Notes

Prisma schema lives in [prisma/schema.prisma](/C:/projects/mini0/prisma/schema.prisma).

Main models:

- `User`
- `Category`
- `Product`
- `Cart` and `CartItem`
- `Order` and `OrderItem`
- `Review`
- `Address`
- `WishlistItem`
- `Coupon`
- `Setting`

Important details:

- Database provider is SQLite
- Product `images`, `tags`, and `attributes` are stored as JSON strings in the database and parsed in API responses
- The app uses Prisma client from `src/lib/db.ts`

## Project Structure

```text
prisma/
  schema.prisma
  seed.ts
db/
  custom.db
src/
  app/
    api/
    auth/
    checkout/
    dashboard/
    layout.tsx
    page.tsx
    globals.css
  components/
    auth/
    checkout/
    dashboard/
    ecommerce/
    layout/
    ui/
  hooks/
  lib/
    db.ts
    password.ts
    store.ts
    types.ts
    utils.ts
public/
package.json
next.config.ts
```

## Main App Areas

### Storefront

- Home page entry: `src/app/page.tsx`
- Shared section spacing and layout helpers: `src/app/globals.css`
- Header and footer: `src/components/layout/`
- Ecommerce sections: `src/components/ecommerce/`

### State

Zustand stores live in `src/lib/store.ts`.

Key stores:

- cart store
- auth store
- UI store
- product filter store

### API

API routes live in `src/app/api/`.

Important endpoints:

- `/api/products`
- `/api/products/[slug]`
- `/api/categories`
- `/api/auth/register`
- `/api/auth/[...nextauth]`
- `/api/cart`
- `/api/orders`
- `/api/reviews`
- `/api/search`
- `/api/wishlist`
- `/api/dashboard`

### Styling

- Tailwind CSS is used everywhere
- Shared section utilities are defined in `src/app/globals.css`
- Recent UI cleanup standardized section width, padding, spacing, and centered headers

## Known Practical Notes

- `npm run build` requires Prisma client generation first
- If `prisma generate` fails, it is usually because Prisma needs to download engine files
- `npm run dev` uses port `3000`
- `npm run start` also runs on port `3000`
- `next.config.ts` currently ignores TypeScript build errors during production builds with `typescript.ignoreBuildErrors = true`
- Lint should still be treated as required

## Seeding Data

There is a seed file at `prisma/seed.ts`, but there is currently no npm script wired for it.

Before using it, check that your preferred TypeScript runner is available. Common options are:

```bash
npx tsx prisma/seed.ts
```

or

```bash
npx ts-node prisma/seed.ts
```

Important:

- The seed clears existing data first
- It creates categories, products, sample order data, and demo users
- Demo users do not get passwords

If you only want to browse the app locally, you do not need to run the seed if `db/custom.db` already contains data.

## Suggested New-User Workflow

1. Install dependencies with `npm install`
2. Create `.env`
3. Run `npx prisma generate`
4. Start the app with `npm run dev`
5. Open the homepage and confirm products are visible
6. Create a fresh account from the sign-up page if you want to test auth
7. Run `npm run lint` before making larger changes
8. Run `npm run build` before handing work off

## Troubleshooting

### Build fails with Prisma client not initialized

Run:

```bash
npx prisma generate
```

### App starts but auth login does not work for seeded users

That is expected if those users were created without passwords. Create a new user through sign-up.

### No products appear

Check:

- `.env` points to `file:./db/custom.db`
- `.env` points to `file:../db/custom.db`
- the `db/custom.db` file exists
- the database actually contains product rows

### Prisma command fails while downloading engines

Try again with network access enabled. Prisma may need to fetch platform-specific binaries the first time.

## Files Worth Reading First

- [package.json](/C:/projects/mini0/package.json)
- [src/app/page.tsx](/C:/projects/mini0/src/app/page.tsx)
- [src/app/globals.css](/C:/projects/mini0/src/app/globals.css)
- [src/lib/store.ts](/C:/projects/mini0/src/lib/store.ts)
- [src/lib/db.ts](/C:/projects/mini0/src/lib/db.ts)
- [src/lib/password.ts](/C:/projects/mini0/src/lib/password.ts)
- [prisma/schema.prisma](/C:/projects/mini0/prisma/schema.prisma)

## Current Status

At the time of this README update:

- `npm run lint` passes
- `npm run build` passes
- local runtime check on `/` returned HTTP 200
