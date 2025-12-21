import { test, expect } from '@playwright/test';

test.describe('Growing Number Game', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');
  });

  test('should load game with title', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Growing Number');
  });

  test('should display initial game board', async ({ page }) => {
    const board = page.locator('.game-board');
    await expect(board).toBeVisible();

    // Should have 16 grid cells
    const gridCells = page.locator('.grid-cell');
    await expect(gridCells).toHaveCount(16);
  });

  test('should spawn 2 initial tiles', async ({ page }) => {
    // Wait a bit for tiles to render
    await page.waitForTimeout(500);
    
    const tiles = page.locator('.tile');
    const count = await tiles.count();
    expect(count).toBe(2);
  });

  test('should display scoreboard', async ({ page }) => {
    await expect(page.getByText('Score')).toBeVisible();
    await expect(page.locator('.score-label', { hasText: 'Best' })).toBeVisible();
    await expect(page.getByText('Moves')).toBeVisible();
  });

  test('should display New Game button', async ({ page }) => {
    const newGameButton = page.getByRole('button', { name: /new game/i });
    await expect(newGameButton).toBeVisible();
  });

  test('should display instructions', async ({ page }) => {
    const instructions = page.locator('.instructions');
    await expect(instructions).toBeVisible();
    await expect(instructions.getByText(/arrow keys or swipe/i)).toBeVisible();
  });

  test('should have responsive design', async ({ page }) => {
    // Test desktop size
    await page.setViewportSize({ width: 1200, height: 800 });
    await expect(page.locator('.game-board')).toBeVisible();
    
    // Test mobile size
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('.game-board')).toBeVisible();
  });
});
