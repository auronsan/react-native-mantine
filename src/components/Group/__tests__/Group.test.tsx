import { Text as RNText } from 'react-native';
import { render, screen } from '../../../__tests__/test-utils';
import { Group } from '../index';

describe('Group', () => {
  it('renders children in a wrapping row with default spacing and passes testID through', () => {
    render(
      <Group testID="group">
        <RNText>One</RNText>
        <RNText>Two</RNText>
      </Group>
    );

    expect(screen.getByText('One')).toBeTruthy();
    expect(screen.getByText('Two')).toBeTruthy();
    expect(screen.getByTestId('group')).toHaveStyle({
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 5,
      justifyContent: 'flex-start',
      alignItems: 'center',
    });
  });

  it('maps position to justifyContent', () => {
    const cases = {
      apart: 'space-between',
      center: 'center',
      right: 'flex-end',
      left: 'flex-start',
    } as const;

    (Object.keys(cases) as Array<keyof typeof cases>).forEach((position) => {
      const { unmount } = render(<Group position={position} testID={position} />);
      expect(screen.getByTestId(position)).toHaveStyle({
        justifyContent: cases[position],
      });
      unmount();
    });
  });

  it('maps align values to alignItems', () => {
    const cases = {
      start: 'flex-start',
      center: 'center',
      end: 'flex-end',
      baseline: 'baseline',
      stretch: 'stretch',
      unknown: 'center',
    } as const;

    (Object.keys(cases) as Array<keyof typeof cases>).forEach((align) => {
      const { unmount } = render(<Group align={align as any} testID={align} />);
      expect(screen.getByTestId(align)).toHaveStyle({ alignItems: cases[align] });
      unmount();
    });
  });

  it('uses alignCenter and alignBottom flags when align is not given', () => {
    const { rerender } = render(<Group alignCenter={false} alignBottom testID="group" />);
    expect(screen.getByTestId('group')).toHaveStyle({ alignItems: 'flex-end' });

    rerender(<Group alignCenter={false} testID="group" />);
    expect(screen.getByTestId('group')).toHaveStyle({ alignItems: 'flex-start' });
  });

  it('supports noWrap, spacing and custom style', () => {
    render(<Group noWrap spacing={12} style={{ padding: 2 }} testID="group" />);
    expect(screen.getByTestId('group')).toHaveStyle({
      flexWrap: 'nowrap',
      gap: 12,
      padding: 2,
    });
  });
});
