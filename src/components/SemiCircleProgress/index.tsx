import React, { forwardRef, useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';
import { BoxView } from '../BoxView';
import { Text } from '../Text';
import type { DefaultProps, MantineColor } from '../../theme/types';
import { useComponentDefaultProps, useTheme } from '../../theme/theme-provider';
import { createStyles } from '../../theme';

export interface SemiCircleProgressProps extends DefaultProps {
  /** Progress value from 0 to 100 */
  value: number;

  /** Diameter of the semicircle in px */
  size?: number;

  /** Ring thickness in px */
  thickness?: number;

  /** Direction from which the arc is filled */
  fillDirection?: 'left-to-right' | 'right-to-left';

  /** Orientation of the semicircle */
  orientation?: 'up' | 'down';

  /** Color of the filled segment */
  filledSegmentColor?: MantineColor;

  /** Color of the empty segment */
  emptySegmentColor?: MantineColor;

  /** Color of the inner area, should match the background the component is rendered on */
  innerBackgroundColor?: MantineColor;

  /** Transition duration of the filled segment in ms, 0 disables animation */
  transitionDuration?: number;

  /** Label displayed inside the progress */
  label?: React.ReactNode;

  /** Label position relative to the semicircle */
  labelPosition?: 'center' | 'bottom';

  /** Label text style */
  labelStyle?: any;
}

const useStyles = createStyles(
  (
    theme,
    {
      size,
      thickness,
      emptyColor,
      innerColor,
    }: {
      size: number;
      thickness: number;
      emptyColor: string;
      innerColor: string;
    }
  ) => ({
    root: {
      alignItems: 'center',
    },
    gauge: {
      width: size,
      height: size / 2,
      overflow: 'hidden',
    },
    track: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: size,
      height: size / 2,
      borderTopLeftRadius: size / 2,
      borderTopRightRadius: size / 2,
      backgroundColor: emptyColor,
    },
    fillWrapper: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: size,
      height: size,
    },
    fillHalf: {
      position: 'absolute',
      top: size / 2,
      left: 0,
      width: size,
      height: size / 2,
    },
    innerMask: {
      position: 'absolute',
      top: thickness,
      left: thickness,
      width: size - thickness * 2,
      height: size / 2 - thickness,
      borderTopLeftRadius: (size - thickness * 2) / 2,
      borderTopRightRadius: (size - thickness * 2) / 2,
      backgroundColor: innerColor,
    },
    labelCenter: {
      position: 'absolute',
      bottom: 0,
      left: thickness,
      right: thickness,
      alignItems: 'center',
    },
    labelBottom: {
      marginTop: theme.spacing.xs / 2,
      alignItems: 'center',
    },
    labelText: {
      fontSize: theme.fontSizes.md as number,
      fontWeight: '600',
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  })
);

const defaultProps: Partial<SemiCircleProgressProps> = {
  size: 200,
  thickness: 12,
  fillDirection: 'left-to-right',
  orientation: 'up',
  transitionDuration: 0,
  labelPosition: 'bottom',
};

/**
 * SemiCircleProgress represents a value as a semicircular gauge.
 * Port of Mantine v7.16 SemiCircleProgress component.
 */
export const SemiCircleProgress = forwardRef<View, SemiCircleProgressProps>(
  (props, ref) => {
    const {
      value,
      size,
      thickness,
      fillDirection,
      orientation,
      filledSegmentColor,
      emptySegmentColor,
      innerBackgroundColor,
      transitionDuration,
      label,
      labelPosition,
      labelStyle,
      style,
      ...others
    } = useComponentDefaultProps('SemiCircleProgress', defaultProps, props);

    const theme = useTheme();

    const resolvedSize = size ?? 200;
    const resolvedThickness = thickness ?? 12;
    const filledColor = theme.fn.themeColor(
      (filledSegmentColor as string) || theme.primaryColor
    );
    const emptyColor = emptySegmentColor
      ? theme.fn.themeColor(emptySegmentColor as string)
      : theme.colorScheme === 'dark'
        ? theme.fn.themeColor('dark', 4)
        : theme.fn.themeColor('gray', 2);
    const innerColor = innerBackgroundColor
      ? theme.fn.themeColor(innerBackgroundColor as string)
      : theme.colorScheme === 'dark'
        ? theme.fn.themeColor('dark', 7)
        : theme.white;

    const { styles, sx } = useStyles(
      {
        size: resolvedSize,
        thickness: resolvedThickness,
        emptyColor,
        innerColor,
      },
      { name: 'SemiCircleProgress' }
    );

    const clamped = Math.min(100, Math.max(0, value));
    const animatedValue = useRef(new Animated.Value(clamped)).current;

    useEffect(() => {
      if (transitionDuration && transitionDuration > 0) {
        Animated.timing(animatedValue, {
          toValue: clamped,
          duration: transitionDuration,
          useNativeDriver: true,
        }).start();
      } else {
        animatedValue.setValue(clamped);
      }
    }, [clamped, transitionDuration, animatedValue]);

    const direction = fillDirection === 'right-to-left' ? -1 : 1;

    const rotate = animatedValue.interpolate({
      inputRange: [0, 100],
      outputRange: ['0deg', `${180 * direction}deg`],
    });

    const labelNode =
      label !== undefined && label !== null ? (
        typeof label === 'string' || typeof label === 'number' ? (
          <Text style={sx(styles.labelText, labelStyle)}>{label}</Text>
        ) : (
          label
        )
      ) : null;

    return (
      <BoxView
        ref={ref}
        style={sx(styles.root, style)}
        accessibilityRole="progressbar"
        accessibilityValue={{ min: 0, max: 100, now: clamped }}
        {...others}
      >
        <View
          style={[
            styles.gauge,
            orientation === 'down' && { transform: [{ rotate: '180deg' }] },
          ]}
        >
          <View style={styles.track} />
          <Animated.View
            style={[styles.fillWrapper, { transform: [{ rotate }] }]}
          >
            <View
              style={[styles.fillHalf, { backgroundColor: filledColor }]}
            />
          </Animated.View>
          <View style={styles.innerMask} />
          {labelPosition === 'center' && orientation === 'up' && (
            <View style={styles.labelCenter}>{labelNode}</View>
          )}
        </View>
        {(labelPosition === 'bottom' ||
          (labelPosition === 'center' && orientation === 'down')) && (
          <View style={styles.labelBottom}>{labelNode}</View>
        )}
      </BoxView>
    );
  }
);

SemiCircleProgress.displayName = 'SemiCircleProgress';
