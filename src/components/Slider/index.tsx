import { forwardRef, useRef, useState, useCallback, useEffect } from 'react';
import { View, Animated, PanResponder } from 'react-native';
import type { AccessibilityActionEvent } from 'react-native';
import { BoxView } from '../BoxView';
import { Text } from '../Text';
import type {
  DefaultProps,
  MantineColor,
  MantineNumberSize,
  MantineSize,
} from '../../theme/types';
import { useComponentDefaultProps } from '../../theme/theme-provider';
import { createStyles } from '../../theme';
import { rem } from '../../theme/utils/rem';

/**
 * Represents a mark on the slider track
 *
 * @property {number} value - Value at which mark should be displayed
 * @property {React.ReactNode} [label] - Optional label to display below the mark
 */
export interface SliderMark {
  /** Value at which mark should be displayed */
  value: number;
  /** Mark label */
  label?: React.ReactNode;
}

/**
 * Props for the Slider component
 *
 * @property {number} [value] - Current value (controlled mode)
 * @property {number} [defaultValue] - Default value for uncontrolled mode
 * @property {(value: number) => void} [onChange] - Callback fired when value changes during sliding
 * @property {(value: number) => void} [onChangeEnd] - Callback fired when user stops sliding
 * @property {number} [min=0] - Minimum slider value
 * @property {number} [max=100] - Maximum slider value
 * @property {number} [step=1] - Step value for slider increments
 * @property {MantineColor} [color='blue'] - Color from theme for the track and thumb
 * @property {MantineSize} [size='md'] - Slider size. One of: 'xs', 'sm', 'md', 'lg', 'xl'
 * @property {MantineNumberSize} [radius='xl'] - Key of theme.radius or number to set border-radius
 * @property {SliderMark[]} [marks] - Array of marks to display on the track
 * @property {React.ReactNode | ((value: number) => React.ReactNode) | null} [label] - Function to generate label or any react node to render, set to null to disable label
 * @property {boolean} [disabled=false] - Disabled state
 * @property {boolean} [showLabelOnHover=true] - If true, label will be shown only when pressing/dragging
 * @property {string} [accessibilityLabel] - Accessibility label for the slider
 * @property {any} [style] - Additional styles to apply to the slider container
 */
export interface SliderProps extends DefaultProps {
  /** Current value (controlled) */
  value?: number;

  /** Default value (uncontrolled) */
  defaultValue?: number;

  /** Called when value changes during sliding */
  onChange?: (value: number) => void;

  /** Called when user stops sliding */
  onChangeEnd?: (value: number) => void;

  /** Minimum value */
  min?: number;

  /** Maximum value */
  max?: number;

  /** Step value */
  step?: number;

  /** Color from theme */
  color?: MantineColor;

  /** Slider size */
  size?: MantineSize;

  /** Key of theme.radius or number to set border-radius */
  radius?: MantineNumberSize;

  /** Marks which will be placed on the track */
  marks?: SliderMark[];

  /** Function to generate label or any react node to render instead, set to null to disable label */
  label?: React.ReactNode | ((value: number) => React.ReactNode) | null;

  /** Disabled state */
  disabled?: boolean;

  /** If true label will be shown on press */
  showLabelOnHover?: boolean;

  /** Accessibility label */
  accessibilityLabel?: string;

  /** Additional styles */
  style?: any;
}

const sizes = {
  xs: rem(4),
  sm: rem(6),
  md: rem(8),
  lg: rem(10),
  xl: rem(12),
};

const thumbSizes = {
  xs: rem(14),
  sm: rem(18),
  md: rem(20),
  lg: rem(24),
  xl: rem(28),
};

