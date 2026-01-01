import React, { forwardRef, createContext, useContext, useState, useCallback } from 'react';
import { ScrollView } from 'react-native';
import type { LayoutChangeEvent, DimensionValue } from 'react-native';
import { BoxView } from '../BoxView';
import { Text } from '../Text';
import type { DefaultProps, SpacingValue } from '../../theme/types';
import { useComponentDefaultProps } from '../../theme/theme-provider';
import { createStyles } from '../../theme';
import { rem } from '../../theme/utils/rem';
import { withTextWrapper, type WithTextWrapperProps } from '../../theme/utils/withTextWrapper';

interface TableContextValue {
  striped: boolean;
  highlightOnHover: boolean;
  withBorder: boolean;
  withColumnBorders: boolean;
  fontSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  verticalSpacing: SpacingValue;
  horizontalSpacing: SpacingValue;
  columnWidths: number[];
  onCellLayout: (columnIndex: number, width: number) => void;
}

const TableContext = createContext<TableContextValue | null>(null);

const useTableContext = () => {
  const context = useContext(TableContext);
  return context;
};

export interface TableProps extends DefaultProps {
  /** Table children (Thead, Tbody, Tfoot) */
  children?: React.ReactNode;

  /** Horizontal scroll on overflow */
  horizontalSpacing?: SpacingValue;

  /** Vertical spacing between rows */
  verticalSpacing?: SpacingValue;

  /** Font size */
  fontSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  /** Add striped rows styling */
  striped?: boolean;

  /** Highlight row on hover */
  highlightOnHover?: boolean;

  /** Add border to table */
  withBorder?: boolean;

  /** Add borders between columns */
  withColumnBorders?: boolean;

  /** Caption position */
  captionSide?: 'top' | 'bottom';

  /** Table caption */
  caption?: React.ReactNode;

  /** Flex value for the table container (e.g., 1 to fill available space) */
  flex?: number;

  /** Flex grow value for the table container */
  flexGrow?: number;

  /** Flex shrink value for the table container */
  flexShrink?: number;

  /** Flex basis value for the table container */
  flexBasis?: DimensionValue;

  /** Additional styles */
  style?: any;
}

export interface TableTheadProps extends DefaultProps {
  /** Thead children */
  children?: React.ReactNode;

  /** Additional styles */
  style?: any;
}

export interface TableTbodyProps extends DefaultProps {
  /** Tbody children */
  children?: React.ReactNode;

  /** Additional styles */
  style?: any;
}

export interface TableTfootProps extends DefaultProps {
  /** Tfoot children */
  children?: React.ReactNode;

  /** Additional styles */
  style?: any;
}

export interface TableTrProps extends DefaultProps {
  /** Tr children */
  children?: React.ReactNode;

  /** Additional styles */
  style?: any;

  /** Internal row index */
  __index?: number;
}

export interface TableThProps extends DefaultProps, WithTextWrapperProps {
  /** Th children */
  children?: React.ReactNode;

  /** Additional styles */
  style?: any;

  /** Internal column index */
  __columnIndex?: number;
}

export interface TableTdProps extends DefaultProps, WithTextWrapperProps {
  /** Td children */
  children?: React.ReactNode;

  /** Additional styles */
  style?: any;

  /** Internal column index */
  __columnIndex?: number;
}

const fontSizes = {
  xs: rem(10),
  sm: rem(12),
  md: rem(14),
  lg: rem(16),
  xl: rem(18),
};

const useTableStyles = createStyles(
  (
    theme,
    {
      withBorder,
      captionSide,
      flex,
      flexGrow,
      flexShrink,
      flexBasis,
    }: {
      withBorder: boolean;
      captionSide: 'top' | 'bottom';
      flex?: number;
      flexGrow?: number;
      flexShrink?: number;
      flexBasis?: DimensionValue;
    }
  ) => ({
    wrapper: {
      // Apply flex properties to outer wrapper to allow table to expand in container
      ...(flex !== undefined && { flex }),
      ...(flexGrow !== undefined && { flexGrow }),
      ...(flexShrink !== undefined && { flexShrink }),
      ...(flexBasis !== undefined && { flexBasis }),
      // Ensure wrapper doesn't restrict vertical growth
      flexDirection: 'column' as any,
    } as any,
    root: {
      width: '100%',
      borderCollapse: 'collapse' as any,
      ...(withBorder && {
        borderWidth: 1,
        borderColor:
          theme.colorScheme === 'dark'
            ? theme.colors.dark?.[4]
            : theme.colors.gray?.[3],
      }),
    },
    caption: {
      fontSize: theme.fontSizes.sm as number,
      color:
        theme.colorScheme === 'dark'
          ? theme.colors.dark?.[2]
          : theme.colors.gray?.[6],
      paddingVertical: theme.spacing.xs,
      textAlign: 'center',
      ...(captionSide === 'bottom' && { order: 1 }),
    },
  })
);

