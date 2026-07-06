import React, { forwardRef, useRef, useState } from 'react';
import {
  PanResponder,
  TouchableOpacity,
  View,
  type ColorValue,
} from 'react-native';
import { BoxView } from '../BoxView';
import { ColorSwatch } from '../ColorSwatch';
import { PlatformLinearGradient } from '../LinearGradient/PlatformLinearGradient';
import type { DefaultProps, MantineSize } from '../../theme/types';
import { useComponentDefaultProps } from '../../theme/theme-provider';
import { createStyles } from '../../theme';
import {
  formatColor,
  hsvaToRgba,
  parseColor,
  type ColorFormat,
  type HsvaColor,
} from './converters';

export {
  formatColor,
  hsvaToRgba,
  parseColor,
  rgbaToHsva,
  isColorValid,
  type ColorFormat,
  type HsvaColor,
} from './converters';

const clamp01 = (value: number) => Math.min(Math.max(value, 0), 1);

const SATURATION_HEIGHTS: Record<MantineSize, number> = {
  xs: 100,
  sm: 110,
  md: 120,
  lg: 140,
  xl: 160,
};

const SLIDER_HEIGHTS: Record<MantineSize, number> = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
};

const HUE_GRADIENT: readonly [ColorValue, ColorValue, ...ColorValue[]] = [
  '#ff0000',
  '#ffff00',
  '#00ff00',
  '#00ffff',
  '#0000ff',
  '#ff00ff',
  '#ff0000',
];

interface PanTrackState {
  x: number;
  y: number;
  width: number;
  height: number;
}

function usePanTrack(
  onRatio: (rx: number, ry: number) => void,
  onEnd?: () => void
) {
  const nodeRef = useRef<View | null>(null);
  const trackRef = useRef<PanTrackState>({ x: 0, y: 0, width: 1, height: 1 });

  const onRatioRef = useRef(onRatio);
  onRatioRef.current = onRatio;
  const onEndRef = useRef(onEnd);
  onEndRef.current = onEnd;

  const handleTouch = (pageX: number, pageY: number) => {
    const { x, y, width, height } = trackRef.current;
    onRatioRef.current(
      clamp01((pageX - x) / Math.max(width, 1)),
      clamp01((pageY - y) / Math.max(height, 1))
    );
  };

  const handleTouchRef = useRef(handleTouch);
  handleTouchRef.current = handleTouch;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (event) => {
        const { pageX, pageY } = event.nativeEvent;
        nodeRef.current?.measureInWindow((x, y, width, height) => {
          trackRef.current = { x, y, width, height };
          handleTouchRef.current(pageX, pageY);
        });
      },
      onPanResponderMove: (event) => {
        handleTouchRef.current(event.nativeEvent.pageX, event.nativeEvent.pageY);
      },
      onPanResponderRelease: () => {
        onEndRef.current?.();
      },
      onPanResponderTerminate: () => {
        onEndRef.current?.();
      },
    })
  ).current;

  return { nodeRef, panHandlers: panResponder.panHandlers };
}

const useStyles = createStyles((theme) => ({
  root: {
    gap: theme.spacing.sm,
  },
  saturation: {
    borderRadius: theme.fn.radius('sm') as number,
    overflow: 'hidden',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  slider: {
    borderRadius: 999,
    overflow: 'visible',
    justifyContent: 'center',
  },
  sliderTrack: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 999,
    overflow: 'hidden',
  },
  thumb: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: theme.white,
    backgroundColor: 'transparent',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  swatches: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  swatchCell: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 2,
  },
}));

export interface HueSliderProps extends DefaultProps {
  /** Hue value, 0-360 */
  value: number;

  /** Called on value change */
  onChange?: (value: number) => void;

  /** Called when dragging ends */
  onChangeEnd?: (value: number) => void;

  /** Slider height */
  height?: number;

  /** Accessibility label */
  accessibilityLabel?: string;
}

