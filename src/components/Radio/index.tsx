import React, { forwardRef, useEffect, useRef, createContext, useContext } from 'react';
import { Pressable, Animated, View } from 'react-native';
import { BoxView } from '../BoxView';
import { Text } from '../Text';
import type { DefaultProps, MantineColor, MantineSize } from '../../theme/types';
import { useComponentDefaultProps } from '../../theme/theme-provider';
import { createStyles } from '../../theme';
import { rem } from '../../theme/utils/rem';

export interface RadioProps extends DefaultProps {
  /** Radio label */
  label?: React.ReactNode;

  /** Radio size */
  size?: MantineSize;

  /** Radio color from theme */
  color?: MantineColor;

  /** Radio value */
  value?: string;

  /** Checked state */
  checked?: boolean;

  /** Called when radio state changes */
  onChange?: (value: string) => void;

  /** Disabled state */
  disabled?: boolean;

  /** Additional styles */
  style?: any;

  /** Wrapper style */
  wrapperStyle?: any;
}

export interface RadioGroupProps {
  /** Current selected value */
  value?: string;

  /** Called when value changes */
  onChange?: (value: string) => void;

  /** Radio group children */
  children: React.ReactNode;

  /** Radio group name for accessibility */
  name?: string;

  /** Radio size for all children */
  size?: MantineSize;

  /** Radio color for all children */
  color?: MantineColor;

  /** Wrapper style */
  style?: any;

  /** Spacing between radio buttons */
  spacing?: number;
}

interface RadioGroupContextValue {
  value?: string;
  onChange?: (value: string) => void;
  size?: MantineSize;
  color?: MantineColor;
  name?: string;
}

const RadioGroupContext = createContext<RadioGroupContextValue | undefined>(undefined);

const useRadioGroupContext = () => useContext(RadioGroupContext);

const sizes = {
  xs: rem(14),
  sm: rem(18),
  md: rem(22),
  lg: rem(28),
  xl: rem(36),
};

const useStyles = createStyles(
  (
    theme,
    {
      size,
      color,
      disabled,
    }: {
      size: MantineSize;
      color: MantineColor;
      disabled: boolean;
    }
  ) => {
    const radioSize = sizes[size as keyof typeof sizes] || sizes.md;
    const innerSize = (radioSize as any as number) * 0.5;

    return {
      root: {
        flexDirection: 'row',
        alignItems: 'center',
        opacity: disabled ? 0.5 : 1,
      },
      radio: {
        width: radioSize as any,
        height: radioSize as any,
        borderRadius: ((radioSize as any as number) / 2) as any,
        borderWidth: 2,
        borderColor: theme.colorScheme === 'dark' ? theme.fn.themeColor('dark', 4) : theme.fn.themeColor('gray', 4),
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
      },
      checked: {
        borderColor: theme.fn.themeColor(color, 6),
      },
      inner: {
        width: rem(innerSize) as any,
        height: rem(innerSize) as any,
        borderRadius: rem(innerSize / 2) as any,
        backgroundColor: theme.fn.themeColor(color, 6),
      },
      label: {
        fontSize: theme.fontSizes.sm as number,
        color: theme.colorScheme === 'dark' ? theme.fn.themeColor('dark', 0) : theme.black,
        marginLeft: theme.spacing.sm,
        flex: 1,
      },
    };
  }
) as any;

const defaultProps: Partial<RadioProps> = {
  size: 'md',
  color: 'blue',
  checked: false,
  disabled: false,
};

const RadioComponent = forwardRef<any, RadioProps>((props, ref) => {
  const groupContext = useRadioGroupContext();

  const {
    label,
    size: propSize,
    color: propColor,
    value,
    checked: propChecked,
    onChange: propOnChange,
    disabled,
    style,
    wrapperStyle,
    ...others
  } = useComponentDefaultProps('Radio', defaultProps, props);

  // Use group context if available, otherwise use props
  const size = propSize || groupContext?.size || defaultProps.size;
  const color = propColor || groupContext?.color || defaultProps.color;
  const checked = groupContext ? groupContext.value === value : propChecked;
  const onChange = groupContext?.onChange || propOnChange;

  const { styles, sx } = useStyles({ size, color, disabled }, { name: 'Radio' }) as any;

  const scaleAnim = useRef(new Animated.Value(checked ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: checked ? 1 : 0,
      useNativeDriver: true,
      tension: 100,
      friction: 7,
    }).start();
  }, [checked, scaleAnim]);

  const handlePress = () => {
    if (!disabled && value !== undefined) {
      onChange?.(value);
    }
  };

  const radioContent = (
    <BoxView style={sx(styles.radio, checked && styles.checked, style)}>
      <Animated.View
        style={[
          styles.inner,
          {
            transform: [{ scale: scaleAnim }],
            opacity: scaleAnim,
          },
        ]}
      />
    </BoxView>
  );

  return (
    <Pressable
      ref={ref}
      onPress={handlePress}
      disabled={disabled}
      style={sx(styles.root, wrapperStyle)}
      accessibilityRole="radio"
      accessibilityState={{ checked }}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      {...others}
    >
      {radioContent}
      {label && <Text style={styles.label}>{label}</Text>}
    </Pressable>
  );
});

RadioComponent.displayName = 'Radio';

const RadioGroup = forwardRef<View, RadioGroupProps>((props, ref) => {
  const {
    value,
    onChange,
    children,
    name,
    size,
    color,
    style,
    spacing = 12,
  } = props;

  const contextValue: RadioGroupContextValue = {
    value,
    onChange,
    size,
    color,
    name,
  };

  return (
    <RadioGroupContext.Provider value={contextValue}>
      <View ref={ref} style={style}>
        {React.Children.map(children, (child, index) => {
          if (!React.isValidElement(child)) {
            return child;
          }
          return (
            <View key={index} style={{ marginBottom: index < React.Children.count(children) - 1 ? spacing : 0 }}>
              {child}
            </View>
          );
        })}
      </View>
    </RadioGroupContext.Provider>
  );
});

RadioGroup.displayName = 'RadioGroup';

export const Radio = Object.assign(RadioComponent, {
  Group: RadioGroup,
});
