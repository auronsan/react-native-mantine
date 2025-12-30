import React, { forwardRef, useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { BoxView } from '../BoxView';
import type { DefaultProps, MantineNumberSize } from '../../theme/types';
import { useComponentDefaultProps } from '../../theme/theme-provider';
import { createStyles } from '../../theme';

export interface SimpleGridProps extends DefaultProps {
  /** Number of columns */
  cols?: number;

  /** Spacing between columns and rows */
  spacing?: MantineNumberSize;

  /** Spacing between rows, defaults to spacing value */
  verticalSpacing?: MantineNumberSize;

  /** Breakpoints for responsive columns */
  breakpoints?: Array<{ maxWidth: number; cols: number; spacing?: MantineNumberSize }>;

  /** Children to render in grid */
  children?: React.ReactNode;

  /** Additional styles */
  style?: any;
}

const useStyles = createStyles(
  (
    theme,
    {
      cols,
      spacing,
      verticalSpacing,
    }: {
      cols: number;
      spacing: MantineNumberSize;
      verticalSpacing: MantineNumberSize;
    }
  ) => {
    const horizontalSpacingValue = theme.fn.size({ size: spacing, sizes: theme.spacing });
    const horizontalSpacing = typeof horizontalSpacingValue === 'number' ? horizontalSpacingValue : parseFloat(horizontalSpacingValue) || 0;

    const rowSpacingValue = theme.fn.size({
      size: verticalSpacing || spacing,
      sizes: theme.spacing,
    });
    const rowSpacing = typeof rowSpacingValue === 'number' ? rowSpacingValue : parseFloat(rowSpacingValue) || 0;

    return {
      root: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin: -horizontalSpacing / 2,
      },
      child: {
        flexBasis: `${100 / cols}%`,
        flexGrow: 0,
        flexShrink: 0,
        paddingHorizontal: horizontalSpacing / 2,
        paddingVertical: rowSpacing / 2,
      },
    };
  }
);

const defaultProps: Partial<SimpleGridProps> = {
  cols: 1,
  spacing: 'md',
};

export const SimpleGrid = forwardRef<any, SimpleGridProps>((props, ref) => {
  const { cols, spacing, verticalSpacing, breakpoints, children, style} =
    useComponentDefaultProps('SimpleGrid', defaultProps, props);

  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [activeCols, setActiveCols] = useState(cols);
  const [activeSpacing, setActiveSpacing] = useState(spacing);

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });

    return () => subscription?.remove();
  }, []);

  useEffect(() => {
    if (breakpoints && breakpoints.length > 0) {
      const width = dimensions.width;
      const sorted = [...breakpoints].sort((a, b) => b.maxWidth - a.maxWidth);
      const breakpoint = sorted.find((bp) => width <= bp.maxWidth);

      if (breakpoint) {
        setActiveCols(breakpoint.cols);
        setActiveSpacing(breakpoint.spacing || spacing);
      } else {
        setActiveCols(cols);
        setActiveSpacing(spacing);
      }
    }
  }, [dimensions, breakpoints, cols, spacing]);

  const { styles, sx } = useStyles(
    { cols: activeCols, spacing: activeSpacing, verticalSpacing },
    { name: 'SimpleGrid' }
  ) as any;

  const childArray = React.Children.toArray(children);

  return (
    <BoxView ref={ref} style={sx(styles.root, style)}>
      {childArray.map((child, index) => (
        <BoxView key={index} style={styles.child}>
          {child}
        </BoxView>
      ))}
    </BoxView>
  );
});

SimpleGrid.displayName = 'SimpleGrid';
