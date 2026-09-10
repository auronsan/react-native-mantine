import { Text } from 'react-native';
import {
  render as baseRender,
  screen,
  fireEvent,
  act,
} from '../../../__tests__/test-utils';
import { Slider } from '../index';

type ReactTestInstance = ReturnType<typeof screen.getByTestId>;

const TRACK_WIDTH = 300;
const TRACK_PAGE_X = 20;

/**
 * Host refs are null in the test renderer, so a node mock is provided to make
 * `trackRef.current.measure()` report a fixed track geometry.
 */
const render = (ui: React.ReactElement) =>
  baseRender(ui, {
    createNodeMock: (
      element: React.ReactElement<{ onResponderGrant?: unknown }>
    ) => (element.props.onResponderGrant ? trackNodeMock : null),
  });

const trackNodeMock = {
  measure: (
    cb: (
      x: number,
      y: number,
      width: number,
      height: number,
      pageX: number,
      pageY: number
    ) => void
  ) => cb(0, 0, TRACK_WIDTH, 8, TRACK_PAGE_X, 0),
};

const touchEvent = (pageX: number, timestamp: number) =>
  ({
    nativeEvent: {
      touches: [{ pageX, pageY: 0 }],
      changedTouches: [],
      identifier: 0,
      pageX,
      pageY: 0,
      locationX: pageX - TRACK_PAGE_X,
      locationY: 0,
      timestamp,
      target: 0,
    },
    touchHistory: {
      touchBank: [
        {
          touchActive: true,
          startPageX: pageX,
          startPageY: 0,
          startTimeStamp: 1,
          currentPageX: pageX,
          currentPageY: 0,
          currentTimeStamp: timestamp,
          previousPageX: pageX,
          previousPageY: 0,
          previousTimeStamp: timestamp - 1,
        },
      ],
      numberActiveTouches: 1,
      indexOfSingleActiveTouch: 0,
      mostRecentTimeStamp: timestamp,
    },
  }) as never;

const getTrack = (): ReactTestInstance => {
  const [track] = screen.UNSAFE_root.findAll(
    (node: ReactTestInstance) =>
      typeof node.type === 'string' &&
      typeof node.props.onResponderGrant === 'function'
  );
  if (!track) {
    throw new Error('track not found');
  }
  return track;
};

const getSlider = (): ReactTestInstance => {
  const [slider] = screen.UNSAFE_root.findAll(
    (node: ReactTestInstance) =>
      typeof node.type === 'string' &&
      node.props.accessibilityRole === 'adjustable'
  );
  if (!slider) {
    throw new Error('slider not found');
  }
  return slider;
};

const a11yAction = (actionName: string) =>
  ({ nativeEvent: { actionName } }) as never;

