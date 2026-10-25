import React from 'react';
import { Helmet } from 'react-helmet-async';
import SendIcon from '@material-ui/icons/Send';
import ArticleLayout, { articleStyles as s } from './ArticleLayout';

const shareUrl = 'https://edunode.org/blog/usdc-on-stellar';
const title = 'USDC on Stellar: Fast, Cheap Dollar Payments Explained';
const description = 'How native USDC works on the Stellar network — trustlines, anchors, sub-cent fees, five-second settlement, and how to hold and send digital dollars.';
const image = 'https://edunode.org/og/usdc-on-stellar.png';
const accent = 'linear-gradient(135deg, #063a2c 0%, #0a7d5c 55%, #00c389 100%)';
const color = '#0a7d5c';

const faqs = [
  {
    q: 'Is USDC on Stellar real USDC?',
    a: 'Yes. Circle issues USDC natively on Stellar — it is the same regulated, fully-reserved dollar stablecoin as on Ethereum, redeemable 1:1 through Circle. It is not a wrapped or bridged version.',
  },
  {
    q: 'How much does it cost to send USDC on Stellar?',
    a: 'A fraction of a cent — Stellar transaction fees are measured in stroops (millionths of an XLM) and typically total less than $0.001 per payment, versus dollars in gas on Ethereum.',
  },
  {
    q: 'What do I need to hold USDC on Stellar?',
    a: 'A Stellar wallet (such as Freighter), a small XLM balance for the account reserve, and a trustline to the USDC asset issued by Circle. Trustlines are how Stellar prevents unwanted assets being sent to your account.',
  },
  {
    q: 'How do I get USDC onto Stellar?',
    a: 'Buy it on an exchange and withdraw to your Stellar address, or deposit dollars through a Stellar anchor — regulated on/off-ramps that convert bank deposits into on-chain USDC using standards like SEP-24.',
  },
];

const articleLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: title,
  description,
  author: { '@type': 'Person', name: 'Olvis Gil', url: 'https://edunode.org' },
  publisher: { '@type': 'Organization', name: 'EduNode', url: 'https://edunode.org' },
  datePublished: '2026-10-25',
  image,
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

