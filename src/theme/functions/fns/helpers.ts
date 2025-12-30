import type { MantineThemeBase } from '../../types';

export const fontStyles = (theme: MantineThemeBase) => () => ({
  fontFamily: theme.fontFamily,
});

/**
 * Returns font styles specifically for input components
 */
export const inputFontStyles = (theme: MantineThemeBase) => () => {
  return {
    fontFamily: theme.fontFamily,
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
