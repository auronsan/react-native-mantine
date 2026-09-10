import React from 'react';
import { Animated, Text, View } from 'react-native';
import { render, screen, fireEvent, act } from '../../../__tests__/test-utils';
import { Marquee } from '../index';
import { PlatformLinearGradient } from '../../LinearGradient/PlatformLinearGradient';

const layout = (width: number, height: number) =>
  ({ nativeEvent: { layout: { x: 0, y: 0, width, height } } }) as any;

type TestNode = { type: unknown; props: Record<string, unknown> };

const findGroup = () =>
  screen.root.findAll(
    (node: TestNode) =>
      node.type === 'View' && typeof node.props.onLayout === 'function'
  )[0]!;

describe('Marquee', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders repeated copies of children (default repeat = 4)', () => {
    render(
      <Marquee testID="marquee">
        <Text>Item</Text>
      </Marquee>
    );
    expect(screen.getByTestId('marquee')).toBeTruthy();
    expect(screen.getAllByText('Item')).toHaveLength(4);
  });

  it('respects repeat prop and enforces a minimum of 2 copies', () => {
    const { rerender } = render(
      <Marquee repeat={3}>
        <Text>Item</Text>
      </Marquee>
    );
    expect(screen.getAllByText('Item')).toHaveLength(3);

    rerender(
      <Marquee repeat={1}>
        <Text>Item</Text>
      </Marquee>
    );
    expect(screen.getAllByText('Item')).toHaveLength(2);
  });

  it('renders fade edge gradients by default and hides them with fadeEdges=false', () => {
    const { rerender } = render(
      <Marquee>
        <Text>Item</Text>
      </Marquee>
    );
    expect(screen.UNSAFE_getAllByType(PlatformLinearGradient)).toHaveLength(2);

    rerender(
      <Marquee fadeEdges={false}>
        <Text>Item</Text>
      </Marquee>
    );
    expect(screen.UNSAFE_queryAllByType(PlatformLinearGradient)).toHaveLength(
      0
    );
  });

  it('uses fadeEdgeColor and fadeEdgeSize for the gradients', () => {
    render(
      <Marquee fadeEdgeColor="red" fadeEdgeSize={40}>
        <Text>Item</Text>
      </Marquee>
    );
    const gradients = screen.UNSAFE_getAllByType(PlatformLinearGradient);
    expect(gradients[0]!.props.colors[0]).toMatch(/^#/);
    expect(gradients[0]!.props.colors[1]).toMatch(/rgba/);
    expect(gradients[1]!.props.colors[1]).toBe(gradients[0]!.props.colors[0]);
    expect(gradients[0]!.props.start).toEqual({ x: 0, y: 0.5 });
    expect(gradients[0]!.props.end).toEqual({ x: 1, y: 0.5 });
  });

  it('renders vertical orientation with column layout and vertical gradients', () => {
    render(
      <Marquee orientation="vertical">
        <Text>Item</Text>
      </Marquee>
    );
    const group = findGroup();
    expect(group).toHaveStyle({ flexDirection: 'column' });

    const gradients = screen.UNSAFE_getAllByType(PlatformLinearGradient);
    expect(gradients[0]!.props.start).toEqual({ x: 0, y: 0 });
    expect(gradients[0]!.props.end).toEqual({ x: 0, y: 1 });
  });

  it('renders horizontal orientation with row layout', () => {
    render(
      <Marquee orientation="horizontal">
        <Text>Item</Text>
      </Marquee>
    );
    expect(findGroup()).toHaveStyle({ flexDirection: 'row' });
  });

  it('supports numeric gap and theme spacing gap keys', () => {
    const { rerender } = render(
      <Marquee gap={17}>
        <Text>Item</Text>
      </Marquee>
    );
    expect(findGroup()).toHaveStyle({ gap: 17 });

    rerender(
      <Marquee gap="xl">
        <Text>Item</Text>
      </Marquee>
    );
    expect(findGroup()).not.toHaveStyle({ gap: 17 });

    rerender(
      <Marquee gap={'not-a-size' as any}>
        <Text>Item</Text>
      </Marquee>
    );
    expect(findGroup()).toBeTruthy();
  });

  it('starts the animation loop after the first group is measured', () => {
    const loopSpy = jest.spyOn(Animated, 'loop');
    const timingSpy = jest.spyOn(Animated, 'timing');

    const { unmount } = render(
      <Marquee duration={2000}>
        <Text>Item</Text>
      </Marquee>
    );
    expect(loopSpy).not.toHaveBeenCalled();

    act(() => {
      fireEvent(findGroup(), 'layout', layout(300, 40));
    });

    expect(loopSpy).toHaveBeenCalledTimes(1);
    expect(timingSpy).toHaveBeenCalledWith(
      expect.any(Animated.Value),
      expect.objectContaining({ toValue: 1, duration: 2000 })
    );

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    unmount();
    loopSpy.mockRestore();
    timingSpy.mockRestore();
  });

  it('does not start the loop when measured size is zero', () => {
    const loopSpy = jest.spyOn(Animated, 'loop');
    render(
      <Marquee>
        <Text>Item</Text>
      </Marquee>
    );
    act(() => {
      fireEvent(findGroup(), 'layout', layout(0, 0));
    });
    expect(loopSpy).not.toHaveBeenCalled();
    loopSpy.mockRestore();
  });

  it('measures height for vertical orientation and restarts on duration change', () => {
    const loopSpy = jest.spyOn(Animated, 'loop');
    const { rerender } = render(
      <Marquee orientation="vertical" reverse>
        <Text>Item</Text>
      </Marquee>
    );
    act(() => {
      fireEvent(findGroup(), 'layout', layout(0, 120));
    });
    expect(loopSpy).toHaveBeenCalledTimes(1);

    rerender(
      <Marquee orientation="vertical" reverse duration={500}>
        <Text>Item</Text>
      </Marquee>
    );
    expect(loopSpy).toHaveBeenCalledTimes(2);
    loopSpy.mockRestore();
  });

  it('applies custom style and passes through props', () => {
    render(
      <Marquee
        testID="marquee"
        style={{ height: 50 }}
        accessibilityLabel="Ticker"
      >
        <Text>Item</Text>
      </Marquee>
    );
    expect(screen.getByTestId('marquee')).toHaveStyle({
      height: 50,
      overflow: 'hidden',
    });
    expect(screen.getByLabelText('Ticker')).toBeTruthy();
  });

  it('accepts a ref without crashing', () => {
    const ref = React.createRef<View>();
    expect(() =>
      render(
        <Marquee ref={ref}>
          <Text>Item</Text>
        </Marquee>
      )
    ).not.toThrow();
  });

  it('has a displayName', () => {
    expect(Marquee.displayName).toBe('Marquee');
  });
});
