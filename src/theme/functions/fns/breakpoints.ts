import { Dimensions } from 'react-native';
import type { MantineTheme } from '../../default-theme';

/**
 * Default breakpoint values in pixels
 * These match Mantine web but converted to pixels (1em = 16px)
 */
const DEFAULT_BREAKPOINTS = {
  xs: 576, // 36em * 16
  sm: 768, // 48em * 16
  md: 992, // 62em * 16
  lg: 1200, // 75em * 16
  xl: 1408, // 88em * 16
};

export type MantineNumberSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;

/**
 * Get breakpoint value from theme or default
 */
function getBreakpointValue(
  breakpoint: MantineNumberSize,
  theme: MantineTheme
): number {
  if (typeof breakpoint === 'number') {
    return breakpoint;
  }

  // Check if theme has breakpoints defined
  if (theme.breakpoints && theme.breakpoints[breakpoint]) {
    const value = theme.breakpoints[breakpoint];
    return typeof value === 'number' ? value : Number(value);
  }

  return DEFAULT_BREAKPOINTS[breakpoint as keyof typeof DEFAULT_BREAKPOINTS];
}

/**
 * Returns true if current screen width is larger than the specified breakpoint
 * @param theme - The Mantine theme
 * @returns A function that takes a breakpoint and returns a boolean
 */
export function largerThan(theme: MantineTheme) {
  return (breakpoint: MantineNumberSize): boolean => {
    const { width } = Dimensions.get('window');
    const breakpointValue = getBreakpointValue(breakpoint, theme);
    return width >= breakpointValue;
  };
}

/**
 * Returns true if current screen width is smaller than the specified breakpoint
 * @param theme - The Mantine theme
 * @returns A function that takes a breakpoint and returns a boolean
 */
export function smallerThan(theme: MantineTheme) {
  return (breakpoint: MantineNumberSize): boolean => {
    const { width } = Dimensions.get('window');
    const breakpointValue = getBreakpointValue(breakpoint, theme);
    return width < breakpointValue;
  };
}
