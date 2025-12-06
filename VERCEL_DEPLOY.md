# Vercel Deployment Guide - Option 2 (CLI)

## ✅ Setup Complete - Ready to Deploy!

Vercel CLI has been installed. Follow these steps to complete deployment:

## Step 1: Login to Vercel

```bash
cd /Users/ferryhinardi/Project/growing-number
vercel login
```

**What happens:**
1. A URL will be displayed (something like: https://vercel.com/oauth/device?user_code=XXXX-XXXX)
2. Press ENTER to open your browser
3. Login/signup to Vercel (you can use GitHub, GitLab, or email)
4. Confirm the authentication
5. Return to terminal - it should say "Success!"

## Step 2: Deploy to Production

After successful login, run:

```bash
vercel --prod
```

**What to expect:**
- Vercel will ask a few questions:
  - "Set up and deploy?" → **Yes**
  - "Which scope?" → Choose your account
  - "Link to existing project?" → **No** (unless you already created one)
  - "What's your project's name?" → **growing-number** (or press Enter for default)
  - "In which directory is your code located?" → **./** (press Enter)
  - Vercel will detect Next.js automatically
  - "Want to override settings?" → **No** (press Enter)

- Deployment will start:
  ```
  Uploading files...
  Building...
  Deploying...
  ```

- When complete, you'll see:
  ```
  ✅ Production: https://growing-number-xxx.vercel.app [copied to clipboard]
  ```

## Step 3: Test Your Deployment

1. Open the URL provided (e.g., `https://growing-number-xxx.vercel.app`)
2. The game should load and work perfectly!
3. Test on mobile to verify touch controls

## Alternative: One-Command Deploy (if already logged in)

If you're already logged in to Vercel:

```bash
cd /Users/ferryhinardi/Project/growing-number
vercel --prod
```

That's it! Vercel will handle everything.

## Post-Deployment

### Your Live URLs

After deployment, you'll have:
- **Production:** `https://growing-number-xxx.vercel.app`
- **Dashboard:** `https://vercel.com/your-username/growing-number`

### Automatic Deployments

Since your project is on GitHub, you can:

1. Go to Vercel dashboard
2. Click "Import Project"
3. Select `ferryhinardi/growing-number`
4. Every push to `main` will auto-deploy!

### Custom Domain (Optional)

1. Go to your project in Vercel dashboard
2. Click "Settings" → "Domains"
3. Add your custom domain (e.g., `growingnumber.com`)
4. Follow DNS setup instructions

## Troubleshooting

### "Not logged in"
```bash
vercel logout
vercel login
```

### "Build failed"
Check the build logs in Vercel dashboard. The local build works, so it should deploy fine.

### "Port already in use"
Make sure no local dev server is running:
```bash
pkill -f "next dev"
```

## Verification Checklist

After deployment, verify:
- [ ] Game loads without errors
- [ ] Tiles spawn correctly (2 tiles initially)
- [ ] Arrow keys move tiles
- [ ] Tiles merge when equal
- [ ] Score updates
- [ ] New Game button works
- [ ] Mobile touch controls work
- [ ] Best score persists after reload

## Quick Commands Reference

```bash
# Deploy to production
vercel --prod

# Deploy to preview (test environment)
vercel

# Check deployment status
vercel ls

# View logs
vercel logs <deployment-url>

# Open project in browser
vercel open
```

---

## 🎉 You're Almost There!

Just run `vercel login` and `vercel --prod` to deploy your game to production!

Your game will be live at a URL like: **https://growing-number-xxx.vercel.app**

---

**Need Help?**
- Vercel Docs: https://vercel.com/docs
- Vercel Support: https://vercel.com/support
