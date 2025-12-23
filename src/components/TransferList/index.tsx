import React, { forwardRef, useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { BoxView } from '../BoxView';
import { Text } from '../Text';
import { Checkbox } from '../Checkbox';
import { Button } from '../Button';
import { TextInput } from '../TextInput';
import type {
  DefaultProps,
  MantineColor,
  MantineNumberSize,
  MantineSize,
} from '../../theme/types';
import { useComponentDefaultProps } from '../../theme/theme-provider';
import { createStyles } from '../../theme';
import { rem } from '../../theme/utils/rem';

export interface TransferListDataItem {
  value: string;
  label: string;
  group?: string;
}

export interface TransferListData {
  items: TransferListDataItem[];
  selectedValues: string[];
}

export interface TransferListProps extends DefaultProps {
  /** Current data state */
  value: [TransferListData, TransferListData];

  /** Called when data changes */
  onChange: (value: [TransferListData, TransferListData]) => void;

  /** Titles for both lists */
  titles?: [React.ReactNode, React.ReactNode];

  /** Placeholder for search inputs */
  searchPlaceholder?: string;

  /** If true, lists will have search */
  searchable?: boolean;

  /** Transfer list color */
  color?: MantineColor;

  /** Transfer list size */
  size?: MantineSize;

  /** Border radius */
  radius?: MantineNumberSize;

  /** List height */
  listHeight?: number;

  /** If true, items will not be transferred automatically */
  transferAllMatchingFilter?: boolean;

  /** Render custom item */
  itemComponent?: React.ComponentType<{ data: TransferListDataItem; selected: boolean }>;

  /** Additional styles */
  style?: any;
}

const useStyles = createStyles(
  (
    theme,
    {
      color,
      radius,
      listHeight,
    }: {
      color: MantineColor;
      radius: MantineNumberSize;
      listHeight: number;
    }
  ) => {
    const colors = theme.colors[color] || theme.colors[theme.primaryColor];

    return {
      root: {
        flexDirection: 'column',
      },
      container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'stretch',
      },
      list: {
        flex: 1,
        borderWidth: 1,
        borderColor:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[4]
            : theme.colors.gray[3],
        borderRadius: theme.fn.radius(radius),
        overflow: 'hidden',
      },
      listHeader: {
        padding: theme.spacing.sm,
        borderBottomWidth: 1,
        borderBottomColor:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[4]
            : theme.colors.gray[3],
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
      },
      title: {
        fontSize: rem(14),
        fontWeight: '600',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
      },
      searchContainer: {
        padding: theme.spacing.xs,
        borderBottomWidth: 1,
        borderBottomColor:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[4]
            : theme.colors.gray[3],
      },
      itemsContainer: {
        height: listHeight,
      },
      item: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: rem(10),
        paddingHorizontal: theme.spacing.sm,
        borderBottomWidth: 1,
        borderBottomColor:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[5]
            : theme.colors.gray[1],
      },
      itemSelected: {
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[5]
            : colors?.[0] || theme.colors.gray[0],
      },
      itemText: {
        marginLeft: theme.spacing.sm,
        fontSize: rem(14),
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
      },
      controls: {
        width: rem(80),
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: theme.spacing.xs,
      },
      button: {
        marginVertical: theme.spacing.xs,
      },
      emptyState: {
        padding: theme.spacing.xl,
        alignItems: 'center',
      },
      emptyText: {
        color:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[2]
            : theme.colors.gray[6],
        fontSize: rem(12),
      },
    };
  }
);

const defaultProps: Partial<TransferListProps> = {
  titles: ['', ''],
  searchPlaceholder: 'Search...',
  searchable: false,
  color: 'blue',
  size: 'md',
  radius: 'sm',
  listHeight: 300,
  transferAllMatchingFilter: false,
};

const DefaultItem: React.FC<{ data: TransferListDataItem; selected: boolean }> = ({
  data,
  selected,
}) => {
  return (
    <>
      <Checkbox checked={selected} onChange={() => {}} />
      <Text>{data.label}</Text>
    </>
  );
};

