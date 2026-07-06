import { forwardRef } from 'react';
import type { TextStyle, StyleProp } from 'react-native';
import { Text } from '../Text';
import type { DefaultProps } from '../../theme/types';
import { useComponentDefaultProps } from '../../theme/theme-provider';

export interface NumberFormatterProps extends Omit<DefaultProps, 'style'> {
  /** Value to format */
  value?: number | string;

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

  /** Determines whether negative values are allowed */
  allowNegative?: boolean;

  /** Text style */
  style?: StyleProp<TextStyle>;
}

export function formatNumberValue({
  value,
  prefix = '',
  suffix = '',
  thousandSeparator,
  decimalSeparator = '.',
  decimalScale,
  fixedDecimalScale = false,
  allowNegative = true,
}: NumberFormatterProps): string {
  if (value === undefined || value === null || value === '') {
    return '';
  }

  const parsed = typeof value === 'number' ? value : parseFloat(value);

  if (Number.isNaN(parsed)) {
    return '';
  }

  const isNegative = parsed < 0 && allowNegative;
  const absolute = Math.abs(parsed);

  let stringValue: string;
  if (decimalScale !== undefined) {
    stringValue = absolute.toFixed(decimalScale);
    if (!fixedDecimalScale && stringValue.includes('.')) {
      stringValue = stringValue.replace(/\.?0+$/, '');
    }
  } else {
    stringValue = String(absolute);
  }

  const [integerPart = '0', decimalPart] = stringValue.split('.');

  const separator =
    thousandSeparator === true ? ',' : thousandSeparator || '';
  const groupedInteger = separator
    ? integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, separator)
    : integerPart;

  const formatted =
    decimalPart !== undefined
      ? `${groupedInteger}${decimalSeparator}${decimalPart}`
      : groupedInteger;

  return `${isNegative ? '-' : ''}${prefix}${formatted}${suffix}`;
}

const defaultProps: Partial<NumberFormatterProps> = {
  decimalSeparator: '.',
  fixedDecimalScale: false,
  allowNegative: true,
};

/**
 * NumberFormatter formats a number with thousands separators, decimal scale,
 * prefix and suffix. Port of Mantine v7 NumberFormatter component.
 */
export const NumberFormatter = forwardRef<any, NumberFormatterProps>(
  (props, ref) => {
    const {
      value,
      prefix,
      suffix,
      thousandSeparator,
      decimalSeparator,
      decimalScale,
      fixedDecimalScale,
      allowNegative,
      style,
      ...others
    } = useComponentDefaultProps('NumberFormatter', defaultProps, props);

    const formatted = formatNumberValue({
      value,
      prefix,
      suffix,
      thousandSeparator,
      decimalSeparator,
      decimalScale,
      fixedDecimalScale,
      allowNegative,
    });

    if (formatted === '') {
      return null;
    }

    return (
      <Text ref={ref} style={style} {...others}>
        {formatted}
      </Text>
    );
  }
);

NumberFormatter.displayName = 'NumberFormatter';
