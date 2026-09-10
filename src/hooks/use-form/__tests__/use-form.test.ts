import { renderHook, act } from '@testing-library/react-native';
import {
  useForm,
  isNotEmpty,
  minLength,
  maxLength,
  matches,
  isEmail,
  min,
  max,
  inRange,
  isInArray,
} from '../index';

interface Values {
  name: string;
  email: string;
  age: number;
}

const initialValues: Values = { name: '', email: '', age: 0 };

describe('validators', () => {
  it('isNotEmpty', () => {
    const validate = isNotEmpty();
    expect(validate(null)).toBe('This field is required');
    expect(validate(undefined)).toBe('This field is required');
    expect(validate('')).toBe('This field is required');
    expect(validate('   ')).toBe('This field is required');
    expect(validate([])).toBe('This field is required');
    expect(validate('ok')).toBeNull();
    expect(validate([1])).toBeNull();
    expect(validate(0)).toBeNull();
    expect(isNotEmpty('Custom')('')).toBe('Custom');
  });

  it('minLength and maxLength', () => {
    expect(minLength(3)('')).toBeNull();
    expect(minLength(3)('ab')).toBe('Must be at least 3 characters');
    expect(minLength(3, 'Short')('ab')).toBe('Short');
    expect(minLength(3)('abc')).toBeNull();

    expect(maxLength(2)('')).toBeNull();
    expect(maxLength(2)('abc')).toBe('Must be at most 2 characters');
    expect(maxLength(2, 'Long')('abc')).toBe('Long');
    expect(maxLength(2)('ab')).toBeNull();
  });

  it('matches and isEmail', () => {
    expect(matches(/^\d+$/)('')).toBeNull();
    expect(matches(/^\d+$/)('abc')).toBe('Invalid format');
    expect(matches(/^\d+$/, 'Digits only')('abc')).toBe('Digits only');
    expect(matches(/^\d+$/)('123')).toBeNull();

    expect(isEmail()('nope')).toBe('Invalid email');
    expect(isEmail('Bad email')('nope')).toBe('Bad email');
    expect(isEmail()('a@b.co')).toBeNull();
  });

  it('min, max and inRange', () => {
    expect(min(5)(null as any)).toBeNull();
    expect(min(5)(undefined as any)).toBeNull();
    expect(min(5)(4)).toBe('Must be at least 5');
    expect(min(5, 'Too low')(4)).toBe('Too low');
    expect(min(5)(5)).toBeNull();

    expect(max(5)(null as any)).toBeNull();
    expect(max(5)(6)).toBe('Must be at most 5');
    expect(max(5, 'Too high')(6)).toBe('Too high');
    expect(max(5)(5)).toBeNull();

    expect(inRange(1, 3)(null as any)).toBeNull();
    expect(inRange(1, 3)(0)).toBe('Must be between 1 and 3');
    expect(inRange(1, 3)(4)).toBe('Must be between 1 and 3');
    expect(inRange(1, 3, 'Out')(4)).toBe('Out');
    expect(inRange(1, 3)(2)).toBeNull();
  });

  it('isInArray', () => {
    expect(isInArray(['a', 'b'])('c')).toBe('Invalid value');
    expect(isInArray(['a', 'b'], 'Pick one')('c')).toBe('Pick one');
    expect(isInArray(['a', 'b'])('a')).toBeNull();
  });
});

