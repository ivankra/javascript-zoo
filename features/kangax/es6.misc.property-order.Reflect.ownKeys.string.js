// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-ordinary-object-internal-methods-and-internal-slots-ownpropertykeys
// compat-table: ES6 > misc > own property order (tiny) > Reflect.ownKeys, string key order
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var obj = {
    2: true,
    0: true,
    1: true,
    ' ': true,
    9: true,
    D: true,
    B: true,
    '-1': true
  };
  obj.A = true;
  obj[3] = true;
  "EFGHIJKLMNOPQRSTUVWXYZ".split('').forEach(function(key){
    obj[key] = true;
  });
  Object.defineProperty(obj, 'C', { value: true, enumerable: true });
  Object.defineProperty(obj, '4', { value: true, enumerable: true });
  delete obj[2];
  obj[2] = true;

  return Reflect.ownKeys(obj).join('') === "012349 DB-1AEFGHIJKLMNOPQRSTUVWXYZC";
}

try {
  if (testCode()) {
    console.log("es6.misc.property-order.Reflect.ownKeys.string.js: OK");
  } else {
    console.log("es6.misc.property-order.Reflect.ownKeys.string.js: FAIL");
  }
} catch (e) {
  console.log("es6.misc.property-order.Reflect.ownKeys.string.js: FAIL: " + e);
}