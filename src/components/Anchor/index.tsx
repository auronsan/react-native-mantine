import React, { forwardRef } from 'react';
import { Text as RNText, Linking, type TextStyle } from 'react-native';
import { Text } from '../Text';
import type {
  DefaultProps,
  MantineColor,
  MantineSize,
  Variants,
} from '../../theme/types';
import { useComponentDefaultProps } from '../../theme/theme-provider';
import { createStyles } from '../../theme';
import { rem } from '../../theme/utils/rem';
import type { WithTextWrapperProps } from '../../theme/utils/withTextWrapper';

export interface AnchorProps extends DefaultProps, WithTextWrapperProps {
  /** Anchor text color from theme */
  color?: MantineColor;

  /** Anchor text size */
  size?: MantineSize;

  /** Anchor text weight */
  weight?: TextStyle['fontWeight'];

  /** Underline style */
  underline?: boolean;

  /** Variant of anchor */
  variant?: Variants<'text' | 'link'>;

  /** URL to open when anchor is pressed (opens in browser) */
  href?: string;

  /** Called when anchor is pressed */
  onPress?: () => void;

  /** Anchor content */
  children?: React.ReactNode;

  /** Additional styles */
  style?: any;
}

const sizes = {
  xs: rem(12),
  sm: rem(14),
  md: rem(16),
  lg: rem(18),
  xl: rem(20),
};

const useStyles = createStyles(
  (
    theme,
    {
      color,
      size,
      weight,
      underline,
    }: {
      color: MantineColor;
      size: MantineSize;
      weight: TextStyle['fontWeight'];
      underline: boolean;
    },
    { variant }
  ) => {
    const fontSize = sizes[size as keyof typeof sizes] || sizes.md;

    const getVariantStyles = () => {
      switch (variant) {
        case 'link':
          return {
            color: theme.fn.themeColor(color, 6),
            textDecorationLine: underline ? 'underline' : 'none',
          };
        case 'text':
          return {
            color: theme.colorScheme === 'dark' ? theme.fn.themeColor('dark', 0) : theme.black,
            textDecorationLine: 'none',
          };
        default:
          return {
            color: theme.fn.themeColor(color, 6),
            textDecorationLine: underline ? 'underline' : 'none',
          };
      }
    };

    return {
      root: {
        fontSize,
        fontWeight: weight || '400',
        ...getVariantStyles(),
      } as TextStyle,
    };
  }
);

const defaultProps: Partial<AnchorProps> = {
  color: 'blue',
  size: 'md',
  weight: '400',
  underline: true,
  variant: 'link',
  withTextWrapper: true,
};

export const Anchor = forwardRef<RNText, AnchorProps>((props, ref) => {
  const { color, size, weight, underline, variant, href, onPress, children, style, withTextWrapper: shouldWrapInText, ...others} =
    useComponentDefaultProps('Anchor', defaultProps, props);

  const { styles, sx} = useStyles(
    {
      color: color ?? defaultProps.color ?? 'blue',
      size: size ?? defaultProps.size ?? 'md',
      weight: weight ?? defaultProps.weight ?? '400',
      underline: underline ?? defaultProps.underline ?? true
    },
    { name: 'Anchor', variant: variant ?? defaultProps.variant ?? 'link' }
  ) as any;

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else if (href) {
      Linking.openURL(href).catch((err) =>
        console.error('Failed to open URL:', err)
      );
    }
  };

  if (!shouldWrapInText) {
    return children;
  }

  return (
    <Text
      ref={ref}
      style={sx(styles.root, style)}
      onPress={handlePress}
      {...others}
    >
      {children}
    </Text>
  );
});

Anchor.displayName = 'Anchor';
