import React from 'react';
import { Text, View } from 'react-native';
import { render, screen, fireEvent } from '../../../__tests__/test-utils';
import { createTheme } from '../../../theme/create-theme';
import { Tabs, TabsList, Tab, TabsPanel } from '../index';

const theme = createTheme();
const blue = theme.fn.themeColor('blue', 6);
const red = theme.fn.themeColor('red', 6);
const gray3 = theme.colors.gray?.[3];
const gray7 = theme.colors.gray?.[7];

const tab = (label: string) => screen.getByLabelText(label);

// Inactive panels are rendered with display: 'none', which RNTL treats as
// hidden and excludes from default queries.
const hiddenPanel = (testID: string) =>
  screen.getByTestId(testID, { includeHiddenElements: true });

const renderTabs = (
  props: Partial<React.ComponentProps<typeof Tabs>> = {},
  listProps: Partial<React.ComponentProps<typeof TabsList>> = {}
) =>
  render(
    <Tabs defaultValue="gallery" testID="tabs" {...props}>
      <TabsList testID="list" {...listProps}>
        <Tab value="gallery" testID="tab-gallery">
          Gallery
        </Tab>
        <Tab value="messages" testID="tab-messages">
          Messages
        </Tab>
        <Tab value="settings" testID="tab-settings" disabled>
          Settings
        </Tab>
      </TabsList>
      <TabsPanel value="gallery" testID="panel-gallery">
        <Text>Gallery content</Text>
      </TabsPanel>
      <TabsPanel value="messages" testID="panel-messages">
        <Text>Messages content</Text>
      </TabsPanel>
    </Tabs>
  );

