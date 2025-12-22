import React, { forwardRef } from 'react';
import { Switch as RNSwitch, type SwitchProps as RNSwitchProps, Platform } from 'react-native';
import { BoxView } from '../BoxView';
import { Text } from '../Text';
import type { DefaultProps, MantineColor, MantineSize } from '../../theme/types';
import { useComponentDefaultProps, useTheme } from '../../theme/theme-provider';
import { createStyles } from '../../theme';

export interface SwitchProps extends DefaultProps {
  /** Switch label */
  label?: React.ReactNode;

  /** Switch size */
  size?: MantineSize;

  /** Switch color from theme */
  color?: MantineColor;

  /** Label position */
  labelPosition?: 'left' | 'right';

  /** Checked state */
  checked?: boolean;

  /** Called when switch state changes */
  onChange?: (value: boolean) => void;

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
    const sizeStyles = sizes[size] || sizes.md;

    return {
      root: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      label: {
        fontSize: theme.fontSizes.sm,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
        marginLeft: labelPosition === 'right' ? theme.spacing.sm : 0,
        marginRight: labelPosition === 'left' ? theme.spacing.sm : 0,
      },
      switch: {
        transform: [{ scale: sizeStyles.scale }],
      },
    };
  }
);

const defaultProps: Partial<SwitchProps> = {
  size: 'md',
  color: 'blue',
  labelPosition: 'right',
  checked: false,
};

export const Switch = forwardRef<any, SwitchProps>((props, ref) => {
  const {
    label,
    size,
    color,
    labelPosition,
    checked,
    onChange,
    style,
    wrapperStyle,
    ...others
  } = useComponentDefaultProps('Switch', defaultProps, props);

  const theme = useTheme();
  const { styles, sx } = useStyles({ labelPosition, size }, { name: 'Switch' }) as any;

  const handleChange = (value: boolean) => {
    onChange?.(value);
  };

  const colors = theme.colors[color] || theme.colors[theme.primaryColor];
  const trackColor = {
    false: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3],
    true: colors?.[6] || colors?.[5] || theme.primaryBgColor,
  };

  const thumbColor =
    Platform.OS === 'ios'
      ? theme.white
      : checked
      ? theme.white
      : theme.colorScheme === 'dark'
      ? theme.colors.dark[0]
      : theme.colors.gray[1];

  const switchComponent = (
    <RNSwitch
      ref={ref}
      value={checked}
      onValueChange={handleChange}
      trackColor={trackColor}
      thumbColor={thumbColor}
      ios_backgroundColor={trackColor.false}
      style={sx(styles.switch, style)}
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
