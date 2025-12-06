// Game constants and types

export const GRID_SIZE = 4;
export const CELL_COUNT = GRID_SIZE * GRID_SIZE;

export type Direction = 'up' | 'down' | 'left' | 'right';

export interface Tile {
  id: string;
  value: number;
  position: number; // 0-15 for 4x4 grid
  isNew?: boolean;
  mergedFrom?: string[]; // IDs of tiles that merged to create this one
}

export interface GameState {
  tiles: Tile[];
  score: number;
  bestScore: number;
  maxTile: number;
  moves: number;
  isGameOver: boolean;
}

export interface Position {
  row: number;
  col: number;
}

// Convert flat index to row/col
export function indexToPosition(index: number): Position {
  return {
    row: Math.floor(index / GRID_SIZE),
    col: index % GRID_SIZE,
  };
}

// Convert row/col to flat index
export function positionToIndex(row: number, col: number): number {
  return row * GRID_SIZE + col;
}

// Get all empty cell positions
export function getEmptyCells(tiles: Tile[]): number[] {
  const occupiedPositions = new Set(tiles.map((t) => t.position));
  const emptyCells: number[] = [];
  
  for (let i = 0; i < CELL_COUNT; i++) {
    if (!occupiedPositions.has(i)) {
      emptyCells.push(i);
    }
  }
  
  return emptyCells;
}

// Generate unique ID
let idCounter = 0;
export function generateId(): string {
  return `tile-${Date.now()}-${idCounter++}`;
}
