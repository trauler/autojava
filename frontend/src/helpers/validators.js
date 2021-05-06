import { forEach } from 'lodash-es';

const vinValidator = (value) => {
  if (!value) return null;
  if (value.length !== 17)
    return 'Необходимо 17 символов';
  return null;
};

const requiredValidator = (value) => {
  if (!value)
    return 'Обязательное поле';
  return null;
};

export const carVinValidator = (value) => {
  let error = null;
  forEach([requiredValidator, vinValidator], (validator) => {
    error = validator(value);
    if (error) return false;
  });
  return error;
};