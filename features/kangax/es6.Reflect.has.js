// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-reflection
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/has
// compat-table: ES6 > built-ins > Reflect (small) > Reflect.has
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return Reflect.has({ qux: 987 }, "qux");
}

try {
  if (testCode()) {
    console.log("es6.Reflect.has.js: OK");
  } else {
    console.log("es6.Reflect.has.js: FAIL");
  }
} catch (e) {
  console.log("es6.Reflect.has.js: FAIL: " + e);
}