import React, { forwardRef, useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';
import { BoxView } from '../BoxView';
import { Text } from '../Text';
import type { DefaultProps, MantineColor } from '../../theme/types';
import { useComponentDefaultProps, useTheme } from '../../theme/theme-provider';
import { createStyles } from '../../theme';
import { rem } from '../../theme/utils/rem';

/**
 * NOTE: This is a simplified version of RingProgress.
 * For full SVG-based circular progress, install react-native-svg:
 * yarn add react-native-svg
 *
 * This version uses View-based rendering with transform rotation.
 * For production use, consider implementing with react-native-svg.
 */

export interface RingProgressSection {
  value: number;
  color: MantineColor;
  tooltip?: string;
}

export interface RingProgressProps extends DefaultProps {
  /** Sections of the ring */
  sections: RingProgressSection[];

  /** Size of the ring */
  size?: number;

  /** Ring thickness */
  thickness?: number;

  /** Label displayed in the center */
  label?: React.ReactNode;

  /** Root color from theme */
  rootColor?: string;

  /** If true, section tooltips will be rounded */
  roundCaps?: boolean;

  /** Additional styles */
  style?: any;
}

const useStyles = createStyles(
  (
    theme,
    {
      size,
      thickness,
      rootColor,
    }: {
      size: number;
      thickness: number;
      rootColor: string;
    }
  ) => ({
    root: {
      width: size,
      height: size,
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'center',
    },
    track: {
      position: 'absolute',
      width: size,
      height: size,
      borderRadius: size / 2,
      borderWidth: thickness,
      borderColor: rootColor,
    },
    label: {
      position: 'absolute',
      fontSize: rem(14),
      fontWeight: '600',
      color: theme.colorScheme === 'dark' ? (theme.colors.dark || [])[0] : theme.black,
    },
    // Simplified progress representation
    progressContainer: {
      position: 'absolute',
      width: size,
      height: size,
      borderRadius: size / 2,
      overflow: 'hidden',
    },
  })
);

const defaultProps: Partial<RingProgressProps> = {
  size: 120,
  thickness: 12,
  roundCaps: false,
};

export const RingProgress = forwardRef<any, RingProgressProps>((props, ref) => {
  const {
    sections,
    size,
    thickness,
    label,
    rootColor: customRootColor,
    roundCaps,
    style,
    ...others
  } = useComponentDefaultProps('RingProgress', defaultProps, props);

  const theme = useTheme();

  const rootColor =
    customRootColor ||
    (theme.colorScheme === 'dark' ? (theme.colors.dark || [])[4] : (theme.colors.gray || [])[2]);

  const { styles, sx} = useStyles(
    { size, thickness, rootColor },
    { name: 'RingProgress' }
  ) as any;

  // Animation values for each section
  const animatedValues = useRef(
    sections.map(() => new Animated.Value(0))
  ).current;

  // Update animation values when sections change
  useEffect(() => {
    // Ensure we have the right number of animated values
    while (animatedValues.length < sections.length) {
      animatedValues.push(new Animated.Value(0));
    }

    // Animate each section
    const animations = sections.map((section, index) => {
      const animValue = animatedValues[index];
      if (!animValue) return Animated.timing(new Animated.Value(0), { toValue: 0, duration: 0, useNativeDriver: false });

      return Animated.timing(animValue, {
        toValue: section.value,
        duration: 1000,
        useNativeDriver: false,
      });
    });

    Animated.parallel(animations).start();
  }, [sections, animatedValues]);

  // Calculate total value and normalize sections
  const normalizedSections = sections.map((section, index) => ({
    ...section,
    percentage: (section.value / 100) * 100,
    animatedValue: animatedValues[index] || new Animated.Value(0),
  }));

  // Render animated ring using borders and transforms
  // Note: This is a basic implementation. For full SVG support, use react-native-svg
  const renderSections = () => {
    let currentAngle = 0;

    return normalizedSections.map((section, index) => {
      const colors =
        theme.colors[section.color] || theme.colors[theme.primaryColor];
      const sectionColor = colors?.[6] || colors?.[5] || theme.primaryBgColor;

      const angle = (section.percentage / 100) * 360;
      const rotation = currentAngle;
      currentAngle += angle;

      // Animate the opacity for a smooth appearance
      const animatedOpacity = section.animatedValue.interpolate({
        inputRange: [0, section.value],
        outputRange: [0, 1],
      });

      // Animated scale for smooth growth effect
      const animatedScale = section.animatedValue.interpolate({
        inputRange: [0, section.value],
        outputRange: [0.8, 1],
      });

      // Simplified representation - just show colored arcs with animation
      return (
        <Animated.View
          key={index}
          style={{
            position: 'absolute',
            width: size!,
            height: size!,
            borderRadius: size! / 2,
            borderWidth: thickness,
            borderColor: 'transparent',
            borderTopColor: sectionColor,
            transform: [
              { rotate: `${rotation}deg` },
              { scale: animatedScale },
            ],
            opacity: animatedOpacity,
          }}
        />
      );
    });
  };

  return (
    <BoxView ref={ref} style={sx(styles.root, style)} {...others}>
      <View style={styles.track} />
      <View style={styles.progressContainer}>{renderSections()}</View>
      {label && (
        typeof label === 'string' ? (
          <Text style={styles.label}>{label}</Text>
        ) : (
          <View style={{ position: 'absolute' }}>{label}</View>
        )
      )}
    </BoxView>
  );
});

RingProgress.displayName = 'RingProgress';

/**
 * USAGE NOTE:
 * This is a simplified implementation of RingProgress.
 * For production-quality circular progress with accurate rendering,
 * install react-native-svg and implement using SVG circles with
 * stroke-dasharray and stroke-dashoffset.
 *
 * Example with react-native-svg:
 * ```tsx
 * import Svg, { Circle } from 'react-native-svg';
 *
 * const circumference = 2 * Math.PI * radius;
 * const strokeDashoffset = circumference - (percentage / 100) * circumference;
 *
 * <Svg width={size} height={size}>
 *   <Circle
 *     cx={size / 2}
 *     cy={size / 2}
 *     r={radius}
 *     stroke={color}
 *     strokeWidth={thickness}
 *     strokeDasharray={circumference}
 *     strokeDashoffset={strokeDashoffset}
 *     fill="none"
 *   />
 * </Svg>
 * ```
 */
