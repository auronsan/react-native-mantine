import React, { forwardRef } from 'react';
import { Text } from '../Text';
import type { TextProps } from '../Text';
import { useTheme } from '../../theme/theme-provider';
import type { WithTextWrapperProps } from '../../theme/utils/withTextWrapper';

export interface MarkProps extends TextProps, WithTextWrapperProps {
  /** Background color key from theme.colors or color value */
  color?: string;

  /** Text content */
  children?: React.ReactNode;
}

/**
 * Mark component renders text with a background color (like HTML mark tag)
 * Default background is yellow
 */
export const Mark = forwardRef<any, MarkProps>((props, ref) => {
  const { children, color = 'yellow', style, withTextWrapper: shouldWrapInText = true, ...others} = props;

  const theme = useTheme();

  // Get background color from theme or use as direct color
  const getBackgroundColor = () => {
    // Try to get from theme colors with lighter shade (index 2)
    if (theme.colors[color]) {
      return (theme.colors[color] || [])[2] || (theme.colors[color] || [])[0];
    }
    // Otherwise use the color directly
    return color;
  };

  if (!shouldWrapInText) {
    return children;
  }

  return (
    <Text
      ref={ref}
      style={[
        {
          backgroundColor: getBackgroundColor(),
          paddingHorizontal: 4,
          paddingVertical: 2,
        },
        style,
      ]}
      {...others}
    >
      {children}
    </Text>
  );
});

Mark.displayName = 'Mark';
