import React, { forwardRef } from 'react';
import { View } from 'react-native';
import { BoxView } from '../BoxView';
import { Text } from '../Text';
import type {
  DefaultProps,
  MantineNumberSize,
  Variants,
} from '../../theme/types';
import { useComponentDefaultProps } from '../../theme/theme-provider';
import { createStyles } from '../../theme';
import { rem } from '../../theme/utils/rem';

export interface FieldsetProps extends DefaultProps {
  /** Fieldset content */
  children?: React.ReactNode;

  /** Fieldset legend, displayed on top of the border */
  legend?: React.ReactNode;

  /** Visual variant */
  variant?: Variants<'default' | 'filled' | 'unstyled'>;

  /** Key of theme.radius or any valid value to set border-radius */
  radius?: MantineNumberSize;

  /** Disables all inputs and buttons inside the fieldset */
  disabled?: boolean;

  /** Legend text style */
  legendStyle?: any;
}

const useStyles = createStyles(
  (
    theme,
    {
      radius,
      variant,
      disabled,
    }: {
      radius: MantineNumberSize;
      variant: Variants<'default' | 'filled' | 'unstyled'>;
      disabled: boolean;
    }
  ) => {
    const backgroundColor =
      variant === 'filled'
        ? theme.colorScheme === 'dark'
          ? theme.fn.themeColor('dark', 6)
          : theme.fn.themeColor('gray', 1)
        : theme.colorScheme === 'dark'
          ? theme.fn.themeColor('dark', 7)
          : theme.white;

    const getVariantStyles = () => {
      if (variant === 'unstyled') {
        return {
          borderWidth: 0,
          paddingHorizontal: 0,
          paddingVertical: 0,
          backgroundColor: 'transparent',
        };
      }

      return {
        borderWidth: 1,
        borderColor:
          theme.colorScheme === 'dark'
            ? theme.fn.themeColor('dark', 4)
            : theme.fn.themeColor('gray', 3),
        backgroundColor,
      };
    };

    return {
      root: {
        borderRadius: theme.fn.radius(radius) as number,
        paddingHorizontal: theme.spacing.md,
        paddingTop: theme.spacing.md,
        paddingBottom: theme.spacing.md,
        ...getVariantStyles(),
        ...(disabled && { opacity: 0.6 }),
      },
      legendWrapper: {
        position: 'absolute',
        top: -rem(10),
        left: theme.spacing.sm,
        paddingHorizontal: rem(6),
        backgroundColor:
          variant === 'unstyled' ? 'transparent' : backgroundColor,
        borderRadius: rem(2),
      },
      legend: {
        fontSize: theme.fontSizes.sm as number,
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      },
    };
  }
);

const defaultProps: Partial<FieldsetProps> = {
  variant: 'default',
  radius: 'sm',
  disabled: false,
};

/**
 * Fieldset groups related form elements with an optional legend.
 * Port of Mantine v7 Fieldset component.
 */
export const Fieldset = forwardRef<View, FieldsetProps>((props, ref) => {
  const {
    children,
    legend,
    variant,
    radius,
    disabled,
    style,
    legendStyle,
    ...others
  } = useComponentDefaultProps('Fieldset', defaultProps, props);

  const { styles, sx } = useStyles(
    {
      radius: radius ?? 'sm',
      variant: variant ?? 'default',
      disabled: disabled ?? false,
    },
    { name: 'Fieldset', variant }
  );

  return (
    <BoxView
      ref={ref}
      style={sx(styles.root, legend ? { marginTop: rem(10) } : null, style)}
      accessibilityState={{ disabled: !!disabled }}
      {...others}
    >
      <View pointerEvents={disabled ? 'none' : 'auto'}>{children}</View>
      {legend && (
        <BoxView style={styles.legendWrapper}>
          {typeof legend === 'string' || typeof legend === 'number' ? (
            <Text style={sx(styles.legend, legendStyle)}>{legend}</Text>
          ) : (
            legend
          )}
        </BoxView>
      )}
    </BoxView>
  );
});

Fieldset.displayName = 'Fieldset';
