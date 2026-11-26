import React from 'react';
import InfographicFrame from './InfographicFrame';

const TITLE = 'From first free lesson to a verifiable certificate';
const DESC =
  'The 5-step EduNode path: free starter lessons, hands-on exercises, knowledge checks, a capstone project, and a downloadable PDF certificate anchored on the blockchain.';

const STEPS = [
  { n: '1', name: 'Start free', text: 'Lessons 1–2 of every track. No account, no card.', color: '#00ff88' },
  { n: '2', name: 'Practice', text: 'Guided exercises and real coding challenges.', color: '#00d4ff' },
  { n: '3', name: 'Verify', text: 'Knowledge checks confirm every lesson.', color: '#7b2ff7' },
  { n: '4', name: 'Build', text: 'Finish with a capstone portfolio project.', color: '#ffaa00' },
  { n: '5', name: 'Earn', text: 'PDF + blockchain-anchored certificate.', color: '#ff6b8a' },
];

export default function CertificateRoadmapInfographic() {
  return (
    <InfographicFrame slug="edunode-certificate-verification-roadmap" title={TITLE} description={DESC}>
      <svg viewBox="0 0 1600 900" role="img" aria-labelledby="crf-title crf-desc" style={{ width: '100%', height: 'auto', display: 'block' }}>
        <title id="crf-title">{TITLE}</title>
        <desc id="crf-desc">{DESC}</desc>
        <defs>
          <linearGradient id="crf-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0a0e27" />
            <stop offset="0.55" stopColor="#1a1f3a" />
            <stop offset="1" stopColor="#2d1b69" />
          </linearGradient>
          <marker id="crf-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M 0 1 L 9 5 L 0 9" fill="none" stroke="#00d4ff" strokeWidth="2" />
          </marker>
        </defs>
        <rect width="1600" height="900" fill="url(#crf-bg)" />
        <text x="80" y="96" fontFamily="Poppins, -apple-system, sans-serif" fontSize="46" fontWeight="700" fill="#ffffff">
          {TITLE}
        </text>
        <text x="80" y="142" fontFamily="-apple-system, sans-serif" fontSize="24" fill="#8fa3bf">
          How EduNode certificates work — for learners and for the people who verify them
        </text>
        {STEPS.map((s, i) => {
          const x = 80 + i * 296;
          return (
            <g key={s.n}>
              {i > 0 && (
                <line x1={x - 26} y1="430" x2={x - 6} y2="430" stroke="#00d4ff" strokeWidth="4" markerEnd="url(#crf-arrow)" />
              )}
              <rect x={x} y="240" width="250" height="380" rx="20" fill="rgba(26, 31, 58, 0.85)" stroke={s.color} strokeWidth="3" />
              <circle cx={x + 125} cy="320" r="46" fill="none" stroke={s.color} strokeWidth="4" />
              <text x={x + 125} y="336" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="44" fontWeight="700" fill={s.color}>{s.n}</text>
              <text x={x + 125} y="420" textAnchor="middle" fontFamily="-apple-system, sans-serif" fontSize="30" fontWeight="700" fill="#ffffff">{s.name}</text>
              {s.text.split('. ').map((line, j) => (
                <text key={j} x={x + 125} y={470 + j * 30} textAnchor="middle" fontFamily="-apple-system, sans-serif" fontSize="19" fill="#b8c5d6">
                  {line.replace(/\.$/, '')}
                </text>
              ))}
            </g>
          );
        })}
        <rect x="80" y="700" width="1440" height="120" rx="18" fill="rgba(0, 212, 255, 0.08)" stroke="#00d4ff" strokeWidth="2" />
        <text x="120" y="752" fontFamily="-apple-system, sans-serif" fontSize="26" fontWeight="700" fill="#00d4ff">
          Anyone can verify a certificate
        </text>
        <text x="120" y="792" fontFamily="-apple-system, sans-serif" fontSize="21" fill="#b8c5d6">
          Each PDF carries a certificate number — employers check it at edunode.org/validCertificate or on-chain.
        </text>
        <text x="1520" y="856" textAnchor="end" fontFamily="-apple-system, sans-serif" fontSize="19" fill="#6f7aa0">edunode.org</text>
      </svg>
    </InfographicFrame>
  );
}
