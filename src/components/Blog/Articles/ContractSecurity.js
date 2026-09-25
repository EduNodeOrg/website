import React, { Component } from 'react';
import NavBar from '../../NavBar';
import profilePicImg from '../mepic.png';
import SecurityIcon from '@material-ui/icons/Security';
import {
  FacebookShareCount,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
} from 'react-share';
import { Helmet } from 'react-helmet-async';

const styles = {
  page: {
    background: '#f8f9fc',
    minHeight: '100vh',
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
  },
  hero: {
    background: 'linear-gradient(135deg, #1a0000 0%, #7a0c0c 55%, #e63946 100%)',
    padding: '72px 24px',
    textAlign: 'center',
    color: '#fff',
  },
  heroIcon: {
    fontSize: '72px',
    marginBottom: '12px',
    display: 'inline-block',
    filter: 'drop-shadow(0 6px 18px rgba(0,0,0,0.35))',
  },
  heroText: {
    fontSize: '1.15rem',
    fontWeight: '600',
    letterSpacing: '0.5px',
    opacity: 0.92,
    maxWidth: '720px',
    margin: '0 auto',
  },
  wrapper: {
    maxWidth: '780px',
    margin: '0 auto',
    padding: '40px 24px 80px',
  },
  tag: {
    display: 'inline-block',
    background: 'linear-gradient(135deg, #7a0c0c, #e63946)',
    color: '#fff',
    fontSize: '12px',
    fontWeight: '700',
    letterSpacing: '1.2px',
    textTransform: 'uppercase',
    padding: '4px 12px',
    borderRadius: '20px',
    marginBottom: '16px',
  },
  title: {
    fontSize: '2.4rem',
    fontWeight: '800',
    lineHeight: '1.25',
    color: '#0d0d2b',
    marginBottom: '12px',
  },
  meta: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '32px',
    color: '#666',
    fontSize: '14px',
  },
  avatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '2px solid #e63946',
  },
  divider: {
    border: 'none',
    borderTop: '1px solid #e4e8f0',
    margin: '32px 0',
  },
  body: {
    fontSize: '1.05rem',
    lineHeight: '1.85',
    color: '#2d2d3a',
  },
  h4: {
    fontSize: '1.3rem',
    fontWeight: '700',
    color: '#0d0d2b',
    marginTop: '36px',
    marginBottom: '12px',
    paddingBottom: '6px',
    borderBottom: '3px solid #e63946',
    display: 'inline-block',
  },
  callout: {
    background: 'linear-gradient(135deg, #fff0f0, #ffecec)',
    borderLeft: '4px solid #e63946',
    borderRadius: '8px',
    padding: '16px 20px',
    margin: '24px 0',
    fontSize: '1rem',
    color: '#2d2d3a',
    lineHeight: '1.7',
  },
  vulnCard: {
    background: '#fff',
    border: '1px solid #e4e8f0',
    borderRadius: '12px',
    padding: '16px 20px',
    marginBottom: '12px',
    boxShadow: '0 2px 8px rgba(230,57,70,0.07)',
  },
  vulnTitle: {
    fontWeight: '700',
    color: '#c1121f',
    marginBottom: '4px',
    fontSize: '1rem',
  },
  fix: {
    display: 'block',
    marginTop: '8px',
    fontSize: '0.92rem',
    color: '#0a7d5c',
    fontWeight: '600',
  },
  faqItem: {
    background: '#fff',
    border: '1px solid #e4e8f0',
    borderRadius: '12px',
    padding: '16px 20px',
    marginBottom: '12px',
  },
  faqQ: {
    fontWeight: '700',
    color: '#0d0d2b',
    marginBottom: '6px',
    fontSize: '1rem',
  },
  refLink: {
    color: '#c1121f',
    textDecoration: 'none',
    wordBreak: 'break-all',
  },
  shareSection: {
    marginTop: '40px',
    paddingTop: '24px',
    borderTop: '1px solid #e4e8f0',
  },
  shareLabel: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '12px',
  },
  shareButtons: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
  },
  authorCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    background: '#fff',
    border: '1px solid #e4e8f0',
    borderRadius: '16px',
    padding: '24px',
    marginTop: '48px',
    boxShadow: '0 4px 20px rgba(230,57,70,0.1)',
  },
  authorAvatar: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '3px solid #e63946',
    flexShrink: 0,
  },
  authorName: {
    fontWeight: '700',
    fontSize: '1.1rem',
    color: '#0d0d2b',
    marginBottom: '4px',
  },
  authorBio: {
    fontSize: '0.9rem',
    color: '#555',
    lineHeight: '1.5',
    margin: 0,
  },
};

