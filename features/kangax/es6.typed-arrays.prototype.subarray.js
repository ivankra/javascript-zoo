// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-typedarray-objects
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/subarray
// compat-table: ES6 > built-ins > typed arrays (large) > %TypedArray%.prototype.subarray
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Int8Array.prototype.subarray === "function" &&
      typeof Uint8Array.prototype.subarray === "function" &&
      typeof Uint8ClampedArray.prototype.subarray === "function" &&
      typeof Int16Array.prototype.subarray === "function" &&
      typeof Uint16Array.prototype.subarray === "function" &&
      typeof Int32Array.prototype.subarray === "function" &&
      typeof Uint32Array.prototype.subarray === "function" &&
      typeof Float32Array.prototype.subarray === "function" &&
      typeof Float64Array.prototype.subarray === "function";
}

try {
  if (testCode()) {
    console.log("es6.typed-arrays.prototype.subarray.js: OK");
  } else {
    console.log("es6.typed-arrays.prototype.subarray.js: FAIL");
  }
} catch (e) {
  console.log("es6.typed-arrays.prototype.subarray.js: FAIL: " + e);
}