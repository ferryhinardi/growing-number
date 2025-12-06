/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import { GameBoard } from '@/app/game/GameBoard';
import { Tile } from '@/lib/types';

describe('GameBoard Component', () => {
  it('should render grid with 16 cells', () => {
    const { container } = render(<GameBoard tiles={[]} />);
    const gridCells = container.querySelectorAll('.grid-cell');
    expect(gridCells).toHaveLength(16);
  });

  it('should render tiles', () => {
    const tiles: Tile[] = [
      { id: '1', value: 1, position: 0 },
      { id: '2', value: 2, position: 5 },
    ];

    const { container } = render(<GameBoard tiles={tiles} />);
    const tileElements = container.querySelectorAll('.tile');
    expect(tileElements).toHaveLength(2);
  });

  it('should render board container', () => {
    const { container } = render(<GameBoard tiles={[]} />);
    expect(container.querySelector('.game-board')).toBeInTheDocument();
  });
});
