import React, { forwardRef, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { BoxView } from '../BoxView';
import { Text } from '../Text';
import type { DefaultProps, MantineColor, MantineSize } from '../../theme/types';
import { useComponentDefaultProps } from '../../theme/theme-provider';
import { createStyles } from '../../theme';
import { rem } from '../../theme/utils/rem';

export interface RatingProps extends DefaultProps {
  /** Rating value (controlled) */
  value?: number;

  /** Default value (uncontrolled) */
  defaultValue?: number;

  /** Called when value changes */
  onChange?: (value: number) => void;

  /** Number of rating items */
  count?: number;

  /** Rating size */
  size?: MantineSize;

  /** Rating color */
  color?: MantineColor;

  /** Empty symbol color */
  emptyColor?: MantineColor;

  /** Custom symbol (e.g., custom icon) */
  symbol?: React.ReactNode;

  /** Empty symbol */
  emptySymbol?: React.ReactNode;

  /** Allow fractional ratings for display (not input) */
  fractions?: number;

  /** Read-only mode */
  readOnly?: boolean;

  /** Highlighted on hover state */
  highlightSelectedOnly?: boolean;

  /** Additional styles */
  style?: any;
}

const sizes = {
  xs: rem(14),
  sm: rem(18),
  md: rem(24),
  lg: rem(32),
  xl: rem(40),
};

const useStyles = createStyles(
  (
    theme,
    {
      color,
      emptyColor,
    }: {
      color: MantineColor;
      emptyColor: MantineColor;
      readOnly: boolean;
    },
    { size }
  ) => {
    const sizeValue = sizes[size as keyof typeof sizes] || sizes.md;

    return {
      root: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      symbolWrapper: {
        marginHorizontal: rem(2) as any,
      },
      symbol: {
        fontSize: sizeValue as any,
        lineHeight: sizeValue as any,
      },
      symbolFilled: {
        color: theme.fn.themeColor(color, 6),
      },
      symbolEmpty: {
        color: theme.fn.themeColor(emptyColor, 3),
      },
      symbolHovered: {
        opacity: 0.6,
      },
    };
  }
) as any;

const defaultProps: Partial<RatingProps> = {
  count: 5,
  size: 'md',
  color: 'yellow',
  emptyColor: 'gray',
  fractions: 1,
  readOnly: false,
  highlightSelectedOnly: false,
};

const StarSymbol = ({ filled }: { filled: boolean }) => {
  return <Text>{filled ? '★' : '☆'}</Text>;
};

export const Rating = forwardRef<any, RatingProps>((props, ref) => {
  const {
    value: controlledValue,
    defaultValue,
    onChange,
    count,
    size,
    color,
    emptyColor,
    symbol,
    emptySymbol,
    fractions,
    readOnly,
    highlightSelectedOnly,
    style,
    ...others
  } = useComponentDefaultProps('Rating', defaultProps, props);

  const { styles, sx } = useStyles(
    { color, emptyColor, readOnly },
    { name: 'Rating', size }
  ) as any;

  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue ?? 0);
  const [hoveredValue, setHoveredValue] = useState(-1);

  const value = controlledValue !== undefined ? controlledValue : uncontrolledValue;

  const handleClick = (index: number) => {
    if (readOnly) return;

    const newValue = index + 1;
    if (controlledValue === undefined) {
      setUncontrolledValue(newValue);
    }
    onChange?.(newValue);
  };

  const renderSymbol = (index: number) => {
    const currentValue = hoveredValue >= 0 && !highlightSelectedOnly ? hoveredValue : value;
    const isActive = index < currentValue;

    // For fractional ratings, calculate fill percentage
    const fillPercentage =
      index < Math.floor(currentValue)
        ? 1
        : index === Math.floor(currentValue)
        ? currentValue % 1
        : 0;

    const isHovered = hoveredValue >= 0 && index <= hoveredValue;

    const symbolContent = symbol || <StarSymbol filled={isActive} />;
    const emptySymbolContent = emptySymbol || <StarSymbol filled={false} />;

    return (
      <TouchableOpacity
        key={index}
        onPress={() => handleClick(index)}
        onPressIn={() => !readOnly && setHoveredValue(index)}
        onPressOut={() => !readOnly && setHoveredValue(-1)}
        disabled={readOnly}
        style={styles.symbolWrapper}
        activeOpacity={0.7}
      >
        <BoxView>
          {fillPercentage > 0 ? (
            <Text
              style={[
                styles.symbol,
                styles.symbolFilled,
                isHovered && !highlightSelectedOnly && styles.symbolHovered,
              ]}
            >
              {symbolContent}
            </Text>
          ) : (
            <Text
              style={[
                styles.symbol,
                styles.symbolEmpty,
                isHovered && !highlightSelectedOnly && styles.symbolHovered,
              ]}
            >
              {emptySymbolContent}
            </Text>
          )}
        </BoxView>
      </TouchableOpacity>
    );
  };

  return (
    <BoxView ref={ref} style={sx(styles.root, style)} {...others}>
      {Array.from({ length: count ?? defaultProps.count ?? 5 }, (_, index) => renderSymbol(index))}
    </BoxView>
  );
});

Rating.displayName = 'Rating';
