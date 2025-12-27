# React Native Mantine - GitHub Pages Deployment

This document describes the setup and deployment process for the React Native Mantine example app to GitHub Pages.

## Overview

The React Native Mantine example app is built using Expo and react-native-web, allowing it to run as a web application. The app is automatically deployed to GitHub Pages using GitHub Actions whenever changes are pushed to the main branch.

## Live Demo

Once deployed, the app will be accessible at:
**https://auronsan.github.io/react-native-mantine/**

## Architecture

### Web Build Configuration

The app uses Expo's Metro bundler to create a production web build. Key configuration files:

- **`example/app.json`**: Expo configuration with web-specific settings
  - Name and slug updated for proper branding
  - Metro bundler configured for web output
  - Base URL set for GitHub Pages subdirectory deployment

- **`example/package.json`**: Build scripts
  - `web`: Start development server
  - `web:build`: Build production bundle and fix paths for GitHub Pages
  - `web:serve`: Serve the built app locally

### Path Handling

GitHub Pages hosts repositories at `https://username.github.io/repository-name/`, requiring all asset paths to include the repository name prefix. This is handled by:

1. **`example/scripts/fix-gh-pages-paths.js`**: Post-build script that:
   - Fixes absolute paths in HTML files to include `/react-native-mantine` prefix
   - Creates `.nojekyll` file to prevent Jekyll processing
   - Runs automatically after `expo export`

### Automated Deployment

**`.github/workflows/deploy-gh-pages.yml`**: GitHub Actions workflow that:

1. Triggers on:
   - Push to `main` branch (when `react-native-mantine/**` files change)
   - Manual workflow dispatch

2. Build steps:
   - Checkout code
   - Setup Node.js 18 with Yarn cache
   - Install dependencies
   - Build the library (`yarn prepare`)
   - Build the web app (`yarn web:build`)
   - Upload build artifacts

3. Deploy steps:
   - Deploy to GitHub Pages using official action
   - Uses GitHub's Pages deployment environment

## Manual Setup Steps

To enable GitHub Pages deployment for this repository, you need to configure the repository settings:

### 1. Enable GitHub Pages

1. Go to the repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under "Build and deployment":
   - **Source**: Select "GitHub Actions"
4. Save the settings

### 2. Configure Repository Permissions

Ensure the workflow has necessary permissions:
1. Go to **Settings** → **Actions** → **General**
2. Under "Workflow permissions":
   - Select "Read and write permissions"
   - Check "Allow GitHub Actions to create and approve pull requests"
3. Save the settings

### 3. Initial Deployment

After configuring the settings above:

1. Push any change to the `main` branch, or
2. Manually trigger the workflow:
   - Go to **Actions** → **Deploy React Native Mantine to GitHub Pages**
   - Click "Run workflow" → "Run workflow"

The first deployment may take 3-5 minutes. Subsequent deployments are faster due to caching.

## Local Development

### Prerequisites

- Node.js 18 or higher
- Yarn 3.6.1 (managed via Corepack)

### Setup

```bash
# Navigate to the example directory
cd react-native-mantine/example

# Install dependencies (if not already installed)
yarn install

# Start development server for web
yarn web

# Build for production
yarn web:build

# Serve production build locally
yarn web:serve
```

The development server runs at `http://localhost:8081` (or next available port).

### Testing Production Build Locally

```bash
# Build the app
yarn web:build

# Serve it locally
yarn web:serve
```

Then open `http://localhost:3000` in your browser. Note that locally served builds will have paths prefixed with `/react-native-mantine`, so some assets may not load correctly unless you serve from that path.

## Build Output

The build process creates a `dist/` directory with:

```
dist/
├── .nojekyll              # Prevents Jekyll processing
├── index.html             # Main HTML file with fixed paths
├── favicon.ico            # App icon
├── metadata.json          # Expo metadata
├── _expo/
│   └── static/
│       └── js/
│           └── web/
│               └── AppEntry-[hash].js   # Bundled JavaScript
└── assets/
    └── [fonts, images, icons]
```

## Troubleshooting

### Build Fails

**Issue**: Build fails with missing dependencies
```bash
# Solution: Rebuild the library first
cd react-native-mantine
yarn prepare
cd example
yarn web:build
```

**Issue**: Metro bundler errors
```bash
# Solution: Clear Metro cache
cd react-native-mantine/example
yarn start --clear
# Then in another terminal:
yarn web:build
```

### Deployment Fails

**Issue**: GitHub Actions workflow fails
- Check the Actions tab for detailed error logs
- Ensure repository has Pages enabled
- Verify workflow permissions are set correctly

**Issue**: App deploys but shows blank page
- Check browser console for errors
- Verify paths in `index.html` include `/react-native-mantine` prefix
- Ensure `.nojekyll` file exists in deployment

### Assets Not Loading

**Issue**: Fonts or images not loading on GitHub Pages
- Verify the `fix-gh-pages-paths.js` script ran successfully
- Check that asset paths in the deployed `index.html` have the correct prefix
- Ensure assets were uploaded in the GitHub Actions artifact

## Customization

### Changing Base Path

If deploying to a different repository or subdirectory, update the base path:

1. Edit `example/scripts/fix-gh-pages-paths.js`:
   ```javascript
   const BASE_PATH = '/your-repository-name';
   ```

2. Rebuild:
   ```bash
   yarn web:build
   ```

### Updating Deploy Triggers

To change when deployments occur, edit `.github/workflows/deploy-gh-pages.yml`:

```yaml
on:
  push:
    branches:
      - main
      - develop  # Add more branches
    paths:
      - 'react-native-mantine/**'
```

## Maintenance

### Updating Dependencies

```bash
cd react-native-mantine/example
yarn upgrade-interactive
```

After updating, test the build locally before pushing.

### Monitoring Deployments

- View deployment status: **Actions** tab in GitHub
- View deployment history: **Settings** → **Pages** → **Deployments**
- Current live version: Check `metadata.json` in deployed site

## Additional Resources

- [Expo Web Documentation](https://docs.expo.dev/workflow/web/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [React Native Web](https://necolas.github.io/react-native-web/)
- [GitHub Actions for Pages](https://github.com/actions/deploy-pages)

## Support

For issues specific to:
- **React Native Mantine**: Open an issue in this repository
- **Expo**: Check [Expo Documentation](https://docs.expo.dev/)
- **GitHub Pages**: See [GitHub Pages Help](https://docs.github.com/en/pages)
