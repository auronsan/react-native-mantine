/**
 * Create custom Mantine theme
 * Merges user overrides with default theme configuration
 * Aligned with Mantine web's createTheme/mergeTheme pattern
 */

import { _DEFAULT_THEME, DEFAULT_THEME } from './default-theme';
import { DEFAULT_COLORS } from './default-colors';
import type {
  MantineTheme,
  MantineThemeOverride,
  MantineThemeBase,
  MantineThemeColors,
} from './types';
import { attachFunctions } from './functions/attach-functions';

/**
 * Deep merge helper for theme objects
 * Handles nested objects and arrays properly
 */
function deepMerge<T extends Record<string, any>>(target: T, source: Partial<T>): T {
  const result = { ...target };

  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      const sourceValue = source[key];
      const targetValue = result[key];

      if (
        sourceValue &&
        typeof sourceValue === 'object' &&
        !Array.isArray(sourceValue) &&
        targetValue &&
        typeof targetValue === 'object' &&
        !Array.isArray(targetValue)
      ) {
        // Recursively merge nested objects
        result[key] = deepMerge(targetValue, sourceValue) as any;
      } else if (sourceValue !== undefined) {
        // Direct assignment for primitives, arrays, and undefined target values
        result[key] = sourceValue as any;
      }
    }
  }

  return result;
}

/**
 * Create a custom Mantine theme
 *
 * Merges provided theme overrides with the default theme configuration.
 * Returns a complete theme object with all helper functions attached.
 *
 * @param override - Partial theme configuration to override defaults
 * @returns Complete Mantine theme with attached helper functions
 *
 * @example
 * // Create theme with custom primary color
 * const theme = createTheme({
 *   primaryColor: 'teal',
 * });
 *
 * @example
 * // Create theme with custom colors and primary shade
 * const theme = createTheme({
 *   primaryColor: 'brand',
 *   primaryShade: { light: 5, dark: 7 },
 *   colors: {
 *     brand: [
 *       '#e6f7ff',
 *       '#bae7ff',
 *       '#91d5ff',
 *       '#69c0ff',
 *       '#40a9ff',
 *       '#1890ff',
 *       '#096dd9',
 *       '#0050b3',
 *       '#003a8c',
 *       '#002766',
 *     ],
 *   },
 * });
 *
 * @example
 * // Create theme with custom typography
 * const theme = createTheme({
 *   fontFamily: 'Inter',
 *   headings: {
 *     fontFamily: 'Inter-Bold',
 *     sizes: {
 *       h1: { fontSize: 40, lineHeight: 1.2 },
 *     },
 *   },
 * });
 */
export function createTheme(override?: MantineThemeOverride): MantineTheme {
  if (!override) {
    return DEFAULT_THEME;
  }

  // Create base theme by merging override with default
  const mergedBase: MantineThemeBase = deepMerge(_DEFAULT_THEME, override as any);

  // Ensure colors includes all defaults plus any custom colors
  if (override.colors) {
    mergedBase.colors = {
      ...DEFAULT_COLORS,
      ...override.colors,
    } as MantineThemeColors;
  }

  // Attach helper functions to create complete theme
  return attachFunctions(mergedBase);
}

/**
 * Merge multiple theme overrides
 * Useful for combining theme configurations
 *
 * @param themes - Array of theme overrides to merge
 * @returns Merged theme override
 *
 * @example
 * const brandTheme = { primaryColor: 'brand' };
 * const typographyTheme = { fontFamily: 'Inter' };
 * const merged = mergeThemeOverrides(brandTheme, typographyTheme);
 */
export function mergeThemeOverrides(
  ...themes: MantineThemeOverride[]
): MantineThemeOverride {
  return themes.reduce(
    (acc, theme) => deepMerge(acc as any, theme as any),
    {} as MantineThemeOverride
  );
}
