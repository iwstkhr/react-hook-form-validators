import { RegisterOptions } from 'react-hook-form';

export const requiredValidator = (): RegisterOptions => {
  return { required: { value: true, message: 'Must be entered.' } };
};

export const minLengthValidator = (minLength: number): () => RegisterOptions => {
  return () => ({ minLength: { value: minLength, message: `Must be ${minLength} or more characters.` } });
};

export const maxLengthValidator = (maxLength: number): () => RegisterOptions => {
  return () => ({ maxLength: { value: maxLength, message: `Must be ${maxLength} or less characters.` } });
};

export const minValidator = (min: number): () => RegisterOptions => {
  return () => ({ min: { value: min, message: `Must be ${min} or larger.` } });
};

export const maxValidator = (max: number): () => RegisterOptions => {
  return () => ({ max: {value: max, message: `Must be ${max} or smaller.` } });
};

export const emailValidator = (): RegisterOptions => {
  // Based on https://learn.microsoft.com/en-us/dotnet/standard/base-types/how-to-verify-that-strings-are-in-valid-email-format
  return { pattern: { value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/, message: 'Must be a valid email.' } };
};

export const kanaValidator = (): RegisterOptions => {
  return { pattern: { value: /^[ァ-ヴ・ｦ-ﾟ]*$/, message: 'Must be kana characters.' } };
};

export const fullWidthKanaValidator = (): RegisterOptions => {
  return { pattern: { value: /^[ァ-ヴ・]*$/, message: 'Must be full-width kana characters.' } };
};

export const halfWidthKanaValidator = (): RegisterOptions => {
  return { pattern: { value: /^[ｦ-ﾟ]*$/, message: 'Must be half-width kana characters.' } };
};

export const composeValidators = (...validators: (() => RegisterOptions)[]) => {
  return validators.reduce((acc, cur) => ({ ...acc, ...cur() }), {});
};
