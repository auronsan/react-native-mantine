import { ImageBackground, Text as RNText } from 'react-native';
import { render as rtlRender } from '@testing-library/react-native';
import { render, screen } from '../../../__tests__/test-utils';
import { BackgroundImage } from '../index';
import { ThemeProvider } from '../../../theme/theme-provider';
import { createTheme } from '../../../theme/create-theme';

const theme = createTheme();
const source = { uri: 'https://example.com/bg.png' };

describe('BackgroundImage with theme defaults', () => {
  it('falls back to its own default radius when the theme default is null', () => {
    const customTheme = createTheme({
      components: { BackgroundImage: { defaultProps: { radius: null } } },
    } as any);
    rtlRender(
      <ThemeProvider theme={customTheme} forceMode="light">
        <BackgroundImage source={source}>
          <RNText>Themed</RNText>
        </BackgroundImage>
      </ThemeProvider>
    );
    expect(screen.getByText('Themed')).toBeTruthy();
  });
});

describe('BackgroundImage', () => {
  it('renders children over the image and passes testID through', () => {
    render(
      <BackgroundImage source={source} testID="bg">
        <RNText>Overlay text</RNText>
      </BackgroundImage>
    );

    expect(screen.getByText('Overlay text')).toBeTruthy();
    expect(screen.getByTestId('bg')).toBeTruthy();
    const background = screen.UNSAFE_getByType(ImageBackground);
    expect(background.props.source).toEqual(source);
    expect(background.props.resizeMode).toBe('cover');
  });

  it('applies theme radius when provided', () => {
    const { rerender } = render(<BackgroundImage source={source} />);
    let background = screen.UNSAFE_getByType(ImageBackground);
    expect(background.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ overflow: 'hidden' })])
    );

    rerender(<BackgroundImage source={source} radius="lg" />);
    background = screen.UNSAFE_getByType(ImageBackground);
    expect(background.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ borderRadius: theme.radius.lg }),
      ])
    );
    expect(background.props.imageStyle).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ borderRadius: theme.radius.lg }),
      ])
    );
  });

  it('merges custom style, imageStyle and other ImageBackground props', () => {
    render(
      <BackgroundImage
        source={source}
        radius={12}
        style={{ height: 100 }}
        imageStyle={{ opacity: 0.5 }}
        resizeMode="contain"
        accessibilityLabel="Background"
      />
    );

    const background = screen.UNSAFE_getByType(ImageBackground);
    expect(background.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ borderRadius: 12 }),
        expect.objectContaining({ height: 100 }),
      ])
    );
    expect(background.props.imageStyle).toEqual(
      expect.arrayContaining([expect.objectContaining({ opacity: 0.5 })])
    );
    expect(background.props.resizeMode).toBe('contain');
    expect(screen.getByLabelText('Background')).toBeTruthy();
  });
});
