import React, { forwardRef } from 'react';
import { BoxView } from '../BoxView';
import type { ViewProps } from '../BoxView';
import type { DefaultProps, MantineNumberSize } from '../../theme/types';
import { useTheme } from '../../theme/theme-provider';
import type { FlexStyle } from 'react-native';

export interface FlexProps extends DefaultProps, Omit<ViewProps, 'style'> {
  /** Set flex-direction property */
  direction?: FlexStyle['flexDirection'];

  /** Set flex-wrap property */
  wrap?: FlexStyle['flexWrap'];

  /** Set align-items property */
  align?: FlexStyle['alignItems'];

  /** Set justify-content property */
  justify?: FlexStyle['justifyContent'];

  /** Gap between flex items from theme or number */
  gap?: MantineNumberSize | number;

  /** Column gap from theme or number */
  columnGap?: MantineNumberSize | number;

  /** Row gap from theme or number */
  rowGap?: MantineNumberSize | number;

  /** Flex children */
  children?: React.ReactNode;
}

/**
 * Flex component provides flexible box layout
 */
export const Flex = forwardRef<any, FlexProps>((props, ref) => {
  const {
    children,
    style,
    direction = 'row',
    wrap = 'nowrap',
    align,
    justify,
    gap,
    columnGap,
    rowGap,
    ...others
  } = props;

  const theme = useTheme();

  // Get spacing value from theme or use number directly
  const getSpacing = (value: MantineNumberSize | number | undefined) => {
    if (value === undefined) return undefined;
    if (typeof value === 'number') return value;
    return theme.spacing[value as keyof typeof theme.spacing] || 0;
  };

  const gapValue = getSpacing(gap);
  const columnGapValue = getSpacing(columnGap);
  const rowGapValue = getSpacing(rowGap);

  return (
    <BoxView
      ref={ref}
      style={[
        {
          display: 'flex',
          flexDirection: direction,
          flexWrap: wrap,
          alignItems: align,
          justifyContent: justify,
          ...(gapValue !== undefined && { gap: gapValue }),
          ...(columnGapValue !== undefined && { columnGap: columnGapValue }),
          ...(rowGapValue !== undefined && { rowGap: rowGapValue }),
        },
        style,
      ]}
      {...others}
    >
      {children}
    </BoxView>
  );
});

Flex.displayName = 'Flex';