export const HueSlider = forwardRef<View, HueSliderProps>((props, ref) => {
  const {
    value,
    onChange,
    onChangeEnd,
    height = 14,
    accessibilityLabel,
    style,
    ...others
  } = props;

  const { styles, sx } = useStyles({}, { name: 'HueSlider' });
  const [width, setWidth] = useState(0);

  const valueRef = useRef(value);
  valueRef.current = value;

  const { nodeRef, panHandlers } = usePanTrack(
    (rx) => onChange?.(Math.round(rx * 360)),
    () => onChangeEnd?.(valueRef.current)
  );

  const setRef = (node: View | null) => {
    nodeRef.current = node;
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      (ref as React.MutableRefObject<View | null>).current = node;
    }
  };

  const thumbSize = height + 4;
  const thumbLeft = clamp01(value / 360) * Math.max(width - thumbSize, 0);

  return (
    <BoxView
      ref={setRef}
      style={sx(styles.slider, { height }, style)}
      onLayout={(event: any) => setWidth(event.nativeEvent.layout.width)}
      accessibilityRole="adjustable"
      accessibilityLabel={accessibilityLabel}
      accessibilityValue={{ min: 0, max: 360, now: Math.round(value) }}
      {...panHandlers}
      {...others}
    >
      <View style={styles.sliderTrack}>
        <PlatformLinearGradient
          colors={HUE_GRADIENT}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={{ flex: 1 }}
        />
      </View>
      <View
        pointerEvents="none"
        style={[
          styles.thumb,
          {
            width: thumbSize,
            height: thumbSize,
            borderRadius: thumbSize / 2,
            left: thumbLeft,
            top: (height - thumbSize) / 2,
          },
        ]}
      />
    </BoxView>
  );
});

HueSlider.displayName = 'HueSlider';

export interface AlphaSliderProps extends DefaultProps {
  /** Alpha value, 0-1 */
  value: number;

  /** Color used for the gradient, any valid color string */
  color: string;

  /** Called on value change */
  onChange?: (value: number) => void;

  /** Called when dragging ends */
  onChangeEnd?: (value: number) => void;

  /** Slider height */
  height?: number;

  /** Accessibility label */
  accessibilityLabel?: string;
}

export const AlphaSlider = forwardRef<View, AlphaSliderProps>((props, ref) => {
  const {
    value,
    color,
    onChange,
    onChangeEnd,
    height = 14,
    accessibilityLabel,
    style,
    ...others
  } = props;

  const { styles, sx } = useStyles({}, { name: 'AlphaSlider' });
  const [width, setWidth] = useState(0);

  const valueRef = useRef(value);
  valueRef.current = value;

  const { nodeRef, panHandlers } = usePanTrack(
    (rx) => onChange?.(Math.round(rx * 100) / 100),
    () => onChangeEnd?.(valueRef.current)
  );

  const setRef = (node: View | null) => {
    nodeRef.current = node;
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      (ref as React.MutableRefObject<View | null>).current = node;
    }
  };

  const parsed = parseColor(color);
  const rgba = parsed ? hsvaToRgba({ ...parsed, a: 1 }) : { r: 0, g: 0, b: 0 };
  const gradient: readonly [ColorValue, ColorValue] = [
    `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, 0)`,
    `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, 1)`,
  ];

  const thumbSize = height + 4;
  const thumbLeft = clamp01(value) * Math.max(width - thumbSize, 0);

  return (
    <BoxView
      ref={setRef}
      style={sx(styles.slider, { height }, style)}
      onLayout={(event: any) => setWidth(event.nativeEvent.layout.width)}
      accessibilityRole="adjustable"
      accessibilityLabel={accessibilityLabel}
      accessibilityValue={{ min: 0, max: 100, now: Math.round(value * 100) }}
      {...panHandlers}
      {...others}
    >
      <View style={[styles.sliderTrack, { backgroundColor: '#e9e9e9' }]}>
        <PlatformLinearGradient
          colors={gradient}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={{ flex: 1 }}
        />
      </View>
      <View
        pointerEvents="none"
        style={[
          styles.thumb,
          {
            width: thumbSize,
            height: thumbSize,
            borderRadius: thumbSize / 2,
            left: thumbLeft,
            top: (height - thumbSize) / 2,
          },
        ]}
      />
    </BoxView>
  );
});

