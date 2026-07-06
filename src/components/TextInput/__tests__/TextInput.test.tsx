import { fireEvent } from '@testing-library/react-native';
import { render, screen } from '../../../__tests__/test-utils';
import { TextInput } from '../index';
import { Icon } from '../../Icon';

describe('TextInput', () => {
  it('renders with label', () => {
    render(<TextInput label="Username" testID="input" />);
    expect(screen.getByText('Username')).toBeTruthy();
    expect(screen.getByTestId('input')).toBeTruthy();
  });

  it('renders with placeholder', () => {
    render(<TextInput placeholder="Enter your name" testID="input" />);
    const input = screen.getByTestId('input');
    expect(input.props.placeholder).toBe('Enter your name');
  });

  it('handles text change', () => {
    const onChangeText = jest.fn();
    render(<TextInput onChangeText={onChangeText} testID="input" />);
    const input = screen.getByTestId('input');
    fireEvent.changeText(input, 'Hello');
    expect(onChangeText).toHaveBeenCalledWith('Hello');
  });

  it('shows error message', () => {
    render(<TextInput label="Email" error="Invalid email" testID="input" />);
    expect(screen.getByText('Invalid email')).toBeTruthy();
  });

  it('shows required asterisk', () => {
    render(<TextInput label="Password" required testID="input" />);
    expect(screen.getByText(/Password/)).toBeTruthy();
    expect(screen.getByText(' *')).toBeTruthy();
  });

  it('has correct accessibility label', () => {
    render(<TextInput label="Username" testID="input" />);
    const input = screen.getByTestId('input');
    expect(input.props.accessibilityLabel).toBe('Username');
  });

  it('has correct accessibility label when explicitly provided', () => {
    render(
      <TextInput
        label="Username"
        accessibilityLabel="Enter username"
        testID="input"
      />
    );
    const input = screen.getByTestId('input');
    expect(input.props.accessibilityLabel).toBe('Enter username');
  });

  it('shows required asterisk when required prop is true', () => {
    render(<TextInput label="Email" required testID="input" />);
    expect(screen.getByText(' *')).toBeTruthy();
  });

  it('announces error with alert role when error is present', () => {
    render(<TextInput label="Email" error="Invalid email" testID="input" />);
    const error = screen.getByText('Invalid email');
    expect(error.props.accessibilityRole).toBe('alert');
  });

  it('renders with description', () => {
    render(
      <TextInput
        label="Password"
        description="Must be at least 8 characters"
        testID="input"
      />
    );
    expect(screen.getByText('Must be at least 8 characters')).toBeTruthy();
  });

  it('renders with icon', () => {
    render(
      <TextInput
        label="Search"
        icon={<Icon name="search" testID="icon" />}
        testID="input"
      />
    );
    expect(screen.getByTestId('icon')).toBeTruthy();
  });

  it('renders with rightSection', () => {
    render(
      <TextInput
        label="Password"
        rightSection={<Icon name="eye" testID="right-icon" />}
        testID="input"
      />
    );
    expect(screen.getByTestId('right-icon')).toBeTruthy();
  });

  it('renders with different variants', () => {
    const { rerender } = render(
      <TextInput variant="default" testID="input" />
    );
    expect(screen.getByTestId('input')).toBeTruthy();

    rerender(<TextInput variant="filled" testID="input" />);
    expect(screen.getByTestId('input')).toBeTruthy();

    rerender(<TextInput variant="unstyled" testID="input" />);
    expect(screen.getByTestId('input')).toBeTruthy();
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<TextInput size="xs" testID="input" />);
    expect(screen.getByTestId('input')).toBeTruthy();

    rerender(<TextInput size="sm" testID="input" />);
    expect(screen.getByTestId('input')).toBeTruthy();

    rerender(<TextInput size="md" testID="input" />);
    expect(screen.getByTestId('input')).toBeTruthy();

    rerender(<TextInput size="lg" testID="input" />);
    expect(screen.getByTestId('input')).toBeTruthy();
  });

  it('handles value prop (controlled component)', () => {
    render(<TextInput value="Controlled value" testID="input" />);
    const input = screen.getByTestId('input');
    expect(input.props.value).toBe('Controlled value');
  });

  it('renders with disabled prop', () => {
    render(<TextInput editable={false} testID="input" />);
    const input = screen.getByTestId('input');
    expect(input.props.editable).toBe(false);
  });

  it('renders with secureTextEntry prop', () => {
    render(<TextInput secureTextEntry testID="input" />);
    const input = screen.getByTestId('input');
    expect(input.props.secureTextEntry).toBe(true);
  });

  it('renders with custom style', () => {
    render(<TextInput style={{ borderWidth: 2 }} testID="input" />);
    const input = screen.getByTestId('input');
    expect(input.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ borderWidth: 2 }),
      ])
    );
  });
});
