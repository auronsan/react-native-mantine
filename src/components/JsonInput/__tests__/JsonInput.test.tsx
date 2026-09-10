import { render, screen, fireEvent } from '../../../__tests__/test-utils';
import { JsonInput } from '../index';

describe('JsonInput', () => {
  it('renders a multiline input with label and passes testID through', () => {
    render(<JsonInput label="Config" placeholder="{}" testID="json" />);

    const input = screen.getByTestId('json');
    expect(screen.getByText('Config')).toBeTruthy();
    expect(input.props.multiline).toBe(true);
    expect(input.props.autoCapitalize).toBe('none');
    expect(input.props.autoCorrect).toBe(false);
    expect(input.props.value).toBe('');
  });

  it('updates the value while typing (uncontrolled) and calls onChangeText', () => {
    const onChangeText = jest.fn();
    render(<JsonInput defaultValue="{" onChangeText={onChangeText} testID="json" />);

    expect(screen.getByTestId('json').props.value).toBe('{');
    fireEvent.changeText(screen.getByTestId('json'), '{"a":1}');
    expect(onChangeText).toHaveBeenCalledWith('{"a":1}');
    expect(screen.getByTestId('json').props.value).toBe('{"a":1}');
  });

  it('shows a validation error on blur for invalid JSON and clears it on change/focus', () => {
    const onBlur = jest.fn();
    const onFocus = jest.fn();
    render(<JsonInput onBlur={onBlur} onFocus={onFocus} testID="json" />);

    const input = screen.getByTestId('json');
    fireEvent.changeText(input, '{oops');
    fireEvent(input, 'blur');
    expect(onBlur).toHaveBeenCalled();
    expect(screen.getByText('Invalid JSON')).toBeTruthy();

    fireEvent.changeText(screen.getByTestId('json'), '{oops}');
    expect(screen.queryByText('Invalid JSON')).toBeNull();

    fireEvent(screen.getByTestId('json'), 'blur');
    expect(screen.getByText('Invalid JSON')).toBeTruthy();

    fireEvent(screen.getByTestId('json'), 'focus');
    expect(onFocus).toHaveBeenCalled();
    expect(screen.queryByText('Invalid JSON')).toBeNull();
  });

  it('uses a custom validation error and prefers an external error', () => {
    const { rerender } = render(
      <JsonInput defaultValue="nope" validationError="Bad JSON" testID="json" />
    );
    fireEvent(screen.getByTestId('json'), 'blur');
    expect(screen.getByText('Bad JSON')).toBeTruthy();

    rerender(<JsonInput defaultValue="nope" error="Server error" testID="json" />);
    fireEvent(screen.getByTestId('json'), 'blur');
    expect(screen.getByText('Server error')).toBeTruthy();
    expect(screen.queryByText('Invalid JSON')).toBeNull();
  });

  it('formats valid JSON on blur when formatOnBlur is set', () => {
    const onChangeText = jest.fn();
    render(<JsonInput defaultValue='{"a":1}' formatOnBlur onChangeText={onChangeText} testID="json" />);

    fireEvent(screen.getByTestId('json'), 'blur');
    expect(onChangeText).toHaveBeenCalledWith('{\n  "a": 1\n}');
    expect(screen.getByTestId('json').props.value).toBe('{\n  "a": 1\n}');
    expect(screen.queryByText('Invalid JSON')).toBeNull();
  });

  it('treats empty values as valid and does not format them', () => {
    const onChangeText = jest.fn();
    render(<JsonInput defaultValue="   " formatOnBlur onChangeText={onChangeText} testID="json" />);

    fireEvent(screen.getByTestId('json'), 'blur');
    expect(onChangeText).not.toHaveBeenCalled();
    expect(screen.queryByText('Invalid JSON')).toBeNull();
  });

  it('supports custom serialize/deserialize and controlled values', () => {
    const onChangeText = jest.fn();
    const deserialize = jest.fn(() => ({ parsed: true })) as unknown as typeof JSON.parse;
    const serialize = jest.fn(() => 'SERIALIZED') as unknown as typeof JSON.stringify;
    render(
      <JsonInput
        value="anything"
        formatOnBlur
        serialize={serialize}
        deserialize={deserialize}
        onChangeText={onChangeText}
        testID="json"
      />
    );

    fireEvent.changeText(screen.getByTestId('json'), 'changed');
    expect(onChangeText).toHaveBeenCalledWith('changed');
    expect(screen.getByTestId('json').props.value).toBe('anything');

    fireEvent(screen.getByTestId('json'), 'blur');
    expect(deserialize).toHaveBeenCalledWith('anything');
    expect(onChangeText).toHaveBeenLastCalledWith('SERIALIZED');
    expect(screen.getByTestId('json').props.value).toBe('anything');
  });
});
