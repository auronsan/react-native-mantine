import React, { forwardRef } from 'react';
import { View } from 'react-native';
import type { DefaultProps } from '../../theme/types';
import { useComponentDefaultProps } from '../../theme/theme-provider';
import { createStyles } from '../../theme';

export interface VisuallyHiddenProps extends DefaultProps {
  /** Content hidden from the screen but announced by screen readers */
  children: React.ReactNode;

  /** Accessibility label announced by screen readers */
  accessibilityLabel?: string;
}

const useStyles = createStyles(() => ({
  root: {
    position: 'absolute',
    width: 1,
    height: 1,
    margin: -1,
    padding: 0,
    borderWidth: 0,
    overflow: 'hidden',
    opacity: 0,
  },
}));

const defaultProps: Partial<VisuallyHiddenProps> = {};

/**
 * VisuallyHidden hides content visually while keeping it available
 * to screen readers. Port of Mantine v7 VisuallyHidden component.
 */
export const VisuallyHidden = forwardRef<View, VisuallyHiddenProps>(
  (props, ref) => {
    const { children, style, accessibilityLabel, ...others } =
      useComponentDefaultProps('VisuallyHidden', defaultProps, props);

    const { styles, sx } = useStyles({}, { name: 'VisuallyHidden' });

    return (
      <View
        ref={ref}
        accessible
        accessibilityLabel={accessibilityLabel}
        style={sx(styles.root, style)}
        importantForAccessibility="yes"
        {...others}
      >
        {children}
      </View>
    );
  }
);

VisuallyHidden.displayName = 'VisuallyHidden';
