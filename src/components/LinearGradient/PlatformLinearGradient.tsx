import React from 'react';
import { Platform, View, type ViewStyle, StyleSheet, type ColorValue } from 'react-native';

// Optional import for expo-linear-gradient
let ExpoLinearGradient: any = null;
let gradientAvailable = false;
try {
  const module = require('expo-linear-gradient');
  ExpoLinearGradient = module.LinearGradient;
  gradientAvailable = true;
} catch (error) {
  // expo-linear-gradient not available, will fall back to solid color
  console.warn('expo-linear-gradient not available. Gradients will fall back to solid colors. Install expo-linear-gradient for gradient support.');
}

export interface LinearGradientProps {
  colors: readonly [ColorValue, ColorValue, ...ColorValue[]];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  style?: ViewStyle;
  children?: React.ReactNode;
}

/**
 * Platform-specific LinearGradient wrapper
 * - Uses expo-linear-gradient on iOS and Android (native) when available
 * - Falls back to solid color (first color) when expo-linear-gradient is not available
 * - Uses CSS linear gradients on web for proper React Native Web support
 */
export function PlatformLinearGradient({
  colors,
  start = { x: 0, y: 0 },
  end = { x: 1, y: 1 },
  style,
  children,
}: LinearGradientProps) {
  // On web, use CSS linear gradients
  if (Platform.OS === 'web') {
    const angle = calculateGradientAngle(start, end);
    const gradient = `linear-gradient(${angle}deg, ${colors.join(', ')})`;

    const webStyle: ViewStyle = {
      ...StyleSheet.flatten(style),
      // @ts-ignore - backgroundImage is valid on web
      backgroundImage: gradient,
    };

    return <View style={webStyle}>{children}</View>;
  }

  // On native platforms, try to use expo-linear-gradient if available
  if (gradientAvailable && ExpoLinearGradient) {
    return (
      <ExpoLinearGradient colors={colors} start={start} end={end} style={style}>
        {children}
      </ExpoLinearGradient>
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
