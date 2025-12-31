import type { MantineThemeBase, MantineNumberSize } from '../../types';
import type { TextStyle } from 'react-native';
import { getSize } from '../../get-size';

/**
 * Returns base font styles from theme
 * Includes fontFamily and lineHeight
 */
export const fontStyles = (theme: MantineThemeBase) => () => ({
  fontFamily: theme.fontFamily,
  lineHeight: theme.lineHeight,
});

/**
 * Returns font styles specifically for input components
 */
export const inputFontStyles = (theme: MantineThemeBase) => () => {
  return {
    fontFamily: theme.fontFamilyInput,
    fontSize: theme.fontSizes.md,
    lineHeight: theme.lineHeights.md,
  };
};

/**
 * Get font size from theme
 * @param size - Size key or number
 */
export const fontSize = (theme: MantineThemeBase) => (size: MantineNumberSize) => {
  return getSize({ size, sizes: theme.fontSizes });
};

/**
 * Get line height from theme
 * @param size - Size key or number (unitless multiplier)
 */
export const lineHeight = (theme: MantineThemeBase) => (size: MantineNumberSize) => {
  return getSize({ size, sizes: theme.lineHeights });
};

/**
 * Get heading styles by order
 * @param order - Heading level (1-6)
 */
export const headingStyles = (theme: MantineThemeBase) => (order: 1 | 2 | 3 | 4 | 5 | 6) => {
  const headingKey = `h${order}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  const heading = theme.headings.sizes[headingKey];

  return {
    fontSize: heading.fontSize,
    lineHeight: heading.lineHeight * heading.fontSize,
    fontWeight: (heading.fontWeight ?? theme.headings.fontWeight ?? theme.fontWeights.bold) as TextStyle['fontWeight'],
    fontFamily: heading.fontFamily ?? theme.headings.fontFamily ?? theme.fontFamilyBold,
  };
};

export const focusStyles = (_theme: MantineThemeBase) => () => ({
  // Focus styles for accessibility
  // In React Native, we typically don't use outline
  // but can add other focus indicators if needed
});

export const placeholderStyles = (_theme: MantineThemeBase) => () => ({
  // Placeholder styles for inputs
  opacity: 0.6,
});

export const cover =
  (_theme: MantineThemeBase) =>
  (offset: number = 0) => ({
    position: 'absolute' as const,
    top: offset,
    right: offset,
    bottom: offset,
    left: offset,
  });

export const hover = (_theme: MantineThemeBase) => (styles: any) => ({
  // Hover styles (primarily for web, limited support in React Native)
  // Can be applied via TouchableOpacity/Pressable activeOpacity instead
  ...styles,
});

export const activeStyles = (_theme: MantineThemeBase) => ({
  // Active/pressed state styles
  opacity: 0.8,
  transform: [{ scale: 0.98 }],
});
