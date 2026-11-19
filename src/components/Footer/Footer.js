import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Deep per-icon imports — the icon packs don't tree-shake in this build, so
// root imports would pull thousands of icons into the main bundle.
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope';
import { faXTwitter } from '@fortawesome/free-brands-svg-icons/faXTwitter';
import { faDiscord } from '@fortawesome/free-brands-svg-icons/faDiscord';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons/faLinkedin';
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';
import './style.css'
import CookieSettingsButton from '../CookieConsent/CookieSettingsButton';

const linkStyle = { color: '#b8c5d6', textDecoration: 'none' };
const headingStyle = { color: '#ffffff' };

function FooterLink({ href, children }) {
  return (
    <p>
      <a href={href} style={linkStyle} className="footer-link">
        {children}
      </a>
    </p>
  );
}

export default function Footer() {
  return (
    <div className="content-wrapper">
      <footer style={{
        background: 'linear-gradient(180deg, #1a1f3a 0%, #0a0e27 100%)',
        color: '#b8c5d6',
        borderTop: '1px solid rgba(123, 47, 247, 0.3)',
      }}>
        <section className='d-flex justify-content-center justify-content-lg-between p-4' style={{ borderBottom: '1px solid rgba(123, 47, 247, 0.2)' }}>
          <div className='me-5 d-none d-lg-block'>
            <span>Get connected with us on social networks:</span>
          </div>

          <div>
            <a href='https://x.com/edunodeorg' target="_blank" rel="noreferrer" className='me-4 footer-link' style={linkStyle} aria-label="EduNode on X">
              <FontAwesomeIcon icon={faXTwitter} />
            </a>
            <a href='https://discord.gg/qBJYQYUK92' target="_blank" rel="noreferrer" className='me-4 footer-link' style={linkStyle} aria-label="EduNode on Discord">
              <FontAwesomeIcon icon={faDiscord} />
            </a>
            <a href="mailto:hi@edunode.org" className='me-4 footer-link' style={linkStyle} aria-label="Email EduNode">
              <FontAwesomeIcon icon={faEnvelope} />
            </a>
            <a href='https://www.linkedin.com/company/edunodeorg/' target="_blank" rel="noreferrer" className='me-4 footer-link' style={linkStyle} aria-label="EduNode on LinkedIn">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a href='https://github.com/EduNodeOrg' target="_blank" rel="noreferrer" className='me-4 footer-link' style={linkStyle} aria-label="EduNode on GitHub">
              <FontAwesomeIcon icon={faGithub} />
            </a>
          </div>
        </section>

        <section>
          <div className="py-5 container">
            <div className='row mt-3 justify-content-center'>
              <div className='col-md-3 col-lg-4 col-xl-3 mx-auto mb-4'>
                <p className='text-uppercase fw-bold mb-4' style={headingStyle}>
                  EduNode
                </p>
                <p>
                  Build practical IT, Web3, and blockchain skills through courses, masterclasses, and projects.
                </p>
                <p>
                  A brand of{' '}
                  <a href="https://www.ogtechnologies.co/" target="_blank" rel="noreferrer" style={linkStyle} className="footer-link">
                    OG Technologies EU
                  </a>{' '}
                  — blockchain, payments &amp; digital-identity consulting.
                </p>
                <p>
                  <FontAwesomeIcon icon={faHome} className="me-2" />
                  Widerhofergasse 6, 1090 Wien
                </p>
                <p>
                  <FontAwesomeIcon icon={faEnvelope} className="me-2" />
                  <a href="mailto:hi@edunode.org" style={linkStyle} className="footer-link">
                    hi@edunode.org
                  </a>
                </p>
              </div>

              <div className='col-md-2 col-lg-2 col-xl-2 mx-auto mb-4'>
                <p className='text-uppercase fw-bold mb-4' style={headingStyle}>Products</p>
                <FooterLink href='/courses'>Courses</FooterLink>
                <FooterLink href='/masterclasses'>Masterclasses</FooterLink>
                <FooterLink href='/challenges'>Challenges</FooterLink>
                <FooterLink href='/pricing'>Pricing</FooterLink>
                <FooterLink href='/membership'>Membership</FooterLink>
                <FooterLink href='/certificate'>Certificates</FooterLink>
              </div>

              <div className='col-md-3 col-lg-2 col-xl-2 mx-auto mb-4'>
                <p className='text-uppercase fw-bold mb-4' style={headingStyle}>Explore</p>
                <FooterLink href='/blog'>Blog</FooterLink>
                <FooterLink href='/journal'>Journal</FooterLink>
                <FooterLink href='/chess'>ChainChess</FooterLink>
                <FooterLink href='/feed'>Feed</FooterLink>
                <FooterLink href='/community'>Community</FooterLink>
                <FooterLink href='/resources'>Resources</FooterLink>
                <FooterLink href='/glossary'>Glossary</FooterLink>
                <FooterLink href='/milestones'>Milestones</FooterLink>
              </div>

              <div className='col-md-3 col-lg-2 col-xl-2 mx-auto mb-4'>
                <p className='text-uppercase fw-bold mb-4' style={headingStyle}>Topics</p>
                <FooterLink href='/bitcoin'>Bitcoin</FooterLink>
                <FooterLink href='/stellar'>Stellar</FooterLink>
                <FooterLink href='/stablecoins'>Stablecoins</FooterLink>
                <FooterLink href='/ethereum'>Ethereum</FooterLink>
                <FooterLink href='/crypto-fundamentals'>Crypto Fundamentals</FooterLink>
                <FooterLink href='/ai'>AI</FooterLink>
              </div>

              <div className='col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4'>
                <p className='text-uppercase fw-bold mb-4' style={headingStyle}>Company</p>
                <FooterLink href='/about'>About</FooterLink>
                <FooterLink href='/contactus'>Contact</FooterLink>
                <FooterLink href='https://www.ogtechnologies.co/'>Consulting — OG Tech</FooterLink>
                <FooterLink href='/releases'>Releases</FooterLink>
                <FooterLink href='/terms'>Terms and Conditions</FooterLink>
                <FooterLink href='/privacy'>Privacy Policy</FooterLink>
                <p>
                  <CookieSettingsButton style={{ color: '#b8c5d6' }} />
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
          © {new Date().getFullYear()} Copyright:{' '}
          <a className='fw-bold footer-link' style={linkStyle} href='https://edunode.org/'>
            EduNode.org
          </a>
        </div>
      </footer>
    </div>
  );
}
