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
  const playerColor = 'w';

  const [fen, setFen] = useState(game.fen());
  const [history, setHistory] = useState([]);
  const [selected, setSelected] = useState(null);
  const [optionSquares, setOptionSquares] = useState({});
  const [lastMove, setLastMove] = useState(null);
  const [concept, setConcept] = useState(OPENING_CONCEPT);
  const [status, setStatus] = useState('Your move (you are White)');
  const [gameNumber, setGameNumber] = useState(1);
  const width = useBoardWidth();

  const sync = useCallback((conceptOverride) => {
    setFen(game.fen());
    setHistory(game.history());
    setStatus(statusFor(game, playerColor));
    if (conceptOverride) setConcept(conceptOverride);
  }, [game]);

  const botMove = useCallback(() => {
    if (game.isGameOver() || game.turn() === playerColor) return;
    const moves = game.moves({ verbose: true });
    const move = moves[Math.floor(Math.random() * moves.length)];
    game.move({ from: move.from, to: move.to, promotion: 'q' });
    const played = game.history({ verbose: true }).slice(-1)[0];
    setLastMove({ from: played.from, to: played.to });
    sync(conceptForMove(played, game));
  }, [game, sync]);

  const tryMove = useCallback((from, to) => {
    if (game.isGameOver() || game.turn() !== playerColor) return false;
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
  }, [game, botMove, sync]);

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
    if (game.isGameOver() || game.turn() !== playerColor) return;
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
  }, [game, selected, tryMove, showOptions]);

  const newGame = useCallback(() => {
    game.reset();
    setSelected(null);
    setOptionSquares({});
    setLastMove(null);
    setConcept(OPENING_CONCEPT);
    setGameNumber((n) => n + 1);
    sync();
  }, [game, sync]);

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
        <meta name="description" content="Play chess against the EduNode node and learn Web3 and blockchain concepts with every move — immutability, smart contracts, validators, minting, and finality." />
        <meta property="og:title" content="ChainChess — Learn Web3 through Chess" />
        <meta property="og:description" content="A working chess game where every move teaches a blockchain concept." />
        <meta property="og:url" content="https://edunode.org/chess" />
      </Helmet>
      <NavBar />
      <div className="chainchess container py-4">
        <h1 className="chainchess-title">ChainChess</h1>
        <p className="chainchess-subtitle">
          Play White against the EduNode node. Every move maps to a Web3 concept —
          chess, but each piece is a lesson in how blockchains work.
        </p>

        <div className="chainchess-layout">
          <div className="chainchess-board">
            <Chessboard
              key={gameNumber}
              position={fen}
              onDrop={onDrop}
              onSquareClick={onSquareClick}
              squareStyles={squareStyles}
              width={width}
              orientation="white"
              draggable
              dropOffBoard="snapback"
              allowDrag={({ piece }) => piece.charAt(0) === playerColor && game.turn() === playerColor && !game.isGameOver()}
              lightSquareStyle={{ backgroundColor: '#eef2f7' }}
              darkSquareStyle={{ backgroundColor: '#7b68c9' }}
            />
            <div className="chainchess-status" role="status">{status}</div>
            <button type="button" className="btn btn-primary chainchess-newgame" onClick={newGame}>
              New game (new genesis block)
            </button>
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
    </>
  );
}
