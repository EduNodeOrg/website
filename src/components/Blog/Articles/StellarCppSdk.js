import React from 'react';
import { Helmet } from 'react-helmet-async';
import CodeIcon from '@mui/icons-material/Code';
import ArticleLayout, { articleStyles as s } from './ArticleLayout';

const shareUrl = 'https://edunode.org/blog/stellar-cpp-sdk';
const title = 'Build Stellar Apps in C++20: Meet the stellar-cpp-sdk';
const description = 'A modern Apache-2.0 C++ SDK for Stellar — full XDR layer, keys, transactions, Soroban RPC, spec-driven contract calls, and ISO 20022 reporting. Built for Protocol 30 and verified byte-for-byte against stellar-base.';
const image = 'https://edunode.org/og/stellar-cpp-sdk.png';
const accent = 'linear-gradient(135deg,#0b3d5c 0%,#00599c 55%,#00add8 100%)';
const color = '#00add8';

const codeStyle = {
  background: '#0d0d2b', color: '#c8e6ff', borderRadius: 10,
  padding: '16px 18px', fontSize: '0.82rem', lineHeight: 1.7,
  overflowX: 'auto', fontFamily: "'SF Mono','Fira Code',Menlo,Consolas,monospace",
  margin: '18px 0',
};

const faqs = [
  { q: 'What is the stellar-cpp-sdk?', a: 'An open-source, Apache-2.0 C++20 SDK for the Stellar network. It covers XDR encoding/decoding, keypairs and strkeys, transaction building and signing, the Stellar RPC interface, Soroban smart contracts, and optional ISO 20022 payment-message reporting — verified end-to-end on live testnet.' },
  { q: 'Does it support Protocol 30 (Bell)?', a: 'Yes. Its 495 XDR definitions are generated from stellar-xdr v30.0.0, and its strkey layer already handles the CAP-84 W address type for muxed contract addresses introduced in Bell.' },
  { q: 'How do I build it?', a: 'With CMake presets: `cmake --preset dev && cmake --build --preset dev && ctest --preset dev`. It needs CMake 3.24+, a C++20 compiler (GCC 11+, Clang 14+, MSVC 2022+), and libsodium, libcurl, and pugixml — pinned automatically through vcpkg or installable via your system package manager.' },
  { q: 'Can I install it with vcpkg?', a: 'Yes — the repo ships a port under ports/stellar-cpp-sdk and documents a git-registry configuration, so `vcpkg install stellar-cpp-sdk` works alongside `find_package(StellarSdk COMPONENTS core xdr rpc)` in your CMakeLists.' },
  { q: 'What can I build with it?', a: 'Anything that needs Stellar from native code: payment services, trading bots, embedded/IoT devices, game integrations, contract-deploy tooling, or financial ISO 20022 reporting — all places where C++ is already the language of record.' },
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

export default function StellarCppSdk() {
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
        heroIcon={<CodeIcon style={s.heroIcon} />}
        heroText="Stellar from native code — XDR, transactions, Soroban, and ISO 20022 in modern C++20"
        tag="Stellar · C++ · SDK"
        title={title}
        date="November 16, 2026"
        readTime="8 min read"
        shareUrl={shareUrl}
        shareTitle={title}
        faqs={faqs}
      >
        <p>
          Stellar’s SDK story has a gap: JavaScript, Go, Rust, Java, Python — but no modern
          C++ option for the huge world of software already written in it.{' '}
          <a href="https://github.com/Olvisgil/stellar-cpp-sdk" target="_blank" rel="noopener noreferrer"><strong>stellar-cpp-sdk</strong></a>{' '}
          fills it: an Apache-2.0, C++20 SDK built from scratch on SDF’s canonical{' '}
          <code>xdr.json</code> AST, with a <code>Result&lt;T&gt;</code> error model, a
          synchronous thread-safe API, and live-testnet verification. It already speaks
          Protocol 30 — the <a href="/stellar/bell-protocol-30">Bell upgrade</a> — including
          the new <strong>W</strong> address type for muxed contract accounts.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>Why C++ on Stellar?</h4>
        <p>
          Trading systems, game engines, embedded devices, payment terminals, and a lot of
          financial infrastructure run on C++ — and those teams shouldn’t have to shell out
          to another language’s CLI to touch the network. The SDK is designed for exactly
          that: private dependencies (libsodium, libcurl, pugixml) never leak into public
          headers, so it drops into an existing CMake project without dependency drama.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>What’s inside</h4>
        <p>
          <strong>Full XDR layer.</strong> 495 definitions generated from stellar-xdr
          v30.0.0, a strict big-endian codec with depth and length limits, a runtime type
          registry, and a <code>stellar-xdr-cpp</code> CLI for inspecting XDR on the
          command line. <strong>Core primitives.</strong> All ten SEP-23 strkey kinds —
          including CAP-84 <code>W</code> muxed contracts — libsodium Ed25519 keys,
          fixed-point <code>Amount</code>/<code>Price</code>/128–256-bit integers, SEP-5
          mnemonics, and SEP-53 message signing. <strong>Transactions.</strong> A{' '}
          <code>TransactionBuilder</code> with mandatory time bounds (unless you explicitly
          opt out), all 27 operation factories, fee-bump envelopes, CAP-40 signed payloads,
          and hash-x signatures — verified byte-for-byte against stellar-base across a
          32-case compatibility matrix.
        </p>
        <p>
          <strong>Stellar RPC.</strong> All 13 methods including{' '}
          <code>queryEvents</code>/<code>getTransactions</code>, parsed by the SDK’s own
          strict JSON layer (zero external JSON dependency), plus streaming with
          cancellation, a retrying transport that honors <code>Retry-After</code>, and a{' '}
          <code>send_and_poll</code> helper that handles <code>TRY_AGAIN_LATER</code> and{' '}
          <code>DUPLICATE</code> correctly. <strong>Soroban contracts.</strong>{' '}
          <code>ScVal</code> construction with canonical sorting, a{' '}
          <code>ContractClient</code> for call/invoke/deploy with fee-bump and
          auto-restore options, authorization signing across all three credential arms
          (including CAP-71-01 delegation trees), a WASM custom-section metadata reader, and
          spec-driven JSON arguments — plus a <code>TokenClient</code> for SEP-41 tokens.
        </p>
        <p>
          <strong>ISO 20022 (optional component).</strong> Emit and parse pacs.008/002/004,
          pain.001/002, and camt.053/054 XML mapped to Stellar payments — batch totals,
          UETRs, and status-report reconciliation — validated against the official XSDs
          vendored in the repo. If you work where blockchain meets banking messages, this
          alone is unusual.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>It looks like this</h4>
        <pre style={codeStyle}>{`#include <stellar/sdk.hpp>
using namespace stellar;

// keys + network (always explicit — no global default)
STELLAR_TRY_ASSIGN(kp, KeyPair::from_secret(secret_seed));
Network net = Network::testnet();

// transactions
TransactionBuilder tx(kp.account_id());
tx.sequence_number(123).fee(100).time_bounds(0, 3600)
  .add_operation(ops::payment(dest, Asset::native(),
                              *Amount::parse("10")));
STELLAR_TRY_ASSIGN(built, tx.build());
auto env = TransactionEnvelope::of_transaction(*built);
env.sign(*kp, net);

// RPC
CurlTransport http;
RpcClient rpc(http, "https://soroban-testnet.stellar.org");
STELLAR_TRY_ASSIGN(sent, rpc.send_and_poll(env));

// contracts (spec-driven)
ContractClient cc(rpc, net, "C...CONTRACT_ID");
cc.set_spec(*ContractSpec::decode(meta.spec_entries_xdr));
auto r = cc.call_json(kp.account_id(), "transfer",
    Json::parse(R"({"to":"G...","amount":"100"})").value());`}</pre>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>Build and install</h4>
        <p>
          CMake presets keep it one line:{' '}
          <code>cmake --preset dev && cmake --build --preset dev && ctest --preset dev</code>.
          You need CMake 3.24+ and a C++20 compiler (GCC 11+, Clang 14+, MSVC 2022+).
          Dependencies — libsodium, libcurl, pugixml — come via vcpkg automatically, or via
          your package manager (<code>brew install libsodium curl pugixml</code>). Prefer
          vcpkg for the SDK itself? The repo ships a port, so{' '}
          <code>vcpkg install stellar-cpp-sdk</code> plus{' '}
          <code>find_package(StellarSdk COMPONENTS core xdr rpc)</code> works out of the box.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>Status: v0.1.0, testnet-verified</h4>
        <p>
          This is an early release with the foundations done: 84/84 unit tests plus five
          live-testnet integration tests green on <code>dev</code> and{' '}
          <code>asan-ubsan</code> presets. Horizon REST/SSE streaming and the wallet/anchor
          SEPs are the next phases. For a codebase this young, the verification posture is
          refreshingly serious — fixture matrices against stellar-base, fuzz presets, and a
          generated RPC conformance matrix in <code>compatibility/</code>.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>Keep learning</h4>
        <p>
          <a href="https://github.com/Olvisgil/stellar-cpp-sdk" target="_blank" rel="noopener noreferrer">stellar-cpp-sdk on GitHub</a> ·
          <a href="/blog/stellar-go-cli"> Stellar Go CLI</a> ·
          <a href="/blog/build-stellar-apps-with-go"> Build Stellar apps with Go</a> ·
          <a href="/stellar/bell-protocol-30"> Bell, Protocol 30</a> ·
          <a href="/stellar"> Stellar hub</a> ·
          <a href="/masterclasses/stellar-network-development"> Stellar Network masterclass</a>
        </p>
      </ArticleLayout>
    </>
  );
}
