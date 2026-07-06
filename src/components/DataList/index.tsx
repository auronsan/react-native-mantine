import React, { createContext, forwardRef, useContext } from 'react';
import { View } from 'react-native';
import { BoxView } from '../BoxView';
import { Text } from '../Text';
import type {
  DefaultProps,
  MantineNumberSize,
  MantineSize,
} from '../../theme/types';
import { useComponentDefaultProps, useTheme } from '../../theme/theme-provider';
import { createStyles } from '../../theme';
import { rem } from '../../theme/utils/rem';

interface DataListContextValue {
  size: MantineSize;
  orientation: 'horizontal' | 'vertical';
  labelWidth: number;
  withDivider: boolean;
}

const DataListContext = createContext<DataListContextValue>({
  size: 'sm',
  orientation: 'horizontal',
  labelWidth: 120,
  withDivider: false,
});

export interface DataListProps extends DefaultProps {
  /** DataList.Item components */
  children?: React.ReactNode;

  /** Controls font size of labels and values */
  size?: MantineSize;

  /** Key of theme.spacing or number, gap between items */
  gap?: MantineNumberSize;

  /** Orientation of items */
  orientation?: 'horizontal' | 'vertical';

  /** Determines whether items should be separated with a divider */
  withDivider?: boolean;

  /** Width of the label column in horizontal orientation */
  labelWidth?: number;
}

const useStyles = createStyles(
  (theme, { gap }: { gap: number }) => ({
    root: {
      gap,
    },
    item: {
      gap: rem(2),
    },
    itemHorizontal: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: theme.spacing.sm,
    },
    itemDivider: {
      borderBottomWidth: 1,
      borderBottomColor:
        theme.colorScheme === 'dark'
          ? theme.fn.themeColor('dark', 4)
          : theme.fn.themeColor('gray', 3),
      paddingBottom: theme.spacing.xs,
    },
  })
);

const defaultProps: Partial<DataListProps> = {
  size: 'sm',
  gap: 'sm',
  orientation: 'horizontal',
  withDivider: false,
  labelWidth: 120,
};

interface DataListComponent
  extends React.ForwardRefExoticComponent<
    DataListProps & React.RefAttributes<View>
  > {
  Item: typeof DataListItem;
  ItemLabel: typeof DataListItemLabel;
  ItemValue: typeof DataListItemValue;
}

/**
 * DataList displays a list of label-value pairs.
 * Port of Mantine v8.3 DataList component.
 */
export const DataList = forwardRef<View, DataListProps>((props, ref) => {
  const { children, size, gap, orientation, withDivider, labelWidth, style, ...others } =
    useComponentDefaultProps('DataList', defaultProps, props);

  const theme = useTheme();

  const gapPx =
    typeof gap === 'number'
      ? gap
      : (theme.spacing[gap as MantineSize] ?? theme.spacing.sm);

  const { styles, sx } = useStyles({ gap: gapPx }, { name: 'DataList' });

  return (
    <DataListContext.Provider
      value={{
        size: size ?? 'sm',
        orientation: orientation ?? 'horizontal',
        labelWidth: labelWidth ?? 120,
        withDivider: withDivider ?? false,
      }}
    >
      <BoxView ref={ref} style={sx(styles.root, style)} {...others}>
        {children}
      </BoxView>
    </DataListContext.Provider>
  );
}) as DataListComponent;

DataList.displayName = 'DataList';

export interface DataListItemProps extends DefaultProps {
  /** DataList.ItemLabel and DataList.ItemValue components */
  children?: React.ReactNode;
}

export const DataListItem = forwardRef<View, DataListItemProps>(
  (props, ref) => {
    const { children, style, ...others } = useComponentDefaultProps(
      'DataListItem',
      {},
      props
    );

    const { orientation, withDivider } = useContext(DataListContext);
    const { styles, sx } = useStyles({ gap: 0 }, { name: 'DataListItem' });

    return (
      <BoxView
        ref={ref}
        style={sx(
          styles.item,
          orientation === 'horizontal' && styles.itemHorizontal,
          withDivider && styles.itemDivider,
          style
        )}
        {...others}
      >
        {children}
      </BoxView>
    );
  }
);

DataListItem.displayName = 'DataList.Item';

export interface DataListItemLabelProps extends DefaultProps {
  /** Label content */
  children?: React.ReactNode;

  /** Text style */
  textStyle?: any;
}

export const DataListItemLabel = forwardRef<View, DataListItemLabelProps>(
  (props, ref) => {
    const { children, style, textStyle, ...others } = useComponentDefaultProps(
      'DataListItemLabel',
      {},
      props
    );

    const theme = useTheme();
    const { size, orientation, labelWidth } = useContext(DataListContext);

    return (
      <BoxView
        ref={ref}
        style={[
          orientation === 'horizontal' && { width: labelWidth },
          style,
        ]}
        {...others}
      >
        {typeof children === 'string' || typeof children === 'number' ? (
          <Text
            style={[
              {
                fontSize: theme.fontSizes[size] as number,
                color: theme.fn.dimmed(),
              },
              textStyle,
            ]}
          >
            {children}
          </Text>
        ) : (
          children
        )}
      </BoxView>
    );
  }
);

DataListItemLabel.displayName = 'DataList.ItemLabel';

export interface DataListItemValueProps extends DefaultProps {
  /** Value content */
  children?: React.ReactNode;

  /** Text style */
  textStyle?: any;
}

export const DataListItemValue = forwardRef<View, DataListItemValueProps>(
  (props, ref) => {
    const { children, style, textStyle, ...others } = useComponentDefaultProps(
      'DataListItemValue',
      {},
      props
    );

    const theme = useTheme();
    const { size, orientation } = useContext(DataListContext);

    return (
      <BoxView
        ref={ref}
        style={[orientation === 'horizontal' && { flex: 1 }, style]}
        {...others}
      >
        {typeof children === 'string' || typeof children === 'number' ? (
          <Text
            style={[
              {
                fontSize: theme.fontSizes[size] as number,
                color: theme.colorScheme === 'dark' ? theme.white : theme.black,
              },
              textStyle,
            ]}
          >
            {children}
          </Text>
        ) : (
          children
        )}
      </BoxView>
    );
  }
);

DataListItemValue.displayName = 'DataList.ItemValue';

DataList.Item = DataListItem;
DataList.ItemLabel = DataListItemLabel;
DataList.ItemValue = DataListItemValue;
