import React, { forwardRef, useRef, useState } from 'react';
import { PanResponder, View } from 'react-native';
import { BoxView } from '../BoxView';
import { Text } from '../Text';
import type { DefaultProps, MantineColor } from '../../theme/types';
import { useComponentDefaultProps, useTheme } from '../../theme/theme-provider';
import { createStyles } from '../../theme';

export interface AngleSliderMark {
  /** Mark value in degrees */
  value: number;

  /** Mark label */
  label?: string;
}

export interface AngleSliderProps extends DefaultProps {
  /** Controlled value in degrees, 0-359 */
  value?: number;

  /** Default value for uncontrolled component */
  defaultValue?: number;

  /** Called on value change */
  onChange?: (value: number) => void;

  /** Called after the dragging is finished */
  onChangeEnd?: (value: number) => void;

  /** Slider diameter in px */
  size?: number;

  /** Thumb diameter in px */
  thumbSize?: number;

  /** Step between values in degrees */
  step?: number;

  /** Determines whether the label should be displayed inside the slider */
  withLabel?: boolean;

  /** Formats label based on the value */
  formatLabel?: (value: number) => React.ReactNode;

  /** Marks displayed on the slider */
  marks?: AngleSliderMark[];

  /** If set, the value is always snapped to the closest mark */
  restrictToMarks?: boolean;

  /** Key of theme.colors or any valid color, controls thumb and marks color */
  color?: MantineColor;

  /** If set, the slider is disabled */
  disabled?: boolean;

  /** Label text style */
  labelStyle?: any;
}

const useStyles = createStyles(
  (
    theme,
    {
      size,
      thumbSize,
      thumbColor,
      disabled,
    }: {
      size: number;
      thumbSize: number;
      thumbColor: string;
      disabled: boolean;
    }
  ) => ({
    root: {
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.fn.themeColor('dark', 5)
          : theme.fn.themeColor('gray', 1),
      ...(disabled && { opacity: 0.6 }),
    },
    label: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },
    labelText: {
      fontSize: Math.max(10, size / 5),
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
    thumb: {
      position: 'absolute',
      width: thumbSize,
      height: thumbSize,
      borderRadius: thumbSize / 2,
      backgroundColor: thumbColor,
    },
    mark: {
      position: 'absolute',
      width: 4,
      height: 4,
      borderRadius: 2,
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.fn.themeColor('dark', 2)
          : theme.fn.themeColor('gray', 5),
    },
  })
);

const defaultProps: Partial<AngleSliderProps> = {
  size: 60,
  step: 1,
  withLabel: true,
  disabled: false,
  restrictToMarks: false,
};

function normalizeAngle(degrees: number) {
  return ((degrees % 360) + 360) % 360;
}

function circularDistance(a: number, b: number) {
  const distance = Math.abs(normalizeAngle(a) - normalizeAngle(b));
  return Math.min(distance, 360 - distance);
}

/**
 * AngleSlider allows picking an angle value between 0 and 360 degrees.
 * Port of Mantine v7.16 AngleSlider component.
 */
