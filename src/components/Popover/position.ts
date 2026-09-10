/**
 * Pure positioning math shared by Popover, Tooltip and Menu.
 *
 * Given the target rect (from `measureInWindow`), the measured dropdown size
 * (from `onLayout`) and the window size, computes where the floating element
 * should be placed for a Mantine-style `position` prop, flipping to the
 * opposite side when the preferred side does not fit and clamping the result
 * inside the window.
 */

export type FloatingSide = 'top' | 'bottom' | 'left' | 'right';
export type FloatingAlign = 'start' | 'center' | 'end';
export type FloatingPosition =
  | FloatingSide
  | `${FloatingSide}-start`
  | `${FloatingSide}-end`;

export interface FloatingRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface FloatingSize {
  width: number;
  height: number;
}

export interface ArrowStyle {
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
}

export interface FloatingPositionOptions {
  /** Preferred placement, e.g. `bottom`, `top-start`, `right-end` */
  position: FloatingPosition;
  /** Target rect in window coordinates (from `measureInWindow`) */
  target: FloatingRect;
  /** Measured dropdown size (from `onLayout`); `{ width: 0, height: 0 }` before layout */
  dropdown: FloatingSize;
  /** Window size (from `Dimensions.get('window')` / `useWindowDimensions`) */
  window: FloatingSize;
  /** Gap between target and dropdown, default 8 */
  offset?: number;
  /** Minimum distance from the window edges, default 8 */
  margin?: number;
  /** Arrow size in px; when > 0 the result includes `arrow` styles */
  arrowSize?: number;
  /** Arrow distance from the dropdown edge for `-start` / `-end` placements */
  arrowOffset?: number;
}

export interface FloatingPositionResult {
  /** Absolute top of the dropdown in window coordinates */
  top: number;
  /** Absolute left of the dropdown in window coordinates */
  left: number;
  /** Side actually used (after flipping) */
  side: FloatingSide;
  /** Alignment along the cross axis */
  align: FloatingAlign;
  /** Placement actually used (after flipping) */
  placement: FloatingPosition;
  /** Absolute position of the arrow relative to the dropdown box, or null when no arrow */
  arrow: ArrowStyle | null;
}

export const DEFAULT_FLOATING_OFFSET = 8;
export const DEFAULT_FLOATING_MARGIN = 8;

const OPPOSITE: Record<FloatingSide, FloatingSide> = {
  top: 'bottom',
  bottom: 'top',
  left: 'right',
  right: 'left',
};

export function parseFloatingPosition(position: FloatingPosition): {
  side: FloatingSide;
  align: FloatingAlign;
} {
  const [side, align] = position.split('-') as [FloatingSide, FloatingAlign | undefined];
  return { side, align: align ?? 'center' };
}

export function isVerticalSide(side: FloatingSide): boolean {
  return side === 'top' || side === 'bottom';
}

function clamp(value: number, min: number, max: number): number {
  if (max < min) {
    return min;
  }
  return Math.min(Math.max(value, min), max);
}

/**
 * Computes dropdown placement for a Mantine-style `position` value.
 *
 * - Places the dropdown `offset` px away from the target on the requested side.
 * - `-start` / `-end` align the dropdown with the target's start / end edge on
 *   the cross axis; without a suffix the dropdown is centered on the target.
 * - Flips to the opposite side when the dropdown does not fit on the preferred
 *   side and the opposite side has more room.
 * - Clamps the result so the dropdown stays at least `margin` px inside the window.
 * - When `arrowSize` > 0, returns `arrow` styles (absolute, relative to the
 *   dropdown box) placing the arrow on the edge facing the target.
 */
