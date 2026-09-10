import { Text as RNText } from 'react-native';
import { render, screen, fireEvent, act } from '../../../__tests__/test-utils';
import { Collapse } from '../index';

function layout(element: any, height: number) {
  fireEvent(element, 'layout', {
    nativeEvent: { layout: { x: 0, y: 0, width: 100, height } },
  });
}

describe('Collapse', () => {
  let consoleError: jest.SpyInstance;

  beforeEach(() => {
    jest.useFakeTimers();
    consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.useRealTimers();
    consoleError.mockRestore();
  });

  it('renders children and passes testID through', () => {
    render(
      <Collapse in testID="collapse">
        <RNText>Hidden content</RNText>
      </Collapse>
    );

    expect(screen.getByTestId('collapse')).toBeTruthy();
    expect(screen.getByText('Hidden content')).toBeTruthy();
  });

  it('animates height and opacity together with default props and fires onTransitionEnd', () => {
    // Regression: opacity used to be native-driven while height was JS-driven on
    // the same Animated.View, which React Native rejects, so toggling with the
    // default animateOpacity never completed the transition.
    const onTransitionEnd = jest.fn();
    const { rerender } = render(
      <Collapse in={false} onTransitionEnd={onTransitionEnd} transitionDuration={50} testID="collapse">
        <RNText>Content</RNText>
      </Collapse>
    );

    layout(screen.getByText('Content').parent!, 80);

    rerender(
      <Collapse in onTransitionEnd={onTransitionEnd} transitionDuration={50} testID="collapse">
        <RNText>Content</RNText>
      </Collapse>
    );

    act(() => {
      jest.runAllTimers();
    });

    expect(onTransitionEnd).toHaveBeenCalledTimes(1);
    expect(consoleError).not.toHaveBeenCalled();

    rerender(
      <Collapse in={false} onTransitionEnd={onTransitionEnd} transitionDuration={50} testID="collapse">
        <RNText>Content</RNText>
      </Collapse>
    );

    act(() => {
      jest.runAllTimers();
    });

    expect(onTransitionEnd).toHaveBeenCalledTimes(2);
    expect(consoleError).not.toHaveBeenCalled();
  });

  it('measures content on layout and animates when toggled', () => {
    const onTransitionEnd = jest.fn();
    const { rerender } = render(
      <Collapse
        in={false}
        animateOpacity={false}
        onTransitionEnd={onTransitionEnd}
        transitionDuration={50}
        testID="collapse"
      >
        <RNText>Content</RNText>
      </Collapse>
    );

    const inner = screen.getByText('Content').parent!;
    layout(inner, 120);
    // Same height again is ignored, zero height is ignored
    layout(inner, 120);
    layout(inner, 0);

    rerender(
      <Collapse
        in
        animateOpacity={false}
        onTransitionEnd={onTransitionEnd}
        transitionDuration={50}
        testID="collapse"
      >
        <RNText>Content</RNText>
      </Collapse>
    );

    act(() => {
      jest.runAllTimers();
    });

    expect(onTransitionEnd).toHaveBeenCalled();
  });

  it('does not animate before the first layout', () => {
    const onTransitionEnd = jest.fn();
    const { rerender } = render(
      <Collapse in={false} onTransitionEnd={onTransitionEnd}>
        <RNText>Content</RNText>
      </Collapse>
    );

    rerender(
      <Collapse in onTransitionEnd={onTransitionEnd}>
        <RNText>Content</RNText>
      </Collapse>
    );

    act(() => {
      jest.runAllTimers();
    });
    expect(onTransitionEnd).not.toHaveBeenCalled();
  });

  it('supports animateOpacity=false and custom style', () => {
    const { rerender } = render(
      <Collapse in animateOpacity={false} style={{ margin: 4 }} testID="collapse">
        <RNText>Content</RNText>
      </Collapse>
    );

    expect(screen.getByTestId('collapse')).toHaveStyle({ margin: 4 });

    layout(screen.getByText('Content').parent!, 40);
    rerender(
      <Collapse in={false} animateOpacity={false} style={{ margin: 4 }} testID="collapse">
        <RNText>Content</RNText>
      </Collapse>
    );

    act(() => {
      jest.runAllTimers();
    });
    expect(screen.getByTestId('collapse')).toBeTruthy();
  });
});
