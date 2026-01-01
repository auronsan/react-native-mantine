import React, { forwardRef, useEffect, useRef, useMemo } from 'react';
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
      color: theme.colorScheme === 'dark' ? theme.fn.themeColor('dark', 0) : theme.black,
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
    (theme.colorScheme === 'dark' ? theme.fn.themeColor('dark', 4) : theme.fn.themeColor('gray', 2));

  const { styles, sx} = useStyles(
    { size, thickness, rootColor },
    { name: 'RingProgress' }
  ) as any;

  // Create a stable reference for animated values
  const animatedValuesRef = useRef<Map<number, Animated.Value>>(new Map());

  // Get or create animated value for a section index
  const getAnimatedValue = (index: number, initialValue: number = 0) => {
    if (!animatedValuesRef.current.has(index)) {
      animatedValuesRef.current.set(index, new Animated.Value(initialValue));
    }
    return animatedValuesRef.current.get(index)!;
  };

  // Update animation values when sections change
  useEffect(() => {
    // Clean up unused animated values
    const currentIndices = new Set(sections.map((_, i) => i));
    const keysToDelete: number[] = [];
    animatedValuesRef.current.forEach((_, key) => {
      if (!currentIndices.has(key)) {
        keysToDelete.push(key);
      }
    });
    keysToDelete.forEach(key => animatedValuesRef.current.delete(key));

    // Animate each section
    const animations = sections.map((section, index) => {
      const animValue = getAnimatedValue(index, 0);
      return Animated.timing(animValue, {
        toValue: section.value,
        duration: 1000,
        useNativeDriver: false,
      });
    });

    Animated.parallel(animations).start();
  }, [sections]);

  // Memoize normalized sections to prevent unnecessary recalculations
  const normalizedSections = useMemo(() => {
    return sections.map((section, index) => ({
      ...section,
      percentage: section.value,
      animatedValue: getAnimatedValue(index, 0),
    }));
  }, [sections]);

  // Render animated ring using circular segments
  // Note: This is a simplified implementation. For full SVG support, use react-native-svg
  const renderSections = () => {
    let accumulatedAngle = 0;

    return normalizedSections.map((section, index) => {
      const sectionColor = theme.fn.themeColor(section.color, 6);
      const startAngle = accumulatedAngle;

      // Create an array to hold segments for this section
      const sectionSegments = [];

      // Create 8 segments for smoother circular rendering (each 45 degrees)
      const totalSegments = 8;
      const segmentAngle = 360 / totalSegments;

      for (let i = 0; i < totalSegments; i++) {
        const segmentStartDegrees = i * segmentAngle;
        const segmentEndDegrees = (i + 1) * segmentAngle;

        // Calculate opacity based on progress through this segment
        const segmentOpacity = section.animatedValue.interpolate({
          inputRange: [
            (segmentStartDegrees / 360) * 100,
            (segmentEndDegrees / 360) * 100,
          ],
          outputRange: [0, 1],
          extrapolate: 'clamp',
        });

        // Determine which border(s) to show for this segment
        const borderConfig: any = {
          borderColor: 'transparent',
        };

        // Map segments to borders (simplified circular approximation)
        const borderIndex = i % 4;
        const borders: Array<'borderTopColor' | 'borderRightColor' | 'borderBottomColor' | 'borderLeftColor'> = [
          'borderTopColor',
          'borderRightColor',
          'borderBottomColor',
          'borderLeftColor'
        ];
        borderConfig[borders[borderIndex]!] = sectionColor;

        sectionSegments.push(
          <Animated.View
            key={`section-${index}-segment-${i}`}
            style={{
              position: 'absolute',
              width: size!,
              height: size!,
              borderRadius: size! / 2,
              borderWidth: thickness,
              ...borderConfig,
              transform: [{ rotate: `${startAngle + segmentStartDegrees}deg` }],
              opacity: segmentOpacity,
            }}
          />
        );
      }

      // Update accumulated angle for next section
      accumulatedAngle += (section.percentage / 100) * 360;

      return sectionSegments;
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
