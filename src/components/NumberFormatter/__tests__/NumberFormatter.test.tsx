import { render, screen } from '../../../__tests__/test-utils';
import { NumberFormatter, formatNumberValue } from '../index';

describe('formatNumberValue', () => {
  it('returns an empty string for empty or invalid values', () => {
    expect(formatNumberValue({ value: undefined })).toBe('');
    expect(formatNumberValue({ value: '' })).toBe('');
    expect(formatNumberValue({ value: 'not-a-number' })).toBe('');
  });

  it('formats plain numbers and numeric strings', () => {
    expect(formatNumberValue({ value: 1234 })).toBe('1234');
    expect(formatNumberValue({ value: '1234.5' })).toBe('1234.5');
  });

  it('applies thousand separators', () => {
    expect(
      formatNumberValue({ value: 1234567.89, thousandSeparator: true })
    ).toBe('1,234,567.89');
    expect(formatNumberValue({ value: 1234567, thousandSeparator: ' ' })).toBe(
      '1 234 567'
    );
    expect(
      formatNumberValue({ value: 1234567, thousandSeparator: false })
    ).toBe('1234567');
  });

  it('applies decimalScale with and without fixedDecimalScale', () => {
    expect(formatNumberValue({ value: 1.5, decimalScale: 2 })).toBe('1.5');
    expect(
      formatNumberValue({
        value: 1.5,
        decimalScale: 2,
        fixedDecimalScale: true,
      })
    ).toBe('1.50');
    expect(formatNumberValue({ value: 2, decimalScale: 2 })).toBe('2');
    expect(
      formatNumberValue({ value: 2, decimalScale: 2, fixedDecimalScale: true })
    ).toBe('2.00');
    expect(formatNumberValue({ value: 1.239, decimalScale: 1 })).toBe('1.2');
    expect(formatNumberValue({ value: 3.14159, decimalScale: 0 })).toBe('3');
  });

  it('uses a custom decimal separator', () => {
    expect(formatNumberValue({ value: 1234.5, decimalSeparator: ',' })).toBe(
      '1234,5'
    );
  });

  it('handles negative values and allowNegative', () => {
    expect(
      formatNumberValue({ value: -1000, thousandSeparator: true, prefix: '$' })
    ).toBe('-$1,000');
    expect(
      formatNumberValue({
        value: -1000,
        thousandSeparator: true,
        prefix: '$',
        allowNegative: false,
      })
    ).toBe('$1,000');
  });

  it('adds prefix and suffix', () => {
    expect(formatNumberValue({ value: 42, prefix: '~', suffix: ' kg' })).toBe(
      '~42 kg'
    );
  });
});

describe('NumberFormatter', () => {
  it('renders formatted value with defaults', () => {
    render(<NumberFormatter value={1000000} testID="formatter" />);
    expect(screen.getByText('1000000')).toBeTruthy();
    expect(screen.getByTestId('formatter')).toBeTruthy();
  });

  it('renders with prefix, suffix and thousand separator', () => {
    render(
      <NumberFormatter
        value={1000000}
        prefix="$ "
        suffix=" USD"
        thousandSeparator
      />
    );
    expect(screen.getByText('$ 1,000,000 USD')).toBeTruthy();
  });

  it('renders decimal scale, separator and negative values', () => {
    render(
      <NumberFormatter
        value={-1234.5}
        decimalScale={2}
        fixedDecimalScale
        decimalSeparator=","
        thousandSeparator="."
      />
    );
    expect(screen.getByText('-1.234,50')).toBeTruthy();
  });

  it('ignores the sign when allowNegative is false', () => {
    render(<NumberFormatter value={-5} allowNegative={false} />);
    expect(screen.getByText('5')).toBeTruthy();
  });

  it('renders numeric strings', () => {
    render(<NumberFormatter value="12345" thousandSeparator />);
    expect(screen.getByText('12,345')).toBeTruthy();
  });

  it('renders nothing for empty or invalid values', () => {
    const { toJSON } = render(<NumberFormatter value="not-a-number" />);
    expect(toJSON()).toBeNull();

    const { toJSON: emptyJSON } = render(<NumberFormatter />);
    expect(emptyJSON()).toBeNull();
  });

  it('applies custom style and passes other props to Text', () => {
    render(
      <NumberFormatter
        value={7}
        style={{ color: 'red' }}
        testID="formatter"
        accessibilityLabel="Seven"
      />
    );
    const text = screen.getByTestId('formatter');
    expect(text).toHaveStyle({ color: 'red' });
    expect(text.props.accessibilityLabel).toBe('Seven');
  });
});
