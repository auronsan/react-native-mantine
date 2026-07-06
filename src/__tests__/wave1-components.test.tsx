import { render, fireEvent } from './test-utils';
import {
  Fieldset,
  NumberFormatter,
  Pill,
  PillsInput,
  PillsInputField,
  TagsInput,
  VisuallyHidden,
  TextInput,
} from '../index';
import { formatNumberValue } from '../components/NumberFormatter';

describe('VisuallyHidden', () => {
  it('renders children accessible to screen readers', () => {
    const { getByText } = render(
      <VisuallyHidden accessibilityLabel="hidden content">
        <TextInput label="inner" />
      </VisuallyHidden>
    );
    expect(getByText('inner')).toBeTruthy();
  });
});

describe('NumberFormatter', () => {
  it('formats value with thousand separator and prefix', () => {
    const { getByText } = render(
      <NumberFormatter value={1000000} prefix="$ " thousandSeparator />
    );
    expect(getByText('$ 1,000,000')).toBeTruthy();
  });

  it('renders nothing for invalid value', () => {
    const { toJSON } = render(<NumberFormatter value="not-a-number" />);
    expect(toJSON()).toBeNull();
  });

  describe('formatNumberValue', () => {
    it('applies decimal scale with rounding', () => {
      expect(formatNumberValue({ value: 5.567, decimalScale: 2 })).toBe('5.57');
    });

    it('pads zeros with fixedDecimalScale', () => {
      expect(
        formatNumberValue({ value: 5.5, decimalScale: 3, fixedDecimalScale: true })
      ).toBe('5.500');
    });

    it('handles custom separators and suffix', () => {
      expect(
        formatNumberValue({
          value: 1234567.89,
          thousandSeparator: '.',
          decimalSeparator: ',',
          suffix: ' €',
        })
      ).toBe('1.234.567,89 €');
    });

    it('strips minus when allowNegative is false', () => {
      expect(formatNumberValue({ value: -100, allowNegative: false })).toBe('100');
    });

    it('keeps minus before prefix when negative', () => {
      expect(
        formatNumberValue({ value: -100, prefix: '$', allowNegative: true })
      ).toBe('-$100');
    });
  });
});

describe('Fieldset', () => {
  it('renders legend and children', () => {
    const { getByText } = render(
      <Fieldset legend="Personal info">
        <TextInput label="Name" />
      </Fieldset>
    );
    expect(getByText('Personal info')).toBeTruthy();
    expect(getByText('Name')).toBeTruthy();
  });
});

describe('Pill', () => {
  it('renders label', () => {
    const { getByText } = render(<Pill>React</Pill>);
    expect(getByText('React')).toBeTruthy();
  });

  it('calls onRemove when remove button is pressed', () => {
    const onRemove = jest.fn();
    const { getByLabelText } = render(
      <Pill withRemoveButton onRemove={onRemove}>
        React
      </Pill>
    );
    fireEvent.press(getByLabelText('Remove'));
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it('renders pills inside Pill.Group', () => {
    const { getByText } = render(
      <Pill.Group>
        <Pill>First</Pill>
        <Pill>Second</Pill>
      </Pill.Group>
    );
    expect(getByText('First')).toBeTruthy();
    expect(getByText('Second')).toBeTruthy();
  });
});

describe('PillsInput', () => {
  it('renders label, pills and field', () => {
    const { getByText, getByPlaceholderText } = render(
      <PillsInput label="Tags">
        <Pill>Existing</Pill>
        <PillsInputField placeholder="Add more" />
      </PillsInput>
    );
    expect(getByText('Tags')).toBeTruthy();
    expect(getByText('Existing')).toBeTruthy();
    expect(getByPlaceholderText('Add more')).toBeTruthy();
  });

  it('shows error message', () => {
    const { getByText } = render(
      <PillsInput label="Tags" error="Required field">
        <PillsInputField />
      </PillsInput>
    );
    expect(getByText('Required field')).toBeTruthy();
  });
});

describe('TagsInput', () => {
  it('renders default value tags', () => {
    const { getByText } = render(
      <TagsInput label="Tags" defaultValue={['react', 'native']} />
    );
    expect(getByText('react')).toBeTruthy();
    expect(getByText('native')).toBeTruthy();
  });

  it('adds tag on submit', () => {
    const onChange = jest.fn();
    const { getByPlaceholderText } = render(
      <TagsInput placeholder="Add tag" onChange={onChange} />
    );

    const field = getByPlaceholderText('Add tag');
    fireEvent.changeText(field, 'mantine');
    fireEvent(field, 'submitEditing');
    expect(onChange).toHaveBeenCalledWith(['mantine']);
  });

  it('splits tags on split char', () => {
    const onChange = jest.fn();
    const { getByPlaceholderText } = render(
      <TagsInput placeholder="Add tag" onChange={onChange} />
    );

    fireEvent.changeText(getByPlaceholderText('Add tag'), 'one,two,');
    expect(onChange).toHaveBeenCalledWith(['one', 'two']);
  });

  it('ignores duplicates by default', () => {
    const onChange = jest.fn();
    const { getByPlaceholderText } = render(
      <TagsInput
        placeholder="Add tag"
        defaultValue={['react']}
        onChange={onChange}
      />
    );

    const field = getByPlaceholderText('Add tag');
    fireEvent.changeText(field, 'React');
    fireEvent(field, 'submitEditing');
    expect(onChange).not.toHaveBeenCalled();
  });

  it('removes tag with remove button', () => {
    const onChange = jest.fn();
    const { getAllByLabelText } = render(
      <TagsInput defaultValue={['react', 'native']} onChange={onChange} />
    );

    fireEvent.press(getAllByLabelText('Remove')[0]!);
    expect(onChange).toHaveBeenCalledWith(['native']);
  });

  it('respects maxTags', () => {
    const onChange = jest.fn();
    const { getByPlaceholderText } = render(
      <TagsInput
        placeholder="Add tag"
        maxTags={1}
        defaultValue={['react']}
        onChange={onChange}
      />
    );

    const field = getByPlaceholderText('Add tag');
    fireEvent.changeText(field, 'native');
    fireEvent(field, 'submitEditing');
    expect(onChange).not.toHaveBeenCalled();
  });
});
