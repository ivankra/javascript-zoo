// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-typedarray-objects
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Int16Array
// compat-table: ES6 > built-ins > typed arrays (large) > Int16Array
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var buffer = new ArrayBuffer(64);
  var view = new Int16Array(buffer);        view[0] = 0x8000;
  return view[0] === -0x8000;
}

try {
  if (testCode()) {
    console.log("es6.typed-arrays.Int16Array.js: OK");
  } else {
    console.log("es6.typed-arrays.Int16Array.js: FAIL");
  }
} catch (e) {
  console.log("es6.typed-arrays.Int16Array.js: FAIL: " + e);
}