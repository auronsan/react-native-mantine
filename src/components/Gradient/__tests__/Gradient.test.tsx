import { Text as RNText, View } from 'react-native';
import { render, screen } from '../../../__tests__/test-utils';
import { Gradient, GradientFallback } from '../index';
import { createTheme } from '../../../theme/create-theme';

const theme = createTheme();
const { LinearGradient } = require('expo-linear-gradient');

describe('Gradient', () => {
  it('renders children inside a linear gradient with theme colors', () => {
    render(
      <Gradient gradient={{ from: 'red', to: 'blue', deg: 90 }}>
        <RNText>Inside</RNText>
      </Gradient>
    );

    expect(screen.getByText('Inside')).toBeTruthy();
    const gradient = screen.UNSAFE_getByType(LinearGradient);
    expect(gradient.props.colors).toEqual([theme.colors.red![6], theme.colors.blue![6]]);
    expect(gradient.props.start.x).toBeCloseTo(0);
    expect(gradient.props.end.x).toBeCloseTo(1);
    expect(gradient.props.style).toEqual(expect.objectContaining({ flex: 1 }));
  });

  it('uses the theme default gradient when none is provided', () => {
    render(<Gradient />);
    const gradient = screen.UNSAFE_getByType(LinearGradient);
    expect(gradient.props.colors).toHaveLength(2);
  });

  it('does not fill when fill is false and merges style', () => {
    render(<Gradient fill={false} style={{ height: 40 }} />);
    const gradient = screen.UNSAFE_getByType(LinearGradient);
    expect(gradient.props.style).toEqual({ height: 40 });
  });
});

describe('GradientFallback', () => {
  it('renders a solid background with the from color', () => {
    render(
      <GradientFallback gradient={{ from: 'green', to: 'teal' }} style={{ height: 10 }}>
        <View testID="child" />
      </GradientFallback>
    );

    expect(screen.getByTestId('child')).toBeTruthy();
    // host child -> composite View -> host wrapper View
    expect(screen.getByTestId('child').parent?.parent).toHaveStyle({
      backgroundColor: theme.colors.green![6],
      height: 10,
    });
  });
});
