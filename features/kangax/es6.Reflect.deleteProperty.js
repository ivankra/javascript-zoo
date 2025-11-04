// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-reflection
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/deleteProperty
// compat-table: ES6 > built-ins > Reflect (small) > Reflect.deleteProperty
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var obj = { bar: 456 };
  Reflect.deleteProperty(obj, "bar");
  return !("bar" in obj);
}

try {
  if (testCode()) {
    console.log("es6.Reflect.deleteProperty.js: OK");
  } else {
    console.log("es6.Reflect.deleteProperty.js: FAIL");
  }
} catch (e) {
  console.log("es6.Reflect.deleteProperty.js: FAIL: " + e);
}