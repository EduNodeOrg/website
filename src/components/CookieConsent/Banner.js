import React, { useState, useEffect } from 'react';
import { useCookieConsent } from '../../hooks/useCookieConsent';

const bannerStyle = {
  position: 'fixed',
  bottom: '20px',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '92%',
  maxWidth: '720px',
  zIndex: 9999,
  background: 'linear-gradient(135deg, #1a1f3a 0%, #2d1b69 100%)',
  border: '1px solid rgba(123, 47, 247, 0.3)',
  borderRadius: '16px',
  padding: '24px',
  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.6)',
  color: '#ffffff',
  fontFamily: 'inherit',
};

const textStyle = {
  color: '#b8c5d6',
  fontSize: '14px',
  lineHeight: 1.6,
  marginBottom: '16px',
};

const linkStyle = {
  color: '#00d4ff',
  textDecoration: 'underline',
  fontWeight: 500,
};

const buttonBase = {
  fontSize: '13px',
  fontWeight: 'bold',
  borderRadius: '25px',
  padding: '10px 20px',
  border: 'none',
  cursor: 'pointer',
  transition: 'transform 0.15s ease, opacity 0.15s ease',
};

const acceptStyle = {
  ...buttonBase,
  background: 'linear-gradient(45deg, #7b2ff7, #00d4ff)',
  color: 'white',
};

const rejectStyle = {
  ...buttonBase,
  background: 'transparent',
  color: '#b8c5d6',
  border: '1px solid rgba(255, 255, 255, 0.25)',
};

const saveStyle = {
  ...buttonBase,
  background: 'rgba(123, 47, 247, 0.2)',
  color: '#00d4ff',
  border: '1px solid rgba(0, 212, 255, 0.3)',
};

const toggleRowStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '10px 0',
  borderBottom: '1px solid rgba(255,255,255,0.08)',
};

const toggleLabelStyle = {
  color: '#e2e8f0',
  fontSize: '14px',
  fontWeight: 500,
};

const toggleDescStyle = {
  color: '#94a3b8',
  fontSize: '12px',
  marginTop: '2px',
};

function ToggleSwitch({ checked, onChange, disabled }) {
  return (
    <button
      type="button"
      onClick={() => !disabled && onChange(!checked)}
      style={{
        width: '44px',
        height: '24px',
        borderRadius: '12px',
        border: 'none',
        cursor: disabled ? 'default' : 'pointer',
        background: checked
          ? 'linear-gradient(45deg, #7b2ff7, #00d4ff)'
          : 'rgba(255,255,255,0.15)',
        position: 'relative',
        transition: 'background 0.2s ease',
        flexShrink: 0,
        marginLeft: '12px',
      }}
      aria-checked={checked}
      role="switch"
      disabled={disabled}
    >
      <span
        style={{
          position: 'absolute',
          top: '3px',
          left: checked ? '23px' : '3px',
          width: '18px',
          height: '18px',
          borderRadius: '50%',
          background: '#fff',
          transition: 'left 0.2s ease',
          boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
        }}
      />
    </button>
  );
}

export default function CookieBanner() {
  const {
    bannerOpen,
    setBannerOpen,
    consent,
    updateConsent,
    acceptAll,
    rejectNonNecessary,
    hasResponded,
  } = useCookieConsent();

  const [showDetails, setShowDetails] = useState(false);
  const [localPrefs, setLocalPrefs] = useState({
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    if (bannerOpen && hasResponded) {
      setLocalPrefs({
        analytics: consent.analytics,
        marketing: consent.marketing,
      });
    }
  }, [bannerOpen, hasResponded, consent]);

  if (!bannerOpen) return null;

  const handleSavePreferences = () => {
    updateConsent(localPrefs);
    setBannerOpen(false);
  };

  return (
    <div style={bannerStyle} role="dialog" aria-label="Cookie consent">
      <p style={textStyle}>
        We use necessary cookies for site function. For analytics and marketing, we need your consent. You can change your mind anytime.{" "}
        <a href="/privacy" style={linkStyle}>Privacy Policy</a>
      </p>

      {showDetails && (
        <div style={{ marginBottom: '16px' }}>
          <div style={toggleRowStyle}>
            <div>
              <div style={toggleLabelStyle}>Necessary</div>
              <div style={toggleDescStyle}>Always active (session, authentication, security)</div>
            </div>
            <ToggleSwitch checked disabled onChange={() => {}} />
          </div>
          <div style={toggleRowStyle}>
            <div>
              <div style={toggleLabelStyle}>Analytics</div>
              <div style={toggleDescStyle}>Helps us understand how visitors interact with the site</div>
            </div>
            <ToggleSwitch
              checked={localPrefs.analytics}
              onChange={(v) => setLocalPrefs((p) => ({ ...p, analytics: v }))}
            />
          </div>
          <div style={toggleRowStyle}>
            <div>
              <div style={toggleLabelStyle}>Marketing</div>
              <div style={toggleDescStyle}>Used to deliver personalized ads and content</div>
            </div>
            <ToggleSwitch
              checked={localPrefs.marketing}
              onChange={(v) => setLocalPrefs((p) => ({ ...p, marketing: v }))}
            />
          </div>
        </div>
      )}

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
        {!showDetails ? (
          <>
            <button
              type="button"
              style={rejectStyle}
              onClick={() => {
                rejectNonNecessary();
                setShowDetails(false);
              }}
            >
              Reject non-necessary
            </button>
            <button
              type="button"
              style={saveStyle}
              onClick={() => setShowDetails(true)}
            >
              Preferences
            </button>
            <button type="button" style={acceptStyle} onClick={acceptAll}>
              Accept all
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              style={rejectStyle}
              onClick={() => {
                setShowDetails(false);
                setLocalPrefs({ analytics: false, marketing: false });
              }}
            >
              Back
            </button>
            <button type="button" style={saveStyle} onClick={handleSavePreferences}>
              Save preferences
            </button>
          </>
        )}
      </div>
    </div>
  );
}
