import React, { Component } from 'react';
import NavBar from '../../NavBar';
import profilePicImg from '../mepic.png';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
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
    background: 'linear-gradient(135deg, #2b1d00 0%, #8a5a00 55%, #f0b429 100%)',
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
    background: 'linear-gradient(135deg, #8a5a00, #f0b429)',
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
    border: '2px solid #8a5a00',
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
    borderBottom: '3px solid #8a5a00',
    display: 'inline-block',
  },
  callout: {
    background: 'linear-gradient(135deg, #fff8e8, #fff3d6)',
    borderLeft: '4px solid #b8860b',
    borderRadius: '8px',
    padding: '16px 20px',
    margin: '24px 0',
    fontSize: '1rem',
    color: '#2d2d3a',
    lineHeight: '1.7',
  },
  assetCard: {
    background: '#fff',
    border: '1px solid #e4e8f0',
    borderRadius: '12px',
    padding: '16px 20px',
    marginBottom: '12px',
    boxShadow: '0 2px 8px rgba(184,134,11,0.08)',
  },
  assetTitle: {
    fontWeight: '700',
    color: '#8a5a00',
    marginBottom: '4px',
    fontSize: '1rem',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    margin: '20px 0',
    fontSize: '0.95rem',
    background: '#fff',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(184,134,11,0.08)',
  },
  th: {
    background: '#2b1d00',
    color: '#fff',
    textAlign: 'left',
    padding: '12px 14px',
    fontSize: '0.85rem',
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
  },
  td: {
    padding: '12px 14px',
    borderTop: '1px solid #e4e8f0',
    color: '#2d2d3a',
    verticalAlign: 'top',
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
    color: '#8a5a00',
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
    boxShadow: '0 4px 20px rgba(184,134,11,0.1)',
  },
  authorAvatar: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '3px solid #8a5a00',
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

