# Salon Management PWA

This repository is currently a frontend-first installable PWA foundation.  
The legacy local backend and SQLite database have been removed.  
Supabase integration is intentionally deferred to the next implementation phase.

## Current Architecture

The application is built using:
- **Vite** (Build Tool)
- **React** (Frontend Library)
- **Tailwind CSS v4** (Styling)
- **Vite PWA Plugin** (Installable PWA support)

## Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
```

## Type Checking

```bash
npm run typecheck
```

## Setup & Limitations

- **No local database persistence:** The previous SQLite infrastructure and Express backend have been completely removed.
- **Explicitly disabled write workflows:** Financial actions, configurations, appointments, user management, and auth will fail gracefully indicating the API is disconnected.
- **Future Supabase integration boundary:** `src/api.ts` contains the neutral domain contracts that return `Promise.reject`. In the next phase, these contracts should be replaced by a proper Supabase adapter. 
- **Offline Shell:** The PWA is configured to cache static assets using Workbox through `vite-plugin-pwa`.

## Directories

- `src/`: Main source files
- `src/pages/`: UI Pages
- `src/context/`: Central context states (currently disabled auth mode)
- `src/ui/`: Contains layout and shared components

## Note

This implies no actual backend connectivity. The software is **not production-ready** until the Supabase phase is completed.