export default class ContractSecurity extends Component {
  render() {
    const shareUrl = 'https://edunode.org/blog/smart-contract-security-vulnerabilities';
    const title = 'Top 10 Smart Contract Security Vulnerabilities (and How to Prevent Them)';
    const profilePic = profilePicImg;

    const vulns = [
      {
        name: 'Reentrancy',
        desc: 'An attacker\'s contract calls back into your function before the first call finishes updating state, letting them drain funds repeatedly. This is the bug behind the infamous 2016 DAO hack (~$60M) that split Ethereum.',
        fix: 'Follow checks-effects-interactions (update state before external calls) and use reentrancy guards.',
      },
      {
        name: 'Access control failures',
        desc: 'Sensitive functions (mint, withdraw, upgrade) left callable by anyone, or guarded by logic that can be bypassed. Misconfigured admin functions are one of the most exploited bug classes in practice.',
        fix: 'Use proven role-based access control patterns, least-privilege design, and multisig for admin roles.',
      },
      {
        name: 'Oracle manipulation',
        desc: 'Contracts that read prices from a single DEX pool or a manipulable feed can be tricked into bad valuations — the basis of many flash loan exploits.',
        fix: 'Use decentralized oracles with time-weighted average prices and sanity bounds on inputs.',
      },
      {
        name: 'Flash loan attacks',
        desc: 'Attackers borrow millions with no collateral inside a single transaction, manipulate a protocol\'s assumptions, exploit it, and repay the loan atomically.',
        fix: 'Never rely on spot prices or balances within one transaction; design for attacker-controlled capital.',
      },
      {
        name: 'Integer overflow/underflow',
        desc: 'Arithmetic that wraps around its type limits (e.g., 0 - 1 producing a huge number), historically allowing unlimited mints or bypassed balance checks.',
        fix: 'Use checked arithmetic (built into modern Solidity ≥0.8 and Rust) and fuzz arithmetic paths in tests.',
      },
      {
        name: 'Unchecked external calls',
        desc: 'Ignoring the return value of a call that can fail — the contract proceeds as if a transfer succeeded when it did not.',
        fix: 'Always check return values and revert on failure.',
      },
      {
        name: 'Front-running / MEV',
        desc: 'Transactions sit publicly in the mempool before confirmation; bots can insert their own transactions first to profit from yours (sandwich attacks on trades are the classic example).',
        fix: 'Use commit-reveal schemes, slippage limits, and private mempools where appropriate.',
      },
      {
        name: 'Denial of service',
        desc: 'Functions that can be griefed — e.g., looping over an unbounded array or pushing refunds to addresses that revert — making the contract unusable for everyone.',
        fix: 'Use pull-over-push payment patterns and bound or paginate loops.',
      },
      {
        name: 'Bad randomness & logic errors',
        desc: 'On-chain "randomness" derived from block data is predictable; and business-logic bugs (incorrect math, wrong invariants) slip past tests because they are valid code doing the wrong thing.',
        fix: 'Use verifiable randomness sources and write invariant/property tests for economic logic.',
      },
      {
        name: 'Upgrade & proxy pitfalls',
        desc: 'Upgradeable contracts add attack surface: storage collisions, uninitialized implementations, and a compromised admin key that can replace the entire contract.',
        fix: 'Time-lock and multisig upgrades, validate storage layouts, and consider whether you need upgradeability at all.',
      },
    ];

    const faqs = [
      {
        q: 'What is the most common smart contract vulnerability?',
        a: 'Reentrancy is the most famous, but access-control failures and logic errors cause more losses in practice today. Oracle manipulation dominates in DeFi specifically, usually combined with flash loans.',
      },
      {
        q: 'How much do smart contract hacks cost?',
        a: 'Collectively, billions of dollars have been lost to exploits — from the DAO hack in 2016 to DeFi protocol drains and bridge exploits. Individual incidents regularly exceed tens of millions, which is why audits are now standard before launch.',
      },
      {
        q: 'Do I need a professional audit?',
        a: 'If your contract will hold user funds, yes — an external audit is table stakes. But audits do not replace secure development: most audited hacks exploited code outside the audit scope or assumptions the team never documented.',
      },
      {
        q: 'Are Stellar/Soroban contracts vulnerable to the same bugs?',
        a: 'Many classes carry over (access control, oracle trust, logic errors), but Rust\'s memory safety and Soroban\'s design eliminate some EVM-specific vectors like certain reentrancy patterns. The principles — least privilege, checks-effects-interactions, thorough testing — are universal.',
      },
      {
        q: 'How can I learn smart contract security?',
        a: 'Study past exploits (rekt.news post-mortems are a goldmine), practice on wargames like Ethernaut and Damn Vulnerable DeFi, and take a structured course — EduNode\'s Blockchain Security Auditing course walks through vulnerabilities, audit methodology, and tooling.',
      },
    ];

    const articleLd = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: title,
      description:
        'The top smart contract security vulnerabilities — reentrancy, access control, oracle manipulation, flash loans — and the defensive patterns that prevent them.',
      author: { '@type': 'Person', name: 'Olvis Gil', url: 'https://edunode.org' },
      publisher: { '@type': 'Organization', name: 'EduNode', url: 'https://edunode.org' },
      datePublished: '2026-09-25',
      mainEntityOfPage: shareUrl,
    };

