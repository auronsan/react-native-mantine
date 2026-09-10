import React from 'react';
import { StyleSheet, TextInput as RNTextInput } from 'react-native';
import { render, screen, fireEvent } from '../../../__tests__/test-utils';
import { Textarea } from '../index';

describe('Textarea', () => {
  it('renders as multiline with default minRows', () => {
    render(<Textarea testID="ta" />);
    const el = screen.getByTestId('ta');
    expect(el.props.multiline).toBe(true);
    expect(el.props.numberOfLines).toBe(3);
    // minRows 3 -> 3 * 20 + 12 * 2
    expect(el).toHaveStyle({
      height: 84,
      minHeight: 84,
      textAlignVertical: 'top',
    });
  });

  it('computes minHeight and maxHeight from minRows/maxRows', () => {
    render(<Textarea testID="ta" minRows={2} maxRows={5} />);
    const el = screen.getByTestId('ta');
    expect(el.props.numberOfLines).toBe(2);
    expect(el).toHaveStyle({ height: 64, minHeight: 64, maxHeight: 124 });
  });

  it('has undefined min/max height when minRows is 0 and no maxRows', () => {
    render(<Textarea testID="ta" minRows={0} />);
    const el = screen.getByTestId('ta');
    const flat = StyleSheet.flatten(el.props.style);
    expect(flat.minHeight).toBeUndefined();
    expect(flat.maxHeight).toBeUndefined();
  });

  it('grows with content when autosize is set', () => {
    render(<Textarea testID="ta" autosize />);
    const el = screen.getByTestId('ta');
    expect(el.props.style.height).toBeUndefined();

    fireEvent(el, 'contentSizeChange', {
      nativeEvent: { contentSize: { width: 200, height: 150 } },
    } as any);
    expect(screen.getByTestId('ta')).toHaveStyle({ height: 150 });
  });

  it('ignores content size changes when autosize is off', () => {
    render(<Textarea testID="ta" />);
    fireEvent(screen.getByTestId('ta'), 'contentSizeChange', {
      nativeEvent: { contentSize: { width: 200, height: 150 } },
    } as any);
    expect(screen.getByTestId('ta')).toHaveStyle({ height: 84 });
  });

  it('renders label, description, error and required asterisk', () => {
    render(
      <Textarea
        testID="ta"
        label="Bio"
        description="Tell us about yourself"
        error="Too short"
        required
      />
    );
    expect(screen.getByText(/Bio/)).toBeTruthy();
    expect(screen.getByText(' *')).toBeTruthy();
    expect(screen.getByText('Tell us about yourself')).toBeTruthy();
    expect(screen.getByText('Too short')).toBeTruthy();
    expect(screen.getByRole('alert')).toBeTruthy();
  });

  it('handles text changes (uncontrolled and controlled)', () => {
    const onChangeText = jest.fn();
    const { rerender } = render(
      <Textarea testID="ta" onChangeText={onChangeText} />
    );
    fireEvent.changeText(screen.getByTestId('ta'), 'hello');
    expect(onChangeText).toHaveBeenCalledWith('hello');

    rerender(
      <Textarea testID="ta" value="fixed" onChangeText={onChangeText} />
    );
    expect(screen.getByTestId('ta').props.value).toBe('fixed');
    expect(screen.getByDisplayValue('fixed')).toBeTruthy();
  });

  it('supports placeholder, disabled (editable=false) and variants', () => {
    const { rerender } = render(
      <Textarea testID="ta" placeholder="Type here" editable={false} />
    );
    const el = screen.getByTestId('ta');
    expect(el.props.placeholder).toBe('Type here');
    expect(el.props.editable).toBe(false);

    rerender(<Textarea testID="ta" variant="filled" size="lg" radius="xl" />);
    expect(screen.getByTestId('ta')).toBeTruthy();
  });

  it('merges custom style', () => {
    render(<Textarea testID="ta" style={{ borderColor: 'red' }} />);
    expect(screen.getByTestId('ta')).toHaveStyle({ borderColor: 'red' });
  });

  it('applies accessibility label and hint', () => {
    render(
      <Textarea testID="ta" label="Notes" accessibilityHint="Enter notes" />
    );
    const el = screen.getByTestId('ta');
    expect(el.props.accessibilityLabel).toBe('Notes');
    expect(el.props.accessibilityHint).toBe('Enter notes');
    expect(screen.getByLabelText('Notes')).toBeTruthy();
  });

  it('accepts a ref without throwing', () => {
    const ref = React.createRef<RNTextInput>();
    expect(() => render(<Textarea ref={ref} />)).not.toThrow();
  });

  it('has displayName', () => {
    expect(Textarea.displayName).toBe('Textarea');
  });
});
