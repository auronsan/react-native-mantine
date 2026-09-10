import { Modal, Text as RNText, TouchableOpacity, View } from 'react-native';
import {
  render,
  screen,
  fireEvent,
  act,
  renderHook,
} from '../../../__tests__/test-utils';
import { Combobox, useCombobox } from '../index';

function Target({ label = 'Open' }: { label?: string }) {
  return (
    <Combobox.Target>
      <TouchableOpacity testID="target">
        <RNText>{label}</RNText>
      </TouchableOpacity>
    </Combobox.Target>
  );
}

describe('useCombobox', () => {
  it('manages uncontrolled opened state', () => {
    const { result } = renderHook(() => useCombobox());
    expect(result.current.opened).toBe(false);

    act(() => result.current.open());
    expect(result.current.opened).toBe(true);

    act(() => result.current.close());
    expect(result.current.opened).toBe(false);

    act(() => result.current.toggle());
    expect(result.current.opened).toBe(true);
  });

  it('supports defaultOpened and controlled opened with onOpenedChange', () => {
    const { result: withDefault } = renderHook(() =>
      useCombobox({ defaultOpened: true })
    );
    expect(withDefault.current.opened).toBe(true);

    const onOpenedChange = jest.fn();
    const { result } = renderHook(() =>
      useCombobox({ opened: false, onOpenedChange })
    );
    act(() => result.current.open());
    expect(onOpenedChange).toHaveBeenCalledWith(true);
    expect(result.current.opened).toBe(false);
  });
});

