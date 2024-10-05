import type { ViewStyle } from 'react-native';

import { BoxView } from '../BoxView';
import type { ViewProps } from '../BoxView';

export const Stack = ({
  children,
  position,
  style,
  spacing = 15,
  ...rest
}: ViewProps & {
  position?: string;
  spacing?: number;
}): React.ReactElement => {
  return (
    <BoxView
      style={{
        gap: spacing,
        flexDirection: 'column',
        ...(position === 'center' ? { alignItems: 'center' } : {}),
        ...(style as ViewStyle),
      }}
      {...rest}
    >
      {children}
    </BoxView>
  );
};
