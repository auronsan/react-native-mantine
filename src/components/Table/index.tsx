import React, { forwardRef } from 'react';
import { View, ScrollView } from 'react-native';
import { BoxView } from '../BoxView';
import { Text } from '../Text';
import type { DefaultProps, MantineNumberSize } from '../../theme/types';
import { useComponentDefaultProps } from '../../theme/theme-provider';
import { createStyles } from '../../theme';
import { rem } from '../../theme/utils/rem';

export interface TableProps extends DefaultProps {
  /** If true every odd row of table will have gray background color */
  striped?: boolean;

  /** If true row will have hover color */
  highlightOnHover?: boolean;

  /** Table caption position */
  captionSide?: 'top' | 'bottom';

  /** Horizontal cells spacing from theme.spacing or any valid value */
  horizontalSpacing?: MantineNumberSize;

  /** Vertical cells spacing from theme.spacing or any valid value */
  verticalSpacing?: MantineNumberSize;

  /** Sets font size of all text inside table */
  fontSize?: MantineNumberSize;

  /** Add border to table */
  withBorder?: boolean;

  /** Add border to columns */
  withColumnBorders?: boolean;

  /** Table children (THead, TBody, TFoot, Caption) */
  children?: React.ReactNode;

  /** Additional styles */
  style?: any;

  /** Enable horizontal scrolling */
  horizontallyScrollable?: boolean;
}

interface TableCellProps extends DefaultProps {
  /** Cell content */
  children?: React.ReactNode;

  /** Additional styles */
  style?: any;

  /** Column span */
  colSpan?: number;
}

interface TableRowProps extends DefaultProps {
  /** Row content */
  children?: React.ReactNode;

  /** Additional styles */
  style?: any;
}

interface TableSectionProps extends DefaultProps {
  /** Section content */
  children?: React.ReactNode;

  /** Additional styles */
  style?: any;
}

interface TableCaptionProps extends DefaultProps {
  /** Caption content */
  children?: React.ReactNode;

  /** Additional styles */
  style?: any;
}

const useStyles = createStyles(
  (
    theme,
    {
      horizontalSpacing,
      verticalSpacing,
      fontSize,
      withBorder,
      withColumnBorders,
      striped,
    }: {
      horizontalSpacing: MantineNumberSize;
      verticalSpacing: MantineNumberSize;
      fontSize: MantineNumberSize;
      withBorder: boolean;
      withColumnBorders: boolean;
      striped: boolean;
    }
  ) => {
    const borderColor =
      theme.colorScheme === 'dark'
        ? (theme.colors.dark || [])[4]
        : (theme.colors.gray || [])[3];

    const getSpacing = (size: MantineNumberSize) => {
      if (typeof size === 'number') return rem(size);
      return theme.spacing[size] || theme.spacing.xs;
    };

    const getFontSize = (size: MantineNumberSize) => {
      if (typeof size === 'number') return size;
      return theme.fontSizes[size] || theme.fontSizes.sm;
    };

    const hPadding = getSpacing(horizontalSpacing);
    const vPadding = getSpacing(verticalSpacing);
    const cellFontSize = getFontSize(fontSize);

    return {
      root: {
        width: '100%',
        backgroundColor: 'transparent',
      },
      scrollView: {
        width: '100%',
      },
      container: {
        flexDirection: 'column' as const,
        borderWidth: withBorder ? 1 : 0,
        borderColor: withBorder ? borderColor : 'transparent',
        borderStyle: 'solid' as const,
      },
      caption: {
        paddingHorizontal: hPadding,
        paddingVertical: theme.spacing.xs,
        fontSize: theme.fontSizes.sm,
        color:
          theme.colorScheme === 'dark'
            ? (theme.colors.dark || [])[2]
            : (theme.colors.gray || [])[6],
        textAlign: 'left' as const,
      },
      captionTop: {
        marginBottom: 0,
      },
      captionBottom: {
        marginTop: 0,
      },
      thead: {
        flexDirection: 'column' as const,
      },
      tbody: {
        flexDirection: 'column' as const,
      },
      tfoot: {
        flexDirection: 'column' as const,
      },
      tr: {
        flexDirection: 'row' as const,
      },
      th: {
        flex: 1,
        paddingHorizontal: hPadding,
        paddingVertical: vPadding,
        borderBottomWidth: 1,
        borderBottomColor: borderColor,
        borderBottomStyle: 'solid' as const,
        borderRightWidth: withColumnBorders ? 1 : 0,
        borderRightColor: withColumnBorders ? borderColor : 'transparent',
        borderRightStyle: 'solid' as const,
        justifyContent: 'center' as const,
      },
      thText: {
        fontWeight: 'bold' as const,
        color:
          theme.colorScheme === 'dark'
            ? (theme.colors.dark || [])[0]
            : (theme.colors.gray || [])[7],
        fontSize: cellFontSize,
      },
      td: {
        flex: 1,
        paddingHorizontal: hPadding,
        paddingVertical: vPadding,
        borderTopWidth: 1,
        borderTopColor: borderColor,
        borderTopStyle: 'solid' as const,
        borderRightWidth: withColumnBorders ? 1 : 0,
        borderRightColor: withColumnBorders ? borderColor : 'transparent',
        borderRightStyle: 'solid' as const,
        justifyContent: 'center' as const,
      },
      tdText: {
        color:
          theme.colorScheme === 'dark'
            ? (theme.colors.dark || [])[0]
            : theme.black,
        fontSize: cellFontSize,
      },
      firstBodyRow: {
        borderTopWidth: 0,
      },
      lastCell: {
        borderRightWidth: 0,
      },
      stripedRow: striped
        ? {
            backgroundColor:
              theme.colorScheme === 'dark'
                ? (theme.colors.dark || [])[6]
                : (theme.colors.gray || [])[0],
          }
        : {},
    };
  }
);

