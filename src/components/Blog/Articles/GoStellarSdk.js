import React, { Component } from 'react';
import NavBar from '../../NavBar';
import profilePicImg from '../mepic.png';
import CodeIcon from '@material-ui/icons/Code';
import {
  FacebookShareCount,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
} from 'react-share';
import { Helmet } from 'react-helmet-async';

const styles = {
  page: {
    background: '#f8f9fc',
    minHeight: '100vh',
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
  },
  hero: {
    background: 'linear-gradient(135deg, #0b3d5c 0%, #00add8 55%, #6B48FF 100%)',
    padding: '72px 24px',
    textAlign: 'center',
    color: '#fff',
  },
  heroIcon: {
    fontSize: '72px',
    marginBottom: '12px',
    display: 'inline-block',
    filter: 'drop-shadow(0 6px 18px rgba(0,0,0,0.35))',
  },
  heroText: {
    fontSize: '1.15rem',
    fontWeight: '600',
    letterSpacing: '0.5px',
    opacity: 0.92,
    maxWidth: '720px',
    margin: '0 auto',
  },
  wrapper: {
    maxWidth: '780px',
    margin: '0 auto',
    padding: '40px 24px 80px',
  },
  tag: {
    display: 'inline-block',
    background: 'linear-gradient(135deg, #00add8, #6B48FF)',
    color: '#fff',
    fontSize: '12px',
    fontWeight: '700',
    letterSpacing: '1.2px',
    textTransform: 'uppercase',
    padding: '4px 12px',
    borderRadius: '20px',
    marginBottom: '16px',
  },
  title: {
    fontSize: '2.4rem',
    fontWeight: '800',
    lineHeight: '1.25',
    color: '#0d0d2b',
    marginBottom: '12px',
  },
  meta: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '32px',
    color: '#666',
    fontSize: '14px',
  },
  avatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '2px solid #00add8',
  },
  divider: {
    border: 'none',
    borderTop: '1px solid #e4e8f0',
    margin: '32px 0',
  },
  body: {
    fontSize: '1.05rem',
    lineHeight: '1.85',
    color: '#2d2d3a',
  },
  h4: {
    fontSize: '1.3rem',
    fontWeight: '700',
    color: '#0d0d2b',
    marginTop: '36px',
    marginBottom: '12px',
    paddingBottom: '6px',
    borderBottom: '3px solid #00add8',
    display: 'inline-block',
  },
  callout: {
    background: 'linear-gradient(135deg, #e8f7fc, #f0ecff)',
    borderLeft: '4px solid #00add8',
    borderRadius: '8px',
    padding: '16px 20px',
    margin: '24px 0',
    fontSize: '1rem',
    color: '#2d2d3a',
    lineHeight: '1.7',
  },
  warn: {
    background: 'linear-gradient(135deg, #fff3e8, #ffece0)',
    borderLeft: '4px solid #e07b00',
    borderRadius: '8px',
    padding: '16px 20px',
    margin: '24px 0',
    fontSize: '1rem',
    color: '#2d2d3a',
    lineHeight: '1.7',
  },
  codeBlock: {
    background: '#0d0d2b',
    color: '#d7e8f0',
    padding: '18px 20px',
    borderRadius: '10px',
    overflowX: 'auto',
    fontSize: '0.82rem',
    lineHeight: '1.65',
    margin: '16px 0',
    fontFamily: "'SF Mono', 'Fira Code', Menlo, Consolas, monospace",
    whiteSpace: 'pre',
  },
  inlineCode: {
    background: '#e4f5fb',
    color: '#0b5d78',
    padding: '1px 6px',
    borderRadius: '4px',
    fontSize: '0.9em',
    fontFamily: "'SF Mono', 'Fira Code', Menlo, Consolas, monospace",
    wordBreak: 'break-all',
  },
  stepCard: {
    background: '#fff',
    border: '1px solid #e4e8f0',
    borderRadius: '12px',
    padding: '16px 20px',
    marginBottom: '12px',
    boxShadow: '0 2px 8px rgba(0,173,216,0.07)',
  },
  stepTitle: {
    fontWeight: '700',
    color: '#00add8',
    marginBottom: '4px',
    fontSize: '1rem',
  },
  faqItem: {
    background: '#fff',
    border: '1px solid #e4e8f0',
    borderRadius: '12px',
    padding: '16px 20px',
    marginBottom: '12px',
  },
  faqQ: {
    fontWeight: '700',
    color: '#0d0d2b',
    marginBottom: '6px',
    fontSize: '1rem',
  },
  refLink: {
    color: '#6B48FF',
    textDecoration: 'none',
    wordBreak: 'break-all',
  },
  shareSection: {
    marginTop: '40px',
    paddingTop: '24px',
    borderTop: '1px solid #e4e8f0',
  },
  shareLabel: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '12px',
  },
  shareButtons: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
  },
  authorCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    background: '#fff',
    border: '1px solid #e4e8f0',
    borderRadius: '16px',
    padding: '24px',
    marginTop: '48px',
    boxShadow: '0 4px 20px rgba(0,173,216,0.1)',
  },
  authorAvatar: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '3px solid #00add8',
    flexShrink: 0,
  },
  authorName: {
    fontWeight: '700',
    fontSize: '1.1rem',
    color: '#0d0d2b',
    marginBottom: '4px',
  },
  authorBio: {
    fontSize: '0.9rem',
    color: '#555',
    lineHeight: '1.5',
    margin: 0,
  },
};

