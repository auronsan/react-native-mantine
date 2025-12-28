import React from 'react';
import { View, StyleSheet, type ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import type { MantineGradient, GradientConfig } from '../../theme/theme.d';
import { useTheme } from '../../theme/theme-provider';

export interface GradientProps {
  /** Gradient configuration with from/to colors and optional degrees */
  gradient?: MantineGradient;
  /** Children to render inside gradient */
  children?: React.ReactNode;
  /** Additional styles */
  style?: ViewStyle;
  /** Whether to render as full width/height */
  fill?: boolean;
}

/**
 * Gradient component wrapper for expo-linear-gradient
 * Provides seamless integration with Mantine theme system
 *
 * @example
 * <Gradient gradient={{ from: 'blue', to: 'cyan', deg: 45 }}>
 *   <Text>Gradient Background</Text>
 * </Gradient>
 */
export function Gradient({ gradient, children, style, fill = true }: GradientProps) {
  const theme = useTheme();

  // Get gradient configuration from theme
  const config: GradientConfig = theme.fn.gradient(gradient);

  const containerStyle: ViewStyle = {
    ...(fill && styles.fill),
    ...style,
  };

  return (
    <LinearGradient
      colors={config.colors}
      start={config.start}
      end={config.end}
      style={containerStyle}
    >
      {children}
    </LinearGradient>
  );
}

/**
 * Fallback component when expo-linear-gradient is not available
 * Renders a solid background using the 'from' color
 */
export function GradientFallback({ gradient, children, style }: GradientProps) {
  const theme = useTheme();
  const config: GradientConfig = theme.fn.gradient(gradient);

  return (
    <View style={[{ backgroundColor: config.colors[0] }, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
});

Gradient.displayName = 'Gradient';
