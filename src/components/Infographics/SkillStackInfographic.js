import React from 'react';
import InfographicFrame from './InfographicFrame';

const TITLE = '33 certified tracks across the modern tech stack';
const DESC =
  'The EduNode skill map: 33 courses with certificates across coding and data, IT and cloud, AI engineering, and blockchain, DLT and crypto.';

const COLS = [
  {
    name: 'Coding & Data', count: 6, color: '#77d9bb',
    items: ['Python Automation', 'Rust & WASM Apps', 'JavaScript & Web', 'SQL', 'Pandas & Visualization', 'Git & GitHub'],
  },
  {
    name: 'IT, Cloud & Security', count: 4, color: '#00d4ff',
    items: ['Cybersecurity Fundamentals', 'Networking & Linux', 'Docker & Cloud Deploy', 'IT Support Foundations'],
  },
  {
    name: 'AI & Automation', count: 9, color: '#7b2ff7',
    items: ['n8n Workflow Automation', 'Jev / System One Models', 'ChatGPT', 'Claude', 'Gemini', 'DeepSeek', 'Kimi', 'GLM (ChatGLM)', 'Devin AI Engineer'],
  },
  {
    name: 'Blockchain, DLT & Crypto', count: 14, color: '#ffaa00',
    items: ['Bitcoin Fundamentals', 'Ethereum Development', 'Stellar & Soroban', 'Rollups & Layer 2', 'Zero-Knowledge Proofs', 'Crypto Fundamentals', 'Stablecoins in Practice', 'Smart Contract Auditing', 'Web3 Fundamentals (Pro)', 'Smart Contract Dev (Pro)', 'DeFi Engineering (Pro)', 'NFT Marketplace (Pro)', 'Security Auditing (Pro)', 'Cross-Chain Dev (Pro)'],
  },
];

export default function SkillStackInfographic() {
  return (
    <InfographicFrame slug="edunode-skill-stack-map" title={TITLE} description={DESC}>
      <svg viewBox="0 0 1600 900" role="img" aria-labelledby="ssm-title ssm-desc" style={{ width: '100%', height: 'auto', display: 'block' }}>
        <title id="ssm-title">{TITLE}</title>
        <desc id="ssm-desc">{DESC}</desc>
        <defs>
          <linearGradient id="ssm-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0a0e27" />
            <stop offset="0.55" stopColor="#1a1f3a" />
            <stop offset="1" stopColor="#2d1b69" />
          </linearGradient>
        </defs>
        <rect width="1600" height="900" fill="url(#ssm-bg)" />
        <text x="80" y="96" fontFamily="Poppins, -apple-system, sans-serif" fontSize="46" fontWeight="700" fill="#ffffff">
          {TITLE}
        </text>
        <text x="80" y="142" fontFamily="-apple-system, sans-serif" fontSize="24" fill="#8fa3bf">
          Every track ends with a real project and a verifiable certificate — start any of them free
        </text>
        {COLS.map((col, i) => {
          const x = 80 + i * 370;
          return (
            <g key={col.name}>
              <rect x={x} y="190" width="350" height={230 + col.items.length * 44} rx="18" fill="rgba(26, 31, 58, 0.85)" stroke={col.color} strokeWidth="3" />
              <text x={x + 26} y="244" fontFamily="-apple-system, sans-serif" fontSize="25" fontWeight="700" fill={col.color}>{col.name}</text>
              <rect x={x + 26} y="262" width="86" height="40" rx="20" fill={col.color} />
              <text x={x + 69} y="290" textAnchor="middle" fontFamily="-apple-system, sans-serif" fontSize="22" fontWeight="700" fill="#0a0e27">{col.count}</text>
              {col.items.map((item, j) => (
                <text key={item} x={x + 26} y={346 + j * 44} fontFamily="-apple-system, sans-serif" fontSize="19" fill="#d5deeb">
                  • {item}
                </text>
              ))}
            </g>
          );
        })}
        <text x="80" y="864" fontFamily="-apple-system, sans-serif" fontSize="19" fill="#6f7aa0">
          27 self-paced masterclasses + 6 Pro courses · first 2 lessons of every masterclass free · edunode.org
        </text>
      </svg>
    </InfographicFrame>
  );
}
