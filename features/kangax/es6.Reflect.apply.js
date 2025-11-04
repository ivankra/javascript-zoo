// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-reflection
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/apply
// compat-table: ES6 > built-ins > Reflect (small) > Reflect.apply
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return Reflect.apply(Array.prototype.push, [1,2], [3,4,5]) === 5;
}

try {
  if (testCode()) {
    console.log("es6.Reflect.apply.js: OK");
  } else {
    console.log("es6.Reflect.apply.js: FAIL");
  }
} catch (e) {
  console.log("es6.Reflect.apply.js: FAIL: " + e);
}