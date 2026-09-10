import { Animated, Text } from 'react-native';
import { act, fireEvent, render, screen } from '../../../__tests__/test-utils';
import { SegmentedControl } from '../index';

const data = ['React', 'Angular', 'Vue'];

const layoutAll = (orientation: 'horizontal' | 'vertical' = 'horizontal') => {
  screen.getAllByRole('tab').forEach((tab, index) => {
    fireEvent(tab, 'layout', {
      nativeEvent: {
        layout:
          orientation === 'horizontal'
            ? { x: index * 100, y: 0, width: 100, height: 32 }
            : { x: 0, y: index * 32, width: 100, height: 32 },
      },
    } as any);
  });
};

// Each TouchableOpacity segment renders an Animated.View; the indicator is
// rendered before the segments, so it is the first extra Animated.View.
const getIndicator = (segmentCount: number) => {
  const all = screen.UNSAFE_getAllByType(Animated.View);
  expect(all).toHaveLength(segmentCount + 1);
  return all[0]!;
};

describe('SegmentedControl', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
  });

  it('renders string data with the first item selected', () => {
    render(<SegmentedControl data={data} testID="control" />);
    expect(screen.getByTestId('control').props.accessibilityRole).toBe(
      'tablist'
    );
    expect(screen.getAllByRole('tab')).toHaveLength(3);
    expect(screen.getByText('React')).toBeTruthy();
    expect(
      screen.getByLabelText('React').props.accessibilityState.selected
    ).toBe(true);
    expect(screen.getByLabelText('Vue').props.accessibilityState.selected).toBe(
      false
    );
  });

  it('renders object data with node labels', () => {
    render(
      <SegmentedControl
        data={[
          { label: 'One', value: '1' },
          { label: <Text>Two</Text>, value: '2' },
        ]}
      />
    );
    expect(screen.getByLabelText('One')).toBeTruthy();
    expect(screen.getByText('Two')).toBeTruthy();
    const tabs = screen.getAllByRole('tab');
    expect(tabs[1]?.props.accessibilityLabel).toBeUndefined();
  });

  it('uses defaultValue when uncontrolled', () => {
    render(<SegmentedControl data={data} defaultValue="Vue" />);
    expect(screen.getByLabelText('Vue').props.accessibilityState.selected).toBe(
      true
    );
  });

  it('changes value on press when uncontrolled', () => {
    const onChange = jest.fn();
    render(<SegmentedControl data={data} onChange={onChange} />);

    fireEvent.press(screen.getByLabelText('Angular'));
    expect(onChange).toHaveBeenCalledWith('Angular');
    expect(
      screen.getByLabelText('Angular').props.accessibilityState.selected
    ).toBe(true);
    expect(
      screen.getByLabelText('React').props.accessibilityState.selected
    ).toBe(false);
  });

  it('does not change internal value when controlled', () => {
    const onChange = jest.fn();
    render(<SegmentedControl data={data} value="React" onChange={onChange} />);

    fireEvent.press(screen.getByLabelText('Vue'));
    expect(onChange).toHaveBeenCalledWith('Vue');
    expect(
      screen.getByLabelText('React').props.accessibilityState.selected
    ).toBe(true);
    expect(screen.getByLabelText('Vue').props.accessibilityState.selected).toBe(
      false
    );
  });

  it('ignores presses when disabled', () => {
    const onChange = jest.fn();
    render(
      <SegmentedControl
        data={data}
        disabled
        onChange={onChange}
        testID="control"
      />
    );
    expect(screen.getByTestId('control')).toHaveStyle({ opacity: 0.5 });
    const tab = screen.getByLabelText('Vue');
    expect(tab.props.accessibilityState.disabled).toBe(true);
    fireEvent.press(tab);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('ignores presses on disabled items', () => {
    const onChange = jest.fn();
    render(
      <SegmentedControl
        data={[
          { label: 'On', value: 'on' },
          { label: 'Off', value: 'off', disabled: true },
        ]}
        onChange={onChange}
      />
    );
    const off = screen.getByLabelText('Off');
    expect(off.props.accessibilityState.disabled).toBe(true);
    fireEvent.press(off);
    expect(onChange).not.toHaveBeenCalled();
    fireEvent.press(screen.getByLabelText('On'));
    expect(onChange).toHaveBeenCalledWith('on');
  });

  it('renders the indicator once every segment has a layout', () => {
    render(<SegmentedControl data={data} />);
    // only the three segment touchables before layout, no indicator yet
    expect(screen.UNSAFE_getAllByType(Animated.View)).toHaveLength(3);

    layoutAll();
    act(() => {
      jest.advanceTimersByTime(250);
    });

    const indicator = getIndicator(3);
    expect(JSON.stringify(indicator.props.style)).toContain('"height":"80%"');
  });

  it('moves the indicator when the active segment changes', () => {
    render(<SegmentedControl data={data} transitionDuration={0} />);
    layoutAll();
    fireEvent.press(screen.getByLabelText('Vue'));
    act(() => {
      jest.advanceTimersByTime(50);
    });
    expect(getIndicator(3)).toBeTruthy();
  });

  it('supports vertical orientation', () => {
    render(
      <SegmentedControl data={data} orientation="vertical" testID="control" />
    );
    expect(screen.getByTestId('control')).toHaveStyle({
      flexDirection: 'column',
    });

    layoutAll('vertical');
    act(() => {
      jest.advanceTimersByTime(250);
    });
    const indicator = getIndicator(3);
    expect(JSON.stringify(indicator.props.style)).toContain('"width":96');
  });

  it('supports fullWidth', () => {
    render(<SegmentedControl data={data} fullWidth testID="control" />);
    expect(screen.getByTestId('control')).toHaveStyle({ width: '100%' });
  });

  it.each(['xs', 'sm', 'md', 'lg', 'xl'] as const)(
    'renders %s size',
    (size) => {
      render(<SegmentedControl data={data} size={size} />);
      expect(screen.getByLabelText('React')).toBeTruthy();
    }
  );

  it('falls back to md size for unknown size', () => {
    render(<SegmentedControl data={data} size={'huge' as any} />);
    expect(screen.getByLabelText('React')).toBeTruthy();
  });

  it.each(['xs', 'sm', 'md', 'lg', 'xl'] as const)(
    'renders %s radius',
    (radius) => {
      render(<SegmentedControl data={data} radius={radius} testID="control" />);
      expect(screen.getByTestId('control')).toBeTruthy();
    }
  );

  it('renders with custom color and style', () => {
    render(
      <SegmentedControl
        data={data}
        color="red"
        style={{ marginTop: 6 }}
        testID="control"
      />
    );
    expect(screen.getByTestId('control')).toHaveStyle({ marginTop: 6 });
  });

  it('handles empty data', () => {
    render(<SegmentedControl data={[]} testID="control" />);
    expect(screen.getByTestId('control')).toBeTruthy();
    expect(screen.queryAllByRole('tab')).toHaveLength(0);
  });
});
