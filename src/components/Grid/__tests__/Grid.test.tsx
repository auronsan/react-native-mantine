import { Text as RNText } from 'react-native';
import { render as rtlRender } from '@testing-library/react-native';
import { render, screen } from '../../../__tests__/test-utils';
import { Grid } from '../index';
import { ThemeProvider } from '../../../theme/theme-provider';
import { createTheme } from '../../../theme/create-theme';

const theme = createTheme();

describe('Grid with theme defaults', () => {
  it('falls back to its own defaults when theme defaultProps are null', () => {
    const customTheme = createTheme({
      components: {
        Grid: { defaultProps: { gutter: null, align: null, justify: null } },
        GridCol: { defaultProps: { span: null, offset: null, order: null } },
      },
    } as any);
    rtlRender(
      <ThemeProvider theme={customTheme} forceMode="light">
        <Grid testID="grid">
          <Grid.Col testID="col" />
        </Grid>
      </ThemeProvider>
    );

    expect(screen.getByTestId('grid')).toHaveStyle({
      alignItems: 'stretch',
      justifyContent: 'flex-start',
      margin: -customTheme.spacing.md / 2,
    });
    expect(screen.getByTestId('col')).toHaveStyle({ flexBasis: '100%', marginLeft: 0 });
  });
});

describe('Grid', () => {
  it('renders columns with span percentages and passes testID through', () => {
    render(
      <Grid testID="grid">
        <Grid.Col span={6} testID="half">
          <RNText>Half</RNText>
        </Grid.Col>
        <Grid.Col span={3} testID="quarter" />
        <Grid.Col testID="full" />
        {'text child'}
      </Grid>
    );

    expect(screen.getByText('Half')).toBeTruthy();
    expect(screen.getByTestId('grid')).toHaveStyle({
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'stretch',
      justifyContent: 'flex-start',
      margin: -theme.spacing.md / 2,
    });
    expect(screen.getByTestId('half')).toHaveStyle({
      flexBasis: '50%',
      flexGrow: 0,
      padding: theme.spacing.md / 2,
      marginLeft: 0,
    });
    expect(screen.getByTestId('quarter')).toHaveStyle({ flexBasis: '25%' });
    expect(screen.getByTestId('full')).toHaveStyle({ flexBasis: '100%' });
  });

  it('supports offset, order, custom columns and grow', () => {
    const { rerender } = render(
      <Grid columns={24}>
        <Grid.Col span={12} offset={6} order={2} testID="col" />
      </Grid>
    );
    expect(screen.getByTestId('col')).toHaveStyle({
      flexBasis: '50%',
      marginLeft: '25%',
      order: 2,
    } as any);

    rerender(
      <Grid grow>
        <Grid.Col span={4} testID="col" />
      </Grid>
    );
    expect(screen.getByTestId('col')).toHaveStyle({ flexBasis: 0, flexGrow: 4 });
  });

  it('resolves gutter from theme keys and numbers', () => {
    const { rerender } = render(
      <Grid gutter="xl" testID="grid">
        <Grid.Col testID="col" />
      </Grid>
    );
    expect(screen.getByTestId('grid')).toHaveStyle({ margin: -theme.spacing.xl / 2 });
    expect(screen.getByTestId('col')).toHaveStyle({ padding: theme.spacing.xl / 2 });

    rerender(
      <Grid gutter={20} testID="grid">
        <Grid.Col testID="col" />
      </Grid>
    );
    expect(screen.getByTestId('grid')).toHaveStyle({ margin: -10 });
    expect(screen.getByTestId('col')).toHaveStyle({ padding: 10 });
  });

  it('applies align, justify and custom styles', () => {
    render(
      <Grid align="center" justify="space-between" style={{ marginTop: 1 }} testID="grid">
        <Grid.Col style={{ marginBottom: 2 }} testID="col" />
      </Grid>
    );

    expect(screen.getByTestId('grid')).toHaveStyle({
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 1,
    });
    expect(screen.getByTestId('col')).toHaveStyle({ marginBottom: 2 });
  });

  it('renders a column outside of Grid with defaults', () => {
    render(<Grid.Col span={0} testID="col" />);
    expect(screen.getByTestId('col')).toHaveStyle({ flexBasis: '100%' });
  });
});
