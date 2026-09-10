import { Animated } from 'react-native';
import { act, render, screen } from '../../../__tests__/test-utils';
import { RollingNumber } from '../index';

const hidden = { includeHiddenElements: true };

describe('RollingNumber', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
  });

  it('renders formatted value as accessibility label', () => {
    render(<RollingNumber value={1234} testID="rolling" />);
    expect(screen.getByTestId('rolling')).toBeTruthy();
    expect(screen.getByLabelText('1234')).toBeTruthy();
  });

  it('renders one rolling column per digit', () => {
    render(<RollingNumber value={42} />);
    // each digit column renders one Animated.View
    expect(screen.UNSAFE_getAllByType(Animated.View)).toHaveLength(2);
    expect(screen.getAllByText('4', hidden).length).toBe(2);
  });

  it('renders prefix, suffix and separators as static characters', () => {
    render(
      <RollingNumber
        value={1234.56}
        prefix="$"
        suffix=" USD"
        thousandSeparator
        decimalSeparator=","
      />
    );
    expect(screen.getByLabelText('$1,234,56 USD')).toBeTruthy();
    expect(screen.getAllByText('$', hidden)).toHaveLength(1);
  });

  it('supports custom thousand separator string', () => {
    render(<RollingNumber value={1000000} thousandSeparator=" " />);
    expect(screen.getByLabelText('1 000 000')).toBeTruthy();
  });

  it('supports decimalScale and fixedDecimalScale', () => {
    render(<RollingNumber value={3.14159} decimalScale={2} />);
    expect(screen.getByLabelText('3.14')).toBeTruthy();
  });

  it('pads decimals with fixedDecimalScale', () => {
    render(<RollingNumber value={5} decimalScale={2} fixedDecimalScale />);
    expect(screen.getByLabelText('5.00')).toBeTruthy();
  });

  it('accepts string values', () => {
    render(<RollingNumber value="789" />);
    expect(screen.getByLabelText('789')).toBeTruthy();
  });

  it('renders null for invalid value', () => {
    const { toJSON } = render(<RollingNumber value="abc" />);
    expect(toJSON()).toBeNull();
  });

  it('animates digits when value changes', () => {
    const { rerender } = render(<RollingNumber value={10} />);
    rerender(<RollingNumber value={99} />);
    act(() => {
      jest.advanceTimersByTime(700);
    });
    expect(screen.getByLabelText('99')).toBeTruthy();
  });

  it('sets digits immediately when animationDuration is 0', () => {
    const { rerender } = render(
      <RollingNumber value={10} animationDuration={0} />
    );
    rerender(<RollingNumber value={25} animationDuration={0} />);
    expect(screen.getByLabelText('25')).toBeTruthy();
  });

  it.each(['ease', 'linear', 'ease-in', 'ease-out', 'ease-in-out'] as const)(
    'supports %s timing function',
    (timingFunction) => {
      const { rerender } = render(
        <RollingNumber value={1} timingFunction={timingFunction} />
      );
      rerender(<RollingNumber value={2} timingFunction={timingFunction} />);
      act(() => {
        jest.advanceTimersByTime(700);
      });
      expect(screen.getByLabelText('2')).toBeTruthy();
    }
  );

  it('falls back to ease for unknown timing function', () => {
    render(<RollingNumber value={7} timingFunction={'bounce' as any} />);
    expect(screen.getByLabelText('7')).toBeTruthy();
  });

  it('uses fontSize and lineHeight from textStyle', () => {
    render(
      <RollingNumber
        value={8}
        textStyle={{ fontSize: 40, lineHeight: 50, color: 'red' }}
      />
    );
    const digit = screen.getAllByText('8', hidden)[0];
    expect(digit).toHaveStyle({ fontSize: 40, lineHeight: 50, color: 'red' });
  });

  it('derives lineHeight from fontSize when not provided', () => {
    render(<RollingNumber value={8} textStyle={{ fontSize: 20 }} />);
    const digit = screen.getAllByText('8', hidden)[0];
    expect(digit).toHaveStyle({ fontSize: 20, lineHeight: 26 });
  });

  it('applies tabular numbers by default and can disable them', () => {
    const { rerender } = render(<RollingNumber value={8} />);
    expect(screen.getAllByText('8', hidden)[0]).toHaveStyle({
      fontVariant: ['tabular-nums'],
    });

    rerender(<RollingNumber value={8} tabularNumbers={false} />);
    const style = screen.getAllByText('8', hidden)[0]?.props.style;
    expect(JSON.stringify(style)).not.toContain('tabular-nums');
  });

  it('applies custom root style', () => {
    render(
      <RollingNumber value={8} style={{ marginTop: 6 }} testID="rolling" />
    );
    expect(screen.getByTestId('rolling')).toHaveStyle({ marginTop: 6 });
  });
});
