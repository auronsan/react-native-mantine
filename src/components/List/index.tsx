import React, { forwardRef, createContext, useContext } from 'react';
import { BoxView } from '../BoxView';
import { Text } from '../Text';
import type { DefaultProps, SpacingValue } from '../../theme/types';
import { useComponentDefaultProps } from '../../theme/theme-provider';
import { createStyles } from '../../theme';
import { rem } from '../../theme/utils/rem';

interface ListContextValue {
  type: 'ordered' | 'unordered';
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  spacing: SpacingValue;
  center: boolean;
  icon: React.ReactNode;
  withPadding: boolean;
  listStyleType: string;
  startIndex: number;
}

const ListContext = createContext<ListContextValue | null>(null);

const useListContext = () => {
  const context = useContext(ListContext);
  if (!context) {
    throw new Error('List components must be used within List');
  }
  return context;
};

export interface ListProps extends DefaultProps {
  /** List type */
  type?: 'ordered' | 'unordered';

  /** List size */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  /** Spacing between items */
  spacing?: SpacingValue;

  /** Center items with icon */
  center?: boolean;

  /** Custom icon for unordered list */
  icon?: React.ReactNode;

  /** Add padding-left to offset list from main content */
  withPadding?: boolean;

  /** List style type for ordered lists */
  listStyleType?: 'decimal' | 'lower-alpha' | 'upper-alpha' | 'lower-roman' | 'upper-roman';

  /** Start index for ordered list */
  startIndex?: number;

  /** List children */
  children?: React.ReactNode;

  /** Additional styles */
  style?: any;
}

export interface ListItemProps extends DefaultProps {
  /** Item children */
  children?: React.ReactNode;

  /** Custom icon for this item */
  icon?: React.ReactNode;

  /** Additional styles */
  style?: any;

  /** Internal item index */
  __index?: number;
}

const fontSizes = {
  xs: rem(10),
  sm: rem(12),
  md: rem(14),
  lg: rem(16),
  xl: rem(18),
};

const useListStyles = createStyles(
  (
    theme,
    {
      withPadding,
      spacing,
    }: {
      withPadding: boolean;
      spacing: SpacingValue;
    }
  ) => {
    const getSpacing = () => {
      if (typeof spacing === 'number') return rem(spacing);
      return theme.spacing[spacing] || theme.spacing.md;
    };

    return {
      root: {
        ...(withPadding && {
          paddingLeft: theme.spacing.md,
        }),
      },
      item: {
        marginBottom: getSpacing(),
      },
    };
  }
);

const useListItemStyles = createStyles(
  (
    theme,
    {
      size,
      center,
    }: {
      size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
      center: boolean;
    }
  ) => ({
    item: {
      flexDirection: 'row',
      alignItems: center ? 'center' : 'flex-start',
    },
    icon: {
      marginRight: theme.spacing.xs,
      marginTop: (center ? 0 : rem(2)) as any,
    },
    iconText: {
      fontSize: fontSizes[size] as any,
      color: theme.colorScheme === 'dark' ? theme.colors.dark?.[2] : theme.colors.gray?.[6],
      fontWeight: '600',
      minWidth: rem(20) as any,
    },
    content: {
      flex: 1,
    },
    contentText: {
      fontSize: fontSizes[size] as any,
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      lineHeight: (fontSizes[size] as any) * 1.5,
    },
  })
);

const defaultProps: Partial<ListProps> = {
  type: 'unordered',
  size: 'md',
  spacing: 'xs',
  center: false,
  withPadding: false,
  listStyleType: 'decimal',
  startIndex: 1,
};

const defaultItemProps: Partial<ListItemProps> = {};

const getListMarker = (
  type: 'ordered' | 'unordered',
  index: number,
  listStyleType: string,
  startIndex: number
): string => {
  if (type === 'unordered') {
    return '•';
  }

  const actualIndex = index + startIndex;

  switch (listStyleType) {
    case 'decimal':
      return `${actualIndex}.`;
    case 'lower-alpha':
      return `${String.fromCharCode(96 + actualIndex)}.`;
    case 'upper-alpha':
      return `${String.fromCharCode(64 + actualIndex)}.`;
    case 'lower-roman': {
      const romanNumerals = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix', 'x'];
      return `${romanNumerals[actualIndex - 1] || actualIndex}.`;
    }
    case 'upper-roman': {
      const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
      return `${romanNumerals[actualIndex - 1] || actualIndex}.`;
    }
    default:
      return `${actualIndex}.`;
  }
};

const ListRoot = forwardRef<any, ListProps>((props, ref) => {
  const {
    type,
    size,
    spacing,
    center,
    icon,
    withPadding,
    listStyleType,
    startIndex,
    children,
    style,
    ...others
  } = useComponentDefaultProps('List', defaultProps, props);

  const { styles, sx} = useListStyles(
    { withPadding, spacing },
    { name: 'List' }
  ) as any;

  const childrenArray = React.Children.toArray(children);

  return (
    <ListContext.Provider
      value={{
        type: type || 'unordered',
        size: size || 'md',
        spacing: spacing || 'md',
        center: center || false,
        icon,
        withPadding: withPadding || false,
        listStyleType: listStyleType || 'disc',
        startIndex: startIndex || 1,
      }}
    >
      <BoxView ref={ref} style={sx(styles.root, style)} {...others}>
        {childrenArray.map((child, index) => {
          if (!React.isValidElement(child)) return child;
          return React.cloneElement(child as React.ReactElement, {
            key: index,
            __index: index,
          });
        })}
      </BoxView>
    </ListContext.Provider>
  );
});

export const ListItem = forwardRef<any, ListItemProps>((props, ref) => {
  const { children, icon: itemIcon, style, __index, ...others} = {
    ...defaultItemProps,
    ...props,
  };

  const context = useListContext();

  const { styles, sx} = useListItemStyles(
    { size: context.size, center: context.center },
    { name: 'ListItem' }
  ) as any;

  const index = __index ?? 0;

  const renderIcon = () => {
    if (itemIcon) return itemIcon;
    if (context.icon) return context.icon;

    const marker = getListMarker(
      context.type,
      index,
      context.listStyleType,
      context.startIndex
    );

    return <Text style={styles.iconText}>{marker}</Text>;
  };

  return (
    <BoxView ref={ref} style={sx(styles.item, style)} {...others}>
      <BoxView style={styles.icon}>{renderIcon()}</BoxView>
      <BoxView style={styles.content}>
        {typeof children === 'string' ? (
          <Text style={styles.contentText}>{children}</Text>
        ) : (
          children
        )}
      </BoxView>
    </BoxView>
  );
});

ListRoot.displayName = 'List';
ListItem.displayName = 'List.Item';

// Create a properly typed List component with Item subcomponent
type ListComponent = typeof ListRoot & {
  Item: typeof ListItem;
};

// Attach sub-components and export with proper typing
export const List = ListRoot as ListComponent;
List.Item = ListItem;
