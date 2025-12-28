import { Dimensions } from 'react-native';
import { largerThan, smallerThan } from '../breakpoints';

// Mock React Native
jest.mock('react-native', () => ({
  Platform: {
    select: jest.fn((obj) => obj.default || obj.ios),
  },
  Dimensions: {
    get: jest.fn(),
  },
}));

// Import DEFAULT_THEME after mocking
import { DEFAULT_THEME } from '../../../default-theme';

describe('Responsive utilities', () => {
  const mockGetDimensions = Dimensions.get as jest.MockedFunction<
    typeof Dimensions.get
  >;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('largerThan', () => {
    it('should return true when screen width is larger than breakpoint', () => {
      mockGetDimensions.mockReturnValue({ width: 800, height: 600, scale: 1, fontScale: 1 });
      const largerThanFn = largerThan(DEFAULT_THEME);
      expect(largerThanFn('xs')).toBe(true); // xs is 576
    });

    it('should return false when screen width is smaller than breakpoint', () => {
      mockGetDimensions.mockReturnValue({ width: 500, height: 600, scale: 1, fontScale: 1 });
      const largerThanFn = largerThan(DEFAULT_THEME);
      expect(largerThanFn('xs')).toBe(false); // xs is 576
    });

    it('should work with numeric breakpoints', () => {
      mockGetDimensions.mockReturnValue({ width: 800, height: 600, scale: 1, fontScale: 1 });
      const largerThanFn = largerThan(DEFAULT_THEME);
      expect(largerThanFn(700)).toBe(true);
      expect(largerThanFn(900)).toBe(false);
    });
  });

  describe('smallerThan', () => {
    it('should return true when screen width is smaller than breakpoint', () => {
      mockGetDimensions.mockReturnValue({ width: 500, height: 600, scale: 1, fontScale: 1 });
      const smallerThanFn = smallerThan(DEFAULT_THEME);
      expect(smallerThanFn('md')).toBe(true); // md is 992
    });

    it('should return false when screen width is larger than breakpoint', () => {
      mockGetDimensions.mockReturnValue({ width: 1000, height: 600, scale: 1, fontScale: 1 });
      const smallerThanFn = smallerThan(DEFAULT_THEME);
      expect(smallerThanFn('md')).toBe(false); // md is 992
    });

    it('should work with numeric breakpoints', () => {
      mockGetDimensions.mockReturnValue({ width: 500, height: 600, scale: 1, fontScale: 1 });
      const smallerThanFn = smallerThan(DEFAULT_THEME);
      expect(smallerThanFn(700)).toBe(true);
      expect(smallerThanFn(400)).toBe(false);
    });
  });
});
