import {
  indexToPosition,
  positionToIndex,
  getEmptyCells,
  generateId,
  GRID_SIZE,
  Tile,
} from '@/lib/types';

describe('types utilities', () => {
  describe('indexToPosition', () => {
    it('should convert index 0 to position {row: 0, col: 0}', () => {
      expect(indexToPosition(0)).toEqual({ row: 0, col: 0 });
    });

    it('should convert index 3 to position {row: 0, col: 3}', () => {
      expect(indexToPosition(3)).toEqual({ row: 0, col: 3 });
    });

    it('should convert index 4 to position {row: 1, col: 0}', () => {
      expect(indexToPosition(4)).toEqual({ row: 1, col: 0 });
    });

    it('should convert index 15 to position {row: 3, col: 3}', () => {
      expect(indexToPosition(15)).toEqual({ row: 3, col: 3 });
    });
  });

  describe('positionToIndex', () => {
    it('should convert position (0, 0) to index 0', () => {
      expect(positionToIndex(0, 0)).toBe(0);
    });

    it('should convert position (0, 3) to index 3', () => {
      expect(positionToIndex(0, 3)).toBe(3);
    });

    it('should convert position (1, 0) to index 4', () => {
      expect(positionToIndex(1, 0)).toBe(4);
    });

    it('should convert position (3, 3) to index 15', () => {
      expect(positionToIndex(3, 3)).toBe(15);
    });
  });

  describe('getEmptyCells', () => {
    it('should return all cells when no tiles exist', () => {
      const result = getEmptyCells([]);
      expect(result).toHaveLength(16);
      expect(result).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
    });

    it('should exclude occupied positions', () => {
      const tiles: Tile[] = [
        { id: '1', value: 1, position: 0 },
        { id: '2', value: 1, position: 5 },
      ];
      const result = getEmptyCells(tiles);
      expect(result).toHaveLength(14);
      expect(result).not.toContain(0);
      expect(result).not.toContain(5);
    });

    it('should return empty array when all cells are occupied', () => {
      const tiles: Tile[] = Array.from({ length: 16 }, (_, i) => ({
        id: `${i}`,
        value: 1,
        position: i,
      }));
      const result = getEmptyCells(tiles);
      expect(result).toHaveLength(0);
    });
  });

  describe('generateId', () => {
    it('should generate unique IDs', () => {
      const id1 = generateId();
      const id2 = generateId();
      expect(id1).not.toBe(id2);
    });

    it('should generate IDs with correct prefix', () => {
      const id = generateId();
      expect(id).toMatch(/^tile-\d+-\d+$/);
    });
  });
});
