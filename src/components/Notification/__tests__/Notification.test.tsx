import { ActivityIndicator, Text, View } from 'react-native';
import { render, screen, fireEvent } from '../../../__tests__/test-utils';
import { Notification } from '../index';
import { createTheme } from '../../../theme/create-theme';
import { ThemeProvider } from '../../../theme/theme-provider';

const theme = createTheme();

describe('Notification', () => {
  it('renders with default props', () => {
    render(<Notification testID="notification" />);
    expect(screen.getByTestId('notification')).toBeTruthy();
  });

  it('renders title and message', () => {
    render(<Notification title="Saved" message="Your changes were saved" />);
    expect(screen.getByText('Saved')).toBeTruthy();
    expect(screen.getByText('Your changes were saved')).toBeTruthy();
  });

  it('applies title and message styles to the wrapping Text', () => {
    render(<Notification title="Saved" message="Your changes were saved" />);
    expect(screen.getByText('Saved')).toHaveStyle({
      fontSize: theme.fontSizes.sm,
      fontWeight: '600',
      color: theme.black,
    });
    expect(screen.getByText('Your changes were saved')).toHaveStyle({
      fontSize: theme.fontSizes.sm,
      color: theme.fn.themeColor('gray', 6),
    });
  });

  it('renders children as the message when message is not provided', () => {
    render(<Notification title="Saved">Rendered from children</Notification>);
    expect(screen.getByText('Rendered from children')).toBeTruthy();
    expect(screen.getByText('Rendered from children')).toHaveStyle({
      color: theme.fn.themeColor('gray', 6),
    });
  });

  it('prefers message over children when both are provided', () => {
    render(
      <Notification title="Saved" message="From message">
        From children
      </Notification>
    );
    expect(screen.getByText('From message')).toBeTruthy();
    expect(screen.queryByText('From children')).toBeNull();
  });

  it('renders icon on the left', () => {
    render(
      <Notification
        title="With icon"
        icon={<View testID="icon" />}
        testID="notification"
      />
    );
    expect(screen.getByTestId('icon')).toBeTruthy();
  });

  it('shows close button only when withCloseButton and onClose are set', () => {
    const onClose = jest.fn();
    const { rerender } = render(
      <Notification title="Closable" onClose={onClose} />
    );
    fireEvent.press(screen.getByText('×'));
    expect(onClose).toHaveBeenCalledTimes(1);

    rerender(
      <Notification
        title="Closable"
        onClose={onClose}
        withCloseButton={false}
      />
    );
    expect(screen.queryByText('×')).toBeNull();

    rerender(<Notification title="No handler" />);
    expect(screen.queryByText('×')).toBeNull();
  });

  it('applies border with the notification color', () => {
    render(<Notification title="Bordered" color="red" testID="notification" />);
    expect(screen.getByTestId('notification')).toHaveStyle({
      borderWidth: 1,
      borderLeftColor: theme.colors.red![6],
    });
  });

  it('renders without border when withBorder is false', () => {
    render(
      <Notification title="Flat" withBorder={false} testID="notification" />
    );
    const root = screen.getByTestId('notification');
    expect(root).not.toHaveStyle({ borderWidth: 1 });
  });

  it('supports radius values', () => {
    const { rerender } = render(
      <Notification title="Radius" radius="xl" testID="notification" />
    );
    expect(screen.getByTestId('notification')).toHaveStyle({
      borderRadius: theme.radius.xl,
    });

    rerender(<Notification title="Radius" radius={3} testID="notification" />);
    expect(screen.getByTestId('notification')).toHaveStyle({
      borderRadius: 3,
    });
  });

  it('renders a loader instead of the icon when loading', () => {
    render(
      <Notification
        title="Saving"
        loading
        icon={<View testID="icon" />}
        testID="notification"
      />
    );
    expect(screen.getByTestId('notification').props.accessibilityState).toEqual(
      { busy: true }
    );
    expect(screen.UNSAFE_getByType(ActivityIndicator)).toBeTruthy();
    expect(screen.getByLabelText('Loading')).toBeTruthy();
    expect(screen.queryByTestId('icon')).toBeNull();
  });

  it('does not render a loader when not loading', () => {
    render(
      <Notification title="Idle" icon={<View testID="icon" />} testID="notification" />
    );
    expect(screen.getByTestId('notification').props.accessibilityState).toEqual(
      { busy: false }
    );
    expect(screen.UNSAFE_queryByType(ActivityIndicator)).toBeNull();
    expect(screen.getByTestId('icon')).toBeTruthy();
  });

  it('merges custom style', () => {
    render(
      <Notification
        title="Styled"
        style={{ marginTop: 9 }}
        testID="notification"
      />
    );
    expect(screen.getByTestId('notification')).toHaveStyle({ marginTop: 9 });
  });

  it('renders element title and message without a Text wrapper', () => {
    render(
      <Notification
        withTextWrapper={false}
        title={<Text testID="custom-title">Custom title</Text>}
        message={<Text testID="custom-message">Custom message</Text>}
      />
    );
    expect(screen.getByTestId('custom-title')).toBeTruthy();
    expect(screen.getByTestId('custom-message')).toBeTruthy();
    expect(screen.getByText('Custom title')).toBeTruthy();
  });

  it('passes accessibility props through to the root', () => {
    render(
      <Notification
        title="A11y"
        accessibilityLabel="Notification"
        accessibilityRole="alert"
        testID="notification"
      />
    );
    expect(screen.getByLabelText('Notification')).toBeTruthy();
    expect(screen.getByTestId('notification').props.accessibilityRole).toBe(
      'alert'
    );
  });

  it('renders dark color scheme styles', () => {
    render(
      <ThemeProvider theme={theme} forceMode="dark">
        <Notification
          title="Dark"
          message="Dark message"
          onClose={() => {}}
          testID="notification"
        />
      </ThemeProvider>
    );
    expect(screen.getByTestId('notification')).toHaveStyle({
      backgroundColor: theme.colors.dark![6],
      borderColor: theme.colors.dark![4],
    });
    expect(screen.getByText('Dark message')).toBeTruthy();
    expect(screen.getByText('×')).toBeTruthy();
  });

  it('has a displayName', () => {
    expect(Notification.displayName).toBe('Notification');
  });
});
