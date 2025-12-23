import React, { forwardRef } from 'react';
import { Text } from '../Text';
import type { TextProps } from '../Text';
import { useTheme } from '../../theme/theme-provider';

export interface TitleProps extends Omit<TextProps, 'size'> {
  /** Heading order (h1-h6) */
  order?: 1 | 2 | 3 | 4 | 5 | 6;

  /** Text content */
  children?: React.ReactNode;
}

/**
 * Title component renders heading text with appropriate styling
 * Maps order prop to h1-h6 heading styles from theme
 */
export const Title = forwardRef<any, TitleProps>((props, ref) => {
  const { order = 1, children, style, ...others} = props;
  const theme = useTheme();

  // Get heading styles from theme
  const headingKey = `h${order}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  const headingStyles = theme.headings.sizes[headingKey];

  return (
    <Text
      ref={ref}
      style={[
        {
          fontSize: headingStyles.fontSize,
          lineHeight: headingStyles.lineHeight
            ? headingStyles.fontSize * headingStyles.lineHeight
            : headingStyles.fontSize * 1.3,
          fontWeight:
            headingStyles.fontWeight?.toString() ||
            theme.headings.fontWeight?.toString() ||
            '700',
          fontFamily: theme.headings.fontFamily || theme.fontFamilyBold,
        },
        style,
      ]}
      {...others}
    >
      {children}
    </Text>
  );
});

Title.displayName = 'Title';
