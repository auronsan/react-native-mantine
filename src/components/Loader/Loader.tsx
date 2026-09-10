import { ActivityIndicator } from 'react-native';
import type { MantineNumberSize, MantineColor } from '../../theme/types';

import { useComponentDefaultProps, useTheme } from '../../theme/theme-provider';
import { getSize } from '../../theme/get-size';

const sizes = {
  xs: 18,
  sm: 22,
  md: 36,
  lg: 44,
  xl: 58,
};

export interface LoaderProps {
  /** Defines width of loader */
  size?: MantineNumberSize;

  /** Loader color from theme */
  color?: MantineColor;

  /** Loader appearance */
  variant?: any;
}

const defaultProps: Partial<LoaderProps> = {
  size: 'md',
};

export function Loader(props: LoaderProps) {
  const theme = useTheme();
  const { size, color, variant, ...others } = useComponentDefaultProps(
    'Loader',
    defaultProps,
    props
  );

  const loaderSize = getSize({ size: size || 'md', sizes }) as number;
  const loaderColor = color
    ? theme.fn.variant({
        variant: 'filled',
        primaryFallback: false,
        color: color,
      }).background
    : theme.fn.variant({
        variant: 'filled',
        primaryFallback: false,
        color: theme.primaryColor,
      }).background;

  return (
    <ActivityIndicator
      size={loaderSize}
      color={loaderColor}
      accessibilityRole="progressbar"
      accessibilityLabel="Loading"
      accessibilityState={{ busy: true }}
      {...others}
    />
  );
}

Loader.displayName = '@mantine/core/Loader';
