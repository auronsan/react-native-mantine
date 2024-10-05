import {
  createStyles,
  getSize,
} from 'react-native-mantine';

import type {
  MantineNumberSize,
  MantineColor,
} from 'react-native-mantine'

export const ACTION_ICON_VARIANTS = [
  'subtle',
  'filled',
  'outline',
  'light',
  'default',
  'transparent',
  'gradient',
];

export interface ActionIconStylesParams {
  color: MantineColor;
  radius: MantineNumberSize;
}

export const sizes = {
  xs: 18,
  sm: 22,
  md: 28,
  lg: 34,
  xl: 44,
};

interface GetVariantStyles {
  variant: string;
  theme: any;
  color: MantineColor;
}

function getVariantStyles({ variant, theme, color }: GetVariantStyles): any {
  const colors = theme.fn.variant({ color, variant });

  if (ACTION_ICON_VARIANTS.includes(variant)) {
    return {
      border: `1px solid ${colors.border}`,
      backgroundColor: colors.background,
      color: colors.color,
      ...theme.fn.hover({
        backgroundColor: colors.hover,
      }),
    };
  }

  return null;
}

export default createStyles(
  (theme, { radius, color, variant, size }: any) => ({
    root: {
      position: 'relative',
      borderRadius: theme.fn.radius(radius),
      padding: 0,
      lineHeight: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: getSize({ size, sizes }),
      minHeight: getSize({ size, sizes }),
      width: getSize({ size, sizes }),
      minWidth: getSize({ size, sizes }),
      ...getVariantStyles({ variant, theme, color }),

      '&:active': theme.activeStyles,

      '& [data-action-icon-loader]': {
        maxWidth: '70%',
      },

      '&:disabled, &[data-disabled]': {
        color: theme.colors.gray ? theme.colors.gray[theme.colorScheme === 'dark' ? 6 : 4] : 'gray',
        cursor: 'not-allowed',
        backgroundColor:
          variant === 'transparent'
            ? undefined
            : theme.fn.themeColor('gray', theme.colorScheme === 'dark' ? 8 : 1),
        borderColor:
          variant === 'transparent'
            ? undefined
            : theme.fn.themeColor('gray', theme.colorScheme === 'dark' ? 8 : 1),
        backgroundImage: 'none',
        pointerEvents: 'none',

        '&:active': {
          transform: 'none',
        },
      },

      '&[data-loading]': {
        pointerEvents: 'none',

        '&::before': {
          content: '""',
          // ...theme.fn.cover(rem(-1)),
          backgroundColor: 'rgba(255, 255, 255, .5)',
            // theme.colorScheme === 'dark'
            //   ? theme.fn.rgba(theme.colors.dark[7], 0.5)
            //   :
          borderRadius: theme.fn.radius(radius),
          cursor: 'not-allowed',
        },
      },
    },
  })
);
