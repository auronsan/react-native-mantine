import type { MantineTheme } from '../../default-theme';
import type { MantineColor } from '../../types';
import { themeColor } from './theme-color/theme-color';
import { getPrimaryShade } from './primary-shade';

export interface VariantInput {
  variant:
    | 'filled'
    | 'outline'
    | 'light'
    | 'white'
    | 'default'
    | 'subtle'
    | 'gradient';
  color?: MantineColor;
  gradient?: { from: string; to: string; deg?: number };
  primaryFallback?: boolean;
}

export interface VariantOutput {
  background: string;
  color: string;
  border: string;
  hover?: string;
}

export const variant = (theme: MantineTheme) => (input: VariantInput): VariantOutput => {
  const {
    variant,
    color = theme.primaryColor,
  } = input;

  const primaryShade = getPrimaryShade(theme);
  const getColor = (c: string, shade: number) => themeColor({ theme, color: c, shade });

  switch (variant) {
    case 'filled': {
      const filledColor = getColor(color, primaryShade);
      return {
        background: filledColor,
        color: '#fff',
        border: filledColor,
        hover: getColor(color, primaryShade > 0 ? primaryShade + 1 : primaryShade),
      };
    }

    case 'light': {
      return {
        background: getColor(color, 0),
        color: getColor(color, primaryShade > 6 ? primaryShade : 7),
        border: 'transparent',
        hover: getColor(color, 1),
      };
    }

    case 'outline': {
      const outlineColor = getColor(color, primaryShade);
      return {
        background: 'transparent',
        color: outlineColor,
        border: outlineColor,
        hover: getColor(color, 0),
      };
    }

    case 'subtle': {
      return {
        background: 'transparent',
        color: getColor(color, primaryShade),
        border: 'transparent',
        hover: getColor(color, 0),
      };
    }

    case 'white': {
      return {
        background: '#fff',
        color: getColor(color, primaryShade),
        border: '#fff',
        hover: '#f8f9fa',
      };
    }

    case 'default': {
      return {
        background: theme.light.background,
        color: theme.light.text,
        border: theme.colors.gray?.[4] || '#ced4da',
        hover: theme.colors.gray?.[0] || '#f8f9fa',
      };
    }

    case 'gradient': {
      // For gradient variant, return transparent background
      // The actual gradient rendering is handled by LinearGradient component
      // We just need to provide the text color and border
      return {
        background: 'transparent',
        color: '#fff',
        border: 'transparent',
      };
    }

    default: {
      return {
        background: getColor(color, primaryShade),
        color: '#fff',
        border: getColor(color, primaryShade),
      };
    }
  }
}
