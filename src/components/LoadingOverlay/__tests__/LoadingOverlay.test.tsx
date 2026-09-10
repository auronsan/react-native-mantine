import { ActivityIndicator } from 'react-native';
import { render, screen } from '../../../__tests__/test-utils';
import { LoadingOverlay } from '../index';
import { Overlay } from '../../Overlay';

describe('LoadingOverlay', () => {
  it('renders nothing when not visible', () => {
    render(<LoadingOverlay visible={false} testID="overlay" />);
    expect(screen.queryByTestId('overlay')).toBeNull();
    expect(screen.UNSAFE_queryByType(ActivityIndicator)).toBeNull();
  });

  it('renders an overlay with a centered loader when visible and passes testID through', () => {
    render(<LoadingOverlay visible testID="overlay" />);

    expect(screen.getByTestId('overlay')).toHaveStyle({
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    });
    const overlay = screen.UNSAFE_getByType(Overlay);
    expect(overlay.props.opacity).toBe(0.75);
    expect(overlay.props.color).toBe('#fff');
    expect(overlay.props.zIndex).toBe(1000);
    expect(screen.UNSAFE_getByType(ActivityIndicator).props.size).toBe(36);
  });

  it('forwards overlay options and loader size', () => {
    render(
      <LoadingOverlay
        visible
        overlayOpacity={0.2}
        overlayColor="#000"
        overlayBlur={2}
        radius="md"
        zIndex={7}
        loaderSize="xl"
        transitionDuration={0}
        style={{ margin: 1 }}
        testID="overlay"
      />
    );

    const overlay = screen.UNSAFE_getByType(Overlay);
    expect(overlay.props.opacity).toBe(0.2);
    expect(overlay.props.color).toBe('#000');
    expect(overlay.props.blur).toBe(2);
    expect(overlay.props.radius).toBe('md');
    expect(overlay.props.zIndex).toBe(7);
    expect(screen.UNSAFE_getByType(ActivityIndicator).props.size).toBe(58);
    expect(screen.getByTestId('overlay')).toHaveStyle({ margin: 1 });
  });
});
