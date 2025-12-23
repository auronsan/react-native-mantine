import React, { forwardRef } from 'react';
import { TouchableOpacity } from 'react-native';
import { BoxView } from '../BoxView';
import { Text } from '../Text';
import type { DefaultProps, MantineColor, MantineNumberSize, MantineSize } from '../../theme/types';
import { useComponentDefaultProps, useTheme } from '../../theme/theme-provider';
import { createStyles } from '../../theme';
import { rem } from '../../theme/utils/rem';

export interface PaginationProps extends DefaultProps {
  /** Current page (controlled) */
  value?: number;

  /** Default page (uncontrolled) */
  defaultValue?: number;

  /** Called when page changes */
  onChange?: (page: number) => void;

  /** Total number of pages */
  total: number;

  /** Pagination size */
  size?: MantineSize;

  /** Pagination color */
  color?: MantineColor;

  /** Key of theme.radius or any valid value to set border-radius */
  radius?: MantineNumberSize;

  /** Number of siblings on each side of selected page */
  siblings?: number;

  /** Number of elements visible on each side of selected page */
  boundaries?: number;

  /** Show first/last controls */
  withControls?: boolean;

  /** Show previous/next controls */
  withEdges?: boolean;

  /** Disabled state */
  disabled?: boolean;

  /** Custom icons */
  previousIcon?: React.ReactNode;
  nextIcon?: React.ReactNode;
  firstIcon?: React.ReactNode;
  lastIcon?: React.ReactNode;

  /** Additional styles */
  style?: any;
}

const sizes = {
  xs: { height: rem(24), minWidth: rem(24), fontSize: rem(10), padding: rem(4) },
  sm: { height: rem(28), minWidth: rem(28), fontSize: rem(12), padding: rem(6) },
  md: { height: rem(32), minWidth: rem(32), fontSize: rem(14), padding: rem(8) },
  lg: { height: rem(38), minWidth: rem(38), fontSize: rem(16), padding: rem(10) },
  xl: { height: rem(44), minWidth: rem(44), fontSize: rem(18), padding: rem(12) },
};

const useStyles = createStyles(
  (
    theme,
    {
      color,
      radius,
      disabled,
    }: {
      color: MantineColor;
      radius: MantineNumberSize;
      disabled: boolean;
    },
    { size }
  ) => {
    const colors = theme.colors[color] || theme.colors[theme.primaryColor];
    const sizeStyles = sizes[size] || sizes.md;

    return {
      root: {
        flexDirection: 'row',
        alignItems: 'center',
        opacity: disabled ? 0.5 : 1,
      },
      item: {
        height: sizeStyles.height,
        minWidth: sizeStyles.minWidth,
        paddingHorizontal: sizeStyles.padding,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: theme.fn.radius(radius),
        marginHorizontal: rem(2),
        borderWidth: 1,
        borderColor: 'transparent',
      },
      itemDefault: {
        backgroundColor: 'transparent',
        borderColor: theme.colorScheme === 'dark' ? theme.colors.dark?.[4] : theme.colors.gray?.[3],
      },
      itemActive: {
        backgroundColor: colors?.[6] || colors?.[5] || theme.primaryBgColor,
        borderColor: colors?.[6] || colors?.[5] || theme.primaryBgColor,
      },
      itemControl: {
        backgroundColor: 'transparent',
      },
      label: {
        fontSize: sizeStyles.fontSize,
        fontWeight: '500',
      },
      labelDefault: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      },
      labelActive: {
        color: theme.white,
      },
      labelControl: {
        color: theme.colorScheme === 'dark' ? theme.colors.dark?.[1] : theme.colors.gray?.[7],
      },
      labelDisabled: {
        color: theme.colorScheme === 'dark' ? theme.colors.dark?.[3] : theme.colors.gray?.[5],
      },
      dots: {
        paddingHorizontal: rem(8),
      },
    };
  }
);

const defaultProps: Partial<PaginationProps> = {
  size: 'md',
  color: 'blue',
  radius: 'sm',
  siblings: 1,
  boundaries: 1,
  withControls: true,
  withEdges: false,
  disabled: false,
};

const range = (start: number, end: number): number[] => {
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => start + i);
};

const DOTS = 'dots';

