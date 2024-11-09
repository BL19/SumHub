export class FetchError extends Error {
  response: Response | null;
  data: {
    message: string;
  };
  constructor({
    message,
    response,
    data,
  }: {
    message: string;
    response: Response | null;
    data: {
      message: string;
    } | undefined | null;
  }) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(message);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FetchError);
    }

    this.name = "FetchError";
    this.response = response;
    this.data = data ?? { message: message };
  }
}

export default async function fetchJson<JSON = unknown>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  console.log(input, init)
  let response = null;
  try {
    response = await fetch(input, init);

    console.log(response);
    // if the server replies, there's always some data in json
    // if there's a network error, it will throw at the previous line
    const data = await response.json();

    // response.ok is true when res.status is 2xx
    // https://developer.mozilla.org/en-US/docs/Web/API/Response/ok
    if (response.ok) {
      return data;
    }

    throw new FetchError({
      message: response.statusText,
      response,
      data,
    });
  } catch (error: any) {
    console.error("fetchJson error", error);
    if (error instanceof FetchError) {
      throw error;
    }

    throw new FetchError({
      message: error.message,
      response,
      data: null,
    });
  }
}
