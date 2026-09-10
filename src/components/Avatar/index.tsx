import React, { forwardRef, useState } from 'react';
import { Image, type ImageProps } from 'react-native';
import { Text } from '../Text';
import { BoxView } from '../BoxView';
import type {
  DefaultProps,
  MantineColor,
  MantineNumberSize,
  MantineSize,
} from '../../theme/types';
import { useComponentDefaultProps } from '../../theme/theme-provider';
import { createStyles } from '../../theme';
import { rem } from '../../theme/utils/rem';

/**
 * Props for the Avatar component
 *
 * @property {string | null} [src] - Image URL to display in the avatar
 * @property {string} [alt] - Image alt text. Also used to generate initials when image fails to load
 * @property {MantineSize | number} [size='md'] - Avatar size. Can be a predefined size ('xs', 'sm', 'md', 'lg', 'xl') or a custom number
 * @property {MantineNumberSize} [radius='xl'] - Key of theme.radius or any valid value to set border-radius
 * @property {MantineColor} [color='gray'] - Avatar background color from theme (used for placeholder)
 * @property {React.ReactNode} [children] - Custom placeholder component to show when image is not available
 * @property {Partial<ImageProps>} [imageProps] - Additional props passed to the React Native Image component
 * @property {any} [style] - Additional styles to apply to the avatar container
 */
export interface AvatarProps extends DefaultProps {
  /** Image url */
  src?: string | null;

  /** Image alt text */
  alt?: string;

  /** Avatar size */
  size?: MantineSize | number;

  /** Key of theme.radius or any valid value to set border-radius */
  radius?: MantineNumberSize;

  /** Avatar color from theme */
  color?: MantineColor;

  /** Custom placeholder component */
  children?: React.ReactNode;

  /** Image props */
  imageProps?: Partial<ImageProps>;

  /** Additional styles */
  style?: any;
}

const sizes = {
  xs: rem(16),
  sm: rem(26),
  md: rem(38),
  lg: rem(56),
  xl: rem(84),
};

const useStyles = createStyles(
  (
    theme,
    {
      color,
      radius,
      size,
    }: {
      color: MantineColor;
      radius: MantineNumberSize;
      size: MantineSize | number;
    }
  ) => {
    const sizeValue = typeof size === 'number' ? rem(size) : sizes[size as keyof typeof sizes] || sizes.md;

    return {
      root: {
        width: sizeValue as any,
        height: sizeValue as any,
        borderRadius: theme.fn.radius(radius),
        overflow: 'hidden',
        backgroundColor: theme.fn.themeColor(color, 6),
        justifyContent: 'center',
        alignItems: 'center',
      } as any,
      image: {
        width: '100%',
        height: '100%',
      },
      placeholder: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
      },
      placeholderText: {
        color: theme.white,
        fontSize: typeof size === 'number' ? size / 2.5 : sizeValue / 2.5,
        fontWeight: '700',
        textTransform: 'uppercase' as const,
      },
    };
  }
);

const defaultProps: Partial<AvatarProps> = {
  size: 'md',
  radius: 'xl',
  color: 'gray',
};

const getInitials = (name: string): string => {
  const names = name.trim().split(' ');
  if (names.length === 1) {
    return names[0]?.substring(0, 2).toUpperCase() || '';
  }
  return ((names[0]?.[0] || '') + (names[names.length - 1]?.[0] || '')).toUpperCase();
};

/**
 * Avatar component displays user profile images with automatic fallback to initials
 *
 * @example
 * ```tsx
 * // Basic avatar with image
 * <Avatar src="https://example.com/avatar.jpg" alt="John Doe" />
 *
 * // Avatar with initials fallback
 * <Avatar alt="Jane Smith" color="blue" />
 *
 * // Custom size avatar
 * <Avatar src="https://example.com/avatar.jpg" size={80} />
 *
 * // Avatar with custom placeholder
 * <Avatar color="red">
 *   <Icon name="user" />
 * </Avatar>
 * ```
 */
const _Avatar = forwardRef<any, AvatarProps>((props, ref) => {
  const {
    src,
    alt,
    size,
    radius,
    color,
    children,
    imageProps,
    style,
    ...others
  } = useComponentDefaultProps('Avatar', defaultProps, props);

  const [imageError, setImageError] = useState(false);

  const { styles, sx} = useStyles(
    {
      color: color ?? defaultProps.color ?? 'gray',
      radius: radius ?? defaultProps.radius ?? 'xl',
      size: size ?? defaultProps.size ?? 'md'
    },
    { name: 'Avatar' }
  ) as any;

  const shouldShowImage = src && !imageError;

  const renderPlaceholder = () => {
    if (children) {
      return <BoxView style={styles.placeholder}>{children}</BoxView>;
    }

    if (alt) {
      const initials = getInitials(alt);
      return (
        <BoxView style={styles.placeholder}>
          <Text style={styles.placeholderText}>{initials}</Text>
        </BoxView>
      );
    }

    return null;
  };

  return (
    <BoxView
      ref={ref}
      style={sx(styles.root, style)}
      accessibilityRole={shouldShowImage ? 'image' : undefined}
      accessibilityLabel={alt}
      {...others}
    >
      {shouldShowImage ? (
        <Image
          source={{ uri: src || '' }}
          style={styles.image as any}
          onError={() => setImageError(true)}
          {...imageProps}
        />
      ) : (
        renderPlaceholder()
      )}
    </BoxView>
  );
});

export const Avatar = React.memo(_Avatar);
Avatar.displayName = 'Avatar';
