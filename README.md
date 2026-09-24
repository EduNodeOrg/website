# EduNode

[![Netlify Status](https://api.netlify.com/api/v1/badges/0eca6af0-abbd-4056-ae63-33dd6a3325e4/deploy-status)](https://app.netlify.com/projects/edunode/deploys)

EduNode is an educational platform for blockchain and Web3 — courses, challenges,
verifiable certificates, and interactive tools built on Stellar, Soroban,
Ethereum, and Hyperledger.

Live site: https://edunode.org — Releases: https://edunode.org/releases

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [SEO & Discovery](#seo--discovery)
- [Releases](#releases)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Overview
EduNode is a React single-page application delivering hands-on blockchain
education: a course catalog (101–111), a technical blog, a glossary,
code challenges, on-chain certificates, and community features.

## Features
- Course catalog with quizzes, progress tracking, and completion certificates
- ChainChess (`/chess`) — a chess game that teaches Web3 concepts move by move
  (chess.js engine + chessboardjsx)
- In-browser JavaScript playground (`/codeeditor`, Monaco Editor)
- Blog/insights, glossary, and learning resources
- Releases/changelog page (`/releases`, data in `src/data/releases.js`)
- Blockchain wallet integration (Stellar/Freighter, Albedo)
- User authentication (Google OAuth, JWT) and profiles
- Challenges, achievements, and badges
- Membership/checkout (Stripe, PayPal)
- Admin dashboard (embedded under `src/admin`)
- `llms.txt` + `sitemap.xml` for search and LLM crawler visibility

## Installation

### Prerequisites
- Node.js v18.16.0 (see `.nvmrc`)
- npm v9+

### Setup
```bash
git clone https://github.com/EduNodeOrg/website.git
cd website
npm install --legacy-peer-deps
```

## Usage

### `npm start`
Dev server at http://localhost:3000 (`src/setupProxy.js` proxies API calls).

### `npm test`
Launches the test runner in watch mode.

### `npm run build`
Production build to `build/` (what Netlify deploys). Also copies
`public/_headers` into the build output for Netlify headers.

### `npm run stage` / `npm run prod-deploy`
Netlify preview / production deploy via CLI.

## Project Structure

```
website/
├── public/              # Deployed verbatim: index.html, robots.txt,
│                        # sitemap.xml, llms.txt, images, .well-known/
├── src/
│   ├── actions/         # Redux actions (auth, email, errors)
│   ├── reducers/        # Redux reducers + root index
│   ├── store.js         # Redux store (redux-persist)
│   ├── admin/src/       # Embedded admin dashboard (routes in App.js)
│   ├── components/      # All routed pages and shared UI
│   ├── data/            # Static data (releases.js)
│   ├── App.js           # Route table — every route lives here
│   └── setupProxy.js    # CRA dev-server proxy (auto-loaded, no import)
├── AGENTS.md            # Repo conventions + SEO/LLM guidelines for agents
├── netlify.toml         # Build config + security headers
└── package.json
```

## SEO & Discovery
- `public/sitemap.xml` — all public/indexable routes; keep it updated when
  adding pages (exclude auth-gated and thin pages)
- `public/llms.txt` — structured index for LLM crawlers
- `public/robots.txt` — references the XML sitemap
- The app is client-rendered: crawlers without JS see an empty shell.
  See `AGENTS.md` for the full SEO/LLM checklist.

## Releases
- On-site changelog: https://edunode.org/releases (`src/data/releases.js`)
- GitHub releases: https://github.com/EduNodeOrg/website/releases
- Latest: **v0.2.1 — Discoverability & housekeeping**
- When shipping: add an entry to `src/data/releases.js`, tag `vX.Y.Z`,
  and create the matching GitHub release.

## Deployment
Netlify builds from `main` automatically:
`npm install --legacy-peer-deps && npm run build` → publishes `build/`.

## Contributing
1. Fork the repository
2. `git checkout -b feature/amazing-feature`
3. `git commit -m 'Add some amazing feature'`
4. `git push origin feature/amazing-feature`
5. Open a Pull Request

## License
Apache-2.0

Built with ❤️ by the EduNode Team
