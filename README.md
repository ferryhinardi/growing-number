# Growing Number

An addictive number-merging puzzle game built with Next.js 14+. Merge tiles with equal values to create bigger numbers and achieve the highest score!

## Features

- **Addictive Gameplay**: Quick decision-making with smooth tile merging mechanics
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Smooth Animations**: Beautiful CSS transitions for tile movements and merges
- **Score Persistence**: Best scores and highest tiles saved in localStorage
- **Keyboard & Touch Support**: Play with arrow keys or swipe gestures
- **Clean Architecture**: Modular, maintainable code structure
- **Comprehensive Testing**: Full unit and integration test coverage
- **CI/CD Pipeline**: Automated testing and deployment with GitHub Actions

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Testing**: Jest + React Testing Library + Playwright
- **Styling**: CSS Modules with animations
- **CI/CD**: GitHub Actions
- **Deployment**: Vercel (optional)

## Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone git@github.com:ferryhinardi/growing-number.git
cd growing-number
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run unit tests
- `npm run test:watch` - Run unit tests in watch mode
- `npm run test:coverage` - Run unit tests with coverage report
- `npm run test:integration` - Run Playwright integration tests
- `npm run test:integration:ui` - Run Playwright tests with UI
- `npm run type-check` - Run TypeScript type checking

## How to Play

1. Use **arrow keys** (desktop) or **swipe gestures** (mobile) to move tiles
2. Tiles with the same number **merge** into one when they touch
3. Merged tiles increase in value (2 → 4 → 8 → 16 → ...)
4. Try to reach the highest number possible!
5. Game ends when the board is full and no merges are possible

## Project Structure

```
growing-number/
├── app/
│   ├── game/                 # Game components
│   │   ├── GameBoard.tsx     # Main game board
│   │   ├── GameBoard.css
│   │   ├── Tile.tsx          # Individual tile component
│   │   ├── Tile.css
│   │   ├── ScoreBoard.tsx    # Score display
│   │   ├── ScoreBoard.css
│   │   ├── GameOver.tsx      # Game over modal
│   │   ├── GameOver.css
│   │   ├── GameContainer.tsx # Main game container
│   │   └── GameContainer.css
│   ├── hooks/                # Custom React hooks
│   │   ├── useBoard.ts       # Board state management
│   │   ├── useGameManager.ts # Score & game state
│   │   └── useInput.ts       # Keyboard & touch input
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Home page
│   └── globals.css           # Global styles
├── lib/                      # Core game logic
│   ├── types.ts              # TypeScript types & utilities
│   ├── mergeLogic.ts         # Tile movement & merging
│   ├── randomTile.ts         # Tile spawning logic
│   └── storage.ts            # localStorage utilities
├── __tests__/                # Unit tests
│   ├── lib/                  # Logic tests
│   └── components/           # Component tests
├── e2e/                      # Integration tests
│   └── game.spec.ts          # Playwright tests
├── .github/
│   └── workflows/
│       └── ci-cd.yml         # GitHub Actions workflow
└── public/                   # Static assets
```

## Game Architecture

### Core Logic (`lib/`)

- **types.ts**: Type definitions, position conversions, helper functions
- **mergeLogic.ts**: Movement algorithms, merge detection, game over logic
- **randomTile.ts**: Tile spawning with probability distribution
- **storage.ts**: localStorage persistence for scores and stats

### Custom Hooks (`app/hooks/`)

- **useBoard**: Manages board state, tile positions, and movements
- **useGameManager**: Handles scoring, move counting, and game state
- **useInput**: Processes keyboard and touch input events

### Components (`app/game/`)

- **GameContainer**: Main game orchestrator
- **GameBoard**: Renders grid and tiles
- **Tile**: Individual tile with animations
- **ScoreBoard**: Displays score, best score, and moves
- **GameOver**: Game over modal with restart option

## Testing

### Unit Tests

Run all unit tests:

```bash
npm run test
```

Run with coverage:

```bash
npm run test:coverage
```

Coverage includes:
- Game logic (merge, movement, spawn)
- Utility functions
- Component rendering
- localStorage operations

### Integration Tests

Run Playwright tests:

```bash
npm run test:integration
```

Run with UI:

```bash
npm run test:integration:ui
```

Tests cover:
- Full gameplay flow
- Keyboard and touch interactions
- Score persistence
- Responsive design
- Game restart functionality

## CI/CD Pipeline

The project includes a comprehensive GitHub Actions workflow that:

1. **Linting**: Runs ESLint on every push/PR
2. **Type Checking**: Validates TypeScript types
3. **Unit Tests**: Runs Jest tests with coverage
4. **Integration Tests**: Runs Playwright tests
5. **Build**: Creates production build
6. **Deploy**: Deploys to Vercel (on main branch)

### Setting Up Deployment

To enable automatic deployment to Vercel:

1. Create a Vercel account and project
2. Get your Vercel tokens:
   - `VERCEL_TOKEN`: From Vercel account settings
   - `VERCEL_ORG_ID`: From your Vercel org settings
   - `VERCEL_PROJECT_ID`: From project settings

3. Add secrets to your GitHub repository:
   - Go to Settings → Secrets and variables → Actions
   - Add: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`

## Git Setup

Initialize and push to GitHub:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit - Growing Number game with complete test suite"

# Add remote
git remote add origin git@github.com:ferryhinardi/growing-number.git

# Push to main branch
git branch -M main
git push -u origin main
```

## Future Improvements

### Planned Features

1. **Themes & Skins**
   - Multiple color schemes
   - Dark mode support
   - Custom tile designs

2. **Leaderboards**
   - Global high scores
   - Daily/weekly challenges
   - Social sharing

3. **Daily Challenges**
   - Special puzzle modes
   - Time-limited challenges
   - Reward system

4. **Power-ups**
   - Undo move
   - Shuffle board
   - Remove tile
   - 2x score multiplier

5. **Game Modes**
   - Timed mode
   - Limited moves mode
   - Zen mode (no game over)
   - Different board sizes (5×5, 6×6)

6. **Analytics**
   - Move history
   - Strategy insights
   - Performance tracking

7. **Accessibility**
   - Screen reader support
   - High contrast mode
   - Keyboard navigation improvements

8. **Sound Effects**
   - Merge sounds
   - Background music
   - Achievement notifications

## Performance Optimization

- **Efficient Re-renders**: React hooks optimized with `useCallback` and `useMemo`
- **CSS Animations**: Hardware-accelerated transforms
- **Immutable State**: Prevents unnecessary re-renders
- **Code Splitting**: Next.js automatic code splitting
- **Lazy Loading**: Components loaded on demand

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Write tests for new features
- Follow existing code style
- Update documentation
- Ensure all tests pass before submitting PR

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Inspired by 2048 and similar number puzzle games
- Built with modern web technologies
- Designed for optimal user experience

## Contact

For questions or feedback, please open an issue on GitHub.

---

Built with ❤️ using Next.js
