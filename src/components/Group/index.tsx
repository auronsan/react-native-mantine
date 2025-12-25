import type { ViewStyle } from 'react-native';

import { BoxView } from '../BoxView';
import type { ViewProps } from '../BoxView';

export const Group = ({
  children,
  position,
  style,
  align,
  alignCenter = true,
  alignBottom = false,
  noWrap = false,
  spacing = 5,
  ...rest
}: ViewProps & {
  position?: string;
  align?: 'start' | 'center' | 'end' | 'baseline' | 'stretch';
  alignCenter?: boolean;
  alignBottom?: boolean;
  noWrap?: boolean;
  spacing?: number;
}): React.ReactElement => {
  // Map align values to flexbox alignItems
  const getAlignItems = () => {
    if (align) {
      switch (align) {
        case 'start':
          return 'flex-start';
        case 'center':
          return 'center';
        case 'end':
          return 'flex-end';
        case 'baseline':
          return 'baseline';
        case 'stretch':
          return 'stretch';
        default:
          return 'center';
      }
    }
    return alignCenter ? 'center' : alignBottom ? 'flex-end' : 'flex-start';
  };

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
        alignItems: getAlignItems(),
        ...(style as ViewStyle),
      }}
      {...rest}
    >
      {children}
    </BoxView>
  );
};
