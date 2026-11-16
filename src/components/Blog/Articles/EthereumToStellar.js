import React from 'react';
import { Helmet } from 'react-helmet-async';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import ArticleLayout, { articleStyles as s } from './ArticleLayout';

const shareUrl = 'https://edunode.org/blog/migrate-ethereum-to-stellar';
const title = 'Migrate from Ethereum to Stellar: A Practical Playbook for Builders';
const description = 'Fees that spike, finality you have to wait on, and contracts that cost a fortune to run — why teams port payment and token apps from Ethereum to Stellar, and how to do it without breaking what works.';
const image = 'https://edunode.org/og/ethereum-to-stellar.png';
const accent = 'linear-gradient(135deg,#0a0e27 0%,#4a2d8f 45%,#00add8 100%)';
const color = '#00add8';

const codeStyle = {
  background: '#0d0d2b', color: '#c8e6ff', borderRadius: 10,
  padding: '16px 18px', fontSize: '0.82rem', lineHeight: 1.7,
  overflowX: 'auto', fontFamily: "'SF Mono','Fira Code',Menlo,Consolas,monospace",
  margin: '18px 0',
};

const faqs = [
  { q: 'Why migrate from Ethereum to Stellar?', a: 'Payments and token apps feel the pain most: Stellar settles in ~5 seconds with deterministic finality, fees are a fraction of a cent even under load, and assets, a DEX, and fiat on/off-ramps (anchors) are protocol features rather than contracts you build yourself.' },
  { q: 'What happens to my ERC-20 token on Stellar?', a: 'You re-issue it. Classic Stellar assets are first-class protocol objects with built-in flags for authorization, clawback, and freeze — or you deploy an SEP-41 token via the Stellar Asset Contract for Soroban-native behavior. Existing holders are typically migrated with claimable balances.' },
  { q: 'Can I port my Solidity contracts?', a: 'Not directly — Soroban contracts are Rust compiled to WASM, so logic is rewritten, not transpiled. The mental model translates (storage, auth, events) but idioms differ: no inheritance, time-to-live state that must be bumped, and explicit authorization trees. OpenZeppelin’s Stellar contracts library gives you audited primitives to start from.' },
  { q: 'What replaces my Ethereum tooling?', a: 'Infura/Alchemy → Horizon plus an RPC provider; ethers.js → stellar-sdk (JS), go-stellar-sdk, or the new C++ SDK; MetaMask → Varial, LOBSTR, or xBull; Hardhat/Foundry → the stellar CLI and cargo test; The Graph → indexers like Mercury or SubQuery.' },
  { q: 'Is everything easier on Stellar?', a: 'No. Ethereum’s tooling, liquidity, and developer pool are deeper, and EVM composability has no direct equivalent. Stellar wins on payments, asset issuance, and predictable cost — if your product is a novel DeFi primitive, staying on EVM (or going multichain) may be right. The honest answer is a workload decision, not a tribal one.' },
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

export default function EthereumToStellar() {
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
        heroIcon={<CompareArrowsIcon style={s.heroIcon} />}
        heroText="Gas spikes, 15-minute finality, ERC-20s you can't control — there's another way to issue and move value"
        tag="Ethereum → Stellar · Migration"
        title={title}
        date="November 16, 2026"
        readTime="10 min read"
        shareUrl={shareUrl}
        shareTitle={title}
        faqs={faqs}
      >
        <p>
          The conversation usually starts the same way: a payments product, a tokenization
          platform, or a payout system built on Ethereum is bleeding users to gas spikes,
          waiting on probabilistic finality, or paying engineers to maintain contracts that
          exist only to do things other chains give you for free. Migrating to Stellar is a
          real project — different account model, different contract language, different
          tooling — but for the right workloads it ends in sub-cent fees, ~5-second
          deterministic finality, and protocol-level assets. Here is the honest playbook:
          what translates, what gets rewritten, and what to decide before touching code.
          (For scoped migrations and regulated deployments, this is also the kind of work{' '}
          <a href="https://www.ogtechnologies.co/products/blockchain-consulting/" target="_blank" rel="noopener noreferrer">OG Technologies</a> does
          as a consulting engagement — more on that below.)
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>First: should you migrate at all?</h4>
        <p>
          Be blunt with yourself. Stellar wins where Ethereum hurts most: payments, remittances,
          asset issuance, disbursements, and anything where fee predictability is a product
          requirement — a fraction of a cent per operation, always. Ethereum wins on
          composability depth, liquidity, tooling maturity, and sheer developer supply. If your
          moat is a novel DeFi primitive living inside the EVM web, migrating is a downgrade.
          If your product is “move value from A to B reliably and cheaply, at scale,” Stellar
          was designed for exactly that sentence.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>The mental-model shift</h4>
        <p>
          Ethereum thinks in contracts; Stellar thinks in <strong>operations</strong>. A payment,
          a DEX order, an account config, a trustline — these are typed operations the protocol
          executes natively, not calls into someone else’s bytecode. That one idea deletes a
          whole category of work: the ERC-20 you deployed, audited, and prayed over is a
          built-in Stellar asset with issuer flags for authorization, clawback, and freeze.
          Accounts carry native multi-sig (weighted signers, thresholds) instead of needing a
          Safe. The trade: less Turing-complete freedom, far less surface for catastrophic
          contract bugs.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>Tokens: re-issue, don’t bridge-and-forget</h4>
        <p>
          You have two paths. <strong>Classic Stellar assets</strong> are first-class — issued
          by an account, controlled by flags (auth required, revocable, clawback-enabled),
          traded on the native DEX, and held via trustlines. They are the right answer for
          most payment/stablecoin/RWA use cases. <strong>SEP-41 tokens</strong> (Stellar
          Asset Contract) give you Soroban-native tokens that smart contracts can compose
          with. Migrating existing holders is typically done with claimable balances —
          publish balances, users claim — rather than an airdrop that spends fees on people
          who never claim.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>Contracts: Solidity → Soroban (a rewrite, not a port)</h4>
        <p>
          Soroban contracts are Rust compiled to WASM. The concepts carry over — storage,
          auth, events, cross-contract calls — but the idioms don’t: no inheritance (compose
          with traits and explicit calls), state has a time-to-live you must bump or it
          expires to archive, and authorization is an explicit tree the runtime validates.
          The good news: <a href="https://www.openzeppelin.com/stellar-contracts" target="_blank" rel="noopener noreferrer">OpenZeppelin’s Stellar
          contracts library</a> gives you audited, familiar primitives (tokens, access
          control, pause, upgrade patterns), and the stellar CLI handles build/deploy/
          invoke locally and on testnet. Budget for a real rewrite of business logic; budget
          less than a from-scratch contract design.
        </p>
        <pre style={codeStyle}>{`// Mapping cheat-sheet
Infura / Alchemy        ->  Horizon + Stellar RPC provider
ethers.js / web3.js     ->  stellar-sdk (JS), go-stellar-sdk, stellar-cpp-sdk
MetaMask                ->  Varial, LOBSTR, xBull wallets
Hardhat / Foundry       ->  stellar CLI + cargo test (Rust/WASM contracts)
ERC-20 contract         ->  classic asset (issuer flags) or SEP-41 SAC token
Safe multisig           ->  native signers + thresholds on the account
The Graph               ->  Mercury, SubQuery, or Horizon/RPC queries
Random oracle service   ->  Reflector / native oracle integrations`}</pre>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>A sequence that doesn’t break production</h4>
        <p>
          <strong>1. Inventory</strong> what actually moves value: balances, allowances, pending
          flows, oracle dependencies, the multisig map. <strong>2. Decide asset shape</strong>{' '}
          — classic asset vs SAC — because everything downstream depends on it.{' '}
          <strong>3. Rebuild contract logic</strong> in Soroban against testnet; port your
          test suite, not just the code. <strong>4. Re-point infrastructure</strong>: indexers,
          backend SDK calls, wallet UX, custody. <strong>5. Migrate holders</strong> with
          claimable balances or a claim window; keep the EVM side readable for the tail.{' '}
          <strong>6. Run both</strong> during a shadow period — reconciled balances on both
          chains is how you sleep at night — then deprecate.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>Where teams usually get stuck</h4>
        <p>
          Compliance mapping (what your ERC-20 flags actually enforced vs Stellar’s flag
          semantics), liquidity bootstrapping on the DEX, retraining users on new wallets, and
          ISO 20022 / accounting reconciliation between on-chain settlement and ERP systems.
          These are exactly the seams where a consulting partner pays for itself:{' '}
          <a href="https://www.ogtechnologies.co/" target="_blank" rel="noopener noreferrer">OG Technologies</a> — a
          Vienna consultancy founded by EduNode’s author — runs{' '}
          <a href="https://www.ogtechnologies.co/products/blockchain-consulting/" target="_blank" rel="noopener noreferrer">blockchain architecture engagements</a> and{' '}
          <a href="https://www.ogtechnologies.co/products/payment-infrastructure/" target="_blank" rel="noopener noreferrer">payment-infrastructure work</a>{' '}
          spanning Stellar and Ethereum, with ISO 20022 and MiCA expertise for regulated EU
          deployments. Their model starts with a free 30-minute architecture review, which is
          the right first step before committing to a migration plan.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>Keep learning</h4>
        <p>
          <a href="https://developers.stellar.org/docs" target="_blank" rel="noopener noreferrer">Stellar developer docs</a> ·
          <a href="/stellar/stellarlab"> Stellar Lab sandbox</a> ·
          <a href="/stellar/stellar-disbursement-platform"> Stellar Disbursement Platform</a> ·
          <a href="/stellar/raven"> Raven: Stellar MCP for AI agents</a> ·
          <a href="/blog/stellar-cpp-sdk"> Stellar C++ SDK</a> ·
          <a href="/blog/stellar-go-cli"> Stellar Go CLI</a> ·
          <a href="/masterclasses/stellar-network-development"> Stellar Network masterclass</a> ·
          <a href="/masterclasses/ethereum-development"> Ethereum masterclass</a>
        </p>
      </ArticleLayout>
    </>
  );
}
