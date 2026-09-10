import React, { forwardRef } from 'react';
import { Switch as RNSwitch, Platform } from 'react-native';
import { BoxView } from '../BoxView';
import { Text } from '../Text';
import type { DefaultProps, MantineColor, MantineSize } from '../../theme/types';
import { useComponentDefaultProps, useTheme } from '../../theme/theme-provider';
import { createStyles } from '../../theme';

/**
 * Props for the Switch component
 *
 * @property {React.ReactNode} [label] - Label text displayed next to the switch
 * @property {MantineSize} [size] - Switch size (xs, sm, md, lg, xl)
 * @property {MantineColor} [color] - Switch color from theme when checked
 * @property {'left' | 'right'} [labelPosition] - Position of label relative to switch
 * @property {boolean} [checked] - Controlled checked state
 * @property {(value: boolean) => void} [onChange] - Callback fired when switch state changes
 * @property {boolean} [disabled] - Disables switch interaction
 * @property {string} [accessibilityLabel] - Label for screen readers
 * @property {any} [style] - Additional style overrides for the switch
 * @property {any} [wrapperStyle] - Style overrides for the wrapper container
 */
export interface SwitchProps extends DefaultProps {
  /** Switch label */
  label?: React.ReactNode;

  /** Switch size */
  size?: MantineSize;

  /** Switch color from theme */
  color?: MantineColor;

  /** Label position */
  labelPosition?: 'left' | 'right';

  /** Checked state (controlled component) */
  checked?: boolean;

  /** Called when switch state changes */
  onChange?: (value: boolean) => void;

  /** Disabled state */
  disabled?: boolean;

  /** Accessibility label */
  accessibilityLabel?: string;

  /** Additional styles */
  style?: any;

  /** Wrapper style */
  wrapperStyle?: any;
}

const sizes = {
  xs: { scale: 0.6 },
  sm: { scale: 0.8 },
  md: { scale: 1 },
  lg: { scale: 1.2 },
  xl: { scale: 1.5 },
};

const useStyles = createStyles(
  (
    theme,
    {
      labelPosition,
      size,
    }: {
      labelPosition: 'left' | 'right';
      size: MantineSize;
    }
  ) => {
    const sizeStyles = sizes[size as keyof typeof sizes] || sizes.md;

    return {
      root: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      label: {
        fontSize: theme.fontSizes.sm as number,
        color: theme.colorScheme === 'dark' ? theme.fn.themeColor('dark', 0) : theme.black,
        marginLeft: labelPosition === 'right' ? theme.spacing.sm : 0,
        marginRight: labelPosition === 'left' ? theme.spacing.sm : 0,
      },
      switch: {
        transform: [{ scale: sizeStyles.scale }],
      },
    };
  }
) as any;

const defaultProps: Partial<SwitchProps> = {
  size: 'md',
  color: 'blue',
  labelPosition: 'right',
  disabled: false,
};

/**
 * Switch component for React Native Mantine
 *
 * A toggle switch component for binary on/off states. Supports customizable sizes,
 * colors, labels, and label positioning. Built on React Native's native Switch
 * component with Mantine theming.
 *
 * @example
 * ```tsx
 * // Basic switch
 * <Switch checked={enabled} onChange={setEnabled} />
 *
 * // With label
 * <Switch
 *   label="Enable notifications"
 *   checked={notifications}
 *   onChange={setNotifications}
 * />
 *
 * // Custom color and size
 * <Switch
 *   label="Dark mode"
 *   labelPosition="left"
 *   color="violet"
 *   size="lg"
 *   checked={darkMode}
 *   onChange={setDarkMode}
 * />
 * ```
 */
export const Switch = forwardRef<any, SwitchProps>((props, ref) => {
  const {
    label,
    size,
    color,
    labelPosition,
    checked,
    onChange,
    disabled,
    accessibilityLabel,
    style,
    wrapperStyle,
    ...others
  } = useComponentDefaultProps('Switch', defaultProps, props);

  const theme = useTheme();
  const { styles, sx } = useStyles({ labelPosition, size }, { name: 'Switch' }) as any;

  const handleChange = (value: boolean) => {
    if (!disabled) {
      onChange?.(value);
    }
  };

  const colorKey = color || theme.primaryColor;
  const falseColor = theme.colorScheme === 'dark' ? theme.fn.themeColor('dark', 4) : theme.fn.themeColor('gray', 3);
  const trueColor = theme.fn.themeColor(colorKey, 6);
  const trackColor: { false: string; true: string } = {
    false: falseColor || '#ccc',
    true: trueColor || '#000',
  };

  const thumbColor =
    Platform.OS === 'ios'
      ? theme.white
      : checked
      ? theme.white
      : theme.colorScheme === 'dark'
      ? theme.fn.themeColor('dark', 0)
      : theme.fn.themeColor('gray', 1);

  const defaultAccessibilityLabel =
    accessibilityLabel || (typeof label === 'string' ? label : 'Switch');

  const switchComponent = (
    <RNSwitch
      ref={ref}
      value={checked}
      onValueChange={handleChange}
      trackColor={trackColor}
      thumbColor={thumbColor}
      ios_backgroundColor={trackColor.false}
      disabled={disabled}
      style={sx(styles.switch, style)}
      accessibilityRole="switch"
      accessibilityState={{ checked: checked || false, disabled: !!disabled }}
      accessibilityLabel={defaultAccessibilityLabel}
      {...others}
    />
  );

  if (!label) {
    return switchComponent;
  }

  return (
    <BoxView style={sx(styles.root, wrapperStyle)}>
      {labelPosition === 'left' && <Text style={styles.label}>{label}</Text>}
      {switchComponent}
      {labelPosition === 'right' && <Text style={styles.label}>{label}</Text>}
    </BoxView>
  );
});

Switch.displayName = 'Switch';
