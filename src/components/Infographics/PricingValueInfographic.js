import React from 'react';
import InfographicFrame from './InfographicFrame';

const TITLE = 'What a year of tech learning actually costs';
const DESC =
  'Annual cost comparison for IT, coding, AI and blockchain education: EduNode Free and Pro versus Coursera Plus, individual Udemy courses and a coding bootcamp.';

// Bar widths are linear against the €3,000+ bootcamp baseline over 1,120px.
const ROWS = [
  { name: 'EduNode Free', cost: '€0', bar: 10, color: '#00ff88', note: 'Lessons 1–2 of every masterclass — no account or card' },
  { name: 'EduNode Pro', cost: '€83.88 / year', bar: 34, color: '#00d4ff', note: '€6.99/mo — all 33 tracks, projects & certificates', highlight: true },
  { name: 'Coursera Plus', cost: '~€399 / year', bar: 149, color: '#8fa3bf', note: 'Subscription to university-style video courses' },
  { name: 'Udemy courses', cost: '€300+ typical', bar: 112, color: '#8fa3bf', note: 'Bought one by one — quality and freshness vary' },
  { name: 'Coding bootcamp', cost: '€3,000+', bar: 1120, color: '#ff6b8a', note: 'Full-time, weeks-long — biggest commitment' },
];

export default function PricingValueInfographic() {
  return (
    <InfographicFrame slug="edunode-pricing-value-comparison" title={TITLE} description={DESC}>
      <svg viewBox="0 0 1600 900" role="img" aria-labelledby="pvc-title pvc-desc" style={{ width: '100%', height: 'auto', display: 'block' }}>
        <title id="pvc-title">{TITLE}</title>
        <desc id="pvc-desc">{DESC}</desc>
        <defs>
          <linearGradient id="pvc-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0a0e27" />
            <stop offset="0.55" stopColor="#1a1f3a" />
            <stop offset="1" stopColor="#2d1b69" />
          </linearGradient>
          <linearGradient id="pvc-pro" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#00d4ff" />
            <stop offset="1" stopColor="#7b2ff7" />
          </linearGradient>
        </defs>
        <rect width="1600" height="900" fill="url(#pvc-bg)" />
        <text x="80" y="96" fontFamily="Poppins, -apple-system, sans-serif" fontSize="46" fontWeight="700" fill="#ffffff">
          {TITLE}
        </text>
        <text x="80" y="142" fontFamily="-apple-system, sans-serif" fontSize="24" fill="#8fa3bf">
          Annual price across platforms · IT, coding, AI, DLT, crypto &amp; blockchain
        </text>
        {ROWS.map((r, i) => {
          const y = 200 + i * 126;
          return (
            <g key={r.name}>
              {r.highlight && (
                <rect x="56" y={y - 56} width="1488" height="112" rx="18" fill="none" stroke="#00d4ff" strokeWidth="3" strokeDasharray="10 8" />
              )}
              <text x="80" y={y - 12} fontFamily="-apple-system, sans-serif" fontSize="26" fontWeight="700" fill="#ffffff">{r.name}</text>
              <text x="80" y={y + 24} fontFamily="-apple-system, sans-serif" fontSize="21" fill="#8fa3bf">{r.note}</text>
              <rect x="620" y={y - 34} width={Math.max(r.bar, 10)} height="62" rx="10" fill={r.highlight ? 'url(#pvc-pro)' : r.color} opacity={r.highlight ? 1 : 0.75} />
              <text x={620 + Math.max(r.bar, 10) + 20} y={y + 8} fontFamily="-apple-system, sans-serif" fontSize="28" fontWeight="700" fill={r.color}>{r.cost}</text>
            </g>
          );
        })}
        <text x="80" y="856" fontFamily="-apple-system, sans-serif" fontSize="19" fill="#6f7aa0">
          EduNode Pro = €6.99 × 12. Coursera Plus and Udemy prices are typical public rates. edunode.org
        </text>
      </svg>
    </InfographicFrame>
  );
}
