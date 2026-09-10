import type React from 'react';

/** Props the library passes to an injected icon component */
export interface AdapterIconProps {
  /** Icon name (FontAwesome glyph name by default) */
  name: string;
  /** Icon size in pixels */
  size?: number;
  /** Icon color */
  color?: string;
  /** Additional styles */
  style?: any;
  /** Allow font scaling */
  allowFontScaling?: boolean;
}

/** Props the library passes to an injected linear gradient component */
export interface AdapterLinearGradientProps {
  colors: readonly string[] | any;
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  style?: any;
  children?: React.ReactNode;
}

/** Options passed to the document picker adapter (expo-document-picker shape) */
export interface AdapterDocumentPickerOptions {
  /** Mime type(s) of documents that can be picked */
  type?: string | string[];
  /** Allow picking multiple files */
  multiple?: boolean;
  /** Copy the picked file to the app cache directory */
  copyToCacheDirectory?: boolean;
}

/** Result returned by the document picker adapter (expo-document-picker shape) */
export interface AdapterDocumentPickerResult {
  canceled?: boolean;
  assets?:
    | Array<{ name: string; uri: string; size?: number; mimeType?: string }>
    | null;
}

/**
 * Optional native integrations. Every field is optional: when a field is
 * missing the library tries the matching optional dependency
 * (react-native-vector-icons, expo-linear-gradient, expo-clipboard,
 * expo-document-picker, expo-font, react-native-svg) and otherwise falls back gracefully.
 */
export interface MantineAdapters {
  /** Icon component, e.g. FontAwesome from @expo/vector-icons */
  Icon?: React.ComponentType<AdapterIconProps>;

  /** Linear gradient component, e.g. from expo-linear-gradient or react-native-linear-gradient */
  LinearGradient?: React.ComponentType<AdapterLinearGradientProps>;

  /** Clipboard implementation, e.g. expo-clipboard or @react-native-clipboard/clipboard */
  clipboard?: { setStringAsync(text: string): Promise<void> | void };

  /** Document picker, mirrors expo-document-picker getDocumentAsync */
  documentPicker?: (
    options?: AdapterDocumentPickerOptions
  ) => Promise<AdapterDocumentPickerResult>;

  /** Font loader, mirrors expo-font loadAsync */
  loadFonts?: (fonts: Record<string, any>) => Promise<void>;

  /**
   * SVG primitives, e.g. `{ Svg, Circle }` from react-native-svg. Used by
   * RingProgress for pixel-accurate arcs; without it a View-based ring is drawn.
   */
  svg?: { Svg: React.ComponentType<any>; Circle: React.ComponentType<any> };
}

export type AdapterName = keyof MantineAdapters;