const useStyles = createStyles(
  (
    theme,
    {
      color,
      radius,
      size,
      disabled,
    }: {
      color: MantineColor;
      radius: MantineNumberSize;
      size: MantineSize;
      disabled: boolean;
    }
  ) => {
    const trackHeight = typeof size === 'number' ? rem(size) : sizes[size as keyof typeof sizes] || sizes.md;
    const thumbSize = typeof size === 'number' ? rem(size * 2.5) : thumbSizes[size as keyof typeof thumbSizes] || thumbSizes.md;

    return {
      root: {
        position: 'relative',
        paddingVertical: rem(10) as any,
      },
      track: {
        position: 'relative',
        height: trackHeight as any,
        backgroundColor: (theme.colorScheme === 'dark'
          ? theme.fn.themeColor('dark', 4)
          : theme.fn.themeColor('gray', 2)) as string,
        borderRadius: theme.fn.radius(radius),
        overflow: 'hidden',
      },
      bar: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        backgroundColor: (disabled
          ? theme.fn.themeColor('gray', 5)
          : theme.fn.themeColor(color || theme.primaryColor, 6)) as string,
      },
      thumbContainer: {
        position: 'absolute',
        top: '50%' as any,
        marginTop: -(thumbSize as number) / 2,
        marginLeft: -(thumbSize as number) / 2,
      },
      thumb: {
        width: thumbSize as any,
        height: thumbSize as any,
        borderRadius: (thumbSize as number) / 2,
        backgroundColor: (theme.colorScheme === 'dark' ? theme.colors.white : theme.colors.white) as unknown as string,
        borderWidth: 4,
        borderColor: (disabled
          ? theme.fn.themeColor('gray', 5)
          : theme.fn.themeColor(color || theme.primaryColor, 6)) as unknown as string,
        shadowColor: theme.colors.black as unknown as string,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 1,
        elevation: 1,
      },
      thumbActive: {
        transform: [{ scale: 1.05 }],
        elevation: 2,
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      label: {
        position: 'absolute',
        bottom: '100%' as any,
        marginBottom: rem(5) as any,
        backgroundColor: (theme.colorScheme === 'dark'
          ? theme.fn.themeColor('dark', 6)
          : theme.fn.themeColor('gray', 9)) as string,
        paddingHorizontal: rem(8) as any,
        paddingVertical: rem(4) as any,
        borderRadius: theme.fn.radius('sm'),
        minWidth: rem(24) as any,
        alignItems: 'center',
        justifyContent: 'center',
      },
      labelText: {
        color: theme.colors.white as unknown as string,
        fontSize: theme.fontSizes.xs,
        fontWeight: '500' as any,
      },
      marksContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      },
      mark: {
        position: 'absolute',
        top: '50%' as any,
        width: rem(2) as any,
        height: trackHeight as any,
        marginTop: -(trackHeight as number) / 2,
        backgroundColor: (theme.colorScheme === 'dark'
          ? theme.fn.themeColor('dark', 0)
          : theme.colors.white) as string,
      },
      markLabel: {
        position: 'absolute',
        top: '100%' as any,
        marginTop: rem(5) as any,
        fontSize: theme.fontSizes.xs,
        color: (theme.colorScheme === 'dark'
          ? theme.fn.themeColor('dark', 2)
          : theme.fn.themeColor('gray', 6)) as string,
        transform: [{ translateX: -50 }],
      },
    };
  }
);

const defaultProps: Partial<SliderProps> = {
  min: 0,
  max: 100,
  step: 1,
  color: 'blue',
  size: 'md',
  radius: 'xl',
  marks: [],
  label: (value) => value.toString(),
  disabled: false,
  showLabelOnHover: true,
};

/**
 * Slider component for selecting a numeric value within a range
 *
 * @example
 * ```tsx
 * // Basic slider
 * <Slider defaultValue={50} />
 *
 * // Controlled slider with custom range
 * <Slider value={value} onChange={setValue} min={0} max={200} step={10} />
 *
 * // Slider with marks and labels
 * <Slider
 *   defaultValue={20}
 *   marks={[
 *     { value: 0, label: 'Min' },
 *     { value: 50, label: 'Mid' },
 *     { value: 100, label: 'Max' }
 *   ]}
 *   label={(val) => `${val}%`}
 * />
 *
 * // Disabled slider
 * <Slider value={75} disabled />
 * ```
 */
