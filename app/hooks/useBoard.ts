'use client';

import { useState, useCallback, useEffect } from 'react';
import { Tile, Direction } from '@/lib/types';
import { moveTiles, hasValidMoves } from '@/lib/mergeLogic';
import { spawnInitialTiles, spawnRandomTile } from '@/lib/randomTile';
import { getEmptyCells } from '@/lib/types';

interface UseBoardResult {
  tiles: Tile[];
  move: (direction: Direction) => { moved: boolean; score: number };
  resetBoard: () => void;
  isGameOver: boolean;
}

export function useBoard(): UseBoardResult {
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);

  // Initialize board
  const resetBoard = useCallback(() => {
    const initialTiles = spawnInitialTiles();
    setTiles(initialTiles);
    setIsGameOver(false);
  }, []);

  // Initialize on mount
  useEffect(() => {
    resetBoard();
  }, [resetBoard]);

  // Handle tile movement
  const move = useCallback(
    (direction: Direction): { moved: boolean; score: number } => {
      if (isGameOver) {
        return { moved: false, score: 0 };
      }

      const result = moveTiles(tiles, direction);

      if (!result.moved) {
        return { moved: false, score: 0 };
      }

      // Clear isNew and mergedFrom flags from previous tiles
      const cleanedTiles: Tile[] = result.tiles.map((tile) => ({
        ...tile,
        isNew: false,
        mergedFrom: undefined,
      }));

      // Spawn new tile
      const emptyCells = getEmptyCells(cleanedTiles);
      const newTile = spawnRandomTile(emptyCells);

      let updatedTiles = cleanedTiles;
      if (newTile) {
        updatedTiles = [...cleanedTiles, newTile];
      }

      setTiles(updatedTiles);

      // Check for game over
      if (!hasValidMoves(updatedTiles)) {
        setIsGameOver(true);
      }

      return { moved: true, score: result.score };
    },
    [tiles, isGameOver]
  );

  return {
    tiles,
    move,
    resetBoard,
    isGameOver,
  };
}