export const Pagination = forwardRef<any, PaginationProps>((props, ref) => {
  const {
    value: controlledValue,
    defaultValue,
    onChange,
    total,
    size,
    color,
    radius,
    siblings,
    boundaries,
    withControls,
    withEdges,
    disabled,
    previousIcon,
    nextIcon,
    firstIcon,
    lastIcon,
    style,
    ...others
  } = useComponentDefaultProps('Pagination', defaultProps, props);

  const theme = useTheme();
  const { styles, sx } = useStyles(
    { color, radius, disabled },
    { name: 'Pagination', size }
  ) as any;

  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue ?? 1);
  const value = controlledValue !== undefined ? controlledValue : uncontrolledValue;

  const handlePageChange = (page: number) => {
    if (disabled) return;
    if (page < 1 || page > total) return;

    if (controlledValue === undefined) {
      setUncontrolledValue(page);
    }
    onChange?.(page);
  };

  const paginationRange = React.useMemo(() => {
    const totalPageNumbers = siblings! * 2 + 3 + boundaries! * 2;

    if (totalPageNumbers >= total) {
      return range(1, total);
    }

    const leftSiblingIndex = Math.max(value - siblings!, boundaries! + 1);
    const rightSiblingIndex = Math.min(value + siblings!, total - boundaries!);

    const shouldShowLeftDots = leftSiblingIndex > boundaries! + 2;
    const shouldShowRightDots = rightSiblingIndex < total - (boundaries! + 1);

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = siblings! * 2 + boundaries! + 2;
      return [...range(1, leftItemCount), DOTS, ...range(total - (boundaries! - 1), total)];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = boundaries! + 1 + 2 * siblings!;
      return [...range(1, boundaries!), DOTS, ...range(total - rightItemCount, total)];
    }

    return [
      ...range(1, boundaries!),
      DOTS,
      ...range(leftSiblingIndex, rightSiblingIndex),
      DOTS,
      ...range(total - boundaries! + 1, total),
    ];
  }, [total, value, siblings, boundaries]);

  const renderItem = (page: number | string, index: number) => {
    if (page === DOTS) {
      return (
        <BoxView key={`dots-${index}`} style={styles.dots}>
          <Text style={[styles.label, styles.labelDefault]}>...</Text>
        </BoxView>
      );
    }

    const pageNumber = page as number;
    const isActive = pageNumber === value;

    return (
      <TouchableOpacity
        key={pageNumber}
        style={[styles.item, isActive ? styles.itemActive : styles.itemDefault]}
        onPress={() => handlePageChange(pageNumber)}
        disabled={disabled}
        activeOpacity={0.7}
      >
        <Text style={[styles.label, isActive ? styles.labelActive : styles.labelDefault]}>
          {pageNumber}
        </Text>
      </TouchableOpacity>
    );
  };

  const canGoPrevious = value > 1;
  const canGoNext = value < total;

  return (
    <BoxView ref={ref} style={sx(styles.root, style)} {...others}>
      {withEdges && (
        <TouchableOpacity
          style={[styles.item, styles.itemControl]}
          onPress={() => handlePageChange(1)}
          disabled={disabled || !canGoPrevious}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.label,
              styles.labelControl,
              (!canGoPrevious || disabled) && styles.labelDisabled,
            ]}
          >
            {firstIcon || '<<'}
          </Text>
        </TouchableOpacity>
      )}

      {withControls && (
        <TouchableOpacity
          style={[styles.item, styles.itemControl]}
          onPress={() => handlePageChange(value - 1)}
          disabled={disabled || !canGoPrevious}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.label,
              styles.labelControl,
              (!canGoPrevious || disabled) && styles.labelDisabled,
            ]}
          >
            {previousIcon || '<'}
          </Text>
        </TouchableOpacity>
      )}

      {paginationRange.map(renderItem)}

      {withControls && (
        <TouchableOpacity
          style={[styles.item, styles.itemControl]}
          onPress={() => handlePageChange(value + 1)}
          disabled={disabled || !canGoNext}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.label,
              styles.labelControl,
              (!canGoNext || disabled) && styles.labelDisabled,
            ]}
          >
            {nextIcon || '>'}
          </Text>
        </TouchableOpacity>
      )}

      {withEdges && (
        <TouchableOpacity
          style={[styles.item, styles.itemControl]}
          onPress={() => handlePageChange(total)}
          disabled={disabled || !canGoNext}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.label,
              styles.labelControl,
              (!canGoNext || disabled) && styles.labelDisabled,
            ]}
          >
            {lastIcon || '>>'}
          </Text>
        </TouchableOpacity>
      )}
    </BoxView>
  );
});

Pagination.displayName = 'Pagination';
