import React, { forwardRef, useEffect, useRef } from 'react';
import { Pressable, Animated } from 'react-native';
import { BoxView } from '../BoxView';
import { Text } from '../Text';
import type { DefaultProps, MantineColor, MantineSize } from '../../theme/types';
import { useComponentDefaultProps, useTheme } from '../../theme/theme-provider';
import { createStyles } from '../../theme';
import { rem } from '../../theme/utils/rem';

export interface RadioProps extends DefaultProps {
  /** Radio label */
  label?: React.ReactNode;

  /** Radio size */
  size?: MantineSize;

  /** Radio color from theme */
  color?: MantineColor;

  /** Radio value */
  value?: string;

  /** Checked state */
  checked?: boolean;

  /** Called when radio state changes */
  onChange?: (value: string) => void;

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
    const radioSize = sizes[size] || sizes.md;
    const innerSize = parseInt(radioSize) * 0.5;

    return {
      root: {
        flexDirection: 'row',
        alignItems: 'center',
        opacity: disabled ? 0.5 : 1,
      },
      radio: {
        width: radioSize,
        height: radioSize,
        borderRadius: parseInt(radioSize) / 2,
        borderWidth: 2,
        borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[4],
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
      },
      checked: {
        borderColor: colors?.[6] || colors?.[5] || theme.primaryBgColor,
      },
      inner: {
        width: rem(innerSize),
        height: rem(innerSize),
        borderRadius: rem(innerSize / 2),
        backgroundColor: colors?.[6] || colors?.[5] || theme.primaryBgColor,
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

const defaultProps: Partial<RadioProps> = {
  size: 'md',
  color: 'blue',
  checked: false,
  disabled: false,
};

export const Radio = forwardRef<any, RadioProps>((props, ref) => {
  const {
    label,
    size,
    color,
    value,
    checked,
    onChange,
    disabled,
    style,
    wrapperStyle,
    ...others
  } = useComponentDefaultProps('Radio', defaultProps, props);

  const { styles, sx } = useStyles({ size, color, disabled }, { name: 'Radio' }) as any;

  const scaleAnim = useRef(new Animated.Value(checked ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: checked ? 1 : 0,
      useNativeDriver: true,
      tension: 100,
      friction: 7,
    }).start();
  }, [checked, scaleAnim]);

  const handlePress = () => {
    if (!disabled && value !== undefined) {
      onChange?.(value);
    }
  };

  const radioContent = (
    <BoxView style={sx(styles.radio, checked && styles.checked, style)}>
      <Animated.View
        style={[
          styles.inner,
          {
            transform: [{ scale: scaleAnim }],
            opacity: scaleAnim,
          },
        ]}
      />
    </BoxView>
  );

  return (
    <Pressable
      ref={ref}
      onPress={handlePress}
      disabled={disabled}
      style={sx(styles.root, wrapperStyle)}
      accessibilityRole="radio"
      accessibilityState={{ checked }}
      {...others}
    >
      {radioContent}
      {label && <Text style={styles.label}>{label}</Text>}
    </Pressable>
  );
});

Radio.displayName = 'Radio';
