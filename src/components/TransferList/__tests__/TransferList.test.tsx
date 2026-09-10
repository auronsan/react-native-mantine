import { Text } from 'react-native';
import { render as rtlRender } from '@testing-library/react-native';
import { render, screen, fireEvent } from '../../../__tests__/test-utils';
import { ThemeProvider } from '../../../theme/theme-provider';
import { createTheme } from '../../../theme/create-theme';
import {
  TransferList,
  type TransferListData,
  type TransferListDataItem,
} from '../index';

const leftItems: TransferListDataItem[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry', group: 'fruits' },
];
const rightItems: TransferListDataItem[] = [
  { value: 'carrot', label: 'Carrot' },
];

const makeValue = (
  leftSelected: string[] = [],
  rightSelected: string[] = []
): [TransferListData, TransferListData] => [
  { items: leftItems, selectedValues: leftSelected },
  { items: rightItems, selectedValues: rightSelected },
];

describe('TransferList', () => {
  it('renders both lists with items', () => {
    render(
      <TransferList value={makeValue()} onChange={jest.fn()} testID="tl" />
    );
    expect(screen.getByTestId('tl')).toBeTruthy();
    expect(screen.getByText('Apple')).toBeTruthy();
    expect(screen.getByText('Banana')).toBeTruthy();
    expect(screen.getByText('Cherry')).toBeTruthy();
    expect(screen.getByText('Carrot')).toBeTruthy();
    expect(screen.getByText('»')).toBeTruthy();
    expect(screen.getByText('›')).toBeTruthy();
    expect(screen.getByText('‹')).toBeTruthy();
    expect(screen.getByText('«')).toBeTruthy();
  });

  it('renders titles when provided and hides empty titles', () => {
    const { rerender } = render(
      <TransferList
        value={makeValue()}
        onChange={jest.fn()}
        titles={['Available', 'Chosen']}
      />
    );
    expect(screen.getByText('Available')).toBeTruthy();
    expect(screen.getByText('Chosen')).toBeTruthy();

    rerender(<TransferList value={makeValue()} onChange={jest.fn()} />);
    expect(screen.queryByText('Available')).toBeNull();
  });

  it('shows "No items" for empty lists', () => {
    render(
      <TransferList
        value={[
          { items: [], selectedValues: [] },
          { items: [], selectedValues: [] },
        ]}
        onChange={jest.fn()}
      />
    );
    expect(screen.getAllByText('No items')).toHaveLength(2);
  });

  it('toggles selection on the left list', () => {
    const onChange = jest.fn();
    render(<TransferList value={makeValue()} onChange={onChange} />);
    fireEvent.press(screen.getByText('Apple'));
    expect(onChange).toHaveBeenCalledWith([
      { items: leftItems, selectedValues: ['apple'] },
      { items: rightItems, selectedValues: [] },
    ]);
  });

  it('deselects an already selected item', () => {
    const onChange = jest.fn();
    render(
      <TransferList
        value={makeValue(['apple', 'banana'])}
        onChange={onChange}
      />
    );
    fireEvent.press(screen.getByText('Apple'));
    expect(onChange).toHaveBeenCalledWith([
      { items: leftItems, selectedValues: ['banana'] },
      { items: rightItems, selectedValues: [] },
    ]);
  });

  it('toggles selection on the right list', () => {
    const onChange = jest.fn();
    render(<TransferList value={makeValue()} onChange={onChange} />);
    fireEvent.press(screen.getByText('Carrot'));
    expect(onChange).toHaveBeenCalledWith([
      { items: leftItems, selectedValues: [] },
      { items: rightItems, selectedValues: ['carrot'] },
    ]);
  });

  it('exposes exactly one checkbox role per row, on the row itself', () => {
    render(<TransferList value={makeValue(['apple'])} onChange={jest.fn()} />);
    const rows = screen.getAllByRole('checkbox');
    // 3 left items + 1 right item, no extra role from the decorative Checkbox
    expect(rows).toHaveLength(4);
    expect(rows.map((el) => el.props.accessibilityLabel)).toEqual([
      'Apple',
      'Banana',
      'Cherry',
      'Carrot',
    ]);
    expect(rows.map((el) => el.props.accessibilityState?.checked)).toEqual([
      true,
      false,
      false,
      false,
    ]);
  });

  it('renders the inner checkbox as decorative and non-interactive', () => {
    const onChange = jest.fn();
    render(<TransferList value={makeValue()} onChange={onChange} />);

    type Instance = ReturnType<typeof screen.getByTestId>;
    const decorativeWrappers: Instance[] = screen.UNSAFE_root.findAll(
      (node: Instance) =>
        typeof node.type === 'string' && node.props.pointerEvents === 'none'
    );
    expect(decorativeWrappers).toHaveLength(4);
    decorativeWrappers.forEach((wrapper) => {
      expect(wrapper.props.accessible).toBe(false);
      expect(wrapper.props.importantForAccessibility).toBe(
        'no-hide-descendants'
      );
    });

    // The decorative checkbox is hidden from assistive technology, so it is
    // excluded from default queries.
    expect(screen.queryAllByText('✓')).toHaveLength(0);

    // Pressing the decorative checkbox still selects the row through the
    // row touchable (the press bubbles to the nearest enabled onPress).
    const checkmark = screen.getAllByText('✓', {
      includeHiddenElements: true,
    })[0]!;
    fireEvent.press(checkmark);
    expect(onChange).toHaveBeenCalledWith([
      { items: leftItems, selectedValues: ['apple'] },
      { items: rightItems, selectedValues: [] },
    ]);
  });

  it('transfers selected items to the right', () => {
    const onChange = jest.fn();
    render(
      <TransferList
        value={makeValue(['apple', 'cherry'])}
        onChange={onChange}
      />
    );
    fireEvent.press(screen.getByText('›'));
    expect(onChange).toHaveBeenCalledWith([
      { items: [leftItems[1]], selectedValues: [] },
      {
        items: [rightItems[0], leftItems[0], leftItems[2]],
        selectedValues: [],
      },
    ]);
  });

  it('transfers selected items to the left', () => {
    const onChange = jest.fn();
    render(
      <TransferList value={makeValue([], ['carrot'])} onChange={onChange} />
    );
    fireEvent.press(screen.getByText('‹'));
    expect(onChange).toHaveBeenCalledWith([
      { items: [...leftItems, rightItems[0]], selectedValues: [] },
      { items: [], selectedValues: [] },
    ]);
  });

  it('transfers all items to the right', () => {
    const onChange = jest.fn();
    render(<TransferList value={makeValue()} onChange={onChange} />);
    fireEvent.press(screen.getByText('»'));
    expect(onChange).toHaveBeenCalledWith([
      { items: [], selectedValues: [] },
      { items: [...rightItems, ...leftItems], selectedValues: [] },
    ]);
  });

  it('transfers all items to the left', () => {
    const onChange = jest.fn();
    render(<TransferList value={makeValue()} onChange={onChange} />);
    fireEvent.press(screen.getByText('«'));
    expect(onChange).toHaveBeenCalledWith([
      { items: [...leftItems, ...rightItems], selectedValues: [] },
      { items: [], selectedValues: [] },
    ]);
  });

  it('disables transfer buttons when nothing is selected or lists are empty', () => {
    const onChange = jest.fn();
    render(
      <TransferList
        value={[
          { items: leftItems, selectedValues: [] },
          { items: [], selectedValues: [] },
        ]}
        onChange={onChange}
      />
    );
    fireEvent.press(screen.getByText('›'));
    fireEvent.press(screen.getByText('‹'));
    fireEvent.press(screen.getByText('«'));
    expect(onChange).not.toHaveBeenCalled();

    fireEvent.press(screen.getByText('»'));
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('filters items with search when searchable', () => {
    render(
      <TransferList
        value={makeValue()}
        onChange={jest.fn()}
        searchable
        searchPlaceholder="Find..."
      />
    );
    const inputs = screen.getAllByPlaceholderText('Find...');
    expect(inputs).toHaveLength(2);

    fireEvent.changeText(inputs[0]!, 'an');
    expect(screen.getAllByPlaceholderText('Find...')[0]!.props.value).toBe(
      'an'
    );
    expect(screen.getByText('Banana')).toBeTruthy();
    expect(screen.queryByText('Apple')).toBeNull();
    expect(screen.queryByText('Cherry')).toBeNull();
    // right list unaffected
    expect(screen.getByText('Carrot')).toBeTruthy();

    fireEvent.changeText(inputs[1]!, 'zzz');
    expect(screen.queryByText('Carrot')).toBeNull();
    expect(screen.getByText('No items')).toBeTruthy();
  });

  it('does not render search inputs by default', () => {
    render(<TransferList value={makeValue()} onChange={jest.fn()} />);
    expect(screen.queryByPlaceholderText('Search...')).toBeNull();
  });

  it('renders a custom itemComponent', () => {
    const Item = ({
      data,
      selected,
    }: {
      data: TransferListDataItem;
      selected: boolean;
    }) => <Text testID={`item-${data.value}`}>{selected ? 'on' : 'off'}</Text>;
    render(
      <TransferList
        value={makeValue(['apple'])}
        onChange={jest.fn()}
        itemComponent={Item}
      />
    );
    expect(screen.getByTestId('item-apple')).toHaveTextContent('on');
    expect(screen.getByTestId('item-banana')).toHaveTextContent('off');
  });

  it('applies style, color, size, radius and listHeight props', () => {
    render(
      <TransferList
        value={makeValue(['apple'])}
        onChange={jest.fn()}
        testID="tl"
        style={{ margin: 6 }}
        color="red"
        size="sm"
        radius="lg"
        listHeight={120}
        transferAllMatchingFilter
      />
    );
    expect(screen.getByTestId('tl')).toHaveStyle({ margin: 6 });
    expect(screen.getByText('Apple')).toBeTruthy();
  });

  it('items are accessible buttons', () => {
    render(<TransferList value={makeValue()} onChange={jest.fn()} />);
    expect(screen.getAllByRole('button').length).toBeGreaterThan(0);
  });

  it('renders in dark color scheme', () => {
    const darkTheme = createTheme({ colorScheme: 'dark' });
    rtlRender(
      <ThemeProvider theme={darkTheme} forceMode="dark">
        <TransferList
          value={makeValue(['apple'])}
          onChange={jest.fn()}
          titles={['Left', 'Right']}
          searchable
          testID="tl"
        />
      </ThemeProvider>
    );
    expect(screen.getByTestId('tl')).toBeTruthy();
    expect(screen.getByText('Left')).toHaveStyle({
      color: darkTheme.fn.themeColor('dark', 0),
    });
    expect(screen.getByText('Apple')).toHaveStyle({
      color: darkTheme.fn.themeColor('dark', 0),
    });
  });

  it('has displayName', () => {
    expect(TransferList.displayName).toBe('TransferList');
  });
});
