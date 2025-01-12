export function debounce(
  func: (...args: unknown[]) => unknown,
  delay: number,
): (...args: unknown[]) => unknown {
  let timeoutId: NodeJS.Timeout;
  return function (...args: unknown[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}
