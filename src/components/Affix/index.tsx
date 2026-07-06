import React, { forwardRef } from 'react';
import { View } from 'react-native';
import { BoxView } from '../BoxView';
import { Portal } from '../Portal';
import type { DefaultProps } from '../../theme/types';
import { useComponentDefaultProps } from '../../theme/theme-provider';

export interface AffixPosition {
  top?: number | string;
  left?: number | string;
  bottom?: number | string;
  right?: number | string;
}

export interface AffixProps extends DefaultProps {
  /** Affix content */
  children?: React.ReactNode;

  /** Fixed position on the screen */
  position?: AffixPosition;

  /** zIndex of the root element */
  zIndex?: number;

  /** Determines whether the affix should render inside the PortalProvider overlay */
  withinPortal?: boolean;

  /** Name of the PortalHost to render into */
  portalTarget?: string;
}

const defaultProps: Partial<AffixProps> = {
  position: { bottom: 0, right: 0 },
  zIndex: 300,
  withinPortal: true,
};

/**
 * Affix renders its children at a fixed position on the screen. Port of
 * Mantine Affix; requires PortalProvider for true screen-level positioning,
 * otherwise positions relative to the nearest positioned ancestor.
 */
export const Affix = forwardRef<View, AffixProps>((props, ref) => {
  const {
    children,
    position,
    zIndex,
    withinPortal,
    portalTarget,
    style,
    ...others
  } = useComponentDefaultProps('Affix', defaultProps, props);

  const content = (
    <BoxView
      ref={ref}
      style={[
        {
          position: 'absolute',
          zIndex,
          ...(position as object),
        },
        style,
      ]}
      {...others}
    >
      {children}
    </BoxView>
  );

  if (withinPortal) {
    return <Portal target={portalTarget}>{content}</Portal>;
  }

  return content;
});

Affix.displayName = 'Affix';
