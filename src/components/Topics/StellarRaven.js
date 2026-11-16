import React from 'react';
import { Helmet } from 'react-helmet-async';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import ArticleLayout, { articleStyles as s } from '../Blog/Articles/ArticleLayout';

const shareUrl = 'https://edunode.org/stellar/raven';
const title = 'Stellar Raven: Give Your AI Agent the Official Docs, Live Ecosystem Data & Playbooks';
const description = 'Raven is Stellar’s remote MCP server — one endpoint that feeds AI coding assistants the official docs, graded ecosystem data, community intel, and 20 proven playbooks. No API keys; one browser sign-in.';
const image = 'https://edunode.org/og/stellar-raven.png';
const accent = 'linear-gradient(135deg,#0a0e27 0%,#1a1f3a 45%,#8b5cf6 100%)';
const color = '#8b5cf6';

const codeStyle = {
  background: '#0d0d2b', color: '#c8e6ff', borderRadius: 10,
  padding: '16px 18px', fontSize: '0.82rem', lineHeight: 1.7,
  overflowX: 'auto', fontFamily: "'SF Mono','Fira Code',Menlo,Consolas,monospace",
  margin: '18px 0',
};

const faqs = [
  { q: 'What is Stellar Raven?', a: 'A remote MCP (Model Context Protocol) server run by Stellar at raven.stellar.org/mcp. It gives AI coding assistants — Claude Code, Codex, Cursor, Claude Desktop, VS Code — access to official Stellar docs, live graded ecosystem data, community intel, and 20 step-by-step playbooks through a single authenticated endpoint.' },
  { q: 'How do I connect my AI tool to Raven?', a: 'Add https://raven.stellar.org/mcp as a remote/streamable-HTTP MCP server in your tool — e.g. `claude mcp add --transport http stellar-raven https://raven.stellar.org/mcp` — then complete the browser OAuth sign-in. No service API keys are needed; tools without native remote-MCP support can bridge via mcp-remote.' },
  { q: 'What can my agent actually do with it?', a: 'Raven exposes two MCP tools: `search` ranks its catalog of 62 live operations and 20 skills/playbooks, and `execute` runs agent-written JavaScript in a sandboxed, no-network environment with calls validated against the catalog. Your agent gets cross-referenced answers — docs plus live ecosystem data plus playbooks — not single-source lookups.' },
  { q: 'Does it cost anything or need API keys?', a: 'One browser sign-in; no service API keys. Secrets stay server-side and the catalog is checked against live services daily, so answers reflect current network state rather than stale training data.' },
  { q: 'How is Raven different from just pasting docs into a prompt?', a: 'Coverage and freshness. A prompt gets fragments you paste; Raven gives the agent ranked access to the whole docs corpus, 920+ projects and 2,300+ graded repos of ecosystem intelligence, news/funding/governance intel, and executable playbooks — kept current daily.' },
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

export default function StellarRaven() {
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
        heroIcon={<SmartToyIcon style={s.heroIcon} />}
        heroText="Official docs, live ecosystem data, and proven playbooks — one connection, zero API keys"
        tag="Stellar · AI · MCP"
        title={title}
        date="November 16, 2026"
        readTime="6 min read"
        shareUrl={shareUrl}
        shareTitle={title}
        faqs={faqs}
      >
        <p>
          <a href="https://raven.stellar.org/" target="_blank" rel="noopener noreferrer"><strong>Stellar Raven</strong></a>{' '}
          is a remote MCP server that hands your AI coding assistant the whole Stellar
          knowledge base in one connection: official developer docs ranked for agents,
          live graded ecosystem data, community intel, and 20 tested playbooks it can pull
          mid-task. Paste one endpoint, sign in once in the browser, and the agent answers
          with sources — not vibes. If you already use Claude Code, Codex, Cursor, or VS
          Code for Stellar work, this is the missing piece.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>What’s behind the endpoint</h4>
        <p>
          Four catalogs, cross-referenced: <strong>official docs</strong> (smart contracts,
          SDKs, RPC &amp; Horizon, SEPs and standards, searched the way agents actually
          ask), <strong>live ecosystem data</strong> (920+ projects, 2,300+ graded repos,
          builder and partner intelligence refreshed from live services — not training-data
          stale), <strong>community intel</strong> (news, research, podcasts, events, jobs,
          governance and SCF funding flows), and <strong>20 proven playbooks</strong> —
          step-by-step procedures for smart contracts, payments, dApps, and data/indexing
          that the agent reads section by section exactly when it needs them.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>Under the hood: just two tools</h4>
        <p>
          Instead of dozens of tool schemas crowding your agent’s context window, Raven
          exposes two. <code>search</code> ranks its catalog of 62 live operations and 20
          skills. <code>execute</code> runs agent-written JavaScript in a no-network
          sandbox where every call is validated against the catalog — sandboxed by design,
          so the agent can compose operations without your secrets ever reaching it. The
          catalog itself is checked against live services daily, which quietly solves the
          “my MCP server rotted when the API changed” problem.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>Connect in two minutes</h4>
        <pre style={codeStyle}>{`# Claude Code
claude mcp add --transport http stellar-raven \\
  "https://raven.stellar.org/mcp"
# then /mcp -> Authenticate -> sign in in your browser

# Codex
codex mcp add stellar-raven --url "https://raven.stellar.org/mcp"
codex mcp login stellar-raven

# Cursor — ~/.cursor/mcp.json
{ "mcpServers": { "stellar-raven": { "url": "https://raven.stellar.org/mcp" } } }

# VS Code
code --add-mcp '{"name":"stellar-raven","type":"http","url":"https://raven.stellar.org/mcp"}'

# No native remote MCP? Bridge with mcp-remote
{ "mcpServers": { "stellar-raven": {
    "command": "npx",
    "args": ["-y","mcp-remote@latest","https://raven.stellar.org/mcp","--transport","http-only"] } } }`}</pre>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>Why it beats the DIY pile</h4>
        <p>
          The alternative is a separate MCP server per service, API keys to mint and rotate,
          and you doing the cross-referencing when a question spans docs + ecosystem +
          standards. Raven collapses that to one endpoint and one sign-in, with answers
          composed across sources. There is also a{' '}
          <a href="https://raven.stellar.org/playground" target="_blank" rel="noopener noreferrer">web playground</a>{' '}
          if you want to try the catalog before wiring it into your agent, and the code is
          on <a href="https://github.com/stellar-experimental/stellar-raven" target="_blank" rel="noopener noreferrer">GitHub</a>.
        </p>
        <p>
          Pair it with the hands-on layer: <a href="/stellar/stellarlab">Stellar Lab</a>{' '}
          for click-through transaction building, the{' '}
          <a href="/blog/stellar-go-cli">Stellar Go CLI</a> — which itself ships an MCP
          server exposing wallet and payment tools — and the{' '}
          <a href="/masterclasses/stellar-network-development">Stellar masterclass</a>{' '}
          for structured learning.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>Keep learning</h4>
        <p>
          <a href="https://raven.stellar.org/" target="_blank" rel="noopener noreferrer">Raven</a> ·
          <a href="https://raven.stellar.org/docs" target="_blank" rel="noopener noreferrer"> Raven docs</a> ·
          <a href="https://raven.stellar.org/playground" target="_blank" rel="noopener noreferrer"> Playground</a> ·
          <a href="/stellar"> Stellar hub</a> ·
          <a href="/stellar/bell-protocol-30"> Bell, Protocol 30</a> ·
          <a href="/masterclasses/devin-ai-engineering"> Devin AI masterclass</a>
        </p>
      </ArticleLayout>
    </>
  );
}
