// Release notes for https://edunode.org/releases
// Add a new entry at the top when shipping notable changes.
// Keep `version` aligned with package.json.

const releases = [


  {
    version: '0.3.11',
    date: 'November 26, 2026',
    title: 'SEO & E-E-A-T overhaul: new commercial pages, infographics, snippet fixes',
    notes: [
      'New landing pages: /certified-courses (all certificate tracks) and /alternatives with head-to-head comparisons vs Coursera, Udemy, and 360Learning.',
      'Pricing and course pages rewritten around real search intent — /pricing now shows the €6.99 Pro tier, a value infographic, trust signals, and an FAQ; all six Pro course pages answer "course with certificate" queries directly.',
      'Four original infographics published as inline SVG plus downloadable 1600×900 WebP (cached 1 week): pricing value, certificate roadmap, platform comparison, and the 33-track skill map.',
      'E-E-A-T pass: /about rebuilt with founder and editorial-policy sections plus Organization/Person schema, article bylines now link to the founder profile with review dates, and /for-students and /for-teachers rewritten to match the real curriculum.',
      'Snippet & CTR fixes: tighter titles/descriptions on high-impression pages (rollups, Varial, Bell Protocol 30, USDC vs USDT/EURC, Raven, ChainChess), datePublished/dateModified added to article schema, glossary snippets and internal links fixed, auth pages marked noindex, and /loginn now 301s to /login.',
      'Static HTML generator fixes: baked pages no longer inherit the homepage <h1> or SoftwareApplication schema, /masterclasses serves current copy, and /courses/112–117 get Course/Offer schema.',
    ],
  },


  {
    version: '0.3.10',
    date: 'November 19, 2026',
    title: 'Homepage performance & accessibility pass (Lighthouse)',
    notes: [
      'Removed unused third-party scripts from the page head: the Socket.IO CDN build, both PayPal SDK tags, the legacy Font Awesome 5 JS (~356 KiB), and the duplicate Google Identity/Platform scripts.',
      'Google Analytics now loads only after cookie consent (ConsentScripts), instead of unconditionally in the page head.',
      'The homepage intro video uses a click-to-play thumbnail facade — the ~1 MB YouTube embed no longer loads until a visitor presses play.',
      'Feature-card and partner images converted to WebP (up to ~95% smaller), Google Fonts moved to parallel <link> tags, and remaining icon-font usage replaced with tree-shaken SVG icons — no more 255 KiB of Font Awesome webfonts on first load.',
      'Added an Agentic Resource Discovery manifest at /.well-known/ard.json (advertised via robots.txt Agentmap and a rel="ard" link) so AI agents can discover the site\'s llms.txt index.',
      'Accessibility: aria-labels on navbar icon buttons and footer social links, and footer headings no longer skip heading levels.',
    ],
  },


  {
    version: '0.3.9',
    date: 'November 16, 2026',
    title: 'Certificates, rollups & auditing masterclasses, Bell Protocol 30, and the Varial rebrand',
    notes: [
      'Downloadable PDF certificates on completion of every masterclass and Pro course, plus PDF download on issued certificate pages.',
      'Two new certified masterclasses: Rollups in Practice (L2 security, DA, bridges) and Smart Contract Auditing (reentrancy, oracle attacks, report writing) — each with two free lessons and a final project.',
      'New Stellar sub-page: /stellar/bell-protocol-30 covering CAP-84 muxed contract addresses, CAP-87 post-quantum ML-DSA signatures, and CAP-88 millisecond ledgers.',
      'Freighter renamed to Varial across the site: /blog/freighter-wallet 301s to /blog/varial-wallet, login/signup buttons and the wallet SDK moved to @stellar/varial-sdk.',
      'Higher-CTR titles and descriptions on the masterclasses hub and top-performing explainer pages, plus mobile improvements for article pages (readable tables, wrapped code, smaller headings).',
      'New articles: Build Stellar Apps in C++20 (stellar-cpp-sdk), Stellar Go CLI (wallets, DIDs, ISO 20022, MCP server), and Migrate from Ethereum to Stellar (with OG Technologies consulting references).',
      'New Stellar sub-pages: /stellar/stellar-disbursement-platform (SDP bulk payments), /stellar/stellarlab (sandbox), and /stellar/raven (MCP for AI agents).',
      'Build speed: sourcemaps/ESLint disabled in the build script and Terser swapped for esbuild (craco) — npm run build roughly 2x faster.',
      'OG Technologies EU integration site-wide: consulting CTA on all topic hubs, OG Tech in every article author bio, footer brand attribution + Company link, and parentOrganization in the homepage JSON-LD.',
    ],
  },


  {
    version: '0.3.8',
    date: 'October 31, 2026',
    title: 'Stellar sub-guides, Rust masterclass, and explainer journal cluster',
    notes: [
      'New Stellar sub-pages: /stellar/validator-node-guide and /stellar/proof-of-agreement (migrated high-ranking posts with 301s, crediting overcat and SDF sources).',
      'New masterclass: Rust for the Web (rust-web-wasm) — ownership to WASM apps with Trunk, referenced from the Trunk ecosystem post (migrated with 301).',
      '8 new explainer journals: tokenization, Web3, custodial vs non-custodial wallets, DeFi for beginners, depeg, liquidity pools, ZK proofs explained, and the EVM.',
      'All new content baked into static HTML with Article + FAQPage JSON-LD, OG cards, sitemap, and llms.txt entries.',
    ],
  },
  {
    version: '0.3.7',
    date: 'October 31, 2026',
    title: 'SEO content expansion: migrated posts, comparison journals, Varial rebrand',
    notes: [
      'Migrated 5 high-ranking postDetails pages to /blog/ slugs with 301 redirects (xBull & Soroban Domains, Women in Web3 Bootcamp, Soroswap DeFi, Soroban en Español, DAOs en Español).',
      'New journals: What Is a Rollup?, ChatGPT vs Claude vs Gemini, USDC vs EURC, Varial vs MetaMask vs Albedo, How to Create a Token on Stellar, What Is a Smart Contract Audit.',
      'Freighter wallet rebranded to Varial across all articles, glossary, and masterclass content.',
      'Kelp trading bot article marked as deprecated; update notes added to Stellarnomics, asset issuance, and smart contracts articles.',
      'Free-lesson CTA added to all 67 glossary term pages; SoftwareApplication JSON-LD and resource hints added to site shell.',
    ],
  },
  {
    version: '0.3.6',
    date: '2026-10-25',
    title: 'AI assistant masterclasses, Bitcoin class & new topic hubs',
    highlights: [
      'Nine new masterclasses: Bitcoin Fundamentals plus eight AI assistant paths — ChatGPT, Claude, Gemini, DeepSeek, Kimi, GLM, Devin, and Jev AI (24 classes, 240 lessons total)',
      'New topic hubs at /stellar, /bitcoin, and /ai — joining /stablecoins, /ethereum, and /crypto-fundamentals',
      'Navbar reorganized with dropdowns: Learn (courses, masterclasses, glossary) and Topics (all hubs); footer gained a Topics column',
      'Loading screen now shows a branded spinner while the app boots',
    ],
  },
  {
    version: '0.3.5',
    date: '2026-10-25',
    title: 'Web3 content hubs, glossary pages & five blockchain masterclasses',
    highlights: [
      'New topic hubs at /stablecoins, /ethereum, and /crypto-fundamentals — curated paths through journals, courses, masterclasses, and glossary terms',
      'Four new stablecoin journals: USDC vs USDT, Are Stablecoins Decentralized, How Stablecoins Work, and USDC on Stellar',
      'Five new masterclasses (Web3 & Blockchain): Stablecoins in Practice, Ethereum Development, Stellar Network, Zero-Knowledge Proofs, and Crypto Fundamentals — 150 lessons total',
      'Every glossary term now has its own page at /glossary/<term> with definitions, explanations, and related learning links — 67 term pages',
    ],
  },
  {
    version: '0.3.4',
    date: '2026-10-25',
    title: 'Search & AI-crawler readiness overhaul',
    highlights: [
      'Homepage now ships a full-length title and description, canonical URL, and an absolute og:image with dimensions and alt text',
      'Organization + WebSite JSON-LD and real readable content (headings and links) in the initial HTML, so crawlers and no-JS clients see more than an empty shell',
      'Every baked page gets its own heading/description stub and correct og:image dimensions instead of inheriting the homepage shell',
      'robots.txt explicitly welcomes AI search crawlers (OAI-SearchBot, Claude-SearchBot, PerplexityBot); security.txt published; manifest.json rebranded from CRA defaults',
    ],
  },
  {
    version: '0.3.4',
    date: '2026-10-24',
    title: 'Five more masterclasses: 100 lessons total',
    highlights: [
      'New paths: JavaScript & Modern Web, Git & GitHub Collaboration, Networking & Linux, Data Analysis with Pandas, and IT Support & Troubleshooting',
      '50 additional lessons with worked examples, exercises, knowledge checks, and five more final projects',
      'Same access model: first two lessons of every class free without an account, remaining eight lessons verified server-side against an active Pro subscription',
      'New class overviews and free lessons get static HTML, canonical URLs, sitemap entries, and llms.txt links automatically',
    ],
  },
  {
    version: '0.3.4',
    date: '2026-10-24',
    title: 'Five practical IT masterclasses',
    highlights: [
      'New Masterclasses catalog with Python automation, SQL data analysis, AI workflows with n8n, cybersecurity fundamentals, and Docker/cloud deployment',
      '50 detailed lessons with worked examples, exercises, knowledge checks, and five final projects; completion progress is saved in the learner’s browser',
      'The first two lessons of every class are free without an account; the remaining eight are delivered only after server-side verification of an active Pro subscription',
      'Public class overviews and free lessons include static HTML, canonical URLs, social metadata, sitemap entries, and navigation links',
    ],
  },
  {
    version: '0.3.4',
    date: '2026-09-27',
    title: 'Full SEO metadata across all blog articles',
    highlights: [
      'Every blog article now ships with description, Open Graph, and Twitter Card meta tags plus Article JSON-LD structured data — previously 17 older posts had title-only or partial metadata',
      'Each article now declares a unique og:image/twitter:image — real hero photos for older posts and generated branded 1200x630 cards (icon + title) for the newer ones — so social links render rich previews',
      'Fixed incorrect canonical/share URLs on a few posts (netlify.com domain, case mismatches) and a wrong meta description on /blog/soroban',
      'Bumped the build to Node 22 — required for the Netlify Prerender extension, which serves fully-rendered HTML to crawlers and social preview bots',
    ],
  },
  {
    version: '0.3.4',
    date: '2026-09-27',
    title: 'Community page additions & blog URL rename',
    highlights: [
      'Added the Stellar Ambassador Program, Stellarlight, and Stellar_IE to /community — Stellarlight moved over from /resources',
      'Renamed /blog/stellar-go-sdk to /blog/build-stellar-apps-with-go with a 301 redirect for the old URL',
    ],
  },
  {
    version: '0.3.4',
    date: '2026-09-27',
    title: "New article: A Go Developer's Guide to Stellar",
    highlights: [
      'New tutorial covering the official go-stellar-sdk (txnbuild + Horizon/RPC clients) and the community stellar-go-cli — payments, Soroban contract deploy/invoke, ISO 20022 reporting for Stellar Disbursement Platform flows, ingestion libraries, and MCP for AI assistants',
      'Ships with canonical + Open Graph/Twitter meta and Article/FAQ structured data; added to the blog index, sitemap.xml, and llms.txt',
    ],
  },
  {
    version: '0.3.4',
    date: '2026-09-27',
    title: 'Three new articles, smarter glossary & playground fixes',
    highlights: [
      'New articles: What Is DeFi? (beginner guide), Crypto Wallet Security (seed phrases & passkeys), and AI and Blockchain',
      'Code Playground now uses a bundled CodeMirror editor — no more CSP-blocked CDN loads; added dark/light theme, per-language code persistence, and Ctrl/Cmd+Enter to run',
      'Glossary gains 10 new terms, DefinedTermSet structured data, deep-linkable anchors, and internal links to courses and articles',
      'Milestones page redesigned as a visual timeline',
      'All new pages added to the blog index, sitemap.xml, and llms.txt',
    ],
  },
  {
    version: '0.3.2',
    date: '2026-09-25',
    title: 'Five new in-depth blog articles',
    highlights: [
      'New articles: How to Become a Blockchain Developer in 2026 (complete roadmap), What Is a Stablecoin (USDC on Stellar), RWA Tokenization Explained, Top 10 Smart Contract Security Vulnerabilities, and a Freighter Wallet setup guide',
      'Each article ships with canonical + Open Graph meta tags and Article/FAQ structured data for search and AI answer engines',
      'All five added to the blog index, sitemap.xml, and llms.txt',
    ],
  },
  {
    version: '0.3.2',
    date: '2026-09-25',
    title: 'Search indexing fixes & leaner builds',
    highlights: [
      'Fixed conflicting canonical tags — every page was declaring the homepage as its canonical, causing Google to drop blog posts and other pages from the index',
      'Each route now emits a single correct canonical URL via Helmet',
      'Removed netlify-cli from dependencies — it is a local deploy tool, not needed at build time; installs are much faster and CI deploys no longer crash on Node 18',
    ],
  },
  {
    version: '0.3.1',
    date: '2026-09-25',
    title: 'Faster loads, refreshed resources & glossary',
    highlights: [
      'Every page now lazy-loads on demand — the initial bundle only ships the landing page',
      'Removed heavy unused dependencies (three.js, Spline, ipfs-core, react-map-gl) for a much smaller install and build',
      'New caching policy: static assets cached for a year, HTML always fresh — repeat visits are much faster',
      'Rebuilt the /resources directory with current Stellar ecosystem tools and SDKs; removed dead links',
      'Redesigned /glossary with search and an expanded term list',
      'Removed console logging that exposed emails, tokens, and API responses',
    ],
  },
  {
    version: '0.3.0',
    date: '2026-09-24',
    title: 'Six new courses, including the Pro catalog',
    highlights: [
      'Launched six full courses: Web3 Fundamentals, Advanced Smart Contract Development, DeFi Protocol Engineering, NFT Marketplace Development, Blockchain Security Auditing, and Cross-Chain Development',
      'New data-driven course engine with lesson content, code walkthroughs, and per-module quizzes',
      'Five courses are included with EduNode Pro; Web3 Fundamentals is free for logged-in members',
      'Dashboard "coming soon" cards now open real course pages',
      'Pro courses also listed on the public /courses catalog',
    ],
  },
  {
    version: '0.2.1',
    date: '2026-09-24',
    title: 'Discoverability & housekeeping',
    highlights: [
      'Added ChainChess — a working chess game that teaches Web3 concepts move by move',
      'New /releases page (this one) for platform updates',
      'Replaced sitemap.txt with a full sitemap.xml covering all public pages',
      'Added llms.txt for LLM/AI crawler visibility and updated robots.txt',
      'Fixed the /blog/soroban article route',
      'Added a proper 404 page for unknown URLs',
      'Removed ~400 unused source files and dead components',
    ],
  },
  {
    version: '0.2.0',
    date: '2026-05-28',
    title: 'Membership, consent & security hardening',
    highlights: [
      'Cookie consent manager and per-purpose consent settings',
      'Membership plans with Stripe and PayPal checkout',
      'Email preferences and unsubscribe flow',
      'Redesigned all blog articles with a modern UI system',
      'Security hardening: CSP, HSTS, SRI on third-party scripts, Netlify security headers',
      'Pinned Node 18.16.0 and stabilized Netlify builds',
    ],
  },
  {
    version: '0.1.5',
    date: '2023-03-20',
    title: 'Platform rebuild',
    highlights: [
      'Migrated the platform to a React single-page app on Netlify',
      'Course catalog expansion: Stellar, Soroban, Ethereum, Hyperledger, Oracles',
      'Challenges, achievements, and verifiable certificates',
      'Community feed, posts, and user profiles',
    ],
  },
  {
    version: '0.1.0',
    date: '2021-02-01',
    title: 'First course & early platform',
    highlights: [
      'Released the first EduNode Stellar course (Basic Concepts)',
      'Quizzes, progress tracking, and completion certificates',
      'Winner of the Stellar Community Fund #6 (Oct 2020)',
    ],
  },
];

export default releases;
