import { Text } from 'react-native';
import { render, screen, fireEvent } from '../../../__tests__/test-utils';
import { OverflowList } from '../index';
import { createTheme } from '../../../theme/create-theme';

const theme = createTheme();

const layout = (element: any, width: number) =>
  fireEvent(element, 'layout', {
    nativeEvent: { layout: { x: 0, y: 0, width, height: 20 } },
  } as any);

const renderItem = (item: string, index: number) => (
  <Text testID={`item-${index}`}>{item}</Text>
);

// The hidden measure strip renders every item first, so the first match of a
// testID is always the measured copy.
const measureItem = (index: number, width: number) =>
  layout(screen.getAllByTestId(`item-${index}`)[0], width);

/**
 * Runs the container, item and overflow indicator layout events.
 */
const measureAll = (
  count: number,
  itemWidth: number,
  containerWidth: number,
  overflowWidth: number,
  overflowLabel: string | RegExp = `+${count}`
) => {
  layout(screen.getByTestId('list'), containerWidth);
  for (let i = 0; i < count; i += 1) {
    measureItem(i, itemWidth);
  }
  layout(screen.getAllByText(overflowLabel)[0], overflowWidth);
};

const items = ['Item A', 'Item B', 'Item C', 'Item D', 'Item E'];

describe('OverflowList', () => {
  it('renders all items before measurement', () => {
    render(<OverflowList testID="list" data={items} renderItem={renderItem} />);
    expect(screen.getByTestId('list')).toHaveStyle({
      flexDirection: 'row',
      gap: theme.spacing.xs,
    });
    // measure strip + visible copy
    expect(screen.getAllByText('Item A')).toHaveLength(2);
    expect(screen.getAllByText('Item E')).toHaveLength(2);
    // only the measure strip shows the full-size overflow indicator
    expect(screen.getAllByText('+5')).toHaveLength(1);
  });

  it('shows every item when they fit', () => {
    render(<OverflowList testID="list" data={items} renderItem={renderItem} />);
    measureAll(5, 40, 500, 30);
    expect(screen.getAllByText('Item E')).toHaveLength(2);
    expect(screen.queryByText(/^\+[1-4]$/)).toBeNull();
  });

  it('collapses items from the end that do not fit', () => {
    render(<OverflowList testID="list" data={items} renderItem={renderItem} />);
    measureAll(5, 100, 300, 30);
    // budget = 300 - 30 - gap, two items of 100 (+gap) fit
    expect(screen.getAllByText('Item A')).toHaveLength(2);
    expect(screen.getAllByText('Item B')).toHaveLength(2);
    expect(screen.getAllByText('Item C')).toHaveLength(1);
    expect(screen.getByText('+3')).toBeTruthy();
    expect(screen.getByText('+3')).toHaveStyle({
      color: theme.fn.dimmed(),
    });
  });

  it('collapses items from the start when collapseFrom="start"', () => {
    render(
      <OverflowList
        testID="list"
        data={items}
        renderItem={renderItem}
        collapseFrom="start"
        renderOverflow={(hidden) => <Text>hidden:{hidden.length}</Text>}
      />
    );
    measureAll(5, 100, 300, 30, 'hidden:5');
    expect(screen.getAllByText('Item E')).toHaveLength(2);
    expect(screen.getAllByText('Item D')).toHaveLength(2);
    expect(screen.getAllByText('Item A')).toHaveLength(1);
    expect(screen.getByText('hidden:3')).toBeTruthy();
    // overflow indicator is rendered before the visible items
    const order = screen
      .getAllByText(/hidden:|Item/)
      .map((element) => element.children.join(''));
    expect(order.slice(-3)).toEqual(['hidden:3', 'Item D', 'Item E']);
  });

  it('respects maxVisibleItems without measurement', () => {
    render(
      <OverflowList
        testID="list"
        data={items}
        renderItem={renderItem}
        maxVisibleItems={2}
      />
    );
    expect(screen.getAllByText('Item B')).toHaveLength(2);
    expect(screen.getAllByText('Item C')).toHaveLength(1);
    expect(screen.getByText('+3')).toBeTruthy();
  });

  it('respects maxVisibleItems after measurement when everything fits', () => {
    render(
      <OverflowList
        testID="list"
        data={items}
        renderItem={renderItem}
        maxVisibleItems={3}
      />
    );
    measureAll(5, 10, 1000, 30);
    expect(screen.getAllByText('Item C')).toHaveLength(2);
    expect(screen.getAllByText('Item D')).toHaveLength(1);
    expect(screen.getByText('+2')).toBeTruthy();
  });

  it('shows only the overflow indicator when nothing fits', () => {
    render(<OverflowList testID="list" data={items} renderItem={renderItem} />);
    measureAll(5, 100, 50, 30);
    expect(screen.getAllByText('Item A')).toHaveLength(1);
    expect(screen.getAllByText('+5')).toHaveLength(2);
  });

  it('supports numeric gap', () => {
    render(
      <OverflowList
        testID="list"
        data={items}
        renderItem={renderItem}
        gap={20}
      />
    );
    expect(screen.getByTestId('list')).toHaveStyle({ gap: 20 });
    measureAll(5, 100, 300, 30);
    // budget = 250, 100 + 20 + 100 fits, the third does not
    expect(screen.getByText('+3')).toBeTruthy();
  });

  it('supports theme gap keys and unknown keys', () => {
    render(
      <OverflowList
        testID="list"
        data={items}
        renderItem={renderItem}
        gap="lg"
      />
    );
    expect(screen.getByTestId('list')).toHaveStyle({ gap: theme.spacing.lg });

    render(
      <OverflowList
        testID="list-unknown"
        data={items}
        renderItem={renderItem}
        gap={'nope' as any}
      />
    );
    expect(screen.getByTestId('list-unknown')).toHaveStyle({
      gap: theme.spacing.xs,
    });
  });

  it('uses getItemKey for keys', () => {
    const getItemKey = jest.fn((item: string) => item);
    render(
      <OverflowList
        testID="list"
        data={items}
        renderItem={renderItem}
        getItemKey={getItemKey}
      />
    );
    expect(getItemKey).toHaveBeenCalledWith('Item A', 0);
    expect(screen.getAllByText('Item A')).toHaveLength(2);
  });

  it('renders nothing for empty data', () => {
    render(<OverflowList testID="list" data={[]} renderItem={renderItem} />);
    const list = screen.getByTestId('list');
    layout(list, 300);
    expect(screen.getByText('+0')).toBeTruthy();
    expect(screen.queryByTestId('item-0')).toBeNull();
  });

  it('resets measurements when data changes', () => {
    const { rerender } = render(
      <OverflowList testID="list" data={items} renderItem={renderItem} />
    );
    measureAll(5, 100, 300, 30);
    expect(screen.getByText('+3')).toBeTruthy();

    const next = ['New 1', 'New 2'];
    rerender(
      <OverflowList testID="list" data={next} renderItem={renderItem} />
    );
    // not measured yet: all items visible
    expect(screen.getAllByText('New 2')).toHaveLength(2);
    expect(screen.queryByText('+3')).toBeNull();

    measureItem(0, 100);
    measureItem(1, 100);
    layout(screen.getAllByText('+2')[0], 30);
    expect(screen.getAllByText('New 2')).toHaveLength(2);
  });

  it('merges custom style and passes other props', () => {
    render(
      <OverflowList
        testID="list"
        data={items}
        renderItem={renderItem}
        style={{ margin: 3 }}
        accessibilityLabel="Tag list"
      />
    );
    expect(screen.getByTestId('list')).toHaveStyle({ margin: 3 });
    expect(screen.getByLabelText('Tag list')).toBeTruthy();
  });
});
