/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import { Tile } from '@/app/game/Tile';
import { Tile as TileType } from '@/lib/types';

describe('Tile Component', () => {
  it('should render tile with correct display value', () => {
    const tile: TileType = {
      id: 'test-1',
      value: 3,
      position: 0,
    };

    render(<Tile tile={tile} />);
    
    // Value 3 should display as 2^3 = 8
    expect(screen.getByText('8')).toBeInTheDocument();
  });

  it('should render tile with value 1 as 2', () => {
    const tile: TileType = {
      id: 'test-1',
      value: 1,
      position: 0,
    };

    render(<Tile tile={tile} />);
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('should apply new tile class when isNew is true', () => {
    const tile: TileType = {
      id: 'test-1',
      value: 1,
      position: 0,
      isNew: true,
    };

    const { container } = render(<Tile tile={tile} />);
    const tileElement = container.querySelector('.tile-new');
    expect(tileElement).toBeInTheDocument();
  });

  it('should apply merged tile class when mergedFrom exists', () => {
    const tile: TileType = {
      id: 'test-1',
      value: 2,
      position: 0,
      mergedFrom: ['tile-1', 'tile-2'],
    };

    const { container } = render(<Tile tile={tile} />);
    const tileElement = container.querySelector('.tile-merged');
    expect(tileElement).toBeInTheDocument();
  });

  it('should set correct data-value attribute', () => {
    const tile: TileType = {
      id: 'test-1',
      value: 5,
      position: 0,
    };

    const { container } = render(<Tile tile={tile} />);
    const tileElement = container.querySelector('.tile');
    expect(tileElement).toHaveAttribute('data-value', '5');
  });
});
