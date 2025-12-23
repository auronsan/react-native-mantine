import React, { forwardRef } from 'react';
import { Text } from '../Text';
import type { TextProps } from '../Text';
import { useTheme } from '../../theme/theme-provider';
import { BoxView } from '../BoxView';

export interface CodeProps extends Omit<TextProps, 'children'> {
  /** Code content */
  children?: React.ReactNode;

  /** Code color from theme */
  color?: string;

  /** Display as code block instead of inline */
  block?: boolean;
}

/**
 * Code component renders inline code or code blocks with monospace font
 */
export const Code = forwardRef<any, CodeProps>((props, ref) => {
  const { children, color, block = false, style, ...others} = props;

  const theme = useTheme();

  // Get background and text colors
  const backgroundColor = theme.colors.gray?.[0] || '#F6F6F6';
  const textColor = color
    ? theme.colors[color]?.[theme.primaryShade] || color
    : theme.light.text;

  // Monospace font - in React Native, we can use 'Courier' or 'Courier New'
  const codeStyles = {
    fontFamily: 'Courier',
    fontSize: theme.fontSizes.sm as number || 14,
    backgroundColor: backgroundColor,
    color: textColor,
    paddingHorizontal: block ? 16 : 4,
    paddingVertical: block ? 12 : 2,
    borderRadius: theme.radius.sm || 4,
  };

  if (block) {
    return (
      <BoxView
        ref={ref}
        style={[
          {
            backgroundColor: backgroundColor,
            borderRadius: theme.radius.sm || 4,
            padding: 16,
          },
          style,
        ]}
      >
        <Text
          style={[
            {
              fontFamily: 'Courier',
              fontSize: theme.fontSizes.sm as number || 14,
              color: textColor,
            },
          ]}
          {...others}
        >
          {children}
        </Text>
      </BoxView>
    );
  }

  return (
    <Text
      ref={ref}
      style={[codeStyles, style]}
      {...others}
    >
      {children}
    </Text>
  );
});

Code.displayName = 'Code';
