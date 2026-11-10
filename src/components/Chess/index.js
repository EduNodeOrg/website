import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Chessboard from 'chessboardjsx';
import { Chess } from 'chess.js';
import Helmet from 'react-helmet';
import NavBar from '../NavBar';
import Footer from '../Footer/Footer';
import { PIECE_CONCEPTS, OPENING_CONCEPT, conceptForMove } from './concepts';
import './chess.css';

const PIECE_LABELS = { p: 'Pawn', n: 'Knight', b: 'Bishop', r: 'Rook', q: 'Queen', k: 'King' };
const PIECE_ICONS = { p: '♙', n: '♘', b: '♗', r: '♖', q: '♕', k: '♔' };

const TIME_OPTIONS = [
  { label: '∞', title: 'Untimed — play at your own pace', sec: null },
  { label: '1m', title: 'Bullet — 1 minute each', sec: 60 },
  { label: '10m', title: 'Blitz — 10 minutes each', sec: 600 },
  { label: '30m', title: 'Rapid — 30 minutes each', sec: 1800 },
];

const DIFFICULTIES = [
  { key: 'easy', label: 'Easy', title: 'Random moves — learn the concepts without pressure' },
  { key: 'medium', label: 'Medium', title: 'Greedy one-move lookahead — punishes blunders' },
  { key: 'hard', label: 'Hard', title: 'Stockfish engine — a real opponent' },
];

// Simple material eval for Medium: count piece values per side and pick the
// move that maximizes the bot's material balance (plus tiny jitter so it is
// not fully deterministic).
const PIECE_VALUES = { p: 1, n: 3, b: 3.2, r: 5, q: 9, k: 0 };
function evalMaterial(g) {
  let score = 0;
  for (const row of g.board()) {
    for (const sq of row) {
      if (sq) score += sq.color === 'b' ? PIECE_VALUES[sq.type] : -PIECE_VALUES[sq.type];
    }
  }
  return score;
}
function bestGreedyMove(g, moves) {
  let best = -Infinity;
  let bestMoves = [];
  for (const m of moves) {
    g.move({ from: m.from, to: m.to, promotion: 'q' });
    let v = -evalMaterial(g) + Math.random() * 0.2;
    if (g.isCheckmate()) v = 1e9;
    if (g.isStalemate() || g.isDraw()) v = -0.5; // avoid stalemating when winning
    g.undo();
    if (v > best + 1e-9) { best = v; bestMoves = [m]; }
    else if (Math.abs(v - best) < 1e-9) bestMoves.push(m);
  }
  return bestMoves[Math.floor(Math.random() * bestMoves.length)];
}

const COLOR_OPTIONS = [
  { key: 'w', label: 'White', title: 'Play White — you move first' },
  { key: 'b', label: 'Black', title: 'Play Black — the node moves first' },
];

const CAPTURED_ICONS = { p: '♟', n: '♞', b: '♝', r: '♜', q: '♛' };

// Tally captured pieces + material points from move history.
function computeMaterial(g) {
  const caps = { w: [], b: [] };
  const pts = { w: 0, b: 0 };
  for (const m of g.history({ verbose: true })) {
    if (m.captured) {
      caps[m.color].push(m.captured);
      pts[m.color] += PIECE_VALUES[m.captured];
    }
  }
  return { caps, diff: pts.w - pts.b };
}

const formatClock = (sec) =>
  sec == null ? '∞' : `${Math.floor(sec / 60)}:${String(Math.floor(sec % 60)).padStart(2, '0')}`;

