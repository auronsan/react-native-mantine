import React, { forwardRef } from 'react';
import { useComponentDefaultProps } from '../../theme/theme-provider';

import type {
  DefaultProps,
  MantineNumberSize,
  MantineColor,
  Variants,
} from '../../theme/types';

import { UnstyledButton } from '../UnstyledButton';
import useStyles from './ActionIcon.styles';
import { Loader } from '../Loader';

import type { LoaderProps } from '../Loader';
import { BoxView } from '../BoxView';

export interface ActionIconProps extends DefaultProps {
  __staticSelector?: string;

  /** Icon */
  children?: React.ReactNode;

  /** Controls appearance, subtle by default */
  variant?: Variants<
    | 'subtle'
    | 'filled'
    | 'outline'
    | 'light'
    | 'default'
    | 'transparent'
    | 'gradient'
  >;

  /** Key of theme.colors */
  color?: MantineColor;

  /** Key of theme.radius or any valid CSS value to set border-radius, theme.defaultRadius by default */
  radius?: MantineNumberSize;

  /** Predefined button size or any valid CSS value to set width and height */
  size?: MantineNumberSize;

  /** Props added to Loader component (only visible when `loading` prop is set) */
  loaderProps?: LoaderProps;

  /** Indicates loading state */
  loading?: boolean;

  /** Indicates disabled state */
  disabled?: boolean;

  icon?: React.ReactNode;
}

const defaultProps: Partial<ActionIconProps> = {
  color: 'gray',
  size: 'md',
  variant: 'subtle',
};

export const ActionIcon = forwardRef<any, ActionIconProps>((props, ref) => {
  const {
    color,
    children,
    radius,
    size,
    variant,
    disabled,
    loaderProps,
    loading,
    style,
    __staticSelector,
    icon,
    ...others
  } = useComponentDefaultProps('ActionIcon', defaultProps, props);

  const { styles, theme } = useStyles({ radius, color, variant, size });

  const loader = (
    <Loader
      color={theme.fn.variant({ color, variant }).color}
      size="100%"
      data-action-icon-loader
      {...loaderProps}
    />
  );

  return (
    <UnstyledButton
      style={[styles.root, style]}
      ref={ref}
      data-disabled={disabled || undefined}
      data-loading={loading || undefined}
      {...others}
    >
      {icon && <BoxView style={styles.icon}>{icon}</BoxView>}
      {loading ? loader : children}
    </UnstyledButton>
  );
});
