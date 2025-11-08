// compat-table: ES6 > built-ins > Reflect (small) > Reflect.has
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/has
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-reflection
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return Reflect.has({ qux: 987 }, "qux");
}

try {
  if (testCode()) {
    console.log("kangax-es6/Reflect.has.js: OK");
  } else {
    console.log("kangax-es6/Reflect.has.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/Reflect.has.js: exception: " + e);
}
