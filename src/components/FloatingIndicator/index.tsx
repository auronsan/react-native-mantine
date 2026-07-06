import React, { forwardRef, useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';
import type {
  DefaultProps,
  MantineColor,
  MantineNumberSize,
} from '../../theme/types';
import { useComponentDefaultProps, useTheme } from '../../theme/theme-provider';
import { createStyles } from '../../theme';

export interface FloatingIndicatorTarget {
  /** Offset from the left edge of the parent */
  x: number;

  /** Offset from the top edge of the parent */
  y: number;

  /** Target width */
  width: number;

  /** Target height */
  height: number;
}

export interface FloatingIndicatorProps extends DefaultProps {
  /** Layout of the target element relative to the parent, `null` hides the indicator. Use `onLayout` of the target to measure it. */
  target?: FloatingIndicatorTarget | null;

  /** Transition duration in ms */
  transitionDuration?: number;

  /** Key of theme.radius or any valid value to set border-radius */
  radius?: MantineNumberSize;

  /** Key of theme.colors or any valid color, controls background color */
  color?: MantineColor;

  /** Indicator content */
  children?: React.ReactNode;
}

const useStyles = createStyles(
  (theme, { radius, color }: { radius: MantineNumberSize; color?: MantineColor }) => ({
    root: {
      position: 'absolute',
      borderRadius: theme.fn.radius(radius) as number,
      backgroundColor: color
        ? theme.fn.themeColor(color as string)
        : theme.colorScheme === 'dark'
          ? theme.fn.themeColor('dark', 5)
          : theme.white,
    },
  })
);

const defaultProps: Partial<FloatingIndicatorProps> = {
  transitionDuration: 150,
  radius: 'sm',
};

/**
 * FloatingIndicator is an animated box that slides between target positions
 * within a relatively positioned parent, used for active-state indicators.
 * Port of Mantine v7.13 FloatingIndicator component adapted to layout rects.
 */
export const FloatingIndicator = forwardRef<View, FloatingIndicatorProps>(
  (props, ref) => {
    const {
      target,
      transitionDuration,
      radius,
      color,
      children,
      style,
      ...others
    } = useComponentDefaultProps('FloatingIndicator', defaultProps, props);

    useTheme();

    const { styles, sx } = useStyles(
      { radius: radius ?? 'sm', color },
      { name: 'FloatingIndicator' }
    );

    const animated = useRef({
      x: new Animated.Value(target?.x ?? 0),
      y: new Animated.Value(target?.y ?? 0),
      width: new Animated.Value(target?.width ?? 0),
      height: new Animated.Value(target?.height ?? 0),
      opacity: new Animated.Value(target ? 1 : 0),
    }).current;
    const initialized = useRef(Boolean(target));

    const targetX = target?.x;
    const targetY = target?.y;
    const targetWidth = target?.width;
    const targetHeight = target?.height;
    const duration = transitionDuration ?? 150;

    useEffect(() => {
      if (
        targetX === undefined ||
        targetY === undefined ||
        targetWidth === undefined ||
        targetHeight === undefined
      ) {
        initialized.current = false;
        Animated.timing(animated.opacity, {
          toValue: 0,
          duration,
          useNativeDriver: false,
        }).start();
        return;
      }

      if (!initialized.current || duration <= 0) {
        initialized.current = true;
        animated.x.setValue(targetX);
        animated.y.setValue(targetY);
        animated.width.setValue(targetWidth);
        animated.height.setValue(targetHeight);
        animated.opacity.setValue(1);
        return;
      }

      Animated.parallel([
        Animated.timing(animated.x, {
          toValue: targetX,
          duration,
          useNativeDriver: false,
        }),
        Animated.timing(animated.y, {
          toValue: targetY,
          duration,
          useNativeDriver: false,
        }),
        Animated.timing(animated.width, {
          toValue: targetWidth,
          duration,
          useNativeDriver: false,
        }),
        Animated.timing(animated.height, {
          toValue: targetHeight,
          duration,
          useNativeDriver: false,
        }),
        Animated.timing(animated.opacity, {
          toValue: 1,
          duration,
          useNativeDriver: false,
        }),
      ]).start();
    }, [targetX, targetY, targetWidth, targetHeight, duration, animated]);

    return (
      <Animated.View
        ref={ref}
        pointerEvents="none"
        style={[
          sx(styles.root, style) as any,
          {
            left: animated.x,
            top: animated.y,
            width: animated.width,
            height: animated.height,
            opacity: animated.opacity,
          },
        ]}
        {...others}
      >
        {children}
      </Animated.View>
    );
  }
);

FloatingIndicator.displayName = 'FloatingIndicator';
