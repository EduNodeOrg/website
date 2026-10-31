import React from 'react';
import { Helmet } from 'react-helmet-async';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ArticleLayout, { articleStyles as s } from './ArticleLayout';

const shareUrl = 'https://edunode.org/blog/custodial-vs-non-custodial-wallets';
const title = 'Custodial vs Non-Custodial Wallets — and What "Recoverable" Means';
const description = 'Who holds the keys decides who owns the crypto. Custodial vs non-custodial wallets explained, cold storage vs hot wallets, and how recoverable smart wallets fix the seed-phrase problem.';
const image = 'https://edunode.org/og/custodial-vs-non-custodial-wallets.png';
const accent = 'linear-gradient(135deg,#0d1526 0%,#14324a 50%,#2d9cdb 100%)';
const color = '#2d9cdb';

const faqs = [{ q: 'What is the difference between custodial and non-custodial wallets?', a: 'A custodial wallet is run by a company that holds your private keys — like a bank account for crypto. A non-custodial wallet puts keys in your hands only — no company can freeze or recover your funds, but losing your seed phrase means permanent loss.' }, { q: 'What is a cold wallet?', a: 'A cold wallet keeps private keys completely offline — a hardware wallet (Ledger, Trezor) or paper backup — so remote attackers cannot reach them. Hot wallets are connected to the internet for convenience; cold storage is for funds you do not need to move often.' }, { q: 'What is a recoverable non-custodial wallet?', a: 'A new generation of smart wallets that keep you in full control while adding recovery: designate guardians (friends, devices, services) who can help restore access if you lose your key — self-custody without the all-or-nothing seed-phrase risk. Enabled by account abstraction and smart contracts.' }, { q: 'Is a non-custodial wallet anonymous?', a: 'It is pseudonymous — the wallet does not need your identity, but every transaction is public on-chain and can often be traced to you through exchanges, purchases, or analytics.' }];

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

export default function CustodialVsNonCustodial() {
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
        heroIcon={<AccountBalanceWalletIcon style={s.heroIcon} />}
        heroText="Not your keys, not your coins — but losing keys is worse"
        tag="Wallets · Security · Self-Custody"
        title={title}
        date="October 31, 2026"
        readTime="8 min read"
        shareUrl={shareUrl}
        shareTitle={title}
        faqs={faqs}
      >
        <p>
          Every crypto wallet answers one question: <strong>who holds the keys?</strong> That
          answer determines who really owns the funds, who can freeze them, and what happens
          when something goes wrong. Custodial vs non-custodial is the fundamental divide —
          and a new category, recoverable wallets, is changing the trade-offs.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>Custodial wallets: the bank model</h4>
        <p>
          Exchanges like Coinbase run custodial wallets — they hold the private keys, you hold a
          login. Convenience is real: password recovery, support, easy fiat on-ramps. The risk is
          also real: the custodian can freeze your account, get hacked, or go bankrupt — FTX
          customers learned that lesson expensively. You are trusting a company, not the chain.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>Non-custodial: full control, full responsibility</h4>
        <p>
          Non-custodial wallets — Varial for Stellar, MetaMask for Ethereum, hardware wallets for
          everyone — put the keys in your hands alone. No one can freeze or seize the funds; no
          support line can reset them either. The <a href="/glossary/seed-phrase">seed phrase</a>
          is the master backup: lose it and the crypto is gone forever, share it and it is gone
          faster.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>Cold wallets and hot wallets</h4>
        <p>
          Within non-custodial, the split is connectivity: <strong>hot wallets</strong> live on
          internet-connected devices for daily use; <strong>cold wallets</strong> (hardware
          devices like Ledger, or offline backups) keep keys completely offline for funds you
          hold long-term. The standard practice: hot wallet for spending money, cold storage for
          savings.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>The new middle ground: recoverable wallets</h4>
        <p>
          Smart wallets enabled by <a href="/glossary/account-abstraction">account abstraction</a>
          and passkeys are dissolving the hard trade-off. A <strong>recoverable non-custodial
          wallet</strong> keeps you in control while letting you designate guardians — trusted
          friends, devices, or services — who can help restore access if your key is lost.
          Self-custody stops being all-or-nothing, which is arguably the most important UX
          improvement crypto has ever shipped.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>Keep learning</h4>
        <p>
          <a href="/blog/freighter-wallet">Varial wallet setup guide</a> ·
          <a href="/blog/varial-vs-metamask-vs-albedo">Varial vs MetaMask vs Albedo</a> ·
          <a href="/blog/crypto-wallet-security">Wallet security guide</a> ·
          <a href="/glossary/non-custodial-wallet">Non-custodial wallet term</a> ·
          <a href="/glossary/cold-wallet">Cold wallet term</a>
        </p>
      </ArticleLayout>
    </>
  );
}