export const AngleSlider = forwardRef<View, AngleSliderProps>((props, ref) => {
  const {
    value: controlledValue,
    defaultValue,
    onChange,
    onChangeEnd,
    size,
    thumbSize,
    step,
    withLabel,
    formatLabel,
    marks,
    restrictToMarks,
    color,
    disabled,
    labelStyle,
    style,
    ...others
  } = useComponentDefaultProps('AngleSlider', defaultProps, props);

  const theme = useTheme();

  const resolvedSize = size ?? 60;
  const resolvedThumbSize = thumbSize ?? Math.max(8, Math.round(resolvedSize / 6));
  const thumbColor = theme.fn.themeColor(
    (color as string) || theme.primaryColor
  );

  const { styles, sx } = useStyles(
    {
      size: resolvedSize,
      thumbSize: resolvedThumbSize,
      thumbColor,
      disabled: disabled ?? false,
    },
    { name: 'AngleSlider' }
  );

  const [uncontrolledValue, setUncontrolledValue] = useState(
    defaultValue ?? 0
  );
  const _value = normalizeAngle(
    controlledValue !== undefined ? controlledValue : uncontrolledValue
  );

  const rootRef = useRef<View | null>(null);
  const centerRef = useRef({ x: 0, y: 0 });
  const valueRef = useRef(_value);
  valueRef.current = _value;

  const latestRef = useRef({
    disabled,
    step,
    marks,
    restrictToMarks,
    onChange,
    onChangeEnd,
    controlled: controlledValue !== undefined,
  });
  latestRef.current = {
    disabled,
    step,
    marks,
    restrictToMarks,
    onChange,
    onChangeEnd,
    controlled: controlledValue !== undefined,
  };

  const handleTouch = (pageX: number, pageY: number) => {
    const current = latestRef.current;
    if (current.disabled) {
      return;
    }

    const dx = pageX - centerRef.current.x;
    const dy = pageY - centerRef.current.y;

    if (dx === 0 && dy === 0) {
      return;
    }

    let degrees = normalizeAngle((Math.atan2(dy, dx) * 180) / Math.PI + 90);

    if (current.restrictToMarks && current.marks && current.marks.length > 0) {
      let closest = current.marks[0]!.value;
      let closestDistance = circularDistance(degrees, closest);

      for (const mark of current.marks) {
        const distance = circularDistance(degrees, mark.value);
        if (distance < closestDistance) {
          closest = mark.value;
          closestDistance = distance;
        }
      }

      degrees = normalizeAngle(closest);
    } else if (current.step && current.step > 0) {
      degrees = normalizeAngle(Math.round(degrees / current.step) * current.step);
    }

    if (degrees !== valueRef.current) {
      valueRef.current = degrees;
      if (!current.controlled) {
        setUncontrolledValue(degrees);
      }
      current.onChange?.(degrees);
    }
  };

  const handleTouchRef = useRef(handleTouch);
  handleTouchRef.current = handleTouch;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !latestRef.current.disabled,
      onMoveShouldSetPanResponder: () => !latestRef.current.disabled,
      onPanResponderGrant: (event) => {
        const { pageX, pageY } = event.nativeEvent;
        rootRef.current?.measureInWindow((x, y, width, height) => {
          centerRef.current = { x: x + width / 2, y: y + height / 2 };
          handleTouchRef.current(pageX, pageY);
        });
      },
      onPanResponderMove: (event) => {
        handleTouchRef.current(event.nativeEvent.pageX, event.nativeEvent.pageY);
      },
      onPanResponderRelease: () => {
        latestRef.current.onChangeEnd?.(valueRef.current);
      },
      onPanResponderTerminate: () => {
        latestRef.current.onChangeEnd?.(valueRef.current);
      },
    })
  ).current;

  const setRootRef = (node: View | null) => {
    rootRef.current = node;
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      (ref as React.MutableRefObject<View | null>).current = node;
    }
  };

  const radius = resolvedSize / 2 - resolvedThumbSize / 2 - 2;
  const radians = (_value * Math.PI) / 180;
  const thumbLeft =
    resolvedSize / 2 + radius * Math.sin(radians) - resolvedThumbSize / 2;
  const thumbTop =
    resolvedSize / 2 - radius * Math.cos(radians) - resolvedThumbSize / 2;

  const labelContent =
    formatLabel !== undefined ? formatLabel(_value) : `${Math.round(_value)}°`;

  const labelNode =
    typeof labelContent === 'string' || typeof labelContent === 'number' ? (
      <Text style={sx(styles.labelText, labelStyle)}>{labelContent}</Text>
    ) : (
      labelContent
    );

  return (
    <BoxView
      ref={setRootRef}
      style={sx(styles.root, style)}
      accessibilityRole="adjustable"
      accessibilityValue={{ min: 0, max: 359, now: Math.round(_value) }}
      {...panResponder.panHandlers}
      {...others}
    >
      {(marks || []).map((mark) => {
        const markRadians = (normalizeAngle(mark.value) * Math.PI) / 180;
        const markLeft = resolvedSize / 2 + radius * Math.sin(markRadians) - 2;
        const markTop = resolvedSize / 2 - radius * Math.cos(markRadians) - 2;
        return (
          <View
            key={mark.value}
            style={[styles.mark, { left: markLeft, top: markTop }]}
          />
        );
      })}

      {withLabel && <View style={styles.label}>{labelNode}</View>}

      <View style={[styles.thumb, { left: thumbLeft, top: thumbTop }]} />
    </BoxView>
  );
});

AngleSlider.displayName = 'AngleSlider';
