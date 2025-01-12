export function truncateText(text: string, maxLength = 65) {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  } else {
    return text;
  }
}

export function simpleHash(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i); // Bit-shifting to create a hash
    hash |= 0; // Convert to 32-bit integer
  }
  return hash;
}

export function assignFromSet<T>(input: string, set: T[]): T {
  const hashValue = simpleHash(input);
  const index = Math.abs(hashValue) % set.length; // Ensure index is within bounds
  return set[index];
}

export function djb2(str: string): string {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 33) ^ str.charCodeAt(i);
  }
  hash = hash >>> 0;
  return hash.toString(16);
}
