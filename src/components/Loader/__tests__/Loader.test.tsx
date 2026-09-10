import { ActivityIndicator } from 'react-native';
import { render, screen } from '../../../__tests__/test-utils';
import { Loader } from '../index';
import { createTheme } from '../../../theme/create-theme';

const theme = createTheme();

describe('Loader', () => {
  it('renders an ActivityIndicator with md size and primary color by default', () => {
    render(<Loader />);

    const indicator = screen.UNSAFE_getByType(ActivityIndicator);
    expect(indicator.props.size).toBe(36);
    expect(indicator.props.color).toBe(
      theme.fn.variant({ variant: 'filled', primaryFallback: false, color: theme.primaryColor })
        .background
    );
  });

  it('renders every named size and a numeric size', () => {
    const expected = { xs: 18, sm: 22, md: 36, lg: 44, xl: 58 };
    (Object.keys(expected) as Array<keyof typeof expected>).forEach((size) => {
      const { unmount } = render(<Loader size={size} />);
      expect(screen.UNSAFE_getByType(ActivityIndicator).props.size).toBe(expected[size]);
      unmount();
    });

    render(<Loader size={50} />);
    expect(screen.UNSAFE_getByType(ActivityIndicator).props.size).toBe(50);
  });

  it('uses a theme color when provided', () => {
    render(<Loader color="red" />);
    expect(screen.UNSAFE_getByType(ActivityIndicator).props.color).toBe(
      theme.fn.variant({ variant: 'filled', primaryFallback: false, color: 'red' }).background
    );
  });

  it('passes extra props through and accepts a variant', () => {
    render(<Loader variant="dots" {...({ testID: 'loader' } as any)} />);
    expect(screen.getByTestId('loader')).toBeTruthy();
  });
});
