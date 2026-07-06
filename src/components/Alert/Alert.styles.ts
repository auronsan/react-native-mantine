import type { MantineColor, MantineNumberSize } from '../../theme/types';
import { createStyles } from '../../theme/create-styles';
import { rem } from '../../theme/utils/rem';

export interface AlertStylesParams {
  color: MantineColor;
  radius: MantineNumberSize;
  variant: 'filled' | 'outline' | 'light';
}

export const useStyles = createStyles(
  (theme, { color, radius, variant }: AlertStylesParams) => {
    const getVariantStyles = () => {
      if (variant === 'filled') {
        const colors = theme.fn.variant({ variant: 'filled', color });
        return {
          backgroundColor: colors.background,
          color: theme.white,
          borderWidth: 1,
          borderColor: 'transparent',
        };
      }

      if (variant === 'outline') {
        const colors = theme.fn.variant({ variant: 'outline', color });
        return {
          backgroundColor: theme.colorScheme === 'dark' ? theme.fn.themeColor('dark', 6) : theme.white,
          color: colors.color,
          borderWidth: 1,
          borderColor: colors.border,
        };
      }

      if (variant === 'light') {
        const colors = theme.fn.variant({ variant: 'light', color });
        return {
          backgroundColor: colors.background,
          color: colors.color,
          borderWidth: 1,
          borderColor: 'transparent',
        };
      }

      return {};
    };

    const variantStyles = getVariantStyles();
    const messageColor =
      variant === 'filled'
        ? theme.white
        : theme.colorScheme === 'dark'
        ? variant === 'light'
          ? theme.white
          : theme.fn.themeColor('dark', 0)
        : theme.black;

    return {
      root: {
        position: 'relative',
        overflow: 'hidden',
        paddingTop: theme.spacing.sm,
        paddingBottom: theme.spacing.sm,
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.sm,
        borderRadius: theme.fn.radius(radius),
        ...variantStyles,
      },
      wrapper: {
        flexDirection: 'row',
        alignItems: 'flex-start',
      },
      body: {
        flex: 1,
      },
      title: {
        marginBottom: theme.spacing.xs,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      label: {
        fontSize: theme.fontSizes.sm as number,
        fontWeight: '700',
        color: variantStyles.color,
        lineHeight: theme.fontSizes.sm * theme.lineHeight,
      },
      icon: {
        width: rem(20) as any,
        height: rem(20) as any,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginRight: theme.spacing.md,
        marginTop: rem(1) as any,
      },
      message: {
        flex: 1,
      },
      messageText: {
        fontSize: theme.fontSizes.sm as number,
        color: messageColor,
        lineHeight: theme.fontSizes.sm * theme.lineHeight,
      },
      closeButton: {
        width: rem(24) as any,
        height: rem(24) as any,
        borderRadius: rem(12) as any,
        backgroundColor:
          variant === 'filled'
            ? theme.fn.rgba(theme.black, 0.1)
            : theme.colorScheme === 'dark'
            ? theme.fn.themeColor('dark', 5)
            : theme.fn.themeColor('gray', 1),
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: theme.spacing.sm,
      },
      closeButtonText: {
        fontSize: rem(16) as any,
        color:
          variant === 'filled'
            ? theme.white
            : theme.colorScheme === 'dark'
            ? theme.white
            : theme.black,
      },
    };
  }
);
