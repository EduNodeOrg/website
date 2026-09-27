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

Node ≥20 required (`.nvmrc`/`netlify.toml` pin 22; `package.json` engines is `>=20.0.0`). Node 22 is needed by the Netlify Prerender extension.

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
4. **`public/robots.txt`** — declares `Sitemap: https://edunode.org/sitemap.xml`. Update if crawl rules change.
5. **Canonical domain** is `https://edunode.org` — always use absolute canonical URLs.

### Adding a blog article — checklist

Blog meta is served to *every* client as static HTML: `scripts/generate-blog-html.js` runs inside `npm run build` and writes `build/blog/<slug>.html` with the article's real tags baked in. For an article to be picked up correctly:

- **Route**: declare it `lazy` + `exact` in `src/App.js` (`<Route exact path="/blog/<slug>" element={<Comp />} />` + `const Comp = lazy(() => import('...'))`). Non-lazy or non-`exact` routes are skipped.
- **Meta lives in `<Helmet>`** — set `title`, `canonical`, `description`, `og:*`, `twitter:*` using `const`s (`shareUrl`, `title`, `description`, `image`) or literals; both are extracted. See `Articles/GoStellarSdk.js` for the full pattern.
- **JSON-LD**: declare as `const <name>Ld = { '@type': 'Article' | 'FAQPage', ... }` objects. They are `eval`'d by the generator — only reference the `const` values above (e.g. `faqs` arrays are fine, JSX/imports are not).
- **`og:image`**: must be an absolute `https://edunode.org/...` URL. Bundled imports **under ~10KB get inlined as data URIs** and can't be used — either pick a larger asset (`'https://edunode.org' + img`) or generate a branded 1200×630 card with `scripts/generate-og-cards.py` → `public/og/<slug>.png`.
- **No trailing slash**: canonicals stay extensionless/no-slash — Netlify "Pretty URLs" serves `blog/<slug>.html` at `/blog/<slug>` directly. Do NOT emit `blog/<slug>/index.html` — directory indexes 301 to a trailing slash and diverge from canonicals.
- **Crawlers also get a prerendered DOM** via the Netlify Prerender extension (classified UAs only). `window.prerenderReady` (set `false` in `public/index.html`, flipped `true` by `PrerenderReady` inside App's `<Suspense>`) is the readiness signal — don't remove it or lazy routes snapshot empty.
- **Removing an article**: delete the route + component, drop its `sitemap.xml`/`llms.txt` entries, and add a 301 in BOTH `public/_redirects` and `netlify.toml` (before the `/*` catch-all) — precedent: `/blog/soroban` → `/blog`.

### Non-blog public pages

The generator is not blog-only despite its name: it scans EVERY `lazy` + `exact` route in `App.js` and bakes `build/<route>.html` whenever the component exposes extractable meta (`<Helmet>` or `<PageMeta>`). Pages without meta are skipped silently, so coverage grows automatically.

- **Simple pages** (landing/legal/marketing) should render `<PageMeta title="..." description="..." path="/route" />` — `src/components/PageMeta`. Keep all props as **string literals**: the generator parses them statically (an optional `image` prop overrides the default `/en.png` og:image).
- If a component has both, `<Helmet>` wins — use `PageMeta` only where the page doesn't already have a Helmet block.
- Auth-gated pages that redirect unauthenticated visitors (e.g. `/membership` → `<Navigate to="/">`) get NO meta and must stay OUT of `sitemap.xml`.
- **Verify**: `curl https://edunode.org/blog/<slug>` (any UA) must return the article meta in raw HTML.

Files in `public/` are copied verbatim into `build/` — no import needed.

## Deployment

- Netlify auto-deploys `main`; build command is in `netlify.toml`.
- SPA fallback: `/* -> /index.html` (200) in both `netlify.toml` and `public/_redirects`.
- Security headers live in `public/_headers` AND `netlify.toml` — keep them in sync (CSP, HSTS, etc.).

## Gotchas

- `<Route path="/*" element={<ThemedRoutes />}>` at the end of `App.js` catches unknown paths; `ThemedRoutes` redirects them to `/404` (renders `admin/src/pages/Page404.js`, whose illustration is served from `public/assets/illustrations/`).
- `src/setupProxy.js` is loaded automatically by the CRA dev server — it is "unused" by the import graph but must not be deleted.
- `netlify-cli` is NOT a project dependency — it historically crashed Netlify CI builds under the old Node 18 pin. `npm run stage`/`prod-deploy` expect a globally installed CLI (`npm i -g netlify-cli`).
- Several routes are duplicated or legacy aliases (`/loginn` vs `/login`, `/register` → `/signup` redirect).
- Course metadata (titles, content) is fetched at runtime from the API (`edunode.herokuapp.com/api/cours/...`), so some course names live in the DB, not the repo.
- `/chess` is "ChainChess" (`src/components/Chess/`): chessboardjsx board + chess.js rules; Web3 teaching content lives in `src/components/Chess/concepts.js` — extend that file to add new move→concept mappings.
