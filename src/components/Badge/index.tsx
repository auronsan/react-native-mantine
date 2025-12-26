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
  xs: { fontSize: rem(9), height: rem(16) as any, paddingHorizontal: rem(6) as any },
  sm: { fontSize: rem(10), height: rem(18) as any, paddingHorizontal: rem(8) as any },
  md: { fontSize: rem(11), height: rem(20) as any, paddingHorizontal: rem(10) as any },
  lg: { fontSize: rem(13), height: rem(26) as any, paddingHorizontal: rem(12) as any },
  xl: { fontSize: rem(16), height: rem(32) as any, paddingHorizontal: rem(16) as any },
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
    const colors = theme.colors[color] || theme.colors[theme.primaryColor];
    const sizeStyles = sizes[size as keyof typeof sizes] || sizes.md;

    const getVariantStyles = () => {
      switch (variant) {
        case 'filled':
          return {
            backgroundColor: colors?.[6] || colors?.[5] || theme.primaryBgColor,
            color: theme.white,
          };
        case 'light':
          return {
            backgroundColor: colors?.[0] || colors?.[1] || (theme.colors.gray || [])[0],
            color: colors?.[6] || colors?.[5] || theme.primaryBgColor,
          };
        case 'outline':
          return {
            backgroundColor: 'transparent',
            color: colors?.[6] || colors?.[5] || theme.primaryBgColor,
            borderWidth: 1,
            borderColor: colors?.[6] || colors?.[5] || theme.primaryBgColor,
          };
        case 'dot':
          return {
            backgroundColor: theme.colorScheme === 'dark' ? (theme.colors.dark || [])[5] : theme.white,
            color: theme.colorScheme === 'dark' ? (theme.colors.dark || [])[0] : theme.black,
            borderWidth: 1,
            borderColor: theme.colorScheme === 'dark' ? (theme.colors.dark || [])[4] : (theme.colors.gray || [])[3],
          };
        default:
          return {
            backgroundColor: colors?.[6] || theme.primaryBgColor,
            color: theme.white,
          };
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
        width: (dotSizes[size as keyof typeof dotSizes] || dotSizes.md) as any,
        height: (dotSizes[size as keyof typeof dotSizes] || dotSizes.md) as any,
        borderRadius: (dotSizes[size as keyof typeof dotSizes] || dotSizes.md) as any,
        backgroundColor: colors?.[6] || colors?.[5] || theme.primaryBgColor,
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

export const Badge = forwardRef<any, BadgeProps>((props, ref) => {
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
    { color, radius, fullWidth },
    { name: 'Badge', variant, size }
  ) as any;

  return (
    <BoxView ref={ref} style={sx(styles.root, style)} {...others}>
      <BoxView style={styles.inner}>
        {variant === 'dot' && <BoxView style={styles.dot} />}
        {leftSection && <BoxView style={styles.leftSection}>{leftSection}</BoxView>}
        {withTextWrapper(children, shouldWrapInText, styles.label)}
        {rightSection && <BoxView style={styles.rightSection}>{rightSection}</BoxView>}
      </BoxView>
    </BoxView>
  );
});

Badge.displayName = 'Badge';
