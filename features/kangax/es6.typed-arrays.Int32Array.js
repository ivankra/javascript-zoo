// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-typedarray-objects
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Int32Array
// compat-table: ES6 > built-ins > typed arrays (large) > Int32Array
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var buffer = new ArrayBuffer(64);
  var view = new Int32Array(buffer);        view[0] = 0x80000000;
  return view[0] === -0x80000000;
}

try {
  if (testCode()) {
    console.log("es6.typed-arrays.Int32Array.js: OK");
  } else {
    console.log("es6.typed-arrays.Int32Array.js: FAIL");
  }
} catch (e) {
  console.log("es6.typed-arrays.Int32Array.js: FAIL: " + e);
}