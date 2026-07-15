# BUMDes Girimulyo

Website resmi BUMDes Girimulyo — Badan Usaha Milik Desa Giripurno, Kecamatan Bumiaji, Kota Batu, Jawa Timur.

Mengelola dua unit usaha:
- **Girimulyo Farm** — Peternakan ayam petelur Lohmann
- **Manahayu Resort** — Penginapan & wisata alam dataran tinggi

## Tech Stack

| Layer | Teknologi |
|---|---|
| Frontend | [Next.js](https://nextjs.org/) 16.2.9, React 19, Tailwind CSS v4 |
| Backend | [Express](https://expressjs.com/) 4, TypeScript, [tsx](https://github.com/privatenumber/tsx) |
| Database | Google Sheets via [Google Sheets API](https://developers.google.com/sheets/api) |
| Auth | `express-session` (session-based) |

## Struktur Repo

```
├── backend/           # Express API (port 3001)
│   ├── src/
│   │   ├── index.ts          # Entry point
│   │   ├── routes/           # auth.ts, bookings.ts
│   │   ├── middleware/        # auth.ts (requireAuth)
│   │   ├── lib/              # google-sheets.ts, rooms.ts
│   │   └── types/            # Booking, RoomConfig types
│   ├── .env.example
│   └── package.json
│
├── frontend/          # Next.js app (port 3000)
│   ├── src/
│   │   ├── app/              # App Router pages
│   │   │   ├── page.tsx                # Landing page
│   │   │   ├── girimulyofarm/page.tsx  # Halaman farm
│   │   │   ├── manahayuresort/page.tsx # Halaman resort
│   │   │   └── booking/                # Admin panel
│   │   └── components/       # Navbar, Footer, dll
│   ├── .env.example
│   └── package.json
└── AGENTS.md
```

## Persiapan

### 1. Google Service Account

Akses ke Google Sheets memerlukan Service Account:

1. Buat Service Account di [Google Cloud Console](https://console.cloud.google.com/)
2. Download JSON credentials
3. Buat spreadsheet di Google Sheets, lalu share ke email Service Account
4. Catat `client_email`, `private_key`, dan `spreadsheet ID`

### 2. Backend

```sh
cd backend
cp .env.example .env
```

Isi file `.env`:

| Variabel | Keterangan |
|---|---|
| `PORT` | Port backend (default: `3001`) |
| `AUTH_USERNAME` | Username admin untuk login |
| `AUTH_PASSWORD` | Password admin untuk login |
| `SESSION_SECRET` | String acak untuk signing session |
| `GOOGLE_SHEETS_SPREADSHEET_ID` | ID dari Google Spreadsheet |
| `GOOGLE_CLIENT_EMAIL` | Email Service Account |
| `GOOGLE_PRIVATE_KEY` | Private key Service Account (dalam quotes) |
| `FRONTEND_URL` | URL frontend untuk CORS (default: `http://localhost:3000`) |

### 3. Frontend

```sh
cd frontend
cp .env.example .env.local
```

Isi file `.env.local`:

| Variabel | Keterangan |
|---|---|
| `NEXT_PUBLIC_API_URL` | URL backend (default: `http://localhost:3001`) |
| `NEXT_PUBLIC_WA_FARM` | Nomor WhatsApp kontak farm |
| `NEXT_PUBLIC_WA_RESORT` | Nomor WhatsApp kontak resort |

## Menjalankan

### Backend

```sh
cd backend
npm install
npm run dev
```

Backend berjalan di http://localhost:3001

### Frontend

```sh
cd frontend
npm install
npm run dev
```

Frontend berjalan di http://localhost:3000

## API Endpoints

| Method | Endpoint | Keterangan |
|---|---|---|
| `POST` | `/api/auth/login` | Login admin |
| `POST` | `/api/auth/logout` | Logout admin |
| `GET` | `/api/auth/me` | Cek status login |
| `GET` | `/api/bookings` | Ambil semua booking (perlu auth) |
| `POST` | `/api/bookings` | Buat booking baru (perlu auth) |
| `PUT` | `/api/bookings/:id` | Update booking (perlu auth) |
| `DELETE` | `/api/bookings/:id` | Hapus booking (perlu auth) |
| `GET` | `/api/health` | Health check |

## Catatan Penting

- Data booking disimpan di Google Sheets, bukan database lokal
- Room pricing di-hardcode di `backend/src/lib/rooms.ts` (4 kamar: Couple 1, Family 2, Family 3, Special 1)
- Frontend menggunakan React Compiler (`reactCompiler: true` di `next.config.ts`)
- Frontend path alias: `@/*` → `./src/*`
- Tidak ada test suite atau CI/CD yang dikonfigurasi