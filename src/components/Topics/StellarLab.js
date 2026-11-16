import React from 'react';
import { Helmet } from 'react-helmet-async';
import ScienceIcon from '@mui/icons-material/Science';
import ArticleLayout, { articleStyles as s } from '../Blog/Articles/ArticleLayout';

const shareUrl = 'https://edunode.org/stellar/stellarlab';
const title = 'Stellar Lab: Build, Simulate & Debug Transactions in Your Browser';
const description = 'Stellar Lab is the network’s official sandbox: create and fund testnet accounts, build and sign transactions, deploy Soroban contracts, try every RPC and Horizon endpoint, and decode XDR — no install required.';
const image = 'https://edunode.org/og/stellar-lab.png';
const accent = 'linear-gradient(135deg,#2b1055 0%,#6B48FF 55%,#00d4ff 100%)';
const color = '#6B48FF';

const faqs = [
  { q: 'What is Stellar Lab?', a: 'The official browser-based developer sandbox for the Stellar network (lab.stellar.org). Build, sign, simulate, and submit transactions; create funded accounts on mainnet, testnet, and futurenet; deploy and invoke Soroban contracts; and call any RPC or Horizon endpoint — all from a web UI.' },
  { q: 'Can I deploy smart contracts from Lab?', a: 'Yes. Upload a contract WASM file and deploy it to the network, then invoke contract methods through a form with parameter type hints and transaction simulation — no CLI needed.' },
  { q: 'What happened to the old Stellar Laboratory?', a: 'It was rebuilt and relaunched as the new Stellar Lab. The previous version remains at old-lab.stellar.org but is no longer actively maintained.' },
  { q: 'How do I get testnet funds in Lab?', a: 'Create an account in the UI and fund it directly with Friendbot — built into Lab for testnet and futurenet. You can also add USDC and EURC trustlines on testnet.' },
  { q: 'What is the XDR tool for?', a: 'Debugging. The View XDR page decodes base-64 XDR into readable JSON (and back), and can diff two XDR payloads side by side — essential when a transaction fails and you need to see exactly what the network saw.' },
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

export default function StellarLab() {
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
        heroIcon={<ScienceIcon style={s.heroIcon} />}
        heroText="The fastest way to learn how a Stellar transaction actually works — build one, break it, read the XDR"
        tag="Stellar · Dev Tools · Sandbox"
        title={title}
        date="November 16, 2026"
        readTime="5 min read"
        shareUrl={shareUrl}
        shareTitle={title}
        faqs={faqs}
      >
        <p>
          <a href="https://lab.stellar.org/" target="_blank" rel="noopener noreferrer"><strong>Stellar Lab</strong></a>{' '}
          is the network’s official developer sandbox — the rebuilt successor to the old
          Stellar Laboratory. It is the place to go when you want to <em>see</em> a Stellar
          transaction rather than read about one: build it in a form, simulate it, submit
          it, then decode the XDR to see exactly what the network recorded. No install, no
          SDK, no excuse for not experimenting.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>What you can do in it</h4>
        <p>
          <strong>Create and fund accounts</strong> on mainnet, testnet, and futurenet —
          Friendbot funding is built in for the test networks, and you can add USDC/EURC
          trustlines on testnet. <strong>Build transactions</strong> with a guided form:
          source account, fetched sequence number, fee, memo, time bounds, and up to 100
          operations with drag-to-reorder, duplicate, and validation as you go.{' '}
          <strong>Save and share</strong> — transactions persist in the browser and every
          build generates a shareable link for teammates.
        </p>
        <p>
          <strong>Soroban contracts</strong> — upload a WASM file, deploy it, then invoke
          methods through a form with type hints, simulate first, and submit when it looks
          right. <strong>Every API, clickable</strong> — all Soroban RPC methods and
          Horizon endpoints get a request form, so you can query accounts, trustlines,
          contract WASM, and events without writing code. <strong>XDR tools</strong> —
          decode XDR to JSON, encode JSON back to XDR, or diff two payloads side by side.
          When a transaction fails in production, this page is usually where the answer
          hides.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>Why it matters for learning</h4>
        <p>
          Most blockchain education dies in the gap between “read the concept” and “run
          the thing.” Lab closes it: the{' '}
          <a href="/masterclasses/stellar-network-development">Stellar Network masterclass</a>{' '}
          teaches trustlines, path payments, and operations — Lab is where you can click
          through every one of them in the next five minutes. It is also genuinely
          mobile-responsive, which makes it the rare dev tool you can poke at from a phone.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>Old Lab vs new Lab</h4>
        <p>
          The previous Laboratory still lives at{' '}
          <a href="https://old-lab.stellar.org" target="_blank" rel="noopener noreferrer">old-lab.stellar.org</a>{' '}
          but is unmaintained. The new Lab is a full rebuild (Next.js, TypeScript, the
          Stellar Design System) with contract support, canonical XDR⇄JSON mapping shared
          with the stellar CLI, saved requests, and custom RPC providers. New work goes in
          the new Lab.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>Keep learning</h4>
        <p>
          <a href="https://lab.stellar.org/" target="_blank" rel="noopener noreferrer">Open Stellar Lab</a> ·
          <a href="https://developers.stellar.org/docs/tools/lab" target="_blank" rel="noopener noreferrer"> Lab docs</a> ·
          <a href="https://github.com/stellar/laboratory" target="_blank" rel="noopener noreferrer"> Source code</a> ·
          <a href="/stellar/raven"> Raven: Stellar MCP for AI agents</a> ·
          <a href="/stellar"> Stellar hub</a> ·
          <a href="/masterclasses/stellar-network-development"> Stellar Network masterclass</a>
        </p>
      </ArticleLayout>
    </>
  );
}
