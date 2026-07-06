import { Text } from 'react-native';
import { render } from './test-utils';
import {
  AngleSlider,
  FloatingIndicator,
  Marquee,
  RollingNumber,
  SemiCircleProgress,
} from '../index';

describe('SemiCircleProgress', () => {
  it('renders label', () => {
    const { getByText } = render(<SemiCircleProgress value={65} label="65%" />);
    expect(getByText('65%')).toBeTruthy();
  });

  it('clamps value in accessibility info', () => {
    const { getByTestId } = render(
      <SemiCircleProgress value={150} testID="progress" />
    );
    expect(getByTestId('progress').props.accessibilityValue).toEqual({
      min: 0,
      max: 100,
      now: 100,
    });
  });

  it('renders label at center position', () => {
    const { getByText } = render(
      <SemiCircleProgress value={30} label="30" labelPosition="center" />
    );
    expect(getByText('30')).toBeTruthy();
  });
});

describe('AngleSlider', () => {
  it('renders default label with degree symbol', () => {
    const { getByText } = render(<AngleSlider defaultValue={137} />);
    expect(getByText('137°')).toBeTruthy();
  });

  it('supports custom label format', () => {
    const { getByText } = render(
      <AngleSlider defaultValue={90} formatLabel={(value) => `${value} deg`} />
    );
    expect(getByText('90 deg')).toBeTruthy();
  });

  it('hides label when withLabel is false', () => {
    const { queryByText } = render(
      <AngleSlider defaultValue={45} withLabel={false} />
    );
    expect(queryByText('45°')).toBeNull();
  });

  it('normalizes controlled value in accessibility info', () => {
    const { getByTestId } = render(<AngleSlider value={380} testID="slider" />);
    expect(getByTestId('slider').props.accessibilityValue).toEqual({
      min: 0,
      max: 359,
      now: 20,
    });
  });
});

describe('RollingNumber', () => {
  it('exposes the formatted value as accessibility label', () => {
    const { getByLabelText } = render(
      <RollingNumber value={1234.5} prefix="$ " thousandSeparator />
    );
    expect(getByLabelText('$ 1,234.5')).toBeTruthy();
  });

  it('renders nothing for invalid value', () => {
    const { toJSON } = render(<RollingNumber value="not-a-number" />);
    expect(toJSON()).toBeNull();
  });

  it('renders static characters for prefix and separators', () => {
    const { getAllByText } = render(
      <RollingNumber value={1000} prefix="€" thousandSeparator />
    );
    expect(getAllByText('€', { includeHiddenElements: true }).length).toBe(1);
    expect(getAllByText(',', { includeHiddenElements: true }).length).toBe(1);
  });
});

describe('Marquee', () => {
  it('renders repeated copies of children', () => {
    const { getAllByText } = render(
      <Marquee fadeEdges={false}>
        <Text>Item</Text>
      </Marquee>
    );
    expect(getAllByText('Item').length).toBe(4);
  });

  it('respects repeat prop', () => {
    const { getAllByText } = render(
      <Marquee repeat={2} fadeEdges={false}>
        <Text>Item</Text>
      </Marquee>
    );
    expect(getAllByText('Item').length).toBe(2);
  });
});

describe('FloatingIndicator', () => {
  it('renders children when target is set', () => {
    const { getByText } = render(
      <FloatingIndicator target={{ x: 10, y: 0, width: 50, height: 20 }}>
        <Text>indicator</Text>
      </FloatingIndicator>
    );
    expect(getByText('indicator')).toBeTruthy();
  });

  it('renders without crashing when target is null', () => {
    const { toJSON } = render(<FloatingIndicator target={null} />);
    expect(toJSON()).toBeTruthy();
  });
});
