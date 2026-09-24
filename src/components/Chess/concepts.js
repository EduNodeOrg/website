// Web3/blockchain teaching concepts for ChainChess.
// Each entry maps a chess event to a blockchain analogy and a page to learn more.

export const PIECE_CONCEPTS = {
  p: {
    title: 'Pawn = Transaction (Immutability)',
    text: 'A pawn can never move backward. Once it advances, that move is final — exactly like a confirmed blockchain transaction. There is no undo on-chain; the ledger only moves forward.',
    link: '/glossary',
    linkLabel: 'Glossary: Blockchain',
  },
  n: {
    title: 'Knight = Smart Contract',
    text: 'Knights ignore the straight lines every other piece follows — they jump over obstacles on a custom path. Smart contracts work the same way: programmable logic that executes exactly as coded, regardless of the normal flow.',
    link: '/blog/smart-contracts',
    linkLabel: 'Read: Smart Contracts on Stellar',
  },
  b: {
    title: 'Bishop = Oracle',
    text: 'A bishop is locked to one color forever — it only sees its own diagonal world. Blockchain oracles bridge that same gap: they feed real-world (off-chain) data to smart contracts that can only see on-chain state.',
    link: '/courses/108',
    linkLabel: 'Course: Oracles Basics',
  },
  r: {
    title: 'Rook = Node',
    text: 'Rooks control whole rows and columns — the board\'s infrastructure. Blockchain nodes do the same job for a network: storing the ledger, relaying transactions, and keeping every lane of the chain reachable.',
    link: '/stellarnodes',
    linkLabel: 'See live Stellar nodes',
  },
  q: {
    title: 'Queen = Validator',
    text: 'The queen is the most powerful piece — reach in every direction. Validators are the most powerful actors on a network: they propose and confirm blocks. Power without limits is why decentralization matters.',
    link: '/blog/Stellarnomics',
    linkLabel: 'Read: Stellarnomics',
  },
  k: {
    title: 'King = Private Key',
    text: 'Lose your king and the game is over — no appeal, no reset. Lose a private key and the funds are gone forever. Not your keys, not your coins.',
    link: '/blog/security-tools',
    linkLabel: 'Read: Keep your lumens safe',
  },
};

export const EVENT_CONCEPTS = {
  castle: {
    title: 'Castling = Atomic Transaction',
    text: 'Castling moves two pieces — king and rook — in a single indivisible operation. On-chain, an atomic transaction does the same: multiple actions that either all succeed or all fail, like an atomic swap.',
    link: '/courses/102',
    linkLabel: 'Course: Stellar Operations',
  },
  enPassant: {
    title: 'En Passant = Protocol Edge Cases',
    text: 'En passant is a rarely-used rule that is still part of the protocol — ignore it and your "implementation" is wrong. Consensus rules work the same way: every edge case is specified, and every node must agree on all of them.',
    link: '/courses/104',
    linkLabel: 'Course: Stellar Ecosystem Proposals',
  },
  promotion: {
    title: 'Promotion = Minting',
    text: 'Reach the last rank and a pawn transforms into a brand-new piece. That is minting: creating a new asset on the ledger — the same way an NFT is minted from a contract.',
    link: '/blog/minting-nfts',
    linkLabel: 'Read: Minting NFTs on Stellar',
  },
  capture: {
    title: 'Capture = Slashing',
    text: 'A captured piece is removed from the board permanently. Proof-of-stake networks do this to bad actors: validators that misbehave get "slashed" — part of their stake is destroyed to keep the network honest.',
    link: '/glossary',
    linkLabel: 'Glossary: Cryptocurrency',
  },
  check: {
    title: 'Check = Attack on the Network',
    text: 'Your king is under threat — you must respond immediately. A 51% attack works the same way: when one actor controls the majority of validation power, the whole chain is in check.',
    link: '/blog/security-tools',
    linkLabel: 'Read: Security tools',
  },
  checkmate: {
    title: 'Checkmate = Finality',
    text: 'Checkmate is irreversible — the position is final and written into the score sheet forever. Block finality is the same guarantee: once a block is final, it can never be reverted.',
    link: '/blog/learn-about-blockchain',
    linkLabel: 'Workshop: Learn about Blockchain',
  },
  stalemate: {
    title: 'Stalemate = Consensus Failure',
    text: 'Stalemate: legal moves exist nowhere, so the game halts with no winner. Networks can halt the same way — when validators cannot reach quorum, no new blocks are produced.',
    link: '/courses/101',
    linkLabel: 'Course: Basic Concepts',
  },
};

export const OPENING_CONCEPT = {
  title: 'New Game = Genesis Block',
  text: 'Every chess game starts from the same initial position. Every blockchain starts from a genesis block — the first entry in the ledger from which the whole history is built, move by move, block by block.',
  link: '/courses/101',
  linkLabel: 'Course: Basic Concepts',
};

// Decide which concept a move should surface. `move` is a chess.js verbose move.
export function conceptForMove(move, game) {
  if (!move) return null;
  if (game && game.isCheckmate()) return EVENT_CONCEPTS.checkmate;
  if (game && game.isStalemate()) return EVENT_CONCEPTS.stalemate;
  const flags = move.flags || '';
  if (flags.includes('k') || flags.includes('q')) return EVENT_CONCEPTS.castle;
  if (flags.includes('e')) return EVENT_CONCEPTS.enPassant;
  if (flags.includes('p')) return EVENT_CONCEPTS.promotion;
  if (game && game.isCheck()) return EVENT_CONCEPTS.check;
  if (flags.includes('c')) return EVENT_CONCEPTS.capture;
  return PIECE_CONCEPTS[move.piece] || null;
}
