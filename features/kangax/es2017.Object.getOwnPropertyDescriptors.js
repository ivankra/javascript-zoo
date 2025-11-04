// ES6: https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptors
// compat-table: ES2016+ > 2017 features > Object static methods (medium) > Object.getOwnPropertyDescriptors
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var object = {a: 1};
  var B = typeof Symbol === 'function' ? Symbol('b') : 'b';
  object[B] = 2;
  var O = Object.defineProperty(object, 'c', {value: 3});
  var D = Object.getOwnPropertyDescriptors(O);

  return D.a.value === 1 && D.a.enumerable === true && D.a.configurable === true && D.a.writable === true
    && D[B].value === 2 && D[B].enumerable === true && D[B].configurable === true && D[B].writable === true
    && D.c.value === 3 && D.c.enumerable === false && D.c.configurable === false && D.c.writable === false;
}

try {
  if (testCode()) {
    console.log("es2017.Object.getOwnPropertyDescriptors.js: OK");
  } else {
    console.log("es2017.Object.getOwnPropertyDescriptors.js: FAIL");
  }
} catch (e) {
  console.log("es2017.Object.getOwnPropertyDescriptors.js: FAIL: " + e);
}