import React from 'react';
import { Helmet } from 'react-helmet-async';
import ArticleLayout, { articleStyles as s } from './ArticleLayout';

const shareUrl = 'https://edunode.org/blog/built-on-stellar-xbull-soroban-domains';
const title = 'xBull Wallet & Soroban Domains (.xlm) on Stellar Guide';
const description = 'How xBull Wallet and Soroban Domains work on Stellar: human-readable .xlm addresses, Soroban dApp signing, multi-sig support, and Creit Tech Q&A.';
const image = 'https://edunode.org/og/xbull-and-soroban-domains.png';
const accent = 'linear-gradient(135deg,#0a0e27 0%,#1a1f3a 55%,#7b2ff7 100%)';
const color = '#7b2ff7';

const articleLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: title,
  description,
  image,
  url: shareUrl,
  datePublished: '2026-10-25',
  dateModified: '2026-11-26',
  author: { '@type': 'Person', name: 'Olvis Gil', url: 'https://edunode.org/about#founder', jobTitle: 'Founder, EduNode & OG Technologies EU' },
  publisher: { '@type': 'Organization', name: 'EduNode', url: 'https://edunode.org' },
  mainEntityOfPage: shareUrl,
};

export default function XBullSorobanDomains() {
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
      </Helmet>
      <ArticleLayout
        accent={accent}
        color={color}
        heroText="Soroban smart contracts and a powerful Stellar wallet"
        tag="Stellar · Wallet · Soroban"
        title={title}
        date="October 25, 2026"
        readTime="4 min read"
        shareUrl={shareUrl}
        shareTitle={title}
      >
        <div dangerouslySetInnerHTML={{ __html: `<p>Stellar Global Discord event recording featuring the Creit Tech team discussing their multi-functional wallet, xBull, and Soroban Domains!</p><p></p><p>Hosted by Olvis Gil &amp; Fergal, with special guest Enrique Arrieta!</p>` }} />
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>What is xBull Wallet?</h4>
        <p>
          <strong>xBull</strong> is a multi-functional Stellar wallet built by the Creit Tech team.
          It handles the everyday wallet jobs — holding XLM and Stellar assets, sending payments,
          managing trustlines — and adds the features power users actually need on Stellar:
          <strong>multi-signature support</strong> for shared or secured accounts, and
          <strong>Soroban dApp signing</strong> so it can act as the wallet layer for the growing
          smart-contract ecosystem. If you have used Varial (formerly Freighter), xBull covers the
          same ground and pushes further into multi-sig and contract interactions.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>What are Soroban Domains?</h4>
        <p>
          Soroban Domains are human-readable names — think <strong>yourname.xlm</strong> — that map to
          Stellar addresses, built as Soroban smart contracts. Instead of copying a 56-character
          <em> G…</em> address, a sender can pay a domain; the contract resolves it on-chain to the
          underlying account. Because they are Soroban contracts rather than a centralized registry,
          ownership and resolution live on the Stellar ledger itself.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>Why it matters</h4>
        <p>
          Wallets are the front door to every dApp, and readable names are what make payments usable
          for non-technical users. A wallet that natively understands Soroban contracts plus a
          contract-based naming system is the combination that lets Stellar apps feel like normal
          web apps — sign in, pick a contact by name, sign the transaction.
        </p>
        <div style={s.callout}>
          <strong>Try it yourself:</strong> the free{' '}
          <a href="/masterclasses/stellar-network-development">Stellar Network Development masterclass</a>
          covers accounts, trustlines and Soroban contracts step by step — first two lessons free.
        </div>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>Keep learning</h4>
        <p dangerouslySetInnerHTML={{ __html: `Learn more about <a href="/stellar">Stellar development</a>, <a href="/blog/varial-wallet">Varial wallet (formerly Freighter)</a>, and the <a href="/masterclasses/stellar-network-development">Stellar Network masterclass</a>.` }} />
      </ArticleLayout>
    </>
  );
}
