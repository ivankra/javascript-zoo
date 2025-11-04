// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-reflection
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/preventExtensions
// compat-table: ES6 > built-ins > Reflect (small) > Reflect.preventExtensions
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var obj = {};
  Reflect.preventExtensions(obj);
  return !Object.isExtensible(obj);
}

try {
  if (testCode()) {
    console.log("es6.Reflect.preventExtensions.js: OK");
  } else {
    console.log("es6.Reflect.preventExtensions.js: FAIL");
  }
} catch (e) {
  console.log("es6.Reflect.preventExtensions.js: FAIL: " + e);
}