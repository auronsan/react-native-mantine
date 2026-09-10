import {
  computeFloatingPosition,
  getArrowBorderStyle,
  parseFloatingPosition,
  type FloatingPositionOptions,
} from '../position';

const window = { width: 400, height: 800 };
// Target sits in the middle of the window so every side has room.
const target = { x: 150, y: 380, width: 100, height: 40 };
const dropdown = { width: 200, height: 100 };

const compute = (overrides: Partial<FloatingPositionOptions> = {}) =>
  computeFloatingPosition({
    position: 'bottom',
    target,
    dropdown,
    window,
    ...overrides,
  });

describe('parseFloatingPosition', () => {
  it('splits side and alignment', () => {
    expect(parseFloatingPosition('bottom')).toEqual({ side: 'bottom', align: 'center' });
    expect(parseFloatingPosition('top-start')).toEqual({ side: 'top', align: 'start' });
    expect(parseFloatingPosition('right-end')).toEqual({ side: 'right', align: 'end' });
  });
});

describe('computeFloatingPosition', () => {
  describe('sides and alignment', () => {
    it('bottom: below the target, centered', () => {
      const result = compute({ position: 'bottom' });
      expect(result.top).toBe(380 + 40 + 8);
      expect(result.left).toBe(150 + 50 - 100);
      expect(result.placement).toBe('bottom');
    });

    it('bottom-start / bottom-end align with the target edges', () => {
      expect(compute({ position: 'bottom-start' }).left).toBe(150);
      expect(compute({ position: 'bottom-end' }).left).toBe(150 + 100 - 200);
    });

    it('top: above the target, centered', () => {
      const result = compute({ position: 'top' });
      expect(result.top).toBe(380 - 100 - 8);
      expect(result.left).toBe(100);
    });

    it('top-start / top-end align with the target edges', () => {
      expect(compute({ position: 'top-start' })).toMatchObject({ top: 272, left: 150 });
      expect(compute({ position: 'top-end' })).toMatchObject({ top: 272, left: 50 });
    });

    it('left: to the left of the target, vertically centered', () => {
      const result = compute({ position: 'left', dropdown: { width: 100, height: 100 } });
      expect(result.left).toBe(150 - 100 - 8);
      expect(result.top).toBe(380 + 20 - 50);
    });

    it('left-start / left-end align with the target edges', () => {
      const size = { width: 100, height: 100 };
      expect(compute({ position: 'left-start', dropdown: size })).toMatchObject({
        left: 42,
        top: 380,
      });
      expect(compute({ position: 'left-end', dropdown: size })).toMatchObject({
        left: 42,
        top: 380 + 40 - 100,
      });
    });

    it('right: to the right of the target, vertically centered', () => {
      const result = compute({ position: 'right', dropdown: { width: 100, height: 100 } });
      expect(result.left).toBe(150 + 100 + 8);
      expect(result.top).toBe(350);
    });

    it('right-start / right-end align with the target edges', () => {
      const size = { width: 100, height: 100 };
      expect(compute({ position: 'right-start', dropdown: size })).toMatchObject({
        left: 258,
        top: 380,
      });
      expect(compute({ position: 'right-end', dropdown: size })).toMatchObject({
        left: 258,
        top: 320,
      });
    });

    it('honors a custom offset', () => {
      expect(compute({ position: 'bottom', offset: 20 }).top).toBe(440);
      expect(compute({ position: 'top', offset: 0 }).top).toBe(280);
    });
  });

  describe('flipping', () => {
    it('flips bottom to top when there is no room below', () => {
      const result = compute({
        position: 'bottom-start',
        target: { x: 150, y: 700, width: 100, height: 40 },
      });
      expect(result.side).toBe('top');
      expect(result.placement).toBe('top-start');
      expect(result.top).toBe(700 - 100 - 8);
    });

    it('flips top to bottom when there is no room above', () => {
      const result = compute({
        position: 'top',
        target: { x: 150, y: 20, width: 100, height: 40 },
      });
      expect(result.side).toBe('bottom');
      expect(result.top).toBe(20 + 40 + 8);
    });

    it('flips left to right when there is no room on the left', () => {
      const result = compute({
        position: 'left',
        target: { x: 10, y: 380, width: 100, height: 40 },
      });
      expect(result.side).toBe('right');
      expect(result.left).toBe(10 + 100 + 8);
    });

    it('flips right to left when there is no room on the right', () => {
      const result = compute({
        position: 'right',
        target: { x: 290, y: 380, width: 100, height: 40 },
      });
      expect(result.side).toBe('left');
      expect(result.left).toBe(290 - 200 - 8);
    });

    it('keeps the preferred side when neither side fits but it has more room', () => {
      const result = compute({
        position: 'bottom',
        dropdown: { width: 200, height: 600 },
        target: { x: 150, y: 200, width: 100, height: 40 },
      });
      expect(result.side).toBe('bottom');
    });

    it('does not flip when the preferred side fits', () => {
      expect(compute({ position: 'top' }).side).toBe('top');
      expect(compute({ position: 'bottom' }).side).toBe('bottom');
    });
  });

  describe('clamping', () => {
    it('clamps to the left window margin', () => {
      const result = compute({
        position: 'bottom-end',
        target: { x: 0, y: 380, width: 20, height: 40 },
      });
      expect(result.left).toBe(8);
    });

    it('clamps to the right window margin', () => {
      const result = compute({
        position: 'bottom-start',
        target: { x: 350, y: 380, width: 40, height: 40 },
      });
      expect(result.left).toBe(400 - 8 - 200);
    });

    it('clamps to the top and bottom window margins', () => {
      const tall = { width: 100, height: 300 };
      expect(
        compute({
          position: 'right-end',
          dropdown: tall,
          target: { x: 10, y: 10, width: 40, height: 40 },
        }).top
      ).toBe(8);
      expect(
        compute({
          position: 'right-start',
          dropdown: tall,
          target: { x: 10, y: 700, width: 40, height: 40 },
        }).top
      ).toBe(800 - 8 - 300);
    });

    it('falls back to the margin when the dropdown is wider than the window', () => {
      const result = compute({ dropdown: { width: 1000, height: 100 } });
      expect(result.left).toBe(8);
    });

    it('honors a custom margin', () => {
      const result = compute({
        position: 'bottom-end',
        margin: 20,
        target: { x: 0, y: 380, width: 20, height: 40 },
      });
      expect(result.left).toBe(20);
    });

    it('positions a zero-sized unmeasured target at the margin', () => {
      const result = compute({
        position: 'bottom-start',
        target: { x: 0, y: 0, width: 0, height: 0 },
        dropdown: { width: 0, height: 0 },
      });
      expect(result).toMatchObject({ top: 8, left: 8 });
    });
  });

  describe('arrow', () => {
    it('returns no arrow styles without arrowSize', () => {
      expect(compute().arrow).toBeNull();
    });

    it('places the arrow on the top edge for bottom placements', () => {
      const result = compute({ position: 'bottom', arrowSize: 8 });
      // target center x = 200, dropdown left = 100 -> 100 - half
      expect(result.arrow).toEqual({ top: -4, left: 96 });
    });

    it('uses arrowOffset for start / end alignments', () => {
      expect(compute({ position: 'bottom-start', arrowSize: 8, arrowOffset: 5 }).arrow).toEqual({
        top: -4,
        left: 5,
      });
      expect(compute({ position: 'bottom-end', arrowSize: 8, arrowOffset: 5 }).arrow).toEqual({
        top: -4,
        right: 5,
      });
    });

    it('places the arrow on the bottom edge for top placements', () => {
      expect(compute({ position: 'top-start', arrowSize: 8, arrowOffset: 3 }).arrow).toEqual({
        bottom: -4,
        left: 3,
      });
    });

    it('places the arrow on the vertical edges for left / right placements', () => {
      const size = { width: 100, height: 100 };
      expect(compute({ position: 'right', dropdown: size, arrowSize: 8 }).arrow).toEqual({
        left: -4,
        // target center y = 400, dropdown top = 350 -> 50 - half
        top: 46,
      });
      expect(
        compute({ position: 'left-end', dropdown: size, arrowSize: 8, arrowOffset: 6 }).arrow
      ).toEqual({ right: -4, bottom: 6 });
    });

    it('keeps a centered arrow inside the dropdown after clamping', () => {
      const result = compute({
        position: 'bottom',
        arrowSize: 10,
        arrowOffset: 4,
        target: { x: 380, y: 380, width: 20, height: 40 },
      });
      expect(result.left).toBe(192);
      expect(result.arrow).toEqual({ top: -5, left: 200 - 10 - 4 });
    });

    it('follows the flipped side', () => {
      const result = compute({
        position: 'bottom',
        arrowSize: 8,
        target: { x: 150, y: 700, width: 100, height: 40 },
      });
      expect(result.side).toBe('top');
      expect(result.arrow).toMatchObject({ bottom: -4 });
    });
  });
});

describe('getArrowBorderStyle', () => {
  it('draws only the two protruding edges for each side', () => {
    expect(getArrowBorderStyle('bottom', 1)).toEqual({
      borderTopWidth: 1,
      borderLeftWidth: 1,
      borderRightWidth: 0,
      borderBottomWidth: 0,
    });
    expect(getArrowBorderStyle('top', 1)).toEqual({
      borderBottomWidth: 1,
      borderRightWidth: 1,
      borderTopWidth: 0,
      borderLeftWidth: 0,
    });
    expect(getArrowBorderStyle('right', 2)).toEqual({
      borderBottomWidth: 2,
      borderLeftWidth: 2,
      borderTopWidth: 0,
      borderRightWidth: 0,
    });
    expect(getArrowBorderStyle('left', 2)).toEqual({
      borderTopWidth: 2,
      borderRightWidth: 2,
      borderBottomWidth: 0,
      borderLeftWidth: 0,
    });
  });
});
