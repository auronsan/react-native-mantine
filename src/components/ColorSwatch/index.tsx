import React, { forwardRef } from 'react';
import { TouchableOpacity } from 'react-native';
import { BoxView } from '../BoxView';
import type { DefaultProps, MantineNumberSize } from '../../theme/types';
import { useComponentDefaultProps } from '../../theme/theme-provider';
import { createStyles } from '../../theme';

export interface ColorSwatchProps extends DefaultProps {
  /** Swatch background color in any valid format (hex, rgb, etc.) */
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

const _ColorSwatch = forwardRef<any, ColorSwatchProps>((props, ref) => {
  const {
    color,
    size,
    radius,
    withShadow,
    children,
    onPress,
    style,
    accessible,
    accessibilityLabel,
    accessibilityHint,
    accessibilityRole,
    accessibilityState,
    ...others
  } = useComponentDefaultProps('ColorSwatch', defaultProps, props);

  // A static swatch is decorative (it is usually wrapped by an already
  // labelled control), so only a pressable swatch derives a label from its
  // color; consumer-supplied accessibility props always win.
  const accessibilityProps = {
    accessible,
    accessibilityLabel,
    accessibilityHint,
    accessibilityRole,
    accessibilityState,
  };

  const { styles, sx} = useStyles(
    {
      color: color ?? '#000',
      size: size ?? defaultProps.size ?? 25,
      radius: radius ?? defaultProps.radius ?? 'xl',
      withShadow: withShadow ?? defaultProps.withShadow ?? true
    },
    { name: 'ColorSwatch' }
  ) as any;

  const renderContent = (withAccessibility: boolean) => (
    <BoxView
      ref={ref}
      style={sx(styles.root, style)}
      {...(withAccessibility ? accessibilityProps : {})}
      {...others}
    >
      {children && <BoxView style={styles.overlay}>{children}</BoxView>}
    </BoxView>
  );

  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        {...accessibilityProps}
        accessibilityRole={accessibilityRole ?? 'button'}
        accessibilityLabel={accessibilityLabel ?? color}
      >
        {renderContent(false)}
      </TouchableOpacity>
    );
  }

  return renderContent(true);
});

export const ColorSwatch = React.memo(_ColorSwatch);
ColorSwatch.displayName = 'ColorSwatch';
