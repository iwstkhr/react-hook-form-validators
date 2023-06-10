import {
  composeValidators,
  emailValidator,
  fullWidthKanaValidator,
  halfWidthKanaValidator,
  kanaValidator,
  maxLengthValidator,
  maxValidator,
  minLengthValidator,
  minValidator,
  requiredValidator,
} from './validators';

describe('validators', () => {
  afterEach(() => jest.restoreAllMocks());

  it('requiredValidator', () => {
    expect(requiredValidator()).toEqual({
      required: { value: true, message: 'Must be entered.' }
    });
  });

  it('minLengthValidator', () => {
    expect(minLengthValidator(10)()).toEqual({
      minLength: { value: 10, message: `Must be 10 or more characters.` }
    });
  });

  it('maxLengthValidator', () => {
    expect(maxLengthValidator(10)()).toEqual({
      maxLength: { value: 10, message: `Must be 10 or less characters.` }
    });
  });

  it('minValidator', () => {
    expect(minValidator(10)()).toEqual({
      min: { value: 10, message: `Must be 10 or larger.` }
    });
  });

  it('maxValidator', () => {
    expect(maxValidator(10)()).toEqual({
      max: { value: 10, message: `Must be 10 or smaller.` }
    });
  });

  it('emailValidator', () => {
    const result = emailValidator() as any;
    expect(result).toEqual({
      pattern: { value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/, message: 'Must be a valid email.' }
    });
    expect(new RegExp(result.pattern.value).test('iwasa.takahiro@wasabee.dev')).toBeTruthy();
    expect(new RegExp(result.pattern.value).test('iwasa.takahiro@localhost')).toBeFalsy();
    expect(new RegExp(result.pattern.value).test('iwasa')).toBeFalsy();
  });

  it('kanaValidator', () => {
    const result = kanaValidator() as any;
    expect(result).toEqual({
      pattern: { value: /^[ァ-ヴ・ｦ-ﾟ]*$/, message: 'Must be kana characters.' }
    });
    expect(new RegExp(result.pattern.value).test('カナ')).toBeTruthy();
    expect(new RegExp(result.pattern.value).test('ｶﾅ')).toBeTruthy();
    expect(new RegExp(result.pattern.value).test('かな')).toBeFalsy();
  });

  it('fullWidthKanaValidator', () => {
    const result = fullWidthKanaValidator() as any;
    expect(result).toEqual({
      pattern: { value: /^[ァ-ヴ・]*$/, message: 'Must be full-width kana characters.' }
    });
    expect(new RegExp(result.pattern.value).test('カナ')).toBeTruthy();
    expect(new RegExp(result.pattern.value).test('ｶﾅ')).toBeFalsy();
    expect(new RegExp(result.pattern.value).test('かな')).toBeFalsy();
  });

  it('halfWidthKanaValidator', () => {
    const result = halfWidthKanaValidator() as any;
    expect(result).toEqual({
      pattern: { value: /^[ｦ-ﾟ]*$/, message: 'Must be half-width kana characters.' }
    });
    expect(new RegExp(result.pattern.value).test('ｶﾅ')).toBeTruthy();
    expect(new RegExp(result.pattern.value).test('カナ')).toBeFalsy();
    expect(new RegExp(result.pattern.value).test('かな')).toBeFalsy();
  });

  it('composeValidators', () => {
    const result = composeValidators(requiredValidator, minValidator(1));
    expect(result).toEqual({
      required: { value: true, message: 'Must be entered.' },
      min: { value: 1, message: `Must be 1 or larger.` },
    });
  });
});
