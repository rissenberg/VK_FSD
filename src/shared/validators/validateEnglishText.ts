/**
 * Функция валидации текста
 * Возвращает true в случае, если состоит только из английских букв
 *
 * @function
 * @param {string} text - текст для проверки
 * @return boolean - валиден ли текст или нет
 */
export const validateEnglishText = (text: string): boolean => {
  const regex = /^[A-Z]+$/i;

  return regex.test(text);
}