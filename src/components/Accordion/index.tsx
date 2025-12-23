import React, { forwardRef, createContext, useContext, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { BoxView } from '../BoxView';
import { Text } from '../Text';
import { Collapse } from '../Collapse';
import type { DefaultProps, MantineNumberSize, SpacingValue } from '../../theme/types';
import { useComponentDefaultProps } from '../../theme/theme-provider';
import { createStyles } from '../../theme';
import { rem } from '../../theme/utils/rem';

interface AccordionContextValue {
  value: string[];
  onChange: (value: string) => void;
  multiple: boolean;
  variant: 'default' | 'contained' | 'separated';
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

const useAccordionContext = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('Accordion components must be used within Accordion');
  }
  return context;
};

export interface AccordionProps extends DefaultProps {
  /** Accordion items */
  children: React.ReactNode;

  /** Allow multiple items to be opened at once */
  multiple?: boolean;

  /** Default opened items (uncontrolled) */
  defaultValue?: string | string[];

  /** Controlled opened items */
  value?: string | string[];

  /** Called when opened items change */
  onChange?: (value: string | string[]) => void;

  /** Accordion variant */
  variant?: 'default' | 'contained' | 'separated';

  /** Border radius */
  radius?: MantineNumberSize;

  /** Spacing between items (separated variant only) */
  spacing?: SpacingValue;

  /** Additional styles */
  style?: any;
}

export interface AccordionItemProps extends DefaultProps {
  /** Unique item value */
  value: string;

  /** Item label */
  label?: React.ReactNode;

  /** Item content */
  children?: React.ReactNode;

  /** Additional styles */
  style?: any;
}

export interface AccordionControlProps extends DefaultProps {
  /** Control content */
  children?: React.ReactNode;

  /** Additional styles */
  style?: any;
}

export interface AccordionPanelProps extends DefaultProps {
  /** Panel content */
  children?: React.ReactNode;

  /** Additional styles */
  style?: any;
}

const useAccordionStyles = createStyles(
  (
    theme,
    {
      variant,
      radius,
      spacing,
    }: {
      variant: 'default' | 'contained' | 'separated';
      radius: MantineNumberSize;
      spacing: SpacingValue;
    }
  ) => {
    const getSpacing = () => {
      if (typeof spacing === 'number') return rem(spacing);
      return theme.spacing[spacing] || theme.spacing.md;
    };

    return {
      root: {
        ...(variant === 'contained' && {
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark?.[6] : theme.white,
          borderRadius: theme.fn.radius(radius),
          borderWidth: 1,
          borderColor:
            theme.colorScheme === 'dark' ? theme.colors.dark?.[4] : theme.colors.gray?.[3],
        }),
      },
      item: {
        ...(variant === 'separated' && {
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark?.[6] : theme.white,
          borderRadius: theme.fn.radius(radius),
          borderWidth: 1,
          borderColor:
            theme.colorScheme === 'dark' ? theme.colors.dark?.[4] : theme.colors.gray?.[3],
          marginBottom: getSpacing() as any,
        }),
        ...(variant === 'default' && {
          borderBottomWidth: 1,
          borderBottomColor:
            theme.colorScheme === 'dark' ? theme.colors.dark?.[4] : theme.colors.gray?.[3],
        }),
      },
    };
  }
);

const useAccordionItemStyles = createStyles((theme) => ({
  control: {
    padding: theme.spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: theme.fontSizes.sm as number,
    fontWeight: '500',
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    flex: 1,
  },
  icon: {
    marginLeft: theme.spacing.sm,
  },
  iconText: {
    fontSize: 16,
    color: theme.colorScheme === 'dark' ? theme.colors.dark?.[2] : theme.colors.gray?.[6],
  },
  panel: {
    padding: theme.spacing.md,
    paddingTop: 0,
  },
}));

const defaultAccordionProps: Partial<AccordionProps> = {
  multiple: false,
  variant: 'default',
  radius: 'sm',
  spacing: 'md',
};

