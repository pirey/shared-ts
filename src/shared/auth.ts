import { createStorageKey } from "@/shared/storage";

export type Token = string | null;
export type TokenSubscriber = (token: Token) => void;

const TOKEN_KEY = createStorageKey("nekot");

let tokenCache: Token = null;
const subscribers = new Set<TokenSubscriber>();

export function getToken(): Token {
  if (tokenCache === null) {
    tokenCache = localStorage.getItem(TOKEN_KEY);
  }
  return tokenCache;
}

export function storeToken(token: Token): void {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_KEY);
  }
  tokenCache = token;
  notifySubscribers(token);
}

export function removeToken(): void {
  localStorage.removeItem(TOKEN_KEY);
  tokenCache = null;
  notifySubscribers(null);
}

export function subscribeToToken(callback: TokenSubscriber): () => void {
  subscribers.add(callback);
  return () => {
    subscribers.delete(callback);
  };
}

function notifySubscribers(token: Token): void {
  subscribers.forEach((subscriber) => subscriber(token));
}
