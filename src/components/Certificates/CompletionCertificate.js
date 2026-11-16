import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Download } from '@mui/icons-material';
import { downloadCompletionCertificate } from './certificatePdf';

const wrapStyle = { display: 'inline-flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', justifyContent: 'center' };
const inputStyle = {
  background: '#0e1a2b', border: '1px solid #3a5470', color: '#eef4fc',
  borderRadius: 8, padding: '12px 16px', fontSize: '.9rem', minWidth: 220,
};
const buttonStyle = {
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10,
  padding: '13px 20px', border: '1px solid #77d9bb', borderRadius: 8,
  fontSize: '.9rem', fontWeight: 600, lineHeight: 1.5, cursor: 'pointer',
  background: '#77d9bb', color: '#0b2720',
};

// "Download certificate" button for course completion screens. Uses the
// signed-in learner's name; guests can type a name before downloading.
export default function CompletionCertificate({ courseTitle, detail, slug }) {
  const user = useSelector((state) => state.auth?.user);
  const [name, setName] = useState(user?.name || '');
  const [busy, setBusy] = useState(false);
  const needsName = !user?.name && !name.trim();

  async function handleDownload() {
    setBusy(true);
    try {
      downloadCompletionCertificate({ name: name.trim() || user?.name, courseTitle, detail, slug });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div style={wrapStyle}>
      {!user?.name && (
        <input
          type="text"
          style={inputStyle}
          placeholder="Your name for the certificate"
          value={name}
          onChange={(event) => setName(event.target.value)}
          aria-label="Name to print on the certificate"
        />
      )}
      <button type="button" style={{ ...buttonStyle, opacity: busy || needsName ? 0.5 : 1 }} onClick={handleDownload} disabled={busy || needsName}>
        <Download fontSize="small" />
        {busy ? 'Preparing…' : 'Download certificate (PDF)'}
      </button>
    </div>
  );
}
