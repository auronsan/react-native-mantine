import React, { forwardRef } from 'react';
import { PlatformLinearGradient } from '../LinearGradient';
import { UnstyledButton } from '../UnstyledButton';
import type {
  DefaultProps,
  MantineColor,
  MantineNumberSize,
  MantineSize,
  Variants,
} from '../../theme/types';
import type { MantineGradient } from '../../theme/theme';
import type { LoaderProps } from '../Loader';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { useComponentDefaultProps } from '../../theme/theme-provider';
import useStyles from './Button.styles';
import { BoxView } from '../BoxView';
import { withTextWrapper, type WithTextWrapperProps } from '../../theme/utils/withTextWrapper';

export type ButtonStylesNames = 'root' | 'icon' | 'leftIcon' | 'rightIcon' | 'inner' | 'label';

/**
 * Props for the Button component
 *
 * @property {MantineSize} [size] - Predefined button size (xs, sm, md, lg, xl)
 * @property {'submit' | 'button' | 'reset'} [type] - Button type attribute
 * @property {MantineColor} [color] - Button color from theme
 * @property {React.ReactNode} [leftIcon] - Icon displayed before button label
 * @property {React.ReactNode} [rightIcon] - Icon displayed after button label
 * @property {boolean} [fullWidth] - Sets button width to 100% of parent element
 * @property {MantineNumberSize} [radius] - Border radius from theme or custom value
 * @property {Variants<'filled' | 'outline' | 'light' | 'white' | 'default' | 'subtle' | 'gradient'>} [variant] - Controls button appearance style
 * @property {MantineGradient} [gradient] - Gradient settings (only applies to gradient variant)
 * @property {boolean} [uppercase] - Transforms text to uppercase
 * @property {boolean} [compact] - Reduces vertical and horizontal spacing
 * @property {boolean} [loading] - Shows loading indicator and disables interaction
 * @property {LoaderProps} [loaderProps] - Props passed to the Loader component
 * @property {'left' | 'right' | 'center'} [loaderPosition] - Position of loader relative to label
 * @property {React.ReactNode} [children] - Button label content
 * @property {boolean} [disabled] - Disables button interaction
 * @property {(payload: any) => void} [onPress] - Callback fired when button is pressed
 * @property {string} [accessibilityLabel] - Label for screen readers
 * @property {string} [testID] - Test identifier for automated testing
 * @property {any} [style] - Additional style overrides
 */
export interface ButtonProps extends DefaultProps, WithTextWrapperProps {
  /** Predefined button size */
  size?: MantineSize;

  /** Button type attribute */
  type?: 'submit' | 'button' | 'reset';

  /** Button color from theme */
  color?: MantineColor;

  /** Adds icon before button label  */
  leftIcon?: React.ReactNode;

  /** Adds icon after button label  */
  rightIcon?: React.ReactNode;

  /** Sets button width to 100% of parent element */
  fullWidth?: boolean;

  /** Key of theme.radius or number to set border-radius, theme.defaultRadius by default */
  radius?: MantineNumberSize;

  /** Controls button appearance */
  variant?: Variants<
    'filled' | 'outline' | 'light' | 'white' | 'default' | 'subtle' | 'gradient'
  >;

  /** Controls gradient settings in gradient variant only */
  gradient?: MantineGradient;

  /** Set text-transform to uppercase */
  uppercase?: boolean;

  /** Reduces vertical and horizontal spacing */
  compact?: boolean;

  /** Indicate loading state */
  loading?: boolean;

  /** Props spread to Loader component */
  loaderProps?: LoaderProps;

  /** Loader position relative to button label */
  loaderPosition?: 'left' | 'right' | 'center';

  /** Button label */
  children?: React.ReactNode;

  /** Disabled state */
  disabled?: boolean;

  /** Callback fired when button is pressed */
  onPress?: (payload: any) => void;

  /** Accessibility label for screen readers */
  accessibilityLabel?: string;

  /** Test ID for testing */
  testID?: string;

  style?: any;
}

const defaultProps: Partial<ButtonProps> = {
  size: 'sm',
  type: 'button',
  variant: 'filled',
  loaderPosition: 'left',
  withTextWrapper: true,
};

