# Setup Instructions for Growing Number

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the game.

### 3. Run Tests

```bash
# Unit tests
npm run test

# Integration tests (requires dev server to be running OR will start one automatically)
npm run test:integration

# All checks (lint, type-check, tests)
npm run lint
npm run type-check
npm run test
```

### 4. Build for Production

```bash
npm run build
npm run start
```

## Deployment to Vercel

### Option 1: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

### Option 2: GitHub Integration (Automatic)

1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository: `ferryhinardi/growing-number`
3. Vercel will automatically deploy on every push to `main`

### Option 3: GitHub Actions (Already Configured)

The project includes a GitHub Actions workflow that:
- Runs on every push to `main`
- Executes all tests
- Builds the project
- Deploys to Vercel (if secrets are configured)

To enable automatic deployment:

1. Get your Vercel tokens:
   - Go to Vercel → Settings → Tokens
   - Create a new token
   - Copy the token value

2. Get your project IDs:
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Link to your project
   vercel link
   
   # Get project info (this will show your org and project IDs)
   cat .vercel/project.json
   ```

3. Add GitHub Secrets:
   - Go to your GitHub repo → Settings → Secrets and variables → Actions
   - Add these secrets:
     - `VERCEL_TOKEN`: Your Vercel token
     - `VERCEL_ORG_ID`: Your Vercel org ID
     - `VERCEL_PROJECT_ID`: Your Vercel project ID

4. Push to main branch - GitHub Actions will automatically deploy!

## Manual Testing Checklist

Before deployment, manually test:

- [ ] Game loads without errors
- [ ] Initial tiles spawn (2 tiles)
- [ ] Arrow keys move tiles correctly
- [ ] Swipe gestures work on mobile
- [ ] Tiles merge when equal
- [ ] Score increases on merge
- [ ] New tile spawns after each move
- [ ] Game over triggers when board is full
- [ ] "New Game" button resets the game
- [ ] Best score persists after reload
- [ ] Responsive design works on mobile
- [ ] Animations are smooth
- [ ] No console errors

## Environment Variables

This project doesn't require any environment variables for basic functionality.

For analytics or additional features, you can add:

```bash
# .env.local (create this file)
NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

## Troubleshooting

### Build Fails

```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run build
```

### Tests Fail

```bash
# Clear Jest cache
npx jest --clearCache
npm run test
```

### Playwright Issues

```bash
# Reinstall browsers
npx playwright install --with-deps
npm run test:integration
```

## Performance Tips

1. **Enable Vercel Analytics**: Add `@vercel/analytics` for insights
2. **Add Error Tracking**: Integrate Sentry for error monitoring
3. **Enable Caching**: Vercel automatically handles this
4. **Optimize Images**: Use Next.js Image component if adding images

## Next Steps

After deployment:

1. Test on multiple devices
2. Share with friends for feedback
3. Monitor performance in Vercel dashboard
4. Consider adding features from README "Future Improvements"