const useTableHeadStyles = createStyles((theme) => ({
  thead: {
    borderBottomWidth: 1,
    borderBottomColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark?.[4]
        : theme.colors.gray?.[3],
  },
}));

const useTableRowStyles = createStyles(
  (
    theme,
    {
      striped,
      isEven,
    }: {
      striped: boolean;
      highlightOnHover: boolean;
      isEven: boolean;
    }
  ) => ({
    tr: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark?.[4]
          : theme.colors.gray?.[3],
      ...(striped &&
        isEven && {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark?.[6]
              : theme.colors.gray?.[0],
        }),
    },
  })
);

const useTableCellStyles = createStyles(
  (
    theme,
    {
      fontSize,
      verticalSpacing,
      horizontalSpacing,
      withColumnBorders,
      isHeader,
      width,
    }: {
      fontSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
      verticalSpacing: SpacingValue;
      horizontalSpacing: SpacingValue;
      withColumnBorders: boolean;
      isHeader: boolean;
      width?: number;
    }
  ) => {
    const getVerticalPadding = () => {
      if (typeof verticalSpacing === 'number') return rem(verticalSpacing);
      return theme.spacing[verticalSpacing] || theme.spacing.xs;
    };

    const getHorizontalPadding = () => {
      if (typeof horizontalSpacing === 'number') return rem(horizontalSpacing);
      return theme.spacing[horizontalSpacing] || theme.spacing.xs;
    };

    return {
      cell: {
        // Remove flex: 1 to prevent equal spacing
        // Use explicit width when available for column alignment
        ...(width && { width }),
        paddingVertical: getVerticalPadding() as any,
        paddingHorizontal: getHorizontalPadding() as any,
        fontSize: fontSizes[fontSize],
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        textAlign: 'left',
        ...(withColumnBorders && {
          borderRightWidth: 1,
          borderRightColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark?.[4]
              : theme.colors.gray?.[3],
        }),
        ...(isHeader && {
          fontWeight: '600',
        }),
      },
    };
  }
);

const defaultProps: Partial<TableProps> = {
  horizontalSpacing: 'xs',
  verticalSpacing: 'xs',
  fontSize: 'sm',
  striped: false,
  highlightOnHover: false,
  withBorder: false,
  withColumnBorders: false,
  captionSide: 'top',
};