const setupCode = `mkdir stellar-pay && cd stellar-pay
go mod init stellar-pay

# Official SDF SDK — the building blocks
go get github.com/stellar/go-stellar-sdk@latest

# Community CLI that wraps it — for terminal + scripting work
go install github.com/stellar-go-cli/stellar-go-cli/cmd/stellar-go-cli@latest`;

const friendbotCode = `# Generate a testnet keypair in code:
#   kp, _ := keypair.Random()
#   fmt.Println(kp.Address()) // G...
#   fmt.Println(kp.Seed())    // S...

# Then fund it with Friendbot (10,000 test XLM):
curl "https://friendbot.stellar.org/?addr=GABC...YOUR_ADDRESS"`;

const paymentCode = `package main

import (
	"fmt"
	"log"

	"github.com/stellar/go-stellar-sdk/clients/horizonclient"
	"github.com/stellar/go-stellar-sdk/keypair"
	"github.com/stellar/go-stellar-sdk/network"
	"github.com/stellar/go-stellar-sdk/txnbuild"
)

func main() {
	// Testnet secret — never hardcode a real secret key
	kp := keypair.MustParseFull("SXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
	client := horizonclient.DefaultTestNetClient

	// 1. Load the source account (gets the current sequence number)
	sourceAccount, err := client.AccountDetail(horizonclient.AccountRequest{
		AccountID: kp.Address(),
	})
	if err != nil {
		log.Fatal(err)
	}

	// 2. The operation: send 10 XLM
	payment := txnbuild.Payment{
		Destination: "GYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY",
		Amount:      "10",
		Asset:       txnbuild.NativeAsset{},
	}

	// 3. Assemble the transaction envelope
	tx, err := txnbuild.NewTransaction(txnbuild.TransactionParams{
		SourceAccount:        &sourceAccount,
		IncrementSequenceNum: true,
		BaseFee:              txnbuild.MinBaseFee,
		Preconditions: txnbuild.Preconditions{
			TimeBounds: txnbuild.NewTimeout(300),
		},
		Operations: []txnbuild.Operation{&payment},
	})
	if err != nil {
		log.Fatal(err)
	}

	// 4. Sign for the testnet passphrase and submit
	tx, err = tx.Sign(network.TestNetworkPassphrase, kp)
	if err != nil {
		log.Fatal(err)
	}

	resp, err := client.SubmitTransaction(tx)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Paid! Hash:", resp.Hash)
}`;

const cliPayCode = `# One-time setup
stellar-go-cli init
stellar-go-cli wallet connect --provider stellar --network stellar-testnet
stellar-go-cli wallet fund --network stellar-testnet   # Friendbot under the hood

# The same payment — one line, no boilerplate
stellar-go-cli pay send --to GYYYY... --amount 10 --asset XLM
stellar-go-cli wallet balance`;

