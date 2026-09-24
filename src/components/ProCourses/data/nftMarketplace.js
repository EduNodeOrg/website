// Course 115 — NFT Marketplace Development (Pro)
const course = {
  id: '115',
  title: 'NFT Marketplace Development',
  description:
    'Create complete NFT marketplaces with minting, trading, and royalty features.',
  difficulty: 'intermediate',
  rating: 4.6,
  duration: '8 weeks',
  proOnly: true,
  diplomaEndpoint: 'diploma14',
  modules: [
    {
      title: 'NFT Standards: ERC-721 and ERC-1155',
      summary:
        'Learn the token standards under every NFT — ownership, approvals, safe transfers, and when to use each.',
      lessons: [
        {
          type: 'paragraph',
          text: 'ERC-721 gives every token a unique ID and owner — one contract, many distinct items. ERC-1155 is multi-token: one contract holds many token types, each fungible or non-fungible, with batch transfers that slash gas for games and editions. Marketplaces must handle both.',
        },
        {
          type: 'code',
          language: 'solidity',
          code: `// ERC-721 essentials
interface IERC721 {
    function ownerOf(uint256 tokenId) external view returns (address);
    function transferFrom(address from, address to, uint256 id) external;
    function safeTransferFrom(address from, address to, uint256 id) external;
    function approve(address to, uint256 id) external;
    function setApprovalForAll(address operator, bool approved) external;
    function isApprovedForAll(address owner, address op) external view returns (bool);
}
// safeTransferFrom calls onERC721Received on contract recipients —
// prevents NFTs getting locked in contracts that can't handle them`,
        },
        {
          type: 'list',
          items: [
            'setApprovalForAll — marketplace-wide approval; convenient and the standard phishing target.',
            'ERC-1155 batchTransfer moves 50 token types in one call — vital for gaming economies.',
            'tokenURI returns metadata location (usually IPFS) — the marketplace renders from it.',
            'Events (Transfer, Approval) are how indexers track ownership — never skip them.',
          ],
        },
        {
          type: 'callout',
          text: 'Always use safeTransferFrom in marketplace code and implement IERC721Receiver in any contract that will hold NFTs.',
        },
      ],
      quiz: [
        {
          question: 'ERC-1155\'s main advantage over ERC-721 is…',
          options: [
            'It\'s newer',
            'One contract can hold many token types with batch transfers — huge gas savings',
            'It supports images',
            'It can\'t be transferred',
          ],
          correctIndex: 1,
          explanation:
            'Multi-token + batch ops make 1155 ideal for games/editions; 721 remains simplest for 1-of-1 collections.',
        },
        {
          question: 'Why use safeTransferFrom?',
          options: [
            'It\'s faster',
            'It verifies contract recipients can handle NFTs, preventing permanent lockup',
            'It costs less gas',
            'It hides the transfer',
          ],
          correctIndex: 1,
          explanation:
            'The receiver hook prevents the classic "NFT sent to a contract that can\'t move it" loss.',
        },
        {
          question: 'setApprovalForAll grants…',
          options: [
            'Permission to view your NFTs',
            'An operator the right to transfer ALL your NFTs in that collection',
            'Minting rights',
            'Royalty payments',
          ],
          correctIndex: 1,
          explanation:
            'It\'s total delegation for that collection — approve only audited marketplace contracts.',
        },
      ],
    },
    {
      title: 'Metadata, IPFS, and Media Storage',
      summary:
        'Design token metadata that survives: content-addressed IPFS storage, pinning, and metadata best practices.',
      lessons: [
        {
          type: 'paragraph',
          text: 'An NFT is a token ID + a tokenURI pointing to JSON metadata (name, description, image, attributes). If that JSON lives on a centralized server, the "NFT" is a pointer to a URL the owner can change or let rot. IPFS fixes this: content addressing means the URI is a hash of the content — if it resolves, it\'s exactly what was minted.',
        },
        {
          type: 'code',
          language: 'json',
          code: `// metadata.json — the standard schema
{
  "name": "EduNode Graduate #042",
  "description": "Proof of completion — NFT Marketplace Development",
  "image": "ipfs://bafybei.../42.png",
  "attributes": [
    { "trait_type": "Course", "value": "NFT Marketplace" },
    { "trait_type": "Score", "value": 97, "display_type": "number" }
  ]
}
// tokenURI returns: ipfs://bafybei.../42.json
// Frontends resolve ipfs:// via a gateway: https://ipfs.io/ipfs/<cid>`,
        },
        {
          type: 'list',
          items: [
            'Pin your content (Pinata, web3.storage, or your own node) — unpinned IPFS data gets garbage-collected.',
            'Use ipfs:// URIs, not gateway URLs — gateways die, the CID is forever.',
            'On-chain metadata (Art Blocks style) is the gold standard but expensive; IPFS is the pragmatic default.',
            'Reveal mechanics: mint with a placeholder URI, then setBaseURI to the real drop.',
          ],
        },
      ],
      quiz: [
        {
          question: 'Why store NFT metadata on IPFS rather than a web server?',
          options: [
            'IPFS is faster',
            'Content addressing makes metadata immutable — the URI is a hash of the content',
            'Web servers can\'t serve JSON',
            'IPFS is free forever',
          ],
          correctIndex: 1,
          explanation:
            'A CID cryptographically binds the URI to the content — the seller can\'t swap the image later.',
        },
        {
          question: 'What happens to unpinned IPFS content?',
          options: [
            'It stays forever',
            'It can be garbage-collected — pinning services keep it alive',
            'It moves to Ethereum',
            'It gets encrypted',
          ],
          correctIndex: 1,
          explanation:
            'IPFS is a distributed cache — someone must pin (persist) the content or it may disappear.',
        },
        {
          question: 'tokenURI should return…',
          options: [
            'An HTTPS gateway URL',
            'An ipfs:// URI with the content identifier',
            'The image binary',
            'The owner\'s address',
          ],
          correctIndex: 1,
          explanation:
            'ipfs:// is gateway-agnostic — clients resolve through any gateway, so links don\'t rot.',
        },
      ],
    },
    {
      title: 'Building the Minting Contract',
      summary:
        'Implement a production mint: supply caps, allowlists via Merkle proofs, payment splits, and reveal mechanics.',
      lessons: [
        {
          type: 'paragraph',
          text: 'A mint contract manages supply, price, and who can mint when. Allowlists use Merkle proofs: commit a single root hash on-chain, and each allowlisted address proves inclusion with O(log n) data — no storage loop over thousands of addresses.',
        },
        {
          type: 'code',
          language: 'solidity',
          code: `contract EduNFT is ERC721, Ownable {
    uint256 public constant MAX = 10_000;
    uint256 public price = 0.05 ether;
    uint256 public totalMinted;
    bytes32 public merkleRoot;
    string private baseURI;

    function allowlistMint(bytes32[] calldata proof) external payable {
        require(msg.value >= price, "underpaid");
        bytes32 leaf = keccak256(abi.encodePacked(msg.sender));
        require(MerkleProof.verify(proof, merkleRoot, leaf), "not allowlisted");
        _mintTo(msg.sender);
    }

    function _mintTo(address to) internal {
        require(totalMinted < MAX, "sold out");
        _safeMint(to, ++totalMinted);
    }

    function tokenURI(uint256 id) public view override returns (string memory) {
        return string.concat(baseURI, Strings.toString(id), ".json");
    }
}`,
        },
        {
          type: 'list',
          items: [
            'Merkle allowlists: ~10 proof hashes verify any address — scales to millions.',
            '_safeMint over _mint in public mints — checks contract receivers.',
            'Pull payments for team splits: a withdraw() function beats pushing funds at mint.',
            'Reentrancy guard on mint — the receiver hook is an attack surface.',
          ],
        },
      ],
      quiz: [
        {
          question: 'Why use a Merkle tree for an allowlist?',
          options: [
            'It encrypts the list',
            'O(log n) on-chain verification — no need to store every address',
            'It makes mints free',
            'It hides the NFT image',
          ],
          correctIndex: 1,
          explanation:
            'Only the root is stored; users submit short proofs. Storing 10k addresses on-chain would cost a fortune.',
        },
        {
          question: 'Why does minting need a reentrancy guard?',
          options: [
            'It doesn\'t',
            '_safeMint calls a receiver hook that attacker contracts can use to re-enter and mint again',
            'To save gas',
            'To prevent multiple wallets',
          ],
          correctIndex: 1,
          explanation:
            'The safe-mint callback runs attacker code mid-mint — increment supply/checks before minting, or guard.',
        },
      ],
    },
    {
      title: 'Marketplace Contracts: Listings, Offers, and Escrow',
      summary:
        'Design the core marketplace contract — listing lifecycle, offer handling, fee collection, and settlement.',
      lessons: [
        {
          type: 'paragraph',
          text: 'A marketplace coordinates trades between strangers. The seller either escrows the NFT in the contract or grants approval; the buyer pays, and the contract atomically splits proceeds: seller amount minus marketplace fee minus creator royalty. Atomic settlement — NFT and payment swap in one transaction — is what makes it trustless.',
        },
        {
          type: 'code',
          language: 'solidity',
          code: `struct Listing { address seller; address nft; uint256 id; uint256 price; }
mapping(bytes32 => Listing) public listings;

function list(address nft, uint256 id, uint256 price) external {
    IERC721(nft).transferFrom(msg.sender, address(this), id); // escrow
    bytes32 key = keccak256(abi.encodePacked(nft, id));
    listings[key] = Listing(msg.sender, nft, id, price);
    emit Listed(key, msg.sender, price);
}

function buy(bytes32 key) external payable nonReentrant {
    Listing memory l = listings[key];
    require(msg.value == l.price, "wrong price");
    delete listings[key];                        // effects first!
    uint256 fee = msg.value * 250 / 10_000;      // 2.5% marketplace fee
    (uint256 royaltyAmt, address creator) = royaltyInfo(nft, l.id, msg.value);
    pendingWithdrawals[l.seller] += msg.value - fee - royaltyAmt;
    pendingWithdrawals[creator]  += royaltyAmt;  // pull payments
    IERC721(l.nft).safeTransferFrom(address(this), msg.sender, l.id);
    emit Sold(key, msg.sender, msg.value);
}`,
        },
        {
          type: 'list',
          items: [
            'Escrow model: contract holds the NFT — simpler, one less failure mode.',
            'Approval model: seller keeps NFT until sale — better UX, must verify approval at buy time.',
            'Offers/w bids: buyers escrow WETH (not ETH — WETH is ERC-20 and pullable).',
            'Pull payments for proceeds — never push ETH to arbitrary sellers mid-sale.',
          ],
        },
      ],
      quiz: [
        {
          question: 'Why must settlement be atomic?',
          options: [
            'To save gas',
            'So neither party can receive asset or payment without delivering the other side',
            'Atomicity is optional',
            'To avoid taxes',
          ],
          correctIndex: 1,
          explanation:
            'One transaction swaps NFT for payment — no window where one side pays and doesn\'t receive.',
        },
        {
          question: 'Why do offer systems use WETH instead of ETH?',
          options: [
            'WETH is cheaper',
            'WETH is ERC-20 — the contract can pull it via transferFrom when the offer is accepted',
            'ETH can\'t be transferred',
            'WETH has better logos',
          ],
          correctIndex: 1,
          explanation:
            'Native ETH can\'t be pulled by contracts. Wrapped ETH enables escrow-less offers.',
        },
        {
          question: 'Why delete the listing before transferring value?',
          options: [
            'Saves storage refunds only',
            'Prevents reentrancy — a re-entered call sees no listing to buy twice',
            'It\'s stylistic',
            'To hide the price',
          ],
          correctIndex: 1,
          explanation:
            'Checks-effects-interactions again: state cleared before external calls = no double-buy.',
        },
      ],
    },
    {
      title: 'Royalties: EIP-2981 and Creator Economics',
      summary:
        'Implement the royalty standard, understand its limits, and design revenue splits that actually get paid.',
      lessons: [
        {
          type: 'paragraph',
          text: 'EIP-2981 standardizes how contracts answer "who gets paid on secondary sales?" — a royaltyInfo(tokenId, salePrice) function returning (receiver, amount). Critical caveat: it\'s a lookup, not enforcement. Marketplaces choose to honor it; direct peer transfers bypass it entirely. Royalty-enforcing designs (transfer hooks, allowlisted operators) trade composability for guarantees.',
        },
        {
          type: 'code',
          language: 'solidity',
          code: `// EIP-2981 implementation
function royaltyInfo(uint256 tokenId, uint256 salePrice)
    external view returns (address receiver, uint256 amount)
{
    return (creator, salePrice * royaltyBps / 10_000);  // e.g. 500 = 5%
}

// Marketplace side (same helper from Module 4):
function royaltyInfo(address nft, uint256 id, uint256 price)
    internal view returns (uint256, address)
{
    try IERC2981(nft).royaltyInfo(id, price)
        returns (address r, uint256 a) {
        return (a, r);
    } catch { return (0, address(0)); }   // no standard => no royalty
}`,
        },
        {
          type: 'list',
          items: [
            'royaltyInfo is per-token per-sale-price — supports dynamic/decaying royalties.',
            'try/catch the call: many NFTs don\'t implement 2981 — treat absence as zero royalty, not a revert.',
            'Enforcement variants: operator-filter registries, ERC-721-C transfer policies.',
            'Business reality: royalties are a marketplace policy decision — code both paths.',
          ],
        },
      ],
      quiz: [
        {
          question: 'EIP-2981 royalties are…',
          options: [
            'Enforced by the EVM on every transfer',
            'A standard lookup that marketplaces voluntarily honor — direct transfers bypass it',
            'A type of tax',
            'Only for ERC-1155',
          ],
          correctIndex: 1,
          explanation:
            '2981 is a query interface. Enforcement requires marketplace cooperation or transfer-level restrictions.',
        },
        {
          question: 'Why wrap the royaltyInfo call in try/catch?',
          options: [
            'For style',
            'NFTs without EIP-2981 revert — catch lets the sale proceed with zero royalty',
            'To save gas',
            'To hide errors from users',
          ],
          correctIndex: 1,
          explanation:
            'Graceful degradation: a non-2981 collection shouldn\'t break your buy function.',
        },
      ],
    },
    {
      title: 'Marketplace Frontend and Wallet Integration',
      summary:
        'Wire a React frontend to your contracts: wallet connect, collection browsing, listing flow, and transaction UX.',
      lessons: [
        {
          type: 'paragraph',
          text: 'The marketplace frontend is a normal React app plus wallet plumbing. wagmi + viem (or ethers) handle connect, reads, and writes. The critical UX details: show transaction states (signing → pending → confirmed), surface revert reasons readably, and never silently swallow errors.',
        },
        {
          type: 'code',
          language: 'javascript',
          code: `// wagmi hooks — the modern stack
const { address, isConnected } = useAccount();
const { data: hash, writeContract } = useWriteContract();
const { isLoading: confirming, isSuccess } =
    useWaitForTransactionReceipt({ hash });

function buy(key, price) {
  writeContract({
    address: MARKET, abi: marketAbi, functionName: 'buy',
    args: [key], value: price,
  });
}
// Render: confirm in wallet → pending spinner → success + explorer link`,
        },
        {
          type: 'list',
          items: [
            'Read flow: contract reads (listings, floor price) can use a public RPC — no wallet needed.',
            'Write flow: wallet signs every state change — always show what the user is signing.',
            'Image loading: resolve ipfs:// through a gateway, lazy-load, cache aggressively.',
            'Chain guard: verify the wallet is on the right network before enabling actions.',
          ],
        },
      ],
      quiz: [
        {
          question: 'Which operation does NOT need the user\'s wallet signature?',
          options: [
            'Buying an NFT',
            'Reading listings and floor prices from the contract',
            'Listing an NFT for sale',
            'Accepting an offer',
          ],
          correctIndex: 1,
          explanation:
            'Reads are free and signatureless — only state changes require signing.',
        },
        {
          question: 'Before enabling "Buy," your frontend should verify…',
          options: [
            'The user\'s email',
            'The connected wallet is on the correct chain',
            'The NFT image loaded',
            'Gas is below 10 gwei',
          ],
          correctIndex: 1,
          explanation:
            'Wrong-chain transactions revert or hit the wrong contracts — chain-guard every write.',
        },
      ],
    },
    {
      title: 'Indexing and Querying NFT Data',
      summary:
        'On-chain data isn\'t queryable — build the indexing layer with events, subgraphs, or indexers to power search and profiles.',
      lessons: [
        {
          type: 'paragraph',
          text: 'You cannot query the chain for "all NFTs owned by X" or "all listings under 1 ETH" — contracts store state, not indexes. Production marketplaces run an indexing layer: listen to events, write to a database, serve a fast API. Options: The Graph (subgraphs), managed indexers (Alchemy NFT API, Reservoir), or your own listener + Postgres.',
        },
        {
          type: 'code',
          language: 'javascript',
          code: `// Roll-your-own listener (ethers)
contract.on('Transfer', (from, to, tokenId, event) => {
  db.upsertOwner(contract.address, tokenId.toString(), to);
});
// Subgraph (The Graph) mapping — same idea, hosted:
// handleTransfer(e): load/create Token entity, set owner, save`,
        },
        {
          type: 'list',
          items: [
            'Events are your index source — emit complete data in every state change.',
            'Handle reorgs: index with block confirmations or reorg-aware indexers.',
            'Metadata pipeline: fetch tokenURI → parse JSON → cache image — do it async, not at request time.',
            'Your marketplace DB is a cache of chain truth — the chain stays canonical.',
          ],
        },
      ],
      quiz: [
        {
          question: 'Why can\'t you query "all NFTs owned by X" directly on-chain?',
          options: [
            'It\'s illegal',
            'Contracts expose storage slots, not indexes — reverse lookups require scanning every token',
            'The data is encrypted',
            'You actually can, it\'s free',
          ],
          correctIndex: 1,
          explanation:
            'ownerOf works one token at a time. Aggregations need an off-chain index built from events.',
        },
        {
          question: 'The chain of truth for ownership is…',
          options: [
            'Your database',
            'The blockchain itself — your index is a derived, rebuildable cache',
            'The metadata JSON',
            'The marketplace frontend',
          ],
          correctIndex: 1,
          explanation:
            'If your index and the chain disagree, the chain wins — treat indexed data as disposable cache.',
        },
      ],
    },
    {
      title: 'Launch Capstone: Full Marketplace Sprint',
      summary:
        'Ship the complete product: contracts to testnet, indexed API, frontend, royalty policy, and a go-live checklist.',
      lessons: [
        {
          type: 'paragraph',
          text: 'The capstone ties the whole course together. You ship a vertical slice: one collection (ERC-721 with EIP-2981), the marketplace contract (list + buy + offers + royalties), an indexer, and a frontend — deployed on Sepolia end to end.',
        },
        {
          type: 'list',
          items: [
            'Contracts: collection (721 + 2981 + Merkle allowlist), marketplace (escrow, fees, pull payouts). Test: listings, buys, royalty math, reentrancy, edge cases.',
            'Indexer: Transfer + Listed/Sold events → DB → REST/GraphQL API.',
            'Frontend: browse, list, buy, offer, profile — full transaction UX states.',
            'Ops: verified source, royalty policy documented, testnet end-to-end QA, incident contacts.',
            'Stretch: auctions, collection offers, sweeping ("buy floor"), activity feed.',
          ],
        },
        {
          type: 'callout',
          text: 'Mainnet gate before real money: external review of the marketplace contract, capped fees tested, royalty edge cases (0%, 100%, non-2981 collections) verified, and a pause switch wired to a multisig.',
        },
        {
          type: 'paragraph',
          text: 'Congratulations — you now hold the full NFT marketplace stack: standards, storage, contracts, economics, frontend, and indexing. The same architecture underlies every major marketplace.',
        },
      ],
      quiz: [
        {
          question: 'The minimum viable marketplace slice includes…',
          options: [
            'Just a smart contract',
            'Collection contract + marketplace contract + indexer + frontend, tested end-to-end',
            'Only a frontend',
            'A token launch',
          ],
          correctIndex: 1,
          explanation:
            'A marketplace is a system — every layer must work together before users can trade.',
        },
        {
          question: 'Before mainnet launch, the most important step is…',
          options: [
            'Marketing',
            'External security review of the settlement contract + testing edge cases',
            'Buying ads',
            'Adding more collections',
          ],
          correctIndex: 1,
          explanation:
            'The settlement contract holds escrowed NFTs and funds — its bugs are existential.',
        },
      ],
    },
  ],
};

export default course;
