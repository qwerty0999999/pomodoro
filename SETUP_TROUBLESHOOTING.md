# 🔧 Study-Flow Dashboard - Setup & Troubleshooting

## ⚠️ Known Issue & Fix

### Issue: Turbopack Root Warning/Error

If you see warnings about multiple lockfiles or Tailwind resolution errors, follow this fix:

### ✅ Solution

The issue occurs when there are multiple package-lock.json files in parent directories.

**Option 1: Quick Fix (Recommended)**
```bash
# Navigate to project
cd "d:\a projek\study-flow"

# Clean and reinstall
rmdir node_modules -Force -Recurse  # Delete node_modules
rm package-lock.json                # Delete lock file
npm install                         # Reinstall clean

# Run dev server
npm run dev
```

**Option 2: Set Turbopack Root in Config**
The `next.config.ts` already includes this, but verify:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname, // or process.cwd()
  },
};

export default nextConfig;
```

**Option 3: Remove Parent Directory Lock Files**
```bash
# Remove lock files from parent directory
cd "d:\a projek"
rm -Force package-lock.json

# Go back to project
cd "d:\a projek\study-flow"
npm install
npm run dev
```

---

## 📋 Prerequisites Checklist

Before running the application, ensure you have:

### System Requirements
- [ ] Node.js v18+ installed
- [ ] npm or yarn package manager
- [ ] 500MB free disk space
- [ ] Modern web browser (Chrome, Firefox, Safari, Edge)

### Verify Installations
```bash
# Check Node.js version
node --version        # Should be v18.0.0 or higher

# Check npm version
npm --version         # Should be v9.0.0 or higher

# Check Node installation
npm list -g           # Lists global packages
```

---

## 🚀 Step-by-Step Setup Guide

### Step 1: Navigate to Project Directory
```bash
cd "d:\a projek\study-flow"
# or
cd "D:\a projek\study-flow"  # Either \ or / works
```

### Step 2: Install Dependencies
```bash
npm install

# Or with yarn
yarn install

# Expected output:
# up to date, audited X packages in Xs
```

### Step 3: Verify Dependencies
```bash
npm list

# Should show:
# study-flow@0.1.0
# ├── framer-motion@12.29.0
# ├── lucide-react@0.562.0
# ├── next@16.1.4
# ├── react@19.2.3
# ├── react-dom@19.2.3
# └── zustand@5.0.10
```

### Step 4: Start Development Server
```bash
npm run dev

# Expected output:
# ▲ Next.js 16.1.4 (Turbopack)
# - Local:         http://localhost:3000
# - Network:       http://192.168.x.x:3000
# ✓ Ready in 867ms
```

### Step 5: Open in Browser
```
http://localhost:3000
```

---

## 🐛 Troubleshooting Guide

### Problem 1: "npm command not found"

**Symptoms**:
```
'npm' is not recognized as an internal or external command
```

**Solutions**:
1. **Install Node.js**: Download from https://nodejs.org/
2. **Add to PATH**: 
   - Windows: Reinstall Node.js with "Add to PATH" option checked
   - Mac/Linux: `export PATH=$PATH:$(npm config get prefix)/bin`
3. **Restart terminal**: Close and reopen PowerShell/Command Prompt

---

### Problem 2: "Port 3000 already in use"

**Symptoms**:
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solutions**:
```bash
# Option 1: Kill process using port 3000
# Windows (PowerShell)
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process -Force

# Or use different port
npm run dev -- -p 3001
# Then open: http://localhost:3001
```

---

### Problem 3: "Cannot find module 'tailwindcss'"

**Symptoms**:
```
Error: Can't resolve 'tailwindcss' in 'D:\a projek'
```

**Solutions**:
```bash
# Clean reinstall
rm -r node_modules              # Delete node_modules folder
rm package-lock.json            # Delete lock file
npm install                     # Reinstall everything

# If issue persists
npm install tailwindcss@4 --save-dev
npm run dev
```

---

### Problem 4: Audio not playing

**Symptoms**:
- Ambient sound mixer shows but no audio plays
- No error in console

**Solutions**:
1. **Check browser permissions**:
   - Chrome: Settings → Privacy → Site Settings → Sound
   - Firefox: About:preferences → Privacy & Security

2. **Click Play button first**:
   - Modern browsers require user interaction before audio plays

3. **Check volume settings**:
   - Computer volume not muted
   - Browser volume not muted
   - Individual track volume > 0%

4. **Check internet connection**:
   - Audio streams from Mixkit (online service)
   - Offline = no audio playback

---

### Problem 5: Styling not showing (blank page)

**Symptoms**:
- Page loads but no styling/colors
- Only text visible

**Solutions**:
```bash
# Rebuild Tailwind CSS
rm -r .next                    # Delete build cache
npm run dev                    # Rebuild everything

