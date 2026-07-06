import React, { useImperativeHandle, useRef, useState } from 'react';
import { useComponentDefaultProps } from '../../theme/theme-provider';

// Optional import for expo-document-picker
let DocumentPicker: any = null;
let pickerAvailable = false;
try {
  DocumentPicker = require('expo-document-picker');
  pickerAvailable = true;
} catch (error) {
  // expo-document-picker not available
  console.warn(
    'expo-document-picker not available. FileButton and FileInput will not be able to open the file picker. Install expo-document-picker for file selection support.'
  );
}

/** Normalized picked file, mapped from expo-document-picker assets */
export interface PickedFile {
  /** File name with extension */
  name: string;

  /** Local uri of the file */
  uri: string;

  /** File size in bytes if available */
  size?: number;

  /** Mime type if available */
  mimeType?: string;
}

export interface PickFilesOptions {
  /** Allow picking multiple files */
  multiple?: boolean;

  /** Mime type(s) of documents that can be picked, any file by default */
  accept?: string | string[];
}

/**
 * Opens the document picker and resolves with the normalized selection,
 * or null when the user cancels or the picker is unavailable.
 */
export async function pickFiles(
  options: PickFilesOptions = {}
): Promise<PickedFile[] | null> {
  if (!pickerAvailable || !DocumentPicker?.getDocumentAsync) {
    console.warn(
      'File picking is not available. Please install expo-document-picker.'
    );
    return null;
  }

  const result = await DocumentPicker.getDocumentAsync({
    type: options.accept ?? '*/*',
    multiple: options.multiple ?? false,
    copyToCacheDirectory: true,
  });

  if (result.canceled || !Array.isArray(result.assets)) {
    return null;
  }

  return result.assets.map(
    (asset: any): PickedFile => ({
      name: asset.name,
      uri: asset.uri,
      size: asset.size,
      mimeType: asset.mimeType,
    })
  );
}

export interface FileButtonProps<Multiple extends boolean = false> {
  /** Called when files are picked */
  onChange: (payload: Multiple extends true ? PickedFile[] : PickedFile | null) => void;

  /** Function that renders the trigger element, receives onPress handler and loading state */
  children: (props: { onPress: () => void; loading: boolean }) => React.ReactNode;

  /** Determines whether user can pick more than one file */
  multiple?: Multiple;

  /** Mime type(s) of the files that can be picked */
  accept?: string | string[];

  /** Disables the file picker */
  disabled?: boolean;

  /** Ref of the function that should be called to reset the last selection */
  resetRef?: React.ForwardedRef<() => void>;
}

const defaultProps = {
  disabled: false,
};

/**
 * FileButton opens the native document picker and passes picked files to
 * onChange. Render prop receives an onPress handler to attach to any trigger.
 * Port of Mantine FileButton, backed by expo-document-picker.
 */
export function FileButton<Multiple extends boolean = false>(
  props: FileButtonProps<Multiple>
) {
  const { onChange, children, multiple, accept, disabled, resetRef } =
    useComponentDefaultProps('FileButton', defaultProps, props);

  const [loading, setLoading] = useState(false);
  const lastSelectionRef = useRef<PickedFile[] | null>(null);

  useImperativeHandle(resetRef, () => () => {
    lastSelectionRef.current = null;
  });

  const handlePress = async () => {
    if (disabled || loading) {
      return;
    }

    setLoading(true);
    try {
      const files = await pickFiles({ multiple: !!multiple, accept });
      if (files) {
        lastSelectionRef.current = files;
        onChange(
          (multiple ? files : (files[0] ?? null)) as Multiple extends true
            ? PickedFile[]
            : PickedFile | null
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return <>{children({ onPress: handlePress, loading })}</>;
}

FileButton.displayName = 'FileButton';
