import React from 'react';
import { Text as RNText } from 'react-native';
import {
  render,
  screen,
  fireEvent,
  act,
  renderHook,
} from '../../../__tests__/test-utils';
import {
  Tree,
  useTree,
  findTreeNode,
  getTreeLeafValues,
  getAllTreeValues,
  type TreeNodeData,
  type UseTreeReturnType,
  type RenderTreeNodePayload,
} from '../index';
import { createTheme } from '../../../theme/create-theme';

type ReactTestInstance = ReturnType<typeof screen.getByTestId>;

const theme = createTheme();

const data: TreeNodeData[] = [
  {
    value: 'src',
    label: 'src',
    children: [
      {
        value: 'src/components',
        label: 'components',
        children: [
          { value: 'src/components/Button.tsx', label: 'Button.tsx' },
          { value: 'src/components/Input.tsx', label: 'Input.tsx' },
        ],
      },
      { value: 'src/index.ts', label: 'index.ts' },
    ],
  },
  {
    value: 'package.json',
    label: 'package.json',
    nodeProps: { testID: 'pkg-node' },
  },
  { value: 'empty', label: 'empty', children: [] },
];

const findOffsetContainers = () =>
  screen.UNSAFE_root.findAll(
    (node: ReactTestInstance) =>
      typeof node.type === 'string' &&
      node.props.style !== undefined &&
      !Array.isArray(node.props.style) &&
      typeof node.props.style.paddingLeft === 'number'
  );

interface HarnessProps {
  treeRef: { current: UseTreeReturnType | null };
  multiple?: boolean;
  initialExpandedState?: Record<string, boolean>;
  initialSelectedState?: string[];
  initialCheckedState?: string[];
  renderNode?: (payload: RenderTreeNodePayload) => React.ReactNode;
  selectOnClick?: boolean;
}

function Harness({
  treeRef,
  multiple,
  initialExpandedState,
  initialSelectedState,
  initialCheckedState,
  renderNode,
  selectOnClick,
}: HarnessProps) {
  const tree = useTree({
    multiple,
    initialExpandedState,
    initialSelectedState,
    initialCheckedState,
  });
  treeRef.current = tree;
  return (
    <Tree
      data={data}
      tree={tree}
      renderNode={renderNode}
      selectOnClick={selectOnClick}
      testID="tree"
    />
  );
}

