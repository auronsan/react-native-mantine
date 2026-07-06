import { forwardRef, useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  View,
  type EasingFunction,
  type StyleProp,
  type TextStyle,
} from 'react-native';
import { BoxView } from '../BoxView';
import { Text } from '../Text';
import { formatNumberValue } from '../NumberFormatter';
import type { DefaultProps } from '../../theme/types';
import { useComponentDefaultProps, useTheme } from '../../theme/theme-provider';
import { createStyles } from '../../theme';

export interface RollingNumberProps extends DefaultProps {
  /** Value to display */
  value: number | string;

  /** Prefix added before the formatted value */
  prefix?: string;

  /** Suffix added after the formatted value */
  suffix?: string;

  /** Thousands separator, `true` for `,`, or any string */
  thousandSeparator?: string | boolean;

  /** Decimal separator */
  decimalSeparator?: string;

  /** Limits the number of digits after the decimal point */
  decimalScale?: number;

  /** If true, zeros are added to match decimalScale */
  fixedDecimalScale?: boolean;

  /** Roll animation duration in ms, 0 disables animation */
  animationDuration?: number;

  /** Animation timing function */
  timingFunction?: 'ease' | 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';

  /** If set, digits use tabular figures to prevent layout shifts */
  tabularNumbers?: boolean;

  /** Text style applied to every character */
  textStyle?: StyleProp<TextStyle>;
}

const DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

const EASINGS: Record<string, EasingFunction> = {
  ease: Easing.bezier(0.25, 0.1, 0.25, 1),
  linear: Easing.linear,
  'ease-in': Easing.in(Easing.ease),
  'ease-out': Easing.out(Easing.ease),
  'ease-in-out': Easing.inOut(Easing.ease),
};

const useStyles = createStyles(
  (theme, { fontSize, lineHeight }: { fontSize: number; lineHeight: number }) => ({
    root: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    char: {
      fontSize,
      lineHeight,
      height: lineHeight,
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      includeFontPadding: false,
    },
    digitColumn: {
      height: lineHeight,
      overflow: 'hidden',
    },
  })
);

interface RollingDigitProps {
  digit: number;
  lineHeight: number;
  duration: number;
  easing: EasingFunction;
  charStyle: StyleProp<TextStyle>;
}

function RollingDigit({
  digit,
  lineHeight,
  duration,
  easing,
  charStyle,
}: RollingDigitProps) {
  const animated = useRef(new Animated.Value(digit)).current;

  useEffect(() => {
    if (duration > 0) {
      Animated.timing(animated, {
        toValue: digit,
        duration,
        easing,
        useNativeDriver: true,
      }).start();
    } else {
      animated.setValue(digit);
    }
  }, [digit, duration, easing, animated]);

  const translateY = animated.interpolate({
    inputRange: [0, 9],
    outputRange: [0, -9 * lineHeight],
  });

  return (
    <View style={{ height: lineHeight, overflow: 'hidden' }}>
      <Animated.View style={{ transform: [{ translateY }] }}>
        {DIGITS.map((item) => (
          <Text key={item} style={charStyle}>
            {item}
          </Text>
        ))}
      </Animated.View>
    </View>
  );
}

const defaultProps: Partial<RollingNumberProps> = {
  decimalSeparator: '.',
  fixedDecimalScale: false,
  animationDuration: 600,
  timingFunction: 'ease',
  tabularNumbers: true,
};

/**
 * RollingNumber displays a number with a rolling digits animation on change.
 * Port of Mantine v8 RollingNumber component.
 */
export const RollingNumber = forwardRef<View, RollingNumberProps>(
  (props, ref) => {
    const {
      value,
      prefix,
      suffix,
      thousandSeparator,
      decimalSeparator,
      decimalScale,
      fixedDecimalScale,
      animationDuration,
      timingFunction,
      tabularNumbers,
      textStyle,
      style,
      ...others
    } = useComponentDefaultProps('RollingNumber', defaultProps, props);

    const theme = useTheme();

    const flattened = (StyleSheet.flatten(textStyle) || {}) as TextStyle;
    const fontSize =
      typeof flattened.fontSize === 'number'
        ? flattened.fontSize
        : (theme.fontSizes.md as number);
    const lineHeight =
      typeof flattened.lineHeight === 'number'
        ? flattened.lineHeight
        : Math.round(fontSize * 1.3);

    const { styles, sx } = useStyles(
      { fontSize, lineHeight },
      { name: 'RollingNumber' }
    );

    const formatted = formatNumberValue({
      value,
      prefix,
      suffix,
      thousandSeparator,
      decimalSeparator,
      decimalScale,
      fixedDecimalScale,
    });

    if (formatted === '') {
      return null;
    }

    const charStyle = sx(
      styles.char,
      tabularNumbers && { fontVariant: ['tabular-nums'] as TextStyle['fontVariant'] },
      textStyle
    );

    const easing =
      EASINGS[timingFunction ?? 'ease'] ?? (EASINGS.ease as EasingFunction);

    return (
      <BoxView
        ref={ref}
        style={sx(styles.root, style)}
        accessible
        accessibilityLabel={formatted}
        {...others}
      >
        <View
          style={styles.root}
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
        >
          {formatted.split('').map((char, index) =>
            /\d/.test(char) ? (
              <RollingDigit
                key={`digit-${index}`}
                digit={parseInt(char, 10)}
                lineHeight={lineHeight}
                duration={animationDuration ?? 600}
                easing={easing}
                charStyle={charStyle}
              />
            ) : (
              <Text key={`char-${index}`} style={charStyle}>
                {char}
              </Text>
            )
          )}
        </View>
      </BoxView>
    );
  }
);

RollingNumber.displayName = 'RollingNumber';
