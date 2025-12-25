# React Native Mantine Documentation Site

This directory contains the GitHub Pages documentation website for React Native Mantine.

## Structure

- `index.html` - Main landing page with library overview, features, components, and quick start guide
- `.nojekyll` - Prevents GitHub Pages from processing files with Jekyll
- `CNAME` - Custom domain configuration (optional)

## Local Development

To preview the documentation locally:

```bash
# From the docs directory
npx serve .
```

Then open http://localhost:3000 in your browser.

Alternatively, you can use Python's built-in HTTP server:

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

## Deployment

The documentation is automatically deployed to GitHub Pages when changes are pushed to the main/master branch via GitHub Actions.

See [DEPLOYMENT.md](../DEPLOYMENT.md) for full deployment instructions.

## Features

The landing page includes:

- Responsive design optimized for all devices
- Component showcase with categorized listings
- Interactive code examples with copy-to-clipboard
- Installation and quick start guide
- Feature highlights and statistics
- Links to GitHub, NPM, and documentation

## Customization

### Updating Content

Edit `index.html` to update:
- Component listings
- Feature descriptions
- Installation instructions
- Links and references

### Styling

The page uses vanilla CSS with CSS variables for theming. Colors and styles can be customized in the `:root` section of `index.html`.

### Custom Domain

To use a custom domain:

1. Edit `CNAME` file with your domain
2. Configure DNS records
3. Enable custom domain in GitHub Pages settings

See [DEPLOYMENT.md](../DEPLOYMENT.md#custom-domain) for details.

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Static HTML with minimal JavaScript
- No external dependencies
- Optimized for fast loading
- Responsive images and layout

## Maintenance

When updating the documentation:

1. Make changes to `index.html`
2. Test locally
3. Commit and push to main branch
4. GitHub Actions will automatically deploy

## License

MIT - See [LICENSE](../LICENSE) for details.
