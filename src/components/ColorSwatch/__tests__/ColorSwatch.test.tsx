import { View } from 'react-native';
import { render, screen, fireEvent } from '../../../__tests__/test-utils';
import { ColorSwatch } from '../index';
import { createTheme } from '../../../theme/create-theme';

const theme = createTheme();

describe('ColorSwatch', () => {
  it('renders with color, default size, radius and shadow, and passes testID through', () => {
    render(<ColorSwatch color="#ff0000" testID="swatch" />);

    expect(screen.getByTestId('swatch')).toHaveStyle({
      backgroundColor: '#ff0000',
      width: 25,
      height: 25,
      borderRadius: theme.radius.xl,
      shadowOpacity: 0.1,
    });
  });

  it('supports custom size, radius and no shadow', () => {
    render(
      <ColorSwatch color="#00ff00" size={40} radius={4} withShadow={false} testID="swatch" />
    );

    const swatch = screen.getByTestId('swatch');
    expect(swatch).toHaveStyle({ width: 40, height: 40, borderRadius: 4 });
    expect(swatch.props.style.flat().some((s: any) => s && s.shadowOpacity)).toBe(false);
  });

  it('renders children in an overlay', () => {
    render(
      <ColorSwatch color="#0000ff">
        <View testID="check" />
      </ColorSwatch>
    );
    expect(screen.getByTestId('check')).toBeTruthy();
  });

  it('becomes pressable when onPress is provided', () => {
    const onPress = jest.fn();
    render(<ColorSwatch color="#0000ff" onPress={onPress} testID="swatch" />);

    fireEvent.press(screen.getByTestId('swatch'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('applies custom style', () => {
    render(<ColorSwatch color="#000" style={{ margin: 2 }} testID="swatch" />);
    expect(screen.getByTestId('swatch')).toHaveStyle({ margin: 2 });
  });
});
