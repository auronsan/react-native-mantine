import { Text as RNText } from 'react-native';
import { render, screen, fireEvent } from '../../../__tests__/test-utils';
import { ActionIcon } from '../index';
import { sizes } from '../ActionIcon';

describe('ActionIcon', () => {
  it('renders children and passes testID through', () => {
    render(
      <ActionIcon testID="action-icon">
        <RNText>icon</RNText>
      </ActionIcon>
    );

    expect(screen.getByTestId('action-icon')).toBeTruthy();
    expect(screen.getByText('icon')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    render(
      <ActionIcon onPress={onPress} testID="action-icon">
        <RNText>icon</RNText>
      </ActionIcon>
    );

    fireEvent.press(screen.getByTestId('action-icon'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', () => {
    const onPress = jest.fn();
    render(
      <ActionIcon onPress={onPress} disabled testID="action-icon">
        <RNText>icon</RNText>
      </ActionIcon>
    );

    const button = screen.getByTestId('action-icon');
    fireEvent.press(button);
    expect(onPress).not.toHaveBeenCalled();
    expect(button).toBeDisabled();
    expect(button.props.accessibilityState).toEqual({ disabled: true });
  });

  it('renders without an onPress handler and with a non-function onPress', () => {
    render(
      <ActionIcon testID="a">
        <RNText>a</RNText>
      </ActionIcon>
    );
    expect(() => fireEvent.press(screen.getByTestId('a'))).not.toThrow();

    render(
      <ActionIcon onPress={'nope' as any} testID="b">
        <RNText>b</RNText>
      </ActionIcon>
    );
    expect(() => fireEvent.press(screen.getByTestId('b'))).not.toThrow();
  });

  it('has button accessibility role, label and hint', () => {
    render(
      <ActionIcon
        accessibilityLabel="Settings"
        accessibilityHint="Opens settings"
        testID="action-icon"
      >
        <RNText>icon</RNText>
      </ActionIcon>
    );

    const button = screen.getByTestId('action-icon');
    expect(button.props.accessibilityRole).toBe('button');
    expect(button.props.accessibilityLabel).toBe('Settings');
    expect(button.props.accessibilityHint).toBe('Opens settings');
    expect(screen.getByRole('button', { name: 'Settings' })).toBeTruthy();
  });

  it('renders every variant', () => {
    const variants = [
      'filled',
      'light',
      'outline',
      'transparent',
      'default',
    ] as const;

    variants.forEach((variant) => {
      const { unmount } = render(
        <ActionIcon variant={variant} testID={`ai-${variant}`}>
          <RNText>{variant}</RNText>
        </ActionIcon>
      );
      expect(screen.getByTestId(`ai-${variant}`)).toBeTruthy();
      unmount();
    });
  });

  it('renders every named size and a numeric size', () => {
    (['xs', 'sm', 'md', 'lg', 'xl'] as const).forEach((size) => {
      const { unmount } = render(
        <ActionIcon size={size} testID={`ai-${size}`}>
          <RNText>{size}</RNText>
        </ActionIcon>
      );
      expect(screen.getByTestId(`ai-${size}`)).toBeTruthy();
      unmount();
    });

    render(
      <ActionIcon size={50} testID="ai-number">
        <RNText>50</RNText>
      </ActionIcon>
    );
    expect(screen.getByTestId('ai-number')).toBeTruthy();
  });

  it('exports the size map', () => {
    expect(sizes).toEqual({ xs: 18, sm: 22, md: 28, lg: 34, xl: 44 });
  });

  it('applies custom style', () => {
    render(
      <ActionIcon style={{ margin: 4 }} testID="action-icon">
        <RNText>icon</RNText>
      </ActionIcon>
    );
    expect(screen.getByTestId('action-icon')).toHaveStyle({ margin: 4 });
  });
});
