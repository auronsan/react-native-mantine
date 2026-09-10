import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { render, screen, fireEvent } from '../../../__tests__/test-utils';
import { UnstyledButton } from '../index';
import { UnstyledButton as UnstyledButtonDirect } from '../UnstyledButton';

const boxProps = { nativeID: 'box' };

const getHostBox = () =>
  screen
    .UNSAFE_getAllByProps({ nativeID: 'box' })
    .find((instance) => typeof instance.type === 'string')!;

describe('UnstyledButton', () => {
  it('exports the same component from index and file', () => {
    expect(UnstyledButton).toBe(UnstyledButtonDirect);
    expect(UnstyledButton.displayName).toBe('UnstyledButton');
  });

  it('renders children', () => {
    render(
      <UnstyledButton testID="btn">
        <Text>Press me</Text>
      </UnstyledButton>
    );
    expect(screen.getByTestId('btn')).toBeTruthy();
    expect(screen.getByText('Press me')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    render(
      <UnstyledButton testID="btn" onPress={onPress}>
        <Text>Press me</Text>
      </UnstyledButton>
    );
    fireEvent.press(screen.getByTestId('btn'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not throw when pressed without onPress', () => {
    render(
      <UnstyledButton testID="btn">
        <Text>Press me</Text>
      </UnstyledButton>
    );
    expect(() => fireEvent.press(screen.getByTestId('btn'))).not.toThrow();
  });

  it('does not call onPress when disabled and exposes disabled state', () => {
    const onPress = jest.fn();
    render(
      <UnstyledButton testID="btn" onPress={onPress} disabled>
        <Text>Press me</Text>
      </UnstyledButton>
    );
    const btn = screen.getByTestId('btn');
    fireEvent.press(btn);
    expect(onPress).not.toHaveBeenCalled();
    expect(btn).toBeDisabled();
    expect(btn.props.accessibilityState).toEqual({ disabled: true });
  });

  it('uses button accessibility role by default and accepts overrides', () => {
    const { rerender } = render(
      <UnstyledButton testID="btn" accessibilityLabel="Do it">
        <Text>Press me</Text>
      </UnstyledButton>
    );
    const btn = screen.getByTestId('btn');
    expect(btn.props.accessibilityRole).toBe('button');
    expect(btn.props.accessibilityLabel).toBe('Do it');
    expect(screen.getByRole('button')).toBeTruthy();

    rerender(
      <UnstyledButton
        testID="btn"
        accessibilityRole="link"
        accessibilityState={{ selected: true }}
      >
        <Text>Press me</Text>
      </UnstyledButton>
    );
    expect(screen.getByTestId('btn').props.accessibilityRole).toBe('link');
    expect(screen.getByTestId('btn').props.accessibilityState).toEqual({
      selected: true,
    });
  });

  it('applies activeOpacity default and override', () => {
    const { rerender } = render(
      <UnstyledButton testID="btn">
        <Text>Press me</Text>
      </UnstyledButton>
    );
    expect(screen.UNSAFE_getByType(TouchableOpacity).props.activeOpacity).toBe(
      0.7
    );

    rerender(
      <UnstyledButton testID="btn" activeOpacity={0.2}>
        <Text>Press me</Text>
      </UnstyledButton>
    );
    expect(screen.UNSAFE_getByType(TouchableOpacity).props.activeOpacity).toBe(
      0.2
    );
  });

  it('applies custom style to the inner box', () => {
    const ref = React.createRef<View>();
    render(
      <UnstyledButton ref={ref} style={{ margin: 3 }} {...boxProps}>
        <Text>Press me</Text>
      </UnstyledButton>
    );
    const box = getHostBox();
    expect(box).toHaveStyle({ margin: 3, padding: 0 });
    expect(box).toHaveStyle({ backgroundColor: '#ffffff' });
  });

  it('applies transparent background for transparent variant', () => {
    render(
      <UnstyledButton variant="transparent" {...boxProps}>
        <View testID="inner" />
      </UnstyledButton>
    );
    expect(screen.getByTestId('inner')).toBeTruthy();
    expect(getHostBox()).toHaveStyle({ backgroundColor: 'transparent' });
  });
});
