import { render, screen, fireEvent } from '../../../__tests__/test-utils';
import { TagsInput } from '../index';

const getField = (placeholder = 'Add tag') =>
  screen.getByPlaceholderText(placeholder);

const keyPress = (key: string) =>
  fireEvent(getField(), 'keyPress', { nativeEvent: { key } });

describe('TagsInput', () => {
  it('renders with placeholder and default tags', () => {
    render(
      <TagsInput
        placeholder="Add tag"
        defaultValue={['react', 'native']}
        testID="tags"
      />
    );
    expect(screen.getByTestId('tags')).toBeTruthy();
    expect(getField()).toBeTruthy();
    expect(screen.getByText('react')).toBeTruthy();
    expect(screen.getByText('native')).toBeTruthy();
    expect(screen.getAllByLabelText('Remove')).toHaveLength(2);
  });

  it('renders label, description, error and required asterisk', () => {
    render(
      <TagsInput
        label="Tags"
        description="Press enter to add"
        error="At least one tag"
        required
      />
    );
    expect(screen.getByText(/Tags/)).toBeTruthy();
    expect(screen.getByText(' *')).toBeTruthy();
    expect(screen.getByText('Press enter to add')).toBeTruthy();
    expect(screen.getByText('At least one tag')).toBeTruthy();
    expect(screen.getByRole('alert')).toBeTruthy();
  });

  it('adds a tag on submit (uncontrolled)', () => {
    const onChange = jest.fn();
    render(<TagsInput placeholder="Add tag" onChange={onChange} />);
    fireEvent.changeText(getField(), 'mantine');
    expect(getField().props.value).toBe('mantine');
    fireEvent(getField(), 'submitEditing');
    expect(onChange).toHaveBeenCalledWith(['mantine']);
    expect(screen.getByText('mantine')).toBeTruthy();
    expect(getField().props.value).toBe('');
  });

  it('does not submit empty search', () => {
    const onChange = jest.fn();
    render(<TagsInput placeholder="Add tag" onChange={onChange} />);
    fireEvent.changeText(getField(), '   ');
    fireEvent(getField(), 'submitEditing');
    expect(onChange).not.toHaveBeenCalled();
  });

  it('splits tags on the default split char and keeps the remainder', () => {
    const onChange = jest.fn();
    const onSearchChange = jest.fn();
    render(
      <TagsInput
        placeholder="Add tag"
        onChange={onChange}
        onSearchChange={onSearchChange}
      />
    );
    fireEvent.changeText(getField(), 'one,two,thr');
    expect(onChange).toHaveBeenCalledWith(['one', 'two']);
    expect(onSearchChange).toHaveBeenLastCalledWith('thr');
    expect(getField().props.value).toBe('thr');
  });

  it('supports custom split chars with regex special characters', () => {
    const onChange = jest.fn();
    render(
      <TagsInput
        placeholder="Add tag"
        splitChars={[';', '|', '.']}
        onChange={onChange}
      />
    );
    fireEvent.changeText(getField(), 'a;b|c.');
    expect(onChange).toHaveBeenCalledWith(['a', 'b', 'c']);
  });

  it('skips empty and whitespace-only parts when splitting', () => {
    const onChange = jest.fn();
    render(<TagsInput placeholder="Add tag" onChange={onChange} />);
    fireEvent.changeText(getField(), ' , ,x,');
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(['x']);
  });

  it('does not call onChange when split produces no new tags', () => {
    const onChange = jest.fn();
    render(<TagsInput placeholder="Add tag" onChange={onChange} />);
    fireEvent.changeText(getField(), ',');
    expect(onChange).not.toHaveBeenCalled();
    expect(getField().props.value).toBe('');
  });

  it('respects maxTags', () => {
    const onChange = jest.fn();
    render(
      <TagsInput
        placeholder="Add tag"
        maxTags={2}
        defaultValue={['react']}
        onChange={onChange}
      />
    );
    fireEvent.changeText(getField(), 'a,b,c,');
    expect(onChange).toHaveBeenCalledWith(['react', 'a']);
  });

  it('ignores duplicates (case-insensitive) and calls onDuplicate', () => {
    const onChange = jest.fn();
    const onDuplicate = jest.fn();
    render(
      <TagsInput
        placeholder="Add tag"
        defaultValue={['react']}
        onChange={onChange}
        onDuplicate={onDuplicate}
      />
    );
    fireEvent.changeText(getField(), 'React');
    fireEvent(getField(), 'submitEditing');
    expect(onChange).not.toHaveBeenCalled();
    expect(onDuplicate).toHaveBeenCalledWith('React');
    expect(getField().props.value).toBe('');
  });

  it('allows duplicates when allowDuplicates is set', () => {
    const onChange = jest.fn();
    render(
      <TagsInput
        placeholder="Add tag"
        defaultValue={['react']}
        allowDuplicates
        onChange={onChange}
      />
    );
    fireEvent.changeText(getField(), 'react');
    fireEvent(getField(), 'submitEditing');
    expect(onChange).toHaveBeenCalledWith(['react', 'react']);
    expect(screen.getAllByText('react')).toHaveLength(2);
  });

  it('removes a tag with its remove button', () => {
    const onChange = jest.fn();
    render(
      <TagsInput defaultValue={['react', 'native']} onChange={onChange} />
    );
    fireEvent.press(screen.getAllByLabelText('Remove')[1]!);
    expect(onChange).toHaveBeenCalledWith(['react']);
    expect(screen.queryByText('native')).toBeNull();
  });

  it('removes the last tag on Backspace when the search is empty', () => {
    const onChange = jest.fn();
    render(
      <TagsInput
        placeholder="Add tag"
        defaultValue={['react', 'native']}
        onChange={onChange}
      />
    );
    keyPress('Backspace');
    expect(onChange).toHaveBeenCalledWith(['react']);
    expect(screen.queryByText('native')).toBeNull();
  });

  it('does not remove tags on Backspace when search has text or on other keys', () => {
    const onChange = jest.fn();
    render(
      <TagsInput
        placeholder="Add tag"
        defaultValue={['react']}
        onChange={onChange}
      />
    );
    keyPress('a');
    expect(onChange).not.toHaveBeenCalled();
    fireEvent.changeText(getField(), 'x');
    keyPress('Backspace');
    expect(onChange).not.toHaveBeenCalled();
    expect(screen.getByText('react')).toBeTruthy();
  });

  it('does nothing on Backspace when there are no tags', () => {
    const onChange = jest.fn();
    render(<TagsInput placeholder="Add tag" onChange={onChange} />);
    keyPress('Backspace');
    expect(onChange).not.toHaveBeenCalled();
  });

  it('accepts the pending value on blur by default', () => {
    const onChange = jest.fn();
    render(<TagsInput placeholder="Add tag" onChange={onChange} />);
    fireEvent.changeText(getField(), 'blurred');
    fireEvent(getField(), 'blur');
    expect(onChange).toHaveBeenCalledWith(['blurred']);
  });

  it('does not accept the pending value on blur when acceptValueOnBlur is false', () => {
    const onChange = jest.fn();
    render(
      <TagsInput
        placeholder="Add tag"
        acceptValueOnBlur={false}
        onChange={onChange}
      />
    );
    fireEvent.changeText(getField(), 'pending');
    fireEvent(getField(), 'blur');
    expect(onChange).not.toHaveBeenCalled();
    expect(getField().props.value).toBe('pending');
  });

  describe('clearable', () => {
    it('hides the clear button when there are no tags', () => {
      render(<TagsInput clearable />);
      expect(screen.queryByLabelText('Clear')).toBeNull();
    });

    it('shows the clear button when there are tags', () => {
      render(<TagsInput clearable defaultValue={['a']} />);
      expect(screen.getByLabelText('Clear')).toBeTruthy();
    });

    it('hides the clear button when disabled or not clearable', () => {
      const { unmount } = render(
        <TagsInput clearable defaultValue={['a']} disabled />
      );
      expect(screen.queryByLabelText('Clear')).toBeNull();
      unmount();
      render(<TagsInput defaultValue={['a']} />);
      expect(screen.queryByLabelText('Clear')).toBeNull();
    });

    it('clears tags and search and calls onClear', () => {
      const onChange = jest.fn();
      const onClear = jest.fn();
      const onSearchChange = jest.fn();
      render(
        <TagsInput
          placeholder="Add tag"
          clearable
          defaultValue={['a', 'b']}
          onChange={onChange}
          onClear={onClear}
          onSearchChange={onSearchChange}
        />
      );
      fireEvent.changeText(getField(), 'typing');
      fireEvent.press(screen.getByLabelText('Clear'));
      expect(onChange).toHaveBeenCalledWith([]);
      expect(onClear).toHaveBeenCalledTimes(1);
      expect(onSearchChange).toHaveBeenLastCalledWith('');
      expect(screen.queryByText('a')).toBeNull();
      expect(getField().props.value).toBe('');
    });
  });

  describe('controlled', () => {
    it('does not update tags internally when value is controlled', () => {
      const onChange = jest.fn();
      const { rerender } = render(
        <TagsInput placeholder="Add tag" value={['one']} onChange={onChange} />
      );
      fireEvent.changeText(getField(), 'two');
      fireEvent(getField(), 'submitEditing');
      expect(onChange).toHaveBeenCalledWith(['one', 'two']);
      expect(screen.queryByText('two')).toBeNull();

      rerender(
        <TagsInput
          placeholder="Add tag"
          value={['one', 'two']}
          onChange={onChange}
        />
      );
      expect(screen.getByText('two')).toBeTruthy();
    });

    it('supports controlled searchValue', () => {
      const onSearchChange = jest.fn();
      const { rerender } = render(
        <TagsInput
          placeholder="Add tag"
          searchValue="fixed"
          onSearchChange={onSearchChange}
        />
      );
      expect(getField().props.value).toBe('fixed');
      fireEvent.changeText(getField(), 'changed');
      expect(onSearchChange).toHaveBeenCalledWith('changed');
      expect(getField().props.value).toBe('fixed');

      rerender(
        <TagsInput
          placeholder="Add tag"
          searchValue="next"
          onSearchChange={onSearchChange}
        />
      );
      expect(getField().props.value).toBe('next');
    });

    it('supports defaultSearchValue', () => {
      render(<TagsInput placeholder="Add tag" defaultSearchValue="init" />);
      expect(getField().props.value).toBe('init');
    });
  });

  describe('suggestions', () => {
    const data = ['React', 'Vue', 'Svelte'];

    it('shows suggestions on focus and hides them on blur', () => {
      render(<TagsInput placeholder="Add tag" data={data} />);
      expect(screen.queryByText('React')).toBeNull();
      fireEvent(getField(), 'focus');
      expect(screen.getByText('React')).toBeTruthy();
      expect(screen.getByText('Vue')).toBeTruthy();
      expect(screen.getByText('Svelte')).toBeTruthy();
      fireEvent(getField(), 'blur');
      expect(screen.queryByText('React')).toBeNull();
    });

    it('does not show suggestions without data or when disabled', () => {
      const { rerender } = render(<TagsInput placeholder="Add tag" />);
      fireEvent(getField(), 'focus');
      expect(screen.queryByRole('button')).toBeNull();

      rerender(<TagsInput placeholder="Add tag" data={data} disabled />);
      fireEvent(getField(), 'focus');
      expect(screen.queryByText('React')).toBeNull();
    });

    it('filters suggestions by search and excludes selected tags', () => {
      render(
        <TagsInput placeholder="Add tag" data={data} defaultValue={['vue']} />
      );
      fireEvent(getField(), 'focus');
      expect(screen.queryByText('Vue')).toBeNull();
      fireEvent.changeText(getField(), 'RE');
      expect(screen.getByText('React')).toBeTruthy();
      expect(screen.queryByText('Svelte')).toBeNull();
    });

    it('keeps selected suggestions when allowDuplicates is set', () => {
      render(
        <TagsInput
          placeholder="Add tag"
          data={data}
          defaultValue={['vue']}
          allowDuplicates
        />
      );
      fireEvent(getField(), 'focus');
      expect(screen.getByText('Vue')).toBeTruthy();
    });

    it('adds a suggestion when pressed', () => {
      const onChange = jest.fn();
      render(
        <TagsInput placeholder="Add tag" data={data} onChange={onChange} />
      );
      fireEvent(getField(), 'focus');
      fireEvent.changeText(getField(), 'sv');
      fireEvent.press(screen.getByLabelText('Svelte'));
      expect(onChange).toHaveBeenCalledWith(['Svelte']);
      expect(getField().props.value).toBe('');
      // now selected, so it disappears from the suggestions
      expect(screen.queryByLabelText('Svelte')).toBeNull();
      expect(screen.getByText('Svelte')).toBeTruthy();
    });

    it('shows nothingFoundMessage when no suggestion matches', () => {
      const { rerender } = render(
        <TagsInput
          placeholder="Add tag"
          data={data}
          nothingFoundMessage="Nothing here"
        />
      );
      fireEvent(getField(), 'focus');
      fireEvent.changeText(getField(), 'zzz');
      expect(screen.getByText('Nothing here')).toBeTruthy();

      rerender(<TagsInput placeholder="Add tag" data={data} />);
      expect(screen.queryByText('Nothing here')).toBeNull();
    });

    it('applies maxDropdownHeight to the suggestions list', () => {
      render(
        <TagsInput placeholder="Add tag" data={data} maxDropdownHeight={50} />
      );
      fireEvent(getField(), 'focus');
      const list = screen.getByText('React').parent;
      expect(list).toBeTruthy();
    });
  });

  it('disables the field and hides remove buttons when disabled', () => {
    render(
      <TagsInput placeholder="Add tag" defaultValue={['react']} disabled />
    );
    expect(getField().props.editable).toBe(false);
    expect(screen.queryByLabelText('Remove')).toBeNull();
    expect(screen.getByText('react')).toBeTruthy();
  });

  it('accepts size, radius, variant and style props', () => {
    const { rerender } = render(
      <TagsInput
        placeholder="Add tag"
        size="lg"
        radius="xl"
        variant="filled"
        style={{ margin: 5 }}
        defaultValue={['x']}
      />
    );
    expect(screen.getByText('x')).toBeTruthy();
    rerender(<TagsInput placeholder="Add tag" variant="unstyled" size="xs" />);
    expect(getField()).toBeTruthy();
  });

  it('field has button-like accessibility on remove/clear controls', () => {
    render(<TagsInput defaultValue={['react']} clearable />);
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThanOrEqual(2);
    expect(screen.getByLabelText('Clear').props.accessibilityRole).toBe(
      'button'
    );
  });

  it('has displayName', () => {
    expect(TagsInput.displayName).toBe('TagsInput');
  });
});
