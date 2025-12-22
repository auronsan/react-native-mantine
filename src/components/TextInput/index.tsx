import React, { forwardRef } from 'react';
import { TextInput as RNTextInput, type TextInputProps as RNTextInputProps } from 'react-native';
import { BoxView } from '../BoxView';
import { Text } from '../Text';
import type {
  DefaultProps,
  MantineNumberSize,
  MantineSize,
} from '../../theme/types';
import { useComponentDefaultProps } from '../../theme/theme-provider';
import { createStyles, getSize } from '../../theme';
import { rem } from '../../theme/utils/rem';
import { INPUT_SIZES } from '../Input';

export interface TextInputProps extends DefaultProps, Omit<RNTextInputProps, 'style'> {
  /** Input label */
  label?: React.ReactNode;

  /** Input description */
  description?: React.ReactNode;

  /** Error message */
  error?: React.ReactNode;

  /** Input size */
  size?: MantineSize;

  /** Key of theme.radius or any valid value to set border-radius */
  radius?: MantineNumberSize;

  /** Icon displayed on the left side of input */
  icon?: React.ReactNode;

  /** Right section of input */
  rightSection?: React.ReactNode;

  /** Right section width */
  rightSectionWidth?: number;

  /** Displays required asterisk */
  required?: boolean;

  /** Input variant */
  variant?: 'default' | 'filled' | 'unstyled';

  /** Additional styles */
  style?: any;

  /** Input wrapper style */
  wrapperStyle?: any;
}

const useStyles = createStyles(
  (
    theme,
    {
      radius,
      invalid,
      withIcon,
      withRightSection,
      rightSectionWidth,
    }: {
      radius: MantineNumberSize;
      invalid: boolean;
      withIcon: boolean;
      withRightSection: boolean;
      rightSectionWidth?: number;
    },
    { variant, size }
  ) => {
    const getVariantStyles = () => {
      if (variant === 'filled') {
        return {
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
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

      // default variant
      return {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
        borderWidth: 1,
        borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[4],
      };
    };

    const sizeValue = INPUT_SIZES[size] || INPUT_SIZES.md;

    return {
      wrapper: {
        width: '100%',
      },
      label: {
        fontSize: theme.fontSizes.sm,
        fontWeight: '500',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
        marginBottom: theme.spacing.xs / 2,
      },
      required: {
        color: theme.colors.red[6],
      },
      description: {
        fontSize: theme.fontSizes.xs,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
        marginTop: theme.spacing.xs / 2,
        marginBottom: theme.spacing.xs / 2,
      },
      error: {
        fontSize: theme.fontSizes.xs,
        color: theme.colors.red[6],
        marginTop: theme.spacing.xs / 2,
      },
      inputWrapper: {
        position: 'relative',
      },
      input: {
        ...theme.fn.fontStyles(),
        height: sizeValue,
        fontSize: getSize({ size, sizes: theme.fontSizes }),
        paddingHorizontal: variant === 'unstyled' ? 0 : rem(12),
        paddingLeft: withIcon ? sizeValue : variant === 'unstyled' ? 0 : rem(12),
        paddingRight: withRightSection
          ? rem(rightSectionWidth || parseInt(sizeValue))
          : variant === 'unstyled'
          ? 0
          : rem(12),
        borderRadius: theme.fn.radius(radius),
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
        ...getVariantStyles(),
        ...(invalid && {
          borderColor: theme.colors.red[6],
          color: theme.colors.red[6],
        }),
      },
      icon: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: sizeValue,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
      },
      rightSectionContainer: {
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        width: rem(rightSectionWidth || parseInt(sizeValue)),
        justifyContent: 'center',
        alignItems: 'center',
      },
    };
  }
);

const defaultProps: Partial<TextInputProps> = {
  size: 'sm',
  radius: 'sm',
  variant: 'default',
  required: false,
};

export const TextInput = forwardRef<RNTextInput, TextInputProps>((props, ref) => {
  const {
    label,
    description,
    error,
    size,
    radius,
    icon,
    rightSection,
    rightSectionWidth,
    required,
    variant,
    style,
    wrapperStyle,
    ...others
  } = useComponentDefaultProps('TextInput', defaultProps, props);

  const { styles, sx } = useStyles(
    {
      radius,
      invalid: !!error,
      withIcon: !!icon,
      withRightSection: !!rightSection,
      rightSectionWidth,
    },
    { name: 'TextInput', variant, size }
  ) as any;

  return (
    <BoxView style={sx(styles.wrapper, wrapperStyle)}>
      {label && (
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      )}

      {description && <Text style={styles.description}>{description}</Text>}

      <BoxView style={styles.inputWrapper}>
        {icon && <BoxView style={styles.icon}>{icon}</BoxView>}

        <RNTextInput
          ref={ref}
          style={sx(styles.input, style)}
          {...others}
        />

        {rightSection && (
          <BoxView style={styles.rightSectionContainer}>{rightSection}</BoxView>
        )}
      </BoxView>

      {error && <Text style={styles.error}>{error}</Text>}
    </BoxView>
  );
});

TextInput.displayName = 'TextInput';
