import React, { forwardRef } from 'react';
import { BoxView } from '../BoxView';
import type {
  DefaultProps,
  MantineColor,
  MantineNumberSize,
  MantineSize,
  Variants,
} from '../../theme/types';
import type { MantineGradient } from '../../theme/theme';
import { useComponentDefaultProps } from '../../theme/theme-provider';
import { createStyles } from '../../theme';
import { getSize } from '../../theme';
import { useAdapter } from '../../adapters/context';

export interface ThemeIconProps extends DefaultProps {
  /** Icon */
  children: React.ReactNode;

  /** Key of theme.colors */
  color?: MantineColor;

  /** Controls appearance */
  variant?: Variants<'filled' | 'light' | 'gradient' | 'outline'>;

  /** Controls gradient settings in gradient variant only */
  gradient?: MantineGradient;

  /** Predefined size or number to set width and height in px */
  size?: MantineSize | number;

  /** Key of theme.radius or number to set border-radius in px */
  radius?: MantineNumberSize;

  /** Additional styles */
  style?: any;
}

const sizes = {
  xs: 16,
  sm: 20,
  md: 26,
  lg: 32,
  xl: 40,
};

const useStyles = createStyles(
  (
    theme,
    {
      color,
      size,
      radius,
      variant,
    }: {
      color: MantineColor;
      size: MantineSize | number;
      radius: MantineNumberSize;
      variant: 'filled' | 'light' | 'gradient' | 'outline';
    }
  ) => {
    const iconSize = typeof size === 'number' ? size : getSize({ size, sizes }) as number;
    const themeColor = theme?.colors && color in theme.colors ? color : theme.primaryColor;

    const getVariantStyles = () => {
      switch (variant) {
        case 'filled': {
          const variantStyles = theme.fn.variant({ variant: 'filled', color: themeColor });
          return {
            backgroundColor: variantStyles.background,
          };
        }
        case 'light': {
          const variantStyles = theme.fn.variant({ variant: 'light', color: themeColor });
          return {
            backgroundColor: variantStyles.background,
          };
        }
        case 'outline': {
          const variantStyles = theme.fn.variant({ variant: 'outline', color: themeColor });
          return {
            backgroundColor: variantStyles.background,
            borderWidth: 1,
            borderColor: variantStyles.border,
          };
        }
        case 'gradient':
          return {
            backgroundColor: 'transparent' as const,
          };
        default: {
          const variantStyles = theme.fn.variant({ variant: 'filled', color: themeColor });
          return {
            backgroundColor: variantStyles.background,
          };
        }
      }
    };

    return {
      root: {
        width: iconSize,
        height: iconSize,
        borderRadius: theme.fn.radius(radius),
        justifyContent: 'center' as const,
        alignItems: 'center' as const,
        overflow: 'hidden' as const,
        ...getVariantStyles(),
      },
      gradient: {
        width: '100%' as const,
        height: '100%' as const,
        justifyContent: 'center' as const,
        alignItems: 'center' as const,
      },
    };
  }
);

const defaultProps: Partial<ThemeIconProps> = {
  variant: 'filled',
  size: 'md',
  radius: 'sm',
  color: 'blue',
  gradient: { from: 'blue', to: 'cyan', deg: 45 },
};

const _ThemeIcon = forwardRef<any, ThemeIconProps>((props, ref) => {
  const { color, variant, gradient, size, radius, children, style, ...others} =
    useComponentDefaultProps('ThemeIcon', defaultProps, props);

  // Gradient implementation: ThemeProvider adapters / configureMantine,
  // otherwise expo-linear-gradient when installed
  const LinearGradient = useAdapter('LinearGradient', {
    warn: variant === 'gradient',
  });

  const { styles, sx, theme} = useStyles(
    {
      color: color ?? defaultProps.color ?? 'blue',
      size: size ?? defaultProps.size ?? 'md',
      radius: radius ?? defaultProps.radius ?? 'sm',
      variant: (variant ?? defaultProps.variant ?? 'filled') as 'filled' | 'light' | 'gradient' | 'outline'
    },
    { name: 'ThemeIcon' }
  ) as any;

  const getGradientColors = (): [string, string] => {
    const fromColor = gradient?.from
      ? theme.fn.themeColor(gradient.from)
      : theme.fn.themeColor('blue');
    const toColor = gradient?.to
      ? theme.fn.themeColor(gradient.to)
      : theme.fn.themeColor('cyan');
    return [fromColor, toColor];
  };

  if (variant === 'gradient') {
    // If a gradient implementation is available, use it
    if (LinearGradient) {
      return (
        <BoxView ref={ref} style={sx(styles.root, style)} {...others}>
          <LinearGradient
            colors={getGradientColors()}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}
          >
            {children}
          </LinearGradient>
        </BoxView>
      );
    }

    // Fallback: use solid color (first color from gradient)
    const fallbackColor = getGradientColors()[0];
    return (
      <BoxView ref={ref} style={sx(styles.root, { backgroundColor: fallbackColor }, style)} {...others}>
        {children}
      </BoxView>
    );
  }

  return (
    <BoxView ref={ref} style={sx(styles.root, style)} {...others}>
      {children}
    </BoxView>
  );
});

export const ThemeIcon = React.memo(_ThemeIcon);
ThemeIcon.displayName = 'ThemeIcon';
