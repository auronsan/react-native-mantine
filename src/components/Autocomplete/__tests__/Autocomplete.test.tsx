import { Modal, TouchableOpacity, View } from 'react-native';
import { render, screen, fireEvent, act } from '../../../__tests__/test-utils';
import { Autocomplete } from '../index';

const data = ['React', 'Vue', 'Svelte', 'Angular', 'Solid', 'Preact'];

describe('Autocomplete', () => {
  it('renders the input with label, placeholder and testID', () => {
    render(
      <Autocomplete
        data={data}
        label="Framework"
        placeholder="Pick one"
        description="Choose wisely"
        testID="input"
      />
    );

    const input = screen.getByTestId('input');
    expect(input.props.placeholder).toBe('Pick one');
    expect(screen.getByText('Framework')).toBeTruthy();
    expect(screen.getByText('Choose wisely')).toBeTruthy();
    expect(input.props.accessibilityRole).toBe('combobox');
    expect(input.props.accessibilityLabel).toBe('Framework');
    expect(input.props.accessibilityState).toEqual({ expanded: false });
    expect(screen.queryByText('React')).toBeNull();
  });

  it('opens suggestions while typing, filters and limits them', () => {
    const onChange = jest.fn();
    render(<Autocomplete data={data} limit={2} onChange={onChange} testID="input" />);

    fireEvent.changeText(screen.getByTestId('input'), 're');
    expect(onChange).toHaveBeenCalledWith('re');
    expect(screen.getByTestId('input').props.accessibilityState).toEqual({
      expanded: true,
    });

    // "re" matches React and Preact only
    expect(screen.getByText('React')).toBeTruthy();
    expect(screen.getByText('Preact')).toBeTruthy();
    expect(screen.queryByText('Vue')).toBeNull();
  });

  it('selects an item, updates the value and closes the dropdown (uncontrolled)', () => {
    const onChange = jest.fn();
    const onItemSubmit = jest.fn();
    render(
      <Autocomplete
        data={[{ value: 'react', label: 'React' }, { value: 'vue' }]}
        onChange={onChange}
        onItemSubmit={onItemSubmit}
        testID="input"
      />
    );

    fireEvent.changeText(screen.getByTestId('input'), 'v');
    const item = screen.getByText('vue');
    expect(item.parent?.props.accessibilityRole ?? screen.getByLabelText('vue')).toBeTruthy();
    fireEvent.press(screen.getByLabelText('vue'));

    expect(onItemSubmit).toHaveBeenCalledWith({ value: 'vue' });
    expect(onChange).toHaveBeenLastCalledWith('vue');
    expect(screen.getByTestId('input').props.value).toBe('vue');
    expect(screen.queryByText('vue')).toBeNull();
  });

  it('does not change internal state in controlled mode', () => {
    const onChange = jest.fn();
    render(
      <Autocomplete data={data} value="Re" onChange={onChange} testID="input" />
    );

    fireEvent.changeText(screen.getByTestId('input'), 'Vu');
    expect(onChange).toHaveBeenCalledWith('Vu');
    expect(screen.getByTestId('input').props.value).toBe('Re');

    fireEvent.press(screen.getByLabelText('React'));
    expect(onChange).toHaveBeenLastCalledWith('React');
    expect(screen.getByTestId('input').props.value).toBe('Re');
  });

  it('uses defaultValue and opens on focus when there is a value', () => {
    render(<Autocomplete data={data} defaultValue="Sv" testID="input" />);
    const input = screen.getByTestId('input');
    expect(input.props.value).toBe('Sv');
    expect(screen.queryByText('Svelte')).toBeNull();

    fireEvent(input, 'focus');
    expect(screen.getByText('Svelte')).toBeTruthy();
  });

  it('does not open on focus when empty or disabled', () => {
    const { rerender } = render(<Autocomplete data={data} testID="input" />);
    fireEvent(screen.getByTestId('input'), 'focus');
    expect(screen.queryByText('React')).toBeNull();

    rerender(<Autocomplete data={data} defaultValue="Re" disabled testID="input" />);
    const input = screen.getByTestId('input');
    expect(input.props.editable).toBe(false);
    fireEvent(input, 'focus');
    expect(screen.queryByText('React')).toBeNull();
  });

  it('renders grouped data with group labels and skips disabled items', () => {
    const onItemSubmit = jest.fn();
    render(
      <Autocomplete
        data={[
          { value: 'apple', label: 'Apple', group: 'Fruits' },
          { value: 'avocado', label: 'Avocado', group: 'Fruits', disabled: true },
          { value: 'asparagus', group: 'Vegetables' },
          { value: 'almond' },
        ]}
        onItemSubmit={onItemSubmit}
        testID="input"
      />
    );

    fireEvent.changeText(screen.getByTestId('input'), 'a');
    expect(screen.getByText('Fruits')).toBeTruthy();
    expect(screen.getByText('Vegetables')).toBeTruthy();
    expect(screen.getByText('almond')).toBeTruthy();
    expect(screen.getByLabelText('Avocado')).toBeDisabled();

    fireEvent.press(screen.getByLabelText('Apple'));
    expect(onItemSubmit).toHaveBeenCalledWith(
      expect.objectContaining({ value: 'apple' })
    );
    expect(screen.queryByText('Fruits')).toBeNull();

    // Pressing a disabled item bubbles to the overlay and only closes the dropdown
    fireEvent.changeText(screen.getByTestId('input'), 'av');
    fireEvent.press(screen.getByLabelText('Avocado'));
    expect(onItemSubmit).toHaveBeenCalledTimes(1);
    expect(screen.queryByText('Fruits')).toBeNull();
  });

  it('shows nothingFound when no item matches and hides dropdown otherwise', () => {
    const { rerender } = render(
      <Autocomplete data={data} nothingFound="No results" testID="input" />
    );

    fireEvent.changeText(screen.getByTestId('input'), 'zzz');
    expect(screen.getByText('No results')).toBeTruthy();

    rerender(<Autocomplete data={data} testID="input" />);
    fireEvent.changeText(screen.getByTestId('input'), 'zzz');
    expect(screen.queryByText('No results')).toBeNull();
  });

  it('supports a custom filter function', () => {
    render(
      <Autocomplete
        data={data}
        filter={(value, item) => item.value.startsWith(value)}
        testID="input"
      />
    );

    fireEvent.changeText(screen.getByTestId('input'), 'S');
    expect(screen.getByText('Svelte')).toBeTruthy();
    expect(screen.getByText('Solid')).toBeTruthy();
    expect(screen.queryByText('React')).toBeNull();
  });

  it('closes the dropdown from the overlay press and hardware back', () => {
    render(<Autocomplete data={data} testID="input" />);
    fireEvent.changeText(screen.getByTestId('input'), 'r');
    expect(screen.getByText('React')).toBeTruthy();

    const overlay = screen.UNSAFE_getAllByType(TouchableOpacity)[0]!;
    fireEvent.press(overlay);
    expect(screen.queryByText('React')).toBeNull();

    fireEvent.changeText(screen.getByTestId('input'), 're');
    expect(screen.getByText('React')).toBeTruthy();
    act(() => {
      screen.UNSAFE_getByType(Modal).props.onRequestClose();
    });
    expect(screen.queryByText('React')).toBeNull();
  });

  it('forwards error, required, icon, right section, size, radius and variant', () => {
    render(
      <Autocomplete
        data={data}
        label="Field"
        required
        error="Required"
        icon={<View testID="icon" />}
        rightSection={<View testID="right" />}
        size="lg"
        radius="xl"
        variant="filled"
        color="teal"
        dropdownPosition="top"
        maxDropdownHeight={200}
        accessibilityLabel="Custom label"
        accessibilityHint="Type to search"
        testID="input"
      />
    );

    expect(screen.getByText('Required')).toBeTruthy();
    expect(screen.getByText(' *')).toBeTruthy();
    expect(screen.getByTestId('icon')).toBeTruthy();
    expect(screen.getByTestId('right')).toBeTruthy();
    const input = screen.getByTestId('input');
    expect(input.props.accessibilityLabel).toBe('Custom label');
    expect(input.props.accessibilityHint).toBe('Type to search');
  });

  it('falls back to a generic accessibility label for node labels', () => {
    render(<Autocomplete data={data} label={<View />} testID="input" />);
    expect(screen.getByTestId('input').props.accessibilityLabel).toBe('Autocomplete');
  });
});
