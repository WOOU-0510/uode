export const getUniqueValues = <T>(values: readonly T[]): readonly T[] => [
  ...new Set(values),
];

export const areOrderedValuesEqual = <T>(
  left: readonly T[],
  right: readonly T[],
): boolean =>
  left.length === right.length &&
  left.every((value, index) => Object.is(value, right[index]));

export const addUniqueValue = <T>(
  values: readonly T[],
  value: T,
): readonly T[] => (values.includes(value) ? values : [...values, value]);

export const removeValue = <T>(values: readonly T[], value: T): readonly T[] =>
  values.filter((item) => !Object.is(item, value));
