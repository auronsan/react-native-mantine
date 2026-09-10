import React from 'react';
import { Text as RNText, TouchableOpacity } from 'react-native';
import { render as rtlRender } from '@testing-library/react-native';
import { render, screen, fireEvent, waitFor, act } from '../../../__tests__/test-utils';
import { FileButton, pickFiles } from '../index';
import { ThemeProvider } from '../../../theme/theme-provider';
import { createTheme } from '../../../theme/create-theme';
import * as registry from '../../../adapters/registry';
import type { MantineAdapters } from '../../../adapters/types';

const theme = createTheme();

const asset = {
  name: 'document.pdf',
  uri: 'file:///tmp/document.pdf',
  size: 1024,
  mimeType: 'application/pdf',
};

function Trigger({ onPress, loading }: { onPress: () => void; loading: boolean }) {
  return (
    <TouchableOpacity onPress={onPress} testID="trigger">
      <RNText>{loading ? 'Loading' : 'Pick'}</RNText>
    </TouchableOpacity>
  );
}

function renderWithPicker(
  ui: React.ReactElement,
  documentPicker: MantineAdapters['documentPicker']
) {
  return rtlRender(
    <ThemeProvider theme={theme} forceMode="light" adapters={{ documentPicker }}>
      {ui}
    </ThemeProvider>
  );
}

describe('pickFiles', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('maps picked assets and forwards options', async () => {
    const picker = jest.fn().mockResolvedValue({ canceled: false, assets: [asset] });
    const files = await pickFiles({ multiple: true, accept: ['image/*'] }, picker);

    expect(picker).toHaveBeenCalledWith({
      type: ['image/*'],
      multiple: true,
      copyToCacheDirectory: true,
    });
    expect(files).toEqual([asset]);
  });

  it('returns null when canceled, without assets, or without a picker', async () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});

    expect(await pickFiles({}, jest.fn().mockResolvedValue({ canceled: true }))).toBeNull();
    expect(
      await pickFiles({}, jest.fn().mockResolvedValue({ canceled: false, assets: null }))
    ).toBeNull();
    // undefined would select the default picker, so pass a non-function explicitly
    expect(await pickFiles({}, 'not-a-picker' as any)).toBeNull();
    expect(warn).toHaveBeenCalled();
  });

  it('falls back to the registered adapter (expo-document-picker mock)', async () => {
    const files = await pickFiles();
    expect(files).toEqual([asset]);
  });
});

describe('FileButton', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders the trigger and picks a single file through the fallback adapter', async () => {
    const onChange = jest.fn();
    render(<FileButton onChange={onChange}>{Trigger}</FileButton>);

    expect(screen.getByText('Pick')).toBeTruthy();
    fireEvent.press(screen.getByTestId('trigger'));

    await waitFor(() => expect(onChange).toHaveBeenCalledWith(asset));
    expect(screen.getByText('Pick')).toBeTruthy();
  });

  it('passes an array when multiple is set and reports loading state', async () => {
    const onChange = jest.fn();
    let resolvePick: (value: any) => void = () => {};
    const documentPicker = jest.fn(
      () =>
        new Promise<any>((resolve) => {
          resolvePick = resolve;
        })
    );

    renderWithPicker(
      <FileButton onChange={onChange} multiple accept="image/*">
        {Trigger}
      </FileButton>,
      documentPicker
    );

    fireEvent.press(screen.getByTestId('trigger'));
    await waitFor(() => expect(screen.getByText('Loading')).toBeTruthy());

    // Pressing while loading is ignored
    fireEvent.press(screen.getByTestId('trigger'));
    expect(documentPicker).toHaveBeenCalledTimes(1);

    await act(async () => {
      resolvePick({ canceled: false, assets: [asset, { ...asset, name: 'b.pdf' }] });
    });

    expect(onChange).toHaveBeenCalledWith([asset, { ...asset, name: 'b.pdf' }]);
    expect(screen.getByText('Pick')).toBeTruthy();
  });

  it('does not open the picker when disabled', async () => {
    const onChange = jest.fn();
    const documentPicker = jest.fn().mockResolvedValue({ canceled: false, assets: [asset] });
    renderWithPicker(
      <FileButton onChange={onChange} disabled>
        {Trigger}
      </FileButton>,
      documentPicker
    );

    fireEvent.press(screen.getByTestId('trigger'));
    await act(async () => {});
    expect(documentPicker).not.toHaveBeenCalled();
    expect(onChange).not.toHaveBeenCalled();
  });

  it('does not call onChange when the picker is canceled', async () => {
    const onChange = jest.fn();
    const documentPicker = jest.fn().mockResolvedValue({ canceled: true });
    renderWithPicker(<FileButton onChange={onChange}>{Trigger}</FileButton>, documentPicker);

    fireEvent.press(screen.getByTestId('trigger'));
    await waitFor(() => expect(documentPicker).toHaveBeenCalled());
    expect(onChange).not.toHaveBeenCalled();
  });

  it('passes null for a single selection with no assets', async () => {
    const onChange = jest.fn();
    const documentPicker = jest.fn().mockResolvedValue({ canceled: false, assets: [] });
    renderWithPicker(<FileButton onChange={onChange}>{Trigger}</FileButton>, documentPicker);

    fireEvent.press(screen.getByTestId('trigger'));
    await waitFor(() => expect(onChange).toHaveBeenCalledWith(null));
  });

  it('warns when no picker is available', async () => {
    jest.spyOn(registry, 'getAdapter').mockReturnValue(undefined);
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const onChange = jest.fn();
    render(<FileButton onChange={onChange}>{Trigger}</FileButton>);

    fireEvent.press(screen.getByTestId('trigger'));
    await waitFor(() => expect(warn).toHaveBeenCalled());
    expect(onChange).not.toHaveBeenCalled();
  });

  it('exposes a reset function through resetRef', async () => {
    const resetRef = React.createRef<() => void>();
    render(
      <FileButton onChange={() => {}} resetRef={resetRef}>
        {Trigger}
      </FileButton>
    );

    fireEvent.press(screen.getByTestId('trigger'));
    await act(async () => {});
    expect(typeof resetRef.current).toBe('function');
    expect(() => resetRef.current?.()).not.toThrow();
  });
});
