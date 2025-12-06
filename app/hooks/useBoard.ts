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
  undo: () => { undone: boolean; previousScore: number };
  canUndo: boolean;
}

export function useBoard(): UseBoardResult {
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [previousState, setPreviousState] = useState<{ tiles: Tile[]; score: number } | null>(null);
  const [canUndo, setCanUndo] = useState(false);

  // Initialize board
  const resetBoard = useCallback(() => {
    const initialTiles = spawnInitialTiles();
    setTiles(initialTiles);
    setIsGameOver(false);
    setPreviousState(null);
    setCanUndo(false);
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

      // Save previous state for undo (only if we can still undo)
      if (canUndo || !previousState) {
        setPreviousState({ tiles: tiles, score: result.score });
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
      setCanUndo(true);

      // Check for game over
      if (!hasValidMoves(updatedTiles)) {
        setIsGameOver(true);
      }

      return { moved: true, score: result.score };
    },
    [tiles, isGameOver, canUndo, previousState]
  );

  // Undo last move (only once per game)
  const undo = useCallback((): { undone: boolean; previousScore: number } => {
    if (!canUndo || !previousState) {
      return { undone: false, previousScore: 0 };
    }

    setTiles(previousState.tiles);
    setCanUndo(false);
    setIsGameOver(false);
    
    return { undone: true, previousScore: previousState.score };
  }, [canUndo, previousState]);

  return {
    tiles,
    move,
    resetBoard,
    isGameOver,
    undo,
    canUndo,
  };
}
