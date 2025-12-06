'use client';

import { useEffect, useState } from 'react';
import { useBoard } from '@/app/hooks/useBoard';
import { useGameManager } from '@/app/hooks/useGameManager';
import { useInput } from '@/app/hooks/useInput';
import { GameBoard } from '@/app/game/GameBoard';
import { ScoreBoard } from '@/app/game/ScoreBoard';
import { GameOver } from '@/app/game/GameOver';
import { StatsModal } from '@/app/game/StatsModal';
import { Direction } from '@/lib/types';
import { soundEffects } from '@/lib/soundEffects';
import { updateStats, addToLeaderboard } from '@/lib/storage';
import './GameContainer.css';

export function GameContainer() {
  const { tiles, move, resetBoard, isGameOver, undo, canUndo } = useBoard();
  const { score, bestScore, moves, addScore, resetGame, updateMaxTile } =
    useGameManager();

  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [showCombo, setShowCombo] = useState(false);
  const [lastMergeCount, setLastMergeCount] = useState(0);
  const [achievements, setAchievements] = useState<string[]>([]);
  const [showAchievement, setShowAchievement] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [showStats, setShowStats] = useState(false);

  // Handle player move
  const handleMove = (direction: Direction) => {
    if (!gameStarted) setGameStarted(true);
    
    const result = move(direction);
    if (result.moved) {
      // Calculate combo based on merges
      const mergeCount = tiles.filter(t => t.mergedFrom).length;
      
      if (mergeCount > 0) {
        const newCombo = combo + 1;
        setCombo(newCombo);
        setMaxCombo(Math.max(maxCombo, newCombo));
        setLastMergeCount(mergeCount);
        
        // Play merge sound
        const maxTileValue = Math.max(...tiles.map(t => t.value));
        soundEffects.merge(maxTileValue);
        
        // Show combo feedback
        setShowCombo(true);
        setTimeout(() => setShowCombo(false), 1000);
        
        // Play combo sound for streaks
        if (newCombo > 1) {
          soundEffects.combo(newCombo);
        }
        
        // Apply combo multiplier to score
        const multiplier = Math.min(1 + (newCombo * 0.2), 3);
        const bonusScore = Math.floor(result.score * multiplier);
        addScore(bonusScore);
        
        // Check for achievements
        checkAchievements(mergeCount, newCombo);
      } else {
        setCombo(0);
      }
    }
  };

  // Check and unlock achievements
  const checkAchievements = (mergeCount: number, currentCombo: number) => {
    const newAchievements: string[] = [];
    
    if (mergeCount >= 3 && !achievements.includes('triple')) {
      newAchievements.push('triple');
      showAchievementPopup('🔥 Triple Merge!');
    }
    
    if (currentCombo >= 5 && !achievements.includes('combo5')) {
      newAchievements.push('combo5');
      showAchievementPopup('⚡ 5x Combo!');
    }
    
    if (currentCombo >= 10 && !achievements.includes('combo10')) {
      newAchievements.push('combo10');
      showAchievementPopup('🌟 10x Combo Master!');
    }
    
    const maxTileValue = Math.max(...tiles.map(t => t.value), 0);
    const displayValue = Math.pow(2, maxTileValue);
    
    if (displayValue >= 256 && !achievements.includes('256')) {
      newAchievements.push('256');
      showAchievementPopup('🏆 Reached 256!');
    }
    
    if (displayValue >= 512 && !achievements.includes('512')) {
      newAchievements.push('512');
      showAchievementPopup('💎 Reached 512!');
    }
    
    if (displayValue >= 1024 && !achievements.includes('1024')) {
      newAchievements.push('1024');
      showAchievementPopup('👑 Reached 1024!');
    }
    
    if (newAchievements.length > 0) {
      setAchievements([...achievements, ...newAchievements]);
    }
  };

  const showAchievementPopup = (message: string) => {
    setShowAchievement(message);
    soundEffects.achievement();
    setTimeout(() => setShowAchievement(null), 3000);
  };

  // Handle undo
  const handleUndo = () => {
    const result = undo();
    if (result.undone) {
      soundEffects.click();
      addScore(-result.previousScore);
    }
  };

  // Toggle sound
  const handleToggleSound = () => {
    const enabled = soundEffects.toggle();
    setSoundEnabled(enabled);
    soundEffects.click();
  };

  // Toggle stats modal
  const handleToggleStats = () => {
    soundEffects.click();
    setShowStats(!showStats);
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
    soundEffects.click();
    
    // Save game stats if game was started
    if (gameStarted) {
      const maxTileValue = Math.max(...tiles.map(t => t.value), 0);
      const won = maxTileValue >= 11; // 2^11 = 2048
      updateStats(score, moves, maxTileValue, won, maxCombo);
      addToLeaderboard(score, maxTileValue, moves);
    }
    
    resetBoard();
    resetGame();
    setCombo(0);
    setMaxCombo(0);
    setShowCombo(false);
    setLastMergeCount(0);
    setGameStarted(false);
  };

  // Handle game over
  useEffect(() => {
    if (isGameOver && gameStarted) {
      soundEffects.gameOver();
      
      // Save final stats
      const maxTileValue = Math.max(...tiles.map(t => t.value), 0);
      const won = maxTileValue >= 11; // 2^11 = 2048
      updateStats(score, moves, maxTileValue, won, maxCombo);
      addToLeaderboard(score, maxTileValue, moves);
    }
  }, [isGameOver, gameStarted, tiles, score, moves, maxCombo]);

  // Get current max tile for display
  const maxTileValue = Math.max(...tiles.map((t) => t.value), 0);
  const displayMaxTile = Math.pow(2, maxTileValue);

  return (
    <div className="game-container">
      <header className="game-header">
        <h1 className="game-title">Growing Number</h1>
        <p className="game-subtitle">
          Merge tiles to create combos and reach 2048!
        </p>
      </header>

      <ScoreBoard score={score} bestScore={bestScore} moves={moves} />

      {/* Current Max Tile Display */}
      <div className="current-stats">
        <div className="stat-box">
          <div className="stat-label">Current Best</div>
          <div className="stat-value highlight">{displayMaxTile}</div>
        </div>
        <div className="stat-box">
          <div className="stat-label">Combo</div>
          <div className={`stat-value ${combo > 0 ? 'combo-active' : ''}`}>
            {combo}x
          </div>
        </div>
      </div>

      <div className="controls">
        <button className="new-game-button" onClick={handleRestart}>
          New Game
        </button>
        <button 
          className="undo-button" 
          onClick={handleUndo}
          disabled={!canUndo}
          title="Undo last move (1 per game)"
        >
          ↶ Undo
        </button>
        <button 
          className="stats-button" 
          onClick={handleToggleStats}
          title="View statistics and leaderboard"
        >
          📊 Stats
        </button>
        <button 
          className="sound-button" 
          onClick={handleToggleSound}
          title={soundEnabled ? 'Mute sounds' : 'Enable sounds'}
        >
          {soundEnabled ? '🔊' : '🔇'}
        </button>
      </div>

      <GameBoard tiles={tiles} />

      {/* Combo Feedback */}
      {showCombo && combo > 1 && (
        <div className="combo-notification">
          🔥 {combo}x COMBO! 
          {lastMergeCount > 1 && ` (+${lastMergeCount} merges)`}
        </div>
      )}

      {/* Achievement Notification */}
      {showAchievement && (
        <div className="achievement-notification">
          {showAchievement}
        </div>
      )}

      <div className="instructions">
        <p><strong>Goal:</strong> Reach 2048 (or beyond!)</p>
        <p><strong>Controls:</strong> Arrow keys or swipe to move tiles</p>
        <p><strong>Strategy:</strong> Keep your highest tile in a corner!</p>
        <p><strong>Bonus:</strong> Chain merges for combo multipliers!</p>
      </div>

      {isGameOver && (
        <GameOver
          score={score}
          maxTile={maxTileValue}
          onRestart={handleRestart}
        />
      )}

      <StatsModal isOpen={showStats} onClose={() => setShowStats(false)} />
    </div>
  );
}
