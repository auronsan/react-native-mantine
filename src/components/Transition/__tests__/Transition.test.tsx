import { StyleSheet, Text } from 'react-native';
import { render, screen, act } from '../../../__tests__/test-utils';
import { Transition, type TransitionType } from '../index';

const flatten = (testID: string) =>
  StyleSheet.flatten(screen.getByTestId(testID).props.style) as Record<
    string,
    any
  >;

describe('Transition', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders nothing when not mounted', () => {
    render(
      <Transition mounted={false}>
        <Text>Content</Text>
      </Transition>
    );
    expect(screen.queryByText('Content')).toBeNull();
  });

  it('renders children when mounted', () => {
    render(
      <Transition mounted testID="transition">
        <Text>Content</Text>
      </Transition>
    );
    expect(screen.getByText('Content')).toBeTruthy();
    expect(screen.getByTestId('transition')).toBeTruthy();
    expect(flatten('transition').opacity).toBe(1);
  });

  it('calls onEntered after the enter animation completes', () => {
    const onEntered = jest.fn();
    render(
      <Transition mounted duration={100} onEntered={onEntered}>
        <Text>Content</Text>
      </Transition>
    );
    expect(onEntered).not.toHaveBeenCalled();
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(onEntered).toHaveBeenCalledTimes(1);
  });

  it('animates in when mounted changes from false to true', () => {
    const onEntered = jest.fn();
    const { rerender } = render(
      <Transition mounted={false} duration={100} onEntered={onEntered}>
        <Text>Content</Text>
      </Transition>
    );
    expect(screen.queryByText('Content')).toBeNull();

    rerender(
      <Transition mounted duration={100} onEntered={onEntered} testID="t">
        <Text>Content</Text>
      </Transition>
    );
    expect(screen.getByText('Content')).toBeTruthy();
    expect(flatten('t').opacity).toBe(0);
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(onEntered).toHaveBeenCalledTimes(1);
    expect(screen.getByText('Content')).toBeTruthy();
  });

  it('calls onExited and unmounts children after exit animation', () => {
    const onExited = jest.fn();
    const { rerender } = render(
      <Transition mounted duration={100} onExited={onExited}>
        <Text>Content</Text>
      </Transition>
    );
    act(() => {
      jest.advanceTimersByTime(500);
    });

    rerender(
      <Transition mounted={false} duration={100} onExited={onExited}>
        <Text>Content</Text>
      </Transition>
    );
    // still rendered while the exit animation runs
    expect(screen.getByText('Content')).toBeTruthy();
    expect(onExited).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(onExited).toHaveBeenCalledTimes(1);
    expect(screen.queryByText('Content')).toBeNull();
  });

  it('uses exitDuration for the exit animation', () => {
    const onExited = jest.fn();
    const { rerender } = render(
      <Transition mounted duration={50} exitDuration={400} onExited={onExited}>
        <Text>Content</Text>
      </Transition>
    );
    act(() => {
      jest.advanceTimersByTime(200);
    });
    rerender(
      <Transition
        mounted={false}
        duration={50}
        exitDuration={400}
        onExited={onExited}
      >
        <Text>Content</Text>
      </Transition>
    );
    expect(onExited).not.toHaveBeenCalled();
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(onExited).toHaveBeenCalledTimes(1);
    expect(screen.queryByText('Content')).toBeNull();
  });

  it('falls back to default durations when duration is 0', () => {
    const onEntered = jest.fn();
    const onExited = jest.fn();
    const { rerender } = render(
      <Transition mounted duration={0} onEntered={onEntered}>
        <Text>Content</Text>
      </Transition>
    );
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(onEntered).toHaveBeenCalledTimes(1);
    rerender(
      <Transition
        mounted={false}
        duration={0}
        onEntered={onEntered}
        onExited={onExited}
      >
        <Text>Content</Text>
      </Transition>
    );
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(onExited).toHaveBeenCalledTimes(1);
  });

  it('works without callbacks', () => {
    const { rerender } = render(
      <Transition mounted>
        <Text>Content</Text>
      </Transition>
    );
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    rerender(
      <Transition mounted={false}>
        <Text>Content</Text>
      </Transition>
    );
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.queryByText('Content')).toBeNull();
  });

  it.each<[TransitionType, Record<string, any> | undefined]>([
    ['fade', undefined],
    ['scale', { scale: 1 }],
    ['slide-down', { translateY: 0 }],
    ['slide-up', { translateY: 0 }],
    ['slide-left', { translateX: 0 }],
    ['slide-right', { translateX: 0 }],
    ['pop', { scale: 1 }],
    ['rotate', { rotate: '0deg' }],
  ])('applies %s transition styles when mounted', (transition, transform) => {
    render(
      <Transition mounted transition={transition} testID="t">
        <Text>Content</Text>
      </Transition>
    );
    const style = flatten('t');
    expect(style.opacity).toBe(1);
    if (transform) {
      expect(style.transform).toEqual([transform]);
    } else {
      expect(style.transform).toBeUndefined();
    }
  });

  it.each<[TransitionType, Record<string, any>]>([
    ['scale', { scale: 0.75 }],
    ['slide-down', { translateY: -20 }],
    ['slide-up', { translateY: 20 }],
    ['slide-left', { translateX: 20 }],
    ['slide-right', { translateX: -20 }],
    ['pop', { scale: 0 }],
    ['rotate', { rotate: '-180deg' }],
  ])(
    'starts %s transition from its initial transform',
    (transition, transform) => {
      const { rerender } = render(
        <Transition mounted={false} transition={transition} testID="t">
          <Text>Content</Text>
        </Transition>
      );
      rerender(
        <Transition mounted transition={transition} testID="t">
          <Text>Content</Text>
        </Transition>
      );
      const style = flatten('t');
      expect(style.opacity).toBe(0);
      expect(style.transform).toEqual([transform]);
    }
  );

  it('falls back to fade for unknown transition', () => {
    render(
      <Transition mounted transition={'unknown' as TransitionType} testID="t">
        <Text>Content</Text>
      </Transition>
    );
    const style = flatten('t');
    expect(style.opacity).toBe(1);
    expect(style.transform).toBeUndefined();
  });

  it.each([
    'linear',
    'ease',
    'ease-in',
    'ease-out',
    'ease-in-out',
    'unknown',
  ] as const)('supports timingFunction %s', (timingFunction) => {
    const onEntered = jest.fn();
    render(
      <Transition
        mounted
        duration={100}
        timingFunction={timingFunction as any}
        onEntered={onEntered}
      >
        <Text>Content</Text>
      </Transition>
    );
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(onEntered).toHaveBeenCalledTimes(1);
    expect(screen.getByText('Content')).toBeTruthy();
  });

  it('merges custom style and passes testID', () => {
    render(
      <Transition mounted style={{ margin: 4 }} testID="t">
        <Text>Content</Text>
      </Transition>
    );
    expect(screen.getByTestId('t')).toHaveStyle({ margin: 4 });
  });

  it('has displayName', () => {
    expect(Transition.displayName).toBe('Transition');
  });
});
