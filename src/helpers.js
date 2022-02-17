export const convertUnicode = (input) =>
  input.replace(/\&[#0-9a-zA-Z]*\;/g, (el) => String.prototype.charAt(el));
