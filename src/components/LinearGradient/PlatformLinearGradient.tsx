import React from 'react';
import { Platform, View, type ViewStyle, StyleSheet, type ColorValue } from 'react-native';
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient';

export interface LinearGradientProps {
  colors: readonly [ColorValue, ColorValue, ...ColorValue[]];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  style?: ViewStyle;
  children?: React.ReactNode;
}

/**
 * Platform-specific LinearGradient wrapper
 * - Uses expo-linear-gradient on iOS and Android (native)
 * - Uses CSS gradients on web for proper React Native Web support
 */
export function PlatformLinearGradient({
  colors,
  start = { x: 0, y: 0 },
  end = { x: 1, y: 1 },
  style,
  children,
}: LinearGradientProps) {
  // On web, use CSS gradients
  if (Platform.OS === 'web') {
    const angle = calculateCSSAngle(start, end);
    const gradient = `linear-gradient(${angle}deg, ${colors.join(', ')})`;

    const webStyle: ViewStyle = {
      ...StyleSheet.flatten(style),
      // @ts-ignore - backgroundImage is valid on web
      backgroundImage: gradient,
    };

    return <View style={webStyle}>{children}</View>;
  }

  // On native platforms, use expo-linear-gradient
  return (
    <ExpoLinearGradient colors={colors} start={start} end={end} style={style}>
      {children}
    </ExpoLinearGradient>
  );
}

/**
 * Convert start/end coordinates to CSS angle
 * This approximates the expo-linear-gradient angle system for web
 */
function calculateCSSAngle(
  start: { x: number; y: number },
  end: { x: number; y: number }
): number {
  // Calculate the direction vector
  const dx = end.x - start.x;
  const dy = end.y - start.y;

  // Convert to angle in degrees
  // CSS gradients use 0deg = top, 90deg = right, 180deg = bottom, 270deg = left
  // We need to convert from our coordinate system to CSS
  let angle = Math.atan2(dy, dx) * (180 / Math.PI);

  // Adjust for CSS gradient coordinate system
  // CSS: 0deg is from bottom to top, clockwise
  // Our system: based on cartesian coordinates
  angle = 90 + angle;

  // Normalize to 0-360
  angle = ((angle % 360) + 360) % 360;

  return angle;
}
