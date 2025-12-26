import React, { forwardRef, createContext, useContext } from 'react';
import { ScrollView } from 'react-native';
import { BoxView } from '../BoxView';
import { Text } from '../Text';
import type { DefaultProps, SpacingValue } from '../../theme/types';
import { useComponentDefaultProps } from '../../theme/theme-provider';
import { createStyles } from '../../theme';
import { rem } from '../../theme/utils/rem';

interface TableContextValue {
  striped: boolean;
  highlightOnHover: boolean;
  withBorder: boolean;
  withColumnBorders: boolean;
  fontSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  verticalSpacing: SpacingValue;
  horizontalSpacing: SpacingValue;
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

export interface TableThProps extends DefaultProps {
  /** Th children */
  children?: React.ReactNode;

  /** Additional styles */
  style?: any;
}

export interface TableTdProps extends DefaultProps {
  /** Td children */
  children?: React.ReactNode;

  /** Additional styles */
  style?: any;
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
    }: {
      withBorder: boolean;
      captionSide: 'top' | 'bottom';
    }
  ) => ({
    wrapper: {
      flex: 1,
    },
    root: {
      width: '100%',
      borderCollapse: 'collapse' as any,
      ...(withBorder && {
        borderWidth: 1,
        borderColor: theme.colorScheme === 'dark' ? theme.colors.dark?.[4] : theme.colors.gray?.[3],
      }),
    },
    caption: {
      fontSize: theme.fontSizes.sm as number,
      color: theme.colorScheme === 'dark' ? theme.colors.dark?.[2] : theme.colors.gray?.[6],
      paddingVertical: theme.spacing.xs,
      textAlign: 'center',
      ...(captionSide === 'bottom' && { order: 1 }),
    },
  })
);

const useTableHeadStyles = createStyles((theme) => ({
  thead: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colorScheme === 'dark' ? theme.colors.dark?.[4] : theme.colors.gray?.[3],
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
      borderBottomWidth: 1,
      borderBottomColor: theme.colorScheme === 'dark' ? theme.colors.dark?.[4] : theme.colors.gray?.[3],
      ...(striped &&
        isEven && {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark?.[6] : theme.colors.gray?.[0],
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
    }: {
      fontSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
      verticalSpacing: SpacingValue;
      horizontalSpacing: SpacingValue;
      withColumnBorders: boolean;
      isHeader: boolean;
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
        paddingVertical: getVerticalPadding() as any,
        paddingHorizontal: getHorizontalPadding() as any,
        fontSize: fontSizes[fontSize],
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        textAlign: 'left',
        ...(withColumnBorders && {
          borderRightWidth: 1,
          borderRightColor:
            theme.colorScheme === 'dark' ? theme.colors.dark?.[4] : theme.colors.gray?.[3],
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

export const Table = forwardRef<any, TableProps>((props, ref) => {
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
    style,
    ...others
  } = useComponentDefaultProps('Table', defaultProps, props);

  const { styles, sx} = useTableStyles(
    { withBorder, captionSide },
    { name: 'Table' }
  ) as any;

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
      }}
    >
      <ScrollView horizontal style={styles.wrapper} showsHorizontalScrollIndicator>
        <BoxView ref={ref} style={sx(styles.root, style)} {...others}>
          {caption && <Text style={styles.caption}>{caption}</Text>}
          {children}
        </BoxView>
      </ScrollView>
    </TableContext.Provider>
  );
});

export const Thead = forwardRef<any, TableTheadProps>((props, ref) => {
  const { children, style, ...others} = props;
  const { styles, sx} = useTableHeadStyles({}, { name: 'Thead' }) as any;

  return (
    <BoxView ref={ref} style={sx(styles.thead, style)} {...others}>
      {children}
    </BoxView>
  );
});

export const Tbody = forwardRef<any, TableTbodyProps>((props, ref) => {
  const { children, style, ...others } = props;

  const childrenArray = React.Children.toArray(children);

  return (
    <BoxView ref={ref} style={style} {...others}>
      {childrenArray.map((child, index) => {
        if (!React.isValidElement(child)) return child;
        return React.cloneElement<TableTrProps>(child as React.ReactElement<TableTrProps>, {
          key: index,
          __index: index,
        });
      })}
    </BoxView>
  );
});

export const Tfoot = forwardRef<any, TableTfootProps>((props, ref) => {
  const { children, style, ...others } = props;

  return (
    <BoxView ref={ref} style={style} {...others}>
      {children}
    </BoxView>
  );
});

export const Tr = forwardRef<any, TableTrProps>((props, ref) => {
  const { children, style, __index, ...others} = props;
  const context = useTableContext();

  const { styles, sx} = useTableRowStyles(
    {
      striped: context?.striped ?? false,
      highlightOnHover: context?.highlightOnHover ?? false,
      isEven: (__index ?? 0) % 2 === 0,
    },
    { name: 'Tr' }
  ) as any;

  return (
    <BoxView ref={ref} style={sx(styles.tr, style)} {...others}>
      {children}
    </BoxView>
  );
});

export const Th = forwardRef<any, TableThProps>((props, ref) => {
  const { children, style, ...others} = props;
  const context = useTableContext();

  const { styles, sx} = useTableCellStyles(
    {
      fontSize: context?.fontSize ?? 'sm',
      verticalSpacing: context?.verticalSpacing ?? 'xs',
      horizontalSpacing: context?.horizontalSpacing ?? 'xs',
      withColumnBorders: context?.withColumnBorders ?? false,
      isHeader: true,
    },
    { name: 'Th' }
  ) as any;

  return (
    <BoxView ref={ref} style={sx(styles.cell, style)} {...others}>
      {typeof children === 'string' ? <Text style={styles.cell}>{children}</Text> : children}
    </BoxView>
  );
});

export const Td = forwardRef<any, TableTdProps>((props, ref) => {
  const { children, style, ...others} = props;
  const context = useTableContext();

  const { styles, sx} = useTableCellStyles(
    {
      fontSize: context?.fontSize ?? 'sm',
      verticalSpacing: context?.verticalSpacing ?? 'xs',
      horizontalSpacing: context?.horizontalSpacing ?? 'xs',
      withColumnBorders: context?.withColumnBorders ?? false,
      isHeader: false,
    },
    { name: 'Td' }
  ) as any;

  return (
    <BoxView ref={ref} style={sx(styles.cell, style)} {...others}>
      {typeof children === 'string' ? <Text style={styles.cell}>{children}</Text> : children}
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

// Attach sub-components
(Table as any).Thead = Thead;
(Table as any).Tbody = Tbody;
(Table as any).Tfoot = Tfoot;
(Table as any).Tr = Tr;
(Table as any).Th = Th;
(Table as any).Td = Td;
