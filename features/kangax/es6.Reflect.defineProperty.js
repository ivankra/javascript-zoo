// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-reflection
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/defineProperty
// compat-table: ES6 > built-ins > Reflect (small) > Reflect.defineProperty
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var obj = {};
  Reflect.defineProperty(obj, "foo", { value: 123 });
  return obj.foo === 123 &&
    Reflect.defineProperty(Object.freeze({}), "foo", { value: 123 }) === false;
}

try {
  if (testCode()) {
    console.log("es6.Reflect.defineProperty.js: OK");
  } else {
    console.log("es6.Reflect.defineProperty.js: FAIL");
  }
} catch (e) {
  console.log("es6.Reflect.defineProperty.js: FAIL: " + e);
}