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
