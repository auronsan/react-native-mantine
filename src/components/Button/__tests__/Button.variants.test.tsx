import { ActivityIndicator, Text as RNText, View } from 'react-native';
import { render, screen, fireEvent } from '../../../__tests__/test-utils';
import { Button } from '../index';

const { LinearGradient } = require('expo-linear-gradient');

describe('Button variants and loading states', () => {
  it('renders the gradient variant inside a linear gradient', () => {
    const onPress = jest.fn();
    render(
      <Button
        variant="gradient"
        gradient={{ from: 'blue', to: 'cyan', deg: 45 }}
        onPress={onPress}
        radius="xl"
        style={{ margin: 2 }}
        testID="button"
      >
        Gradient
      </Button>
    );

    expect(screen.getByText('Gradient')).toBeTruthy();
    const gradient = screen.UNSAFE_getByType(LinearGradient);
    expect(gradient.props.colors).toHaveLength(2);
    fireEvent.press(screen.getByTestId('button'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('disables the gradient variant while loading', () => {
    const onPress = jest.fn();
    render(
      <Button variant="gradient" loading onPress={onPress} testID="button">
        Gradient
      </Button>
    );

    const button = screen.getByTestId('button');
    fireEvent.press(button);
    expect(onPress).not.toHaveBeenCalled();
    expect(button.props.accessibilityState).toEqual(
      expect.objectContaining({ disabled: true, busy: true })
    );
  });

  it('renders every remaining variant and an unknown variant', () => {
    (['outline', 'light', 'white', 'default', 'subtle', 'unknown'] as const).forEach(
      (variant) => {
        const { unmount } = render(
          <Button variant={variant as any} testID={variant}>
            {variant}
          </Button>
        );
        expect(screen.getByTestId(variant)).toBeTruthy();
        unmount();
      }
    );
  });

  it('renders xl, compact and unknown sizes', () => {
    const { rerender } = render(
      <Button size="xl" compact fullWidth uppercase testID="button">
        Big
      </Button>
    );
    expect(screen.getByTestId('button')).toBeTruthy();

    rerender(
      <Button size={'giant' as any} testID="button">
        Unknown
      </Button>
    );
    expect(screen.getByTestId('button')).toBeTruthy();
  });

  it('places the loader on the left, center or right', () => {
    const { rerender } = render(
      <Button loading loaderPosition="left" leftIcon={<View testID="left-icon" />}>
        Left
      </Button>
    );
    expect(screen.UNSAFE_getAllByType(ActivityIndicator)).toHaveLength(1);
    expect(screen.queryByTestId('left-icon')).toBeNull();

    rerender(
      <Button loading loaderPosition="center">
        Center
      </Button>
    );
    expect(screen.UNSAFE_getAllByType(ActivityIndicator)).toHaveLength(1);

    rerender(
      <Button loading loaderPosition="right" rightIcon={<View testID="right-icon" />}>
        Right
      </Button>
    );
    expect(screen.UNSAFE_getAllByType(ActivityIndicator)).toHaveLength(1);
    expect(screen.queryByTestId('right-icon')).toBeNull();
  });

  it('renders raw children when withTextWrapper is false', () => {
    render(
      <Button withTextWrapper={false} type="submit" loaderProps={{ size: 'xs' }}>
        <RNText>Raw label</RNText>
      </Button>
    );
    expect(screen.getByText('Raw label')).toBeTruthy();
  });
});
