import React from 'react';
import { Helmet } from 'react-helmet-async';
import BuildIcon from '@material-ui/icons/Build';
import ArticleLayout, { articleStyles as s } from './ArticleLayout';

const shareUrl = 'https://edunode.org/blog/how-stablecoins-work';
const title = 'How Stablecoins Work: Fiat-Backed vs Crypto-Backed vs Algorithmic';
const description = 'How stablecoins hold their peg: fiat-backed reserves (USDC), crypto-collateralized vaults (DAI), commodity backing, and why algorithmic stablecoins failed — explained simply.';
const image = 'https://edunode.org/og/how-stablecoins-work.png';
const accent = 'linear-gradient(135deg, #0b3d5c 0%, #00add8 55%, #6B48FF 100%)';
const color = '#0b6d8c';

const faqs = [
  {
    q: 'How does a stablecoin keep its peg?',
    a: 'Through arbitrage anchored by redemption. If USDC trades at $0.98, traders buy it cheap and redeem it with Circle for $1, pocketing the difference — pushing the price back to the peg. The mechanism differs by type: fiat-backed coins redeem for dollars, crypto-backed ones for collateral, algorithmic ones had only incentives.',
  },
  {
    q: 'What backs USDC?',
    a: 'USDC is backed 1:1 by US dollar-denominated assets: cash at regulated banks and short-term US Treasuries, largely held in the BlackRock-managed Circle Reserve Fund. Monthly attestations verify reserves meet or exceed circulating supply.',
  },
  {
    q: 'Why are crypto-backed stablecoins over-collateralized?',
    a: 'Because the collateral is volatile. DAI vaults typically require $150+ of ETH for every $100 of DAI minted. If ETH falls, positions get liquidated before the stablecoin becomes under-backed — the buffer absorbs normal price swings.',
  },
  {
    q: 'Why did TerraUSD (UST) collapse?',
    a: 'UST held its peg through an algorithmic mint/burn relationship with LUNA rather than reserves. When confidence broke in May 2022, redemptions minted more LUNA, crashing its price, which destroyed confidence further — a "death spiral" that erased roughly $40B in days.',
  },
];

const articleLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: title,
  description,
  author: { '@type': 'Person', name: 'Olvis Gil', url: 'https://edunode.org' },
  publisher: { '@type': 'Organization', name: 'EduNode', url: 'https://edunode.org' },
  datePublished: '2026-10-25',
  image,
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

const rows = [
  ['Backing', 'Dollars and Treasuries in bank/custody accounts', 'Volatile crypto locked in smart contract vaults', 'None — market incentives and a paired token'],
  ['Peg mechanism', '1:1 redemption with the issuer', 'Over-collateralization + automatic liquidations', 'Mint/burn arbitrage with a volatile sister token'],
  ['Examples', 'USDC, USDT, PYUSD', 'DAI, LUSD', 'UST (collapsed 2022), FRAX (hybrid)'],
  ['Main risk', 'Issuer/bank failure, freeze powers', 'Collateral crashes faster than liquidations', 'Death spiral — no floor under the peg'],
  ['Decentralization', 'Low — company controls mint/freeze', 'Medium — DAO-governed but depends on collateral mix', 'High in design, catastrophic in practice'],
];

