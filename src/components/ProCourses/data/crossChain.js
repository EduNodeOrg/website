// Course 117 — Cross-Chain Development (Pro)
const course = {
  id: '117',
  title: 'Cross-Chain Development',
  description:
    'Build applications that work across multiple blockchain networks.',
  difficulty: 'advanced',
  rating: 4.5,
  duration: '10 weeks',
  proOnly: true,
  diplomaEndpoint: 'diploma16',
  modules: [
    {
      title: 'Why Cross-Chain: The Multi-Chain Reality',
      summary:
        'Understand why liquidity and users fragment across chains, what interoperability actually means, and the trust trade-offs.',
      lessons: [
        {
          type: 'paragraph',
          text: 'No single chain won. Liquidity lives on Ethereum, throughput on L2s and Solana, institutions on Stellar and private chains. Users hold assets everywhere — so applications must either live on one chain and lose reach, or coordinate state across chains. Cross-chain development is the discipline of that coordination.',
        },
        {
          type: 'list',
          items: [
            'Fragmentation: each chain is a separate state — tokens, apps, and liquidity don\'t move by default.',
            'Interoperability = moving messages and value between chains securely.',
            'The trilemma: bridges trade between trustlessness, generalizability, and speed — you pick two-ish.',
            'Cross-chain apps are harder to secure: the weakest link is often the bridge, not your contract.',
          ],
        },
        {
          type: 'callout',
          text: 'Bridges are the most attacked infrastructure in crypto — over $2B lost. Cross-chain development starts with respect for that risk.',
        },
      ],
      quiz: [
        {
          question: 'Why do applications need cross-chain infrastructure?',
          options: [
            'It\'s trendy',
            'Users, liquidity, and assets are fragmented across many chains with separate states',
            'Single chains are always down',
            'To avoid gas fees entirely',
          ],
          correctIndex: 1,
          explanation:
            'Each chain is a silo. Reaching users and liquidity where they live requires crossing chains.',
        },
        {
          question: 'The central security reality of cross-chain systems is…',
          options: [
            'They\'re always safe',
            'The system is only as strong as its weakest bridge/verifier',
            'They\'re always unsafe',
            'Security doesn\'t apply cross-chain',
          ],
          correctIndex: 1,
          explanation:
            'Your contract can be perfect while the bridge carrying its messages is compromised — total system security is the minimum of all components.',
        },
      ],
    },
    {
      title: 'Bridge Architectures: Lock-Mint vs Burn-Release vs Liquidity Networks',
      summary:
        'Compare the three bridge families, understand wrapped assets, and learn what actually backs a bridged token.',
      lessons: [
        {
          type: 'paragraph',
          text: 'Three bridge designs dominate. Lock-and-mint: deposit tokens on chain A, a custodian/multisig/validator set attests, and a wrapped token is minted on chain B (wBTC, many canonical bridges). Burn-and-release: the reverse — burn wrapped tokens to unlock originals. Liquidity networks: no minting at all — LPs on each chain settle instantly (Hop, Across), which removes the honeypot but caps transfer size at LP depth.',
        },
        {
          type: 'code',
          language: 'solidity',
          code: `// Canonical lock-mint bridge (simplified)
// Chain A — locks the real asset
function bridgeOut(uint256 amount, uint256 destChain) external {
    token.transferFrom(msg.sender, address(this), amount);
    emit Locked(msg.sender, amount, destChain);   // relayers watch this
}

// Chain B — mints the wrapped representation
function bridgeIn(address to, uint256 amount, bytes32 proof)
    external onlyRelayer
{
    require(!processed[proof]);
    processed[proof] = true;
    wrappedToken.mint(to, amount);   // backed 1:1 by chain-A lock`,
        },
        {
          type: 'list',
          items: [
            'Wrapped asset risk: the wrapped token is only as good as the bridge\'s custody of the original.',
            'Liquidity networks avoid minted IOUs — instant but limited by pool depth.',
            'Native mint/burn (CCTP for USDC): issuer burns on source, mints canonical tokens — no wrapped risk.',
            'Finality matters: bridging before source-chain finality risks reorg reversals.',
          ],
        },
      ],
      quiz: [
        {
          question: 'In a lock-and-mint bridge, a wrapped token\'s value comes from…',
          options: [
            'Its own mining',
            'The original asset locked on the source chain — which the bridge must actually custody',
            'Nothing — it\'s pure IOU',
            'Staking rewards',
          ],
          correctIndex: 1,
          explanation:
            'The wrapped token is a claim on locked collateral. If the bridge loses the lock, the wrap becomes worthless.',
        },
        {
          question: 'Liquidity networks differ from lock-mint bridges because they…',
          options: [
            'Mint wrapped tokens',
            'Use LP pools on each chain for instant settlement — no minted IOUs',
            'Are always cheaper',
            'Only work on Bitcoin',
          ],
          correctIndex: 1,
          explanation:
            'LPs front liquidity on the destination chain — no synthetic asset, but depth-limited.',
        },
      ],
    },
    {
      title: 'Messaging Protocols: LayerZero, Axelar, Wormhole',
      summary:
        'How generalized message passing works: endpoints, relayers, verification models, and how to pick one.',
      lessons: [
        {
          type: 'paragraph',
          text: 'Generalized messaging protocols carry arbitrary data — not just tokens — between chains. Your contract on chain A sends a payload; a verifier/relayer network attests it; your contract on chain B receives and executes it. The difference between protocols is WHO verifies and how much you trust them.',
        },
        {
          type: 'list',
          items: [
            'LayerZero — endpoints on each chain; configurable verification (DVNs); ultralight. Used by Stargate.',
            'Axelar — a dedicated PoS validator chain attests to cross-chain messages; its own security budget.',
            'Wormhole — 19 guardian multisig signs VAAs (verifiable action approvals); powers Portal bridge.',
            'Chainlink CCIP — oracle network messaging with a separate risk-management network.',
          ],
        },
        {
          type: 'code',
          language: 'solidity',
          code: `// LayerZero-style send (concept shape)
lzEndpoint.send{value: fee}(
    dstChainId,
    abi.encodePacked(dstContract),
    abi.encode(action, amount, recipient),
    payable(msg.sender),   // refund address
    address(0),            // zro payment
    bytes("")              // adapter params
);

// Receive side — validate the source!
function lzReceive(uint16 srcChain, bytes calldata srcAddr,
                   uint64 nonce, bytes calldata payload) external {
    require(msg.sender == address(lzEndpoint));
    require(keccak256(srcAddr) == trustedRemote[srcChain]);
    (action, amount, recipient) = abi.decode(payload, ...);
}`,
        },
        {
          type: 'callout',
          text: 'Security rule #1 of receiving: always validate msg.sender is the endpoint AND srcAddress is your trusted remote contract. Most messaging exploits are missing source validation.',
        },
      ],
      quiz: [
        {
          question: 'The key difference between messaging protocols is…',
          options: [
            'Their token prices',
            'Who verifies the message and what trust assumptions that creates',
            'Their logo',
            'How fast their websites load',
          ],
          correctIndex: 1,
          explanation:
            'LayerZero uses configurable verifiers, Axelar its own validator set, Wormhole guardians — the security model is the product.',
        },
        {
          question: 'On the receiving side, you MUST validate…',
          options: [
            'Nothing — messages are safe by default',
            'That the caller is the endpoint and the source address is your trusted remote',
            'The gas price',
            'The block number only',
          ],
          correctIndex: 1,
          explanation:
            'Without source validation, anyone can forge cross-chain calls — the most common messaging bug.',
        },
      ],
    },
    {
      title: 'IBC: Cosmos\'s Inter-Blockchain Communication',
      summary:
        'The most trust-minimized interoperability design: light-client verification, channels, and packet lifecycle.',
      lessons: [
        {
          type: 'paragraph',
          text: 'IBC (Inter-Blockchain Communication) is the gold standard for trust-minimized bridging: instead of trusting a multisig or oracle network, each chain runs a light client of the other on-chain, verifying consensus proofs directly. Chains connect through channels over a transport layer; packets carry data with acknowledgements and timeouts.',
        },
        {
          type: 'list',
          items: [
            'Light clients — chain A verifies chain B\'s headers/proofs on-chain; no third party.',
            'Channels — ordered/unordered conduits between specific modules/contracts.',
            'Packet lifecycle: send → relay → receive → ack (or timeout → refund).',
            'Trust model: only the two chains\' own consensus — no external validator set.',
            'Cost: running light clients on-chain is expensive on gas-heavy chains — why IBC stayed Cosmos-centric.',
          ],
        },
        {
          type: 'callout',
          text: 'IBC shows what "trustless" bridging looks like — but it requires both chains to support light-client verification. It\'s why Cosmos chains interoperate natively while EVM chains rely on committees.',
        },
      ],
      quiz: [
        {
          question: 'IBC\'s security advantage comes from…',
          options: [
            'A bigger multisig',
            'On-chain light clients verifying the other chain\'s consensus directly — no external verifiers',
            'Faster relayers',
            'Cheaper fees',
          ],
          correctIndex: 1,
          explanation:
            'Verifying consensus proofs on-chain removes the trusted third party — the strongest bridge model that exists.',
        },
        {
          question: 'What happens if an IBC packet times out?',
          options: [
            'Funds are lost',
            'The send is reverted/refunded on the source chain',
            'It retries forever',
            'The channel closes permanently',
          ],
          correctIndex: 1,
          explanation:
            'Timeouts are first-class in IBC — unreceived packets trigger refunds rather than stuck funds.',
        },
      ],
    },
    {
      title: 'Cross-Chain Token Standards and Liquidity Routing',
      summary:
        'xERC-20, OFT, canonical vs third-party assets, and how liquidity routing aggregates bridge options.',
      lessons: [
        {
          type: 'paragraph',
          text: 'Bridges once minted competing wrapped versions of the same asset — fragmenting liquidity into aUSD, wUSD, anyUSD. Token-native standards fix this: the token issuer controls bridging, so "USDC" is the same canonical asset everywhere. xERC-20 (open standard) and LayerZero OFT let tokens burn-and-mint across chains with rate limits per bridge.',
        },
        {
          type: 'code',
          language: 'solidity',
          code: `// xERC-20 — issuer controls bridges with rate limits
contract XERC20 {
    mapping(address => Bridge) public bridges;  // bridge => {mintCap, burnCap}

    function mint(address to, uint256 amount) external {
        Bridge storage b = bridges[msg.sender];
        require(b.mintLimit >= amount, "rate limit"); // per-bridge cap
        b.mintLimit -= amount;
        _mint(to, amount);
    }
    // Rate limits contain bridge exploits to their cap —
    // a compromised bridge can't mint infinite supply`,
        },
        {
          type: 'list',
          items: [
            'Canonical assets beat third-party wraps — prefer issuer-controlled bridges (CCTP, xERC-20, OFT).',
            'Rate limiting per bridge bounds worst-case loss to the bridge\'s cap.',
            'Aggregators (LI.FI, Socket) route across bridges comparing speed/cost/security per transfer.',
            'Canonical > liquidity-network > third-party wrapped, in order of preference for the same asset.',
          ],
        },
      ],
      quiz: [
        {
          question: 'xERC-20\'s key security feature is…',
          options: [
            'Faster transfers',
            'Per-bridge mint rate limits — a compromised bridge can\'t mint unbounded supply',
            'Free bridging',
            'Anonymous transfers',
          ],
          correctIndex: 1,
          explanation:
            'Bounding each bridge\'s mint cap contains worst-case damage — a lesson learned from bridge exploits.',
        },
        {
          question: 'Canonical vs third-party wrapped assets differ because…',
          options: [
            'They\'re identical',
            'Canonical assets are issued by the token\'s own bridge — no extra custodial risk layer',
            'Third-party assets are faster',
            'Canonical assets can\'t be bridged',
          ],
          correctIndex: 1,
          explanation:
            'Third-party wraps add a custodian the token issuer doesn\'t control — pure additional risk.',
        },
      ],
    },
    {
      title: 'Cross-Chain Security: Failure Modes and Defenses',
      summary:
        'Survey the big bridge exploits, then design defenses: rate limits, watching towers, circuit breakers, and staged finality.',
      lessons: [
        {
          type: 'paragraph',
          text: 'The graveyard is instructive: Ronin ($625M — 5-of-9 validator keys compromised), Wormhole ($326M — signature verification bypass), Nomad ($190M — a bad upgrade made every message valid), Multichain ($125M — centralized MPC keys). Nearly every failure is key management or verification bypass — not exotic math.',
        },
        {
          type: 'list',
          items: [
            'Key management: validator/guardian keys are the target — distribute, threshold-sign, rotate.',
            'Rate limits: cap value moved per epoch — a breach drains a fraction, not everything.',
            'Circuit breakers: anomaly detection pauses transfers — Nomad\'s 41-hour hack had no pause.',
            'Independent watchers: a second network verifying messages (CCIP\'s Risk Management Network pattern).',
            'Staged finality: don\'t act on source-chain state before its reorg window closes.',
          ],
        },
        {
          type: 'callout',
          text: 'Defense-in-depth rule for cross-chain: assume the bridge WILL be compromised, and bound the blast radius — caps, delays, and monitoring turn "total loss" into "bad day."',
        },
      ],
      quiz: [
        {
          question: 'Most major bridge exploits share a root cause in…',
          options: [
            'Advanced math errors',
            'Key management failures or verification bypass — not exotic cryptography',
            'Too many users',
            'Slow block times',
          ],
          correctIndex: 1,
          explanation:
            'Ronin (key compromise), Nomad (verification bypass), Wormhole (sig bypass) — operational failures, not crypto breaks.',
        },
        {
          question: 'Rate limits and circuit breakers provide…',
          options: [
            'Faster bridging',
            'Blast-radius containment — bounded loss even if the bridge is fully compromised',
            'Cheaper fees',
            'Better UX',
          ],
          correctIndex: 1,
          explanation:
            'Assume-breach design: caps and pauses mean an exploit drains the cap, not the TVL.',
        },
      ],
    },
    {
      title: 'Building a Cross-Chain dApp: Architecture Patterns',
      summary:
        'Hub-and-spoke vs mesh, state sync strategies, and how to design contract interfaces for multi-chain systems.',
      lessons: [
        {
          type: 'paragraph',
          text: 'Multi-chain apps pick an architecture. Hub-and-spoke: one chain holds canonical state, others are thin spokes — simple, low messaging, but hub latency for everything. Mesh: every chain peer-to-peer — flexible but N² connections. Most production systems are hybrids: canonical logic on one chain, fast spokes elsewhere.',
        },
        {
          type: 'code',
          language: 'solidity',
          code: `// Hub-and-spoke: canonical registry on chain A
contract Hub {
    mapping(bytes32 => uint256) public globalState;
    function updateFromSpoke(uint16 chain, bytes32 key, uint256 val)
        external onlyEndpoint
    {
        require(trustedSpoke[chain] == msg.senderSrc(), "untrusted");
        globalState[key] = val;   // hub is source of truth
    }
}

// Spoke — thin, defers to hub
contract Spoke {
    function report(uint256 val) external {
        sendMessage(HUB_CHAIN, abi.encode(key, val)); // async to hub
    }
}`,
        },
        {
          type: 'list',
          items: [
            'Pick a canonical chain for critical state — don\'t try to make everything equal.',
            'Design for async: cross-chain calls are minutes, not milliseconds — no synchronous return values.',
            'Idempotency: messages can be retried/duplicated — make receivers safe to call twice.',
            'Version your message payloads — upgrading spoke contracts out of sync is a real operational hazard.',
          ],
        },
      ],
      quiz: [
        {
          question: 'Hub-and-spoke architecture means…',
          options: [
            'All chains are equal peers',
            'One chain holds canonical state and other chains are thin interfaces to it',
            'No chains communicate',
            'Every chain stores everything',
          ],
          correctIndex: 1,
          explanation:
            'Centralizing canonical state simplifies consistency — spokes just relay intents to the hub.',
        },
        {
          question: 'Why must cross-chain message handlers be idempotent?',
          options: [
            'For performance',
            'Messages can be retried or duplicated — handlers must be safe to execute more than once',
            'For anonymity',
            'They don\'t need to be',
          ],
          correctIndex: 1,
          explanation:
            'Exactly-once delivery doesn\'t exist cross-chain. Design receivers that tolerate replays safely.',
        },
      ],
    },
    {
      title: 'Cross-Chain UX and Frontend Patterns',
      summary:
        'Chain abstraction, gas across chains, pending states, and making multi-chain feel like one app.',
      lessons: [
        {
          type: 'paragraph',
          text: 'Great cross-chain UX hides the chains. Chain abstraction shows users a unified balance and auto-routes to wherever funds live. Intent-based flows let users say what they want ("buy this NFT on Arbitrum") while solvers figure out the bridging. Gas abstraction pays destination-chain fees in the source token.',
        },
        {
          type: 'list',
          items: [
            'Unified balance: aggregate the same asset across chains into one displayed number.',
            'Auto-bridging: detect insufficient destination balance → route through a bridge in-flow.',
            'Intent UX: user signs the desired outcome; solvers/relayers handle routing.',
            'Pending states: cross-chain txs take 1–20 minutes — show progress, link both explorers.',
            'Gas abstraction: pay destination gas in source-token via the messaging protocol\'s fee.',
          ],
        },
        {
          type: 'callout',
          text: 'The benchmark: a user who doesn\'t know what a bridge is completes a cross-chain action without noticing. That\'s the design goal for this entire field.',
        },
      ],
      quiz: [
        {
          question: 'Chain abstraction aims to…',
          options: [
            'Add more chains to the UI',
            'Hide which chain assets are on — users see one balance and one action',
            'Remove wallets',
            'Make everything slower',
          ],
          correctIndex: 1,
          explanation:
            'Users shouldn\'t care where liquidity lives — the app handles routing invisibly.',
        },
        {
          question: 'Intent-based UX means…',
          options: [
            'Users sign raw transactions',
            'Users sign a desired outcome; solvers/relayers execute the bridging and routing',
            'Users must pick a bridge manually',
            'No signatures are needed',
          ],
          correctIndex: 1,
          explanation:
            'Declaring "what" instead of "how" — the solver market competes to fulfill it optimally.',
        },
      ],
    },
    {
      title: 'Testing and Deploying Multi-Chain Systems',
      summary:
        'Fork tests across chains, staging deployments, monitoring bridged value, and operational runbooks.',
      lessons: [
        {
          type: 'paragraph',
          text: 'Cross-chain testing is harder than single-chain because failures span networks. The workflow: unit tests per contract, fork tests simulating both sides on mainnet forks, testnet deployments of the full message round-trip, and finally staged mainnet rollouts with caps.',
        },
        {
          type: 'code',
          language: 'bash',
          code: `# Foundry multi-fork testing
forge test --fork-url $ETH_RPC --fork-url $ARB_RPC
# Simulate: send on fork A -> relay -> receive on fork B

# Staged deployment
# 1. Deploy spokes + hub to testnets, verify round-trips
# 2. Mainnet with per-bridge caps at $10k
# 3. Watch 48h -> raise caps -> monitor`,
        },
        {
          type: 'list',
          items: [
            'Test the failure paths: timeouts, duplicate messages, reorgs, relayer downtime.',
            'Deploy in lockstep — hub and spokes must understand each other\'s message versions.',
            'Monitoring: alert on unbalanced flows, stalled messages, unusual volume per bridge.',
            'Runbook: who can pause which chain\'s endpoint, how fast, and the comms sequence for a bridge incident.',
          ],
        },
      ],
      quiz: [
        {
          question: 'The most important cross-chain tests simulate…',
          options: [
            'Happy paths only',
            'Failure paths — timeouts, duplicates, reorgs, relayer downtime',
            'Gas costs only',
            'UI rendering',
          ],
          correctIndex: 1,
          explanation:
            'Cross-chain systems fail at boundaries — testing must span the failure modes, not just success.',
        },
        {
          question: 'Staged mainnet rollout means…',
          options: [
            'Deploying everything at once',
            'Starting with small caps, monitoring, and scaling limits as confidence grows',
            'Skipping testnets',
            'Using only one chain',
          ],
          correctIndex: 1,
          explanation:
            'Caps make early bugs cheap — the standard risk curve for anything handling real cross-chain value.',
        },
      ],
    },
    {
      title: 'Capstone: Cross-Chain Portfolio Rebalancer',
      summary:
        'Design and build a dApp that reads balances on three chains and executes rebalancing intents through a messaging protocol.',
      lessons: [
        {
          type: 'paragraph',
          text: 'Your capstone: a cross-chain portfolio rebalancer. A hub contract tracks target allocations; spoke contracts on three chains report local balances and execute rebalance swaps when told. The frontend shows a unified portfolio and a "rebalance" button that triggers the multi-chain choreography.',
        },
        {
          type: 'list',
          items: [
            'Hub: stores target allocations, aggregates spoke reports, emits rebalance instructions.',
            'Spokes: report local value via the messaging protocol; execute swaps on instruction; report results.',
            'Messaging: validated payloads, idempotent handlers, versioned schema.',
            'Frontend: aggregated balances, rebalance preview, per-leg progress tracking.',
            'Security: trusted-remote validation everywhere, per-chain caps, emergency pause per spoke.',
          ],
        },
        {
          type: 'callout',
          text: 'Deliverable: testnet deployment on 3 chains with a working rebalance round-trip — the exact architecture behind real cross-chain asset managers.',
        },
        {
          type: 'paragraph',
          text: 'Completing this capstone means you can design, build, and operate multi-chain applications end to end — one of the rarest and most valuable skills in the ecosystem.',
        },
      ],
      quiz: [
        {
          question: 'The capstone architecture is best described as…',
          options: [
            'Fully mesh peer-to-peer',
            'Hub-and-spoke: canonical targets on one chain, execution spokes on others',
            'Single-chain only',
            'No architecture',
          ],
          correctIndex: 1,
          explanation:
            'One canonical hub for decisions + thin execution spokes — the dominant production pattern.',
        },
        {
          question: 'Why must every spoke validate trusted remotes?',
          options: [
            'For speed',
            'Any unvalidated message source is a forged-instruction vector — it\'s the critical security check',
            'For gas savings',
            'It\'s optional',
          ],
          correctIndex: 1,
          explanation:
            'In cross-chain systems, message authentication IS the security boundary.',
        },
      ],
    },
  ],
};

export default course;
