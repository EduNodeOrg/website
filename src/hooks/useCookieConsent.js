import { useState, useEffect, useCallback, createContext, useContext } from 'react';

const STORAGE_KEY = 'edunode_cookie_consent_v2';
const SIX_MONTHS_MS = 6 * 30 * 24 * 60 * 60 * 1000;

const defaultConsent = {
  necessary: true,
  analytics: false,
  marketing: false,
  timestamp: null,
};

function getStoredConsent() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed.timestamp) return null;
    const age = Date.now() - new Date(parsed.timestamp).getTime();
    if (age > SIX_MONTHS_MS) {
      window.localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return {
      necessary: true,
      analytics: !!parsed.analytics,
      marketing: !!parsed.marketing,
      timestamp: parsed.timestamp,
    };
  } catch {
    return null;
  }
}

function pushDataLayerEvent(event, consent) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event,
    consent: {
      necessary: consent.necessary,
      analytics: consent.analytics,
      marketing: consent.marketing,
    },
    consentTimestamp: consent.timestamp,
  });
}

function saveConsent(consent) {
  const payload = { ...consent, timestamp: new Date().toISOString() };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  return payload;
}

export function useCookieConsentState() {
  const [consent, setConsent] = useState(() => {
    const stored = typeof window !== 'undefined' ? getStoredConsent() : null;
    return stored || { ...defaultConsent };
  });
  const [bannerOpen, setBannerOpen] = useState(false);

  useEffect(() => {
    const stored = getStoredConsent();
    if (!stored) {
      setBannerOpen(true);
    } else {
      setConsent(stored);
      pushDataLayerEvent('consentRestored', stored);
    }
  }, []);

  const updateConsent = useCallback((newConsent) => {
    const merged = { necessary: true, ...newConsent };
    const saved = saveConsent(merged);
    setConsent(saved);
    pushDataLayerEvent('consentUpdated', saved);
    return saved;
  }, []);

  const acceptAll = useCallback(() => {
    const saved = saveConsent({
      necessary: true,
      analytics: true,
      marketing: true,
    });
    setConsent(saved);
    pushDataLayerEvent('consentGiven', saved);
    setBannerOpen(false);
  }, []);

  const rejectNonNecessary = useCallback(() => {
    const saved = saveConsent({
      necessary: true,
      analytics: false,
      marketing: false,
    });
    setConsent(saved);
    pushDataLayerEvent('consentWithdrawn', saved);
    setBannerOpen(false);
  }, []);

  const withdrawConsent = useCallback(() => {
    setBannerOpen(true);
  }, []);

  const hasConsent = useCallback(
    (category) => !!consent[category],
    [consent]
  );

  const hasResponded = !!consent.timestamp;

  return {
    consent,
    bannerOpen,
    setBannerOpen,
    updateConsent,
    acceptAll,
    rejectNonNecessary,
    withdrawConsent,
    hasConsent,
    hasResponded,
  };
}

const CookieConsentContext = createContext(null);

export function CookieConsentProvider({ children }) {
  const value = useCookieConsentState();
  return (
    <CookieConsentContext.Provider value={value}>
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) {
    throw new Error('useCookieConsent must be used within CookieConsentProvider');
  }
  return ctx;
}
