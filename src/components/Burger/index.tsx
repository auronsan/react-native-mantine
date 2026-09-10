import { forwardRef, useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';
import { UnstyledButton } from '../UnstyledButton';
import type { DefaultProps, MantineNumberSize } from '../../theme/types';
import { useComponentDefaultProps } from '../../theme/theme-provider';
import { createStyles } from '../../theme';
import { rem } from '../../theme/utils/rem';

/**
 * Props for the Burger component
 *
 * @property {boolean} opened - Burger state: true displays a cross icon, false displays a burger menu icon
 * @property {() => void} [onPress] - Callback fired when burger is pressed
 * @property {string} [color] - Burger color value. If not provided, uses theme default based on color scheme
 * @property {MantineNumberSize} [size='md'] - Predefined burger size ('xs', 'sm', 'md', 'lg', 'xl') or custom number
 * @property {number} [transitionDuration=300] - Animation transition duration in milliseconds
 * @property {string} [accessibilityLabel] - Accessibility label. Defaults to 'Open navigation' or 'Close navigation' based on state
 * @property {any} [style] - Additional styles to apply to the burger button
 */
export interface BurgerProps extends DefaultProps {
  /** Burger state: true for cross, false for burger */
  opened: boolean;

  /** Callback fired when burger is pressed */
  onPress?: () => void;

  /** Burger color value */
  color?: string;

  /** Predefined burger size or number to set width and height */
  size?: MantineNumberSize;

  /** Transition duration in ms */
  transitionDuration?: number;

  /** Accessibility label */
  accessibilityLabel?: string;

  /** Additional styles */
  style?: any;
}

const sizes = {
  xs: rem(12),
  sm: rem(18),
  md: rem(24),
  lg: rem(34),
  xl: rem(42),
};

const useStyles = createStyles(
  (
    theme,
    {
      color,
      size,
    }: {
      color: string;
      size: MantineNumberSize;
    }
  ) => {
    const sizeValue = typeof size === 'number' ? rem(size) : sizes[size as keyof typeof sizes] || sizes.md;
    const defaultColor = theme.colorScheme === 'dark' ? theme.colors.white : theme.colors.black;
    const lineColor = color || (typeof defaultColor === 'string' ? defaultColor : (defaultColor?.[0] ?? '#000'));
    const lineHeight = (sizeValue as number) / 12;

    return {
      root: {
        borderRadius: theme.fn.radius('sm'),
        width: (sizeValue as number) + theme.spacing.xs,
        height: (sizeValue as number) + theme.spacing.xs,
        padding: theme.spacing.xs / 2,
        justifyContent: 'center',
        alignItems: 'center',
      },
      burger: {
        position: 'relative',
        width: sizeValue as any,
        height: sizeValue as any,
        justifyContent: 'center',
        alignItems: 'center',
      },
      line: {
        position: 'absolute',
        width: sizeValue as any,
        height: lineHeight,
        backgroundColor: lineColor as string,
      },
      topLine: {
        top: 0,
      },
      middleLine: {
        top: '50%' as any,
        marginTop: -lineHeight / 2,
      },
      bottomLine: {
        bottom: 0,
      },
    };
  }
);

const defaultProps: Partial<BurgerProps> = {
  size: 'md',
  transitionDuration: 300,
};

/**
 * Burger component displays an animated button that toggles between burger and cross icons
 *
 * @example
 * ```tsx
 * // Basic burger
 * const [opened, setOpened] = useState(false);
 * <Burger opened={opened} onPress={() => setOpened(!opened)} />
 *
 * // Colored burger with custom size
 * <Burger opened={opened} onPress={toggle} color="#FF0000" size="lg" />
 *
 * // Custom transition duration
 * <Burger
 *   opened={opened}
 *   onPress={toggle}
 *   transitionDuration={500}
 * />
 * ```
 */
export const Burger = forwardRef<View, BurgerProps>((props, ref) => {
  const {
    opened,
    onPress,
    color,
    size,
    transitionDuration,
    accessibilityLabel,
    style,
    ...others
  } = useComponentDefaultProps('Burger', defaultProps, props);

  const { styles } = useStyles(
    { color: color ?? '', size: size ?? 'md' },
    { name: 'Burger' }
  );

  const sizeValue = typeof size === 'number' ? rem(size) : sizes[size as keyof typeof sizes] || sizes.md;

  const topLineRotation = useRef(new Animated.Value(opened ? 1 : 0)).current;
  const topLineTranslateY = useRef(new Animated.Value(opened ? 1 : 0)).current;
  const middleLineOpacity = useRef(new Animated.Value(opened ? 0 : 1)).current;
  const bottomLineRotation = useRef(new Animated.Value(opened ? 1 : 0)).current;
  const bottomLineTranslateY = useRef(new Animated.Value(opened ? 1 : 0)).current;

  useEffect(() => {
    const toValue = opened ? 1 : 0;
    const duration = transitionDuration;

    Animated.parallel([
      Animated.timing(topLineRotation, {
        toValue,
        duration,
        useNativeDriver: true,
      }),
      Animated.timing(topLineTranslateY, {
        toValue,
        duration,
        useNativeDriver: true,
      }),
      Animated.timing(middleLineOpacity, {
        toValue: opened ? 0 : 1,
        duration,
        useNativeDriver: true,
      }),
      Animated.timing(bottomLineRotation, {
        toValue,
        duration,
        useNativeDriver: true,
      }),
      Animated.timing(bottomLineTranslateY, {
        toValue,
        duration,
        useNativeDriver: true,
      }),
    ]).start();
  }, [opened, transitionDuration, topLineRotation, topLineTranslateY, middleLineOpacity, bottomLineRotation, bottomLineTranslateY]);

  const topLineStyle = {
    transform: [
      {
        translateY: topLineTranslateY.interpolate({
          inputRange: [0, 1],
          outputRange: [0, (sizeValue as number) / 3],
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
          outputRange: [0, -(sizeValue as number) / 3],
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
    <UnstyledButton
      ref={ref}
      style={[styles.root, style]}
      onPress={onPress}
      accessibilityLabel={accessibilityLabel || (opened ? 'Close navigation' : 'Open navigation')}
      accessibilityState={{ expanded: opened }}
      {...others}
    >
      <View style={styles.burger}>
        <Animated.View style={[styles.line, styles.topLine, topLineStyle]} />
        <Animated.View style={[styles.line, styles.middleLine, { opacity: middleLineOpacity }]} />
        <Animated.View style={[styles.line, styles.bottomLine, bottomLineStyle]} />
      </View>
    </UnstyledButton>
  );
});

Burger.displayName = 'Burger';
