export const convertUnicode = (input) =>
  input.replace(/\&[#0-9a-zA-Z]*\;/g, (el) => String.prototype.charAt(el));

export const shuffleArray = (arr) => arr.sort(() => 0.5 - Math.random());