const Table = forwardRef<any, TableProps>((props, ref) => {
  const {
    children,
    horizontalSpacing,
    verticalSpacing,
    fontSize,
    striped,
    highlightOnHover: _highlightOnHover,
    withBorder,
    withColumnBorders,
    captionSide,
    caption,
    flex,
    flexGrow,
    flexShrink,
    flexBasis,
    style,
    ...others
  } = useComponentDefaultProps('Table', defaultProps, props);

  const { styles, sx } = useTableStyles(
    { withBorder, captionSide, flex, flexGrow, flexShrink, flexBasis },
    { name: 'Table' }
  ) as any;

  // Track column widths to ensure alignment across rows
  const [columnWidths, setColumnWidths] = useState<number[]>([]);

  const onCellLayout = useCallback((columnIndex: number, width: number) => {
    setColumnWidths((prevWidths) => {
      const newWidths = [...prevWidths];
      // Store the maximum width for each column to ensure all cells in that column have the same width
      if (!newWidths[columnIndex] || width > newWidths[columnIndex]) {
        newWidths[columnIndex] = width;
      }
      return newWidths;
    });
  }, []);

  return (
    <TableContext.Provider
      value={{
        striped: striped!,
        highlightOnHover: _highlightOnHover!,
        withBorder: withBorder!,
        withColumnBorders: withColumnBorders!,
        fontSize: fontSize!,
        verticalSpacing: verticalSpacing!,
        horizontalSpacing: horizontalSpacing!,
        columnWidths,
        onCellLayout,
      }}
    >
      <BoxView style={styles.wrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <BoxView ref={ref} style={sx(styles.root, style)} {...others}>
            {caption && <Text style={styles.caption}>{caption}</Text>}
            {children}
          </BoxView>
        </ScrollView>
      </BoxView>
    </TableContext.Provider>
  );
});

const Thead = forwardRef<any, TableTheadProps>((props, ref) => {
  const { children, style, ...others } = props;
  const { styles, sx } = useTableHeadStyles({}, { name: 'Thead' }) as any;

  return (
    <BoxView ref={ref} style={sx(styles.thead, style)} {...others}>
      {children}
    </BoxView>
  );
});

const Tbody = forwardRef<any, TableTbodyProps>((props, ref) => {
  const { children, style, ...others } = props;

  const childrenArray = React.Children.toArray(children);

  return (
    <BoxView ref={ref} style={style} {...others}>
      {childrenArray.map((child, index) => {
        if (!React.isValidElement(child)) return child;
        return React.cloneElement<TableTrProps>(
          child as React.ReactElement<TableTrProps>,
          {
            key: index,
            __index: index,
          }
        );
      })}
    </BoxView>
  );
});

const Tfoot = forwardRef<any, TableTfootProps>((props, ref) => {
  const { children, style, ...others } = props;

  return (
    <BoxView ref={ref} style={style} {...others}>
      {children}
    </BoxView>
  );
});

const Tr = forwardRef<any, TableTrProps>((props, ref) => {
  const { children, style, __index, ...others } = props;
  const context = useTableContext();

  const { styles, sx } = useTableRowStyles(
    {
      striped: context?.striped ?? false,
      highlightOnHover: context?.highlightOnHover ?? false,
      isEven: (__index ?? 0) % 2 === 0,
    },
    { name: 'Tr' }
  ) as any;

  // Add column indices to children (Th and Td components)
  const childrenArray = React.Children.toArray(children);
  const childrenWithColumnIndex = childrenArray.map((child, index) => {
    if (!React.isValidElement(child)) return child;
    return React.cloneElement<TableThProps | TableTdProps>(
      child as React.ReactElement<TableThProps | TableTdProps>,
      {
        __columnIndex: index,
      }
    );
  });

  return (
    <BoxView ref={ref} style={sx(styles.tr, style)} {...others}>
      {childrenWithColumnIndex}
    </BoxView>
  );
});

const Th = forwardRef<any, TableThProps>((props, ref) => {
  const { children, style, withTextWrapper: shouldWrapInText = true, __columnIndex, ...others } = props;
  const context = useTableContext();

  const columnIndex = __columnIndex ?? 0;
  const columnWidth = context?.columnWidths?.[columnIndex];

  const { styles, sx } = useTableCellStyles(
    {
      fontSize: context?.fontSize ?? 'sm',
      verticalSpacing: context?.verticalSpacing ?? 'xs',
      horizontalSpacing: context?.horizontalSpacing ?? 'xs',
      withColumnBorders: context?.withColumnBorders ?? false,
      isHeader: true,
      width: columnWidth,
    },
    { name: 'Th' }
  ) as any;

  const handleLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const { width } = event.nativeEvent.layout;
      if (context?.onCellLayout && width > 0) {
        context.onCellLayout(columnIndex, width);
      }
    },
    [context, columnIndex]
  );

  return (
    <BoxView
      ref={ref}
      style={sx(styles.cell, style)}
      onLayout={handleLayout}
      {...others}
    >
      {withTextWrapper(children, shouldWrapInText, styles.cell)}
    </BoxView>
  );
});

const Td = forwardRef<any, TableTdProps>((props, ref) => {
  const { children, style, withTextWrapper: shouldWrapInText = true, __columnIndex, ...others } = props;
  const context = useTableContext();

  const columnIndex = __columnIndex ?? 0;
  const columnWidth = context?.columnWidths?.[columnIndex];

  const { styles, sx } = useTableCellStyles(
    {
      fontSize: context?.fontSize ?? 'sm',
      verticalSpacing: context?.verticalSpacing ?? 'xs',
      horizontalSpacing: context?.horizontalSpacing ?? 'xs',
      withColumnBorders: context?.withColumnBorders ?? false,
      isHeader: false,
      width: columnWidth,
    },
    { name: 'Td' }
  ) as any;

  const handleLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const { width } = event.nativeEvent.layout;
      if (context?.onCellLayout && width > 0) {
        context.onCellLayout(columnIndex, width);
      }
    },
    [context, columnIndex]
  );

  return (
    <BoxView
      ref={ref}
      style={sx(styles.cell, style)}
      onLayout={handleLayout}
      {...others}
    >
      {withTextWrapper(children, shouldWrapInText, styles.cell)}
    </BoxView>
  );
});

Table.displayName = 'Table';
Thead.displayName = 'Table.Thead';
Tbody.displayName = 'Table.Tbody';
Tfoot.displayName = 'Table.Tfoot';
Tr.displayName = 'Table.Tr';
Th.displayName = 'Table.Th';
Td.displayName = 'Table.Td';

// Attach sub-components with proper typing
interface TableComponent extends React.ForwardRefExoticComponent<
  TableProps & React.RefAttributes<any>
> {
  Thead: typeof Thead;
  Tbody: typeof Tbody;
  Tfoot: typeof Tfoot;
  Tr: typeof Tr;
  Th: typeof Th;
  Td: typeof Td;
}

const TableWithSubComponents = Table as TableComponent;
TableWithSubComponents.Thead = Thead;
TableWithSubComponents.Tbody = Tbody;
TableWithSubComponents.Tfoot = Tfoot;
TableWithSubComponents.Tr = Tr;
TableWithSubComponents.Th = Th;
TableWithSubComponents.Td = Td;

export { TableWithSubComponents as Table };
