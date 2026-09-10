import React from 'react';
import { Text, View } from 'react-native';
import { render, screen } from '../../../__tests__/test-utils';
import { VisuallyHidden } from '../index';

describe('VisuallyHidden', () => {
  it('renders children', () => {
    render(
      <VisuallyHidden>
        <Text>Hidden text</Text>
      </VisuallyHidden>
    );
    expect(screen.getByText('Hidden text')).toBeTruthy();
  });

  it('applies visually hidden styles', () => {
    render(
      <VisuallyHidden testID="hidden">
        <Text>content</Text>
      </VisuallyHidden>
    );
    expect(screen.getByTestId('hidden')).toHaveStyle({
      position: 'absolute',
      width: 1,
      height: 1,
      opacity: 0,
      overflow: 'hidden',
    });
  });

  it('merges custom style', () => {
    render(
      <VisuallyHidden testID="hidden" style={{ top: 5 }}>
        <Text>content</Text>
      </VisuallyHidden>
    );
    expect(screen.getByTestId('hidden')).toHaveStyle({ top: 5, width: 1 });
  });

  it('is accessible with accessibilityLabel', () => {
    render(
      <VisuallyHidden testID="hidden" accessibilityLabel="Screen reader only">
        <Text>content</Text>
      </VisuallyHidden>
    );
    const el = screen.getByTestId('hidden');
    expect(el.props.accessible).toBe(true);
    expect(el.props.accessibilityLabel).toBe('Screen reader only');
    expect(el.props.importantForAccessibility).toBe('yes');
    expect(screen.getByLabelText('Screen reader only')).toBeTruthy();
  });

  it('accepts a ref without throwing', () => {
    const ref = React.createRef<View>();
    expect(() =>
      render(
        <VisuallyHidden ref={ref}>
          <Text>content</Text>
        </VisuallyHidden>
      )
    ).not.toThrow();
  });

  it('has displayName', () => {
    expect(VisuallyHidden.displayName).toBe('VisuallyHidden');
  });
});
