import { JsToTsMap, typeOfObject, typeofArray } from './constants';
import { toCapitalCase } from './utils';

function createTypeNode(key: string, type: any) {
  return `\t${key}: ${type};\n`;
}

interface AnyObject {
  [key: string]: unknown;
}

function handleArrays(arr: any[]) {
  const allTypesInArray = new Set();
  arr.forEach((item) => {
    allTypesInArray.add(typeof item);
  });
  const arrayOfTypes = Array.from(allTypesInArray);

  let typeDef = 'any[]';
  if (arrayOfTypes.length === 1) {
    typeDef = `${Array.from(allTypesInArray)}[]`;
  }
  if (arrayOfTypes.length > 1) {
    typeDef = `( ${Array.from(allTypesInArray).join(' | ')} )[]`;
  }
  return typeDef;
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
      byProducts[tsType.interfaceName] = tsType.type;
      Object.keys(tsType.byProducts).forEach(prodKey => {
        byProducts[prodKey] = tsType.byProducts[prodKey];
      });
      ty = ty.concat(createTypeNode(key, tsType.interfaceName));
    } else if (typeClass === typeofArray) {
      const typeDef = handleArrays(value as any[]);
      ty = ty.concat(createTypeNode(key, typeDef));
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