describe('Slider', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders with defaults and exposes accessibility information', () => {
    render(<Slider testID="slider" />);
    const slider = screen.getByTestId('slider');
    expect(slider.props.accessibilityRole).toBe('adjustable');
    expect(slider.props.accessibilityValue).toEqual({
      min: 0,
      max: 100,
      now: 0,
    });
    expect(slider.props.accessibilityLabel).toBe('Slider, value 0');
    expect(slider.props.accessibilityActions).toEqual([
      { name: 'increment', label: 'Increment' },
      { name: 'decrement', label: 'Decrement' },
    ]);
  });

  it('uses defaultValue in uncontrolled mode and custom accessibilityLabel', () => {
    render(<Slider defaultValue={40} accessibilityLabel="Volume" />);
    const slider = screen.getByLabelText('Volume');
    expect(slider.props.accessibilityValue.now).toBe(40);
  });

  it('clamps controlled value into min/max range', () => {
    const { rerender } = render(<Slider value={150} min={10} max={90} />);
    expect(getSlider().props.accessibilityValue).toEqual({
      min: 10,
      max: 90,
      now: 90,
    });

    rerender(<Slider value={-5} min={10} max={90} />);
    expect(getSlider().props.accessibilityValue.now).toBe(10);
  });

  it('starts at min when no defaultValue is provided', () => {
    render(<Slider min={5} max={50} />);
    expect(getSlider().props.accessibilityValue.now).toBe(5);
  });

  it('increments and decrements through accessibility actions', () => {
    const onChange = jest.fn();
    const onChangeEnd = jest.fn();
    render(
      <Slider
        defaultValue={50}
        step={10}
        onChange={onChange}
        onChangeEnd={onChangeEnd}
      />
    );

    fireEvent(getSlider(), 'accessibilityAction', a11yAction('increment'));
    expect(onChange).toHaveBeenLastCalledWith(60);
    expect(onChangeEnd).toHaveBeenLastCalledWith(60);
    expect(getSlider().props.accessibilityValue.now).toBe(60);

    fireEvent(getSlider(), 'accessibilityAction', a11yAction('decrement'));
    fireEvent(getSlider(), 'accessibilityAction', a11yAction('decrement'));
    expect(onChange).toHaveBeenLastCalledWith(40);
    expect(getSlider().props.accessibilityValue.now).toBe(40);
  });

  it('clamps accessibility actions at min and max', () => {
    const onChange = jest.fn();
    render(<Slider defaultValue={99} step={5} onChange={onChange} />);

    fireEvent(getSlider(), 'accessibilityAction', a11yAction('increment'));
    expect(onChange).toHaveBeenLastCalledWith(100);

    for (let i = 0; i < 25; i += 1) {
      fireEvent(getSlider(), 'accessibilityAction', a11yAction('decrement'));
    }
    expect(onChange).toHaveBeenLastCalledWith(0);
  });

  it('keeps value for unknown accessibility actions', () => {
    const onChange = jest.fn();
    render(<Slider defaultValue={30} onChange={onChange} />);
    fireEvent(getSlider(), 'accessibilityAction', a11yAction('activate'));
    expect(onChange).toHaveBeenLastCalledWith(30);
  });

  it('ignores accessibility actions when disabled', () => {
    const onChange = jest.fn();
    render(<Slider defaultValue={30} disabled onChange={onChange} />);
    fireEvent(getSlider(), 'accessibilityAction', a11yAction('increment'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('does not update internal value in controlled mode', () => {
    const onChange = jest.fn();
    render(<Slider value={30} onChange={onChange} />);
    fireEvent(getSlider(), 'accessibilityAction', a11yAction('increment'));
    expect(onChange).toHaveBeenCalledWith(31);
    expect(getSlider().props.accessibilityValue.now).toBe(30);
  });

  it('updates value while dragging the track and shows the label', () => {
    const onChange = jest.fn();
    const onChangeEnd = jest.fn();
    render(
      <Slider
        defaultValue={0}
        onChange={onChange}
        onChangeEnd={onChangeEnd}
        label={(value) => `${value}%`}
      />
    );

    expect(screen.queryByText('0%')).toBeNull();

    const track = getTrack();
    fireEvent(track, 'responderGrant', touchEvent(TRACK_PAGE_X + 150, 10));
    expect(onChange).toHaveBeenLastCalledWith(50);
    expect(screen.getByText('50%')).toBeTruthy();

    fireEvent(track, 'responderMove', touchEvent(TRACK_PAGE_X + 300, 20));
    expect(onChange).toHaveBeenLastCalledWith(100);
    expect(screen.getByText('100%')).toBeTruthy();

    fireEvent(track, 'responderMove', touchEvent(TRACK_PAGE_X - 50, 30));
    expect(onChange).toHaveBeenLastCalledWith(0);

    fireEvent(track, 'responderRelease', touchEvent(TRACK_PAGE_X, 40));
    expect(onChangeEnd).toHaveBeenCalledWith(0);
    expect(screen.queryByText('0%')).toBeNull();

    act(() => {
      jest.runAllTimers();
    });
  });

  it('rounds dragged values to step and respects min/max', () => {
    const onChange = jest.fn();
    render(<Slider min={0} max={10} step={2} onChange={onChange} />);

    fireEvent(getTrack(), 'responderGrant', touchEvent(TRACK_PAGE_X + 105, 10));
    expect(onChange).toHaveBeenLastCalledWith(4);
  });

  it('reports onChangeEnd on terminate', () => {
    const onChange = jest.fn();
    const onChangeEnd = jest.fn();
    render(
      <Slider defaultValue={20} onChange={onChange} onChangeEnd={onChangeEnd} />
    );

    const track = getTrack();
    fireEvent(track, 'responderGrant', touchEvent(TRACK_PAGE_X + 30, 10));
    expect(onChange).toHaveBeenLastCalledWith(10);
    fireEvent(track, 'responderTerminate', touchEvent(TRACK_PAGE_X + 30, 20));
    expect(onChangeEnd).toHaveBeenCalledTimes(1);
    // The responder reads the latest value, not the one captured on mount (20)
    expect(onChangeEnd).toHaveBeenCalledWith(10);
  });

  it('reports the latest value in onChangeEnd on release', () => {
    const onChangeEnd = jest.fn();
    render(<Slider defaultValue={20} onChangeEnd={onChangeEnd} />);

    const track = getTrack();
    fireEvent(track, 'responderGrant', touchEvent(TRACK_PAGE_X + 150, 10));
    fireEvent(track, 'responderMove', touchEvent(TRACK_PAGE_X + 240, 20));
    fireEvent(track, 'responderRelease', touchEvent(TRACK_PAGE_X + 240, 30));
    expect(onChangeEnd).toHaveBeenCalledTimes(1);
    expect(onChangeEnd).toHaveBeenCalledWith(80);
  });

  it('honors min, max and step changes made after mount', () => {
    const onChange = jest.fn();
    const { rerender } = render(<Slider onChange={onChange} />);

    fireEvent(getTrack(), 'responderGrant', touchEvent(TRACK_PAGE_X + 150, 10));
    expect(onChange).toHaveBeenLastCalledWith(50);

    rerender(<Slider onChange={onChange} min={0} max={10} step={2} />);
    fireEvent(getTrack(), 'responderMove', touchEvent(TRACK_PAGE_X + 105, 20));
    expect(onChange).toHaveBeenLastCalledWith(4);
  });

  it('honors disabled changes made after mount', () => {
    const onChange = jest.fn();
    const onChangeEnd = jest.fn();
    const { rerender } = render(
      <Slider defaultValue={5} onChange={onChange} onChangeEnd={onChangeEnd} />
    );
    expect(getTrack().props.onStartShouldSetResponder()).toBe(true);

    rerender(
      <Slider
        defaultValue={5}
        disabled
        onChange={onChange}
        onChangeEnd={onChangeEnd}
      />
    );
    const track = getTrack();
    expect(track.props.onStartShouldSetResponder()).toBe(false);
    expect(track.props.onMoveShouldSetResponder()).toBe(false);

    act(() => {
      track.props.onResponderGrant(touchEvent(TRACK_PAGE_X + 150, 10));
      track.props.onResponderRelease(touchEvent(TRACK_PAGE_X + 150, 20));
    });
    expect(onChange).not.toHaveBeenCalled();
    expect(onChangeEnd).not.toHaveBeenCalled();
  });

  it('uses the latest onChangeEnd callback', () => {
    const first = jest.fn();
    const second = jest.fn();
    const { rerender } = render(<Slider onChangeEnd={first} />);
    rerender(<Slider onChangeEnd={second} />);

    const track = getTrack();
    fireEvent(track, 'responderGrant', touchEvent(TRACK_PAGE_X + 30, 10));
    fireEvent(track, 'responderRelease', touchEvent(TRACK_PAGE_X + 30, 20));
    expect(first).not.toHaveBeenCalled();
    expect(second).toHaveBeenCalledWith(10);
  });

  it('shows the label while dragging even when showLabelOnHover is false', () => {
    render(<Slider defaultValue={0} showLabelOnHover={false} />);
    fireEvent(getTrack(), 'responderGrant', touchEvent(TRACK_PAGE_X + 30, 10));
    expect(screen.getByText('10')).toBeTruthy();
  });

  it('renders a static label node and no label when label is null', () => {
    const { rerender } = render(<Slider label={<Text>Static</Text>} />);
    fireEvent(getTrack(), 'responderGrant', touchEvent(TRACK_PAGE_X + 30, 10));
    expect(screen.getByText('Static')).toBeTruthy();

    rerender(<Slider label={null} />);
    fireEvent(getTrack(), 'responderGrant', touchEvent(TRACK_PAGE_X + 60, 20));
    expect(screen.queryByText('20')).toBeNull();
    expect(screen.queryByText('Static')).toBeNull();
  });

  it('ignores pan gestures when disabled', () => {
    const onChange = jest.fn();
    const onChangeEnd = jest.fn();
    render(
      <Slider
        disabled
        defaultValue={5}
        onChange={onChange}
        onChangeEnd={onChangeEnd}
      />
    );

    const track = getTrack();
    expect(track.props.onStartShouldSetResponder()).toBe(false);
    expect(track.props.onMoveShouldSetResponder()).toBe(false);

    act(() => {
      track.props.onResponderGrant(touchEvent(TRACK_PAGE_X + 150, 10));
      track.props.onResponderMove(touchEvent(TRACK_PAGE_X + 200, 20));
      track.props.onResponderRelease(touchEvent(TRACK_PAGE_X + 200, 30));
      track.props.onResponderTerminate(touchEvent(TRACK_PAGE_X + 200, 40));
    });

    expect(onChange).not.toHaveBeenCalled();
    expect(onChangeEnd).not.toHaveBeenCalled();
    expect(screen.queryByText('5')).toBeNull();
  });

  it('allows pan gestures when enabled', () => {
    render(<Slider />);
    const track = getTrack();
    expect(track.props.onStartShouldSetResponder()).toBe(true);
    expect(track.props.onMoveShouldSetResponder()).toBe(true);
  });

  it('renders marks with and without labels at the correct positions', () => {
    render(
      <Slider
        min={0}
        max={200}
        marks={[
          { value: 0, label: 'Start' },
          { value: 100 },
          { value: 200, label: 'End' },
        ]}
      />
    );

    expect(screen.getByText('Start')).toHaveStyle({ left: '0%' });
    expect(screen.getByText('End')).toHaveStyle({ left: '100%' });
    expect(screen.queryByText('100')).toBeNull();
  });

  it('renders without marks container when marks are empty', () => {
    render(<Slider marks={[]} testID="slider" />);
    expect(getTrack().children).toHaveLength(1);
  });

  it('supports every size and a numeric size', () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
    const { rerender } = render(<Slider size="xs" />);
    sizes.forEach((size) => {
      rerender(<Slider size={size} />);
      expect(getSlider()).toBeTruthy();
    });

    rerender(<Slider size={20 as never} />);
    expect(getTrack()).toHaveStyle({ height: 20 });

    rerender(<Slider size={'unknown' as never} />);
    expect(getTrack()).toHaveStyle({ height: 8 });
  });

  it('applies color, radius and custom style', () => {
    render(
      <Slider
        color="red"
        radius={3}
        style={{ marginTop: 11 }}
        testID="slider"
      />
    );
    expect(screen.getByTestId('slider')).toHaveStyle({ marginTop: 11 });
    expect(getTrack()).toHaveStyle({ borderRadius: 3 });
  });

  it('uses gray bar color when disabled', () => {
    render(<Slider disabled />);
    expect(getSlider()).toBeTruthy();
  });
});
