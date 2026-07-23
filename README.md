# Stretch4Paws

A desk-friendly stretching app with user accounts, progress tracking, and a native desktop app — available as a web app and a macOS/Windows desktop app.

## Features

- Stretch routines with per-stretch timers and a global progress bar
- Start / Pause / Reset controls
- Lottie animations for each stretch
- Confetti celebration on routine completion
- Dark and light theme toggle
- Sound effects (toggleable)
- User authentication — email/password, magic link, Google OAuth
- Password strength indicator (zxcvbn)
- User dashboard — statistics, goals, profile, settings
- Weekly and monthly session charts (Chart.js)
- Daily goal tracking with streak and completion rate
- Desktop app (macOS + Windows) with native OS reminders
- Reminder scheduler with configurable interval and quiet hours
- Offline banner when network is unavailable

## Monorepo structure

```
stretch4paws/
  packages/
    core/       — shared React components, context, hooks, lib, SCSS
    web/        — Vite + React web app (deployed to Vercel)
    desktop/    — Electron desktop app (wraps core, adds native features)
    db/         — Supabase client and data-access helpers
```

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | Vite + React 19 + TypeScript |
| Styling | SCSS with CSS custom properties for theming |
| Routing | React Router v7 |
| Forms | React Hook Form + Zod |
| Auth & DB | Supabase (Postgres + Auth) |
| Charts | Chart.js + react-chartjs-2 |
| Animations | Lottie React |
| Password strength | @zxcvbn-ts |
| Icons | React Icons |
| Desktop shell | Electron |
| Desktop build | electron-builder (.dmg / .exe) |
| Package manager | pnpm workspaces |
| Testing | Vitest + jsdom |
| CI/CD | GitHub Actions |

## Getting started

### Prerequisites

- Node.js 22+
- pnpm (`npm install -g pnpm`)

### Install dependencies

```bash
pnpm install
```

### Environment variables

Create `packages/web/.env` (and `packages/desktop/renderer/.env` for the desktop app):

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Run the web app

```bash
pnpm dev:web
# http://localhost:5173
```

### Run the desktop app (dev mode)

```bash
pnpm dev:desktop
```

### Run tests

```bash
pnpm --filter @stretch4paws/core test
```

### Build

```bash
# Web
pnpm --filter @stretch4paws/web build

# Desktop — macOS
pnpm --filter stretch4paws-app dist:mac

# Desktop — Windows
pnpm --filter stretch4paws-app dist:win
```

## Desktop app

The desktop app wraps the same React UI in an Electron shell and adds:

- **Native OS reminders** — configurable interval (e.g. every 30 min) fires a system notification even when the window is minimised
- **Quiet hours** — notifications are suppressed during a configurable time range
- **Auth via browser** — a sandboxed auth window opens the web app for login/OAuth, then hands the session back to the desktop app via IPC
- **Splash screen** on launch
- **Menu bar shortcuts** — `⌘⇧S` to focus stretches, `⌘,` for settings, `⌘⇧D` to open the dashboard in a browser

Builds are published as GitHub Releases via the `build-desktop.yaml` CI workflow.

## CI/CD

| Workflow | Trigger | What it does |
|---|---|---|
| `test.yml` | Push / PR touching `packages/core/**` | Runs Vitest unit tests |
| `build-desktop.yaml` | Push to `dev`, version tags `v*`, or manual dispatch | Builds `.dmg` (macOS) and `.exe` (Windows) and creates a GitHub Release |

## Preview

Deployed web app: [stretch4-paws.vercel.app](https://stretch4-paws.vercel.app/)
