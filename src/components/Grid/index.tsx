import React, { forwardRef, Children } from 'react';
import { BoxView } from '../BoxView';
import type { DefaultProps, MantineNumberSize } from '../../theme/types';
import { useComponentDefaultProps } from '../../theme/theme-provider';
import { createStyles } from '../../theme';

export interface GridProps extends DefaultProps {
  /** Number of columns in the grid */
  columns?: number;

  /** Spacing between columns and rows */
  gutter?: MantineNumberSize;

  /** Grow columns to fit available space */
  grow?: boolean;

  /** Align items vertically */
  align?: 'stretch' | 'center' | 'flex-start' | 'flex-end';

  /** Justify items horizontally */
  justify?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around';

  /** Grid children */
  children?: React.ReactNode;

  /** Additional styles */
  style?: any;
}

export interface GridColProps extends DefaultProps {
  /** Column span */
  span?: number;

  /** Column offset */
  offset?: number;

  /** Column order */
  order?: number;

  /** Column children */
  children?: React.ReactNode;

  /** Additional styles */
  style?: any;
}

const useGridStyles = createStyles(
  (
    theme,
    {
      gutter,
      align,
      justify,
    }: {
      gutter: MantineNumberSize;
      align: 'stretch' | 'center' | 'flex-start' | 'flex-end';
      justify: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around';
    }
  ) => ({
    root: {
      flexDirection: 'row' as const,
      flexWrap: 'wrap' as const,
      alignItems: align,
      justifyContent: justify,
      margin: -theme.fn.size({ size: gutter, sizes: theme.spacing }) / 2,
    },
  })
);

const useColStyles = createStyles(
  (
    theme,
    {
      span,
      offset,
      order,
      columns,
      gutter,
      grow,
    }: {
      span: number;
      offset: number;
      order: number;
      columns: number;
      gutter: MantineNumberSize;
      grow: boolean;
    }
  ) => {
    const gutterSize = theme.fn.size({ size: gutter, sizes: theme.spacing });
    const colSpan = span || columns;
    const percentage = (colSpan / columns) * 100;
    const offsetPercentage = offset ? (offset / columns) * 100 : 0;

    return {
      col: {
        flexBasis: grow ? 0 : `${percentage}%`,
        flexGrow: grow ? colSpan : 0,
        flexShrink: 0,
        padding: gutterSize / 2,
        marginLeft: offsetPercentage ? `${offsetPercentage}%` : 0,
        ...(order && { order }),
      },
    };
  }
);

const defaultGridProps: Partial<GridProps> = {
  columns: 12,
  gutter: 'md',
  grow: false,
  align: 'stretch',
  justify: 'flex-start',
};

const defaultColProps: Partial<GridColProps> = {
  span: 12,
  offset: 0,
  order: 0,
};

export const Grid = Object.assign(
  forwardRef<any, GridProps>((props, ref) => {
    const { columns, gutter, grow, align, justify, children, style, ...others} =
      useComponentDefaultProps('Grid', defaultGridProps, props);

    const { styles, sx} = useGridStyles(
      { gutter, align, justify },
      { name: 'Grid' }
    ) as any;

    // Pass columns and gutter to children via context or clone
    const childrenWithProps = Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child as any, { columns, gutter, grow });
      }
      return child;
    });

    return (
      <BoxView ref={ref} style={sx(styles.root, style)} {...others}>
        {childrenWithProps}
      </BoxView>
    );
  }),
  {
    Col: forwardRef<any, GridColProps & { columns?: number; gutter?: MantineNumberSize; grow?: boolean }>(
      (props, ref) => {
        const { span, offset, order, columns = 12, gutter = 'md', grow = false, children, style, ...others} =
          useComponentDefaultProps('GridCol', defaultColProps, props);

        const { styles, sx} = useColStyles(
          { span, offset, order, columns, gutter, grow },
          { name: 'GridCol' }
        ) as any;

        return (
          <BoxView ref={ref} style={sx(styles.col, style)} {...others}>
            {children}
          </BoxView>
        );
      }
    ),
  }
);

Grid.displayName = 'Grid';
Grid.Col.displayName = 'Grid.Col';
