# GitHub Configuration

This directory contains GitHub-specific configuration files for React Native Mantine.

## Contents

### Workflows (`/workflows`)

GitHub Actions workflows for CI/CD automation.

**`deploy-docs.yml`**
- Automatically deploys documentation to GitHub Pages
- Triggers on push to main/master branch
- Can be triggered manually via workflow_dispatch
- Deploys `/docs` directory
- Deployment time: ~1 minute

**`deploy-showcase.yml`**
- Builds and deploys interactive showcase (optional)
- Manual trigger only by default
- Builds Expo web version of example app
- Combines with documentation
- Deployment time: ~5-10 minutes

### Documentation

**`DEPLOYMENT_SUMMARY.md`**
- Overview of deployment architecture
- What has been set up
- How to use the deployment
- Technical details

**`DEPLOYMENT_CHECKLIST.md`**
- Step-by-step deployment checklist
- Pre-deployment verification
- Post-deployment validation
- Troubleshooting steps

## GitHub Pages Setup

The repository is configured for GitHub Pages deployment using GitHub Actions.

### How It Works

1. Changes pushed to main/master branch
2. `deploy-docs.yml` workflow triggers automatically
3. Workflow uploads `/docs` directory as artifact
4. GitHub Pages deploys the artifact
5. Site is live at: https://auronsan.github.io/react-native-mantine/

### First-Time Setup

1. Enable GitHub Pages:
   - Settings → Pages → Source: GitHub Actions

2. Configure workflow permissions:
   - Settings → Actions → General → Workflow permissions
   - Select "Read and write permissions"
   - Save

3. Push changes to trigger deployment

## Workflows Details

### deploy-docs.yml

```yaml
Trigger: push to main, workflow_dispatch
Jobs:
  - Checkout repository
  - Setup GitHub Pages
  - Upload docs artifact
  - Deploy to GitHub Pages
```

**Permissions:**
- contents: read
- pages: write
- id-token: write

### deploy-showcase.yml

```yaml
Trigger: workflow_dispatch (manual only)
Jobs:
  - Checkout repository
  - Setup Node.js
  - Install dependencies
  - Build Expo web
  - Prepare deployment (docs + showcase)
  - Deploy to GitHub Pages
```

**Permissions:**
- contents: read
- pages: write
- id-token: write

## Maintenance

### Updating Workflows

To update workflows:

1. Edit workflow files in this directory
2. Test changes in a feature branch first
3. Merge to main after verification

### Monitoring

Check workflow status:
- GitHub Actions tab
- https://github.com/auronsan/react-native-mantine/actions

## Resources

- [DEPLOYMENT.md](../DEPLOYMENT.md) - Full deployment guide
- [QUICK_START_DEPLOYMENT.md](../QUICK_START_DEPLOYMENT.md) - Quick start
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)

## Support

For issues with workflows or deployment:

1. Check workflow logs in Actions tab
2. Review [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)
3. Consult [DEPLOYMENT.md](../DEPLOYMENT.md)
4. Open issue on GitHub

---

Last Updated: December 2024
