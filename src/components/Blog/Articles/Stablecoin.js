import React, { Component } from 'react';
import NavBar from '../../NavBar';
import profilePicImg from '../mepic.png';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
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
    background: 'linear-gradient(135deg, #063a2c 0%, #0a7d5c 55%, #00c389 100%)',
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
    background: 'linear-gradient(135deg, #0a7d5c, #00c389)',
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
    border: '2px solid #0a7d5c',
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
    borderBottom: '3px solid #0a7d5c',
    display: 'inline-block',
  },
  callout: {
    background: 'linear-gradient(135deg, #e8fff5, #e8f7ff)',
    borderLeft: '4px solid #0a7d5c',
    borderRadius: '8px',
    padding: '16px 20px',
    margin: '24px 0',
    fontSize: '1rem',
    color: '#2d2d3a',
    lineHeight: '1.7',
  },
  typeCard: {
    background: '#fff',
    border: '1px solid #e4e8f0',
    borderRadius: '12px',
    padding: '16px 20px',
    marginBottom: '12px',
    boxShadow: '0 2px 8px rgba(10,125,92,0.07)',
  },
  typeTitle: {
    fontWeight: '700',
    color: '#0a7d5c',
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
    boxShadow: '0 2px 8px rgba(10,125,92,0.07)',
  },
  th: {
    background: '#063a2c',
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
    color: '#0a7d5c',
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
    boxShadow: '0 4px 20px rgba(10,125,92,0.08)',
  },
  authorAvatar: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '3px solid #0a7d5c',
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

