import React from 'react';
import { Helmet } from 'react-helmet-async';
import TerminalIcon from '@mui/icons-material/Terminal';
import ArticleLayout, { articleStyles as s } from './ArticleLayout';

const shareUrl = 'https://edunode.org/blog/stellar-go-cli';
const title = 'Stellar Go CLI: Wallets, Payments, DIDs, ISO 20022 & AI Agents — One Binary';
const description = 'An open-source Go CLI for Stellar: wallets with passkey protection, payments and DEX swaps, SEP-41 assets, W3C DIDs and Verifiable Credentials, ISO 20022 reporting, a pure-Go Soroban RPC client, and an MCP server for AI assistants.';
const image = 'https://edunode.org/og/stellar-go-cli.png';
const accent = 'linear-gradient(135deg,#0a0e27 0%,#0b3d5c 55%,#00add8 100%)';
const color = '#00add8';

const codeStyle = {
  background: '#0d0d2b', color: '#c8e6ff', borderRadius: 10,
  padding: '16px 18px', fontSize: '0.82rem', lineHeight: 1.7,
  overflowX: 'auto', fontFamily: "'SF Mono','Fira Code',Menlo,Consolas,monospace",
  margin: '18px 0',
};

const faqs = [
  { q: 'What is stellar-go-cli?', a: 'An open-source (Apache 2.0) command-line tool for Stellar written in Go. It manages wallets, sends payments, executes DEX swaps, deploys and invokes Soroban contracts, creates W3C DIDs and Verifiable Credentials, exports ISO 20022 XML reports, and can run as an MCP server for AI assistants.' },
  { q: 'How do I install it?', a: 'With Homebrew (`brew install stellar-go-cli/tap/stellar-go-cli`), `go install` (needs a release after v0.6.0), prebuilt cosign-signed binaries for Linux/macOS/Windows from GitHub Releases, or Docker images on GHCR.' },
  { q: 'Can AI assistants use it?', a: 'Yes — `stellar-go-cli mcp` starts an MCP server over stdio or SSE exposing tools like wallet_balance, pay_send, swap_quote, and contract invocation. A documented signer-architecture roadmap separates the MCP server from key custody.' },
  { q: 'Is it an official Stellar Development Foundation project?', a: 'No — it is a community project. The codebase was extracted from a downstream commercial product (MozartPay is its first consumer), runs against mainnet and testnet for wallets/payments/swaps, and marks DID/VC and ISO 20022 features as working prototypes.' },
  { q: 'Can I use it as a Go library instead of a CLI?', a: 'Yes. The reusable packages live under pkg/ and render on pkg.go.dev — including a pure-Go Soroban RPC client, ISO 20022 message builders, a DID/VC package, DEX swap logic, and an x402 client/facilitator.' },
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

export default function StellarGoCli() {
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
        heroIcon={<TerminalIcon style={s.heroIcon} />}
        heroText="One binary for the whole Stellar workflow — from wallet to WASM deploy to ISO 20022 report"
        tag="Stellar · Go · CLI"
        title={title}
        date="November 16, 2026"
        readTime="8 min read"
        shareUrl={shareUrl}
        shareTitle={title}
        faqs={faqs}
      >
        <p>
          Most Stellar tooling does one thing.{' '}
          <a href="https://github.com/stellar-go-cli/stellar-go-cli" target="_blank" rel="noopener noreferrer"><strong>stellar-go-cli</strong></a>{' '}
          is the opposite bet: a single Apache-2.0 Go binary that covers wallets, payments,
          DEX swaps, SEP-41 assets, W3C DIDs and Verifiable Credentials, ISO 20022
          reporting, a pure-Go Soroban RPC client, and an MCP server that hands the same
          powers to AI assistants. It runs against mainnet and testnet today — and unlike
          most CLIs, every feature also exists as a reusable Go package under{' '}
          <code>pkg/</code>.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>Install in one line</h4>
        <pre style={codeStyle}>{`# Homebrew
brew install stellar-go-cli/tap/stellar-go-cli

# go install (needs a release after v0.6.0 — see note below)
go install github.com/stellar-go-cli/stellar-go-cli/cmd/stellar-go-cli@latest

# Or grab a signed binary — every release ships checksums,
# a CycloneDX SBOM, and a cosign signature bundle
cosign verify-blob --bundle stellar-go-cli_<ver>_checksums.txt.bundle \\
  --certificate-identity-regexp 'github.com/stellar-go-cli' \\
  stellar-go-cli_<ver>_checksums.txt`}</pre>
        <p>
          One honest caveat from the README: <code>go install …@latest</code> currently
          fails on v0.6.0 because that tag’s go.mod contained a <code>replace</code>{' '}
          directive Go rejects for remote installs — use Homebrew, a release binary, or{' '}
          <code>git clone && make install</code> until the next tag lands. Docker images
          (CLI, MCP server, VC API) are published to GHCR on every release.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>The sixty-second tour</h4>
        <pre style={codeStyle}>{`stellar-go-cli init                                       # ~/.stellar-go-cli/config.json
stellar-go-cli wallet connect --provider stellar --network stellar-testnet
stellar-go-cli wallet fund --network stellar-testnet      # friendbot top-up

stellar-go-cli pay send --to G... --amount 10 --asset USDC
stellar-go-cli swap quote --from XLM --to USDC --amount 25
stellar-go-cli contract deploy --wasm my_contract.wasm --network stellar-testnet
stellar-go-cli contract invoke --id C... --method symbol --simulate

stellar-go-cli did create --method key
stellar-go-cli did attest --name "Your Name" --country AT
stellar-go-cli report iso20022 --type pacs.008 > report.xml
stellar-go-cli mcp                                        # MCP server over stdio`}</pre>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>What it actually covers</h4>
        <p>
          <strong>Wallets</strong> — create/import seeds, faucet funding, and optional
          passkey (WebAuthn) protection that encrypts the seed at rest and gates signing
          behind a biometric or hardware assertion. <strong>Payments</strong> — direct
          sends, FX quotes, and an x402 pay-per-use flow. <strong>Swaps</strong> —
          path-payment quotes and execution on the Stellar DEX, plus trading strategies
          behind the <code>extras</code> build tag. <strong>Assets</strong> — SEP-41
          fungible tokens and non-fungible assets via the Stellar Asset Contract,
          trustlines, claimable balances, liquidity pools.
        </p>
        <p>
          <strong>Soroban</strong> — deploy any <code>.wasm</code> and invoke methods from
          a pure-Go RPC client; no <code>stellar</code> CLI required. <strong>DIDs &
          VCs</strong> — create <code>did:web</code>/<code>did:key</code>/
          <code>did:ethr</code>/<code>did:ebsi</code> documents and issue and verify W3C
          Verifiable Credentials (Ed25519Signature2020 and ES256 JsonWebSignature2020).{' '}
          <strong>ISO 20022</strong> — export transactions as pacs.008/002/004/009 XML, or
          use <code>pkg/iso20022</code> to build batch pain.001 disbursements, pain.002
          status reports, and camt.053/054 statements — validated against the official
          XSDs.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>The MCP angle: Stellar for AI agents</h4>
        <p>
          <code>stellar-go-cli mcp</code> exposes the toolset over stdio or SSE —
          <code>wallet_balance</code>, <code>pay_send</code>, <code>swap_quote</code>,{' '}
          <code>swap_execute</code>, contract calls, system health — so Claude-style
          assistants can operate a wallet directly. The project is unusually candid about
          the security implications: a published policy-engine spec and signer-architecture
          roadmap for separating the MCP server from key custody, plus differential-fuzzing
          and TLA+ formal-verification roadmaps under <code>docs/audit/</code>.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>Use it as a library, not just a CLI</h4>
        <p>
          Every feature doubles as an importable package on pkg.go.dev:{' '}
          <code>pkg/soroban</code> (the pure-Go RPC client — deploy, invoke, simulate,
          events), <code>pkg/iso20022</code> (the full message family), <code>pkg/vc</code>{' '}
          (DIDs and credentials), <code>pkg/swap</code>, <code>pkg/x402</code>, and shared{' '}
          <code>pkg/models</code>/<code>pkg/crypto</code>. MozartPay’s Orchestrated
          Agreements is already a downstream consumer of exactly these packages.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>Worth knowing before you bet on it</h4>
        <p>
          Three honest limitations from the project itself: it is <em>not</em> an SDF
          project; self-issued VCs prove key control, not KYC’d identity (an external
          issuer can be configured); and <code>did:ethr</code>/<code>did:ebsi</code>{' '}
          identifiers are locally derived — cryptographically verifiable, but never
          anchored to a registry. Wallets, payments, and swaps run against mainnet and
          testnet; DID/VC and ISO 20022 are flagged as working prototypes.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>Keep learning</h4>
        <p>
          <a href="https://github.com/stellar-go-cli/stellar-go-cli" target="_blank" rel="noopener noreferrer">stellar-go-cli on GitHub</a> ·
          <a href="https://pkg.go.dev/github.com/stellar-go-cli/stellar-go-cli" target="_blank" rel="noopener noreferrer"> pkg/ docs on pkg.go.dev</a> ·
          <a href="/blog/build-stellar-apps-with-go"> Build Stellar apps with Go</a> ·
          <a href="/blog/stellar-cpp-sdk"> The Stellar C++ SDK</a> ·
          <a href="/stellar/bell-protocol-30"> Bell, Protocol 30</a> ·
          <a href="/masterclasses/stellar-network-development"> Stellar Network masterclass</a>
        </p>
      </ArticleLayout>
    </>
  );
}
