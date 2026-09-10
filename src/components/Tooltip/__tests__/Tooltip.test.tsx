import React from 'react';
import {
  Modal,
  Pressable,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { render, screen, fireEvent, act } from '../../../__tests__/test-utils';
import { createTheme } from '../../../theme/create-theme';
import { Tooltip } from '../index';

const theme = createTheme();

const Target = (props: React.ComponentProps<typeof Pressable>) => (
  <Pressable testID="target" {...props}>
    <Text>Target</Text>
  </Pressable>
);

describe('Tooltip', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders the target without the tooltip initially', () => {
    render(
      <Tooltip label="Hello">
        <Target />
      </Tooltip>
    );
    expect(screen.getByTestId('target')).toBeTruthy();
    expect(screen.queryByText('Hello')).toBeNull();
    expect(screen.getByTestId('target').props.accessibilityHint).toBe(
      'Shows tooltip: Hello'
    );
  });

  it('opens on long press by default and renders the label', () => {
    render(
      <Tooltip label="Hello" testID="tooltip">
        <Target />
      </Tooltip>
    );
    fireEvent(screen.getByTestId('target'), 'longPress');
    act(() => {
      jest.advanceTimersByTime(0);
    });
    expect(screen.getByText('Hello')).toBeTruthy();
    const tooltip = screen.getByTestId('tooltip');
    expect(tooltip.props.accessibilityRole).toBe('text');
    expect(tooltip.props.accessibilityLabel).toBe('Hello');
    expect(screen.getByLabelText('Hello')).toBeTruthy();
  });

  const measuredNodeMock = (rect: [number, number, number, number]) => ({
    createNodeMock: (element: React.ReactElement<any>) =>
      element.props.testID === 'target'
        ? {
            measureInWindow: (
              cb: (x: number, y: number, w: number, h: number) => void
            ) => cb(...rect),
          }
        : null,
  });

  const layoutTooltip = (width: number, height: number) => {
    fireEvent(screen.getByTestId('tooltip'), 'layout', {
      nativeEvent: { layout: { x: 0, y: 0, width, height } },
    });
  };

  it('positions the tooltip above the target by default', () => {
    render(
      <Tooltip label="Measured" testID="tooltip">
        <Target />
      </Tooltip>,
      measuredNodeMock([10, 100, 200, 40])
    );
    fireEvent(screen.getByTestId('target'), 'longPress');
    act(() => {
      jest.advanceTimersByTime(0);
    });
    layoutTooltip(100, 30);
    expect(screen.getByTestId('tooltip')).toHaveStyle({
      top: 100 - 30 - 8,
      left: 10 + 200 / 2 - 100 / 2,
    });
  });

  it.each([
    ['bottom', { top: 148, left: 60 }],
    ['bottom-start', { top: 148, left: 10 }],
    ['bottom-end', { top: 148, left: 110 }],
    ['top-start', { top: 62, left: 10 }],
    ['top-end', { top: 62, left: 110 }],
    ['right', { top: 105, left: 218 }],
    // Only 2px of room on the left of the target: flips to the right side.
    ['left-start', { top: 100, left: 218 }],
  ] as const)('positions the tooltip for position %s', (position, expected) => {
    render(
      <Tooltip label="Measured" testID="tooltip" opened position={position}>
        <Target />
      </Tooltip>,
      measuredNodeMock([10, 100, 200, 40])
    );
    layoutTooltip(100, 30);
    expect(screen.getByTestId('tooltip')).toHaveStyle(expected);
  });

  it('flips to the bottom when there is no room above the target', () => {
    render(
      <Tooltip label="Flipped" testID="tooltip" opened position="top" withArrow>
        <Target />
      </Tooltip>,
      measuredNodeMock([10, 10, 200, 40])
    );
    layoutTooltip(100, 30);
    expect(screen.getByTestId('tooltip')).toHaveStyle({ top: 10 + 40 + 8, left: 60 });
    expect(screen.getByTestId('tooltip-arrow')).toHaveStyle({ top: -2 });
  });

  it('renders an arrow pointing at the target when withArrow is set', () => {
    render(
      <Tooltip
        label="Arrow"
        testID="tooltip"
        opened
        withArrow
        arrowSize={6}
        color="red"
      >
        <Target />
      </Tooltip>,
      measuredNodeMock([10, 100, 200, 40])
    );
    layoutTooltip(100, 30);
    expect(screen.getByTestId('tooltip-arrow')).toHaveStyle({
      width: 6,
      height: 6,
      bottom: -3,
      left: 100 / 2 - 3,
      backgroundColor: theme.fn.themeColor('red', 9),
    });
  });

  it('does not render an arrow by default', () => {
    render(
      <Tooltip label="No arrow" testID="tooltip" opened>
        <Target />
      </Tooltip>
    );
    expect(screen.queryByTestId('tooltip-arrow')).toBeNull();
  });

  it("preserves the child's own accessibilityHint", () => {
    render(
      <Tooltip label="Hello">
        <Target accessibilityHint="Custom hint" />
      </Tooltip>
    );
    expect(screen.getByTestId('target').props.accessibilityHint).toBe('Custom hint');
  });

  it('respects openDelay', () => {
    render(
      <Tooltip label="Delayed" openDelay={200}>
        <Target />
      </Tooltip>
    );
    fireEvent(screen.getByTestId('target'), 'longPress');
    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(screen.queryByText('Delayed')).toBeNull();
    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(screen.getByText('Delayed')).toBeTruthy();
  });

  it('opens on press and closes on press out with press trigger', () => {
    render(
      <Tooltip label="Pressed" trigger="press" closeDelay={50}>
        <Target />
      </Tooltip>
    );
    const target = screen.getByTestId('target');
    fireEvent.press(target);
    act(() => {
      jest.advanceTimersByTime(0);
    });
    expect(screen.getByText('Pressed')).toBeTruthy();

    fireEvent(target, 'pressOut');
    act(() => {
      jest.advanceTimersByTime(25);
    });
    expect(screen.getByText('Pressed')).toBeTruthy();
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.queryByText('Pressed')).toBeNull();
  });

  it('does not open when disabled', () => {
    render(
      <Tooltip label="Nope" disabled>
        <Target />
      </Tooltip>
    );
    fireEvent(screen.getByTestId('target'), 'longPress');
    act(() => {
      jest.runAllTimers();
    });
    expect(screen.queryByText('Nope')).toBeNull();
  });

  it('renders immediately when opened is controlled', () => {
    const { rerender } = render(
      <Tooltip label="Controlled" opened>
        <Target />
      </Tooltip>
    );
    expect(screen.getByText('Controlled')).toBeTruthy();

    // show/hide are no-ops in controlled mode
    fireEvent(screen.getByTestId('target'), 'longPress');
    act(() => {
      jest.runAllTimers();
    });
    expect(screen.getByText('Controlled')).toBeTruthy();
    fireEvent.press(screen.UNSAFE_getByType(TouchableWithoutFeedback));
    act(() => {
      jest.runAllTimers();
    });
    expect(screen.getByText('Controlled')).toBeTruthy();

    rerender(
      <Tooltip label="Controlled" opened={false}>
        <Target />
      </Tooltip>
    );
    expect(screen.queryByText('Controlled')).toBeNull();
    fireEvent(screen.getByTestId('target'), 'longPress');
    act(() => {
      jest.runAllTimers();
    });
    expect(screen.queryByText('Controlled')).toBeNull();
  });

  it('closes when the backdrop is pressed', () => {
    render(
      <Tooltip label="Backdrop" opened={undefined}>
        <Target />
      </Tooltip>
    );
    fireEvent(screen.getByTestId('target'), 'longPress');
    act(() => {
      jest.advanceTimersByTime(0);
    });
    expect(screen.getByText('Backdrop')).toBeTruthy();

    fireEvent.press(screen.UNSAFE_getByType(TouchableWithoutFeedback));
    act(() => {
      jest.runAllTimers();
    });
    expect(screen.queryByText('Backdrop')).toBeNull();
  });

  it('closes on modal request close', () => {
    render(
      <Tooltip label="Request">
        <Target />
      </Tooltip>
    );
    fireEvent(screen.getByTestId('target'), 'longPress');
    act(() => {
      jest.advanceTimersByTime(0);
    });
    const modal = screen.UNSAFE_getByType(Modal);
    expect(modal.props.transparent).toBe(true);
    act(() => {
      modal.props.onRequestClose();
    });
    act(() => {
      jest.runAllTimers();
    });
    expect(screen.queryByText('Request')).toBeNull();
  });

  it('renders element labels and uses accessibilityLabel for them', () => {
    render(
      <Tooltip
        label={<View testID="label-node" />}
        accessibilityLabel="Custom label"
        opened
        testID="tooltip"
      >
        <Target />
      </Tooltip>
    );
    expect(screen.getByTestId('label-node')).toBeTruthy();
    expect(screen.getByTestId('tooltip').props.accessibilityLabel).toBe(
      'Custom label'
    );
    expect(screen.getByTestId('target').props.accessibilityHint).toBe(
      'Shows tooltip: Custom label'
    );
  });

  it('has no accessibility hint for element label without accessibilityLabel', () => {
    render(
      <Tooltip label={<View />} opened testID="tooltip">
        <Target />
      </Tooltip>
    );
    expect(
      screen.getByTestId('target').props.accessibilityHint
    ).toBeUndefined();
    expect(
      screen.getByTestId('tooltip').props.accessibilityLabel
    ).toBeUndefined();
  });

  it('applies color, radius, zIndex and custom style', () => {
    render(
      <Tooltip
        label="Styled"
        opened
        color="red"
        radius="xl"
        zIndex={5}
        style={{ margin: 2 }}
        testID="tooltip"
      >
        <Target />
      </Tooltip>
    );
    expect(screen.getByTestId('tooltip')).toHaveStyle({
      backgroundColor: theme.fn.themeColor('red', 9),
      borderRadius: theme.fn.radius('xl'),
      zIndex: 5,
      margin: 2,
      position: 'absolute',
    });
  });

  it('applies multiline and width', () => {
    const { rerender } = render(
      <Tooltip label="Multi" opened multiline width={120} testID="tooltip">
        <Target />
      </Tooltip>
    );
    expect(screen.getByTestId('tooltip')).toHaveStyle({
      maxWidth: 120,
      textAlign: 'left',
    });

    rerender(
      <Tooltip label="Multi" opened width="auto" testID="tooltip">
        <Target />
      </Tooltip>
    );
    expect(screen.getByTestId('tooltip')).toHaveStyle({ maxWidth: 250 });
  });

  it('accepts position and withArrow props', () => {
    const positions = [
      'top',
      'bottom',
      'left',
      'right',
      'top-start',
      'top-end',
      'bottom-start',
      'bottom-end',
    ] as const;
    positions.forEach((position) => {
      const { unmount } = render(
        <Tooltip label={`pos-${position}`} opened position={position} withArrow>
          <Target />
        </Tooltip>
      );
      expect(screen.getByText(`pos-${position}`)).toBeTruthy();
      unmount();
    });
  });

  it('has displayName', () => {
    expect(Tooltip.displayName).toBe('Tooltip');
  });
});
