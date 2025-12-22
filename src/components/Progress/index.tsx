import { forwardRef, useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { BoxView } from '../BoxView';
import type {
  DefaultProps,
  MantineColor,
  MantineNumberSize,
  MantineSize,
} from '../../theme/types';
import { useComponentDefaultProps } from '../../theme/theme-provider';
import { createStyles } from '../../theme';
import { rem } from '../../theme/utils/rem';

export interface ProgressSection {
  /** Section value, 0-100 */
  value: number;

  /** Section color from theme */
  color: MantineColor;

  /** Optional label */
  label?: string;
}

export interface ProgressProps extends DefaultProps {
  /** Progress value, 0-100 */
  value?: number;

  /** Progress color from theme */
  color?: MantineColor;

  /** Progress size */
  size?: MantineSize | number;

  /** Key of theme.radius or any valid value to set border-radius */
  radius?: MantineNumberSize;

  /** Adds stripes */
  striped?: boolean;

  /** Whether to animate striped progress bars */
  animate?: boolean;

  /** Sections */
  sections?: ProgressSection[];

  /** Additional styles */
  style?: any;
}

const sizes = {
  xs: rem(3),
  sm: rem(5),
  md: rem(8),
  lg: rem(12),
  xl: rem(16),
};

const useStyles = createStyles(
  (
    theme,
    {
      color,
      radius,
      size,
      striped,
    }: {
      color: MantineColor;
      radius: MantineNumberSize;
      size: MantineSize | number;
      striped: boolean;
    }
  ) => {
    const colors = theme.colors[color] || theme.colors[theme.primaryColor];
    const sizeValue = typeof size === 'number' ? rem(size) : sizes[size] || sizes.md;

    return {
      root: {
        height: sizeValue,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2],
        borderRadius: theme.fn.radius(radius),
        overflow: 'hidden',
      },
      bar: {
        height: '100%',
        backgroundColor: colors?.[6] || colors?.[5] || theme.primaryBgColor,
        ...(striped && {
          backgroundImage: `linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent)`,
          backgroundSize: `${sizeValue} ${sizeValue}`,
        }),
      },
      section: {
        height: '100%',
      },
    };
  }
);

const defaultProps: Partial<ProgressProps> = {
  value: 0,
  color: 'blue',
  size: 'md',
  radius: 'sm',
  striped: false,
  animate: false,
};

export const Progress = forwardRef<any, ProgressProps>((props, ref) => {
  const {
    value,
    color,
    size,
    radius,
    striped,
    animate,
    sections,
    style,
    ...others
  } = useComponentDefaultProps('Progress', defaultProps, props);

  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: value || 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [value, animatedValue]);

  const { styles, sx, theme } = useStyles(
    { color, radius, size, striped },
    { name: 'Progress' }
  ) as any;

  const renderSections = () => {
    if (!sections || sections.length === 0) {
      return (
        <Animated.View
          style={[
            styles.bar,
            {
              width: animatedValue.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        />
      );
    }

    return sections.map((section, index) => {
      const sectionColors =
        theme.colors[section.color] || theme.colors[theme.primaryColor];
      return (
        <BoxView
          key={index}
          style={[
            styles.section,
            {
              width: `${section.value}%`,
              backgroundColor: sectionColors?.[6] || sectionColors?.[5] || theme.primaryBgColor,
            },
          ]}
        />
      );
    });
  };

  return (
    <BoxView ref={ref} style={sx(styles.root, style)} {...others}>
      {sections && sections.length > 0 ? (
        <BoxView style={{ flexDirection: 'row', height: '100%' }}>{renderSections()}</BoxView>
      ) : (
        renderSections()
      )}
    </BoxView>
  );
});

Progress.displayName = 'Progress';
