// Course 113 — Advanced Smart Contract Development (Pro)
const course = {
  id: '113',
  title: 'Advanced Smart Contract Development',
  description:
    'Master smart contract programming with Solidity and build real-world DeFi applications.',
  difficulty: 'advanced',
  rating: 4.9,
  duration: '8 weeks',
  proOnly: true,
  diplomaEndpoint: 'diploma12',
  modules: [
    {
      title: 'Solidity Deep Dive: The EVM and Storage',
      summary:
        'Understand how the EVM executes your code, how storage/memory/calldata differ, and why layout bugs are catastrophic.',
      lessons: [
        {
          type: 'paragraph',
          text: 'The Ethereum Virtual Machine is a stack-based machine that executes your contract bytecode identically on every node. Every state-changing operation costs gas. To write advanced contracts you must understand where data lives: storage (persistent, expensive, laid out in 32-byte slots), memory (temporary, per-call), calldata (read-only function input), and the stack (1024 items deep).',
        },
        {
          type: 'code',
          language: 'solidity',
          code: `contract StorageDemo {
    uint256 a;        // slot 0
    uint128 b;        // slot 1 (packed with c)
    uint128 c;        // slot 1 — two uint128 pack into one 32-byte slot
    mapping(address => uint256) balances; // keccak(key . slot) — dynamic
    uint256[] items;  // slot holds length; data at keccak(slot)+i

    function f(uint256[] calldata input) external {
        uint256[] memory copy = input;   // memory = temp workspace
        // storage pointer — writes go straight to chain state
        uint256[] storage ref = items;
        ref.push(copy[0]);
    }
}`,
        },
        {
          type: 'callout',
          text: 'Variable packing matters: ordering uint128, uint128, uint256 uses 2 slots; uint128, uint256, uint128 uses 3. In upgradeable contracts, changing storage layout breaks everything.',
        },
        {
          type: 'heading',
          text: 'Function Visibility and Mutability',
        },
        {
          type: 'list',
          items: [
            'external — only callable from outside; cheaper calldata handling.',
            'public — callable internally and externally; auto-generates a getter for state vars.',
            'internal — this contract and inheriting contracts only.',
            'private — this contract only (but still readable on-chain — "private" ≠ secret).',
            'view — reads state, doesn\'t modify; pure — touches no state at all.',
            'payable — required to receive ETH with the call.',
          ],
        },
      ],
      quiz: [
        {
          question: 'Where are contract state variables persisted?',
          options: ['calldata', 'memory', 'storage', 'the stack'],
          correctIndex: 2,
          explanation:
            'Storage is the persistent key-value space of the contract; memory and calldata vanish after the call.',
        },
        {
          question: 'Two consecutive uint128 state variables occupy…',
          options: [
            'Two separate storage slots',
            'One shared 32-byte slot (packed)',
            'No storage — they live in memory',
            'Four slots due to alignment',
          ],
          correctIndex: 1,
          explanation:
            'The compiler packs adjacent variables ≤32 bytes into a single slot — ordering affects gas and upgrade safety.',
        },
        {
          question: 'Marking a variable `private` means…',
          options: [
            'Its value is encrypted on-chain',
            'Only the owner can read it',
            'Other contracts can\'t read it via code, but anyone can read the slot off-chain',
            'It uses less gas',
          ],
          correctIndex: 2,
          explanation:
            '`private` is a compiler-level restriction — all chain data is publicly readable. Never store secrets on-chain.',
        },
      ],
    },
    {
      title: 'Calls, Delegation, and Contract Interaction',
      summary:
        'Master call vs. delegatecall vs. staticcall, interfaces, and the low-level calls used by proxies and multisigs.',
      lessons: [
        {
          type: 'paragraph',
          text: 'Contracts talk to each other through calls. A high-level call through an interface is typed and safe. Low-level calls (address.call) return success bytes and raw data — powerful but dangerous. delegatecall runs another contract\'s code in YOUR storage context — the primitive behind every upgradeable proxy — and also behind some of the worst exploits in history.',
        },
        {
          type: 'code',
          language: 'solidity',
          code: `interface IERC20 {
    function transfer(address to, uint256 amount) external returns (bool);
}

contract Caller {
    // High-level, type-safe
    function payToken(address token, address to, uint256 amt) external {
        require(IERC20(token).transfer(to, amt), "transfer failed");
    }

    // Low-level — handles non-standard tokens (e.g., missing return)
    function payRaw(address token, address to, uint256 amt) external {
        (bool ok, bytes memory data) = token.call(
            abi.encodeWithSignature("transfer(address,uint256)", to, amt)
        );
        require(ok && (data.length == 0 || abi.decode(data, (bool))), "fail");
    }
}`,
        },
        {
          type: 'list',
          items: [
            'call — executes target code with target storage/context; forwards gas and value.',
            'delegatecall — executes target code with CALLER\'s storage, msg.sender preserved. Proxy upgrades rely on it.',
            'staticcall — read-only call; any state change reverts. Used for view functions.',
            'callcode — deprecated ancestor of delegatecall; never use.',
          ],
        },
        {
          type: 'callout',
          text: 'Rule: prefer interfaces. Use low-level calls only when handling non-standard return values or building generic proxies/multisigs — and always check the boolean return.',
        },
      ],
      quiz: [
        {
          question: 'What does delegatecall do?',
          options: [
            'Calls a contract with its own storage',
            'Runs the target\'s code in the caller\'s storage and context',
            'Creates a new contract',
            'Forwards the call to another chain',
          ],
          correctIndex: 1,
          explanation:
            'delegatecall executes external code against YOUR storage — the basis of proxy upgrade patterns.',
        },
        {
          question: 'Why check the return value of a low-level .call?',
          options: [
            'It\'s optional — calls never fail',
            'call returns false instead of reverting; ignoring it silently swallows failures',
            'To save gas',
            'To log events',
          ],
          correctIndex: 1,
          explanation:
            'Unlike high-level calls, .call doesn\'t propagate reverts — it returns false. Unchecked calls have caused real losses.',
        },
        {
          question: 'Which call type guarantees no state modification?',
          options: ['call', 'delegatecall', 'staticcall', 'payable call'],
          correctIndex: 2,
          explanation:
            'staticcall enforces read-only execution at the EVM level — used for all view/pure invocations.',
        },
      ],
    },
    {
      title: 'Design Patterns: Factory, Proxy, and Upgradeability',
      summary:
        'Learn the patterns every production protocol uses: factories for spawning contracts, proxies for upgrades, and access control for administration.',
      lessons: [
        {
          type: 'paragraph',
          text: 'Bytecode is immutable, but real systems need fixes and features. The industry answer is the proxy pattern: users interact with a lightweight proxy contract that delegatecalls into an implementation contract. Upgrading = pointing the proxy at a new implementation address — state lives in the proxy and survives.',
        },
        {
          type: 'code',
          language: 'solidity',
          code: `// Minimal proxy skeleton (educational — use OpenZeppelin in prod)
contract Proxy {
    address public implementation;
    address public admin;

    fallback() external payable {
        (bool ok, bytes memory data) = implementation.delegatecall(msg.data);
        require(ok, "delegatecall failed");
        assembly { return(add(data, 32), mload(data)) }
    }
}

// Factory pattern — spawn identical contracts cheaply
contract WalletFactory {
    event Created(address wallet);
    function create() external returns (address w) {
        w = address(new Wallet(msg.sender));
        emit Created(w);
    }
    // Clones (EIP-1167): deploy minimal proxies for ~45k gas
}`,
        },
        {
          type: 'list',
          items: [
            'Transparent proxy — admin calls go to the proxy, user calls delegate to implementation.',
            'UUPS — upgrade logic lives in the implementation itself (cheaper, but a bad upgrade can brick it).',
            'Beacon — one beacon contract upgrades many proxies at once.',
            'Storage gaps — reserve slots in base contracts so upgrades can add variables safely.',
          ],
        },
        {
          type: 'callout',
          text: 'Never reorder or insert state variables in an upgrade — append only. The storage layout is a contract with your past self.',
        },
      ],
      quiz: [
        {
          question: 'In a proxy upgrade pattern, where does state live?',
          options: [
            'In the implementation contract',
            'In the proxy contract — the implementation only supplies code',
            'In the admin\'s wallet',
            'In a separate database',
          ],
          correctIndex: 1,
          explanation:
            'delegatecall means all storage writes hit the proxy\'s slots. The implementation is just logic.',
        },
        {
          question: 'When upgrading an implementation, you must…',
          options: [
            'Reorder storage variables alphabetically',
            'Only append new state variables — never reorder or change existing types',
            'Redeploy the proxy',
            'Migrate all user funds manually',
          ],
          correctIndex: 1,
          explanation:
            'Storage slots are positional. Reordering shifts every subsequent slot and corrupts state.',
        },
        {
          question: 'What is the factory pattern used for?',
          options: [
            'Minting NFTs only',
            'Deploying many contract instances from one on-chain template',
            'Upgrading proxies',
            'Paying gas fees',
          ],
          correctIndex: 1,
          explanation:
            'Factories spawn per-user/per-pool contracts (Uniswap pairs, multisigs, wallets) on demand.',
        },
      ],
    },
    {
      title: 'Gas Optimization Techniques',
      summary:
        'Measure and cut gas costs: storage packing, calldata tricks, caching, and the patterns that separate junior from senior Solidity devs.',
      lessons: [
        {
          type: 'paragraph',
          text: 'Gas optimization is applied knowledge of EVM costs. An SSTORE to a fresh slot costs ~20,000 gas; to a dirty slot ~5,000; SLOAD is ~100 (warm) vs ~2,100 (cold). Memory is cheap; calldata is cheapest. Every optimization is a trade between these costs and readability.',
        },
        {
          type: 'code',
          language: 'solidity',
          code: `contract GasTricks {
    // BAD: re-reads storage every iteration
    function sumBad() public view returns (uint256 s) {
        for (uint256 i = 0; i < items.length; i++) s += items[i];
    }

    // GOOD: cache length + array in memory
    function sumGood() public view returns (uint256 s) {
        uint256[] memory it = items;
        uint256 len = it.length;
        for (uint256 i; i < len; ) {
            s += it[i];
            unchecked { ++i; }      // skip overflow check (~30-80 gas/iter)
        }
    }

    // immutable vars are baked into bytecode — no SLOAD at all
    address public immutable owner;
    uint256 public constant FEE = 30;   // compile-time constant`,
        },
        {
          type: 'list',
          items: [
            'Pack storage variables to share slots; order structs to minimize slots.',
            'Use calldata instead of memory for read-only external args.',
            'Prefer custom errors (error Foo();) over revert strings — saves deploy + runtime gas.',
            'Batch operations and use bitmaps/bit-packing for flags.',
            'short-circuit && / || ordering: put cheap/likely-failing checks first.',
            'Events are ~8x cheaper than storage for data you only need off-chain.',
          ],
        },
        {
          type: 'callout',
          text: 'Measure first: `forge test --gas-report` shows per-function cost. Optimize hot paths, not everything.',
        },
      ],
      quiz: [
        {
          question: 'The single most expensive common operation is…',
          options: [
            'Adding two numbers',
            'Writing to a fresh storage slot (SSTORE ~20,000 gas)',
            'Emitting an event',
            'Reading calldata',
          ],
          correctIndex: 1,
          explanation:
            'Fresh storage writes dominate gas costs — minimizing SSTOREs is the first lever.',
        },
        {
          question: 'Why mark a variable `immutable`?',
          options: [
            'It makes the contract upgradeable',
            'Its value is embedded in bytecode — reads cost zero SLOADs',
            'It encrypts the value',
            'It can be changed by the owner later',
          ],
          correctIndex: 1,
          explanation:
            'immutable values are set once in the constructor and inlined into the deployed code.',
        },
        {
          question: 'Custom errors vs revert strings…',
          options: [
            'Are purely cosmetic',
            'Save deployment and runtime gas — strings are stored and returned as data',
            'Prevent all bugs',
            'Are required by the EVM',
          ],
          correctIndex: 1,
          explanation:
            '`error Unauthorized();` costs far less than `require(x, "Not authorized")` which stores/returns a string.',
        },
      ],
    },
    {
      title: 'Testing and Fuzzing with Foundry',
      summary:
        'Set up a professional Solidity workflow: unit tests, fork tests against mainnet state, and property-based fuzzing.',
      lessons: [
        {
          type: 'paragraph',
          text: 'Foundry is the standard toolchain for serious Solidity work: forge (build/test), cast (CLI chain interaction), anvil (local node), and chisel (REPL). Tests are written in Solidity itself — no context switching — and run in milliseconds.',
        },
        {
          type: 'code',
          language: 'solidity',
          code: `// test/Vault.t.sol
import "forge-std/Test.sol";

contract VaultTest is Test {
    Vault vault;
    address alice = makeAddr("alice");

    function setUp() public {
        vault = new Vault();
        vm.deal(alice, 10 ether);          // cheatcodes!
    }

    function test_Deposit() public {
        vm.prank(alice);                  // next call is from alice
        vault.deposit{value: 1 ether}();
        assertEq(vault.balanceOf(alice), 1 ether);
    }

    // Fuzz: forge runs this with 256 random inputs
    function testFuzz_Deposit(uint96 amount) public {
        vm.assume(amount > 0 && amount <= 10 ether);
        vm.deal(alice, amount);
        vm.prank(alice);
        vault.deposit{value: amount}();
        assertEq(vault.balanceOf(alice), amount);
    }
}`,
        },
        {
          type: 'list',
          items: [
            'Unit tests — every external function, happy path and revert path.',
            'Fork tests — vm.createSelectFork("mainnet") runs tests against real deployed state.',
            'Fuzz tests — declare invariants, let the fuzzer hunt for counterexamples.',
            'Invariant tests — stateful fuzzing that calls random function sequences.',
            'Cheatcodes — vm.prank, vm.deal, vm.expectRevert, time-warping with vm.warp.',
          ],
        },
        {
          type: 'callout',
          text: 'The bar for production DeFi: 100% line coverage is the floor, not the goal. Invariants like "sum(shares) == totalSupply" catch what example-driven tests miss.',
        },
      ],
      quiz: [
        {
          question: 'In Foundry, tests are written in…',
          options: ['JavaScript', 'Python', 'Solidity itself', 'Rust'],
          correctIndex: 2,
          explanation:
            'Foundry tests are Solidity contracts — forge runs them natively with no JS wrapper.',
        },
        {
          question: 'What does `vm.prank(alice)` do?',
          options: [
            'Sends ETH to alice',
            'Makes the next call execute as if from alice\'s address',
            'Deploys a contract for alice',
            'Freezes alice\'s account',
          ],
          correctIndex: 1,
          explanation:
            'Cheatcodes manipulate the test VM: prank sets msg.sender, deal sets balances, warp sets time.',
        },
        {
          question: 'Fuzz testing works by…',
          options: [
            'Running tests in parallel',
            'Generating many random inputs to find cases that violate assertions or invariants',
            'Compressing test files',
            'Testing only the UI',
          ],
          correctIndex: 1,
          explanation:
            'The fuzzer throws hundreds of random inputs at your function looking for counterexamples.',
        },
      ],
    },
    {
      title: 'Access Control and Security Patterns',
      summary:
        'Implement role-based access, reentrancy guards, pausability, and checks-effects-interactions — the patterns auditors check first.',
      lessons: [
        {
          type: 'paragraph',
          text: 'Most exploits are not exotic — they\'re missing checks. Every privileged function needs explicit access control; every external call needs a reentrancy story; every state change should follow checks-effects-interactions (validate → update state → THEN interact).',
        },
        {
          type: 'code',
          language: 'solidity',
          code: `import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

contract Vault is AccessControl, ReentrancyGuard, Pausable {
    bytes32 public constant PAUSER = keccak256("PAUSER");

    constructor() { _grantRole(DEFAULT_ADMIN_ROLE, msg.sender); }

    function withdraw(uint256 amount) external nonReentrant whenNotPaused {
        // CHECKS
        require(balances[msg.sender] >= amount, "insufficient");
        // EFFECTS — state updated BEFORE the external call
        balances[msg.sender] -= amount;
        // INTERACTIONS — last
        (bool ok,) = msg.sender.call{value: amount}("");
        require(ok, "send failed");
    }

    function pause() external onlyRole(PAUSER) { _pause(); }
}`,
        },
        {
          type: 'list',
          items: [
            'Ownable for single-admin contracts; AccessControl for multi-role systems.',
            'nonReentrant on every function that makes external calls with value.',
            'Pull over push: let users withdraw rather than pushing funds to them.',
            'Timelocks on admin actions so users can exit before changes take effect.',
            'Input validation on every external parameter — addresses, amounts, array lengths.',
          ],
        },
      ],
      quiz: [
        {
          question: 'Checks-effects-interactions ordering protects against…',
          options: ['Gas spikes', 'Reentrancy attacks', 'Front-running', 'Bad UI'],
          correctIndex: 1,
          explanation:
            'Updating state before the external call means a re-entering attacker sees already-depleted balances.',
        },
        {
          question: 'Why prefer pull-over-push payments?',
          options: [
            'It\'s cheaper in all cases',
            'A failing push transfer can brick the whole contract; pulls isolate failure to the recipient',
            'Push is not supported by the EVM',
            'Pull payments are anonymous',
          ],
          correctIndex: 1,
          explanation:
            'If a pushed recipient reverts (e.g., a contract wallet), your whole function fails. Pulls let each user claim independently.',
        },
        {
          question: 'A timelock on admin functions gives users…',
          options: [
            'Higher yield',
            'A window to exit before a potentially harmful admin change takes effect',
            'Free gas',
            'Voting rights automatically',
          ],
          correctIndex: 1,
          explanation:
            'Timelocks turn admin power into announced power — users can react to a queued change.',
        },
      ],
    },
    {
      title: 'Building a DeFi Vault: Capstone I',
      summary:
        'Apply everything so far: build an ERC-4626-style tokenized vault with deposits, shares math, and fee handling.',
      lessons: [
        {
          type: 'paragraph',
          text: 'ERC-4626 is the standard for tokenized vaults: users deposit an underlying asset and receive shares representing their claim. Share price = totalAssets / totalSupply. Getting this math right — especially rounding direction and the first-depositor inflation attack — is the core skill.',
        },
        {
          type: 'code',
          language: 'solidity',
          code: `contract MiniVault {
    IERC20 public immutable asset;
    uint256 public totalSupply;
    mapping(address => uint256) public shares;

    function deposit(uint256 assets) external returns (uint256 s) {
        uint256 supply = totalSupply;
        uint256 held = asset.balanceOf(address(this));
        // virtual shares offset defeats the inflation attack
        s = supply == 0 ? assets : (assets * supply) / held;
        require(s > 0, "zero shares");
        asset.transferFrom(msg.sender, address(this), assets);
        shares[msg.sender] += s;
        totalSupply = supply + s;
    }

    function withdraw(uint256 s) external returns (uint256 assets) {
        require(shares[msg.sender] >= s, "insufficient");
        assets = (s * asset.balanceOf(address(this))) / totalSupply;
        shares[msg.sender] -= s;
        totalSupply -= s;
        asset.transfer(msg.sender, assets);
    }
}`,
        },
        {
          type: 'list',
          items: [
            'Round AGAINST the user: mint fewer shares on deposit, return less on withdrawal — favors the vault.',
            'First-deposit attack: an attacker donates to inflate share price and steals from the next depositor. Defend with virtual shares or a minimum initial deposit.',
            'Test with fuzzing: random deposit/withdraw sequences must preserve the invariant sum(shares) claims <= vault balance.',
          ],
        },
      ],
      quiz: [
        {
          question: 'In a share-based vault, rounding should favor…',
          options: [
            'The depositor',
            'The vault (round down shares minted / assets returned)',
            'It doesn\'t matter',
            'The fastest transaction',
          ],
          correctIndex: 1,
          explanation:
            'Rounding against the user keeps the vault solvent; the reverse leaks value each operation.',
        },
        {
          question: 'The first-depositor (inflation) attack works by…',
          options: [
            'Deploying two vaults',
            'Donating assets to inflate share price so the next depositor\'s shares round to near zero',
            'Calling withdraw twice',
            'Pausing the contract',
          ],
          correctIndex: 1,
          explanation:
            'By making 1 share worth a huge amount, the attacker causes rounding to gift them the victim\'s deposit. Virtual offsets prevent it.',
        },
      ],
    },
    {
      title: 'Deployment, Verification, and Capstone II',
      summary:
        'Ship the vault to a testnet professionally: scripted deployment, source verification, monitoring, and an incident checklist.',
      lessons: [
        {
          type: 'paragraph',
          text: 'Professional deployment is scripted and repeatable, not a Remix click. Foundry scripts deploy, configure roles, seed initial state, and verify source on Etherscan in one pass.',
        },
        {
          type: 'code',
          language: 'solidity',
          code: `// script/Deploy.s.sol
contract Deploy is Script {
    function run() external {
        uint256 key = vm.envUint("DEPLOYER_KEY");
        vm.startBroadcast(key);
        IERC20 asset = IERC20(vm.envAddress("ASSET"));
        MiniVault vault = new MiniVault(asset);
        vault.grantRole(vault.PAUSER(), vm.envAddress("GUARDIAN"));
        vm.stopBroadcast();
        console.log("vault:", address(vault));
    }
}
// forge script script/Deploy.s.sol --broadcast --verify -r $RPC`,
        },
        {
          type: 'list',
          items: [
            'Verify source immediately — unverified contracts are untrusted by users and tools.',
            'Transfer admin roles to a multisig (Safe) — never leave a single EOA holding admin.',
            'Set up monitoring: events → Tenderly/Forta alerts for pause, large withdrawals, role grants.',
            'Document the incident runbook: who can pause, how fast, what the comms channel is.',
            'Publish the audit + a bug bounty before calling anything production-ready.',
          ],
        },
        {
          type: 'callout',
          text: 'Capstone checklist: vault deployed to Sepolia, verified source, roles on a multisig, fork tests green, gas report reviewed, incident runbook written. That is the bar this course sets for real deployments.',
        },
      ],
      quiz: [
        {
          question: 'Why deploy via scripts rather than manually?',
          options: [
            'Scripts are cheaper',
            'Repeatability — deploy, configure roles, and verify identically every time with an audit trail',
            'Manual deployment is impossible',
            'Scripts avoid gas fees',
          ],
          correctIndex: 1,
          explanation:
            'Scripted deployment eliminates configuration mistakes and produces reproducible, reviewable deployments.',
        },
        {
          question: 'Admin keys for a production contract should be held by…',
          options: [
            'A single developer\'s MetaMask',
            'A multisig or DAO-controlled timelock',
            'The contract itself with no access',
            'A centralized exchange wallet',
          ],
          correctIndex: 1,
          explanation:
            'A single EOA is a single point of compromise. Multisigs + timelocks are the production standard.',
        },
      ],
    },
  ],
};

export default course;