describe('useForm', () => {
  it('initializes with defaults and provided state', () => {
    const { result } = renderHook(() => useForm<Values>());
    expect(result.current.values).toEqual({});
    expect(result.current.errors).toEqual({});

    const { result: seeded } = renderHook(() =>
      useForm<Values>({
        initialValues,
        initialErrors: { name: 'Bad' },
        initialTouched: { name: true },
        initialDirty: { email: true },
      })
    );
    expect(seeded.current.values).toEqual(initialValues);
    expect(seeded.current.errors).toEqual({ name: 'Bad' });
    expect(seeded.current.touched).toEqual({ name: true });
    expect(seeded.current.dirty).toEqual({ email: true });
    expect(seeded.current.isDirty()).toBe(true);
    expect(seeded.current.getFieldStatus('name')).toEqual({
      hasError: true,
      isTouched: true,
      isDirty: false,
    });
  });

  it('sets single and multiple values, tracks dirty and clears errors on change', () => {
    const { result } = renderHook(() =>
      useForm<Values>({ initialValues, initialErrors: { name: 'Bad', email: 'Bad' } })
    );

    act(() => result.current.setFieldValue('name', 'Ann'));
    expect(result.current.values.name).toBe('Ann');
    expect(result.current.dirty.name).toBe(true);
    expect(result.current.errors).toEqual({ email: 'Bad' });

    act(() => result.current.setValues({ email: 'a@b.co', age: 3 }));
    expect(result.current.values).toEqual({ name: 'Ann', email: 'a@b.co', age: 3 });
    expect(result.current.dirty).toEqual({ name: true, email: true, age: true });
    expect(result.current.errors).toEqual({});
  });

  it('keeps errors on change when clearInputErrorOnChange is false', () => {
    const { result } = renderHook(() =>
      useForm<Values>({
        initialValues,
        initialErrors: { name: 'Bad' },
        clearInputErrorOnChange: false,
      })
    );

    act(() => result.current.setFieldValue('name', 'x'));
    act(() => result.current.setValues({ name: 'y' }));
    expect(result.current.errors).toEqual({ name: 'Bad' });
  });

  it('validates on change with single and array validators', () => {
    const { result } = renderHook(() =>
      useForm<Values>({
        initialValues,
        validateInputOnChange: true,
        validate: {
          name: [isNotEmpty('Required'), minLength(2, 'Short')],
          email: isEmail('Bad email'),
        },
      })
    );

    act(() => result.current.setFieldValue('name', ''));
    expect(result.current.errors.name).toBe('Required');

    act(() => result.current.setFieldValue('name', 'a'));
    expect(result.current.errors.name).toBe('Short');

    act(() => result.current.setFieldValue('name', 'ab'));
    expect(result.current.errors.name).toBeUndefined();

    act(() => result.current.setFieldValue('email', 'nope'));
    expect(result.current.errors.email).toBe('Bad email');

    // Field without rules never errors
    act(() => result.current.setFieldValue('age', 1));
    expect(result.current.errors.age).toBeUndefined();
  });

  it('manages errors explicitly', () => {
    const { result } = renderHook(() => useForm<Values>({ initialValues }));

    act(() => result.current.setFieldError('name', 'Oops'));
    expect(result.current.errors).toEqual({ name: 'Oops' });

    act(() => result.current.setFieldError('name', null));
    expect(result.current.errors).toEqual({});

    act(() => result.current.setErrors({ name: 'A', email: 'B' }));
    act(() => result.current.clearFieldError('name'));
    expect(result.current.errors).toEqual({ email: 'B' });

    act(() => result.current.clearErrors());
    expect(result.current.errors).toEqual({});
  });

  it('validates fields and the whole form', () => {
    const { result } = renderHook(() =>
      useForm<Values>({
        initialValues,
        validate: { name: isNotEmpty('Required'), age: min(18, 'Adult') },
      })
    );

    let fieldResult: any;
    act(() => {
      fieldResult = result.current.validateField('name');
    });
    expect(fieldResult).toEqual({ hasError: true, error: 'Required' });
    expect(result.current.errors.name).toBe('Required');
    expect(result.current.isValid('name')).toBe(false);
    expect(result.current.isValid('email')).toBe(true);
    expect(result.current.isValid()).toBe(false);

    act(() => result.current.setValues({ name: 'Ann', age: 20 }));
    act(() => {
      fieldResult = result.current.validateField('name');
    });
    expect(fieldResult).toEqual({ hasError: false, error: null });
    expect(result.current.isValid()).toBe(true);

    let formResult: any;
    act(() => {
      formResult = result.current.validate();
    });
    expect(formResult).toEqual({ hasErrors: false, errors: {} });

    act(() => result.current.setFieldValue('age', 1));
    act(() => {
      formResult = result.current.validate();
    });
    expect(formResult).toEqual({ hasErrors: true, errors: { age: 'Adult' } });
    expect(result.current.errors).toEqual({ age: 'Adult' });
  });

  it('short-circuits validation without rules', () => {
    const { result } = renderHook(() => useForm<Values>({ initialValues }));

    expect(result.current.validateField('name')).toEqual({ hasError: false, error: null });
    expect(result.current.validate()).toEqual({ hasErrors: false, errors: {} });
    expect(result.current.isValid()).toBe(true);
    expect(result.current.isValid('name')).toBe(true);
  });

  it('tracks touched state and validates on blur', () => {
    const { result } = renderHook(() =>
      useForm<Values>({
        initialValues,
        validateInputOnBlur: true,
        validate: { name: isNotEmpty('Required') },
      })
    );

    act(() => result.current.setFieldTouched('name'));
    expect(result.current.touched.name).toBe(true);
    expect(result.current.errors.name).toBe('Required');

    act(() => result.current.setFieldValue('name', 'Ann'));
    act(() => result.current.setFieldTouched('name', true));
    expect(result.current.errors.name).toBeUndefined();

    act(() => result.current.setFieldTouched('name', false));
    expect(result.current.touched.name).toBe(false);

    act(() => result.current.resetTouched());
    expect(result.current.touched).toEqual({});

    act(() => result.current.resetDirty());
    expect(result.current.dirty).toEqual({});
    expect(result.current.isDirty()).toBe(false);
  });

  it('resets to initial values', () => {
    const { result } = renderHook(() => useForm<Values>({ initialValues }));

    act(() => result.current.setFieldValue('name', 'Ann'));
    act(() => result.current.setFieldError('email', 'Bad'));
    act(() => result.current.setFieldTouched('email'));
    act(() => result.current.reset());

    expect(result.current.values).toEqual(initialValues);
    expect(result.current.errors).toEqual({});
    expect(result.current.touched).toEqual({});
    expect(result.current.dirty).toEqual({});
  });

  it('builds input props with and without error/focus handling', () => {
    const { result } = renderHook(() =>
      useForm<Values>({ initialValues, initialErrors: { name: 'Bad' } })
    );

    const props = result.current.getInputProps('name');
    expect(props.value).toBe('');
    expect(props.error).toBe('Bad');
    expect(typeof props.onBlur).toBe('function');

    act(() => props.onChangeText?.('Ann'));
    expect(result.current.values.name).toBe('Ann');
    expect(result.current.errors.name).toBeUndefined();

    act(() => props.onBlur?.());
    expect(result.current.touched.name).toBe(true);

    const bare = result.current.getInputProps('email', { withError: false, withFocus: false });
    expect(bare.error).toBeUndefined();
    expect(bare.onBlur).toBeUndefined();
  });

  it('submits transformed values only when valid', async () => {
    const handleSubmit = jest.fn();
    const preventDefault = jest.fn();
    const { result } = renderHook(() =>
      useForm<Values>({
        initialValues,
        validate: { name: isNotEmpty('Required') },
        transformValues: (values) => ({ ...values, name: values.name.toUpperCase() }),
      })
    );

    await act(async () => {
      await result.current.onSubmit(handleSubmit)({ preventDefault });
    });
    expect(preventDefault).toHaveBeenCalled();
    expect(handleSubmit).not.toHaveBeenCalled();
    expect(result.current.errors.name).toBe('Required');

    act(() => result.current.setFieldValue('name', 'ann'));
    await act(async () => {
      await result.current.onSubmit(handleSubmit)();
    });
    expect(handleSubmit).toHaveBeenCalledWith(
      { name: 'ANN', email: '', age: 0 },
      undefined
    );
  });
});
