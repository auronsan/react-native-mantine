import { Animated, Text } from 'react-native';
import { act, render, screen } from '../../../__tests__/test-utils';
import { SemiCircleProgress } from '../index';

describe('SemiCircleProgress', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
  });

  it('renders with default props and accessibility info', () => {
    render(<SemiCircleProgress value={40} testID="progress" />);
    const root = screen.getByTestId('progress');
    expect(root.props.accessibilityRole).toBe('progressbar');
    expect(root.props.accessibilityValue).toEqual({
      min: 0,
      max: 100,
      now: 40,
    });
    expect(screen.UNSAFE_getByType(Animated.View)).toBeTruthy();
  });

  it('clamps values outside 0-100', () => {
    const { rerender } = render(
      <SemiCircleProgress value={150} testID="progress" />
    );
    expect(screen.getByTestId('progress').props.accessibilityValue.now).toBe(
      100
    );
    rerender(<SemiCircleProgress value={-20} testID="progress" />);
    expect(screen.getByTestId('progress').props.accessibilityValue.now).toBe(0);
  });

  it('renders string label at the bottom by default', () => {
    render(<SemiCircleProgress value={65} label="65%" />);
    expect(screen.getByText('65%')).toBeTruthy();
  });

  it('renders number label', () => {
    render(<SemiCircleProgress value={65} label={65} />);
    expect(screen.getByText('65')).toBeTruthy();
  });

  it('renders custom node label', () => {
    render(<SemiCircleProgress value={65} label={<Text>Custom</Text>} />);
    expect(screen.getByText('Custom')).toBeTruthy();
  });

  it('applies labelStyle to text labels', () => {
    render(
      <SemiCircleProgress value={10} label="10" labelStyle={{ color: 'red' }} />
    );
    expect(screen.getByText('10')).toHaveStyle({ color: 'red' });
  });

  it('renders label at center for up orientation', () => {
    render(<SemiCircleProgress value={30} label="30" labelPosition="center" />);
    expect(screen.getByText('30')).toBeTruthy();
  });

  it('renders center label below the gauge for down orientation', () => {
    render(
      <SemiCircleProgress
        value={30}
        label="30"
        labelPosition="center"
        orientation="down"
        testID="progress"
      />
    );
    expect(screen.getByText('30')).toBeTruthy();
  });

  it('renders no label wrapper content when label is omitted', () => {
    render(<SemiCircleProgress value={30} labelPosition="center" />);
    expect(screen.queryByText('30')).toBeNull();
  });

  it('supports right-to-left fill direction', () => {
    render(
      <SemiCircleProgress
        value={50}
        fillDirection="right-to-left"
        testID="progress"
      />
    );
    expect(screen.getByTestId('progress')).toBeTruthy();
  });

  it('animates when transitionDuration is greater than 0', () => {
    const { rerender } = render(
      <SemiCircleProgress value={10} transitionDuration={300} />
    );
    rerender(<SemiCircleProgress value={80} transitionDuration={300} />);
    act(() => {
      jest.advanceTimersByTime(400);
    });
    expect(screen.UNSAFE_getByType(Animated.View)).toBeTruthy();
  });

  it('updates value without animation when transitionDuration is 0', () => {
    const { rerender } = render(
      <SemiCircleProgress value={10} testID="progress" />
    );
    rerender(<SemiCircleProgress value={80} testID="progress" />);
    expect(screen.getByTestId('progress').props.accessibilityValue.now).toBe(
      80
    );
  });

  it('applies custom size and thickness', () => {
    render(<SemiCircleProgress value={10} size={100} thickness={5} />);
    const gauge = screen.UNSAFE_getByType(Animated.View).parent;
    expect(gauge).toHaveStyle({ width: 100, height: 50 });
  });

  it('applies custom segment colors', () => {
    render(
      <SemiCircleProgress
        value={10}
        filledSegmentColor="red"
        emptySegmentColor="gray"
        innerBackgroundColor="white"
        testID="progress"
      />
    );
    expect(screen.getByTestId('progress')).toBeTruthy();
  });

  it('applies custom style', () => {
    render(
      <SemiCircleProgress value={10} style={{ margin: 5 }} testID="progress" />
    );
    expect(screen.getByTestId('progress')).toHaveStyle({ margin: 5 });
  });
});
