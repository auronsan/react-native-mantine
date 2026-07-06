import { useEffect, useRef, useState, type ReactElement } from 'react';
import { Popover, type PopoverProps } from '../Popover';
import { useComponentDefaultProps } from '../../theme/theme-provider';

export interface HoverCardProps extends Omit<PopoverProps, 'opened'> {
  /** Open delay in ms */
  openDelay?: number;

  /** Close delay in ms */
  closeDelay?: number;

  /** Initial opened state */
  initiallyOpened?: boolean;
}

const defaultProps: Partial<HoverCardProps> = {
  openDelay: 0,
  closeDelay: 150,
  initiallyOpened: false,
};

/**
 * HoverCard displays a dropdown with additional information. Since hover is
 * not available on touch devices, the dropdown opens when the target is
 * pressed; openDelay/closeDelay are preserved from the Mantine API.
 */
export const HoverCard = Object.assign(
  (props: HoverCardProps) => {
    const {
      openDelay,
      closeDelay,
      initiallyOpened,
      onChange,
      children,
      ...others
    } = useComponentDefaultProps('HoverCard', defaultProps, props);

    const [opened, setOpened] = useState(initiallyOpened ?? false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, []);

    const handleChange = (next: boolean) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      const delay = next ? openDelay : closeDelay;

      if (!delay) {
        setOpened(next);
        onChange?.(next);
        return;
      }

      timeoutRef.current = setTimeout(() => {
        setOpened(next);
        onChange?.(next);
      }, delay);
    };

    return (
      <Popover opened={opened} onChange={handleChange} {...others}>
        {children}
      </Popover>
    );
  },
  {
    Target: Popover.Target,
    Dropdown: Popover.Dropdown,
  }
) as ((props: HoverCardProps) => ReactElement) & {
  Target: typeof Popover.Target;
  Dropdown: typeof Popover.Dropdown;
  displayName?: string;
};

HoverCard.displayName = 'HoverCard';
