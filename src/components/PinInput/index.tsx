import { forwardRef, useRef, useState } from 'react';
import { TextInput } from 'react-native';
import { BoxView } from '../BoxView';
import type {
  DefaultProps,
  MantineNumberSize,
  MantineSize,
} from '../../theme/types';
import { useComponentDefaultProps } from '../../theme/theme-provider';
import { createStyles, getSize } from '../../theme';
import { rem } from '../../theme/utils/rem';

export interface PinInputProps extends DefaultProps {
  /** Number of inputs */
  length?: number;

  /** Input size */
  size?: MantineSize;

  /** Border radius */
  radius?: MantineNumberSize;

  /** If true, input type will be password */
  mask?: boolean;

  /** If true, only numbers are allowed */
  type?: 'number' | 'alphanumeric';

  /** Current value */
  value?: string;

  /** Default value */
  defaultValue?: string;

  /** Called when value changes */
  onChange?: (value: string) => void;

  /** Called when all inputs are filled */
  onComplete?: (value: string) => void;

  /** If true, input will be disabled */
  disabled?: boolean;

  /** If true, input will show error state */
  error?: boolean;

  /** Spacing between inputs */
  spacing?: MantineSize;

  /** Additional styles */
  style?: any;

  /** Input style */
  inputStyle?: any;
}

const sizes = {
  xs: rem(32),
  sm: rem(40),
  md: rem(48),
  lg: rem(56),
  xl: rem(64),
};

const useStyles = createStyles(
  (
    theme,
    {
      size,
      radius,
      error,
      disabled,
      spacing,
    }: {
      size: MantineSize;
      radius: MantineNumberSize;
      error: boolean;
      disabled: boolean;
      spacing: MantineSize;
    }
  ) => {
    const getSpacing = () => {
      return theme.spacing[spacing] || theme.spacing.sm;
    };

    return {
      root: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: getSpacing() as any,
      },
      input: {
        width: (sizes[size as keyof typeof sizes] || sizes.md) as any,
        height: (sizes[size as keyof typeof sizes] || sizes.md) as any,
        borderRadius: theme.fn.radius(radius),
        borderWidth: 1,
        borderColor: error
          ? (theme.colors.red || [])[6]
          : theme.colorScheme === 'dark'
            ? (theme.colors.dark || [])[4]
            : (theme.colors.gray || [])[4],
        backgroundColor:
          theme.colorScheme === 'dark'
            ? (theme.colors.dark || [])[6]
            : theme.white,
        fontSize: getSize({ size, sizes: theme.fontSizes }) as any,
        textAlign: 'center',
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        ...(disabled && {
          opacity: 0.6,
        }),
        fontFamily: theme.fontFamilyInput,
      },
      inputFocused: {
        borderColor:
          theme.colors[theme.primaryColor]?.[6] || theme.primaryBgColor,
        borderWidth: 2,
      },
    };
  }
) as any;

const defaultProps: Partial<PinInputProps> = {
  length: 4,
  size: 'sm',
  radius: 'sm',
  mask: false,
  type: 'number',
  disabled: false,
  error: false,
  spacing: 'sm',
};

export const PinInput = forwardRef<any, PinInputProps>((props, ref) => {
  const {
    length,
    size,
    radius,
    mask,
    type,
    value: controlledValue,
    defaultValue,
    onChange,
    onComplete,
    disabled,
    error,
    spacing,
    style,
    inputStyle,
    ...others
  } = useComponentDefaultProps('PinInput', defaultProps, props);

  const [uncontrolledValue, setUncontrolledValue] = useState(
    defaultValue || ''
  );
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const value =
    controlledValue !== undefined ? controlledValue : uncontrolledValue;
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const { styles, sx } = useStyles(
    { size, radius, error, disabled, spacing },
    { name: 'PinInput' }
  ) as any;

  const handleChange = (text: string, index: number) => {
    if (disabled) return;

    // Validate input based on type
    const isValid =
      type === 'number' ? /^\d*$/.test(text) : /^[a-zA-Z0-9]*$/.test(text);

    if (!isValid) return;

    // Handle paste
    if (text.length > 1) {
      const pastedText = text.slice(0, length!);
      const newValue = pastedText.padEnd(length!, ' ').slice(0, length!);

      if (controlledValue === undefined) {
        setUncontrolledValue(newValue);
      }
      onChange?.(newValue);

      // Move focus to the last filled input or the end
      const nextIndex = Math.min(pastedText.length, length! - 1);
      inputRefs.current[nextIndex]?.focus();

      if (newValue.replace(/ /g, '').length === length!) {
        onComplete?.(newValue);
      }

      return;
    }

    // Handle single character input
    const newValueArray = value.padEnd(length!, ' ').split('');
    newValueArray[index] = text;
    const newValue = newValueArray.join('').slice(0, length!);

    if (controlledValue === undefined) {
      setUncontrolledValue(newValue);
    }
    onChange?.(newValue);

    // Move to next input if character was entered
    if (text && index < length! - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Check if complete
    if (newValue.replace(/ /g, '').length === length!) {
      onComplete?.(newValue);
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    // Handle backspace
    if (e.nativeEvent.key === 'Backspace') {
      const currentValue = value.charAt(index);
      if (!currentValue || currentValue === ' ') {
        // Move to previous input if current is empty
        if (index > 0) {
          inputRefs.current[index - 1]?.focus();
        }
      }
    }
  };

  return (
    <BoxView ref={ref} style={sx(styles.root, style)} {...others}>
      {Array.from({ length: length! }, (_, index) => {
        const inputValue = value.charAt(index) || '';
        const displayValue = inputValue === ' ' ? '' : inputValue;

        return (
          <TextInput
            key={index}
            ref={(el) => {
              if (inputRefs.current) {
                inputRefs.current[index] = el;
              }
            }}
            value={mask && displayValue ? '•' : displayValue}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            onFocus={() => setFocusedIndex(index)}
            onBlur={() => setFocusedIndex(null)}
            maxLength={1}
            keyboardType={type === 'number' ? 'number-pad' : 'default'}
            editable={!disabled}
            selectTextOnFocus
            style={sx(
              styles.input,
              focusedIndex === index && styles.inputFocused,
              inputStyle
            )}
          />
        );
      })}
    </BoxView>
  );
});

PinInput.displayName = 'PinInput';
