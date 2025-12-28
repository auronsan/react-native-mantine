import type { MantineTheme } from '../../default-theme';

/**
 * Returns the appropriate primary shade based on the current color scheme
 * Matches Mantine web implementation
 */
export function getPrimaryShade(
  theme: MantineTheme,
  colorScheme?: 'light' | 'dark'
): number {
  if (typeof theme.primaryShade === 'number') {
    return theme.primaryShade;
  }

  const scheme = colorScheme || theme.currentMode || 'light';
  return theme.primaryShade[scheme];
}
