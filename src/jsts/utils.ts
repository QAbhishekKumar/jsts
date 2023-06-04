export function toCapitalCase(str: string) {
  if (typeof str === 'string' && /[a-z]/.test(str[0])) {
    return `${str[0].toUpperCase()}${str.slice(1)}`;
  }
  return str;
}
