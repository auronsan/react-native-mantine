/**
 * generate-props.ts
 *
 * Generates `example/src/data/props/<Name>Props.ts` (the `PropDefinition[]`
 * data consumed by the example app's `PropsTable`) from the exported
 * `<Name>Props` interface of `src/components/<Name>`.
 *
 * Usage (Node >= 22.6 strips types natively; `npx tsx` also works):
 *
 *   node scripts/generate-props.ts                 # every example component missing a props file
 *   node scripts/generate-props.ts Modal Drawer    # only these components
 *   node scripts/generate-props.ts --dry-run       # print what would be written
 *   node scripts/generate-props.ts --force Modal   # overwrite an existing props file
 *
 * The script is idempotent: existing props files are never overwritten unless
 * `--force` is passed, so hand-edited descriptions survive re-runs.
 *
 * What is extracted for every property of `<Name>Props` (own + inherited from
 * interfaces declared inside this repo's `src/`; props inherited from
 * react-native / react typings are skipped on purpose):
 *   - name
 *   - type        the type annotation as written in source (whitespace collapsed)
 *   - description JSDoc comment on the property, or a heuristic fallback
 *   - default     `defaultProps` object in the component file, destructuring
 *                 defaults of the component function, or a `@default` JSDoc tag
 *   - required    the property is not optional
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const COMPONENTS_DIR = path.join(ROOT, 'src', 'components');
const EXAMPLES_DIR = path.join(ROOT, 'example', 'src', 'examples');
const OUTPUT_DIR = path.join(ROOT, 'example', 'src', 'data', 'props');

/**
 * Members of the shared `DefaultProps` interface that are web carry-overs no
 * React Native component reads. They are omitted from generated tables, which
 * matches the hand-written props files.
 */
const IGNORED_INHERITED_PROPS = new Set(['className', 'sx', 'unstyled']);

interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

interface GeneratedProp extends PropDefinition {
  /** true when the description was produced by a heuristic, not a JSDoc comment */
  heuristicDescription: boolean;
  /** absolute path of the file declaring the property */
  declaredIn: string;
}

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------

const argv = process.argv.slice(2);
const force = argv.includes('--force');
const dryRun = argv.includes('--dry-run');
const requested = argv.filter((a) => !a.startsWith('--'));

// ---------------------------------------------------------------------------
// Target discovery
// ---------------------------------------------------------------------------

function listExampleComponentNames(): string[] {
  const names = new Set<string>();
  for (const category of fs.readdirSync(EXAMPLES_DIR, { withFileTypes: true })) {
    if (!category.isDirectory()) continue;
    for (const file of fs.readdirSync(path.join(EXAMPLES_DIR, category.name))) {
      const match = /^([A-Z][A-Za-z0-9]*)Example\.tsx$/.exec(file);
      if (match?.[1]) names.add(match[1]);
    }
  }
  return [...names].sort();
}

function resolveComponentEntry(name: string): string | undefined {
  const dir = path.join(COMPONENTS_DIR, name);
  if (!fs.existsSync(dir)) return undefined;
  for (const candidate of ['index.tsx', 'index.ts', `${name}.tsx`, `${name}.ts`]) {
    const file = path.join(dir, candidate);
    if (fs.existsSync(file)) return file;
  }
  return undefined;
}

