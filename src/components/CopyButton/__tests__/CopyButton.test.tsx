import React from 'react';
import { Text as RNText, TouchableOpacity } from 'react-native';
import { render as rtlRender } from '@testing-library/react-native';
import { render, screen, fireEvent, act, waitFor } from '../../../__tests__/test-utils';
import { CopyButton } from '../index';
import { ThemeProvider } from '../../../theme/theme-provider';
import { createTheme } from '../../../theme/create-theme';
import * as registry from '../../../adapters/registry';

const theme = createTheme();

function Trigger({ copied, copy }: { copied: boolean; copy: () => void }) {
  return (
    <TouchableOpacity onPress={copy} testID="copy">
      <RNText>{copied ? 'Copied' : 'Copy'}</RNText>
    </TouchableOpacity>
  );
}

function renderWithClipboard(
  ui: React.ReactElement,
  clipboard: { setStringAsync: (text: string) => Promise<void> | void }
) {
  return rtlRender(
    <ThemeProvider theme={theme} forceMode="light" adapters={{ clipboard }}>
      {ui}
    </ThemeProvider>
  );
}

describe('CopyButton', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it('renders the render prop with copied=false initially', () => {
    render(<CopyButton value="hello">{Trigger}</CopyButton>);
    expect(screen.getByText('Copy')).toBeTruthy();
  });

  it('copies through the injected clipboard adapter and resets after the timeout', async () => {
    const setStringAsync = jest.fn().mockResolvedValue(undefined);
    renderWithClipboard(
      <CopyButton value="hello" timeout={500}>
        {Trigger}
      </CopyButton>,
      { setStringAsync }
    );

    fireEvent.press(screen.getByTestId('copy'));
    await waitFor(() => expect(screen.getByText('Copied')).toBeTruthy());
    expect(setStringAsync).toHaveBeenCalledWith('hello');

    act(() => {
      jest.advanceTimersByTime(499);
    });
    expect(screen.getByText('Copied')).toBeTruthy();

    act(() => {
      jest.advanceTimersByTime(1);
    });
    expect(screen.getByText('Copy')).toBeTruthy();
  });

  it('falls back to the expo-clipboard mock when no adapter is provided', async () => {
    const clipboard = require('expo-clipboard');
    render(<CopyButton value="fallback">{Trigger}</CopyButton>);

    fireEvent.press(screen.getByTestId('copy'));
    await waitFor(() => expect(screen.getByText('Copied')).toBeTruthy());
    expect(clipboard.setStringAsync).toHaveBeenCalledWith('fallback');
  });

  it('restarts the timeout when copying twice and clears it on unmount', async () => {
    const setStringAsync = jest.fn().mockResolvedValue(undefined);
    const { unmount } = renderWithClipboard(
      <CopyButton value="twice" timeout={1000}>
        {Trigger}
      </CopyButton>,
      { setStringAsync }
    );

    fireEvent.press(screen.getByTestId('copy'));
    await waitFor(() => expect(screen.getByText('Copied')).toBeTruthy());
    act(() => {
      jest.advanceTimersByTime(800);
    });

    fireEvent.press(screen.getByTestId('copy'));
    await waitFor(() => expect(setStringAsync).toHaveBeenCalledTimes(2));
    act(() => {
      jest.advanceTimersByTime(800);
    });
    // Timer was restarted, still copied
    expect(screen.getByText('Copied')).toBeTruthy();

    unmount();
    expect(() => jest.runOnlyPendingTimers()).not.toThrow();
  });

  it('warns when no clipboard implementation is available', async () => {
    jest.spyOn(registry, 'getAdapter').mockReturnValue(undefined);
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});

    render(<CopyButton value="none">{Trigger}</CopyButton>);
    fireEvent.press(screen.getByTestId('copy'));

    await waitFor(() => expect(warn).toHaveBeenCalled());
    expect(screen.getByText('Copy')).toBeTruthy();
  });

  it('logs an error when copying fails', async () => {
    const error = jest.spyOn(console, 'error').mockImplementation(() => {});
    renderWithClipboard(<CopyButton value="fail">{Trigger}</CopyButton>, {
      setStringAsync: () => Promise.reject(new Error('denied')),
    });

    fireEvent.press(screen.getByTestId('copy'));
    await waitFor(() => expect(error).toHaveBeenCalled());
    expect(screen.getByText('Copy')).toBeTruthy();
  });
});
