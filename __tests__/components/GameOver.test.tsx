/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from '@testing-library/react';
import { GameOver } from '@/app/game/GameOver';

describe('GameOver Component', () => {
  const mockOnRestart = jest.fn();

  beforeEach(() => {
    mockOnRestart.mockClear();
  });

  it('should display game over title', () => {
    render(<GameOver score={100} maxTile={5} onRestart={mockOnRestart} />);
    expect(screen.getByText('Game Over!')).toBeInTheDocument();
  });

  it('should display final score', () => {
    render(<GameOver score={150} maxTile={5} onRestart={mockOnRestart} />);
    expect(screen.getByText('150')).toBeInTheDocument();
  });

  it('should display highest tile value', () => {
    render(<GameOver score={100} maxTile={6} onRestart={mockOnRestart} />);
    // maxTile 6 should display as 2^6 = 64
    expect(screen.getByText('64')).toBeInTheDocument();
  });

  it('should call onRestart when Play Again button is clicked', () => {
    render(<GameOver score={100} maxTile={5} onRestart={mockOnRestart} />);
    
    const button = screen.getByText('Play Again');
    fireEvent.click(button);
    
    expect(mockOnRestart).toHaveBeenCalledTimes(1);
  });

  it('should render restart button', () => {
    render(<GameOver score={100} maxTile={5} onRestart={mockOnRestart} />);
    expect(screen.getByText('Play Again')).toBeInTheDocument();
  });
});
