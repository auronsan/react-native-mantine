import React, { useState, useEffect, useRef } from 'react';
import * as Clipboard from 'expo-clipboard';
import type { DefaultProps } from '../../theme/types';
import { useComponentDefaultProps } from '../../theme/theme-provider';

export interface CopyButtonProps extends DefaultProps {
  /** Value to copy to clipboard */
  value: string;

  /** Copied state timeout in ms */
  timeout?: number;

  /** Function that returns JSX based on current state */
  children: (payload: { copied: boolean; copy: () => void }) => React.ReactNode;
}

const defaultProps: Partial<CopyButtonProps> = {
  timeout: 1000,
};

export const CopyButton: React.FC<CopyButtonProps> = (props) => {
  const { value, timeout, children } = useComponentDefaultProps(
    'CopyButton',
    defaultProps,
    props
  );

  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const copy = async () => {
    try {
      await Clipboard.setStringAsync(value);
      setCopied(true);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setCopied(false);
        timeoutRef.current = null;
      }, timeout);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  return <>{children({ copied, copy })}</>;
};

CopyButton.displayName = 'CopyButton';
