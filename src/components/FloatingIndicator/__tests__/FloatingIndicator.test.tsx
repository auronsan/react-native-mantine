import { Animated, StyleSheet, Text as RNText } from 'react-native';
import { render, screen, act } from '../../../__tests__/test-utils';
import { FloatingIndicator } from '../index';
import { createTheme } from '../../../theme/create-theme';

const theme = createTheme();

/**
 * Animated updates reach the host through the mocked setNativeProps, so read
 * the Animated.Value instances from the composite Animated.View instead.
 */
function animatedValues(testID: string) {
  expect(screen.getByTestId(testID)).toBeTruthy();
  const style = StyleSheet.flatten(screen.UNSAFE_getByType(Animated.View).props.style) as any;
  return {
    left: style.left.__getValue(),
    top: style.top.__getValue(),
    width: style.width.__getValue(),
    height: style.height.__getValue(),
    opacity: style.opacity.__getValue(),
  };
}

describe('FloatingIndicator', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders at the target position immediately and passes testID through', () => {
    render(
      <FloatingIndicator target={{ x: 10, y: 20, width: 30, height: 40 }} testID="indicator">
        <RNText>child</RNText>
      </FloatingIndicator>
    );

    const indicator = screen.getByTestId('indicator');
    expect(screen.getByText('child')).toBeTruthy();
    expect(indicator.props.pointerEvents).toBe('none');
    expect(animatedValues('indicator')).toEqual({
      left: 10,
      top: 20,
      width: 30,
      height: 40,
      opacity: 1,
    });
    expect(indicator).toHaveStyle({
      position: 'absolute',
      backgroundColor: theme.white,
      borderRadius: theme.radius.sm,
    });
  });

  it('is hidden without a target and appears when one is set', () => {
    const { rerender } = render(<FloatingIndicator target={null} testID="indicator" />);
    expect(animatedValues('indicator').opacity).toBe(0);

    rerender(
      <FloatingIndicator target={{ x: 1, y: 2, width: 3, height: 4 }} testID="indicator" />
    );
    expect(animatedValues('indicator')).toEqual({
      left: 1,
      top: 2,
      width: 3,
      height: 4,
      opacity: 1,
    });
  });

  it('animates to a new target and back to hidden', () => {
    const { rerender } = render(
      <FloatingIndicator
        target={{ x: 0, y: 0, width: 10, height: 10 }}
        transitionDuration={100}
        testID="indicator"
      />
    );

    rerender(
      <FloatingIndicator
        target={{ x: 50, y: 60, width: 70, height: 80 }}
        transitionDuration={100}
        testID="indicator"
      />
    );
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(animatedValues('indicator')).toEqual({
      left: 50,
      top: 60,
      width: 70,
      height: 80,
      opacity: 1,
    });

    rerender(<FloatingIndicator target={undefined} transitionDuration={100} testID="indicator" />);
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(animatedValues('indicator').opacity).toBe(0);
  });

  it('jumps without animation when transitionDuration is 0', () => {
    const { rerender } = render(
      <FloatingIndicator
        target={{ x: 0, y: 0, width: 10, height: 10 }}
        transitionDuration={0}
        testID="indicator"
      />
    );

    rerender(
      <FloatingIndicator
        target={{ x: 5, y: 6, width: 7, height: 8 }}
        transitionDuration={0}
        testID="indicator"
      />
    );
    expect(animatedValues('indicator')).toEqual({
      left: 5,
      top: 6,
      width: 7,
      height: 8,
      opacity: 1,
    });
  });

  it('applies color, radius and custom style', () => {
    render(
      <FloatingIndicator
        target={{ x: 0, y: 0, width: 1, height: 1 }}
        color="red"
        radius={3}
        style={{ margin: 2 }}
        testID="indicator"
      />
    );

    expect(screen.getByTestId('indicator')).toHaveStyle({
      backgroundColor: theme.colors.red![6],
      borderRadius: 3,
      margin: 2,
    });
  });
});
