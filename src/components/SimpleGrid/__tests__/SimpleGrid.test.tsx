import { Dimensions, StyleSheet, Text } from 'react-native';
import { render, screen, act } from '../../../__tests__/test-utils';
import { SimpleGrid } from '../index';

type ReactTestInstance = ReturnType<typeof screen.getByTestId>;

type DimensionsHandler = (payload: { window: { width: number } }) => void;

const getChildWrappers = (grid: ReactTestInstance) =>
  (grid.children as ReactTestInstance[]).map((child) =>
    StyleSheet.flatten(child.props.style)
  );

describe('SimpleGrid', () => {
  let getSpy: jest.SpyInstance;
  let listenerSpy: jest.SpyInstance;
  let dimensionsHandler: DimensionsHandler | undefined;
  const remove = jest.fn();

  beforeEach(() => {
    dimensionsHandler = undefined;
    remove.mockClear();
    getSpy = jest.spyOn(Dimensions, 'get').mockReturnValue({
      width: 1000,
      height: 800,
      scale: 2,
      fontScale: 2,
    });
    listenerSpy = jest
      .spyOn(Dimensions, 'addEventListener')
      .mockImplementation(((_type: string, handler: DimensionsHandler) => {
        dimensionsHandler = handler;
        return { remove };
      }) as never);
  });

  afterEach(() => {
    getSpy.mockRestore();
    listenerSpy.mockRestore();
  });

  it('renders children wrapped in grid cells with default cols', () => {
    render(
      <SimpleGrid>
        <Text>A</Text>
        <Text>B</Text>
      </SimpleGrid>
    );

    expect(screen.getByText('A')).toBeTruthy();
    expect(screen.getByText('B')).toBeTruthy();

    const grid = screen.root;
    expect(grid).toHaveStyle({ flexDirection: 'row', flexWrap: 'wrap' });

    const cells = getChildWrappers(grid);
    expect(cells).toHaveLength(2);
    expect(cells[0]).toMatchObject({ flexBasis: '100%' });
  });

  it('computes flexBasis from cols and paddings from spacing', () => {
    render(
      <SimpleGrid cols={4} spacing="xl" verticalSpacing="xs">
        <Text>A</Text>
      </SimpleGrid>
    );

    const [cell] = getChildWrappers(screen.root);
    expect(cell).toMatchObject({
      flexBasis: '25%',
      paddingHorizontal: 12,
      paddingVertical: 5,
    });
    expect(screen.root).toHaveStyle({ margin: -12 });
  });

  it('accepts numeric spacing', () => {
    render(
      <SimpleGrid cols={2} spacing={20}>
        <Text>A</Text>
      </SimpleGrid>
    );

    const [cell] = getChildWrappers(screen.root);
    expect(cell).toMatchObject({
      flexBasis: '50%',
      paddingHorizontal: 10,
      paddingVertical: 10,
    });
  });

  it('applies breakpoint cols and spacing when width is below maxWidth', () => {
    getSpy.mockReturnValue({ width: 500, height: 800, scale: 2, fontScale: 2 });

    render(
      <SimpleGrid
        cols={4}
        spacing="xl"
        breakpoints={[{ maxWidth: 600, cols: 2, spacing: 'xs' }]}
      >
        <Text>A</Text>
      </SimpleGrid>
    );

    const [cell] = getChildWrappers(screen.root);
    expect(cell).toMatchObject({ flexBasis: '50%', paddingHorizontal: 5 });
  });

  it('keeps base spacing when the breakpoint has no spacing', () => {
    getSpy.mockReturnValue({ width: 800, height: 800, scale: 2, fontScale: 2 });

    render(
      <SimpleGrid
        cols={4}
        spacing="xl"
        breakpoints={[
          { maxWidth: 600, cols: 2, spacing: 'xs' },
          { maxWidth: 900, cols: 3 },
        ]}
      >
        <Text>A</Text>
      </SimpleGrid>
    );

    const [cell] = getChildWrappers(screen.root);
    expect(cell?.flexBasis).toBe(`${100 / 3}%`);
    expect(cell).toMatchObject({ paddingHorizontal: 12 });
  });

  it('uses the smallest matching breakpoint regardless of declaration order', () => {
    getSpy.mockReturnValue({ width: 500, height: 800, scale: 2, fontScale: 2 });

    render(
      <SimpleGrid
        cols={4}
        breakpoints={[
          { maxWidth: 900, cols: 3 },
          { maxWidth: 600, cols: 2 },
        ]}
      >
        <Text>A</Text>
      </SimpleGrid>
    );

    const [cell] = getChildWrappers(screen.root);
    expect(cell).toMatchObject({ flexBasis: '50%' });
  });

  it('forwards testID and other props to the root', () => {
    render(
      <SimpleGrid testID="grid" accessibilityLabel="Grid of items">
        <Text>A</Text>
      </SimpleGrid>
    );
    expect(screen.getByTestId('grid')).toBeTruthy();
    expect(screen.getByLabelText('Grid of items')).toBe(
      screen.getByTestId('grid')
    );
  });

  it('uses base cols when no breakpoint matches', () => {
    render(
      <SimpleGrid cols={4} breakpoints={[{ maxWidth: 600, cols: 2 }]}>
        <Text>A</Text>
      </SimpleGrid>
    );

    const [cell] = getChildWrappers(screen.root);
    expect(cell).toMatchObject({ flexBasis: '25%' });
  });

  it('reacts to window dimension changes and removes listener on unmount', () => {
    const { unmount } = render(
      <SimpleGrid cols={4} breakpoints={[{ maxWidth: 600, cols: 1 }]}>
        <Text>A</Text>
      </SimpleGrid>
    );

    expect(getChildWrappers(screen.root)[0]).toMatchObject({
      flexBasis: '25%',
    });

    act(() => {
      dimensionsHandler?.({ window: { width: 400 } });
    });

    expect(getChildWrappers(screen.root)[0]).toMatchObject({
      flexBasis: '100%',
    });

    act(() => {
      dimensionsHandler?.({ window: { width: 1200 } });
    });

    expect(getChildWrappers(screen.root)[0]).toMatchObject({
      flexBasis: '25%',
    });

    unmount();
    expect(remove).toHaveBeenCalled();
  });

  it('merges custom style on the root', () => {
    render(
      <SimpleGrid style={{ backgroundColor: 'red' }}>
        <Text>A</Text>
      </SimpleGrid>
    );
    expect(screen.root).toHaveStyle({ backgroundColor: 'red' });
  });

  it('renders without children', () => {
    render(<SimpleGrid />);
    expect(screen.root.children).toHaveLength(0);
  });

  it('parses string spacing values', () => {
    render(
      <SimpleGrid
        cols={2}
        spacing={'16px' as never}
        verticalSpacing={'6px' as never}
      >
        <Text>A</Text>
      </SimpleGrid>
    );

    const [cell] = getChildWrappers(screen.root);
    expect(cell).toMatchObject({
      flexBasis: '50%',
      paddingHorizontal: 8,
      paddingVertical: 3,
    });
    expect(screen.root).toHaveStyle({ margin: -8 });
  });

  it('falls back to zero spacing for unparsable strings', () => {
    render(
      <SimpleGrid cols={1} spacing={'auto' as never}>
        <Text>A</Text>
      </SimpleGrid>
    );

    const [cell] = getChildWrappers(screen.root);
    expect(cell).toMatchObject({ paddingHorizontal: 0, paddingVertical: 0 });
    expect(screen.root).toHaveStyle({ margin: -0 });
  });

  it('ignores an empty breakpoints array', () => {
    render(
      <SimpleGrid cols={3} breakpoints={[]}>
        <Text>A</Text>
      </SimpleGrid>
    );

    const [cell] = getChildWrappers(screen.root);
    expect(cell?.flexBasis).toBe(`${100 / 3}%`);
  });
});