function outputFileFor(name: string): string {
  return path.join(OUTPUT_DIR, `${name}Props.ts`);
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function collapse(text: string): string {
  return text.replace(/\s+/g, ' ').trim();
}

/** Collapses a type annotation and drops the leading `|` of multi-line unions. */
function collapseType(text: string): string {
  return collapse(text).replace(/^\|\s*/, '');
}

function lowerFirst(text: string): string {
  return text.charAt(0).toLowerCase() + text.slice(1);
}

function humanize(name: string): string {
  return name
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    .toLowerCase();
}

/** Quote a string the way the hand-written props files do. */
function quote(text: string): string {
  if (text.includes("'") && !text.includes('"')) {
    return `"${text.replace(/\\/g, '\\\\')}"`;
  }
  return `'${text.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
}

function isInsideRepoSrc(fileName: string): boolean {
  const normalized = path.resolve(fileName);
  return (
    normalized.startsWith(path.join(ROOT, 'src') + path.sep) &&
    !normalized.includes(`${path.sep}node_modules${path.sep}`)
  );
}

function heuristicDescription(prop: { name: string; type: string; required: boolean }): string {
  const { name, type } = prop;
  const words = humanize(name);

  if (name === 'children') return 'Content rendered inside the component';
  if (name === 'style') return 'Additional styles applied to the root element';
  if (name === 'className') return 'Class name applied to the root element (web only)';
  if (name === 'sx') return 'Style overrides merged into the root element styles';
  if (name === 'unstyled') return 'Removes all default component styles';
  if (name === 'testID') return 'Test identifier used by testing frameworks';
  if (/^on[A-Z]/.test(name)) {
    return `Called when ${humanize(name.slice(2))} occurs`;
  }
  if (/^with[A-Z]/.test(name)) {
    return `Whether to render ${humanize(name.slice(4))}`;
  }
  if (type === 'boolean') {
    return `Whether the component is ${words}`;
  }
  return `Sets the ${words}`;
}

// ---------------------------------------------------------------------------
// Default value extraction
// ---------------------------------------------------------------------------

function formatDefaultText(node: ts.Expression, sourceFile: ts.SourceFile): string {
  const text = collapse(node.getText(sourceFile));
  if (text.length > 80) return `${text.slice(0, 77)}...`;
  return text;
}

/**
 * Collects `name -> default text` from:
 *   1. `const defaultProps: Partial<XProps> = { ... }` object literals
 *   2. destructuring defaults of the component function
 *      (`function Gradient({ fill = true }: GradientProps)`)
 */
function collectDefaults(
  sourceFile: ts.SourceFile,
  componentName: string,
  propsTypeName: string
): Map<string, string> {
  const defaults = new Map<string, string>();
  const fromDestructuring = new Map<string, string>();

  const functionBelongsToComponent = (fn: ts.SignatureDeclaration): boolean => {
    const firstParam = fn.parameters[0];
    if (firstParam?.type && firstParam.type.getText(sourceFile).includes(propsTypeName)) {
      return true;
    }
    if (ts.isFunctionDeclaration(fn) && fn.name?.text === componentName) return true;
    // `const Name = forwardRef<...>((props) => ...)` / `const Name = (props) => ...`
    let current: ts.Node | undefined = fn.parent;
    while (current) {
      if (ts.isVariableDeclaration(current)) {
        return ts.isIdentifier(current.name) && current.name.text === componentName;
      }
      if (ts.isFunctionLike(current) || ts.isSourceFile(current)) break;
      current = current.parent;
    }
    return false;
  };

  const visit = (node: ts.Node) => {
    if (
      ts.isVariableDeclaration(node) &&
      ts.isIdentifier(node.name) &&
      node.name.text === 'defaultProps' &&
      node.initializer &&
      ts.isObjectLiteralExpression(node.initializer)
    ) {
      for (const property of node.initializer.properties) {
        if (ts.isPropertyAssignment(property)) {
          const key = ts.isIdentifier(property.name) || ts.isStringLiteral(property.name)
            ? property.name.text
            : property.name.getText(sourceFile);
          defaults.set(key, formatDefaultText(property.initializer, sourceFile));
        } else if (ts.isShorthandPropertyAssignment(property)) {
          defaults.set(property.name.text, property.name.text);
        }
      }
    }

    if (
      (ts.isFunctionDeclaration(node) || ts.isArrowFunction(node) || ts.isFunctionExpression(node)) &&
      node.parameters[0] &&
      ts.isObjectBindingPattern(node.parameters[0].name) &&
      functionBelongsToComponent(node)
    ) {
      for (const element of node.parameters[0].name.elements) {
        if (element.initializer && ts.isIdentifier(element.name)) {
          const key = element.propertyName
            ? element.propertyName.getText(sourceFile)
            : element.name.text;
          fromDestructuring.set(key, formatDefaultText(element.initializer, sourceFile));
        }
      }
    }

    ts.forEachChild(node, visit);
  };
  visit(sourceFile);

  for (const [key, value] of fromDestructuring) {
    if (!defaults.has(key)) defaults.set(key, value);
  }
  return defaults;
}

// ---------------------------------------------------------------------------
// Props extraction
// ---------------------------------------------------------------------------

function findPropsSymbol(
  checker: ts.TypeChecker,
  sourceFile: ts.SourceFile,
  propsTypeName: string
): ts.Symbol | undefined {
  const moduleSymbol = checker.getSymbolAtLocation(sourceFile);
  if (!moduleSymbol) return undefined;
  const exported = checker
    .getExportsOfModule(moduleSymbol)
    .find((symbol) => symbol.getName() === propsTypeName);
  if (!exported) return undefined;
  return exported.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(exported) : exported;
}

function typeTextFor(checker: ts.TypeChecker, symbol: ts.Symbol, decl: ts.Declaration): string {
  if ((ts.isPropertySignature(decl) || ts.isPropertyDeclaration(decl)) && decl.type) {
    return collapseType(decl.type.getText(decl.getSourceFile()));
  }
  if (ts.isMethodSignature(decl)) {
    const params = decl.parameters.map((p) => collapse(p.getText(decl.getSourceFile()))).join(', ');
    const returnType = decl.type ? collapseType(decl.type.getText(decl.getSourceFile())) : 'void';
    return `(${params}) => ${returnType}`;
  }
  const type = checker.getTypeOfSymbolAtLocation(symbol, decl);
  return collapseType(
    checker.typeToString(type, decl, ts.TypeFormatFlags.NoTruncation | ts.TypeFormatFlags.UseAliasDefinedOutsideCurrentScope)
  );
}

function jsDocDefault(decl: ts.Declaration): string | undefined {
  for (const tag of ts.getJSDocTags(decl)) {
    if (tag.tagName.text === 'default' || tag.tagName.text === 'defaultValue') {
      const text = ts.getTextOfJSDocComment(tag.comment);
      if (text) return collapse(text);
    }
  }
  return undefined;
}

function extractProps(
  program: ts.Program,
  componentName: string,
  entryFile: string
): GeneratedProp[] | undefined {
  const checker = program.getTypeChecker();
  const entrySource = program.getSourceFile(entryFile);
  if (!entrySource) throw new Error(`Could not load ${entryFile}`);

  const propsTypeName = `${componentName}Props`;
  const propsSymbol = findPropsSymbol(checker, entrySource, propsTypeName);
  const propsDecl = propsSymbol?.declarations?.[0];
  if (!propsSymbol || !propsDecl) return undefined;

  const declSource = propsDecl.getSourceFile();
  const defaults = collectDefaults(declSource, componentName, propsTypeName);
  if (declSource.fileName !== entrySource.fileName) {
    for (const [key, value] of collectDefaults(entrySource, componentName, propsTypeName)) {
      if (!defaults.has(key)) defaults.set(key, value);
    }
  }

  const type = checker.getDeclaredTypeOfSymbol(propsSymbol);
  const own: GeneratedProp[] = [];
  const inherited: GeneratedProp[] = [];

  for (const member of checker.getPropertiesOfType(type)) {
    const decl = member.valueDeclaration ?? member.declarations?.[0];
    if (!decl) continue;
    const declFile = decl.getSourceFile().fileName;
    if (!isInsideRepoSrc(declFile)) continue; // react-native / react typings

    const name = member.getName();
    const isOwn = path.resolve(declFile) === path.resolve(declSource.fileName);
    if (!isOwn && IGNORED_INHERITED_PROPS.has(name)) continue;
    const required = !(member.flags & ts.SymbolFlags.Optional);
    const typeText = typeTextFor(checker, member, decl);
    const doc = collapse(ts.displayPartsToString(member.getDocumentationComment(checker)));
    const defaultValue = defaults.get(name) ?? jsDocDefault(decl);

    const prop: GeneratedProp = {
      name,
      type: typeText,
      description: doc || heuristicDescription({ name, type: typeText, required }),
      heuristicDescription: !doc,
      required,
      declaredIn: declFile,
      ...(defaultValue !== undefined ? { default: defaultValue } : {}),
    };

    (isOwn ? own : inherited).push(prop);
  }

  return [...own, ...inherited];
}

// ---------------------------------------------------------------------------
// Emit
// ---------------------------------------------------------------------------

function renderPropsFile(componentName: string, entryFile: string, props: GeneratedProp[]): string {
  const exportName = `${lowerFirst(componentName)}Props`;
  const relativeEntry = path.relative(ROOT, entryFile).split(path.sep).join('/');

  const lines: string[] = [];
  lines.push(`// Generated from ${relativeEntry} by scripts/generate-props.ts.`);
  lines.push('// Safe to edit: the generator does not overwrite this file unless run with --force.');
  lines.push('');
  lines.push('export interface PropDefinition {');
  lines.push('  name: string;');
  lines.push('  type: string;');
  lines.push('  description: string;');
  lines.push('  default?: string;');
  lines.push('  required?: boolean;');
  lines.push('}');
  lines.push('');
  lines.push(`export const ${exportName}: PropDefinition[] = [`);
  for (const prop of props) {
    lines.push('  {');
    lines.push(`    name: ${quote(prop.name)},`);
    lines.push(`    type: ${quote(prop.type)},`);
    lines.push(`    description: ${quote(prop.description)},`);
    if (prop.default !== undefined) lines.push(`    default: ${quote(prop.default)},`);
    lines.push(`    required: ${prop.required ? 'true' : 'false'},`);
    lines.push('  },');
  }
  lines.push('];');
  lines.push('');
  return lines.join('\n');
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function loadCompilerOptions(): ts.CompilerOptions {
  const configPath = path.join(ROOT, 'tsconfig.json');
  const { config, error } = ts.readConfigFile(configPath, ts.sys.readFile);
  if (error) throw new Error(ts.flattenDiagnosticMessageText(error.messageText, '\n'));
  const parsed = ts.parseJsonConfigFileContent(config, ts.sys, ROOT, undefined, configPath);
  return { ...parsed.options, noEmit: true };
}

function main(): void {
  const names = requested.length > 0 ? requested : listExampleComponentNames();

  const targets: { name: string; entry: string; output: string }[] = [];
  const skipped: string[] = [];
  for (const name of names) {
    const entry = resolveComponentEntry(name);
    if (!entry) {
      if (requested.length > 0) console.warn(`[skip] ${name}: no src/components/${name} directory`);
      continue;
    }
    const output = outputFileFor(name);
    if (fs.existsSync(output) && !force) {
      skipped.push(name);
      continue;
    }
    targets.push({ name, entry, output });
  }

  if (targets.length === 0) {
    console.log('Nothing to generate. All targeted components already have props files.');
    return;
  }

  const program = ts.createProgram(
    targets.map((t) => t.entry),
    loadCompilerOptions()
  );

  const needsReview: string[] = [];
  let written = 0;

  for (const target of targets) {
    const props = extractProps(program, target.name, target.entry);
    if (!props) {
      console.warn(`[skip] ${target.name}: no exported ${target.name}Props interface in ${path.relative(ROOT, target.entry)}`);
      continue;
    }
    if (props.length === 0) {
      console.warn(`[skip] ${target.name}: ${target.name}Props has no locally declared properties`);
      continue;
    }

    const content = renderPropsFile(target.name, target.entry, props);
    const relativeOutput = path.relative(ROOT, target.output);
    if (dryRun) {
      console.log(`\n----- ${relativeOutput} -----\n${content}`);
    } else {
      fs.mkdirSync(path.dirname(target.output), { recursive: true });
      fs.writeFileSync(target.output, content, 'utf8');
      written += 1;
      console.log(`[write] ${relativeOutput} (${props.length} props)`);
    }

    for (const prop of props) {
      if (prop.heuristicDescription) {
        needsReview.push(`${target.name}.${prop.name}`);
      }
    }
  }

  if (skipped.length > 0) {
    console.log(`\nAlready present (use --force to overwrite): ${skipped.join(', ')}`);
  }
  if (needsReview.length > 0) {
    console.log(
      `\nProps without a JSDoc comment (description generated heuristically, please review):\n  ${needsReview.join('\n  ')}`
    );
  }
  if (!dryRun) console.log(`\nDone. ${written} file(s) written.`);
}

main();