export default function UsdcOnStellar() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <link rel="canonical" href={shareUrl} />
        <meta name="description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={shareUrl} />
        <meta property="og:image" content={image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        <script type="application/ld+json">{JSON.stringify(articleLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
      </Helmet>
      <ArticleLayout
        accent={accent}
        color={color}
        heroIcon={<SendIcon style={s.heroIcon} />}
        heroText="The regulated digital dollar on a network built for moving money"
        tag="Stellar · USDC · Payments"
        title={title}
        date="October 25, 2026"
        readTime="9 min read"
        shareUrl={shareUrl}
        shareTitle={title}
        faqs={faqs}
      >
        <p>
          USDC on Stellar is the full, regulated dollar stablecoin — issued natively by Circle — running
          on a network purpose-built for payments. Where moving USDC on Ethereum can cost several
          dollars in gas and take minutes to finalize, a Stellar USDC payment settles in about five
          seconds for less than a thousandth of a cent. That combination — a compliant digital dollar
          on near-free rails — is why Stellar hosts a large share of the world's real-world stablecoin
          payment volume.
        </p>

        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>Native, not wrapped</h4>
        <p>
          This distinction matters more than it sounds. Many chains hold USDC only through bridges —
          tokens that represent a claim on USDC locked elsewhere, adding a bridge operator (and its
          hack history) to your trust assumptions. On Stellar, Circle issues USDC directly as a Stellar
          asset. The token in your wallet is Circle's liability — the same asset you could redeem for a
          dollar — not a third party's IOU.
        </p>

        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>How holding it works: trustlines and reserves</h4>
        <p>
          Stellar accounts cannot receive arbitrary assets. Before holding USDC you add a
          <strong> trustline</strong> — an explicit opt-in naming the asset and its issuer (Circle's
          Stellar issuing account). Trustlines exist so spam or fraudulent assets cannot simply appear
          in your wallet. Each trustline adds a small amount to your account's base reserve in XLM —
          locked, not spent — which is returned if you remove the trustline.
        </p>

        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>Getting dollars on and off: anchors</h4>
        <p>
          Anchors are Stellar's bridge to the banking system — regulated entities that accept fiat
          deposits and issue matching tokens (or redeem tokens back to your bank). Standards like
          SEP-24 give wallets a uniform way to offer deposit and withdrawal flows through anchors, so a
          user in Nigeria or Argentina can move between bank money and USDC without touching an
          exchange. This is the infrastructure behind Stellar-based remittance and aid-disbursement
          programs.
        </p>

        <div style={s.callout}>
          <strong>Why developers pick Stellar for USDC:</strong> native issuance, ~5-second finality,
          sub-cent fees, built-in DEX and path payments (send USDC, deliver EURC), protocol-level
          liquidity pools, and Soroban smart contracts when you need programmability — a payments stack
          that most general-purpose chains bolt on later.
        </div>

        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>Stellar vs Ethereum for USDC payments</h4>
        <table style={s.table}>
          <thead>
            <tr><th style={s.th}></th><th style={s.th}>Stellar</th><th style={s.th}>Ethereum</th></tr>
          </thead>
          <tbody>
            <tr><td style={s.td}><strong>Typical fee</strong></td><td style={s.td}>Under $0.001</td><td style={s.td}>$0.50–$10+ (gas-dependent)</td></tr>
            <tr><td style={s.td}><strong>Finality</strong></td><td style={s.td}>~5 seconds</td><td style={s.td}>~15 seconds per block; minutes for strong finality</td></tr>
            <tr><td style={s.td}><strong>USDC type</strong></td><td style={s.td}>Native (Circle-issued)</td><td style={s.td}>Native (Circle-issued)</td></tr>
            <tr><td style={s.td}><strong>Best for</strong></td><td style={s.td}>Payments, remittances, micro-transfers, aid</td><td style={s.td}>DeFi depth, composability, largest liquidity</td></tr>
          </tbody>
        </table>

        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>What you can do with it</h4>
        <div style={s.card}>
          <div style={{ ...s.cardTitle, color }}>Send money across borders</div>
          Remittances that arrive in seconds for under a cent — the use case that made Stellar's name,
          now carrying regulated dollars instead of volatile tokens.
        </div>
        <div style={s.card}>
          <div style={{ ...s.cardTitle, color }}>Hold dollar savings</div>
          In high-inflation economies, a USDC balance in a self-custody wallet is accessible digital
          dollar savings without a US bank account.
        </div>
        <div style={s.card}>
          <div style={{ ...s.cardTitle, color }}>Build payment products</div>
          Horizon's API, Freighter wallets, anchor rails, and Soroban contracts let developers wire
          USDC into payroll, disbursements, and checkout flows.
        </div>
        <div style={s.card}>
          <div style={{ ...s.cardTitle, color }}>Trade and provide liquidity</div>
          Swap USDC against XLM or other assets on Stellar's built-in DEX and liquidity pools, or earn
          fees as a liquidity provider.
        </div>

        <p>
          Go deeper in the <a href="/stablecoins" style={{ color }}>stablecoins hub</a> — compare{' '}
          <a href="/blog/usdc-vs-usdt" style={{ color }}>USDC vs USDT</a>, understand{' '}
          <a href="/blog/how-stablecoins-work" style={{ color }}>how the peg mechanism works</a>, or build
          on Stellar with the{' '}
          <a href="/masterclasses/stellar-network-development" style={{ color }}>Stellar Network masterclass</a>{' '}
          and the <a href="/courses/103" style={{ color }}>Anchors course</a>.
        </p>
      </ArticleLayout>
    </>
  );
}