export function computeFloatingPosition(
  options: FloatingPositionOptions
): FloatingPositionResult {
  const {
    position,
    target,
    dropdown,
    window,
    offset = DEFAULT_FLOATING_OFFSET,
    margin = DEFAULT_FLOATING_MARGIN,
    arrowSize = 0,
    arrowOffset = 0,
  } = options;

  const { side: preferredSide, align } = parseFloatingPosition(position);

  // Available room on each side of the target, excluding the window margin.
  const space: Record<FloatingSide, number> = {
    top: target.y - margin,
    bottom: window.height - (target.y + target.height) - margin,
    left: target.x - margin,
    right: window.width - (target.x + target.width) - margin,
  };

  const needed = (side: FloatingSide) =>
    (isVerticalSide(side) ? dropdown.height : dropdown.width) + offset;

  let side = preferredSide;
  const opposite = OPPOSITE[preferredSide];
  if (needed(preferredSide) > space[preferredSide] && space[opposite] > space[preferredSide]) {
    side = opposite;
  }

  let top: number;
  let left: number;

  if (isVerticalSide(side)) {
    top =
      side === 'bottom'
        ? target.y + target.height + offset
        : target.y - dropdown.height - offset;

    if (align === 'start') {
      left = target.x;
    } else if (align === 'end') {
      left = target.x + target.width - dropdown.width;
    } else {
      left = target.x + target.width / 2 - dropdown.width / 2;
    }
  } else {
    left =
      side === 'right'
        ? target.x + target.width + offset
        : target.x - dropdown.width - offset;

    if (align === 'start') {
      top = target.y;
    } else if (align === 'end') {
      top = target.y + target.height - dropdown.height;
    } else {
      top = target.y + target.height / 2 - dropdown.height / 2;
    }
  }

  top = clamp(top, margin, window.height - margin - dropdown.height);
  left = clamp(left, margin, window.width - margin - dropdown.width);

  let arrow: ArrowStyle | null = null;
  if (arrowSize > 0) {
    const half = arrowSize / 2;
    arrow = {};

    if (isVerticalSide(side)) {
      // Arrow sits on the horizontal edge facing the target.
      if (side === 'bottom') {
        arrow.top = -half;
      } else {
        arrow.bottom = -half;
      }

      if (align === 'start') {
        arrow.left = arrowOffset;
      } else if (align === 'end') {
        arrow.right = arrowOffset;
      } else {
        arrow.left = clamp(
          target.x + target.width / 2 - left - half,
          arrowOffset,
          dropdown.width - arrowSize - arrowOffset
        );
      }
    } else {
      // Arrow sits on the vertical edge facing the target.
      if (side === 'right') {
        arrow.left = -half;
      } else {
        arrow.right = -half;
      }

      if (align === 'start') {
        arrow.top = arrowOffset;
      } else if (align === 'end') {
        arrow.bottom = arrowOffset;
      } else {
        arrow.top = clamp(
          target.y + target.height / 2 - top - half,
          arrowOffset,
          dropdown.height - arrowSize - arrowOffset
        );
      }
    }
  }

  const placement = (align === 'center' ? side : `${side}-${align}`) as FloatingPosition;

  return { top, left, side, align, placement, arrow };
}

/**
 * Border widths for a rotated-square arrow so that only the two edges that
 * protrude outside the dropdown are drawn. `side` is the side the dropdown is
 * on relative to the target (i.e. the arrow points the opposite way).
 */
export function getArrowBorderStyle(
  side: FloatingSide,
  borderWidth: number
): {
  borderTopWidth: number;
  borderRightWidth: number;
  borderBottomWidth: number;
  borderLeftWidth: number;
} {
  // A square rotated 45deg clockwise: its top-left corner points up, top-right
  // points right, bottom-right points down and bottom-left points left.
  switch (side) {
    case 'bottom': // arrow points up
      return {
        borderTopWidth: borderWidth,
        borderLeftWidth: borderWidth,
        borderRightWidth: 0,
        borderBottomWidth: 0,
      };
    case 'top': // arrow points down
      return {
        borderBottomWidth: borderWidth,
        borderRightWidth: borderWidth,
        borderTopWidth: 0,
        borderLeftWidth: 0,
      };
    case 'right': // arrow points left
      return {
        borderBottomWidth: borderWidth,
        borderLeftWidth: borderWidth,
        borderTopWidth: 0,
        borderRightWidth: 0,
      };
    case 'left': // arrow points right
    default:
      return {
        borderTopWidth: borderWidth,
        borderRightWidth: borderWidth,
        borderBottomWidth: 0,
        borderLeftWidth: 0,
      };
  }
}
