import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { Animated, type LayoutChangeEvent } from 'react-native';
import { BoxView } from '../BoxView';
import type { DefaultProps } from '../../theme/types';
import { useComponentDefaultProps } from '../../theme/theme-provider';

export interface CollapseProps extends DefaultProps {
  /** Content that should be collapsed */
  children: React.ReactNode;

  /** Opened state */
  in: boolean;

  /** Transition duration in ms */
  transitionDuration?: number;

  /** Transition timing function */
  transitionTimingFunction?: 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out';

  /** Called when transition ends */
  onTransitionEnd?: () => void;

  /** Animation delay in ms */
  animateOpacity?: boolean;

  /** Additional styles */
  style?: any;
}

const defaultProps: Partial<CollapseProps> = {
  transitionDuration: 200,
  transitionTimingFunction: 'ease',
  animateOpacity: true,
};

export const Collapse = forwardRef<any, CollapseProps>((props, ref) => {
  const {
    children,
    in: opened,
    transitionDuration,
    transitionTimingFunction,
    onTransitionEnd,
    animateOpacity,
    style,
    ...others
  } = useComponentDefaultProps('Collapse', defaultProps, props);

  const [contentHeight, setContentHeight] = useState<number>(0);
  const [isFirstLayout, setIsFirstLayout] = useState(true);
  const heightAnim = useRef(new Animated.Value(opened ? 1 : 0)).current;
  const opacityAnim = useRef(new Animated.Value(opened ? 1 : 0)).current;

  const handleLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    if (height > 0 && height !== contentHeight) {
      setContentHeight(height);
      if (isFirstLayout) {
        setIsFirstLayout(false);
      }
    }
  };

  useEffect(() => {
    // Don't animate on first render or if content height hasn't been measured yet
    if (isFirstLayout || contentHeight === 0) {
      return;
    }

    const animations = [
      Animated.timing(heightAnim, {
        toValue: opened ? 1 : 0,
        duration: transitionDuration,
        useNativeDriver: false,
      }),
    ];

    if (animateOpacity) {
      animations.push(
        Animated.timing(opacityAnim, {
          toValue: opened ? 1 : 0,
          duration: transitionDuration,
          useNativeDriver: true,
        })
      );
    }

    Animated.parallel(animations).start(({ finished }) => {
      if (finished && onTransitionEnd) {
        onTransitionEnd();
      }
    });
  }, [opened, heightAnim, opacityAnim, transitionDuration, animateOpacity, onTransitionEnd, contentHeight, isFirstLayout]);

  const animatedHeight = heightAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, contentHeight],
  });

  return (
    <Animated.View
      ref={ref}
      style={[
        {
          height: animatedHeight,
          overflow: 'hidden',
          ...(animateOpacity && { opacity: opacityAnim }),
        },
        style,
      ]}
      {...others}
    >
      <BoxView onLayout={handleLayout}>{children}</BoxView>
    </Animated.View>
  );
});

Collapse.displayName = 'Collapse';
