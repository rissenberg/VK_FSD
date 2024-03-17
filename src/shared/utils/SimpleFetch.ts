import {QueryArg} from "../types/types";

/**
 * Функция, отправляющая GET запрос с выбранными query параметрами
 *
 * @function
 * @async
 * @param {string} url - адрес, по которому идет запрос
 * @param {AbortSignal} signal - сигнал об отмене запроса
 * @param {QueryArg[]} queryArgs - массив параметров query запроса
 * @return Promise<JSON> response - ответ на запрос в формате JSON
 * @throws {Error} - ошибки сети, статусы больше 299
 */
export const SimpleFetch = async (url: string, signal: AbortSignal, queryArgs: QueryArg[] = []) => {
  // Добавление query параметров в адрес запроса
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
