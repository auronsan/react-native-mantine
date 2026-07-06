import { Text as RNText } from 'react-native';
import { render, fireEvent } from './test-utils';
import {
  Button,
  DataList,
  EmptyState,
  OverflowList,
  Tree,
  TreeSelect,
  Typography,
  type TreeNodeData,
} from '../index';

const treeData: TreeNodeData[] = [
  {
    label: 'Frontend',
    value: 'frontend',
    children: [
      { label: 'React', value: 'react' },
      { label: 'Vue', value: 'vue' },
    ],
  },
  { label: 'Backend', value: 'backend' },
];

describe('Tree', () => {
  it('hides children until the parent node is expanded', () => {
    const { getByText, queryByText } = render(<Tree data={treeData} />);

    expect(getByText('Frontend')).toBeTruthy();
    expect(queryByText('React')).toBeNull();

    fireEvent.press(getByText('Frontend'));
    expect(getByText('React')).toBeTruthy();

    fireEvent.press(getByText('Frontend'));
    expect(queryByText('React')).toBeNull();
  });

  it('supports custom renderNode', () => {
    const { getByText } = render(
      <Tree
        data={treeData}
        renderNode={({ node }) => (
          <RNText key={node.value}>custom-{node.value}</RNText>
        )}
      />
    );
    expect(getByText('custom-frontend')).toBeTruthy();
    expect(getByText('custom-backend')).toBeTruthy();
  });
});

describe('DataList', () => {
  it('renders labels and values', () => {
    const { getByText } = render(
      <DataList>
        <DataList.Item>
          <DataList.ItemLabel>Name</DataList.ItemLabel>
          <DataList.ItemValue>John Doe</DataList.ItemValue>
        </DataList.Item>
        <DataList.Item>
          <DataList.ItemLabel>Email</DataList.ItemLabel>
          <DataList.ItemValue>john@example.com</DataList.ItemValue>
        </DataList.Item>
      </DataList>
    );

    expect(getByText('Name')).toBeTruthy();
    expect(getByText('John Doe')).toBeTruthy();
    expect(getByText('Email')).toBeTruthy();
    expect(getByText('john@example.com')).toBeTruthy();
  });
});

describe('EmptyState', () => {
  it('renders title, description and actions', () => {
    const { getByText } = render(
      <EmptyState
        title="No results"
        description="Try adjusting your filters"
        icon={<RNText>icon</RNText>}
      >
        <EmptyState.Actions>
          <Button>Reset filters</Button>
        </EmptyState.Actions>
      </EmptyState>
    );

    expect(getByText('No results')).toBeTruthy();
    expect(getByText('Try adjusting your filters')).toBeTruthy();
    expect(getByText('icon')).toBeTruthy();
    expect(getByText('Reset filters')).toBeTruthy();
  });
});

describe('OverflowList', () => {
  it('renders items before measurement clamps them', () => {
    const { getAllByText } = render(
      <OverflowList
        data={['Item A', 'Item B']}
        renderItem={(item) => <RNText>{item}</RNText>}
      />
    );

    expect(getAllByText('Item A').length).toBeGreaterThan(0);
    expect(getAllByText('Item B').length).toBeGreaterThan(0);
  });
});

describe('Typography', () => {
  it('wraps string children in styled text', () => {
    const { getByText } = render(
      <Typography>
        Plain paragraph
        <RNText>Existing text node</RNText>
      </Typography>
    );

    expect(getByText('Plain paragraph')).toBeTruthy();
    expect(getByText('Existing text node')).toBeTruthy();
  });
});

describe('TreeSelect', () => {
  it('selects a node in single mode and closes the dropdown', () => {
    const onChange = jest.fn();
    const { getByPlaceholderText, getByLabelText, getByDisplayValue } = render(
      <TreeSelect
        data={treeData}
        placeholder="Pick value"
        onChange={onChange}
        defaultExpandAll
      />
    );

    fireEvent(getByPlaceholderText('Pick value'), 'press');
    fireEvent.press(getByLabelText('React'));

    expect(onChange).toHaveBeenCalledWith('react');
    expect(getByDisplayValue('React')).toBeTruthy();
  });

  it('displays joined labels in multiple mode', () => {
    const { getByDisplayValue } = render(
      <TreeSelect
        data={treeData}
        mode="multiple"
        defaultValue={['react', 'backend']}
      />
    );

    expect(getByDisplayValue('React, Backend')).toBeTruthy();
  });

  it('checks all leaves when a parent is pressed in checkbox mode', () => {
    const onChange = jest.fn();
    const { getByPlaceholderText, getByLabelText } = render(
      <TreeSelect
        data={treeData}
        mode="checkbox"
        placeholder="Pick values"
        onChange={onChange}
        defaultExpandAll
      />
    );

    fireEvent(getByPlaceholderText('Pick values'), 'press');
    fireEvent.press(getByLabelText('Frontend'));

    expect(onChange).toHaveBeenCalledWith(['react', 'vue']);
  });

  it('shows nothing found message when search has no matches', () => {
    const { getByPlaceholderText, getByText } = render(
      <TreeSelect
        data={treeData}
        placeholder="Pick value"
        searchable
        nothingFoundMessage="No matches"
      />
    );

    fireEvent(getByPlaceholderText('Pick value'), 'press');
    fireEvent.changeText(getByPlaceholderText('Search...'), 'zzz');

    expect(getByText('No matches')).toBeTruthy();
  });

  it('truncates displayed values with maxDisplayedValues', () => {
    const { getByDisplayValue } = render(
      <TreeSelect
        data={treeData}
        mode="multiple"
        maxDisplayedValues={1}
        defaultValue={['react', 'vue', 'backend']}
      />
    );

    expect(getByDisplayValue('React (+2)')).toBeTruthy();
  });
});