# If still broken
npm install -D tailwindcss@4 postcss autoprefixer
npm run dev
```

---

### Problem 6: Timer not countdown

**Symptoms**:
- Timer shows but doesn't count down
- No updates when clicking Play

**Solutions**:
1. Check browser console (F12) for errors
2. Hard refresh: Ctrl+Shift+R
3. Check if timer interval is running:
   ```javascript
   // In browser console
   console.log('If timer is working')
   ```

---

### Problem 7: Tasks not saving after refresh

**Symptoms**:
- Tasks appear in matrix but disappear after page refresh
- Zustand state is lost

**Expected Behavior**: This is normal
- Tasks are stored in memory (not localStorage)
- To make persistent, implement localStorage:

```typescript
// Add to taskStore.ts
const storedTasks = localStorage.getItem('tasks')
// Initialize with stored data
```

---

## 🔍 Verification Checklist

After installation, verify everything works:

- [ ] npm install completed without errors
- [ ] `npm run dev` starts without errors
- [ ] http://localhost:3000 loads in browser
- [ ] Pomodoro timer is visible
- [ ] Matrix quadrants are visible
- [ ] Ambient mixer is visible
- [ ] Clicking Play button changes icon
- [ ] Adjusting volume slider works
- [ ] Adding task shows in matrix
- [ ] Deleting task removes from matrix

---

## 📊 System Requirements

### Minimum
- **OS**: Windows 7+, macOS 10.15+, Linux (any)
- **RAM**: 2GB
- **Disk**: 1GB free
- **Node**: v18.0.0+
- **npm**: v9.0.0+

### Recommended
- **OS**: Windows 11, macOS 12+, Ubuntu 20.04+
- **RAM**: 8GB+
- **Disk**: 10GB free
- **Node**: v20 LTS
- **npm**: v10+
- **Browser**: Chrome 120+, Firefox 121+

---

## 🔐 Network Requirements

### Required for Full Functionality
- **Internet connection**: For ambient sound streams
- **Mixkit access**: For audio files
  - Default URLs: `https://assets.mixkit.co/...`
  - No authentication required
  - Free & royalty-free

### Offline Limitations
- Timer works offline ✅
- Matrix works offline ✅
- Audio mixer cannot play sounds ❌

---

## 📝 Environment Variables

Create `.env.local` if needed (optional):

```bash
# .env.local
NEXT_PUBLIC_APP_NAME=Study-Flow
NEXT_PUBLIC_APP_VERSION=1.0.0

# Optional: Audio stream CDN (if using different provider)
# NEXT_PUBLIC_AUDIO_BASE_URL=https://your-cdn.com/audio
```

---

## 🚀 Performance Tips

### For Better Performance

1. **Use production build**:
   ```bash
   npm run build
   npm start
   ```

2. **Increase Node memory** (if slow):
   ```bash
   export NODE_OPTIONS=--max-old-space-size=4096
   npm run dev
   ```

3. **Clear cache regularly**:
   ```bash
   npm cache clean --force
   npm install
   ```

---

## 📚 Useful Commands

```bash
# Development
npm run dev              # Start dev server

# Production
npm run build            # Build for production
npm start               # Start production server

# Code quality
npm run lint            # Run ESLint

# Package management
npm install            # Install all dependencies
npm update             # Update all packages
npm list               # List installed packages

# Cleaning
npm cache clean --force # Clear npm cache
rm -r node_modules     # Delete node_modules
rm package-lock.json   # Delete lock file
rm -r .next            # Delete build cache
```

---

## 🌐 Browser DevTools

### Useful for Debugging

**Chrome/Edge (F12 or Ctrl+Shift+I)**:
1. **Console tab**: JavaScript errors/logs
2. **Network tab**: API/resource loading
3. **Application tab**: Local storage, cookies
4. **Performance tab**: Loading metrics

**Firefox (F12)**:
1. **Inspector**: DOM structure
2. **Console**: JavaScript output
3. **Network**: Request monitoring
4. **Storage**: Local data inspection

---

## 📞 Getting Help

### If You Get Stuck

1. **Check documentation**:
   - [README_NEW.md](README_NEW.md) - Project overview
   - [QUICK_START.md](QUICK_START.md) - Usage guide
   - [IMPLEMENTATION_GUIDE.md](IMPLEMENTATION_GUIDE.md) - Technical details

2. **Check browser console**:
   - Press F12
   - Look for error messages
   - Copy full error text

3. **Verify setup**:
   - Run `npm install` again
   - Check all dependencies installed
   - Verify Node.js version (v18+)

4. **Check internet**:
   - Audio requires internet connection
   - Test with: `ping google.com`

---

## ✅ Success Indicators

You'll know everything is working when you see:

✅ No red error messages in terminal  
✅ "✓ Ready in 867ms" message  
✅ http://localhost:3000 loads without errors  
✅ Pomodoro timer displays "25:00"  
✅ Matrix shows 4 colored quadrants  
✅ Mixer shows 4 audio tracks  
✅ All buttons respond to clicks  
✅ Smooth animations on interactions  

---

## 🎉 Ready to Go!

If you've completed all steps above, your Study-Flow Dashboard is ready to use!

```bash
npm run dev

# Then open: http://localhost:3000
```

**Enjoy focusing and staying productive!** 🚀📚✨

---

**Last Updated**: January 23, 2026  
**Version**: 1.0.0  
**Status**: Production Ready ✅
