import { Tile, generateId } from './types';

// Spawn a new tile in a random empty position
// 90% chance for value 1, 10% chance for value 2
export function spawnRandomTile(
  emptyCells: number[],
  spawnValue?: number
): Tile | null {
  if (emptyCells.length === 0) return null;

  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  const position = emptyCells[randomIndex];

  // Determine value based on probability
  const value = spawnValue ?? (Math.random() < 0.9 ? 1 : 2);

  return {
    id: generateId(),
    value,
    position,
    isNew: true,
  };
}

// Spawn initial tiles for a new game
export function spawnInitialTiles(): Tile[] {
  const tiles: Tile[] = [];
  
  // Spawn 2 tiles at the start
  const firstTile = spawnRandomTile([...Array(16).keys()]);
  if (firstTile) {
    tiles.push(firstTile);
    
    const remainingCells = [...Array(16).keys()].filter(
      (i) => i !== firstTile.position
    );
    const secondTile = spawnRandomTile(remainingCells);
    if (secondTile) {
      tiles.push(secondTile);
    }
  }

  return tiles;
}
