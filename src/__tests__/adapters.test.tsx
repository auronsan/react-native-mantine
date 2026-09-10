import React from 'react';
import { Text as RNText, View } from 'react-native';
import {
  render as rtlRender,
  fireEvent,
  waitFor,
  renderHook,
} from '@testing-library/react-native';
import { render } from './test-utils';
import { ThemeProvider } from '../theme/theme-provider';
import { createTheme } from '../theme/create-theme';
import { Icon } from '../components/Icon';
import { PlatformLinearGradient } from '../components/LinearGradient';
import { ThemeIcon } from '../components/ThemeIcon';
import { CopyButton } from '../components/CopyButton';
import { FileButton, pickFiles } from '../components/FileButton';
import { FileInput } from '../components/FileInput';
import {
  AdaptersContext,
  configureMantine,
  getAdapter,
  resetAdapters,
  useAdapter,
} from '../adapters';
import type {
  AdapterIconProps,
  AdapterLinearGradientProps,
  MantineAdapters,
} from '../adapters';
import useCachedResources from '../hooks/useCachedResources';

// Jest has no transform for font files; stand in for the bundled assets.
jest.mock('../fonts/Nunito-Regular.ttf', () => 'nunito-regular');
jest.mock('../fonts/Nunito-Bold.ttf', () => 'nunito-bold');
jest.mock('../fonts/Nunito-SemiBold.ttf', () => 'nunito-semibold');

const theme = createTheme();

const FakeIcon = ({ name, size, color }: AdapterIconProps) => (
  <View testID="fake-icon" accessibilityLabel={`${name}:${size}:${color}`} />
);

const OtherIcon = ({ name }: AdapterIconProps) => (
  <View testID="other-icon" accessibilityLabel={name} />
);

const FakeGradient = ({ colors, children }: AdapterLinearGradientProps) => (
  <View testID="fake-gradient" accessibilityLabel={colors.join(',')}>
    {children}
  </View>
);

afterEach(() => {
  resetAdapters();
});

describe('adapters: Icon', () => {
  it('renders the component injected through ThemeProvider adapters', () => {
    const { getByTestId, queryByText } = rtlRender(
      <ThemeProvider theme={theme} forceMode="light" adapters={{ Icon: FakeIcon }}>
        <Icon name="heart" size={24} color="red" />
      </ThemeProvider>
    );

    expect(getByTestId('fake-icon').props.accessibilityLabel).toBe(
      'heart:24:red'
    );
    expect(queryByText('[heart]')).toBeNull();
  });

  it('renders the component registered with configureMantine', () => {
    configureMantine({ Icon: FakeIcon });

    const { getByTestId } = render(<Icon name="star" />);

    expect(getByTestId('fake-icon').props.accessibilityLabel).toBe(
      'star:16:undefined'
    );
  });

  it('prefers ThemeProvider adapters over configureMantine', () => {
    configureMantine({ Icon: OtherIcon });

    const { getByTestId, queryByTestId } = rtlRender(
      <ThemeProvider theme={theme} forceMode="light" adapters={{ Icon: FakeIcon }}>
        <Icon name="heart" />
      </ThemeProvider>
    );

    expect(getByTestId('fake-icon')).toBeTruthy();
    expect(queryByTestId('other-icon')).toBeNull();
  });

  it('falls back to react-native-vector-icons when installed and nothing is configured', () => {
    const { getByTestId, queryByText } = render(
      <Icon name="heart" testID="vector-icon" />
    );

    // the jest mock for react-native-vector-icons renders a View with the testID
    expect(getByTestId('vector-icon')).toBeTruthy();
    expect(queryByText('[heart]')).toBeNull();
  });

  it('works with a raw AdaptersContext.Provider', () => {
    const { getByTestId } = rtlRender(
      <ThemeProvider theme={theme} forceMode="light">
        <AdaptersContext.Provider value={{ Icon: FakeIcon }}>
          <Icon name="bell" />
        </AdaptersContext.Provider>
      </ThemeProvider>
    );

    expect(getByTestId('fake-icon')).toBeTruthy();
  });
});

describe('adapters: LinearGradient', () => {
  it('PlatformLinearGradient uses the injected LinearGradient on native', () => {
    const { getByTestId, getByText } = rtlRender(
      <ThemeProvider
        theme={theme}
        forceMode="light"
        adapters={{ LinearGradient: FakeGradient }}
      >
        <PlatformLinearGradient colors={['#ff0000', '#0000ff']}>
          <RNText>child</RNText>
        </PlatformLinearGradient>
      </ThemeProvider>
    );

    expect(getByTestId('fake-gradient').props.accessibilityLabel).toBe(
      '#ff0000,#0000ff'
    );
    expect(getByText('child')).toBeTruthy();
  });

  it('PlatformLinearGradient uses the LinearGradient from configureMantine', () => {
    configureMantine({ LinearGradient: FakeGradient });

    const { getByTestId } = render(
      <PlatformLinearGradient colors={['#000', '#fff']} />
    );

    expect(getByTestId('fake-gradient')).toBeTruthy();
  });

  it('ThemeIcon gradient variant uses the injected LinearGradient', () => {
    const { getByTestId, getByText } = rtlRender(
      <ThemeProvider
        theme={theme}
        forceMode="light"
        adapters={{ LinearGradient: FakeGradient }}
      >
        <ThemeIcon variant="gradient">
          <RNText>icon</RNText>
        </ThemeIcon>
      </ThemeProvider>
    );

    expect(getByTestId('fake-gradient')).toBeTruthy();
    expect(getByText('icon')).toBeTruthy();
  });
});

