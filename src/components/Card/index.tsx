import React, { forwardRef, createContext, useContext } from 'react';
import { BoxView } from '../BoxView';
import { Paper } from '../Paper';
import type { PaperProps } from '../Paper';
import type { DefaultProps, SpacingValue } from '../../theme/types';
import { useComponentDefaultProps } from '../../theme/theme-provider';
import { createStyles } from '../../theme';
import { rem } from '../../theme/utils/rem';

interface CardContextValue {
  padding: SpacingValue;
}

const CardContext = createContext<CardContextValue | null>(null);

const useCardContext = () => {
  const context = useContext(CardContext);
  return context;
};

export interface CardProps extends PaperProps {
  /** Card padding */
  padding?: SpacingValue;

  /** Card children */
  children?: React.ReactNode;
}

export interface CardSectionProps extends DefaultProps {
  /** Section children */
  children?: React.ReactNode;

  /** Inherit padding from Card */
  inheritPadding?: boolean;

  /** Section padding override */
  padding?: SpacingValue;

  /** Add border to section */
  withBorder?: boolean;

  /** Additional styles */
  style?: any;
}

const useCardStyles = createStyles((theme, { padding }: { padding: SpacingValue }) => {
  const getPadding = () => {
    if (padding === undefined) return theme.spacing.md;
    if (typeof padding === 'number') return rem(padding);
    return theme.spacing[padding] || theme.spacing.md;
  };

  return {
    root: {
      padding: getPadding(),
      overflow: 'hidden',
    },
  };
});

const useCardSectionStyles = createStyles(
  (
    theme,
    {
      padding,
      withBorder,
      inheritPadding,
      cardPadding,
    }: {
      padding?: SpacingValue;
      withBorder: boolean;
      inheritPadding: boolean;
      cardPadding?: SpacingValue;
    }
  ) => {
    const getPadding = () => {
      if (inheritPadding && cardPadding !== undefined) {
        if (typeof cardPadding === 'number') return rem(cardPadding);
        return theme.spacing[cardPadding] || theme.spacing.md;
      }
      if (padding === undefined) return 0;
      if (typeof padding === 'number') return rem(padding);
      return theme.spacing[padding] || 0;
    };

    return {
      root: {
        padding: getPadding(),
        ...(withBorder && {
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderColor:
            theme.colorScheme === 'dark' ? theme.colors.dark?.[4] : theme.colors.gray?.[3],
        }),
      },
    };
  }
);

const defaultCardProps: Partial<CardProps> = {
  padding: 'md',
  radius: 'sm',
  withBorder: false,
};

const defaultCardSectionProps: Partial<CardSectionProps> = {
  inheritPadding: false,
  withBorder: false,
};

export const Card = forwardRef<any, CardProps>((props, ref) => {
  const {
    padding,
    children,
    style,
    p,
    ...otherProps
  } = useComponentDefaultProps('Card', defaultCardProps, props);

  const { styles, sx } = useCardStyles({ padding}, { name: 'Card' }) as any;

  // Use p prop for Paper, padding for Card internal logic
  const paperPadding = p !== undefined ? p : 0;

  return (
    <CardContext.Provider value={{ padding: padding! }}>
      <Paper ref={ref} p={paperPadding} style={sx(styles.root, style)} {...otherProps}>
        {children}
      </Paper>
    </CardContext.Provider>
  );
});

export const CardSection = forwardRef<any, CardSectionProps>((props, ref) => {
  const {
    children,
    inheritPadding,
    padding,
    withBorder,
    style,
    ...others
  } = useComponentDefaultProps('CardSection', defaultCardSectionProps, props);

  const cardContext = useCardContext();
  const { styles, sx} = useCardSectionStyles(
    {
      padding,
      withBorder,
      inheritPadding,
      cardPadding: cardContext?.padding,
    },
    { name: 'CardSection' }
  ) as any;

  return (
    <BoxView ref={ref} style={sx(styles.root, style)} {...others}>
      {children}
    </BoxView>
  );
});

Card.displayName = 'Card';
CardSection.displayName = 'Card.Section';

// Attach sub-components
(Card as any).Section = CardSection;
