const formatter = new Intl.NumberFormat('en-CA', {
  style: 'currency',
  currency: 'CAD',
});

export const CurrentFormatter = (value: number): string =>
  formatter.format(value);
