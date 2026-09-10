import React from 'react';
import { Text } from 'react-native';
import { render, screen, fireEvent, act } from '../../../__tests__/test-utils';
import { Menubar } from '../index';
import { Menu } from '../../Menu';
import { Button } from '../../Button';

type MenubarProps = React.ComponentProps<typeof Menubar>;

const renderMenubar = (
  props: Partial<MenubarProps> = {},
  onItemPress: () => void = () => {}
) =>
  render(
    <Menubar testID="menubar" {...props}>
      <Menubar.Menu target={<Button testID="file-target">File</Button>}>
        <Menubar.Label>File actions</Menubar.Label>
        <Menubar.Item testID="new-item" onPress={onItemPress}>
          New
        </Menubar.Item>
        <Menubar.Divider testID="file-divider" />
        <Menubar.Item>Open</Menubar.Item>
      </Menubar.Menu>
      <Menubar.Menu target={<Button testID="edit-target">Edit</Button>}>
        <Menubar.Item>Undo</Menubar.Item>
        <Menubar.Item>Redo</Menubar.Item>
      </Menubar.Menu>
    </Menubar>
  );

describe('Menubar', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders all targets with every menu closed by default', () => {
    renderMenubar();
    expect(screen.getByTestId('menubar')).toBeTruthy();
    expect(screen.getByText('File')).toBeTruthy();
    expect(screen.getByText('Edit')).toBeTruthy();
    expect(screen.queryByText('New')).toBeNull();
    expect(screen.queryByText('Undo')).toBeNull();
  });

  it('applies row layout styles and merges custom style on the root', () => {
    renderMenubar({ style: { marginTop: 9 } });
    expect(screen.getByTestId('menubar')).toHaveStyle({
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      marginTop: 9,
    });
  });

  it('opens a menu on target press and reports the index (uncontrolled)', () => {
    const onOpenChange = jest.fn();
    renderMenubar({ onOpenChange });

    fireEvent.press(screen.getByTestId('file-target'));
    act(() => {
      jest.advanceTimersByTime(200);
    });

    expect(onOpenChange).toHaveBeenLastCalledWith(0);
    expect(screen.getByText('File actions')).toBeTruthy();
    expect(screen.getByText('New')).toBeTruthy();
    expect(screen.getByText('Open')).toBeTruthy();
    expect(screen.getByTestId('file-divider')).toBeTruthy();
    expect(screen.queryByText('Undo')).toBeNull();
  });

  it('only keeps one menu open at a time', () => {
    const onOpenChange = jest.fn();
    renderMenubar({ onOpenChange });

    fireEvent.press(screen.getByTestId('file-target'));
    expect(screen.getByText('New')).toBeTruthy();

    fireEvent.press(screen.getByTestId('edit-target'));
    expect(onOpenChange).toHaveBeenLastCalledWith(1);
    expect(screen.getByText('Undo')).toBeTruthy();
    expect(screen.queryByText('New')).toBeNull();
  });

  it('closes the menu and reports null when an item is pressed', () => {
    const onOpenChange = jest.fn();
    const onItemPress = jest.fn();
    renderMenubar({ onOpenChange }, onItemPress);

    fireEvent.press(screen.getByTestId('file-target'));
    fireEvent.press(screen.getByText('New'));

    expect(onItemPress).toHaveBeenCalledTimes(1);
    expect(onOpenChange).toHaveBeenLastCalledWith(null);
    expect(screen.queryByText('New')).toBeNull();
  });

  it('opens the menu at defaultOpenIndex initially', () => {
    renderMenubar({ defaultOpenIndex: 1 });
    expect(screen.getByText('Undo')).toBeTruthy();
    expect(screen.queryByText('New')).toBeNull();
  });

  it('respects the controlled openIndex prop', () => {
    const onOpenChange = jest.fn();
    const { rerender } = render(
      <Menubar openIndex={0} onOpenChange={onOpenChange}>
        <Menubar.Menu target={<Button testID="file-target">File</Button>}>
          <Menubar.Item>New</Menubar.Item>
        </Menubar.Menu>
        <Menubar.Menu target={<Button testID="edit-target">Edit</Button>}>
          <Menubar.Item>Undo</Menubar.Item>
        </Menubar.Menu>
      </Menubar>
    );
    expect(screen.getByText('New')).toBeTruthy();

    // Pressing a target only notifies, it does not change state.
    fireEvent.press(screen.getByTestId('edit-target'));
    expect(onOpenChange).toHaveBeenLastCalledWith(1);
    expect(screen.getByText('New')).toBeTruthy();
    expect(screen.queryByText('Undo')).toBeNull();

    rerender(
      <Menubar openIndex={1} onOpenChange={onOpenChange}>
        <Menubar.Menu target={<Button testID="file-target">File</Button>}>
          <Menubar.Item>New</Menubar.Item>
        </Menubar.Menu>
        <Menubar.Menu target={<Button testID="edit-target">Edit</Button>}>
          <Menubar.Item>Undo</Menubar.Item>
        </Menubar.Menu>
      </Menubar>
    );
    expect(screen.queryByText('New')).toBeNull();
    expect(screen.getByText('Undo')).toBeTruthy();

    rerender(
      <Menubar openIndex={null} onOpenChange={onOpenChange}>
        <Menubar.Menu target={<Button testID="file-target">File</Button>}>
          <Menubar.Item>New</Menubar.Item>
        </Menubar.Menu>
      </Menubar>
    );
    expect(screen.queryByText('New')).toBeNull();
  });

  it('exposes button role and expanded state on targets', () => {
    renderMenubar();
    const target = screen.getByTestId('file-target');
    expect(target.props.accessibilityRole).toBe('button');
    expect(target.props.accessibilityState.expanded).toBe(false);

    fireEvent.press(target);
    expect(
      screen.getByTestId('file-target').props.accessibilityState.expanded
    ).toBe(true);
    expect(
      screen.getByTestId('edit-target').props.accessibilityState.expanded
    ).toBe(false);
  });

  it('forwards extra Menu props such as closeOnItemClick and accessibilityLabel', () => {
    render(
      <Menubar>
        <Menubar.Menu
          target={<Button testID="file-target">File</Button>}
          closeOnItemClick={false}
          accessibilityLabel="File menu"
          position="top"
          width="target"
          shadow="xl"
          radius="lg"
        >
          <Menubar.Item testID="new-item">New</Menubar.Item>
        </Menubar.Menu>
      </Menubar>
    );

    fireEvent.press(screen.getByTestId('file-target'));
    expect(screen.getByLabelText('File menu')).toBeTruthy();

    fireEvent.press(screen.getByText('New'));
    expect(screen.getByText('New')).toBeTruthy();
    expect(screen.getByTestId('new-item').props.accessibilityRole).toBe(
      'menuitem'
    );
  });

  it('renders non-Menubar.Menu children in place', () => {
    render(
      <Menubar>
        <Text testID="plain">Plain child</Text>
        <Menubar.Menu target={<Button testID="file-target">File</Button>}>
          <Menubar.Item>New</Menubar.Item>
        </Menubar.Menu>
        {null}
        {false}
      </Menubar>
    );
    expect(screen.getByTestId('plain')).toBeTruthy();
    expect(screen.getByText('File')).toBeTruthy();

    // index still counts only menus, so the first menu is index 0
    fireEvent.press(screen.getByTestId('file-target'));
    expect(screen.getByText('New')).toBeTruthy();
  });

  it('accepts a forwarded ref', () => {
    const ref = jest.fn();
    render(
      <Menubar ref={ref} testID="menubar">
        <Menubar.Menu target={<Button>File</Button>}>
          <Menubar.Item>New</Menubar.Item>
        </Menubar.Menu>
      </Menubar>
    );
    expect(screen.getByTestId('menubar')).toBeTruthy();
    expect(ref).toHaveBeenCalled();
  });

  it('re-exports Menu sub-components and renders Menubar.Menu to nothing', () => {
    expect(Menubar.Item).toBe(Menu.Item);
    expect(Menubar.Label).toBe(Menu.Label);
    expect(Menubar.Divider).toBe(Menu.Divider);
    expect(Menubar.displayName).toBe('Menubar');
    expect(Menubar.Menu.displayName).toBe('Menubar.Menu');

    const { toJSON } = render(
      <Menubar.Menu target={<Button>File</Button>}>
        <Text>Orphan</Text>
      </Menubar.Menu>
    );
    expect(toJSON()).toBeNull();
  });
});
