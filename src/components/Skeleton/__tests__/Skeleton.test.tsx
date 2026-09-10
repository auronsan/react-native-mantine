import { Animated, Text } from 'react-native';
import { render, screen, act } from '../../../__tests__/test-utils';
import { Skeleton } from '../index';

describe('Skeleton', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders with default size and passes testID through', () => {
    render(<Skeleton testID="skeleton" />);
    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveStyle({
      height: 120,
      width: '100%',
      borderRadius: 4,
      overflow: 'hidden',
    });
  });

  it('renders shimmer when animate is true and advances the animation', () => {
    render(<Skeleton testID="skeleton" />);
    expect(screen.UNSAFE_getAllByType(Animated.View)).toHaveLength(1);

    act(() => {
      jest.advanceTimersByTime(3200);
    });
    expect(screen.getByTestId('skeleton')).toBeTruthy();
  });

  it('does not render shimmer when animate is false', () => {
    render(<Skeleton animate={false} testID="skeleton" />);
    expect(screen.UNSAFE_queryAllByType(Animated.View)).toHaveLength(0);
    expect(screen.getByTestId('skeleton').children).toHaveLength(0);
  });

  it('applies numeric height and width', () => {
    render(<Skeleton height={40} width={200} testID="skeleton" />);
    expect(screen.getByTestId('skeleton')).toHaveStyle({
      height: 40,
      width: 200,
    });
  });

  it('applies string height and width', () => {
    render(<Skeleton height="50%" width="80%" testID="skeleton" />);
    expect(screen.getByTestId('skeleton')).toHaveStyle({
      height: '50%',
      width: '80%',
    });
  });

  it('renders circle with equal width and height and round radius', () => {
    render(<Skeleton circle height={50} width={10} testID="skeleton" />);
    expect(screen.getByTestId('skeleton')).toHaveStyle({
      height: 50,
      width: 50,
      borderRadius: 9999,
    });
  });

  it('applies theme radius keys and numeric radius', () => {
    const { rerender } = render(<Skeleton radius="xl" testID="skeleton" />);
    expect(screen.getByTestId('skeleton')).toHaveStyle({ borderRadius: 32 });

    rerender(<Skeleton radius={13} testID="skeleton" />);
    expect(screen.getByTestId('skeleton')).toHaveStyle({ borderRadius: 13 });
  });

  it('renders children instead of skeleton when visible is false', () => {
    render(
      <Skeleton visible={false} testID="skeleton">
        <Text>Loaded content</Text>
      </Skeleton>
    );
    expect(screen.getByText('Loaded content')).toBeTruthy();
    expect(screen.queryByTestId('skeleton')).toBeNull();
  });

  it('still renders skeleton when visible is false but there are no children', () => {
    render(<Skeleton visible={false} testID="skeleton" />);
    expect(screen.getByTestId('skeleton')).toBeTruthy();
  });

  it('hides children while visible', () => {
    render(
      <Skeleton visible testID="skeleton">
        <Text>Loaded content</Text>
      </Skeleton>
    );
    expect(screen.queryByText('Loaded content')).toBeNull();
    expect(screen.getByTestId('skeleton')).toBeTruthy();
  });

  it('merges custom style and forwards other props', () => {
    render(
      <Skeleton
        style={{ marginTop: 9 }}
        accessibilityLabel="Loading"
        testID="skeleton"
      />
    );
    expect(screen.getByTestId('skeleton')).toHaveStyle({ marginTop: 9 });
    expect(screen.getByLabelText('Loading')).toBeTruthy();
  });
});
