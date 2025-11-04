// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-typedarray-objects
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/slice
// compat-table: ES6 > built-ins > typed arrays (large) > %TypedArray%.prototype.slice
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Int8Array.prototype.slice === "function" &&
      typeof Uint8Array.prototype.slice === "function" &&
      typeof Uint8ClampedArray.prototype.slice === "function" &&
      typeof Int16Array.prototype.slice === "function" &&
      typeof Uint16Array.prototype.slice === "function" &&
      typeof Int32Array.prototype.slice === "function" &&
      typeof Uint32Array.prototype.slice === "function" &&
      typeof Float32Array.prototype.slice === "function" &&
      typeof Float64Array.prototype.slice === "function";
}

try {
  if (testCode()) {
    console.log("es6.typed-arrays.prototype.slice.js: OK");
  } else {
    console.log("es6.typed-arrays.prototype.slice.js: FAIL");
  }
} catch (e) {
  console.log("es6.typed-arrays.prototype.slice.js: FAIL: " + e);
}