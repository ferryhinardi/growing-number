// LocalStorage utilities for persisting game state

const STORAGE_KEY = 'growing-number-game';
const BEST_SCORE_KEY = 'growing-number-best-score';
const MAX_TILE_KEY = 'growing-number-max-tile';
const STATS_KEY = 'growing-number-stats';
const LEADERBOARD_KEY = 'growing-number-leaderboard';

export interface StoredGameData {
  bestScore: number;
  maxTile: number;
}

export interface GameStats {
  gamesPlayed: number;
  gamesWon: number;
  totalScore: number;
  totalMoves: number;
  highestTileEver: number;
  longestCombo: number;
}

export interface LeaderboardEntry {
  score: number;
  maxTile: number;
  moves: number;
  date: string;
}

// Save best score and max tile
export function saveGameData(score: number, maxTile: number): void {
  if (typeof window === 'undefined') return;

  try {
    const currentBest = getBestScore();
    const currentMaxTile = getMaxTile();

    if (score > currentBest) {
      localStorage.setItem(BEST_SCORE_KEY, score.toString());
    }

    if (maxTile > currentMaxTile) {
      localStorage.setItem(MAX_TILE_KEY, maxTile.toString());
    }
  } catch (error) {
    console.error('Failed to save game data:', error);
  }
}

// Get best score
export function getBestScore(): number {
  if (typeof window === 'undefined') return 0;

  try {
    const stored = localStorage.getItem(BEST_SCORE_KEY);
    return stored ? parseInt(stored, 10) : 0;
  } catch (error) {
    console.error('Failed to get best score:', error);
    return 0;
  }
}

// Get max tile
export function getMaxTile(): number {
  if (typeof window === 'undefined') return 0;

  try {
    const stored = localStorage.getItem(MAX_TILE_KEY);
    return stored ? parseInt(stored, 10) : 0;
  } catch (error) {
    console.error('Failed to get max tile:', error);
    return 0;
  }
}

// Load game data
export function loadGameData(): StoredGameData {
  return {
    bestScore: getBestScore(),
    maxTile: getMaxTile(),
  };
}

// Clear all stored data (for testing or reset)
export function clearGameData(): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(BEST_SCORE_KEY);
    localStorage.removeItem(MAX_TILE_KEY);
  } catch (error) {
    console.error('Failed to clear game data:', error);
  }
}

// Stats management
export function getStats(): GameStats {
  if (typeof window === 'undefined') {
    return {
      gamesPlayed: 0,
      gamesWon: 0,
      totalScore: 0,
      totalMoves: 0,
      highestTileEver: 0,
      longestCombo: 0,
    };
  }

  try {
    const stored = localStorage.getItem(STATS_KEY);
    if (!stored) {
      return {
        gamesPlayed: 0,
        gamesWon: 0,
        totalScore: 0,
        totalMoves: 0,
        highestTileEver: 0,
        longestCombo: 0,
      };
    }
    return JSON.parse(stored);
  } catch (error) {
    console.error('Failed to get stats:', error);
    return {
      gamesPlayed: 0,
      gamesWon: 0,
      totalScore: 0,
      totalMoves: 0,
      highestTileEver: 0,
      longestCombo: 0,
    };
  }
}

export function updateStats(
  score: number,
  moves: number,
  maxTile: number,
  won: boolean,
  longestCombo: number
): void {
  if (typeof window === 'undefined') return;

  try {
    const stats = getStats();
    stats.gamesPlayed += 1;
    if (won) stats.gamesWon += 1;
    stats.totalScore += score;
    stats.totalMoves += moves;
    stats.highestTileEver = Math.max(stats.highestTileEver, maxTile);
    stats.longestCombo = Math.max(stats.longestCombo, longestCombo);

    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  } catch (error) {
    console.error('Failed to update stats:', error);
  }
}

// Leaderboard management (top 10 scores)
export function getLeaderboard(): LeaderboardEntry[] {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem(LEADERBOARD_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to get leaderboard:', error);
    return [];
  }
}

export function addToLeaderboard(
  score: number,
  maxTile: number,
  moves: number
): void {
  if (typeof window === 'undefined') return;

  try {
    const leaderboard = getLeaderboard();
    const entry: LeaderboardEntry = {
      score,
      maxTile,
      moves,
      date: new Date().toISOString(),
    };

    leaderboard.push(entry);
    leaderboard.sort((a, b) => b.score - a.score);
    leaderboard.splice(10); // Keep only top 10

    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(leaderboard));
  } catch (error) {
    console.error('Failed to add to leaderboard:', error);
  }
}
