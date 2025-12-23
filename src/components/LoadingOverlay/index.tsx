import { forwardRef } from 'react';
import { Overlay } from '../Overlay';
import { Loader } from '../Loader';
import { BoxView } from '../BoxView';
import type { DefaultProps, MantineNumberSize } from '../../theme/types';
import { useComponentDefaultProps } from '../../theme/theme-provider';
import { createStyles } from '../../theme';

export interface LoadingOverlayProps extends DefaultProps {
  /** Controls overlay visibility */
  visible: boolean;

  /** Overlay opacity */
  overlayOpacity?: number;

  /** Overlay color */
  overlayColor?: string;

  /** Overlay blur (not fully supported in React Native) */
  overlayBlur?: number;

  /** Loader size */
  loaderSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  /** Border radius */
  radius?: MantineNumberSize;

  /** Z-index */
  zIndex?: number;

  /** Transition duration in ms */
  transitionDuration?: number;

  /** Additional styles */
  style?: any;
}

const useStyles = createStyles((_theme) => ({
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -20 }, { translateY: -20 }],
  },
}));

const defaultProps: Partial<LoadingOverlayProps> = {
  visible: false,
  overlayOpacity: 0.75,
  overlayColor: '#fff',
  overlayBlur: 0,
  loaderSize: 'md',
  radius: 0,
  zIndex: 1000,
  transitionDuration: 200,
};

export const LoadingOverlay = forwardRef<any, LoadingOverlayProps>(
  (props, ref) => {
    const {
      visible,
      overlayOpacity,
      overlayColor,
      overlayBlur,
      loaderSize,
      radius,
      zIndex,
      transitionDuration,
      style,
      ...others
    } = useComponentDefaultProps('LoadingOverlay', defaultProps, props);

    const { styles, sx} = useStyles({}, { name: 'LoadingOverlay' }) as any;

    if (!visible) {
      return null;
    }

    return (
      <BoxView ref={ref} style={sx(styles.root, style)} {...others}>
        <Overlay
          opacity={overlayOpacity}
          color={overlayColor}
          blur={overlayBlur}
          radius={radius}
          zIndex={zIndex}
        />
        <BoxView style={styles.loader}>
          <Loader size={loaderSize} />
        </BoxView>
      </BoxView>
    );
  }
);

LoadingOverlay.displayName = 'LoadingOverlay';
