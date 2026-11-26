import React from 'react';
import InfographicFrame from './InfographicFrame';

const TITLE = 'EduNode vs Coursera, Udemy & 360Learning';
const DESC =
  'Feature comparison of learning platforms for IT, software development, AI, DLT and blockchain: price, curriculum freshness, format, certificates and team training.';

const COLS = [
  { name: 'EduNode', highlight: true },
  { name: 'Coursera', highlight: false },
  { name: 'Udemy', highlight: false },
  { name: '360Learning', highlight: false },
];

const ROWS = [
  ['Price', '€0 – €6.99/mo', '~€59/mo · €399/yr', '€10–€120 per course', 'Per-seat, sales quote'],
  ['Curriculum freshness', 'Fresh 2026 AI & DLT', 'Varies by university', 'Varies by instructor', 'You write it yourself'],
  ['Learning format', 'Interactive text + code', 'Video lectures', 'Video lectures', 'LMS authoring tool'],
  ['Certificates', 'PDF + blockchain-anchored', 'Accredited options', 'Completion only', 'Internal tracking'],
  ['Best for', 'Hands-on tech careers', 'University credit', 'Casual one-off topics', 'Non-tech company training'],
];

export default function PlatformComparisonInfographic() {
  const colX = (i) => 420 + i * 295;
  return (
    <InfographicFrame slug="edunode-vs-coursera-udemy-360learning" title={TITLE} description={DESC}>
      <svg viewBox="0 0 1600 900" role="img" aria-labelledby="pcm-title pcm-desc" style={{ width: '100%', height: 'auto', display: 'block' }}>
        <title id="pcm-title">{TITLE}</title>
        <desc id="pcm-desc">{DESC}</desc>
        <defs>
          <linearGradient id="pcm-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0a0e27" />
            <stop offset="0.55" stopColor="#1a1f3a" />
            <stop offset="1" stopColor="#2d1b69" />
          </linearGradient>
        </defs>
        <rect width="1600" height="900" fill="url(#pcm-bg)" />
        <text x="80" y="96" fontFamily="Poppins, -apple-system, sans-serif" fontSize="46" fontWeight="700" fill="#ffffff">
          {TITLE}
        </text>
        <text x="80" y="142" fontFamily="-apple-system, sans-serif" fontSize="24" fill="#8fa3bf">
          An honest comparison for IT, coding, AI, DLT, crypto &amp; blockchain learning
        </text>
        <rect x={colX(0) - 20} y="176" width="282" height="660" rx="18" fill="rgba(0, 212, 255, 0.07)" stroke="#00d4ff" strokeWidth="3" />
        {COLS.map((c, i) => (
          <text key={c.name} x={colX(i) + 120} y="230" textAnchor="middle" fontFamily="-apple-system, sans-serif" fontSize="28" fontWeight="700" fill={c.highlight ? '#00d4ff' : '#ffffff'}>
            {c.name}
          </text>
        ))}
        {ROWS.map((row, r) => {
          const y = 290 + r * 108;
          return (
            <g key={row[0]}>
              <line x1="80" y1={y - 52} x2="1520" y2={y - 52} stroke="rgba(143, 163, 191, 0.25)" strokeWidth="2" />
              <text x="80" y={y + 8} fontFamily="-apple-system, sans-serif" fontSize="23" fontWeight="700" fill="#b8c5d6">{row[0]}</text>
              {row.slice(1).map((cell, c) => (
                <text key={c} x={colX(c) + 120} y={y + 8} textAnchor="middle" fontFamily="-apple-system, sans-serif" fontSize="21" fill={c === 0 ? '#ffffff' : '#8fa3bf'} fontWeight={c === 0 ? '700' : '400'}>
                  {cell}
                </text>
              ))}
            </g>
          );
        })}
        <text x="80" y="872" fontFamily="-apple-system, sans-serif" fontSize="19" fill="#6f7aa0">
          Competitor pricing reflects typical public rates in 2026. edunode.org
        </text>
      </svg>
    </InfographicFrame>
  );
}
