import React, { forwardRef, useEffect, useRef } from 'react';
import { Pressable, Animated } from 'react-native';
import { BoxView } from '../BoxView';
import { Text } from '../Text';
import type { DefaultProps, MantineColor, MantineSize } from '../../theme/types';
import { useComponentDefaultProps, useTheme } from '../../theme/theme-provider';
import { createStyles } from '../../theme';
import { rem } from '../../theme/utils/rem';

export interface CheckboxProps extends DefaultProps {
  /** Checkbox label */
  label?: React.ReactNode;

  /** Checkbox size */
  size?: MantineSize;

  /** Checkbox color from theme */
  color?: MantineColor;

  /** Checked state */
  checked?: boolean;

  /** Called when checkbox state changes */
  onChange?: (checked: boolean) => void;

  /** Indeterminate state */
  indeterminate?: boolean;

  /** Disabled state */
  disabled?: boolean;

  /** Additional styles */
  style?: any;

  /** Wrapper style */
  wrapperStyle?: any;
}

const sizes = {
  xs: rem(14),
  sm: rem(18),
  md: rem(22),
  lg: rem(28),
  xl: rem(36),
};

const useStyles = createStyles(
  (
    theme,
    {
      size,
      color,
      disabled,
    }: {
      size: MantineSize;
      color: MantineColor;
      disabled: boolean;
    }
  ) => {
    const colors = theme.colors[color] || theme.colors[theme.primaryColor];
    const checkboxSize = sizes[size] || sizes.md;

    return {
      root: {
        flexDirection: 'row',
        alignItems: 'center',
        opacity: disabled ? 0.5 : 1,
      },
      checkbox: {
        width: checkboxSize,
        height: checkboxSize,
        borderRadius: theme.radius.sm,
        borderWidth: 2,
        borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[4],
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
      },
      checked: {
        borderColor: colors?.[6] || colors?.[5] || theme.primaryBgColor,
        backgroundColor: colors?.[6] || colors?.[5] || theme.primaryBgColor,
      },
      checkmark: {
        color: theme.white,
        fontSize: parseInt(checkboxSize) * 0.6,
        fontWeight: 'bold',
      },
      label: {
        fontSize: theme.fontSizes.sm,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
        marginLeft: theme.spacing.sm,
        flex: 1,
      },
    };
  }
);

const defaultProps: Partial<CheckboxProps> = {
  size: 'md',
  color: 'blue',
  checked: false,
  indeterminate: false,
  disabled: false,
};

export const Checkbox = forwardRef<any, CheckboxProps>((props, ref) => {
  const {
    label,
    size,
    color,
    checked,
    onChange,
    indeterminate,
    disabled,
    style,
    wrapperStyle,
    ...others
  } = useComponentDefaultProps('Checkbox', defaultProps, props);

  const { styles, sx } = useStyles({ size, color, disabled }, { name: 'Checkbox' }) as any;

  const scaleAnim = useRef(new Animated.Value(checked ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: checked || indeterminate ? 1 : 0,
      useNativeDriver: true,
      tension: 100,
      friction: 7,
    }).start();
  }, [checked, indeterminate, scaleAnim]);

  const handlePress = () => {
    if (!disabled) {
      onChange?.(!checked);
    }
  };

  const checkboxContent = (
    <BoxView style={sx(styles.checkbox, (checked || indeterminate) && styles.checked, style)}>
      <Animated.View
        style={{
          transform: [{ scale: scaleAnim }],
          opacity: scaleAnim,
        }}
      >
        <Text style={styles.checkmark}>{indeterminate ? '−' : '✓'}</Text>
      </Animated.View>
    </BoxView>
  );

  return (
    <Pressable
      ref={ref}
      onPress={handlePress}
      disabled={disabled}
      style={sx(styles.root, wrapperStyle)}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: checked || indeterminate }}
      {...others}
    >
      {checkboxContent}
      {label && <Text style={styles.label}>{label}</Text>}
    </Pressable>
  );
});

Checkbox.displayName = 'Checkbox';
