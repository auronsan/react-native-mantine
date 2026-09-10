import { View } from 'react-native';
import { render as rtlRender } from '@testing-library/react-native';
import { render, screen, fireEvent } from '../../../__tests__/test-utils';
import { CloseButton } from '../index';
import { ThemeProvider } from '../../../theme/theme-provider';
import { createTheme } from '../../../theme/create-theme';

describe('CloseButton in dark mode and with theme defaults', () => {
  it('renders with dark color scheme colors', () => {
    rtlRender(
      <ThemeProvider theme={createTheme()} forceMode="dark">
        <CloseButton testID="close" />
      </ThemeProvider>
    );
    expect(screen.getByTestId('close')).toBeTruthy();
  });

  it('falls back to its own defaults when theme defaultProps are null', () => {
    const customTheme = createTheme({
      components: {
        CloseButton: { defaultProps: { radius: null, disabled: null } },
      },
    } as any);
    rtlRender(
      <ThemeProvider theme={customTheme} forceMode="light">
        <CloseButton testID="close" />
      </ThemeProvider>
    );

    expect(screen.getByTestId('close')).toHaveStyle({
      opacity: 1,
      borderRadius: customTheme.radius.sm,
    });
  });
});

describe('CloseButton', () => {
  it('renders with default accessibility label, button role and testID', () => {
    render(<CloseButton testID="close" />);

    const button = screen.getByTestId('close');
    expect(button.props.accessibilityRole).toBe('button');
    expect(button.props.accessibilityLabel).toBe('Close');
    expect(button.props.accessible).toBe(true);
    expect(screen.getByRole('button', { name: 'Close' })).toBeTruthy();
    expect(button).toHaveStyle({ width: 28, height: 28 });
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    render(<CloseButton onPress={onPress} testID="close" />);

    fireEvent.press(screen.getByTestId('close'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled and dims the button', () => {
    const onPress = jest.fn();
    render(<CloseButton onPress={onPress} disabled testID="close" />);

    const button = screen.getByTestId('close');
    fireEvent.press(button);
    expect(onPress).not.toHaveBeenCalled();
    expect(button).toBeDisabled();
    expect(button).toHaveStyle({ opacity: 0.4 });
  });

  it('supports a custom accessibility label, icon and icon color', () => {
    render(
      <CloseButton
        accessibilityLabel="Dismiss"
        icon={<View testID="custom-icon" />}
        iconColor="#123456"
      />
    );

    expect(screen.getByLabelText('Dismiss')).toBeTruthy();
    expect(screen.getByTestId('custom-icon')).toBeTruthy();
  });

  it('renders every named size, a numeric size and radius', () => {
    (['xs', 'sm', 'md', 'lg', 'xl'] as const).forEach((size) => {
      const { unmount } = render(
        <CloseButton size={size} radius="xl" testID={size} />
      );
      expect(screen.getByTestId(size)).toBeTruthy();
      unmount();
    });

    render(<CloseButton size={40} iconColor="red" testID="numeric" />);
    expect(screen.getByTestId('numeric')).toHaveStyle({ width: 40, height: 40 });
  });

  it('applies custom style', () => {
    render(<CloseButton style={{ margin: 8 }} testID="close" />);
    expect(screen.getByTestId('close')).toHaveStyle({ margin: 8 });
  });
});
