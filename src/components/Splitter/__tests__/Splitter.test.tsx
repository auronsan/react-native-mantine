import { Text } from 'react-native';
import { render, screen, fireEvent } from '../../../__tests__/test-utils';
import { Splitter } from '../index';

type ReactTestInstance = ReturnType<typeof screen.getByTestId>;

const layout = (width: number, height: number) =>
  ({ nativeEvent: { layout: { x: 0, y: 0, width, height } } }) as never;

/**
 * Builds a responder event that PanResponder can turn into gesture state.
 * dx/dy are derived from current - previous page coordinates.
 */
const touchEvent = (
  current: { x: number; y: number },
  previous: { x: number; y: number },
  timestamp: number
) =>
  ({
    nativeEvent: {
      touches: [{ pageX: current.x, pageY: current.y }],
      changedTouches: [],
      identifier: 0,
      pageX: current.x,
      pageY: current.y,
      locationX: current.x,
      locationY: current.y,
      timestamp,
      target: 0,
    },
    touchHistory: {
      touchBank: [
        {
          touchActive: true,
          startPageX: previous.x,
          startPageY: previous.y,
          startTimeStamp: 1,
          currentPageX: current.x,
          currentPageY: current.y,
          currentTimeStamp: timestamp,
          previousPageX: previous.x,
          previousPageY: previous.y,
          previousTimeStamp: timestamp - 1,
        },
      ],
      numberActiveTouches: 1,
      indexOfSingleActiveTouch: 0,
      mostRecentTimeStamp: timestamp,
    },
  }) as never;

const drag = (
  handle: ReactTestInstance,
  delta: { dx?: number; dy?: number },
  options: { terminate?: boolean } = {}
) => {
  const start = { x: 100, y: 100 };
  const end = { x: start.x + (delta.dx ?? 0), y: start.y + (delta.dy ?? 0) };
  fireEvent(handle, 'responderGrant', touchEvent(start, start, 10));
  fireEvent(handle, 'responderMove', touchEvent(end, start, 20));
  if (options.terminate) {
    fireEvent(handle, 'responderTerminate', touchEvent(end, end, 30));
  } else {
    fireEvent(handle, 'responderRelease', touchEvent(end, end, 30));
  }
};

const getPaneFlexGrow = (root: ReactTestInstance) =>
  (root.children as ReactTestInstance[])
    .filter((child) => child.props.accessibilityRole !== 'adjustable')
    .map((child) => (child.props.style as any[]).at(-1)?.flexGrow);

