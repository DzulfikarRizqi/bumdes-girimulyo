# AGENTS.md

## Structure

Two independent packages, no shared tooling or workspace manager:

- **`backend/`** — Express + TypeScript API (port 3001)
- **`frontend/`** — Next.js 16.2.9 + React 19 + Tailwind v4 (port 3000)

Each has its own `package.json`, `tsconfig.json`, and `node_modules/`. Run commands from within each directory.

## Commands

### Backend (`cd backend`)

```sh
cp .env.example .env   # then fill in real values
npm install
npm run dev            # tsx watch src/index.ts
npm run build          # tsc
```

No lint, test, or format scripts exist in the backend.

### Frontend (`cd frontend`)

```sh
cp .env.example .env   # then fill in real values
npm install
npm run dev            # next dev (configured for localhost:3001 allowed dev origin)
npm run build          # next build
npx next lint          # eslint with next/core-web-vitals + typescript
```

No test scripts exist in the frontend.

## Key Architecture Facts

- **Data layer**: Backend uses Google Sheets as its database via `googleapis`. All booking CRUD goes through `backend/src/lib/google-sheets.ts`. There is no local database.
- **Auth**: Simple session-based auth (`express-session`). Credentials come from env vars `AUTH_USERNAME` / `AUTH_PASSWORD`. The `/api/bookings/*` routes are protected by `requireAuth` middleware.
- **Room config**: Hardcoded in `backend/src/lib/rooms.ts` (4 rooms: Couple 1, Family 2, Family 3, Special 1). Prices are not in the database.
- **Booking IDs**: Auto-generated as `BK-001`, `BK-002`, etc. The Google Sheets row index is offset by +2 (header row + 1-indexed).
- **Frontend routing**: `/` is the public landing page. `/girimulyofarm` and `/manahayuresort` are the two business unit pages. `/booking` is the admin login; `/booking/dashboard` is the admin panel.
- **Frontend uses React Compiler** (`reactCompiler: true` in `next.config.ts`).
- **Frontend path alias**: `@/*` maps to `./src/*`.
- **Fonts**: Fraunces (serif) and Plus Jakarta Sans (sans) loaded via `next/font/google`.

## Environment Variables

**Backend** (`.env`):
- `AUTH_USERNAME`, `AUTH_PASSWORD` — admin login credentials
- `SESSION_SECRET` — random string for session signing
- `GOOGLE_SHEETS_SPREADSHEET_ID`, `GOOGLE_CLIENT_EMAIL`, `GOOGLE_PRIVATE_KEY` — Google Service Account for Sheets access
- `FRONTEND_URL` — CORS origin (default `http://localhost:3000`)

**Frontend** (`.env`):
- `NEXT_PUBLIC_API_URL` — backend URL (default `http://localhost:3001`)
- `NEXT_PUBLIC_WA_FARM`, `NEXT_PUBLIC_WA_RESORT` — WhatsApp contact links
- `GOOGLE_CLIENT_EMAIL`, `GOOGLE_PRIVATE_KEY` — (present in .env.example but usage is in backend only)

## Gotchas

- The frontend `allowedDevOrigins` is set to `http://localhost:3001` — if you change the backend port, update this too.
- Google Sheets API calls will fail without valid service account credentials. There is no fallback or mock.
- There are no tests, no CI, and no pre-commit hooks in this repo.
- The `frontend/AGENTS.md` contains a Next.js version warning that remains relevant — Next.js 16 has breaking changes from earlier versions.
