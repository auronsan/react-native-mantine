import React, { forwardRef } from 'react';
import { TouchableOpacity } from 'react-native';
import { BoxView } from '../BoxView';
import { Text } from '../Text';
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

export interface ChipProps extends DefaultProps {
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
  xs: { height: rem(24) as any, fontSize: rem(10), paddingHorizontal: rem(8) as any },
  sm: { height: rem(28) as any, fontSize: rem(12), paddingHorizontal: rem(10) as any },
  md: { height: rem(32) as any, fontSize: rem(14), paddingHorizontal: rem(12) as any },
  lg: { height: rem(36) as any, fontSize: rem(16), paddingHorizontal: rem(14) as any },
  xl: { height: rem(42) as any, fontSize: rem(18), paddingHorizontal: rem(16) as any },
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
    const colors = theme.colors[color] || theme.colors[theme.primaryColor];
    const sizeStyles = sizes[size as keyof typeof sizes] || sizes.md;

    const getVariantStyles = () => {
      if (!checked) {
        return {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark?.[6] : theme.colors.gray?.[1],
          borderWidth: 1,
          borderColor:
            theme.colorScheme === 'dark' ? theme.colors.dark?.[4] : theme.colors.gray?.[4],
        };
      }

      switch (variant) {
        case 'filled':
          return {
            backgroundColor: colors?.[6] || colors?.[5] || theme.primaryBgColor,
            borderWidth: 0,
          };
        case 'outline':
          return {
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderColor: colors?.[6] || colors?.[5] || theme.primaryBgColor,
          };
        case 'light':
          return {
            backgroundColor:
              theme.colorScheme === 'dark'
                ? theme.fn.rgba(colors?.[9] || theme.primaryBgColor, 0.25)
                : colors?.[0] || (theme.colors.gray || [])[1],
            borderWidth: 0,
          };
        default:
          return {
            backgroundColor: colors?.[6] || colors?.[5] || theme.primaryBgColor,
            borderWidth: 0,
          };
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
          return colors?.[6] || colors?.[5] || theme.primaryBgColor;
        default:
          return theme.white;
      }
    };

    return {
      root: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: sizeStyles.height as any,
        paddingHorizontal: sizeStyles.paddingHorizontal as any,
        borderRadius: theme.fn.radius(radius),
        ...getVariantStyles(),
        ...(disabled && {
          opacity: 0.6,
        }),
      },
      icon: {
        marginRight: rem(6) as any,
      },
      text: {
        fontSize: sizeStyles.fontSize as any,
        fontWeight: (checked ? '600' : '500') as any,
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
    style,
    textStyle,
    value,
    type,
    ...others
  } = useComponentDefaultProps('Chip', defaultProps, props);

  const [uncontrolledChecked, setUncontrolledChecked] = React.useState(defaultChecked || false);

  const checked = controlledChecked !== undefined ? controlledChecked : uncontrolledChecked;

  const { styles, sx} = useStyles(
    { size, color, radius, variant, checked, disabled },
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

  return (
    <TouchableOpacity
      ref={ref}
      style={sx(styles.root, style)}
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.7}
      {...others}
    >
      {showIcon && <BoxView style={styles.icon}>{icon}</BoxView>}
      <Text style={sx(styles.text, textStyle)}>{children}</Text>
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

  const value = controlledValue !== undefined ? controlledValue : uncontrolledValue;

  const { styles, sx } = useGroupStyles({ spacing}, { name: 'ChipGroup' }) as any;

  const handleChipChange = (chipValue: string, checked: boolean) => {
    let newValue: string | string[];

    if (multiple) {
      const currentArray = Array.isArray(value) ? value : [];
      newValue = checked
        ? [...currentArray, chipValue]
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
    if (multiple && Array.isArray(value)) {
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
