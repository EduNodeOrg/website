import React from 'react';
import { Helmet } from 'react-helmet-async';
import DnsIcon from '@mui/icons-material/Dns';
import ArticleLayout, { articleStyles as s } from '../Blog/Articles/ArticleLayout';

const shareUrl = 'https://edunode.org/stellar/validator-node-guide';
const title = 'How to Set Up a Stellar Validator Node: Step-by-Step Guide';
const description = 'Run your own Stellar validator: stellar-core installation, quorum slices, validator keys, monitoring, and security — plus why running a validator matters for network decentralization.';
const image = 'https://edunode.org/og/stellar-validator-node.png';
const accent = 'linear-gradient(135deg,#04121f 0%,#0b3d5c 55%,#00add8 100%)';
const color = '#00add8';

const faqs = [{ q: 'Do I earn rewards for running a Stellar validator?', a: 'No — Stellar has no mining or staking rewards. Validators secure the network because they have a stake in its health: exchanges, anchors, and apps run them for reliable, independent ledger access. Inflation was disabled in 2019.' }, { q: 'What hardware does a Stellar validator need?', a: 'A modest modern server: 4+ vCPUs, 8+ GB RAM, SSD storage (the full ledger history needs hundreds of GB if you keep it; most validators keep recent history only). A stable, low-latency connection matters more than raw power.' }, { q: 'What is a quorum slice?', a: 'Your validator’s list of other validators it trusts to reach agreement. Stellar Consensus Protocol uses federated voting — you choose who you trust, and the network reaches consensus through overlapping quorum slices. Choosing a good slice is the most important validator decision.' }, { q: 'Is running a validator the same as running a Horizon node?', a: 'No. stellar-core participates in consensus; Horizon is the API server that apps query. Production apps typically run both — core for validation, Horizon for serving requests.' }];

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

export default function StellarValidatorNode() {
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
        heroIcon={<DnsIcon style={s.heroIcon} />}
        heroText="Contribute to consensus — run infrastructure, not just apps"
        tag="Stellar · Validators · Infrastructure"
        title={title}
        date="October 31, 2026"
        readTime="10 min read"
        shareUrl={shareUrl}
        shareTitle={title}
        faqs={faqs}
      >
        <p>
          Most Stellar guides teach you to <em>use</em> the network. This one is about helping
          <em>run</em> it. A validator is a <code>stellar-core</code> node that participates in
          consensus — voting on transaction sets every ~5 seconds. More independent validators in
          well-chosen quorum slices means a more resilient, decentralized network. This guide is
          inspired by <a href="https://dev.to/overcat/step-by-step-guide-to-setting-up-stellar-validator-node-3egk" target="_blank" rel="noopener noreferrer">overcat's excellent step-by-step walkthrough on dev.to</a> — we cover the same ground with the key concepts explained.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>Prerequisites</h4>
        <p>
          A Linux server (Ubuntu LTS is the common choice), 4+ vCPUs, 8+ GB RAM, fast SSD storage,
          and a static IP with good connectivity. Keep it on reliable infrastructure — a validator
          that goes dark at the wrong moment hurts its quorum slice's liveness.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>1. Install stellar-core</h4>
        <p>
          Install from the official Stellar packages (apt repository) or build from source — the
          dev.to guide uses Ubuntu packages, which is the fastest path:
          <code>sudo apt install stellar-core</code>. Verify with
          <code>stellar-core version</code>.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>2. Generate your validator seed</h4>
        <p>
          Run <code>stellar-core gen-seed</code> to create your node's secret seed and public node
          ID (<code>G…</code> address). Guard the seed like a private key — it identifies your
          validator's votes. Set it as <code>NODE_SEED</code> in your config and announce the
          public key so others can add you to quorum slices.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>3. Configure stellar-core.cfg</h4>
        <p>
          The critical file. Key settings: <code>NODE_SEED</code>,
          <code>NODE_IS_VALIDATOR=true</code>, your database (SQLite for small nodes, PostgreSQL
          for serious ones), <code>UNSAFE_QUORUM=false</code>, history archive settings
          (<code>CATCHUP_RECENT</code> for recent history only), and — most important — your
          <code>QUORUM_SET</code>: the validators you trust.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>4. Choose a good quorum slice</h4>
        <p>
          Your quorum slice is the list of organizations whose agreement you require. Stellar has
          no mining and no elected set — every validator picks whom to trust, and consensus emerges
          from overlapping slices. Best practice: include several independent, well-run validators
          (SDF nodes plus other established operators like Lobstr, Satoshipay, publicnode). Do not
          trust a single organization for a majority.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>5. Run, sync, monitor</h4>
        <p>
          Start the service and watch <code>stellar-core http-command info</code> — the node
          catchups to the current ledger, then shows state <code>Synced!</code>. Monitor uptime
          and lag; production validators expose the info endpoint to alerting. Once stable, ask
          other operators to add your public key to their quorum slices — that is how you actually
          start securing the network.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>Keep learning</h4>
        <p>
          <a href="https://dev.to/overcat/step-by-step-guide-to-setting-up-stellar-validator-node-3egk" target="_blank" rel="noopener noreferrer">overcat's full walkthrough (dev.to)</a> ·
          <a href="/glossary/validator">What is a validator?</a> ·
          <a href="/glossary/stellar-consensus-protocol-scp">Stellar Consensus Protocol</a> ·
          <a href="/stellar/proof-of-agreement">How Proof-of-Agreement works</a> ·
          <a href="/stellar">Stellar hub</a> ·
          <a href="/masterclasses/stellar-network-development">Stellar Network masterclass</a>
        </p>
      </ArticleLayout>
    </>
  );
}
