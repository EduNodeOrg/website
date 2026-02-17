# Security Policy

## Supported Versions

| Version | Supported          | Status           |
| ------- | ------------------ | ---------------- |
| Latest  | :white_check_mark: | Active Support   |
| 1.x.x   | :white_check_mark: | Security Fixes   |
| < 1.0   | :x:                | Not Supported    |

## Reporting a Vulnerability

We take the security of EduNode's website and services extremely seriously. If you've discovered a security vulnerability, we appreciate your help in disclosing it to us in a responsible manner.

### How to Report

1. **Do Not** report security vulnerabilities through public GitHub issues or discussions.

2. Email us at security@edunode.org with the following details:
   - **Subject Line**: "Security Vulnerability Report - [Brief Description]"
   - **Description**: Clear explanation of the vulnerability
   - **Impact**: Potential impact of the vulnerability
   - **Steps to Reproduce**: Detailed steps to reproduce the issue
   - **Environment**: Browser/OS versions, if applicable
   - **Screenshots/Proof of Concept**: If available
   - **Suggested Fix**: If you have any recommendations

### Our Commitment

- We will acknowledge receipt of your report within 2 business days
- We will keep you informed of our progress throughout the process
- We will confirm the vulnerability and work on a fix
- We will publicly acknowledge your contribution (unless you prefer to remain anonymous)
- We will not take legal action against you for security research conducted in good faith

## Security Best Practices

### For Users
- Use strong, unique passwords
- Enable two-factor authentication (2FA) where available
- Keep your browser and operating system updated
- Be cautious of phishing attempts
- Never share your login credentials

### For Developers
- Follow secure coding practices
- Keep all dependencies updated
- Implement proper input validation
- Use environment variables for sensitive data
- Follow the principle of least privilege

## Security Features

### Application Security
- End-to-end HTTPS encryption
- Content Security Policy (CSP) implementation
- Cross-Origin Resource Sharing (CORS) policy
- Security headers (HSTS, X-Content-Type-Options, etc.)
- Rate limiting and brute force protection

### Data Protection
- Data encryption at rest and in transit
- Regular security audits and penetration testing
- Secure session management
- Regular data backups

## Third-Party Security

We carefully vet and monitor our third-party services and dependencies:
- Regular dependency updates using Dependabot
- Automated vulnerability scanning
- Security reviews of third-party integrations
- Compliance with data protection regulations (GDPR, CCPA, etc.)

## Responsible Disclosure Policy

We ask that you:
- Allow us a reasonable amount of time to address the vulnerability before public disclosure
- Make a good faith effort to avoid privacy violations and service disruptions
- Not exploit the vulnerability beyond what's necessary to demonstrate it
- Keep information about the vulnerability confidential until we've had time to address it

## Security Updates

Security updates are released on a rolling basis:
- Critical vulnerabilities: Patched within 24-48 hours
- High severity: Patched within 1 week
- Medium/Low severity: Addressed in the next scheduled update

All security updates are documented in our [Release Notes](https://github.com/EduNodeOrg/website/releases).

## Bug Bounty

While we don't currently have a formal bug bounty program, we may offer rewards for significant security reports at our discretion.

## Contact

For security-related inquiries, please contact:
- **Security Team**: hi@edunode.org
- **PGP Key**: [Available upon request]
- **Response Time**: Within 48 hours for initial response

---
*Last Updated: August 21, 2025*
*This policy is reviewed quarterly and subject to change. Please check back regularly for updates.*