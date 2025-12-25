import type { MantineTheme } from '../../../default-theme';
import type { MantineColor } from '../../../types';

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
    // If color not in palette, return as is (might be a CSS color name)
    return color;
  }

  // Use provided shade or default to primaryShade
  const colorShade = shade !== undefined ? shade : theme.primaryShade;

  // Return the color at the specified shade
  return colorPalette[colorShade] || colorPalette[0] || color;
}
