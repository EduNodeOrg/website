// Course 116 — Blockchain Security Auditing (Pro)
const course = {
  id: '116',
  title: 'Blockchain Security Auditing',
  description:
    'Learn security best practices and how to audit smart contracts for vulnerabilities.',
  difficulty: 'advanced',
  rating: 4.9,
  duration: '12 weeks',
  proOnly: true,
  diplomaEndpoint: 'diploma15',
  modules: [
    {
      title: 'The Auditor\'s Mindset and Methodology',
      summary:
        'Learn how professional auditors approach a codebase: threat modeling first, then systematic review — not random bug hunting.',
      lessons: [
        {
          type: 'paragraph',
          text: 'Auditing is not reading code top to bottom hoping to spot bugs. It\'s adversarial modeling: identify what the protocol promises (invariants), who can break promises (attackers, admins, oracles, other contracts), and what "broken" looks like (stolen funds, stuck funds, wrong accounting). Then hunt specifically for paths that violate invariants.',
        },
        {
          type: 'list',
          items: [
            '1. Read the docs and understand intended behavior — you can\'t find deviations without a spec.',
            '2. Map the attack surface: external/public functions, value flows, privileged roles, external calls.',
            '3. Extract invariants: "sum(shares) ≤ totalAssets", "only owner can pause", "no user loses principal".',
            '4. Trace value flows: where does ETH/token enter, move, and exit? Every path is a bug candidate.',
            '5. Check known bug classes systematically (this course teaches them all).',
            '6. Report: severity, proof of concept, and remediation — actionable, not just "this looks risky".',
          ],
        },
        {
          type: 'callout',
          text: 'Severity rubric: Critical = direct loss of funds; High = loss under specific conditions; Medium = limited damage or requires unlikely setup; Low/Info = best practices and code quality.',
        },
      ],
      quiz: [
        {
          question: 'The correct first step in an audit is…',
          options: [
            'Run a linter',
            'Understand intended behavior and define invariants — bugs are deviations from intent',
            'Fuzz everything immediately',
            'Check gas costs',
          ],
          correctIndex: 1,
          explanation:
            'Without a spec you can\'t say what\'s wrong. Invariants turn auditing from luck into methodology.',
        },
        {
          question: 'A "Critical" severity finding is…',
          options: [
            'A style issue',
            'A bug allowing direct theft or permanent loss of user funds',
            'A missing comment',
            'High gas usage',
          ],
          correctIndex: 1,
          explanation:
            'Severity tracks impact: direct, unconditional fund loss is Critical; conditional issues are High/Medium.',
        },
      ],
    },
    {
      title: 'Reentrancy: The Classic Killer',
      summary:
        'Dissect the DAO hack pattern: single-function, cross-function, cross-contract, and read-only reentrancy.',
      lessons: [
        {
          type: 'paragraph',
          text: 'Reentrancy happens when an external call gives control to an attacker who calls back into your contract before state updates. The DAO hack ($60M, 2016) drained via a fallback that re-entered withdraw before balances updated. The fix pattern — checks-effects-interactions + reentrancy guards — is mandatory knowledge.',
        },
        {
          type: 'code',
          language: 'solidity',
          code: `// VULNERABLE — interaction before effect
function withdraw() public {
    uint256 bal = balances[msg.sender];
    (bool ok,) = msg.sender.call{value: bal}("");   // attacker re-enters here
    require(ok);
    balances[msg.sender] = 0;                      // too late!
}

// SAFE — effect before interaction + guard
function withdraw() public nonReentrant {
    uint256 bal = balances[msg.sender];
    require(bal > 0);
    balances[msg.sender] = 0;                      // state first
    (bool ok,) = msg.sender.call{value: bal}("");
    require(ok);
}`,
        },
        {
          type: 'list',
          items: [
            'Single-function: re-enter the same function (the DAO case).',
            'Cross-function: re-enter a different function sharing state (withdraw → transfer).',
            'Cross-contract: re-enter a related contract reading shared state.',
            'Read-only reentrancy: attacker calls a view function mid-exploit to read stale prices — Curve/Convex pools were hit this way.',
          ],
        },
      ],
      quiz: [
        {
          question: 'Reentrancy works because…',
          options: [
            'The EVM is slow',
            'External calls hand control to the receiver before your state updates complete',
            'Contracts can call themselves',
            'Gas is refundable',
          ],
          correctIndex: 1,
          explanation:
            'call{value:...} executes recipient code inline — a malicious receiver calls back into stale state.',
        },
        {
          question: 'The canonical defense is…',
          options: [
            'Making functions private',
            'Updating state before external calls (checks-effects-interactions) plus reentrancy guards',
            'Using more comments',
            'Paying higher gas',
          ],
          correctIndex: 1,
          explanation:
            'If balances are already updated when the attacker re-enters, there\'s nothing left to drain.',
        },
        {
          question: 'Read-only reentrancy targets…',
          options: [
            'ERC-20 transfers only',
            'View functions (like get_virtual_price) called during an exploit to read inconsistent state',
            'The deployer wallet',
            'The blockchain itself',
          ],
          correctIndex: 1,
          explanation:
            'Mid-attack reads of stale prices let attackers price assets wrongly — subtle but devastating.',
        },
      ],
    },
    {
      title: 'Access Control Failures',
      summary:
        'Missing modifiers, unprotected initializers, tx.origin misuse, and the privilege-escalation bugs that hand over the keys.',
      lessons: [
        {
          type: 'paragraph',
          text: 'Access-control bugs are the most common real-world findings: a privileged function missing its onlyOwner, a proxy whose initialize() was never called letting anyone become admin (the 2022 Optimism-style initializer bugs), or authorization via tx.origin which attackers phish through intermediate contracts.',
        },
        {
          type: 'code',
          language: 'solidity',
          code: `// VULNERABLE — anyone can take ownership of the proxy's logic contract
contract Vault {
    address public owner;
    function initialize() public {          // missing "initializer" guard!
        owner = msg.sender;
    }
    function withdrawAll() external { require(msg.sender == owner); ... }
}

// VULNERABLE — tx.origin authorization
function admin() external {
    require(tx.origin == owner);  // phishing: trick owner into calling
                                  // through attacker's contract — passes!
}
// SAFE: require(msg.sender == owner) — the immediate caller`,
        },
        {
          type: 'list',
          items: [
            'Audit checklist: every external fn → who should call it? Is the check present and correct?',
            'Initializers on proxies: uninitialized logic contracts are an ownership free-for-all.',
            'tx.origin == phishing — never use it for auth. msg.sender is the only reliable caller.',
            'Default admin shipping: verify no function accidentally defaults to open (e.g., public when it should be internal).',
          ],
        },
      ],
      quiz: [
        {
          question: 'Why is tx.origin dangerous for authorization?',
          options: [
            'It\'s deprecated syntax',
            'It identifies the original signer — attacker contracts in the call chain pass the check',
            'It costs more gas',
            'It only works on testnet',
          ],
          correctIndex: 1,
          explanation:
            'tx.origin stays the EOA through the whole chain — a phishing contract inherits the victim\'s authority.',
        },
        {
          question: 'The proxy initializer bug lets attackers…',
          options: [
            'Read private variables',
            'Call initialize() on an uninitialized implementation and become its owner',
            'Skip gas fees',
            'Mine blocks',
          ],
          correctIndex: 1,
          explanation:
            'Implementation contracts must be initialized at deploy (or locked with _disableInitializers) — attackers claimed real projects this way.',
        },
      ],
    },
    {
      title: 'Oracle and Price Manipulation',
      summary:
        'Spot exploitable price reads: spot DEX prices, donation/inflation attacks, and flash-loan-funded manipulation.',
      lessons: [
        {
          type: 'paragraph',
          text: 'If a protocol makes decisions from a price an attacker can move within one transaction, it\'s exploitable. Classic cases: reading getReserves() spot prices, using pool balances instead of oracle prices, and ERC-4626-style share price manipulation via direct token donations.',
        },
        {
          type: 'code',
          language: 'solidity',
          code: `// VULNERABLE — spot price from one pool
function getPrice() public view returns (uint256) {
    (uint112 r0, uint112 r1,) = pair.getReserves();
    return r1 * 1e18 / r0;   // attacker flash-borrows, skews reserves,
}                            // triggers your logic, unskews — one tx

// SAFER — Chainlink with validation
(, int256 p,, uint256 updated,) = feed.latestRoundData();
require(p > 0 && block.timestamp - updated < 3600);
price = uint256(p);

// VULNERABLE — vault price from raw balance (donation attack)
uint256 shares = assets * totalSupply / asset.balanceOf(address(this));
// FIX: virtual shares or internal accounting, not raw balance`,
        },
        {
          type: 'list',
          items: [
            'Audit question for every price read: can a flash loan move this?',
            'Internal accounting ≠ raw balanceOf — donations break balance-derived math.',
            'TWAP windows and multi-source aggregation raise manipulation cost.',
            'Check decimal normalization — mixing 8-decimal feeds with 18-decimal tokens silently corrupts prices.',
          ],
        },
      ],
      quiz: [
        {
          question: 'A spot price from getReserves() is unsafe because…',
          options: [
            'It\'s stale by one block',
            'An attacker can skew reserves with a flash loan within a single transaction',
            'It uses too much gas',
            'It only works on Uniswap',
          ],
          correctIndex: 1,
          explanation:
            'Same-transaction manipulation: skew → exploit → restore. Any logic using it inherits the vulnerability.',
        },
        {
          question: 'The donation attack on vaults works by…',
          options: [
            'Sending spam transactions',
            'Directly transferring tokens to inflate the share price derived from raw balance',
            'Voting maliciously',
            'Overflowing the nonce',
          ],
          correctIndex: 1,
          explanation:
            'balanceOf-based share pricing can be manipulated by unrecorded donations — use internal/virtual accounting.',
        },
      ],
    },
    {
      title: 'Flash Loan Attack Patterns',
      summary:
        'Study how flash loans fund exploits: governance capture, oracle skew, collateral tricks — and how to design against them.',
      lessons: [
        {
          type: 'paragraph',
          text: 'Flash loans turn small exploits into total drains by removing capital requirements. The pattern in real hacks: borrow → manipulate (price, votes, collateral value) → profit from the manipulated state → repay → keep the difference. Auditing means asking "what if the attacker had $500M for one transaction?"',
        },
        {
          type: 'list',
          items: [
            'Governance: flash-borrowed tokens voting (Beanstalk, $182M) — defense: snapshot voting power at proposal time.',
            'Oracle skew: borrow → move a thin pool\'s price → borrow against inflated collateral elsewhere.',
            'Reward farming: borrow huge LP position, claim time-locked rewards, exit in same tx.',
            'Self-liquidation: manipulate own position to liquidatable state and capture the bonus.',
          ],
        },
        {
          type: 'callout',
          text: 'Design rule: any value derived from same-transaction state — prices, voting power, reward eligibility — is flash-loanable. Use time-weighted or historical state for anything security-critical.',
        },
      ],
      quiz: [
        {
          question: 'Flash loans make exploits worse by…',
          options: [
            'Making them faster',
            'Removing the capital barrier — any exploitable logic can be attacked with unlimited temporary funds',
            'Hiding the attacker',
            'Bypassing the mempool',
          ],
          correctIndex: 1,
          explanation:
            'A $1M manipulation opportunity no longer needs $1M — just gas and a working exploit path.',
        },
        {
          question: 'Which state is safe to use for security-critical decisions?',
          options: [
            'Current block reserves',
            'Historical/time-weighted state that can\'t be changed within one transaction',
            'The tx origin\'s balance',
            'Gas price',
          ],
          correctIndex: 1,
          explanation:
            'Snapshots and TWAPs force attackers to hold risk across blocks — flash loans can\'t span time.',
        },
      ],
    },
    {
      title: 'Integer, Precision, and Accounting Bugs',
      summary:
        'Division ordering, decimal mismatches, rounding direction, and the accounting errors that silently leak value.',
      lessons: [
        {
          type: 'paragraph',
          text: 'Solidity 0.8+ has built-in overflow checks, but precision bugs are endemic: multiply-before-divide or lose precision to truncation; round in the protocol\'s favor; and never mix decimals — USDC is 6, most tokens are 18, Chainlink feeds are 8. Accounting bugs don\'t revert — they quietly leak.',
        },
        {
          type: 'code',
          language: 'solidity',
          code: `// VULNERABLE — precision loss
uint256 fee = amount / 100 * 3;   // amount=99 → 0*3 = 0, should be 2.97

// SAFE — multiply first
uint256 fee = amount * 3 / 100;   // 99*3/100 = 2

// VULNERABLE — rounding favors user (drains protocol)
uint256 shares = assets * totalSupply / totalAssets; // rounds down

// SAFE for deposits — round UP shares minted? No: round in
// PROTOCOL's favor => fewer shares per deposit (round down
// on mints, round up on withdrawals' asset cost)`,
        },
        {
          type: 'list',
          items: [
            'Always multiply before dividing.',
            'Rounding direction: favor the protocol/vault, never the transacting user.',
            'Decimal mismatches are silent killers: normalize every external value to a common precision.',
            'unchecked blocks save gas but re-enable overflow — audit each one individually.',
          ],
        },
      ],
      quiz: [
        {
          question: 'Why does `amount / 100 * 3` lose precision?',
          options: [
            'Division is slower',
            'Integer division truncates to zero decimals before the multiply — order matters',
            'It overflows',
            'Solidity forbids it',
          ],
          correctIndex: 1,
          explanation:
            '99/100 truncates to 0. Multiply first, divide last — standard precision hygiene.',
        },
        {
          question: 'In vault share math, rounding should favor…',
          options: [
            'The user — better UX',
            'The protocol — else repeated tiny ops drain value through rounding',
            'Whoever calls first',
            'It never matters',
          ],
          correctIndex: 1,
          explanation:
            'User-favorable rounding is a value leak amplified by repeated transactions — a classic finding.',
        },
      ],
    },
    {
      title: 'DoS, Griefing, and Edge-Case Failures',
      summary:
        'Unbounded loops, block stuffing, external call failures, and the denial-of-service patterns that brick protocols.',
      lessons: [
        {
          type: 'paragraph',
          text: 'DoS bugs don\'t steal funds — they freeze them. An unbounded loop over users runs out of gas forever once the array grows. A pushed payment to one reverting recipient blocks payouts to everyone. A griefing attack burns an attacker\'s small resources to cost the protocol or users much more.',
        },
        {
          type: 'code',
          language: 'solidity',
          code: `// VULNERABLE — unbounded loop + push payments
function distribute() external {
    for (uint i; i < users.length; i++) {          // grows forever → OOG
        payable(users[i]).transfer(shares[i]);     // one reverting user
    }                                              // bricks everyone
}

// SAFE — pull pattern
mapping(address => uint256) public claimable;
function claim() external {
    uint256 amt = claimable[msg.sender];
    claimable[msg.sender] = 0;
    payable(msg.sender).transfer(amt);   // each user pulls their own`,
        },
        {
          type: 'list',
          items: [
            'Any loop over user-controlled or growing data → future OOG. Bound it or paginate.',
            'Push payments: one bad recipient DoSes all — switch to pull claims.',
            'External call assumptions: contracts can revert intentionally; handle failure paths.',
            'Timestamp/block.number assumptions: don\'t require exact values — validators control them slightly.',
          ],
        },
      ],
      quiz: [
        {
          question: 'The most common DoS pattern is…',
          options: [
            'Gas refunds',
            'Unbounded loops over growing state + push payments to possibly-reverting recipients',
            'Using events',
            'Having too many users',
          ],
          correctIndex: 1,
          explanation:
            'Both patterns seem fine at launch and brick permanently as state grows — audit loops and payment flows first.',
        },
        {
          question: 'Pull-over-push payments prevent DoS because…',
          options: [
            'Pull is cheaper',
            'A failing recipient only breaks their own claim, not everyone\'s distribution',
            'Push requires more approvals',
            'Pull hides balances',
          ],
          correctIndex: 1,
          explanation:
            'Isolation of failure — each user\'s claim is independent, so a reverting recipient harms only themselves.',
        },
      ],
    },
    {
      title: 'Signatures, Replay, and Frontrunning',
      summary:
        'EIP-712 signatures, nonces and replay protection, missing deadlines, and commit-reveal schemes.',
      lessons: [
        {
          type: 'paragraph',
          text: 'Off-chain signed messages (permit, meta-transactions, order books) are everywhere — and replayable by default. Every signed message needs a domain separator (chain ID + contract address via EIP-712), a nonce or expiry, and single-use semantics. Missing any piece = signature reuse across chains, contracts, or time.',
        },
        {
          type: 'code',
          language: 'solidity',
          code: `// EIP-712 domain + nonce + deadline — the minimum safe shape
bytes32 digest = _hashTypedDataV4(keccak256(abi.encode(
    ORDER_TYPEHASH, maker, nft, price, nonce, deadline
)));
require(block.timestamp <= deadline, "expired");
require(!used[nonce], "replayed");
used[nonce] = true;
require(ECDSA.recover(digest, sig) == maker, "bad sig");

// Frontrunning defense: commit-reveal
// 1. commit(hash(choice + salt))  2. later: reveal(choice, salt)
// Attacker sees the hash but can't copy the move.`,
        },
        {
          type: 'list',
          items: [
            'Missing chainId in domain → cross-chain replay (the Wintermute/Optimism airdrop pattern).',
            'Missing nonce → same signature replayed for repeated withdrawals.',
            'Missing deadline → stale signed orders execute at attacker-chosen times.',
            'Frontrunning: public mempool transactions are visible pre-execution — use commit-reveal, batch auctions, or private relays.',
          ],
        },
      ],
      quiz: [
        {
          question: 'What prevents a signed message from being replayed on another chain?',
          options: [
            'The signature itself',
            'A domain separator including chainId (EIP-712)',
            'Gas limits',
            'Nothing can prevent it',
          ],
          correctIndex: 1,
          explanation:
            'The domain separator binds the signature to one chain + one contract — without it, signatures travel.',
        },
        {
          question: 'A signature scheme without a nonce allows…',
          options: [
            'Faster verification',
            'Reusing the same signature to execute the action repeatedly',
            'Cross-chain bridging',
            'Cheaper gas',
          ],
          correctIndex: 1,
          explanation:
            'Nonces make each signature single-use — the first replay check every auditor runs.',
        },
      ],
    },
    {
      title: 'Upgradeable Contract and Proxy Risks',
      summary:
        'Storage collisions, uninitialized implementations, function clashes, and admin key risk in proxy systems.',
      lessons: [
        {
          type: 'paragraph',
          text: 'Proxies multiply risk: storage layout mismatches corrupt state silently, uninitialized implementation contracts get claimed, function selector clashes route calls wrong, and the upgrade key is the protocol\'s most valuable secret. Every proxy audit includes layout diffs and admin-key review.',
        },
        {
          type: 'list',
          items: [
            'Storage collision — implementation writes must land on the proxy\'s intended slots; verify with openzeppelin-upgrades tooling.',
            'Uninitialized implementation — call _disableInitializers() in the implementation constructor.',
            'Selector clashes — a proxy admin function and implementation function sharing a selector.',
            'Upgrade key compromise = total loss — require multisig + timelock.',
            'Implementation destruction — selfdestruct/SELFDESTRUCT-able logic contracts brick all proxies pointing at them (the Parity multisig lesson).',
          ],
        },
        {
          type: 'callout',
          text: 'Tooling: `openzeppelin-upgrades` validates layouts automatically. Any manual proxy audit without a storage-diff is incomplete.',
        },
      ],
      quiz: [
        {
          question: 'The biggest single risk in a proxy system is…',
          options: [
            'Higher gas',
            'Compromise or misuse of the upgrade key — it can replace all logic and drain everything',
            'Slower transactions',
            'More events',
          ],
          correctIndex: 1,
          explanation:
            'Whoever upgrades controls all state. Multisig + timelock is non-negotiable for real deployments.',
        },
        {
          question: 'Why call _disableInitializers() in an implementation constructor?',
          options: [
            'To save gas',
            'To prevent anyone from initializing and taking control of the implementation contract itself',
            'To enable upgrades',
            'It\'s optional decoration',
          ],
          correctIndex: 1,
          explanation:
            'An uninitialized implementation can be claimed — attackers have bricked proxies by seizing the logic contract.',
        },
      ],
    },
    {
      title: 'Automated Analysis: Slither, Fuzzing, and Invariants',
      summary:
        'Run the auditor\'s toolchain: static analysis with Slither, property fuzzing with Echidna/Foundry, and coverage-guided testing.',
      lessons: [
        {
          type: 'paragraph',
          text: 'Tools don\'t replace review, but they multiply it. Slither statically analyzes for ~90 bug classes (reentrancy, unchecked calls, weak PRNG) in seconds — its findings are triage, not verdicts. Fuzzing proves properties hold across thousands of random inputs; invariant testing hammers random call sequences.',
        },
        {
          type: 'code',
          language: 'solidity',
          code: `// Foundry invariant test — the auditor's weapon
contract InvariantTest is Test {
    Vault vault;
    function setUp() public {
        vault = new Vault();
        targetContract(address(vault));  // fuzz random calls into it
    }
    // This must hold after ANY sequence of calls
    function invariant_solvent() public {
        assertGe(vault.totalAssets(), vault.totalOwed());
    }
}
// slither . --exclude-informational   # static triage
// echidna-test . --contract VaultEchidna  # property fuzzing`,
        },
        {
          type: 'list',
          items: [
            'Slither: fast triage — every finding needs human confirmation (false positives are common).',
            'Echidna: property-based fuzzer — you write "this should never happen", it hunts counterexamples.',
            'Foundry invariants: random call sequences against live state — catches interaction bugs.',
            'Coverage: aim for 100% line coverage, then distrust it — coverage ≠ correctness.',
          ],
        },
      ],
      quiz: [
        {
          question: 'Slither\'s role in an audit is…',
          options: [
            'Final verdict on security',
            'Fast triage — flagging candidate issues a human must confirm',
            'Fixing bugs automatically',
            'Deploying contracts',
          ],
          correctIndex: 1,
          explanation:
            'Static analysis finds candidates cheaply; a human decides which are real — it\'s the first pass, not the last.',
        },
        {
          question: 'Invariant testing works by…',
          options: [
            'Reading documentation',
            'Calling random function sequences and asserting protocol properties always hold',
            'Checking code style',
            'Measuring gas',
          ],
          correctIndex: 1,
          explanation:
            'Stateful fuzzing explores call orderings no human would enumerate — where interaction bugs live.',
        },
      ],
    },
    {
      title: 'Audit Process, Reports, and Capstone',
      summary:
        'Structure findings into a professional report, run a live capstone audit, and learn the business of security review.',
      lessons: [
        {
          type: 'paragraph',
          text: 'A finding is only valuable if the team can act on it. Professional reports contain: title, severity (Critical/High/Medium/Low/Info), description of the vulnerable code path, a proof of concept (ideally a runnable test), impact assessment, and a concrete recommended fix.',
        },
        {
          type: 'code',
          language: 'markdown',
          code: `## [H-1] Reentrancy in Vault.withdraw allows draining all funds

**Severity:** High  **Status:** Resolved

**Description:** withdraw() sends ETH before zeroing the balance.
An attacker's fallback re-enters and withdraws repeatedly.

**PoC:** test/Exploit.t.sol::test_drain — drains 10x deposited.

**Recommendation:** Apply checks-effects-interactions; add
nonReentrant guard.`,
        },
        {
          type: 'list',
          items: [
            'Capstone: audit a deliberately vulnerable vault contract — find all 7 seeded bugs and write findings.',
            'Process: solo review → peer discussion → report → remediation review (verify fixes didn\'t introduce new bugs).',
            'Practice platforms: Code4rena, Sherlock, Cantina competitive audits — real protocols, real bounties.',
            'Reputation is the product: precise, honest, actionable reports get rebooked; noise doesn\'t.',
          ],
        },
      ],
      quiz: [
        {
          question: 'A complete audit finding must include…',
          options: [
            'Only the bug location',
            'Severity, description, PoC, impact, and a concrete recommended fix',
            'A marketing summary',
            'The auditor\'s biography',
          ],
          correctIndex: 1,
          explanation:
            'Actionability is the deliverable — a finding without a fix path helps no one.',
        },
        {
          question: 'Why do remediation reviews matter?',
          options: [
            'They\'re billable hours',
            'Fixes can introduce new bugs — the patched code needs re-review',
            'They delay launch',
            'They\'re optional',
          ],
          correctIndex: 1,
          explanation:
            'Patches are new code — new code needs audit. Many exploits target the fix, not the original bug.',
        },
      ],
    },
  ],
};

export default course;
