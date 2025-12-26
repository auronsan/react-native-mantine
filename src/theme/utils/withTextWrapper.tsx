import type { ReactNode } from 'react';
import { Text } from '../../components/Text';
import type { TextProps } from '../../components/Text';

/**
 * Conditionally wraps content in a Text component based on the withTextWrapper prop.
 *
 * In React Native, all text must be wrapped in a Text component. However, some
 * components may need flexibility to render with or without this wrapper depending
 * on whether their content is text or other components (like icons, views, etc.).
 *
 * @param children - The content to potentially wrap
 * @param shouldWrap - Whether to wrap the content in a Text component
 * @param textStyle - Optional style to apply to the Text wrapper
 * @param textProps - Optional additional props to pass to the Text component
 * @returns The children wrapped in Text if shouldWrap is true, otherwise just the children
 *
 * @example
 * // Wrap text content
 * withTextWrapper('Hello', true, styles.text)
 *
 * @example
 * // Don't wrap components
 * withTextWrapper(<Icon />, false)
 *
 * @example
 * // Default behavior (wrap)
 * withTextWrapper('Text', true, styles.text, { numberOfLines: 1 })
 */
export function withTextWrapper(
  children: ReactNode,
  shouldWrap: boolean = true,
  textStyle?: any,
  textProps?: Omit<TextProps, 'children' | 'style'>
): ReactNode {
  if (!shouldWrap) {
    return children;
  }

  return (
    <Text style={textStyle} {...textProps}>
      {children}
    </Text>
  );
}

/**
 * Type helper for components that support the withTextWrapper pattern.
 * Add this to your component props interface.
 */
export interface WithTextWrapperProps {
  /**
   * If false, children will not be wrapped in a Text component.
   * This is useful when the children contain non-text elements like icons or custom components.
   * @default true
   */
  withTextWrapper?: boolean;
}
