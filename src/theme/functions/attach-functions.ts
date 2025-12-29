import { fns } from './fns';

export function attachFunctions(themeBase: any): any {
  return {
    ...themeBase,
    fn: {
      radius: fns.radius(themeBase),
      rgba: fns.rgba(themeBase),
      size: fns.size(themeBase),
      variant: fns.variant(themeBase),
      themeColor: (color: string, shade?: number) =>
        fns.themeColor({ theme: themeBase, color, shade }),
      shadow: fns.shadow,
      gradient: fns.gradient(themeBase),
      fontStyles: fns.fontStyles(themeBase),
      inputFontStyles: fns.inputFontStyles(themeBase),
      focusStyles: fns.focusStyles(themeBase),
      placeholderStyles: fns.placeholderStyles(themeBase),
      cover: fns.cover(themeBase),
      hover: fns.hover(themeBase),
      lighten: fns.lighten,
      darken: fns.darken,
      dimmed: fns.dimmed(themeBase),
      largerThan: fns.largerThan(themeBase),
      smallerThan: fns.smallerThan(themeBase),
    },
    activeStyles: fns.activeStyles(themeBase),
  };
}
