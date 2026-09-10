import React, { useContext } from 'react';
import { Appearance, Text as RNText, View } from 'react-native';
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react-native';
import {
  ThemeProvider,
  Theme,
  useTheme,
  useComponentDefaultProps,
} from '../theme-provider';
import { createTheme } from '../create-theme';
import { AdaptersContext } from '../../adapters/context';
import { withTextWrapper } from '../utils/withTextWrapper';

// The jest moduleNameMapper for font files never matches (the pattern is
// over-escaped), so the bundled fonts are mocked directly like adapters.test.
jest.mock('../../fonts/Outfit-SemiBold.ttf', () => 'outfit-semibold');
jest.mock('../../fonts/Outfit-Bold.ttf', () => 'outfit-bold');

const theme = createTheme();

function ModeConsumer() {
  const t = useTheme() as any;
  return (
    <View>
      <RNText testID="mode">{t.colorScheme}</RNText>
      <RNText testID="ios">{String(t.isIOS)}</RNText>
      <RNText testID="toggle" onPress={t.toggleMode}>
        toggle
      </RNText>
      <RNText testID="set-dark" onPress={() => t.setCurrentMode('dark')}>
        set dark
      </RNText>
    </View>
  );
}

describe('ThemeProvider', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('provides theme values with forced mode', () => {
    render(
      <ThemeProvider theme={theme} forceMode="dark">
        <ModeConsumer />
      </ThemeProvider>
    );
    expect(screen.getByTestId('mode')).toHaveTextContent('dark');
    expect(screen.getByTestId('ios')).toHaveTextContent('true');
  });

  it('follows forceMode changes after mount', () => {
    const { rerender } = render(
      <ThemeProvider theme={theme} forceMode="light">
        <ModeConsumer />
      </ThemeProvider>
    );
    expect(screen.getByTestId('mode')).toHaveTextContent('light');

    rerender(
      <ThemeProvider theme={theme} forceMode="dark">
        <ModeConsumer />
      </ThemeProvider>
    );
    expect(screen.getByTestId('mode')).toHaveTextContent('dark');

    rerender(
      <ThemeProvider theme={theme} forceMode="light">
        <ModeConsumer />
      </ThemeProvider>
    );
    expect(screen.getByTestId('mode')).toHaveTextContent('light');
  });

  it('falls back to system color scheme, then light', () => {
    const spy = jest.spyOn(Appearance, 'getColorScheme');
    spy.mockReturnValue('dark');
    const first = render(
      <ThemeProvider theme={theme}>
        <ModeConsumer />
      </ThemeProvider>
    );
    expect(screen.getByTestId('mode')).toHaveTextContent('dark');
    first.unmount();

    spy.mockReturnValue(null);
    render(
      <ThemeProvider theme={theme}>
        <ModeConsumer />
      </ThemeProvider>
    );
    expect(screen.getByTestId('mode')).toHaveTextContent('light');
  });

  it('toggles and sets mode, syncing Appearance', () => {
    const setScheme = jest
      .spyOn(Appearance, 'setColorScheme')
      .mockImplementation(() => {});
    render(
      <ThemeProvider theme={theme} forceMode="light">
        <ModeConsumer />
      </ThemeProvider>
    );
    expect(setScheme).toHaveBeenCalledWith('light');

    fireEvent.press(screen.getByTestId('toggle'));
    expect(screen.getByTestId('mode')).toHaveTextContent('dark');
    expect(setScheme).toHaveBeenLastCalledWith('dark');

    fireEvent.press(screen.getByTestId('toggle'));
    expect(screen.getByTestId('mode')).toHaveTextContent('light');

    fireEvent.press(screen.getByTestId('set-dark'));
    expect(screen.getByTestId('mode')).toHaveTextContent('dark');
  });

  it('warns when Appearance.setColorScheme is unsupported', () => {
    jest.spyOn(Appearance, 'setColorScheme').mockImplementation(() => {
      throw new Error('unsupported');
    });
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    render(
      <ThemeProvider theme={theme} forceMode="light">
        <ModeConsumer />
      </ThemeProvider>
    );
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining('Appearance.setColorScheme is not supported'),
      expect.any(Error)
    );
  });

  it('provides adapters context only when adapters are given', () => {
    function AdapterConsumer() {
      const adapters = useContext(AdaptersContext);
      return <RNText testID="adapters">{adapters ? 'yes' : 'no'}</RNText>;
    }
    const loadFonts = jest.fn();
    const first = render(
      <ThemeProvider theme={theme} adapters={{ loadFonts }}>
        <AdapterConsumer />
      </ThemeProvider>
    );
    expect(screen.getByTestId('adapters')).toHaveTextContent('yes');
    first.unmount();

    render(
      <ThemeProvider theme={theme}>
        <AdapterConsumer />
      </ThemeProvider>
    );
    expect(screen.getByTestId('adapters')).toHaveTextContent('no');
  });
});

