import { Text as RNText, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { render, screen, fireEvent, act } from '../../../__tests__/test-utils';
import { HoverCard } from '../index';
import { Popover } from '../../Popover';

function Example(props: Partial<React.ComponentProps<typeof HoverCard>>) {
  return (
    <HoverCard {...props}>
      <HoverCard.Target>
        <TouchableOpacity testID="target">
          <RNText>Target</RNText>
        </TouchableOpacity>
      </HoverCard.Target>
      <HoverCard.Dropdown>
        <RNText>Details</RNText>
      </HoverCard.Dropdown>
    </HoverCard>
  );
}

describe('HoverCard', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('re-exports Popover sub-components', () => {
    expect(HoverCard.Target).toBe(Popover.Target);
    expect(HoverCard.Dropdown).toBe(Popover.Dropdown);
  });

  it('opens immediately on press with the default openDelay and reports changes', () => {
    const onChange = jest.fn();
    render(<Example onChange={onChange} />);

    const target = screen.getByTestId('target');
    expect(target.props.accessibilityRole).toBe('button');
    expect(target.props.accessibilityState).toEqual({ expanded: false });
    expect(screen.queryByText('Details')).toBeNull();

    fireEvent.press(target);
    expect(screen.getByText('Details')).toBeTruthy();
    expect(onChange).toHaveBeenCalledWith(true);
    expect(screen.getByTestId('target').props.accessibilityState).toEqual({
      expanded: true,
    });
  });

  it('closes after closeDelay when the backdrop is pressed', () => {
    const onChange = jest.fn();
    render(<Example onChange={onChange} closeDelay={150} />);

    fireEvent.press(screen.getByTestId('target'));
    fireEvent.press(screen.UNSAFE_getByType(TouchableWithoutFeedback));
    expect(screen.getByText('Details')).toBeTruthy();

    act(() => {
      jest.advanceTimersByTime(149);
    });
    expect(screen.getByText('Details')).toBeTruthy();

    act(() => {
      jest.advanceTimersByTime(1);
    });
    expect(screen.queryByText('Details')).toBeNull();
    expect(onChange).toHaveBeenLastCalledWith(false);
  });

  it('waits for openDelay and cancels a pending change on a new one', () => {
    const onChange = jest.fn();
    render(<Example onChange={onChange} openDelay={100} closeDelay={0} />);

    fireEvent.press(screen.getByTestId('target'));
    expect(screen.queryByText('Details')).toBeNull();

    // A second press restarts the timer
    act(() => {
      jest.advanceTimersByTime(50);
    });
    fireEvent.press(screen.getByTestId('target'));
    act(() => {
      jest.advanceTimersByTime(60);
    });
    expect(screen.queryByText('Details')).toBeNull();

    act(() => {
      jest.advanceTimersByTime(40);
    });
    expect(screen.getByText('Details')).toBeTruthy();
    expect(onChange).toHaveBeenCalledTimes(1);

    // Instant close
    fireEvent.press(screen.UNSAFE_getByType(TouchableWithoutFeedback));
    expect(screen.queryByText('Details')).toBeNull();
  });

  it('supports initiallyOpened and clears timers on unmount', () => {
    const { unmount } = render(<Example initiallyOpened closeDelay={500} />);
    expect(screen.getByText('Details')).toBeTruthy();

    fireEvent.press(screen.UNSAFE_getByType(TouchableWithoutFeedback));
    unmount();
    expect(() => jest.runOnlyPendingTimers()).not.toThrow();
  });
});
