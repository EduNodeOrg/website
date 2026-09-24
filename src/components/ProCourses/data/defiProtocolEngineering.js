// Course 114 — DeFi Protocol Engineering (Pro)
const course = {
  id: '114',
  title: 'DeFi Protocol Engineering',
  description:
    'Build and deploy decentralized finance protocols on Ethereum and other blockchains.',
  difficulty: 'intermediate',
  rating: 4.7,
  duration: '10 weeks',
  proOnly: true,
  diplomaEndpoint: 'diploma13',
  modules: [
    {
      title: 'DeFi Primitives and Protocol Anatomy',
      summary:
        'Map the DeFi stack — tokens, pools, oracles, governance — and learn to read a protocol like an engineer, not a user.',
      lessons: [
        {
          type: 'paragraph',
          text: 'Every DeFi protocol is a composition of a few primitives: token standards (ERC-20), liquidity pools, price oracles, interest-rate or collateral models, and governance. When you can decompose a protocol into primitives, you can evaluate its design — and its risks — quickly.',
        },
        {
          type: 'list',
          items: [
            'ERC-20 — fungible token standard: balanceOf, transfer, approve/transferFrom.',
            'LP tokens — shares representing a claim on pooled assets.',
            'Oracles — external price/data feeds contracts depend on.',
            'Treasury & governance — who controls upgrades and parameters.',
          ],
        },
        {
          type: 'code',
          language: 'solidity',
          code: `// ERC-20 surface every DeFi engineer must know cold
interface IERC20 {
    function totalSupply() external view returns (uint256);
    function balanceOf(address) external view returns (uint256);
    function transfer(address to, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address from, address to, uint256 amount)
        external returns (bool);
    function allowance(address owner, address spender)
        external view returns (uint256);
}`,
        },
        {
          type: 'callout',
          text: 'The approve/transferFrom pattern is how protocols move your tokens. Unlimited approvals are convenient — and the #1 wallet-drain vector. Cap allowances to what you need.',
        },
      ],
      quiz: [
        {
          question: 'What does an LP token represent?',
          options: [
            'A loan position',
            'A share of a liquidity pool\'s reserves',
            'A governance vote only',
            'A wrapped version of ETH',
          ],
          correctIndex: 1,
          explanation:
            'LP tokens are pro-rata claims on the pool\'s underlying assets — redeemable for your share.',
        },
        {
          question: 'Why is approve/transferFrom central to DeFi security?',
          options: [
            'It speeds up transactions',
            'It lets contracts pull your tokens — so a malicious or compromised spender can drain them',
            'It creates new tokens',
            'It is required for mining',
          ],
          correctIndex: 1,
          explanation:
            'Approvals delegate spending power. Unlimited approvals to a bad contract = instant drain.',
        },
        {
          question: 'Which is NOT a core DeFi primitive?',
          options: ['Liquidity pools', 'Price oracles', 'ERC-20 tokens', 'CAPTCHA'],
          correctIndex: 3,
          explanation:
            'Tokens, pools, and oracles compose nearly all of DeFi. CAPTCHA is a Web2 anti-bot tool.',
        },
      ],
    },
    {
      title: 'Automated Market Makers: The Constant Product',
      summary:
        'Derive x·y=k from first principles, implement a swap function, and understand price impact and slippage.',
      lessons: [
        {
          type: 'paragraph',
          text: 'An AMM replaces order books with a formula. In Uniswap v2, a pool holds reserves x and y, and every trade must keep x·y = k constant (minus fees). Price is the reserve ratio; the trade itself moves the price — that\'s price impact. Bigger trade relative to pool = worse execution.',
        },
        {
          type: 'code',
          language: 'solidity',
          code: `// Core constant-product swap math (0.3% fee)
function getAmountOut(uint256 amountIn, uint256 reserveIn, uint256 reserveOut)
    public pure returns (uint256)
{
    uint256 amountInWithFee = amountIn * 997;
    uint256 numerator = amountInWithFee * reserveOut;
    uint256 denominator = (reserveIn * 1000) + amountInWithFee;
    return numerator / denominator;
}
// Price impact ≈ amountIn / reserveIn — depth is everything`,
        },
        {
          type: 'list',
          items: [
            'Spot price = reserveOut / reserveIn.',
            'Slippage protection: every swap sets minAmountOut — the tx reverts if price moved against you.',
            'LPs earn 0.3% of volume but suffer impermanent loss when prices diverge.',
            'Arbitrageurs keep AMM prices aligned with the market — they\'re a feature, not a bug.',
          ],
        },
        {
          type: 'callout',
          text: 'Impermanent loss: LPs underperform holding when prices move — the pool always ends up with more of the cheaper asset. Fees must exceed IL for LPing to be profitable.',
        },
      ],
      quiz: [
        {
          question: 'In x·y=k, what happens to price when you sell a lot of token X?',
          options: [
            'Nothing — price is fixed',
            'X\'s price in the pool drops as its reserve grows',
            'The pool pauses trading',
            'k increases',
          ],
          correctIndex: 1,
          explanation:
            'Selling X grows reserve x, shrinking y to keep k constant — the marginal price falls. That\'s price impact.',
        },
        {
          question: 'What is minAmountOut for?',
          options: [
            'Paying gas',
            'Slippage protection — revert if execution is worse than expected',
            'Increasing LP rewards',
            'Minting tokens',
          ],
          correctIndex: 1,
          explanation:
            'It bounds acceptable execution — your defense against front-running and stale quotes.',
        },
        {
          question: 'Impermanent loss means…',
          options: [
            'LPs lose funds to hackers',
            'LPs underperform simply holding when asset prices diverge',
            'Tokens disappear over time',
            'Fees are never earned',
          ],
          correctIndex: 1,
          explanation:
            'The pool rebalances into the depreciating asset; LP value trails a hold portfolio as prices diverge.',
        },
      ],
    },
    {
      title: 'Liquidity Mining, Concentrated Liquidity, and DEX Evolution',
      summary:
        'From Uniswap v2 to v3 ticks to hooks: how capital efficiency evolved and what liquidity incentives do to tokenomics.',
      lessons: [
        {
          type: 'paragraph',
          text: 'Uniswap v3 concentrates liquidity: LPs choose a price range, and their capital only earns fees while price is inside it. Each range boundary is a "tick." This gives up to ~4000x capital efficiency but turns passive LPing into an active strategy — out-of-range positions earn nothing and are pure IL.',
        },
        {
          type: 'code',
          language: 'solidity',
          code: `// v3 position = liquidity bound to [tickLower, tickUpper]
// price follows tick spacing: price = 1.0001^tick
INonfungiblePositionManager.MintParams memory p = MintParams({
    token0: WETH, token1: USDC, fee: 3000,
    tickLower: -887220,   // wide range ≈ passive
    tickUpper:  887220,
    amount0Desired: 1 ether,
    amount1Desired: 2000e6,
    amount0Min: 0, amount1Min: 0,
    recipient: msg.sender,
    deadline: block.timestamp
});
positionManager.mint(p);   // returns an NFT — positions aren't fungible`,
        },
        {
          type: 'list',
          items: [
            'v2: uniform liquidity 0→∞ — simple, capital-inefficient.',
            'v3: ranged liquidity via NFT positions — efficient, active.',
            'v4: hooks let pools run custom logic (dynamic fees, on-chain limit orders).',
            'Liquidity mining: protocols pay token emissions to attract TVL — mercenary capital leaves when emissions stop.',
          ],
        },
        {
          type: 'callout',
          text: 'Engineering takeaway: TVL is rented, not owned. Design emissions to decay and align with protocol revenue, or watch liquidity vanish at the first better farm.',
        },
      ],
      quiz: [
        {
          question: 'Concentrated liquidity lets LPs…',
          options: [
            'Avoid all impermanent loss',
            'Provide liquidity in a chosen price range for higher capital efficiency',
            'Trade without fees',
            'Mint NFTs for free',
          ],
          correctIndex: 1,
          explanation:
            'Ranged positions put capital where trades happen — far more efficient, but requires active management.',
        },
        {
          question: 'In Uniswap v3, a liquidity position is represented by…',
          options: [
            'An ERC-20 LP token',
            'An NFT (non-fungible position)',
            'A governance vote',
            'A stablecoin',
          ],
          correctIndex: 1,
          explanation:
            'Each position has unique range parameters, so positions are non-fungible — hence NFTs.',
        },
        {
          question: 'The main risk of liquidity-mining emissions is…',
          options: [
            'Too many users',
            'Mercenary capital exits when rewards stop, taking TVL with it',
            'Contracts become slower',
            'Prices can\'t move',
          ],
          correctIndex: 1,
          explanation:
            'Emission-driven TVL is rented. Sustainable protocols tie incentives to real revenue.',
        },
      ],
    },
    {
      title: 'Lending Protocols: Collateral, Interest, and Liquidations',
      summary:
        'Build the core of Aave/Compound: utilization-based interest rates, collateral factors, and liquidation mechanics.',
      lessons: [
        {
          type: 'paragraph',
          text: 'Lending pools let users deposit assets to earn interest and borrow against collateral. The interest rate is algorithmic: it follows utilization (borrowed / supplied). Low utilization → low rates to attract borrowers; near 100% → rates spike to pull liquidity back. Positions stay open only while collateral value × collateral factor exceeds debt.',
        },
        {
          type: 'code',
          language: 'solidity',
          code: `// Utilization-kinked rate model (Compound-style)
function borrowRate(uint256 totalBorrows, uint256 totalCash)
    public pure returns (uint256)
{
    uint256 util = totalBorrows * 1e18 / (totalCash + totalBorrows);
    uint256 kink = 0.8e18;                       // 80%
    if (util <= kink) {
        return util * 0.04e18 / kink + 0.02e18;  // gentle slope to kink
    }
    uint256 excess = util - kink;
    return 0.06e18 + excess * 1.0e18 / (0.2e18); // steep slope past kink
}

// Health factor — liquidation triggers below 1.0
// HF = Σ(collateral_i × liquidationThreshold_i) / totalDebt`,
        },
        {
          type: 'list',
          items: [
            'Overcollateralization is the rule — you can borrow less than your collateral\'s risk-adjusted value.',
            'Liquidators repay part of underwater debt and seize collateral at a discount (the liquidation bonus).',
            'aTokens/cTokens are interest-bearing receipts — your balance grows as borrowers repay.',
            'Bad debt happens when collateral crashes faster than liquidators can act — why conservative factors exist.',
          ],
        },
      ],
      quiz: [
        {
          question: 'Utilization in a lending pool is…',
          options: [
            'Total deposits / users',
            'Borrowed amount / supplied amount — it drives the interest rate',
            'The token price',
            'The number of liquidations',
          ],
          correctIndex: 1,
          explanation:
            'Rates follow utilization: scarce liquidity → high rates to attract supply and discourage borrows.',
        },
        {
          question: 'A position becomes liquidatable when…',
          options: [
            'The user logs out',
            'Its health factor falls below 1 — collateral value no longer covers debt',
            'Gas prices rise',
            'The pool reaches 50% utilization',
          ],
          correctIndex: 1,
          explanation:
            'HF < 1 means the risk-adjusted collateral is worth less than the debt — liquidators step in.',
        },
        {
          question: 'What do liquidators earn for repaying underwater debt?',
          options: [
            'Nothing — it\'s altruistic',
            'Seized collateral at a discount (liquidation bonus)',
            'Governance tokens only',
            'A fixed salary',
          ],
          correctIndex: 1,
          explanation:
            'The discount incentivizes fast liquidation — the protocol\'s defense against bad debt.',
        },
      ],
    },
    {
      title: 'Oracles and Price Feeds',
      summary:
        'Use Chainlink safely, understand TWAP vs spot prices, and see why oracle design is where most exploits begin.',
      lessons: [
        {
          type: 'paragraph',
          text: 'Contracts can\'t see off-chain data — oracles bridge it. Chainlink aggregates many data providers into a medianized feed updated on deviation or heartbeat. AMMs can also be oracles: a TWAP (time-weighted average price) over 30 minutes is manipulation-resistant; a spot price from a single pool is trivially manipulable with a flash loan.',
        },
        {
          type: 'code',
          language: 'solidity',
          code: `// Chainlink — done right
AggregatorV3Interface feed = AggregatorV3Interface(FEED);
(uint80 roundId, int256 price,, uint256 updatedAt, uint80 answeredInRound)
    = feed.latestRoundData();

require(price > 0, "bad price");
require(answeredInRound >= roundId, "stale round");
require(block.timestamp - updatedAt <= 3600, "stale price"); // heartbeat check
uint256 px = uint256(price) * 1e10; // normalize 8 decimals -> 18`,
        },
        {
          type: 'list',
          items: [
            'Always check staleness (updatedAt vs heartbeat) and that price > 0.',
            'Never use a single DEX spot price — it can be moved within one block.',
            'TWAP windows trade freshness for manipulation resistance.',
            'Circuit breakers: pause if the feed deviates >X% — catches depegs and oracle failures.',
          ],
        },
        {
          type: 'callout',
          text: 'Oracle manipulation enabled the biggest DeFi exploits (Mango Markets $114M, bZx). If your protocol reads a price an attacker can move, assume they will.',
        },
      ],
      quiz: [
        {
          question: 'Why is a single-pool spot price unsafe as an oracle?',
          options: [
            'It updates too slowly',
            'It can be manipulated within one transaction (e.g., via flash loan)',
            'It uses too much gas',
            'It only works on testnets',
          ],
          correctIndex: 1,
          explanation:
            'Spot price reflects current reserves — an attacker can skew reserves, act on the bad price, and revert, all in one tx.',
        },
        {
          question: 'When reading a Chainlink feed you should check…',
          options: [
            'Only that it returns a number',
            'Freshness (heartbeat), positive price, and round completeness',
            'The token symbol',
            'Gas price',
          ],
          correctIndex: 1,
          explanation:
            'Stale or incomplete data is as dangerous as manipulated data — validate every read.',
        },
        {
          question: 'A TWAP improves security by…',
          options: [
            'Hiding the price',
            'Averaging over time so one-block manipulation has little effect',
            'Charging more fees',
            'Using more oracles',
          ],
          correctIndex: 1,
          explanation:
            'Manipulating a 30-minute average requires holding a skewed price for many blocks — prohibitively expensive.',
        },
      ],
    },
    {
      title: 'Stablecoins, Yield, and Staking Mechanics',
      summary:
        'Compare stablecoin designs, understand where yield actually comes from, and implement staking reward accounting.',
      lessons: [
        {
          type: 'paragraph',
          text: 'Stablecoins come in three designs: fiat-backed (USDC — centralized, custodial), crypto-overcollateralized (DAI — vaults of ETH/mixed collateral), and algorithmic (UST — collapsed 2022). Each trades decentralization for stability differently. Yield, meanwhile, must come from somewhere: borrower interest, trading fees, real-world assets, or token emissions. If you can\'t identify the yield source, you are the yield source.',
        },
        {
          type: 'code',
          language: 'solidity',
          code: `// Staking rewards — the "rewardPerToken" pattern (Synthetix)
uint256 public rewardPerTokenStored;
mapping(address => uint256) public paid;      // user checkpoint
mapping(address => uint256) public rewards;   // accrued

function earned(address u) public view returns (uint256) {
    return balanceOf(u)
        * (rewardPerTokenStored - paid[u]) / 1e18
        + rewards[u];
}
// O(1) per user — no loops over stakers. Update on every
// stake/unstake/claim and whenever rewards stream in.`,
        },
        {
          type: 'list',
          items: [
            'Real yield sources: borrow interest, swap fees, MEV, RWA T-bills.',
            'Emission yield is inflation — the "yield" is dilution paid by later holders.',
            'Peg mechanisms: arbitrage redemption (USDC mint/redeem), overcollateralized vault liquidations (DAI).',
            'Depeg risk compounds: a stablecoin collateralizing loans imports its peg risk into the lender.',
          ],
        },
      ],
      quiz: [
        {
          question: 'Which stablecoin design collapsed in May 2022?',
          options: [
            'Fiat-backed (USDC)',
            'Algorithmic (UST/Luna)',
            'Crypto-overcollateralized (DAI)',
            'Gold-backed',
          ],
          correctIndex: 1,
          explanation:
            'UST\'s algorithmic peg entered a death spiral — a ~$40B lesson in reflexive collateral design.',
        },
        {
          question: 'The rewardPerToken pattern exists because…',
          options: [
            'It uses less storage than any alternative',
            'Looping over all stakers to distribute rewards is O(n) and unscalable',
            'It makes rewards untaxable',
            'Solidity lacks division',
          ],
          correctIndex: 1,
          explanation:
            'Accumulating rewards per token and checkpointing users gives O(1) accounting regardless of staker count.',
        },
        {
          question: 'Sustainable protocol yield primarily comes from…',
          options: [
            'Printing new tokens',
            'Real revenue: interest, fees, MEV, or external yield like T-bills',
            'Referral bonuses',
            'Higher gas prices',
          ],
          correctIndex: 1,
          explanation:
            'Emissions are dilution, not revenue. Trace where the yield originates before trusting the APY.',
        },
      ],
    },
    {
      title: 'Flash Loans and Atomic Arbitrage',
      summary:
        'Implement a flash loan callback, understand why uncollateralized loans are safe, and survey arbitrage strategies.',
      lessons: [
        {
          type: 'paragraph',
          text: 'A flash loan lends millions with zero collateral — because the borrow, use, and repayment happen inside one transaction. If repayment fails, everything reverts and the loan never happened. They power arbitrage, collateral swaps, and liquidations — and feature in most major exploits as free capital.',
        },
        {
          type: 'code',
          language: 'solidity',
          code: `// Borrower side — Aave v3 flash loan
function executeOperation(
    address asset, uint256 amount, uint256 premium, address, bytes calldata
) external override returns (bool) {
    require(msg.sender == address(POOL), "only pool");
    // ... do stuff with amount: arb, liquidate, refinance ...
    uint256 owed = amount + premium;
    IERC20(asset).approve(address(POOL), owed);
    return true;   // pool pulls owed; revert => loan never existed
}

function run() external {
    POOL.flashLoanSimple(address(this), USDC, 1_000_000e6, "", 0);
}`,
        },
        {
          type: 'list',
          items: [
            'DEX arbitrage — buy cheap on pool A, sell dear on pool B, repay, keep the spread.',
            'Liquidations — flash-borrow the debt asset, liquidate, sell collateral, repay.',
            'Collateral swap — close a CDP and reopen with different collateral atomically.',
            'Defense: never let your protocol\'s price or voting depend on same-transaction state.',
          ],
        },
        {
          type: 'callout',
          text: 'Flash loans don\'t create vulnerabilities — they fund them. Any logic that assumes "nobody could get $50M temporarily" is broken by design.',
        },
      ],
      quiz: [
        {
          question: 'Flash loans are safe for lenders because…',
          options: [
            'Borrowers post collateral first',
            'Borrow + use + repay happen atomically — non-repayment reverts the whole transaction',
            'They\'re limited to $1000',
            'Only trusted users can borrow',
          ],
          correctIndex: 1,
          explanation:
            'Atomicity is the collateral: a failed repayment rolls back the loan itself.',
        },
        {
          question: 'The key defense against flash-loan-funded manipulation is…',
          options: [
            'Banning flash loans',
            'Not deriving prices/votes from state an attacker can skew within one transaction',
            'Charging higher fees',
            'Requiring KYC',
          ],
          correctIndex: 1,
          explanation:
            'TWAPs, time-delayed governance, and manipulation-resistant pricing neutralize temporary capital.',
        },
      ],
    },
    {
      title: 'Governance and Tokenomics',
      summary:
        'Design token distribution, voting escrow (veToken), and on-chain governance that can\'t be captured or flash-loaned.',
      lessons: [
        {
          type: 'paragraph',
          text: 'Governance tokens coordinate protocol upgrades and treasury spend. Naive 1-token-1-vote is capturable: whales buy control or flash-borrow votes (the Beanstalk $182M exploit was a flash-loaned governance attack). Modern designs use vote-escrowed tokens (veCRV): lock tokens for time-weighted power, making attacks expensive and long-term aligned.',
        },
        {
          type: 'code',
          language: 'solidity',
          code: `// Governor lifecycle (OpenZeppelin):
// propose -> voteDelay -> votePeriod -> queue -> timelock -> execute
IGovernor governor = IGovernor(GOV);
uint256 pid = governor.propose(
    targets, values, calldatas,
    "Upgrade vault fee to 0.5%"
);
// ... voting happens over votePeriod ...
governor.queue(targets, values, calldatas, descHash);
// timelock delay passes — users can exit if they disagree
governor.execute(targets, values, calldatas, descHash);`,
        },
        {
          type: 'list',
          items: [
            'Snapshot voting power at proposal start — never use live balances (flash-loanable).',
            'veTokenomics: lock time → voting weight; aligns voters with long-term outcomes.',
            'Timelock execution so users can exit before changes land.',
            'Quorum + proposal thresholds prevent spam and low-turnout capture.',
            'Tokenomics basics: fixed supply vs emissions, utility vs pure governance, treasury runway.',
          ],
        },
      ],
      quiz: [
        {
          question: 'Why snapshot voting power at proposal creation?',
          options: [
            'To save gas',
            'So attackers can\'t buy or flash-borrow tokens just to swing one vote',
            'To hide voter identity',
            'To allow editing votes later',
          ],
          correctIndex: 1,
          explanation:
            'Historical snapshots neutralize temporary token acquisition — the Beanstalk attack vector.',
        },
        {
          question: 'Vote-escrowed (ve) tokens align incentives by…',
          options: [
            'Giving everyone equal votes',
            'Granting voting power proportional to lock duration — attackers must commit long-term',
            'Removing voting entirely',
            'Paying voters in stablecoins',
          ],
          correctIndex: 1,
          explanation:
            'Locking makes governance capture expensive and selects for participants with long time horizons.',
        },
        {
          question: 'What does a timelock add to governance?',
          options: [
            'Faster execution',
            'A delay between approval and execution so users can exit if they disagree',
            'More gas costs only',
            'Anonymous voting',
          ],
          correctIndex: 1,
          explanation:
            'The delay converts "the DAO could steal funds" into "the DAO must announce it first."',
        },
      ],
    },
    {
      title: 'MEV and Transaction Ordering',
      summary:
        'Understand the mempool economy — sandwiches, backrunning, liquidations — and how to protect users from extraction.',
      lessons: [
        {
          type: 'paragraph',
          text: 'MEV (maximal extractable value) is profit from reordering, inserting, or censoring transactions. Searchers scan the mempool for opportunities: sandwich attacks (front-run your swap + back-run it to extract your slippage tolerance), arbitrage backruns, and liquidation races. Private mempools (Flashbots Protect, MEV-Share) hide your transactions until inclusion.',
        },
        {
          type: 'list',
          items: [
            'Sandwich attack — attacker buys before your swap and sells after; your slippage is their profit.',
            'Defense: tight slippage bounds (minAmountOut) + private transaction submission.',
            'Backrunning — arbitrage after large trades is healthy; it keeps prices consistent.',
            'PBS/MEV-Boost — separates block building from proposing; validators auction blockspace.',
            'Application design: batch auctions and uniform clearing prices (CoW Swap) remove ordering advantage.',
          ],
        },
        {
          type: 'callout',
          text: 'Rule of thumb: any user-facing slippage tolerance is an MEV budget. Default tight, route via private RPCs, and prefer intents/batch designs where possible.',
        },
      ],
      quiz: [
        {
          question: 'A sandwich attack profits from…',
          options: [
            'Mining empty blocks',
            'Bracketing a victim\'s swap — buying before and selling after to capture their slippage tolerance',
            'Stealing private keys',
            'Oracle downtime',
          ],
          correctIndex: 1,
          explanation:
            'The attacker extracts value equal to the victim\'s allowed slippage — tight bounds minimize it.',
        },
        {
          question: 'The best user-side MEV defenses are…',
          options: [
            'Bigger gas tips',
            'Tight slippage limits and private transaction submission (e.g., Flashbots Protect)',
            'Using more dApps',
            'Longer passwords',
          ],
          correctIndex: 1,
          explanation:
            'Invisible transactions can\'t be sandwiched; tight bounds cap what can be extracted.',
        },
      ],
    },
    {
      title: 'Capstone: Build a Mini Lending Protocol',
      summary:
        'Assemble everything — pool accounting, oracle-priced collateral, kinked rates, liquidation — into a working protocol.',
      lessons: [
        {
          type: 'paragraph',
          text: 'Your capstone: a single-asset lending pool. Depositors supply USDC and earn interest; borrowers post ETH collateral priced by Chainlink; a kinked rate model prices loans; positions under 1.0 health factor are liquidatable at a 5% bonus. This is a real (small) protocol — write it, fuzz it, fork-test it.',
        },
        {
          type: 'code',
          language: 'solidity',
          code: `contract MiniLend {
    IERC20 usdc; AggregatorV3Interface ethFeed;
    uint256 public totalDeposits, totalBorrows;
    uint256 public constant COLLATERAL_FACTOR = 0.75e18; // 75%
    uint256 public constant LIQ_BONUS = 0.05e18;          // 5%

    mapping(address => uint256) public deposits, borrows, collateral;

    function healthFactor(address u) public view returns (uint256) {
        uint256 debt = borrows[u];
        if (debt == 0) return type(uint256).max;
        uint256 ethPx = /* validated feed read */;
        return collateral[u] * ethPx * COLLATERAL_FACTOR / debt / 1e18;
    }

    function liquidate(address u) external {
        require(healthFactor(u) < 1e18, "healthy");
        uint256 debt = borrows[u];
        usdc.transferFrom(msg.sender, address(this), debt);
        uint256 seize = debt * (1e18 + LIQ_BONUS) / ethPx / 1e18;
        collateral[u] -= seize; borrows[u] = 0; totalBorrows -= debt;
        payable(msg.sender).transfer(seize);
    }
}`,
        },
        {
          type: 'list',
          items: [
            'Invariants to fuzz: totalBorrows ≤ totalDeposits·cap; sum(borrows) == totalBorrows; no healthy position liquidatable.',
            'Fork-test against real Chainlink feeds on a mainnet fork.',
            'Threat model: oracle staleness, ETH crash speed vs liquidation latency, borrow-cap bounds.',
            'Ship checklist: tests, invariants, gas report, deploy script, verified source, monitoring plan.',
          ],
        },
      ],
      quiz: [
        {
          question: 'The liquidation incentive works because…',
          options: [
            'Liquidators are volunteers',
            'Liquidators repay debt and receive collateral worth more than what they paid',
            'The protocol pays a salary',
            'Borrowers tip liquidators',
          ],
          correctIndex: 1,
          explanation:
            'The liquidation bonus is the bounty that keeps the protocol solvent — it must exceed gas + slippage.',
        },
        {
          question: 'The most important invariant to fuzz in a lending protocol is…',
          options: [
            'The UI renders',
            'Solvency: outstanding borrows never exceed what collateral can cover',
            'Gas stays under 21,000',
            'Admin keys rotate daily',
          ],
          correctIndex: 1,
          explanation:
            'Protocol solvency is the existential property — invariant testing hunts every path that could break it.',
        },
      ],
    },
  ],
};

export default course;
