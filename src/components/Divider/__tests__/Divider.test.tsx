import { Text as RNText } from 'react-native';
import { render, screen } from '../../../__tests__/test-utils';
import { Divider } from '../index';
import { createTheme } from '../../../theme/create-theme';

const theme = createTheme();

describe('Divider', () => {
  it('renders a horizontal line by default and passes testID through', () => {
    render(<Divider testID="divider" />);

    expect(screen.getByTestId('divider')).toHaveStyle({
      flexDirection: 'row',
      width: '100%',
      borderBottomWidth: 2,
      borderBottomColor: theme.colors.gray![3],
      borderStyle: 'solid',
    });
  });

  it('renders a vertical line', () => {
    render(<Divider orientation="vertical" testID="divider" />);

    expect(screen.getByTestId('divider')).toHaveStyle({
      flexDirection: 'column',
      height: '100%',
      borderLeftWidth: 2,
    });
  });

  it('supports named, numeric and unknown sizes', () => {
    const expected = { xs: 1, sm: 2, md: 3, lg: 4, xl: 5 };
    (Object.keys(expected) as Array<keyof typeof expected>).forEach((size) => {
      const { unmount } = render(<Divider size={size} testID={size} />);
      expect(screen.getByTestId(size)).toHaveStyle({
        borderBottomWidth: expected[size],
      });
      unmount();
    });

    render(<Divider size={7} testID="numeric" />);
    expect(screen.getByTestId('numeric')).toHaveStyle({ borderBottomWidth: 7 });

    render(<Divider size={'huge' as any} testID="unknown" />);
    expect(screen.getByTestId('unknown')).toHaveStyle({ borderBottomWidth: 2 });
  });

  it('uses theme colors and falls back for unknown colors', () => {
    const { rerender } = render(<Divider color="red" testID="divider" />);
    expect(screen.getByTestId('divider')).toHaveStyle({
      borderBottomColor: theme.colors.red![3],
    });

    rerender(<Divider color={'not-a-color' as any} testID="divider" />);
    expect(screen.getByTestId('divider')).toHaveStyle({
      borderBottomColor: theme.colors.gray![3],
    });
  });

  it('renders dashed and dotted variants', () => {
    const { rerender } = render(<Divider variant="dashed" testID="divider" />);
    expect(screen.getByTestId('divider')).toHaveStyle({ borderStyle: 'dashed' });

    rerender(<Divider variant="dotted" testID="divider" />);
    expect(screen.getByTestId('divider')).toHaveStyle({ borderStyle: 'dotted' });
  });

  it('renders a string label in every position', () => {
    (['left', 'center', 'right'] as const).forEach((labelPosition) => {
      const { unmount } = render(
        <Divider label="Section" labelPosition={labelPosition} testID="divider" />
      );
      expect(screen.getByText('Section')).toHaveStyle({
        fontSize: theme.fontSizes.sm,
      });
      expect(screen.getByTestId('divider')).toBeTruthy();
      unmount();
    });
  });

  it('renders a node label and vertical label container', () => {
    render(
      <Divider
        orientation="vertical"
        label={<RNText testID="label-node">Node</RNText>}
        testID="divider"
      />
    );
    expect(screen.getByTestId('label-node')).toBeTruthy();
  });

  it('merges custom style', () => {
    render(<Divider style={{ marginVertical: 4 }} testID="divider" />);
    expect(screen.getByTestId('divider')).toHaveStyle({ marginVertical: 4 });
  });
});