describe('Tree', () => {
  it('renders root nodes collapsed by default and passes testID', () => {
    render(<Tree data={data} testID="tree" />);

    expect(screen.getByTestId('tree')).toBeTruthy();
    expect(screen.getByText('src')).toBeTruthy();
    expect(screen.getByText('package.json')).toBeTruthy();
    expect(screen.getByText('empty')).toBeTruthy();
    expect(screen.queryByText('components')).toBeNull();
    expect(screen.queryByText('index.ts')).toBeNull();
    expect(screen.getByText('▶')).toBeTruthy();
    expect(screen.queryByText('▼')).toBeNull();
  });

  it('exposes button role and expanded state only for nodes with children', () => {
    render(<Tree data={data} />);

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(3);
    const [src, pkg, empty] = buttons as [
      ReactTestInstance,
      ReactTestInstance,
      ReactTestInstance,
    ];
    expect(src.props.accessibilityState).toMatchObject({ expanded: false });
    expect(pkg.props.accessibilityState.expanded).toBeUndefined();
    expect(empty.props.accessibilityState.expanded).toBeUndefined();
  });

  it('expands and collapses a node on press with the default level offset', () => {
    render(<Tree data={data} />);

    fireEvent.press(screen.getByText('src'));
    expect(screen.getByText('components')).toBeTruthy();
    expect(screen.getByText('index.ts')).toBeTruthy();
    expect(screen.queryByText('Button.tsx')).toBeNull();
    expect(screen.getAllByText('▼')).toHaveLength(1);
    expect(
      screen.getAllByRole('button')[0]?.props.accessibilityState
    ).toMatchObject({ expanded: true });

    const containers = findOffsetContainers();
    expect(containers).toHaveLength(1);
    expect(containers[0]).toHaveStyle({ paddingLeft: theme.spacing.lg });

    fireEvent.press(screen.getByText('components'));
    expect(screen.getByText('Button.tsx')).toBeTruthy();
    expect(screen.getByText('Input.tsx')).toBeTruthy();
    expect(findOffsetContainers()).toHaveLength(2);

    fireEvent.press(screen.getByText('src'));
    expect(screen.queryByText('components')).toBeNull();
    expect(screen.queryByText('Button.tsx')).toBeNull();
    expect(findOffsetContainers()).toHaveLength(0);
  });

  it('does nothing when pressing a leaf or an empty parent', () => {
    render(<Tree data={data} />);

    fireEvent.press(screen.getByText('package.json'));
    fireEvent.press(screen.getByText('empty'));
    expect(screen.queryByText('▼')).toBeNull();
    expect(screen.getAllByRole('button')).toHaveLength(3);
  });

  it('supports numeric and theme key levelOffset', () => {
    const { rerender } = render(<Tree data={data} levelOffset={40} />);
    fireEvent.press(screen.getByText('src'));
    expect(findOffsetContainers()[0]).toHaveStyle({ paddingLeft: 40 });

    rerender(<Tree data={data} levelOffset="xl" />);
    expect(findOffsetContainers()[0]).toHaveStyle({
      paddingLeft: theme.spacing.xl,
    });

    rerender(<Tree data={data} levelOffset={'unknown' as any} />);
    expect(findOffsetContainers()[0]).toHaveStyle({
      paddingLeft: theme.spacing.lg,
    });
  });

  it('does not expand on press when expandOnClick is false', () => {
    render(<Tree data={data} expandOnClick={false} />);

    fireEvent.press(screen.getByText('src'));
    expect(screen.queryByText('components')).toBeNull();
    expect(screen.getByText('▶')).toBeTruthy();
  });

  it('selects nodes on press when selectOnClick is enabled (single mode)', () => {
    render(<Tree data={data} selectOnClick expandOnClick={false} />);

    const selectedStyle = {
      backgroundColor: theme.fn.variant({
        variant: 'light',
        color: theme.primaryColor,
      }).background,
    };

    const [src, pkg] = screen.getAllByRole('button');
    expect(pkg).not.toHaveStyle(selectedStyle);

    fireEvent.press(screen.getByText('package.json'));
    expect(screen.getAllByRole('button')[1]).toHaveStyle(selectedStyle);

    // single selection: selecting another node replaces the previous one
    fireEvent.press(screen.getByText('src'));
    expect(screen.getAllByRole('button')[0]).toHaveStyle(selectedStyle);
    expect(screen.getAllByRole('button')[1]).not.toHaveStyle(selectedStyle);
    expect(src).toBeTruthy();

    // pressing the selected node deselects it
    fireEvent.press(screen.getByText('src'));
    expect(screen.getAllByRole('button')[0]).not.toHaveStyle(selectedStyle);
  });

  it('selects and expands at the same time when both flags are enabled', () => {
    render(<Tree data={data} selectOnClick />);

    fireEvent.press(screen.getByText('src'));
    expect(screen.getByText('components')).toBeTruthy();
    expect(screen.getAllByRole('button')[0]).toHaveStyle({
      backgroundColor: theme.fn.variant({
        variant: 'light',
        color: theme.primaryColor,
      }).background,
    });
  });

  it('spreads nodeProps on the node element', () => {
    const onPress = jest.fn();
    const custom: TreeNodeData[] = [
      { value: 'a', label: 'A', nodeProps: { testID: 'node-a', onPress } },
    ];
    render(<Tree data={custom} />);

    const node = screen.getByTestId('node-a');
    expect(node.props.accessibilityRole).toBe('button');
    fireEvent.press(node);
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('renders non-string labels as-is', () => {
    const custom: TreeNodeData[] = [
      {
        value: 'a',
        label: <RNText testID="custom-label">Custom</RNText>,
      },
      { value: 'b', label: 42 },
    ];
    render(<Tree data={custom} />);

    expect(screen.getByTestId('custom-label')).toBeTruthy();
    expect(screen.getByText('Custom')).toBeTruthy();
    expect(screen.getByText('42')).toBeTruthy();
  });

  it('uses a custom renderNode with the full payload', () => {
    const renderNode = jest.fn(
      ({ node, level, hasChildren, expanded, elementProps }) => (
        <RNText
          onPress={elementProps.onPress}
          testID={`node-${node.value}`}
        >{`${node.label}:${level}:${hasChildren}:${expanded}`}</RNText>
      )
    );

    render(<Tree data={data} renderNode={renderNode} />);

    expect(screen.getByText('src:0:true:false')).toBeTruthy();
    expect(screen.getByText('package.json:0:false:false')).toBeTruthy();
    expect(screen.getByText('empty:0:false:false')).toBeTruthy();

    const payload = renderNode.mock.calls[0]![0] as RenderTreeNodePayload;
    expect(payload.selected).toBe(false);
    expect(payload.checked).toBe(false);
    expect(payload.indeterminate).toBe(false);
    expect(typeof payload.tree.toggleExpanded).toBe('function');

    fireEvent.press(screen.getByTestId('node-src'));
    expect(screen.getByText('src:0:true:true')).toBeTruthy();
    expect(screen.getByText('components:1:true:false')).toBeTruthy();
    expect(screen.getByText('index.ts:1:false:false')).toBeTruthy();

    fireEvent.press(screen.getByTestId('node-src/components'));
    expect(screen.getByText('Button.tsx:2:false:false')).toBeTruthy();
  });

  it('re-initializes the controller when data changes', () => {
    const treeRef: { current: UseTreeReturnType | null } = { current: null };
    function Wrapper({ items }: { items: TreeNodeData[] }) {
      const tree = useTree();
      treeRef.current = tree;
      return <Tree data={items} tree={tree} />;
    }

    const { rerender } = render(<Wrapper items={data} />);
    expect(treeRef.current!.data).toBe(data);

    const next: TreeNodeData[] = [{ value: 'x', label: 'X' }];
    rerender(<Wrapper items={next} />);
    expect(treeRef.current!.data).toBe(next);
    expect(screen.getByText('X')).toBeTruthy();
    expect(screen.queryByText('src')).toBeNull();
  });

  describe('with an external tree controller', () => {
    it('reflects initialExpandedState and expands/collapses all nodes', () => {
      const treeRef: { current: UseTreeReturnType | null } = { current: null };
      render(
        <Harness treeRef={treeRef} initialExpandedState={{ src: true }} />
      );

      expect(screen.getByText('components')).toBeTruthy();
      expect(screen.queryByText('Button.tsx')).toBeNull();

      act(() => treeRef.current!.expandAllNodes());
      expect(screen.getByText('Button.tsx')).toBeTruthy();
      expect(screen.getByText('Input.tsx')).toBeTruthy();
      expect(treeRef.current!.expandedState).toEqual({
        src: true,
        'src/components': true,
        'src/components/Button.tsx': true,
        'src/components/Input.tsx': true,
        'src/index.ts': true,
        'package.json': true,
        empty: true,
      });

      act(() => treeRef.current!.collapseAllNodes());
      expect(screen.queryByText('components')).toBeNull();
      expect(treeRef.current!.expandedState).toEqual({});

      act(() => treeRef.current!.expand('src'));
      expect(screen.getByText('components')).toBeTruthy();
      act(() => treeRef.current!.collapse('src'));
      expect(screen.queryByText('components')).toBeNull();
    });

    it('supports multiple selection through the controller', () => {
      const treeRef: { current: UseTreeReturnType | null } = { current: null };
      render(
        <Harness
          treeRef={treeRef}
          multiple
          selectOnClick
          initialSelectedState={['package.json']}
        />
      );

      const selectedStyle = {
        backgroundColor: theme.fn.variant({
          variant: 'light',
          color: theme.primaryColor,
        }).background,
      };

      expect(screen.getAllByRole('button')[1]).toHaveStyle(selectedStyle);

      fireEvent.press(screen.getByText('empty'));
      expect(treeRef.current!.selectedState).toEqual(['package.json', 'empty']);
      expect(screen.getAllByRole('button')[1]).toHaveStyle(selectedStyle);
      expect(screen.getAllByRole('button')[2]).toHaveStyle(selectedStyle);

      act(() => treeRef.current!.deselect('package.json'));
      expect(treeRef.current!.selectedState).toEqual(['empty']);

      act(() => treeRef.current!.select('src'));
      act(() => treeRef.current!.select('src'));
      expect(treeRef.current!.selectedState).toEqual(['empty', 'src']);

      act(() => treeRef.current!.clearSelected());
      expect(treeRef.current!.selectedState).toEqual([]);
      expect(screen.getAllByRole('button')[2]).not.toHaveStyle(selectedStyle);
    });

    it('exposes checked and indeterminate state to renderNode', () => {
      const treeRef: { current: UseTreeReturnType | null } = { current: null };
      const renderNode = ({
        node,
        checked,
        indeterminate,
        elementProps,
      }: RenderTreeNodePayload) => (
        <RNText onPress={elementProps.onPress} testID={`node-${node.value}`}>
          {`${node.value}:${checked}:${indeterminate}`}
        </RNText>
      );

      render(
        <Harness
          treeRef={treeRef}
          renderNode={renderNode}
          initialExpandedState={{ src: true, 'src/components': true }}
          initialCheckedState={['src/components/Button.tsx']}
        />
      );

      expect(screen.getByText('src:false:true')).toBeTruthy();
      expect(screen.getByText('src/components:false:true')).toBeTruthy();
      expect(
        screen.getByText('src/components/Button.tsx:true:false')
      ).toBeTruthy();
      expect(
        screen.getByText('src/components/Input.tsx:false:false')
      ).toBeTruthy();

      act(() => treeRef.current!.checkNode('src/components'));
      expect(screen.getByText('src/components:true:false')).toBeTruthy();
      expect(screen.getByText('src:false:true')).toBeTruthy();

      act(() => treeRef.current!.checkNode('src'));
      expect(screen.getByText('src:true:false')).toBeTruthy();
      expect(treeRef.current!.checkedState).toEqual([
        'src/components/Button.tsx',
        'src/components/Input.tsx',
        'src/index.ts',
      ]);

      act(() => treeRef.current!.uncheckNode('src/components/Input.tsx'));
      expect(screen.getByText('src/components:false:true')).toBeTruthy();
      expect(treeRef.current!.getCheckedNodes().map((n) => n.value)).toEqual([
        'src/components/Button.tsx',
        'src/index.ts',
      ]);

      act(() => treeRef.current!.uncheckAllNodes());
      expect(screen.getByText('src:false:false')).toBeTruthy();

      act(() => treeRef.current!.checkAllNodes());
      expect(treeRef.current!.checkedState).toEqual([
        'src/components/Button.tsx',
        'src/components/Input.tsx',
        'src/index.ts',
        'package.json',
        'empty',
      ]);
      expect(screen.getByText('empty:true:false')).toBeTruthy();
    });
  });
});

describe('useTree', () => {
  it('returns the initial state', () => {
    const { result } = renderHook(() =>
      useTree({
        initialExpandedState: { a: true },
        initialSelectedState: ['b'],
        initialCheckedState: ['c'],
      })
    );

    expect(result.current.data).toEqual([]);
    expect(result.current.expandedState).toEqual({ a: true });
    expect(result.current.selectedState).toEqual(['b']);
    expect(result.current.checkedState).toEqual(['c']);
  });

  it('uses empty defaults when called without input', () => {
    const { result } = renderHook(() => useTree());
    expect(result.current.expandedState).toEqual({});
    expect(result.current.selectedState).toEqual([]);
    expect(result.current.checkedState).toEqual([]);
  });

  it('manages expanded state', () => {
    const { result } = renderHook(() => useTree());
    act(() => result.current.initialize(data));
    expect(result.current.data).toBe(data);

    act(() => result.current.toggleExpanded('src'));
    expect(result.current.expandedState).toEqual({ src: true });
    act(() => result.current.toggleExpanded('src'));
    expect(result.current.expandedState).toEqual({ src: false });

    act(() => result.current.expand('src'));
    act(() => result.current.expand('src'));
    expect(result.current.expandedState.src).toBe(true);
    act(() => result.current.collapse('src'));
    expect(result.current.expandedState.src).toBe(false);

    act(() => result.current.expandAllNodes());
    expect(Object.keys(result.current.expandedState)).toHaveLength(7);
    act(() => result.current.collapseAllNodes());
    expect(result.current.expandedState).toEqual({});
  });

  it('expandAllNodes does nothing meaningful before initialize', () => {
    const { result } = renderHook(() => useTree());
    act(() => result.current.expandAllNodes());
    expect(result.current.expandedState).toEqual({});
  });

  it('toggles selection in single mode', () => {
    const { result } = renderHook(() => useTree());

    act(() => result.current.toggleSelected('a'));
    expect(result.current.selectedState).toEqual(['a']);
    act(() => result.current.toggleSelected('b'));
    expect(result.current.selectedState).toEqual(['b']);
    act(() => result.current.toggleSelected('b'));
    expect(result.current.selectedState).toEqual([]);

    act(() => result.current.select('a'));
    act(() => result.current.select('b'));
    expect(result.current.selectedState).toEqual(['b']);
    act(() => result.current.select('b'));
    expect(result.current.selectedState).toEqual(['b']);
  });

  it('toggles selection in multiple mode', () => {
    const { result } = renderHook(() => useTree({ multiple: true }));

    act(() => result.current.toggleSelected('a'));
    act(() => result.current.toggleSelected('b'));
    expect(result.current.selectedState).toEqual(['a', 'b']);
    act(() => result.current.toggleSelected('a'));
    expect(result.current.selectedState).toEqual(['b']);

    act(() => result.current.select('c'));
    expect(result.current.selectedState).toEqual(['b', 'c']);
    act(() => result.current.deselect('b'));
    expect(result.current.selectedState).toEqual(['c']);
    act(() => result.current.deselect('missing'));
    expect(result.current.selectedState).toEqual(['c']);
    act(() => result.current.clearSelected());
    expect(result.current.selectedState).toEqual([]);
  });

  it('manages checked state for leaves and parents', () => {
    const { result } = renderHook(() => useTree());
    act(() => result.current.initialize(data));

    // unknown values are ignored
    act(() => result.current.checkNode('missing'));
    act(() => result.current.uncheckNode('missing'));
    expect(result.current.checkedState).toEqual([]);
    expect(result.current.isNodeChecked('missing')).toBe(false);
    expect(result.current.isNodeIndeterminate('missing')).toBe(false);

    act(() => result.current.checkNode('src/components/Button.tsx'));
    expect(result.current.checkedState).toEqual(['src/components/Button.tsx']);
    expect(result.current.isNodeChecked('src/components/Button.tsx')).toBe(
      true
    );
    expect(result.current.isNodeChecked('src/components')).toBe(false);
    expect(result.current.isNodeIndeterminate('src/components')).toBe(true);
    expect(result.current.isNodeIndeterminate('src')).toBe(true);

    // checking a parent adds only the missing leaves
    act(() => result.current.checkNode('src/components'));
    expect(result.current.checkedState).toEqual([
      'src/components/Button.tsx',
      'src/components/Input.tsx',
    ]);
    expect(result.current.isNodeChecked('src/components')).toBe(true);
    expect(result.current.isNodeIndeterminate('src/components')).toBe(false);

    act(() => result.current.uncheckNode('src'));
    expect(result.current.checkedState).toEqual([]);
    expect(result.current.isNodeIndeterminate('src')).toBe(false);

    act(() => result.current.checkAllNodes());
    expect(result.current.checkedState).toHaveLength(5);
    expect(result.current.isNodeChecked('src')).toBe(true);
    // a parent with an empty children array is treated as a leaf
    expect(result.current.isNodeChecked('empty')).toBe(true);

    act(() => result.current.uncheckAllNodes());
    expect(result.current.checkedState).toEqual([]);
  });

  it('getCheckedNodes ignores values that are not in the data', () => {
    const { result } = renderHook(() =>
      useTree({ initialCheckedState: ['ghost', 'package.json'] })
    );
    expect(result.current.getCheckedNodes()).toEqual([]);

    act(() => result.current.initialize(data));
    expect(result.current.getCheckedNodes()).toEqual([data[1]]);
  });
});

describe('tree utilities', () => {
  it('findTreeNode finds nested nodes', () => {
    expect(findTreeNode(data, 'src/components/Input.tsx')?.label).toBe(
      'Input.tsx'
    );
    expect(findTreeNode(data, 'package.json')).toBe(data[1]);
    expect(findTreeNode(data, 'nope')).toBeUndefined();
  });

  it('getTreeLeafValues returns leaves of a subtree', () => {
    expect(getTreeLeafValues(data[0]!)).toEqual([
      'src/components/Button.tsx',
      'src/components/Input.tsx',
      'src/index.ts',
    ]);
    expect(getTreeLeafValues(data[1]!)).toEqual(['package.json']);
    expect(getTreeLeafValues(data[2]!)).toEqual(['empty']);
  });

  it('getAllTreeValues flattens every node value', () => {
    expect(getAllTreeValues(data)).toEqual([
      'src',
      'src/components',
      'src/components/Button.tsx',
      'src/components/Input.tsx',
      'src/index.ts',
      'package.json',
      'empty',
    ]);
  });
});
