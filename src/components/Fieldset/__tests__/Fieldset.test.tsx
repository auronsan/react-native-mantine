import { Text as RNText, View } from 'react-native';
import { render, screen } from '../../../__tests__/test-utils';
import { Fieldset } from '../index';
import { createTheme } from '../../../theme/create-theme';

const theme = createTheme();

describe('Fieldset', () => {
  it('renders children with a legend and passes testID through', () => {
    render(
      <Fieldset legend="Personal info" testID="fieldset">
        <RNText>Inputs</RNText>
      </Fieldset>
    );

    const fieldset = screen.getByTestId('fieldset');
    expect(screen.getByText('Inputs')).toBeTruthy();
    expect(screen.getByText('Personal info')).toHaveStyle({
      fontSize: theme.fontSizes.sm,
    });
    expect(fieldset).toHaveStyle({ borderWidth: 1, marginTop: 10 });
    expect(fieldset.props.accessibilityState).toEqual({ disabled: false });
  });

  it('renders without a legend and with numeric or node legends', () => {
    const { rerender } = render(<Fieldset testID="fieldset" />);
    const flat = screen.getByTestId('fieldset').props.style.flat();
    expect(flat.some((s: any) => s && s.marginTop === 10)).toBe(false);

    rerender(<Fieldset legend={42} />);
    expect(screen.getByText('42')).toBeTruthy();

    rerender(<Fieldset legend={<View testID="legend-node" />} />);
    expect(screen.getByTestId('legend-node')).toBeTruthy();
  });

  it('renders every variant', () => {
    const { rerender } = render(<Fieldset variant="filled" testID="fieldset" />);
    expect(screen.getByTestId('fieldset')).toHaveStyle({
      borderWidth: 1,
      backgroundColor: theme.colors.gray![1],
    });

    rerender(<Fieldset variant="unstyled" legend="L" testID="fieldset" />);
    expect(screen.getByTestId('fieldset')).toHaveStyle({
      borderWidth: 0,
      backgroundColor: 'transparent',
    });

    rerender(<Fieldset variant="default" testID="fieldset" />);
    expect(screen.getByTestId('fieldset')).toHaveStyle({
      backgroundColor: theme.white,
    });
  });

  it('disables content and dims when disabled', () => {
    render(
      <Fieldset disabled testID="fieldset">
        <RNText>Inputs</RNText>
      </Fieldset>
    );

    const fieldset = screen.getByTestId('fieldset');
    expect(fieldset.props.accessibilityState).toEqual({ disabled: true });
    expect(fieldset).toHaveStyle({ opacity: 0.6 });
    expect(screen.UNSAFE_getAllByProps({ pointerEvents: 'none' }).length).toBeGreaterThan(0);
    expect(screen.UNSAFE_queryAllByProps({ pointerEvents: 'auto' })).toHaveLength(0);
  });

  it('applies radius, legendStyle and style', () => {
    render(
      <Fieldset
        radius={9}
        legend="Styled"
        legendStyle={{ letterSpacing: 1 }}
        style={{ margin: 2 }}
        testID="fieldset"
      />
    );

    expect(screen.getByTestId('fieldset')).toHaveStyle({ borderRadius: 9, margin: 2 });
    expect(screen.getByText('Styled')).toHaveStyle({ letterSpacing: 1 });
  });
});
