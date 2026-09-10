// Prints the "Try it in Expo Snack" URL for snack/App.js.
// Snack's git import was retired, so the README link embeds the starter via query params.
// Usage: node scripts/snack-url.mjs
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const code = readFileSync(join(root, 'snack/App.js'), 'utf8');
const pkg = JSON.parse(readFileSync(join(root, 'snack/package.json'), 'utf8'));
// Pin the library to the exact released version so the demo matches what was tested
const libVersion = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')).version;
const deps = Object.entries(pkg.dependencies)
  .filter(([name]) => !['expo', 'react', 'react-native'].includes(name))
  .map(([name, version]) => `${name}@${name === 'react-native-mantine' ? libVersion : version}`)
  .join(',');
const sdk = (pkg.dependencies.expo || '').replace(/[^\d.]/g, '').split('.')[0];

const url = new URL('https://snack.expo.dev/');
url.searchParams.set('name', 'react-native-mantine');
url.searchParams.set('description', 'Mantine for React Native');
url.searchParams.set('platform', 'web');
if (sdk) url.searchParams.set('sdkVersion', `${sdk}.0.0`);
url.searchParams.set('dependencies', deps);
url.searchParams.set('code', code);
console.log(url.toString());
