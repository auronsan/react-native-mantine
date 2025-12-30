/**
 * Attach helper functions to theme object
 * Creates theme.fn object with all utility functions
 * Aligned with Mantine web's theme function attachment pattern
 */

import type { MantineTheme, MantineThemeBase } from '../types';
import { fns } from './fns';
import {
  createPrimaryShadeFunction,
  createPrimaryColorFunction,
} from './fns/primary-shade';
import { createThemeColorFunction } from './fns/theme-color/theme-color';

/**
 * Attach helper functions to theme base object
 * Converts MantineThemeBase to full MantineTheme with fn object
 *
 * @param themeBase - Base theme configuration without functions
 * @returns Complete theme with attached helper functions
 *
 * @example
 * const theme = attachFunctions(baseTheme);
 * theme.fn.themeColor('blue', 5); // '#339af0'
 * theme.fn.primaryShade(); // 6
 * theme.fn.variant({ variant: 'filled', color: 'blue' });
 */
export function attachFunctions(themeBase: MantineThemeBase): MantineTheme {
  return {
    ...themeBase,
    fn: {
      // Color functions
      themeColor: createThemeColorFunction(themeBase),
      primaryShade: createPrimaryShadeFunction(themeBase),
      primaryColor: createPrimaryColorFunction(themeBase),

      // Variant function
      variant: fns.variant(themeBase),

      // Color manipulation
      rgba: fns.rgba(themeBase),
      lighten: fns.lighten,
      darken: fns.darken,
      dimmed: fns.dimmed(themeBase),

      // Size and spacing functions
      radius: fns.radius(themeBase),
      size: fns.size(themeBase),

      // Visual effects
      shadow: fns.shadow,
      gradient: fns.gradient(themeBase),

      // Typography functions
      fontStyles: fns.fontStyles(themeBase),
      inputFontStyles: fns.inputFontStyles(themeBase),
      placeholderStyles: fns.placeholderStyles(themeBase),

      // Layout functions
      cover: fns.cover(themeBase),
      focusStyles: fns.focusStyles(themeBase),
      hover: fns.hover(themeBase),

      // Responsive functions
      largerThan: fns.largerThan(themeBase),
      smallerThan: fns.smallerThan(themeBase),
    },
  };
}
