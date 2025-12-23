import React, { forwardRef, useRef, useState, useCallback } from 'react';
import {
  View,
  PanResponder,
  Animated,
} from 'react-native';
import type {
  LayoutChangeEvent,
  GestureResponderEvent,
  PanResponderGestureState,
} from 'react-native';
import { BoxView } from '../BoxView';
import { Text } from '../Text';
import type { DefaultProps, MantineColor, MantineNumberSize, MantineSize } from '../../theme/types';
import { useComponentDefaultProps, useTheme } from '../../theme/theme-provider';
import { createStyles } from '../../theme';
import { rem } from '../../theme/utils/rem';

export interface SliderProps extends DefaultProps {
  /** Slider value (controlled) */
  value?: number;

  /** Default value (uncontrolled) */
  defaultValue?: number;

  /** Called when value changes */
  onChange?: (value: number) => void;

  /** Called when user stops dragging */
  onChangeEnd?: (value: number) => void;

  /** Minimum value */
  min?: number;

  /** Maximum value */
  max?: number;

  /** Step interval */
  step?: number;

  /** Slider size */
  size?: MantineSize;

  /** Slider color */
  color?: MantineColor;

  /** Key of theme.radius or any valid value to set border-radius */
  radius?: MantineNumberSize;

  /** Display label */
  label?: ((value: number) => React.ReactNode) | React.ReactNode;

  /** Display marks */
  marks?: { value: number; label?: React.ReactNode }[];

  /** Disabled state */
  disabled?: boolean;

  /** Show label on hover */
  showLabelOnHover?: boolean;

  /** Thumb children, displays above thumb */
  thumbChildren?: React.ReactNode;

  /** Hides thumb */
  thumbWithoutBorder?: boolean;

  /** Additional styles */
  style?: any;
}

const sizes = {
  xs: { height: rem(4), thumb: rem(12) },
  sm: { height: rem(6), thumb: rem(16) },
  md: { height: rem(8), thumb: rem(20) },
  lg: { height: rem(10), thumb: rem(24) },
  xl: { height: rem(12), thumb: rem(28) },
};

const useStyles = createStyles(
  (
    theme,
    {
      color,
      radius,
      disabled,
    }: {
      color: MantineColor;
      radius: MantineNumberSize;
      disabled: boolean;
    },
    { size }
  ) => {
    const colors = theme.colors[color] || theme.colors[theme.primaryColor];
    const sizeStyles = sizes[size] || sizes.md;

    return {
      root: {
        position: 'relative',
        width: '100%',
        paddingVertical: rem(10),
        opacity: disabled ? 0.5 : 1,
      },
      track: {
        position: 'relative',
        height: sizeStyles.height,
        backgroundColor:
          theme.colorScheme === 'dark' ? theme.colors.dark?.[4] : theme.colors.gray?.[2],
        borderRadius: theme.fn.radius(radius),
        overflow: 'hidden',
      },
      bar: {
        position: 'absolute',
        height: '100%',
        backgroundColor: colors?.[6] || colors?.[5] || theme.primaryBgColor,
        borderRadius: theme.fn.radius(radius),
      },
      thumb: {
        position: 'absolute',
        width: sizeStyles.thumb,
        height: sizeStyles.thumb,
        borderRadius: sizeStyles.thumb,
        backgroundColor: theme.white,
        borderWidth: rem(3),
        borderColor: colors?.[6] || colors?.[5] || theme.primaryBgColor,
        top: -(sizeStyles.thumb / 2 - sizeStyles.height / 2),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
      },
      label: {
        position: 'absolute',
        top: rem(-32),
        backgroundColor: colors?.[6] || colors?.[5] || theme.primaryBgColor,
        paddingHorizontal: theme.spacing.xs,
        paddingVertical: rem(4),
        borderRadius: theme.fn.radius('sm'),
        minWidth: rem(28),
        alignItems: 'center',
        justifyContent: 'center',
      },
      labelText: {
        color: theme.white,
        fontSize: theme.fontSizes.xs,
        fontWeight: '600',
      },
      marks: {
        position: 'absolute',
        width: '100%',
        top: sizeStyles.height,
        flexDirection: 'row',
      },
      mark: {
        position: 'absolute',
        width: rem(2),
        height: rem(6),
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark?.[4] : theme.colors.gray?.[3],
        borderRadius: rem(1),
      },
      markLabel: {
        position: 'absolute',
        top: rem(10),
        fontSize: theme.fontSizes.xs,
        color: theme.colorScheme === 'dark' ? theme.colors.dark?.[2] : theme.colors.gray?.[6],
        transform: [{ translateX: -10 }],
      },
    };
  }
);

