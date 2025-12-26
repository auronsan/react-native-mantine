import React, { forwardRef, useState, useRef, useEffect } from 'react';
import { TouchableOpacity, Animated } from 'react-native';
import type { LayoutChangeEvent } from 'react-native';
import { BoxView } from '../BoxView';
import { Text } from '../Text';
import type { DefaultProps, MantineColor, MantineNumberSize, MantineSize } from '../../theme/types';
import { useComponentDefaultProps } from '../../theme/theme-provider';
import { createStyles } from '../../theme';
import { rem } from '../../theme/utils/rem';

export interface SegmentedControlItem {
  label: React.ReactNode;
  value: string;
  disabled?: boolean;
}

export interface SegmentedControlProps extends DefaultProps {
  /** Current selected value (controlled) */
  value?: string;

  /** Default value (uncontrolled) */
  defaultValue?: string;

  /** Called when value changes */
  onChange?: (value: string) => void;

  /** Data for segments */
  data: (string | SegmentedControlItem)[];

  /** SegmentedControl size */
  size?: MantineSize;

  /** SegmentedControl color */
  color?: MantineColor;

  /** Key of theme.radius or any valid value to set border-radius */
  radius?: MantineNumberSize;

  /** Disabled state */
  disabled?: boolean;

  /** Display segments vertically */
  orientation?: 'horizontal' | 'vertical';

  /** Sets width to 100% of parent */
  fullWidth?: boolean;

  /** Transition duration in ms */
  transitionDuration?: number;

  /** Additional styles */
  style?: any;
}

const sizes = {
  xs: { fontSize: rem(10), padding: rem(4), height: rem(24) },
  sm: { fontSize: rem(12), padding: rem(6), height: rem(28) },
  md: { fontSize: rem(14), padding: rem(8), height: rem(32) },
  lg: { fontSize: rem(16), padding: rem(10), height: rem(38) },
  xl: { fontSize: rem(18), padding: rem(12), height: rem(44) },
};

const useStyles = createStyles(
  (
    theme,
    {
      radius,
      disabled,
      orientation,
      fullWidth,
    }: {
      color: MantineColor;
      radius: MantineNumberSize;
      disabled: boolean;
      orientation: 'horizontal' | 'vertical';
      fullWidth: boolean;
    },
    { size }
  ) => {
    const sizeStyles = sizes[size as keyof typeof sizes] || sizes.md;

    return {
      root: {
        position: 'relative',
        flexDirection: orientation === 'horizontal' ? 'row' : 'column',
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark?.[6] : theme.colors.gray?.[1],
        borderRadius: theme.fn.radius(radius),
        padding: rem(3) as any,
        opacity: disabled ? 0.5 : 1,
        ...(fullWidth && { width: '100%' }),
      },
      indicator: {
        position: 'absolute',
        backgroundColor: theme.white,
        borderRadius: (theme.fn.radius(radius) as number) - rem(1),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 1,
        elevation: 1,
        margin: rem(3) as any,
        ...(theme.colorScheme === 'dark' && {
          backgroundColor: theme.colors.dark?.[5],
        }),
      },
      segment: {
        flex: 1,
        paddingHorizontal: sizeStyles.padding as any,
        paddingVertical: rem(6) as any,
        minHeight: sizeStyles.height as any,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: (theme.fn.radius(radius) as number) - rem(1),
        zIndex: 1,
      },
      label: {
        fontSize: sizeStyles.fontSize as any,
        fontWeight: '500',
        textAlign: 'center',
      },
      activeLabel: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      },
      inactiveLabel: {
        color: theme.colorScheme === 'dark' ? theme.colors.dark?.[1] : theme.colors.gray?.[7],
      },
      disabledLabel: {
        color: theme.colorScheme === 'dark' ? theme.colors.dark?.[3] : theme.colors.gray?.[5],
      },
    };
  }
) as any;

const defaultProps: Partial<SegmentedControlProps> = {
  size: 'md',
  color: 'blue',
  radius: 'sm',
  disabled: false,
  orientation: 'horizontal',
  fullWidth: false,
  transitionDuration: 200,
};

export const SegmentedControl = forwardRef<any, SegmentedControlProps>((props, ref) => {
  const {
    value: controlledValue,
    defaultValue,
    onChange,
    data,
    size,
    color,
    radius,
    disabled,
    orientation,
    fullWidth,
    transitionDuration,
    style,
    ...others
  } = useComponentDefaultProps('SegmentedControl', defaultProps, props);

  const { styles, sx } = useStyles(
    { color, radius, disabled, orientation, fullWidth },
    { name: 'SegmentedControl', size }
  ) as any;

  // Normalize data to SegmentedControlItem[]
  const normalizedData: SegmentedControlItem[] = data.map((item) =>
    typeof item === 'string' ? { label: item, value: item, disabled: false } : item
  );

  const [uncontrolledValue, setUncontrolledValue] = useState(
    defaultValue ?? normalizedData[0]?.value ?? ''
  );
  const [segmentLayouts, setSegmentLayouts] = useState<{ x: number; y: number; width: number; height: number }[]>([]);

  const value = controlledValue !== undefined ? controlledValue : uncontrolledValue;
  const activeIndex = normalizedData.findIndex((item) => item.value === value);

  const indicatorPosition = useRef(new Animated.Value(0)).current;
  const indicatorSize = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (segmentLayouts[activeIndex]) {
      const layout = segmentLayouts[activeIndex];
      // No need to adjust for margin since indicator has its own margin

      Animated.parallel([
        Animated.timing(indicatorPosition, {
          toValue: orientation === 'horizontal' ? layout.x : layout.y,
          duration: transitionDuration,
          useNativeDriver: false,
        }),
        Animated.timing(indicatorSize, {
          toValue: orientation === 'horizontal' ? layout.width : layout.height,
          duration: transitionDuration,
          useNativeDriver: false,
        }),
      ]).start();
    }
  }, [activeIndex, segmentLayouts, orientation, transitionDuration, indicatorPosition, indicatorSize]);

  const handleSegmentLayout = (index: number, event: LayoutChangeEvent) => {
    const { x, y, width, height } = event.nativeEvent.layout;
    setSegmentLayouts((prev) => {
      const newLayouts = [...prev];
      newLayouts[index] = { x, y, width, height };
      return newLayouts;
    });
  };

  const handlePress = (item: SegmentedControlItem) => {
    if (disabled || item.disabled) return;

    if (controlledValue === undefined) {
      setUncontrolledValue(item.value);
    }
    onChange?.(item.value);
  };

  const indicatorStyle = {
    [orientation === 'horizontal' ? 'left' : 'top']: indicatorPosition,
    [orientation === 'horizontal' ? 'width' : 'height']: indicatorSize,
    [orientation === 'horizontal' ? 'height' : 'width']: '100%',
  };

  return (
    <BoxView ref={ref} style={sx(styles.root, style)} {...others}>
      {segmentLayouts.length === normalizedData.length && (
        <Animated.View style={[styles.indicator, indicatorStyle as any]} />
      )}

      {normalizedData.map((item, index) => {
        const isActive = item.value === value;
        const isDisabled = disabled || item.disabled;

        return (
          <TouchableOpacity
            key={item.value}
            style={styles.segment}
            onPress={() => handlePress(item)}
            disabled={isDisabled}
            activeOpacity={0.7}
            onLayout={(event) => handleSegmentLayout(index, event)}
          >
            <Text
              style={[
                styles.label,
                isActive ? styles.activeLabel : styles.inactiveLabel,
                isDisabled && styles.disabledLabel,
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </BoxView>
  );
});

SegmentedControl.displayName = 'SegmentedControl';
