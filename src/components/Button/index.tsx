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
import { ActivityIndicator } from 'react-native';
import { useComponentDefaultProps } from '../../theme/theme-provider';
import useStyles from './Button.styles';
import { BoxView } from '../BoxView';

export type ButtonStylesNames = any;

export interface ButtonProps extends DefaultProps {
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
};

export const _Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      // className,
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
      // classNames,
      // styles,
      // unstyled,
      style,
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
        // unstyled, classNames, styles,
        variant,
        size,
      }
    );

    // const colors = theme.fn.variant({ color, variant });

    // const loader = (
    //   <Loader
    //     color={colors.color}
    //     size={`calc(${(getSize({ size, sizes }) as any).height} / 2)`}
    //     {...loaderProps}
    //   />
    // );
    const loader = <ActivityIndicator />;

    return (
      <UnstyledButton
        style={sx(styles.root, style)}
        // type={type}
        // disabled={disabled}
        data-button
        data-disabled={disabled || undefined}
        data-loading={loading || undefined}
        ref={ref}
        // unstyled={unstyled}
        {...others}
      >
        <BoxView style={styles.inner}>
          {(leftIcon || (loading && loaderPosition === 'left')) && (
            <BoxView style={sx(styles.icon, styles.leftIcon)}>
              {loading && loaderPosition === 'left' ? loader : leftIcon}
            </BoxView>
          )}

          {loading && loaderPosition === 'center' && (
            <BoxView style={styles.centerLoader}>{loader}</BoxView>
          )}

          <BoxView
            style={styles.label}
            // style={{ textTransform: uppercase ? 'uppercase' : undefined }}
          >
            {children}
          </BoxView>

          {(rightIcon || (loading && loaderPosition === 'right')) && (
            <BoxView style={sx(styles.icon, styles.rightIcon)}>
              {loading && loaderPosition === 'right' ? loader : rightIcon}
            </BoxView>
          )}
        </BoxView>
      </UnstyledButton>
    );
  }
) as any;
