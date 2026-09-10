import { StyleSheet, Text as RNText, View } from 'react-native';
import { render, screen } from '../../../__tests__/test-utils';
import { Indicator } from '../index';
import { createTheme } from '../../../theme/create-theme';

const theme = createTheme();

/** Style of the closest host View above the label text, i.e. the indicator */
function indicatorStyle() {
  let node = screen.getByText('•').parent;
  while (node && typeof node.type !== 'string') {
    node = node.parent;
  }
  return StyleSheet.flatten(node?.props.style) as any;
}

describe('Indicator', () => {
  it('wraps children with an absolutely positioned dot and passes testID through', () => {
    render(
      <Indicator label="•" testID="indicator">
        <RNText>Avatar</RNText>
      </Indicator>
    );

    expect(screen.getByText('Avatar')).toBeTruthy();
    expect(screen.getByTestId('indicator')).toHaveStyle({ position: 'relative' });
    expect(indicatorStyle()).toEqual(
      expect.objectContaining({
        position: 'absolute',
        top: 0,
        right: 0,
        width: 10,
        height: 10,
        backgroundColor: theme.colors.red![6],
        opacity: 1,
      })
    );
  });

  it('renders string labels as text and node labels as-is', () => {
    const { rerender } = render(<Indicator label="9" />);
    expect(screen.getByText('9')).toHaveStyle({ fontWeight: '700', color: theme.white });

    rerender(<Indicator label={<View testID="label-node" />} />);
    expect(screen.getByTestId('label-node')).toBeTruthy();
  });

  it('supports every position', () => {
    const positions = [
      'top-start',
      'top-end',
      'bottom-start',
      'bottom-end',
      'top-center',
      'bottom-center',
      'middle-start',
      'middle-end',
      'middle-center',
      'unknown',
    ] as const;

    positions.forEach((position) => {
      const { unmount } = render(
        <Indicator label="•" position={position as any} offset={4} />
      );
      const style = indicatorStyle();
      expect(style.position).toBe('absolute');
      if (position.includes('center') || position.startsWith('middle')) {
        expect(style.transform).toBeTruthy();
      }
      unmount();
    });
  });

  it('supports named and numeric sizes', () => {
    (['xs', 'sm', 'md', 'lg', 'xl'] as const).forEach((size) => {
      const { unmount } = render(<Indicator label="•" size={size} />);
      expect(indicatorStyle().width).toBeGreaterThan(0);
      unmount();
    });

    const { rerender } = render(<Indicator label="•" size={20} />);
    expect(indicatorStyle().width).toBe(20);

    rerender(<Indicator label="•" size={'giant' as any} />);
    expect(indicatorStyle().width).toBe(10);
  });

  it('applies color, radius, border and disabled styles', () => {
    const { rerender } = render(
      <Indicator label="•" color="green" radius={2} withBorder />
    );
    expect(indicatorStyle()).toEqual(
      expect.objectContaining({
        backgroundColor: theme.colors.green![6],
        borderRadius: 2,
        borderWidth: 2,
        borderColor: theme.white,
      })
    );

    rerender(<Indicator label="•" disabled />);
    expect(indicatorStyle()).toEqual(
      expect.objectContaining({
        backgroundColor: theme.colors.gray![5],
        opacity: 0.5,
      })
    );
  });

  it('renders inline without wrapping children', () => {
    render(
      <Indicator label="•" inline testID="indicator">
        <RNText>Child</RNText>
      </Indicator>
    );

    expect(screen.queryByText('Child')).toBeNull();
    expect(indicatorStyle().position).toBeUndefined();
  });

  it('accepts processing, withPulse and style props', () => {
    render(
      <Indicator label="3" processing withPulse style={{ margin: 3 }} testID="indicator" />
    );
    expect(screen.getByTestId('indicator')).toHaveStyle({ margin: 3 });
    expect(screen.getByLabelText('3').props.accessibilityState).toEqual({ busy: true });
  });
});
