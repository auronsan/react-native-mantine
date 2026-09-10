import { useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import type { FloatingRect } from './position';

/**
 * Measures a target ref with `measureInWindow` when the ref exposes it.
 * Returns false when the target cannot be measured (no ref or no method).
 */
export function measureTarget(
  ref: React.RefObject<any>,
  onMeasure: (rect: FloatingRect) => void
): boolean {
  const node = ref.current;
  if (!node || typeof node.measureInWindow !== 'function') {
    return false;
  }
  node.measureInWindow((x: number, y: number, width: number, height: number) => {
    onMeasure({ x, y, width, height });
  });
  return true;
}

/**
 * Calls `onEscape` when the Escape key is pressed while `active` is true.
 * Web only: no-op on native platforms or when `document` is not available.
 */
export function useEscapeKey(active: boolean, onEscape: () => void): void {
  const handlerRef = useRef(onEscape);
  handlerRef.current = onEscape;

  useEffect(() => {
    // `document` only exists on web; the project is compiled without the DOM lib.
    const doc: any = (globalThis as any).document;
    if (!active || Platform.OS !== 'web' || typeof doc === 'undefined') {
      return undefined;
    }

    const handleKeyDown = (event: { key?: string }) => {
      if (event.key === 'Escape' || event.key === 'Esc') {
        handlerRef.current();
      }
    };

    doc.addEventListener('keydown', handleKeyDown);
    return () => {
      doc.removeEventListener('keydown', handleKeyDown);
    };
  }, [active]);
}