const defaultProps: Partial<SliderProps> = {
  min: 0,
  max: 100,
  step: 1,
  size: 'md',
  color: 'blue',
  radius: 'xl',
  disabled: false,
  showLabelOnHover: true,
  thumbWithoutBorder: false,
};

export const Slider = forwardRef<any, SliderProps>((props, ref) => {
  const {
    value: controlledValue,
    defaultValue,
    onChange,
    onChangeEnd,
    min,
    max,
    step,
    size,
    color,
    radius,
    label,
    marks,
    disabled,
    showLabelOnHover,
    thumbChildren,
    thumbWithoutBorder,
    style,
    ...others
  } = useComponentDefaultProps('Slider', defaultProps, props);

  const theme = useTheme();
  const { styles, sx } = useStyles(
    { color, radius, disabled },
    { name: 'Slider', size }
  ) as any;

  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue ?? min ?? 0);
  const [trackWidth, setTrackWidth] = useState(0);
  const [showLabel, setShowLabel] = useState(false);

  const value = controlledValue !== undefined ? controlledValue : uncontrolledValue;

  const position = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;

  const clampValue = useCallback(
    (val: number) => {
      const clamped = Math.max(min!, Math.min(max!, val));
      const stepped = Math.round(clamped / step!) * step!;
      return stepped;
    },
    [min, max, step]
  );

  const updateValue = useCallback(
    (newValue: number) => {
      const clampedValue = clampValue(newValue);
      if (controlledValue === undefined) {
        setUncontrolledValue(clampedValue);
      }
      onChange?.(clampedValue);
    },
    [clampValue, controlledValue, onChange]
  );

  const getValueFromPosition = useCallback(
    (posX: number) => {
      const percentage = posX / trackWidth;
      return min! + percentage * (max! - min!);
    },
    [trackWidth, min, max]
  );

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !disabled!,
      onMoveShouldSetPanResponder: () => !disabled!,
      onPanResponderGrant: () => {
        setShowLabel(true);
        Animated.spring(scale, {
          toValue: 1.2,
          useNativeDriver: true,
        }).start();
      },
      onPanResponderMove: (evt: GestureResponderEvent, gestureState: PanResponderGestureState) => {
        const newValue = getValueFromPosition(gestureState.moveX);
        updateValue(newValue);
      },
      onPanResponderRelease: () => {
        setShowLabel(false);
        Animated.spring(scale, {
          toValue: 1,
          useNativeDriver: true,
        }).start();
        onChangeEnd?.(value);
      },
    })
  ).current;

  const handleLayout = (event: LayoutChangeEvent) => {
    setTrackWidth(event.nativeEvent.layout.width);
  };

  const percentage = ((value - min!) / (max! - min!)) * 100;
  const thumbPosition = (trackWidth * percentage) / 100;

  const renderLabel = () => {
    if (!showLabel && !showLabelOnHover) return null;
    if (!showLabel) return null;

    const labelContent = typeof label === 'function' ? label(value) : label || value;

    return (
      <BoxView style={[styles.label, { left: -(styles.label.minWidth / 2) }]}>
        <Text style={styles.labelText}>{labelContent}</Text>
      </BoxView>
    );
  };

  return (
    <BoxView ref={ref} style={sx(styles.root, style)} {...others}>
      <View style={styles.track} onLayout={handleLayout} {...panResponder.panHandlers}>
        <View style={[styles.bar, { width: `${percentage}%` }]} />

        {trackWidth > 0 && (
          <Animated.View
            style={[
              styles.thumb,
              {
                left: thumbPosition - (styles.thumb.width / 2),
                transform: [{ scale }],
              },
            ]}
          >
            {renderLabel()}
            {thumbChildren}
          </Animated.View>
        )}
      </View>

      {marks && marks.length > 0 && (
        <View style={styles.marks}>
          {marks.map((mark, index) => {
            const markPercentage = ((mark.value - min!) / (max! - min!)) * 100;
            const markPosition = (trackWidth * markPercentage) / 100;

            return (
              <View key={index}>
                <View style={[styles.mark, { left: markPosition }]} />
                {mark.label && (
                  <Text style={[styles.markLabel, { left: markPosition }]}>{mark.label}</Text>
                )}
              </View>
            );
          })}
        </View>
      )}
    </BoxView>
  );
});

Slider.displayName = 'Slider';