describe('Splitter', () => {
  it('renders panes with normalized default sizes and a handle between them', () => {
    render(
      <Splitter testID="splitter">
        <Splitter.Pane defaultSize={1}>
          <Text>Left</Text>
        </Splitter.Pane>
        <Splitter.Pane defaultSize={3}>
          <Text>Right</Text>
        </Splitter.Pane>
      </Splitter>
    );

    expect(screen.getByText('Left')).toBeTruthy();
    expect(screen.getByText('Right')).toBeTruthy();

    const root = screen.getByTestId('splitter');
    expect(root).toHaveStyle({ flexDirection: 'row' });
    expect(getPaneFlexGrow(root)).toEqual([25, 75]);

    const handle = screen.getByLabelText('Resize pane 1');
    expect(handle.props.accessibilityRole).toBe('adjustable');
    expect(handle).toHaveStyle({ width: 16 });
    expect(screen.queryByLabelText('Resize pane 2')).toBeNull();
  });

  it('handles zero total default size', () => {
    render(
      <Splitter testID="splitter">
        <Splitter.Pane defaultSize={0}>
          <Text>A</Text>
        </Splitter.Pane>
        <Splitter.Pane defaultSize={0}>
          <Text>B</Text>
        </Splitter.Pane>
      </Splitter>
    );
    expect(getPaneFlexGrow(screen.getByTestId('splitter'))).toEqual([0, 0]);
  });

  it('ignores non-element children', () => {
    render(
      <Splitter testID="splitter">
        {null}
        {'text'}
        <Splitter.Pane defaultSize={50}>
          <Text>Only</Text>
        </Splitter.Pane>
      </Splitter>
    );
    expect(screen.getByText('Only')).toBeTruthy();
    expect(screen.queryByLabelText('Resize pane 1')).toBeNull();
  });

  it('renders vertical orientation with handle height', () => {
    render(
      <Splitter orientation="vertical" lineSize={4} handleSize={24} testID="s">
        <Splitter.Pane defaultSize={50}>
          <Text>Top</Text>
        </Splitter.Pane>
        <Splitter.Pane defaultSize={50}>
          <Text>Bottom</Text>
        </Splitter.Pane>
      </Splitter>
    );

    expect(screen.getByTestId('s')).toHaveStyle({ flexDirection: 'column' });
    const handle = screen.getByLabelText('Resize pane 1');
    expect(handle).toHaveStyle({ height: 24 });
    expect(handle.children).toHaveLength(2);
    const line = (handle.children[0] as ReactTestInstance).findAll(
      (node: ReactTestInstance) => typeof node.type === 'string'
    )[0];
    expect(line).toHaveStyle({ height: 4, left: 0, right: 0 });
  });

  it('hides grip when withHandle is false', () => {
    render(
      <Splitter withHandle={false}>
        <Splitter.Pane defaultSize={50}>
          <Text>Left</Text>
        </Splitter.Pane>
        <Splitter.Pane defaultSize={50}>
          <Text>Right</Text>
        </Splitter.Pane>
      </Splitter>
    );

    expect(screen.getByLabelText('Resize pane 1').children).toHaveLength(1);
  });

  it('resizes horizontal panes with a drag and reports callbacks', () => {
    const onSizeChange = jest.fn();
    const onResizeStart = jest.fn();
    const onResizeEnd = jest.fn();

    render(
      <Splitter
        testID="splitter"
        onSizeChange={onSizeChange}
        onResizeStart={onResizeStart}
        onResizeEnd={onResizeEnd}
      >
        <Splitter.Pane defaultSize={50}>
          <Text>Left</Text>
        </Splitter.Pane>
        <Splitter.Pane defaultSize={50}>
          <Text>Right</Text>
        </Splitter.Pane>
      </Splitter>
    );

    const root = screen.getByTestId('splitter');
    fireEvent(root, 'layout', layout(1000, 400));

    drag(screen.getByLabelText('Resize pane 1'), { dx: 100 });

    expect(onResizeStart).toHaveBeenCalledTimes(1);
    expect(onSizeChange).toHaveBeenLastCalledWith([60, 40]);
    expect(onResizeEnd).toHaveBeenCalledWith([60, 40]);
    expect(getPaneFlexGrow(root)).toEqual([60, 40]);
  });

  it('shrinks the first pane when dragging backwards', () => {
    const onSizeChange = jest.fn();
    render(
      <Splitter testID="splitter" onSizeChange={onSizeChange}>
        <Splitter.Pane defaultSize={50}>
          <Text>Left</Text>
        </Splitter.Pane>
        <Splitter.Pane defaultSize={50}>
          <Text>Right</Text>
        </Splitter.Pane>
      </Splitter>
    );

    fireEvent(screen.getByTestId('splitter'), 'layout', layout(200, 100));
    drag(screen.getByLabelText('Resize pane 1'), { dx: -50 });
    expect(onSizeChange).toHaveBeenLastCalledWith([25, 75]);
  });

  it('clamps to pane min and max constraints', () => {
    const onSizeChange = jest.fn();
    render(
      <Splitter testID="splitter" onSizeChange={onSizeChange}>
        <Splitter.Pane defaultSize={50} max={55}>
          <Text>Left</Text>
        </Splitter.Pane>
        <Splitter.Pane defaultSize={50} min={30}>
          <Text>Right</Text>
        </Splitter.Pane>
      </Splitter>
    );

    fireEvent(screen.getByTestId('splitter'), 'layout', layout(1000, 400));
    drag(screen.getByLabelText('Resize pane 1'), { dx: 400 });
    expect(onSizeChange).toHaveBeenLastCalledWith([55, 45]);
  });

  it('clamps to first pane min and second pane max', () => {
    const onSizeChange = jest.fn();
    render(
      <Splitter testID="splitter" onSizeChange={onSizeChange}>
        <Splitter.Pane defaultSize={50} min={40}>
          <Text>Left</Text>
        </Splitter.Pane>
        <Splitter.Pane defaultSize={50} max={70}>
          <Text>Right</Text>
        </Splitter.Pane>
      </Splitter>
    );

    fireEvent(screen.getByTestId('splitter'), 'layout', layout(1000, 400));
    drag(screen.getByLabelText('Resize pane 1'), { dx: -900 });
    expect(onSizeChange).toHaveBeenLastCalledWith([40, 60]);
  });

  it('uses dy for vertical orientation and reports on terminate', () => {
    const onSizeChange = jest.fn();
    const onResizeEnd = jest.fn();
    render(
      <Splitter
        orientation="vertical"
        testID="splitter"
        onSizeChange={onSizeChange}
        onResizeEnd={onResizeEnd}
      >
        <Splitter.Pane defaultSize={30}>
          <Text>One</Text>
        </Splitter.Pane>
        <Splitter.Pane defaultSize={30}>
          <Text>Two</Text>
        </Splitter.Pane>
        <Splitter.Pane defaultSize={40}>
          <Text>Three</Text>
        </Splitter.Pane>
      </Splitter>
    );

    fireEvent(screen.getByTestId('splitter'), 'layout', layout(300, 500));
    drag(
      screen.getByLabelText('Resize pane 2'),
      { dx: 999, dy: 50 },
      { terminate: true }
    );

    expect(onSizeChange).toHaveBeenLastCalledWith([30, 40, 30]);
    expect(onResizeEnd).toHaveBeenCalledWith([30, 40, 30]);
  });

  it('switches the drag axis when orientation changes after mount', () => {
    const onSizeChange = jest.fn();
    const renderSplitter = (orientation: 'horizontal' | 'vertical') => (
      <Splitter
        orientation={orientation}
        testID="splitter"
        onSizeChange={onSizeChange}
      >
        <Splitter.Pane defaultSize={50}>
          <Text>One</Text>
        </Splitter.Pane>
        <Splitter.Pane defaultSize={50}>
          <Text>Two</Text>
        </Splitter.Pane>
      </Splitter>
    );

    const { rerender } = render(renderSplitter('horizontal'));
    fireEvent(screen.getByTestId('splitter'), 'layout', layout(1000, 400));
    drag(screen.getByLabelText('Resize pane 1'), { dx: 100 });
    expect(onSizeChange).toHaveBeenLastCalledWith([60, 40]);

    rerender(renderSplitter('vertical'));
    fireEvent(screen.getByTestId('splitter'), 'layout', layout(1000, 400));
    expect(screen.getByTestId('splitter')).toHaveStyle({
      flexDirection: 'column',
    });

    // Cached responder now follows dy instead of dx
    drag(screen.getByLabelText('Resize pane 1'), { dx: 999, dy: -100 });
    expect(onSizeChange).toHaveBeenLastCalledWith([35, 65]);
  });

  it('treats unmeasured container as 1px wide', () => {
    const onSizeChange = jest.fn();
    render(
      <Splitter onSizeChange={onSizeChange}>
        <Splitter.Pane defaultSize={50}>
          <Text>Left</Text>
        </Splitter.Pane>
        <Splitter.Pane defaultSize={50}>
          <Text>Right</Text>
        </Splitter.Pane>
      </Splitter>
    );

    drag(screen.getByLabelText('Resize pane 1'), { dx: 1 });
    expect(onSizeChange).toHaveBeenLastCalledWith([100, 0]);
  });

  it('works without any callbacks', () => {
    render(
      <Splitter testID="splitter">
        <Splitter.Pane defaultSize={50}>
          <Text>Left</Text>
        </Splitter.Pane>
        <Splitter.Pane defaultSize={50}>
          <Text>Right</Text>
        </Splitter.Pane>
      </Splitter>
    );

    fireEvent(screen.getByTestId('splitter'), 'layout', layout(100, 100));
    drag(screen.getByLabelText('Resize pane 1'), { dx: 10 });
    expect(getPaneFlexGrow(screen.getByTestId('splitter'))).toEqual([60, 40]);
  });

  it('merges custom style on the root', () => {
    render(
      <Splitter testID="splitter" style={{ height: 300 }}>
        <Splitter.Pane defaultSize={50}>
          <Text>Left</Text>
        </Splitter.Pane>
      </Splitter>
    );
    expect(screen.getByTestId('splitter')).toHaveStyle({ height: 300 });
  });

  it('exposes Pane as a compound component', () => {
    expect(Splitter.Pane.displayName).toBe('Splitter.Pane');
    expect(Splitter.displayName).toBe('Splitter');
  });
});
