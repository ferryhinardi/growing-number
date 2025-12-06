'use client';

import { Tile as TileType, GRID_SIZE } from '@/lib/types';
import { Tile } from './Tile';
import './GameBoard.css';

interface GameBoardProps {
  tiles: TileType[];
}

export function GameBoard({ tiles }: GameBoardProps) {
  // Create grid background
  const gridCells = Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, i) => i);

  return (
    <div className="game-board-container">
      <div className="game-board">
        {/* Grid background */}
        <div className="grid-background">
          {gridCells.map((index) => (
            <div key={index} className="grid-cell" />
          ))}
        </div>

        {/* Tiles layer */}
        <div className="tiles-container">
          {tiles.map((tile) => (
            <Tile key={tile.id} tile={tile} />
          ))}
        </div>
      </div>
    </div>
  );
}
