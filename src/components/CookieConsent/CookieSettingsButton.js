import React from 'react';
import { useCookieConsent } from '../../hooks/useCookieConsent';

export default function CookieSettingsButton({ style, children }) {
  const { withdrawConsent } = useCookieConsent();

  return (
    <button
      type="button"
      onClick={withdrawConsent}
      style={{
        background: 'none',
        border: 'none',
        color: 'inherit',
        textDecoration: 'underline',
        cursor: 'pointer',
        fontSize: 'inherit',
        padding: 0,
        ...style,
      }}
    >
      {children || 'Cookie Settings'}
    </button>
  );
}
