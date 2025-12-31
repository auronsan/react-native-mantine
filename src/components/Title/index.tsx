import React, { forwardRef } from 'react';
import { Text } from '../Text';
import type { TextProps } from '../Text';
import { useTheme } from '../../theme/theme-provider';
import type { WithTextWrapperProps } from '../../theme/utils/withTextWrapper';

export interface TitleProps extends Omit<TextProps, 'size'>, WithTextWrapperProps {
  /** Heading order (h1-h6) */
  order?: 1 | 2 | 3 | 4 | 5 | 6;

  /** Text content */
  children?: React.ReactNode;
}

/**
 * Title component renders heading text with appropriate styling
 * Maps order prop to h1-h6 heading styles from theme
 * Uses theme.fn.headingStyles for consistent typography system
 */
export const Title = forwardRef<any, TitleProps>((props, ref) => {
  const { order = 1, children, style, withTextWrapper: shouldWrapInText = true, ...others} = props;
  const theme = useTheme();

  if (!shouldWrapInText) {
    return children;
  }

  // Get heading styles from theme using the typography helper
  const headingStyles = theme.fn.headingStyles(order);

  return (
    <Text
      ref={ref}
      style={[
        headingStyles,
        style,
      ]}
      {...others}
    >
      {children}
    </Text>
  );
});

Title.displayName = 'Title';
