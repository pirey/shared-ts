import { djb2 } from "@/shared/string";

// TODO: memoize this function
export function createStorageKey(key: string) {
  return djb2(key);
}