const defaultProps: Partial<TableProps> = {
  striped: false,
  highlightOnHover: false,
  captionSide: 'top',
  horizontalSpacing: 'xs',
  fontSize: 'sm',
  verticalSpacing: 7,
  withBorder: false,
  withColumnBorders: false,
  horizontallyScrollable: false,
};

// Context to share table configuration with child components
interface TableContextValue {
  styles: any;
  sx: any;
  striped: boolean;
  highlightOnHover: boolean;
}

const TableContext = React.createContext<TableContextValue | null>(null);

const useTableContext = () => {
  const context = React.useContext(TableContext);
  if (!context) {
    throw new Error('Table compound components must be used within Table');
  }
  return context;
};

// Table Caption Component
const TableCaption = forwardRef<View, TableCaptionProps>((props, ref) => {
  const { children, style, ...others } = props;
  const { styles, sx } = useTableContext();

  return (
    <BoxView ref={ref} style={sx(styles.caption, style)} {...others}>
      {typeof children === 'string' ? (
        <Text style={styles.caption}>{children}</Text>
      ) : (
        children
      )}
    </BoxView>
  );
});

TableCaption.displayName = 'Table.Caption';

// Table Head Component
const THead = forwardRef<View, TableSectionProps>((props, ref) => {
  const { children, style, ...others } = props;
  const { styles, sx } = useTableContext();

  return (
    <BoxView ref={ref} style={sx(styles.thead, style)} {...others}>
      {children}
    </BoxView>
  );
});

THead.displayName = 'Table.THead';

// Table Body Component
const TBody = forwardRef<View, TableSectionProps>((props, ref) => {
  const { children, style, ...others } = props;
  const { styles, sx, striped } = useTableContext();

  // Process children to add row styling
  const processedChildren = React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) return child;

    const isOddRow = index % 2 === 1;
    const childProps = child.props as any;
    const rowStyle = [
      childProps.style,
      striped && isOddRow && styles.stripedRow,
    ].filter(Boolean);

    return React.cloneElement(child as React.ReactElement<any>, {
      'style': rowStyle.length > 0 ? rowStyle : childProps.style,
      'data-index': index,
      'data-first': index === 0,
    });
  });

  return (
    <BoxView ref={ref} style={sx(styles.tbody, style)} {...others}>
      {processedChildren}
    </BoxView>
  );
});

TBody.displayName = 'Table.TBody';

