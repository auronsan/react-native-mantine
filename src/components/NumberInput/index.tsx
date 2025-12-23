import React, { forwardRef, useState } from 'react';
import { TextInput, TouchableOpacity, TextInputProps } from 'react-native';
import { BoxView } from '../BoxView';
import { Text } from '../Text';
import type {
  DefaultProps,
  MantineColor,
  MantineNumberSize,
  MantineSize,
} from '../../theme/types';
import { useComponentDefaultProps, useTheme } from '../../theme/theme-provider';
import { createStyles, getSize } from '../../theme';
import { rem } from '../../theme/utils/rem';
import { INPUT_SIZES } from '../Input';

export interface NumberInputProps extends DefaultProps, Omit<TextInputProps, 'value' | 'onChangeText'> {
  /** Input label */
  label?: React.ReactNode;

  /** Input description */
  description?: React.ReactNode;

  /** Input error message */
  error?: React.ReactNode;

  /** Input size */
  size?: MantineSize;

  /** Border radius */
  radius?: MantineNumberSize;

  /** Input variant */
  variant?: 'default' | 'filled' | 'unstyled';

  /** If true, input will take full width */
  fullWidth?: boolean;

  /** Minimum value */
  min?: number;

  /** Maximum value */
  max?: number;

  /** Step for increment/decrement */
  step?: number;

  /** Number of decimal places */
  precision?: number;

  /** If true, controls will be hidden */
  hideControls?: boolean;

  /** Current value */
  value?: number | '';

  /** Default value */
  defaultValue?: number | '';

  /** Called when value changes */
  onChange?: (value: number | '') => void;

  /** If true, input will be disabled */
  disabled?: boolean;

  /** Placeholder */
  placeholder?: string;

  /** Icon on the left */
  icon?: React.ReactNode;

  /** Additional styles */
  style?: any;

  /** Wrapper style */
  wrapperStyle?: any;
}

const useStyles = createStyles(
  (
    theme,
    {
      size,
      radius,
      variant,
      fullWidth,
      error,
      disabled,
      withIcon,
    }: {
      size: MantineSize;
      radius: MantineNumberSize;
      variant: 'default' | 'filled' | 'unstyled';
      fullWidth: boolean;
      error: boolean;
      disabled: boolean;
      withIcon: boolean;
    }
  ) => {
    const getVariantStyles = () => {
      switch (variant) {
        case 'filled':
          return {
            backgroundColor:
              theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
            borderWidth: 1,
            borderColor: 'transparent',
          };
        case 'unstyled':
          return {
            backgroundColor: 'transparent',
            borderWidth: 0,
          };
        default:
          return {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
            borderWidth: 1,
            borderColor:
              theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[4],
          };
      }
    };

    return {
      wrapper: {
        width: fullWidth ? '100%' : undefined,
      },
      label: {
        fontSize: theme.fontSizes.sm,
        fontWeight: '500',
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        marginBottom: theme.spacing.xs,
      },
      description: {
        fontSize: theme.fontSizes.xs,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
        marginTop: theme.spacing.xs,
      },
      error: {
        fontSize: theme.fontSizes.xs,
        color: theme.colors.red[6],
        marginTop: theme.spacing.xs,
      },
      inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        height: getSize({ size, sizes: INPUT_SIZES }),
        borderRadius: theme.fn.radius(radius),
        ...getVariantStyles(),
        ...(error && {
          borderColor: theme.colors.red[6],
        }),
        ...(disabled && {
          opacity: 0.6,
        }),
      },
      icon: {
        paddingLeft: theme.spacing.sm,
        paddingRight: theme.spacing.xs,
      },
      input: {
        flex: 1,
        height: '100%',
        fontSize: getSize({ size, sizes: theme.fontSizes }),
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        paddingHorizontal: theme.spacing.sm,
        ...(withIcon && {
          paddingLeft: 0,
        }),
      },
      controls: {
        flexDirection: 'row',
        height: '100%',
      },
      control: {
        width: rem(32),
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderLeftWidth: 1,
        borderLeftColor:
          theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[4],
      },
      controlText: {
        fontSize: rem(18),
        fontWeight: '600',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
      },
    };
  }
);

