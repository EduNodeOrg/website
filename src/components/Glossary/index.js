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

const GLOSSARY_TERMS = [
  { term: 'Blockchain', definition: 'A type of distributed ledger that holds transaction data in "blocks" which are cryptographically linked and secured.' },
  { term: 'Bitcoin', definition: 'The first successful implementation of a digital currency using blockchain technology, invented by an anonymous person or group of people under the pseudonym Satoshi Nakamoto.' },
  { term: 'Ethereum', definition: 'A blockchain-based platform that supports smart contracts, enabling more complex financial and logistical operations beyond simple transactions.' },
  { term: 'Stellar', definition: 'Stellar makes it possible to create, send, and trade digital representations of all forms of money: dollars, pesos, bitcoin, pretty much anything. It’s designed so all the world’s financial systems can work together on a single network.' },
  { term: 'Smart Contract', definition: 'A self-executing contract with the terms of the agreement directly written into code. They automatically enforce and execute when conditions in the contract are met.' },
  { term: 'Decentralized Application (DApp)', definition: 'Applications that run on a decentralized network, rather than being controlled by a single authority or organization.' },
  { term: 'Decentralized Finance (DeFi)', definition: 'A sector of blockchain-based applications designed to eliminate traditional financial intermediaries, offering services like lending, borrowing, and trading.' },
  { term: 'Web3', definition: 'Short for "Web 3.0", this term represents the next generation of the internet, one where decentralized blockchain technologies and cryptocurrencies play a vital role.' },
  { term: 'NFT (Non-Fungible Token)', definition: 'A type of digital asset that represents ownership or proof of authenticity of a unique item or piece of content, using blockchain technology. Unlike cryptocurrencies which are fungible, NFTs are unique and can\'t be exchanged like-for-like.' },
  { term: 'Cryptocurrency', definition: 'A type of digital or virtual currency that uses cryptography for security. Bitcoin, Ethereum, and Litecoin are examples.' },
  { term: 'Mining', definition: 'The process of validating and adding new transactions to a blockchain\'s ledger, often requiring significant computational power.' },
  { term: 'Wallet', definition: 'A digital tool that allows users to interact with a blockchain network. Wallets can hold cryptographic keys that allow a user to send and receive cryptocurrencies.' },
  { term: 'Gas', definition: 'The fee required to perform a transaction or execute a contract on the Ethereum network.' },
  { term: 'DAO (Decentralized Autonomous Organization)', definition: 'An organization represented by rules encoded as a computer program that is transparent, controlled by the organization members and not influenced by a central government.' },
  { term: 'Proof of Work (PoW)', definition: 'A consensus algorithm used in blockchain networks where miners compete to solve a complex mathematical problem first. It is used to validate transactions and produce new blocks to the chain.' },
  { term: 'Proof of Stake (PoS)', definition: 'An alternative to PoW, where validators are chosen to create a new block based on the amount of cryptocurrency they hold and are willing to "stake" as collateral.' },
  { term: 'Layer 2', definition: 'Secondary frameworks or protocols built on top of an existing blockchain network to improve its scalability and efficiency.' },
  { term: 'Stablecoin', definition: 'A type of cryptocurrency that is designed to maintain a stable value by being pegged to a reserve of assets, often a specific amount of fiat currency like the US dollar.' },
  { term: 'Token', definition: 'A digital representation of a particular asset or utility that resides on top of another blockchain. Tokens can represent any assets that are fungible and tradable.' },
  { term: 'Interoperability', definition: 'The ability for different blockchain networks to communicate and interact with each other.' },
  { term: 'Sharding', definition: 'A scalability solution that involves dividing a blockchain into several smaller, more manageable pieces, or "shards," each capable of processing its own transactions and smart contracts.' },
  { term: 'Lumens (XLM)', definition: 'The native cryptocurrency of the Stellar network. Lumens serve as a bridge currency for transactions involving different currencies and are used to pay for transaction fees on the network.' },
  { term: 'Stellar Consensus Protocol (SCP)', definition: 'The consensus algorithm used by the Stellar network. It provides a way to reach consensus without relying on a closed system to accurately record financial transactions.' },
  { term: 'Federated Byzantine Agreement (FBA)', definition: 'The model of consensus employed by the SCP, which requires nodes to only trust a subset of the overall network. This model strikes a balance between decentralization and efficiency.' },
  { term: 'Stellar Development Foundation (SDF)', definition: 'The organization responsible for maintaining and overseeing the development of the Stellar network.' },
  { term: 'Anchors', definition: 'Entities within the Stellar network that issue assets and take deposits. They serve as a bridge between existing financial systems and the Stellar network.' },
  { term: 'Stellar Core', definition: 'The software that nodes on the Stellar network run to validate transactions and reach consensus.' },
  { term: 'Path Payment', definition: 'A feature of the Stellar network that allows a user to send one type of asset while the receiver gets another type of asset. Stellar automatically converts the asset at the most favorable rate.' },
  { term: 'Stellar Toml', definition: 'A TOML file that Stellar service providers host to allow clients to discover information about their organization. It includes information such as the organization\'s currency documentation, images, brand color, etc.' },
  { term: 'Multi-Signature', definition: 'A security feature that requires multiple parties to sign a transaction before it can be executed. Stellar supports multi-signature transactions, enhancing the security of the network.' },
  { term: 'Node', definition: 'A fundamental unit in a network or data structure, representing a point of connection or an element in a graph. In blockchain, a node is a computing device that participates in the network by maintaining a copy of the ledger.' },
  { term: 'Soroban', definition: 'Stellar\'s smart contracts platform. Soroban contracts are written in Rust and compiled to WebAssembly, enabling scalable and secure decentralized applications on Stellar.' },
  { term: 'Horizon', definition: 'The client-facing API server for the Stellar ecosystem. Applications use Horizon to submit transactions and query ledger data from the network.' },
  { term: 'Trustline', definition: 'A Stellar account setting that authorizes the account to hold a specific issued asset. An account must establish a trustline before it can receive any non-native asset.' },
  { term: 'Automated Market Maker (AMM)', definition: 'A type of decentralized exchange protocol that prices assets algorithmically using liquidity pools instead of a traditional order book.' },
  { term: 'Liquidity Pool', definition: 'A pool of two tokens locked in a smart contract that enables decentralized trading and provides liquidity. On Stellar, liquidity pools are built into the protocol layer.' },
  { term: 'Oracle', definition: 'A service that feeds real-world or off-chain data, such as asset prices, to smart contracts so they can execute based on external events.' },
  { term: 'Seed Phrase', definition: 'A human-readable list of words (usually 12 or 24) that encodes a wallet\'s private keys. Anyone with the seed phrase can control the funds, so it must be kept secret and offline.' },
  { term: 'Public & Private Keys', definition: 'A cryptographic keypair where the public key identifies an account and the private key proves ownership by signing transactions. The private key must never be shared.' },
  { term: 'Mainnet', definition: 'The primary, production blockchain network where transactions have real economic value, as opposed to test networks used for development.' },
  { term: 'Testnet', definition: 'A parallel blockchain network used for testing and development. Testnet assets have no real value, and Stellar\'s testnet is reset periodically.' },
  { term: 'Tokenization', definition: 'The process of representing real-world or digital assets — stocks, real estate, currencies — as tokens on a blockchain so they can be traded and managed programmatically.' },
  { term: 'Cross-Chain Bridge', definition: 'A protocol that enables assets or data to move between different blockchain networks.' },
  { term: 'Zero-Knowledge Proof (ZKP)', definition: 'A cryptographic method that lets one party prove a statement is true without revealing the underlying information.' },
  { term: 'Distributed Ledger', definition: 'A database that is shared and synchronized across multiple nodes or locations, with no central administrator. Blockchains are a type of distributed ledger.' },
  { term: 'Validator', definition: 'A network participant (node) responsible for verifying transactions and helping the network reach consensus on the state of the ledger.' },
  { term: 'Stellar Ecosystem Proposal (SEP)', definition: 'A standards document describing protocols and conventions for the Stellar ecosystem — similar to Ethereum\'s EIPs — covering things like asset issuance and interoperability.' },
  { term: 'WebAssembly (Wasm)', definition: 'A portable binary instruction format that lets code written in languages like Rust run efficiently in sandboxed environments. Soroban smart contracts compile to Wasm.' },
  { term: 'Airdrop', definition: 'The distribution of free tokens to wallet addresses, often used for marketing, rewarding early users, or decentralizing token ownership.' },
  { term: 'Non-Custodial Wallet', definition: 'A wallet where the user alone controls the private keys and funds — "not your keys, not your coins" — versus custodial wallets where a third party holds the keys.' },
  { term: 'Base Reserve', definition: 'A minimum amount of XLM that every Stellar account must hold to exist on the ledger. It prevents ledger spam and funds subentries like trustlines.' },
];

