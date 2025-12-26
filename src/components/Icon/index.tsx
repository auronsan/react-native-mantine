import { forwardRef } from 'react';
import type { TextStyle } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { useTheme } from '../../theme/theme-provider';

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
}

const defaultProps: Partial<IconProps> = {
  size: 16,
  allowFontScaling: false,
  useThemeColor: false,
};

/**
 * Icon component using react-native-vector-icons with FontAwesome
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

  const iconColor = color || (useThemeColor
    ? (theme.colorScheme === 'dark' ? theme.colors.dark?.[0] : theme.black)
    : undefined);

  return (
    <FontAwesomeIcon
      ref={ref}
      name={name}
      size={size}
      color={iconColor}
      style={style}
      allowFontScaling={allowFontScaling}
      {...others}
    />
  );
});

Icon.displayName = 'Icon';
