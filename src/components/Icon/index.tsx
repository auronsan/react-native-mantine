import { forwardRef } from 'react';
import { Text, type TextStyle } from 'react-native';
import { useTheme } from '../../theme/theme-provider';

// Optional import for react-native-vector-icons
let FontAwesomeIcon: any = null;
let iconsAvailable = false;
try {
  FontAwesomeIcon = require('react-native-vector-icons/FontAwesome').default;
  iconsAvailable = true;
} catch (error) {
  // react-native-vector-icons not available
  console.warn('react-native-vector-icons not available. Icon component will display the icon name as text. Install react-native-vector-icons for icon support.');
}

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
 * Icon component using react-native-vector-icons with FontAwesome
 * Falls back to displaying icon name as text if react-native-vector-icons is not installed
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

  // If react-native-vector-icons is available, use it
  if (iconsAvailable && FontAwesomeIcon) {
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
