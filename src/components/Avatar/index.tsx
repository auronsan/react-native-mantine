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

export const Avatar = forwardRef<any, AvatarProps>((props, ref) => {
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
    { color, radius, size },
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
    <BoxView ref={ref} style={sx(styles.root, style)} {...others}>
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

Avatar.displayName = 'Avatar';
