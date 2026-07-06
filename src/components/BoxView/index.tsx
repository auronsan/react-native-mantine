import { forwardRef } from 'react';
import { View as DefaultView } from 'react-native';

export type CustomViewStyle = {
  pointerEvents?: 'auto' | 'none' | 'box-none' | 'box-only';
};

// Spacing value mapping
const spacingMap: Record<string, number> = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
};

const getSpacingValue = (value: string | number | undefined): number | undefined => {
  if (value === undefined) return undefined;
  if (typeof value === 'number') return value;
  return spacingMap[value] || 0;
};

export type ViewProps = DefaultView['props'] & {
  fullWidth?: boolean;
  fullHeight?: boolean;
  children?: React.ReactNode;
  style?: CustomViewStyle;
  p?: string | number; // padding
  px?: string | number; // padding horizontal
  py?: string | number; // padding vertical
  pt?: string | number; // padding top
  pb?: string | number; // padding bottom
  pl?: string | number; // padding left
  pr?: string | number; // padding right
  m?: string | number; // margin
  mx?: string | number; // margin horizontal
  my?: string | number; // margin vertical
  mt?: string | number; // margin top
  mb?: string | number; // margin bottom
  ml?: string | number; // margin left
  mr?: string | number; // margin right
};

export const BoxView = forwardRef<DefaultView, ViewProps>((props, ref) => {
  const {
    style,
    fullWidth,
    fullHeight,
    p,
    px,
    py,
    pt,
    pb,
    pl,
    pr,
    m,
    mx,
    my,
    mt,
    mb,
    ml,
    mr,
    ...otherProps
  } = props;

  const spacingStyle: any = {};

  // Padding
  if (p !== undefined) {
    const value = getSpacingValue(p);
    spacingStyle.padding = value;
  }
  if (px !== undefined) {
    const value = getSpacingValue(px);
    spacingStyle.paddingHorizontal = value;
  }
  if (py !== undefined) {
    const value = getSpacingValue(py);
    spacingStyle.paddingVertical = value;
  }
  if (pt !== undefined) spacingStyle.paddingTop = getSpacingValue(pt);
  if (pb !== undefined) spacingStyle.paddingBottom = getSpacingValue(pb);
  if (pl !== undefined) spacingStyle.paddingLeft = getSpacingValue(pl);
  if (pr !== undefined) spacingStyle.paddingRight = getSpacingValue(pr);

  // Margin
  if (m !== undefined) {
    const value = getSpacingValue(m);
    spacingStyle.margin = value;
  }
  if (mx !== undefined) {
    const value = getSpacingValue(mx);
    spacingStyle.marginHorizontal = value;
  }
  if (my !== undefined) {
    const value = getSpacingValue(my);
    spacingStyle.marginVertical = value;
  }
  if (mt !== undefined) spacingStyle.marginTop = getSpacingValue(mt);
  if (mb !== undefined) spacingStyle.marginBottom = getSpacingValue(mb);
  if (ml !== undefined) spacingStyle.marginLeft = getSpacingValue(ml);
  if (mr !== undefined) spacingStyle.marginRight = getSpacingValue(mr);

  return (
    <DefaultView
      style={[
        {
          ...(fullWidth ? { width: '100%' } : {}),
          ...(fullHeight ? { height: '100%' } : {}),
        },
        spacingStyle,
        style,
      ]}
      ref={ref}
      {...otherProps}
    />
  );
});

BoxView.displayName = 'BoxView';
