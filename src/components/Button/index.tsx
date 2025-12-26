import React, { forwardRef } from 'react';
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
import { ActivityIndicator, View } from 'react-native';
import { useComponentDefaultProps } from '../../theme/theme-provider';
import useStyles from './Button.styles';
import { BoxView } from '../BoxView';
import { withTextWrapper, type WithTextWrapperProps } from '../../theme/utils/withTextWrapper';

export type ButtonStylesNames = any;

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

  /** Key of theme.radius or any valid CSS value to set border-radius, theme.defaultRadius by default */
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
    ...others
  } = useComponentDefaultProps('Button', defaultProps, props);

  const { styles, sx } = useStyles(
    {
      radius,
      color,
      fullWidth,
      compact,
      gradient,
      withLeftIcon: !!leftIcon,
      withRightIcon: !!rightIcon,
    },
    {
      name: 'Button',
      variant,
      size,
    }
  );

  const loader = <ActivityIndicator />;

  return (
    <UnstyledButton
      style={sx(styles.root, style)}
      data-button
      data-disabled={disabled || undefined}
      data-loading={loading || undefined}
      ref={ref}
      {...others}
    >
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
          {withTextWrapper(children, shouldWrapInText)}
          {(rightIcon || (loading && loaderPosition === 'right')) && (
            <BoxView style={sx(styles.icon, styles.rightIcon)}>
              {loading && loaderPosition === 'right' ? loader : rightIcon}
            </BoxView>
          )}
        </BoxView>
      </BoxView>
    </UnstyledButton>
  );
}) as any;

export const Button = _Button;
