# AGENTS.md

Guidance for AI agents (and humans) working in this repository.

## Project Overview

EduNode is a React-based educational platform for becoming a blockchain developer, focused on Stellar, Web3, Soroban, Ethereum, and Hyperledger. Production site: https://edunode.org (deployed on Netlify).

## Tech Stack

- **Framework**: React 18 (Create React App / `react-scripts` 5)
- **Routing**: `react-router-dom` v6 — all routes are declared in `src/App.js`
- **State**: Redux Toolkit + redux-persist
- **UI**: Material-UI v4 (`@material-ui/core`), MUI v5 (`@mui/material`), react-bootstrap, styled-components, Emotion
- **Meta/SEO**: `react-helmet`, `react-helmet-async`, `react-meta-tags`
- **Backend API**: `https://api.edunode.org` / `https://edunode.herokuapp.com`

## Commands

| Command | Purpose |
|---|---|
| `npm install --legacy-peer-deps` | Install dependencies (flag required — see `netlify.toml` and `.npmrc`) |
| `npm start` | Dev server on http://localhost:3000 |
| `npm test` | Run tests (CRA watch mode) |
| `npm run build` | Production build to `build/` (also copies `public/_headers`) |
| `npm run stage` | Netlify preview deploy |
| `npm run prod-deploy` | Netlify production deploy |

Node 18.16.0 required (`.nvmrc`, `package.json` engines).

## Project Structure

```
public/           # Static assets served at site root (robots.txt, sitemap.xml, llms.txt, _headers, _redirects)
src/App.js        # All client-side routes (~110 routes, flat structure)
src/components/   # Page + reusable components (Courses, Courses1-10, Blog/Articles, Dashboard, etc.)
src/admin/        # Embedded admin dashboard (routes under /Admin and /AdminDashboard)
src/actions/      # Redux actions
src/reducers/     # Redux reducers
netlify.toml      # Build config, SPA redirect, security headers
```

## Conventions

- Components are a mix of class components and function components; follow the style of the file you're editing.
- Course content lives in numbered folders: `src/components/Courses` (course 101), `Courses1` (102), ... `Courses10` (111). Route pattern: `/courses/<id>` for the intro, `/courses/<id>/<step>` for quiz steps, `/courses/<id>/done` for completion.
- Blog articles live in `src/components/Blog/Articles/` and set their own `<title>`/meta via react-meta-tags.
- ESLint config: airbnb + prettier (`.eslintrc.json`). `CI=false` is set for builds — warnings don't fail CI.
- Never commit secrets. API keys/client IDs in `public/index.html` are intentionally public (PayPal client-id, GA).

## SEO & LLM Visibility — IMPORTANT

This project prioritizes search and LLM discoverability. When adding or removing public pages:

1. **`public/sitemap.xml`** — XML sitemap for https://edunode.org. Add every new *public, indexable* route. Exclude auth-gated pages (`/dashboard`, `/account`, `/profile`, `/chat`, `/Badges`, admin routes), auth flows (`/login`, `/signup`, `/forgot_password`, `/reset-password`, `/VerifyEmail`, `/gcallback`, `/unsubscribe`, `/loggedout`), and parameterized routes (`/postDetails/:_id`, `/certificates/:certificateNumber`, `/profile/:id`, `/challengeDetails/:_id`, `/challengeGame*/:randomNumber`).
2. **`public/llms.txt`** — llmstxt.org-formatted index for LLM crawlers. Keep link titles/descriptions in sync with actual page content.
3. **`src/data/releases.js`** — release notes data for `/releases`. Add an entry at the top of the array when shipping notable changes; keep `version` aligned with `package.json`.
3. **`public/robots.txt`** — declares `Sitemap: https://edunode.org/sitemap.xml`. Update if crawl rules change.
4. **Meta tags** — new pages should set `<title>`, `description`, Open Graph, and Twitter Card tags using the existing react-meta-tags/react-helmet pattern (see `src/components/Blog/Articles/AMM/AMM.js` for an example).
5. **Canonical domain** is `https://edunode.org` — always use absolute canonical URLs.

Files in `public/` are copied verbatim into `build/` — no import needed.

## Deployment

- Netlify auto-deploys `main`; build command is in `netlify.toml`.
- SPA fallback: `/* -> /index.html` (200) in both `netlify.toml` and `public/_redirects`.
- Security headers live in `public/_headers` AND `netlify.toml` — keep them in sync (CSP, HSTS, etc.).

## Gotchas

- `<Route path="/*" element={<ThemedRoutes />}>` at the end of `App.js` catches unknown paths; `ThemedRoutes` redirects them to `/404` (renders `admin/src/pages/Page404.js`, whose illustration is served from `public/assets/illustrations/`).
- `src/setupProxy.js` is loaded automatically by the CRA dev server — it is "unused" by the import graph but must not be deleted.
- `netlify-cli` is NOT a project dependency — it requires Node ≥20 while the project pins Node 18.16.0, and its postinstall crashed Netlify CI builds. `npm run stage`/`prod-deploy` expect a globally installed CLI (`npm i -g netlify-cli`).
- Several routes are duplicated or legacy aliases (`/loginn` vs `/login`, `/register` → `/signup` redirect).
- Course metadata (titles, content) is fetched at runtime from the API (`edunode.herokuapp.com/api/cours/...`), so some course names live in the DB, not the repo.
- `/chess` is "ChainChess" (`src/components/Chess/`): chessboardjsx board + chess.js rules; Web3 teaching content lives in `src/components/Chess/concepts.js` — extend that file to add new move→concept mappings.
