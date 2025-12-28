import { Platform } from 'react-native';
import { shadow } from '../shadow';

describe('shadow', () => {
  it('should return empty object when no size is provided', () => {
    const result = shadow();
    expect(result).toEqual({});
  });

  it('should return empty object for invalid size', () => {
    const result = shadow('invalid' as any);
    expect(result).toEqual({});
  });

  it('should return iOS shadow styles on iOS', () => {
    Platform.OS = 'ios';
    const result = shadow('md');

    expect(result).toEqual({
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
    });
  });

  it('should return Android elevation on Android', () => {
    Platform.OS = 'android';
    const result = shadow('md');

    expect(result).toEqual({
      elevation: 4,
    });
  });

  it('should support all shadow sizes', () => {
    Platform.OS = 'ios';

    expect(shadow('xs')).toHaveProperty('shadowRadius', 1);
    expect(shadow('sm')).toHaveProperty('shadowRadius', 2);
    expect(shadow('md')).toHaveProperty('shadowRadius', 4);
    expect(shadow('lg')).toHaveProperty('shadowRadius', 8);
    expect(shadow('xl')).toHaveProperty('shadowRadius', 16);
  });

  it('should have increasing elevation values on Android', () => {
    Platform.OS = 'android';

    expect(shadow('xs')).toEqual({ elevation: 1 });
    expect(shadow('sm')).toEqual({ elevation: 2 });
    expect(shadow('md')).toEqual({ elevation: 4 });
    expect(shadow('lg')).toEqual({ elevation: 8 });
    expect(shadow('xl')).toEqual({ elevation: 12 });
  });
});