export default function HowStablecoinsWork() {
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
        heroIcon={<BuildIcon style={s.heroIcon} />}
        heroText="Three different machines, one promise: a token that holds its value"
        tag="Stablecoins · Mechanism Design"
        title={title}
        date="October 25, 2026"
        readTime="10 min read"
        shareUrl={shareUrl}
        shareTitle={title}
        faqs={faqs}
      >
        <p>
          Every stablecoin makes the same promise — a token worth exactly one dollar (or one euro, or
          one gram of gold) — but they keep that promise with very different machines. There are three
          dominant designs: fiat-backed reserves, crypto-collateralized vaults, and algorithmic supply
          mechanics. Knowing which machine stands behind a token tells you what can break it.
        </p>

        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>The shared trick: arbitrage</h4>
        <p>
          All stablecoins rely on the same force to hold their peg: if the market price dips below $1,
          someone should be able to buy the token cheap and exchange it for $1 of value, pocketing the
          difference — and their buying pushes the price back up. Where designs differ is <em>what</em> you
          can redeem the token for: actual dollars, collateral in a vault, or nothing at all.
        </p>

        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>Fiat-backed: the IOU model</h4>
        <p>
          USDC and USDT work like tokenized bank deposits. Circle takes your dollars, puts them in
          bank accounts and short-term Treasury funds, and mints an equivalent token. When you redeem,
          it burns the token and wires back dollars. The peg holds because arbitrageurs can always
          redeem at par with the issuer — buying discounted USDC on an exchange and cashing it out with
          Circle is free money until the price recovers.
        </p>
        <p>
          The model's strength is simplicity: reserves are verifiable and redemptions are reliable.
          Its weaknesses live off-chain — the issuer must actually hold the money (attestations matter),
          its banks must stay solvent (the 2023 SVB crisis briefly depegged USDC to $0.87), and the
          issuer can freeze tokens at the contract level.
        </p>

        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>Crypto-collateralized: the pawnshop model</h4>
        <p>
          DAI removes the company but keeps the collateral — the backing just lives on-chain instead of
          in a bank. You lock $150 of ETH in a smart contract vault and mint up to $100 of DAI against
          it. If your collateral's value falls toward the loan, the contract automatically sells it
          (liquidation) before the system becomes under-backed. The over-collateralization buffer —
          typically 150% or more — absorbs ETH's volatility so the stablecoin does not have to.
        </p>
        <p>
          This design is genuinely decentralized at the contract level: no company can freeze your DAI
          or deny your redemption. The compromises are capital inefficiency (you need $1.50 to create
          $1) and collateral drift — a large share of DAI's backing today is itself USDC and tokenized
          Treasuries, reintroducing the centralized dependencies it was built to escape.
        </p>

        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>Algorithmic: the confidence model</h4>
        <p>
          Algorithmic stablecoins removed collateral entirely and tried to hold the peg with incentives
          alone. TerraUSD (UST) could always be swapped for $1 of its sister token LUNA: buy UST at
          $0.95, burn it for $1 of LUNA, profit. That mechanism worked — until it did not. When
          confidence broke in May 2022, redemptions minted so much LUNA that its price collapsed,
          making each redemption worth less, triggering more redemptions. The reflexive "death spiral"
          erased roughly $40 billion in days.
        </p>
        <div style={s.callout}>
          <strong>The lesson:</strong> a peg needs something to redeem <em>against</em>. Incentives can
          maintain a peg while confidence holds, but they cannot restore it once broken. Since UST,
          major algorithmic designs have either added real collateral (making them hybrids) or faded
          entirely.
        </div>

        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>Side by side</h4>
        <table style={s.table}>
          <thead>
            <tr><th style={s.th}></th><th style={s.th}>Fiat-backed</th><th style={s.th}>Crypto-backed</th><th style={s.th}>Algorithmic</th></tr>
          </thead>
          <tbody>
            {rows.map(([label, fiat, crypto, algo]) => (
              <tr key={label}>
                <td style={s.td}><strong>{label}</strong></td>
                <td style={s.td}>{fiat}</td>
                <td style={s.td}>{crypto}</td>
                <td style={s.td}>{algo}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>Which model should you trust?</h4>
        <p>
          For payments, savings, and building products, fiat-backed stablecoins from transparent,
          regulated issuers are the practical choice — their risks are known and monitored. For
          censorship-resistant DeFi collateral, over-collateralized designs offer real (if imperfect)
          decentralization. And for algorithmic designs promising yield, the lesson of UST is
          permanent: ask what the peg redeems into, and what happens when everyone redeems at once.
        </p>
        <p>
          Keep exploring in the <a href="/stablecoins" style={{ color }}>stablecoins hub</a> — read{' '}
          <a href="/blog/usdc-vs-usdt" style={{ color }}>USDC vs USDT</a>, see{' '}
          <a href="/blog/usdc-on-stellar" style={{ color }}>how USDC works on Stellar</a>, or practice
          with the{' '}
          <a href="/masterclasses/stablecoins-in-practice" style={{ color }}>Stablecoins in Practice masterclass</a>.
        </p>
      </ArticleLayout>
    </>
  );
}
