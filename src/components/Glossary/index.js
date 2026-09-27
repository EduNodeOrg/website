import React, { Component } from "react";
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { clearErrors } from "../../actions/errorActions";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import NavBar from "../NavBar";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import { styled } from '@mui/material/styles';
import { Helmet } from 'react-helmet';

const PageContainer = styled(Box)({
  minHeight: '100vh',
  background: 'linear-gradient(180deg, #0a0e27 0%, #1a1f3a 50%, #2d1b69 100%)',
});

const GlassAccordion = styled(Accordion)({
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '12px !important',
  color: '#b8c5d6',
  marginBottom: '12px',
  '&:before': {
    display: 'none',
  },
  '& .MuiAccordionSummary-expandIconWrapper': {
    color: '#00d4ff',
  },
  '& .MuiAccordionSummary-content .MuiTypography-root': {
    color: '#ffffff',
    fontWeight: 600,
  },
});

const SectionTitle = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(4),
  background: 'linear-gradient(45deg, #00d4ff, #7b2ff7)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  fontWeight: 'bold',
}));

const slugify = (term) =>
  term
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const GLOSSARY_TERMS = [
  { term: 'Blockchain', definition: 'A type of distributed ledger that holds transaction data in "blocks" which are cryptographically linked and secured.', links: [{ label: 'Learn about Blockchain', href: 'https://edunode.org/blog/learn-about-blockchain' }] },
  { term: 'Bitcoin', definition: 'The first successful implementation of a digital currency using blockchain technology, invented by an anonymous person or group of people under the pseudonym Satoshi Nakamoto.' },
  { term: 'Ethereum', definition: 'A blockchain-based platform that supports smart contracts, enabling more complex financial and logistical operations beyond simple transactions.', links: [{ label: 'Ethereum Basics course', href: 'https://edunode.org/courses/107' }] },
  { term: 'Stellar', definition: 'Stellar makes it possible to create, send, and trade digital representations of all forms of money: dollars, pesos, bitcoin, pretty much anything. It’s designed so all the world’s financial systems can work together on a single network.', links: [{ label: 'Stellar course: Basic Concepts', href: 'https://edunode.org/courses/101' }] },
  { term: 'Smart Contract', definition: 'A self-executing contract with the terms of the agreement directly written into code. They automatically enforce and execute when conditions in the contract are met.', links: [{ label: 'What are Smart Contracts?', href: 'https://edunode.org/blog/smart-contracts' }, { label: 'Top 10 Smart Contract Security Vulnerabilities', href: 'https://edunode.org/blog/smart-contract-security-vulnerabilities' }] },
  { term: 'Decentralized Application (DApp)', definition: 'Applications that run on a decentralized network, rather than being controlled by a single authority or organization.' },
  { term: 'Decentralized Finance (DeFi)', definition: 'A sector of blockchain-based applications designed to eliminate traditional financial intermediaries, offering services like lending, borrowing, and trading.', links: [{ label: 'What Is DeFi? A Beginner’s Guide', href: 'https://edunode.org/blog/what-is-defi' }, { label: 'DeFi Protocol Engineering course', href: 'https://edunode.org/courses/114' }] },
  { term: 'Web3', definition: 'Short for "Web 3.0", this term represents the next generation of the internet, one where decentralized blockchain technologies and cryptocurrencies play a vital role.', links: [{ label: 'The Web3 Revolution', href: 'https://edunode.org/blog/the-web3-revolution' }, { label: 'Web3 Fundamentals Masterclass', href: 'https://edunode.org/courses/112' }] },
  { term: 'NFT (Non-Fungible Token)', definition: 'A type of digital asset that represents ownership or proof of authenticity of a unique item or piece of content, using blockchain technology. Unlike cryptocurrencies which are fungible, NFTs are unique and can\'t be exchanged like-for-like.', links: [{ label: 'How to mint NFTs on Stellar', href: 'https://edunode.org/blog/minting-nfts' }, { label: 'NFT Marketplace Development course', href: 'https://edunode.org/courses/115' }] },
  { term: 'Cryptocurrency', definition: 'A type of digital or virtual currency that uses cryptography for security. Bitcoin, Ethereum, and Litecoin are examples.' },
  { term: 'Mining', definition: 'The process of validating and adding new transactions to a blockchain\'s ledger, often requiring significant computational power.' },
  { term: 'Wallet', definition: 'A digital tool that allows users to interact with a blockchain network. Wallets can hold cryptographic keys that allow a user to send and receive cryptocurrencies.', links: [{ label: 'Freighter Wallet setup guide', href: 'https://edunode.org/blog/freighter-wallet' }] },
  { term: 'Gas', definition: 'The fee required to perform a transaction or execute a contract on the Ethereum network.' },
  { term: 'DAO (Decentralized Autonomous Organization)', definition: 'An organization represented by rules encoded as a computer program that is transparent, controlled by the organization members and not influenced by a central government.' },
  { term: 'Proof of Work (PoW)', definition: 'A consensus algorithm used in blockchain networks where miners compete to solve a complex mathematical problem first. It is used to validate transactions and produce new blocks to the chain.' },
  { term: 'Proof of Stake (PoS)', definition: 'An alternative to PoW, where validators are chosen to create a new block based on the amount of cryptocurrency they hold and are willing to "stake" as collateral.' },
  { term: 'Layer 2', definition: 'Secondary frameworks or protocols built on top of an existing blockchain network to improve its scalability and efficiency.' },
  { term: 'Stablecoin', definition: 'A type of cryptocurrency that is designed to maintain a stable value by being pegged to a reserve of assets, often a specific amount of fiat currency like the US dollar.', links: [{ label: 'What Is a Stablecoin? USDC on Stellar', href: 'https://edunode.org/blog/what-is-a-stablecoin' }] },
  { term: 'Token', definition: 'A digital representation of a particular asset or utility that resides on top of another blockchain. Tokens can represent any assets that are fungible and tradable.' },
  { term: 'Interoperability', definition: 'The ability for different blockchain networks to communicate and interact with each other.', links: [{ label: 'Cross-Chain Development course', href: 'https://edunode.org/courses/117' }] },
  { term: 'Sharding', definition: 'A scalability solution that involves dividing a blockchain into several smaller, more manageable pieces, or "shards," each capable of processing its own transactions and smart contracts.' },
  { term: 'Lumens (XLM)', definition: 'The native cryptocurrency of the Stellar network. Lumens serve as a bridge currency for transactions involving different currencies and are used to pay for transaction fees on the network.', links: [{ label: 'Stellarnomics: Stellar Network economics', href: 'https://edunode.org/blog/Stellarnomics' }, { label: 'How to keep your lumens safe', href: 'https://edunode.org/blog/security-tools' }] },
  { term: 'Stellar Consensus Protocol (SCP)', definition: 'The consensus algorithm used by the Stellar network. It provides a way to reach consensus without relying on a closed system to accurately record financial transactions.' },
  { term: 'Federated Byzantine Agreement (FBA)', definition: 'The model of consensus employed by the SCP, which requires nodes to only trust a subset of the overall network. This model strikes a balance between decentralization and efficiency.' },
  { term: 'Stellar Development Foundation (SDF)', definition: 'The organization responsible for maintaining and overseeing the development of the Stellar network.' },
  { term: 'Anchors', definition: 'Entities within the Stellar network that issue assets and take deposits. They serve as a bridge between existing financial systems and the Stellar network.', links: [{ label: 'Anchors course', href: 'https://edunode.org/courses/103' }] },
  { term: 'Stellar Core', definition: 'The software that nodes on the Stellar network run to validate transactions and reach consensus.', links: [{ label: 'Stellar Nodes map', href: 'https://edunode.org/stellarnodes' }] },
  { term: 'Path Payment', definition: 'A feature of the Stellar network that allows a user to send one type of asset while the receiver gets another type of asset. Stellar automatically converts the asset at the most favorable rate.' },
  { term: 'Stellar Toml', definition: 'A TOML file that Stellar service providers host to allow clients to discover information about their organization. It includes information such as the organization\'s currency documentation, images, brand color, etc.' },
  { term: 'Multi-Signature', definition: 'A security feature that requires multiple parties to sign a transaction before it can be executed. Stellar supports multi-signature transactions, enhancing the security of the network.', links: [{ label: 'Stellar operations course', href: 'https://edunode.org/courses/102' }] },
  { term: 'Node', definition: 'A fundamental unit in a network or data structure, representing a point of connection or an element in a graph. In blockchain, a node is a computing device that participates in the network by maintaining a copy of the ledger.', links: [{ label: 'Stellar Nodes map', href: 'https://edunode.org/stellarnodes' }] },
  { term: 'Soroban', definition: 'Stellar\'s smart contracts platform. Soroban contracts are written in Rust and compiled to WebAssembly, enabling scalable and secure decentralized applications on Stellar.', links: [{ label: 'What is Soroban?', href: 'https://edunode.org/blog/soroban' }, { label: 'Soroban course', href: 'https://edunode.org/courses/106' }] },
  { term: 'Horizon', definition: 'The client-facing API server for the Stellar ecosystem. Applications use Horizon to submit transactions and query ledger data from the network.' },
  { term: 'Trustline', definition: 'A Stellar account setting that authorizes the account to hold a specific issued asset. An account must establish a trustline before it can receive any non-native asset.', links: [{ label: 'How to issue assets on Stellar', href: 'https://edunode.org/blog/How-to-issue' }] },
  { term: 'Automated Market Maker (AMM)', definition: 'A type of decentralized exchange protocol that prices assets algorithmically using liquidity pools instead of a traditional order book.', links: [{ label: 'DeFi Explained: What is an AMM?', href: 'https://edunode.org/blog/automated-market-maker' }] },
  { term: 'Liquidity Pool', definition: 'A pool of two tokens locked in a smart contract that enables decentralized trading and provides liquidity. On Stellar, liquidity pools are built into the protocol layer.' },
  { term: 'Oracle', definition: 'A service that feeds real-world or off-chain data, such as asset prices, to smart contracts so they can execute based on external events.', links: [{ label: 'Oracles Basics course', href: 'https://edunode.org/courses/108' }] },
  { term: 'Seed Phrase', definition: 'A human-readable list of words (usually 12 or 24) that encodes a wallet\'s private keys. Anyone with the seed phrase can control the funds, so it must be kept secret and offline.', links: [{ label: 'Crypto Wallet Security guide', href: 'https://edunode.org/blog/crypto-wallet-security' }] },
  { term: 'Public & Private Keys', definition: 'A cryptographic keypair where the public key identifies an account and the private key proves ownership by signing transactions. The private key must never be shared.' },
  { term: 'Mainnet', definition: 'The primary, production blockchain network where transactions have real economic value, as opposed to test networks used for development.' },
  { term: 'Testnet', definition: 'A parallel blockchain network used for testing and development. Testnet assets have no real value, and Stellar\'s testnet is reset periodically.' },
  { term: 'Tokenization', definition: 'The process of representing real-world or digital assets — stocks, real estate, currencies — as tokens on a blockchain so they can be traded and managed programmatically.', links: [{ label: 'RWA Tokenization Explained', href: 'https://edunode.org/blog/rwa-tokenization' }] },
  { term: 'Cross-Chain Bridge', definition: 'A protocol that enables assets or data to move between different blockchain networks.', links: [{ label: 'Cross-Chain Development course', href: 'https://edunode.org/courses/117' }] },
  { term: 'Zero-Knowledge Proof (ZKP)', definition: 'A cryptographic method that lets one party prove a statement is true without revealing the underlying information.', links: [{ label: 'Zero-Knowledge Proofs on Stellar', href: 'https://edunode.org/blog/zero-knowledge-proofs' }] },
  { term: 'Distributed Ledger', definition: 'A database that is shared and synchronized across multiple nodes or locations, with no central administrator. Blockchains are a type of distributed ledger.' },
  { term: 'Validator', definition: 'A network participant (node) responsible for verifying transactions and helping the network reach consensus on the state of the ledger.' },
  { term: 'Stellar Ecosystem Proposal (SEP)', definition: 'A standards document describing protocols and conventions for the Stellar ecosystem — similar to Ethereum\'s EIPs — covering things like asset issuance and interoperability.', links: [{ label: 'SEPs course', href: 'https://edunode.org/courses/104' }] },
  { term: 'WebAssembly (Wasm)', definition: 'A portable binary instruction format that lets code written in languages like Rust run efficiently in sandboxed environments. Soroban smart contracts compile to Wasm.', links: [{ label: 'Code Playground', href: 'https://edunode.org/codeeditor' }] },
  { term: 'Airdrop', definition: 'The distribution of free tokens to wallet addresses, often used for marketing, rewarding early users, or decentralizing token ownership.' },
  { term: 'Non-Custodial Wallet', definition: 'A wallet where the user alone controls the private keys and funds — "not your keys, not your coins" — versus custodial wallets where a third party holds the keys.', links: [{ label: 'Crypto Wallet Security guide', href: 'https://edunode.org/blog/crypto-wallet-security' }] },
  { term: 'Base Reserve', definition: 'A minimum amount of XLM that every Stellar account must hold to exist on the ledger. It prevents ledger spam and funds subentries like trustlines.' },
  { term: 'Account Abstraction', definition: 'A design that moves account logic into smart contracts, enabling features like social recovery, passkey signers, and sponsored fees instead of a single private key controlling everything.' },
  { term: 'Cold Wallet', definition: 'A wallet whose private keys are generated and stored offline — e.g., a hardware wallet or paper backup — making it resistant to online attacks.', links: [{ label: 'Crypto Wallet Security guide', href: 'https://edunode.org/blog/crypto-wallet-security' }] },
  { term: 'Flash Loan', definition: 'An uncollateralized DeFi loan that must be borrowed and repaid within a single transaction. Used for arbitrage — and, when abused, for oracle manipulation attacks.', links: [{ label: 'Smart Contract Security Vulnerabilities', href: 'https://edunode.org/blog/smart-contract-security-vulnerabilities' }] },
  { term: 'Fungible Token', definition: 'A token where each unit is identical and interchangeable — like XLM or USDC — in contrast to NFTs, where each token is unique.' },
  { term: 'Hardware Wallet', definition: 'A physical device that stores private keys offline and signs transactions internally, so keys never touch an internet-connected computer.', links: [{ label: 'Crypto Wallet Security guide', href: 'https://edunode.org/blog/crypto-wallet-security' }] },
  { term: 'Impermanent Loss', definition: 'The loss liquidity providers can suffer when the price ratio of pooled tokens changes compared to simply holding them — a core risk of providing liquidity to AMMs.' },
  { term: 'MEV (Maximal Extractable Value)', definition: 'Profit that block producers or searchers can extract by reordering, inserting, or censoring transactions within a block — e.g., front-running DEX trades.' },
  { term: 'Passkey', definition: 'A phishing-resistant credential based on WebAuthn that replaces passwords — and increasingly seed phrases — with biometrics or device-bound keys.' },
  { term: 'Rollup', definition: 'A Layer 2 scaling technique that executes transactions off-chain and posts compressed proofs or data to the main chain, inheriting its security.' },
  { term: 'RPC (Remote Procedure Call)', definition: 'The interface applications use to talk to a blockchain node — reading balances, submitting transactions, and querying contract state.' },
  { term: 'Total Value Locked (TVL)', definition: 'The total value of assets deposited in a DeFi protocol\'s smart contracts — a common metric for comparing protocol adoption.', links: [{ label: 'What Is DeFi?', href: 'https://edunode.org/blog/what-is-defi' }] },
];

