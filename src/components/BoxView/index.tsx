import { forwardRef } from 'react';
import { View as DefaultView } from 'react-native';

export type CustomViewStyle = {
  pointerEvents?: 'auto' | 'none' | 'box-none' | 'box-only';
};

export type ViewProps = DefaultView['props'] & {
  fullWidth?: boolean;
  fullHeight?: boolean;
  children?: React.ReactNode;
  style?: CustomViewStyle;
};

export const BoxView = forwardRef((props: ViewProps, ref: any) => {
  const { style, fullWidth, fullHeight, ...otherProps } = props;
  return (
    <DefaultView
      style={[
        style,
        {
          ...(fullWidth ? { width: '100%' } : {}),
          ...(fullHeight ? { height: '100%' } : {}),
        },
      ]}
      ref={ref}
      {...otherProps}
    />
  );
});
