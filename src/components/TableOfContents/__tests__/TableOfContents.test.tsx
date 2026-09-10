import { Text } from 'react-native';
import { render, screen, fireEvent } from '../../../__tests__/test-utils';
import { TableOfContents } from '../index';

type ReactTestInstance = ReturnType<typeof screen.getByTestId>;

const data = [
  { id: 'intro', value: 'Introduction', depth: 1 },
  { id: 'usage', value: 'Usage', depth: 2 },
  { id: 'api', value: 'API', depth: 3 },
];

const getControl = (text: string): ReactTestInstance => {
  let current = screen.getByText(text).parent;
  while (current && current.props.accessibilityRole !== 'link') {
    current = current.parent;
  }
  if (!current) {
    throw new Error(`control for ${text} not found`);
  }
  return current;
};

describe('TableOfContents', () => {
  it('renders all items with link role and passes testID through', () => {
    render(<TableOfContents data={data} testID="toc" />);

    expect(screen.getByTestId('toc')).toBeTruthy();
    expect(screen.getAllByRole('link')).toHaveLength(3);
    expect(screen.getByText('Introduction')).toBeTruthy();
    expect(screen.getByText('Usage')).toBeTruthy();
    expect(screen.getByText('API')).toBeTruthy();
    expect(getControl('Usage').props.accessibilityState).toEqual({
      selected: false,
    });
    expect(getControl('Usage').props.accessibilityLabel).toBe('Usage');
  });

  it('offsets items by depth using minDepthToOffset and depthOffset', () => {
    render(
      <TableOfContents data={data} depthOffset={10} minDepthToOffset={2} />
    );

    expect(getControl('Introduction')).toHaveStyle({ paddingLeft: 12 });
    expect(getControl('Usage')).toHaveStyle({ paddingLeft: 12 });
    expect(getControl('API')).toHaveStyle({ paddingLeft: 22 });
  });

  it('uses default offsets', () => {
    render(<TableOfContents data={data} />);
    expect(getControl('Introduction')).toHaveStyle({ paddingLeft: 12 });
    expect(getControl('API')).toHaveStyle({ paddingLeft: 52 });
  });

  it('handles uncontrolled active state with defaultActive', () => {
    const onActiveChange = jest.fn();
    render(
      <TableOfContents
        data={data}
        defaultActive="intro"
        onActiveChange={onActiveChange}
      />
    );

    expect(getControl('Introduction').props.accessibilityState.selected).toBe(
      true
    );

    fireEvent.press(screen.getByText('Usage'));
    expect(onActiveChange).toHaveBeenCalledWith('usage');
    expect(getControl('Usage').props.accessibilityState.selected).toBe(true);
    expect(getControl('Introduction').props.accessibilityState.selected).toBe(
      false
    );
  });

  it('keeps controlled active value and reports changes', () => {
    const onActiveChange = jest.fn();
    render(
      <TableOfContents
        data={data}
        active="api"
        onActiveChange={onActiveChange}
      />
    );

    fireEvent.press(screen.getByText('Usage'));
    expect(onActiveChange).toHaveBeenCalledWith('usage');
    expect(getControl('API').props.accessibilityState.selected).toBe(true);
    expect(getControl('Usage').props.accessibilityState.selected).toBe(false);
  });

  it('works without onActiveChange', () => {
    render(<TableOfContents data={data} />);
    fireEvent.press(screen.getByText('API'));
    expect(getControl('API').props.accessibilityState.selected).toBe(true);
  });

  it('applies light variant colors to the active control', () => {
    render(<TableOfContents data={data} active="usage" color="blue" />);
    expect(getControl('Usage')).toHaveStyle({ backgroundColor: '#e7f5ff' });
    expect(screen.getByText('Usage')).toHaveStyle({ color: '#1c7ed6' });
    expect(getControl('Introduction')).not.toHaveStyle({
      backgroundColor: '#e7f5ff',
    });
  });

  it('applies filled variant colors', () => {
    render(
      <TableOfContents
        data={data}
        active="usage"
        variant="filled"
        color="red"
      />
    );
    expect(getControl('Usage')).toHaveStyle({ backgroundColor: '#fa5252' });
    expect(screen.getByText('Usage')).toHaveStyle({ color: '#ffffff' });
  });

  it('does not color the active control with variant none', () => {
    render(<TableOfContents data={data} active="usage" variant="none" />);
    expect(getControl('Usage')).not.toHaveStyle({
      backgroundColor: expect.anything(),
    });
    expect(screen.getByText('Usage')).toHaveStyle({ color: '#000000' });
  });

  it('applies size and radius', () => {
    render(<TableOfContents data={data} size="xl" radius="lg" />);
    expect(getControl('Usage')).toHaveStyle({
      paddingVertical: 12,
      borderRadius: 16,
    });
    expect(screen.getByText('Usage')).toHaveStyle({ fontSize: 20 });
  });

  it('renders numeric and node values', () => {
    render(
      <TableOfContents
        data={[
          { id: 'num', value: 42, depth: 1 },
          { id: 'node', value: <Text>Node label</Text>, depth: 1 },
        ]}
      />
    );
    expect(screen.getByText('42')).toBeTruthy();
    expect(screen.getByText('Node label')).toBeTruthy();
  });

  it('spreads getControlProps and merges its style', () => {
    const getControlProps = jest.fn(({ active, data: item }) => ({
      testID: `control-${item.id}`,
      accessibilityLabel: active ? 'active control' : undefined,
      style: { marginBottom: 3 },
    }));

    render(
      <TableOfContents
        data={data}
        active="intro"
        getControlProps={getControlProps}
      />
    );

    expect(getControlProps).toHaveBeenCalledWith({
      active: true,
      data: data[0],
    });
    expect(screen.getByTestId('control-intro')).toHaveStyle({
      marginBottom: 3,
    });
    expect(screen.getByLabelText('active control')).toBeTruthy();
  });

  it('merges root style', () => {
    render(<TableOfContents data={data} style={{ padding: 9 }} testID="toc" />);
    expect(screen.getByTestId('toc')).toHaveStyle({ padding: 9 });
  });
});
