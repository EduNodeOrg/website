// Release notes for https://edunode.org/releases
// Add a new entry at the top when shipping notable changes.
// Keep `version` aligned with package.json.

const releases = [
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
