import { render, screen, fireEvent } from '../../../__tests__/test-utils';
import {
  ColorPicker,
  HueSlider,
  AlphaSlider,
  parseColor,
  formatColor,
  hsvaToRgba,
  rgbaToHsva,
  isColorValid,
} from '../index';

/** Builds the event shape PanResponder expects for responder handlers */
function touchEvent(pageX: number, pageY: number, timeStamp = 1) {
  return {
    nativeEvent: { pageX, pageY, touches: [], changedTouches: [] },
    touchHistory: {
      numberActiveTouches: 1,
      indexOfSingleActiveTouch: 0,
      mostRecentTimeStamp: timeStamp,
      touchBank: [
        {
          touchActive: true,
          startPageX: pageX,
          startPageY: pageY,
          startTimeStamp: timeStamp,
          currentPageX: pageX,
          currentPageY: pageY,
          currentTimeStamp: timeStamp,
          previousPageX: pageX,
          previousPageY: pageY,
          previousTimeStamp: timeStamp - 1,
        },
      ],
    },
  };
}

describe('color converters', () => {
  it('parses hex colors of every length', () => {
    expect(parseColor('#f00')).toEqual({ h: 0, s: 1, v: 1, a: 1 });
    expect(parseColor('#f00f')).toEqual({ h: 0, s: 1, v: 1, a: 1 });
    expect(parseColor('00ff00')).toEqual({ h: 120, s: 1, v: 1, a: 1 });
    expect(parseColor('#0000ff80')?.a).toBeCloseTo(0.5, 1);
    expect(parseColor('#12345')).toBeNull();
    expect(parseColor('#1234567')).toBeNull();
  });

  it('parses rgb, rgba, hsl and hsla colors', () => {
    expect(parseColor('rgb(255, 0, 0)')).toEqual({ h: 0, s: 1, v: 1, a: 1 });
    expect(parseColor('rgba(0, 0, 255, 0.5)')).toEqual({ h: 240, s: 1, v: 1, a: 0.5 });
    expect(parseColor('rgba(300, 0, 0, 2)')).toEqual({ h: 0, s: 1, v: 1, a: 1 });
    expect(parseColor('hsl(120, 100%, 50%)')).toEqual({ h: 120, s: 1, v: 1, a: 1 });
    expect(parseColor('hsla(0, 0%, 0%, 0.25)')).toEqual({ h: 0, s: 0, v: 0, a: 0.25 });
    expect(parseColor('HSL(400, 50%, 50%)')?.h).toBe(40);
  });

  it('returns null for invalid input', () => {
    expect(parseColor('red')).toBeNull();
    expect(parseColor('')).toBeNull();
    expect(parseColor(123 as any)).toBeNull();
    expect(isColorValid('#fff')).toBe(true);
    expect(isColorValid('nope')).toBe(false);
  });

  it('formats colors in every format', () => {
    const hsva = { h: 240, s: 1, v: 1, a: 0.5 };
    expect(formatColor(hsva)).toBe('#0000ff');
    expect(formatColor(hsva, 'hex')).toBe('#0000ff');
    expect(formatColor(hsva, 'hexa')).toBe('#0000ff80');
    expect(formatColor(hsva, 'rgb')).toBe('rgb(0, 0, 255)');
    expect(formatColor(hsva, 'rgba')).toBe('rgba(0, 0, 255, 0.5)');
    expect(formatColor(hsva, 'hsl')).toBe('hsl(240, 100%, 50%)');
    expect(formatColor(hsva, 'hsla')).toBe('hsla(240, 100%, 50%, 0.5)');
    expect(formatColor({ h: 0, s: 0, v: 0, a: 1 }, 'hsl')).toBe('hsl(0, 0%, 0%)');
    expect(formatColor({ h: 0, s: 0, v: 1, a: 1 }, 'hsl')).toBe('hsl(0, 0%, 100%)');
    expect(formatColor(hsva, 'unknown' as any)).toBe('#0000ff');
  });

  it('round-trips between rgba and hsva for every hue segment', () => {
    const samples = [
      { r: 255, g: 0, b: 0, a: 1 },
      { r: 255, g: 255, b: 0, a: 1 },
      { r: 0, g: 255, b: 0, a: 1 },
      { r: 0, g: 255, b: 255, a: 1 },
      { r: 0, g: 0, b: 255, a: 1 },
      { r: 255, g: 0, b: 255, a: 1 },
      { r: 128, g: 128, b: 128, a: 1 },
      { r: 0, g: 0, b: 0, a: 1 },
    ];
    samples.forEach((rgba) => {
      expect(hsvaToRgba(rgbaToHsva(rgba))).toEqual(rgba);
    });
    expect(hsvaToRgba({ h: -60, s: 1, v: 1, a: 1 })).toEqual({ r: 255, g: 0, b: 255, a: 1 });
  });
});

