import { fireEvent } from '@testing-library/react-native';
import { render, screen } from '../../../__tests__/test-utils';
import { Switch } from '../index';

describe('Switch', () => {
  it('renders with label', () => {
    render(<Switch label="Enable notifications" accessibilityLabel="Enable notifications switch" />);
    expect(screen.getByText('Enable notifications')).toBeTruthy();
    expect(screen.getByLabelText('Enable notifications switch')).toBeTruthy();
  });

  it('renders without label', () => {
    render(<Switch accessibilityLabel="Test switch" />);
    expect(screen.getByLabelText('Test switch')).toBeTruthy();
  });

  it('handles value change', () => {
    const onChange = jest.fn();
    render(<Switch checked={false} onChange={onChange} accessibilityLabel="Test switch" />);
    const switchElement = screen.getByLabelText('Test switch');
    fireEvent(switchElement, 'onValueChange', true);
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('has correct accessibility role', () => {
    render(<Switch accessibilityLabel="Test switch" />);
    const switchElement = screen.getByLabelText('Test switch');
    expect(switchElement.props.accessibilityRole).toBe('switch');
  });

  it('has correct accessibility state when checked', () => {
    render(<Switch checked accessibilityLabel="Test switch" />);
    const switchElement = screen.getByLabelText('Test switch');
    expect(switchElement.props.accessibilityState).toEqual(
      expect.objectContaining({ checked: true })
    );
  });

  it('has correct accessibility state when unchecked', () => {
    render(<Switch checked={false} accessibilityLabel="Test switch" />);
    const switchElement = screen.getByLabelText('Test switch');
    expect(switchElement.props.accessibilityState).toEqual(
      expect.objectContaining({ checked: false })
    );
  });

  it('has correct accessibility label', () => {
    render(<Switch label="Dark mode" />);
    const switchElement = screen.getByLabelText('Dark mode');
    expect(switchElement.props.accessibilityLabel).toBe('Dark mode');
  });

  it('has correct accessibility label when explicitly provided', () => {
    render(
      <Switch
        label="Dark mode"
        accessibilityLabel="Toggle dark mode"
      />
    );
    const switchElement = screen.getByLabelText('Toggle dark mode');
    expect(switchElement.props.accessibilityLabel).toBe('Toggle dark mode');
  });

  it('renders with disabled prop', () => {
    render(<Switch disabled accessibilityLabel="Test switch" />);
    const switchElement = screen.getByLabelText('Test switch');
    expect(switchElement.props.disabled).toBe(true);
  });

  it('does not call onChange when disabled', () => {
    const onChange = jest.fn();
    render(<Switch disabled onChange={onChange} accessibilityLabel="Test switch" />);
    const switchElement = screen.getByLabelText('Test switch');
    fireEvent(switchElement, 'onValueChange', true);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<Switch size="xs" accessibilityLabel="Test switch" />);
    expect(screen.getByLabelText('Test switch')).toBeTruthy();

    rerender(<Switch size="sm" accessibilityLabel="Test switch" />);
    expect(screen.getByLabelText('Test switch')).toBeTruthy();

    rerender(<Switch size="md" accessibilityLabel="Test switch" />);
    expect(screen.getByLabelText('Test switch')).toBeTruthy();

    rerender(<Switch size="lg" accessibilityLabel="Test switch" />);
    expect(screen.getByLabelText('Test switch')).toBeTruthy();

    rerender(<Switch size="xl" accessibilityLabel="Test switch" />);
    expect(screen.getByLabelText('Test switch')).toBeTruthy();
  });

  it('renders with different colors', () => {
    const { rerender } = render(<Switch color="red" accessibilityLabel="Test switch" />);
    expect(screen.getByLabelText('Test switch')).toBeTruthy();

    rerender(<Switch color="blue" accessibilityLabel="Test switch" />);
    expect(screen.getByLabelText('Test switch')).toBeTruthy();

    rerender(<Switch color="green" accessibilityLabel="Test switch" />);
    expect(screen.getByLabelText('Test switch')).toBeTruthy();
  });

  it('renders with label on left', () => {
    render(<Switch label="Enable" labelPosition="left" testID="switch" />);
    expect(screen.getByText('Enable')).toBeTruthy();
  });

  it('renders with label on right', () => {
    render(<Switch label="Enable" labelPosition="right" testID="switch" />);
    expect(screen.getByText('Enable')).toBeTruthy();
  });

  it('renders with controlled checked prop', () => {
    const { rerender } = render(<Switch checked={false} accessibilityLabel="Test switch" />);
    let switchElement = screen.getByLabelText('Test switch');
    expect(switchElement.props.value).toBe(false);

    rerender(<Switch checked accessibilityLabel="Test switch" />);
    switchElement = screen.getByLabelText('Test switch');
    expect(switchElement.props.value).toBe(true);
  });

  it('renders with custom style', () => {
    render(<Switch style={{ marginTop: 10 }} accessibilityLabel="Styled switch" />);
    const switchElement = screen.getByLabelText('Styled switch');
    // Just verify the switch renders with custom style prop
    expect(switchElement).toBeTruthy();
  });

  it('renders with wrapper style when label provided', () => {
    render(<Switch wrapperStyle={{ padding: 20 }} accessibilityLabel="Wrapper switch" />);
    // The wrapper would have the style applied, but we test that it renders correctly
    const switchElement = screen.getByLabelText('Wrapper switch');
    expect(switchElement).toBeTruthy();
  });
});
