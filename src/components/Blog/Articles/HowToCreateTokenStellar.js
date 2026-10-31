import React from 'react';
import { Helmet } from 'react-helmet-async';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ArticleLayout, { articleStyles as s } from './ArticleLayout';

const shareUrl = 'https://edunode.org/blog/how-to-create-a-token-on-stellar';
const title = 'How to Create a Token on Stellar: Issuer, Trustlines, and Distribution';
const description = 'Step-by-step: issue a custom asset on the Stellar network — create issuing and distribution accounts, set trustlines, authorize holders, and configure flags like auth_required.';
const image = 'https://edunode.org/og/how-to-create-a-token-on-stellar.png';
const accent = 'linear-gradient(135deg,#04121f 0%,#0b3d5c 55%,#00add8 100%)';
const color = '#00add8';

const faqs = [{ q: 'How much does it cost to issue a token on Stellar?', a: 'Almost nothing — an issuing account plus a distribution account needs a few XLM in reserve (0.5 XLM base reserve per account and per trustline), and each operation costs a tiny fraction of a cent.' }, { q: 'Do token holders need my permission to hold my asset?', a: 'Only if you set the auth_required flag on your issuing account. With it, holders must open a trustline AND you must approve each one — the pattern regulated stablecoins use. Without it, anyone can hold your asset.' }, { q: 'What is the difference between a Stellar asset and a Soroban token?', a: 'Classic Stellar assets are the payments-focused standard covered here: simple, fast, exchange-ready. Soroban tokens are smart contracts (SEP-41 compatible) for programmable logic. Most payment assets are still issued classically.' }, { q: 'Can I freeze or revoke tokens?', a: 'Yes — the auth_revocable flag lets the issuer freeze trustlines or claw back balances (clawbacks, added in 2021). Required for many regulated issuers; use it deliberately.' }];

const articleLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: title,
  description,
  image,
  url: shareUrl,
  author: { '@type': 'Person', name: 'Olvis Gil' },
  publisher: { '@type': 'Organization', name: 'EduNode', url: 'https://edunode.org' },
  mainEntityOfPage: shareUrl,
};

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
};

export default function HowToCreateTokenStellar() {
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
        heroIcon={<AddCircleIcon style={s.heroIcon} />}
        heroText="Any asset you can describe, issued in minutes"
        tag="Stellar · Tokens · Tutorial"
        title={title}
        date="October 31, 2026"
        readTime="9 min read"
        shareUrl={shareUrl}
        shareTitle={title}
        faqs={faqs}
      >
        <p>
          Stellar was built for asset issuance: creating a token is a protocol-level operation, not
          a smart contract. In minutes you can issue a stablecoin, loyalty point, or game token that
          trades on the Stellar DEX and works with every Stellar wallet. Here is the full flow.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>1. Create two accounts</h4>
        <p>
          Use separate <strong>issuing</strong> and <strong>distribution</strong> accounts — best
          practice since the issuing account should stay cold. The issuing account defines the
          asset (e.g., <em>MYCoin:GBLA…XYZ</em>); the distribution account receives supply and pays
          it out. Generate both on testnet first via the
          <a href="https://laboratory.stellar.org" target="_blank" rel="noopener noreferrer">Stellar Laboratory</a>.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>2. Open a trustline from distribution to issuer</h4>
        <p>
          Stellar accounts can only hold assets they explicitly trust. From the distribution account,
          submit a <em>Change Trust</em> operation for your new asset code and issuing address. This
          costs a 0.5 XLM base reserve.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>3. Issue the supply</h4>
        <p>
          From the issuing account, send a <em>Payment</em> of your asset to the distribution
          account — that payment <em>is</em> the minting. Whatever amount you send becomes the
          circulating supply (you can issue more later by repeating it, unless you lock the issuer).
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>4. Configure issuer flags</h4>
        <p>
          Key flags on the issuing account: <strong>auth_required</strong> (holders must be approved
          — what regulated stablecoins use), <strong>auth_revocable</strong> (freeze/claw back
          trustlines), and <strong>auth_immutable</strong> (lock all flags forever — maximum
          decentralization, no take-backs).
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>5. Publish metadata and distribute</h4>
        <p>
          Host a <code>stellar.toml</code> at your domain's <code>.well-known</code> path describing
          the asset (this is also what the official Stellar ecosystem directory requires). Then
          distribute: payments to holders (who open trustlines), sell on the Stellar DEX, or route
          through anchors for fiat on/off-ramps.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>Keep learning</h4>
        <p>
          <a href="/blog/issue-asset-on-stellar">Original issuing guide</a> ·
          <a href="/glossary/trustline">What is a trustline?</a> ·
          <a href="/glossary/anchors">What are anchors?</a> ·
          <a href="/stellar">Stellar hub</a> ·
          <a href="/masterclasses/stellar-network-development">Stellar Network masterclass</a>
        </p>
      </ArticleLayout>
    </>
  );
}
