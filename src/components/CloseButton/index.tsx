import React, { forwardRef } from 'react';
import { TouchableOpacity } from 'react-native';
import { BoxView } from '../BoxView';
import type { DefaultProps, MantineSize } from '../../theme/types';
import { useComponentDefaultProps } from '../../theme/theme-provider';
import { createStyles } from '../../theme';
import { getSize } from '../../theme';

export interface CloseButtonProps extends DefaultProps {
  /** Called when button is pressed */
  onPress?: () => void;

  /** Icon size */
  size?: MantineSize | number;

  /** Key of theme.radius or number to set border-radius in px */
  radius?: MantineSize;

  /** Icon color */
  iconColor?: string;

  /** Custom icon */
  icon?: React.ReactNode;

  /** Accessibility label */
  accessibilityLabel?: string;

  /** Additional styles */
  style?: any;

  /** Disabled state */
  disabled?: boolean;
}

const sizes = {
  xs: 16,
  sm: 22,
  md: 28,
  lg: 34,
  xl: 44,
};

const iconSizes = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 28,
};

const useStyles = createStyles(
  (
    theme,
    {
      size,
      radius,
      disabled,
    }: {
      size: MantineSize | number;
      radius: MantineSize;
      disabled: boolean;
    }
  ) => {
    const buttonSize = typeof size === 'number' ? size : getSize({ size, sizes }) as number;

    return {
      root: {
        width: buttonSize,
        height: buttonSize,
        borderRadius: theme.fn.radius(radius),
        justifyContent: 'center' as const,
        alignItems: 'center' as const,
        backgroundColor: 'transparent',
        opacity: disabled ? 0.4 : 1,
      },
      rootHover: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark?.[5] : theme.colors.gray?.[0],
      },
    };
  }
);

const CloseIcon = ({ size, color }: { size: number; color: string }) => (
  <BoxView style={{ width: size, height: size, position: 'relative' }}>
    <BoxView
      style={{
        position: 'absolute',
        width: size,
        height: 2,
        backgroundColor: color,
        top: (size - 2) / 2,
        transform: [{ rotate: '45deg' }],
      }}
    />
    <BoxView
      style={{
        position: 'absolute',
        width: size,
        height: 2,
        backgroundColor: color,
        top: (size - 2) / 2,
        transform: [{ rotate: '-45deg' }],
      }}
    />
  </BoxView>
);

const defaultProps: Partial<CloseButtonProps> = {
  size: 'md',
  radius: 'sm',
  accessibilityLabel: 'Close',
  disabled: false,
};

export const CloseButton = forwardRef<any, CloseButtonProps>((props, ref) => {
  const {
    onPress,
    size = 'md',
    radius = 'sm',
    iconColor,
    icon,
    accessibilityLabel,
    style,
    disabled,
    ...others
  } = useComponentDefaultProps('CloseButton', defaultProps, props);

  const { styles, sx, theme} = useStyles(
    { size, radius, disabled },
    { name: 'CloseButton' }
  ) as any;

  const iconSize = typeof size === 'number' ? Math.round(size * 0.7) : (getSize({ size, sizes: iconSizes }) as unknown as number);
  const defaultIconColor =
    iconColor || (theme.colorScheme === 'dark' ? theme.colors.dark?.[0] : theme.colors.gray?.[7]) || '#000';

  return (
    <TouchableOpacity
      ref={ref}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.6}
      accessible={true}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      style={sx(styles.root, style)}
      {...others}
    >
      {icon || <CloseIcon size={iconSize} color={defaultIconColor} />}
    </TouchableOpacity>
  );
});

CloseButton.displayName = 'CloseButton';
