/**
 * Theme helper functions
 * Exports all utility functions for theme manipulation
 */

import { radius } from './radius';
import { rgba } from './rgba';
import { size } from './size';
import { themeColor } from './theme-color/theme-color';
import { variant } from './variant';
import { getPrimaryShade, getPrimaryColor } from './primary-shade';
import { shadow } from './shadow';
import { gradient } from './gradient/gradient';
import { lighten } from './lighten';
import { darken } from './darken';
import { dimmed } from './dimmed';
import { largerThan, smallerThan } from './breakpoints';
import * as helpers from './helpers';

/**
 * Collection of all theme helper functions
 * Used by attach-functions to create theme.fn object
 */
export const fns = {
  // Color functions
  themeColor,
  getPrimaryShade,
  getPrimaryColor,

  // Variant function
  variant,

  // Color manipulation
  rgba,
  lighten,
  darken,
  dimmed,

  // Size and spacing
  radius,
  size,

  // Visual effects
  shadow,
  gradient,

  // Responsive
  largerThan,
  smallerThan,

  // Helper functions from helpers module
  ...helpers,
};

// Re-export individual functions for direct imports
export {
  radius,
  rgba,
  size,
  themeColor,
  variant,
  getPrimaryShade,
  getPrimaryColor,
  shadow,
  gradient,
  lighten,
  darken,
  dimmed,
  largerThan,
  smallerThan,
};
