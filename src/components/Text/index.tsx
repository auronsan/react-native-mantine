import { useTheme } from '../../theme/theme-provider';
import { getPrimaryShade } from '../../theme/functions/fns/primary-shade';
import { get } from 'lodash-es';
import { forwardRef } from 'react';
import { Text as DefaultText } from 'react-native';
import type { MantineTheme } from '../../theme/default-theme';

export type TextProps = DefaultText['props'] & {
  size?: string;
  bold?: boolean;
  questrial?: boolean;
  semiBold?: boolean;
  fontSize?: number;
  color?: string;
  white?: boolean;
  weight?: '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
  align?: 'left' | 'center' | 'right' | 'justify';
};

const propToColor = (
  color: string,
  theme: MantineTheme
): string => {
  const primaryShade = getPrimaryShade(theme);
  const colorExistOnPalette = get(
    theme.colors,
    `${color}.${primaryShade}`,
    ''
  ) as string;
  if (colorExistOnPalette) {
    return colorExistOnPalette;
  }
  return color;
};

export const Text = forwardRef((props: TextProps, ref: any) => {
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
    ...otherProps
  } = props;

  const theme = useTheme();
  const {
    fontFamily,
    fontFamilyBold,
    fontFamilySemiBold,
    fontWeights,
    fontSizes,
    light,
  } = theme;

  // Determine font family based on weight/style
  // On iOS/Android, some fonts need explicit family names for different weights
  const getFontFamily = () => {
    if (questrial) return 'Questrial';
    if (bold) return fontFamilyBold;
    if (semiBold) return fontFamilySemiBold;
    return fontFamily;
  };

  // Still use fontWeight for platforms that support it well (like iOS with System font)
  const getFontWeight = () => {
    if (weight) return weight;
    if (semiBold) return fontWeights.semibold;
    if (bold) return fontWeights.bold;
    return fontWeights.normal;
  };

  return (
    <DefaultText
      ref={ref}
      style={[
        {
          fontFamily: getFontFamily(),
          fontWeight: getFontWeight() as any,
          fontSize: fontSize ? fontSize : get(fontSizes, size, 16),
          color: white
            ? 'white'
            : color
              ? propToColor(color, theme)
              : light.text,
          ...(align ? { textAlign: align } : {}),
        },
        style,
      ]}
      {...otherProps}
    />
  );
});
