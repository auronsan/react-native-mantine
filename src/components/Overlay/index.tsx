import React, { forwardRef } from 'react';
import { TouchableWithoutFeedback, Animated, StyleSheet } from 'react-native';
import type { DefaultProps, MantineNumberSize } from '../../theme/types';
import { useComponentDefaultProps } from '../../theme/theme-provider';
import { createStyles } from '../../theme';

export interface OverlayProps extends DefaultProps {
  /** Controls overlay opacity */
  opacity?: number;

  /** Controls overlay color */
  color?: string;

  /** Controls overlay blur (not fully supported in React Native) */
  blur?: number;

  /** Controls overlay z-index */
  zIndex?: number;

  /** Border radius */
  radius?: MantineNumberSize;

  /** Children to render inside overlay */
  children?: React.ReactNode;

  /** Called when overlay is pressed */
  onPress?: () => void;

  /** Additional styles */
  style?: any;

  /** If true, overlay will not block touches to underlying content */
  fixed?: boolean;
}

const useStyles = createStyles(
  (
    theme,
    {
      opacity,
      color,
      zIndex,
      radius,
      fixed,
    }: {
      opacity: number;
      color: string;
      zIndex: number;
      radius: MantineNumberSize;
      fixed: boolean;
    }
  ) => ({
    root: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: color,
      opacity,
      zIndex,
      borderRadius: theme.fn.radius(radius),
      ...(fixed && {
        position: 'absolute' as const,
      }),
    },
  })
);

const defaultProps: Partial<OverlayProps> = {
  opacity: 0.6,
  color: '#000',
  zIndex: 1000,
  radius: 0,
  fixed: false,
};

export const Overlay = forwardRef<any, OverlayProps>((props, ref) => {
  const { opacity, color, zIndex, radius, children, onPress, style, fixed, ...others} =
    useComponentDefaultProps('Overlay', defaultProps, props);

  const { styles, sx} = useStyles(
    { opacity, color, zIndex, radius, fixed },
    { name: 'Overlay' }
  ) as any;

  const content = (
    <Animated.View ref={ref} style={sx(styles.root, style)} {...others}>
      {children}
    </Animated.View>
  );

  if (onPress) {
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        {content}
      </TouchableWithoutFeedback>
    );
  }

  return content;
});

Overlay.displayName = 'Overlay';