export const Slider = forwardRef<View, SliderProps>((props, ref) => {
  const {
    value: controlledValue,
    defaultValue,
    onChange,
    onChangeEnd,
    min,
    max,
    step,
    color,
    size,
    radius,
    marks,
    label,
    disabled,
    showLabelOnHover,
    accessibilityLabel,
    style,
    ...others
  } = useComponentDefaultProps('Slider', defaultProps, props);

  const { styles } = useStyles(
    { color: color ?? 'blue', radius: radius ?? 'xl', size: size ?? 'md', disabled: disabled ?? false },
    { name: 'Slider' }
  );

  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue ?? min ?? 0);
  const [isDragging, setIsDragging] = useState(false);
  const [showLabel, setShowLabel] = useState(false);

  const value = controlledValue !== undefined ? controlledValue : uncontrolledValue;
  const clampedValue = Math.max(min ?? 0, Math.min(max ?? 100, value));

  const trackRef = useRef<View>(null);
  const thumbPosition = useRef(new Animated.Value(0)).current;
  const thumbScale = useRef(new Animated.Value(1)).current;

  const getValueFromPosition = useCallback(
    (position: number, trackWidth: number) => {
      const percentage = Math.max(0, Math.min(1, position / trackWidth));
      const rawValue = (min ?? 0) + percentage * ((max ?? 100) - (min ?? 0));
      const steppedValue = Math.round(rawValue / (step ?? 1)) * (step ?? 1);
      return Math.max(min ?? 0, Math.min(max ?? 100, steppedValue));
    },
    [min, max, step]
  );

  const updateValue = useCallback(
    (newValue: number) => {
      if (controlledValue === undefined) {
        setUncontrolledValue(newValue);
      }
      onChange?.(newValue);
    },
    [controlledValue, onChange]
  );

  // The PanResponder is created once, so its handlers read the latest props,
  // callbacks and value through this ref instead of the mount-time closure.
  const latestRef = useRef({
    clampedValue,
    disabled,
    label,
    showLabelOnHover,
    onChangeEnd,
    updateValue,
    getValueFromPosition,
  });
  latestRef.current = {
    clampedValue,
    disabled,
    label,
    showLabelOnHover,
    onChangeEnd,
    updateValue,
    getValueFromPosition,
  };

  // Value reported by onChangeEnd. Tracks the last value produced by the
  // gesture itself so the release handler does not depend on a re-render
  // having happened between the last move and the release.
  const gestureValueRef = useRef<number | null>(null);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !latestRef.current.disabled,
      onMoveShouldSetPanResponder: () => !latestRef.current.disabled,
      onPanResponderGrant: (evt) => {
        const latest = latestRef.current;
        if (latest.disabled) return;

        gestureValueRef.current = null;
        setIsDragging(true);
        if (latest.showLabelOnHover && latest.label !== null) {
          setShowLabel(true);
        }

        Animated.spring(thumbScale, {
          toValue: 1.05,
          useNativeDriver: true,
          speed: 50,
          bounciness: 8,
        }).start();

        trackRef.current?.measure((_x, _y, width, _height, pageX, _pageY) => {
          const touchX = evt.nativeEvent.pageX - pageX;
          const newValue = latestRef.current.getValueFromPosition(touchX, width);
          gestureValueRef.current = newValue;
          latestRef.current.updateValue(newValue);
        });
      },
      onPanResponderMove: (evt) => {
        if (latestRef.current.disabled) return;

        trackRef.current?.measure((_x, _y, width, _height, pageX, _pageY) => {
          const touchX = evt.nativeEvent.pageX - pageX;
          const newValue = latestRef.current.getValueFromPosition(touchX, width);
          gestureValueRef.current = newValue;
          latestRef.current.updateValue(newValue);
        });
      },
      onPanResponderRelease: () => {
        const latest = latestRef.current;
        if (latest.disabled) return;

        setIsDragging(false);
        setShowLabel(false);

        Animated.spring(thumbScale, {
          toValue: 1,
          useNativeDriver: true,
          speed: 50,
          bounciness: 8,
        }).start();

        latest.onChangeEnd?.(gestureValueRef.current ?? latest.clampedValue);
      },
      onPanResponderTerminate: () => {
        const latest = latestRef.current;
        if (latest.disabled) return;

        setIsDragging(false);
        setShowLabel(false);

        Animated.spring(thumbScale, {
          toValue: 1,
          useNativeDriver: true,
          speed: 50,
          bounciness: 8,
        }).start();

        latest.onChangeEnd?.(gestureValueRef.current ?? latest.clampedValue);
      },
    })
  ).current;

  useEffect(() => {
    const percentage = (clampedValue - (min ?? 0)) / ((max ?? 100) - (min ?? 0));
    thumbPosition.setValue(percentage);
  }, [clampedValue, min, max, thumbPosition]);

  const handleAccessibilityAction = (event: AccessibilityActionEvent) => {
    if (disabled) return;

    const { actionName } = event.nativeEvent;
    let newValue = clampedValue;

    if (actionName === 'increment') {
      newValue = Math.min(max ?? 100, clampedValue + (step ?? 1));
    } else if (actionName === 'decrement') {
      newValue = Math.max(min ?? 0, clampedValue - (step ?? 1));
    }

    updateValue(newValue);
    onChangeEnd?.(newValue);
  };

  const renderLabel = () => {
    if (label === null || (!showLabel && !isDragging)) {
      return null;
    }

    const labelContent = typeof label === 'function' ? label(clampedValue) : label;

    return (
      <BoxView style={styles.label}>
        <Text style={styles.labelText}>{labelContent}</Text>
      </BoxView>
    );
  };

  const renderMarks = () => {
    if (!marks || marks.length === 0) {
      return null;
    }

    return (
      <BoxView style={styles.marksContainer} pointerEvents="none">
        {marks.map((mark, index) => {
          const markPercentage = ((mark.value - (min ?? 0)) / ((max ?? 100) - (min ?? 0))) * 100;
          return (
            <BoxView key={index}>
              <BoxView
                style={[
                  styles.mark,
                  { left: `${markPercentage}%` },
                ]}
              />
              {mark.label && (
                <Text
                  style={[
                    styles.markLabel,
                    { left: `${markPercentage}%` },
                  ]}
                >
                  {mark.label}
                </Text>
              )}
            </BoxView>
          );
        })}
      </BoxView>
    );
  };

  return (
    <BoxView
      ref={ref}
      style={[styles.root, style]}
      accessibilityRole="adjustable"
      accessibilityValue={{ min: min ?? 0, max: max ?? 100, now: clampedValue }}
      accessibilityLabel={accessibilityLabel || `Slider, value ${clampedValue}`}
      accessibilityState={{ disabled: !!disabled }}
      accessibilityActions={[
        { name: 'increment', label: 'Increment' },
        { name: 'decrement', label: 'Decrement' },
      ]}
      onAccessibilityAction={handleAccessibilityAction}
      {...others}
    >
      <View
        ref={trackRef}
        style={styles.track}
        {...panResponder.panHandlers}
      >
        <Animated.View
          style={[
            styles.bar,
            {
              width: thumbPosition.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        />
        {renderMarks()}
      </View>

      <Animated.View
        style={[
          styles.thumbContainer,
          {
            left: thumbPosition.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '100%'],
            }),
          },
        ]}
        pointerEvents="none"
      >
        <Animated.View
          style={[
            styles.thumb,
            isDragging && styles.thumbActive,
            {
              transform: [{ scale: thumbScale }],
            },
          ]}
        >
          {renderLabel()}
        </Animated.View>
      </Animated.View>
    </BoxView>
  );
});

Slider.displayName = 'Slider';