describe('ColorPicker', () => {
  it('renders saturation, hue sliders with defaults and testID', () => {
    render(<ColorPicker testID="picker" />);

    const picker = screen.getByTestId('picker');
    expect(picker).toHaveStyle({ width: 220 });
    expect(screen.getByLabelText('Saturation')).toBeTruthy();
    expect(screen.getByLabelText('Hue').props.accessibilityRole).toBe('adjustable');
    expect(screen.queryByLabelText('Alpha')).toBeNull();
  });

  it('shows the alpha slider for alpha formats', () => {
    (['hexa', 'rgba', 'hsla'] as const).forEach((format) => {
      const { unmount } = render(<ColorPicker format={format} />);
      expect(screen.getByLabelText('Alpha')).toBeTruthy();
      unmount();
    });
  });

  it('supports sizes, fullWidth, custom labels and withPicker=false', () => {
    const { rerender } = render(<ColorPicker size="xl" testID="picker" />);
    expect(screen.getByTestId('picker')).toHaveStyle({ width: 300 });

    rerender(<ColorPicker size={'huge' as any} fullWidth testID="picker" />);
    expect(screen.getByTestId('picker')).toHaveStyle({ width: '100%' });

    rerender(
      <ColorPicker
        withPicker={false}
        saturationLabel="S"
        hueLabel="H"
        alphaLabel="A"
        format="rgba"
        style={{ margin: 1 }}
        testID="picker"
      />
    );
    expect(screen.queryByLabelText('S')).toBeNull();
    expect(screen.queryByLabelText('H')).toBeNull();
    expect(screen.getByTestId('picker')).toHaveStyle({ margin: 1 });
  });

  it('renders swatches and emits on press', () => {
    const onChange = jest.fn();
    const onChangeEnd = jest.fn();
    const onColorSwatchClick = jest.fn();
    render(
      <ColorPicker
        swatches={['#ff0000', 'invalid']}
        swatchesPerRow={0}
        onChange={onChange}
        onChangeEnd={onChangeEnd}
        onColorSwatchClick={onColorSwatchClick}
      />
    );

    fireEvent.press(screen.getByRole('button', { name: '#ff0000' }));
    expect(onChange).toHaveBeenCalledWith('#ff0000');
    expect(onChangeEnd).toHaveBeenCalledWith('#ff0000');
    expect(onColorSwatchClick).toHaveBeenCalledWith('#ff0000');

    onChange.mockClear();
    fireEvent.press(screen.getByRole('button', { name: 'invalid' }));
    expect(onChange).not.toHaveBeenCalled();
    expect(onColorSwatchClick).toHaveBeenLastCalledWith('invalid');
  });

  it('emits changes from hue, saturation and alpha gestures', () => {
    const onChange = jest.fn();
    const onChangeEnd = jest.fn();
    render(
      <ColorPicker
        defaultValue="#ff0000"
        format="rgba"
        onChange={onChange}
        onChangeEnd={onChangeEnd}
      />
    );

    // track defaults to width/height 1 before measuring, so ratios equal page coords
    fireEvent(screen.getByLabelText('Hue'), 'responderMove', touchEvent(1 / 3, 0));
    expect(onChange).toHaveBeenLastCalledWith('rgba(0, 255, 0, 1)');

    fireEvent(screen.getByLabelText('Hue'), 'responderRelease', touchEvent(1 / 3, 0, 2));
    expect(onChangeEnd).toHaveBeenLastCalledWith('rgba(0, 255, 0, 1)');

    fireEvent(screen.getByLabelText('Saturation'), 'responderMove', touchEvent(0, 1, 3));
    expect(onChange).toHaveBeenLastCalledWith('rgba(0, 0, 0, 1)');

    fireEvent(screen.getByLabelText('Saturation'), 'responderTerminate', touchEvent(0, 1, 4));
    expect(onChangeEnd).toHaveBeenLastCalledWith('rgba(0, 0, 0, 1)');

    fireEvent(screen.getByLabelText('Alpha'), 'responderMove', touchEvent(0.5, 0, 5));
    expect(onChange).toHaveBeenLastCalledWith('rgba(0, 0, 0, 0.5)');
    fireEvent(screen.getByLabelText('Alpha'), 'responderRelease', touchEvent(0.5, 0, 6));
    expect(onChangeEnd).toHaveBeenLastCalledWith('rgba(0, 0, 0, 0.5)');
  });

  it('syncs the controlled value and ignores invalid controlled values', () => {
    const onChange = jest.fn();
    const { rerender } = render(
      <ColorPicker value="#0000ff" onChange={onChange} swatches={['#00ff00']} />
    );

    rerender(<ColorPicker value="#00ff00" onChange={onChange} swatches={['#00ff00']} />);
    fireEvent.press(screen.getByRole('button', { name: '#00ff00' }));
    expect(onChange).toHaveBeenCalledWith('#00ff00');

    rerender(<ColorPicker value="garbage" onChange={onChange} swatches={['#00ff00']} />);
    expect(screen.getByRole('button', { name: '#00ff00' })).toBeTruthy();
  });
});

