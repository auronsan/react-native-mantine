import { Text, TouchableOpacity } from 'react-native';
import { fireEvent, render, screen } from '../../../__tests__/test-utils';
import { Select } from '../index';

const data = ['React', 'Vue', 'Angular'];

const groupedData = [
  { value: 'us', label: 'United States', group: 'North America' },
  { value: 'ca', label: 'Canada', group: 'North America' },
  { value: 'uk', label: 'United Kingdom', group: 'Europe' },
  { value: 'other', label: 'Other' },
];

const open = (testID = 'select') => fireEvent.press(screen.getByTestId(testID));

describe('Select', () => {
  it('renders with placeholder and closed dropdown', () => {
    render(<Select data={data} placeholder="Pick one" testID="select" />);
    const input = screen.getByTestId('select');
    expect(input.props.placeholder).toBe('Pick one');
    expect(input.props.value).toBe('');
    expect(input.props.accessibilityRole).toBe('button');
    expect(input.props.accessibilityState.expanded).toBe(false);
    expect(input.props.accessibilityLabel).toBe('Select');
    expect(screen.queryByText('React')).toBeNull();
  });

  it('renders label, description and error', () => {
    render(
      <Select
        data={data}
        label="Framework"
        description="Choose your framework"
        error="Required"
        testID="select"
      />
    );
    expect(screen.getByText('Framework')).toBeTruthy();
    expect(screen.getByText('Choose your framework')).toBeTruthy();
    expect(screen.getByText('Required')).toBeTruthy();
    expect(screen.getByTestId('select').props.accessibilityLabel).toBe(
      'Framework'
    );
  });

  it('uses explicit accessibilityLabel and hint', () => {
    render(
      <Select
        data={data}
        label={<Text>Node label</Text>}
        accessibilityLabel="Pick framework"
        accessibilityHint="Opens a list"
        testID="select"
      />
    );
    expect(screen.getByLabelText('Pick framework')).toBeTruthy();
    expect(screen.getByTestId('select').props.accessibilityHint).toBe(
      'Opens a list'
    );
  });

  it('falls back to "Select" label when label is a node', () => {
    render(<Select data={data} label={<Text>Node</Text>} testID="select" />);
    expect(screen.getByTestId('select').props.accessibilityLabel).toBe(
      'Select'
    );
  });

  it('opens the dropdown on press and selects an item (uncontrolled)', () => {
    const onChange = jest.fn();
    render(<Select data={data} onChange={onChange} testID="select" />);

    open();
    expect(screen.getByTestId('select').props.accessibilityState.expanded).toBe(
      true
    );
    const item = screen.getByLabelText('Vue');
    expect(item.props.accessibilityRole).toBe('menuitem');
    expect(item.props.accessibilityState.selected).toBe(false);

    fireEvent.press(item);
    expect(onChange).toHaveBeenCalledWith('Vue');
    expect(screen.getByTestId('select').props.value).toBe('Vue');
    expect(screen.queryByLabelText('Vue')).toBeNull();
  });

  it('marks the selected item', () => {
    render(<Select data={data} defaultValue="Angular" testID="select" />);
    expect(screen.getByTestId('select').props.value).toBe('Angular');
    open();
    expect(
      screen.getByLabelText('Angular').props.accessibilityState.selected
    ).toBe(true);
  });

  it('does not update internal value when controlled', () => {
    const onChange = jest.fn();
    render(
      <Select data={data} value="React" onChange={onChange} testID="select" />
    );
    expect(screen.getByTestId('select').props.value).toBe('React');

    open();
    fireEvent.press(screen.getByLabelText('Vue'));
    expect(onChange).toHaveBeenCalledWith('Vue');
    expect(screen.getByTestId('select').props.value).toBe('React');
  });

  it('does not open when disabled', () => {
    render(<Select data={data} disabled testID="select" />);
    const input = screen.getByTestId('select');
    expect(input.props.editable).toBe(false);
    open();
    expect(screen.queryByLabelText('React')).toBeNull();
    expect(input.props.accessibilityState.expanded).toBe(false);
  });

  it('renders object data with disabled options', () => {
    const onChange = jest.fn();
    render(
      <Select
        data={[
          { value: 'a', label: 'Alpha' },
          { value: 'b', label: 'Beta', disabled: true },
        ]}
        onChange={onChange}
        testID="select"
      />
    );
    open();
    const beta = screen.getByLabelText('Beta');
    expect(beta).toBeDisabled();
    fireEvent.press(beta);
    expect(onChange).not.toHaveBeenCalled();
    expect(screen.getByTestId('select').props.value).toBe('');

    // the disabled press bubbles to the overlay in the test env, reopen
    if (!screen.queryByLabelText('Alpha')) {
      open();
    }
    fireEvent.press(screen.getByLabelText('Alpha'));
    expect(onChange).toHaveBeenCalledWith('a');
  });

  it('shows the clear button when clearable and a value is set', () => {
    const onChange = jest.fn();
    render(
      <Select
        data={data}
        clearable
        defaultValue="Vue"
        onChange={onChange}
        testID="select"
      />
    );
    open();
    fireEvent.press(screen.getByText('Clear'));
    expect(onChange).toHaveBeenCalledWith('');
    expect(screen.getByTestId('select').props.value).toBe('');
    expect(screen.queryByText('Clear')).toBeNull();
  });

  it('supports custom clear button label and controlled clear', () => {
    const onChange = jest.fn();
    render(
      <Select
        data={data}
        clearable
        clearButtonLabel="Reset"
        value="Vue"
        onChange={onChange}
        testID="select"
      />
    );
    open();
    fireEvent.press(screen.getByText('Reset'));
    expect(onChange).toHaveBeenCalledWith('');
    expect(screen.getByTestId('select').props.value).toBe('Vue');
  });

  it('does not show the clear button without a value', () => {
    render(<Select data={data} clearable testID="select" />);
    open();
    expect(screen.queryByText('Clear')).toBeNull();
  });

  it('filters options when searchable', () => {
    render(
      <Select data={data} searchable searchPlaceholder="Find" testID="select" />
    );
    open();
    const search = screen.getByPlaceholderText('Find');
    fireEvent(search, 'change', { nativeEvent: { text: 'vu' } });

    expect(screen.getByLabelText('Vue')).toBeTruthy();
    expect(screen.queryByLabelText('React')).toBeNull();

    fireEvent(search, 'change', { nativeEvent: { text: 'zzz' } });
    expect(screen.getByText('No options found')).toBeTruthy();
  });

  it('resets the search query after selecting', () => {
    render(<Select data={data} searchable testID="select" />);
    open();
    fireEvent(screen.getByPlaceholderText('Search...'), 'change', {
      nativeEvent: { text: 'ang' },
    });
    fireEvent.press(screen.getByLabelText('Angular'));

    open();
    expect(screen.getByPlaceholderText('Search...').props.value).toBe('');
    expect(screen.getByLabelText('React')).toBeTruthy();
  });

  it('renders grouped options', () => {
    const onChange = jest.fn();
    render(<Select data={groupedData} onChange={onChange} testID="select" />);
    open();
    expect(screen.getByText('North America')).toBeTruthy();
    expect(screen.getByText('Europe')).toBeTruthy();
    expect(screen.getByLabelText('Other')).toBeTruthy();

    fireEvent.press(screen.getByLabelText('Canada'));
    expect(onChange).toHaveBeenCalledWith('ca');
    expect(screen.getByTestId('select').props.value).toBe('Canada');
  });

  it('ignores presses on disabled grouped options', () => {
    const onChange = jest.fn();
    render(
      <Select
        data={[
          { value: 'x', label: 'Ex', group: 'G', disabled: true },
          { value: 'y', label: 'Why', group: 'G' },
        ]}
        value="y"
        onChange={onChange}
        testID="select"
      />
    );
    open();
    expect(screen.getByLabelText('Why').props.accessibilityState.selected).toBe(
      true
    );
    fireEvent.press(screen.getByLabelText('Ex'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('closes when the overlay is pressed', () => {
    render(<Select data={data} testID="select" />);
    open();
    expect(screen.getByLabelText('React')).toBeTruthy();

    const overlay = screen.UNSAFE_getAllByType(TouchableOpacity)[0]!;
    fireEvent.press(overlay);
    expect(screen.queryByLabelText('React')).toBeNull();
  });

  it('closes on modal request close', () => {
    render(<Select data={data} testID="select" />);
    open();
    const modal = screen.UNSAFE_getByType('Modal' as any);
    fireEvent(modal, 'requestClose');
    expect(screen.queryByLabelText('React')).toBeNull();
  });

  it('renders icon and rightSection', () => {
    render(
      <Select
        data={data}
        icon={<Text>icon</Text>}
        rightSection={<Text>right</Text>}
        testID="select"
      />
    );
    expect(screen.getByText('icon')).toBeTruthy();
    expect(screen.getByText('right')).toBeTruthy();
  });

  it.each(['xs', 'sm', 'md', 'lg', 'xl'] as const)(
    'renders %s size',
    (size) => {
      render(<Select data={data} size={size} testID="select" />);
      expect(screen.getByTestId('select')).toBeTruthy();
    }
  );

  it('renders with radius, color, maxDropdownHeight and style', () => {
    render(
      <Select
        data={data}
        radius="xl"
        color="grape"
        maxDropdownHeight={200}
        style={{ paddingLeft: 3 }}
        defaultValue="React"
        testID="select"
      />
    );
    expect(screen.getByTestId('select')).toHaveStyle({ paddingLeft: 3 });
    open();
    const list = screen.UNSAFE_getByType('ScrollView' as any);
    expect(list.props.style).toEqual({ maxHeight: 200 });
  });
});
