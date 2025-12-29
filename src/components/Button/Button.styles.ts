import { createStyles, getSize } from '../../theme';
import type { MantineColor, MantineNumberSize } from '../../theme/types';
import { rem } from '../../theme/utils/rem';
import { INPUT_SIZES } from '../Input';

export const BUTTON_VARIANTS = [
  'filled',
  'outline',
  'light',
  'white',
  'default',
  'subtle',
  'gradient',
];

export interface ButtonStylesParams {
  color: MantineColor;
  radius: MantineNumberSize;
  fullWidth: boolean;
  compact: boolean;
  withRightIcon: boolean;
  withLeftIcon: boolean;
  gradient?: { from: string; to: string; deg?: number };
}

export const sizes = {
  'xs': { height: INPUT_SIZES.xs, paddingLeft: rem(14), paddingRight: rem(14) },
  'sm': { height: INPUT_SIZES.sm, paddingLeft: rem(18), paddingRight: rem(18) },
  'md': { height: INPUT_SIZES.md, paddingLeft: rem(22), paddingRight: rem(22) },
  'lg': { height: INPUT_SIZES.lg, paddingLeft: rem(26), paddingRight: rem(26) },
  'xl': { height: INPUT_SIZES.xl, paddingLeft: rem(32), paddingRight: rem(32) },
  'compact-xs': { height: rem(22), paddingLeft: rem(7), paddingRight: rem(7) },
  'compact-sm': { height: rem(26), paddingLeft: rem(8), paddingRight: rem(8) },
  'compact-md': {
    height: rem(30),
    paddingLeft: rem(10),
    paddingRight: rem(10),
  },
  'compact-lg': {
    height: rem(34),
    paddingLeft: rem(12),
    paddingRight: rem(12),
  },
  'compact-xl': {
    height: rem(40),
    paddingLeft: rem(14),
    paddingRight: rem(14),
  },
} as any;

interface GetSizeStyles {
  compact: boolean;
  size: string | number;
  withLeftIcon: boolean;
  withRightIcon: boolean;
}

function getSizeStyles({
  size,
  withLeftIcon,
  withRightIcon,
}: GetSizeStyles): any {
  const _sizes: (typeof sizes)[keyof typeof sizes] = sizes[size];

  if (!_sizes) {
    return {};
  }

  return {
    ..._sizes,
    paddingLeft: withLeftIcon
      ? `calc(${_sizes.paddingLeft}  / 1.5)`
      : _sizes.paddingLeft,
    paddingRight: withRightIcon
      ? `calc(${_sizes.paddingRight}  / 1.5)`
      : _sizes.paddingRight,
  };
}

const getWidthStyles = (fullWidth: boolean) => ({
  display: fullWidth ? 'block' : 'inline-block',
  width: fullWidth ? '100%' : 'auto',
});

interface GetVariantStylesInput {
  variant: string;
  color: MantineColor;
  theme: any;
  gradient?: any;
}

function getVariantStyles({
  variant,
  theme,
  color,
  gradient,
}: GetVariantStylesInput) {
  if (!BUTTON_VARIANTS.includes(variant)) {
    return {};
  }

  const colors = theme.fn.variant({ color, variant, gradient });

  return {
    backgroundColor: colors.background,
    color: colors.color,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.border,
  };
}

const useStyles = createStyles(
  (
    theme,
    {
      radius,
      fullWidth,
      compact,
      withLeftIcon,
      withRightIcon,
      color,
      gradient,
    }: ButtonStylesParams,
    { variant, size }
  ) => {
    return {
      root: {
        ...getSizeStyles({ compact, size, withLeftIcon, withRightIcon }),
        ...theme.fn.fontStyles(),
        ...theme.fn.focusStyles(),
        ...getWidthStyles(fullWidth),
        ...getVariantStyles({ variant, theme, color, gradient }),
        'borderRadius': theme.fn.radius(radius),
        'fontWeight': 600,
        'position': 'relative',
        'lineHeight': 1,
        'fontSize': getSize({ size, sizes: theme.fontSizes }),
        'userSelect': 'none',
        'cursor': 'pointer',
        'overflow': 'hidden',

        '&:active': theme.activeStyles,

        '&:disabled, &[data-disabled]': {
          'borderColor': 'transparent',
          'backgroundColor': theme.colors.gray?.[2] || '#e9ecef',
          'color': theme.colors.gray?.[5] || '#adb5bd',
          'cursor': 'not-allowed',
          'backgroundImage': 'none',
          'pointerEvents': 'none',

          '&:active': {
            transform: 'none',
          },
        },

        '&[data-loading]': {
          'pointerEvents': 'none',

          '&::before': {
            content: '""',
            ...theme.fn.cover(rem(-1)),
            backgroundColor: 'rgba(255, 255, 255, .5)',
            borderRadius: theme.fn.radius(radius),
            cursor: 'not-allowed',
          },
        },
      },

      icon: {
        display: 'flex',
        alignItems: 'center',
      },

      leftIcon: {
        marginRight: theme.spacing.xs,
      },

      rightIcon: {
        marginLeft: theme.spacing.xs,
      },

      centerLoader: {
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        opacity: 0.5,
      },

      inner: {
        display: 'flex',
        height: '100%',
        flex: 1,
      },

      label: {
        whiteSpace: 'nowrap',
        height: '100%',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        flex: 1,
      },
    };
  }
);
export default useStyles;
