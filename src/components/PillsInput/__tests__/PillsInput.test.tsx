import React from 'react';
import { TextInput as RNTextInput } from 'react-native';
import { render, screen, fireEvent } from '../../../__tests__/test-utils';
import { PillsInput, PillsInputField } from '../index';
import { Pill } from '../../Pill';
import { createTheme } from '../../../theme/create-theme';
import { INPUT_SIZES } from '../../Input';

const theme = createTheme();

// The pressable container has no testID, walk up from the field to the
// nearest host ancestor (the View rendered by Pressable).
const getContainer = () => {
  let node = screen.getByTestId('field').parent;
  while (node && typeof node.type !== 'string') {
    node = node.parent;
  }
  return node as NonNullable<typeof node>;
};

describe('PillsInput', () => {
  it('renders label, pills and field with defaults', () => {
    render(
      <PillsInput label="Tags" testID="pills-input">
        <Pill>Existing</Pill>
        <PillsInputField placeholder="Add more" />
      </PillsInput>
    );
    expect(screen.getByText('Tags')).toBeTruthy();
    expect(screen.getByText('Existing')).toBeTruthy();
    expect(screen.getByPlaceholderText('Add more')).toBeTruthy();
    expect(screen.getByTestId('pills-input')).toBeTruthy();
    expect(screen.queryByText(' *')).toBeNull();
  });

  it('exposes PillsInputField as PillsInput.Field', () => {
    expect(PillsInput.Field).toBe(PillsInputField);
    expect(PillsInput.displayName).toBe('PillsInput');
    expect(PillsInput.Field.displayName).toBe('PillsInput.Field');
  });

  it('renders through the typed compound API', () => {
    const onChangeText = jest.fn();
    render(
      <PillsInput label="Tags" testID="pills-input">
        <Pill>Existing</Pill>
        <PillsInput.Field
          testID="field"
          placeholder="Add more"
          onChangeText={onChangeText}
        />
      </PillsInput>
    );
    expect(screen.getByText('Existing')).toBeTruthy();
    fireEvent.changeText(screen.getByPlaceholderText('Add more'), 'x');
    expect(onChangeText).toHaveBeenCalledWith('x');
    expect(screen.getByTestId('field')).toHaveStyle({
      fontSize: theme.fontSizes.sm,
    });
  });

  it('renders required asterisk, description and error', () => {
    render(
      <PillsInput
        label="Tags"
        required
        description="Pick some"
        error="Required field"
      >
        <PillsInputField />
      </PillsInput>
    );
    expect(screen.getByText(' *')).toBeTruthy();
    expect(screen.getByText('Pick some')).toBeTruthy();
    const error = screen.getByText('Required field');
    expect(error.props.accessibilityRole).toBe('alert');
  });

  it('applies error border color', () => {
    render(
      <PillsInput error="Bad" style={{ margin: 1 }} testID="root">
        <PillsInputField testID="field" />
      </PillsInput>
    );
    const container = getContainer();
    expect(container).toHaveStyle({
      borderColor: theme.fn.themeColor('red', 6),
      margin: 1,
    });
  });

  it('applies default variant styles', () => {
    render(
      <PillsInput>
        <PillsInputField testID="field" />
      </PillsInput>
    );
    const container = getContainer();
    expect(container).toHaveStyle({
      backgroundColor: theme.white,
      borderWidth: 1,
      borderColor: theme.fn.themeColor('gray', 4),
      minHeight: INPUT_SIZES.sm,
    });
  });

  it('applies filled variant styles', () => {
    render(
      <PillsInput variant="filled">
        <PillsInputField testID="field" />
      </PillsInput>
    );
    const container = getContainer();
    expect(container).toHaveStyle({
      backgroundColor: theme.fn.themeColor('gray', 1),
      borderColor: 'transparent',
    });
  });

  it('applies unstyled variant styles', () => {
    render(
      <PillsInput variant="unstyled">
        <PillsInputField testID="field" />
      </PillsInput>
    );
    const container = getContainer();
    expect(container).toHaveStyle({
      backgroundColor: 'transparent',
      borderWidth: 0,
      paddingHorizontal: 0,
    });
  });

  it.each(['xs', 'sm', 'md', 'lg', 'xl'] as const)(
    'applies size %s to container and field',
    (size) => {
      render(
        <PillsInput size={size}>
          <PillsInputField testID="field" />
        </PillsInput>
      );
      const field = screen.getByTestId('field');
      expect(field).toHaveStyle({ fontSize: theme.fontSizes[size] });
      expect(getContainer()).toHaveStyle({
        minHeight: INPUT_SIZES[size],
      });
    }
  );

  it('falls back to sm height for unknown size', () => {
    render(
      <PillsInput size={'giant' as any}>
        <PillsInputField testID="field" />
      </PillsInput>
    );
    expect(getContainer()).toHaveStyle({
      minHeight: INPUT_SIZES.sm,
    });
  });

  it('applies radius', () => {
    render(
      <PillsInput radius="xl">
        <PillsInputField testID="field" />
      </PillsInput>
    );
    expect(getContainer()).toHaveStyle({
      borderRadius: theme.fn.radius('xl') as number,
    });
  });

  it('applies disabled styles and disables the field', () => {
    render(
      <PillsInput disabled>
        <PillsInputField testID="field" />
      </PillsInput>
    );
    const field = screen.getByTestId('field');
    expect(field.props.editable).toBe(false);
    expect(getContainer()).toHaveStyle({ opacity: 0.6 });
  });

  it('lets the field override editable', () => {
    render(
      <PillsInput disabled>
        <PillsInputField testID="field" editable />
      </PillsInput>
    );
    expect(screen.getByTestId('field').props.editable).toBe(true);
  });

  it('handles container press and forwards object refs', () => {
    const ref = React.createRef<RNTextInput>();
    render(
      <PillsInput>
        <PillsInputField testID="field" ref={ref} />
      </PillsInput>
    );
    // host refs are not instantiated in the test renderer, pressing the
    // container must still be safe
    expect(() => fireEvent.press(getContainer())).not.toThrow();
    expect(ref.current).toBeNull();
  });

  it('supports function refs on the field', () => {
    const ref = jest.fn();
    render(
      <PillsInput>
        <PillsInputField ref={ref} />
      </PillsInput>
    );
    expect(ref).toHaveBeenCalled();
  });

  it('does not press the container when disabled', () => {
    render(
      <PillsInput disabled>
        <PillsInputField testID="field" />
      </PillsInput>
    );
    expect(() => fireEvent.press(getContainer())).not.toThrow();
  });

  it('applies wrapperStyle', () => {
    render(<PillsInput wrapperStyle={{ marginTop: 9 }} testID="root" />);
    expect(screen.getByTestId('root')).toHaveStyle({
      marginTop: 9,
      width: '100%',
    });
  });

  it('handles text change and custom style on the field', () => {
    const onChangeText = jest.fn();
    render(
      <PillsInput>
        <PillsInputField
          testID="field"
          onChangeText={onChangeText}
          style={{ color: 'red' } as any}
        />
      </PillsInput>
    );
    const field = screen.getByTestId('field');
    fireEvent.changeText(field, 'new tag');
    expect(onChangeText).toHaveBeenCalledWith('new tag');
    expect(field).toHaveStyle({ color: 'red', flexGrow: 1 });
  });

  it('renders the field outside PillsInput with default context', () => {
    render(<PillsInputField testID="field" placeholder="Standalone" />);
    const field = screen.getByPlaceholderText('Standalone');
    expect(field.props.editable).toBe(true);
    expect(field).toHaveStyle({ fontSize: theme.fontSizes.sm });
  });

  it('passes accessibility props to the field', () => {
    render(
      <PillsInput label="Tags">
        <PillsInputField accessibilityLabel="Tag input" />
      </PillsInput>
    );
    expect(screen.getByLabelText('Tag input')).toBeTruthy();
  });
});
