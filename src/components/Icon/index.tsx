import { forwardRef } from 'react';
import type React from 'react';
import { Text, type TextStyle } from 'react-native';
import { useTheme } from '../../theme/theme-provider';
import { useAdapter } from '../../adapters/context';

export interface IconProps {
  /** Icon name from FontAwesome */
  name: string;

  /** Icon size in pixels */
  size?: number;

  /** Icon color */
  color?: string;

  /** Additional styles */
  style?: TextStyle;

  /** Whether to use theme color */
  useThemeColor?: boolean;

  /** Allow font scaling */
  allowFontScaling?: boolean;

  /** Test identifier */
  testID?: string;
}

const defaultProps: Partial<IconProps> = {
  size: 16,
  allowFontScaling: false,
  useThemeColor: false,
};

/**
 * Icon component rendered through the `Icon` adapter: a component passed via
 * `<ThemeProvider adapters={{ Icon }}>` or `configureMantine({ Icon })`
 * (e.g. FontAwesome from @expo/vector-icons), otherwise
 * react-native-vector-icons/FontAwesome when it is installed.
 * Falls back to displaying the icon name as text when nothing is available.
 *
 * @example
 * ```tsx
 * <Icon name="heart" size={24} color="red" />
 * <Icon name="star" size={20} useThemeColor />
 * ```
 */
export const Icon = forwardRef<any, IconProps>((props, ref) => {
  const {
    name,
    size,
    color,
    style,
    useThemeColor,
    allowFontScaling,
    ...others
  } = {
    ...defaultProps,
    ...props,
  };

  const theme = useTheme();
  const IconComponent: React.ComponentType<any> | undefined =
    useAdapter('Icon');

  const iconColor = color || (useThemeColor
    ? (theme.colorScheme === 'dark' ? theme.colors.dark?.[0] : theme.black)
    : undefined);

  // If an icon implementation is available, use it
  if (IconComponent) {
    return (
      <IconComponent
        ref={ref}
        name={name}
        size={size}
        color={iconColor}
        style={style}
        allowFontScaling={allowFontScaling}
        {...others}
      />
    );
  }

  // Fallback: display icon name as text
  return (
    <Text
      ref={ref}
      style={[
        {
          fontSize: size,
          color: iconColor,
        },
        style,
      ]}
      allowFontScaling={allowFontScaling}
      {...others}
    >
      [{name}]
    </Text>
  );
});

Icon.displayName = 'Icon';
