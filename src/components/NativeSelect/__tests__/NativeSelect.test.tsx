import { Text, TouchableOpacity } from 'react-native';
import {
  fireEvent,
  render,
  screen,
  within,
} from '../../../__tests__/test-utils';
import { NativeSelect } from '../index';
import { createTheme } from '../../../theme/create-theme';
import { INPUT_SIZES } from '../../Input';

// VirtualizedList cannot render under the mocked ScrollView, replace FlatList
// with a plain list that renders every item through renderItem.
jest.mock('react-native/Libraries/Lists/FlatList', () => {
  const React = require('react');
  const FlatList = (props: any) => {
    const { View } = require('react-native');
    return React.createElement(
      View,
      { testID: props.testID },
      props.data.map((item: any, index: number) =>
        React.createElement(
          React.Fragment,
          { key: props.keyExtractor ? props.keyExtractor(item, index) : index },
          props.renderItem({ item, index })
        )
      )
    );
  };
  FlatList.displayName = 'FlatList';
  return { __esModule: true, default: FlatList };
});

const theme = createTheme();

const data = ['React', 'Vue', 'Angular'];

const objectData = [
  { value: 'a', label: 'Alpha' },
  { value: 'b', label: 'Beta', disabled: true },
  { value: 'c', label: 'Gamma' },
];

const getTrigger = () => screen.getByTestId('select');
const open = () => fireEvent.press(getTrigger());
const getModal = () => screen.UNSAFE_getByType('Modal' as any);

// The wrapper BoxView has no testID, walk up from the trigger to the nearest
// host ancestor.
const getWrapper = () => {
  let node = getTrigger().parent;
  while (node && typeof node.type !== 'string') {
    node = node.parent;
  }
  return node as NonNullable<typeof node>;
};

