#!/usr/bin/env node

/**
 * Fix paths in the Expo web build for GitHub Pages deployment
 * This script updates absolute paths to be relative to the repository base path
 */

const fs = require('fs');
const path = require('path');

const BASE_PATH = '/react-native-mantine';
const DIST_DIR = path.join(__dirname, '..', 'dist');

function fixHtmlPaths(filePath) {
  console.log('Fixing paths in:', filePath);

  let content = fs.readFileSync(filePath, 'utf8');

  // Fix script and link tags with absolute paths
  content = content.replace(/href="\/([^"]+)"/g, `href="${BASE_PATH}/$1"`);
  content = content.replace(/src="\/([^"]+)"/g, `src="${BASE_PATH}/$1"`);

  // Add background color to body to ensure proper contrast for text on web
  // This prevents white/light text from being invisible on browsers with dark mode
  content = content.replace(
    /(body\s*{[^}]*overflow:\s*hidden;)/,
    '$1\n        /* Ensure proper background color for web */\n        background-color: #f8f9fa;'
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Fixed:', filePath);
}

function fixJsPaths(filePath) {
  console.log('Fixing paths in JS:', filePath);

  let content = fs.readFileSync(filePath, 'utf8');

  // Fix asset paths in JavaScript bundles (for fonts, images, etc.)
  // This regex looks for paths like "/assets/" and prefixes them with BASE_PATH
  content = content.replace(/(["|'])\/assets\//g, `$1${BASE_PATH}/assets/`);

  // Also fix _expo paths
  content = content.replace(/(["|'])\/_expo\//g, `$1${BASE_PATH}/_expo/`);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Fixed:', filePath);
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      processDirectory(filePath);
    } else if (file.endsWith('.html')) {
      fixHtmlPaths(filePath);
    } else if (file.endsWith('.js')) {
      fixJsPaths(filePath);
    }
  });
}

console.log('Fixing GitHub Pages paths...');
console.log('Base path:', BASE_PATH);
console.log('Dist directory:', DIST_DIR);

processDirectory(DIST_DIR);

// Create .nojekyll file to prevent GitHub Pages from processing as Jekyll site
const nojekyllPath = path.join(DIST_DIR, '.nojekyll');
fs.writeFileSync(nojekyllPath, '', 'utf8');
console.log('Created .nojekyll file');

console.log('Done! Paths have been fixed for GitHub Pages deployment.');
