/**
 * Variant styles generator
 * Creates component variant styles for React Native
 * Aligned with Mantine web's variant system
 *
 * Now supports custom color values (hex, rgb, rgba) in addition to theme palette colors.
 * Custom colors are automatically shaded using color manipulation algorithms.
 */

import type { MantineThemeBase, Shade, MantineColor, VariantInput, VariantOutput } from '../../types';
import { themeColor } from './theme-color/theme-color';
import { getPrimaryShade } from './primary-shade';

/**
 * Generate variant styles for components
 *
 * Supports the following variants:
 * - filled: Filled background with primary color
 * - light: Light background with colored text
 * - outline: Transparent background with colored border
 * - subtle: Transparent background with colored text
 * - white: White background (useful for dark mode)
 * - default: Default gray background
 * - gradient: Transparent background for gradient overlays
 * - transparent: Fully transparent
 *
 * @param theme - Mantine theme object
 * @param input - Variant configuration
 * @returns Style object with background, color, border, and optional hover
 *
 * @example
 * // Filled variant with blue color
 * variant(theme)({ variant: 'filled', color: 'blue' })
 * // Returns: { background: '#228be6', color: '#fff', border: '#228be6' }
 *
 * @example
 * // Light variant with red color
 * variant(theme)({ variant: 'light', color: 'red' })
 * // Returns: { background: '#fff5f5', color: '#f03e3e', border: 'transparent' }
 *
 * @example
 * // Filled variant with custom hex color
 * variant(theme)({ variant: 'filled', color: '#FF5733' })
 * // Returns: { background: '#FF5733', color: '#fff', border: '#FF5733', hover: darker('#FF5733') }
 *
 * @example
 * // Light variant with custom rgb color
 * variant(theme)({ variant: 'light', color: 'rgb(255, 87, 51)' })
 * // Returns: { background: lighter('rgb(...)'), color: darker('rgb(...)'), border: 'transparent' }
 */
export const variant = (theme: MantineThemeBase) => (input: VariantInput): VariantOutput => {
  const { variant, color = theme.primaryColor, primaryFallback = false } = input;

  const primaryShade = getPrimaryShade(theme);

  /**
   * Helper to get color at specific shade
   */
  const getColor = (c: MantineColor, shade: Shade) =>
    themeColor({ theme, color: c, shade, primaryFallback });

  switch (variant) {
    // Filled variant - solid background with white text
    case 'filled': {
      const filledColor = getColor(color, primaryShade);
      return {
        background: filledColor,
        color: theme.white,
        border: filledColor,
        hover: getColor(color, Math.min(primaryShade + 1, 9) as Shade),
      };
    }

    // Light variant - light background with colored text
    case 'light': {
      const textShade = primaryShade > 6 ? primaryShade : 7;
      return {
        background: getColor(color, 0),
        color: getColor(color, textShade),
        border: 'transparent',
        hover: getColor(color, 1),
      };
    }

    // Outline variant - transparent with colored border and text
    case 'outline': {
      const outlineColor = getColor(color, primaryShade);
      return {
        background: 'transparent',
        color: outlineColor,
        border: outlineColor,
        hover: getColor(color, 0),
      };
    }

    // Subtle variant - transparent with colored text
    case 'subtle': {
      return {
        background: 'transparent',
        color: getColor(color, primaryShade),
        border: 'transparent',
        hover: getColor(color, 0),
      };
    }

    // White variant - white background with colored text
    case 'white': {
      return {
        background: theme.white,
        color: getColor(color, primaryShade),
        border: theme.white,
        hover: theme.colors.gray?.[0] || '#f8f9fa',
      };
    }

    // Default variant - gray background
    case 'default': {
      const isDark = theme.colorScheme === 'dark';

      if (isDark) {
        return {
          background: theme.colors.dark?.[6] || '#25262b',
          color: theme.white,
          border: theme.colors.dark?.[4] || '#373A40',
          hover: theme.colors.dark?.[5] || '#2C2E33',
        };
      }

      return {
        background: theme.white,
        color: theme.black,
        border: theme.colors.gray?.[4] || '#ced4da',
        hover: theme.colors.gray?.[0] || '#f8f9fa',
      };
    }

    // Gradient variant - transparent background for gradient overlays
    // The actual gradient rendering is handled by LinearGradient component
    case 'gradient': {
      return {
        background: 'transparent',
        color: theme.white,
        border: 'transparent',
      };
    }

    // Transparent variant - fully transparent
    case 'transparent': {
      return {
        background: 'transparent',
        color: getColor(color, primaryShade),
        border: 'transparent',
      };
    }

    // Default fallback - same as filled variant
    default: {
      const filledColor = getColor(color, primaryShade);
      return {
        background: filledColor,
        color: theme.white,
        border: filledColor,
      };
    }
  }
};

/**
 * Curried version of variant for use with theme.fn
 * @internal
 */
export function createVariantFunction(theme: MantineThemeBase) {
  return variant(theme);
}
