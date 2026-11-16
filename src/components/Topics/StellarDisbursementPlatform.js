import React from 'react';
import { Helmet } from 'react-helmet-async';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import ArticleLayout, { articleStyles as s } from '../Blog/Articles/ArticleLayout';

const shareUrl = 'https://edunode.org/stellar/stellar-disbursement-platform';
const title = 'Stellar Disbursement Platform (SDP): Bulk Payments That Reach Anyone With a Phone';
const description = 'The open-source Stellar Disbursement Platform lets organizations send up to 10,000 payments per batch — payroll, aid, vendor payouts — with wallets created automatically for recipients and every payment auditable on-chain.';
const image = 'https://edunode.org/og/stellar-disbursement-platform.png';
const accent = 'linear-gradient(135deg,#0a2e1f 0%,#0a7d5c 55%,#77d9bb 100%)';
const color = '#77d9bb';

const faqs = [
  { q: 'What is the Stellar Disbursement Platform?', a: 'An open-source bulk-payment platform built by the Stellar Development Foundation. Organizations upload a list of recipients and send up to 10,000 payments in a single batch — recipients get a wallet created for them via SMS or email invite, no prior blockchain knowledge needed.' },
  { q: 'Who uses the SDP?', a: 'It was built for humanitarian aid — SDF used it to disburse cash assistance in Ukraine in 2022 via Stellar Aid Assist — and now supports payroll, gig-economy payouts, government transfers, supplier payments, and enterprise remittances.' },
  { q: 'Is the SDP self-hosted?', a: 'Yes — Apache-2.0 code across a Go backend, a web frontend, and Helm charts for Kubernetes. Self-hosting keeps recipient personal data inside your infrastructure, with only payment records touching the public ledger.' },
  { q: 'How do recipients cash out?', a: 'Into any SDP-integrated Stellar wallet. Depending on the region, receivers can hold USDC, send to a bank account, or cash out at physical locations like participating MoneyGram agents.' },
  { q: 'Does the SDP work for enterprises, not just aid?', a: 'Yes — that is the direction the platform has grown. The same batch flow that delivers aid works for contractor payroll, supplier payouts, and remittance corridors, with role-based permissions, audit trails, and a dashboard for tracking payments in real time.' },
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

export default function StellarDisbursementPlatform() {
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
        heroIcon={<VolunteerActivismIcon style={s.heroIcon} />}
        heroText="10,000 payments per batch, wallets created on the fly, every cent traceable — born in humanitarian aid, built for payroll"
        tag="Stellar · Payments · Open Source"
        title={title}
        date="November 16, 2026"
        readTime="6 min read"
        shareUrl={shareUrl}
        shareTitle={title}
        faqs={faqs}
      >
        <p>
          Sending money to one person is easy. Sending it to ten thousand people — some with
          bank accounts, some with only a phone number — is where payment systems quietly
          fall apart. The <strong>Stellar Disbursement Platform (SDP)</strong> is the
          Stellar Development Foundation’s open-source answer: upload a recipient list,
          send a batch, and each receiver gets a digital wallet created for them on the
          fly. It started in humanitarian aid; it now runs payroll, supplier payouts,
          government transfers, and remittances.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>From Ukraine aid to general-purpose payouts</h4>
        <p>
          In 2022, SDF used the SDP to help humanitarian organizations distribute cash
          assistance to recipients across Ukraine — digital dollars landing in
          self-custodied wallets within seconds, cashable at participating MoneyGram
          locations. That program, Stellar Aid Assist, proved the model under real
          pressure. The platform has since broadened into a turnkey disbursement product:
          any organization that needs to pay many people, in many places, without asking
          them to learn blockchain first.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>What it does</h4>
        <p>
          <strong>Bulk payments</strong> — up to 10,000 payments of any amount in a single
          batch, submitted as a recipient list. <strong>Onboarded wallets</strong> —
          receivers get an SMS or email invitation and create a wallet through a guided
          registration flow; existing Stellar addresses work too. <strong>Real-time
          tracking</strong> — a dashboard shows batch and per-payment status, and every
          payment is recorded on-chain for full auditability. <strong>Role-based
          controls</strong> — user permissions for the sending organization, with
          independently audited code. <strong>Privacy by architecture</strong> —
          recipients’ personal data stays in your self-hosted infrastructure; only
          payment records touch the public ledger.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>The architecture in one paragraph</h4>
        <p>
          Two services share a database. The <strong>Core</strong> server hosts the admin
          dashboard, the recipient registration UI, and the API; it queues payments into a{' '}
          <code>submitter_transactions</code> table. The <strong>Transaction Submission
          Server (TSS)</strong> polls that table, builds and submits Stellar transactions,
          and tracks each until it lands in a ledger or fails permanently. The whole thing
          ships as a Go backend (<code>stellar/stellar-disbursement-platform-backend</code>),
          a web frontend, and Helm charts for Kubernetes — self-hosted, so no third party
          ever sees recipient data.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>When it’s the right tool — and when it isn’t</h4>
        <p>
          Reach for the SDP when the problem is <em>many recipients, low friction</em>:
          payroll to contractors, gig payouts, aid distribution, supplier payments,
          government transfers. Network fees are a fraction of a cent per payment and
          settlement is seconds. Skip it when recipients already run corporate treasury
          ops (use an anchor or direct integration instead), or when you need the payments
          themselves to be private — the ledger is public by design. If you need help
          scoping a disbursement or payment-infrastructure deployment — wallet
          integrations, anchor selection, ISO 20022 reconciliation —{' '}
          <a href="https://www.ogtechnologies.co/products/payment-infrastructure/" target="_blank" rel="noopener noreferrer">OG Technologies</a>{' '}
          builds exactly this class of Stellar payment systems (its Mozart Pay product runs
          USDC/EURC settlement in production) and starts with a free architecture review.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>Keep learning</h4>
        <p>
          <a href="https://developers.stellar.org/docs/platforms/stellar-disbursement-platform" target="_blank" rel="noopener noreferrer">SDP docs</a> ·
          <a href="https://stellar.org/products-and-tools/disbursement-platform" target="_blank" rel="noopener noreferrer"> Product page</a> ·
          <a href="https://github.com/stellar/stellar-disbursement-platform-backend" target="_blank" rel="noopener noreferrer"> Backend repo</a> ·
          <a href="/stellar"> Stellar hub</a> ·
          <a href="/blog/are-stablecoins-decentralized"> Stablecoins explained</a> ·
          <a href="/masterclasses/stablecoins-in-practice"> Stablecoins masterclass</a> ·
          <a href="/masterclasses/stellar-network-development"> Stellar Network masterclass</a>
        </p>
      </ArticleLayout>
    </>
  );
}