AlphaSlider.displayName = 'AlphaSlider';

interface SaturationPanelProps {
  hsva: HsvaColor;
  height: number;
  onChange: (s: number, v: number) => void;
  onChangeEnd?: () => void;
  accessibilityLabel?: string;
}

function SaturationPanel({
  hsva,
  height,
  onChange,
  onChangeEnd,
  accessibilityLabel,
}: SaturationPanelProps) {
  const { styles } = useStyles({}, { name: 'ColorPicker' });
  const [layout, setLayout] = useState({ width: 0, height: 0 });

  const { nodeRef, panHandlers } = usePanTrack(
    (rx, ry) => onChange(rx, 1 - ry),
    onChangeEnd
  );

  const baseColor = formatColor({ h: hsva.h, s: 1, v: 1, a: 1 }, 'hex');
  const thumbSize = 14;
  const thumbLeft = hsva.s * Math.max(layout.width, 0) - thumbSize / 2;
  const thumbTop = (1 - hsva.v) * Math.max(layout.height, 0) - thumbSize / 2;

  return (
    <View
      ref={nodeRef}
      style={[styles.saturation, { height, backgroundColor: baseColor }]}
      onLayout={(event) =>
        setLayout({
          width: event.nativeEvent.layout.width,
          height: event.nativeEvent.layout.height,
        })
      }
      accessibilityRole="adjustable"
      accessibilityLabel={accessibilityLabel}
      {...panHandlers}
    >
      <PlatformLinearGradient
        colors={['#ffffff', 'rgba(255, 255, 255, 0)']}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.overlay as any}
      />
      <PlatformLinearGradient
        colors={['rgba(0, 0, 0, 0)', '#000000']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.overlay as any}
      />
      <View
        pointerEvents="none"
        style={[
          styles.thumb,
          {
            width: thumbSize,
            height: thumbSize,
            borderRadius: thumbSize / 2,
            left: thumbLeft,
            top: thumbTop,
          },
        ]}
      />
    </View>
  );
}

export interface ColorPickerProps extends DefaultProps {
  /** Color value for controlled component, in one of the supported formats */
  value?: string;

  /** Default value for uncontrolled component */
  defaultValue?: string;

  /** Called when color changes */
  onChange?: (value: string) => void;

  /** Called when the user stops dragging or picks a swatch */
  onChangeEnd?: (value: string) => void;

  /** Called when a color swatch is pressed */
  onColorSwatchClick?: (color: string) => void;

  /** Color format, 'hex' by default */
  format?: ColorFormat;

  /** Determines whether the saturation/hue/alpha pickers should be displayed */
  withPicker?: boolean;

  /** Predefined colors displayed as swatches under the pickers */
  swatches?: string[];

  /** Number of swatches per row */
  swatchesPerRow?: number;

  /** Controls the size of the pickers */
  size?: MantineSize;

  /** Determines whether the picker should take 100% of available width */
  fullWidth?: boolean;

  /** Saturation area accessibility label */
  saturationLabel?: string;

  /** Hue slider accessibility label */
  hueLabel?: string;

  /** Alpha slider accessibility label */
  alphaLabel?: string;
}

const defaultProps: Partial<ColorPickerProps> = {
  format: 'hex',
  withPicker: true,
  swatchesPerRow: 7,
  size: 'md',
  fullWidth: false,
  saturationLabel: 'Saturation',
  hueLabel: 'Hue',
  alphaLabel: 'Alpha',
};

const PICKER_WIDTHS: Record<MantineSize, number> = {
  xs: 180,
  sm: 200,
  md: 220,
  lg: 260,
  xl: 300,
};

