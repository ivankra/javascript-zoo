// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-typedarray-objects
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/reverse
// compat-table: ES6 > built-ins > typed arrays (large) > %TypedArray%.prototype.reverse
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Int8Array.prototype.reverse === "function" &&
      typeof Uint8Array.prototype.reverse === "function" &&
      typeof Uint8ClampedArray.prototype.reverse === "function" &&
      typeof Int16Array.prototype.reverse === "function" &&
      typeof Uint16Array.prototype.reverse === "function" &&
      typeof Int32Array.prototype.reverse === "function" &&
      typeof Uint32Array.prototype.reverse === "function" &&
      typeof Float32Array.prototype.reverse === "function" &&
      typeof Float64Array.prototype.reverse === "function";
}

try {
  if (testCode()) {
    console.log("es6.typed-arrays.prototype.reverse.js: OK");
  } else {
    console.log("es6.typed-arrays.prototype.reverse.js: FAIL");
  }
} catch (e) {
  console.log("es6.typed-arrays.prototype.reverse.js: FAIL: " + e);
}