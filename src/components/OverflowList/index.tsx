import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { Text } from '../Text';
import type {
  DefaultProps,
  MantineNumberSize,
  MantineSize,
} from '../../theme/types';
import { useComponentDefaultProps, useTheme } from '../../theme/theme-provider';
import { createStyles } from '../../theme';

export interface OverflowListProps<T = any> extends DefaultProps {
  /** Items to render */
  data: T[];

  /** Renders a single item */
  renderItem: (item: T, index: number) => React.ReactNode;

  /** Renders the overflow indicator, receives hidden items */
  renderOverflow?: (hiddenItems: T[]) => React.ReactNode;

  /** Maximum number of visible items regardless of available space */
  maxVisibleItems?: number;

  /** Key of theme.spacing or number, gap between items */
  gap?: MantineNumberSize;

  /** Side from which items are collapsed when there is not enough space */
  collapseFrom?: 'start' | 'end';

  /** Returns a unique key for the given item */
  getItemKey?: (item: T, index: number) => string | number;
}

const useStyles = createStyles(
  (theme, { gap }: { gap: number }) => ({
    root: {
      flexDirection: 'row',
      alignItems: 'center',
      gap,
      overflow: 'hidden',
    },
    measure: {
      position: 'absolute',
      top: 0,
      left: 0,
      flexDirection: 'row',
      opacity: 0,
    },
    overflowLabel: {
      fontSize: theme.fontSizes.sm as number,
      color: theme.fn.dimmed(),
    },
  })
);

const defaultProps = {
  gap: 'xs' as MantineNumberSize,
  collapseFrom: 'end' as const,
};

/**
 * OverflowList renders items in a single row and collapses the ones that
 * do not fit into an overflow indicator. Port of Mantine v8.3 OverflowList.
 */
export function OverflowList<T = any>(props: OverflowListProps<T>) {
  const {
    data,
    renderItem,
    renderOverflow,
    maxVisibleItems,
    gap,
    collapseFrom,
    getItemKey,
    style,
    ...others
  } = useComponentDefaultProps(
    'OverflowList',
    defaultProps,
    props
  ) as OverflowListProps<T>;

  const theme = useTheme();

  const gapPx =
    typeof gap === 'number'
      ? gap
      : (theme.spacing[gap as MantineSize] ?? theme.spacing.xs);

  const { styles, sx } = useStyles({ gap: gapPx }, { name: 'OverflowList' });

  const [containerWidth, setContainerWidth] = useState(0);
  const [measuredCount, setMeasuredCount] = useState(0);
  const [overflowWidth, setOverflowWidth] = useState(0);
  const itemWidths = useRef<number[]>([]);

  useEffect(() => {
    itemWidths.current = [];
    setMeasuredCount(0);
  }, [data]);

  const fromEnd = collapseFrom !== 'start';
  const max = Math.min(maxVisibleItems ?? data.length, data.length);

  const measured =
    containerWidth > 0 &&
    measuredCount >= data.length &&
    (overflowWidth > 0 || data.length === 0);

  let visibleCount = max;

  if (measured && data.length > 0) {
    const widthAt = (index: number) =>
      itemWidths.current[fromEnd ? index : data.length - 1 - index] ?? 0;

    let totalAll = 0;
    for (let i = 0; i < data.length; i += 1) {
      totalAll += widthAt(i) + (i > 0 ? gapPx : 0);
    }

    if (max >= data.length && totalAll <= containerWidth) {
      visibleCount = data.length;
    } else {
      const budget = containerWidth - overflowWidth - gapPx;
      let used = 0;
      let count = 0;

      for (let i = 0; i < max; i += 1) {
        const next = used + widthAt(i) + (count > 0 ? gapPx : 0);
        if (next > budget) {
          break;
        }
        used = next;
        count += 1;
      }

      visibleCount = count;
    }
  }

  const visibleItems = fromEnd
    ? data.slice(0, visibleCount)
    : data.slice(data.length - visibleCount);
  const hiddenItems = fromEnd
    ? data.slice(visibleCount)
    : data.slice(0, data.length - visibleCount);

  const overflowNode = (items: T[]) =>
    renderOverflow ? (
      renderOverflow(items)
    ) : (
      <Text style={styles.overflowLabel}>+{items.length}</Text>
    );

  const keyOf = (item: T, index: number) =>
    getItemKey ? getItemKey(item, index) : index;

  return (
    <View
      style={sx(styles.root, style) as any}
      onLayout={(event) => setContainerWidth(event.nativeEvent.layout.width)}
      {...others}
    >
      {/* Hidden strip measures intrinsic sizes before clamping */}
      <View style={styles.measure} pointerEvents="none">
        {data.map((item, index) => (
          <View
            key={`measure-${keyOf(item, index)}`}
            onLayout={(event) => {
              itemWidths.current[index] = event.nativeEvent.layout.width;
              const filled = itemWidths.current.filter(
                (width) => width !== undefined
              ).length;
              setMeasuredCount(filled);
            }}
          >
            {renderItem(item, index)}
          </View>
        ))}
        <View
          onLayout={(event) =>
            setOverflowWidth(event.nativeEvent.layout.width)
          }
        >
          {overflowNode(data)}
        </View>
      </View>

      {!fromEnd && hiddenItems.length > 0 && overflowNode(hiddenItems)}
      {visibleItems.map((item, index) => {
        const dataIndex = fromEnd ? index : data.length - visibleCount + index;
        return (
          <React.Fragment key={keyOf(item, dataIndex)}>
            {renderItem(item, dataIndex)}
          </React.Fragment>
        );
      })}
      {fromEnd && hiddenItems.length > 0 && overflowNode(hiddenItems)}
    </View>
  );
}

OverflowList.displayName = 'OverflowList';
