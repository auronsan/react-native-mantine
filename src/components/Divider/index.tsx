import React, { forwardRef } from 'react';
import { BoxView } from '../BoxView';
import { Text } from '../Text';
import type { DefaultProps, MantineColor } from '../../theme/types';
import { useComponentDefaultProps } from '../../theme/theme-provider';
import { createStyles } from '../../theme';
import { rem } from '../../theme/utils/rem';

export interface DividerProps extends DefaultProps {
  /** Line orientation */
  orientation?: 'horizontal' | 'vertical';

  /** Line color from theme */
  color?: MantineColor;

  /** Line thickness */
  size?: number | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  /** Divider label */
  label?: React.ReactNode;

  /** Label position */
  labelPosition?: 'left' | 'center' | 'right';

  /** Divider variant */
  variant?: 'solid' | 'dashed' | 'dotted';

  /** Additional styles */
  style?: any;
}

const sizes = {
  xs: rem(1),
  sm: rem(2),
  md: rem(3),
  lg: rem(4),
  xl: rem(5),
};

const useStyles = createStyles(
  (
    theme,
    {
      orientation,
      color,
      size,
      variant,
      labelPosition,
    }: {
      orientation: 'horizontal' | 'vertical';
      color?: MantineColor;
      size: number | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
      variant: 'solid' | 'dashed' | 'dotted';
      labelPosition: 'left' | 'center' | 'right';
    }
  ) => {
    const lineColor =
      color && theme.colors[color]
        ? (theme.colors[color] || [])[3]
        : theme.colorScheme === 'dark'
        ? (theme.colors.dark || [])[4]
        : (theme.colors.gray || [])[3];

    const lineSize = typeof size === 'number' ? rem(size) : sizes[size as keyof typeof sizes] || sizes.sm;

    const getBorderStyle = () => {
      if (variant === 'dashed') {
        return 'dashed';
      }
      if (variant === 'dotted') {
        return 'dotted';
      }
      return 'solid';
    };

    const isHorizontal = orientation === 'horizontal';

    return {
      root: {
        flexDirection: isHorizontal ? 'row' : 'column',
        alignItems: 'center',
        ...(isHorizontal
          ? { width: '100%', height: lineSize as any }
          : { height: '100%', width: lineSize as any }),
      } as any,
      line: {
        ...(isHorizontal
          ? {
              height: lineSize as any,
              borderBottomWidth: lineSize as any,
              borderBottomColor: lineColor,
              borderStyle: getBorderStyle(),
            }
          : {
              width: lineSize as any,
              borderLeftWidth: lineSize as any,
              borderLeftColor: lineColor,
              borderStyle: getBorderStyle(),
            }),
      } as any,
      withLabel: {
        flex: 1,
      },
      labelContainer: {
        paddingHorizontal: isHorizontal ? theme.spacing.xs : 0,
        paddingVertical: isHorizontal ? 0 : theme.spacing.xs,
      },
      label: {
        fontSize: theme.fontSizes.sm as number,
        color: theme.colorScheme === 'dark' ? (theme.colors.dark || [])[1] : (theme.colors.gray || [])[7],
      },
      lineLeft: {
        ...(labelPosition === 'left' ? { flex: 0.3 } : { flex: 1 }),
      },
      lineRight: {
        ...(labelPosition === 'right' ? { flex: 0.3 } : { flex: 1 }),
      },
    };
  }
);

const defaultProps: Partial<DividerProps> = {
  orientation: 'horizontal',
  size: 'sm',
  labelPosition: 'center',
  variant: 'solid',
};

export const Divider = forwardRef<any, DividerProps>((props, ref) => {
  const {
    orientation,
    color,
    size,
    label,
    labelPosition,
    variant,
    style,
    ...others
  } = useComponentDefaultProps('Divider', defaultProps, props);

  const { styles, sx} = useStyles(
    { orientation, color, size, variant, labelPosition },
    { name: 'Divider' }
  ) as any;

  if (!label) {
    return <BoxView ref={ref} style={sx(styles.root, styles.line, style)} {...others} />;
  }

  return (
    <BoxView ref={ref} style={sx(styles.root, style)} {...others}>
      <BoxView style={[styles.line, styles.withLabel, styles.lineLeft]} />
      <BoxView style={styles.labelContainer}>
        {typeof label === 'string' ? <Text style={styles.label}>{label}</Text> : label}
      </BoxView>
      <BoxView style={[styles.line, styles.withLabel, styles.lineRight]} />
    </BoxView>
  );
});

Divider.displayName = 'Divider';
