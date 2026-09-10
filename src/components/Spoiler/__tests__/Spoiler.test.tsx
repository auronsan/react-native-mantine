import { Text } from 'react-native';
import { render, screen, fireEvent } from '../../../__tests__/test-utils';
import { Spoiler } from '../index';

type ReactTestInstance = ReturnType<typeof screen.getByTestId>;

const layout = (height: number) =>
  ({ nativeEvent: { layout: { x: 0, y: 0, width: 300, height } } }) as never;

const getHostParent = (node: ReactTestInstance): ReactTestInstance => {
  let current = node.parent;
  while (current && typeof current.type !== 'string') {
    current = current.parent;
  }
  if (!current) {
    throw new Error('host parent not found');
  }
  return current;
};

const getContentWrapper = (): ReactTestInstance => {
  const [wrapper] = screen.UNSAFE_root.findAll(
    (node: ReactTestInstance) =>
      typeof node.type === 'string' && typeof node.props.onLayout === 'function'
  );
  if (!wrapper) {
    throw new Error('content wrapper not found');
  }
  return wrapper;
};

describe('Spoiler', () => {
  it('renders children and no control before content is measured', () => {
    render(
      <Spoiler maxHeight={100} testID="spoiler">
        <Text>Long content</Text>
      </Spoiler>
    );

    expect(screen.getByText('Long content')).toBeTruthy();
    expect(screen.getByTestId('spoiler')).toBeTruthy();
    expect(screen.queryByText('Show more')).toBeNull();
  });

  it('does not show control when content fits within maxHeight', () => {
    render(
      <Spoiler maxHeight={100}>
        <Text>Short content</Text>
      </Spoiler>
    );

    fireEvent(getContentWrapper(), 'layout', layout(80));
    expect(screen.queryByText('Show more')).toBeNull();
  });

  it('ignores zero-height layouts', () => {
    render(
      <Spoiler maxHeight={100}>
        <Text>Short content</Text>
      </Spoiler>
    );

    fireEvent(getContentWrapper(), 'layout', layout(0));
    expect(screen.queryByText('Show more')).toBeNull();
  });

  it('shows control and toggles uncontrolled expanded state', () => {
    const onExpandedChange = jest.fn();
    render(
      <Spoiler maxHeight={100} onExpandedChange={onExpandedChange}>
        <Text>Long content</Text>
      </Spoiler>
    );

    fireEvent(getContentWrapper(), 'layout', layout(300));
    expect(screen.getByText('Show more')).toBeTruthy();

    expect(getHostParent(getContentWrapper())).toHaveStyle({
      maxHeight: 100,
      overflow: 'hidden',
    });

    fireEvent.press(screen.getByText('Show more'));
    expect(onExpandedChange).toHaveBeenCalledWith(true);
    expect(screen.getByText('Show less')).toBeTruthy();
    expect(getHostParent(getContentWrapper())).not.toHaveStyle({
      maxHeight: 100,
    });

    fireEvent.press(screen.getByText('Show less'));
    expect(onExpandedChange).toHaveBeenCalledWith(false);
    expect(screen.getByText('Show more')).toBeTruthy();
  });

  it('respects controlled expanded prop', () => {
    const onExpandedChange = jest.fn();
    const { rerender } = render(
      <Spoiler maxHeight={50} expanded onExpandedChange={onExpandedChange}>
        <Text>Long content</Text>
      </Spoiler>
    );

    fireEvent(getContentWrapper(), 'layout', layout(200));
    expect(screen.getByText('Show less')).toBeTruthy();

    fireEvent.press(screen.getByText('Show less'));
    expect(onExpandedChange).toHaveBeenCalledWith(false);
    // still expanded because it is controlled
    expect(screen.getByText('Show less')).toBeTruthy();

    rerender(
      <Spoiler
        maxHeight={50}
        expanded={false}
        onExpandedChange={onExpandedChange}
      >
        <Text>Long content</Text>
      </Spoiler>
    );
    expect(screen.getByText('Show more')).toBeTruthy();
  });

  it('uses custom show/hide labels', () => {
    render(
      <Spoiler maxHeight={10} showLabel="Expand" hideLabel="Collapse">
        <Text>Long content</Text>
      </Spoiler>
    );

    fireEvent(getContentWrapper(), 'layout', layout(500));
    expect(screen.getByText('Expand')).toBeTruthy();
    fireEvent.press(screen.getByText('Expand'));
    expect(screen.getByText('Collapse')).toBeTruthy();
  });

  it('passes testID and style when spoiler is shown', () => {
    render(
      <Spoiler maxHeight={10} testID="spoiler" style={{ marginTop: 4 }}>
        <Text>Long content</Text>
      </Spoiler>
    );

    fireEvent(getContentWrapper(), 'layout', layout(500));
    expect(screen.getByTestId('spoiler')).toHaveStyle({ marginTop: 4 });
    expect(screen.getByText('Show more')).toBeTruthy();
  });
});
