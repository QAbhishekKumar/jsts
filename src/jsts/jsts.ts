import { JsToTsMap, typeOfObject } from './constants';
import { toCapitalCase } from './utils';

function createTypeNode(key: string, type: any) {
  return `\t${key}: ${type};\n`;
}

interface AnyObject {
  [key: string]: unknown;
}

export function getInterface(obj: AnyObject, name?: string, initialByProducts: AnyObject = {}) {
  let ty = "\n";
  let byProducts = {...initialByProducts};
  for (let key in obj) {
    const value = obj[key];
    const typeClass = Object.prototype.toString
      .call(value)
      .replace(/\W|object/g, "");

    if (typeClass === typeOfObject) {
      const tsType = getInterface(value as AnyObject, key);
      ty = ty.concat(createTypeNode(key, tsType.interfaceName));
      byProducts[tsType.interfaceName] = tsType.type;
      Object.keys(tsType.byProducts).forEach(prodKey => {
        byProducts[prodKey] = tsType.byProducts[prodKey];
      });
    } else {
      // @ts-ignore
      ty = ty.concat(createTypeNode(key, JsToTsMap[typeClass]));
    }
  }

  const interfaceName = toCapitalCase(name || 'I');
  const type = `interface ${interfaceName} {${ty}}`;

  return {
    type,
    interfaceName,
    byProducts
  }
}
