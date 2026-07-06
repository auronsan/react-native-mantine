import { Text as RNText } from 'react-native';
import { render, fireEvent } from './test-utils';
import {
  Button,
  Combobox,
  FloatingWindow,
  Menubar,
  PortalProvider,
  Scroller,
  Splitter,
  TableOfContents,
} from '../index';

describe('Splitter', () => {
  it('renders panes and resize handles', () => {
    const { getByText, getByLabelText } = render(
      <Splitter>
        <Splitter.Pane defaultSize={50}>
          <RNText>Left pane</RNText>
        </Splitter.Pane>
        <Splitter.Pane defaultSize={50}>
          <RNText>Right pane</RNText>
        </Splitter.Pane>
      </Splitter>
    );

    expect(getByText('Left pane')).toBeTruthy();
    expect(getByText('Right pane')).toBeTruthy();
    expect(getByLabelText('Resize pane 1')).toBeTruthy();
  });

  it('renders a handle between each pair of panes', () => {
    const { getByLabelText, queryByLabelText } = render(
      <Splitter orientation="vertical">
        <Splitter.Pane defaultSize={30}>
          <RNText>One</RNText>
        </Splitter.Pane>
        <Splitter.Pane defaultSize={30}>
          <RNText>Two</RNText>
        </Splitter.Pane>
        <Splitter.Pane defaultSize={40}>
          <RNText>Three</RNText>
        </Splitter.Pane>
      </Splitter>
    );

    expect(getByLabelText('Resize pane 1')).toBeTruthy();
    expect(getByLabelText('Resize pane 2')).toBeTruthy();
    expect(queryByLabelText('Resize pane 3')).toBeNull();
  });
});

describe('Scroller', () => {
  it('shows scroll controls based on scroll position', () => {
    const { getByTestId, getByLabelText, queryByLabelText, UNSAFE_getByType } =
      render(
        <Scroller testID="scroller">
          <RNText>Scroller content</RNText>
        </Scroller>
      );

    expect(queryByLabelText('Scroll forward')).toBeNull();
    expect(queryByLabelText('Scroll back')).toBeNull();

    fireEvent(getByTestId('scroller'), 'layout', {
      nativeEvent: { layout: { width: 200, height: 40 } },
    });
    const scrollView = UNSAFE_getByType('ScrollView' as any);
    fireEvent(scrollView, 'contentSizeChange', 600, 40);

    expect(getByLabelText('Scroll forward')).toBeTruthy();
    expect(queryByLabelText('Scroll back')).toBeNull();

    fireEvent.scroll(scrollView, {
      nativeEvent: { contentOffset: { x: 100, y: 0 } },
    });

    expect(getByLabelText('Scroll back')).toBeTruthy();

    fireEvent.press(getByLabelText('Scroll forward'));
    fireEvent.press(getByLabelText('Scroll back'));
  });
});

describe('Menubar', () => {
  it('opens one menu at a time and reports index changes', () => {
    const onOpenChange = jest.fn();

    const { getByText, queryByText } = render(
      <Menubar onOpenChange={onOpenChange}>
        <Menubar.Menu target={<Button>File</Button>}>
          <Menubar.Item>New file</Menubar.Item>
        </Menubar.Menu>
        <Menubar.Menu target={<Button>Edit</Button>}>
          <Menubar.Item>Undo</Menubar.Item>
        </Menubar.Menu>
      </Menubar>
    );

    expect(queryByText('New file')).toBeNull();

    fireEvent.press(getByText('File'));
    expect(onOpenChange).toHaveBeenLastCalledWith(0);
    expect(getByText('New file')).toBeTruthy();

    fireEvent.press(getByText('New file'));
    expect(onOpenChange).toHaveBeenLastCalledWith(null);
    expect(queryByText('New file')).toBeNull();
  });
});

