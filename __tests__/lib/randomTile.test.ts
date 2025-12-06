import { spawnRandomTile, spawnInitialTiles } from '@/lib/randomTile';

describe('randomTile', () => {
  describe('spawnRandomTile', () => {
    it('should return null when no empty cells', () => {
      const result = spawnRandomTile([]);
      expect(result).toBeNull();
    });

    it('should spawn tile in one of the empty cells', () => {
      const emptyCells = [0, 5, 10];
      const result = spawnRandomTile(emptyCells);
      
      expect(result).not.toBeNull();
      expect(emptyCells).toContain(result!.position);
    });

    it('should spawn tile with value 1 or 2', () => {
      const emptyCells = [0];
      const result = spawnRandomTile(emptyCells);
      
      expect(result).not.toBeNull();
      expect([1, 2]).toContain(result!.value);
    });

    it('should spawn tile with specific value when provided', () => {
      const emptyCells = [0];
      const result = spawnRandomTile(emptyCells, 3);
      
      expect(result).not.toBeNull();
      expect(result!.value).toBe(3);
    });

    it('should mark new tile with isNew flag', () => {
      const emptyCells = [0];
      const result = spawnRandomTile(emptyCells);
      
      expect(result).not.toBeNull();
      expect(result!.isNew).toBe(true);
    });

    it('should generate unique ID for tile', () => {
      const emptyCells = [0];
      const result1 = spawnRandomTile(emptyCells);
      const result2 = spawnRandomTile(emptyCells);
      
      expect(result1!.id).not.toBe(result2!.id);
    });
  });

  describe('spawnInitialTiles', () => {
    it('should spawn 2 tiles', () => {
      const tiles = spawnInitialTiles();
      expect(tiles).toHaveLength(2);
    });

    it('should spawn tiles in different positions', () => {
      const tiles = spawnInitialTiles();
      expect(tiles[0].position).not.toBe(tiles[1].position);
    });

    it('should spawn tiles with values 1 or 2', () => {
      const tiles = spawnInitialTiles();
      tiles.forEach((tile) => {
        expect([1, 2]).toContain(tile.value);
      });
    });

    it('should spawn tiles with unique IDs', () => {
      const tiles = spawnInitialTiles();
      expect(tiles[0].id).not.toBe(tiles[1].id);
    });
  });
});
