// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-typedarray-objects
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8ClampedArray
// compat-table: ES6 > built-ins > typed arrays (large) > Uint8ClampedArray
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var buffer = new ArrayBuffer(64);
  var view = new Uint8ClampedArray(buffer); view[0] = 0x100;
  return view[0] === 0xFF;
}

try {
  if (testCode()) {
    console.log("es6.typed-arrays.Uint8ClampedArray.js: OK");
  } else {
    console.log("es6.typed-arrays.Uint8ClampedArray.js: FAIL");
  }
} catch (e) {
  console.log("es6.typed-arrays.Uint8ClampedArray.js: FAIL: " + e);
}