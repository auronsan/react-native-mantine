import type { ViewStyle } from 'react-native';

import { BoxView } from '../BoxView';
import type { ViewProps } from '../BoxView';

export const Group = ({
  children,
  position,
  style,
  alignCenter = true,
  alignBottom = false,
  noWrap = false,
  spacing = 5,
  ...rest
}: ViewProps & {
  position?: string;
  alignCenter?: boolean;
  alignBottom?: boolean;
  noWrap?: boolean;
  spacing?: number;
}): React.ReactElement => {
  return (
    <BoxView
      style={{
        gap: spacing,
        flexDirection: 'row',
        justifyContent:
          position === 'apart'
            ? 'space-between'
            : position === 'center'
              ? 'center'
              : position === 'right'
                ? 'flex-end'
                : 'flex-start',
        flexWrap: noWrap ? 'nowrap' : 'wrap',
        alignItems: alignCenter
          ? 'center'
          : alignBottom
            ? 'flex-end'
            : 'flex-start',
        ...(style as ViewStyle),
      }}
      {...rest}
    >
      {children}
    </BoxView>
  );
};