// Table Footer Component
const TFoot = forwardRef<View, TableSectionProps>((props, ref) => {
  const { children, style, ...others } = props;
  const { styles, sx } = useTableContext();

  return (
    <BoxView ref={ref} style={sx(styles.tfoot, style)} {...others}>
      {children}
    </BoxView>
  );
});

TFoot.displayName = 'Table.TFoot';

// Table Row Component
const Tr = forwardRef<View, TableRowProps>((props, ref) => {
  const { children, style, ...others } = props;
  const { styles, sx } = useTableContext();

  return (
    <BoxView ref={ref} style={sx(styles.tr, style)} {...others}>
      {children}
    </BoxView>
  );
});

Tr.displayName = 'Table.Tr';

// Table Header Cell Component
const Th = forwardRef<View, TableCellProps>((props, ref) => {
  const { children, style, colSpan, ...others } = props;
  const { styles, sx } = useTableContext();

  const cellStyle = [styles.th, colSpan && { flex: colSpan }, style].filter(
    Boolean
  );

  return (
    <BoxView ref={ref} style={sx(...cellStyle)} {...others}>
      {typeof children === 'string' ? (
        <Text style={styles.thText}>{children}</Text>
      ) : (
        children
      )}
    </BoxView>
  );
});

Th.displayName = 'Table.Th';

// Table Data Cell Component
const Td = forwardRef<View, TableCellProps>((props, ref) => {
  const { children, style, colSpan, ...others } = props;
  const { styles, sx } = useTableContext();
  const isFirstRow = (others as any)['data-first'];

  const cellStyle = [
    styles.td,
    isFirstRow && styles.firstBodyRow,
    colSpan && { flex: colSpan },
    style,
  ].filter(Boolean);

  return (
    <BoxView ref={ref} style={sx(...cellStyle)} {...others}>
      <Text style={styles.tdText}>{children}</Text>
    </BoxView>
  );
});

Td.displayName = 'Table.Td';

// Main Table Component
export const _Table = forwardRef<View, TableProps>((props, ref) => {
  const {
    striped,
    highlightOnHover,
    captionSide,
    horizontalSpacing,
    verticalSpacing,
    fontSize,
    withBorder,
    withColumnBorders,
    children,
    style,
    horizontallyScrollable,
    ...others
  } = useComponentDefaultProps('Table', defaultProps, props);

  const { styles, sx } = useStyles(
    {
      horizontalSpacing: horizontalSpacing ?? defaultProps.horizontalSpacing ?? 'xs',
      verticalSpacing: verticalSpacing ?? defaultProps.verticalSpacing ?? 7,
      fontSize: fontSize ?? defaultProps.fontSize ?? 'sm',
      withBorder: withBorder ?? defaultProps.withBorder ?? false,
      withColumnBorders: withColumnBorders ?? defaultProps.withColumnBorders ?? false,
      striped: striped ?? defaultProps.striped ?? false,
    },
    { name: 'Table' }
  ) as any;

  const contextValue: TableContextValue = {
    styles,
    sx,
    striped: striped || false,
    highlightOnHover: highlightOnHover || false,
  };

  const tableContent = (
    <BoxView ref={ref} style={sx(styles.container, style)} {...others}>
      {captionSide === 'top' &&
        React.Children.toArray(children).find(
          (child) =>
            React.isValidElement(child) &&
            (child.type as any).displayName === 'Table.Caption'
        )}
      {React.Children.toArray(children).filter(
        (child) =>
          React.isValidElement(child) &&
          (child.type as any).displayName !== 'Table.Caption'
      )}
      {captionSide === 'bottom' &&
        React.Children.toArray(children).find(
          (child) =>
            React.isValidElement(child) &&
            (child.type as any).displayName === 'Table.Caption'
        )}
    </BoxView>
  );

  return (
    <TableContext.Provider value={contextValue}>
      {horizontallyScrollable ? (
        <ScrollView
          horizontal
          style={styles.scrollView}
          showsHorizontalScrollIndicator={true}
        >
          {tableContent}
        </ScrollView>
      ) : (
        tableContent
      )}
    </TableContext.Provider>
  );
}) as any;

_Table.displayName = 'Table';

// Attach compound components
export const Table = Object.assign(_Table, {
  Caption: TableCaption,
  THead,
  TBody,
  TFoot,
  Tr,
  Th,
  Td,
});
