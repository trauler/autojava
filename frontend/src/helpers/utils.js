import { chunk, map, isNumber } from 'lodash-es';

const parseClientFromOption = (option) => {
  if (!option) return null;
  const { middle_name, ...other } = option;
  return {
    ...other,
    middleName: middle_name,
  };
};

const formatNumber = (num, digits = 3) => {
  if (!isNumber(num)) {
    return '';
  }
  const [realPart, floatPart] = `${num}`.split('.');
  const chunks = chunk(`${realPart}`.split('').reverse(), digits);
  const realPartRes = map(chunks, x => x.reverse().join(''))
    .reverse()
    .join('\u2009');
  return `${realPartRes}${floatPart ? `,${floatPart}` : ''}`;
};

export {
  parseClientFromOption,
  formatNumber,
};