describe('adapters: clipboard', () => {
  it('CopyButton copies through the injected clipboard', async () => {
    const setStringAsync = jest.fn().mockResolvedValue(undefined);

    const { getByText } = rtlRender(
      <ThemeProvider
        theme={theme}
        forceMode="light"
        adapters={{ clipboard: { setStringAsync } }}
      >
        <CopyButton value="hello">
          {({ copy, copied }) => (
            <RNText onPress={copy}>{copied ? 'Copied' : 'Copy'}</RNText>
          )}
        </CopyButton>
      </ThemeProvider>
    );

    fireEvent.press(getByText('Copy'));

    await waitFor(() => expect(getByText('Copied')).toBeTruthy());
    expect(setStringAsync).toHaveBeenCalledWith('hello');
  });
});

describe('adapters: documentPicker', () => {
  const documentPicker: MantineAdapters['documentPicker'] = jest
    .fn()
    .mockResolvedValue({
      canceled: false,
      assets: [{ name: 'injected.txt', uri: 'file:///injected.txt' }],
    });

  it('FileButton picks through the injected documentPicker', async () => {
    const onChange = jest.fn();

    const { getByText } = rtlRender(
      <ThemeProvider theme={theme} forceMode="light" adapters={{ documentPicker }}>
        <FileButton onChange={onChange} accept="text/plain">
          {({ onPress }) => <RNText onPress={onPress}>Upload</RNText>}
        </FileButton>
      </ThemeProvider>
    );

    fireEvent.press(getByText('Upload'));

    await waitFor(() =>
      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({ name: 'injected.txt' })
      )
    );
    expect(documentPicker).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'text/plain', multiple: false })
    );
  });

  it('FileInput picks through the injected documentPicker', async () => {
    const { getByLabelText, getByText } = rtlRender(
      <ThemeProvider theme={theme} forceMode="light" adapters={{ documentPicker }}>
        <FileInput label="Attachment" placeholder="Select file" />
      </ThemeProvider>
    );

    fireEvent.press(getByLabelText('Attachment'));

    await waitFor(() => expect(getByText('injected.txt')).toBeTruthy());
  });

  it('pickFiles uses configureMantine outside of React', async () => {
    const picker = jest.fn().mockResolvedValue({
      canceled: false,
      assets: [{ name: 'global.pdf', uri: 'file:///global.pdf' }],
    });
    configureMantine({ documentPicker: picker });

    const files = await pickFiles({ multiple: true });

    expect(files).toEqual([{ name: 'global.pdf', uri: 'file:///global.pdf' }]);
    expect(picker).toHaveBeenCalledWith(
      expect.objectContaining({ multiple: true, type: '*/*' })
    );
  });
});

describe('adapters: loadFonts', () => {
  it('useCachedResources loads fonts through the injected loader', async () => {
    const loadFonts = jest.fn().mockResolvedValue(undefined);
    configureMantine({ loadFonts });

    const { result } = renderHook(() => useCachedResources());

    await waitFor(() => expect(result.current).toBe(true));
    expect(loadFonts).toHaveBeenCalledTimes(1);
    expect(Object.keys(loadFonts.mock.calls[0][0])).toEqual([
      'Nunito',
      'Nunito Bold',
      'Nunito SemiBold',
    ]);
  });

  it('useCachedResources prefers an explicit loader option', async () => {
    const globalLoader = jest.fn().mockResolvedValue(undefined);
    const explicitLoader = jest.fn().mockResolvedValue(undefined);
    configureMantine({ loadFonts: globalLoader });

    const { result } = renderHook(() =>
      useCachedResources({ loadFonts: explicitLoader })
    );

    await waitFor(() => expect(result.current).toBe(true));
    expect(explicitLoader).toHaveBeenCalledTimes(1);
    expect(globalLoader).not.toHaveBeenCalled();
  });
});

describe('adapters: registry and hook', () => {
  it('getAdapter reads the registry and resetAdapters clears it', () => {
    expect(getAdapter('clipboard')).toBeDefined(); // expo-clipboard jest mock
    const clipboard = { setStringAsync: jest.fn() };
    configureMantine({ clipboard });
    expect(getAdapter('clipboard')).toBe(clipboard);

    resetAdapters();
    expect(getAdapter('clipboard')).not.toBe(clipboard);
  });

  it('configureMantine merges successive calls', () => {
    configureMantine({ Icon: FakeIcon });
    configureMantine({ LinearGradient: FakeGradient });

    expect(getAdapter('Icon')).toBe(FakeIcon);
    expect(getAdapter('LinearGradient')).toBe(FakeGradient);
  });

  it('useAdapter resolves context, then registry, then the optional dependency', () => {
    configureMantine({ Icon: OtherIcon });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AdaptersContext.Provider value={{ Icon: FakeIcon }}>
        {children}
      </AdaptersContext.Provider>
    );

    expect(renderHook(() => useAdapter('Icon'), { wrapper }).result.current).toBe(
      FakeIcon
    );
    expect(renderHook(() => useAdapter('Icon')).result.current).toBe(OtherIcon);
    // nothing configured for LinearGradient: falls back to the expo-linear-gradient jest mock
    expect(renderHook(() => useAdapter('LinearGradient')).result.current).toBe(
      require('expo-linear-gradient').LinearGradient
    );
  });
});
