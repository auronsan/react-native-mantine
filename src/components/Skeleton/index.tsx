import React, { forwardRef, useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { BoxView } from '../BoxView';
import type { DefaultProps, MantineNumberSize } from '../../theme/types';
import { useComponentDefaultProps } from '../../theme/theme-provider';
import { createStyles } from '../../theme';
import { rem } from '../../theme/utils/rem';

export interface SkeletonProps extends DefaultProps {
  /** Skeleton height */
  height?: number | string;

  /** Skeleton width */
  width?: number | string;

  /** Key of theme.radius or any valid value to set border-radius */
  radius?: MantineNumberSize;

  /** Should skeleton be a circle */
  circle?: boolean;

  /** Whether to show animation */
  animate?: boolean;

  /** If true, skeleton will be hidden and children will be displayed */
  visible?: boolean;

  /** Skeleton children */
  children?: React.ReactNode;

  /** Additional styles */
  style?: any;
}

const useStyles = createStyles(
  (
    theme,
    {
      height,
      width,
      radius,
      circle,
    }: {
      height?: number | string;
      width?: number | string;
      radius: MantineNumberSize;
      circle: boolean;
    }
  ) => {
    const getSize = (value?: number | string) => {
      if (typeof value === 'number') return rem(value);
      return value;
    };

    const circleSize = circle && height ? getSize(height) : undefined;

    return {
      root: {
        height: (circleSize || getSize(height) || rem(120)) as any,
        width: (circleSize || getSize(width) || '100%') as any,
        borderRadius: circle ? 9999 : theme.fn.radius(radius),
        backgroundColor: theme.colorScheme === 'dark' ? (theme.colors.dark || [])[4] : (theme.colors.gray || [])[3],
        overflow: 'hidden',
      },
      shimmer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
      },
    };
  }
) as any;

const defaultProps: Partial<SkeletonProps> = {
  height: 120,
  radius: 'sm',
  circle: false,
  animate: true,
  visible: true,
};

const _Skeleton = forwardRef<any, SkeletonProps>((props, ref) => {
  const {
    height,
    width,
    radius,
    circle,
    animate,
    visible,
    children,
    style,
    ...others
  } = useComponentDefaultProps('Skeleton', defaultProps, props);

  const shimmerAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (animate && visible) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(shimmerAnimation, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(shimmerAnimation, {
            toValue: 0,
            duration: 1500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [animate, visible, shimmerAnimation]);

  const { styles, sx} = useStyles(
    { height, width, radius, circle },
    { name: 'Skeleton' }
  ) as any;

  if (!visible && children) {
    return <>{children}</>;
  }

  const shimmerTranslateX = shimmerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['-100%', '100%'],
  });

  return (
    <BoxView ref={ref} style={sx(styles.root, style)} {...others}>
      {animate && (
        <Animated.View
          style={[
            styles.shimmer,
            {
              transform: [{ translateX: shimmerTranslateX as any }],
            },
          ]}
        />
      )}
    </BoxView>
  );
});

export const Skeleton = React.memo(_Skeleton);
Skeleton.displayName = 'Skeleton';
