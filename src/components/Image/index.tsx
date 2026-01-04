import React, { forwardRef, useState } from 'react';
import {
  Image as RNImage,
  ActivityIndicator,
  type ImageSourcePropType,
  type ImageErrorEventData,
  type NativeSyntheticEvent,
} from 'react-native';
import { BoxView } from '../BoxView';
import { Text } from '../Text';
import type { DefaultProps, MantineNumberSize } from '../../theme/types';
import { useComponentDefaultProps } from '../../theme/theme-provider';
import { createStyles } from '../../theme';

export interface ImageProps extends DefaultProps {
  /** Image source */
  source: ImageSourcePropType;

  /** Image width */
  width?: number;

  /** Image height */
  height?: number;

  /** Image fit */
  fit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';

  /** Key of theme.radius or any valid value to set border-radius */
  radius?: MantineNumberSize;

  /** Placeholder to show when image is loading */
  placeholder?: React.ReactNode;

  /** Error message to show when image fails to load */
  errorMessage?: string;

  /** Custom error placeholder */
  errorPlaceholder?: React.ReactNode;

  /** Image alt text for accessibility */
  alt?: string;

  /** Called when image loads */
  onLoad?: () => void;

  /** Called when image fails to load */
  onError?: (error: NativeSyntheticEvent<ImageErrorEventData>) => void;

  /** Additional styles */
  style?: any;
}

const useStyles = createStyles(
  (
    theme,
    {
      width,
      height,
      radius,
      fit,
    }: {
      width?: number;
      height?: number;
      radius: MantineNumberSize;
      fit: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
    }
  ) => ({
    root: {
      position: 'relative' as const,
      width: width || 300,
      height: height || 200,
      borderRadius: theme.fn.radius(radius),
      overflow: 'hidden' as const,
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark?.[6] : theme.colors.gray?.[1],
    },
    image: {
      width: '100%' as const,
      height: '100%' as const,
      resizeMode: (fit === 'scale-down' ? 'contain' : fit) as any,
      borderRadius: theme.fn.radius(radius),
    },
    placeholder: {
      position: 'absolute' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center' as const,
      alignItems: 'center' as const,
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark?.[6] : theme.colors.gray?.[1],
    },
    errorContainer: {
      position: 'absolute' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center' as const,
      alignItems: 'center' as const,
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark?.[7] : theme.colors.gray?.[0],
    },
    errorText: {
      color: theme.colorScheme === 'dark' ? theme.colors.dark?.[2] : theme.colors.gray?.[6],
      fontSize: 14,
      textAlign: 'center' as const,
      paddingHorizontal: 16,
    },
  })
);

const defaultProps: Partial<ImageProps> = {
  fit: 'cover',
  radius: 0,
  errorMessage: 'Failed to load image',
};

export const Image = forwardRef<any, ImageProps>((props, ref) => {
  const {
    source,
    width,
    height,
    fit,
    radius,
    placeholder,
    errorMessage,
    errorPlaceholder,
    alt,
    style,
    onLoad,
    onError,
  } = useComponentDefaultProps('Image', defaultProps, props);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { styles, sx } = useStyles(
    {
      width,
      height,
      radius: radius ?? defaultProps.radius ?? 0,
      fit: fit ?? defaultProps.fit ?? 'cover'
    },
    { name: 'Image' }
  ) as any;

  const handleLoad = () => {
    setLoading(false);
    setError(false);
    onLoad?.();
  };

  const handleError = (event: NativeSyntheticEvent<ImageErrorEventData>) => {
    setLoading(false);
    setError(true);
    onError?.(event);
  };

  return (
    <BoxView ref={ref} style={sx(styles.root, style)}>
      <RNImage
        source={source}
        style={styles.image}
        onLoad={handleLoad}
        onError={handleError}
        {...(alt ? { accessible: true, accessibilityLabel: alt } : {})}
      />

      {loading && (
        <BoxView style={styles.placeholder}>
          {placeholder || <ActivityIndicator size="large" />}
        </BoxView>
      )}

      {error && (
        <BoxView style={styles.errorContainer}>
          {errorPlaceholder || (
            <Text style={styles.errorText}>{errorMessage}</Text>
          )}
        </BoxView>
      )}
    </BoxView>
  );
});

Image.displayName = 'Image';
