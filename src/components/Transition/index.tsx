import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { Animated, Easing } from 'react-native';
import type { DefaultProps } from '../../theme/types';
import { useComponentDefaultProps } from '../../theme/theme-provider';

export type TransitionType =
  | 'fade'
  | 'scale'
  | 'slide-down'
  | 'slide-up'
  | 'slide-left'
  | 'slide-right'
  | 'pop'
  | 'rotate';

export interface TransitionProps extends DefaultProps {
  /** If true, component will be mounted */
  mounted: boolean;

  /** Transition type */
  transition?: TransitionType;

  /** Transition duration in ms */
  duration?: number;

  /** Exit transition duration in ms */
  exitDuration?: number;

  /** Transition timing function */
  timingFunction?: 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out';

  /** Children to transition */
  children: React.ReactNode;

  /** Called when exit transition ends */
  onExited?: () => void;

  /** Called when enter transition ends */
  onEntered?: () => void;

  /** Additional styles */
  style?: any;
}

const getEasing = (
  timingFunction: 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out'
) => {
  switch (timingFunction) {
    case 'linear':
      return Easing.linear;
    case 'ease':
      return Easing.ease;
    case 'ease-in':
      return Easing.in(Easing.ease);
    case 'ease-out':
      return Easing.out(Easing.ease);
    case 'ease-in-out':
      return Easing.inOut(Easing.ease);
    default:
      return Easing.ease;
  }
};

const defaultProps: Partial<TransitionProps> = {
  transition: 'fade',
  duration: 250,
  timingFunction: 'ease',
};

export const Transition = forwardRef<any, TransitionProps>((props, ref) => {
  const {
    mounted,
    transition,
    duration,
    exitDuration,
    timingFunction,
    children,
    onExited,
    onEntered,
    style,
    ...others
  } = useComponentDefaultProps('Transition', defaultProps, props);

  const animation = useRef(new Animated.Value(mounted ? 1 : 0)).current;
  const shouldRender = useRef(mounted);
  const [_exited, setExited] = useState(true);

  useEffect(() => {
    if (mounted) {
      shouldRender.current = true;
      Animated.timing(animation, {
        toValue: 1,
        duration: duration || 250,
        easing: getEasing(timingFunction || 'ease'),
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished && onEntered) {
          onEntered();
        }
        setExited(false);
      });
    } else {
      Animated.timing(animation, {
        toValue: 0,
        duration: exitDuration || duration || 250,
        easing: getEasing(timingFunction || 'ease'),
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) {
          shouldRender.current = false;
          if (onExited) {
            onExited();
          }
          setExited(true);
        }
      });
    }
  }, [
    mounted,
    duration,
    exitDuration,
    timingFunction,
    onEntered,
    onExited,
    animation,
  ]);

  const getTransformStyle = () => {
    switch (transition) {
      case 'fade':
        return {
          opacity: animation,
        };
      case 'scale':
        return {
          opacity: animation,
          transform: [
            {
              scale: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [0.75, 1],
              }),
            },
          ],
        };
      case 'slide-down':
        return {
          opacity: animation,
          transform: [
            {
              translateY: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [-20, 0],
              }),
            },
          ],
        };
      case 'slide-up':
        return {
          opacity: animation,
          transform: [
            {
              translateY: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0],
              }),
            },
          ],
        };
      case 'slide-left':
        return {
          opacity: animation,
          transform: [
            {
              translateX: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0],
              }),
            },
          ],
        };
      case 'slide-right':
        return {
          opacity: animation,
          transform: [
            {
              translateX: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [-20, 0],
              }),
            },
          ],
        };
      case 'pop':
        return {
          opacity: animation,
          transform: [
            {
              scale: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
            },
          ],
        };
      case 'rotate':
        return {
          opacity: animation,
          transform: [
            {
              rotate: animation.interpolate({
                inputRange: [0, 1],
                outputRange: ['-180deg', '0deg'],
              }),
            },
          ],
        };
      default:
        return {
          opacity: animation,
        };
    }
  };

  if (!shouldRender.current && !mounted) {
    return null;
  }

  return (
    <Animated.View ref={ref} style={[getTransformStyle(), style]} {...others}>
      {children}
    </Animated.View>
  );
});

Transition.displayName = 'Transition';
