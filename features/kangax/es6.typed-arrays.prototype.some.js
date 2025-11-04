// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-typedarray-objects
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/some
// compat-table: ES6 > built-ins > typed arrays (large) > %TypedArray%.prototype.some
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Int8Array.prototype.some === "function" &&
      typeof Uint8Array.prototype.some === "function" &&
      typeof Uint8ClampedArray.prototype.some === "function" &&
      typeof Int16Array.prototype.some === "function" &&
      typeof Uint16Array.prototype.some === "function" &&
      typeof Int32Array.prototype.some === "function" &&
      typeof Uint32Array.prototype.some === "function" &&
      typeof Float32Array.prototype.some === "function" &&
      typeof Float64Array.prototype.some === "function";
}

try {
  if (testCode()) {
    console.log("es6.typed-arrays.prototype.some.js: OK");
  } else {
    console.log("es6.typed-arrays.prototype.some.js: FAIL");
  }
} catch (e) {
  console.log("es6.typed-arrays.prototype.some.js: FAIL: " + e);
}