class Glossary extends Component {
    constructor(props) {
        super(props);
        this.state = {
          email: this.props.auth && this.props.auth.user && this.props.auth.user.email ? this.props.auth.user.email : 'anonymous',
          showAddGlossary: false,
          newWord: '',
          newDefinition: '',
          search: '',
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
        const { showAddGlossary, newWord, newDefinition, search } = this.state;
        const query = search.trim().toLowerCase();
        const filteredTerms = GLOSSARY_TERMS
          .filter(({ term, definition }) =>
            !query ||
            term.toLowerCase().includes(query) ||
            definition.toLowerCase().includes(query)
          )
          .sort((a, b) => a.term.localeCompare(b.term));

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
            </Helmet>
            <NavBar />
            <PageContainer>
              <main>
                <Box sx={{ pt: 8, pb: 6, textAlign: 'center' }}>
                  <Container maxWidth="sm">
                    <SectionTitle variant="h3">
                      Glossary
                    </SectionTitle>
                    <Typography variant="h6" sx={{ color: '#b8c5d6', mb: 2 }}>
                      Popular terms in Web3, blockchain, and the Stellar ecosystem.
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
                      mb: 4,
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

                  <Typography sx={{ color: '#b8c5d6', mb: 2 }}>
                    {filteredTerms.length} term{filteredTerms.length === 1 ? '' : 's'}
                  </Typography>

                  {filteredTerms.map(({ term, definition }, index) => (
                    <GlassAccordion key={term}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`glossary-panel-${index}-content`}
                        id={`glossary-panel-${index}-header`}
                      >
                        <Typography>{term}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          {definition}
                        </Typography>
                      </AccordionDetails>
                    </GlassAccordion>
                  ))}

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
