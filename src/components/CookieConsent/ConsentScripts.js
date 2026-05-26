import { useEffect } from 'react';
import { useCookieConsent } from '../../hooks/useCookieConsent';

const GA_ID = 'UA-169884801-1';
const ADSENSE_CLIENT = 'ca-pub-6055710326096481';

function loadScript(src, attrs = {}) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    Object.entries(attrs).forEach(([k, v]) => {
      if (v === true) script.setAttribute(k, '');
      else script.setAttribute(k, v);
    });
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

function initGtag() {
  if (window.__gtagInitialized) return;
  window.__gtagInitialized = true;
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA_ID);
}

function initAdsense() {
  if (window.__adsenseInitialized) return;
  window.__adsenseInitialized = true;
  const script = document.createElement('script');
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;
  script.async = true;
  script.crossOrigin = 'anonymous';
  document.head.appendChild(script);
}

export default function ConsentScripts() {
  const { consent, hasResponded } = useCookieConsent();

  useEffect(() => {
    if (!hasResponded) return;

    if (consent.analytics) {
      loadScript(`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`).then(initGtag).catch(() => {});
    }

    if (consent.marketing) {
      initAdsense();
    }
  }, [consent.analytics, consent.marketing, hasResponded]);

  return null;
}
