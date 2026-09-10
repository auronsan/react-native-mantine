import { Text as RNText, View } from 'react-native';
import { render, screen, fireEvent } from '../../../__tests__/test-utils';
import { InputBase } from '../index';
import { createTheme } from '../../../theme/create-theme';

const theme = createTheme();

describe('InputBase', () => {
  it('renders label, description, children and passes testID through', () => {
    render(
      <InputBase label="Name" description="Your full name" testID="input-base">
        <RNText>Value</RNText>
      </InputBase>
    );

    expect(screen.getByTestId('input-base')).toHaveStyle({ width: '100%' });
    expect(screen.getByText('Name')).toBeTruthy();
    expect(screen.getByText('Your full name')).toBeTruthy();
    expect(screen.getByText('Value')).toBeTruthy();
    expect(screen.queryByText(' *')).toBeNull();
  });

  it('shows the required asterisk and error with alert role', () => {
    render(<InputBase label="Email" required error="Required field" />);

    expect(screen.getByText(' *')).toHaveStyle({ color: theme.colors.red![6] });
    const error = screen.getByText('Required field');
    expect(error.props.accessibilityRole).toBe('alert');
    expect(error.props.accessibilityLiveRegion).toBe('polite');
  });

  it('renders icon and right section', () => {
    render(
      <InputBase
        icon={<View testID="icon" />}
        rightSection={<View testID="right" />}
        rightSectionWidth={60}
      />
    );

    expect(screen.getByTestId('icon')).toBeTruthy();
    expect(screen.getByTestId('right')).toBeTruthy();
  });

  it('becomes pressable with button role when onPress is set', () => {
    const onPress = jest.fn();
    const { rerender } = render(
      <InputBase label="Pick" onPress={onPress}>
        <RNText>Frame</RNText>
      </InputBase>
    );

    const frame = screen.getByRole('button', { name: 'Pick' });
    fireEvent.press(frame);
    expect(onPress).toHaveBeenCalledTimes(1);

    rerender(
      <InputBase label={<RNText>Node</RNText>} onPress={onPress} accessibilityLabel="Custom" />
    );
    expect(screen.getByRole('button', { name: 'Custom' })).toBeTruthy();

    rerender(<InputBase label={<RNText>Node</RNText>} onPress={onPress} />);
    expect(screen.getByRole('button').props.accessibilityLabel).toBeUndefined();
  });

  it('disables the press handler and dims the frame when disabled', () => {
    const onPress = jest.fn();
    render(
      <InputBase label="Pick" onPress={onPress} disabled>
        <RNText>Frame</RNText>
      </InputBase>
    );

    const frame = screen.getByRole('button', { name: 'Pick' });
    expect(frame).toBeDisabled();
    fireEvent.press(frame);
    expect(onPress).not.toHaveBeenCalled();
    expect(screen.getByText('Frame').parent).toBeTruthy();
  });

  it('renders every variant, size and multiline', () => {
    (['default', 'filled', 'unstyled'] as const).forEach((variant) => {
      (['xs', 'sm', 'md', 'lg', 'xl'] as const).forEach((size) => {
        const { unmount } = render(
          <InputBase variant={variant} size={size} testID={`${variant}-${size}`}>
            <RNText>{`${variant}-${size}`}</RNText>
          </InputBase>
        );
        expect(screen.getByTestId(`${variant}-${size}`)).toBeTruthy();
        unmount();
      });
    });

    render(
      <InputBase multiline size={'huge' as any} radius="xl" testID="multiline">
        <RNText>Multi</RNText>
      </InputBase>
    );
    expect(screen.getByTestId('multiline')).toBeTruthy();
  });

  it('applies style and wrapperStyle', () => {
    render(
      <InputBase style={{ borderWidth: 3 }} wrapperStyle={{ margin: 4 }} testID="input-base">
        <RNText>Styled</RNText>
      </InputBase>
    );

    expect(screen.getByTestId('input-base')).toHaveStyle({ margin: 4 });
    expect(screen.getByText('Styled').parent).toBeTruthy();
  });
});
