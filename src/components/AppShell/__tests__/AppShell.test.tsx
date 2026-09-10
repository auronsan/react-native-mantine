import { Text as RNText } from 'react-native';
import { render, screen } from '../../../__tests__/test-utils';
import { AppShell } from '../index';
import { createTheme } from '../../../theme/create-theme';

const theme = createTheme();

describe('AppShell', () => {
  it('renders all sections and passes testID through', () => {
    render(
      <AppShell
        header={{ height: 60 }}
        footer={{ height: 40 }}
        navbar={{ width: 200 }}
        aside={{ width: 150 }}
        testID="shell"
      >
        <AppShell.Header testID="header">
          <RNText>Header</RNText>
        </AppShell.Header>
        <AppShell.Navbar testID="navbar">
          <RNText>Navbar</RNText>
        </AppShell.Navbar>
        <AppShell.Aside testID="aside">
          <RNText>Aside</RNText>
        </AppShell.Aside>
        <AppShell.Footer testID="footer">
          <RNText>Footer</RNText>
        </AppShell.Footer>
        <AppShell.Main testID="main">
          <RNText>Main</RNText>
        </AppShell.Main>
      </AppShell>
    );

    expect(screen.getByTestId('shell')).toBeTruthy();
    ['Header', 'Navbar', 'Aside', 'Footer', 'Main'].forEach((label) => {
      expect(screen.getByText(label)).toBeTruthy();
    });

    expect(screen.getByTestId('header')).toHaveStyle({ height: 60, top: 0 });
    expect(screen.getByTestId('footer')).toHaveStyle({ height: 40, bottom: 0 });
    expect(screen.getByTestId('navbar')).toHaveStyle({
      width: 200,
      top: 60,
      bottom: 40,
    });
    expect(screen.getByTestId('aside')).toHaveStyle({
      width: 150,
      top: 60,
      bottom: 40,
    });
    expect(screen.getByTestId('main')).toHaveStyle({
      paddingTop: 60 + theme.spacing.md,
      paddingBottom: 40 + theme.spacing.md,
      paddingLeft: 200 + theme.spacing.md,
      paddingRight: 150 + theme.spacing.md,
    });
  });

  it('hides collapsed navbar and aside and removes their offsets', () => {
    render(
      <AppShell
        navbar={{ width: 200, collapsed: true }}
        aside={{ width: 150, collapsed: true }}
        padding={0}
      >
        <AppShell.Navbar testID="navbar">
          <RNText>Navbar</RNText>
        </AppShell.Navbar>
        <AppShell.Aside testID="aside">
          <RNText>Aside</RNText>
        </AppShell.Aside>
        <AppShell.Main testID="main">
          <RNText>Main</RNText>
        </AppShell.Main>
      </AppShell>
    );

    expect(screen.queryByTestId('navbar')).toBeNull();
    expect(screen.queryByTestId('aside')).toBeNull();
    expect(screen.getByTestId('main')).toHaveStyle({
      paddingTop: 0,
      paddingBottom: 0,
      paddingLeft: 0,
      paddingRight: 0,
    });
  });

  it('renders nothing for Navbar/Aside without configuration', () => {
    render(
      <AppShell>
        <AppShell.Navbar testID="navbar" />
        <AppShell.Aside testID="aside" />
        <AppShell.Header testID="header" />
        <AppShell.Footer testID="footer" />
      </AppShell>
    );

    expect(screen.queryByTestId('navbar')).toBeNull();
    expect(screen.queryByTestId('aside')).toBeNull();
    expect(screen.getByTestId('header')).toHaveStyle({ height: 0 });
    expect(screen.getByTestId('footer')).toHaveStyle({ height: 0 });
  });

  it('supports theme spacing keys and numeric padding', () => {
    const { rerender } = render(
      <AppShell padding="xl">
        <AppShell.Main testID="main" />
      </AppShell>
    );
    expect(screen.getByTestId('main')).toHaveStyle({
      paddingTop: theme.spacing.xl,
    });

    rerender(
      <AppShell padding={7}>
        <AppShell.Main testID="main" />
      </AppShell>
    );
    expect(screen.getByTestId('main')).toHaveStyle({ paddingTop: 7 });

    rerender(
      <AppShell padding={'unknown' as any}>
        <AppShell.Main testID="main" />
      </AppShell>
    );
    expect(screen.getByTestId('main')).toHaveStyle({
      paddingTop: theme.spacing.md,
    });
  });

  it('applies custom styles to the root and sections', () => {
    render(
      <AppShell style={{ opacity: 0.9 }} testID="shell" header={{ height: 10 }}>
        <AppShell.Header style={{ opacity: 0.8 }} testID="header" />
        <AppShell.Main style={{ opacity: 0.7 }} testID="main" />
      </AppShell>
    );

    expect(screen.getByTestId('shell')).toHaveStyle({ opacity: 0.9 });
    expect(screen.getByTestId('header')).toHaveStyle({ opacity: 0.8 });
    expect(screen.getByTestId('main')).toHaveStyle({ opacity: 0.7 });
  });
});
