import { Text as RNText } from 'react-native';
import { render, screen, fireEvent } from '../../../__tests__/test-utils';
import { AngleSlider } from '../index';

/** Builds the event shape PanResponder expects for responder handlers */
function touchEvent(pageX: number, pageY: number, timeStamp = 1) {
  return {
    nativeEvent: { pageX, pageY, touches: [], changedTouches: [] },
    touchHistory: {
      numberActiveTouches: 1,
      indexOfSingleActiveTouch: 0,
      mostRecentTimeStamp: timeStamp,
      touchBank: [
        {
          touchActive: true,
          startPageX: pageX,
          startPageY: pageY,
          startTimeStamp: timeStamp,
          currentPageX: pageX,
          currentPageY: pageY,
          currentTimeStamp: timeStamp,
          previousPageX: pageX,
          previousPageY: pageY,
          previousTimeStamp: timeStamp - 1,
        },
      ],
    },
  };
}

describe('AngleSlider', () => {
  it('renders with defaults, label and passes testID through', () => {
    render(<AngleSlider testID="slider" />);

    const slider = screen.getByTestId('slider');
    expect(slider).toBeTruthy();
    expect(screen.getByText('0°')).toBeTruthy();
    expect(slider.props.accessibilityRole).toBe('adjustable');
    expect(slider.props.accessibilityValue).toEqual({ min: 0, max: 359, now: 0 });
    expect(slider).toHaveStyle({ width: 60, height: 60, borderRadius: 30 });
  });

  it('uses defaultValue and normalizes controlled values', () => {
    const { rerender } = render(<AngleSlider defaultValue={90} />);
    expect(screen.getByText('90°')).toBeTruthy();

    rerender(<AngleSlider value={370} />);
    expect(screen.getByText('10°')).toBeTruthy();

    rerender(<AngleSlider value={-90} />);
    expect(screen.getByText('270°')).toBeTruthy();
  });

  it('supports formatLabel returning a string or a node and withLabel=false', () => {
    const { rerender } = render(
      <AngleSlider value={45} formatLabel={(v) => `${v} deg`} />
    );
    expect(screen.getByText('45 deg')).toBeTruthy();

    rerender(
      <AngleSlider value={45} formatLabel={() => <RNText>custom</RNText>} />
    );
    expect(screen.getByText('custom')).toBeTruthy();

    rerender(<AngleSlider value={45} withLabel={false} />);
    expect(screen.queryByText('45°')).toBeNull();
  });

  it('renders marks and applies size, thumbSize, color and disabled styles', () => {
    render(
      <AngleSlider
        marks={[{ value: 0 }, { value: 90, label: 'east' }, { value: 400 }]}
        size={120}
        thumbSize={20}
        color="red"
        disabled
        labelStyle={{ fontSize: 30 }}
        style={{ margin: 2 }}
        testID="slider"
      />
    );

    const slider = screen.getByTestId('slider');
    expect(slider).toHaveStyle({ width: 120, opacity: 0.6, margin: 2 });
    expect(screen.getByText('0°')).toHaveStyle({ fontSize: 30 });
  });

  it('updates value on move gestures and snaps to step', () => {
    const onChange = jest.fn();
    const onChangeEnd = jest.fn();
    render(
      <AngleSlider onChange={onChange} onChangeEnd={onChangeEnd} step={10} testID="slider" />
    );
    const slider = screen.getByTestId('slider');

    // Center is (0,0) before measurement: a touch to the right is 90 degrees
    fireEvent(slider, 'responderMove', touchEvent(10, 0));
    expect(onChange).toHaveBeenLastCalledWith(90);
    expect(screen.getByText('90°')).toBeTruthy();

    // Slightly right of straight down is ~174 degrees, snapped to the 10 step
    fireEvent(slider, 'responderMove', touchEvent(1, 10, 2));
    expect(onChange).toHaveBeenLastCalledWith(170);

    // Same angle again does not emit
    onChange.mockClear();
    fireEvent(slider, 'responderMove', touchEvent(1, 10, 3));
    expect(onChange).not.toHaveBeenCalled();

    // Touching the exact center is ignored
    fireEvent(slider, 'responderMove', touchEvent(0, 0, 4));
    expect(onChange).not.toHaveBeenCalled();

    fireEvent(slider, 'responderRelease', touchEvent(1, 10, 5));
    expect(onChangeEnd).toHaveBeenCalledWith(170);

    fireEvent(slider, 'responderTerminate', touchEvent(1, 10, 6));
    expect(onChangeEnd).toHaveBeenCalledTimes(2);
  });

  it('snaps to the closest mark when restrictToMarks is set', () => {
    const onChange = jest.fn();
    render(
      <AngleSlider
        restrictToMarks
        marks={[{ value: 0 }, { value: 180 }, { value: 270 }]}
        onChange={onChange}
        testID="slider"
      />
    );

    // 90 degrees is closest to 0 or 180 (tie) -> first closest kept (0)... move to 200
    fireEvent(
      screen.getByTestId('slider'),
      'responderMove',
      touchEvent(-Math.sin(Math.PI / 9) * 10, Math.cos(Math.PI / 9) * 10)
    );
    expect(onChange).toHaveBeenLastCalledWith(180);
  });

  it('does not update when controlled or disabled', () => {
    const onChange = jest.fn();
    const { rerender } = render(
      <AngleSlider value={0} onChange={onChange} testID="slider" />
    );

    fireEvent(screen.getByTestId('slider'), 'responderMove', touchEvent(10, 0));
    expect(onChange).toHaveBeenCalledWith(90);
    expect(screen.getByText('0°')).toBeTruthy();

    onChange.mockClear();
    rerender(<AngleSlider disabled onChange={onChange} testID="slider" />);
    const slider = screen.getByTestId('slider');
    expect(slider.props.onStartShouldSetResponder()).toBe(false);
    expect(slider.props.onMoveShouldSetResponder()).toBe(false);
    fireEvent(slider, 'responderMove', touchEvent(10, 0, 9));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('accepts a step of 0 (no snapping)', () => {
    const onChange = jest.fn();
    render(<AngleSlider step={0} onChange={onChange} testID="slider" />);
    fireEvent(screen.getByTestId('slider'), 'responderMove', touchEvent(10, 1));
    expect(onChange).toHaveBeenCalled();
    expect(Number.isInteger(onChange.mock.calls[0]![0])).toBe(false);
  });

  it('supports callback and object refs', () => {
    const callbackRef = jest.fn();
    const objectRef = { current: null };
    const { unmount } = render(<AngleSlider ref={callbackRef} />);
    expect(callbackRef).toHaveBeenCalled();
    unmount();

    // The mocked View does not expose an instance, so only assert it does not throw
    expect(() => render(<AngleSlider ref={objectRef} />)).not.toThrow();
  });
});
