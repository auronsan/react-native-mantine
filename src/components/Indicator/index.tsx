import React, { forwardRef } from 'react';
import { BoxView } from '../BoxView';
import { Text } from '../Text';
import type {
  DefaultProps,
  MantineColor,
  MantineNumberSize,
  MantineSize,
} from '../../theme/types';
import { useComponentDefaultProps } from '../../theme/theme-provider';
import { createStyles } from '../../theme';
import { rem } from '../../theme/utils/rem';

export interface IndicatorProps extends DefaultProps {
  /** Indicator color from theme */
  color?: MantineColor;

  /** Indicator size */
  size?: MantineSize | number;

  /** Indicator border radius */
  radius?: MantineNumberSize;

  /** If true, indicator will have a border */
  withBorder?: boolean;

  /** Indicator position */
  position?:
    | 'top-start'
    | 'top-end'
    | 'bottom-start'
    | 'bottom-end'
    | 'top-center'
    | 'bottom-center'
    | 'middle-start'
    | 'middle-end'
    | 'middle-center';

  /** Indicator offset */
  offset?: number;

  /** Indicator label */
  label?: React.ReactNode;

  /** Disable indicator */
  disabled?: boolean;

  /** If true, indicator will render a dot instead of a badge */
  inline?: boolean;

  /** If true, indicator will process its children */
  processing?: boolean;

  /** If true, indicator will have a pulsing animation */
  withPulse?: boolean;

  /** Children wrapped by indicator */
  children?: React.ReactNode;

  /** Additional styles */
  style?: any;
}

const sizes = {
  xs: rem(6),
  sm: rem(8),
  md: rem(10),
  lg: rem(12),
  xl: rem(16),
};

const useStyles = createStyles(
  (
    theme,
    {
      color,
      size,
      radius,
      withBorder,
      position,
      offset,
      disabled,
      inline,
    }: {
      color: MantineColor;
      size: MantineSize | number;
      radius: MantineNumberSize;
      withBorder: boolean;
      position: string;
      offset: number;
      disabled: boolean;
      inline: boolean;
    }
  ) => {
    const colors = theme.colors[color] || theme.colors[theme.primaryColor];
    const indicatorSize =
      typeof size === 'number' ? rem(size) : sizes[size as keyof typeof sizes] || sizes.md;

    const getPositionStyles = (): any => {
      const offsetValue = offset || 0;
      switch (position) {
        case 'top-start':
          return { top: offsetValue, left: offsetValue };
        case 'top-end':
          return { top: offsetValue, right: offsetValue };
        case 'bottom-start':
          return { bottom: offsetValue, left: offsetValue };
        case 'bottom-end':
          return { bottom: offsetValue, right: offsetValue };
        case 'top-center':
          return {
            top: offsetValue,
            left: '50%',
            transform: [{ translateX: -(typeof indicatorSize === 'number' ? indicatorSize : 10) / 2 }],
          };
        case 'bottom-center':
          return {
            bottom: offsetValue,
            left: '50%',
            transform: [{ translateX: -(typeof indicatorSize === 'number' ? indicatorSize : 10) / 2 }],
          };
        case 'middle-start':
          return {
            top: '50%',
            left: offsetValue,
            transform: [{ translateY: -(typeof indicatorSize === 'number' ? indicatorSize : 10) / 2 }],
          };
        case 'middle-end':
          return {
            top: '50%',
            right: offsetValue,
            transform: [{ translateY: -(typeof indicatorSize === 'number' ? indicatorSize : 10) / 2 }],
          };
        case 'middle-center':
          return {
            top: '50%',
            left: '50%',
            transform: [
              { translateX: -(typeof indicatorSize === 'number' ? indicatorSize : 10) / 2 },
              { translateY: -(typeof indicatorSize === 'number' ? indicatorSize : 10) / 2 },
            ],
          };
        default:
          return { top: offsetValue, right: offsetValue };
      }
    };

    return {
      root: {
        position: 'relative',
        display: 'flex',
      },
      indicator: {
        ...(!inline && {
          position: 'absolute',
          zIndex: 1,
          ...getPositionStyles(),
        }),
        width: indicatorSize,
        height: indicatorSize,
        borderRadius: theme.fn.radius(radius),
        backgroundColor: disabled
          ? theme.colors.gray?.[5] || theme.colors.gray?.[6]
          : colors?.[6] || colors?.[5] || theme.primaryBgColor,
        ...(withBorder && {
          borderWidth: 2,
          borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        }),
        alignItems: 'center',
        justifyContent: 'center',
        opacity: disabled ? 0.5 : 1,
      },
      label: {
        fontSize: rem(10),
        fontWeight: '700',
        color: theme.white,
      },
    };
  }
);

const defaultProps: Partial<IndicatorProps> = {
  color: 'red',
  size: 'md',
  radius: 'xl',
  withBorder: false,
  position: 'top-end',
  offset: 0,
  disabled: false,
  inline: false,
  processing: false,
  withPulse: false,
};

export const Indicator = forwardRef<any, IndicatorProps>((props, ref) => {
  const {
    color,
    size,
    radius,
    withBorder,
    position,
    offset,
    label,
    disabled,
    inline,
    processing,
    withPulse,
    children,
    style,
    ...others
  } = useComponentDefaultProps('Indicator', defaultProps, props);

  const { styles, sx } = useStyles(
    { color, size, radius, withBorder, position, offset, disabled, inline },
    { name: 'Indicator' }
  ) as any;

  const indicator = (
    <BoxView style={styles.indicator}>
      {label && typeof label === 'string' ? (
        <Text style={styles.label}>{label}</Text>
      ) : (
        label
      )}
    </BoxView>
  );

  if (inline) {
    return indicator;
  }

  return (
    <BoxView ref={ref} style={sx(styles.root, style)} {...others}>
      {indicator}
      {children}
    </BoxView>
  );
});

Indicator.displayName = 'Indicator';