// DefinedTermSet structured data — lets search engines and AI answer
// engines parse every term definition directly.
const glossaryLd = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTermSet',
  name: 'EduNode Web3 & Blockchain Glossary',
  url: 'https://edunode.org/glossary',
  description:
    'A glossary of popular Web3, blockchain, and Stellar terms — from smart contracts and DeFi to Soroban, Horizon, and the Stellar Consensus Protocol.',
  hasDefinedTerm: GLOSSARY_TERMS.map(({ term, definition }) => ({
    '@type': 'DefinedTerm',
    name: term,
    description: definition,
    url: `https://edunode.org/glossary#${slugify(term)}`,
  })),
};

class Glossary extends Component {
    constructor(props) {
        super(props);
        this.state = {
          email: this.props.auth && this.props.auth.user && this.props.auth.user.email ? this.props.auth.user.email : 'anonymous',
          showAddGlossary: false,
          newWord: '',
          newDefinition: '',
          search: '',
          expanded: typeof window !== 'undefined' && window.location.hash
            ? window.location.hash.slice(1)
            : null,
        };
      }

      handleAddGlossaryClick = () => {
        this.setState({ showAddGlossary: true });
      };

      handleWordChange = (event) => {
        this.setState({ newWord: event.target.value });
      };

      handleDefinitionChange = (event) => {
        this.setState({ newDefinition: event.target.value });
      };

