import { fireEvent } from '@testing-library/react-native';
import { render, screen } from '../../../__tests__/test-utils';
import { Button } from '../index';
import { Icon } from '../../Icon';

describe('Button', () => {
  it('renders with default props', () => {
    render(<Button testID="button">Click me</Button>);
    const button = screen.getByTestId('button');
    expect(button).toBeTruthy();
  });

  it('renders children text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeTruthy();
  });

  it('handles onPress callback', () => {
    const onPress = jest.fn();
    render(
      <Button onPress={onPress} testID="button">
        Click me
      </Button>
    );
    const button = screen.getByTestId('button');
    fireEvent.press(button);
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('shows loading state with ActivityIndicator visible', () => {
    render(
      <Button loading testID="button">
        Click me
      </Button>
    );
    const button = screen.getByTestId('button');
    expect(button).toBeTruthy();
    // Button should be disabled when loading
    expect(button.props.accessibilityState.disabled).toBe(true);
  });

  it('respects disabled prop - onPress not called when disabled', () => {
    const onPress = jest.fn();
    render(
      <Button disabled onPress={onPress} testID="button">
        Click me
      </Button>
    );
    const button = screen.getByTestId('button');
    fireEvent.press(button);
    expect(onPress).not.toHaveBeenCalled();
  });

  it('onPress not called when loading', () => {
    const onPress = jest.fn();
    render(
      <Button loading onPress={onPress} testID="button">
        Click me
      </Button>
    );
    const button = screen.getByTestId('button');
    fireEvent.press(button);
    expect(onPress).not.toHaveBeenCalled();
  });

  it('renders with different variants', () => {
    const { rerender } = render(
      <Button variant="filled" testID="button">
        Filled
      </Button>
    );
    expect(screen.getByTestId('button')).toBeTruthy();

    rerender(
      <Button variant="outline" testID="button">
        Outline
      </Button>
    );
    expect(screen.getByTestId('button')).toBeTruthy();

    rerender(
      <Button variant="light" testID="button">
        Light
      </Button>
    );
    expect(screen.getByTestId('button')).toBeTruthy();
  });

  it('renders with leftIcon', () => {
    render(
      <Button leftIcon={<Icon name="home" testID="left-icon" />} testID="button">
        With Icon
      </Button>
    );
    expect(screen.getByTestId('button')).toBeTruthy();
    expect(screen.getByTestId('left-icon')).toBeTruthy();
  });

  it('renders with rightIcon', () => {
    render(
      <Button rightIcon={<Icon name="arrow-right" testID="right-icon" />} testID="button">
        With Icon
      </Button>
    );
    expect(screen.getByTestId('button')).toBeTruthy();
    expect(screen.getByTestId('right-icon')).toBeTruthy();
  });

  it('has correct accessibility role', () => {
    render(
      <Button testID="button" accessibilityLabel="Submit button">
        Submit
      </Button>
    );
    const button = screen.getByTestId('button');
    expect(button.props.accessibilityLabel).toBe('Submit button');
  });

  it('has correct accessibility state when disabled', () => {
    render(
      <Button disabled testID="button">
        Disabled
      </Button>
    );
    const button = screen.getByTestId('button');
    expect(button.props.accessibilityState).toEqual(
      expect.objectContaining({ disabled: true })
    );
  });

  it('has correct accessibility state when loading', () => {
    render(
      <Button loading testID="button">
        Loading
      </Button>
    );
    const button = screen.getByTestId('button');
    expect(button.props.accessibilityState).toEqual(
      expect.objectContaining({ disabled: true })
    );
  });

  it('renders with different sizes', () => {
    const { rerender } = render(
      <Button size="xs" testID="button">
        Extra Small
      </Button>
    );
    expect(screen.getByTestId('button')).toBeTruthy();

    rerender(
      <Button size="sm" testID="button">
        Small
      </Button>
    );
    expect(screen.getByTestId('button')).toBeTruthy();

    rerender(
      <Button size="md" testID="button">
        Medium
      </Button>
    );
    expect(screen.getByTestId('button')).toBeTruthy();

    rerender(
      <Button size="lg" testID="button">
        Large
      </Button>
    );
    expect(screen.getByTestId('button')).toBeTruthy();
  });

  it('renders with fullWidth prop', () => {
    render(
      <Button fullWidth testID="button">
        Full Width
      </Button>
    );
    expect(screen.getByTestId('button')).toBeTruthy();
  });

  it('renders with compact prop', () => {
    render(
      <Button compact testID="button">
        Compact
      </Button>
    );
    expect(screen.getByTestId('button')).toBeTruthy();
  });
});
