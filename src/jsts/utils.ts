// @ts-ignore
import hljs from 'highlight.js/lib/common';

export function toCapitalCase(str: string) {
  if (typeof str === 'string' && /[a-z]/.test(str[0])) {
    return `${str[0].toUpperCase()}${str.slice(1)}`;
  }
  return str;
}


export function highlightTS(code: string) {
  return hljs.highlight(code, { language: 'TypeScript' }).value;
}
