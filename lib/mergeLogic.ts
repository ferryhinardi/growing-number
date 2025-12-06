import {
  Tile,
  Direction,
  GRID_SIZE,
  indexToPosition,
  positionToIndex,
  generateId,
} from './types';

interface MergeResult {
  tiles: Tile[];
  score: number;
  moved: boolean;
}

// Get tiles in a specific line (row or column)
function getTilesInLine(
  tiles: Tile[],
  lineIndex: number,
  isRow: boolean
): Tile[] {
  return tiles
    .filter((tile) => {
      const pos = indexToPosition(tile.position);
      return isRow ? pos.row === lineIndex : pos.col === lineIndex;
    })
    .sort((a, b) => {
      const posA = indexToPosition(a.position);
      const posB = indexToPosition(b.position);
      return isRow ? posA.col - posB.col : posA.row - posB.row;
    });
}

// Merge tiles in a single line
function mergeLine(lineTiles: Tile[], reverse: boolean): {
  mergedTiles: Tile[];
  points: number;
} {
  if (lineTiles.length === 0) {
    return { mergedTiles: [], points: 0 };
  }

  const tiles = reverse ? [...lineTiles].reverse() : [...lineTiles];
  const merged: Tile[] = [];
  let points = 0;
  let i = 0;

  while (i < tiles.length) {
    const current = tiles[i];
    const next = tiles[i + 1];

    // Check if we can merge with the next tile
    if (next && current.value === next.value) {
      // Merge tiles
      const newValue = current.value + 1;
      const mergedTile: Tile = {
        id: generateId(),
        value: newValue,
        position: current.position,
        mergedFrom: [current.id, next.id],
      };
      merged.push(mergedTile);
      points += Math.pow(2, newValue); // Score based on resulting value
      i += 2; // Skip both merged tiles
    } else {
      // No merge, just move the tile
      merged.push({ ...current });
      i += 1;
    }
  }

  return {
    mergedTiles: reverse ? merged.reverse() : merged,
    points,
  };
}

// Redistribute tiles along a line to fill gaps
function redistributeLine(
  tiles: Tile[],
  lineIndex: number,
  isRow: boolean,
  reverse: boolean
): Tile[] {
  const positions = [];
  
  for (let i = 0; i < GRID_SIZE; i++) {
    if (isRow) {
      positions.push(positionToIndex(lineIndex, i));
    } else {
      positions.push(positionToIndex(i, lineIndex));
    }
  }

  if (reverse) {
    positions.reverse();
  }

  return tiles.map((tile, index) => ({
    ...tile,
    position: positions[index],
  }));
}

// Main movement and merge logic
export function moveTiles(tiles: Tile[], direction: Direction): MergeResult {
  const isRow = direction === 'left' || direction === 'right';
  const reverse = direction === 'right' || direction === 'down';
  
  let newTiles: Tile[] = [];
  let totalScore = 0;
  let moved = false;

  for (let i = 0; i < GRID_SIZE; i++) {
    const lineTiles = getTilesInLine(tiles, i, isRow);
    
    if (lineTiles.length === 0) continue;

    // Store original positions to detect movement
    const originalPositions = lineTiles.map((t) => t.position);

    // Merge tiles in this line
    const { mergedTiles, points } = mergeLine(lineTiles, reverse);
    totalScore += points;

    // Redistribute merged tiles to remove gaps
    const redistributed = redistributeLine(mergedTiles, i, isRow, reverse);
    
    // Check if any tile moved
    redistributed.forEach((tile, idx) => {
      if (idx < originalPositions.length) {
        if (tile.position !== originalPositions[idx]) {
          moved = true;
        }
      }
    });

    // Check if tiles were merged (different count)
    if (redistributed.length !== lineTiles.length) {
      moved = true;
    }

    newTiles = [...newTiles, ...redistributed];
  }

  return {
    tiles: newTiles,
    score: totalScore,
    moved,
  };
}

// Check if any valid moves exist
export function hasValidMoves(tiles: Tile[]): boolean {
  // Check if there are empty cells
  if (tiles.length < 16) return true;

  // Check if any adjacent tiles can merge
  for (const tile of tiles) {
    const pos = indexToPosition(tile.position);
    
    // Check right neighbor
    if (pos.col < GRID_SIZE - 1) {
      const rightPos = positionToIndex(pos.row, pos.col + 1);
      const rightTile = tiles.find((t) => t.position === rightPos);
      if (rightTile && rightTile.value === tile.value) {
        return true;
      }
    }
    
    // Check down neighbor
    if (pos.row < GRID_SIZE - 1) {
      const downPos = positionToIndex(pos.row + 1, pos.col);
      const downTile = tiles.find((t) => t.position === downPos);
      if (downTile && downTile.value === tile.value) {
        return true;
      }
    }
  }

  return false;
}

// Calculate combo multiplier based on number of merges
export function calculateComboMultiplier(mergeCount: number): number {
  if (mergeCount <= 1) return 1;
  if (mergeCount === 2) return 1.5;
  if (mergeCount === 3) return 2;
  return 2.5;
}