export const TransferList = forwardRef<any, TransferListProps>((props, ref) => {
  const {
    value,
    onChange,
    titles,
    searchPlaceholder,
    searchable,
    color,
    size,
    radius,
    listHeight,
    transferAllMatchingFilter,
    itemComponent: ItemComponent = DefaultItem,
    style,
    ...others
  } = useComponentDefaultProps('TransferList', defaultProps, props);

  const [leftSearch, setLeftSearch] = useState('');
  const [rightSearch, setRightSearch] = useState('');

  const { styles, sx } = useStyles(
    { color, radius, listHeight },
    { name: 'TransferList', size }
  ) as any;

  const [leftData, rightData] = value;

  const filterItems = (items: TransferListDataItem[], search: string) => {
    if (!search) return items;
    return items.filter((item) =>
      item.label.toLowerCase().includes(search.toLowerCase())
    );
  };

  const filteredLeftItems = filterItems(leftData.items, leftSearch);
  const filteredRightItems = filterItems(rightData.items, rightSearch);

  const toggleSelection = (side: 'left' | 'right', itemValue: string) => {
    const data = side === 'left' ? leftData : rightData;
    const selectedValues = data.selectedValues.includes(itemValue)
      ? data.selectedValues.filter((v) => v !== itemValue)
      : [...data.selectedValues, itemValue];

    const newValue: [TransferListData, TransferListData] =
      side === 'left'
        ? [{ ...leftData, selectedValues }, rightData]
        : [leftData, { ...rightData, selectedValues }];

    onChange(newValue);
  };

  const transferToRight = () => {
    const itemsToTransfer = leftData.items.filter((item) =>
      leftData.selectedValues.includes(item.value)
    );
    const remainingItems = leftData.items.filter(
      (item) => !leftData.selectedValues.includes(item.value)
    );

    onChange([
      { items: remainingItems, selectedValues: [] },
      { items: [...rightData.items, ...itemsToTransfer], selectedValues: [] },
    ]);
  };

  const transferToLeft = () => {
    const itemsToTransfer = rightData.items.filter((item) =>
      rightData.selectedValues.includes(item.value)
    );
    const remainingItems = rightData.items.filter(
      (item) => !rightData.selectedValues.includes(item.value)
    );

    onChange([
      { items: [...leftData.items, ...itemsToTransfer], selectedValues: [] },
      { items: remainingItems, selectedValues: [] },
    ]);
  };

  const transferAllToRight = () => {
    onChange([
      { items: [], selectedValues: [] },
      { items: [...rightData.items, ...leftData.items], selectedValues: [] },
    ]);
  };

  const transferAllToLeft = () => {
    onChange([
      { items: [...leftData.items, ...rightData.items], selectedValues: [] },
      { items: [], selectedValues: [] },
    ]);
  };

  const renderList = (
    data: TransferListData,
    filteredItems: TransferListDataItem[],
    side: 'left' | 'right',
    searchValue: string,
    setSearchValue: (value: string) => void,
    title?: React.ReactNode
  ) => (
    <BoxView style={styles.list}>
      {title && (
        <BoxView style={styles.listHeader}>
          <Text style={styles.title}>{title}</Text>
        </BoxView>
      )}
      {searchable && (
        <BoxView style={styles.searchContainer}>
          <TextInput
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => setSearchValue(e.nativeEvent.text)}
            size="sm"
          />
        </BoxView>
      )}
      <ScrollView style={styles.itemsContainer}>
        {filteredItems.length === 0 ? (
          <BoxView style={styles.emptyState}>
            <Text style={styles.emptyText}>No items</Text>
          </BoxView>
        ) : (
          filteredItems.map((item) => {
            const isSelected = data.selectedValues.includes(item.value);
            return (
              <TouchableOpacity
                key={item.value}
                style={[styles.item, isSelected && styles.itemSelected]}
                onPress={() => toggleSelection(side, item.value)}
              >
                <ItemComponent data={item} selected={isSelected} />
                <Text style={styles.itemText}>{item.label}</Text>
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>
    </BoxView>
  );

  return (
    <BoxView ref={ref} style={sx(styles.root, style)} {...others}>
      <BoxView style={styles.container}>
        {renderList(
          leftData,
          filteredLeftItems,
          'left',
          leftSearch,
          setLeftSearch,
          titles[0]
        )}

        <BoxView style={styles.controls}>
          <Button
            style={styles.button}
            onPress={transferAllToRight}
            disabled={leftData.items.length === 0}
            size="sm"
          >
            <Text>{'»'}</Text>
          </Button>
          <Button
            style={styles.button}
            onPress={transferToRight}
            disabled={leftData.selectedValues.length === 0}
            size="sm"
          >
            <Text>{'›'}</Text>
          </Button>
          <Button
            style={styles.button}
            onPress={transferToLeft}
            disabled={rightData.selectedValues.length === 0}
            size="sm"
          >
            <Text>{'‹'}</Text>
          </Button>
          <Button
            style={styles.button}
            onPress={transferAllToLeft}
            disabled={rightData.items.length === 0}
            size="sm"
          >
            <Text>{'«'}</Text>
          </Button>
        </BoxView>

        {renderList(
          rightData,
          filteredRightItems,
          'right',
          rightSearch,
          setRightSearch,
          titles[1]
        )}
      </BoxView>
    </BoxView>
  );
});

TransferList.displayName = 'TransferList';