/**
 * ColorPicker allows picking a color via saturation area, hue and alpha
 * sliders and predefined swatches. Port of Mantine ColorPicker adapted for
 * React Native touch interactions.
 */
export const ColorPicker = forwardRef<View, ColorPickerProps>((props, ref) => {
  const {
    value,
    defaultValue,
    onChange,
    onChangeEnd,
    onColorSwatchClick,
    format,
    withPicker,
    swatches,
    swatchesPerRow,
    size,
    fullWidth,
    saturationLabel,
    hueLabel,
    alphaLabel,
    style,
    ...others
  } = useComponentDefaultProps('ColorPicker', defaultProps, props);

  const { styles, sx } = useStyles({}, { name: 'ColorPicker', size });

  const [internalHsva, setInternalHsva] = useState<HsvaColor>(
    () => parseColor(defaultValue || value || '#ffffff') || { h: 0, s: 0, v: 1, a: 1 }
  );

  const lastEmittedRef = useRef<string | null>(null);

  // Sync controlled value into internal state when it changes externally
  const parsedControlled = value !== undefined ? parseColor(value) : null;
  const hsva =
    value !== undefined && parsedControlled && value !== lastEmittedRef.current
      ? parsedControlled
      : internalHsva;

  const withAlpha = format === 'hexa' || format === 'rgba' || format === 'hsla';

  const emit = (next: HsvaColor, end = false) => {
    setInternalHsva(next);
    const formatted = formatColor(next, format);
    lastEmittedRef.current = formatted;
    onChange?.(formatted);
    if (end) {
      onChangeEnd?.(formatted);
    }
  };

  const hsvaRef = useRef(hsva);
  hsvaRef.current = hsva;

  const handleEnd = () => {
    onChangeEnd?.(formatColor(hsvaRef.current, format));
  };

  const handleSwatchPress = (swatch: string) => {
    const parsed = parseColor(swatch);
    if (parsed) {
      emit(parsed, true);
    }
    onColorSwatchClick?.(swatch);
  };

  const saturationHeight = SATURATION_HEIGHTS[size as MantineSize] ?? 120;
  const sliderHeight = SLIDER_HEIGHTS[size as MantineSize] ?? 14;
  const rootWidth = fullWidth
    ? ('100%' as const)
    : (PICKER_WIDTHS[size as MantineSize] ?? 220);

  return (
    <BoxView ref={ref} style={sx(styles.root, { width: rootWidth }, style)} {...others}>
      {withPicker && (
        <>
          <SaturationPanel
            hsva={hsva}
            height={saturationHeight}
            accessibilityLabel={saturationLabel}
            onChange={(s, v) => emit({ ...hsvaRef.current, s, v })}
            onChangeEnd={handleEnd}
          />
          <HueSlider
            value={hsva.h}
            height={sliderHeight}
            accessibilityLabel={hueLabel}
            onChange={(h) => emit({ ...hsvaRef.current, h })}
            onChangeEnd={handleEnd}
          />
          {withAlpha && (
            <AlphaSlider
              value={hsva.a}
              color={formatColor({ ...hsva, a: 1 }, 'hex')}
              height={sliderHeight}
              accessibilityLabel={alphaLabel}
              onChange={(a) => emit({ ...hsvaRef.current, a })}
              onChangeEnd={handleEnd}
            />
          )}
        </>
      )}

      {swatches && swatches.length > 0 && (
        <View style={styles.swatches}>
          {swatches.map((swatch, index) => (
            <View
              key={`${swatch}-${index}`}
              style={[
                styles.swatchCell,
                { width: `${100 / (swatchesPerRow || 7)}%` },
              ]}
            >
              <TouchableOpacity
                onPress={() => handleSwatchPress(swatch)}
                accessibilityRole="button"
                accessibilityLabel={swatch}
              >
                <ColorSwatch color={swatch} size={24} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
    </BoxView>
  );
});

ColorPicker.displayName = 'ColorPicker';
