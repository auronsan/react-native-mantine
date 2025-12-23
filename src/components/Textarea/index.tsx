import { forwardRef, useState } from 'react';
import { TextInput as RNTextInput } from 'react-native';
import { TextInput, type TextInputProps } from '../TextInput';

export interface TextareaProps extends Omit<TextInputProps, 'multiline'> {
  /** Minimum number of visible text lines */
  minRows?: number;

  /** Maximum number of visible text lines */
  maxRows?: number;

  /** Auto-grow textarea to fit content */
  autosize?: boolean;
}

const defaultProps: Partial<TextareaProps> = {
  minRows: 3,
  autosize: false,
};

export const Textarea = forwardRef<RNTextInput, TextareaProps>((props, ref) => {
  const { minRows, maxRows, autosize, style, ...others} = {
    ...defaultProps,
    ...props,
  };

  const [contentHeight, setContentHeight] = useState<number | undefined>(undefined);

  const handleContentSizeChange = (event: any) => {
    if (autosize) {
      const height = event.nativeEvent.contentSize.height;
      setContentHeight(height);
    }
  };

  // Calculate height based on rows
  const lineHeight = 20; // approximate line height
  const paddingVertical = 12;
  const minHeight = minRows ? minRows * lineHeight + paddingVertical * 2 : undefined;
  const maxHeight = maxRows ? maxRows * lineHeight + paddingVertical * 2 : undefined;

  const textareaStyle = {
    height: autosize ? contentHeight : minHeight,
    minHeight: minHeight,
    maxHeight: maxHeight,
    textAlignVertical: 'top' as const,
  };

  return (
    <TextInput
      ref={ref}
      multiline
      numberOfLines={minRows}
      onContentSizeChange={handleContentSizeChange}
      style={[textareaStyle, style]}
      {...others}
    />
  );
});

Textarea.displayName = 'Textarea';
