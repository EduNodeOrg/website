import React from 'react';
import { MDBFooter, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
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
      <MDBFooter style={{
        background: 'linear-gradient(180deg, #1a1f3a 0%, #0a0e27 100%)',
        color: '#b8c5d6',
        borderTop: '1px solid rgba(123, 47, 247, 0.3)',
      }}>
        <section className='d-flex justify-content-center justify-content-lg-between p-4' style={{ borderBottom: '1px solid rgba(123, 47, 247, 0.2)' }}>
          <div className='me-5 d-none d-lg-block'>
            <span>Get connected with us on social networks:</span>
          </div>

          <div>
            <a href='https://x.com/edunodeorg' target="_blank" rel="noreferrer" className='me-4 footer-link' style={linkStyle}>
              <MDBIcon fab icon="twitter" />
            </a>
            <a href='https://discord.gg/qBJYQYUK92' target="_blank" rel="noreferrer" className='me-4 footer-link' style={linkStyle}>
              <MDBIcon fab icon="discord" />
            </a>
            <a href="mailto:hi@edunode.org" className='me-4 footer-link' style={linkStyle}>
              <MDBIcon icon="envelope" />
            </a>
            <a href='https://www.linkedin.com/company/edunodeorg/' target="_blank" rel="noreferrer" className='me-4 footer-link' style={linkStyle}>
              <MDBIcon fab icon="linkedin" />
            </a>
            <a href='https://github.com/EduNodeOrg' target="_blank" rel="noreferrer" className='me-4 footer-link' style={linkStyle}>
              <MDBIcon fab icon="github" />
            </a>
          </div>
        </section>

        <section>
          <div className="py-5 container">
            <MDBRow className='mt-3 justify-content-center'>
              <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
                <h6 className='text-uppercase fw-bold mb-4' style={headingStyle}>
                  EduNode
                </h6>
                <p>
                  Learn Web3 and Blockchain skills and reach your developing goals.
                </p>
                <p>
                  <MDBIcon icon="home" className="me-2" />
                  Widerhofergasse 6, 1090 Wien
                </p>
                <p>
                  <MDBIcon icon="envelope" className="me-2" />
                  <a href="mailto:hi@edunode.org" style={linkStyle} className="footer-link">
                    hi@edunode.org
                  </a>
                </p>
              </MDBCol>

              <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
                <h6 className='text-uppercase fw-bold mb-4' style={headingStyle}>Products</h6>
                <FooterLink href='/courses'>Courses</FooterLink>
                <FooterLink href='/challenges'>Challenges</FooterLink>
                <FooterLink href='/pricing'>Pricing</FooterLink>
                <FooterLink href='/membership'>Membership</FooterLink>
                <FooterLink href='/certificate'>Certificates</FooterLink>
              </MDBCol>

              <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
                <h6 className='text-uppercase fw-bold mb-4' style={headingStyle}>Explore</h6>
                <FooterLink href='/blog'>Blog</FooterLink>
                <FooterLink href='/feed'>Feed</FooterLink>
                <FooterLink href='/community'>Community</FooterLink>
                <FooterLink href='/resources'>Resources</FooterLink>
                <FooterLink href='/glossary'>Glossary</FooterLink>
                <FooterLink href='/milestones'>Milestones</FooterLink>
              </MDBCol>

              <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
                <h6 className='text-uppercase fw-bold mb-4' style={headingStyle}>Company</h6>
                <FooterLink href='/about'>About</FooterLink>
                <FooterLink href='/contactus'>Contact</FooterLink>
                <FooterLink href='/releases'>Releases</FooterLink>
                <FooterLink href='/terms'>Terms and Conditions</FooterLink>
                <FooterLink href='/privacy'>Privacy Policy</FooterLink>
                <p>
                  <CookieSettingsButton style={{ color: '#b8c5d6' }} />
                </p>
              </MDBCol>
            </MDBRow>
          </div>
        </section>

        <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
          © {new Date().getFullYear()} Copyright:{' '}
          <a className='fw-bold footer-link' style={linkStyle} href='https://edunode.org/'>
            EduNode.org
          </a>
        </div>
      </MDBFooter>
    </div>
  );
}
