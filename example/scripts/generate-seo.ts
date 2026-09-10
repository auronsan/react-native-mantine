/**
 * Post-build SEO for the GitHub Pages showcase.
 *
 * `expo export --platform web` produces a single client-rendered index.html,
 * which is invisible to crawlers and AI assistants that do not run JavaScript.
 * This script runs after the export and fix-gh-pages-paths.js and writes:
 *
 *  - dist/index.html               meta tags, Open Graph, JSON-LD, and a static
 *                                  HTML overview of every component (removed by
 *                                  a tiny inline script once the app mounts)
 *  - dist/components/<slug>/index.html   one pre-rendered page per component:
 *                                  description, usage snippet, props table
 *  - dist/categories/<slug>/index.html   one page per category
 *  - dist/404.html                 copy of the home page so unknown paths boot the app
 *  - dist/sitemap.xml
 *  - dist/llms.txt, dist/llms-full.txt   https://llmstxt.org format for LLMs
 *
 * Run: node --no-warnings --experimental-strip-types scripts/generate-seo.ts
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { componentCategories } from '../src/navigation/componentData.ts';
import { categoryPath, componentPath, SITE_URL, toSlug } from '../src/navigation/slugs.ts';

const here = dirname(fileURLToPath(import.meta.url));
const exampleDir = join(here, '..');
const repoDir = join(exampleDir, '..');
const dist = join(exampleDir, 'dist');
const pkg = JSON.parse(readFileSync(join(repoDir, 'package.json'), 'utf8'));

const SITE_NAME = 'React Native Mantine';
const REPO_URL = 'https://github.com/auronsan/react-native-mantine';
const NPM_URL = 'https://www.npmjs.com/package/react-native-mantine';
const OG_IMAGE = `${SITE_URL}/og-image.png`;

type PropDef = { name: string; type: string; description: string; default?: string; required?: boolean };
type Comp = { name: string; description: string; route: string; category: string; slug: string; url: string };

const components: Comp[] = componentCategories.flatMap((c) =>
  c.components.map((comp) => ({
    ...comp,
    category: c.title,
    slug: toSlug(comp.name),
    url: `${SITE_URL}/${componentPath(comp.name)}/`,
  }))
);
const componentCount = components.length;
const DESCRIPTION = `Mantine for React Native: ${componentCount} themeable, accessible components for iOS, Android and Web with Mantine's theme system, variants and useForm API. Works with Expo and bare React Native.`;

// ---------------------------------------------------------------------------
// Data: usage snippets and props from the example app sources
// ---------------------------------------------------------------------------

const exampleFiles = new Map<string, string>();
for (const dir of readdirSync(join(exampleDir, 'src/examples'), { withFileTypes: true })) {
  if (!dir.isDirectory()) continue;
  for (const file of readdirSync(join(exampleDir, 'src/examples', dir.name))) {
    if (file.endsWith('Example.tsx')) {
      exampleFiles.set(file.replace('.tsx', ''), join(exampleDir, 'src/examples', dir.name, file));
    }
  }
}

function usageSnippet(route: string): string | undefined {
  const file = exampleFiles.get(route);
  if (!file) return undefined;
  const source = readFileSync(file, 'utf8');
  const match = source.match(/<CodeBlock[\s\S]*?code=\{`([\s\S]*?)`\}/);
  return match?.[1]?.trim();
}

async function propsFor(name: string): Promise<PropDef[]> {
  const file = join(exampleDir, 'src/data/props', `${name}Props.ts`);
  if (!existsSync(file)) return [];
  const mod = await import(pathToFileURL(file).href);
  const arr = Object.values(mod).find((v) => Array.isArray(v)) as PropDef[] | undefined;
  return arr ?? [];
}

// ---------------------------------------------------------------------------
// HTML helpers
// ---------------------------------------------------------------------------

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function head(opts: { title: string; description: string; url: string; jsonLd: object }): string {
  return `
    <title>${esc(opts.title)}</title>
    <meta name="description" content="${esc(opts.description)}" />
    <meta name="keywords" content="react native, expo, ui library, component library, mantine, design system, ios, android, react native web, typescript" />
    <meta name="author" content="auronsan" />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <meta name="theme-color" content="#228be6" />
    <link rel="canonical" href="${opts.url}" />
    <link rel="alternate" type="text/plain" href="${SITE_URL}/llms.txt" title="LLM-friendly documentation" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${SITE_NAME}" />
    <meta property="og:title" content="${esc(opts.title)}" />
    <meta property="og:description" content="${esc(opts.description)}" />
    <meta property="og:url" content="${opts.url}" />
    <meta property="og:image" content="${OG_IMAGE}" />
    <meta property="og:image:width" content="1800" />
    <meta property="og:image:height" content="840" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(opts.title)}" />
    <meta name="twitter:description" content="${esc(opts.description)}" />
    <meta name="twitter:image" content="${OG_IMAGE}" />
    <script type="application/ld+json">${JSON.stringify(opts.jsonLd)}</script>
    <style>
      /* Static content is visible until the app mounts; let it scroll. */
      body:has(#seo-static) { overflow: auto; }
      #seo-static { max-width: 960px; margin: 0 auto; padding: 24px; font: 16px/1.55 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; color: #212529; }
      #seo-static h1, #seo-static h2, #seo-static h3 { font-weight: 600; }
      #seo-static a { color: #228be6; }
      #seo-static pre { background: #f1f3f5; padding: 12px; border-radius: 8px; overflow-x: auto; font-size: 14px; }
      #seo-static table { border-collapse: collapse; width: 100%; font-size: 14px; }
      #seo-static th, #seo-static td { text-align: left; padding: 6px 8px; border-bottom: 1px solid #dee2e6; vertical-align: top; }
      #seo-static code { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; }
    </style>`;
}

// Removes the static block as soon as the React app has rendered.
const REMOVE_STATIC_SCRIPT = `
    <script>
      (function () {
        var root = document.getElementById('root');
        var seo = document.getElementById('seo-static');
        if (!root || !seo) return;
        var obs = new MutationObserver(function () {
          if (root.childElementCount > 0) { seo.remove(); obs.disconnect(); }
        });
        obs.observe(root, { childList: true });
      })();
    </script>`;

const softwareJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareSourceCode',
  name: 'react-native-mantine',
  alternateName: SITE_NAME,
  description: DESCRIPTION,
  url: SITE_URL,
  codeRepository: REPO_URL,
  programmingLanguage: 'TypeScript',
  runtimePlatform: 'React Native',
  license: 'https://opensource.org/licenses/MIT',
  version: pkg.version,
  author: { '@type': 'Person', name: 'auronsan', url: 'https://github.com/auronsan' },
  keywords: 'react native, expo, ui library, component library, mantine, design system',
};

function homeStatic(): string {
  const sections = componentCategories
    .map(
      (c) => `
      <section>
        <h2 id="${toSlug(c.title)}"><a href="${SITE_URL}/${categoryPath(c.title)}/">${esc(c.title)}</a></h2>
        <p>${esc(c.description)}</p>
        <ul>${c.components
          .map((comp) => `<li><a href="${SITE_URL}/${componentPath(comp.name)}/"><code>${esc(comp.name)}</code></a> – ${esc(comp.description)}</li>`)
          .join('')}</ul>
      </section>`
    )
    .join('');
  return `
    <main id="seo-static">
      <h1>${SITE_NAME}</h1>
      <p>${esc(DESCRIPTION)}</p>
      <p><a href="${REPO_URL}">GitHub</a> · <a href="${NPM_URL}">npm</a> · <a href="${SITE_URL}/llms.txt">llms.txt</a> · Version ${esc(pkg.version)}</p>
      <h2>Installation</h2>
      <pre><code>npm install react-native-mantine</code></pre>
      <pre><code>import { Theme, Button } from 'react-native-mantine';

export default function App() {
  return (
    &lt;Theme&gt;
      &lt;Button variant="filled"&gt;Hello Mantine&lt;/Button&gt;
    &lt;/Theme&gt;
  );
}</code></pre>
      <h2>Components</h2>
      ${sections}
    </main>`;
}

function componentStatic(comp: Comp, snippet: string | undefined, props: PropDef[]): string {
  const propsTable = props.length
    ? `<h2>Props</h2>
      <table>
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>${props
          .map(
            (p) =>
              `<tr><td><code>${esc(p.name)}</code>${p.required ? ' <small>(required)</small>' : ''}</td><td><code>${esc(p.type)}</code></td><td>${p.default ? `<code>${esc(p.default)}</code>` : ''}</td><td>${esc(p.description)}</td></tr>`
          )
          .join('')}</tbody>
      </table>`
    : '';
  return `
    <main id="seo-static">
      <p><a href="${SITE_URL}/">${SITE_NAME}</a> › <a href="${SITE_URL}/${categoryPath(comp.category)}/">${esc(comp.category)}</a></p>
      <h1>${esc(comp.name)}</h1>
      <p>${esc(comp.description)}</p>
      <p>Import: <code>import { ${esc(comp.name)} } from 'react-native-mantine';</code></p>
      ${snippet ? `<h2>Usage</h2><pre><code>${esc(snippet)}</code></pre>` : ''}
      ${propsTable}
      <p><a href="${REPO_URL}">Source on GitHub</a> · <a href="${NPM_URL}">npm</a></p>
    </main>`;
}

function categoryStatic(title: string, description: string, comps: Comp[]): string {
  return `
    <main id="seo-static">
      <p><a href="${SITE_URL}/">${SITE_NAME}</a></p>
      <h1>${esc(title)}</h1>
      <p>${esc(description)}</p>
      <ul>${comps.map((c) => `<li><a href="${c.url}"><code>${esc(c.name)}</code></a> – ${esc(c.description)}</li>`).join('')}</ul>
    </main>`;
}

// ---------------------------------------------------------------------------
// Page assembly
// ---------------------------------------------------------------------------

const template = readFileSync(join(dist, 'index.html'), 'utf8');
if (template.includes('id="seo-static"')) {
  console.error('dist/index.html already contains SEO output; run `yarn web:build` for a fresh export first.');
  process.exit(1);
}

function renderPage(opts: { title: string; description: string; url: string; jsonLd: object; body: string }): string {
  let html = template.replace(/<title>[\s\S]*?<\/title>/, '');
  html = html.replace('</head>', `${head(opts)}\n  </head>`);
  html = html.replace(/<noscript>[\s\S]*?<\/noscript>/, '');
  html = html.replace('<div id="root"></div>', `${opts.body}\n    <div id="root"></div>${REMOVE_STATIC_SCRIPT}`);
  return html;
}

function writePage(relDir: string, html: string) {
  const dir = join(dist, relDir);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), html);
}

async function main() {
  const urls: { loc: string; priority: string }[] = [{ loc: `${SITE_URL}/`, priority: '1.0' }];

  // Home + 404 fallback
  const home = renderPage({
    title: `${SITE_NAME} – ${componentCount} Mantine components for React Native, Expo and Web`,
    description: DESCRIPTION,
    url: `${SITE_URL}/`,
    jsonLd: { ...softwareJsonLd, '@type': ['SoftwareSourceCode', 'WebSite'] },
    body: homeStatic(),
  });
  writeFileSync(join(dist, 'index.html'), home);
  writeFileSync(join(dist, '404.html'), home);

  // Categories
  for (const c of componentCategories) {
    const comps = components.filter((x) => x.category === c.title);
    const url = `${SITE_URL}/${categoryPath(c.title)}/`;
    writePage(
      categoryPath(c.title),
      renderPage({
        title: `${c.title} components – ${SITE_NAME}`,
        description: `${c.description}. ${comps.map((x) => x.name).join(', ')}.`,
        url,
        jsonLd: { '@context': 'https://schema.org', '@type': 'CollectionPage', name: c.title, description: c.description, url, isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL } },
        body: categoryStatic(c.title, c.description, comps),
      })
    );
    urls.push({ loc: url, priority: '0.7' });
  }

  // Components + llms-full sections
  const llmsSections: string[] = [];
  for (const comp of components) {
    const snippet = usageSnippet(comp.route);
    const props = await propsFor(comp.name);
    writePage(
      componentPath(comp.name),
      renderPage({
        title: `${comp.name} – ${SITE_NAME}`,
        description: `${comp.name}: ${comp.description}. React Native component from react-native-mantine, with usage example and props.`,
        url: comp.url,
        jsonLd: { '@context': 'https://schema.org', '@type': 'TechArticle', headline: `${comp.name} component`, description: comp.description, url: comp.url, about: { '@type': 'SoftwareSourceCode', name: 'react-native-mantine', codeRepository: REPO_URL }, isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL } },
        body: componentStatic(comp, snippet, props),
      })
    );
    urls.push({ loc: comp.url, priority: '0.8' });

    const propLines = props.map(
      (p) => `- \`${p.name}\`${p.required ? ' (required)' : ''}: \`${p.type}\`${p.default ? ` (default: \`${p.default}\`)` : ''} – ${p.description}`
    );
    llmsSections.push(
      [
        `### ${comp.name}`,
        '',
        `${comp.description}. Category: ${comp.category}. Docs: ${comp.url}`,
        '',
        `\`import { ${comp.name} } from 'react-native-mantine';\``,
        ...(snippet ? ['', '```tsx', snippet, '```'] : []),
        ...(propLines.length ? ['', 'Props:', ...propLines] : []),
      ].join('\n')
    );
  }

  // Sitemap
  const today = new Date().toISOString().slice(0, 10);
  writeFileSync(
    join(dist, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
      .map((u) => `  <url><loc>${u.loc}</loc><lastmod>${today}</lastmod><priority>${u.priority}</priority></url>`)
      .join('\n')}\n</urlset>\n`
  );

  // llms.txt (index) and llms-full.txt (everything)
  const llmsIndex = [
    `# ${SITE_NAME}`,
    '',
    `> ${DESCRIPTION}`,
    '',
    `react-native-mantine (npm) is a React Native port of the Mantine UI library. Version ${pkg.version}. MIT license. Author: auronsan. Repository: ${REPO_URL}. npm: ${NPM_URL}.`,
    '',
    'Install with `npm install react-native-mantine`, wrap the app in `<Theme>` (or `<ThemeProvider>`), then import components such as `Button`, `TextInput`, `Select`, `Modal`, `Stepper`, `Tree`, `TransferList` from `react-native-mantine`. Icons, gradients, clipboard, document picking and fonts are optional adapters passed via `<Theme adapters={...}>` or `configureMantine()`. The theme (colors, spacing, radius, shadows, variants, `useForm`) follows Mantine so web and mobile apps can share tokens.',
    '',
    '## Docs',
    '',
    `- [Full documentation for LLMs](${SITE_URL}/llms-full.txt): every component with description, usage snippet and props`,
    `- [README](${REPO_URL}#readme): installation, theming, adapters, hooks`,
    `- [Changelog](${REPO_URL}/blob/main/CHANGELOG.md)`,
    '',
    '## Components',
    '',
    ...componentCategories.map(
      (c) => `- ${c.title}: ${c.components.map((x) => `[${x.name}](${SITE_URL}/${componentPath(x.name)}/)`).join(', ')}`
    ),
    '',
    '## Optional',
    '',
    `- [Interactive showcase](${SITE_URL}/): the same pages rendered by the React Native Web app`,
    '',
  ].join('\n');
  writeFileSync(join(dist, 'llms.txt'), llmsIndex);

  const readme = readFileSync(join(repoDir, 'README.md'), 'utf8')
    .replace(/<div align="center">[\s\S]*?<\/div>\n/, '') // hero/badges block
    .replace(/<img[^>]*>/g, '');
  writeFileSync(
    join(dist, 'llms-full.txt'),
    [
      `# ${SITE_NAME} – full documentation`,
      '',
      `> ${DESCRIPTION}`,
      '',
      `Version ${pkg.version}. Repository: ${REPO_URL}. npm: ${NPM_URL}. Showcase: ${SITE_URL}/`,
      '',
      '## Guide (from README)',
      '',
      readme.trim(),
      '',
      '## Component reference',
      '',
      `${componentCount} components. Each entry lists the description, a usage snippet from the showcase, and the props table.`,
      '',
      llmsSections.join('\n\n'),
      '',
    ].join('\n')
  );

  console.log(`SEO: wrote ${components.length} component pages, ${componentCategories.length} category pages, sitemap (${urls.length} urls), llms.txt, llms-full.txt`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
