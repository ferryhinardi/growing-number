import { moveTiles, hasValidMoves, calculateComboMultiplier } from '@/lib/mergeLogic';
import { Tile } from '@/lib/types';

describe('mergeLogic', () => {
  describe('moveTiles', () => {
    describe('left movement', () => {
      it('should move tiles to the left', () => {
        const tiles: Tile[] = [
          { id: '1', value: 1, position: 2 }, // row 0, col 2
        ];

        const result = moveTiles(tiles, 'left');
        
        expect(result.moved).toBe(true);
        expect(result.tiles[0].position).toBe(0); // Should move to col 0
      });

      it('should merge two equal tiles moving left', () => {
        const tiles: Tile[] = [
          { id: '1', value: 1, position: 0 }, // row 0, col 0
          { id: '2', value: 1, position: 1 }, // row 0, col 1
        ];

        const result = moveTiles(tiles, 'left');
        
        expect(result.moved).toBe(true);
        expect(result.tiles).toHaveLength(1);
        expect(result.tiles[0].value).toBe(2);
        expect(result.tiles[0].position).toBe(0);
        expect(result.score).toBeGreaterThan(0);
      });

      it('should not merge tiles with different values', () => {
        const tiles: Tile[] = [
          { id: '1', value: 1, position: 0 },
          { id: '2', value: 2, position: 1 },
        ];

        const result = moveTiles(tiles, 'left');
        
        expect(result.tiles).toHaveLength(2);
        expect(result.tiles[0].value).toBe(1);
        expect(result.tiles[1].value).toBe(2);
      });

      it('should handle multiple merges in one move', () => {
        const tiles: Tile[] = [
          { id: '1', value: 1, position: 0 },
          { id: '2', value: 1, position: 1 },
          { id: '3', value: 2, position: 2 },
          { id: '4', value: 2, position: 3 },
        ];

        const result = moveTiles(tiles, 'left');
        
        expect(result.moved).toBe(true);
        expect(result.tiles).toHaveLength(2);
        expect(result.tiles[0].value).toBe(2); // 1 + 1
        expect(result.tiles[1].value).toBe(3); // 2 + 2
      });
    });

    describe('right movement', () => {
      it('should move tiles to the right', () => {
        const tiles: Tile[] = [
          { id: '1', value: 1, position: 0 }, // row 0, col 0
        ];

        const result = moveTiles(tiles, 'right');
        
        expect(result.moved).toBe(true);
        expect(result.tiles[0].position).toBe(3); // Should move to col 3
      });

      it('should merge tiles moving right', () => {
        const tiles: Tile[] = [
          { id: '1', value: 1, position: 2 },
          { id: '2', value: 1, position: 3 },
        ];

        const result = moveTiles(tiles, 'right');
        
        expect(result.moved).toBe(true);
        expect(result.tiles).toHaveLength(1);
        expect(result.tiles[0].value).toBe(2);
        expect(result.tiles[0].position).toBe(3);
      });
    });

    describe('up movement', () => {
      it('should move tiles up', () => {
        const tiles: Tile[] = [
          { id: '1', value: 1, position: 8 }, // row 2, col 0
        ];

        const result = moveTiles(tiles, 'up');
        
        expect(result.moved).toBe(true);
        expect(result.tiles[0].position).toBe(0); // Should move to row 0
      });

      it('should merge tiles moving up', () => {
        const tiles: Tile[] = [
          { id: '1', value: 1, position: 0 }, // row 0, col 0
          { id: '2', value: 1, position: 4 }, // row 1, col 0
        ];

        const result = moveTiles(tiles, 'up');
        
        expect(result.moved).toBe(true);
        expect(result.tiles).toHaveLength(1);
        expect(result.tiles[0].value).toBe(2);
        expect(result.tiles[0].position).toBe(0);
      });
    });

    describe('down movement', () => {
      it('should move tiles down', () => {
        const tiles: Tile[] = [
          { id: '1', value: 1, position: 0 }, // row 0, col 0
        ];

        const result = moveTiles(tiles, 'down');
        
        expect(result.moved).toBe(true);
        expect(result.tiles[0].position).toBe(12); // Should move to row 3
      });

      it('should merge tiles moving down', () => {
        const tiles: Tile[] = [
          { id: '1', value: 1, position: 8 }, // row 2, col 0
          { id: '2', value: 1, position: 12 }, // row 3, col 0
        ];

        const result = moveTiles(tiles, 'down');
        
        expect(result.moved).toBe(true);
        expect(result.tiles).toHaveLength(1);
        expect(result.tiles[0].value).toBe(2);
        expect(result.tiles[0].position).toBe(12);
      });
    });

    it('should not move when no movement is possible', () => {
      const tiles: Tile[] = [
        { id: '1', value: 1, position: 0 },
        { id: '2', value: 2, position: 1 },
      ];

      const result = moveTiles(tiles, 'left');
      
      expect(result.moved).toBe(false);
    });

    it('should calculate correct score for merges', () => {
      const tiles: Tile[] = [
        { id: '1', value: 2, position: 0 },
        { id: '2', value: 2, position: 1 },
      ];

      const result = moveTiles(tiles, 'left');
      
      expect(result.score).toBe(8); // 2^3 = 8
    });
  });

  describe('hasValidMoves', () => {
    it('should return true when there are empty cells', () => {
      const tiles: Tile[] = [
        { id: '1', value: 1, position: 0 },
      ];

      expect(hasValidMoves(tiles)).toBe(true);
    });

    it('should return true when adjacent tiles can merge horizontally', () => {
      const tiles: Tile[] = Array.from({ length: 16 }, (_, i) => ({
        id: `${i}`,
        value: i < 2 ? 1 : i + 1,
        position: i,
      }));

      expect(hasValidMoves(tiles)).toBe(true);
    });

    it('should return true when adjacent tiles can merge vertically', () => {
      const tiles: Tile[] = Array.from({ length: 16 }, (_, i) => ({
        id: `${i}`,
        value: i === 0 || i === 4 ? 1 : i + 10,
        position: i,
      }));

      expect(hasValidMoves(tiles)).toBe(true);
    });

    it('should return false when no moves are possible', () => {
      const tiles: Tile[] = Array.from({ length: 16 }, (_, i) => ({
        id: `${i}`,
        value: i,
        position: i,
      }));

      expect(hasValidMoves(tiles)).toBe(false);
    });
  });

  describe('calculateComboMultiplier', () => {
    it('should return 1 for 0 or 1 merge', () => {
      expect(calculateComboMultiplier(0)).toBe(1);
      expect(calculateComboMultiplier(1)).toBe(1);
    });

    it('should return 1.5 for 2 merges', () => {
      expect(calculateComboMultiplier(2)).toBe(1.5);
    });

    it('should return 2 for 3 merges', () => {
      expect(calculateComboMultiplier(3)).toBe(2);
    });

    it('should return 2.5 for 4+ merges', () => {
      expect(calculateComboMultiplier(4)).toBe(2.5);
      expect(calculateComboMultiplier(5)).toBe(2.5);
    });
  });
});