const contractCliCode = `# Deploy a compiled Soroban WASM contract — pure Go, no stellar CLI needed
stellar-go-cli contract deploy --wasm hello_contract.wasm --network stellar-testnet
# → prints Contract ID (C...) and saves it to your config

# Call a method on it
stellar-go-cli contract invoke --fn increment

# Read-only call — simulated, nothing submitted on-chain
stellar-go-cli contract invoke --fn get_count --simulate`;

const contractGoCode = `// The CLI's Soroban client is a public Go package you can import:
import (
	"context"

	"github.com/stellar-go-cli/stellar-go-cli/pkg/soroban"
	"github.com/stellar/go-stellar-sdk/keypair"
)

client := soroban.NewClientForNetwork("stellar-testnet")
defer client.Close()

kp := keypair.MustParseFull("S...")

// Submit a real invocation — simulate, assemble, sign, send, poll: done for you
res, err := client.Invoke(ctx, kp, "CDEF...CONTRACT_ID", "increment", nil)
// res.TxHash is your on-chain receipt

// Read-only path — simulation only, no fees, no signature needed
ret, err := client.SimulateOnly(ctx, "CDEF...CONTRACT_ID", "get_count", nil)`;

const iso20022Code = `import (
	"github.com/stellar-go-cli/stellar-go-cli/pkg/iso20022"
	"github.com/stellar-go-cli/stellar-go-cli/pkg/models"
)

// One batch disbursement, N receivers — NbOfTxs / CtrlSum computed for you
xmlDoc, err := iso20022.BuildPain001(
	[]*iso20022.CreditTransferInstruction{
		{
			Payment: &models.Payment{
				ID: "pay-001", To: "GRCVR1...", Amount: "10", Asset: "USDC",
			},
			Creditor: &iso20022.Party{
				Name: "Receiver One", Phone: "+221-77XXXXXXX",
			},
		},
	},
	&iso20022.Pain001Options{
		InitiatingParty: &iso20022.Party{Name: "Relief Org"},
		Debtor:          &iso20022.Party{AcctID: "GORG...", AgentBIC: "DEUTDEFF"},
	},
)`;

const mcpCode = `# Expose wallet/pay/swap as tools for AI assistants
stellar-go-cli mcp                              # stdio — Claude Desktop, etc.
stellar-go-cli mcp --transport sse --port 3000  # SSE over HTTP for remote agents`;

