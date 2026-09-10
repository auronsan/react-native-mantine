import React, { forwardRef, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { BoxView } from '../BoxView';
import { Text } from '../Text';
import type {
  DefaultProps,
  MantineColor,
  MantineNumberSize,
  MantineSize,
} from '../../theme/types';
import { useComponentDefaultProps } from '../../theme/theme-provider';
import { createStyles, getSize } from '../../theme';

export interface TableOfContentsItem {
  /** Unique item id */
  id: string;

  /** Item label */
  value: React.ReactNode;

  /** Nesting depth, 1-based */
  depth: number;
}

export interface TableOfContentsProps extends DefaultProps {
  /** Items to display */
  data: TableOfContentsItem[];

  /** Controlled active item id */
  active?: string;

  /** Initial active item id for uncontrolled usage */
  defaultActive?: string;

  /** Called with the item id when a control is pressed */
  onActiveChange?: (id: string) => void;

  /** Variant of the active control */
  variant?: 'filled' | 'light' | 'none';

  /** Color of the active control */
  color?: MantineColor;

  /** Controls font size and padding */
  size?: MantineSize;

  /** Border radius of controls */
  radius?: MantineNumberSize;

  /** Depth level that is rendered without offset */
  minDepthToOffset?: number;

  /** Offset in px applied for every depth level */
  depthOffset?: number;

  /** Additional props passed down to every control */
  getControlProps?: (payload: {
    active: boolean;
    data: TableOfContentsItem;
  }) => Record<string, any>;
}

const CONTROL_PADDINGS = {
  xs: 4,
  sm: 6,
  md: 8,
  lg: 10,
  xl: 12,
};

const useStyles = createStyles(
  (
    theme,
    { size, radius }: { size: MantineSize; radius: MantineNumberSize }
  ) => ({
    root: {},
    control: {
      paddingVertical: getSize({ size, sizes: CONTROL_PADDINGS }) as number,
      paddingHorizontal: theme.spacing.sm,
      borderRadius: theme.fn.radius(radius),
    },
    label: {
      fontSize: theme.fontSizes[size] as number,
      color: theme.colorScheme === 'dark' ? theme.fn.themeColor('dark', 0) : theme.black,
    },
  })
);

const defaultProps: Partial<TableOfContentsProps> = {
  variant: 'light',
  size: 'md',
  radius: 'sm',
  minDepthToOffset: 1,
  depthOffset: 20,
};

/**
 * TableOfContents displays a list of links to sections with depth offsets.
 * Port of Mantine TableOfContents; instead of tracking scroll position it
 * reports presses via onActiveChange so the consumer can scroll to sections.
 */
export const TableOfContents = forwardRef<View, TableOfContentsProps>(
  (props, ref) => {
    const {
      data,
      active,
      defaultActive,
      onActiveChange,
      variant,
      color,
      size,
      radius,
      minDepthToOffset,
      depthOffset,
      getControlProps,
      style,
      ...others
    } = useComponentDefaultProps('TableOfContents', defaultProps, props);

    const { styles, sx, theme } = useStyles(
      { size: size ?? 'md', radius: radius ?? 'sm' },
      { name: 'TableOfContents' }
    );

    const [internalActive, setInternalActive] = useState<string | undefined>(
      defaultActive
    );
    const activeId = active !== undefined ? active : internalActive;

    const activeColors =
      variant && variant !== 'none'
        ? theme.fn.variant({ variant, color })
        : null;

    const handlePress = (id: string) => {
      if (active === undefined) {
        setInternalActive(id);
      }
      onActiveChange?.(id);
    };

    return (
      <BoxView ref={ref} style={sx(styles.root, style)} {...others}>
        {data.map((item) => {
          const isActive = item.id === activeId;
          const controlProps = getControlProps?.({
            active: isActive,
            data: item,
          });

          return (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.7}
              onPress={() => handlePress(item.id)}
              accessibilityRole="link"
              accessibilityState={{ selected: isActive }}
              accessibilityLabel={
                typeof item.value === 'string' || typeof item.value === 'number'
                  ? String(item.value)
                  : undefined
              }
              {...controlProps}
              style={[
                styles.control,
                {
                  paddingLeft:
                    (theme.spacing.sm as number) +
                    Math.max(0, item.depth - (minDepthToOffset ?? 1)) *
                      (depthOffset ?? 20),
                },
                isActive && activeColors
                  ? { backgroundColor: activeColors.background }
                  : null,
                controlProps?.style,
              ]}
            >
              {typeof item.value === 'string' ||
              typeof item.value === 'number' ? (
                <Text
                  style={[
                    styles.label,
                    isActive && activeColors
                      ? { color: activeColors.color }
                      : null,
                  ]}
                >
                  {item.value}
                </Text>
              ) : (
                item.value
              )}
            </TouchableOpacity>
          );
        })}
      </BoxView>
    );
  }
);

TableOfContents.displayName = 'TableOfContents';
