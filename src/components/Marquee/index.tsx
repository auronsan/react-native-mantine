import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { Animated, Easing, View } from 'react-native';
import { BoxView } from '../BoxView';
import { PlatformLinearGradient } from '../LinearGradient/PlatformLinearGradient';
import type {
  DefaultProps,
  MantineColor,
  MantineNumberSize,
  MantineSize,
} from '../../theme/types';
import { useComponentDefaultProps, useTheme } from '../../theme/theme-provider';
import { createStyles } from '../../theme';

export interface MarqueeProps extends DefaultProps {
  /** Content that is scrolled */
  children: React.ReactNode;

  /** If set, the content is scrolled in the opposite direction */
  reverse?: boolean;

  /** Scroll orientation */
  orientation?: 'horizontal' | 'vertical';

  /** Number of content copies rendered to create a seamless loop */
  repeat?: number;

  /** Duration of one full loop in ms */
  duration?: number;

  /** Key of theme.spacing or number, gap between content copies */
  gap?: MantineNumberSize;

  /** Determines whether edges should be faded with a gradient */
  fadeEdges?: boolean;

  /** Color of the fade gradient, should match the background the component is rendered on */
  fadeEdgeColor?: MantineColor;

  /** Size of the fade gradient */
  fadeEdgeSize?: number | string;
}

const useStyles = createStyles(
  (
    _theme,
    { horizontal, gap }: { horizontal: boolean; gap: number }
  ) => ({
    root: {
      overflow: 'hidden',
    },
    strip: {
      flexDirection: horizontal ? 'row' : 'column',
      alignSelf: 'flex-start',
      gap,
    },
    group: {
      flexDirection: horizontal ? 'row' : 'column',
      alignItems: 'center',
      gap,
    },
  })
);

const defaultProps: Partial<MarqueeProps> = {
  reverse: false,
  orientation: 'horizontal',
  repeat: 4,
  duration: 100000,
  gap: 'md',
  fadeEdges: true,
  fadeEdgeSize: '10%',
};

/**
 * Marquee continuously scrolls its content in a loop.
 * Port of Mantine v8 Marquee extension component.
 */
export const Marquee = forwardRef<View, MarqueeProps>((props, ref) => {
  const {
    children,
    reverse,
    orientation,
    repeat,
    duration,
    gap,
    fadeEdges,
    fadeEdgeColor,
    fadeEdgeSize,
    style,
    ...others
  } = useComponentDefaultProps('Marquee', defaultProps, props);

  const theme = useTheme();

  const horizontal = orientation !== 'vertical';
  const gapPx =
    typeof gap === 'number'
      ? gap
      : (theme.spacing[gap as MantineSize] ?? theme.spacing.md);

  const { styles, sx } = useStyles(
    { horizontal, gap: gapPx },
    { name: 'Marquee' }
  );

  const [groupSize, setGroupSize] = useState(0);
  const animated = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (groupSize <= 0) {
      return undefined;
    }

    animated.setValue(0);
    const loop = Animated.loop(
      Animated.timing(animated, {
        toValue: 1,
        duration: duration ?? 100000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    loop.start();

    return () => loop.stop();
  }, [groupSize, duration, animated]);

  const distance = groupSize + gapPx;
  const translate = animated.interpolate({
    inputRange: [0, 1],
    outputRange: reverse ? [-distance, 0] : [0, -distance],
  });

  const repeatCount = Math.max(2, repeat ?? 4);

  const edgeColor = fadeEdgeColor
    ? theme.fn.themeColor(fadeEdgeColor as string)
    : theme.colorScheme === 'dark'
      ? theme.fn.themeColor('dark', 7)
      : theme.white;
  const edgeTransparent = theme.fn.rgba(edgeColor, 0);

  const fadeStyle = {
    position: 'absolute' as const,
    ...(horizontal
      ? { top: 0, bottom: 0, width: fadeEdgeSize }
      : { left: 0, right: 0, height: fadeEdgeSize }),
  };

  return (
    <BoxView ref={ref} style={sx(styles.root, style)} {...others}>
      <Animated.View
        style={[
          styles.strip,
          {
            transform: horizontal
              ? [{ translateX: translate }]
              : [{ translateY: translate }],
          },
        ]}
      >
        {Array.from({ length: repeatCount }).map((_, index) => (
          <View
            key={index}
            style={styles.group}
            onLayout={
              index === 0
                ? (event) => {
                    const { width, height } = event.nativeEvent.layout;
                    setGroupSize(horizontal ? width : height);
                  }
                : undefined
            }
          >
            {children}
          </View>
        ))}
      </Animated.View>

      {fadeEdges && (
        <>
          <View
            pointerEvents="none"
            style={[fadeStyle, horizontal ? { left: 0 } : { top: 0 }] as any}
          >
            <PlatformLinearGradient
              colors={[edgeColor, edgeTransparent]}
              start={{ x: 0, y: horizontal ? 0.5 : 0 }}
              end={horizontal ? { x: 1, y: 0.5 } : { x: 0, y: 1 }}
              style={{ flex: 1 }}
            />
          </View>
          <View
            pointerEvents="none"
            style={
              [fadeStyle, horizontal ? { right: 0 } : { bottom: 0 }] as any
            }
          >
            <PlatformLinearGradient
              colors={[edgeTransparent, edgeColor]}
              start={{ x: 0, y: horizontal ? 0.5 : 0 }}
              end={horizontal ? { x: 1, y: 0.5 } : { x: 0, y: 1 }}
              style={{ flex: 1 }}
            />
          </View>
        </>
      )}
    </BoxView>
  );
});

Marquee.displayName = 'Marquee';
