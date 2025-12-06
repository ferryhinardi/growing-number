'use client';

import { Tile as TileType, indexToPosition } from '@/lib/types';
import './Tile.css';

interface TileProps {
  tile: TileType;
}

const TILE_COLORS: Record<number, string> = {
  1: '#eee4da',
  2: '#ede0c8',
  3: '#f2b179',
  4: '#f59563',
  5: '#f67c5f',
  6: '#f65e3b',
  7: '#edcf72',
  8: '#edcc61',
  9: '#edc850',
  10: '#edc53f',
  11: '#edc22e',
};

const TILE_TEXT_COLORS: Record<number, string> = {
  1: '#776e65',
  2: '#776e65',
  3: '#f9f6f2',
  4: '#f9f6f2',
  5: '#f9f6f2',
  6: '#f9f6f2',
  7: '#f9f6f2',
  8: '#f9f6f2',
  9: '#f9f6f2',
  10: '#f9f6f2',
  11: '#f9f6f2',
};

export function Tile({ tile }: TileProps) {
  const pos = indexToPosition(tile.position);
  const displayValue = Math.pow(2, tile.value);
  
  const backgroundColor = TILE_COLORS[tile.value] || '#3c3a32';
  const textColor = TILE_TEXT_COLORS[tile.value] || '#f9f6f2';

  const style = {
    '--row': pos.row,
    '--col': pos.col,
    '--bg-color': backgroundColor,
    '--text-color': textColor,
  } as React.CSSProperties;

  return (
    <div
      className={`tile ${tile.isNew ? 'tile-new' : ''} ${
        tile.mergedFrom ? 'tile-merged' : ''
      }`}
      style={style}
      data-value={tile.value}
    >
      <div className="tile-inner">{displayValue}</div>
    </div>
  );
}