export const _Button = forwardRef<View, ButtonProps>((props, ref) => {
  const {
    size,
    color,
    type,
    disabled,
    children,
    leftIcon,
    rightIcon,
    fullWidth,
    variant,
    radius,
    uppercase,
    compact,
    loading,
    loaderPosition,
    loaderProps,
    gradient,
    style,
    withTextWrapper: shouldWrapInText,
    accessibilityLabel,
    testID,
    ...others
  } = useComponentDefaultProps('Button', defaultProps, props);

  const { styles, sx, theme } = useStyles(
    {
      radius: radius ?? defaultProps.radius ?? 'sm',
      color: color ?? 'blue',
      fullWidth: fullWidth ?? false,
      compact: compact ?? false,
      gradient,
      withLeftIcon: !!leftIcon,
      withRightIcon: !!rightIcon,
    },
    {
      name: 'Button',
      variant: variant ?? defaultProps.variant ?? 'filled',
      size: size ?? defaultProps.size ?? 'sm',
    }
  );

  // Get the text color from the variant styles
  // We need to cast to access the color property since TypeScript doesn't know the exact type
  const textColor = (styles.root as any).color as string;

  const loader = <ActivityIndicator />;

  const buttonContent = (
    <BoxView style={styles.inner}>
      <BoxView style={styles.label}>
        {(leftIcon || (loading && loaderPosition === 'left')) && (
          <BoxView style={sx(styles.icon, styles.leftIcon)}>
            {loading && loaderPosition === 'left' ? loader : leftIcon}
          </BoxView>
        )}

        {loading && loaderPosition === 'center' && (
          <BoxView style={styles.centerLoader}>{loader}</BoxView>
        )}
        {withTextWrapper(children, shouldWrapInText, { color: textColor })}
        {(rightIcon || (loading && loaderPosition === 'right')) && (
          <BoxView style={sx(styles.icon, styles.rightIcon)}>
            {loading && loaderPosition === 'right' ? loader : rightIcon}
          </BoxView>
        )}
      </BoxView>
    </BoxView>
  );

  // For gradient variant, wrap content in LinearGradient
  if (variant === 'gradient') {
    const gradientConfig = theme.fn.gradient(gradient);
    const gradientStyle = StyleSheet.flatten([styles.root, style]);
    const { backgroundColor, ...restStyle } = gradientStyle;

    // Extract borderRadius and other style properties for the gradient
    const { borderRadius, borderWidth, borderColor, borderStyle, ...containerStyle } = restStyle;

    const linearGradientStyle = {
      ...gradientStyles.gradient,
      borderRadius,
    };

    return (
      <UnstyledButton
        style={containerStyle}
        disabled={disabled || loading}
        ref={ref}
        accessibilityLabel={accessibilityLabel}
        testID={testID}
        {...others}
      >
        <PlatformLinearGradient
          colors={gradientConfig.colors}
          start={gradientConfig.start}
          end={gradientConfig.end}
          style={linearGradientStyle}
        >
          {buttonContent}
        </PlatformLinearGradient>
      </UnstyledButton>
    );
  }

  return (
    <UnstyledButton
      style={sx(styles.root, style)}
      disabled={disabled || loading}
      ref={ref}
      accessibilityLabel={accessibilityLabel}
      testID={testID}
      {...others}
    >
      {buttonContent}
    </UnstyledButton>
  );
});

_Button.displayName = 'Button';

/**
 * Button component for React Native Mantine
 *
 * A customizable button component with support for multiple variants, sizes, colors,
 * icons, loading states, and gradient backgrounds. Provides consistent styling and
 * behavior across your React Native application.
 *
 * @example
 * ```tsx
 * // Basic button
 * <Button>Click me</Button>
 *
 * // Button with icon and variant
 * <Button variant="outline" color="red" leftIcon={<Icon />}>
 *   Delete
 * </Button>
 *
 * // Loading button
 * <Button loading loaderPosition="center">
 *   Processing...
 * </Button>
 *
 * // Gradient button
 * <Button variant="gradient" gradient={{ from: 'blue', to: 'cyan' }}>
 *   Gradient
 * </Button>
 * ```
 */
const gradientStyles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
});

export const Button = _Button;