const defaultProps: Partial<NumberInputProps> = {
  size: 'sm',
  radius: 'sm',
  variant: 'default',
  fullWidth: false,
  step: 1,
  precision: 0,
  hideControls: false,
  disabled: false,
};

export const NumberInput = forwardRef<any, NumberInputProps>((props, ref) => {
  const {
    label,
    description,
    error,
    size,
    radius,
    variant,
    fullWidth,
    min,
    max,
    step,
    precision,
    hideControls,
    value: controlledValue,
    defaultValue,
    onChange,
    disabled,
    placeholder,
    icon,
    style,
    wrapperStyle,
    ...others
  } = useComponentDefaultProps('NumberInput', defaultProps, props);

  const theme = useTheme();
  const [uncontrolledValue, setUncontrolledValue] = useState<number | ''>(defaultValue ?? '');

  const value = controlledValue !== undefined ? controlledValue : uncontrolledValue;

  const { styles, sx } = useStyles(
    {
      size,
      radius,
      variant,
      fullWidth,
      error: !!error,
      disabled,
      withIcon: !!icon,
    },
    { name: 'NumberInput' }
  ) as any;

  const formatValue = (val: number): number => {
    if (precision !== undefined && precision > 0) {
      return parseFloat(val.toFixed(precision));
    }
    return Math.round(val);
  };

  const clampValue = (val: number): number => {
    let clamped = val;
    if (min !== undefined && clamped < min) clamped = min;
    if (max !== undefined && clamped > max) clamped = max;
    return formatValue(clamped);
  };

  const handleChange = (text: string) => {
    if (text === '' || text === '-') {
      if (controlledValue === undefined) {
        setUncontrolledValue('');
      }
      onChange?.('');
      return;
    }

    const parsed = parseFloat(text);
    if (!isNaN(parsed)) {
      const clamped = clampValue(parsed);
      if (controlledValue === undefined) {
        setUncontrolledValue(clamped);
      }
      onChange?.(clamped);
    }
  };

  const handleIncrement = () => {
    const currentValue = typeof value === 'number' ? value : 0;
    const newValue = clampValue(currentValue + (step || 1));
    if (controlledValue === undefined) {
      setUncontrolledValue(newValue);
    }
    onChange?.(newValue);
  };

  const handleDecrement = () => {
    const currentValue = typeof value === 'number' ? value : 0;
    const newValue = clampValue(currentValue - (step || 1));
    if (controlledValue === undefined) {
      setUncontrolledValue(newValue);
    }
    onChange?.(newValue);
  };

  return (
    <BoxView style={sx(styles.wrapper, wrapperStyle)}>
      {label && (
        <Text style={styles.label}>{typeof label === 'string' ? label : label}</Text>
      )}

      <BoxView style={sx(styles.inputWrapper, style)}>
        {icon && <BoxView style={styles.icon}>{icon}</BoxView>}

        <TextInput
          ref={ref}
          value={value === '' ? '' : String(value)}
          onChangeText={handleChange}
          placeholder={placeholder}
          placeholderTextColor={
            theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[5]
          }
          keyboardType="numeric"
          editable={!disabled}
          style={styles.input}
          {...others}
        />

        {!hideControls && (
          <BoxView style={styles.controls}>
            <TouchableOpacity
              style={styles.control}
              onPress={handleDecrement}
              disabled={disabled || (min !== undefined && typeof value === 'number' && value <= min)}
              activeOpacity={0.7}
            >
              <Text style={styles.controlText}>−</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.control}
              onPress={handleIncrement}
              disabled={disabled || (max !== undefined && typeof value === 'number' && value >= max)}
              activeOpacity={0.7}
            >
              <Text style={styles.controlText}>+</Text>
            </TouchableOpacity>
          </BoxView>
        )}
      </BoxView>

      {description && (
        <Text style={styles.description}>
          {typeof description === 'string' ? description : description}
        </Text>
      )}

      {error && (
        <Text style={styles.error}>{typeof error === 'string' ? error : error}</Text>
      )}
    </BoxView>
  );
});

NumberInput.displayName = 'NumberInput';
