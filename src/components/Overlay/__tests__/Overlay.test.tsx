import { Text } from 'react-native';
import {
  render,
  screen,
  fireEvent,
  render as rtlRender,
} from '../../../__tests__/test-utils';
import { ThemeProvider } from '../../../theme/theme-provider';
import { Overlay } from '../index';
import { createTheme } from '../../../theme/create-theme';

const theme = createTheme();

describe('Overlay', () => {
  it('renders with default props', () => {
    render(<Overlay testID="overlay" />);
    const overlay = screen.getByTestId('overlay');
    expect(overlay).toHaveStyle({
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: '#000',
      opacity: 0.6,
      zIndex: 1000,
      borderRadius: theme.fn.radius(0),
    });
  });

  it('renders children', () => {
    render(
      <Overlay testID="overlay">
        <Text>Inside</Text>
      </Overlay>
    );
    expect(screen.getByText('Inside')).toBeTruthy();
  });

  it('applies custom opacity, color and zIndex', () => {
    render(<Overlay testID="overlay" opacity={0.2} color="#fff" zIndex={5} />);
    expect(screen.getByTestId('overlay')).toHaveStyle({
      opacity: 0.2,
      backgroundColor: '#fff',
      zIndex: 5,
    });
  });

  it.each(['xs', 'sm', 'md', 'lg', 'xl'] as const)(
    'applies theme radius %s',
    (radius) => {
      render(<Overlay testID="overlay" radius={radius} />);
      expect(screen.getByTestId('overlay')).toHaveStyle({
        borderRadius: theme.fn.radius(radius),
      });
    }
  );

  it('applies numeric radius', () => {
    render(<Overlay testID="overlay" radius={8} />);
    expect(screen.getByTestId('overlay')).toHaveStyle({
      borderRadius: theme.fn.radius(8),
    });
  });

  it('keeps absolute position when fixed', () => {
    render(<Overlay testID="overlay" fixed />);
    expect(screen.getByTestId('overlay')).toHaveStyle({ position: 'absolute' });
  });

  it('merges custom style', () => {
    render(<Overlay testID="overlay" style={{ margin: 3 }} />);
    expect(screen.getByTestId('overlay')).toHaveStyle({ margin: 3 });
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    render(<Overlay testID="overlay" onPress={onPress} />);
    fireEvent.press(screen.getByTestId('overlay'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('is not pressable without onPress', () => {
    render(<Overlay testID="overlay" />);
    expect(() => fireEvent.press(screen.getByTestId('overlay'))).not.toThrow();
  });

  it('passes accessibility props through', () => {
    render(
      <Overlay
        testID="overlay"
        accessibilityLabel="Backdrop"
        accessibilityRole="none"
      />
    );
    const overlay = screen.getByLabelText('Backdrop');
    expect(overlay.props.accessibilityRole).toBe('none');
  });

  it('uses button role and Dismiss label by default when pressable', () => {
    render(<Overlay testID="overlay" onPress={() => {}} />);
    const overlay = screen.getByLabelText('Dismiss');
    expect(overlay.props.accessibilityRole).toBe('button');
  });

  it('keeps explicit accessibility role and label when pressable', () => {
    const onPress = jest.fn();
    render(
      <Overlay
        testID="overlay"
        onPress={onPress}
        accessibilityRole="none"
        accessibilityLabel="Close backdrop"
        accessibilityHint="Closes the dialog"
      >
        <Text>Inside</Text>
      </Overlay>
    );
    const overlay = screen.getByLabelText('Close backdrop');
    expect(overlay.props.accessibilityRole).toBe('none');
    expect(overlay.props.accessibilityHint).toBe('Closes the dialog');
    expect(screen.queryByLabelText('Dismiss')).toBeNull();
    fireEvent.press(overlay);
    expect(onPress).toHaveBeenCalledTimes(1);
    expect(screen.getByText('Inside')).toBeTruthy();
  });

  it('falls back to built-in defaults when theme defaultProps are null', () => {
    const nullTheme = createTheme({
      components: {
        Overlay: {
          defaultProps: {
            opacity: null,
            color: null,
            zIndex: null,
            radius: null,
            fixed: null,
          },
        },
      },
    } as never);

    rtlRender(
      <ThemeProvider theme={nullTheme} forceMode="light">
        <Overlay testID="overlay" />
      </ThemeProvider>,
      { wrapper: undefined }
    );

    expect(screen.getByTestId('overlay')).toHaveStyle({
      backgroundColor: '#000',
      opacity: 0.6,
      zIndex: 1000,
      borderRadius: theme.fn.radius(0),
    });
  });
});
