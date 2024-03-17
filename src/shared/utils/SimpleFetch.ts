export interface QueryArg {
  parameter: string,
  value: string,
}

export const SimpleFetch = async (url: string, signal: AbortSignal, queryArgs: QueryArg[] = []) => {
  if (queryArgs.length > 0) {
    const queryString = queryArgs.map((arg) =>
      arg.parameter + '=' + arg.value
    ).join('&');
    url += '?' + queryString;
  }
  try {
    const res = await fetch(url, {signal});
    if (!res.ok) {
      throw new Error(`Fetch status ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    throw err;
  }
};
