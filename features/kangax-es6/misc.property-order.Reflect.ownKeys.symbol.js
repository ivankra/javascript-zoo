// compat-table: ES6 > misc > own property order (tiny) > Reflect.ownKeys, symbol key order
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-ordinary-object-internal-methods-and-internal-slots-ownpropertykeys
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var sym1 = Symbol(), sym2 = Symbol(), sym3 = Symbol();
  var obj = {
    1: true,
    A: true
  };
  obj.B = true;
  obj[sym1] = true;
  obj[2] = true;
  obj[sym2] = true;
  Object.defineProperty(obj, 'C', { value: true, enumerable: true });
  Object.defineProperty(obj, sym3,{ value: true, enumerable: true });
  Object.defineProperty(obj, 'D', { value: true, enumerable: true });

  var result = Reflect.ownKeys(obj);
  var l = result.length;
  return result[l-3] === sym1 && result[l-2] === sym2 && result[l-1] === sym3;
}

try {
  if (testCode()) {
    console.log("kangax-es6/misc.property-order.Reflect.ownKeys.symbol.js: OK");
  } else {
    console.log("kangax-es6/misc.property-order.Reflect.ownKeys.symbol.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/misc.property-order.Reflect.ownKeys.symbol.js: exception: " + e);
}
