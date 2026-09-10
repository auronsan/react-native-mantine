import { Image, View } from 'react-native';
import { render, screen, fireEvent } from '../../../__tests__/test-utils';
import { Avatar } from '../index';
import { createTheme } from '../../../theme/create-theme';

const theme = createTheme();

describe('Avatar', () => {
  it('renders an image when src is provided and passes testID through', () => {
    render(
      <Avatar src="https://example.com/a.png" alt="John Doe" testID="avatar" />
    );

    expect(screen.getByTestId('avatar')).toBeTruthy();
    const image = screen.UNSAFE_getByType(Image);
    expect(image.props.source).toEqual({ uri: 'https://example.com/a.png' });
    expect(screen.queryByText('JD')).toBeNull();
  });

  it('falls back to initials when the image fails to load', () => {
    render(<Avatar src="https://example.com/a.png" alt="John Doe" />);

    fireEvent(screen.UNSAFE_getByType(Image), 'error');
    expect(screen.getByText('JD')).toBeTruthy();
    expect(screen.UNSAFE_queryByType(Image)).toBeNull();
  });

  it('renders initials from alt when there is no src', () => {
    const { rerender } = render(<Avatar alt="Jane Smith" />);
    expect(screen.getByText('JS')).toBeTruthy();

    rerender(<Avatar alt="Madonna" />);
    expect(screen.getByText('MA')).toBeTruthy();

    rerender(<Avatar alt="  Ada   Lovelace  " />);
    expect(screen.getByText('AL')).toBeTruthy();

    rerender(<Avatar alt="" />);
    expect(screen.queryByText('AL')).toBeNull();
  });

  it('renders a custom placeholder from children', () => {
    render(
      <Avatar alt="Ignored Name" src={null}>
        <View testID="custom-placeholder" />
      </Avatar>
    );

    expect(screen.getByTestId('custom-placeholder')).toBeTruthy();
    expect(screen.queryByText('IN')).toBeNull();
  });

  it('renders nothing inside when no src, alt or children are given', () => {
    render(<Avatar testID="avatar" />);
    expect(screen.getByTestId('avatar').props.children).toBeNull();
  });

  it('applies named and numeric sizes', () => {
    (['xs', 'sm', 'md', 'lg', 'xl'] as const).forEach((size) => {
      const { unmount } = render(<Avatar size={size} testID={size} />);
      expect(screen.getByTestId(size)).toBeTruthy();
      unmount();
    });

    render(<Avatar size={80} alt="Big One" testID="numeric" />);
    expect(screen.getByTestId('numeric')).toHaveStyle({ width: 80, height: 80 });
    expect(screen.getByText('BO')).toHaveStyle({ fontSize: 32 });

    render(<Avatar size={'unknown' as any} testID="fallback" />);
    expect(screen.getByTestId('fallback')).toHaveStyle({ width: 38 });
  });

  it('applies color, radius and custom style', () => {
    render(
      <Avatar color="red" radius={4} style={{ margin: 1 }} testID="avatar" />
    );

    expect(screen.getByTestId('avatar')).toHaveStyle({
      backgroundColor: theme.colors.red![6],
      borderRadius: 4,
      margin: 1,
    });
  });

  it('passes imageProps to the underlying Image', () => {
    render(
      <Avatar
        src="https://example.com/a.png"
        imageProps={{ testID: 'inner-image', resizeMode: 'contain' }}
      />
    );

    expect(screen.getByTestId('inner-image').props.resizeMode).toBe('contain');
  });
});
