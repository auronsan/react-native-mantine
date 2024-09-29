import type { ViewStyle } from 'react-native';

import { BoxView } from 'react-native-mantine';
import type { ViewProps } from 'react-native-mantine';

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
