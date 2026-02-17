import React from "react";
import CookieConsent from 'react-cookie-consent';
import HeroSection from './sections/HeroSection';
import FeaturesSection from './sections/FeaturesSection';
import LazyVideoSection from './components/LazyVideoSection';
import PartnersSection from './sections/PartnersSection';

function Hometwo() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <LazyVideoSection />
      <PartnersSection />
      
      <CookieConsent
        style={{
          background: 'linear-gradient(135deg, #1a1f3a 0%, #2d1b69 100%)',
          border: '1px solid rgba(123, 47, 247, 0.3)',
          borderRadius: '10px',
          padding: '15px 20px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
        }}
        buttonStyle={{
          background: 'linear-gradient(45deg, #7b2ff7, #00d4ff)',
          color: 'white',
          fontSize: '14px',
          fontWeight: 'bold',
          borderRadius: '25px',
          padding: '8px 20px',
          border: 'none',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
        }}
        buttonStyleOnHover={{
          background: 'linear-gradient(45deg, #00d4ff, #7b2ff7)',
          transform: 'translateY(-2px)',
          boxShadow: '0 5px 15px rgba(123, 47, 247, 0.4)',
        }}
      >
        <span style={{ color: '#b8c5d6', fontSize: '14px' }}>
          This website uses cookies to enhance your learning experience. By continuing to use this site, you agree to our use of cookies.
        </span>
      </CookieConsent>
    </>
  );
}

export default Hometwo;