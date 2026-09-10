import { Dimensions, Text } from 'react-native';
import type { ScaledSize } from 'react-native';
import { render, screen, act } from '../../../__tests__/test-utils';
import { MediaQuery } from '../index';

type ChangeHandler = (payload: {
  window: ScaledSize;
  screen: ScaledSize;
}) => void;

const size = (width: number, height: number): ScaledSize => ({
  width,
  height,
  scale: 2,
  fontScale: 2,
});

describe('MediaQuery', () => {
  let windowSize: ScaledSize;
  let screenSize: ScaledSize;
  let changeHandler: ChangeHandler | null;
  let remove: jest.Mock;

  beforeEach(() => {
    windowSize = size(800, 600);
    screenSize = size(1200, 900);
    changeHandler = null;
    remove = jest.fn();

    jest
      .spyOn(Dimensions, 'get')
      .mockImplementation((dim: 'window' | 'screen') =>
        dim === 'screen' ? screenSize : windowSize
      );
    jest
      .spyOn(Dimensions, 'addEventListener')
      .mockImplementation((_type, handler) => {
        changeHandler = handler as ChangeHandler;
        return { remove } as any;
      });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders children when no constraints are given', () => {
    render(
      <MediaQuery>
        <Text>Visible</Text>
      </MediaQuery>
    );
    expect(screen.getByText('Visible')).toBeTruthy();
  });

  it('matches minWidth', () => {
    render(
      <MediaQuery minWidth={700}>
        <Text>Wide</Text>
      </MediaQuery>
    );
    expect(screen.getByText('Wide')).toBeTruthy();
  });

  it('hides children when width is below minWidth', () => {
    render(
      <MediaQuery minWidth={900}>
        <Text>Wide</Text>
      </MediaQuery>
    );
    expect(screen.queryByText('Wide')).toBeNull();
  });

  it('matches maxWidth and hides when above it', () => {
    const { rerender } = render(
      <MediaQuery maxWidth={900}>
        <Text>Narrow</Text>
      </MediaQuery>
    );
    expect(screen.getByText('Narrow')).toBeTruthy();

    rerender(
      <MediaQuery maxWidth={700}>
        <Text>Narrow</Text>
      </MediaQuery>
    );
    expect(screen.queryByText('Narrow')).toBeNull();
  });

  it('matches minHeight and hides when below it', () => {
    const { rerender } = render(
      <MediaQuery minHeight={500}>
        <Text>Tall</Text>
      </MediaQuery>
    );
    expect(screen.getByText('Tall')).toBeTruthy();

    rerender(
      <MediaQuery minHeight={700}>
        <Text>Tall</Text>
      </MediaQuery>
    );
    expect(screen.queryByText('Tall')).toBeNull();
  });

  it('matches maxHeight and hides when above it', () => {
    const { rerender } = render(
      <MediaQuery maxHeight={700}>
        <Text>Short</Text>
      </MediaQuery>
    );
    expect(screen.getByText('Short')).toBeTruthy();

    rerender(
      <MediaQuery maxHeight={500}>
        <Text>Short</Text>
      </MediaQuery>
    );
    expect(screen.queryByText('Short')).toBeNull();
  });

  it('matches orientation', () => {
    const { rerender } = render(
      <MediaQuery orientation="landscape">
        <Text>Landscape</Text>
      </MediaQuery>
    );
    expect(screen.getByText('Landscape')).toBeTruthy();

    rerender(
      <MediaQuery orientation="portrait">
        <Text>Landscape</Text>
      </MediaQuery>
    );
    expect(screen.queryByText('Landscape')).toBeNull();
  });

  it('treats width < height as portrait', () => {
    windowSize = size(400, 800);
    render(
      <MediaQuery orientation="portrait">
        <Text>Portrait</Text>
      </MediaQuery>
    );
    expect(screen.getByText('Portrait')).toBeTruthy();
  });

  it('supports largerThan as number and string', () => {
    const { rerender } = render(
      <MediaQuery largerThan={700}>
        <Text>Larger</Text>
      </MediaQuery>
    );
    expect(screen.getByText('Larger')).toBeTruthy();

    rerender(
      <MediaQuery largerThan="900">
        <Text>Larger</Text>
      </MediaQuery>
    );
    expect(screen.queryByText('Larger')).toBeNull();
  });

  it('supports smallerThan as number and string', () => {
    const { rerender } = render(
      <MediaQuery smallerThan="900">
        <Text>Smaller</Text>
      </MediaQuery>
    );
    expect(screen.getByText('Smaller')).toBeTruthy();

    rerender(
      <MediaQuery smallerThan={700}>
        <Text>Smaller</Text>
      </MediaQuery>
    );
    expect(screen.queryByText('Smaller')).toBeNull();
  });

  it('largerThan/smallerThan take precedence over minWidth/maxWidth', () => {
    render(
      <MediaQuery
        largerThan={700}
        minWidth={5000}
        smallerThan={900}
        maxWidth={1}
      >
        <Text>Precedence</Text>
      </MediaQuery>
    );
    expect(screen.getByText('Precedence')).toBeTruthy();
  });

  it('uses screen dimensions when query="screen"', () => {
    render(
      <MediaQuery query="screen" minWidth={1000}>
        <Text>Screen</Text>
      </MediaQuery>
    );
    expect(Dimensions.get).toHaveBeenCalledWith('screen');
    expect(screen.getByText('Screen')).toBeTruthy();
  });

  it('updates on dimension change events (window query)', () => {
    render(
      <MediaQuery minWidth={900}>
        <Text>Resized</Text>
      </MediaQuery>
    );
    expect(screen.queryByText('Resized')).toBeNull();
    expect(changeHandler).not.toBeNull();

    act(() => {
      changeHandler!({ window: size(1000, 600), screen: size(1000, 600) });
    });
    expect(screen.getByText('Resized')).toBeTruthy();
  });

  it('updates on dimension change events (screen query)', () => {
    render(
      <MediaQuery query="screen" maxWidth={1000}>
        <Text>Resized</Text>
      </MediaQuery>
    );
    expect(screen.queryByText('Resized')).toBeNull();

    act(() => {
      changeHandler!({ window: size(2000, 600), screen: size(500, 600) });
    });
    expect(screen.getByText('Resized')).toBeTruthy();
  });

  it('removes the dimension listener on unmount', () => {
    const { unmount } = render(
      <MediaQuery>
        <Text>Bye</Text>
      </MediaQuery>
    );
    unmount();
    expect(remove).toHaveBeenCalledTimes(1);
  });

  it('has a displayName', () => {
    expect(MediaQuery.displayName).toBe('MediaQuery');
  });
});