function useBoardWidth() {
  const calc = () => Math.min(560, Math.max(280, window.innerWidth - 48));
  const [width, setWidth] = useState(calc);
  useEffect(() => {
    const onResize = () => setWidth(calc());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return width;
}

function statusFor(game, playerColor) {
  if (game.isCheckmate()) {
    return game.turn() === playerColor
      ? 'Checkmate — finality reached. The chain wins this block.'
      : 'Checkmate — you win! The position is final, like a confirmed block.';
  }
  if (game.isStalemate()) return 'Stalemate — consensus failure. No legal moves, the network halts.';
  if (game.isDraw()) return 'Draw — both sides agree on the final state.';
  if (game.isCheck()) return 'Check! Your king (private key) is under attack — respond now.';
  return game.turn() === playerColor ? 'Your move (you are White)' : 'Node is thinking…';
}

export default function ChainChess() {
  const gameRef = useRef(new Chess());
  const game = gameRef.current;
  const [playerColor, setPlayerColor] = useState('w');
  const botColor = playerColor === 'w' ? 'b' : 'w';

  const [fen, setFen] = useState(game.fen());
  const [history, setHistory] = useState([]);
  const [selected, setSelected] = useState(null);
  const [optionSquares, setOptionSquares] = useState({});
  const [lastMove, setLastMove] = useState(null);
  const [concept, setConcept] = useState(OPENING_CONCEPT);
  const [status, setStatus] = useState('Your move (you are White)');
  const [gameNumber, setGameNumber] = useState(1);
  const [timeControl, setTimeControl] = useState(null);
  const [clocks, setClocks] = useState({ w: null, b: null });
  const [flagged, setFlagged] = useState(null);
  const [difficulty, setDifficulty] = useState('easy');
  const [resigned, setResigned] = useState(false);
  const [material, setMaterial] = useState({ caps: { w: [], b: [] }, diff: 0 });
  const engineRef = useRef(null);
  const botMoveRef = useRef(null);
  const engineReadyRef = useRef(null);
  const pendingBestRef = useRef(null);
  const width = useBoardWidth();

  const sync = useCallback((conceptOverride) => {
    setFen(game.fen());
    setHistory(game.history());
    setMaterial(computeMaterial(game));
    setStatus(statusFor(game, playerColor));
    if (conceptOverride) setConcept(conceptOverride);
  }, [game, playerColor]);

  const applyBotMove = useCallback((uci) => {
    if (game.isGameOver() || flagged || resigned || game.turn() === playerColor) return;
    const move = game.move(uci.length > 4
      ? { from: uci.slice(0, 2), to: uci.slice(2, 4), promotion: uci[4] }
      : { from: uci.slice(0, 2), to: uci.slice(2, 4), promotion: 'q' });
    if (!move) return;
    const played = game.history({ verbose: true }).slice(-1)[0];
    setLastMove({ from: played.from, to: played.to });
    sync(conceptForMove(played, game));
  }, [game, flagged, resigned, playerColor, sync]);

  const ensureEngine = useCallback(() => {
    if (engineRef.current) return engineReadyRef.current;
    const w = new Worker('/engine/stockfish-19-lite-single.js');
    engineRef.current = w;
    w.onmessage = (e) => {
      const m = String(e.data);
      if (m === 'uciok') {
        w.postMessage('setoption name Skill Level value 16');
        w.postMessage('isready');
      } else if (m === 'readyok') {
        engineReadyRef.current = w;
      } else if (m.startsWith('bestmove')) {
        const cb = pendingBestRef.current;
        pendingBestRef.current = null;
        if (cb) cb(m.split(' ')[1]);
      }
    };
    w.postMessage('uci');
    return null; // resolves to worker on readyok
  }, []);

  const requestEngineMove = useCallback(() => {
    const w = ensureEngine();
    const ask = (eng) => {
      pendingBestRef.current = (best) => {
        if (best && best !== '(none)') applyBotMove(best);
      };
      eng.postMessage(`position fen ${game.fen()}`);
      eng.postMessage('go movetime 800');
    };
    if (w) ask(w); else {
      const t = window.setInterval(() => {
        if (engineReadyRef.current) { window.clearInterval(t); ask(engineReadyRef.current); }
      }, 100);
      window.setTimeout(() => window.clearInterval(t), 10000);
    }
  }, [ensureEngine, applyBotMove, game]);

  const botMove = useCallback(() => {
    if (game.isGameOver() || flagged || resigned || game.turn() === playerColor) return;
    const moves = game.moves({ verbose: true });
    if (difficulty === 'hard') { requestEngineMove(); return; }
    const move = difficulty === 'medium'
      ? bestGreedyMove(game, moves)
      : moves[Math.floor(Math.random() * moves.length)];
    game.move({ from: move.from, to: move.to, promotion: 'q' });
    const played = game.history({ verbose: true }).slice(-1)[0];
    setLastMove({ from: played.from, to: played.to });
    sync(conceptForMove(played, game));
  }, [game, flagged, resigned, playerColor, sync, difficulty, requestEngineMove]);

  botMoveRef.current = botMove;

  const tryMove = useCallback((from, to) => {
    if (flagged || resigned || game.isGameOver() || game.turn() !== playerColor) return false;
    let played = null;
    try {
      played = game.move({ from, to, promotion: 'q' });
    } catch {
      return false;
    }
    if (!played) return false;
    setSelected(null);
    setOptionSquares({});
    setLastMove({ from: played.from, to: played.to });
    sync(conceptForMove(played, game));
    window.setTimeout(botMove, 450);
    return true;
  }, [game, flagged, resigned, playerColor, botMove, sync]);

  const onDrop = useCallback(({ sourceSquare, targetSquare }) => {
    tryMove(sourceSquare, targetSquare);
  }, [tryMove]);

  const showOptions = useCallback((square) => {
    const styles = {};
    game.moves({ square, verbose: true }).forEach((m) => {
      styles[m.to] = {
        background: 'radial-gradient(circle, rgba(110,89,247,0.85) 28%, transparent 30%)',
        borderRadius: '50%',
      };
    });
    setOptionSquares(styles);
  }, [game]);

  const onSquareClick = useCallback((square) => {
    if (flagged || resigned || game.isGameOver() || game.turn() !== playerColor) return;
    if (selected) {
      if (tryMove(selected, square)) return;
      const piece = game.get(square);
      if (piece && piece.color === playerColor && square !== selected) {
        setSelected(square);
        showOptions(square);
        return;
      }
      setSelected(null);
      setOptionSquares({});
      return;
    }
    const piece = game.get(square);
    if (piece && piece.color === playerColor) {
      setSelected(square);
      showOptions(square);
    }
  }, [game, flagged, resigned, playerColor, selected, tryMove, showOptions]);

  const startGame = useCallback((tc, color) => {
    const nextColor = color || playerColor;
    game.reset();
    setSelected(null);
    setOptionSquares({});
    setLastMove(null);
    setConcept(OPENING_CONCEPT);
    setFlagged(null);
    setResigned(false);
    setClocks({ w: tc, b: tc });
    setGameNumber((n) => n + 1);
    sync();
    // If the player takes Black, the node (White) opens the game.
    if (nextColor === 'b') window.setTimeout(() => botMoveRef.current && botMoveRef.current(), 700);
  }, [game, sync, playerColor]);

  const newGame = useCallback(() => startGame(timeControl, playerColor), [startGame, timeControl, playerColor]);

  const resign = useCallback(() => {
    if (game.isGameOver() || flagged || resigned) return;
    setResigned(true);
    setStatus('You resigned — the node wins this round. Even validators drop offline sometimes.');
  }, [game, flagged, resigned]);

  // Terminate the Stockfish worker when leaving the page.
  useEffect(() => () => { engineRef.current && engineRef.current.terminate(); }, []);

  // Clock tick — the side to move burns time every 250ms while a timed game runs.
  useEffect(() => {
    if (timeControl == null || flagged) return undefined;
    const t = window.setInterval(() => {
      if (game.isGameOver()) return;
      const side = game.turn();
      setClocks((c) => ({ ...c, [side]: Math.max(0, (c[side] ?? timeControl) - 0.25) }));
    }, 250);
    return () => window.clearInterval(t);
  }, [timeControl, flagged, game]);

  // Flag when a clock reaches zero.
  useEffect(() => {
    if (timeControl == null || flagged) return;
    const side = game.turn();
    if (clocks[side] != null && clocks[side] <= 0) {
      setFlagged(side);
      setStatus(
        side === playerColor
          ? 'Flagged — your clock hit zero. The ledger closed without your move.'
          : 'Node flagged — you win on time! Consensus could not keep up.'
      );
    }
  }, [clocks, timeControl, flagged, game, playerColor]);

  const squareStyles = useMemo(() => {
    const styles = { ...optionSquares };
    if (selected) styles[selected] = { backgroundColor: 'rgba(110, 89, 247, 0.5)' };
    if (lastMove) {
      styles[lastMove.from] = { backgroundColor: 'rgba(255, 213, 79, 0.45)' };
      styles[lastMove.to] = { backgroundColor: 'rgba(255, 213, 79, 0.45)' };
    }
    return styles;
  }, [optionSquares, selected, lastMove]);

  return (
    <>
      <Helmet>
        <title>ChainChess — Learn Web3 through Chess | EduNode</title>
        <link rel="canonical" href="https://edunode.org/chess" />
        <meta name="description" content="Play chess against the EduNode node and learn Web3 and blockchain concepts with every move — immutability, smart contracts, validators, minting, and finality." />
        <meta property="og:title" content="ChainChess — Learn Web3 through Chess" />
        <meta property="og:description" content="A working chess game where every move teaches a blockchain concept." />
        <meta property="og:url" content="https://edunode.org/chess" />
      </Helmet>
      <div className="chainchess-page">
      <NavBar />
      <div className="chainchess container py-4">
        <h1 className="chainchess-title">ChainChess</h1>
        <p className="chainchess-subtitle">
          Play White against the EduNode node. Every move maps to a Web3 concept —
          chess, but each piece is a lesson in how blockchains work.
        </p>

        <div className="chainchess-layout">
          <div className="chainchess-board">
            <div className="chainchess-timers" role="group" aria-label="Play as">
              {COLOR_OPTIONS.map((o) => (
                <button
                  key={o.key}
                  type="button"
                  title={o.title}
                  className={`chainchess-timer ${playerColor === o.key ? 'active' : ''}`}
                  onClick={() => { setPlayerColor(o.key); startGame(timeControl, o.key); }}
                >
                  {o.label}
                </button>
              ))}
            </div>
            <div className="chainchess-timers" role="group" aria-label="Difficulty">
              {DIFFICULTIES.map((d) => (
                <button
                  key={d.key}
                  type="button"
                  title={d.title}
                  className={`chainchess-timer ${difficulty === d.key ? 'active' : ''}`}
                  onClick={() => setDifficulty(d.key)}
                >
                  {d.label}
                </button>
              ))}
            </div>
            <div className="chainchess-timers" role="group" aria-label="Time control">
              {TIME_OPTIONS.map((o) => (
                <button
                  key={o.label}
                  type="button"
                  title={o.title}
                  className={`chainchess-timer ${timeControl === o.sec ? 'active' : ''}`}
                  onClick={() => { setTimeControl(o.sec); startGame(o.sec); }}
                >
                  {o.label}
                </button>
              ))}
            </div>
            {timeControl != null && (
              <div className="chainchess-clocks">
                <span className={`chainchess-clock ${game.turn() === botColor ? 'active' : ''} ${flagged === botColor ? 'flagged' : ''}`}>
                  Node · {formatClock(clocks[botColor])}
                </span>
                <span className={`chainchess-clock ${game.turn() === playerColor ? 'active' : ''} ${flagged === playerColor ? 'flagged' : ''}`}>
                  You · {formatClock(clocks[playerColor])}
                </span>
              </div>
            )}
            <Chessboard
              key={gameNumber}
              position={fen}
              onDrop={onDrop}
              onSquareClick={onSquareClick}
              squareStyles={squareStyles}
              width={width}
              orientation={playerColor === 'w' ? 'white' : 'black'}
              draggable
              dropOffBoard="snapback"
              allowDrag={({ piece }) => piece.charAt(0) === playerColor && game.turn() === playerColor && !game.isGameOver()}
              lightSquareStyle={{ backgroundColor: '#ece7f8' }}
              darkSquareStyle={{ backgroundColor: '#5f4bb6' }}
              boardStyle={{ borderRadius: '12px', boxShadow: '0 8px 30px rgba(0,0,0,0.5)', overflow: 'hidden' }}
            />
            <div className="chainchess-material">
              <span className="you">
                You {material.caps[playerColor].map((p) => CAPTURED_ICONS[p]).join('')}
                {(playerColor === 'w' ? material.diff : -material.diff) > 0 && ` (+${playerColor === 'w' ? material.diff : -material.diff})`}
              </span>
              <span className="node">
                Node {material.caps[botColor].map((p) => CAPTURED_ICONS[p]).join('')}
                {(playerColor === 'w' ? -material.diff : material.diff) > 0 && ` (+${playerColor === 'w' ? -material.diff : material.diff})`}
              </span>
            </div>
            <div className="chainchess-status" role="status">{status}</div>
            <div className="chainchess-actions">
              <button type="button" className="btn btn-primary chainchess-newgame" onClick={newGame}>
                New game (new genesis block)
              </button>
              <button type="button" className="btn chainchess-resign" onClick={resign}>
                Resign
              </button>
            </div>
          </div>

          <aside className="chainchess-side">
            {concept && (
              <div className="chainchess-concept card">
                <div className="card-body">
                  <span className="chainchess-concept-tag">Concept</span>
                  <h5 className="card-title">{concept.title}</h5>
                  <p className="card-text">{concept.text}</p>
                  {concept.link && (
                    <Link className="chainchess-learn" to={concept.link}>
                      {concept.linkLabel || 'Learn more'} →
                    </Link>
                  )}
                </div>
              </div>
            )}
            <div className="chainchess-moves card">
              <div className="card-body">
                <h6 className="card-title">Move history (the ledger)</h6>
                <ol className="chainchess-movelist">
                  {history.map((san, i) => (
                    <li key={i} className={i % 2 === 0 ? 'you' : 'node'}>
                      {i % 2 === 0 ? 'You' : 'Node'}: {san}
                    </li>
                  ))}
                  {history.length === 0 && <li className="node">No moves yet — the chain is at genesis.</li>}
                </ol>
              </div>
            </div>
          </aside>
        </div>

        <section className="chainchess-legend">
          <h2>How the pieces map to Web3</h2>
          <div className="chainchess-legend-grid">
            {Object.entries(PIECE_CONCEPTS).map(([piece, c]) => (
              <div className="chainchess-legend-item" key={piece}>
                <span className="chainchess-piece" aria-hidden="true">{PIECE_ICONS[piece]}</span>
                <div>
                  <strong>{PIECE_LABELS[piece]}</strong>
                  <p>{c.title.split('=')[1] ? c.title.split('=')[1].trim() : c.title}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="chainchess-legend-note">
            Want to go deeper? Take the <Link to="/courses/101">Basic Concepts course</Link>, browse
            the <Link to="/glossary">Web3 glossary</Link>, or read the <Link to="/blog">blog</Link>.
          </p>
        </section>
      </div>
      <Footer />
      </div>
    </>
  );
}
