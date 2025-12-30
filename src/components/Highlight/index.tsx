import { forwardRef } from 'react';
import { Text } from '../Text';
import type { TextProps } from '../Text';
import { useTheme } from '../../theme/theme-provider';

export interface HighlightProps extends TextProps {
  /** Substring or array of substrings to highlight */
  highlight: string | string[];

  /** Color for highlighted text, key from theme.colors */
  highlightColor?: string;

  /** Background color for highlighted text */
  highlightStyles?: {
    backgroundColor?: string;
    color?: string;
  };

  /** Text in which to highlight substring */
  children: string;
}

/**
 * Highlight component highlights specified substrings within text
 */
export const Highlight = forwardRef<any, HighlightProps>((props, ref) => {
  const {
    children,
    highlight,
    highlightColor = 'yellow',
    highlightStyles,
    style,
    ...others
  } = props;

  const theme = useTheme();

  // Convert highlight to array for uniform processing
  const highlights = Array.isArray(highlight) ? highlight : [highlight];

  // Get default highlight background color
  const defaultHighlightBg = theme.fn.themeColor(highlightColor, 2);

  const defaultStyles = {
    backgroundColor: defaultHighlightBg,
    ...highlightStyles,
  };

  // Function to split text and identify highlighted parts
  const getHighlightedText = () => {
    if (!children || highlights.length === 0 || highlights.every((h) => !h)) {
      return <Text style={style}>{children}</Text>;
    }

    // Create regex pattern for all highlight strings (case insensitive)
    const pattern = highlights
      .filter((h) => h && h.length > 0)
      .map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')) // Escape special chars
      .join('|');

    if (!pattern) {
      return <Text style={style}>{children}</Text>;
    }

    const regex = new RegExp(`(${pattern})`, 'gi');
    const parts = children.split(regex);

    return (
      <Text ref={ref} style={style} {...others}>
        {parts.map((part, index) => {
          const isHighlighted = highlights.some(
            (h) => h && part.toLowerCase() === h.toLowerCase()
          );

          if (isHighlighted) {
            return (
              <Text key={index} style={defaultStyles}>
                {part}
              </Text>
            );
          }

          return part;
        })}
      </Text>
    );
  };

  return getHighlightedText();
});

Highlight.displayName = 'Highlight';
