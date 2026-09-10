import React, { forwardRef } from 'react';
import { TouchableOpacity } from 'react-native';
import { BoxView } from '../BoxView';
import type {
  DefaultProps,
  MantineColor,
  MantineNumberSize,
  MantineSize,
  Variants,
} from '../../theme/types';
import { useComponentDefaultProps } from '../../theme/theme-provider';
import { createStyles } from '../../theme';
import { rem } from '../../theme/utils/rem';
import { withTextWrapper, type WithTextWrapperProps } from '../../theme/utils/withTextWrapper';

export interface ChipProps extends DefaultProps, WithTextWrapperProps {
  /** Chip label */
  children: React.ReactNode;

  /** Chip size */
  size?: MantineSize;

  /** Chip color */
  color?: MantineColor;

  /** Border radius */
  radius?: MantineNumberSize;

  /** Chip variant */
  variant?: Variants<'filled' | 'outline' | 'light'>;

  /** If true, chip will be checked */
  checked?: boolean;

  /** Default checked state (uncontrolled) */
  defaultChecked?: boolean;

  /** Called when checked state changes */
  onChange?: (checked: boolean) => void;

  /** If true, chip will be disabled */
  disabled?: boolean;

  /** Icon to display when checked */
  icon?: React.ReactNode;

  /** Accessibility label */
  accessibilityLabel?: string;

  /** Additional styles */
  style?: any;

  /** Text style */
  textStyle?: any;

  /** Value for chip groups */
  value?: string;

  /** Type of chip */
  type?: 'checkbox' | 'radio';
}

const sizes = {
  xs: { height: rem(24), fontSize: rem(10), paddingHorizontal: rem(8) },
  sm: { height: rem(28), fontSize: rem(12), paddingHorizontal: rem(10) },
  md: { height: rem(32), fontSize: rem(14), paddingHorizontal: rem(12) },
  lg: { height: rem(36), fontSize: rem(16), paddingHorizontal: rem(14) },
  xl: { height: rem(42), fontSize: rem(18), paddingHorizontal: rem(16) },
};

const useStyles = createStyles(
  (
    theme,
    {
      size,
      color,
      radius,
      variant,
      checked,
      disabled,
    }: {
      size: MantineSize;
      color: MantineColor;
      radius: MantineNumberSize;
      variant: Variants<'filled' | 'outline' | 'light'>;
      checked: boolean;
      disabled: boolean;
    }
  ) => {
    const sizeStyles = sizes[size as keyof typeof sizes] || sizes.md;

    const getVariantStyles = () => {
      if (!checked) {
        return {
          backgroundColor: theme.colorScheme === 'dark'
            ? theme.fn.themeColor('dark', 6)
            : theme.fn.themeColor('gray', 1),
          borderWidth: 1,
          borderColor: theme.colorScheme === 'dark'
            ? theme.fn.themeColor('dark', 4)
            : theme.fn.themeColor('gray', 4),
        };
      }

      switch (variant) {
        case 'filled': {
          const variantStyles = theme.fn.variant({ variant: 'filled', color });
          return {
            backgroundColor: variantStyles.background,
            borderWidth: 0,
          };
        }
        case 'outline': {
          const variantStyles = theme.fn.variant({ variant: 'outline', color });
          return {
            backgroundColor: variantStyles.background,
            borderWidth: 1,
            borderColor: variantStyles.border,
          };
        }
        case 'light': {
          return {
            backgroundColor: theme.colorScheme === 'dark'
              ? theme.fn.rgba(theme.fn.themeColor(color || theme.primaryColor, 9), 0.25)
              : theme.fn.themeColor(color || theme.primaryColor, 0),
            borderWidth: 0,
          };
        }
        default: {
          const variantStyles = theme.fn.variant({ variant: 'filled', color });
          return {
            backgroundColor: variantStyles.background,
            borderWidth: 0,
          };
        }
      }
    };

    const getTextColor = () => {
      if (!checked) {
        return theme.colorScheme === 'dark' ? theme.white : theme.black;
      }

      switch (variant) {
        case 'filled':
          return theme.white;
        case 'outline':
        case 'light':
          return theme.fn.themeColor(color || theme.primaryColor);
        default:
          return theme.white;
      }
    };

    return {
      root: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: sizeStyles.height,
        paddingHorizontal: sizeStyles.paddingHorizontal,
        borderRadius: theme.fn.radius(radius),
        ...getVariantStyles(),
        ...(disabled && {
          opacity: 0.6,
        }),
      },
      icon: {
        marginRight: rem(6),
      },
      text: {
        fontSize: sizeStyles.fontSize,
        fontWeight: checked ? '600' : '500',
        color: getTextColor(),
      },
    };
  }
);

const defaultProps: Partial<ChipProps> = {
  size: 'sm',
  color: 'blue',
  radius: 'xl',
  variant: 'filled',
  disabled: false,
  type: 'checkbox',
  withTextWrapper: true,
};

