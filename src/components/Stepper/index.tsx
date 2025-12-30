import React, { forwardRef, createContext, useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import { BoxView } from '../BoxView';
import { Text } from '../Text';
import type { DefaultProps, MantineColor, MantineNumberSize, MantineSize } from '../../theme/types';
import { useComponentDefaultProps } from '../../theme/theme-provider';
import { createStyles } from '../../theme';
import { rem } from '../../theme/utils/rem';

interface StepperContextValue {
  active: number;
  onStepClick?: (stepIndex: number) => void;
  orientation: 'horizontal' | 'vertical';
  color: MantineColor;
  size: MantineSize;
  iconSize: number;
  allowNextStepsSelect: boolean;
}

const StepperContext = createContext<StepperContextValue | null>(null);

const useStepperContext = () => {
  const context = useContext(StepperContext);
  if (!context) {
    throw new Error('Stepper components must be used within Stepper');
  }
  return context;
};

export interface StepperProps extends DefaultProps {
  /** Active step index */
  active: number;

  /** Called when step is clicked */
  onStepClick?: (stepIndex: number) => void;

  /** Stepper orientation */
  orientation?: 'horizontal' | 'vertical';

  /** Stepper color */
  color?: MantineColor;

  /** Stepper size */
  size?: MantineSize;

  /** Icon size */
  iconSize?: number;

  /** Step icon border radius */
  radius?: MantineNumberSize;

  /** Allow selecting steps that are ahead of active step */
  allowNextStepsSelect?: boolean;

  /** Component children (Step components) */
  children: React.ReactNode;

  /** Additional styles */
  style?: any;
}

export interface StepProps extends DefaultProps {
  /** Step label */
  label?: React.ReactNode;

  /** Step description */
  description?: React.ReactNode;

  /** Step icon */
  icon?: React.ReactNode;

  /** Step state - completed/loading */
  state?: 'completed' | 'loading';

  /** Step color override */
  color?: MantineColor;

  /** Allow step to be selected */
  allowStepSelect?: boolean;

  /** Additional styles */
  style?: any;

  /** Step children (content) */
  children?: React.ReactNode;
}

export interface StepperCompletedProps extends DefaultProps {
  /** Completed step content */
  children?: React.ReactNode;

  /** Additional styles */
  style?: any;
}

const iconSizes = {
  xs: rem(28),
  sm: rem(32),
  md: rem(36),
  lg: rem(42),
  xl: rem(48),
};

const useStepperStyles = createStyles(
  (
    theme,
    { orientation }: { orientation: 'horizontal' | 'vertical' }
  ) => ({
    root: {
      flexDirection: orientation === 'horizontal' ? 'row' : 'column',
    },
    steps: {
      flexDirection: orientation === 'horizontal' ? 'row' : 'column',
      alignItems: orientation === 'horizontal' ? 'flex-start' : 'stretch',
    },
    content: {
      marginTop: theme.spacing.md,
    },
  })
);

const useStepStyles = createStyles(
  (
    theme,
    {
      orientation,
      color,
      isActive,
      isCompleted,
      iconSize,
      radius,
    }: {
      orientation: 'horizontal' | 'vertical';
      color: MantineColor;
      isActive: boolean;
      isCompleted: boolean;
      iconSize: number;
      radius: MantineNumberSize;
    }
  ) => {
    const activeColor = theme.fn.themeColor(color || theme.primaryColor);
    const inactiveBgColor = theme.colorScheme === 'dark'
      ? theme.fn.themeColor('dark', 5)
      : theme.fn.themeColor('gray', 1);
    const inactiveBorderColor = theme.colorScheme === 'dark'
      ? theme.fn.themeColor('dark', 4)
      : theme.fn.themeColor('gray', 3);

    return {
      step: {
        flex: orientation === 'horizontal' ? 1 : undefined,
        flexDirection: orientation === 'horizontal' ? 'column' : 'row',
        alignItems: orientation === 'horizontal' ? 'center' : 'flex-start',
      },
      stepWrapper: {
        flexDirection: orientation === 'horizontal' ? 'column' : 'row',
        alignItems: 'center',
        width: '100%',
      },
      stepBody: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
      },
      iconWrapper: {
        position: 'relative',
      },
      icon: {
        width: iconSize as any,
        height: iconSize as any,
        borderRadius: theme.fn.radius(radius),
        backgroundColor: isCompleted || isActive ? activeColor : inactiveBgColor,
        borderWidth: rem(2) as any,
        borderColor: isCompleted || isActive ? activeColor : inactiveBorderColor,
        justifyContent: 'center',
        alignItems: 'center',
      },
      iconText: {
        color: isCompleted || isActive
          ? theme.white
          : theme.colorScheme === 'dark'
          ? theme.fn.themeColor('dark', 1)
          : theme.fn.themeColor('gray', 6),
        fontSize: theme.fontSizes.sm as number,
        fontWeight: '600',
      },
      separator: {
        height: (orientation === 'horizontal' ? rem(2) : rem(24)) as any,
        width: (orientation === 'horizontal' ? '100%' : rem(2)) as any,
        backgroundColor: isCompleted
          ? activeColor
          : theme.colorScheme === 'dark'
          ? theme.fn.themeColor('dark', 4)
          : theme.fn.themeColor('gray', 2),
        marginHorizontal: orientation === 'horizontal' ? theme.spacing.xs : 0,
        marginVertical: orientation === 'vertical' ? theme.spacing.xs : 0,
        ...(orientation === 'horizontal' && {
          marginTop: iconSize / 2,
        }),
        ...(orientation === 'vertical' && {
          marginLeft: iconSize / 2,
        }),
      },
      stepLabel: {
        marginTop: orientation === 'horizontal' ? theme.spacing.xs : 0,
        marginLeft: orientation === 'vertical' ? theme.spacing.md : 0,
        flex: 1,
      },
      label: {
        fontSize: theme.fontSizes.sm as number,
        fontWeight: isActive ? '600' : '400',
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        marginBottom: rem(4) as any,
      },
      description: {
        fontSize: theme.fontSizes.xs as number,
        color: theme.colorScheme === 'dark'
          ? theme.fn.themeColor('dark', 2)
          : theme.fn.themeColor('gray', 6),
      },
    };
  }
);

