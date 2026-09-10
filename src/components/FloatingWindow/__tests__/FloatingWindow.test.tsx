import { Dimensions, Text as RNText, View } from 'react-native';
import { render, screen, fireEvent } from '../../../__tests__/test-utils';
import { FloatingWindow } from '../index';
import { PortalProvider, PortalHost } from '../../Portal';

/** Responder event for PanResponder: previous -> current page coordinates */
function moveEvent(
  from: [number, number],
  to: [number, number],
  timeStamp: number
) {
  return {
    nativeEvent: { pageX: to[0], pageY: to[1], touches: [], changedTouches: [] },
    touchHistory: {
      numberActiveTouches: 1,
      indexOfSingleActiveTouch: 0,
      mostRecentTimeStamp: timeStamp,
      touchBank: [
        {
          touchActive: true,
          startPageX: from[0],
          startPageY: from[1],
          startTimeStamp: 1,
          currentPageX: to[0],
          currentPageY: to[1],
          currentTimeStamp: timeStamp,
          previousPageX: from[0],
          previousPageY: from[1],
          previousTimeStamp: timeStamp - 1,
        },
      ],
    },
  };
}

describe('FloatingWindow', () => {
  it('renders title, content and close button inline and passes testID through', () => {
    const onClose = jest.fn();
    render(
      <FloatingWindow title="Debug" onClose={onClose} withinPortal={false} testID="window">
        <RNText>Body</RNText>
      </FloatingWindow>
    );

    const window = screen.getByTestId('window');
    expect(screen.getByText('Debug')).toBeTruthy();
    expect(screen.getByText('Body')).toBeTruthy();
    expect(window).toHaveStyle({ left: 20, top: 80, width: 280, zIndex: 400 });
    expect(screen.getByLabelText('Move window')).toBeTruthy();

    fireEvent.press(screen.getByLabelText('Close'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('omits the close button without onClose and supports numeric or node titles', () => {
    const { rerender } = render(
      <FloatingWindow title={7} withinPortal={false} />
    );
    expect(screen.getByText('7')).toBeTruthy();
    expect(screen.queryByLabelText('Close')).toBeNull();

    rerender(
      <FloatingWindow title={<View testID="title-node" />} withinPortal={false} />
    );
    expect(screen.getByTestId('title-node')).toBeTruthy();
  });

  it('applies initialPosition, width, zIndex and style', () => {
    render(
      <FloatingWindow
        initialPosition={{ x: 5, y: 6 }}
        width={100}
        zIndex={9}
        style={{ margin: 1 }}
        withinPortal={false}
        testID="window"
      />
    );

    expect(screen.getByTestId('window')).toHaveStyle({
      left: 5,
      top: 6,
      width: 100,
      zIndex: 9,
      margin: 1,
    });
  });

  it('moves when the header is dragged and clamps to the screen', () => {
    const onDragStart = jest.fn();
    const onPositionChange = jest.fn();
    const onDragEnd = jest.fn();
    render(
      <FloatingWindow
        withinPortal={false}
        onDragStart={onDragStart}
        onPositionChange={onPositionChange}
        onDragEnd={onDragEnd}
        testID="window"
      />
    );

    const header = screen.getByLabelText('Move window');
    expect(header.props.onStartShouldSetResponder()).toBe(true);
    expect(header.props.onMoveShouldSetResponder()).toBe(true);

    fireEvent(header, 'responderGrant', moveEvent([0, 0], [0, 0], 1));
    expect(onDragStart).toHaveBeenCalledTimes(1);

    fireEvent(header, 'responderMove', moveEvent([0, 0], [30, 40], 2));
    expect(onPositionChange).toHaveBeenLastCalledWith({ x: 50, y: 120 });
    expect(screen.getByTestId('window')).toHaveStyle({ left: 50, top: 120 });

    fireEvent(header, 'responderRelease', moveEvent([30, 40], [30, 40], 3));
    expect(onDragEnd).toHaveBeenCalledWith({ x: 50, y: 120 });

    // Drag far up-left: clamped to 0
    fireEvent(header, 'responderGrant', moveEvent([0, 0], [0, 0], 4));
    fireEvent(header, 'responderMove', moveEvent([0, 0], [-500, -500], 5));
    expect(onPositionChange).toHaveBeenLastCalledWith({ x: 0, y: 0 });

    // Drag far down-right: clamped to screen size minus 48
    const { width, height } = Dimensions.get('window');
    fireEvent(header, 'responderGrant', moveEvent([0, 0], [0, 0], 6));
    fireEvent(header, 'responderMove', moveEvent([0, 0], [5000, 5000], 7));
    expect(onPositionChange).toHaveBeenLastCalledWith({
      x: width - 48,
      y: height - 48,
    });

    fireEvent(header, 'responderTerminate', moveEvent([0, 0], [0, 0], 8));
    expect(onDragEnd).toHaveBeenLastCalledWith({ x: width - 48, y: height - 48 });
  });

  it('renders through the portal overlay by default and into a named host', () => {
    render(
      <PortalProvider>
        <FloatingWindow title="Portaled">
          <RNText>Portaled body</RNText>
        </FloatingWindow>
        <FloatingWindow title="Targeted" portalTarget="side" />
        <PortalHost name="side" />
      </PortalProvider>
    );

    expect(screen.getByText('Portaled')).toBeTruthy();
    expect(screen.getByText('Portaled body')).toBeTruthy();
    expect(screen.getByText('Targeted')).toBeTruthy();
  });
});
