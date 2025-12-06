'use client';

import { useEffect } from 'react';
import { useBoard } from '@/app/hooks/useBoard';
import { useGameManager } from '@/app/hooks/useGameManager';
import { useInput } from '@/app/hooks/useInput';
import { GameBoard } from '@/app/game/GameBoard';
import { ScoreBoard } from '@/app/game/ScoreBoard';
import { GameOver } from '@/app/game/GameOver';
import { Direction } from '@/lib/types';
import './GameContainer.css';

export function GameContainer() {
  const { tiles, move, resetBoard, isGameOver } = useBoard();
  const { score, bestScore, moves, addScore, resetGame, updateMaxTile } =
    useGameManager();

  // Handle player move
  const handleMove = (direction: Direction) => {
    const result = move(direction);
    if (result.moved) {
      addScore(result.score);
    }
  };

  // Update max tile when tiles change
  useEffect(() => {
    updateMaxTile(tiles);
  }, [tiles, updateMaxTile]);

  // Handle input
  useInput({
    onMove: handleMove,
    enabled: !isGameOver,
  });

  // Handle game restart
  const handleRestart = () => {
    resetBoard();
    resetGame();
  };

  return (
    <div className="game-container">
      <header className="game-header">
        <h1 className="game-title">Growing Number</h1>
        <p className="game-subtitle">
          Merge tiles to reach the highest number!
        </p>
      </header>

      <ScoreBoard score={score} bestScore={bestScore} moves={moves} />

      <div className="controls">
        <button className="new-game-button" onClick={handleRestart}>
          New Game
        </button>
      </div>

      <GameBoard tiles={tiles} />

      <div className="instructions">
        <p>Use arrow keys or swipe to move tiles</p>
        <p>Tiles with the same number merge into one!</p>
      </div>

      {isGameOver && (
        <GameOver
          score={score}
          maxTile={Math.max(...tiles.map((t) => t.value), 0)}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}