    const faqLd = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    };

    return (
      <div style={styles.page}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{title}</title>
          <link rel="canonical" href={shareUrl} />
          <meta
            name="description"
            content="The top smart contract security vulnerabilities — reentrancy, access control, oracle manipulation, flash loans — plus the defensive patterns that prevent them."
          />
          <meta property="og:type" content="article" />
          <meta property="og:title" content={title} />
          <meta
            property="og:description"
            content="Reentrancy, oracle manipulation, flash loans and more — the top smart contract vulnerabilities and how to prevent them."
          />
          <meta property="og:url" content={shareUrl} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={title} />
          <meta
            name="twitter:description"
            content="The top smart contract vulnerabilities and how to prevent them."
          />
          <script type="application/ld+json">{JSON.stringify(articleLd)}</script>
          <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
        </Helmet>

        <NavBar />

        <div style={styles.hero}>
          <SecurityIcon style={styles.heroIcon} />
          <div style={styles.heroText}>
            The bug classes behind billions in exploits — and the patterns that stop them
          </div>
        </div>

        <div style={styles.wrapper}>
          <div style={styles.tag}>Security · Smart Contracts · Auditing</div>
          <h1 style={styles.title}>{title}</h1>
          <div style={styles.meta}>
            <img src={profilePic} style={styles.avatar} alt="Olvis Gil" />
            <span>
              <strong>Olvis Gil</strong> &nbsp;·&nbsp; September 25, 2026 &nbsp;·&nbsp; 11 min read
            </span>
          </div>

          <hr style={styles.divider} />

          <div style={styles.body}>
            <p>
              Smart contracts are immutable programs that custody real money. Once deployed, a bug
              cannot be patched — it can only be exploited. That single fact explains why blockchain
              has produced some of the most expensive software bugs in history, and why security
              auditing is one of the best-paid specializations in the industry. Below are the ten
              vulnerability classes every developer must recognize before shipping code that holds
              value.
            </p>

            <div style={styles.callout}>
              <strong>The mindset shift:</strong> in Web2 a bug costs you a hotfix; in Web3 a bug
              costs your users their funds, permanently and publicly. Write every line assuming an
              attacker with unlimited capital will read it.
            </div>

            <h4 style={styles.h4}>The top 10 vulnerabilities</h4>
            {vulns.map((v, i) => (
              <div key={i} style={styles.vulnCard}>
                <div style={styles.vulnTitle}>
                  {i + 1}. {v.name}
                </div>
                <p style={{ margin: 0, fontSize: '0.95rem', color: '#444' }}>{v.desc}</p>
                <span style={styles.fix}>Prevention: {v.fix}</span>
              </div>
            ))}

            <h4 style={styles.h4}>The patterns that prevent most exploits</h4>
            <p>
              Most real-world exploits are not exotic — they are the same handful of mistakes
              repeated. Three habits eliminate the majority:
            </p>
            <p>
              <strong>Checks-effects-interactions:</strong> validate inputs, update internal state,
              and only then interact with external contracts — in that order.
              <br />
              <strong>Least privilege:</strong> admin functions behind multisig and timelocks; every
              permission is a target.
              <br />
              <strong>Assume hostile inputs:</strong> prices can be manipulated, callbacks can
              re-enter, counterparties can revert. Treat every external dependency as adversarial.
            </p>

            <h4 style={styles.h4}>From developer to auditor</h4>
            <p>
              Security is a skill stack, not a checklist: deep knowledge of the execution environment,
              familiarity with historical exploits, and a systematic review methodology. If you want
              a structured path, EduNode's{' '}
              <a href="https://edunode.org/courses/116" style={styles.refLink}>
                Blockchain Security Auditing course
              </a>{' '}
              covers vulnerability classes, audit methodology, and the tooling professionals use —
              and pairs naturally with{' '}
              <a href="https://edunode.org/courses/113" style={styles.refLink}>
                Advanced Smart Contract Development
              </a>
              . New to contracts entirely? Start with{' '}
              <a href="https://edunode.org/blog/smart-contracts" style={styles.refLink}>
                what smart contracts are
              </a>
              .
            </p>

            <h4 style={styles.h4}>Frequently asked questions</h4>
            {faqs.map((f, i) => (
              <div key={i} style={styles.faqItem}>
                <div style={styles.faqQ}>{f.q}</div>
                <p style={{ margin: 0, fontSize: '0.95rem', color: '#444' }}>{f.a}</p>
              </div>
            ))}

            <h4 style={styles.h4}>References</h4>
            <p>
              [1]{' '}
              <a href="https://consensys.github.io/smart-contract-best-practices/" style={styles.refLink}>
                Smart Contract Security Best Practices — ConsenSys
              </a>
            </p>
            <p>
              [2]{' '}
              <a href="https://owasp.org/www-project-smart-contract-top-10/" style={styles.refLink}>
                OWASP Smart Contract Top 10
              </a>
            </p>
            <p>
              [3]{' '}
              <a href="https://ethernaut.openzeppelin.com/" style={styles.refLink}>
                Ethernaut — Smart Contract Security Wargame
              </a>
            </p>
          </div>

          <div style={styles.shareSection}>
            <div style={styles.shareLabel}>Share this article</div>
            <div style={styles.shareButtons}>
              <FacebookShareButton url={shareUrl} quote={title}>
                <FacebookIcon size={36} round />
              </FacebookShareButton>
              <FacebookShareCount url={shareUrl}>
                {(count) => (count > 0 ? <span style={{ fontSize: '12px', color: '#888' }}>{count}</span> : null)}
              </FacebookShareCount>
              <TwitterShareButton url={shareUrl} title={title}>
                <TwitterIcon size={36} round />
              </TwitterShareButton>
              <LinkedinShareButton url={shareUrl}>
                <LinkedinIcon size={36} round />
              </LinkedinShareButton>
            </div>
          </div>

          <div style={styles.authorCard}>
            <img src={profilePic} style={styles.authorAvatar} alt="Olvis Gil" />
            <div>
              <div style={styles.authorName}>Olvis Gil</div>
              <p style={styles.authorBio}>
                Founder of{' '}
                <a href="https://edunode.org" style={{ color: '#6B48FF' }}>
                  EduNode
                </a>{' '}
                and{' '}
                <a href="https://www.mozartpay.com" style={{ color: '#6B48FF' }}>
                  MozartPay
                </a>
                . Web3 educator, payment technology expert, and ISO standardisation contributor
                based in Vienna, Austria.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
