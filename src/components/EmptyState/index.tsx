import React, { createContext, forwardRef, useContext } from 'react';
import { View } from 'react-native';
import { BoxView } from '../BoxView';
import { Text } from '../Text';
import type {
  DefaultProps,
  MantineColor,
  MantineSize,
} from '../../theme/types';
import { useComponentDefaultProps, useTheme } from '../../theme/theme-provider';
import { createStyles } from '../../theme';
import { rem } from '../../theme/utils/rem';

const INDICATOR_SIZES: Record<MantineSize, number> = {
  xs: 32,
  sm: 40,
  md: 48,
  lg: 60,
  xl: 72,
};

const TITLE_SIZES: Record<MantineSize, number> = {
  xs: 14,
  sm: 16,
  md: 18,
  lg: 20,
  xl: 24,
};

interface EmptyStateContextValue {
  size: MantineSize;
  align: 'left' | 'center' | 'right';
  variant: 'filled' | 'light';
  color?: MantineColor;
  withIndicatorBackground: boolean;
}

const EmptyStateContext = createContext<EmptyStateContextValue>({
  size: 'md',
  align: 'center',
  variant: 'light',
  withIndicatorBackground: false,
});

export interface EmptyStateProps extends DefaultProps {
  /** Controls icon, title and description sizes */
  size?: MantineSize;

  /** Content alignment */
  align?: 'left' | 'center' | 'right';

  /** Controls indicator colors */
  variant?: 'filled' | 'light';

  /** Key of theme.colors or any valid color, controls indicator color */
  color?: MantineColor;

  /** Title displayed below the icon */
  title?: React.ReactNode;

  /** Description displayed below the title */
  description?: React.ReactNode;

  /** Icon displayed inside the indicator */
  icon?: React.ReactNode;

  /** Determines whether the indicator should have a background */
  withIndicatorBackground?: boolean;

  /** Content displayed below the description, usually actions */
  children?: React.ReactNode;
}

const useStyles = createStyles(
  (theme, { align }: { align: 'left' | 'center' | 'right' }) => ({
    root: {
      ...(align === 'center'
        ? { alignItems: 'center' as const }
        : {
            flexDirection:
              align === 'right' ? ('row-reverse' as const) : ('row' as const),
            alignItems: 'flex-start' as const,
          }),
      gap: theme.spacing.sm,
      padding: theme.spacing.md,
    },
    body: {
      gap: rem(4),
      ...(align === 'center'
        ? { alignItems: 'center' as const }
        : align === 'right'
          ? { alignItems: 'flex-end' as const }
          : {}),
      flexShrink: 1,
    },
  })
);

const defaultProps: Partial<EmptyStateProps> = {
  size: 'md',
  align: 'center',
  variant: 'light',
  withIndicatorBackground: false,
};

interface EmptyStateComponent
  extends React.ForwardRefExoticComponent<
    EmptyStateProps & React.RefAttributes<View>
  > {
  Indicator: typeof EmptyStateIndicator;
  Title: typeof EmptyStateTitle;
  Description: typeof EmptyStateDescription;
  Actions: typeof EmptyStateActions;
}

/**
 * EmptyState tells the user that there is no content to display.
 * Port of Mantine v8.3 EmptyState component.
 */
export const EmptyState = forwardRef<View, EmptyStateProps>((props, ref) => {
  const {
    size,
    align,
    variant,
    color,
    title,
    description,
    icon,
    withIndicatorBackground,
    children,
    style,
    ...others
  } = useComponentDefaultProps('EmptyState', defaultProps, props);

  const { styles, sx } = useStyles(
    { align: align ?? 'center' },
    { name: 'EmptyState' }
  );

  return (
    <EmptyStateContext.Provider
      value={{
        size: size ?? 'md',
        align: align ?? 'center',
        variant: variant ?? 'light',
        color,
        withIndicatorBackground: withIndicatorBackground ?? false,
      }}
    >
      <BoxView ref={ref} style={sx(styles.root, style)} {...others}>
        {icon !== undefined && icon !== null && (
          <EmptyStateIndicator>{icon}</EmptyStateIndicator>
        )}
        <View style={styles.body}>
          {title !== undefined && title !== null && (
            <EmptyStateTitle>{title}</EmptyStateTitle>
          )}
          {description !== undefined && description !== null && (
            <EmptyStateDescription>{description}</EmptyStateDescription>
          )}
          {children}
        </View>
      </BoxView>
    </EmptyStateContext.Provider>
  );
}) as EmptyStateComponent;

EmptyState.displayName = 'EmptyState';

