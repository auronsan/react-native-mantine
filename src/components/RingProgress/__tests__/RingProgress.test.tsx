import { Animated, Text } from 'react-native';
import { act, render, screen } from '../../../__tests__/test-utils';
import { ThemeProvider } from '../../../theme/theme-provider';
import { createTheme } from '../../../theme/create-theme';
import { RingProgress } from '../index';

describe('RingProgress', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
  });

  it('renders with default size and thickness', () => {
    render(
      <RingProgress testID="ring" sections={[{ value: 40, color: 'blue' }]} />
    );
    const root = screen.getByTestId('ring');
    expect(root).toHaveStyle({ width: 120, height: 120 });
    // 8 animated segments per section
    expect(screen.UNSAFE_getAllByType(Animated.View)).toHaveLength(8);
  });

  it('renders a segment set for every section', () => {
    render(
      <RingProgress
        sections={[
          { value: 40, color: 'blue' },
          { value: 15, color: 'orange', tooltip: 'Orange' },
          { value: 15, color: 'grape' },
        ]}
      />
    );
    expect(screen.UNSAFE_getAllByType(Animated.View)).toHaveLength(24);
  });

  it('renders nothing extra for empty sections', () => {
    render(<RingProgress testID="ring" sections={[]} />);
    expect(screen.getByTestId('ring')).toBeTruthy();
    expect(screen.UNSAFE_queryAllByType(Animated.View)).toHaveLength(0);
  });

  it('applies custom size and thickness', () => {
    render(
      <RingProgress
        testID="ring"
        size={200}
        thickness={20}
        sections={[{ value: 50, color: 'teal' }]}
      />
    );
    expect(screen.getByTestId('ring')).toHaveStyle({ width: 200, height: 200 });
    const segment = screen.UNSAFE_getAllByType(Animated.View)[0];
    expect(segment?.props.style).toEqual(
      expect.objectContaining({ width: 200, borderWidth: 20 })
    );
  });

  it('renders a string label', () => {
    render(
      <RingProgress sections={[{ value: 40, color: 'blue' }]} label="40%" />
    );
    expect(screen.getByText('40%')).toBeTruthy();
  });

  it('renders a custom label node', () => {
    render(
      <RingProgress
        sections={[{ value: 40, color: 'blue' }]}
        label={<Text>Custom label</Text>}
      />
    );
    expect(screen.getByText('Custom label')).toBeTruthy();
  });

  it('supports rootColor and roundCaps', () => {
    render(
      <RingProgress
        testID="ring"
        rootColor="#eeeeee"
        roundCaps
        sections={[{ value: 40, color: 'blue' }]}
      />
    );
    expect(screen.getByTestId('ring')).toBeTruthy();
  });

  it('animates sections and cleans up removed ones on update', () => {
    const { rerender } = render(
      <RingProgress
        testID="ring"
        sections={[
          { value: 40, color: 'blue' },
          { value: 20, color: 'red' },
        ]}
      />
    );
    act(() => {
      jest.advanceTimersByTime(1100);
    });
    expect(screen.UNSAFE_getAllByType(Animated.View)).toHaveLength(16);

    rerender(
      <RingProgress testID="ring" sections={[{ value: 80, color: 'blue' }]} />
    );
    act(() => {
      jest.advanceTimersByTime(1100);
    });
    expect(screen.UNSAFE_getAllByType(Animated.View)).toHaveLength(8);

    rerender(
      <RingProgress
        testID="ring"
        sections={[
          { value: 10, color: 'blue' },
          { value: 10, color: 'green' },
          { value: 10, color: 'yellow' },
        ]}
      />
    );
    act(() => {
      jest.advanceTimersByTime(1100);
    });
    expect(screen.UNSAFE_getAllByType(Animated.View)).toHaveLength(24);
  });

  it('renders in dark color scheme with default root color', () => {
    render(
      <ThemeProvider theme={createTheme()} forceMode="dark">
        <RingProgress
          testID="ring"
          label="Dark"
          sections={[{ value: 40, color: 'blue' }]}
        />
      </ThemeProvider>
    );
    expect(screen.getByTestId('ring')).toBeTruthy();
    expect(screen.getByText('Dark')).toBeTruthy();
  });

  it('applies custom style and accessibility props', () => {
    render(
      <RingProgress
        testID="ring"
        style={{ margin: 8 }}
        accessibilityLabel="Completion"
        sections={[{ value: 40, color: 'blue' }]}
      />
    );
    expect(screen.getByTestId('ring')).toHaveStyle({ margin: 8 });
    expect(screen.getByLabelText('Completion')).toBeTruthy();
  });
});
