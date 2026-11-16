import React from 'react';
import { Helmet } from 'react-helmet-async';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import ArticleLayout, { articleStyles as s } from '../Blog/Articles/ArticleLayout';

const shareUrl = 'https://edunode.org/stellar/bell-protocol-30';
const title = 'Bell, Protocol 30 on Stellar: Smart Accounts, Post-Quantum Signatures & Millisecond Ledgers';
const description = 'Stellar’s Bell upgrade (Protocol 30) brings muxed contract addresses for smart accounts, ML-DSA post-quantum signature verification, and millisecond ledger timing. What changes, who must act, and the timeline.';
const image = 'https://edunode.org/og/stellar-bell-protocol-30.png';
const accent = 'linear-gradient(135deg,#0a0e27 0%,#123a5c 55%,#00add8 100%)';
const color = '#00add8';

const faqs = [
  { q: 'What is Bell, Protocol 30?', a: 'The next Stellar network upgrade. It carries three changes: CAP-84 (muxed contract addresses — W addresses — for smart accounts), CAP-87 (ML-DSA post-quantum signature verification inside smart contracts), and CAP-88 (millisecond ledger close times that remove the one-ledger-per-second floor).' },
  { q: 'When does Bell go live?', a: 'Validators voted on testnet on November 3, 2026, and vote on mainnet on November 23, 2026 at 1700 UTC. The upgrade takes effect if validators approve it.' },
  { q: 'What is a W address?', a: 'A new Stellar address type introduced by CAP-84: a contract address carrying a 64-bit ID — the muxed-account pattern applied to smart accounts. Exchanges and custodial products can give every customer a unique deposit address while funds land in one smart account.' },
  { q: 'Does Bell make Stellar post-quantum?', a: 'Not yet for regular accounts. CAP-87 lets smart contracts verify ML-DSA signatures, so contract accounts can opt into quantum-safe authorization. Network transaction signatures remain Ed25519 for now — a native post-quantum signer for classic accounts comes in a future protocol change.' },
  { q: 'Do I need to do anything before the vote?', a: 'Upgrade to the latest Stellar SDK. If your product handles addresses, accept the new W address type for muxed contracts. If you decode raw ledger data without an SDK — indexers, explorers, analytics — update your XDR definitions or decoding breaks at the upgrade.' },
];

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

