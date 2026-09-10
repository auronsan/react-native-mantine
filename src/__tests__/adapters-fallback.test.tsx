/**
 * Behaviour when no adapter is configured AND none of the optional
 * dependencies are installed. The module factories throw so that the lazy
 * `require` inside the adapter fallbacks fails, like a missing package.
 */
import { Text as RNText } from 'react-native';
import { fireEvent, waitFor } from '@testing-library/react-native';
import { render } from './test-utils';

jest.mock('react-native-vector-icons/FontAwesome', () => {
  throw new Error("Cannot find module 'react-native-vector-icons/FontAwesome'");
});
jest.mock('expo-linear-gradient', () => {
  throw new Error("Cannot find module 'expo-linear-gradient'");
});
jest.mock('expo-clipboard', () => {
  throw new Error("Cannot find module 'expo-clipboard'");
});
jest.mock('expo-document-picker', () => {
  throw new Error("Cannot find module 'expo-document-picker'");
});
jest.mock('expo-font', () => {
  throw new Error("Cannot find module 'expo-font'");
});

const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

// Importing the library must stay silent when nothing is installed.
const { Icon } = require('../components/Icon');
const { PlatformLinearGradient } = require('../components/LinearGradient');
const { ThemeIcon } = require('../components/ThemeIcon');
const { CopyButton } = require('../components/CopyButton');
const { FileButton } = require('../components/FileButton');
const { resetAdapters, getAdapter } = require('../adapters');
const { resetAdapterWarnings } = require('../adapters/context');
const useCachedResources = require('../hooks/useCachedResources').default;

describe('adapters fallback without optional dependencies', () => {
  beforeEach(() => {
    warnSpy.mockClear();
  });

  afterAll(() => {
    warnSpy.mockRestore();
  });

  it('does not warn at import time', () => {
    expect(warnSpy).not.toHaveBeenCalled();
  });

  it('Icon renders the icon name as text and warns once in dev', () => {
    const { getByText, rerender } = render(<Icon name="heart" size={20} />);

    expect(getByText('[heart]')).toBeTruthy();
    expect(getByText('[heart]').props.style).toEqual([
      { fontSize: 20, color: undefined },
      undefined,
    ]);
    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(warnSpy.mock.calls[0]?.[0]).toMatch(/No Icon adapter available/);

    rerender(<Icon name="star" />);
    render(<Icon name="bell" />);
    expect(warnSpy).toHaveBeenCalledTimes(1);
  });

  it('PlatformLinearGradient falls back to a solid first color', () => {
    const { getByText, toJSON } = render(
      <PlatformLinearGradient colors={['#ff0000', '#0000ff']} style={{ padding: 4 }}>
        <RNText>child</RNText>
      </PlatformLinearGradient>
    );

    expect(getByText('child')).toBeTruthy();
    const root = toJSON() as any;
    expect(root.type).toBe('View');
    expect(root.props.style).toEqual({
      padding: 4,
      backgroundColor: '#ff0000',
    });
  });

  it('ThemeIcon gradient variant falls back to a solid color', () => {
    const { getByText } = render(
      <ThemeIcon variant="gradient" testID="theme-icon">
        <RNText>icon</RNText>
      </ThemeIcon>
    );

    expect(getByText('icon')).toBeTruthy();
  });

  it('CopyButton warns at copy time and stays not copied', async () => {
    const { getByText } = render(
      <CopyButton value="hello">
        {({ copy, copied }: { copy: () => void; copied: boolean }) => (
          <RNText onPress={copy}>{copied ? 'Copied' : 'Copy'}</RNText>
        )}
      </CopyButton>
    );

    warnSpy.mockClear();
    fireEvent.press(getByText('Copy'));

    await waitFor(() => expect(warnSpy).toHaveBeenCalledTimes(1));
    expect(warnSpy.mock.calls[0]?.[0]).toMatch(/Clipboard functionality is not available/);
    expect(getByText('Copy')).toBeTruthy();
  });

  it('FileButton warns at press time and does not call onChange', async () => {
    const onChange = jest.fn();
    const { getByText } = render(
      <FileButton onChange={onChange}>
        {({ onPress }: { onPress: () => void }) => (
          <RNText onPress={onPress}>Upload</RNText>
        )}
      </FileButton>
    );

    warnSpy.mockClear();
    fireEvent.press(getByText('Upload'));

    await waitFor(() => expect(warnSpy).toHaveBeenCalledTimes(1));
    expect(warnSpy.mock.calls[0]?.[0]).toMatch(/File picking is not available/);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('useCachedResources completes without a font loader', async () => {
    const { renderHook } = require('@testing-library/react-native');
    const { result } = renderHook(() => useCachedResources());

    await waitFor(() => expect(result.current).toBe(true));
  });

  it('getAdapter returns undefined for every adapter', () => {
    resetAdapters();
    resetAdapterWarnings();

    expect(getAdapter('Icon')).toBeUndefined();
    expect(getAdapter('LinearGradient')).toBeUndefined();
    expect(getAdapter('clipboard')).toBeUndefined();
    expect(getAdapter('documentPicker')).toBeUndefined();
    expect(getAdapter('loadFonts')).toBeUndefined();
  });
});
