import {
  createStyles,
  getSize,
} from '../../theme';

import type {
  MantineNumberSize,
  MantineColor,
} from '../../theme/types'

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
    };
  }

  return null;
}

export default createStyles(
  (theme, { radius, color, variant, size }: any) => ({
    icon: {
      backgroundColor:
        theme.currentMode === 'dark'
          ? theme.primaryBgColor
          : theme.secondaryBgColor,
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
      height: getSize({ size, sizes }),
      minHeight: getSize({ size, sizes }),
      width: getSize({ size, sizes }),
      minWidth: getSize({ size, sizes }),
    },
    root: {
      position: 'relative',
      borderRadius: theme.fn.radius(radius),
      padding: 0,
      lineHeight: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      ...getVariantStyles({ variant, theme, color }),
    },
  })
);