describe('HueSlider / AlphaSlider', () => {
  it('positions the thumb from layout width and value', () => {
    render(<HueSlider value={180} height={10} accessibilityLabel="hue" testID="hue" />);

    const slider = screen.getByTestId('hue');
    expect(slider.props.accessibilityValue).toEqual({ min: 0, max: 360, now: 180 });
    fireEvent(slider, 'layout', { nativeEvent: { layout: { width: 114, height: 10 } } });
    expect(slider).toHaveStyle({ height: 10 });
  });

  it('emits hue changes and change end', () => {
    const onChange = jest.fn();
    const onChangeEnd = jest.fn();
    render(
      <HueSlider value={0} onChange={onChange} onChangeEnd={onChangeEnd} testID="hue" />
    );

    fireEvent(screen.getByTestId('hue'), 'responderMove', touchEvent(0.5, 0));
    expect(onChange).toHaveBeenCalledWith(180);
    fireEvent(screen.getByTestId('hue'), 'responderRelease', touchEvent(0.5, 0, 2));
    expect(onChangeEnd).toHaveBeenCalledWith(0);
  });

  it('emits alpha changes and falls back for invalid colors', () => {
    const onChange = jest.fn();
    const onChangeEnd = jest.fn();
    const { rerender } = render(
      <AlphaSlider
        value={1}
        color="#ff0000"
        onChange={onChange}
        onChangeEnd={onChangeEnd}
        testID="alpha"
      />
    );

    const slider = screen.getByTestId('alpha');
    expect(slider.props.accessibilityValue).toEqual({ min: 0, max: 100, now: 100 });
    fireEvent(slider, 'layout', { nativeEvent: { layout: { width: 100, height: 14 } } });
    fireEvent(slider, 'responderMove', touchEvent(0.25, 0));
    expect(onChange).toHaveBeenCalledWith(0.25);
    fireEvent(slider, 'responderRelease', touchEvent(0.25, 0, 2));
    expect(onChangeEnd).toHaveBeenCalledWith(1);

    rerender(<AlphaSlider value={0.5} color="nope" testID="alpha" />);
    expect(screen.getByTestId('alpha')).toBeTruthy();
  });

  it('supports callback and object refs', () => {
    const hueRef = jest.fn();
    const alphaRef = jest.fn();
    render(<HueSlider value={0} ref={hueRef} />);
    render(<AlphaSlider value={0} color="#000" ref={alphaRef} />);
    expect(hueRef).toHaveBeenCalled();
    expect(alphaRef).toHaveBeenCalled();

    expect(() =>
      render(<HueSlider value={0} ref={{ current: null }} />)
    ).not.toThrow();
    expect(() =>
      render(<AlphaSlider value={0} color="#000" ref={{ current: null }} />)
    ).not.toThrow();
  });
});
