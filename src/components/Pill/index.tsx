import React, { forwardRef } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { BoxView } from '../BoxView';
import { Text } from '../Text';
import type {
  DefaultProps,
  MantineNumberSize,
  MantineSize,
} from '../../theme/types';
import { useComponentDefaultProps } from '../../theme/theme-provider';
import { createStyles } from '../../theme';
import { rem } from '../../theme/utils/rem';

const PILL_SIZES = {
  xs: { height: rem(18), fontSize: rem(10), paddingHorizontal: rem(8) },
  sm: { height: rem(22), fontSize: rem(11), paddingHorizontal: rem(10) },
  md: { height: rem(25), fontSize: rem(12), paddingHorizontal: rem(12) },
  lg: { height: rem(28), fontSize: rem(14), paddingHorizontal: rem(14) },
  xl: { height: rem(32), fontSize: rem(16), paddingHorizontal: rem(16) },
};

export interface PillProps extends DefaultProps {
  /** Pill content */
  children?: React.ReactNode;

  /** Controls pill height, font size and padding */
  size?: MantineSize;

  /** If set, the remove button is displayed */
  withRemoveButton?: boolean;

  /** Called when the remove button is pressed */
  onRemove?: () => void;

  /** Props passed to the remove button */
  removeButtonProps?: Record<string, any>;

  /** If set, pill is displayed with disabled styles */
  disabled?: boolean;

  /** Key of theme.radius or any valid value to set border-radius */
  radius?: MantineNumberSize;

  /** Text style */
  textStyle?: any;
}

const useStyles = createStyles(
  (
    theme,
    {
      size,
      radius,
      disabled,
    }: {
      size: MantineSize;
      radius: MantineNumberSize;
      disabled: boolean;
    }
  ) => {
    const sizeStyles = PILL_SIZES[size as keyof typeof PILL_SIZES] || PILL_SIZES.md;

    return {
      root: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        height: sizeStyles.height,
        paddingHorizontal: sizeStyles.paddingHorizontal,
        borderRadius: theme.fn.radius(radius) as number,
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.fn.themeColor('dark', 7)
            : theme.fn.themeColor('gray', 1),
        ...(disabled && { opacity: 0.6 }),
      },
      label: {
        fontSize: sizeStyles.fontSize,
        lineHeight: sizeStyles.fontSize * 1.4,
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      },
      removeButton: {
        marginLeft: rem(4),
        marginRight: -rem(4),
        width: sizeStyles.fontSize * 1.4,
        height: sizeStyles.fontSize * 1.4,
        borderRadius: sizeStyles.fontSize * 0.7,
        alignItems: 'center',
        justifyContent: 'center',
      },
      removeButtonLabel: {
        fontSize: sizeStyles.fontSize * 1.2,
        lineHeight: sizeStyles.fontSize * 1.3,
        color:
          theme.colorScheme === 'dark'
            ? theme.fn.themeColor('dark', 1)
            : theme.fn.themeColor('gray', 6),
      },
    };
  }
);

const defaultProps: Partial<PillProps> = {
  size: 'md',
  radius: 'xl',
  withRemoveButton: false,
  disabled: false,
};

interface PillComponent
  extends React.ForwardRefExoticComponent<
    PillProps & React.RefAttributes<View>
  > {
  Group: typeof PillGroup;
}

/**
 * Pill displays a removable tag. Port of Mantine v7 Pill component.
 */
export const Pill = forwardRef<View, PillProps>((props, ref) => {
  const {
    children,
    size,
    withRemoveButton,
    onRemove,
    removeButtonProps,
    disabled,
    radius,
    style,
    textStyle,
    ...others
  } = useComponentDefaultProps('Pill', defaultProps, props);

  const { styles, sx } = useStyles(
    {
      size: size ?? 'md',
      radius: radius ?? 'xl',
      disabled: disabled ?? false,
    },
    { name: 'Pill', size }
  );

  return (
    <BoxView ref={ref} style={sx(styles.root, style)} {...others}>
      {typeof children === 'string' || typeof children === 'number' ? (
        <Text style={sx(styles.label, textStyle)} numberOfLines={1}>
          {children}
        </Text>
      ) : (
        children
      )}
      {withRemoveButton && (
        <TouchableOpacity
          style={styles.removeButton}
          onPress={disabled ? undefined : onRemove}
          disabled={disabled}
          accessibilityRole="button"
          accessibilityLabel="Remove"
          accessibilityHint={
            typeof children === 'string' || typeof children === 'number'
              ? `Removes ${children}`
              : undefined
          }
          accessibilityState={{ disabled: !!disabled }}
          hitSlop={{ top: 4, bottom: 4, left: 4, right: 4 }}
          {...removeButtonProps}
        >
          <Text style={styles.removeButtonLabel}>×</Text>
        </TouchableOpacity>
      )}
    </BoxView>
  );
}) as PillComponent;

Pill.displayName = 'Pill';

export interface PillGroupProps extends DefaultProps {
  /** Pill components */
  children?: React.ReactNode;

  /** Controls size of all pills inside the group */
  size?: MantineSize;

  /** Gap between pills */
  gap?: MantineNumberSize;

  /** If set, all pills inside the group are disabled */
  disabled?: boolean;
}

const useGroupStyles = createStyles(
  (theme, { gap }: { gap: MantineNumberSize }) => ({
    root: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      gap:
        typeof gap === 'number'
          ? gap
          : (theme.spacing[gap as MantineSize] ?? theme.spacing.xs) / 2,
    },
  })
);

const defaultGroupProps: Partial<PillGroupProps> = {
  gap: 'xs',
};

export const PillGroup = forwardRef<View, PillGroupProps>((props, ref) => {
  const { children, size, gap, disabled, style, ...others } =
    useComponentDefaultProps('PillGroup', defaultGroupProps, props);

  const { styles, sx } = useGroupStyles(
    { gap: gap ?? 'xs' },
    { name: 'PillGroup' }
  );

  const enhancedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && (child.type as any) === Pill) {
      return React.cloneElement<PillProps>(
        child as React.ReactElement<PillProps>,
        {
          size: (child.props as PillProps).size ?? size,
          disabled: (child.props as PillProps).disabled ?? disabled,
        }
      );
    }
    return child;
  });

  return (
    <BoxView ref={ref} style={sx(styles.root, style)} {...others}>
      {enhancedChildren}
    </BoxView>
  );
});

PillGroup.displayName = 'Pill.Group';

Pill.Group = PillGroup;
