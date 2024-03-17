interface QueryArg {
  name: string,
  value: string,
}

export const SimpleFetch = async (url: string, queryArgs: QueryArg[] = []) => {
  if (queryArgs.length > 0) {
    const queryString = queryArgs.map((arg) =>
      arg.name + '=' + arg.value
    ).join('&');
    url += '?' + queryString;
  }
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Fetch status ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    throw err;
  }
};
