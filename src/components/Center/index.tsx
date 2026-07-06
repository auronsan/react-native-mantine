import React, { forwardRef } from 'react';
import { BoxView } from '../BoxView';
import type { ViewProps } from '../BoxView';

export interface CenterProps extends ViewProps {
  /** Content that should be centered */
  children?: React.ReactNode;

  /** Inline center (applies display: inline-flex) - not applicable in React Native */
  inline?: boolean;
}

/**
 * Center component centers its children horizontally and vertically
 * Uses flexbox to achieve centering
 */
const _Center = forwardRef<any, CenterProps>((props, ref) => {
  const { children, style, inline, ...others} = props;

  return (
    <BoxView
      ref={ref}
      style={[
        {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        },
        style,
      ]}
      {...others}
    >
      {children}
    </BoxView>
  );
});

export const Center = React.memo(_Center);
Center.displayName = 'Center';
