import { Animated } from 'react-native';
import { act, render, screen } from '../../../__tests__/test-utils';
import { Progress } from '../index';

describe('Progress', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
  });

  it('renders with default props', () => {
    render(<Progress testID="progress" />);
    const root = screen.getByTestId('progress');
    expect(root).toBeTruthy();
    expect(root).toHaveStyle({ height: 8, overflow: 'hidden' });
    expect(screen.UNSAFE_getAllByType(Animated.View).length).toBeGreaterThan(0);
  });

  it('animates towards the given value', () => {
    const { rerender } = render(<Progress value={25} testID="progress" />);
    act(() => {
      jest.advanceTimersByTime(400);
    });

    rerender(<Progress value={75} testID="progress" />);
    act(() => {
      jest.advanceTimersByTime(400);
    });

    expect(screen.getByTestId('progress')).toBeTruthy();
  });

  it.each([
    ['xs', 3],
    ['sm', 5],
    ['md', 8],
    ['lg', 12],
    ['xl', 16],
  ] as const)('applies %s size', (size, height) => {
    render(<Progress size={size} testID="progress" />);
    expect(screen.getByTestId('progress')).toHaveStyle({ height });
  });

  it('accepts numeric size', () => {
    render(<Progress size={20} testID="progress" />);
    expect(screen.getByTestId('progress')).toHaveStyle({ height: 20 });
  });

  it('falls back to md size for unknown size keys', () => {
    render(<Progress size={'unknown' as any} testID="progress" />);
    expect(screen.getByTestId('progress')).toHaveStyle({ height: 8 });
  });

  it.each(['xs', 'sm', 'md', 'lg', 'xl'] as const)(
    'applies %s radius',
    (radius) => {
      render(<Progress radius={radius} testID="progress" />);
      expect(screen.getByTestId('progress')).toBeTruthy();
    }
  );

  it('renders with color, striped and animate props', () => {
    render(
      <Progress value={40} color="red" striped animate testID="progress" />
    );
    expect(screen.getByTestId('progress')).toBeTruthy();
  });

  it('renders striped bar without animation', () => {
    render(<Progress value={40} striped testID="progress" />);
    expect(screen.getByTestId('progress')).toBeTruthy();
  });

  it('renders sections instead of a single bar', () => {
    render(
      <Progress
        testID="progress"
        sections={[
          { value: 30, color: 'cyan', label: 'Documents' },
          { value: 20, color: 'pink' },
        ]}
      />
    );

    const root = screen.getByTestId('progress');
    const row = root.props.children;
    expect(row.props.style).toEqual(
      expect.objectContaining({ flexDirection: 'row' })
    );
    expect(row.props.children).toHaveLength(2);
    expect(row.props.children[0].props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ width: '30%' })])
    );
    expect(screen.UNSAFE_queryAllByType(Animated.View)).toHaveLength(0);
  });

  it('falls back to the primary color when a section has no color', () => {
    render(
      <Progress
        testID="progress"
        sections={[{ value: 50, color: undefined as any }]}
      />
    );
    expect(screen.getByTestId('progress')).toBeTruthy();
  });

  it('renders a single bar when sections is empty', () => {
    render(<Progress sections={[]} value={10} testID="progress" />);
    expect(screen.UNSAFE_getAllByType(Animated.View).length).toBeGreaterThan(0);
  });

  it('applies custom style', () => {
    render(<Progress style={{ marginTop: 10 }} testID="progress" />);
    expect(screen.getByTestId('progress')).toHaveStyle({ marginTop: 10 });
  });

  it('passes accessibility props through', () => {
    render(
      <Progress
        value={50}
        testID="progress"
        accessibilityRole="progressbar"
        accessibilityLabel="Upload progress"
      />
    );
    expect(screen.getByLabelText('Upload progress')).toBeTruthy();
    expect(screen.getByTestId('progress').props.accessibilityRole).toBe(
      'progressbar'
    );
  });
});
