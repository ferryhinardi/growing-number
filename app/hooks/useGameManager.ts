'use client';

import { useState, useCallback, useEffect } from 'react';
import { Tile } from '@/lib/types';
import { saveGameData, loadGameData } from '@/lib/storage';

interface UseGameManagerResult {
  score: number;
  bestScore: number;
  maxTile: number;
  moves: number;
  addScore: (points: number) => void;
  resetGame: () => void;
  updateMaxTile: (tiles: Tile[]) => void;
}

export function useGameManager(): UseGameManagerResult {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [maxTile, setMaxTile] = useState(0);
  const [moves, setMoves] = useState(0);

  // Load saved data on mount
  useEffect(() => {
    const data = loadGameData();
    setBestScore(data.bestScore);
    setMaxTile(data.maxTile);
  }, []);

  // Add score points
  const addScore = useCallback((points: number) => {
    setScore((prev) => {
      const newScore = prev + points;
      
      // Update best score if needed
      setBestScore((prevBest) => {
        const newBest = Math.max(prevBest, newScore);
        if (newBest > prevBest) {
          saveGameData(newBest, maxTile);
        }
        return newBest;
      });

      return newScore;
    });
    
    setMoves((prev) => prev + 1);
  }, [maxTile]);

  // Update max tile
  const updateMaxTile = useCallback((tiles: Tile[]) => {
    if (tiles.length === 0) return;

    const currentMax = Math.max(...tiles.map((t) => t.value));
    setMaxTile((prevMax) => {
      const newMax = Math.max(prevMax, currentMax);
      if (newMax > prevMax) {
        saveGameData(bestScore, newMax);
      }
      return newMax;
    });
  }, [bestScore]);

  // Reset game state
  const resetGame = useCallback(() => {
    setScore(0);
    setMoves(0);
  }, []);

  return {
    score,
    bestScore,
    maxTile,
    moves,
    addScore,
    resetGame,
    updateMaxTile,
  };
}
