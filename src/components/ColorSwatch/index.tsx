import React, { forwardRef } from 'react';
import { TouchableOpacity } from 'react-native';
import { BoxView } from '../BoxView';
import type { DefaultProps, MantineNumberSize } from '../../theme/types';
import { useComponentDefaultProps } from '../../theme/theme-provider';
import { createStyles } from '../../theme';

export interface ColorSwatchProps extends DefaultProps {
  /** Swatch background color in any css valid format (hex, rgb, etc.) */
  color: string;

  /** Width and height in px */
  size?: number;

  /** Key of theme.radius or number to set border-radius in px */
  radius?: MantineNumberSize;

  /** ColorSwatch children, for example check icon */
  children?: React.ReactNode;

  /** Determines whether the swatch should have inner shadow */
  withShadow?: boolean;

  /** Called when swatch is pressed */
  onPress?: () => void;

  /** Additional styles */
  style?: any;
}

const useStyles = createStyles(
  (
    theme,
    {
      color,
      size,
      radius,
      withShadow,
    }: {
      color: string;
      size: number;
      radius: MantineNumberSize;
      withShadow: boolean;
    }
  ) => ({
    root: {
      width: size,
      height: size,
      borderRadius: theme.fn.radius(radius),
      backgroundColor: color,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      ...(withShadow && {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 1,
      }),
    },
    overlay: {
      position: 'absolute' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
  })
);

const defaultProps: Partial<ColorSwatchProps> = {
  size: 25,
  radius: 'xl',
  withShadow: true,
};

export const ColorSwatch = forwardRef<any, ColorSwatchProps>((props, ref) => {
  const { color, size, radius, withShadow, children, onPress, style, ...others} =
    useComponentDefaultProps('ColorSwatch', defaultProps, props);

  const { styles, sx} = useStyles(
    { color, size, radius, withShadow },
    { name: 'ColorSwatch' }
  ) as any;

  const content = (
    <BoxView ref={ref} style={sx(styles.root, style)} {...others}>
      {children && <BoxView style={styles.overlay}>{children}</BoxView>}
    </BoxView>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
});

ColorSwatch.displayName = 'ColorSwatch';
