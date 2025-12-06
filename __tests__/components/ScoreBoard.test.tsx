/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import { ScoreBoard } from '@/app/game/ScoreBoard';

describe('ScoreBoard Component', () => {
  it('should display current score', () => {
    render(<ScoreBoard score={100} bestScore={200} moves={10} />);
    expect(screen.getByText('100')).toBeInTheDocument();
  });

  it('should display best score', () => {
    render(<ScoreBoard score={100} bestScore={200} moves={10} />);
    expect(screen.getByText('200')).toBeInTheDocument();
  });

  it('should display moves count', () => {
    render(<ScoreBoard score={100} bestScore={200} moves={15} />);
    expect(screen.getByText('15')).toBeInTheDocument();
  });

  it('should display all labels', () => {
    render(<ScoreBoard score={100} bestScore={200} moves={10} />);
    expect(screen.getByText('Score')).toBeInTheDocument();
    expect(screen.getByText('Best')).toBeInTheDocument();
    expect(screen.getByText('Moves')).toBeInTheDocument();
  });
});
