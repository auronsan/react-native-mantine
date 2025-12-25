import type { MantineTheme } from '../../default-theme';

export const fontStyles = (theme: MantineTheme) => () => ({
  fontFamily: theme.fontFamily,
});

export const focusStyles = (_theme: MantineTheme) => () => ({
  // Focus styles for accessibility
  // In React Native, we typically don't use outline
  // but can add other focus indicators if needed
});

export const placeholderStyles = (_theme: MantineTheme) => () => ({
  // Placeholder styles for inputs
  opacity: 0.6,
});

export const cover = (_theme: MantineTheme) => (offset: number = 0) => ({
  position: 'absolute' as const,
  top: offset,
  right: offset,
  bottom: offset,
  left: offset,
});

export const hover = (_theme: MantineTheme) => (styles: any) => ({
  // Hover styles (primarily for web, limited support in React Native)
  // Can be applied via TouchableOpacity/Pressable activeOpacity instead
  ...styles,
});

export const activeStyles = (_theme: MantineTheme) => ({
  // Active/pressed state styles
  opacity: 0.8,
  transform: [{ scale: 0.98 }],
});
