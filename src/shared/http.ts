/**
 * a.k.a `fetch` wrapper
 *
 */
export async function httpRequest<Result = unknown>(
  url: string,
  init?: RequestInit,
  params?: {
    token?: string | null;
    uid?: string | null;
    parseResponse?: ResponseParser<Result>;
  },
) {
  const response = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(params?.uid ? { uid: params.uid } : {}),
      ...(params?.token ? { Authorization: `Bearer ${params?.token}` } : {}),
      ...init?.headers,
    },
  });
  const json: unknown = await response.json();

  if (response.ok) {
    if (params?.parseResponse) {
      try {
        return params.parseResponse(json);
      } catch (error) {
        console.error(`Error parsing success response: ${url} ${error}`);
        throw error;
      }
    }

    return json as Result;
  }

  throw json;
}

export type ResponseParser<Result = unknown> = (json: unknown) => Result;
