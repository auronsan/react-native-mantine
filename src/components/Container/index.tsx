import React, { forwardRef } from 'react';
import { BoxView } from '../BoxView';
import type { ViewProps } from '../BoxView';
import type { MantineNumberSize } from '../../theme/types';
import { useTheme } from '../../theme/theme-provider';
import { Dimensions } from 'react-native';

export interface ContainerProps extends ViewProps {
  /** Predefined container max-width or number for max-width in px */
  size?: MantineNumberSize | number;

  /** If true, container will take 100% of available width */
  fluid?: boolean;

  /** Container children */
  children?: React.ReactNode;

  /** Horizontal padding defined in theme.spacing, or number for padding in px */
  px?: MantineNumberSize | number;

  /** Vertical padding defined in theme.spacing, or number for padding in px */
  py?: MantineNumberSize | number;
}

const SIZES = {
  xs: 540,
  sm: 720,
  md: 960,
  lg: 1140,
  xl: 1320,
};

/**
 * Container component provides max-width constraint and centers content
 */
export const Container = forwardRef<any, ContainerProps>((props, ref) => {
  const {
    children,
    style,
    size = 'md',
    fluid = false,
    px = 'md',
    py,
    ...others
  } = props;

  const theme = useTheme();
  const screenWidth = Dimensions.get('window').width;

  // Get max width based on size prop
  const getMaxWidth = () => {
    if (fluid) {
      return '100%';
    }

    if (typeof size === 'number') {
      return Math.min(size, screenWidth);
    }

    const maxWidth = SIZES[size as keyof typeof SIZES] || SIZES.md;
    return Math.min(maxWidth, screenWidth);
  };

  // Get padding value from theme or use number directly
  const getPadding = (value: MantineNumberSize | number | undefined) => {
    if (value === undefined) return undefined;
    if (typeof value === 'number') return value;
    return theme.spacing[value as keyof typeof theme.spacing] || 0;
  };

  return (
    <BoxView
      ref={ref}
      style={[
        {
          maxWidth: getMaxWidth(),
          width: '100%',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingHorizontal: getPadding(px),
          paddingVertical: getPadding(py),
        },
        style,
      ]}
      {...others}
    >
      {children}
    </BoxView>
  );
});

Container.displayName = 'Container';
