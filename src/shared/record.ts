/**
 * cycle through each keys and throw error if the specified value is undefined
 *
 */
export function mandatoryFields<T extends Record<string, string | undefined>>(
  values: T,
): { [K in keyof T]: NonNullable<T[K]> } {
  return Object.keys(values).reduce(
    (prev, key) => {
      if (!values[key]) throw Error(`Missing config: ${key}`);

      return {
        ...prev,
        [key]: values[key]!,
      };
    },
    {} as { [K in keyof T]: NonNullable<T[K]> },
  );
}
