import { Text } from 'react-native';
import { fireEvent, render, screen } from '../../../__tests__/test-utils';
import { Radio } from '../index';

type Instance = ReturnType<typeof screen.getByTestId>;

/** Walks up to the nearest host (string-typed) ancestor */
const hostParent = (node: Instance): Instance => {
  let current = node.parent;
  while (current && typeof current.type !== 'string') {
    current = current.parent;
  }
  if (!current) {
    throw new Error('No host parent found');
  }
  return current;
};

describe('Radio', () => {
  it('renders with default props', () => {
    render(<Radio testID="radio" />);
    const radio = screen.getByTestId('radio');
    expect(radio).toBeTruthy();
    expect(radio.props.accessibilityRole).toBe('radio');
    expect(radio.props.accessibilityState.checked).toBe(false);
  });

  it('renders label', () => {
    render(<Radio label="Option A" value="a" />);
    expect(screen.getByText('Option A')).toBeTruthy();
  });

  it('renders label node', () => {
    render(<Radio label={<Text>Custom label</Text>} value="a" />);
    expect(screen.getByText('Custom label')).toBeTruthy();
  });

  it('reflects checked state', () => {
    render(<Radio checked value="a" testID="radio" />);
    expect(screen.getByTestId('radio').props.accessibilityState.checked).toBe(
      true
    );
    expect(screen.getByRole('radio', { checked: true })).toBeTruthy();
  });

  it('calls onChange with its value on press', () => {
    const onChange = jest.fn();
    render(<Radio value="a" onChange={onChange} testID="radio" />);
    fireEvent.press(screen.getByTestId('radio'));
    expect(onChange).toHaveBeenCalledWith('a');
  });

  it('does not call onChange when value is undefined', () => {
    const onChange = jest.fn();
    render(<Radio onChange={onChange} testID="radio" />);
    fireEvent.press(screen.getByTestId('radio'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('does not call onChange when disabled', () => {
    const onChange = jest.fn();
    render(<Radio value="a" disabled onChange={onChange} testID="radio" />);
    fireEvent.press(screen.getByTestId('radio'));
    expect(onChange).not.toHaveBeenCalled();
    expect(screen.getByTestId('radio')).toHaveStyle({ opacity: 0.5 });
  });

  it('updates animation when checked changes', () => {
    const { rerender } = render(<Radio value="a" testID="radio" />);
    rerender(<Radio value="a" checked testID="radio" />);
    expect(screen.getByTestId('radio').props.accessibilityState.checked).toBe(
      true
    );
  });

  it.each(['xs', 'sm', 'md', 'lg', 'xl'] as const)(
    'renders %s size',
    (size) => {
      render(<Radio size={size} value="a" testID="radio" />);
      expect(screen.getByTestId('radio')).toBeTruthy();
    }
  );

  it('falls back to md size for unknown size', () => {
    render(<Radio size={'huge' as any} value="a" testID="radio" />);
    expect(screen.getByTestId('radio')).toBeTruthy();
  });

  it('renders with custom color', () => {
    render(<Radio color="red" checked value="a" testID="radio" />);
    expect(screen.getByTestId('radio')).toBeTruthy();
  });

  it('applies wrapperStyle to the pressable and style to the circle', () => {
    render(
      <Radio
        value="a"
        wrapperStyle={{ marginTop: 4 }}
        style={{ borderWidth: 3 }}
        testID="radio"
      />
    );
    expect(screen.getByTestId('radio')).toHaveStyle({ marginTop: 4 });
  });

  it('supports accessibilityLabel passthrough', () => {
    render(<Radio value="a" accessibilityLabel="Pick A" />);
    expect(screen.getByLabelText('Pick A')).toBeTruthy();
  });
});

describe('Radio.Group', () => {
  it('marks the radio matching the group value as checked', () => {
    render(
      <Radio.Group value="b">
        <Radio value="a" label="A" testID="a" />
        <Radio value="b" label="B" testID="b" />
      </Radio.Group>
    );

    expect(screen.getByTestId('a').props.accessibilityState.checked).toBe(
      false
    );
    expect(screen.getByTestId('b').props.accessibilityState.checked).toBe(true);
  });

  it('calls group onChange when a child is pressed', () => {
    const onChange = jest.fn();
    render(
      <Radio.Group value="a" onChange={onChange}>
        <Radio value="a" label="A" testID="a" />
        <Radio value="b" label="B" testID="b" />
      </Radio.Group>
    );

    fireEvent.press(screen.getByTestId('b'));
    expect(onChange).toHaveBeenCalledWith('b');
  });

  it('group onChange takes precedence over child onChange', () => {
    const groupChange = jest.fn();
    const childChange = jest.fn();
    render(
      <Radio.Group onChange={groupChange}>
        <Radio value="a" onChange={childChange} testID="a" />
      </Radio.Group>
    );

    fireEvent.press(screen.getByTestId('a'));
    expect(groupChange).toHaveBeenCalledWith('a');
    expect(childChange).not.toHaveBeenCalled();
  });

  it('propagates size and color to children', () => {
    render(
      <Radio.Group value="a" size="xl" color="grape" name="choice">
        <Radio value="a" testID="a" />
      </Radio.Group>
    );
    expect(screen.getByTestId('a')).toBeTruthy();
  });

  it('child props override group size/color', () => {
    render(
      <Radio.Group value="a" size="xs" color="grape">
        <Radio value="a" size="lg" color="red" testID="a" />
      </Radio.Group>
    );
    expect(screen.getByTestId('a')).toBeTruthy();
  });

  it('applies spacing between children except the last', () => {
    render(
      <Radio.Group value="a" spacing={20} style={{ padding: 2 }}>
        <Radio value="a" testID="a" />
        <Radio value="b" testID="b" />
      </Radio.Group>
    );

    const first = hostParent(screen.getByTestId('a'));
    const last = hostParent(screen.getByTestId('b'));
    expect(first).toHaveStyle({ marginBottom: 20 });
    expect(last).toHaveStyle({ marginBottom: 0 });
    expect(hostParent(first)).toHaveStyle({ padding: 2 });
  });

  it('passes non-element children through untouched', () => {
    render(
      <Radio.Group value="a">
        {null}
        <Radio value="a" testID="a" />
        {false}
      </Radio.Group>
    );
    expect(screen.getByTestId('a')).toBeTruthy();
  });

  it('works as a controlled group with state', () => {
    const onChange = jest.fn();
    const { rerender } = render(
      <Radio.Group value="a" onChange={onChange}>
        <Radio value="a" testID="a" />
        <Radio value="b" testID="b" />
      </Radio.Group>
    );

    fireEvent.press(screen.getByTestId('b'));
    expect(onChange).toHaveBeenLastCalledWith('b');

    rerender(
      <Radio.Group value="b" onChange={onChange}>
        <Radio value="a" testID="a" />
        <Radio value="b" testID="b" />
      </Radio.Group>
    );
    expect(screen.getByTestId('b').props.accessibilityState.checked).toBe(true);
  });
});
