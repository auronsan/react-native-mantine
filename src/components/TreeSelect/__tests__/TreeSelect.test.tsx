import { Modal, Text, TouchableOpacity } from 'react-native';
import { render, screen, fireEvent, act } from '../../../__tests__/test-utils';
import { TreeSelect } from '../index';
import type { TreeNodeData } from '../../Tree/use-tree';

const data: TreeNodeData[] = [
  {
    label: 'Frontend',
    value: 'frontend',
    children: [
      { label: 'React', value: 'react' },
      { label: 'Vue', value: 'vue' },
    ],
  },
  { label: 'Backend', value: 'backend', nodeProps: { testID: 'backend-node' } },
];

const open = (placeholder = 'Pick') => {
  fireEvent(screen.getByPlaceholderText(placeholder), 'press');
};

describe('TreeSelect', () => {
  it('renders the input closed by default', () => {
    render(<TreeSelect data={data} placeholder="Pick" testID="input" />);
    const input = screen.getByTestId('input');
    expect(input).toBeTruthy();
    expect(input.props.value).toBe('');
    expect(input.props.accessibilityRole).toBe('button');
    expect(input.props.accessibilityState).toMatchObject({
      expanded: false,
    });
    expect(input.props.accessibilityState.disabled).toBeFalsy();
    expect(screen.queryByText('Frontend')).toBeNull();
  });

  it('opens the dropdown on press and shows root nodes', () => {
    render(<TreeSelect data={data} placeholder="Pick" testID="input" />);
    open();
    expect(screen.getByTestId('input').props.accessibilityState.expanded).toBe(
      true
    );
    expect(screen.getByText('Frontend')).toBeTruthy();
    expect(screen.getByText('Backend')).toBeTruthy();
    expect(screen.queryByText('React')).toBeNull();
  });

  it('renders label, description, error, required and passes testID', () => {
    render(
      <TreeSelect
        data={data}
        label="Category"
        description="Choose one"
        error="Required field"
        required
        testID="input"
      />
    );
    expect(screen.getByText(/Category/)).toBeTruthy();
    expect(screen.getByText(' *')).toBeTruthy();
    expect(screen.getByText('Choose one')).toBeTruthy();
    expect(screen.getByText('Required field')).toBeTruthy();
    expect(screen.getByTestId('input')).toBeTruthy();
  });

  it('does not open when disabled', () => {
    render(
      <TreeSelect data={data} placeholder="Pick" disabled testID="input" />
    );
    const input = screen.getByTestId('input');
    expect(input.props.editable).toBe(false);
    expect(input.props.accessibilityState.disabled).toBe(true);
    open();
    expect(screen.queryByText('Frontend')).toBeNull();
  });

  it('expands and collapses nodes with the chevron button', () => {
    render(<TreeSelect data={data} placeholder="Pick" />);
    open();
    expect(screen.getByText('▶')).toBeTruthy();
    fireEvent.press(screen.getByLabelText('Expand'));
    expect(screen.getByText('React')).toBeTruthy();
    expect(screen.getByText('▼')).toBeTruthy();
    fireEvent.press(screen.getByLabelText('Collapse'));
    expect(screen.queryByText('React')).toBeNull();
  });

  it('expands nodes listed in defaultExpandedValues', () => {
    render(
      <TreeSelect
        data={data}
        placeholder="Pick"
        defaultExpandedValues={['frontend']}
      />
    );
    open();
    expect(screen.getByText('React')).toBeTruthy();
  });

  it('expands everything with defaultExpandAll', () => {
    render(<TreeSelect data={data} placeholder="Pick" defaultExpandAll />);
    open();
    expect(screen.getByText('React')).toBeTruthy();
    expect(screen.getByText('Vue')).toBeTruthy();
  });

  describe('single mode', () => {
    it('selects a node, closes the dropdown and displays the label', () => {
      const onChange = jest.fn();
      render(
        <TreeSelect
          data={data}
          placeholder="Pick"
          onChange={onChange}
          defaultExpandAll
          testID="input"
        />
      );
      open();
      fireEvent.press(screen.getByLabelText('React'));
      expect(onChange).toHaveBeenCalledWith('react');
      expect(screen.getByDisplayValue('React')).toBeTruthy();
      expect(screen.queryByText('Frontend')).toBeNull();
    });

    it('deselects the selected node when allowDeselect is true', () => {
      const onChange = jest.fn();
      render(
        <TreeSelect
          data={data}
          placeholder="Pick"
          defaultValue="backend"
          onChange={onChange}
        />
      );
      expect(screen.getByDisplayValue('Backend')).toBeTruthy();
      open();
      const node = screen.getByLabelText('Backend');
      expect(node.props.accessibilityState.selected).toBe(true);
      expect(node.props.accessibilityRole).toBe('menuitem');
      fireEvent.press(node);
      expect(onChange).toHaveBeenCalledWith(null);
      expect(screen.getByPlaceholderText('Pick').props.value).toBe('');
    });

    it('keeps the selection when allowDeselect is false', () => {
      const onChange = jest.fn();
      render(
        <TreeSelect
          data={data}
          placeholder="Pick"
          defaultValue="backend"
          allowDeselect={false}
          onChange={onChange}
        />
      );
      open();
      fireEvent.press(screen.getByLabelText('Backend'));
      expect(onChange).not.toHaveBeenCalled();
      expect(screen.getByDisplayValue('Backend')).toBeTruthy();
    });

    it('works as a controlled component', () => {
      const onChange = jest.fn();
      const { rerender } = render(
        <TreeSelect
          data={data}
          placeholder="Pick"
          value="backend"
          onChange={onChange}
          defaultExpandAll
        />
      );
      expect(screen.getByDisplayValue('Backend')).toBeTruthy();
      open();
      fireEvent.press(screen.getByLabelText('React'));
      expect(onChange).toHaveBeenCalledWith('react');
      // value is controlled, so it stays until parent updates it
      expect(screen.getByDisplayValue('Backend')).toBeTruthy();

      rerender(
        <TreeSelect
          data={data}
          placeholder="Pick"
          value="react"
          onChange={onChange}
        />
      );
      expect(screen.getByDisplayValue('React')).toBeTruthy();

      rerender(
        <TreeSelect
          data={data}
          placeholder="Pick"
          value={null}
          onChange={onChange}
        />
      );
      expect(screen.getByPlaceholderText('Pick').props.value).toBe('');
    });
  });

  describe('multiple mode', () => {
    it('adds and removes values without closing', () => {
      const onChange = jest.fn();
      render(
        <TreeSelect
          data={data}
          mode="multiple"
          placeholder="Pick"
          onChange={onChange}
          defaultExpandAll
        />
      );
      open();
      fireEvent.press(screen.getByLabelText('React'));
      expect(onChange).toHaveBeenLastCalledWith(['react']);
      fireEvent.press(screen.getByLabelText('Backend'));
      expect(onChange).toHaveBeenLastCalledWith(['react', 'backend']);
      expect(screen.getByDisplayValue('React, Backend')).toBeTruthy();
      expect(screen.getByText('Frontend')).toBeTruthy();

      fireEvent.press(screen.getByLabelText('React'));
      expect(onChange).toHaveBeenLastCalledWith(['backend']);
      expect(screen.getByDisplayValue('Backend')).toBeTruthy();
    });

    it('respects maxValues', () => {
      const onChange = jest.fn();
      render(
        <TreeSelect
          data={data}
          mode="multiple"
          placeholder="Pick"
          maxValues={1}
          onChange={onChange}
          defaultExpandAll
        />
      );
      open();
      fireEvent.press(screen.getByLabelText('React'));
      fireEvent.press(screen.getByLabelText('Vue'));
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(screen.getByDisplayValue('React')).toBeTruthy();
    });

    it('truncates displayed values with maxDisplayedValues', () => {
      render(
        <TreeSelect
          data={data}
          mode="multiple"
          maxDisplayedValues={1}
          defaultValue={['react', 'vue', 'backend']}
        />
      );
      expect(screen.getByDisplayValue('React (+2)')).toBeTruthy();
    });

    it('displays raw values that are not found in data', () => {
      render(
        <TreeSelect data={data} mode="multiple" defaultValue={['ghost']} />
      );
      expect(screen.getByDisplayValue('ghost')).toBeTruthy();
    });
  });

  describe('checkbox mode', () => {
    it('checks and unchecks all leaves of a parent', () => {
      const onChange = jest.fn();
      render(
        <TreeSelect
          data={data}
          mode="checkbox"
          placeholder="Pick"
          onChange={onChange}
          defaultExpandAll
        />
      );
      open();
      const frontend = screen.getByLabelText('Frontend');
      expect(frontend.props.accessibilityRole).toBe('checkbox');
      expect(frontend.props.accessibilityState.checked).toBe(false);

      fireEvent.press(frontend);
      expect(onChange).toHaveBeenLastCalledWith(['react', 'vue']);
      expect(
        screen.getByLabelText('Frontend').props.accessibilityState.checked
      ).toBe(true);
      expect(screen.getAllByText('✓')).toHaveLength(3);

      fireEvent.press(screen.getByLabelText('Frontend'));
      expect(onChange).toHaveBeenLastCalledWith([]);
      expect(screen.queryByText('✓')).toBeNull();
    });

    it('shows indeterminate state when some leaves are checked', () => {
      render(
        <TreeSelect
          data={data}
          mode="checkbox"
          placeholder="Pick"
          defaultValue={['react']}
          defaultExpandAll
        />
      );
      open();
      expect(screen.getByText('−')).toBeTruthy();
      expect(screen.getAllByText('✓')).toHaveLength(1);
      expect(
        screen.getByLabelText('Frontend').props.accessibilityState.checked
      ).toBe('mixed');
    });

    it('does not exceed maxValues when checking a parent', () => {
      const onChange = jest.fn();
      render(
        <TreeSelect
          data={data}
          mode="checkbox"
          placeholder="Pick"
          maxValues={1}
          onChange={onChange}
          defaultExpandAll
        />
      );
      open();
      fireEvent.press(screen.getByLabelText('Frontend'));
      expect(onChange).not.toHaveBeenCalled();
      fireEvent.press(screen.getByLabelText('React'));
      expect(onChange).toHaveBeenCalledWith(['react']);
    });
  });

  describe('search', () => {
    it('renders search input and filters by label (parent match keeps children)', () => {
      render(
        <TreeSelect
          data={data}
          placeholder="Pick"
          searchable
          searchPlaceholder="Type to search"
        />
      );
      open();
      const search = screen.getByPlaceholderText('Type to search');
      fireEvent.changeText(search, 'front');
      expect(screen.getByText('Frontend')).toBeTruthy();
      // searching auto-expands so children of the matching parent are visible
      expect(screen.getByText('React')).toBeTruthy();
      expect(screen.queryByText('Backend')).toBeNull();
    });

    it('keeps parents whose children match', () => {
      render(<TreeSelect data={data} placeholder="Pick" searchable />);
      open();
      fireEvent.changeText(screen.getByPlaceholderText('Search...'), 'vue');
      expect(screen.getByText('Frontend')).toBeTruthy();
      expect(screen.getByText('Vue')).toBeTruthy();
      expect(screen.queryByText('React')).toBeNull();
      expect(screen.queryByText('Backend')).toBeNull();
    });

    it('shows the default nothing found message', () => {
      render(<TreeSelect data={data} placeholder="Pick" searchable />);
      open();
      fireEvent.changeText(screen.getByPlaceholderText('Search...'), 'zzz');
      expect(screen.getByText('Nothing found')).toBeTruthy();
    });

    it('shows a custom nothing found message', () => {
      render(
        <TreeSelect
          data={data}
          placeholder="Pick"
          searchable
          nothingFoundMessage="No matches"
        />
      );
      open();
      fireEvent.changeText(screen.getByPlaceholderText('Search...'), 'zzz');
      expect(screen.getByText('No matches')).toBeTruthy();
    });

    it('resets the search after selecting a node in single mode', () => {
      render(
        <TreeSelect
          data={data}
          placeholder="Pick"
          searchable
          defaultExpandAll
        />
      );
      open();
      fireEvent.changeText(screen.getByPlaceholderText('Search...'), 'react');
      fireEvent.press(screen.getByLabelText('React'));
      open();
      expect(screen.getByPlaceholderText('Search...').props.value).toBe('');
      expect(screen.getByText('Backend')).toBeTruthy();
    });
  });

  describe('clear', () => {
    it('does not render the clear option without a selection', () => {
      render(<TreeSelect data={data} placeholder="Pick" clearable />);
      open();
      expect(screen.queryByLabelText('Clear')).toBeNull();
    });

    it('does not render the clear option when not clearable', () => {
      render(
        <TreeSelect data={data} placeholder="Pick" defaultValue="backend" />
      );
      open();
      expect(screen.queryByLabelText('Clear')).toBeNull();
    });

    it('renders the clear option when clearable with a selection', () => {
      render(
        <TreeSelect
          data={data}
          placeholder="Pick"
          clearable
          defaultValue="backend"
        />
      );
      open();
      expect(screen.getByLabelText('Clear')).toBeTruthy();
    });

    it('clears the value and calls onClear', () => {
      const onChange = jest.fn();
      const onClear = jest.fn();
      render(
        <TreeSelect
          data={data}
          placeholder="Pick"
          clearable
          clearButtonLabel="Reset"
          defaultValue="backend"
          onChange={onChange}
          onClear={onClear}
        />
      );
      open();
      fireEvent.press(screen.getByLabelText('Reset'));
      expect(onChange).toHaveBeenCalledWith(null);
      expect(onClear).toHaveBeenCalledTimes(1);
      expect(screen.getByPlaceholderText('Pick').props.value).toBe('');
      expect(screen.queryByLabelText('Reset')).toBeNull();
    });

    it('clears to an empty array in multiple mode', () => {
      const onChange = jest.fn();
      render(
        <TreeSelect
          data={data}
          mode="multiple"
          placeholder="Pick"
          clearable
          defaultValue={['react']}
          onChange={onChange}
        />
      );
      open();
      fireEvent.press(screen.getByLabelText('Clear'));
      expect(onChange).toHaveBeenCalledWith([]);
    });
  });

  describe('closing', () => {
    it('closes when the overlay is pressed', () => {
      render(<TreeSelect data={data} placeholder="Pick" searchable />);
      open();
      fireEvent.changeText(screen.getByPlaceholderText('Search...'), 'fro');
      const overlay = screen.UNSAFE_getAllByType(TouchableOpacity)[0]!;
      fireEvent.press(overlay);
      expect(screen.queryByText('Frontend')).toBeNull();
      open();
      expect(screen.getByPlaceholderText('Search...').props.value).toBe('');
    });

    it('closes on modal request close', () => {
      render(<TreeSelect data={data} placeholder="Pick" />);
      open();
      const modal = screen.UNSAFE_getByType(Modal);
      expect(modal.props.transparent).toBe(true);
      act(() => {
        modal.props.onRequestClose();
      });
      expect(screen.queryByText('Frontend')).toBeNull();
    });
  });

  it('renders element labels and uses value as accessibility label', () => {
    render(
      <TreeSelect
        data={[{ label: <Text testID="el-label">Custom</Text>, value: 'el' }]}
        placeholder="Pick"
        defaultValue="el"
      />
    );
    expect(screen.getByDisplayValue('el')).toBeTruthy();
    open();
    expect(screen.getByTestId('el-label')).toBeTruthy();
    expect(screen.getByLabelText('el')).toBeTruthy();
  });

  it('accepts size, radius, maxDropdownHeight and style props', () => {
    render(
      <TreeSelect
        data={data}
        placeholder="Pick"
        size="lg"
        radius="xl"
        maxDropdownHeight={100}
        style={{ borderColor: 'red' }}
        testID="input"
      />
    );
    expect(screen.getByTestId('input')).toHaveStyle({ borderColor: 'red' });
    open();
    expect(screen.getByText('Frontend')).toBeTruthy();
  });

  it('has displayName', () => {
    expect(TreeSelect.displayName).toBe('TreeSelect');
  });
});
