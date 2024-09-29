import { useTheme } from 'react-native-mantine';
import type { Palette } from 'react-native-mantine';
import { get } from 'lodash-es';
import { forwardRef } from 'react';
import { Text as DefaultText } from 'react-native';

export type TextProps = DefaultText['props'] & {
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
    primaryShade,
    fontSizes,
    light,
  } = useTheme();

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
          color: white
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
