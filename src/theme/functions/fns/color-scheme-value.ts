/**
 * Color scheme value helper
 * Returns different values based on the current color scheme (light or dark mode)
 * Useful for theme-aware constants like colors, spacing, etc.
 */

import type { MantineThemeBase, ColorScheme } from '../../types';

/**
 * Color scheme value type
 * Represents a value that has different values for light and dark modes
 */
export interface ColorSchemeValue<T = any> {
  light: T;
  dark: T;
}

/**
 * Type helper to resolve ColorSchemeValue types to their base types
 * Recursively transforms ColorSchemeValue<T> to T in object structures
 */
export type ResolveColorSchemeValue<T> = T extends ColorSchemeValue<infer U>
  ? U
  : T extends Record<string, any>
  ? { [K in keyof T]: ResolveColorSchemeValue<T[K]> }
  : T;

/**
 * Check if a value is a color scheme value object
 * @param value - Value to check
 * @returns True if value is a ColorSchemeValue object
 */
export function isColorSchemeValue<T = any>(value: any): value is ColorSchemeValue<T> {
  return (
    value !== null &&
    typeof value === 'object' &&
    'light' in value &&
    'dark' in value &&
    Object.keys(value).length === 2
  );
}

/**
 * Create a color scheme-aware value
 * Returns an object with light and dark values
 *
 * @param light - Value for light mode
 * @param dark - Value for dark mode
 * @returns ColorSchemeValue object
 *
 * @example
 * const backgroundColor = colorSchemeValue('#FCFCFC', '#272727');
 * // { light: '#FCFCFC', dark: '#272727' }
 */
export function colorSchemeValue<T = any>(light: T, dark: T): ColorSchemeValue<T> {
  return { light, dark };
}

/**
 * Get the appropriate value based on color scheme
 * If the value is a ColorSchemeValue object, returns the appropriate value
 * Otherwise, returns the value as-is
 *
 * @param value - Value or ColorSchemeValue object
 * @param colorScheme - Current color scheme
 * @returns Resolved value for the current color scheme
 *
 * @example
 * const bgColor = resolveColorSchemeValue({ light: '#fff', dark: '#000' }, 'dark');
 * // '#000'
 *
 * @example
 * const fixedColor = resolveColorSchemeValue('#blue', 'dark');
 * // '#blue'
 */
export function resolveColorSchemeValue<T = any>(
  value: T | ColorSchemeValue<T>,
  colorScheme: ColorScheme
): T {
  if (isColorSchemeValue(value)) {
    return value[colorScheme];
  }
  return value as T;
}

/**
 * Create a theme function that resolves color scheme values
 * This is attached to theme.fn.colorSchemeValue
 *
 * @param theme - Mantine theme base
 * @returns Function that resolves color scheme values based on current theme
 */
export const createColorSchemeValueFunction = (theme: MantineThemeBase) => {
  /**
   * Get value based on current color scheme
   * Returns the appropriate value for light or dark mode
   *
   * @param value - Value or ColorSchemeValue object
   * @returns Resolved value for current color scheme
   *
   * @example
   * // In a component using theme
   * const theme = useTheme();
   * const bgColor = theme.fn.colorSchemeValue({ light: '#fff', dark: '#000' });
   * // Returns '#fff' in light mode, '#000' in dark mode
   *
   * @example
   * // With fixed value
   * const color = theme.fn.colorSchemeValue('#blue');
   * // Returns '#blue' regardless of color scheme
   */
  return <T = any>(value: T | ColorSchemeValue<T>): T => {
    return resolveColorSchemeValue(value, theme.colorScheme);
  };
};

/**
 * Helper to create a set of color scheme-aware constants
 * Converts an object with ColorSchemeValue properties into resolved values
 *
 * @param constants - Object with ColorSchemeValue properties
 * @param colorScheme - Current color scheme
 * @returns Object with resolved values
 *
 * @example
 * const constants = {
 *   text: { light: '#000', dark: '#fff' },
 *   background: { light: '#FCFCFC', dark: '#272727' },
 *   primaryButtonBackground: { light: '#00203E', dark: '#2581C4' },
 *   fixedColor: '#blue', // Non-scheme values pass through
 * };
 *
 * const resolved = resolveColorSchemeConstants(constants, 'dark');
 * // {
 * //   text: '#fff',
 * //   background: '#272727',
 * //   primaryButtonBackground: '#2581C4',
 * //   fixedColor: '#blue'
 * // }
 */
export function resolveColorSchemeConstants<T extends Record<string, any>>(
  constants: T,
  colorScheme: ColorScheme
): ResolveColorSchemeValue<T> {
  const resolved = {} as T;

  for (const key in constants) {
    if (Object.prototype.hasOwnProperty.call(constants, key)) {
      const value = constants[key];

      if (isColorSchemeValue(value)) {
        resolved[key] = value[colorScheme] as any;
      } else if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
        // Recursively resolve nested objects
        resolved[key] = resolveColorSchemeConstants(value, colorScheme);
      } else {
        // Pass through non-scheme values
        resolved[key] = value;
      }
    }
  }

  return resolved as ResolveColorSchemeValue<T>;
}

/**
 * Create a theme function that resolves color scheme constants
 * This is attached to theme.fn.colorSchemeConstants
 *
 * @param theme - Mantine theme base
 * @returns Function that resolves all constants in an object based on current theme
 */
export const createColorSchemeConstantsFunction = (theme: MantineThemeBase) => {
  /**
   * Resolve all color scheme values in an object
   * Useful for resolving a set of constants stored in theme.other
   *
   * @param constants - Object containing ColorSchemeValue properties
   * @returns Object with all values resolved for current color scheme
   *
   * @example
   * // Define constants in theme
   * const theme = createTheme({
   *   other: {
   *     colors: {
   *       text: { light: '#000', dark: '#fff' },
   *       background: { light: '#FCFCFC', dark: '#272727' },
   *     }
   *   }
   * });
   *
   * // In component
   * const colors = theme.fn.colorSchemeConstants(theme.other.colors);
   * // { text: '#000', background: '#FCFCFC' } in light mode
   * // { text: '#fff', background: '#272727' } in dark mode
   */
  return <T extends Record<string, any>>(constants: T): ResolveColorSchemeValue<T> => {
    return resolveColorSchemeConstants(constants, theme.colorScheme);
  };
};