const defaultProps: Partial<StepperProps> = {
  orientation: 'horizontal',
  color: 'blue',
  size: 'md',
  radius: 'xl',
  allowNextStepsSelect: true,
};

export const Stepper = forwardRef<any, StepperProps>((props, ref) => {
  const {
    active,
    onStepClick,
    orientation,
    color,
    size,
    iconSize: iconSizeProp,
    radius,
    allowNextStepsSelect,
    children,
    style,
    ...others
  } = useComponentDefaultProps('Stepper', defaultProps, props);

  const { styles, sx } = useStepperStyles({ orientation }, { name: 'Stepper' }) as any;

  const iconSizeKey = (size || 'md') as keyof typeof iconSizes;
  const iconSize = iconSizeProp || iconSizes[iconSizeKey] || iconSizes.md;

  const childrenArray = React.Children.toArray(children);
  const steps = childrenArray.filter(
    (child): child is React.ReactElement<StepProps & { __stepIndex?: number; __isLast?: boolean }> =>
      React.isValidElement(child) && (child.type as any) === Step
  );
  const completedStep = childrenArray.find(
    (child) => React.isValidElement(child) && (child.type as any) === StepperCompleted
  );

  const isStepsCompleted = active >= steps.length;

  return (
    <StepperContext.Provider
      value={{
        active,
        onStepClick,
        orientation: orientation!,
        color: color!,
        size: size!,
        iconSize,
        allowNextStepsSelect: allowNextStepsSelect!,
      }}
    >
      <BoxView ref={ref} style={sx(styles.root, style)} {...others}>
        <BoxView style={styles.steps}>
          {steps.map((step, index) => {
            return React.cloneElement<StepProps & { __stepIndex?: number; __isLast?: boolean }>(step, {
              key: index,
              __stepIndex: index,
              __isLast: index === steps.length - 1,
            });
          })}
        </BoxView>

        <BoxView style={styles.content}>
          {isStepsCompleted
            ? completedStep
            : steps[active] && steps[active].props.children}
        </BoxView>
      </BoxView>
    </StepperContext.Provider>
  );
});

export const Step = forwardRef<any, StepProps & { __stepIndex?: number; __isLast?: boolean }>(
  (props, ref) => {
    const {
      label,
      description,
      icon,
      state,
      color: stepColor,
      allowStepSelect,
      style,
      children,
      __stepIndex,
      __isLast,
      ...others
    } = props;

    const context = useStepperContext();

    const stepIndex = __stepIndex ?? 0;
    const isActive = context.active === stepIndex;
    const isCompleted = context.active > stepIndex || state === 'completed';

    const { styles} = useStepStyles(
      {
        orientation: context.orientation,
        color: stepColor || context.color,
        isActive,
        isCompleted,
        iconSize: context.iconSize,
        radius: 'xl',
      },
      { name: 'Step' }
    ) as any;

    const handleClick = () => {
      if (allowStepSelect === false) return;
      if (!context.allowNextStepsSelect && stepIndex > context.active) return;
      context.onStepClick?.(stepIndex);
    };

    const canClick = allowStepSelect !== false &&
      (context.allowNextStepsSelect || stepIndex <= context.active);

    const StepWrapper = canClick ? TouchableOpacity : BoxView;

    return (
      <StepWrapper
        ref={ref}
        style={styles.step}
        onPress={canClick ? handleClick : undefined}
        activeOpacity={canClick ? 0.7 : 1}
        {...others}
      >
        <BoxView style={styles.stepWrapper}>
          <BoxView style={styles.stepBody}>
            <BoxView style={styles.iconWrapper}>
              <BoxView style={styles.icon}>
                {icon || <Text style={styles.iconText}>{stepIndex + 1}</Text>}
              </BoxView>
            </BoxView>

            {!__isLast && <BoxView style={styles.separator} />}
          </BoxView>

          {(label || description) && (
            <BoxView style={styles.stepLabel}>
              {label && <Text style={styles.label}>{label}</Text>}
              {description && <Text style={styles.description}>{description}</Text>}
            </BoxView>
          )}
        </BoxView>
      </StepWrapper>
    );
  }
);

export const StepperCompleted = forwardRef<any, StepperCompletedProps>((props, ref) => {
  const { children, style, ...others} = props;

  return (
    <BoxView ref={ref} style={style} {...others}>
      {children}
    </BoxView>
  );
});

Stepper.displayName = 'Stepper';
Step.displayName = 'Stepper.Step';
StepperCompleted.displayName = 'Stepper.Completed';

// Attach sub-components
(Stepper as any).Step = Step;
(Stepper as any).Completed = StepperCompleted;
