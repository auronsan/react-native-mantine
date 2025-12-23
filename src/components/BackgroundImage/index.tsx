import React, { forwardRef } from 'react';
import {
  ImageBackground,
  type ImageBackgroundProps,
  type ImageSourcePropType,
} from 'react-native';
import type { DefaultProps, MantineNumberSize } from '../../theme/types';
import { useComponentDefaultProps } from '../../theme/theme-provider';
import { createStyles } from '../../theme';

export interface BackgroundImageProps extends DefaultProps, Omit<ImageBackgroundProps, 'source'> {
  /** Background image source */
  source: ImageSourcePropType;

  /** Key of theme.radius or any valid value to set border-radius */
  radius?: MantineNumberSize;

  /** Background image children */
  children?: React.ReactNode;

  /** Additional styles */
  style?: any;
}

const useStyles = createStyles(
  (
    theme,
    {
      radius,
    }: {
      radius: MantineNumberSize;
    }
  ) => ({
    root: {
      borderRadius: theme.fn.radius(radius),
      overflow: 'hidden',
    },
    imageStyle: {
      borderRadius: theme.fn.radius(radius),
    },
  })
);

const defaultProps: Partial<BackgroundImageProps> = {
  radius: 0,
  resizeMode: 'cover',
};

export const BackgroundImage = forwardRef<any, BackgroundImageProps>((props, ref) => {
  const {
    source,
    radius,
    children,
    style,
    imageStyle,
    ...others
  } = useComponentDefaultProps('BackgroundImage', defaultProps, props);

  const { styles, sx } = useStyles(
    { radius },
    { name: 'BackgroundImage' }
  ) as any;

  return (
    <ImageBackground
      ref={ref}
      source={source}
      style={sx(styles.root, style)}
      imageStyle={[styles.imageStyle, imageStyle]}
      {...others}
    >
      {children}
    </ImageBackground>
  );
});

BackgroundImage.displayName = 'BackgroundImage';
