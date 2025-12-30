/**
 * Primary shade helper function
 * Returns the appropriate primary shade based on the current color scheme
 * Aligned with Mantine web's primaryShade implementation
 */

import type { MantineThemeBase, ColorScheme, Shade } from '../../types';

/**
 * Get the primary shade for the current color scheme
 *
 * If theme.primaryShade is a number, returns that number.
 * If theme.primaryShade is an object with light/dark values, returns the
 * appropriate value based on the color scheme.
 *
 * @param theme - Mantine theme object
 * @param colorScheme - Optional color scheme override (light or dark)
 * @returns Shade value (0-9)
 *
 * @example
 * // With theme.primaryShade = { light: 6, dark: 8 }
 * // and theme.colorScheme = 'light'
 * getPrimaryShade(theme) // returns 6
 *
 * @example
 * // With explicit colorScheme override
 * getPrimaryShade(theme, 'dark') // returns 8
 *
 * @example
 * // With theme.primaryShade = 7 (single number)
 * getPrimaryShade(theme) // returns 7
 */
export function getPrimaryShade(theme: MantineThemeBase, colorScheme?: ColorScheme): Shade {
  // If primaryShade is a single number, return it directly
  if (typeof theme.primaryShade === 'number') {
    return theme.primaryShade;
  }

  // Determine which color scheme to use
  // Priority: 1. parameter override, 2. theme.colorScheme, 3. default to 'light'
  const scheme = colorScheme || theme.colorScheme || 'light';

  // Return the appropriate shade for the color scheme
  return theme.primaryShade[scheme];
}

/**
 * Curried version of getPrimaryShade for use with theme.fn
 * Matches Mantine web's theme.fn.primaryShade signature
 *
 * @internal
 */
export function createPrimaryShadeFunction(theme: MantineThemeBase) {
  return (colorScheme?: ColorScheme): Shade => {
    return getPrimaryShade(theme, colorScheme);
  };
}

/**
 * Get the primary color at the primary shade
 *
 * @param theme - Mantine theme object
 * @param colorScheme - Optional color scheme override
 * @returns Color string value
 *
 * @example
 * // Get primary color at primary shade
 * getPrimaryColor(theme) // returns '#228be6' (blue[6])
 */
export function getPrimaryColor(theme: MantineThemeBase, colorScheme?: ColorScheme): string {
  const shade = getPrimaryShade(theme, colorScheme);
  const primaryPalette = theme.colors[theme.primaryColor];

  if (!primaryPalette) {
    console.warn(
      `Primary color "${theme.primaryColor}" not found in theme.colors. Falling back to 'blue'.`
    );
    return theme.colors.blue?.[shade] || '#228be6';
  }

  return primaryPalette[shade] || primaryPalette[0] || '#228be6';
}

/**
 * Curried version of getPrimaryColor for use with theme.fn
 *
 * @internal
 */
export function createPrimaryColorFunction(theme: MantineThemeBase) {
  return (colorScheme?: ColorScheme): string => {
    return getPrimaryColor(theme, colorScheme);
  };
}
