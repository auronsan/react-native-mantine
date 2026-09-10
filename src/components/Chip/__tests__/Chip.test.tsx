import { Text as RNText, View } from 'react-native';
import { render, screen, fireEvent } from '../../../__tests__/test-utils';
import { Chip, ChipGroup } from '../index';

function checkedState(testID: string) {
  return screen.getByTestId(testID).props.accessibilityState.checked;
}

describe('Chip', () => {
  it('renders children with checkbox role and testID', () => {
    render(<Chip testID="chip">Awesome</Chip>);

    const chip = screen.getByTestId('chip');
    expect(screen.getByText('Awesome')).toBeTruthy();
    expect(chip.props.accessibilityRole).toBe('checkbox');
    expect(chip.props.accessibilityLabel).toBe('Awesome');
    expect(checkedState('chip')).toBe(false);
  });

  it('toggles checked state when uncontrolled', () => {
    const onChange = jest.fn();
    render(
      <Chip onChange={onChange} testID="chip">
        Toggle
      </Chip>
    );

    fireEvent.press(screen.getByTestId('chip'));
    expect(onChange).toHaveBeenCalledWith(true);
    expect(checkedState('chip')).toBe(true);

    fireEvent.press(screen.getByTestId('chip'));
    expect(onChange).toHaveBeenLastCalledWith(false);
    expect(checkedState('chip')).toBe(false);
  });

  it('respects defaultChecked', () => {
    render(
      <Chip defaultChecked testID="chip">
        Default
      </Chip>
    );
    expect(checkedState('chip')).toBe(true);
  });

  it('does not change state when controlled', () => {
    const onChange = jest.fn();
    render(
      <Chip checked={false} onChange={onChange} testID="chip">
        Controlled
      </Chip>
    );

    fireEvent.press(screen.getByTestId('chip'));
    expect(onChange).toHaveBeenCalledWith(true);
    expect(checkedState('chip')).toBe(false);
  });

  it('does nothing when disabled', () => {
    const onChange = jest.fn();
    render(
      <Chip disabled onChange={onChange} testID="chip">
        Disabled
      </Chip>
    );

    const chip = screen.getByTestId('chip');
    fireEvent.press(chip);
    expect(onChange).not.toHaveBeenCalled();
    expect(chip).toBeDisabled();
    expect(chip).toHaveStyle({ opacity: 0.6 });
  });

  it('shows the icon only when checked', () => {
    const { rerender } = render(
      <Chip icon={<View testID="chip-icon" />} checked={false}>
        Icon chip
      </Chip>
    );
    expect(screen.queryByTestId('chip-icon')).toBeNull();

    rerender(
      <Chip icon={<View testID="chip-icon" />} checked>
        Icon chip
      </Chip>
    );
    expect(screen.getByTestId('chip-icon')).toBeTruthy();
  });

  it('renders every variant when checked and unchecked', () => {
    (['filled', 'outline', 'light', 'other'] as const).forEach((variant) => {
      const { unmount } = render(
        <Chip variant={variant as any} checked color="teal" testID={variant}>
          {variant}
        </Chip>
      );
      expect(screen.getByTestId(variant)).toHaveStyle({
        borderWidth: variant === 'outline' ? 1 : 0,
      });
      expect(screen.getByText(variant)).toHaveStyle({ fontWeight: '600' });
      unmount();
    });

    render(
      <Chip variant="outline" checked={false} testID="unchecked">
        unchecked
      </Chip>
    );
    expect(screen.getByTestId('unchecked')).toHaveStyle({ borderWidth: 1 });
    expect(screen.getByText('unchecked')).toHaveStyle({ fontWeight: '500' });
  });

  it('applies text styles and textStyle to the wrapped label', () => {
    render(
      <Chip size="lg" textStyle={{ letterSpacing: 1 }} testID="chip">
        Styled
      </Chip>
    );

    const label = screen.getByText('Styled');
    expect(label).toHaveStyle({ fontSize: 16, fontWeight: '500', letterSpacing: 1 });
    // style keys must not leak onto the Text element as props
    expect(label.props.fontWeight).toBeUndefined();
    expect(label.props.letterSpacing).toBeUndefined();
  });

  it('renders every size, an unknown size and custom radius', () => {
    (['xs', 'sm', 'md', 'lg', 'xl'] as const).forEach((size) => {
      const { unmount } = render(
        <Chip size={size} radius="sm" testID={size}>
          {size}
        </Chip>
      );
      expect(screen.getByTestId(size)).toBeTruthy();
      unmount();
    });

    render(
      <Chip size={'giant' as any} testID="unknown">
        unknown
      </Chip>
    );
    expect(screen.getByTestId('unknown')).toBeTruthy();
  });

  it('uses radio role for type radio and supports accessibility labels', () => {
    const { rerender } = render(
      <Chip type="radio" testID="chip">
        Radio
      </Chip>
    );
    expect(screen.getByTestId('chip').props.accessibilityRole).toBe('radio');

    rerender(
      <Chip accessibilityLabel="Custom" testID="chip">
        Radio
      </Chip>
    );
    expect(screen.getByTestId('chip').props.accessibilityLabel).toBe('Custom');

    rerender(
      <Chip testID="chip">
        <RNText>Node child</RNText>
      </Chip>
    );
    expect(screen.getByTestId('chip').props.accessibilityLabel).toBe('Chip');
  });

  it('renders raw children when withTextWrapper is false and applies styles', () => {
    render(
      <Chip
        withTextWrapper={false}
        style={{ margin: 2 }}
        textStyle={{ letterSpacing: 1 }}
        testID="chip"
      >
        <RNText>Raw</RNText>
      </Chip>
    );

    expect(screen.getByText('Raw')).toBeTruthy();
    expect(screen.getByTestId('chip')).toHaveStyle({ margin: 2 });
  });
});

