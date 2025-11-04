// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-reflection
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/get
// compat-table: ES6 > built-ins > Reflect (small) > Reflect.get
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return Reflect.get({ qux: 987 }, "qux") === 987;
}

try {
  if (testCode()) {
    console.log("es6.Reflect.get.js: OK");
  } else {
    console.log("es6.Reflect.get.js: FAIL");
  }
} catch (e) {
  console.log("es6.Reflect.get.js: FAIL: " + e);
}