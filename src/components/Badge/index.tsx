import React, { forwardRef } from 'react';
import { BoxView } from '../BoxView';
import type {
  DefaultProps,
  MantineColor,
  MantineNumberSize,
  MantineSize,
  Variants,
} from '../../theme/types';
import { useComponentDefaultProps } from '../../theme/theme-provider';
import { createStyles } from '../../theme';
import { rem } from '../../theme/utils/rem';
import { withTextWrapper, type WithTextWrapperProps } from '../../theme/utils/withTextWrapper';

/**
 * Props for the Badge component
 *
 * @property {MantineColor} [color='blue'] - Badge color from theme
 * @property {Variants<'filled' | 'light' | 'outline' | 'dot'>} [variant='light'] - Controls badge appearance. 'filled' for solid color, 'light' for lighter background, 'outline' for bordered, 'dot' for badge with indicator dot
 * @property {MantineSize} [size='md'] - Badge size. One of: 'xs', 'sm', 'md', 'lg', 'xl'
 * @property {MantineNumberSize} [radius='xl'] - Key of theme.radius or any valid value to set border-radius
 * @property {boolean} [fullWidth=false] - Sets badge width to 100% of parent element
 * @property {React.ReactNode} [leftSection] - Section displayed on the left side of badge
 * @property {React.ReactNode} [rightSection] - Section displayed on the right side of badge
 * @property {React.ReactNode} [children] - Badge content (text or other components)
 * @property {any} [style] - Additional styles to apply to the badge
 */
export interface BadgeProps extends DefaultProps, WithTextWrapperProps {
  /** Badge color from theme */
  color?: MantineColor;

  /** Controls badge appearance */
  variant?: Variants<'filled' | 'light' | 'outline' | 'dot'>;

  /** Badge size */
  size?: MantineSize;

  /** Key of theme.radius or any valid value to set border-radius */
  radius?: MantineNumberSize;

  /** Sets badge width to 100% of parent element */
  fullWidth?: boolean;

  /** Section displayed on the left side of badge */
  leftSection?: React.ReactNode;

  /** Section displayed on the right side of badge */
  rightSection?: React.ReactNode;

  /** Badge content */
  children?: React.ReactNode;

  /** Additional styles */
  style?: any;
}

const sizes = {
  xs: { fontSize: rem(9), height: rem(16), paddingHorizontal: rem(6) },
  sm: { fontSize: rem(10), height: rem(18), paddingHorizontal: rem(8) },
  md: { fontSize: rem(11), height: rem(20), paddingHorizontal: rem(10) },
  lg: { fontSize: rem(13), height: rem(26), paddingHorizontal: rem(12) },
  xl: { fontSize: rem(16), height: rem(32), paddingHorizontal: rem(16) },
};

const dotSizes = {
  xs: rem(4),
  sm: rem(4),
  md: rem(6),
  lg: rem(8),
  xl: rem(10),
};

