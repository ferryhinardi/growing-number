'use client';

import './ScoreBoard.css';

interface ScoreBoardProps {
  score: number;
  bestScore: number;
  moves: number;
}

export function ScoreBoard({ score, bestScore, moves }: ScoreBoardProps) {
  return (
    <div className="score-board">
      <div className="score-item">
        <div className="score-label">Score</div>
        <div className="score-value">{score}</div>
      </div>
      
      <div className="score-item">
        <div className="score-label">Best</div>
        <div className="score-value">{bestScore}</div>
      </div>
      
      <div className="score-item">
        <div className="score-label">Moves</div>
        <div className="score-value">{moves}</div>
      </div>
    </div>
  );
}
