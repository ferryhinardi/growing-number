'use client';

import './GameOver.css';

interface GameOverProps {
  score: number;
  maxTile: number;
  onRestart: () => void;
}

export function GameOver({ score, maxTile, onRestart }: GameOverProps) {
  const displayMaxTile = Math.pow(2, maxTile);

  return (
    <div className="game-over-overlay">
      <div className="game-over-modal">
        <h2 className="game-over-title">Game Over!</h2>
        
        <div className="game-over-stats">
          <div className="stat-item">
            <div className="stat-label">Final Score</div>
            <div className="stat-value">{score}</div>
          </div>
          
          <div className="stat-item">
            <div className="stat-label">Highest Tile</div>
            <div className="stat-value">{displayMaxTile}</div>
          </div>
        </div>

        <button className="restart-button" onClick={onRestart}>
          Play Again
        </button>
      </div>
    </div>
  );
}
