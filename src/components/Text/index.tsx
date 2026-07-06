import { useTheme } from '../../theme/theme-provider';
import { getPrimaryShade } from '../../theme/functions/fns/primary-shade';
import { forwardRef } from 'react';
import { Text as DefaultText, type TextStyle } from 'react-native';
import type { MantineTheme, MantineSize, MantineNumberSize } from "../../theme/types";

export type TextProps = DefaultText['props'] & {
  /** Text size - key of theme.fontSizes or number */
  size?: MantineSize | number;

  /** Bold text - applies bold font weight */
  bold?: boolean;

  /** Questrial font family */
  questrial?: boolean;

  /** Semi-bold text - applies semibold font weight */
  semiBold?: boolean;

  /** Font size override (deprecated - use size instead) */
  fontSize?: number;

  /** Color - key of theme.colors or CSS color value */
  color?: string;

  /** White text shortcut */
  white?: boolean;

  /** Font weight */
  weight?: TextStyle['fontWeight'];

  /** Text alignment */
  align?: 'left' | 'center' | 'right' | 'justify' | 'auto';

  /** Line height - key of theme.lineHeights or number (unitless multiplier) */
  lineHeight?: MantineNumberSize;

  /** Inherit font properties from parent */
  inherit?: boolean;

  /** Italic text */
  italic?: boolean;

  /** Underline text */
  underline?: boolean;

  /** Strikethrough text */
  strikethrough?: boolean;

  /** Transform text */
  transform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase';

  /** Monospace font */
  monospace?: boolean;
};

const propToColor = (
  color: string,
  theme: MantineTheme
): string => {
  const primaryShade = getPrimaryShade(theme);
  const colorExistOnPalette = theme.colors[color]?.[primaryShade] ?? '';
  if (colorExistOnPalette) {
    return colorExistOnPalette;
  }
  return color;
};

export const Text = forwardRef<DefaultText, TextProps>((props, ref) => {
  const {
    style,
    color,
    white,
    size = 'md',
    bold = false,
    questrial = false,
    semiBold = false,
    fontSize,
    weight,
    align,
    lineHeight,
    inherit = false,
    italic = false,
    underline = false,
    strikethrough = false,
    transform,
    monospace = false,
    ...otherProps
  } = props;

  const theme = useTheme();

  // If inherit is true, don't apply any default styles
  if (inherit) {
    return (
      <DefaultText
        ref={ref}
        style={style}
        {...otherProps}
      />
    );
  }

  // Determine font family based on weight/style
  // On iOS/Android, some fonts need explicit family names for different weights
  const getFontFamily = (): string => {
    if (questrial) return 'Questrial';
    if (monospace) return theme.fontFamilyMonospace;
    if (bold) return theme.fontFamilyBold;
    if (semiBold) return theme.fontFamilySemiBold;
    return theme.fontFamily;
  };

  // Still use fontWeight for platforms that support it well (like iOS with System font)
  const getFontWeight = (): TextStyle['fontWeight'] => {
    if (weight) return weight;
    if (semiBold) return theme.fontWeights.semibold;
    if (bold) return theme.fontWeights.bold;
    return theme.fontWeights.normal;
  };

  // Get font size from theme or use provided value
  const getComputedFontSize = (): number => {
    // fontSize prop takes priority (for backward compatibility)
    if (fontSize) return fontSize;

    // Use theme.fn.fontSize for proper size resolution
    return theme.fn.fontSize(size as MantineNumberSize);
  };

  // Get line height from theme or use provided value
  const getComputedLineHeight = (): number | undefined => {
    if (lineHeight !== undefined) {
      const lh = theme.fn.lineHeight(lineHeight);
      const fs = getComputedFontSize();
      // Return absolute line height (fontSize * lineHeight multiplier)
      return fs * lh;
    }
    // Return default line height
    const fs = getComputedFontSize();
    return fs * theme.lineHeight;
  };

  // Determine color with priority:
  // 1. white prop (explicit override)
  // 2. color prop (explicit override)
  // 3. style color (from parent component)
  // 4. default color (from theme)
  //
  // Strategy: When color/white props are provided, apply them AFTER style to override.
  // When not provided, set default BEFORE style so style can override.
  const defaultColor = theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[9];

  const hasExplicitColorProp = white || color;
  const explicitColor = white ? 'white' : color ? propToColor(color, theme) : undefined;

  // Build text decoration styles
  const textDecorationLine: TextStyle['textDecorationLine'] =
    underline && strikethrough
      ? 'underline line-through'
      : underline
        ? 'underline'
        : strikethrough
          ? 'line-through'
          : 'none';

  return (
    <DefaultText
      ref={ref}
      style={[
        {
          fontFamily: getFontFamily(),
          fontWeight: getFontWeight(),
          fontSize: getComputedFontSize(),
          lineHeight: getComputedLineHeight(),
          // Set default color first (will be overridden by style if style has color)
          color: defaultColor,
          ...(align ? { textAlign: align } : {}),
          ...(italic ? { fontStyle: 'italic' as const } : {}),
          ...(textDecorationLine !== 'none' ? { textDecorationLine } : {}),
          ...(transform ? { textTransform: transform } : {}),
        },
        style,
        // If explicit color prop provided, apply it last to override everything
        ...(hasExplicitColorProp ? [{ color: explicitColor }] : []),
      ]}
      {...otherProps}
    />
  );
});

Text.displayName = 'Text';
