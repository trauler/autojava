export const vinFormatter = (value) => {
  if (value)
    return value.replace(/[^0-9A-z]/g,'').slice(0, Math.min(value.length, 17));
  return value;
};