describe('TableOfContents', () => {
  const data = [
    { id: 'introduction', value: 'Introduction', depth: 1 },
    { id: 'usage', value: 'Usage', depth: 2 },
    { id: 'api', value: 'API reference', depth: 2 },
  ];

  it('renders items and reports active changes', () => {
    const onActiveChange = jest.fn();
    const { getByText } = render(
      <TableOfContents
        data={data}
        defaultActive="introduction"
        onActiveChange={onActiveChange}
      />
    );

    expect(getByText('Introduction')).toBeTruthy();
    expect(getByText('Usage')).toBeTruthy();

    fireEvent.press(getByText('Usage'));
    expect(onActiveChange).toHaveBeenCalledWith('usage');
  });

  it('marks the active control as selected', () => {
    const { getByText } = render(
      <TableOfContents data={data} active="api" />
    );

    const activeControl = getByText('API reference');
    expect(activeControl).toBeTruthy();
  });
});

describe('FloatingWindow', () => {
  it('renders title, content and close button inline', () => {
    const onClose = jest.fn();
    const { getByText, getByLabelText } = render(
      <FloatingWindow title="Debug panel" onClose={onClose} withinPortal={false}>
        <RNText>Window body</RNText>
      </FloatingWindow>
    );

    expect(getByText('Debug panel')).toBeTruthy();
    expect(getByText('Window body')).toBeTruthy();

    fireEvent.press(getByLabelText('Close'));
    expect(onClose).toHaveBeenCalled();
  });

  it('renders through the portal overlay by default', () => {
    const { getByText } = render(
      <PortalProvider>
        <FloatingWindow title="Portaled window">
          <RNText>Portaled body</RNText>
        </FloatingWindow>
      </PortalProvider>
    );

    expect(getByText('Portaled window')).toBeTruthy();
    expect(getByText('Portaled body')).toBeTruthy();
  });
});

describe('Combobox', () => {
  it('opens on target press and submits options', () => {
    const onOptionSubmit = jest.fn();

    const { getByText, queryByText } = render(
      <Combobox onOptionSubmit={onOptionSubmit}>
        <Combobox.Target>
          <Button>Pick value</Button>
        </Combobox.Target>
        <Combobox.Dropdown>
          <Combobox.Options>
            <Combobox.Option value="react">React</Combobox.Option>
            <Combobox.Option value="vue">Vue</Combobox.Option>
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    );

    expect(queryByText('React')).toBeNull();

    fireEvent.press(getByText('Pick value'));
    expect(getByText('React')).toBeTruthy();

    fireEvent.press(getByText('React'));
    expect(onOptionSubmit).toHaveBeenCalledWith('react');
    expect(queryByText('React')).toBeNull();
  });

  it('does not submit disabled options', () => {
    const onOptionSubmit = jest.fn();

    const { getByText } = render(
      <Combobox onOptionSubmit={onOptionSubmit}>
        <Combobox.Target>
          <Button>Open list</Button>
        </Combobox.Target>
        <Combobox.Dropdown>
          <Combobox.Options>
            <Combobox.Option value="locked" disabled>
              Locked option
            </Combobox.Option>
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    );

    fireEvent.press(getByText('Open list'));
    fireEvent.press(getByText('Locked option'));
    expect(onOptionSubmit).not.toHaveBeenCalled();
  });

  it('renders search input and empty state', () => {
    const onChangeText = jest.fn();

    const { getByText, getByPlaceholderText } = render(
      <Combobox>
        <Combobox.Target>
          <Button>Search list</Button>
        </Combobox.Target>
        <Combobox.Dropdown>
          <Combobox.Search
            placeholder="Search options"
            onChangeText={onChangeText}
          />
          <Combobox.Empty>Nothing found</Combobox.Empty>
        </Combobox.Dropdown>
      </Combobox>
    );

    fireEvent.press(getByText('Search list'));

    fireEvent.changeText(getByPlaceholderText('Search options'), 'rea');
    expect(onChangeText).toHaveBeenCalledWith('rea');
    expect(getByText('Nothing found')).toBeTruthy();
  });
});