      handleSearchChange = (event) => {
        this.setState({ search: event.target.value });
      };

      handleAccordionChange = (slug) => (_event, isExpanded) => {
        this.setState({ expanded: isExpanded ? slug : null });
      };

      handleSubmit = () => {
        const { email, newWord, newDefinition } = this.state;

        // Validate the inputs
        if (!email || !newWord || !newDefinition) {
          return;
        }

        // Create the request body
        const requestBody = {
          email,
          word: newWord,
          definition: newDefinition,
        };

        // Send a POST request to store the glossary entry
        fetch('https://edunode.herokuapp.com/api/glossary', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        })
          .then((response) => response.json())
          .then(() => {
            // Clear the input fields and hide the add glossary form
            this.setState({ newWord: '', newDefinition: '', showAddGlossary: false });
          })
          .catch((error) => {
            console.error('Error storing glossary entry:', error);
          });
      };

    render() {
        const { showAddGlossary, newWord, newDefinition, search, expanded } = this.state;
        const query = search.trim().toLowerCase();
        const filteredTerms = GLOSSARY_TERMS
          .filter(({ term, definition }) =>
            !query ||
            term.toLowerCase().includes(query) ||
            definition.toLowerCase().includes(query)
          )
          .sort((a, b) => a.term.localeCompare(b.term));

        const letters = [...new Set(filteredTerms.map(({ term }) => term[0].toUpperCase()))];
        let lastLetter = null;

        return (
            <>
            <Helmet>
              <meta charSet="utf-8" />
              <title>Web3 & Blockchain Glossary | EduNode</title>
              <link rel="canonical" href="https://edunode.org/glossary" />
              <meta
                name="description"
                content="A glossary of popular Web3, blockchain, and Stellar terms — from smart contracts and DeFi to Soroban, Horizon, and the Stellar Consensus Protocol."
              />
              <meta property="og:type" content="website" />
              <meta property="og:title" content="Web3 & Blockchain Glossary | EduNode" />
              <meta
                property="og:description"
                content="Clear definitions of Web3, blockchain, and Stellar terms — smart contracts, DeFi, Soroban, trustlines, and more."
              />
              <meta property="og:url" content="https://edunode.org/glossary" />
              <meta name="twitter:card" content="summary" />
              <meta name="twitter:title" content="Web3 & Blockchain Glossary | EduNode" />
              <meta
                name="twitter:description"
                content="Clear definitions of Web3, blockchain, and Stellar terms — smart contracts, DeFi, Soroban, trustlines, and more."
              />
              <script type="application/ld+json">{JSON.stringify(glossaryLd)}</script>
            </Helmet>
            <NavBar />
            <PageContainer>
              <main>
                <Box sx={{ pt: 8, pb: 6, textAlign: 'center' }}>
                  <Container maxWidth="sm">
                    <SectionTitle variant="h3" component="h1">
                      Web3 & Blockchain Glossary
                    </SectionTitle>
                    <Typography variant="h6" sx={{ color: '#b8c5d6', mb: 2 }}>
                      Plain-language definitions of popular Web3, blockchain, and Stellar
                      ecosystem terms — each linked to deeper EduNode courses and articles.
                    </Typography>
                  </Container>
                </Box>
                <Container sx={{ pb: 8 }} maxWidth="md">
                  <TextField
                    fullWidth
                    placeholder="Search terms..."
                    value={search}
                    onChange={this.handleSearchChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon sx={{ color: '#00d4ff' }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      mb: 2,
                      '& .MuiOutlinedInput-root': {
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '12px',
                        color: '#ffffff',
                        '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' },
                        '&:hover fieldset': { borderColor: '#00d4ff' },
                        '&.Mui-focused fieldset': { borderColor: '#00d4ff' },
                      },
                      '& .MuiInputBase-input::placeholder': { color: '#b8c5d6', opacity: 1 },
                    }}
                  />

                  <Box
                    component="nav"
                    aria-label="Jump to letter"
                    sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}
                  >
                    {letters.map((letter) => (
                      <Box
                        component="a"
                        key={letter}
                        href={`#letter-${letter}`}
                        sx={{
                          color: '#00d4ff',
                          fontWeight: 600,
                          fontSize: '0.85rem',
                          textDecoration: 'none',
                          px: 1,
                          py: 0.25,
                          borderRadius: '8px',
                          border: '1px solid rgba(255,255,255,0.15)',
                          '&:hover': { borderColor: '#00d4ff' },
                        }}
                      >
                        {letter}
                      </Box>
                    ))}
                  </Box>

                  <Typography sx={{ color: '#b8c5d6', mb: 2 }}>
                    {filteredTerms.length} term{filteredTerms.length === 1 ? '' : 's'}
                  </Typography>

                  {filteredTerms.map(({ term, definition, links }, index) => {
                    const slug = slugify(term);
                    const letter = term[0].toUpperCase();
                    const letterMarker =
                      letter !== lastLetter ? ((lastLetter = letter), letter) : null;
                    return (
                      <React.Fragment key={term}>
                        {letterMarker && (
                          <Box
                            id={`letter-${letterMarker}`}
                            component="h2"
                            sx={{
                              color: '#00d4ff',
                              fontSize: '0.9rem',
                              fontWeight: 700,
                              letterSpacing: '2px',
                              mt: index === 0 ? 0 : 3,
                              mb: 1.5,
                              scrollMarginTop: '100px',
                            }}
                          >
                            {letterMarker}
                          </Box>
                        )}
                        <GlassAccordion
                          id={slug}
                          expanded={expanded === slug}
                          onChange={this.handleAccordionChange(slug)}
                          sx={{ scrollMarginTop: '100px' }}
                        >
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`glossary-panel-${index}-content`}
                            id={`glossary-panel-${index}-header`}
                          >
                            <Typography>{term}</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography component="div">
                              {definition}
                              {links && links.length > 0 && (
                                <Box component="span" sx={{ display: 'block', mt: 1 }}>
                                  {links.map((link) => (
                                    <Box
                                      component="a"
                                      key={link.href}
                                      href={link.href}
                                      sx={{
                                        color: '#00d4ff',
                                        textDecoration: 'none',
                                        mr: 2,
                                        fontSize: '0.9rem',
                                        fontWeight: 600,
                                        '&:hover': { textDecoration: 'underline' },
                                      }}
                                    >
                                      {link.label} →
                                    </Box>
                                  ))}
                                </Box>
                              )}
                            </Typography>
                          </AccordionDetails>
                        </GlassAccordion>
                      </React.Fragment>
                    );
                  })}

                  <Box sx={{ mt: 6, textAlign: 'center' }}>
                    {showAddGlossary ? (
                      <Box
                        sx={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '16px',
                          p: 3,
                          textAlign: 'left',
                        }}
                      >
                        <TextField
                          fullWidth
                          placeholder="Enter word"
                          value={newWord}
                          onChange={this.handleWordChange}
                          sx={{
                            mb: 2,
                            '& .MuiOutlinedInput-root': {
                              background: 'rgba(255, 255, 255, 0.05)',
                              color: '#ffffff',
                              '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' },
                              '&:hover fieldset': { borderColor: '#00d4ff' },
                              '&.Mui-focused fieldset': { borderColor: '#00d4ff' },
                            },
                            '& .MuiInputBase-input::placeholder': { color: '#b8c5d6', opacity: 1 },
                          }}
                        />
                        <TextField
                          fullWidth
                          placeholder="Enter definition"
                          value={newDefinition}
                          onChange={this.handleDefinitionChange}
                          sx={{
                            mb: 2,
                            '& .MuiOutlinedInput-root': {
                              background: 'rgba(255, 255, 255, 0.05)',
                              color: '#ffffff',
                              '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' },
                              '&:hover fieldset': { borderColor: '#00d4ff' },
                              '&.Mui-focused fieldset': { borderColor: '#00d4ff' },
                            },
                            '& .MuiInputBase-input::placeholder': { color: '#b8c5d6', opacity: 1 },
                          }}
                        />
                        <Button
                          variant="contained"
                          onClick={this.handleSubmit}
                          sx={{
                            background: 'linear-gradient(45deg, #7b2ff7, #00d4ff)',
                            color: 'white',
                            fontWeight: 'bold',
                            borderRadius: '25px',
                            px: 4,
                            '&:hover': {
                              background: 'linear-gradient(45deg, #00d4ff, #7b2ff7)',
                            },
                          }}
                        >
                          Submit
                        </Button>
                      </Box>
                    ) : (
                      <Button
                        variant="contained"
                        onClick={this.handleAddGlossaryClick}
                        sx={{
                          background: 'linear-gradient(45deg, #7b2ff7, #00d4ff)',
                          color: 'white',
                          fontWeight: 'bold',
                          borderRadius: '25px',
                          px: 4,
                          '&:hover': {
                            background: 'linear-gradient(45deg, #00d4ff, #7b2ff7)',
                          },
                        }}
                      >
                        Add your own Glossary term
                      </Button>
                    )}
                  </Box>
                </Container>
              </main>
            </PageContainer>
            </>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    auth: state.auth
})

Glossary = connect(
    mapStateToProps
)(Glossary)

export default Glossary = reduxForm({
    form: "postReduxForm",
    clearErrors,
})(Glossary)
