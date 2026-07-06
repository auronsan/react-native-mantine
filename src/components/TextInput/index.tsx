import React, { forwardRef } from 'react';
import {
  TextInput as RNTextInput,
  type TextInputProps as RNTextInputProps,
} from 'react-native';
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

/**
 * Props for the TextInput component
 *
 * @property {React.ReactNode} [label] - Label displayed above the input
 * @property {React.ReactNode} [description] - Description text displayed below the label
 * @property {React.ReactNode} [error] - Error message displayed below the input
 * @property {MantineSize} [size] - Input size (xs, sm, md, lg, xl)
 * @property {MantineNumberSize} [radius] - Border radius from theme or custom value
 * @property {React.ReactNode} [icon] - Icon displayed on the left side of input
 * @property {React.ReactNode} [rightSection] - Content displayed on the right side of input
 * @property {number} [rightSectionWidth] - Width of the right section in pixels
 * @property {boolean} [required] - Displays required asterisk next to label
 * @property {'default' | 'filled' | 'unstyled'} [variant] - Input visual variant
 * @property {any} [style] - Additional style overrides for the input
 * @property {any} [wrapperStyle] - Style overrides for the wrapper container
 * @property {string} [accessibilityLabel] - Label for screen readers
 * @property {string} [accessibilityHint] - Hint for screen readers
 */
export interface TextInputProps
  extends DefaultProps, Omit<RNTextInputProps, 'style'> {
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

  /** Accessibility label for the input */
  accessibilityLabel?: string;

  /** Accessibility hint for the input */
  accessibilityHint?: string;
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
          backgroundColor:
            theme.colorScheme === 'dark'
              ? (theme.colors.dark || [])[5]
              : (theme.colors.gray || [])[1],
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
        backgroundColor:
          theme.colorScheme === 'dark'
            ? (theme.colors.dark || [])[6]
            : theme.white,
        borderWidth: 1,
        borderColor:
          theme.colorScheme === 'dark'
            ? (theme.colors.dark || [])[4]
            : (theme.colors.gray || [])[4],
      };
    };

    const sizeValue =
      INPUT_SIZES[size as keyof typeof INPUT_SIZES] || INPUT_SIZES.md;

    return {
      wrapper: {
        width: '100%',
      },
      label: {
        fontSize: theme.fontSizes.sm as number,
        fontWeight: '500',
        color:
          theme.colorScheme === 'dark'
            ? (theme.colors.dark || [])[0]
            : theme.black,
        marginBottom: theme.spacing.xs / 2,
      },
      required: {
        color: (theme.colors.red || [])[6],
      },
      description: {
        fontSize: theme.fontSizes.xs as number,
        color:
          theme.colorScheme === 'dark'
            ? (theme.colors.dark || [])[2]
            : (theme.colors.gray || [])[6],
        marginTop: theme.spacing.xs / 2,
        marginBottom: theme.spacing.xs / 2,
      },
      error: {
        fontSize: theme.fontSizes.xs as number,
        color: (theme.colors.red || [])[6],
        marginTop: theme.spacing.xs / 2,
      },
      inputWrapper: {
        position: 'relative',
      },
      input: {
        height: sizeValue as any,
        fontSize: getSize({ size, sizes: theme.fontSizes }) as any,
        paddingHorizontal: (variant === 'unstyled' ? 0 : rem(12)) as any,
        paddingLeft: (withIcon
          ? sizeValue
          : variant === 'unstyled'
            ? 0
            : rem(12)) as any,
        paddingRight: (withRightSection
          ? rem(rightSectionWidth || sizeValue)
          : variant === 'unstyled'
            ? 0
            : rem(12)) as any,
        borderRadius: theme.fn.radius(radius),
        color:
          theme.colorScheme === 'dark'
            ? (theme.colors.dark || [])[0]
            : theme.black,
        ...getVariantStyles(),
        ...(invalid && {
          borderColor: (theme.colors.red || [])[6],
          color: (theme.colors.red || [])[6],
        }),
        fontFamily: theme.fontFamilyInput,
      },
      icon: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: sizeValue as any,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
      },
      rightSectionContainer: {
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        width: rem(rightSectionWidth || sizeValue) as any,
        justifyContent: 'center',
        alignItems: 'center',
      },
    };
  }
) as any;

const defaultProps: Partial<TextInputProps> = {
  size: 'sm',
  radius: 'sm',
  variant: 'default',
  required: false,
};

/**
 * TextInput component for React Native Mantine
 *
 * A fully-featured text input component with label, description, error states,
 * icons, and multiple visual variants. Supports all React Native TextInput props
 * while providing consistent theming and accessibility features.
 *
 * @example
 * ```tsx
 * // Basic text input
 * <TextInput label="Name" placeholder="Enter your name" />
 *
 * // With icon and description
 * <TextInput
 *   label="Email"
 *   description="We'll never share your email"
 *   icon={<EmailIcon />}
 *   placeholder="you@example.com"
 * />
 *
 * // Error state
 * <TextInput
 *   label="Password"
 *   error="Password is too short"
 *   required
 * />
 *
 * // With right section
 * <TextInput
 *   label="Search"
 *   rightSection={<SearchButton />}
 *   variant="filled"
 * />
 * ```
 */
export const TextInput = forwardRef<RNTextInput, TextInputProps>(
  (props, ref) => {
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
      accessibilityLabel,
      accessibilityHint,
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
            accessibilityLabel={accessibilityLabel || (typeof label === 'string' ? label : undefined)}
            accessibilityHint={accessibilityHint}
            {...others}
          />

          {rightSection && (
            <BoxView style={styles.rightSectionContainer}>
              {rightSection}
            </BoxView>
          )}
        </BoxView>

        {error && (
          <Text style={styles.error} accessibilityRole="alert" accessibilityLiveRegion="polite">
            {error}
          </Text>
        )}
      </BoxView>
    );
  }
);

TextInput.displayName = 'TextInput';
