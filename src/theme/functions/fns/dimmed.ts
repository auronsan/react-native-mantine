import type { MantineTheme } from '../../default-theme';

/**
 * Returns a dimmed text color based on the current color scheme
 * Used for secondary text and less prominent UI elements
 * @param theme - The Mantine theme
 * @returns A function that returns the dimmed color
 */
export function dimmed(theme: MantineTheme) {
  return () => {
    const colorScheme = theme.currentMode || 'light';
    return colorScheme === 'dark'
      ? theme.colors.dark?.[2] || '#909296'
      : theme.colors.gray?.[6] || '#868e96';
  };
}
