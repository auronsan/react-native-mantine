import { Text } from 'react-native';
import { render, screen, fireEvent } from '../../../__tests__/test-utils';
import { PasswordInput } from '../index';

describe('PasswordInput', () => {
  it('renders with label and hides text by default', () => {
    render(<PasswordInput label="Password" testID="input" />);
    expect(screen.getByText('Password')).toBeTruthy();
    const input = screen.getByTestId('input');
    expect(input.props.secureTextEntry).toBe(true);
  });

  it('uses the default accessibility label', () => {
    render(<PasswordInput testID="input" />);
    expect(screen.getByTestId('input').props.accessibilityLabel).toBe(
      'Password'
    );
  });

  it('uses a custom accessibility label and hint', () => {
    render(
      <PasswordInput
        testID="input"
        accessibilityLabel="Secret"
        accessibilityHint="Type your secret"
      />
    );
    const input = screen.getByTestId('input');
    expect(input.props.accessibilityLabel).toBe('Secret');
    expect(input.props.accessibilityHint).toBe('Type your secret');
  });

  it('renders the visibility toggle with accessibility props', () => {
    render(<PasswordInput testID="input" />);
    const toggle = screen.getByLabelText('Show password');
    expect(toggle.props.accessibilityRole).toBe('button');
    expect(toggle.props.accessibilityHint).toBe('Toggle password visibility');
  });

  it('uses a custom visibilityToggleLabel as the hint', () => {
    render(<PasswordInput testID="input" visibilityToggleLabel="Reveal" />);
    expect(screen.getByLabelText('Show password').props.accessibilityHint).toBe(
      'Reveal'
    );
  });

  it('toggles visibility in uncontrolled mode', () => {
    const onVisibilityChange = jest.fn();
    render(
      <PasswordInput testID="input" onVisibilityChange={onVisibilityChange} />
    );

    fireEvent.press(screen.getByLabelText('Show password'));
    expect(onVisibilityChange).toHaveBeenCalledWith(true);
    expect(screen.getByTestId('input').props.secureTextEntry).toBe(false);
    expect(screen.getByLabelText('Hide password')).toBeTruthy();

    fireEvent.press(screen.getByLabelText('Hide password'));
    expect(onVisibilityChange).toHaveBeenLastCalledWith(false);
    expect(screen.getByTestId('input').props.secureTextEntry).toBe(true);
  });

  it('respects controlled visible prop', () => {
    const onVisibilityChange = jest.fn();
    render(
      <PasswordInput
        testID="input"
        visible
        onVisibilityChange={onVisibilityChange}
      />
    );
    expect(screen.getByTestId('input').props.secureTextEntry).toBe(false);

    fireEvent.press(screen.getByLabelText('Hide password'));
    expect(onVisibilityChange).toHaveBeenCalledWith(false);
    // still controlled as visible
    expect(screen.getByTestId('input').props.secureTextEntry).toBe(false);
    expect(screen.getByLabelText('Hide password')).toBeTruthy();
  });

  it('works controlled with visible={false}', () => {
    render(<PasswordInput testID="input" visible={false} />);
    expect(screen.getByTestId('input').props.secureTextEntry).toBe(true);
    fireEvent.press(screen.getByLabelText('Show password'));
    expect(screen.getByTestId('input').props.secureTextEntry).toBe(true);
  });

  it('renders a custom visibility toggle icon', () => {
    render(
      <PasswordInput
        testID="input"
        visibilityToggleIcon={(visible) => (
          <Text>{visible ? 'visible' : 'hidden'}</Text>
        )}
      />
    );
    expect(screen.getByText('hidden')).toBeTruthy();
    fireEvent.press(screen.getByLabelText('Show password'));
    expect(screen.getByText('visible')).toBeTruthy();
  });

  it('handles text changes', () => {
    const onChangeText = jest.fn();
    render(<PasswordInput testID="input" onChangeText={onChangeText} />);
    fireEvent.changeText(screen.getByTestId('input'), 'hunter2');
    expect(onChangeText).toHaveBeenCalledWith('hunter2');
  });

  it('renders description, error and required marker', () => {
    render(
      <PasswordInput
        testID="input"
        label="Password"
        description="At least 8 characters"
        error="Too short"
        required
      />
    );
    expect(screen.getByText('At least 8 characters')).toBeTruthy();
    expect(screen.getByText('Too short')).toBeTruthy();
    expect(screen.getByText(' *')).toBeTruthy();
  });

  it('forwards placeholder and value', () => {
    render(
      <PasswordInput testID="input" placeholder="Enter password" value="abc" />
    );
    const input = screen.getByTestId('input');
    expect(input.props.placeholder).toBe('Enter password');
    expect(input.props.value).toBe('abc');
  });
});
