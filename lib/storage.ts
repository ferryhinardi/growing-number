// LocalStorage utilities for persisting game state

const STORAGE_KEY = 'growing-number-game';
const BEST_SCORE_KEY = 'growing-number-best-score';
const MAX_TILE_KEY = 'growing-number-max-tile';

export interface StoredGameData {
  bestScore: number;
  maxTile: number;
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