export default class Stablecoin extends Component {
  render() {
    const shareUrl = 'https://edunode.org/blog/what-is-a-stablecoin';
    const title = 'What Is a Stablecoin? How USDC and Stablecoins Work on Stellar';
    const profilePic = profilePicImg;

    const types = [
      {
        name: 'Fiat-backed stablecoins',
        desc: 'Each token is backed 1:1 by cash or cash equivalents (like short-term US Treasuries) held in reserve by the issuer. USDC (Circle) and USDT (Tether) are the dominant examples. This is the most widely used and most regulated model.',
      },
      {
        name: 'Crypto-collateralized stablecoins',
        desc: 'Backed by other cryptocurrencies locked in smart contracts, usually over-collateralized (e.g., $150 of ETH backing $100 of stablecoin) to absorb price swings. DAI is the best-known example.',
      },
      {
        name: 'Commodity-backed stablecoins',
        desc: 'Pegged to physical assets like gold (PAXG) — each token represents a claim on a specific amount of the commodity held in custody.',
      },
      {
        name: 'Algorithmic stablecoins',
        desc: 'Maintain their peg through supply-and-demand algorithms rather than reserves. This model proved fragile — the 2022 collapse of TerraUSD (UST), which erased roughly $40B in days, remains the definitive cautionary tale.',
      },
    ];

    const faqs = [
      {
        q: 'What is a stablecoin in simple terms?',
        a: 'A stablecoin is a cryptocurrency designed to hold a steady value — usually pegged 1:1 to a fiat currency like the US dollar. It combines the stability of traditional money with the speed and programmability of blockchain.',
      },
      {
        q: 'Are stablecoins safe?',
        a: 'Fiat-backed stablecoins from regulated issuers like Circle (USDC) publish regular reserve attestations and are considered the safest. Risks remain: depegging, issuer insolvency, and regulatory change. Algorithmic stablecoins have historically been the riskiest.',
      },
      {
        q: 'What is the difference between USDC and USDT?',
        a: 'Both are dollar-pegged fiat-backed stablecoins. USDC (Circle) is known for transparency with regular attestations and US regulatory alignment; USDT (Tether) is larger by volume but has faced more scrutiny over its reserves. Both are available on Stellar.',
      },
      {
        q: 'Why use stablecoins instead of a bank transfer?',
        a: 'Stablecoin transfers settle in seconds, work 24/7/365, cost a fraction of a cent on networks like Stellar, and are programmable — you can build them into apps, payroll, remittances, and DeFi. Bank wires take days and close on weekends.',
      },
      {
        q: 'Can stablecoins lose their peg?',
        a: 'Yes. "Depegging" happens when market price drifts from the intended value. Even USDC briefly traded near $0.87 during the 2023 Silicon Valley Bank crisis before recovering. Diversification and choosing transparent issuers mitigates this risk.',
      },
    ];

    const articleLd = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: title,
      description:
        'What is a stablecoin? How fiat-backed, crypto-collateralized, and algorithmic stablecoins work, and why USDC on Stellar is used for payments and remittances.',
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
            content="What is a stablecoin? Learn how fiat-backed, crypto-collateralized, and algorithmic stablecoins work, and why USDC on Stellar powers global payments and remittances."
          />
          <meta property="og:type" content="article" />
          <meta property="og:title" content={title} />
          <meta
            property="og:description"
            content="How stablecoins work, the different types, and why USDC on Stellar powers global payments and remittances."
          />
          <meta property="og:url" content={shareUrl} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={title} />
          <meta
            name="twitter:description"
            content="How stablecoins work and why USDC on Stellar powers global payments and remittances."
          />
          <script type="application/ld+json">{JSON.stringify(articleLd)}</script>
          <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
        </Helmet>

        <NavBar />

        <div style={styles.hero}>
          <MonetizationOnIcon style={styles.heroIcon} />
          <div style={styles.heroText}>
            The bridge between traditional money and the blockchain economy
          </div>
        </div>

        <div style={styles.wrapper}>
          <div style={styles.tag}>Stellar · Payments · USDC</div>
          <h1 style={styles.title}>{title}</h1>
          <div style={styles.meta}>
            <img src={profilePic} style={styles.avatar} alt="Olvis Gil" />
            <span>
              <strong>Olvis Gil</strong> &nbsp;·&nbsp; September 25, 2026 &nbsp;·&nbsp; 8 min read
            </span>
          </div>

          <hr style={styles.divider} />

          <div style={styles.body}>
            <p>
              A stablecoin is a cryptocurrency designed to maintain a stable value by being pegged to
              an external asset — most commonly a fiat currency like the US dollar. While Bitcoin and
              Ethereum swing 10% in a day, a well-designed stablecoin holds its peg, making it usable
              for payments, savings, and commerce. Stablecoins have grown into a market worth
              hundreds of billions of dollars and now settle more value annually than many traditional
              payment networks.
            </p>

            <h4 style={styles.h4}>Why do stablecoins matter?</h4>
            <p>
              Volatility is the reason most people never spend crypto. Stablecoins solve that: they
              behave like digital dollars or euros that can move at blockchain speed. That unlocks
              real use cases — cross-border remittances that settle in seconds for under a cent,
              dollar savings for people in high-inflation economies, 24/7 settlement for businesses,
              and the base currency of nearly all DeFi.
            </p>

            <div style={styles.callout}>
              <strong>In one sentence:</strong> a stablecoin is a token that mirrors the price of a
              stable asset, so you get the utility of a blockchain without the price swings of a
              typical cryptocurrency.
            </div>

            <h4 style={styles.h4}>The four types of stablecoins</h4>
            {types.map((t, i) => (
              <div key={i} style={styles.typeCard}>
                <div style={styles.typeTitle}>
                  {i + 1}. {t.name}
                </div>
                <p style={{ margin: 0, fontSize: '0.95rem', color: '#444' }}>{t.desc}</p>
              </div>
            ))}

            <h4 style={styles.h4}>How fiat-backed stablecoins work (USDC example)</h4>
            <p>
              USDC is issued by Circle, a US-regulated financial company. When a customer deposits one
              US dollar, one USDC is minted; when they redeem, the USDC is burned and the dollar is
              returned. Circle holds reserves in cash and short-duration US Treasuries and publishes
              regular third-party attestations. The token itself is just a representation of that
              claim — which is why reserve transparency is the single most important factor in
              trusting any fiat-backed stablecoin.
            </p>

            <h4 style={styles.h4}>Stablecoins on Stellar</h4>
            <p>
              Stellar was designed for exactly this: issuing and moving value. Its built-in asset
              model means stablecoins are first-class citizens of the network, not contract tokens —
              they settle in ~5 seconds with fees around 0.00001 XLM.
            </p>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Stablecoin</th>
                  <th style={styles.th}>Issuer</th>
                  <th style={styles.th}>Peg</th>
                  <th style={styles.th}>Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={styles.td}><strong>USDC</strong></td>
                  <td style={styles.td}>Circle</td>
                  <td style={styles.td}>USD</td>
                  <td style={styles.td}>The largest regulated stablecoin natively on Stellar</td>
                </tr>
                <tr>
                  <td style={styles.td}><strong>EURC</strong></td>
                  <td style={styles.td}>Circle</td>
                  <td style={styles.td}>EUR</td>
                  <td style={styles.td}>MiCA-compliant euro stablecoin</td>
                </tr>
                <tr>
                  <td style={styles.td}><strong>NGNT / ARST / others</strong></td>
                  <td style={styles.td}>Stellar anchors</td>
                  <td style={styles.td}>Local currencies</td>
                  <td style={styles.td}>Regional stablecoins issued via the anchor network</td>
                </tr>
              </tbody>
            </table>
            <p>
              The anchor network is Stellar's secret weapon: regulated financial institutions
              (anchors) issue fiat-backed tokens and provide cash-in/cash-out points. The MoneyGram
              integration, for example, lets users convert USDC to physical cash at hundreds of
              thousands of locations worldwide — no bank account required. Learn how assets are
              issued in our{' '}
              <a href="https://edunode.org/blog/How-to-issue" style={styles.refLink}>
                guide to issuing an asset on Stellar
              </a>
              .
            </p>

            <h4 style={styles.h4}>Risks to understand</h4>
            <p>
              <strong>Depeg risk</strong> — market stress can push a stablecoin off its peg; even USDC
              briefly depegged when part of its reserves were caught in the Silicon Valley Bank
              failure. <strong>Counterparty risk</strong> — fiat-backed coins are only as sound as
              their issuer's reserves and redemption guarantees. <strong>Regulatory risk</strong> —
              rules like the EU's MiCA framework and US stablecoin legislation are reshaping which
              coins can operate where. And <strong>model risk</strong> — purely algorithmic designs
              have repeatedly failed under stress.
            </p>

            <h4 style={styles.h4}>What can you build with stablecoins?</h4>
            <p>
              Because they are programmable, stablecoins are building blocks: remittance apps,
              payroll in USDC,{' '}
              <a href="https://edunode.org/blog/automated-market-maker" style={styles.refLink}>
                liquidity pools and AMMs
              </a>
              , lending markets, and{' '}
              <a href="https://edunode.org/blog/smart-contracts" style={styles.refLink}>
                smart contract
              </a>{' '}
              applications that need a stable unit of account. If you want hands-on practice, the{' '}
              <a href="https://edunode.org/courses/103" style={styles.refLink}>
                Anchors course
              </a>{' '}
              covers exactly how fiat on- and off-ramps work on Stellar.
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
              <a href="https://www.circle.com/usdc" style={styles.refLink}>
                USDC — Circle
              </a>
            </p>
            <p>
              [2]{' '}
              <a href="https://stellar.org/learn/intro-to-stellar" style={styles.refLink}>
                Intro to Stellar — stellar.org
              </a>
            </p>
            <p>
              [3]{' '}
              <a href="https://stellar.org/learn/anchors" style={styles.refLink}>
                Stellar Anchors — stellar.org
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
