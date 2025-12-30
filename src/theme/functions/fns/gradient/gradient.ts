import type { MantineTheme } from '../../../default-theme';
import type { MantineGradient, GradientConfig } from '../../../theme.d';
import { themeColor } from '../theme-color/theme-color';
import { getPrimaryShade } from '../primary-shade';

/**
 * Converts degrees to start/end coordinates for LinearGradient
 * 0deg = bottom to top, 90deg = left to right, 180deg = top to bottom, 270deg = right to left
 */
function degToCoordinates(deg: number): { start: { x: number; y: number }; end: { x: number; y: number } } {
  const angle = ((deg % 360) + 360) % 360; // Normalize to 0-360
  const radians = (angle * Math.PI) / 180;

  // Calculate end point on unit circle
  const endX = Math.cos(radians - Math.PI / 2);
  const endY = Math.sin(radians - Math.PI / 2);

  // Normalize to 0-1 range
  const start = {
    x: (1 - endX) / 2,
    y: (1 - endY) / 2,
  };
  const end = {
    x: (1 + endX) / 2,
    y: (1 + endY) / 2,
  };

  return { start, end };
}

/**
 * Creates a gradient configuration for use with expo-linear-gradient
 * Returns gradient colors and coordinates based on theme gradient settings
 */
export function gradient(theme: MantineTheme) {
  return (payload?: MantineGradient): GradientConfig => {
    const merged = {
      from: payload?.from || theme.defaultGradient?.from || theme.primaryColor,
      to: payload?.to || theme.defaultGradient?.to || theme.primaryColor,
      deg: payload?.deg ?? theme.defaultGradient?.deg ?? 45,
    };

    const primaryShade = getPrimaryShade(theme);
    const fromColor = themeColor({ theme, color: merged.from, shade: primaryShade });
    const toColor = themeColor({ theme, color: merged.to, shade: primaryShade });

    const { start, end } = degToCoordinates(merged.deg);

    return {
      colors: [fromColor, toColor],
      start,
      end,
    };
  };
}

/**
 * Legacy function for web compatibility - returns gradient string
 * Not used in React Native but kept for API compatibility
 */
export function linearGradientString(deg: number, ...colors: string[]) {
  return `linear-gradient(${deg}deg, ${colors.join(', ')})`;
}
