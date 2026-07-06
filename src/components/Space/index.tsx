import React, { forwardRef } from 'react';
import { BoxView } from '../BoxView';
import type { ViewProps } from '../BoxView';
import type { DefaultProps, MantineNumberSize } from '../../theme/types';
import { useTheme } from '../../theme/theme-provider';

export interface SpaceProps
  extends DefaultProps,
    Omit<ViewProps, 'style' | 'testID'> {
  /** Width, key of theme.spacing or number value */
  w?: MantineNumberSize | number;

  /** Height, key of theme.spacing or number value */
  h?: MantineNumberSize | number;
}

/**
 * Space component adds horizontal or vertical spacing between elements
 */
const _Space = forwardRef<any, SpaceProps>((props, ref) => {
  const { style, w, h, ...others} = props;

  const theme = useTheme();

  // Get spacing value from theme or use number directly
  const getSpacing = (value: MantineNumberSize | number | undefined) => {
    if (value === undefined) return undefined;
    if (typeof value === 'number') return value;
    return theme.spacing[value as keyof typeof theme.spacing] || 0;
  };

  const width = getSpacing(w);
  const height = getSpacing(h);

  return (
    <BoxView
      ref={ref}
      style={[
        {
          ...(width !== undefined && { width }),
          ...(height !== undefined && { height }),
        },
        style,
      ]}
      {...others}
    />
  );
});

export const Space = React.memo(_Space);
Space.displayName = 'Space';
