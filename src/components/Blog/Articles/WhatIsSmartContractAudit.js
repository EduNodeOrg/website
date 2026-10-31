import React from 'react';
import { Helmet } from 'react-helmet-async';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ArticleLayout, { articleStyles as s } from './ArticleLayout';

const shareUrl = 'https://edunode.org/blog/what-is-a-smart-contract-audit';
const title = 'What Is a Smart Contract Audit? Process, Cost, and What It Proves';
const description = 'A smart contract audit is a security review of on-chain code before deployment. What auditors check, how the process works, typical costs, and why an audit is necessary but not sufficient.';
const image = 'https://edunode.org/og/what-is-a-smart-contract-audit.png';
const accent = 'linear-gradient(135deg,#0a0e27 0%,#1a3a2f 55%,#00d4a0 100%)';
const color = '#00d4a0';

const faqs = [{ q: 'What does a smart contract audit check?', a: 'Auditors look for exploitable bugs: reentrancy, access-control flaws, integer issues, oracle manipulation, economic/logic errors, and deviations from the intended specification. Most reports include findings ranked by severity with remediation advice.' }, { q: 'How much does a smart contract audit cost?', a: 'Serious manual audits from established firms run from about $5,000 for small contracts to $50,000+ for large DeFi protocols, plus weeks of lead time. Automated tools (Slither, Mythril, fuzzers) are cheap complements, not replacements.' }, { q: 'Does an audit guarantee safety?', a: 'No — an audit reduces risk, it does not eliminate it. Audited contracts have still been exploited; audits are point-in-time reviews of specific code versions. Pair them with bug bounties, monitoring, and upgrade/emergency plans.' }, { q: 'When should a project get audited?', a: 'Before a contract holds user funds or goes to mainnet — and again after meaningful changes. An audit of stale code is marketing, not security.' }];

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

export default function WhatIsSmartContractAudit() {
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
        heroIcon={<VerifiedUserIcon style={s.heroIcon} />}
        heroText="Deployed code is immutable — review it before it holds money"
        tag="Security · Smart Contracts"
        title={title}
        date="October 31, 2026"
        readTime="8 min read"
        shareUrl={shareUrl}
        shareTitle={title}
        faqs={faqs}
      >
        <p>
          Smart contracts are immutable once deployed: a bug in production code is permanent and
          usually holds real money. A <strong>smart contract audit</strong> is a professional
          security review of that code before it goes live — the closest thing Web3 has to a
          pre-flight safety check.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>What auditors actually check</h4>
        <p>
          Beyond common bug classes — <strong>reentrancy</strong>, missing access control, integer
          edge cases, unsafe external calls — good auditors verify the contract does what the spec
          says: economic logic, oracle assumptions, upgrade paths, and admin-key powers. Many
          exploits are <em>logic</em> flaws, not syntax bugs: the code works exactly as written,
          the writing was wrong.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>How the process works</h4>
        <p>
          Teams freeze a commit and hand it to the firm. Auditors combine manual review with
          automated tooling (static analyzers like Slither, symbolic execution like Mythril,
          fuzzers like Echidna), then deliver a report of findings by severity. The team fixes,
          auditors re-review, and a final report is published — that public report is what
          "audited by X" means on a project's site.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>Cost and timing</h4>
        <p>
          Established firms charge roughly <strong>$5K–$50K+</strong> depending on codebase size,
          with weeks of lead time for top firms. For learning projects, run the free tools first —
          they catch the classics. For contracts that will hold real funds, a manual audit is
          table stakes, not optional.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>An audit is necessary — not sufficient</h4>
        <p>
          Audited contracts have still lost nine figures: audits are point-in-time reviews of a
          specific version, by humans, on deadlines. Real security is layered — audits plus bug
          bounties, plus on-chain monitoring, plus timelocks and emergency pause mechanisms, plus
          conservative admin-key design. Treat "audited" as the start of due diligence, not the end.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>Keep learning</h4>
        <p>
          <a href="/glossary/smart-contract-audit">Smart contract audit term</a> ·
          <a href="/crypto-fundamentals">Crypto Fundamentals hub</a> ·
          <a href="/blog/smart-contracts">What are smart contracts?</a> ·
          <a href="/masterclasses/ethereum-development">Ethereum Development masterclass</a> ·
          <a href="/masterclasses/crypto-fundamentals">Crypto Fundamentals masterclass</a>
        </p>
      </ArticleLayout>
    </>
  );
}