export const Chip = forwardRef<any, ChipProps>((props, ref) => {
  const {
    children,
    size,
    color,
    radius,
    variant,
    checked: controlledChecked,
    defaultChecked,
    onChange,
    disabled,
    icon,
    accessibilityLabel,
    style,
    textStyle,
    value,
    type,
    withTextWrapper: shouldWrapInText,
    ...others
  } = useComponentDefaultProps('Chip', defaultProps, props);

  const [uncontrolledChecked, setUncontrolledChecked] = React.useState(defaultChecked || false);

  const checked = controlledChecked !== undefined ? controlledChecked : uncontrolledChecked;

  const { styles, sx} = useStyles(
    {
      size: size ?? defaultProps.size ?? 'sm',
      color: color ?? defaultProps.color ?? 'blue',
      radius: radius ?? defaultProps.radius ?? 'xl',
      variant: variant ?? defaultProps.variant ?? 'filled',
      checked,
      disabled: disabled ?? defaultProps.disabled ?? false
    },
    { name: 'Chip' }
  ) as any;

  const handlePress = () => {
    if (disabled) return;

    const newChecked = !checked;
    if (controlledChecked === undefined) {
      setUncontrolledChecked(newChecked);
    }
    onChange?.(newChecked);
  };

  const showIcon = checked && icon;

  const defaultAccessibilityLabel =
    accessibilityLabel || (typeof children === 'string' ? children : 'Chip');

  return (
    <TouchableOpacity
      ref={ref}
      style={sx(styles.root, style)}
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.7}
      accessibilityRole={type === 'radio' ? 'radio' : 'checkbox'}
      accessibilityState={{ checked: checked || false, disabled: !!disabled }}
      accessibilityLabel={defaultAccessibilityLabel}
      {...others}
    >
      {showIcon && <BoxView style={styles.icon}>{icon}</BoxView>}
      {withTextWrapper(children, shouldWrapInText, { style: sx(styles.text, textStyle) })}
    </TouchableOpacity>
  );
});

Chip.displayName = 'Chip';

// Chip.Group component for managing multiple chips
export interface ChipGroupProps extends DefaultProps {
  /** Chips */
  children: React.ReactNode;

  /** Selected value(s) */
  value?: string | string[];

  /** Default value(s) */
  defaultValue?: string | string[];

  /** Called when value changes */
  onChange?: (value: string | string[]) => void;

  /** If true, multiple chips can be selected */
  multiple?: boolean;

  /** Additional styles */
  style?: any;

  /** Spacing between chips */
  spacing?: MantineSize;
}

const useGroupStyles = createStyles(
  (
    _theme,
    {
      spacing: _spacing,
    }: {
      spacing: MantineSize;
    }
  ) => ({
    root: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
  })
);

const defaultGroupProps: Partial<ChipGroupProps> = {
  multiple: false,
  spacing: 'sm',
};

export const ChipGroup = forwardRef<any, ChipGroupProps>((props, ref) => {
  const {
    children,
    value: controlledValue,
    defaultValue,
    onChange,
    multiple,
    style,
    spacing,
    ...otherProps
  } = useComponentDefaultProps('ChipGroup', defaultGroupProps, props);

  const [uncontrolledValue, setUncontrolledValue] = React.useState<string | string[]>(
    defaultValue || (multiple ? [] : '')
  );

  const rawValue = controlledValue !== undefined ? controlledValue : uncontrolledValue;

  // In multiple mode the group always works with an array. A stray non-array
  // value (a type-level mistake) is normalized: '' / null / undefined mean
  // "nothing selected", any other string is treated as a single selection.
  const value: string | string[] = multiple
    ? Array.isArray(rawValue)
      ? rawValue
      : rawValue
        ? [rawValue]
        : []
    : rawValue;

  const { styles, sx } = useGroupStyles(
    { spacing: spacing ?? defaultGroupProps.spacing ?? 'sm' },
    { name: 'ChipGroup' }
  ) as any;

  const handleChipChange = (chipValue: string, checked: boolean) => {
    let newValue: string | string[];

    if (multiple) {
      const currentArray = Array.isArray(value) ? value : [];
      newValue = checked
        ? currentArray.includes(chipValue)
          ? currentArray
          : [...currentArray, chipValue]
        : currentArray.filter((v) => v !== chipValue);
    } else {
      newValue = checked ? chipValue : '';
    }

    if (controlledValue === undefined) {
      setUncontrolledValue(newValue);
    }
    onChange?.(newValue);
  };

  const isChecked = (chipValue: string) => {
    if (Array.isArray(value)) {
      return value.includes(chipValue);
    }
    return value === chipValue;
  };

  const enhancedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && (child.type as any) === Chip) {
      const chipValue = (child.props as ChipProps).value;
      if (chipValue !== undefined) {
        return React.cloneElement<ChipProps>(child as React.ReactElement<ChipProps>, {
          checked: isChecked(chipValue),
          onChange: (checked: boolean) => handleChipChange(chipValue, checked),
        });
      }
    }
    return child;
  });

  return (
    <BoxView ref={ref} style={sx(styles.root, style)} {...otherProps}>
      {enhancedChildren}
    </BoxView>
  );
});

ChipGroup.displayName = 'Chip.Group';

// Attach Group to Chip
(Chip as any).Group = ChipGroup;
