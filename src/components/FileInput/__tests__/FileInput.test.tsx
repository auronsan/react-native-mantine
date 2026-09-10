import React from 'react';
import { Text as RNText, View } from 'react-native';
import { render as rtlRender } from '@testing-library/react-native';
import { render, screen, fireEvent, waitFor } from '../../../__tests__/test-utils';
import { FileInput } from '../index';
import { ThemeProvider } from '../../../theme/theme-provider';
import { createTheme } from '../../../theme/create-theme';
import type { MantineAdapters } from '../../../adapters/types';

const theme = createTheme();

const asset = {
  name: 'document.pdf',
  uri: 'file:///tmp/document.pdf',
  size: 1024,
  mimeType: 'application/pdf',
};

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

describe('FileInput', () => {
  it('renders label, placeholder and passes testID through', () => {
    render(<FileInput label="Attachment" placeholder="Pick a file" testID="file-input" />);

    expect(screen.getByTestId('file-input')).toBeTruthy();
    expect(screen.getByText('Attachment')).toBeTruthy();
    expect(screen.getByText('Pick a file')).toHaveStyle({ color: theme.fn.dimmed() });
    const frame = screen.getByRole('button', { name: 'Attachment' });
    expect(frame.props.accessibilityState).toEqual(
      expect.objectContaining({ disabled: false })
    );
  });

  it('renders an empty placeholder when none is given', () => {
    render(<FileInput accessibilityLabel="Files" />);
    expect(screen.getByLabelText('Files')).toBeTruthy();
  });

  it('picks a file through the fallback adapter and shows its name (uncontrolled)', async () => {
    const onChange = jest.fn();
    render(<FileInput label="Attachment" placeholder="Pick" onChange={onChange} />);

    fireEvent.press(screen.getByRole('button', { name: 'Attachment' }));
    await waitFor(() => expect(screen.getByText('document.pdf')).toBeTruthy());
    expect(onChange).toHaveBeenCalledWith(asset);
    expect(screen.queryByText('Pick')).toBeNull();
  });

  it('joins names for multiple files and clears them', async () => {
    const onChange = jest.fn();
    const documentPicker = jest
      .fn()
      .mockResolvedValue({ canceled: false, assets: [asset, { ...asset, name: 'b.png' }] });

    renderWithPicker(
      <FileInput label="Files" multiple clearable clearButtonLabel="Remove" onChange={onChange} />,
      documentPicker
    );

    expect(screen.queryByLabelText('Remove')).toBeNull();
    fireEvent.press(screen.getByRole('button', { name: 'Files' }));
    await waitFor(() => expect(screen.getByText('document.pdf, b.png')).toBeTruthy());
    expect(documentPicker).toHaveBeenCalledWith(
      expect.objectContaining({ multiple: true })
    );

    fireEvent.press(screen.getByLabelText('Remove'));
    expect(onChange).toHaveBeenLastCalledWith([]);
    expect(screen.queryByText('document.pdf, b.png')).toBeNull();
  });

  it('clears a single value to null', () => {
    const onChange = jest.fn();
    render(<FileInput defaultValue={asset} clearable onChange={onChange} />);

    expect(screen.getByText('document.pdf')).toBeTruthy();
    fireEvent.press(screen.getByLabelText('Clear'));
    expect(onChange).toHaveBeenCalledWith(null);
  });

  it('keeps the controlled value and ignores canceled picks', async () => {
    const onChange = jest.fn();
    const documentPicker = jest.fn().mockResolvedValue({ canceled: true });
    renderWithPicker(
      <FileInput label="Files" value={asset} clearable onChange={onChange} />,
      documentPicker
    );

    fireEvent.press(screen.getByRole('button', { name: 'Files' }));
    await waitFor(() => expect(documentPicker).toHaveBeenCalled());
    expect(onChange).not.toHaveBeenCalled();

    fireEvent.press(screen.getByLabelText('Clear'));
    expect(onChange).toHaveBeenCalledWith(null);
    expect(screen.getByText('document.pdf')).toBeTruthy();
  });

  it('renders a custom value component and custom right section', () => {
    const { rerender } = render(
      <FileInput
        value={asset}
        valueComponent={({ value }) => (
          <RNText>{`Custom: ${(value as typeof asset).name}`}</RNText>
        )}
      />
    );
    expect(screen.getByText('Custom: document.pdf')).toBeTruthy();

    rerender(
      <FileInput value={asset} clearable rightSection={<View testID="right" />} />
    );
    expect(screen.getByTestId('right')).toBeTruthy();
    expect(screen.queryByLabelText('Clear')).toBeNull();
  });

  it('hides the clear button and disables the frame when disabled', () => {
    render(<FileInput label="Files" value={asset} clearable disabled />);

    expect(screen.queryByLabelText('Clear')).toBeNull();
    const frame = screen.getByRole('button', { name: 'Files' });
    expect(frame).toBeDisabled();
  });
});