export const Accordion = forwardRef<any, AccordionProps>((props, ref) => {
  const {
    children,
    multiple,
    defaultValue,
    value: controlledValue,
    onChange,
    variant,
    radius,
    spacing,
    style,
    ...others
  } = useComponentDefaultProps('Accordion', defaultAccordionProps, props);

  const [uncontrolledValue, setUncontrolledValue] = useState<string[]>(() => {
    if (defaultValue === undefined) return [];
    return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
  });

  const value =
    controlledValue !== undefined
      ? Array.isArray(controlledValue)
        ? controlledValue
        : [controlledValue]
      : uncontrolledValue;

  const handleChange = (itemValue: string) => {
    const newValue = value.includes(itemValue)
      ? value.filter((v) => v !== itemValue)
      : multiple
      ? [...value, itemValue]
      : [itemValue];

    if (controlledValue === undefined) {
      setUncontrolledValue(newValue);
    }

    onChange?.(multiple ? newValue : newValue[0] || '');
  };

  const { styles, sx } = useAccordionStyles(
    { variant: variant || 'default', radius: radius || 'sm', spacing: spacing || 'md' },
    { name: 'Accordion' }
  ) as any;

  return (
    <AccordionContext.Provider value={{ value, onChange: handleChange, multiple: multiple || false, variant: variant || 'default' }}>
      <BoxView ref={ref} style={sx(styles.root, style)} {...others}>
        {children}
      </BoxView>
    </AccordionContext.Provider>
  );
});

export const AccordionItem = forwardRef<any, AccordionItemProps>((props, ref) => {
  const { children, style, ...others } = props;
  const { styles, sx } = useAccordionItemStyles({}, { name: 'AccordionItem' }) as any;

  return (
    <BoxView ref={ref} style={sx(styles.item, style)} {...others}>
      {children}
    </BoxView>
  );
});

export const AccordionControl = forwardRef<any, AccordionControlProps>((props, ref) => {
  const { children, style, ...others } = props;
  const { styles } = useAccordionItemStyles({}, { name: 'AccordionControl' }) as any;

  return (
    <BoxView ref={ref} style={[styles.control, style]} {...others}>
      {children}
    </BoxView>
  );
});

export const AccordionPanel = forwardRef<any, AccordionPanelProps>((props, ref) => {
  const { children, style, ...others } = props;
  const { styles } = useAccordionItemStyles({}, { name: 'AccordionPanel' }) as any;

  return (
    <BoxView ref={ref} style={[styles.panel, style]} {...others}>
      {children}
    </BoxView>
  );
});

// Simplified Accordion.Item component that combines all parts
interface SimpleAccordionItemProps extends AccordionItemProps {
  label: React.ReactNode;
}

const SimpleAccordionItem = forwardRef<any, SimpleAccordionItemProps>((props, ref) => {
  const { value, label, children, style, ...others} = props;
  const context = useAccordionContext();
  const { styles, sx} = useAccordionItemStyles({}, { name: 'AccordionItem' }) as any;

  const isOpen = context.value.includes(value);

  return (
    <BoxView ref={ref} style={sx(styles.item, style)} {...others}>
      <TouchableOpacity
        style={styles.control}
        onPress={() => context.onChange(value)}
        activeOpacity={0.7}
      >
        {typeof label === 'string' ? <Text style={styles.label}>{label}</Text> : label}
        <BoxView style={styles.icon}>
          <Text style={styles.iconText}>{isOpen ? '−' : '+'}</Text>
        </BoxView>
      </TouchableOpacity>

      <Collapse in={isOpen}>
        <BoxView style={styles.panel}>{children}</BoxView>
      </Collapse>
    </BoxView>
  );
});

Accordion.displayName = 'Accordion';
AccordionItem.displayName = 'Accordion.Item';
AccordionControl.displayName = 'Accordion.Control';
AccordionPanel.displayName = 'Accordion.Panel';
SimpleAccordionItem.displayName = 'Accordion.SimpleItem';

// Attach sub-components
(Accordion as any).Item = SimpleAccordionItem;
(Accordion as any).Control = AccordionControl;
(Accordion as any).Panel = AccordionPanel;

export { SimpleAccordionItem };