describe('Chip.Group', () => {
  it('is attached to Chip', () => {
    expect((Chip as any).Group).toBe(ChipGroup);
  });

  it('selects a single value and deselects it', () => {
    const onChange = jest.fn();
    render(
      <ChipGroup onChange={onChange} testID="group">
        <Chip value="react" testID="react">
          React
        </Chip>
        <Chip value="vue" testID="vue">
          Vue
        </Chip>
        <Chip testID="no-value">No value</Chip>
        <RNText>Not a chip</RNText>
      </ChipGroup>
    );

    expect(screen.getByTestId('group')).toBeTruthy();
    expect(screen.getByText('Not a chip')).toBeTruthy();

    fireEvent.press(screen.getByTestId('react'));
    expect(onChange).toHaveBeenLastCalledWith('react');
    expect(checkedState('react')).toBe(true);

    fireEvent.press(screen.getByTestId('vue'));
    expect(onChange).toHaveBeenLastCalledWith('vue');
    expect(checkedState('react')).toBe(false);
    expect(checkedState('vue')).toBe(true);

    fireEvent.press(screen.getByTestId('vue'));
    expect(onChange).toHaveBeenLastCalledWith('');
    expect(checkedState('vue')).toBe(false);

    // Chip without value keeps its own state
    fireEvent.press(screen.getByTestId('no-value'));
    expect(checkedState('no-value')).toBe(true);
  });

  it('selects multiple values', () => {
    const onChange = jest.fn();
    render(
      <ChipGroup multiple defaultValue={['vue']} onChange={onChange}>
        <Chip value="react" testID="react">
          React
        </Chip>
        <Chip value="vue" testID="vue">
          Vue
        </Chip>
      </ChipGroup>
    );

    expect(checkedState('vue')).toBe(true);

    fireEvent.press(screen.getByTestId('react'));
    expect(onChange).toHaveBeenLastCalledWith(['vue', 'react']);

    fireEvent.press(screen.getByTestId('vue'));
    expect(onChange).toHaveBeenLastCalledWith(['react']);
    expect(checkedState('vue')).toBe(false);
  });

  it('normalizes a non-array value in multiple mode', () => {
    // Mantine web decides selection by the value's shape (`Array.isArray`), so
    // a string value with `multiple` reads as a single selected chip there.
    // We mirror that reading (the chip is checked) but keep multiple mode
    // array-based: toggling always emits an array, and '' / null / undefined
    // mean "nothing selected".
    const onChange = jest.fn();
    const { rerender } = render(
      <ChipGroup multiple value={'react' as any} onChange={onChange}>
        <Chip value="react" testID="react">
          React
        </Chip>
        <Chip value="vue" testID="vue">
          Vue
        </Chip>
      </ChipGroup>
    );

    expect(checkedState('react')).toBe(true);
    expect(checkedState('vue')).toBe(false);

    fireEvent.press(screen.getByTestId('react'));
    expect(onChange).toHaveBeenLastCalledWith([]);

    fireEvent.press(screen.getByTestId('vue'));
    expect(onChange).toHaveBeenLastCalledWith(['react', 'vue']);

    rerender(
      <ChipGroup multiple value={'' as any} onChange={onChange}>
        <Chip value="react" testID="react">
          React
        </Chip>
        <Chip value="vue" testID="vue">
          Vue
        </Chip>
      </ChipGroup>
    );
    expect(checkedState('react')).toBe(false);
    expect(checkedState('vue')).toBe(false);

    fireEvent.press(screen.getByTestId('vue'));
    expect(onChange).toHaveBeenLastCalledWith(['vue']);
  });

  it('is controlled through the value prop', () => {
    const onChange = jest.fn();
    const { rerender } = render(
      <ChipGroup value="react" onChange={onChange} spacing="lg" style={{ margin: 1 }}>
        <Chip value="react" testID="react">
          React
        </Chip>
        <Chip value="vue" testID="vue">
          Vue
        </Chip>
      </ChipGroup>
    );

    expect(checkedState('react')).toBe(true);
    fireEvent.press(screen.getByTestId('vue'));
    expect(onChange).toHaveBeenCalledWith('vue');
    expect(checkedState('vue')).toBe(false);

    rerender(
      <ChipGroup value="vue" onChange={onChange}>
        <Chip value="react" testID="react">
          React
        </Chip>
        <Chip value="vue" testID="vue">
          Vue
        </Chip>
      </ChipGroup>
    );
    expect(checkedState('vue')).toBe(true);
  });
});
