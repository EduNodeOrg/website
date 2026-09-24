// Course 112 — Web3 Fundamentals Masterclass (free for logged-in users)
const course = {
  id: '112',
  title: 'Web3 Fundamentals Masterclass',
  description:
    'Learn the basics of Web3 development, blockchain technology, and decentralized applications.',
  difficulty: 'beginner',
  rating: 4.8,
  duration: '6 weeks',
  proOnly: false,
  diplomaEndpoint: 'diploma11',
  modules: [
    {
      title: 'What Is Web3 and Why It Matters',
      summary:
        'Understand the evolution from Web1 to Web3, what blockchains actually do, and why decentralization changes how software is built.',
      lessons: [
        {
          type: 'heading',
          text: 'From Web1 to Web3',
        },
        {
          type: 'paragraph',
          text: 'Web1 (roughly 1990–2005) was read-only: static pages you could browse but not interact with. Web2 added interactivity — social networks, e-commerce, SaaS — but concentrated data and power in a handful of platforms that own your content, identity, and graph. Web3 proposes a different model: applications built on public blockchains where users own their assets, identity, and data, and where rules are enforced by open protocols rather than corporate policy.',
        },
        {
          type: 'paragraph',
          text: 'A blockchain is a shared, append-only ledger maintained by a network of independent computers. Instead of one company keeping the database, thousands of nodes keep identical copies and agree on every change through a consensus mechanism. Once written, records cannot be altered without the network noticing — this is what makes "trustless" applications possible.',
        },
        {
          type: 'heading',
          text: 'Core Properties of Blockchains',
        },
        {
          type: 'list',
          items: [
            'Decentralized — no single party controls the ledger; thousands of validators keep copies.',
            'Immutable — confirmed transactions cannot be edited or deleted, only appended.',
            'Permissionless — anyone can read the chain, hold an address, and send transactions.',
            'Programmable — smart contracts let you encode business logic that runs exactly as written.',
            'Transparent — every transaction is publicly auditable in real time.',
          ],
        },
        {
          type: 'callout',
          text: 'Key idea: a blockchain lets strangers agree on shared state (who owns what, what code ran) without trusting a central operator.',
        },
        {
          type: 'heading',
          text: 'Where Web3 Is Used Today',
        },
        {
          type: 'paragraph',
          text: 'The most mature use cases are financial: payments and stablecoins, decentralized exchanges, lending protocols, and tokenized assets. Beyond finance you find NFTs and digital ownership, DAOs (internet-native organizations with on-chain treasuries), decentralized identity, and decentralized storage networks like IPFS and Arweave. In this course you will learn the mental models and tools behind all of them.',
        },
      ],
      quiz: [
        {
          question: 'What is the defining characteristic of a blockchain?',
          options: [
            'It is a database hosted by a single company',
            'It is a shared, append-only ledger maintained by many independent nodes',
            'It is a file format for storing images',
            'It is a faster version of the internet',
          ],
          correctIndex: 1,
          explanation:
            'A blockchain is replicated across many nodes that agree on each new entry via consensus — no single operator controls it.',
        },
        {
          question: 'Which statement best describes Web3?',
          options: [
            'Websites with more interactive JavaScript',
            'A new version of HTML',
            'Applications on public blockchains where users own assets and identity',
            'A marketing term for mobile apps',
          ],
          correctIndex: 2,
          explanation:
            'Web3 is about user ownership and open protocols enforced by blockchains, not a UI or language upgrade.',
        },
        {
          question: 'What does "immutability" mean on a blockchain?',
          options: [
            'Data cannot be read by anyone',
            'Confirmed data cannot be altered — new entries are only appended',
            'Transactions are free',
            'The chain never grows',
          ],
          correctIndex: 1,
          explanation:
            'Immutability means history is tamper-evident: you append new state, you never rewrite confirmed state.',
        },
      ],
    },
    {
      title: 'Wallets, Keys, and Addresses',
      summary:
        'Learn how public-key cryptography secures accounts, what wallets really store, and how to manage seed phrases safely.',
      lessons: [
        {
          type: 'heading',
          text: 'Public-Key Cryptography in One Minute',
        },
        {
          type: 'paragraph',
          text: 'Every blockchain account is a key pair. The private key is a secret number that can produce digital signatures. The public key is derived from it and can be shared; an address is typically a shortened, checksummed form of the public key. Anyone can verify that a signature came from the holder of the private key — without ever seeing it.',
        },
        {
          type: 'paragraph',
          text: 'This is the foundation of Web3 identity: your account is not a row in someone\'s database, it is a cryptographic key you control. Whoever controls the private key controls the funds and assets — there is no "forgot password" flow.',
        },
        {
          type: 'heading',
          text: 'What a Wallet Actually Does',
        },
        {
          type: 'list',
          items: [
            'Stores your private keys (your assets live on-chain, not in the wallet app).',
            'Signs transactions and messages on your behalf.',
            'Connects to dApps so they can propose transactions for you to approve.',
            'Manages accounts across multiple networks from one seed phrase.',
          ],
        },
        {
          type: 'callout',
          text: 'Your seed phrase (12–24 words) is the master backup of every key in the wallet. Anyone who sees it can drain everything. Never store it in cloud notes, email, or screenshots.',
        },
        {
          type: 'heading',
          text: 'Hot Wallets vs. Cold Wallets',
        },
        {
          type: 'paragraph',
          text: 'Hot wallets (MetaMask, Phantom, Freighter) are software connected to the internet — convenient for daily use and dApps. Cold wallets (Ledger, Trezor) keep keys in a hardware device that signs offline — the standard for larger holdings. A common pattern: keep spending funds in a hot wallet and savings in a hardware wallet.',
        },
      ],
      quiz: [
        {
          question: 'What does a crypto wallet primarily store?',
          options: [
            'Your coins, copied onto your device',
            'Your private keys, which prove ownership of on-chain assets',
            'A copy of the entire blockchain',
            'Your username and password',
          ],
          correctIndex: 1,
          explanation:
            'Assets live on the blockchain. The wallet stores keys that let you sign transactions moving them.',
        },
        {
          question: 'If someone obtains your seed phrase, they can:',
          options: [
            'Only view your balance',
            'Take full control of every account derived from it',
            'See your browsing history',
            'Nothing without your password',
          ],
          correctIndex: 1,
          explanation:
            'The seed phrase deterministically generates all your private keys — it is the master secret.',
        },
        {
          question: 'What is the main advantage of a hardware (cold) wallet?',
          options: [
            'Faster transactions',
            'Lower gas fees',
            'Private keys never leave the offline device when signing',
            'It earns staking rewards automatically',
          ],
          correctIndex: 2,
          explanation:
            'Cold wallets sign transactions inside the device, so keys are never exposed to the internet-connected computer.',
        },
      ],
    },
    {
      title: 'Transactions, Gas, and Block Explorers',
      summary:
        'Follow a transaction from signature to confirmation, understand gas fees, and learn to read a block explorer.',
      lessons: [
        {
          type: 'heading',
          text: 'Anatomy of a Transaction',
        },
        {
          type: 'paragraph',
          text: 'A transaction is a signed instruction: "from this address, do X." It contains the sender, recipient (an address or a smart contract), a value or encoded function call, a fee bid, and a nonce (a per-account counter that orders transactions and prevents replays). Once signed and broadcast, it sits in the mempool until a validator includes it in a block.',
        },
        {
          type: 'list',
          items: [
            'Pending — broadcast to the network, waiting for inclusion.',
            'Confirmed — included in a block; each additional block is one more "confirmation."',
            'Finalized — economically irreversible under the chain\'s consensus rules.',
            'Failed/Reverted — included, but execution failed; the fee is still paid.',
          ],
        },
        {
          type: 'heading',
          text: 'Gas: Paying for Computation',
        },
        {
          type: 'paragraph',
          text: 'Every operation on a smart-contract chain costs gas — a unit measuring computation and storage. You pay gas in the chain\'s native token (ETH on Ethereum, XLM on Stellar). Simple transfers are cheap; complex contract calls cost more. On Ethereum, EIP-1559 splits fees into a burned base fee plus an optional priority tip to incentivize validators.',
        },
        {
          type: 'code',
          language: 'javascript',
          code: `// Gas accounting on Ethereum
// fee paid = gasUsed * (baseFee + priorityFee)
const tx = await signer.sendTransaction({
  to: '0xRecipient...',
  value: ethers.parseEther('0.1'),   // 0.1 ETH
  maxFeePerGas: ethers.parseUnits('30', 'gwei'),
  maxPriorityFeePerGas: ethers.parseUnits('2', 'gwei'),
});
const receipt = await tx.wait();     // wait for confirmation
console.log(receipt.status);         // 1 = success, 0 = reverted`,
        },
        {
          type: 'heading',
          text: 'Reading a Block Explorer',
        },
        {
          type: 'paragraph',
          text: 'Block explorers (Etherscan, StellarExpert, Solscan) are the read interface to the chain. You can look up any address to see balances and history, any transaction to see its status, fee, and decoded contract call, and any contract to inspect verified source code. As a developer you will live in the explorer — it is your debugger for everything on-chain.',
        },
        {
          type: 'callout',
          text: 'Habit to build: after every transaction you send, open it in the explorer and verify status, fee paid, and the events emitted.',
        },
      ],
      quiz: [
        {
          question: 'What is gas?',
          options: [
            'A cryptocurrency used for cars',
            'A unit measuring the computation/storage a transaction consumes, paid in the native token',
            'A subscription fee for wallets',
            'A type of NFT',
          ],
          correctIndex: 1,
          explanation:
            'Gas meters the work validators do executing your transaction; you pay it in the chain\'s native token.',
        },
        {
          question: 'A transaction that reverts still…',
          options: [
            'Refunds all fees automatically',
            'Consumes the gas fee even though state changes are rolled back',
            'Deletes the block it was in',
            'Bans the sender address',
          ],
          correctIndex: 1,
          explanation:
            'Validators still did the work, so the fee is paid; only the state changes are rolled back.',
        },
        {
          question: 'What is a block explorer used for?',
          options: [
            'Mining new blocks',
            'Inspecting addresses, transactions, and verified contract code on-chain',
            'Storing private keys',
            'Buying crypto with a credit card',
          ],
          correctIndex: 1,
          explanation:
            'Explorers are the read/debug interface to the chain — essential for verifying what your transactions actually did.',
        },
      ],
    },
    {
      title: 'Smart Contracts and dApps',
      summary:
        'See how smart contracts work, how a dApp frontend talks to them through a wallet, and what composability means.',
      lessons: [
        {
          type: 'heading',
          text: 'Smart Contracts: Programs That Hold Money',
        },
        {
          type: 'paragraph',
          text: 'A smart contract is a program deployed to the blockchain. It has its own address, storage, and (usually) a token balance. Once deployed, its code is immutable and runs exactly as written whenever someone sends it a transaction. There is no admin who can pause or rewrite it unless such logic was built in.',
        },
        {
          type: 'code',
          language: 'solidity',
          code: `// A minimal smart contract (Solidity)
contract Counter {
    uint256 public count;          // stored on-chain forever

    function increment() public {  // costs gas, changes state
        count += 1;
    }

    function get() public view returns (uint256) {
        return count;              // free to call (read-only)
    }
}`,
        },
        {
          type: 'heading',
          text: 'How a dApp Is Structured',
        },
        {
          type: 'list',
          items: [
            'Frontend — a normal web app (React, etc.) that renders UI.',
            'Wallet — signs transactions; the user approves each action.',
            'Library — ethers.js / web3.js / stellar-sdk encodes calls to the contract.',
            'RPC node — the gateway that reads chain state and broadcasts transactions.',
            'Smart contracts — the on-chain backend holding logic and state.',
          ],
        },
        {
          type: 'code',
          language: 'javascript',
          code: `// A dApp calling a contract with ethers.js
const provider = new ethers.BrowserProvider(window.ethereum);
const signer = await provider.getSigner();
const counter = new ethers.Contract(address, abi, signer);

const tx = await counter.increment();  // wallet popup -> user signs
await tx.wait();                        // confirmed on-chain
console.log(await counter.get());      // read is free`,
        },
        {
          type: 'heading',
          text: 'Composability: Money Legos',
        },
        {
          type: 'paragraph',
          text: 'Because contracts are public and permissionless, any contract can call any other contract. A lending protocol can plug into a decentralized exchange for liquidations; an aggregator can route a trade across five exchanges in one transaction. This composability is Web3\'s superpower — and a major source of risk when one piece misbehaves.',
        },
      ],
      quiz: [
        {
          question: 'Once a smart contract is deployed, its code…',
          options: [
            'Can be edited by the developer at any time',
            'Is immutable — it runs exactly as written (unless upgrade logic was built in)',
            'Expires after one year',
            'Is hidden from users',
          ],
          correctIndex: 1,
          explanation:
            'Deployed bytecode is immutable. Upgradeability is possible only through deliberate proxy patterns.',
        },
        {
          question: 'In a dApp architecture, what role does the wallet play?',
          options: [
            'It hosts the website',
            'It signs transactions the user approves',
            'It stores the contract code',
            'It renders the UI',
          ],
          correctIndex: 1,
          explanation:
            'The wallet holds keys and signs; the frontend proposes transactions, the chain executes them.',
        },
        {
          question: 'What does "composability" mean in Web3?',
          options: [
            'Contracts can be compressed to save gas',
            'Any contract can permissionlessly call and build on other contracts',
            'Tokens can be printed freely',
            'Frontends can reuse React components',
          ],
          correctIndex: 1,
          explanation:
            'Open contract interfaces let protocols stack on each other like building blocks — "money legos."',
        },
      ],
    },
    {
      title: 'The Web3 Developer Toolkit',
      summary:
        'Get hands-on with the tools you will use daily: testnets, faucets, ethers.js, RPC providers, and development frameworks.',
      lessons: [
        {
          type: 'heading',
          text: 'Networks and Testnets',
        },
        {
          type: 'paragraph',
          text: 'Every major chain has a mainnet (real value) and one or more testnets (worthless tokens, same semantics). Ethereum developers test on Sepolia; Stellar has Testnet; Solana has Devnet. Testnet tokens come free from faucets. Rule zero of Web3 development: never test with real funds — deploy to testnet first, always.',
        },
        {
          type: 'heading',
          text: 'Libraries and Frameworks',
        },
        {
          type: 'list',
          items: [
            'ethers.js / viem — talk to Ethereum from JavaScript (read state, send transactions).',
            'stellar-sdk — equivalent toolkit for the Stellar network.',
            'Hardhat / Foundry — local EVM dev environments: compile, test, debug, deploy.',
            'RPC providers (Alchemy, Infura) — hosted nodes so your app doesn\'t run one.',
            'IPFS — content-addressed storage commonly used for NFT metadata and dApp frontends.',
          ],
        },
        {
          type: 'code',
          language: 'javascript',
          code: `// Reading chain state with ethers.js — no wallet needed
import { JsonRpcProvider, formatEther } from 'ethers';

const provider = new JsonRpcProvider('https://rpc.sepolia.org');
const balance = await provider.getBalance('vitalik.eth');
console.log(formatEther(balance), 'ETH');

const block = await provider.getBlockNumber();
console.log('Latest block:', block);`,
        },
        {
          type: 'heading',
          text: 'Your Development Loop',
        },
        {
          type: 'list',
          items: [
            'Write the contract in Solidity (or Rust for Soroban).',
            'Compile and test locally against a simulated chain.',
            'Deploy to a testnet and fund it via faucet.',
            'Point your frontend at the testnet contract via RPC.',
            'Verify on the explorer, then — and only then — ship to mainnet.',
          ],
        },
        {
          type: 'callout',
          text: 'You already have the EduNode Code Playground (/codeeditor) for drafting Solidity and the ChainChess (/chess) game for learning Web3 concepts interactively — use them alongside this course.',
        },
      ],
      quiz: [
        {
          question: 'Why do developers deploy to a testnet first?',
          options: [
            'Testnets are faster than mainnet',
            'Testnet tokens are free, so bugs cost nothing to discover',
            'Mainnet requires a license',
            'Testnets have more users',
          ],
          correctIndex: 1,
          explanation:
            'Testnets replicate mainnet semantics with worthless tokens — mistakes are free, which is the entire point.',
        },
        {
          question: 'What does an RPC provider do?',
          options: [
            'Stores your private keys in the cloud',
            'Gives your app access to a hosted blockchain node for reads and transaction broadcast',
            'Converts crypto to fiat',
            'Writes smart contracts for you',
          ],
          correctIndex: 1,
          explanation:
            'RPC endpoints (Alchemy, Infura, public nodes) are how apps read chain state and submit signed transactions.',
        },
        {
          question: 'Which library would you use to call an Ethereum contract from JavaScript?',
          options: ['ethers.js', 'React Router', 'NumPy', 'Docker'],
          correctIndex: 0,
          explanation:
            'ethers.js (or viem) is the standard JS library for encoding contract calls and interacting with EVM chains.',
        },
      ],
    },
    {
      title: 'Staying Safe and Your First dApp',
      summary:
        'Learn the attack patterns that drain wallets — phishing, malicious approvals, fake mints — then walk through building and deploying a first dApp.',
      lessons: [
        {
          type: 'heading',
          text: 'The Threats That Actually Drain Wallets',
        },
        {
          type: 'list',
          items: [
            'Phishing — fake sites mimicking real dApps that trick you into signing away assets. Always verify the domain.',
            'Malicious approvals — "approve" transactions that grant a contract unlimited spending of your tokens. Read what you sign.',
            'Fake mints/airdrops — unsolicited NFTs or tokens that lure you to a scam site to "claim" rewards.',
            'Seed phrase theft — no legitimate service ever asks for it. Ever.',
            'Address poisoning — attackers send dust from look-alike addresses hoping you copy-paste the wrong recipient.',
          ],
        },
        {
          type: 'callout',
          text: 'The most expensive words in Web3 are "the signature looked fine." Simulate transactions, use hardware wallets for value, and revoke stale approvals regularly (e.g., revoke.cash).',
        },
        {
          type: 'heading',
          text: 'Capstone: Your First dApp, End to End',
        },
        {
          type: 'paragraph',
          text: 'Let\'s tie everything together. You will deploy a simple contract to a testnet and call it from a minimal frontend — the exact workflow used for real dApps, just at small scale.',
        },
        {
          type: 'code',
          language: 'solidity',
          code: `// contracts/Greeter.sol — deploy this to Sepolia
contract Greeter {
    string public greeting = "Hello, Web3!";

    function setGreeting(string memory _greeting) public {
        greeting = _greeting;
    }
}`,
        },
        {
          type: 'code',
          language: 'javascript',
          code: `// app.js — connect wallet, read, and write
const provider = new ethers.BrowserProvider(window.ethereum);
await provider.send('eth_requestAccounts', []);   // connect
const signer = await provider.getSigner();
const greeter = new ethers.Contract(CONTRACT_ADDR, ABI, signer);

// Read (free)
document.querySelector('#greeting').textContent =
  await greeter.greeting();

// Write (costs testnet gas — wallet asks user to confirm)
async function update(text) {
  const tx = await greeter.setGreeting(text);
  await tx.wait();
}`,
        },
        {
          type: 'list',
          items: [
            '1. Write and compile Greeter.sol in the Code Playground or Hardhat.',
            '2. Deploy to Sepolia testnet and get test ETH from a faucet.',
            '3. Copy the deployed address + ABI into your frontend.',
            '4. Connect MetaMask, read the greeting, then send a setGreeting transaction.',
            '5. Verify your transaction on a Sepolia block explorer — that\'s the whole loop.',
          ],
        },
        {
          type: 'paragraph',
          text: 'That loop — write, deploy, connect, read, write, verify — is the foundation of every Web3 project you will ever build. From here you are ready for the Pro courses: smart contract engineering, DeFi, NFTs, security auditing, and cross-chain development.',
        },
      ],
      quiz: [
        {
          question: 'A dApp asks you to sign an "unlimited token approval" to a contract you don\'t recognize. You should:',
          options: [
            'Approve it — unlimited approvals are normal',
            'Reject it and verify whether the site is legitimate; unlimited approvals let the contract drain that token',
            'Send your seed phrase to support for verification',
            'Refresh the page and approve again',
          ],
          correctIndex: 1,
          explanation:
            'Unlimited approvals are a classic drain vector. Approve only what\'s needed, and only on verified sites.',
        },
        {
          question: 'Which is a safe practice?',
          options: [
            'Storing your seed phrase in a password manager cloud vault',
            'Verifying contract interactions on a block explorer and using a hardware wallet for significant funds',
            'Clicking airdrop links sent to your wallet',
            'Sharing your screen with "support" to debug a transaction',
          ],
          correctIndex: 1,
          explanation:
            'Explorer verification + hardware signing are the two highest-leverage safety habits.',
        },
        {
          question: 'In the capstone dApp, what is the correct order?',
          options: [
            'Deploy to mainnet → write contract → connect wallet',
            'Write contract → deploy to testnet → connect frontend → verify on explorer',
            'Buy ETH → publish website → write contract',
            'Connect wallet → faucet → delete contract',
          ],
          correctIndex: 1,
          explanation:
            'Write → deploy to testnet → wire the frontend → verify on the explorer. Mainnet comes last, always.',
        },
      ],
    },
  ],
};

export default course;