export interface EmptyStateIndicatorProps extends DefaultProps {
  /** Indicator content, usually an icon */
  children?: React.ReactNode;
}

export const EmptyStateIndicator = forwardRef<View, EmptyStateIndicatorProps>(
  (props, ref) => {
    const { children, style, ...others } = useComponentDefaultProps(
      'EmptyStateIndicator',
      {},
      props
    );

    const theme = useTheme();
    const { size, variant, color, withIndicatorBackground } =
      useContext(EmptyStateContext);

    const indicatorSize = INDICATOR_SIZES[size];
    const colors = theme.fn.variant({
      variant: variant === 'filled' ? 'filled' : 'light',
      color: (color as string) || theme.primaryColor,
    });

    return (
      <BoxView
        ref={ref}
        style={[
          {
            width: indicatorSize,
            height: indicatorSize,
            borderRadius: indicatorSize / 2,
            alignItems: 'center',
            justifyContent: 'center',
            ...(withIndicatorBackground && {
              backgroundColor: colors.background,
            }),
          },
          style,
        ]}
        {...others}
      >
        {children}
      </BoxView>
    );
  }
);

EmptyStateIndicator.displayName = 'EmptyState.Indicator';

export interface EmptyStateTitleProps extends DefaultProps {
  /** Title content */
  children?: React.ReactNode;

  /** Text style */
  textStyle?: any;
}

export const EmptyStateTitle = forwardRef<View, EmptyStateTitleProps>(
  (props, ref) => {
    const { children, style, textStyle, ...others } = useComponentDefaultProps(
      'EmptyStateTitle',
      {},
      props
    );

    const theme = useTheme();
    const { size, align } = useContext(EmptyStateContext);

    return (
      <BoxView ref={ref} style={[style]} {...others}>
        <Text
          style={[
            {
              fontSize: TITLE_SIZES[size],
              fontWeight: '600' as const,
              color: theme.colorScheme === 'dark' ? theme.white : theme.black,
              textAlign:
                align === 'center'
                  ? ('center' as const)
                  : align === 'right'
                    ? ('right' as const)
                    : ('left' as const),
            },
            textStyle,
          ]}
        >
          {children}
        </Text>
      </BoxView>
    );
  }
);

EmptyStateTitle.displayName = 'EmptyState.Title';

export interface EmptyStateDescriptionProps extends DefaultProps {
  /** Description content */
  children?: React.ReactNode;

  /** Text style */
  textStyle?: any;
}

export const EmptyStateDescription = forwardRef<
  View,
  EmptyStateDescriptionProps
>((props, ref) => {
  const { children, style, textStyle, ...others } = useComponentDefaultProps(
    'EmptyStateDescription',
    {},
    props
  );

  const theme = useTheme();
  const { size, align } = useContext(EmptyStateContext);

  return (
    <BoxView ref={ref} style={[{ maxWidth: 512 }, style]} {...others}>
      <Text
        style={[
          {
            fontSize: theme.fontSizes[size] as number,
            color: theme.fn.dimmed(),
            textAlign:
              align === 'center'
                ? ('center' as const)
                : align === 'right'
                  ? ('right' as const)
                  : ('left' as const),
          },
          textStyle,
        ]}
      >
        {children}
      </Text>
    </BoxView>
  );
});

EmptyStateDescription.displayName = 'EmptyState.Description';

export interface EmptyStateActionsProps extends DefaultProps {
  /** Actions content, usually buttons */
  children?: React.ReactNode;
}

export const EmptyStateActions = forwardRef<View, EmptyStateActionsProps>(
  (props, ref) => {
    const { children, style, ...others } = useComponentDefaultProps(
      'EmptyStateActions',
      {},
      props
    );

    const theme = useTheme();
    const { align } = useContext(EmptyStateContext);

    return (
      <BoxView
        ref={ref}
        style={[
          {
            flexDirection: 'row' as const,
            flexWrap: 'wrap' as const,
            gap: theme.spacing.sm,
            marginTop: theme.spacing.xs,
            justifyContent:
              align === 'center'
                ? ('center' as const)
                : align === 'right'
                  ? ('flex-end' as const)
                  : ('flex-start' as const),
          },
          style,
        ]}
        {...others}
      >
        {children}
      </BoxView>
    );
  }
);

EmptyStateActions.displayName = 'EmptyState.Actions';

EmptyState.Indicator = EmptyStateIndicator;
EmptyState.Title = EmptyStateTitle;
EmptyState.Description = EmptyStateDescription;
EmptyState.Actions = EmptyStateActions;