export default class GoStellarSdk extends Component {
  render() {
    const shareUrl = 'https://edunode.org/blog/build-stellar-apps-with-go';
    const title = "Payments, Smart Contracts, and a Terminal: A Go Developer's Guide to Stellar";
    const profilePic = profilePicImg;

    const reasons = [
      {
        name: 'Fast, deterministic finality',
        desc: 'Ledgers close every ~5 seconds and confirmed transactions are final — no reorgs, no "wait N confirmations" logic in your service code.',
      },
      {
        name: 'Fees measured in fractions of a cent',
        desc: 'A 100-stroop base fee (0.00001 XLM) makes micropayments, streaming payments, and machine-to-machine settlement actually viable.',
      },
      {
        name: 'Real-world assets built in',
        desc: 'Native USDC, a built-in decentralized exchange, and anchor fiat rails mean a payment API is already half-built before you write a line.',
      },
      {
        name: 'An official, maintained Go SDK',
        desc: 'go-stellar-sdk is maintained by the Stellar Development Foundation — txnbuild, Horizon and RPC clients, XDR primitives, plus ingestion and processor libraries for data pipelines.',
      },
      {
        name: 'Go is where payment backends live',
        desc: 'Services, CLIs, daemons, ETL jobs — the places Go dominates are exactly the places blockchain integration code runs.',
      },
    ];

    const faqs = [
      {
        q: 'Is there an official Go SDK for Stellar?',
        a: 'Yes. github.com/stellar/go-stellar-sdk is maintained by the Stellar Development Foundation. It used to be the SDF Go monorepo (github.com/stellar/go); in October 2025 it was refactored into a focused SDK, while services like Horizon, Galexie, and Friendbot moved to their own repositories.',
      },
      {
        q: 'Can I write Stellar smart contracts in Go?',
        a: 'Soroban contracts compile to WebAssembly and the canonical toolchain is Rust — Go is not a supported contract language today. What Go does excel at is everything around the contract: deploying the WASM, invoking methods, simulating calls, and building services that orchestrate contract workflows.',
      },
      {
        q: 'What is the difference between Horizon and Stellar RPC?',
        a: 'Horizon is the REST API for the "classic" layer: accounts, payments, offers, history, and transaction submission. Stellar RPC is the leaner API used for Soroban: contract simulation, invocation, ledger entries, and events. Most payment apps talk to Horizon; contract-heavy apps talk to RPC; many use both.',
      },
      {
        q: 'Is stellar-go-cli an official SDF tool?',
        a: 'No — it is a community project (Apache 2.0) built on top of the official SDK. It was extracted from a commercial codebase and covers wallets, payments, swaps, Soroban deployment, ISO 20022 reporting, DIDs/VCs, and an MCP server for AI assistants.',
      },
      {
        q: 'Can it produce ISO 20022 files for banks or donors?',
        a: 'Yes — the CLI ships pkg/iso20022, a Go package that turns Stellar payments into XSD-valid ISO 20022 XML: pain.001 batch disbursement initiations, camt.054 settlement notifications, and pacs.008/002/004/009 interbank messages. It is aimed squarely at Stellar Disbursement Platform-style flows where an NGO or payroll provider must hand structured XML to a bank, donor, or auditor.',
      },
      {
        q: 'How do I test without real money?',
        a: 'Everything in this guide runs on testnet. Friendbot funds any testnet address with 10,000 test XLM for free. When you are ready for mainnet, the same code works — you just swap the client, network passphrase, and RPC endpoint to the public network.',
      },
    ];

    const articleLd = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: title,
      description:
        'A practical Go developer\'s guide to Stellar: send payments with go-stellar-sdk (txnbuild + horizonclient), script ops with stellar-go-cli, and invoke Soroban smart contracts from Go.',
      author: { '@type': 'Person', name: 'Olvis Gil', url: 'https://edunode.org' },
      publisher: { '@type': 'Organization', name: 'EduNode', url: 'https://edunode.org' },
      datePublished: '2026-09-27',
      image: 'https://edunode.org/og/build-stellar-apps-with-go.png',
      mainEntityOfPage: shareUrl,
    };

