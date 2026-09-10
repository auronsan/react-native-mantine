/**
 * Mantine React Native Theme System
 * Main export file for theme-related types and utilities
 */

// Type exports
export type {
  // Color types
  Shade,
  MantineColorsTuple,
  DefaultMantineColor,
  MantineColor,
  MantineThemeColors,
  MantinePrimaryShade,
  ColorScheme,
  ColorSchemeValue,
  ResolveColorSchemeValue,

  // Size types
  MantineSize,
  MantineNumberSize,
  MantineSizes,

  // Gradient types
  MantineGradient,
  GradientConfig,

  // Typography types
  FontWeights,
  HeadingStyle,
  MantineHeadings,

  // Shadow types
  IOSShadow,
  AndroidShadow,
  MantineShadow,
  MantineShadows,

  // Variant types
  MantineVariant,
  VariantInput,
  VariantOutput,

  // Theme types
  ThemeComponent,
  MantineThemeComponents,
  MantineThemeFunctions,
  MantineTheme,
  MantineThemeBase,
  MantineThemeOverride,

  // Utility types
  DeepPartial,
  ThemeableStyleProps,
  SpacingValue,
  Variants,
  DefaultProps,
} from './types';

// Theme exports
export { DEFAULT_COLORS } from './default-colors';
export { DEFAULT_THEME, _DEFAULT_THEME, WEB_FONT_FAMILY, WEB_FONT_FAMILY_MONOSPACE } from './default-theme';
export {
  getBundledFonts,
  BUNDLED_HEADING_FONT,
  BUNDLED_HEADING_FONT_BOLD,
  areBundledFontsLoaded,
  markBundledFontsLoaded,
} from './bundled-fonts';
export { createTheme } from './create-theme';

// Function exports
export {
  attachFunctions,
  getPrimaryShade,
  getPrimaryColor,
  themeColor,
  variant,
  rgba,
  radius,
  size,
  shadow,
  gradient,
  lighten,
  darken,
  dimmed,
  largerThan,
  smallerThan,
  colorSchemeValue,
  resolveColorSchemeValue,
  resolveColorSchemeConstants,
  isColorSchemeValue,
} from './functions';

// Utility exports
export { createStyles } from './create-styles';
export { filterProps } from './filter-props';
export { getSize } from './get-size';