describe('Tabs', () => {
  it('exposes compound components with display names', () => {
    expect(Tabs.List).toBe(TabsList);
    expect(Tabs.Tab).toBe(Tab);
    expect(Tabs.Panel).toBe(TabsPanel);
    expect(Tabs.displayName).toBe('Tabs');
    expect(TabsList.displayName).toBe('Tabs.List');
    expect(Tab.displayName).toBe('Tabs.Tab');
    expect(TabsPanel.displayName).toBe('Tabs.Panel');
  });

  it('renders through the typed compound API', () => {
    const onTabChange = jest.fn();
    render(
      <Tabs defaultValue="a" onTabChange={onTabChange} testID="tabs">
        <Tabs.List grow position="center" testID="list">
          <Tabs.Tab value="a">A</Tabs.Tab>
          <Tabs.Tab value="b">B</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="a" testID="panel-a">
          <Text>A content</Text>
        </Tabs.Panel>
        <Tabs.Panel value="b" testID="panel-b">
          <Text>B content</Text>
        </Tabs.Panel>
      </Tabs>
    );

    expect(screen.getByTestId('list').props.accessibilityRole).toBe('tablist');
    expect(screen.getByText('A content')).toBeTruthy();
    fireEvent.press(tab('B'));
    expect(onTabChange).toHaveBeenCalledWith('b');
    expect(screen.getByTestId('panel-b')).toHaveStyle({ display: 'flex' });
  });

  it('renders tabs, list and the active panel with defaults', () => {
    renderTabs();

    expect(screen.getByTestId('tabs')).toHaveStyle({ flexDirection: 'column' });
    expect(screen.getByTestId('list').props.accessibilityRole).toBe('tablist');
    expect(screen.getByTestId('list')).toHaveStyle({
      flexDirection: 'row',
      justifyContent: 'flex-start',
      borderBottomWidth: 1,
    });
    expect(screen.getAllByRole('tab')).toHaveLength(3);

    expect(tab('Gallery').props.accessibilityState).toEqual({
      selected: true,
      disabled: false,
    });
    expect(tab('Messages').props.accessibilityState).toEqual({
      selected: false,
      disabled: false,
    });

    expect(screen.getByText('Gallery content')).toBeTruthy();
    expect(screen.getByTestId('panel-gallery')).toHaveStyle({
      display: 'flex',
    });
    // keepMounted defaults to true: inactive panel stays mounted but hidden
    expect(screen.queryByTestId('panel-messages')).toBeNull();
    expect(
      screen.getByText('Messages content', { includeHiddenElements: true })
    ).toBeTruthy();
    expect(hiddenPanel('panel-messages')).toHaveStyle({ display: 'none' });
  });

  it('switches tabs on press in uncontrolled mode', () => {
    const onTabChange = jest.fn();
    renderTabs({ onTabChange });

    fireEvent.press(tab('Messages'));

    expect(onTabChange).toHaveBeenCalledWith('messages');
    expect(tab('Messages').props.accessibilityState.selected).toBe(true);
    expect(tab('Gallery').props.accessibilityState.selected).toBe(false);
    expect(screen.getByTestId('panel-messages')).toHaveStyle({
      display: 'flex',
    });
    expect(hiddenPanel('panel-gallery')).toHaveStyle({ display: 'none' });
  });

  it('does not change the active tab internally when controlled', () => {
    const onTabChange = jest.fn();
    const { rerender } = render(
      <Tabs value="gallery" onTabChange={onTabChange}>
        <TabsList>
          <Tab value="gallery">Gallery</Tab>
          <Tab value="messages">Messages</Tab>
        </TabsList>
        <TabsPanel value="gallery" testID="panel-gallery">
          <Text>Gallery content</Text>
        </TabsPanel>
      </Tabs>
    );

    fireEvent.press(tab('Messages'));
    expect(onTabChange).toHaveBeenCalledWith('messages');
    expect(tab('Gallery').props.accessibilityState.selected).toBe(true);
    expect(tab('Messages').props.accessibilityState.selected).toBe(false);

    rerender(
      <Tabs value="messages" onTabChange={onTabChange}>
        <TabsList>
          <Tab value="gallery">Gallery</Tab>
          <Tab value="messages">Messages</Tab>
        </TabsList>
        <TabsPanel value="gallery" testID="panel-gallery">
          <Text>Gallery content</Text>
        </TabsPanel>
      </Tabs>
    );
    expect(tab('Messages').props.accessibilityState.selected).toBe(true);
    expect(hiddenPanel('panel-gallery')).toHaveStyle({ display: 'none' });
  });

  it('has no active tab when neither value nor defaultValue is provided', () => {
    render(
      <Tabs>
        <TabsList>
          <Tab value="a">A</Tab>
        </TabsList>
        <TabsPanel value="a" testID="panel-a">
          <Text>A content</Text>
        </TabsPanel>
      </Tabs>
    );
    expect(tab('A').props.accessibilityState.selected).toBe(false);
    expect(hiddenPanel('panel-a')).toHaveStyle({ display: 'none' });
  });

  it('ignores presses on disabled tabs', () => {
    const onTabChange = jest.fn();
    renderTabs({ onTabChange });

    const settings = tab('Settings');
    expect(settings.props.accessibilityState).toEqual({
      selected: false,
      disabled: true,
    });
    expect(settings).toBeDisabled();
    expect(settings).toHaveStyle({ opacity: 0.4 });

    fireEvent.press(settings);
    expect(onTabChange).not.toHaveBeenCalled();
    expect(tab('Gallery').props.accessibilityState.selected).toBe(true);
  });

  it('unmounts inactive panels when keepMounted is false', () => {
    renderTabs({ keepMounted: false });

    expect(screen.getByText('Gallery content')).toBeTruthy();
    expect(screen.queryByText('Messages content')).toBeNull();
    expect(screen.queryByTestId('panel-messages')).toBeNull();

    fireEvent.press(tab('Messages'));
    expect(screen.getByText('Messages content')).toBeTruthy();
    expect(screen.queryByText('Gallery content')).toBeNull();
  });

  it('applies default variant styles for horizontal orientation', () => {
    renderTabs();
    expect(tab('Gallery')).toHaveStyle({
      borderBottomWidth: 2,
      borderRightWidth: 0,
      borderBottomColor: blue,
    });
    expect(tab('Messages')).toHaveStyle({
      borderBottomColor: 'transparent',
    });
    expect(screen.getByText('Gallery')).toHaveStyle({ color: blue });
    expect(screen.getByText('Messages')).toHaveStyle({ color: gray7 });
  });

  it('applies vertical orientation styles', () => {
    renderTabs({ orientation: 'vertical' });
    expect(screen.getByTestId('tabs')).toHaveStyle({ flexDirection: 'row' });
    expect(screen.getByTestId('list')).toHaveStyle({
      flexDirection: 'column',
      borderBottomWidth: 0,
    });
    expect(tab('Gallery')).toHaveStyle({
      borderBottomWidth: 0,
      borderRightWidth: 2,
      borderRightColor: blue,
    });
    expect(tab('Messages')).toHaveStyle({ borderRightColor: 'transparent' });
  });

  it('applies pills variant styles', () => {
    renderTabs({ variant: 'pills', radius: 'xl' });
    expect(tab('Gallery')).toHaveStyle({
      backgroundColor: blue,
      borderRadius: theme.radius.xl,
      elevation: 1,
    });
    expect(tab('Messages')).toHaveStyle({ backgroundColor: 'transparent' });
    expect(tab('Messages')).not.toHaveStyle({ elevation: 1 });
    expect(screen.getByText('Gallery')).toHaveStyle({ color: theme.white });
    expect(screen.getByText('Messages')).toHaveStyle({ color: gray7 });
  });

  it('applies outline variant styles', () => {
    renderTabs({ variant: 'outline', radius: 'md' });
    expect(tab('Gallery')).toHaveStyle({
      borderWidth: 1,
      borderColor: blue,
      borderRadius: theme.radius.md,
      backgroundColor: theme.fn.rgba(blue, 0.1),
    });
    expect(tab('Messages')).toHaveStyle({
      borderColor: gray3,
      backgroundColor: 'transparent',
    });
    expect(screen.getByText('Gallery')).toHaveStyle({ color: blue });
  });

  it('uses the Tabs color and allows a per-tab color override', () => {
    render(
      <Tabs defaultValue="a" color="red">
        <TabsList>
          <Tab value="a">A</Tab>
        </TabsList>
      </Tabs>
    );
    expect(tab('A')).toHaveStyle({ borderBottomColor: red });

    screen.unmount();

    render(
      <Tabs defaultValue="a" color="red">
        <TabsList>
          <Tab value="a" color="blue">
            A
          </Tab>
        </TabsList>
      </Tabs>
    );
    expect(tab('A')).toHaveStyle({ borderBottomColor: blue });
  });

  it.each([
    ['left', 'flex-start'],
    ['center', 'center'],
    ['right', 'flex-end'],
    ['apart', 'space-between'],
    ['unknown', 'flex-start'],
  ] as const)('positions tab list with position=%s', (position, expected) => {
    renderTabs({}, { position: position as any });
    expect(screen.getByTestId('list')).toHaveStyle({
      justifyContent: expected,
    });
  });

  it('accepts grow flag and custom styles on list, tabs and panels', () => {
    render(
      <Tabs defaultValue="a" style={{ margin: 3 }} testID="tabs">
        <TabsList grow style={{ padding: 4 }} testID="list">
          <Tab value="a" style={{ padding: 5 }}>
            A
          </Tab>
        </TabsList>
        <TabsPanel value="a" style={{ padding: 6 }} testID="panel">
          <Text>A content</Text>
        </TabsPanel>
      </Tabs>
    );
    expect(screen.getByTestId('tabs')).toHaveStyle({ margin: 3 });
    expect(screen.getByTestId('list')).toHaveStyle({ padding: 4 });
    expect(tab('A')).toHaveStyle({ padding: 5 });
    expect(screen.getByTestId('panel')).toHaveStyle({ padding: 6 });
  });

  it('renders icon and rightSection and omits label for non-string children', () => {
    render(
      <Tabs defaultValue="a">
        <TabsList>
          <Tab
            value="a"
            icon={<View testID="icon" />}
            rightSection={<View testID="right" />}
          >
            <Text>Custom label</Text>
          </Tab>
          <Tab value="b" icon={<View testID="icon-only" />} testID="b" />
        </TabsList>
      </Tabs>
    );
    expect(screen.getByTestId('icon')).toBeTruthy();
    expect(screen.getByTestId('right')).toBeTruthy();
    expect(screen.getByText('Custom label')).toBeTruthy();

    const tabs = screen.getAllByRole('tab');
    expect(tabs[0]?.props.accessibilityLabel).toBeUndefined();
    expect(screen.getByTestId('icon-only')).toBeTruthy();
    expect(screen.getByTestId('b').props.accessibilityLabel).toBeUndefined();
  });

  it('throws when compound components are used outside Tabs', () => {
    const consoleError = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    expect(() => render(<Tab value="a">A</Tab>)).toThrow(
      'Tabs compound components must be used within Tabs'
    );
    expect(() =>
      render(
        <TabsList>
          <Text>x</Text>
        </TabsList>
      )
    ).toThrow('Tabs compound components must be used within Tabs');
    expect(() =>
      render(
        <TabsPanel value="a">
          <Text>x</Text>
        </TabsPanel>
      )
    ).toThrow('Tabs compound components must be used within Tabs');

    consoleError.mockRestore();
  });
});
