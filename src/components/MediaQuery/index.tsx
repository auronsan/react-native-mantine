import React, { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import type { ScaledSize } from 'react-native';
import type { DefaultProps } from '../../theme/types';
import { useComponentDefaultProps } from '../../theme/theme-provider';

export interface MediaQueryProps extends DefaultProps {
  /** Minimum width for the query to match */
  minWidth?: number;

  /** Maximum width for the query to match */
  maxWidth?: number;

  /** Minimum height for the query to match */
  minHeight?: number;

  /** Maximum height for the query to match */
  maxHeight?: number;

  /** Orientation to match */
  orientation?: 'portrait' | 'landscape';

  /** Children to render when query matches */
  children?: React.ReactNode;

  /** Query type - window or screen */
  query?: 'window' | 'screen';
}

const defaultProps: Partial<MediaQueryProps> = {
  query: 'window',
};

const getOrientation = (dimensions: ScaledSize): 'portrait' | 'landscape' => {
  return dimensions.width < dimensions.height ? 'portrait' : 'landscape';
};

const matchesQuery = (
  dimensions: ScaledSize,
  {
    minWidth,
    maxWidth,
    minHeight,
    maxHeight,
    orientation,
  }: {
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;
    orientation?: 'portrait' | 'landscape';
  }
): boolean => {
  const { width, height } = dimensions;

  if (minWidth !== undefined && width < minWidth) {
    return false;
  }

  if (maxWidth !== undefined && width > maxWidth) {
    return false;
  }

  if (minHeight !== undefined && height < minHeight) {
    return false;
  }

  if (maxHeight !== undefined && height > maxHeight) {
    return false;
  }

  if (orientation !== undefined && getOrientation(dimensions) !== orientation) {
    return false;
  }

  return true;
};

export const MediaQuery: React.FC<MediaQueryProps> = (props) => {
  const {
    minWidth,
    maxWidth,
    minHeight,
    maxHeight,
    orientation,
    children,
    query,
  } = useComponentDefaultProps('MediaQuery', defaultProps, props);

  const [dimensions, setDimensions] = useState(
    Dimensions.get(query as 'window' | 'screen')
  );

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window, screen }) => {
      setDimensions(query === 'screen' ? screen : window);
    });

    return () => subscription?.remove();
  }, [query]);

  const matches = matchesQuery(dimensions, {
    minWidth,
    maxWidth,
    minHeight,
    maxHeight,
    orientation,
  });

  if (!matches) {
    return null;
  }

  return <>{children}</>;
};

MediaQuery.displayName = 'MediaQuery';
