import React from 'react';
import { Platform, View, type ViewStyle, StyleSheet, type ColorValue } from 'react-native';
import { useAdapter } from '../../adapters/context';

export interface LinearGradientProps {
  colors: readonly [ColorValue, ColorValue, ...ColorValue[]];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  style?: ViewStyle;
  children?: React.ReactNode;
}

/**
 * Platform-specific LinearGradient wrapper
 * - On iOS and Android uses the `LinearGradient` adapter: a component passed via
 *   `<ThemeProvider adapters={{ LinearGradient }}>` or `configureMantine`, otherwise
 *   expo-linear-gradient when it is installed
 * - Falls back to solid color (first color) when no gradient implementation is available
 * - Uses CSS linear gradients on web for proper React Native Web support
 */
export function PlatformLinearGradient({
  colors,
  start = { x: 0, y: 0 },
  end = { x: 1, y: 1 },
  style,
  children,
}: LinearGradientProps) {
  const LinearGradient = useAdapter('LinearGradient', {
    warn: Platform.OS !== 'web',
  });

  // On web, use CSS linear gradients
  if (Platform.OS === 'web') {
    const angle = calculateGradientAngle(start, end);
    const gradient = `linear-gradient(${angle}deg, ${colors.join(', ')})`;

    // `backgroundImage` is not part of React Native's ViewStyle typings, but
    // react-native-web forwards unknown style keys to the DOM as CSS, so it is
    // valid here. Widen the type explicitly instead of suppressing the error.
    const webStyle: ViewStyle & { backgroundImage: string } = {
      ...StyleSheet.flatten(style),
      backgroundImage: gradient,
    };

    return <View style={webStyle}>{children}</View>;
  }

  // On native platforms, use the gradient implementation if available
  if (LinearGradient) {
    return (
      <LinearGradient colors={colors} start={start} end={end} style={style}>
        {children}
      </LinearGradient>
    );
  }

  // Fallback: use solid color (first color from gradient)
  const fallbackStyle: ViewStyle = {
    ...StyleSheet.flatten(style),
    backgroundColor: colors[0] as string,
  };

  return <View style={fallbackStyle}>{children}</View>;
}

/**
 * Convert start/end coordinates to gradient angle
 * This approximates the expo-linear-gradient angle system for web
 */
function calculateGradientAngle(
  start: { x: number; y: number },
  end: { x: number; y: number }
): number {
  // Calculate the direction vector
  const dx = end.x - start.x;
  const dy = end.y - start.y;

  // Convert to angle in degrees
  // Web gradients use 0deg = top, 90deg = right, 180deg = bottom, 270deg = left
  // We need to convert from our coordinate system
  let angle = Math.atan2(dy, dx) * (180 / Math.PI);

  // Adjust for gradient coordinate system
  // Web: 0deg is from bottom to top, clockwise
  // Our system: based on cartesian coordinates
  angle = 90 + angle;

  // Normalize to 0-360
  angle = ((angle % 360) + 360) % 360;

  return angle;
}
