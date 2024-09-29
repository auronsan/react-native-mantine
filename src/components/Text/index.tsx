import { useTheme } from '@/theme';
import type { Palette } from '@/theme/theme';
import { get } from 'lodash-es';
import { forwardRef } from 'react';
import { Text as DefaultText } from 'react-native';

export type TextProps = DefaultText['props'] & {
  tenancy?: boolean;
  size?: string;
  bold?: boolean;
  questrial?: boolean;
  semiBold?: boolean;
  fontSize?: number;
  color?: string;
  white?: boolean;
};

const propToColor = (
  color: string,
  colors: { [key: string]: Palette },
  primaryShade: number
): string => {
  const colorExistOnPalette = get(
    colors,
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
    tenancy,
    color,
    white,
    size = 'md',
    bold = false,
    questrial = false,
    semiBold = false,
    fontSize,
    ...otherProps
  } = props;

  const {
    fontFamily,
    fontFamilyBold,
    fontFamilySemiBold,
    colors,
    primaryBgColor,
    primaryShade,
    fontSizes,
    currentMode,
    light,
  } = useTheme();

  const tenancyColor = currentMode === 'dark' ? '#fff' : primaryBgColor;

  return (
    <DefaultText
      ref={ref}
      style={[
        {
          fontFamily: semiBold
            ? fontFamilySemiBold
            : bold
              ? fontFamilyBold
              : questrial
                ? 'Questrial'
                : fontFamily,
          fontWeight: bold ? '900' : '300',
          fontSize: fontSize ? fontSize : get(fontSizes, size, 16),
          color: tenancy
            ? tenancyColor
            : white
              ? 'white'
              : color
                ? propToColor(color, colors, primaryShade)
                : light.text,
        },
        style,
      ]}
      {...otherProps}
    />
  );
});