    const faqLd = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    };

    return (
      <div style={styles.page}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{title}</title>
          <link rel="canonical" href={shareUrl} />
          <meta
            name="description"
            content="A Go developer's guide to Stellar: payments with go-stellar-sdk (txnbuild + horizonclient), terminal ops with stellar-go-cli, and invoking Soroban smart contracts from Go."
          />
          <meta property="og:type" content="article" />
          <meta property="og:title" content={title} />
          <meta
            property="og:description"
            content="Build, sign, and submit Stellar payments in Go with the official SDK — then do it in one line from the terminal with stellar-go-cli, plus Soroban contract calls."
          />
          <meta property="og:url" content={shareUrl} />
          <meta property="og:image" content="https://edunode.org/og/build-stellar-apps-with-go.png" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:image" content="https://edunode.org/og/build-stellar-apps-with-go.png" />
          <meta name="twitter:title" content={title} />
          <meta
            name="twitter:description"
            content="Build, sign, and submit Stellar payments in Go with the official SDK — then do it in one line from the terminal with stellar-go-cli, plus Soroban contract calls."
          />
          <script type="application/ld+json">{JSON.stringify(articleLd)}</script>
          <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
        </Helmet>

        <NavBar />

        <div style={styles.hero}>
          <CodeIcon style={styles.heroIcon} />
          <div style={styles.heroText}>
            One of the fastest payment networks meets one of the best backend languages
          </div>
        </div>

        <div style={styles.wrapper}>
          <div style={styles.tag}>Go · Stellar · Tutorial</div>
          <h1 style={styles.title}>{title}</h1>
          <div style={styles.meta}>
            <img src={profilePic} style={styles.avatar} alt="Olvis Gil" />
            <span>
              <strong>Olvis Gil</strong> &nbsp;·&nbsp; September 27, 2026 &nbsp;·&nbsp; 9 min read
            </span>
          </div>

          <hr style={styles.divider} />

          <div style={styles.body}>
            <p>
              If you write Go services and need to move money on-chain, Stellar is the
              friendliest integration you will find this side of a REST API. There is an official
              SDK maintained by the Stellar Development Foundation —{' '}
              <a href="https://github.com/stellar/go-stellar-sdk" style={styles.refLink}>
                go-stellar-sdk
              </a>{' '}
              — and a community CLI that wraps it for humans and scripts —{' '}
              <a href="https://github.com/stellar-go-cli/stellar-go-cli" style={styles.refLink}>
                stellar-go-cli
              </a>
              . This guide goes from zero to a signed payment on testnet, then to a deployed{' '}
              <a href="https://edunode.org/blog/soroban" style={styles.refLink}>
                Soroban
              </a>{' '}
              smart contract, all without leaving the Go ecosystem.
            </p>

            <h4 style={styles.h4}>Why Stellar, why Go — the 60-second pitch</h4>
            {reasons.map((r, i) => (
              <div key={i} style={styles.stepCard}>
                <div style={styles.stepTitle}>{r.name}</div>
                <p style={{ margin: 0, fontSize: '0.95rem', color: '#444' }}>{r.desc}</p>
              </div>
            ))}
            <p>
              One bit of history worth knowing: the SDK repo used to be the SDF Go monorepo (
              <code style={styles.inlineCode}>github.com/stellar/go</code>). In October 2025 it was
              refactored into a focused SDK — services like Horizon, Galexie, and Friendbot moved to
              their own repositories. If you find old imports using <code style={styles.inlineCode}>github.com/stellar/go/...</code>,
              they resolve to the same codebase; new projects should use the{' '}
              <code style={styles.inlineCode}>go-stellar-sdk</code> path.
            </p>

            <h4 style={styles.h4}>Setup in 5 minutes</h4>
            <pre style={styles.codeBlock}><code>{setupCode}</code></pre>
            <p>
              Next you need an account and test funds. Generate a keypair with{' '}
              <code style={styles.inlineCode}>keypair.Random()</code> (or let the CLI create a
              wallet for you), then hit Friendbot — the testnet faucet:
            </p>
            <pre style={styles.codeBlock}><code>{friendbotCode}</code></pre>
            <div style={styles.callout}>
              <strong>Testnet ≠ mainnet.</strong> Friendbot coins are worthless — that is the point.
              Everything below runs on testnet; going live is a matter of swapping the Horizon/RPC
              endpoint and the network passphrase, not rewriting code.
            </div>

            <h4 style={styles.h4}>Your first payment</h4>
            <p>
              Every Stellar transaction follows the same pipeline: load the source account (for its
              sequence number), describe operations, assemble the envelope, sign against the network
              passphrase, submit. Here is a complete payment in about 40 lines:
            </p>
            <pre style={styles.codeBlock}><code>{paymentCode}</code></pre>
            <p>
              Run it and you get back a transaction hash — the payment is already final, roughly
              five seconds after submission. Swap <code style={styles.inlineCode}>txnbuild.NativeAsset{'{}'}</code> for{' '}
              <code style={styles.inlineCode}>txnbuild.CreditAsset{'{'}Code: "USDC", Issuer: "..."{'}'}</code>{' '}
              and the same code sends stablecoins. Batch operations into one transaction and you get
              atomic settlement of up to 100 payments for one base fee — the trick payroll and
              disbursement services are built on.
            </p>

            <h4 style={styles.h4}>The terminal shortcut</h4>
            <p>
              Writing forty lines to test a payment idea is fine in a service; in a shell it is
              friction. stellar-go-cli wraps the SDK so the same operation is one command — and
              because it is a real binary, it composes with bash, cron, and CI:
            </p>
            <pre style={styles.codeBlock}><code>{cliPayCode}</code></pre>
            <p>
              Under the hood it is doing exactly what the Go program did — account lookup,
              txnbuild, signing, submission — plus the operational extras you end up wanting:
              <code style={styles.inlineCode}>swap quote</code>/<code style={styles.inlineCode}>execute</code> for
              DEX path payments, <code style={styles.inlineCode}>asset trust</code> for trustlines,{' '}
              <code style={styles.inlineCode}>claimable</code> balances for async payouts, and{' '}
              <code style={styles.inlineCode}>report iso20022</code> to export payments as
              banking-standard XML.
            </p>
            <div style={styles.warn}>
              <strong>Know your supply chain:</strong> stellar-go-cli is a community project
              (Apache 2.0), not an SDF product. It was extracted from a commercial codebase and is
              young — pin a version, skim the source, and keep mainnet secrets in a signer rather
              than a config file.
            </div>

            <h4 style={styles.h4}>Smart contracts</h4>
            <p>
              Stellar's contract platform is Soroban — contracts compile to WebAssembly and the
              canonical toolchain is Rust. Go's role is everything around the contract: deploying
              the WASM, invoking methods, simulating reads, and orchestrating workflows. From the
              terminal:
            </p>
            <pre style={styles.codeBlock}><code>{contractCliCode}</code></pre>
            <p>
              The same functionality lives in the CLI's public <code style={styles.inlineCode}>pkg/soroban</code>{' '}
              package — a pure-Go RPC client you can import when you want contract calls inside a
              service rather than a script:
            </p>
            <pre style={styles.codeBlock}><code>{contractGoCode}</code></pre>
            <p>
              If you need full control, the official SDK exposes the same primitives directly: build
              a <code style={styles.inlineCode}>txnbuild.InvokeHostFunction</code> operation,
              simulate it with <code style={styles.inlineCode}>clients/rpcclient</code> to get the
              Soroban transaction data and auth entries, rebuild, sign, send, and poll{' '}
              <code style={styles.inlineCode}>GetTransaction</code> until it lands. That is
              literally the loop the CLI runs for you — worth knowing, worth not typing by hand.
            </p>

            <h4 style={styles.h4}>The disbursement angle: ISO 20022 for SDP-style flows</h4>
            <p>
              If you run disbursements or payroll on the{' '}
              <a href="https://stellar.org/stellar-disbursement-platform" style={styles.refLink}>
                Stellar Disbursement Platform
              </a>
              , you already know the hard part is rarely the blockchain hop — it is the paperwork
              after it. NGOs and payroll providers routinely need to hand a{' '}
              <code style={styles.inlineCode}>pain.001</code> (batch disbursement initiation) or a{' '}
              <code style={styles.inlineCode}>camt.054</code> (settlement notification) to a bank,
              donor, or auditor — and today that usually means a hand-built spreadsheet. The CLI
              ships <code style={styles.inlineCode}>pkg/iso20022</code>, a Go package that turns
              Stellar payments into ISO 20022 XML validated against the official XSDs:
            </p>
            <ul>
              <li>
                <code style={styles.inlineCode}>pain.001</code> — one disbursement batch, N
                receivers (name, phone/email, or wallet handle as a proxy), with{' '}
                <code style={styles.inlineCode}>NbOfTxs</code>/<code style={styles.inlineCode}>CtrlSum</code>{' '}
                computed automatically
              </li>
              <li>
                <code style={styles.inlineCode}>camt.054</code> — settlement notifications back to
                the org or donor
              </li>
              <li>
                <code style={styles.inlineCode}>pacs.008/.002/.004/.009</code> — per-transaction and
                batch interbank messages
              </li>
              <li>
                Stellar assets map to <code style={styles.inlineCode}>Ccy="XXX"</code> with the
                asset code and issuer preserved in <code style={styles.inlineCode}>SplmtryData</code>,
                so USDC from different issuers stays distinguishable — a detail that matters to
                compliance teams
              </li>
            </ul>
            <pre style={styles.codeBlock}><code>{iso20022Code}</code></pre>
            <p>
              From the shell, <code style={styles.inlineCode}>stellar-go-cli report iso20022 --type pacs.008</code>{' '}
              does the same job over your payment history — which means it can slot into an SDP
              deployment two ways: as an integration inside the disbursement pipeline, or as a
              standalone CLI step run over the SDP API after a batch settles. If your org moves aid
              or payroll on Stellar and someone downstream is asking for ISO 20022 files, this is
              the shortest path from ledger entry to bank-grade XML.
            </p>

            <h4 style={styles.h4}>Where to go next</h4>
            <p>
              <strong>Data pipelines.</strong> The SDK ships <code style={styles.inlineCode}>ingest</code> and{' '}
              <code style={styles.inlineCode}>processors</code> — libraries for parsing raw ledger
              data from Captive Core or a Galexie data lake. If you are building analytics,
              compliance reporting, or indexers, start there instead of scraping Horizon.
            </p>
            <p>
              <strong>AI-assisted workflows.</strong> stellar-go-cli can run as an MCP server,
              exposing wallet, payment, and swap operations as tools that AI assistants can call:
            </p>
            <pre style={styles.codeBlock}><code>{mcpCode}</code></pre>
            <p>
              Point your agent at it and "check my testnet balance and send 5 XLM to this address"
              becomes a real tool call — an early taste of agents that can hold and move money.
              Combined with our{' '}
              <a href="https://edunode.org/blog/ai-and-blockchain" style={styles.refLink}>
                AI × blockchain
              </a>{' '}
              article, that is a fun rabbit hole.
            </p>
            <p>
              <strong>Keep learning.</strong> The{' '}
              <a href="https://edunode.org/courses/106" style={styles.refLink}>
                Soroban course
              </a>{' '}
              goes deeper on contract development, the{' '}
              <a href="https://edunode.org/blog/what-is-a-stablecoin" style={styles.refLink}>
                stablecoin guide
              </a>{' '}
              covers the assets your payments will probably carry, and the{' '}
              <a href="https://edunode.org/blog/blockchain-developer-roadmap" style={styles.refLink}>
                developer roadmap
              </a>{' '}
              maps the rest of the journey.
            </p>

            <h4 style={styles.h4}>Frequently asked questions</h4>
            {faqs.map((f, i) => (
              <div key={i} style={styles.faqItem}>
                <div style={styles.faqQ}>{f.q}</div>
                <p style={{ margin: 0, fontSize: '0.95rem', color: '#444' }}>{f.a}</p>
              </div>
            ))}

            <h4 style={styles.h4}>References</h4>
            <p>
              [1]{' '}
              <a href="https://github.com/stellar/go-stellar-sdk" style={styles.refLink}>
                stellar/go-stellar-sdk — official SDF Go SDK
              </a>
            </p>
            <p>
              [2]{' '}
              <a href="https://github.com/stellar-go-cli/stellar-go-cli" style={styles.refLink}>
                stellar-go-cli/stellar-go-cli — community Go CLI for Stellar
              </a>
            </p>
            <p>
              [3]{' '}
              <a href="https://developers.stellar.org" style={styles.refLink}>
                Stellar Developer Docs
              </a>
            </p>
            <p>
              [4]{' '}
              <a href="https://pkg.go.dev/github.com/stellar/go-stellar-sdk" style={styles.refLink}>
                go-stellar-sdk on pkg.go.dev
              </a>
            </p>
          </div>

          <div style={styles.shareSection}>
            <div style={styles.shareLabel}>Share this article</div>
            <div style={styles.shareButtons}>
              <FacebookShareButton url={shareUrl} quote={title}>
                <FacebookIcon size={36} round />
              </FacebookShareButton>
              <FacebookShareCount url={shareUrl}>
                {(count) => (count > 0 ? <span style={{ fontSize: '12px', color: '#888' }}>{count}</span> : null)}
              </FacebookShareCount>
              <TwitterShareButton url={shareUrl} title={title}>
                <TwitterIcon size={36} round />
              </TwitterShareButton>
              <LinkedinShareButton url={shareUrl}>
                <LinkedinIcon size={36} round />
              </LinkedinShareButton>
            </div>
          </div>

          <div style={styles.authorCard}>
            <img src={profilePic} style={styles.authorAvatar} alt="Olvis Gil" />
            <div>
              <div style={styles.authorName}>Olvis Gil</div>
              <p style={styles.authorBio}>
                Founder of{' '}
                <a href="https://edunode.org" style={{ color: '#6B48FF' }}>
                  EduNode
                </a>{' '}
                and{' '}
                <a href="https://www.mozartpay.com" style={{ color: '#6B48FF' }}>
                  MozartPay
                </a>
                . Web3 educator, payment technology expert, and ISO standardisation contributor
                based in Vienna, Austria.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
