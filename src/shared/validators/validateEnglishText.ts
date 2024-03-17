export const validateEnglishText = (text: string) => {
  const regex = /^[a-zA-Z]+/;

  return regex.test(text);
}