describe('Theme', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders children once resources are loaded', async () => {
    render(
      <Theme theme={{ primaryColor: 'red' }}>
        <ModeConsumer />
      </Theme>
    );
    await waitFor(() => expect(screen.getByTestId('mode')).toBeTruthy());
  });

  it('shows an ActivityIndicator while fonts load and warns on failure', async () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    let reject: (e: Error) => void = () => {};
    const loadFonts = jest.fn(
      () =>
        new Promise<void>((_, rej) => {
          reject = rej;
        })
    );
    render(
      <Theme adapters={{ loadFonts }} forceMode="dark">
        <ModeConsumer />
      </Theme>
    );
    expect(screen.queryByTestId('mode')).toBeNull();
    expect(loadFonts).toHaveBeenCalled();

    reject(new Error('boom'));
    await waitFor(() => expect(screen.getByTestId('mode')).toBeTruthy());
    expect(screen.getByTestId('mode')).toHaveTextContent('dark');
    expect(warn).toHaveBeenCalledWith(
      'Failed to load custom fonts:',
      expect.any(Error)
    );
  });
});

describe('useComponentDefaultProps', () => {
  function Consumer({
    componentTheme,
    props,
  }: {
    componentTheme: any;
    props: Record<string, any>;
  }) {
    const t = createTheme(componentTheme);
    return (
      <ThemeProvider theme={t} forceMode="light">
        <Inner props={props} />
      </ThemeProvider>
    );
  }

  function Inner({ props }: { props: Record<string, any> }) {
    const merged = useComponentDefaultProps(
      'Button',
      { size: 'sm', color: 'blue' },
      props
    );
    return <RNText testID="out">{JSON.stringify(merged)}</RNText>;
  }

  it('merges defaults, theme object defaults and explicit props', () => {
    render(
      <Consumer
        componentTheme={{
          components: { Button: { defaultProps: { color: 'red' } } },
        }}
        props={{ size: 'lg', extra: undefined }}
      />
    );
    expect(JSON.parse(screen.getByTestId('out').props.children)).toEqual({
      size: 'lg',
      color: 'red',
    });
  });

  it('supports theme defaultProps as a function', () => {
    render(
      <Consumer
        componentTheme={{
          components: {
            Button: {
              defaultProps: (t: any) => ({ color: t.primaryColor }),
            },
          },
        }}
        props={{}}
      />
    );
    expect(JSON.parse(screen.getByTestId('out').props.children)).toEqual({
      size: 'sm',
      color: 'blue',
    });
  });

  it('works without component theme entry', () => {
    render(<Consumer componentTheme={undefined} props={{ size: 'xl' }} />);
    expect(JSON.parse(screen.getByTestId('out').props.children)).toEqual({
      size: 'xl',
      color: 'blue',
    });
  });
});

describe('withTextWrapper', () => {
  it('wraps children in Text by default and passes text props', () => {
    render(
      <ThemeProvider theme={theme} forceMode="light">
        <View>{withTextWrapper('Hello', true, { testID: 'wrapped' })}</View>
      </ThemeProvider>
    );
    expect(screen.getByTestId('wrapped')).toHaveTextContent('Hello');
  });

  it('returns children untouched when shouldWrap is false', () => {
    const child = <View testID="raw" />;
    expect(withTextWrapper(child, false)).toBe(child);
    expect(React.isValidElement(withTextWrapper('x'))).toBe(true);
  });
});
