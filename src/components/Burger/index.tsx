import { forwardRef, useEffect, useRef } from 'react';
import { TouchableOpacity, Animated } from 'react-native';
import type { DefaultProps, MantineSize } from '../../theme/types';
import { useComponentDefaultProps } from '../../theme/theme-provider';
import { createStyles } from '../../theme';
import { getSize } from '../../theme';

export interface BurgerProps extends DefaultProps {
  /** Burger state: true for cross, false for burger */
  opened: boolean;

  /** Called when burger is pressed */
  onPress?: () => void;

  /** Burger color */
  color?: string;

  /** Predefined burger size or number to set width and height in px */
  size?: MantineSize | number;

  /** Transition duration in ms */
  transitionDuration?: number;

  /** Accessibility label */
  accessibilityLabel?: string;

  /** Additional styles */
  style?: any;

  /** Disabled state */
  disabled?: boolean;
}

const sizes = {
  xs: 12,
  sm: 18,
  md: 24,
  lg: 34,
  xl: 42,
};

const useStyles = createStyles(
  (
    _theme,
    {
      size,
      color,
      disabled,
    }: {
      size: MantineSize | number;
      color: string;
      disabled: boolean;
    }
  ) => {
    const burgerSize = typeof size === 'number' ? size : (getSize({ size, sizes }) as unknown as number);

    return {
      root: {
        width: burgerSize + 8,
        height: burgerSize,
        justifyContent: 'center' as const,
        alignItems: 'center' as const,
        opacity: disabled ? 0.4 : 1,
      },
      burger: {
        width: burgerSize,
        height: burgerSize,
        justifyContent: 'space-between' as const,
        position: 'relative' as const,
      },
      line: {
        height: Math.max(1, Math.round(burgerSize / 12)),
        backgroundColor: color,
        borderRadius: burgerSize / 24,
      },
    };
  }
);

const defaultProps: Partial<BurgerProps> = {
  size: 'md',
  transitionDuration: 300,
  accessibilityLabel: 'Toggle navigation',
  disabled: false,
};

export const Burger = forwardRef<any, BurgerProps>((props, ref) => {
  const {
    opened,
    onPress,
    color,
    size = 'md',
    transitionDuration,
    accessibilityLabel,
    style,
    disabled,
    ...others
  } = useComponentDefaultProps('Burger', defaultProps, props);

  const topLineRotation = useRef(new Animated.Value(0)).current;
  const middleLineOpacity = useRef(new Animated.Value(1)).current;
  const bottomLineRotation = useRef(new Animated.Value(0)).current;
  const topLineTranslateY = useRef(new Animated.Value(0)).current;
  const bottomLineTranslateY = useRef(new Animated.Value(0)).current;

  const burgerSize = typeof size === 'number' ? size : (getSize({ size, sizes }) as unknown as number);
  const lineHeight = Math.max(1, Math.round(burgerSize / 12));
  const spacing = (burgerSize - lineHeight * 3) / 2;

  const { styles, sx } = useStyles(
    {
      size,
      color: color || '#000',
      disabled: disabled || false,
    },
    { name: 'Burger' }
  ) as any;


  useEffect(() => {
    const config = {
      duration: transitionDuration,
      useNativeDriver: true,
    };

    if (opened) {
      Animated.parallel([
        Animated.timing(topLineRotation, {
          toValue: 1,
          ...config,
        }),
        Animated.timing(middleLineOpacity, {
          toValue: 0,
          ...config,
        }),
        Animated.timing(bottomLineRotation, {
          toValue: 1,
          ...config,
        }),
        Animated.timing(topLineTranslateY, {
          toValue: 1,
          ...config,
        }),
        Animated.timing(bottomLineTranslateY, {
          toValue: 1,
          ...config,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(topLineRotation, {
          toValue: 0,
          ...config,
        }),
        Animated.timing(middleLineOpacity, {
          toValue: 1,
          ...config,
        }),
        Animated.timing(bottomLineRotation, {
          toValue: 0,
          ...config,
        }),
        Animated.timing(topLineTranslateY, {
          toValue: 0,
          ...config,
        }),
        Animated.timing(bottomLineTranslateY, {
          toValue: 0,
          ...config,
        }),
      ]).start();
    }
  }, [opened, transitionDuration, topLineRotation, middleLineOpacity, bottomLineRotation, topLineTranslateY, bottomLineTranslateY]);

  const topLineStyle = {
    transform: [
      {
        translateY: topLineTranslateY.interpolate({
          inputRange: [0, 1],
          outputRange: [0, spacing + lineHeight],
        }),
      },
      {
        rotate: topLineRotation.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '45deg'],
        }),
      },
    ],
  };

  const bottomLineStyle = {
    transform: [
      {
        translateY: bottomLineTranslateY.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -(spacing + lineHeight)],
        }),
      },
      {
        rotate: bottomLineRotation.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '-45deg'],
        }),
      },
    ],
  };

  return (
    <TouchableOpacity
      ref={ref}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.6}
      accessible={true}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      accessibilityState={{ expanded: opened }}
      style={sx(styles.root, style)}
      {...others}
    >
      <Animated.View style={styles.burger}>
        <Animated.View style={[styles.line, topLineStyle]} />
        <Animated.View style={[styles.line, { opacity: middleLineOpacity }]} />
        <Animated.View style={[styles.line, bottomLineStyle]} />
      </Animated.View>
    </TouchableOpacity>
  );
});

Burger.displayName = 'Burger';
