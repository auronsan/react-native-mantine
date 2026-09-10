import React from 'react';
import {
  Modal,
  Platform,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { render, screen, fireEvent, act } from '../../../__tests__/test-utils';
import { createTheme } from '../../../theme/create-theme';
import { Popover } from '../index';
import { Button } from '../../Button';

const theme = createTheme();

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

const layoutDropdown = (width: number, height: number) => {
  fireEvent(screen.getByTestId('dropdown'), 'layout', {
    nativeEvent: { layout: { x: 0, y: 0, width, height } },
  });
};

type PopoverProps = React.ComponentProps<typeof Popover>;

const renderPopover = (props: Partial<PopoverProps> = {}) =>
  render(
    <Popover testID="popover" {...props}>
      <Popover.Target>
        <Button testID="target">Open</Button>
      </Popover.Target>
      <Popover.Dropdown testID="dropdown">
        <Text>Popover content</Text>
      </Popover.Dropdown>
    </Popover>
  );

describe('Popover', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders the target and keeps the dropdown closed by default', () => {
    renderPopover();
    expect(screen.getByTestId('popover')).toBeTruthy();
    expect(screen.getByText('Open')).toBeTruthy();
    expect(screen.queryByText('Popover content')).toBeNull();
    expect(screen.queryByTestId('dropdown')).toBeNull();
  });

  it('opens on target press (uncontrolled) and notifies onChange', () => {
    const onChange = jest.fn();
    renderPopover({ onChange });

    fireEvent.press(screen.getByTestId('target'));
    act(() => {
      jest.advanceTimersByTime(200);
    });

    expect(onChange).toHaveBeenLastCalledWith(true);
    expect(screen.getByTestId('dropdown')).toBeTruthy();
    expect(screen.getByText('Popover content')).toBeTruthy();

    const modal = screen.UNSAFE_getByType(Modal);
    expect(modal.props.transparent).toBe(true);
    expect(modal.props.visible).toBe(true);
  });

  it('exposes button role and expanded state on the target', () => {
    renderPopover();
    const target = screen.getByTestId('target');
    expect(target.props.accessibilityRole).toBe('button');
    expect(target.props.accessibilityState.expanded).toBe(false);

    fireEvent.press(target);
    expect(screen.getByTestId('target').props.accessibilityState.expanded).toBe(
      true
    );
  });

  it('applies accessibilityLabel and modal flag to the dropdown', () => {
    renderPopover({ accessibilityLabel: 'Details popover' });
    fireEvent.press(screen.getByTestId('target'));

    const dropdown = screen.getByTestId('dropdown');
    expect(dropdown.props.accessibilityLabel).toBe('Details popover');
    expect(dropdown.props.accessibilityViewIsModal).toBe(true);
    expect(screen.getByLabelText('Details popover')).toBeTruthy();
  });

  it('closes when the backdrop is pressed', () => {
    const onChange = jest.fn();
    renderPopover({ onChange });

    fireEvent.press(screen.getByTestId('target'));
    expect(screen.getByText('Popover content')).toBeTruthy();

    fireEvent.press(screen.UNSAFE_getByType(TouchableWithoutFeedback));
    expect(onChange).toHaveBeenLastCalledWith(false);
    expect(screen.queryByText('Popover content')).toBeNull();
  });

  it('closes on modal request close', () => {
    renderPopover();
    fireEvent.press(screen.getByTestId('target'));

    act(() => {
      screen.UNSAFE_getByType(Modal).props.onRequestClose();
    });
    expect(screen.queryByText('Popover content')).toBeNull();
  });

  it('positions the dropdown below the measured target (bottom-start)', () => {
    const MeasurableTarget = createMeasurableTarget([10, 20, 100, 40]);

    render(
      <Popover position="bottom-start">
        <Popover.Target>
          <MeasurableTarget />
        </Popover.Target>
        <Popover.Dropdown testID="dropdown">
          <Text>Content</Text>
        </Popover.Dropdown>
      </Popover>
    );

    fireEvent.press(screen.getByTestId('measurable'));
    expect(screen.getByTestId('dropdown')).toHaveStyle({
      position: 'absolute',
      top: 68,
      left: 10,
    });
  });

  it('centers the dropdown on the target for the default bottom position', () => {
    const MeasurableTarget = createMeasurableTarget([10, 20, 100, 40]);

    render(
      <Popover width={60}>
        <Popover.Target>
          <MeasurableTarget />
        </Popover.Target>
        <Popover.Dropdown testID="dropdown">
          <Text>Content</Text>
        </Popover.Dropdown>
      </Popover>
    );

    fireEvent.press(screen.getByTestId('measurable'));
    // target center x = 60, dropdown width 60 -> left 30
    expect(screen.getByTestId('dropdown')).toHaveStyle({ top: 68, left: 30, width: 60 });
  });

  it.each([
    // position, target rect, dropdown size, expected top/left
    ['top', [10, 300, 100, 40], [100, 50], { top: 242, left: 10 }],
    ['top-end', [10, 300, 100, 40], [100, 50], { top: 242, left: 10 }],
    ['bottom-end', [100, 20, 100, 40], [50, 50], { top: 68, left: 150 }],
    ['right', [10, 300, 100, 40], [100, 50], { top: 295, left: 118 }],
    ['right-start', [10, 300, 100, 40], [100, 50], { top: 300, left: 118 }],
    ['left', [300, 300, 100, 40], [100, 50], { top: 295, left: 192 }],
    ['left-end', [300, 300, 100, 40], [100, 50], { top: 290, left: 192 }],
  ] as const)(
    'positions the dropdown for position %s once measured',
    (position, rect, size, expected) => {
      const MeasurableTarget = createMeasurableTarget([...rect] as any);
      render(
        <Popover position={position} width={size[0]}>
          <Popover.Target>
            <MeasurableTarget />
          </Popover.Target>
          <Popover.Dropdown testID="dropdown">
            <Text>Content</Text>
          </Popover.Dropdown>
        </Popover>
      );

      fireEvent.press(screen.getByTestId('measurable'));
      layoutDropdown(size[0], size[1]);
      expect(screen.getByTestId('dropdown')).toHaveStyle(expected);
    }
  );

  it('flips to the opposite side when the preferred side does not fit', () => {
    // Target near the top of the window: "top" cannot fit a 50px dropdown.
    const MeasurableTarget = createMeasurableTarget([10, 20, 100, 40]);
    render(
      <Popover position="top-start" width={100} withArrow>
        <Popover.Target>
          <MeasurableTarget />
        </Popover.Target>
        <Popover.Dropdown testID="dropdown">
          <Text>Content</Text>
        </Popover.Dropdown>
      </Popover>
    );

    fireEvent.press(screen.getByTestId('measurable'));
    layoutDropdown(100, 50);
    expect(screen.getByTestId('dropdown')).toHaveStyle({ top: 68, left: 10 });
    // arrow moved to the top edge of the (now below) dropdown
    expect(screen.getByTestId('popover-arrow')).toHaveStyle({ top: -3.5, left: 5 });
  });

  it('clamps the dropdown inside the window with an 8px margin', () => {
    // bottom-end with a narrow target at the left edge would go negative.
    const MeasurableTarget = createMeasurableTarget([0, 20, 20, 40]);
    render(
      <Popover position="bottom-end" width={100}>
        <Popover.Target>
          <MeasurableTarget />
        </Popover.Target>
        <Popover.Dropdown testID="dropdown">
          <Text>Content</Text>
        </Popover.Dropdown>
      </Popover>
    );

    fireEvent.press(screen.getByTestId('measurable'));
    expect(screen.getByTestId('dropdown')).toHaveStyle({ top: 68, left: 8 });
  });

  it('positions at the window margin when the target cannot be measured', () => {
    const PlainTarget = ({ onPress }: { onPress?: () => void }) => (
      <TouchableOpacity testID="plain" onPress={onPress}>
        <Text>Plain</Text>
      </TouchableOpacity>
    );

    render(
      <Popover position="bottom-start">
        <Popover.Target>
          <PlainTarget />
        </Popover.Target>
        <Popover.Dropdown testID="dropdown">
          <Text>Content</Text>
        </Popover.Dropdown>
      </Popover>
    );

    fireEvent.press(screen.getByTestId('plain'));
    expect(screen.getByTestId('dropdown')).toHaveStyle({ top: 8, left: 8 });
  });

  it('measures the target when opened in controlled mode', () => {
    const MeasurableTarget = createMeasurableTarget([10, 20, 100, 40]);
    render(
      <Popover opened position="bottom-start">
        <Popover.Target>
          <MeasurableTarget />
        </Popover.Target>
        <Popover.Dropdown testID="dropdown">
          <Text>Content</Text>
        </Popover.Dropdown>
      </Popover>
    );
    expect(screen.getByTestId('dropdown')).toHaveStyle({ top: 68, left: 10 });
  });

  it('applies a numeric width and matches the target width with width="target"', () => {
    const MeasurableTarget = createMeasurableTarget([10, 20, 100, 40]);
    const { rerender } = render(
      <Popover opened width={300}>
        <Popover.Target>
          <MeasurableTarget />
        </Popover.Target>
        <Popover.Dropdown testID="dropdown">
          <Text>Content</Text>
        </Popover.Dropdown>
      </Popover>
    );
    expect(screen.getByTestId('dropdown')).toHaveStyle({ width: 300 });

    rerender(
      <Popover opened width="target">
        <Popover.Target>
          <MeasurableTarget />
        </Popover.Target>
        <Popover.Dropdown testID="dropdown">
          <Text>Content</Text>
        </Popover.Dropdown>
      </Popover>
    );
    expect(screen.getByTestId('dropdown')).toHaveStyle({ width: 100 });
  });

  it('applies radius, shadow and zIndex from the theme to the dropdown', () => {
    renderPopover({ opened: true, radius: 'xl', shadow: 'xs', zIndex: 5 });
    expect(screen.getByTestId('dropdown')).toHaveStyle({
      borderRadius: theme.fn.radius('xl'),
      zIndex: 5,
      backgroundColor: theme.white,
      ...theme.fn.shadow('xs'),
    });
  });

  it('renders an arrow on the edge facing the target when withArrow is set', () => {
    const MeasurableTarget = createMeasurableTarget([10, 300, 100, 40]);
    const { rerender } = render(
      <Popover opened position="bottom-start" withArrow arrowSize={10} arrowOffset={2}>
        <Popover.Target>
          <MeasurableTarget />
        </Popover.Target>
        <Popover.Dropdown testID="dropdown">
          <Text>Content</Text>
        </Popover.Dropdown>
      </Popover>
    );
    expect(screen.getByTestId('popover-arrow')).toHaveStyle({
      width: 10,
      height: 10,
      top: -5,
      left: 2,
      borderTopWidth: 1,
      borderLeftWidth: 1,
      borderBottomWidth: 0,
      borderRightWidth: 0,
      backgroundColor: theme.white,
    });

    rerender(
      <Popover opened position="top-end" withArrow arrowSize={10} arrowOffset={2}>
        <Popover.Target>
          <MeasurableTarget />
        </Popover.Target>
        <Popover.Dropdown testID="dropdown">
          <Text>Content</Text>
        </Popover.Dropdown>
      </Popover>
    );
    expect(screen.getByTestId('popover-arrow')).toHaveStyle({
      bottom: -5,
      right: 2,
      borderBottomWidth: 1,
      borderRightWidth: 1,
    });

    rerender(
      <Popover opened position="top-end">
        <Popover.Target>
          <MeasurableTarget />
        </Popover.Target>
        <Popover.Dropdown testID="dropdown">
          <Text>Content</Text>
        </Popover.Dropdown>
      </Popover>
    );
    expect(screen.queryByTestId('popover-arrow')).toBeNull();
  });

  it('does not close on backdrop press when closeOnClickOutside is false', () => {
    const onChange = jest.fn();
    renderPopover({ onChange, closeOnClickOutside: false });

    fireEvent.press(screen.getByTestId('target'));
    expect(screen.getByText('Popover content')).toBeTruthy();
    onChange.mockClear();

    fireEvent.press(screen.UNSAFE_getByType(TouchableWithoutFeedback));
    expect(onChange).not.toHaveBeenCalled();
    expect(screen.getByText('Popover content')).toBeTruthy();
  });

  describe('closeOnEscape (web)', () => {
    const originalOS = Platform.OS;
    let addEventListener: jest.Mock;
    let removeEventListener: jest.Mock;

    beforeEach(() => {
      Platform.OS = 'web';
      addEventListener = jest.fn();
      removeEventListener = jest.fn();
      (globalThis as any).document = { addEventListener, removeEventListener };
    });

    afterEach(() => {
      Platform.OS = originalOS;
      delete (globalThis as any).document;
    });

    it('closes on Escape keydown while opened and removes the listener', () => {
      const onChange = jest.fn();
      renderPopover({ onChange });

      expect(addEventListener).not.toHaveBeenCalled();
      fireEvent.press(screen.getByTestId('target'));
      expect(addEventListener).toHaveBeenCalledWith('keydown', expect.any(Function));

      const handler = addEventListener.mock.calls[0][1];
      act(() => {
        handler({ key: 'Enter' });
      });
      expect(screen.getByText('Popover content')).toBeTruthy();

      act(() => {
        handler({ key: 'Escape' });
      });
      expect(onChange).toHaveBeenLastCalledWith(false);
      expect(screen.queryByText('Popover content')).toBeNull();
      expect(removeEventListener).toHaveBeenCalledWith('keydown', handler);
    });

    it('does not listen when closeOnEscape is false', () => {
      renderPopover({ closeOnEscape: false });
      fireEvent.press(screen.getByTestId('target'));
      expect(addEventListener).not.toHaveBeenCalled();
    });
  });

  it('does not listen for Escape on native platforms', () => {
    const addEventListener = jest.fn();
    (globalThis as any).document = { addEventListener, removeEventListener: jest.fn() };
    try {
      renderPopover();
      fireEvent.press(screen.getByTestId('target'));
      expect(addEventListener).not.toHaveBeenCalled();
    } finally {
      delete (globalThis as any).document;
    }
  });

  it('respects the controlled opened prop', () => {
    const onChange = jest.fn();
    const { rerender } = render(
      <Popover opened={false} onChange={onChange}>
        <Popover.Target>
          <Button testID="target">Open</Button>
        </Popover.Target>
        <Popover.Dropdown>
          <Text>Controlled</Text>
        </Popover.Dropdown>
      </Popover>
    );
    expect(screen.queryByText('Controlled')).toBeNull();

    // pressing the target only notifies
    fireEvent.press(screen.getByTestId('target'));
    expect(onChange).toHaveBeenLastCalledWith(true);
    expect(screen.queryByText('Controlled')).toBeNull();

    rerender(
      <Popover opened onChange={onChange}>
        <Popover.Target>
          <Button testID="target">Open</Button>
        </Popover.Target>
        <Popover.Dropdown>
          <Text>Controlled</Text>
        </Popover.Dropdown>
      </Popover>
    );
    expect(screen.getByText('Controlled')).toBeTruthy();

    // backdrop press only notifies while controlled
    fireEvent.press(screen.UNSAFE_getByType(TouchableWithoutFeedback));
    expect(onChange).toHaveBeenLastCalledWith(false);
    expect(screen.getByText('Controlled')).toBeTruthy();
  });

  it('merges custom style on the dropdown', () => {
    renderPopover({ opened: true });
    expect(screen.getByTestId('dropdown')).toBeTruthy();

    render(
      <Popover opened>
        <Popover.Target>
          <Button>Open</Button>
        </Popover.Target>
        <Popover.Dropdown testID="styled" style={{ width: 123, padding: 4 }}>
          <Text>Styled</Text>
        </Popover.Dropdown>
      </Popover>
    );
    expect(screen.getByTestId('styled')).toHaveStyle({
      width: 123,
      padding: 4,
      position: 'absolute',
    });
  });

  it.each([
    'top',
    'bottom',
    'left',
    'right',
    'top-start',
    'top-end',
    'bottom-start',
    'bottom-end',
  ] as const)('accepts position %s with arrow and sizing props', (position) => {
    renderPopover({
      opened: true,
      position,
      withArrow: true,
      arrowSize: 10,
      arrowOffset: 2,
      width: 'target',
      radius: 'xl',
      shadow: 'xs',
      zIndex: 5,
      closeOnClickOutside: false,
      closeOnEscape: false,
    });
    expect(screen.getByText('Popover content')).toBeTruthy();
  });

  it('accepts a forwarded ref and extra props on the root view', () => {
    const ref = jest.fn();
    render(
      <Popover ref={ref} testID="root" style={{ margin: 3 }}>
        <Popover.Target>
          <Button>Open</Button>
        </Popover.Target>
        <Popover.Dropdown>
          <Text>Content</Text>
        </Popover.Dropdown>
      </Popover>
    );
    expect(screen.getByTestId('root')).toBeTruthy();
    expect(screen.getByTestId('root')).toHaveStyle({ margin: 3 });
    expect(ref).toHaveBeenCalled();
  });

  it('throws when sub-components are used outside of Popover', () => {
    const error = jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(() =>
      render(
        <Popover.Target>
          <Button>Orphan</Button>
        </Popover.Target>
      )
    ).toThrow('Popover components must be used within Popover');
    expect(() =>
      render(
        <Popover.Dropdown>
          <Text>Orphan</Text>
        </Popover.Dropdown>
      )
    ).toThrow('Popover components must be used within Popover');
    error.mockRestore();
  });

  it('has display names for all sub-components', () => {
    expect(Popover.displayName).toBe('Popover');
    expect(Popover.Target.displayName).toBe('Popover.Target');
    expect(Popover.Dropdown.displayName).toBe('Popover.Dropdown');
  });
});