describe('NativeSelect', () => {
  it('renders default placeholder, chevron and accessibility props', () => {
    render(<NativeSelect data={data} testID="select" />);

    expect(screen.getByText('Select option')).toBeTruthy();
    expect(screen.getByText('▼')).toBeTruthy();

    const trigger = getTrigger();
    expect(trigger.props.accessibilityRole).toBe('button');
    expect(trigger.props.accessibilityLabel).toBe('Select');
    expect(trigger.props.accessibilityState).toEqual({
      expanded: false,
      disabled: false,
    });
    expect(screen.queryByLabelText('React')).toBeNull();
  });

  it('renders custom placeholder, label, description, error and required mark', () => {
    render(
      <NativeSelect
        data={data}
        label="Framework"
        description="Pick one"
        error="Required"
        placeholder="Choose"
        required
        testID="select"
      />
    );
    // label and asterisk are nested Text nodes, match the combined content
    expect(screen.getByText(/Framework/)).toBeTruthy();
    expect(screen.getByText(' *')).toBeTruthy();
    expect(screen.getByText('Pick one')).toBeTruthy();
    expect(screen.getByText('Required')).toBeTruthy();
    expect(screen.getByText('Choose')).toBeTruthy();
    expect(getTrigger().props.accessibilityLabel).toBe('Framework');
    expect(getTrigger()).toHaveStyle({
      borderColor: theme.fn.themeColor('red', 6),
    });
  });

  it('renders node label, description and error', () => {
    render(
      <NativeSelect
        data={data}
        label={<Text>Node label</Text>}
        description={<Text>Node description</Text>}
        error={<Text>Node error</Text>}
        testID="select"
      />
    );
    expect(screen.getByText('Node label')).toBeTruthy();
    expect(screen.getByText('Node description')).toBeTruthy();
    expect(screen.getByText('Node error')).toBeTruthy();
    expect(getTrigger().props.accessibilityLabel).toBe('Select');
    expect(screen.queryByText(' *')).toBeNull();

    open();
    expect(screen.getByText('Select an option')).toBeTruthy();
  });

  it('uses explicit accessibilityLabel and hint', () => {
    render(
      <NativeSelect
        data={data}
        label="Framework"
        accessibilityLabel="Pick framework"
        accessibilityHint="Opens a list"
        testID="select"
      />
    );
    expect(getTrigger().props.accessibilityLabel).toBe('Pick framework');
    expect(getTrigger().props.accessibilityHint).toBe('Opens a list');
  });

  it('opens the modal with the label as title and selects an item (uncontrolled)', () => {
    const onChange = jest.fn();
    render(
      <NativeSelect
        data={data}
        label="Framework"
        onChange={onChange}
        testID="select"
      />
    );

    open();
    expect(getTrigger().props.accessibilityState.expanded).toBe(true);
    expect(within(getModal()).getByText('Framework')).toBeTruthy();

    const vue = screen.getByLabelText('Vue');
    expect(vue.props.accessibilityRole).toBe('menuitem');
    expect(vue.props.accessibilityState).toEqual({
      selected: false,
      disabled: false,
    });

    fireEvent.press(vue);
    expect(onChange).toHaveBeenCalledWith('Vue');
    expect(screen.getByText('Vue')).toBeTruthy();
    expect(screen.queryByText('Select option')).toBeNull();
    expect(screen.queryByLabelText('React')).toBeNull();
    expect(getTrigger().props.accessibilityState.expanded).toBe(false);
  });

  it('marks the selected item from defaultValue', () => {
    render(<NativeSelect data={data} defaultValue="Angular" testID="select" />);
    expect(screen.getByText('Angular')).toBeTruthy();
    open();
    expect(screen.getByLabelText('Angular').props.accessibilityState).toEqual({
      selected: true,
      disabled: false,
    });
    expect(screen.getByLabelText('React').props.accessibilityState.selected).toBe(
      false
    );
  });

  it('does not update internal value when controlled', () => {
    const onChange = jest.fn();
    render(
      <NativeSelect
        data={data}
        value="React"
        onChange={onChange}
        testID="select"
      />
    );
    expect(screen.getByText('React')).toBeTruthy();

    open();
    fireEvent.press(screen.getByLabelText('Vue'));
    expect(onChange).toHaveBeenCalledWith('Vue');
    expect(screen.getByText('React')).toBeTruthy();
    expect(screen.queryByText('Vue')).toBeNull();
  });

  it('works without onChange', () => {
    render(<NativeSelect data={data} testID="select" />);
    open();
    fireEvent.press(screen.getByLabelText('React'));
    expect(screen.getByText('React')).toBeTruthy();
  });

  it('does not open when disabled', () => {
    render(<NativeSelect data={data} disabled testID="select" />);
    const trigger = getTrigger();
    expect(trigger).toBeDisabled();
    expect(trigger.props.accessibilityState).toEqual({
      expanded: false,
      disabled: true,
    });
    expect(trigger).toHaveStyle({ opacity: 0.6 });

    open();
    expect(screen.queryByLabelText('React')).toBeNull();
  });

  it('renders object data with disabled options', () => {
    const onChange = jest.fn();
    render(
      <NativeSelect data={objectData} onChange={onChange} testID="select" />
    );
    open();
    const beta = screen.getByLabelText('Beta');
    expect(beta).toBeDisabled();
    expect(beta.props.accessibilityState).toEqual({
      selected: false,
      disabled: true,
    });

    fireEvent.press(screen.getByLabelText('Gamma'));
    expect(onChange).toHaveBeenCalledWith('c');
    expect(screen.getByText('Gamma')).toBeTruthy();
  });

  it('closes when the overlay is pressed', () => {
    render(<NativeSelect data={data} testID="select" />);
    open();
    expect(screen.getByLabelText('React')).toBeTruthy();

    const touchables = within(getModal()).UNSAFE_getAllByType(TouchableOpacity);
    // inner content stops propagation
    const stopPropagation = jest.fn();
    fireEvent.press(touchables[1]!, { stopPropagation });
    expect(stopPropagation).toHaveBeenCalled();
    expect(screen.getByLabelText('React')).toBeTruthy();

    fireEvent.press(touchables[0]!);
    expect(screen.queryByLabelText('React')).toBeNull();
  });

  it('closes on modal request close', () => {
    render(<NativeSelect data={data} testID="select" />);
    open();
    fireEvent(getModal(), 'requestClose');
    expect(screen.queryByLabelText('React')).toBeNull();
  });

  it('renders icon and removes text left padding', () => {
    render(
      <NativeSelect data={data} icon={<Text>icon</Text>} testID="select" />
    );
    expect(screen.getByText('icon')).toBeTruthy();
    expect(screen.getByText('Select option')).toHaveStyle({ paddingLeft: 0 });
  });

  it('applies the default variant styles', () => {
    render(<NativeSelect data={data} testID="select" />);
    expect(getTrigger()).toHaveStyle({
      backgroundColor: theme.white,
      borderWidth: 1,
      borderColor: theme.fn.themeColor('gray', 4),
    });
  });

  it('applies the filled variant styles', () => {
    render(<NativeSelect data={data} variant="filled" testID="select" />);
    expect(getTrigger()).toHaveStyle({
      backgroundColor: theme.fn.themeColor('gray', 1),
      borderWidth: 1,
      borderColor: 'transparent',
    });
  });

  it('applies the unstyled variant styles', () => {
    render(<NativeSelect data={data} variant="unstyled" testID="select" />);
    expect(getTrigger()).toHaveStyle({
      backgroundColor: 'transparent',
      borderWidth: 0,
    });
  });

  it.each(['xs', 'sm', 'md', 'lg', 'xl'] as const)(
    'renders %s size',
    (size) => {
      render(<NativeSelect data={data} size={size} testID="select" />);
      expect(getTrigger()).toHaveStyle({ height: INPUT_SIZES[size] });
    }
  );

  it('applies fullWidth, wrapperStyle, style and radius', () => {
    render(
      <NativeSelect
        data={data}
        fullWidth
        radius="xl"
        wrapperStyle={{ margin: 7 }}
        style={{ paddingLeft: 3 }}
        testID="select"
      />
    );
    expect(getTrigger()).toHaveStyle({
      paddingLeft: 3,
      borderRadius: theme.fn.radius('xl'),
    });
    expect(getWrapper()).toHaveStyle({ width: '100%', margin: 7 });
  });

  it('does not set width when fullWidth is false', () => {
    render(<NativeSelect data={data} testID="select" />);
    expect(getWrapper()).not.toHaveStyle({ width: '100%' });
  });

  it('accepts a ref on the trigger', () => {
    // the TouchableOpacity jest mock does not instantiate host refs, rendering
    // with a ref attached must still be safe
    const ref = jest.fn();
    expect(() =>
      render(<NativeSelect ref={ref} data={data} testID="select" />)
    ).not.toThrow();
    expect(getTrigger()).toBeTruthy();
  });
});