describe('Combobox', () => {
  it('renders the target, passes testID through and toggles the dropdown', () => {
    render(
      <Combobox testID="combobox">
        <Target />
        <Combobox.Dropdown>
          <Combobox.Options>
            <Combobox.Option value="a">Option A</Combobox.Option>
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    );

    expect(screen.getByTestId('combobox')).toBeTruthy();
    const target = screen.getByTestId('target');
    expect(target.props.accessibilityRole).toBe('button');
    expect(target.props.accessibilityState).toEqual({ expanded: false });
    expect(screen.queryByText('Option A')).toBeNull();

    fireEvent.press(target);
    expect(screen.getByTestId('target').props.accessibilityState).toEqual({
      expanded: true,
    });
    expect(screen.getByText('Option A')).toBeTruthy();

    fireEvent.press(screen.getByTestId('target'));
    expect(screen.queryByText('Option A')).toBeNull();
  });

  it('keeps the child onPress of the target', () => {
    const onPress = jest.fn();
    render(
      <Combobox>
        <Combobox.Target>
          <TouchableOpacity onPress={onPress} testID="target">
            <RNText>Open</RNText>
          </TouchableOpacity>
        </Combobox.Target>
        <Combobox.Dropdown />
      </Combobox>
    );

    fireEvent.press(screen.getByTestId('target'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('submits options, calls option onPress and closes by default', () => {
    const onOptionSubmit = jest.fn();
    const onPress = jest.fn();
    render(
      <Combobox onOptionSubmit={onOptionSubmit}>
        <Target />
        <Combobox.Dropdown>
          <Combobox.Options maxHeight={100} style={{ margin: 1 }}>
            <Combobox.Option value="react" onPress={onPress} testID="react">
              React
            </Combobox.Option>
            <Combobox.Option value="node">
              <View testID="custom-option" />
            </Combobox.Option>
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    );

    fireEvent.press(screen.getByTestId('target'));
    expect(screen.getByTestId('custom-option')).toBeTruthy();
    const option = screen.getByTestId('react');
    expect(option.props.accessibilityRole).toBe('menuitem');
    expect(option.props.accessibilityState).toEqual({ disabled: false });

    fireEvent.press(option);
    expect(onPress).toHaveBeenCalledTimes(1);
    expect(onOptionSubmit).toHaveBeenCalledWith('react');
    expect(screen.queryByText('React')).toBeNull();
  });

  it('keeps the dropdown open when closeOnOptionSubmit is false', () => {
    const onOptionSubmit = jest.fn();
    render(
      <Combobox onOptionSubmit={onOptionSubmit} closeOnOptionSubmit={false}>
        <Target />
        <Combobox.Dropdown>
          <Combobox.Option value="react">React</Combobox.Option>
        </Combobox.Dropdown>
      </Combobox>
    );

    fireEvent.press(screen.getByTestId('target'));
    fireEvent.press(screen.getByText('React'));
    expect(onOptionSubmit).toHaveBeenCalledWith('react');
    expect(screen.getByText('React')).toBeTruthy();
  });

  it('ignores disabled options', () => {
    const onOptionSubmit = jest.fn();
    render(
      <Combobox onOptionSubmit={onOptionSubmit} closeOnOptionSubmit={false}>
        <Target />
        <Combobox.Dropdown>
          <Combobox.Option value="locked" disabled testID="locked">
            Locked
          </Combobox.Option>
        </Combobox.Dropdown>
      </Combobox>
    );

    fireEvent.press(screen.getByTestId('target'));
    const locked = screen.getByTestId('locked');
    expect(locked).toBeDisabled();
    expect(locked).toHaveStyle({ opacity: 0.4 });
    // RTL refuses to press disabled elements; call the composite handler directly
    const composite = screen
      .UNSAFE_getAllByProps({ testID: 'locked', disabled: true })
      .find((node) => typeof node.props.onPress === 'function')!;
    act(() => {
      composite.props.onPress();
    });
    expect(onOptionSubmit).not.toHaveBeenCalled();
  });

  it('closes from the overlay and the hardware back button', () => {
    render(
      <Combobox>
        <Target />
        <Combobox.Dropdown testID="dropdown">
          <Combobox.Option value="a">Option A</Combobox.Option>
        </Combobox.Dropdown>
      </Combobox>
    );

    fireEvent.press(screen.getByTestId('target'));
    expect(screen.getByTestId('dropdown')).toBeTruthy();
    fireEvent.press(screen.getByLabelText('Close dropdown'));
    expect(screen.queryByText('Option A')).toBeNull();

    fireEvent.press(screen.getByTestId('target'));
    act(() => {
      screen.UNSAFE_getByType(Modal).props.onRequestClose();
    });
    expect(screen.queryByText('Option A')).toBeNull();
  });

  it('renders search and empty state with string and node children', () => {
    const onChangeText = jest.fn();
    const { rerender } = render(
      <Combobox>
        <Target />
        <Combobox.Dropdown>
          <Combobox.Search
            placeholder="Search"
            onChangeText={onChangeText}
            style={{ margin: 2 }}
            testID="search"
          />
          <Combobox.Empty testID="empty">Nothing found</Combobox.Empty>
        </Combobox.Dropdown>
      </Combobox>
    );

    fireEvent.press(screen.getByTestId('target'));
    fireEvent.changeText(screen.getByPlaceholderText('Search'), 'rea');
    expect(onChangeText).toHaveBeenCalledWith('rea');
    expect(screen.getByTestId('search')).toHaveStyle({ margin: 2 });
    expect(screen.getByText('Nothing found')).toBeTruthy();

    rerender(
      <Combobox store={undefined}>
        <Target />
        <Combobox.Dropdown>
          <Combobox.Empty>
            <View testID="empty-node" />
          </Combobox.Empty>
        </Combobox.Dropdown>
      </Combobox>
    );
    expect(screen.getByTestId('empty-node')).toBeTruthy();
  });

  it('uses an external store', () => {
    function Example() {
      const store = useCombobox({ defaultOpened: true });
      return (
        <Combobox store={store}>
          <Target />
          <Combobox.Dropdown>
            <Combobox.Option value="a">Option A</Combobox.Option>
          </Combobox.Dropdown>
        </Combobox>
      );
    }

    render(<Example />);
    expect(screen.getByText('Option A')).toBeTruthy();
  });

  it('throws when sub-components are used outside Combobox', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(() =>
      render(<Combobox.Option value="a">Orphan</Combobox.Option>)
    ).toThrow('Combobox components must be used within Combobox');
    spy.mockRestore();
  });
});
