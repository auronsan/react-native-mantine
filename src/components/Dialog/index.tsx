import React, { forwardRef, useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { Paper } from '../Paper';
import type { DefaultProps, MantineNumberSize, SpacingValue } from '../../theme/types';
import { useComponentDefaultProps } from '../../theme/theme-provider';
import { createStyles } from '../../theme';
import { rem } from '../../theme/utils/rem';

export interface DialogProps extends DefaultProps {
  /** Dialog opened state */
  opened: boolean;

  /** Dialog content */
  children?: React.ReactNode;

  /** Dialog size */
  size?: MantineNumberSize | number;

  /** Dialog padding */
  padding?: SpacingValue;

  /** Dialog border radius */
  radius?: MantineNumberSize;

  /** Dialog position */
  position?: {
    top?: number;
    left?: number;
    right?: number;
    bottom?: number;
  };

  /** If true, dialog will show shadow */
  withShadow?: boolean;

  /** If true, dialog will show border */
  withBorder?: boolean;

  /** Additional styles */
  style?: any;

  /** Animation duration in ms */
  transitionDuration?: number;
}

const sizes = {
  xs: 200,
  sm: 280,
  md: 360,
  lg: 440,
  xl: 560,
};

const useStyles = createStyles(
  (
    _theme,
    {
      size,
      position,
    }: {
      size: MantineNumberSize | number;
      position?: {
        top?: number;
        left?: number;
        right?: number;
        bottom?: number;
      };
    }
  ) => {
    const getSize = () => {
      if (typeof size === 'number') return rem(size);
      const sizeKey = size as keyof typeof sizes;
      return rem(sizes[sizeKey] || sizes.md);
    };

    const defaultPosition = {
      bottom: 20,
      right: 20,
    };

    const finalPosition = position || defaultPosition;

    return {
      root: {
        position: 'absolute' as const,
        width: getSize() as any,
        maxWidth: '90%' as any,
        zIndex: 1000,
        ...(finalPosition.top !== undefined && { top: rem(finalPosition.top) as any }),
        ...(finalPosition.bottom !== undefined && { bottom: rem(finalPosition.bottom) as any }),
        ...(finalPosition.left !== undefined && { left: rem(finalPosition.left) as any }),
        ...(finalPosition.right !== undefined && { right: rem(finalPosition.right) as any }),
      },
    };
  }
);

const defaultProps: Partial<DialogProps> = {
  size: 'md',
  padding: 'md',
  radius: 'md',
  withShadow: true,
  withBorder: false,
  transitionDuration: 200,
};

export const Dialog = forwardRef<any, DialogProps>((props, ref) => {
  const {
    opened,
    children,
    size,
    padding,
    radius,
    position,
    withShadow,
    withBorder,
    style,
    transitionDuration,
    ...others
  } = useComponentDefaultProps('Dialog', defaultProps, props);

  const { styles, sx } = useStyles({ size, position }, { name: 'Dialog' }) as any;

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    if (opened) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: transitionDuration,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: true,
          friction: 8,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: transitionDuration,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 50,
          duration: transitionDuration,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [opened, fadeAnim, slideAnim, transitionDuration]);

  if (!opened) {
    return null;
  }

  return (
    <Animated.View
      ref={ref}
      style={[
        sx(styles.root, style),
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
      {...others}
    >
      <Paper
        shadow={withShadow ? 'lg' : undefined}
        radius={radius}
        p={padding}
        withBorder={withBorder}
      >
        {children}
      </Paper>
    </Animated.View>
  );
});

Dialog.displayName = 'Dialog';
