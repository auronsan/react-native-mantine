import { View } from 'react-native';
import { render, screen } from '@testing-library/react-native';
import { RingProgress } from '..';
import { ThemeProvider } from '../../../theme/theme-provider';
import { createTheme } from '../../../theme/create-theme';
import { resetAdapters } from '../../../adapters';

const theme = createTheme();

const Svg = ({ children, ...props }: any) => <View testID="svg" {...props}>{children}</View>;
const Circle = (props: any) => <View testID="circle" {...props} />;

describe('RingProgress with an svg adapter', () => {
  afterEach(() => resetAdapters());

  it('draws a track circle plus one arc per section', () => {
    render(
      <ThemeProvider theme={theme} forceMode="light" adapters={{ svg: { Svg, Circle } }}>
        <RingProgress
          size={100}
          thickness={10}
          sections={[
            { value: 40, color: 'blue' },
            { value: 20, color: 'green' },
          ]}
        />
      </ThemeProvider>
    );
    expect(screen.getByTestId('ring-progress-svg')).toBeTruthy();
    const circles = screen.getAllByTestId('circle');
    expect(circles).toHaveLength(3);
    // radius accounts for stroke width; circumference used for dasharray
    const radius = (100 - 10) / 2;
    const circumference = 2 * Math.PI * radius;
    expect(circles[0]?.props.r).toBe(radius);
    expect(circles[1]?.props.strokeDasharray).toBe(`${circumference} ${circumference}`);
    // second arc starts where the first ends (40% of 360deg after the -90deg origin)
    expect(circles[2]?.props.transform).toBe(`rotate(${-90 + 144} 50 50)`);
  });

  it('uses round caps when requested', () => {
    render(
      <ThemeProvider theme={theme} forceMode="light" adapters={{ svg: { Svg, Circle } }}>
        <RingProgress roundCaps sections={[{ value: 50, color: 'red' }]} />
      </ThemeProvider>
    );
    expect(screen.getAllByTestId('circle')[1]?.props.strokeLinecap).toBe('round');
  });
});
