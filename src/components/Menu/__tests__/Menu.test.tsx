import React from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import { render, screen, fireEvent, act } from '../../../__tests__/test-utils';
import { Menu } from '../index';
import { Button } from '../../Button';
import { createTheme } from '../../../theme/create-theme';
import { ThemeProvider } from '../../../theme/theme-provider';

/** Target whose measureInWindow reports a fixed rect (x, y, width, height). */
const createMeasurableTarget = (rect: [number, number, number, number]) =>
  React.forwardRef<any, { onPress?: () => void }>(({ onPress }, ref) => {
    React.useImperativeHandle(ref, () => ({
      measureInWindow: (
        cb: (x: number, y: number, w: number, h: number) => void
      ) => cb(...rect),
    }));
    return (
      <TouchableOpacity testID="measurable" onPress={onPress}>
        <Text>Measurable</Text>
      </TouchableOpacity>
    );
  });

const renderMenu = (
  menuProps: Partial<React.ComponentProps<typeof Menu>> = {},
  itemProps: Partial<React.ComponentProps<typeof Menu.Item>> = {}
) =>
  render(
    <Menu {...menuProps} testID="menu">
      <Menu.Target>
        <Button testID="target">Toggle</Button>
      </Menu.Target>
      <Menu.Dropdown testID="dropdown">
        <Menu.Label>Application</Menu.Label>
        <Menu.Item testID="item-settings" {...itemProps}>
          Settings
        </Menu.Item>
        <Menu.Divider testID="divider" />
        <Menu.Item color="red">Logout</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );

describe('Menu', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders target and keeps the dropdown closed by default', () => {
    renderMenu();
    expect(screen.getByTestId('menu')).toBeTruthy();
    expect(screen.getByText('Toggle')).toBeTruthy();
    expect(screen.queryByText('Settings')).toBeNull();
    expect(screen.queryByTestId('dropdown')).toBeNull();
  });

  it('opens the dropdown when the target is pressed (uncontrolled)', () => {
    renderMenu();
    fireEvent.press(screen.getByTestId('target'));

    act(() => {
      jest.advanceTimersByTime(200);
    });

    expect(screen.getByTestId('dropdown')).toBeTruthy();
    expect(screen.getByText('Application')).toBeTruthy();
    expect(screen.getByText('Settings')).toBeTruthy();
    expect(screen.getByText('Logout')).toBeTruthy();
    expect(screen.getByTestId('divider')).toBeTruthy();
  });

  it('exposes expanded state and button role on the target', () => {
    renderMenu();
    const target = screen.getByTestId('target');
    expect(target.props.accessibilityRole).toBe('button');
    expect(target.props.accessibilityState.expanded).toBe(false);

    fireEvent.press(target);
    expect(screen.getByTestId('target').props.accessibilityState.expanded).toBe(
      true
    );
  });

  it('applies accessibilityLabel and menu role to the dropdown', () => {
    renderMenu({ accessibilityLabel: 'Main menu' });
    fireEvent.press(screen.getByTestId('target'));
    const dropdown = screen.getByTestId('dropdown');
    expect(dropdown.props.accessibilityRole).toBe('menu');
    expect(dropdown.props.accessibilityLabel).toBe('Main menu');
    expect(screen.getByLabelText('Main menu')).toBeTruthy();
  });

  it('calls item onPress and closes the menu on item press', () => {
    const onPress = jest.fn();
    const onChange = jest.fn();
    renderMenu({ onChange }, { onPress });

    fireEvent.press(screen.getByTestId('target'));
    expect(onChange).toHaveBeenLastCalledWith(true);

    fireEvent.press(screen.getByText('Settings'));
    expect(onPress).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenLastCalledWith(false);
    expect(screen.queryByText('Settings')).toBeNull();
  });

  it('keeps the menu open on item press when closeOnItemClick is false', () => {
    const onPress = jest.fn();
    renderMenu({ closeOnItemClick: false }, { onPress });

    fireEvent.press(screen.getByTestId('target'));
    fireEvent.press(screen.getByText('Settings'));

    expect(onPress).toHaveBeenCalledTimes(1);
    expect(screen.getByText('Settings')).toBeTruthy();
  });

  it('does not call onPress for disabled items', () => {
    const onPress = jest.fn();
    renderMenu({}, { onPress, disabled: true });

    fireEvent.press(screen.getByTestId('target'));
    const item = screen.getByTestId('item-settings');
    expect(item).toBeDisabled();
    expect(item).toHaveStyle({ opacity: 0.4 });

    // Call the handler directly: RNTL skips disabled touchables and bubbles
    // the press up to the backdrop instead.
    const touchable = screen
      .UNSAFE_getAllByType(TouchableOpacity)
      .find((node) => node.props.testID === 'item-settings')!;
    act(() => {
      touchable.props.onPress();
    });
    expect(onPress).not.toHaveBeenCalled();
    expect(screen.getByText('Settings')).toBeTruthy();
  });

  it('positions the dropdown below the measured target', () => {
    const MeasurableTarget = React.forwardRef<any, { onPress?: () => void }>(
      ({ onPress }, ref) => {
        React.useImperativeHandle(ref, () => ({
          measureInWindow: (
            cb: (x: number, y: number, w: number, h: number) => void
          ) => cb(10, 20, 100, 40),
        }));
        return (
          <TouchableOpacity testID="measurable" onPress={onPress}>
            <Text>Measurable</Text>
          </TouchableOpacity>
        );
      }
    );

    render(
      <Menu>
        <Menu.Target>
          <MeasurableTarget />
        </Menu.Target>
        <Menu.Dropdown testID="dropdown">
          <Menu.Item>Item</Menu.Item>
        </Menu.Dropdown>
      </Menu>
    );

    fireEvent.press(screen.getByTestId('measurable'));
    expect(screen.getByTestId('dropdown')).toHaveStyle({
      position: 'absolute',
      top: 64,
      left: 10,
    });
  });

  it('closes when the backdrop is pressed', () => {
    const onChange = jest.fn();
    renderMenu({ onChange });
    fireEvent.press(screen.getByTestId('target'));

    const dropdown = screen.getByTestId('dropdown');
    // Backdrop is the touchable wrapping the dropdown
    const backdrop = dropdown.parent!.parent!;
    fireEvent.press(backdrop);

    expect(onChange).toHaveBeenLastCalledWith(false);
    expect(screen.queryByTestId('dropdown')).toBeNull();
  });

  it('closes on native modal onRequestClose', () => {
    const onChange = jest.fn();
    renderMenu({ onChange });
    fireEvent.press(screen.getByTestId('target'));

    const modal = screen.root.findAll(
      (node: { type: unknown }) => node.type === 'Modal'
    )[0]!;
    act(() => {
      modal.props.onRequestClose();
    });

    expect(onChange).toHaveBeenLastCalledWith(false);
    expect(screen.queryByTestId('dropdown')).toBeNull();
  });

  it('supports controlled opened state', () => {
    const onChange = jest.fn();
    const { rerender } = render(
      <Menu opened={false} onChange={onChange}>
        <Menu.Target>
          <Button testID="target">Toggle</Button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item>Controlled</Menu.Item>
        </Menu.Dropdown>
      </Menu>
    );

    fireEvent.press(screen.getByTestId('target'));
    expect(onChange).toHaveBeenCalledWith(true);
    // Still closed because the parent did not update `opened`
    expect(screen.queryByText('Controlled')).toBeNull();

    rerender(
      <Menu opened onChange={onChange}>
        <Menu.Target>
          <Button testID="target">Toggle</Button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item>Controlled</Menu.Item>
        </Menu.Dropdown>
      </Menu>
    );
    expect(screen.getByText('Controlled')).toBeTruthy();

    fireEvent.press(screen.getByText('Controlled'));
    expect(onChange).toHaveBeenLastCalledWith(false);
    // Still open until the parent updates
    expect(screen.getByText('Controlled')).toBeTruthy();
  });

  it('renders item icon and rightSection', () => {
    render(
      <Menu opened onChange={() => {}}>
        <Menu.Target>
          <Button>Toggle</Button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            icon={<View testID="icon" />}
            rightSection={<Text testID="right">⌘K</Text>}
          >
            With sections
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    );
    expect(screen.getByTestId('icon')).toBeTruthy();
    expect(screen.getByTestId('right')).toBeTruthy();
    expect(screen.getByText('With sections')).toBeTruthy();
  });

  it('applies pressed styles on pressIn / pressOut', () => {
    render(
      <Menu opened onChange={() => {}}>
        <Menu.Target>
          <Button>Toggle</Button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item testID="item">Pressable</Menu.Item>
        </Menu.Dropdown>
      </Menu>
    );
    const item = screen.getByTestId('item');
    expect(item.props.accessibilityRole).toBe('menuitem');

    fireEvent(item, 'pressIn');
    expect(screen.getByTestId('item')).toHaveStyle({
      backgroundColor: expect.any(String),
    });

    fireEvent(item, 'pressOut');
    expect(screen.getByTestId('item')).not.toHaveStyle({
      backgroundColor: expect.any(String),
    });
  });

  it('renders items and labels without text wrapper', () => {
    render(
      <Menu opened onChange={() => {}}>
        <Menu.Target>
          <Button>Toggle</Button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label withTextWrapper={false} testID="label">
            <Text testID="label-text">Raw label</Text>
          </Menu.Label>
          <Menu.Item withTextWrapper={false}>
            <Text testID="item-text">Raw item</Text>
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    );
    expect(screen.getByTestId('label')).toBeTruthy();
    expect(screen.getByTestId('label-text')).toBeTruthy();
    expect(screen.getByTestId('item-text')).toBeTruthy();
  });

  it('merges custom styles on dropdown, item, label and divider', () => {
    render(
      <Menu opened onChange={() => {}}>
        <Menu.Target>
          <Button>Toggle</Button>
        </Menu.Target>
        <Menu.Dropdown testID="dropdown" style={{ width: 123 }}>
          <Menu.Label testID="label" style={{ marginTop: 3 }}>
            Label
          </Menu.Label>
          <Menu.Item testID="item" style={{ marginTop: 5 }}>
            Item
          </Menu.Item>
          <Menu.Divider testID="divider" style={{ marginTop: 7 }} />
        </Menu.Dropdown>
      </Menu>
    );
    expect(screen.getByTestId('dropdown')).toHaveStyle({ width: 123 });
    expect(screen.getByTestId('label')).toHaveStyle({ marginTop: 3 });
    expect(screen.getByTestId('item')).toHaveStyle({ marginTop: 5 });
    expect(screen.getByTestId('divider')).toHaveStyle({ marginTop: 7 });
  });

  it.each([
    // position, target rect, dropdown size, expected
    ['bottom-start', [10, 300, 100, 40], [200, 80], { top: 344, left: 10 }],
    ['bottom', [10, 300, 100, 40], [50, 80], { top: 344, left: 35 }],
    ['bottom-end', [10, 300, 100, 40], [50, 80], { top: 344, left: 60 }],
    ['top-start', [10, 300, 100, 40], [200, 80], { top: 216, left: 10 }],
    ['top-end', [10, 300, 100, 40], [50, 80], { top: 216, left: 60 }],
    ['right', [10, 300, 100, 40], [50, 80], { top: 280, left: 114 }],
    ['left', [300, 300, 100, 40], [50, 80], { top: 280, left: 246 }],
  ] as const)('positions the dropdown for position %s', (position, rect, size, expected) => {
    const MeasurableTarget = createMeasurableTarget([...rect] as any);
    render(
      <Menu position={position} width={size[0]}>
        <Menu.Target>
          <MeasurableTarget />
        </Menu.Target>
        <Menu.Dropdown testID="dropdown">
          <Menu.Item>Item</Menu.Item>
        </Menu.Dropdown>
      </Menu>
    );
    fireEvent.press(screen.getByTestId('measurable'));
    fireEvent(screen.getByTestId('dropdown'), 'layout', {
      nativeEvent: { layout: { x: 0, y: 0, width: size[0], height: size[1] } },
    });
    expect(screen.getByTestId('dropdown')).toHaveStyle(expected);
  });

  it('flips above the target when there is no room below', () => {
    // window height in the jest preset is 1334
    const MeasurableTarget = createMeasurableTarget([10, 1300, 100, 30]);
    render(
      <Menu position="bottom-start" width={200}>
        <Menu.Target>
          <MeasurableTarget />
        </Menu.Target>
        <Menu.Dropdown testID="dropdown">
          <Menu.Item>Item</Menu.Item>
        </Menu.Dropdown>
      </Menu>
    );
    fireEvent.press(screen.getByTestId('measurable'));
    fireEvent(screen.getByTestId('dropdown'), 'layout', {
      nativeEvent: { layout: { x: 0, y: 0, width: 200, height: 80 } },
    });
    expect(screen.getByTestId('dropdown')).toHaveStyle({ top: 1300 - 80 - 4, left: 10 });
  });

  it('applies a numeric width and matches the target with width="target"', () => {
    const MeasurableTarget = createMeasurableTarget([10, 20, 100, 40]);
    const { rerender } = render(
      <Menu opened width={300}>
        <Menu.Target>
          <MeasurableTarget />
        </Menu.Target>
        <Menu.Dropdown testID="dropdown">
          <Menu.Item>Item</Menu.Item>
        </Menu.Dropdown>
      </Menu>
    );
    expect(screen.getByTestId('dropdown')).toHaveStyle({ width: 300 });

    rerender(
      <Menu opened width="target">
        <Menu.Target>
          <MeasurableTarget />
        </Menu.Target>
        <Menu.Dropdown testID="dropdown">
          <Menu.Item>Item</Menu.Item>
        </Menu.Dropdown>
      </Menu>
    );
    expect(screen.getByTestId('dropdown')).toHaveStyle({ width: 100 });
  });

  it('applies shadow, radius and zIndex from the theme to the dropdown', () => {
    const theme = createTheme();
    render(
      <Menu opened onChange={() => {}} shadow="xl" radius="lg" zIndex={5}>
        <Menu.Target>
          <Button>Toggle</Button>
        </Menu.Target>
        <Menu.Dropdown testID="dropdown">
          <Menu.Item>Item</Menu.Item>
        </Menu.Dropdown>
      </Menu>
    );
    expect(screen.getByTestId('dropdown')).toHaveStyle({
      borderRadius: theme.fn.radius('lg'),
      zIndex: 5,
      backgroundColor: theme.white,
      ...theme.fn.shadow('xl'),
    });
  });

  it('does not close on backdrop press when closeOnClickOutside is false', () => {
    const onChange = jest.fn();
    renderMenu({ onChange, closeOnClickOutside: false });
    fireEvent.press(screen.getByTestId('target'));
    onChange.mockClear();

    const dropdown = screen.getByTestId('dropdown');
    fireEvent.press(dropdown.parent!.parent!);

    expect(onChange).not.toHaveBeenCalled();
    expect(screen.getByTestId('dropdown')).toBeTruthy();
  });

  it('closes on Escape on web when closeOnEscape is set', () => {
    const originalOS = Platform.OS;
    const addEventListener = jest.fn();
    const removeEventListener = jest.fn();
    Platform.OS = 'web';
    (globalThis as any).document = { addEventListener, removeEventListener };
    try {
      const onChange = jest.fn();
      renderMenu({ onChange });
      fireEvent.press(screen.getByTestId('target'));
      expect(addEventListener).toHaveBeenCalledWith('keydown', expect.any(Function));

      act(() => {
        addEventListener.mock.calls[0][1]({ key: 'Escape' });
      });
      expect(onChange).toHaveBeenLastCalledWith(false);
      expect(screen.queryByTestId('dropdown')).toBeNull();
      expect(removeEventListener).toHaveBeenCalled();
    } finally {
      Platform.OS = originalOS;
      delete (globalThis as any).document;
    }
  });

  it('applies item and label text styles to the wrapped Text', () => {
    const theme = createTheme();
    renderMenu();
    fireEvent.press(screen.getByTestId('target'));
    // Items default to the blue theme color (see defaultItemProps / useItemStyles)
    expect(screen.getByText('Settings')).toHaveStyle({
      fontSize: 14,
      color: theme.fn.themeColor('blue', 6),
    });
    expect(screen.getByText('Logout')).toHaveStyle({ color: theme.fn.themeColor('red', 6) });
    expect(screen.getByText('Application')).toHaveStyle({
      fontSize: 12,
      textTransform: 'uppercase',
    });
  });

  it('applies style to the root view', () => {
    renderMenu({ style: { margin: 3 } });
    expect(screen.getByTestId('menu')).toHaveStyle({ margin: 3 });
  });

  it('works with a plain TouchableOpacity target', () => {
    render(
      <Menu>
        <Menu.Target>
          <TouchableOpacity testID="custom-target">
            <Text>Custom</Text>
          </TouchableOpacity>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item>Item</Menu.Item>
        </Menu.Dropdown>
      </Menu>
    );
    fireEvent.press(screen.getByTestId('custom-target'));
    expect(screen.getByText('Item')).toBeTruthy();
  });

  it('throws when sub-components are used outside of Menu', () => {
    const error = jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<Menu.Item>Orphan</Menu.Item>)).toThrow(
      'Menu components must be used within Menu'
    );
    expect(() =>
      render(
        <Menu.Target>
          <Button>Orphan</Button>
        </Menu.Target>
      )
    ).toThrow('Menu components must be used within Menu');
    expect(() => render(<Menu.Dropdown>Orphan</Menu.Dropdown>)).toThrow(
      'Menu components must be used within Menu'
    );
    error.mockRestore();
  });

  it('renders dark color scheme item and label styles', () => {
    const theme = createTheme();
    render(
      <ThemeProvider theme={theme} forceMode="dark">
        <Menu opened onChange={() => {}}>
          <Menu.Target>
            <Button>Toggle</Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label testID="label">Dark label</Menu.Label>
            <Menu.Item testID="item" icon={<View testID="icon" />}>
              Dark item
            </Menu.Item>
            <Menu.Item testID="colored" color="red">
              Colored item
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </ThemeProvider>
    );
    const item = screen.getByTestId('item');
    fireEvent(item, 'pressIn');
    expect(screen.getByTestId('item')).toHaveStyle({
      backgroundColor: theme.colors.dark![5],
    });
    expect(screen.getByText('Dark label')).toBeTruthy();
    expect(screen.getByText('Colored item')).toBeTruthy();
  });

  it('has display names for all sub-components', () => {
    expect(Menu.displayName).toBe('Menu');
    expect(Menu.Target.displayName).toBe('Menu.Target');
    expect(Menu.Dropdown.displayName).toBe('Menu.Dropdown');
    expect(Menu.Item.displayName).toBe('Menu.Item');
    expect(Menu.Label.displayName).toBe('Menu.Label');
    expect(Menu.Divider.displayName).toBe('Menu.Divider');
  });
});
