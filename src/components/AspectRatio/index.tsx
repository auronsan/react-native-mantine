import React, { forwardRef, useState } from 'react';
import type { LayoutChangeEvent } from 'react-native';
import { BoxView } from '../BoxView';
import type { DefaultProps } from '../../theme/types';
import { useComponentDefaultProps } from '../../theme/theme-provider';
import { createStyles } from '../../theme';

export interface AspectRatioProps extends DefaultProps {
  /** Aspect ratio, e.g., 16/9, 4/3, 1 */
  ratio: number;

  /** Children to render inside aspect ratio container */
  children?: React.ReactNode;

  /** Additional styles */
  style?: any;
}

const useStyles = createStyles(() => ({
  root: {
    position: 'relative' as const,
    width: '100%',
  },
  content: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden' as const,
  },
}));

const defaultProps: Partial<AspectRatioProps> = {
  ratio: 1,
};

export const AspectRatio = forwardRef<any, AspectRatioProps>((props, ref) => {
  const { ratio, children, style, ...others} = useComponentDefaultProps(
    'AspectRatio',
    defaultProps,
    props
  );

  const [width, setWidth] = useState(0);

  const { styles, sx} = useStyles({}, { name: 'AspectRatio' }) as any;

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width: layoutWidth } = event.nativeEvent.layout;
    setWidth(layoutWidth);
  };

  const height = width / ratio;

  return (
    <BoxView
      ref={ref}
      style={sx(styles.root, { height }, style)}
      onLayout={handleLayout}
      {...others}
    >
      <BoxView style={styles.content}>{children}</BoxView>
    </BoxView>
  );
});

AspectRatio.displayName = 'AspectRatio';
