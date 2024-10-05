import { ActivityIndicator } from 'react-native';
import type { MantineNumberSize, MantineColor } from '../../theme/types';

import { useComponentDefaultProps } from '../../theme/theme-provider';

// const sizes = {
//   xs: 18,
//   sm: 22,
//   md: 36,
//   lg: 44,
//   xl: 58,
// };

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
  const { size, color, variant, ...others } = useComponentDefaultProps(
    'Loader',
    defaultProps,
    props
  );
  return (
    <ActivityIndicator
      // size={getSize({ size, sizes })}
      // color={
      //   theme.fn.variant({
      //     variant: 'filled',
      //     primaryFallback: false,
      //     color: color || theme.primaryColor,
      //   }).background
      // }
      {...others}
    />
  );
}

Loader.displayName = '@mantine/core/Loader';