const useStyles = createStyles(
  (
    theme,
    {
      color,
      radius,
      fullWidth,
    }: {
      color: MantineColor;
      radius: MantineNumberSize;
      fullWidth: boolean;
    },
    { variant, size }
  ) => {
    const sizeStyles = sizes[size as keyof typeof sizes] || sizes.md;

    const getVariantStyles = () => {
      switch (variant) {
        case 'filled': {
          const variantStyles = theme.fn.variant({ variant: 'filled', color });
          return {
            backgroundColor: variantStyles.background,
            color: variantStyles.color,
          };
        }
        case 'light': {
          const variantStyles = theme.fn.variant({ variant: 'light', color });
          return {
            backgroundColor: variantStyles.background,
            color: variantStyles.color,
          };
        }
        case 'outline': {
          const variantStyles = theme.fn.variant({ variant: 'outline', color });
          return {
            backgroundColor: variantStyles.background,
            color: variantStyles.color,
            borderWidth: 1,
            borderColor: variantStyles.border,
          };
        }
        case 'dot':
          return {
            backgroundColor: theme.colorScheme === 'dark'
              ? theme.fn.themeColor('dark', 5)
              : theme.white,
            color: theme.colorScheme === 'dark'
              ? theme.fn.themeColor('dark', 0)
              : theme.black,
            borderWidth: 1,
            borderColor: theme.colorScheme === 'dark'
              ? theme.fn.themeColor('dark', 4)
              : theme.fn.themeColor('gray', 3),
          };
        default: {
          const variantStyles = theme.fn.variant({ variant: 'filled', color });
          return {
            backgroundColor: variantStyles.background,
            color: variantStyles.color,
          };
        }
      }
    };

    return {
      root: {
        ...sizeStyles,
        ...getVariantStyles(),
        borderRadius: theme.fn.radius(radius),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: '700',
        textTransform: 'uppercase',
        overflow: 'hidden',
        ...(fullWidth && { width: '100%' }),
      } as any,
      inner: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      },
      leftSection: {
        marginRight: theme.spacing.xs / 2,
      },
      rightSection: {
        marginLeft: theme.spacing.xs / 2,
      },
      dot: {
        width: dotSizes[size as keyof typeof dotSizes] || dotSizes.md,
        height: dotSizes[size as keyof typeof dotSizes] || dotSizes.md,
        borderRadius: dotSizes[size as keyof typeof dotSizes] || dotSizes.md,
        backgroundColor: theme.fn.themeColor(color || theme.primaryColor),
        marginRight: theme.spacing.xs,
      },
      label: {
        fontSize: sizeStyles.fontSize,
        fontWeight: '700',
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
      },
    };
  }
);

const defaultProps: Partial<BadgeProps> = {
  color: 'blue',
  variant: 'light',
  size: 'md',
  radius: 'xl',
  fullWidth: false,
  withTextWrapper: true,
};

/**
 * Badge component displays a small label or indicator with customizable appearance
 *
 * @example
 * ```tsx
 * // Basic badge
 * <Badge>New</Badge>
 *
 * // Colored badge with variant
 * <Badge color="red" variant="filled">Error</Badge>
 *
 * // Badge with dot indicator
 * <Badge variant="dot">Active</Badge>
 *
 * // Badge with sections
 * <Badge leftSection={<Icon />} rightSection="99+">
 *   Notifications
 * </Badge>
 * ```
 */
const _Badge = forwardRef<any, BadgeProps>((props, ref) => {
  const {
    color,
    variant,
    size,
    radius,
    fullWidth,
    leftSection,
    rightSection,
    children,
    style,
    withTextWrapper: shouldWrapInText,
    ...others
  } = useComponentDefaultProps('Badge', defaultProps, props);

  const { styles, sx} = useStyles(
    {
      color: color ?? defaultProps.color ?? 'blue',
      radius: radius ?? defaultProps.radius ?? 'xl',
      fullWidth: fullWidth ?? defaultProps.fullWidth ?? false
    },
    {
      name: 'Badge',
      variant: variant ?? defaultProps.variant ?? 'light',
      size: size ?? defaultProps.size ?? 'md'
    }
  ) as any;

  // Get the text color from the variant styles
  // We need to cast to access the color property since TypeScript doesn't know the exact type
  const textColor = (styles.root as any).color as string;

  return (
    <BoxView ref={ref} style={sx(styles.root, style)} {...others}>
      <BoxView style={styles.inner}>
        {variant === 'dot' && <BoxView style={styles.dot} />}
        {leftSection && <BoxView style={styles.leftSection}>{leftSection}</BoxView>}
        {withTextWrapper(children, shouldWrapInText, { ...styles.label, color: textColor })}
        {rightSection && <BoxView style={styles.rightSection}>{rightSection}</BoxView>}
      </BoxView>
    </BoxView>
  );
});

export const Badge = React.memo(_Badge);
Badge.displayName = 'Badge';
