import React, { createContext, forwardRef, useContext, useRef } from 'react';
import {
  Pressable,
  TextInput as RNTextInput,
  View,
  type TextInputProps as RNTextInputProps,
} from 'react-native';
import { BoxView } from '../BoxView';
import { Text } from '../Text';
import type {
  DefaultProps,
  MantineNumberSize,
  MantineSize,
} from '../../theme/types';
import { useComponentDefaultProps, useTheme } from '../../theme/theme-provider';
import { createStyles, getSize } from '../../theme';
import { rem } from '../../theme/utils/rem';
import { INPUT_SIZES } from '../Input';

interface PillsInputContextValue {
  size: MantineSize;
  disabled?: boolean;
  fieldRef: React.MutableRefObject<RNTextInput | null> | null;
}

const PillsInputContext = createContext<PillsInputContextValue>({
  size: 'sm',
  disabled: false,
  fieldRef: null,
});

export interface PillsInputProps extends DefaultProps {
  /** Pills and PillsInput.Field */
  children?: React.ReactNode;

  /** Input label */
  label?: React.ReactNode;

  /** Input description */
  description?: React.ReactNode;

  /** Error message */
  error?: React.ReactNode;

  /** Controls input height and horizontal padding */
  size?: MantineSize;

  /** Key of theme.radius or any valid value to set border-radius */
  radius?: MantineNumberSize;

  /** Input variant */
  variant?: 'default' | 'filled' | 'unstyled';

  /** Displays required asterisk */
  required?: boolean;

  /** If set, the input is disabled */
  disabled?: boolean;

  /** Input wrapper style */
  wrapperStyle?: any;
}

const useStyles = createStyles(
  (
    theme,
    {
      radius,
      invalid,
      disabled,
    }: {
      radius: MantineNumberSize;
      invalid: boolean;
      disabled: boolean;
    },
    { variant, size }: any
  ) => {
    const sizeValue =
      INPUT_SIZES[size as keyof typeof INPUT_SIZES] || INPUT_SIZES.sm;

    const getVariantStyles = () => {
      if (variant === 'filled') {
        return {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.fn.themeColor('dark', 5)
              : theme.fn.themeColor('gray', 1),
          borderWidth: 1,
          borderColor: 'transparent',
        };
      }

      if (variant === 'unstyled') {
        return {
          backgroundColor: 'transparent',
          borderWidth: 0,
          paddingHorizontal: 0,
        };
      }

      return {
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.fn.themeColor('dark', 6)
            : theme.white,
        borderWidth: 1,
        borderColor:
          theme.colorScheme === 'dark'
            ? theme.fn.themeColor('dark', 4)
            : theme.fn.themeColor('gray', 4),
      };
    };

    return {
      wrapper: {
        width: '100%',
      },
      label: {
        fontSize: theme.fontSizes.sm as number,
        fontWeight: '500',
        color:
          theme.colorScheme === 'dark'
            ? theme.fn.themeColor('dark', 0)
            : theme.black,
        marginBottom: theme.spacing.xs / 2,
      },
      required: {
        color: theme.fn.themeColor('red', 6),
      },
      description: {
        fontSize: theme.fontSizes.xs as number,
        color:
          theme.colorScheme === 'dark'
            ? theme.fn.themeColor('dark', 2)
            : theme.fn.themeColor('gray', 6),
        marginBottom: theme.spacing.xs / 2,
      },
      error: {
        fontSize: theme.fontSizes.xs as number,
        color: theme.fn.themeColor('red', 6),
        marginTop: theme.spacing.xs / 2,
      },
      input: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        minHeight: sizeValue as any,
        paddingHorizontal: variant === 'unstyled' ? 0 : rem(12),
        paddingVertical: rem(4),
        gap: rem(4),
        borderRadius: theme.fn.radius(radius) as number,
        ...getVariantStyles(),
        ...(invalid && {
          borderColor: theme.fn.themeColor('red', 6),
        }),
        ...(disabled && { opacity: 0.6 }),
      },
    };
  }
);

const defaultProps: Partial<PillsInputProps> = {
  size: 'sm',
  radius: 'sm',
  variant: 'default',
  required: false,
  disabled: false,
};

/**
 * PillsInput is a utility input container for Pill components and a free
 * text field. Port of Mantine v7 PillsInput component.
 */
export const PillsInput = forwardRef<View, PillsInputProps>((props, ref) => {
  const {
    children,
    label,
    description,
    error,
    size,
    radius,
    variant,
    required,
    disabled,
    style,
    wrapperStyle,
    ...others
  } = useComponentDefaultProps('PillsInput', defaultProps, props);

  const fieldRef = useRef<RNTextInput | null>(null);

  const { styles, sx } = useStyles(
    {
      radius: radius ?? 'sm',
      invalid: !!error,
      disabled: disabled ?? false,
    },
    { name: 'PillsInput', variant, size }
  );

  return (
    <PillsInputContext.Provider
      value={{ size: size ?? 'sm', disabled, fieldRef }}
    >
      <BoxView ref={ref} style={sx(styles.wrapper, wrapperStyle)} {...others}>
        {label && (
          <Text style={styles.label}>
            {label}
            {required && <Text style={styles.required}> *</Text>}
          </Text>
        )}

        {description && <Text style={styles.description}>{description}</Text>}

        <Pressable
          style={sx(styles.input, style)}
          onPress={() => fieldRef.current?.focus()}
          disabled={disabled}
          accessible={false}
        >
          {children}
        </Pressable>

        {error && (
          <Text
            style={styles.error}
            accessibilityRole="alert"
            accessibilityLiveRegion="polite"
          >
            {error}
          </Text>
        )}
      </BoxView>
    </PillsInputContext.Provider>
  );
});

PillsInput.displayName = 'PillsInput';

export interface PillsInputFieldProps
  extends Omit<RNTextInputProps, 'style'>,
    DefaultProps {
  /** Field placeholder */
  placeholder?: string;
}

export const PillsInputField = forwardRef<RNTextInput, PillsInputFieldProps>(
  (props, ref) => {
    const { style, placeholder, editable, ...others } =
      useComponentDefaultProps('PillsInputField', {}, props);

    const ctx = useContext(PillsInputContext);
    const theme = useTheme();

    const setRefs = (node: RNTextInput | null) => {
      if (ctx.fieldRef) {
        ctx.fieldRef.current = node;
      }
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<RNTextInput | null>).current = node;
      }
    };

    return (
      <RNTextInput
        ref={setRefs}
        placeholder={placeholder}
        placeholderTextColor={
          theme.colorScheme === 'dark'
            ? theme.fn.themeColor('dark', 3)
            : theme.fn.themeColor('gray', 5)
        }
        editable={editable ?? !ctx.disabled}
        style={[
          {
            flexGrow: 1,
            minWidth: 60,
            paddingVertical: 0,
            fontSize: getSize({
              size: ctx.size,
              sizes: theme.fontSizes,
            }) as number,
            color: theme.colorScheme === 'dark' ? theme.white : theme.black,
            fontFamily: theme.fontFamilyInput,
          },
          style as any,
        ]}
        {...others}
      />
    );
  }
);

PillsInputField.displayName = 'PillsInput.Field';

(PillsInput as any).Field = PillsInputField;
