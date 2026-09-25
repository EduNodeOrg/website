// Release notes for https://edunode.org/releases
// Add a new entry at the top when shipping notable changes.
// Keep `version` aligned with package.json.

const releases = [
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
