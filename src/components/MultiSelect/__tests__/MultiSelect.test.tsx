import { Text, TouchableOpacity } from 'react-native';
import {
  fireEvent,
  render,
  screen,
  within,
} from '../../../__tests__/test-utils';
import { MultiSelect } from '../index';

const data = ['React', 'Vue', 'Angular', 'Svelte'];

const groupedData = [
  { value: 'us', label: 'United States', group: 'North America' },
  { value: 'ca', label: 'Canada', group: 'North America' },
  { value: 'uk', label: 'United Kingdom', group: 'Europe' },
  { value: 'other', label: 'Other' },
];

const getTrigger = (label = 'Multi select') => screen.getByLabelText(label);
const open = (label?: string) => fireEvent.press(getTrigger(label));
const getModal = () => screen.UNSAFE_getByType('Modal' as any);

describe('MultiSelect', () => {
  it('renders closed with placeholder, defaults and accessibility props', () => {
    render(<MultiSelect data={data} placeholder="Pick some" testID="ms" />);

    const input = screen.getByTestId('ms');
    expect(input.props.placeholder).toBe('Pick some');
    expect(input.props.value).toBe('');
    expect(input.props.editable).toBe(true);

    const trigger = getTrigger();
    expect(trigger.props.accessibilityRole).toBe('button');
    expect(trigger.props.accessibilityState).toEqual({
      expanded: false,
      disabled: false,
    });
    expect(screen.queryByLabelText('React')).toBeNull();
  });

  it('renders label, description, error and uses label as accessibility label', () => {
    render(
      <MultiSelect
        data={data}
        label="Frameworks"
        description="Pick your favourites"
        error="At least one"
        testID="ms"
      />
    );
    expect(screen.getByText('Frameworks')).toBeTruthy();
    expect(screen.getByText('Pick your favourites')).toBeTruthy();
    expect(screen.getByText('At least one')).toBeTruthy();
    // both the trigger and the inner text input carry the label
    const labelled = screen.getAllByLabelText('Frameworks');
    expect(
      labelled.some((node) => node.props.accessibilityRole === 'button')
    ).toBe(true);
  });

  it('uses explicit accessibilityLabel/hint and falls back for node labels', () => {
    render(
      <MultiSelect
        data={data}
        label={<Text>Node label</Text>}
        accessibilityLabel="Choose frameworks"
        accessibilityHint="Opens a list"
        testID="ms"
      />
    );
    const trigger = getTrigger('Choose frameworks');
    expect(trigger.props.accessibilityHint).toBe('Opens a list');
    expect(screen.getByText('Node label')).toBeTruthy();
  });

  it('falls back to "Multi select" when label is a node', () => {
    render(<MultiSelect data={data} label={<Text>Node</Text>} testID="ms" />);
    expect(getTrigger('Multi select')).toBeTruthy();
  });

  it('opens on press and toggles values (uncontrolled)', () => {
    const onChange = jest.fn();
    render(<MultiSelect data={data} onChange={onChange} testID="ms" />);

    open();
    expect(getTrigger().props.accessibilityState).toEqual({
      expanded: true,
      disabled: false,
    });

    const vue = screen.getByLabelText('Vue');
    expect(vue.props.accessibilityRole).toBe('checkbox');
    expect(vue.props.accessibilityState).toEqual({
      checked: false,
      disabled: false,
    });

    fireEvent.press(vue);
    expect(onChange).toHaveBeenLastCalledWith(['Vue']);
    expect(screen.getByLabelText('Vue').props.accessibilityState).toEqual({
      checked: true,
      disabled: false,
    });
    expect(screen.getByTestId('ms').props.placeholder).toBe('1 selected');

    fireEvent.press(screen.getByLabelText('React'));
    expect(onChange).toHaveBeenLastCalledWith(['Vue', 'React']);
    expect(screen.getByTestId('ms').props.placeholder).toBe('2 selected');

    // deselect
    fireEvent.press(screen.getByLabelText('Vue'));
    expect(onChange).toHaveBeenLastCalledWith(['React']);
    expect(screen.getByLabelText('Vue').props.accessibilityState).toEqual({
      checked: false,
      disabled: false,
    });
  });

  it('toggles through the inner checkbox as well', () => {
    const onChange = jest.fn();
    render(<MultiSelect data={data} onChange={onChange} testID="ms" />);
    open();

    const option = screen.getByLabelText('Angular');
    const checkbox = within(option).getAllByRole('checkbox')[0]!;
    fireEvent.press(checkbox);
    expect(onChange).toHaveBeenLastCalledWith(['Angular']);
  });

  it('does not update internal state when controlled', () => {
    const onChange = jest.fn();
    render(
      <MultiSelect
        data={data}
        value={['React']}
        onChange={onChange}
        testID="ms"
      />
    );
    expect(screen.getByTestId('ms').props.placeholder).toBe('1 selected');
    expect(screen.getByText('React')).toBeTruthy();

    open();
    fireEvent.press(screen.getByLabelText('Vue'));
    expect(onChange).toHaveBeenCalledWith(['React', 'Vue']);
    expect(screen.getByTestId('ms').props.placeholder).toBe('1 selected');
    expect(screen.getByLabelText('Vue').props.accessibilityState.checked).toBe(
      false
    );
  });

  it('renders selected values as badges from defaultValue', () => {
    render(
      <MultiSelect data={data} defaultValue={['Vue', 'Svelte']} testID="ms" />
    );
    expect(screen.getByText('Vue')).toBeTruthy();
    expect(screen.getByText('Svelte')).toBeTruthy();
    expect(screen.queryByText('React')).toBeNull();
    expect(screen.getByTestId('ms').props.placeholder).toBe('2 selected');
  });

  it('limits displayed badges to maxSelectedValues and shows the remainder', () => {
    render(
      <MultiSelect
        data={data}
        defaultValue={['React', 'Vue', 'Angular']}
        maxSelectedValues={2}
        testID="ms"
      />
    );
    expect(screen.getByText('React')).toBeTruthy();
    expect(screen.getByText('Vue')).toBeTruthy();
    expect(screen.queryByText('Angular')).toBeNull();
    expect(screen.getByText('+1')).toBeTruthy();
  });

  it('shows every badge when maxSelectedValues is falsy', () => {
    render(
      <MultiSelect
        data={data}
        defaultValue={['React', 'Vue', 'Angular']}
        maxSelectedValues={0}
        testID="ms"
      />
    );
    expect(screen.getByText('React')).toBeTruthy();
    expect(screen.getByText('Vue')).toBeTruthy();
    expect(screen.getByText('Angular')).toBeTruthy();
    expect(screen.queryByText(/^\+/)).toBeNull();
  });

  it('does not open when disabled', () => {
    render(<MultiSelect data={data} disabled testID="ms" />);
    const trigger = getTrigger();
    expect(trigger).toBeDisabled();
    expect(trigger.props.accessibilityState).toEqual({
      expanded: false,
      disabled: true,
    });
    expect(screen.getByTestId('ms').props.editable).toBe(false);

    fireEvent.press(trigger);
    expect(screen.queryByLabelText('React')).toBeNull();
  });

  it('renders object data with disabled options', () => {
    const onChange = jest.fn();
    render(
      <MultiSelect
        data={[
          { value: 'a', label: 'Alpha' },
          { value: 'b', label: 'Beta', disabled: true },
        ]}
        onChange={onChange}
        testID="ms"
      />
    );
    open();
    const beta = screen.getByLabelText('Beta');
    expect(beta).toBeDisabled();
    expect(beta.props.accessibilityState).toEqual({
      checked: false,
      disabled: true,
    });

    fireEvent.press(screen.getByLabelText('Alpha'));
    expect(onChange).toHaveBeenLastCalledWith(['a']);
    // badge + option
    expect(screen.getAllByText('Alpha')).toHaveLength(2);
  });

  it('filters options when searchable and shows the empty state', () => {
    render(
      <MultiSelect
        data={data}
        searchable
        searchPlaceholder="Find"
        testID="ms"
      />
    );
    open();
    const search = screen.getByPlaceholderText('Find');
    expect(search.props.value).toBe('');

    fireEvent.changeText(search, 'VU');
    expect(screen.getByPlaceholderText('Find').props.value).toBe('VU');
    expect(screen.getByLabelText('Vue')).toBeTruthy();
    expect(screen.queryByLabelText('React')).toBeNull();

    fireEvent.changeText(search, 'zzz');
    expect(screen.getByText('No options found')).toBeTruthy();
  });

  it('does not render the search input when not searchable', () => {
    render(<MultiSelect data={data} testID="ms" />);
    open();
    expect(screen.queryByPlaceholderText('Search...')).toBeNull();
  });

  it('renders grouped options and toggles them', () => {
    const onChange = jest.fn();
    render(
      <MultiSelect data={groupedData} onChange={onChange} testID="ms" />
    );
    open();
    expect(screen.getByText('North America')).toBeTruthy();
    expect(screen.getByText('Europe')).toBeTruthy();
    expect(screen.getByLabelText('Other')).toBeTruthy();

    fireEvent.press(screen.getByLabelText('Canada'));
    expect(onChange).toHaveBeenLastCalledWith(['ca']);
    expect(screen.getByLabelText('Canada').props.accessibilityState).toEqual({
      checked: true,
      disabled: false,
    });

    const checkbox = within(screen.getByLabelText('United Kingdom')).getAllByRole(
      'checkbox'
    )[0]!;
    fireEvent.press(checkbox);
    expect(onChange).toHaveBeenLastCalledWith(['ca', 'uk']);

    fireEvent.press(screen.getByLabelText('Canada'));
    expect(onChange).toHaveBeenLastCalledWith(['uk']);
  });

  it('renders disabled grouped options', () => {
    render(
      <MultiSelect
        data={[
          { value: 'x', label: 'Ex', group: 'G', disabled: true },
          { value: 'y', label: 'Why', group: 'G' },
        ]}
        value={['y']}
        testID="ms"
      />
    );
    open();
    expect(screen.getByLabelText('Ex')).toBeDisabled();
    expect(screen.getByLabelText('Why').props.accessibilityState).toEqual({
      checked: true,
      disabled: false,
    });
  });

  it('shows clear and done buttons when clearable with a value', () => {
    const onChange = jest.fn();
    render(
      <MultiSelect
        data={data}
        clearable
        defaultValue={['React', 'Vue']}
        onChange={onChange}
        testID="ms"
      />
    );
    open();
    const done = screen.getByLabelText('Done, 2 selected');
    expect(done.props.accessibilityRole).toBe('button');
    expect(screen.getByText('Done (2)')).toBeTruthy();

    const clear = screen.getByLabelText('Clear all');
    expect(clear.props.accessibilityRole).toBe('button');
    fireEvent.press(clear);
    expect(onChange).toHaveBeenCalledWith([]);
    expect(screen.getByTestId('ms').props.placeholder).toBeUndefined();
    expect(screen.queryByLabelText('Clear all')).toBeNull();
  });

  it('closes the dropdown from the done button', () => {
    render(
      <MultiSelect data={data} clearable defaultValue={['React']} testID="ms" />
    );
    open();
    fireEvent.press(screen.getByLabelText('Done, 1 selected'));
    expect(screen.queryByLabelText('Vue')).toBeNull();
    expect(getTrigger().props.accessibilityState.expanded).toBe(false);
  });

  it('supports a custom clear label and controlled clear', () => {
    const onChange = jest.fn();
    render(
      <MultiSelect
        data={data}
        clearable
        clearButtonLabel="Reset"
        value={['React']}
        onChange={onChange}
        testID="ms"
      />
    );
    open();
    fireEvent.press(screen.getByLabelText('Reset'));
    expect(onChange).toHaveBeenCalledWith([]);
    expect(screen.getByTestId('ms').props.placeholder).toBe('1 selected');
  });

  it('hides the footer when clearable without a value', () => {
    render(<MultiSelect data={data} clearable testID="ms" />);
    open();
    expect(screen.queryByLabelText('Clear all')).toBeNull();
    expect(screen.queryByText(/^Done/)).toBeNull();
  });

  it('closes when the overlay is pressed', () => {
    render(<MultiSelect data={data} testID="ms" />);
    open();
    expect(screen.getByLabelText('React')).toBeTruthy();

    const overlay = within(getModal()).UNSAFE_getAllByType(TouchableOpacity)[0]!;
    fireEvent.press(overlay);
    expect(screen.queryByLabelText('React')).toBeNull();
  });

  it('closes on modal request close', () => {
    render(<MultiSelect data={data} testID="ms" />);
    open();
    fireEvent(getModal(), 'requestClose');
    expect(screen.queryByLabelText('React')).toBeNull();
  });

  it('renders icon', () => {
    render(<MultiSelect data={data} icon={<Text>icon</Text>} testID="ms" />);
    expect(screen.getByText('icon')).toBeTruthy();
  });

  it.each(['xs', 'sm', 'md', 'lg', 'xl'] as const)(
    'renders %s size',
    (size) => {
      render(<MultiSelect data={data} size={size} testID="ms" />);
      expect(screen.getByTestId('ms')).toBeTruthy();
    }
  );

  it('renders with radius, color, maxDropdownHeight and style', () => {
    render(
      <MultiSelect
        data={data}
        radius="xl"
        color="grape"
        maxDropdownHeight={150}
        style={{ paddingLeft: 3 }}
        defaultValue={['React']}
        testID="ms"
      />
    );
    expect(screen.getByTestId('ms')).toHaveStyle({ paddingLeft: 3 });
    open();
    const list = screen.UNSAFE_getByType('ScrollView' as any);
    expect(list.props.style).toEqual({ maxHeight: 150 });
  });
});
