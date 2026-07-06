import React, { forwardRef } from 'react';
import { Pressable, View } from 'react-native';
import { BoxView } from '../BoxView';
import { Text } from '../Text';
import type { DefaultProps, MantineNumberSize, MantineSize } from '../../theme/types';
import { useComponentDefaultProps } from '../../theme/theme-provider';
import { createStyles } from '../../theme';
import { rem } from '../../theme/utils/rem';
import { INPUT_SIZES } from '../Input';

export interface InputBaseProps extends DefaultProps {
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

  /** Disables interaction and dims the input */
  disabled?: boolean;

  /** Allows the frame to grow with its content instead of a fixed height */
  multiline?: boolean;

  /** Called when the input frame is pressed */
  onPress?: () => void;

  /** Content rendered inside the input frame */
  children?: React.ReactNode;

  /** Additional styles for the input frame */
  style?: any;

  /** Input wrapper style */
  wrapperStyle?: any;

  /** Accessibility label */
  accessibilityLabel?: string;
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
      multiline,
    }: {
      radius: MantineNumberSize;
      invalid: boolean;
      withIcon: boolean;
      withRightSection: boolean;
      rightSectionWidth?: number;
      multiline: boolean;
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
        ...(multiline
          ? { minHeight: sizeValue as any, paddingVertical: rem(8) as any }
          : { height: sizeValue as any }),
        flexDirection: 'row',
        alignItems: 'center',
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
        ...getVariantStyles(),
        ...(invalid && {
          borderColor: (theme.colors.red || [])[6],
        }),
      },
      disabled: {
        opacity: 0.6,
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

const defaultProps: Partial<InputBaseProps> = {
  size: 'sm',
  radius: 'sm',
  variant: 'default',
  required: false,
  disabled: false,
  multiline: false,
};

/**
 * InputBase renders the standard Mantine input frame (label, description,
 * error, icon and right section) around arbitrary content. Use it to build
 * custom inputs that look consistent with TextInput and friends.
 */
export const InputBase = forwardRef<View, InputBaseProps>((props, ref) => {
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
    disabled,
    multiline,
    onPress,
    children,
    style,
    wrapperStyle,
    accessibilityLabel,
    ...others
  } = useComponentDefaultProps('InputBase', defaultProps, props);

  const { styles, sx } = useStyles(
    {
      radius,
      invalid: !!error,
      withIcon: !!icon,
      withRightSection: !!rightSection,
      rightSectionWidth,
      multiline,
    },
    { name: 'InputBase', variant, size }
  ) as any;

  const frame = (
    <BoxView style={sx(styles.input, disabled && styles.disabled, style)}>
      {children}
    </BoxView>
  );

  return (
    <BoxView ref={ref} style={sx(styles.wrapper, wrapperStyle)} {...others}>
      {label && (
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      )}

      {description && <Text style={styles.description}>{description}</Text>}

      <BoxView style={styles.inputWrapper}>
        {icon && <BoxView style={styles.icon}>{icon}</BoxView>}

        {onPress ? (
          <Pressable
            onPress={onPress}
            disabled={disabled}
            accessibilityRole="button"
            accessibilityLabel={
              accessibilityLabel ||
              (typeof label === 'string' ? label : undefined)
            }
            accessibilityState={{ disabled }}
          >
            {frame}
          </Pressable>
        ) : (
          frame
        )}

        {rightSection && (
          <BoxView style={styles.rightSectionContainer}>{rightSection}</BoxView>
        )}
      </BoxView>

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
  );
});

InputBase.displayName = 'InputBase';
