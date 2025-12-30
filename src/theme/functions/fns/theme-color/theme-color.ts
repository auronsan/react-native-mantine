import type { MantineTheme } from '../../../default-theme';
import type { MantineColor } from '../../../types';
import { getPrimaryShade } from '../primary-shade';

export interface ThemeColorInput {
  theme: MantineTheme;
  color: MantineColor;
  shade?: number;
}

export function themeColor({ theme, color, shade }: ThemeColorInput): string {
  if (!color) {
    return '';
  }

  // If it's a hex/rgb color, return as is
  if (
    color.startsWith('#') ||
    color.startsWith('rgb') ||
    color.startsWith('hsl')
  ) {
    return color;
  }

  // Get from theme colors
  const colorPalette = theme.colors[color];

  if (!colorPalette) {
    // If color not in palette, return as is (might be a color name like 'red', 'blue', etc.)
    return color;
  }

  // Use provided shade or get from theme based on color scheme
  const colorShade = shade !== undefined ? shade : getPrimaryShade(theme);

  // Return the color at the specified shade
  return colorPalette[colorShade] || colorPalette[0] || color;
}
