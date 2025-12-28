import React, { forwardRef } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
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
import { getPrimaryShade } from '../../theme/functions/fns/primary-shade';

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
    const shade = getPrimaryShade(theme);

    const getVariantStyles = () => {
      switch (variant) {
        case 'filled':
          return {
            backgroundColor: theme.colors[themeColor]?.[shade] || theme.colors[themeColor]?.[6],
          };
        case 'light':
          return {
            backgroundColor:
              theme.currentMode === 'dark'
                ? theme.colors[themeColor]?.[9]
                : theme.colors[themeColor]?.[0],
          };
        case 'outline':
          return {
            backgroundColor: 'transparent' as const,
            borderWidth: 1,
            borderColor: theme.colors[themeColor]?.[shade] || theme.colors[themeColor]?.[6],
          };
        case 'gradient':
          return {
            backgroundColor: 'transparent' as const,
          };
        default:
          return {
            backgroundColor: theme.colors[themeColor]?.[shade] || theme.colors[themeColor]?.[6],
          };
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

export const ThemeIcon = forwardRef<any, ThemeIconProps>((props, ref) => {
  const { color, variant, gradient, size, radius, children, style, ...others} =
    useComponentDefaultProps('ThemeIcon', defaultProps, props);

  const { styles, sx, theme} = useStyles(
    { color, size, radius, variant },
    { name: 'ThemeIcon' }
  ) as any;

  const getGradientColors = (): [string, string] => {
    const shade = getPrimaryShade(theme);
    const fromColor =
      gradient?.from && theme?.colors && gradient.from in theme.colors
        ? theme.colors[gradient.from][shade]
        : gradient?.from || theme.colors.blue?.[6] || '#228be6';
    const toColor =
      gradient?.to && theme?.colors && gradient.to in theme.colors
        ? theme.colors[gradient.to][shade]
        : gradient?.to || theme.colors.cyan?.[6] || '#22b8cf';
    return [fromColor, toColor];
  };

  if (variant === 'gradient') {
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

  return (
    <BoxView ref={ref} style={sx(styles.root, style)} {...others}>
      {children}
    </BoxView>
  );
});

ThemeIcon.displayName = 'ThemeIcon';
