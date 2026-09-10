import { Text as RNText, View } from 'react-native';
import { render, screen, fireEvent } from '../../../__tests__/test-utils';
import { Alert } from '../index';

describe('Alert', () => {
  it('renders message with default props and passes testID through', () => {
    render(<Alert testID="alert">Something happened</Alert>);

    const alert = screen.getByTestId('alert');
    expect(alert).toBeTruthy();
    expect(alert.props.accessibilityRole).toBe('alert');
    expect(screen.getByText('Something happened')).toBeTruthy();
  });

  it('renders title and icon', () => {
    render(
      <Alert title="Heads up" icon={<View testID="alert-icon" />}>
        Body
      </Alert>
    );

    expect(screen.getByText('Heads up')).toBeTruthy();
    expect(screen.getByTestId('alert-icon')).toBeTruthy();
    expect(screen.getByText('Body')).toBeTruthy();
  });

  it('renders every variant with different colors and radius', () => {
    (['filled', 'outline', 'light'] as const).forEach((variant) => {
      const { unmount } = render(
        <Alert variant={variant} color="red" radius="lg" testID={variant}>
          {variant}
        </Alert>
      );
      expect(screen.getByTestId(variant)).toHaveStyle({ borderWidth: 1 });
      unmount();
    });

    render(
      <Alert variant={'unknown' as any} radius={4} testID="unknown">
        unknown
      </Alert>
    );
    expect(screen.getByTestId('unknown')).toHaveStyle({ borderRadius: 4 });
  });

  it('shows the close button only when withCloseButton and onClose are set', () => {
    const onClose = jest.fn();
    const { rerender } = render(
      <Alert withCloseButton onClose={onClose}>
        Closable
      </Alert>
    );

    const close = screen.getByLabelText('Close alert');
    expect(close.props.accessibilityRole).toBe('button');
    fireEvent.press(close);
    expect(onClose).toHaveBeenCalledTimes(1);

    rerender(<Alert withCloseButton>Not closable</Alert>);
    expect(screen.queryByLabelText('Close alert')).toBeNull();

    rerender(<Alert onClose={onClose}>Not closable either</Alert>);
    expect(screen.queryByLabelText('Close alert')).toBeNull();
  });

  it('uses a custom close button label', () => {
    render(
      <Alert withCloseButton onClose={() => {}} closeButtonLabel="Dismiss">
        Body
      </Alert>
    );
    expect(screen.getByLabelText('Dismiss')).toBeTruthy();
  });

  it('applies a custom accessibility label', () => {
    render(<Alert accessibilityLabel="Error alert">Body</Alert>);
    expect(screen.getByLabelText('Error alert')).toBeTruthy();
  });

  it('renders raw nodes when withTextWrapper is false', () => {
    render(
      <Alert withTextWrapper={false} title={<RNText>Node title</RNText>}>
        <RNText>Node body</RNText>
      </Alert>
    );

    expect(screen.getByText('Node title')).toBeTruthy();
    expect(screen.getByText('Node body')).toBeTruthy();
  });

  it('applies custom style', () => {
    render(
      <Alert style={{ marginTop: 8 }} testID="alert">
        Body
      </Alert>
    );
    expect(screen.getByTestId('alert')).toHaveStyle({ marginTop: 8 });
  });
});
