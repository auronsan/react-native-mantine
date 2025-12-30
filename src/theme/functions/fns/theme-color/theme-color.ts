/**
 * Theme color helper function
 * Retrieves colors from theme palette with proper shade handling
 * Aligned with Mantine web's themeColor implementation
 *
 * Now supports custom color values (hex, rgb, rgba) that are not in the theme palette.
 * Custom colors can be shaded on the fly using color manipulation algorithms.
 */

import type { MantineThemeBase, MantineColor, Shade } from '../../../types';
import { getPrimaryShade } from '../primary-shade';
import { isCustomColor, getCustomColorShade } from './color-utils';

export interface ThemeColorInput {
  theme: MantineThemeBase;
  color: MantineColor;
  shade?: Shade;
  primaryFallback?: boolean;
}

/**
 * Get a color value from the theme
 *
 * @param theme - Mantine theme object
 * @param color - Color name or CSS color value (now supports hex/rgb/rgba)
 * @param shade - Optional shade (0-9). If not provided, uses primaryShade
 * @param primaryFallback - If true and color not found, falls back to primary color
 * @returns Color string value
 *
 * @example
 * // Get blue at primary shade (6 for light mode, 8 for dark mode)
 * themeColor({ theme, color: 'blue' })
 *
 * @example
 * // Get blue at specific shade
 * themeColor({ theme, color: 'blue', shade: 5 })
 *
 * @example
 * // Pass through CSS color values
 * themeColor({ theme, color: '#ff0000' }) // returns '#ff0000'
 *
 * @example
 * // Use custom hex color with shade
 * themeColor({ theme, color: '#FF5733', shade: 7 }) // returns darker version
 *
 * @example
 * // Use custom rgb color with shade
 * themeColor({ theme, color: 'rgb(255, 87, 51)', shade: 3 }) // returns lighter version
 *
 * @example
 * // Use primary color fallback
 * themeColor({ theme, color: 'unknown', primaryFallback: true })
 */
export function themeColor({
  theme,
  color,
  shade,
  primaryFallback = false,
}: ThemeColorInput): string {
  // Handle undefined/null color
  if (!color) {
    return primaryFallback ? themeColor({ theme, color: theme.primaryColor, shade }) : '';
  }

  // Check if this is a custom color value (hex, rgb, rgba, etc.)
  if (isCustomColor(color)) {
    // If shade is specified, generate a shade variation
    if (shade !== undefined) {
      return getCustomColorShade(color, shade);
    }
    // Otherwise return the color as-is
    return color;
  }

  // Get color palette from theme
  const colorPalette = theme.colors[color];

  // If color not in palette
  if (!colorPalette) {
    // Try primary fallback if enabled
    if (primaryFallback && color !== theme.primaryColor) {
      return themeColor({ theme, color: theme.primaryColor, shade });
    }
    // Otherwise return the color string as-is (might be a named CSS color)
    return color;
  }

  // Determine which shade to use
  const colorShade = shade !== undefined ? shade : getPrimaryShade(theme);

  // Get the color at the specified shade
  const resolvedColor = colorPalette[colorShade];

  // Return the color or fall back to first shade
  return resolvedColor || colorPalette[0] || color;
}

/**
 * Curried version of themeColor for use with theme.fn
 * @internal
 */
export function createThemeColorFunction(theme: MantineThemeBase) {
  return (color: MantineColor, shade?: Shade, primaryFallback?: boolean): string => {
    return themeColor({ theme, color, shade, primaryFallback });
  };
}
