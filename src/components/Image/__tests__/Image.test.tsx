import { ActivityIndicator, Image as RNImage, Text as RNText, View } from 'react-native';
import { render, screen, fireEvent } from '../../../__tests__/test-utils';
import { Image } from '../index';
import { createTheme } from '../../../theme/create-theme';

const theme = createTheme();
const source = { uri: 'https://example.com/photo.png' };

describe('Image', () => {
  it('renders the image with a loading indicator until it loads', () => {
    const onLoad = jest.fn();
    render(<Image source={source} onLoad={onLoad} />);

    const image = screen.UNSAFE_getByType(RNImage);
    expect(image.props.source).toEqual(source);
    expect(screen.UNSAFE_getByType(ActivityIndicator)).toBeTruthy();

    fireEvent(image, 'load');
    expect(onLoad).toHaveBeenCalledTimes(1);
    expect(screen.UNSAFE_queryByType(ActivityIndicator)).toBeNull();
  });

  it('renders a custom placeholder while loading', () => {
    render(<Image source={source} placeholder={<View testID="placeholder" />} />);
    expect(screen.getByTestId('placeholder')).toBeTruthy();
    expect(screen.UNSAFE_queryByType(ActivityIndicator)).toBeNull();
  });

  it('shows the default error message when loading fails', () => {
    const onError = jest.fn();
    render(<Image source={source} onError={onError} />);

    fireEvent(screen.UNSAFE_getByType(RNImage), 'error', { nativeEvent: { error: 'x' } });
    expect(onError).toHaveBeenCalledTimes(1);
    expect(screen.getByText('Failed to load image')).toBeTruthy();
    expect(screen.UNSAFE_queryByType(ActivityIndicator)).toBeNull();
  });

  it('supports a custom error message and error placeholder', () => {
    const { rerender } = render(<Image source={source} errorMessage="Broken" />);
    fireEvent(screen.UNSAFE_getByType(RNImage), 'error');
    expect(screen.getByText('Broken')).toBeTruthy();

    rerender(<Image source={source} errorPlaceholder={<RNText>Custom error</RNText>} />);
    expect(screen.getByText('Custom error')).toBeTruthy();
    expect(screen.queryByText('Broken')).toBeNull();
  });

  it('applies width, height, radius and fit', () => {
    render(<Image source={source} width={120} height={80} radius="md" fit="scale-down" />);

    const image = screen.UNSAFE_getByType(RNImage);
    expect(image.props.style).toEqual(
      expect.objectContaining({ resizeMode: 'contain', borderRadius: theme.radius.md })
    );
    expect(image.parent?.parent).toBeTruthy();
  });

  it('uses default dimensions and cover fit', () => {
    render(<Image source={source} />);
    expect(screen.UNSAFE_getByType(RNImage).props.style).toEqual(
      expect.objectContaining({ resizeMode: 'cover' })
    );
  });

  it('exposes alt text to accessibility', () => {
    const { rerender } = render(<Image source={source} alt="A photo" />);
    const image = screen.UNSAFE_getByType(RNImage);
    expect(image.props.accessible).toBe(true);
    expect(image.props.accessibilityLabel).toBe('A photo');

    rerender(<Image source={source} />);
    expect(screen.UNSAFE_getByType(RNImage).props.accessibilityLabel).toBeUndefined();
  });

  it('accepts a custom style', () => {
    render(<Image source={source} style={{ margin: 3 }} testID="image" />);
    expect(screen.getByTestId('image')).toHaveStyle({ margin: 3 });
  });

  it('forwards testID and other props to the root', () => {
    render(<Image source={source} testID="image" accessibilityHint="Photo" alt="Alt" />);

    const root = screen.getByTestId('image');
    expect(root.props.accessibilityRole).toBe('image');
    expect(root.props.accessibilityLabel).toBe('Alt');
    expect(root.props.accessibilityHint).toBe('Photo');
    expect(root.props.accessibilityState).toEqual({ busy: true });
  });

  it('uses a 0 border radius by default instead of the theme default', () => {
    render(<Image source={source} testID="image" />);
    expect(screen.getByTestId('image')).toHaveStyle({ borderRadius: 0 });
    expect(screen.UNSAFE_getByType(RNImage).props.style).toEqual(
      expect.objectContaining({ borderRadius: 0 })
    );
  });
});
