'use client';

import { useEffect, useState } from 'react';
import { getStats, getLeaderboard, GameStats, LeaderboardEntry } from '@/lib/storage';
import './StatsModal.css';

interface StatsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function StatsModal({ isOpen, onClose }: StatsModalProps) {
  const [stats, setStats] = useState<GameStats | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    if (isOpen) {
      setStats(getStats());
      setLeaderboard(getLeaderboard());
    }
  }, [isOpen]);

  if (!isOpen || !stats) return null;

  const avgScore = stats.gamesPlayed > 0 
    ? Math.round(stats.totalScore / stats.gamesPlayed) 
    : 0;
  
  const winRate = stats.gamesPlayed > 0
    ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100)
    : 0;

  const avgMoves = stats.gamesPlayed > 0
    ? Math.round(stats.totalMoves / stats.gamesPlayed)
    : 0;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <h2 className="modal-title">Statistics & Leaderboard</h2>
        
        <div className="stats-section">
          <h3>Your Stats</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">{stats.gamesPlayed}</div>
              <div className="stat-label">Games Played</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{winRate}%</div>
              <div className="stat-label">Win Rate</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{avgScore}</div>
              <div className="stat-label">Avg Score</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{avgMoves}</div>
              <div className="stat-label">Avg Moves</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{Math.pow(2, stats.highestTileEver)}</div>
              <div className="stat-label">Best Tile</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{stats.longestCombo}x</div>
              <div className="stat-label">Best Combo</div>
            </div>
          </div>
        </div>

        <div className="leaderboard-section">
          <h3>Top 10 Scores</h3>
          {leaderboard.length === 0 ? (
            <p className="empty-message">No games completed yet. Start playing!</p>
          ) : (
            <div className="leaderboard-list">
              {leaderboard.map((entry, index) => (
                <div key={index} className="leaderboard-entry">
                  <div className="rank">#{index + 1}</div>
                  <div className="entry-details">
                    <div className="entry-score">{entry.score}</div>
                    <div className="entry-info">
                      Best: {Math.pow(2, entry.maxTile)} • {entry.moves} moves • {formatDate(entry.date)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