export default class RWA extends Component {
  render() {
    const shareUrl = 'https://edunode.org/blog/rwa-tokenization';
    const title = 'Real-World Asset (RWA) Tokenization Explained: How Trillions Are Moving On-Chain';
    const profilePic = profilePicImg;

    const assetClasses = [
      {
        name: 'Government bonds & treasuries',
        desc: 'Tokenized US Treasuries are the breakout RWA category — funds like Franklin Templeton\'s BENJI on Stellar let investors hold government securities as on-chain tokens with daily yield accrual.',
      },
      {
        name: 'Real estate',
        desc: 'Property is divided into fractional tokens, letting investors buy a small share of a building and earn proportional rental income without buying the whole asset.',
      },
      {
        name: 'Stablecoins & fiat',
        desc: 'Fiat-backed stablecoins are technically the largest RWA category — tokenized claims on bank deposits and treasuries. See our guide to stablecoins for the deep dive.',
      },
      {
        name: 'Commodities',
        desc: 'Gold (PAXG), carbon credits, and agricultural goods tokenized for 24/7 trading and fractional ownership.',
      },
      {
        name: 'Private credit & invoices',
        desc: 'SME loans and invoices financed on-chain, opening private credit markets to global capital pools.',
      },
      {
        name: 'Collectibles & IP',
        desc: 'Art, luxury goods, and intellectual property represented as tokens with fractional ownership and royalty streams.',
      },
    ];

    const faqs = [
      {
        q: 'What is RWA tokenization?',
        a: 'RWA (real-world asset) tokenization is the process of representing ownership of a physical or traditional financial asset — like real estate, bonds, or gold — as a digital token on a blockchain. The token is a legally enforceable claim on the underlying asset.',
      },
      {
        q: 'How big is the tokenization market?',
        a: 'Tokenized treasuries, credit, and funds already exceed tens of billions of dollars on-chain, and major institutions (BlackRock, Franklin Templeton, Fidelity) are actively issuing tokenized products. Analysts project the sector could reach trillions within the decade.',
      },
      {
        q: 'Is tokenized ownership legally recognized?',
        a: 'In most live products, yes — a regulated legal entity (often an SPV or fund) holds the asset, and the token represents shares in that structure. The token itself is the claim; the legal wrapper makes it enforceable. Jurisdiction matters, which is why most RWAs launch under established securities frameworks.',
      },
      {
        q: 'Which blockchain is used for RWA?',
        a: 'Stellar and Ethereum host most institutional RWA activity. Stellar is popular with asset managers because of built-in asset controls (freeze/clawback for compliance), low fees, and fast finality — Franklin Templeton\'s on-chain money fund BENJI runs on it.',
      },
      {
        q: 'What are the risks of RWA tokens?',
        a: 'Key risks include: relying on the issuer\'s legal structure and custody, smart contract bugs, oracle/data integrity, low liquidity in secondary markets, and evolving regulation. The token is only as strong as the legal claim behind it.',
      },
    ];

    const articleLd = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: title,
      description:
        'Real-world asset (RWA) tokenization explained: how treasuries, real estate, and commodities move on-chain, and why Stellar leads institutional tokenization.',
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
            content="RWA tokenization explained: how real-world assets like treasuries, real estate, and gold become blockchain tokens, and why Stellar leads institutional tokenization."
          />
          <meta property="og:type" content="article" />
          <meta property="og:title" content={title} />
          <meta
            property="og:description"
            content="How real-world assets become blockchain tokens — treasuries, real estate, gold — and why Stellar leads institutional tokenization."
          />
          <meta property="og:url" content={shareUrl} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={title} />
          <meta
            name="twitter:description"
            content="How real-world assets become blockchain tokens — and why Stellar leads institutional tokenization."
          />
          <script type="application/ld+json">{JSON.stringify(articleLd)}</script>
          <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
        </Helmet>

        <NavBar />

        <div style={styles.hero}>
          <AccountBalanceIcon style={styles.heroIcon} />
          <div style={styles.heroText}>
            Bonds, buildings, and gold — as programmable tokens you can hold in a wallet
          </div>
        </div>

        <div style={styles.wrapper}>
          <div style={styles.tag}>RWA · Tokenization · Stellar</div>
          <h1 style={styles.title}>{title}</h1>
          <div style={styles.meta}>
            <img src={profilePic} style={styles.avatar} alt="Olvis Gil" />
            <span>
              <strong>Olvis Gil</strong> &nbsp;·&nbsp; September 25, 2026 &nbsp;·&nbsp; 9 min read
            </span>
          </div>

          <hr style={styles.divider} />

          <div style={styles.body}>
            <p>
              Real-world asset (RWA) tokenization means representing ownership of a physical or
              traditional financial asset — a bond, a building, a bar of gold — as a token on a
              blockchain. The token is a legally backed claim on the underlying asset that can be
              held in a wallet, traded 24/7, and programmed into financial applications. It is the
              sector where blockchain is quietly merging with traditional finance: BlackRock,
              Franklin Templeton, and Fidelity all run live tokenized products today.
            </p>

            <div style={styles.callout}>
              <strong>Simple example:</strong> a $100 million office building can be split into one
              million tokens at $100 each. Token holders own a proportional claim on the property and
              its rental income — ownership that previously required buying the whole building or
              going through a fund with high minimums.
            </div>

            <h4 style={styles.h4}>How tokenization actually works</h4>
            <p>
              Tokenization is not just "putting an asset on-chain" — it is a legal and technical
              pipeline:
            </p>
            <p>
              <strong>1. Legal structuring</strong> — a regulated entity (SPV, trust, or fund) takes
              custody of the asset and defines what token holders are entitled to.
              <br />
              <strong>2. Issuance</strong> — tokens are minted on a blockchain representing shares in
              that structure, with compliance rules (KYC'd holders, transfer restrictions) embedded.
              <br />
              <strong>3. Distribution & trading</strong> — tokens are sold to investors and can trade
              on secondary markets around the clock.
              <br />
              <strong>4. Servicing</strong> — dividends, interest, or rent flows to token holders,
              often automatically via{' '}
              <a href="https://edunode.org/blog/smart-contracts" style={styles.refLink}>
                smart contracts
              </a>
              .
            </p>

            <h4 style={styles.h4}>What gets tokenized?</h4>
            {assetClasses.map((a, i) => (
              <div key={i} style={styles.assetCard}>
                <div style={styles.assetTitle}>
                  {i + 1}. {a.name}
                </div>
                <p style={{ margin: 0, fontSize: '0.95rem', color: '#444' }}>{a.desc}</p>
              </div>
            ))}

            <h4 style={styles.h4}>Why institutions are choosing this</h4>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Traditional asset</th>
                  <th style={styles.th}>Tokenized asset</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={styles.td}>Settlement in days (T+1/T+2), business hours only</td>
                  <td style={styles.td}>Settlement in seconds, 24/7/365</td>
                </tr>
                <tr>
                  <td style={styles.td}>High minimums, limited investor access</td>
                  <td style={styles.td}>Fractional ownership from small amounts</td>
                </tr>
                <tr>
                  <td style={styles.td}>Illiquid — selling a building takes months</td>
                  <td style={styles.td}>Tokens can trade on secondary markets instantly</td>
                </tr>
                <tr>
                  <td style={styles.td}>Manual compliance and reconciliation</td>
                  <td style={styles.td}>Rules enforced programmatically at the asset level</td>
                </tr>
                <tr>
                  <td style={styles.td}>Opaque cap tables and paper records</td>
                  <td style={styles.td}>Transparent, auditable ownership ledger</td>
                </tr>
              </tbody>
            </table>

            <h4 style={styles.h4}>RWA on Stellar</h4>
            <p>
              Stellar has become a leading network for institutional tokenization. Its native asset
              model lets issuers bake compliance directly into tokens — requiring trustlines,
              authorizing holders, and enabling clawbacks where regulation demands it — without
              custom contract code. The flagship example is <strong>Franklin Templeton's BENJI</strong>,
              the first US-registered mutual fund to use a public blockchain as its official record of
              share ownership, running on Stellar. Money market funds, euro-denominated assets like
              EURC, and yield-bearing tokens from issuers across the ecosystem have followed.
            </p>
            <p>
              Issuing a tokenized asset on Stellar is something you can try yourself — see{' '}
              <a href="https://edunode.org/blog/How-to-issue" style={styles.refLink}>
                how to issue an asset on Stellar
              </a>{' '}
              and the{' '}
              <a href="https://edunode.org/courses/103" style={styles.refLink}>
                Anchors course
              </a>{' '}
              for how regulated issuers connect fiat rails to the network.
            </p>

            <h4 style={styles.h4}>Challenges ahead</h4>
            <p>
              The hard problems in RWA are mostly off-chain: legal enforceability across
              jurisdictions, reliable custody of the underlying asset, oracle integrity for
              valuations, thin secondary-market liquidity, and regulation that differs by country.
              The technology is largely solved — the legal plumbing is what takes time.
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
              <a href="https://stellar.org/learn/real-world-assets-on-stellar" style={styles.refLink}>
                Real-World Assets on Stellar — stellar.org
              </a>
            </p>
            <p>
              [2]{' '}
              <a href="https://www.rwa.xyz" style={styles.refLink}>
                RWA.xyz — Tokenization market data
              </a>
            </p>
            <p>
              [3]{' '}
              <a href="https://edunode.org/blog/what-is-a-stablecoin" style={styles.refLink}>
                What Is a Stablecoin? — EduNode
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