export default function StellarBellProtocol30() {
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
        heroIcon={<UpgradeIcon style={s.heroIcon} />}
        heroText="Three upgrades in one vote — smart accounts at business scale, quantum-safe foundations, and a path to faster ledgers"
        tag="Stellar · Protocol 30 · Bell"
        title={title}
        date="November 16, 2026"
        readTime="7 min read"
        shareUrl={shareUrl}
        shareTitle={title}
        faqs={faqs}
      >
        <p>
          The next Stellar network upgrade is <strong>Bell — Protocol 30</strong> — and it is
          less a routine bump than three structural moves at once: muxed contract addresses
          that make smart accounts viable at business scale, post-quantum signature
          verification inside contracts, and a millisecond ledger clock that clears the way
          for faster close times. The testnet vote happened November 3, 2026; the mainnet
          vote is <strong>November 23, 2026 at 1700 UTC</strong>. Here is what each CAP does,
          who needs to act, and why it matters — based on the
          <a href="https://stellar.org/blog/developers/introducing-bell-protocol-30-on-stellar" target="_blank" rel="noopener noreferrer">SDF announcement</a> and the
          <a href="https://stellar.org/blog/developers/bell-protocol-30-upgrade-guide" target="_blank" rel="noopener noreferrer">official upgrade guide</a>.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>CAP-84: muxed contract addresses — one smart account, a million customers</h4>
        <p>
          Exchanges and ramps already know muxed accounts: one classic Stellar account plus an
          ID, so every customer gets a unique deposit address while funds land in a single
          account tracked off-chain. Smart accounts — accounts that are contracts, able to set
          their own spending rules like passkeys or policies — had no equivalent: one contract
          per customer, which does not scale. <strong>CAP-84</strong> lets a contract address
          carry a 64-bit ID, written as a new <strong>W</strong> address format (the muxed M,
          upside-down, deliberately distinct so developers always know the type). Payments
          land in the contract as before; the ID rides along in the transfer event so your app
          knows whose balance it was.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>CAP-87: post-quantum signatures arrive inside contracts</h4>
        <p>
          Stellar accounts rely on elliptic-curve signatures a large enough quantum computer
          could eventually break. Nobody has that computer today — but public keys sit on the
          ledger forever, and migrations take years, so the industry starts early.{' '}
          <strong>CAP-87</strong> lets smart contracts verify <strong>ML-DSA</strong>, the NIST
          post-quantum signature standard already shipping in OpenSSL, Java, and AWS KMS.
          Verification runs inside Stellar Core rather than contract code, keeping it cheap
          and implemented once against official test vectors. The honest scope note: this
          protects <em>authorization inside contracts</em> — network transaction signatures
          stay Ed25519 until a future protocol change. It is the first onchain step of
          Stellar’s Quantum Preparedness Plan, not the last word.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>CAP-88: a millisecond clock for the ledger</h4>
        <p>
          Protocol 28 (Adapter) already cut ledger close times to about five seconds.{' '}
          <strong>CAP-88</strong> removes the next wall: ledgers currently record close time
          in whole seconds, so the protocol can never target sub-second intervals. Moving to
          millisecond timing opens the door for future upgrades to push close times lower —
          the Stellar Core team is already testing faster ledgers on experimental branches.
          The catch for builders: this changes the ledger header format, so anything reading
          raw ledger data needs to understand it.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>What you actually need to do</h4>
        <p>
          Most builders have a short list. <strong>Upgrade your Stellar SDK</strong> before the
          mainnet vote — that covers the new ledger format and address types. If your product
          handles addresses, <strong>accept W addresses</strong> for muxed contracts. And if you
          decode raw ledger data without an SDK — an indexer, explorer, or analytics pipeline —{' '}
          <strong>update your XDR definitions or decoding stops working</strong> at the upgrade
          (the previous <code>closeTime</code> field still reports whole seconds; details are
          under “Breaking changes” in the upgrade guide). Validators and infrastructure
          operators should follow the full timeline in the{' '}
          <a href="https://stellar.org/blog/developers/bell-protocol-30-upgrade-guide" target="_blank" rel="noopener noreferrer">upgrade guide</a>.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>Timeline</h4>
        <p>
          <strong>October 16, 2026</strong> — Stellar Core v30.0.0 stable released.{' '}
          <strong>October 16–23</strong> — infrastructure and SDK releases followed.{' '}
          <strong>November 3, 2026</strong> — testnet upgrade vote (done).{' '}
          <strong>November 23, 2026, 1700 UTC</strong> — mainnet vote; the upgrade takes
          effect if approved. Dates can shift — coordination happens in the #protocol-next
          channel of the Stellar Developer Discord.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>Keep learning</h4>
        <p>
          <a href="https://stellar.org/blog/developers/introducing-bell-protocol-30-on-stellar" target="_blank" rel="noopener noreferrer">SDF: Introducing Bell, Protocol 30</a> ·
          <a href="https://stellar.org/blog/developers/bell-protocol-30-upgrade-guide" target="_blank" rel="noopener noreferrer"> Bell, Protocol 30 Upgrade Guide</a> ·
          <a href="https://github.com/stellar/stellar-protocol/blob/master/core/cap-0084.md" target="_blank" rel="noopener noreferrer"> CAP-84</a> ·
          <a href="https://github.com/stellar/stellar-protocol/blob/master/core/cap-0087.md" target="_blank" rel="noopener noreferrer"> CAP-87</a> ·
          <a href="https://github.com/stellar/stellar-protocol/blob/master/core/cap-0088.md" target="_blank" rel="noopener noreferrer"> CAP-88</a> ·
          <a href="/stellar">Stellar hub</a> ·
          <a href="/stellar/proof-of-agreement">How Stellar consensus works</a> ·
          <a href="/glossary/soroban">Soroban glossary</a> ·
          <a href="/masterclasses/stellar-network-development">Stellar Network masterclass</a>
        </p>
      </ArticleLayout>
    </>
  );
}
