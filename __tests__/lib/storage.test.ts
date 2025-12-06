/**
 * @jest-environment jsdom
 */

import {
  saveGameData,
  getBestScore,
  getMaxTile,
  loadGameData,
  clearGameData,
} from '@/lib/storage';

describe('storage', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  describe('saveGameData', () => {
    it('should save best score when new score is higher', () => {
      saveGameData(100, 5);
      expect(getBestScore()).toBe(100);
    });

    it('should not update best score when new score is lower', () => {
      saveGameData(100, 5);
      saveGameData(50, 5);
      expect(getBestScore()).toBe(100);
    });

    it('should save max tile when new tile is higher', () => {
      saveGameData(100, 5);
      expect(getMaxTile()).toBe(5);
    });

    it('should not update max tile when new tile is lower', () => {
      saveGameData(100, 5);
      saveGameData(200, 3);
      expect(getMaxTile()).toBe(5);
    });
  });

  describe('getBestScore', () => {
    it('should return 0 when no score is saved', () => {
      expect(getBestScore()).toBe(0);
    });

    it('should return saved best score', () => {
      saveGameData(150, 5);
      expect(getBestScore()).toBe(150);
    });
  });

  describe('getMaxTile', () => {
    it('should return 0 when no max tile is saved', () => {
      expect(getMaxTile()).toBe(0);
    });

    it('should return saved max tile', () => {
      saveGameData(100, 7);
      expect(getMaxTile()).toBe(7);
    });
  });

  describe('loadGameData', () => {
    it('should load both best score and max tile', () => {
      saveGameData(200, 8);
      const data = loadGameData();
      
      expect(data.bestScore).toBe(200);
      expect(data.maxTile).toBe(8);
    });

    it('should return zeros when no data exists', () => {
      const data = loadGameData();
      
      expect(data.bestScore).toBe(0);
      expect(data.maxTile).toBe(0);
    });
  });

  describe('clearGameData', () => {
    it('should clear all stored game data', () => {
      saveGameData(100, 5);
      clearGameData();
      
      expect(getBestScore()).toBe(0);
      expect(getMaxTile()).toBe(0);
    });
  });
});
