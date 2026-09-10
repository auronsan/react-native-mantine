import React, { forwardRef, useEffect, useRef, useMemo } from 'react';
import { View, Animated } from 'react-native';
import { BoxView } from '../BoxView';
import { Text } from '../Text';
import type { DefaultProps, MantineColor } from '../../theme/types';
import { useComponentDefaultProps, useTheme } from '../../theme/theme-provider';
import { createStyles } from '../../theme';
import { rem } from '../../theme/utils/rem';
import { useAdapter } from '../../adapters/context';

// Animated wrappers are created once per Circle implementation
const animatedCircleCache = new WeakMap<object, React.ComponentType<any>>();
const getAnimatedCircle = (Circle: React.ComponentType<any>) => {
  let cached = animatedCircleCache.get(Circle);
  if (!cached) {
    cached = Animated.createAnimatedComponent(Circle as any);
    animatedCircleCache.set(Circle, cached);
  }
  return cached;
};

/**
 * Circular progress made of one or more colored sections.
 *
 * Rendering: when an `svg` adapter is available (react-native-svg installed,
 * or `{ Svg, Circle }` passed via `Theme adapters` / `configureMantine`) the
 * ring is drawn with stroke-dasharray arcs, which is pixel-accurate and
 * supports `roundCaps`. Otherwise a View-based ring built from rotated border
 * segments is used, so the component works with zero native dependencies.
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
    {
      size: size ?? defaultProps.size ?? 120,
      thickness: thickness ?? defaultProps.thickness ?? 12,
      rootColor
    },
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

  const svg = useAdapter('svg', { warn: false });
  const ringSize = size ?? defaultProps.size ?? 120;
  const ringThickness = thickness ?? defaultProps.thickness ?? 12;

  // SVG renderer: one arc per section, animated through strokeDashoffset
  const renderSvgSections = () => {
    if (!svg) return null;
    const { Svg, Circle } = svg;
    const AnimatedCircle = getAnimatedCircle(Circle);
    const radius = (ringSize - ringThickness) / 2;
    const circumference = 2 * Math.PI * radius;
    const center = ringSize / 2;
    let accumulated = 0;

    const arcs = normalizedSections.map((section, index) => {
      const sectionColor = theme.fn.themeColor(section.color, 6);
      const rotation = -90 + (accumulated / 100) * 360;
      accumulated += section.percentage;
      const dashOffset = section.animatedValue.interpolate({
        inputRange: [0, 100],
        outputRange: [circumference, 0],
        extrapolate: 'clamp',
      });
      return (
        <AnimatedCircle
          key={`section-${index}`}
          cx={center}
          cy={center}
          r={radius}
          stroke={sectionColor}
          strokeWidth={ringThickness}
          strokeLinecap={roundCaps ? 'round' : 'butt'}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={dashOffset}
          fill="none"
          transform={`rotate(${rotation} ${center} ${center})`}
        />
      );
    });

    return (
      <Svg width={ringSize} height={ringSize} testID="ring-progress-svg">
        <Circle cx={center} cy={center} r={radius} stroke={rootColor} strokeWidth={ringThickness} fill="none" />
        {arcs}
      </Svg>
    );
  };

  // View renderer (no native dependencies): rotated border segments
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
              width: size ?? defaultProps.size ?? 120,
              height: size ?? defaultProps.size ?? 120,
              borderRadius: (size ?? defaultProps.size ?? 120) / 2,
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

  const accessibilityNow = Math.min(
    100,
    Math.max(
      0,
      sections.reduce((total, section) => total + (section.value || 0), 0)
    )
  );

  return (
    <BoxView
      ref={ref}
      style={sx(styles.root, style)}
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: accessibilityNow }}
      accessibilityLabel={typeof label === 'string' ? label : undefined}
      {...others}
    >
      {svg ? (
        renderSvgSections()
      ) : (
        <>
          <View style={styles.track} />
          <View style={styles.progressContainer}>{renderSections()}</View>
        </>
      )}
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
