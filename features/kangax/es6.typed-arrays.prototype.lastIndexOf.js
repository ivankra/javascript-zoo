// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-typedarray-objects
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/lastIndexOf
// compat-table: ES6 > built-ins > typed arrays (large) > %TypedArray%.prototype.lastIndexOf
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Int8Array.prototype.lastIndexOf === "function" &&
      typeof Uint8Array.prototype.lastIndexOf === "function" &&
      typeof Uint8ClampedArray.prototype.lastIndexOf === "function" &&
      typeof Int16Array.prototype.lastIndexOf === "function" &&
      typeof Uint16Array.prototype.lastIndexOf === "function" &&
      typeof Int32Array.prototype.lastIndexOf === "function" &&
      typeof Uint32Array.prototype.lastIndexOf === "function" &&
      typeof Float32Array.prototype.lastIndexOf === "function" &&
      typeof Float64Array.prototype.lastIndexOf === "function";
}

try {
  if (testCode()) {
    console.log("es6.typed-arrays.prototype.lastIndexOf.js: OK");
  } else {
    console.log("es6.typed-arrays.prototype.lastIndexOf.js: FAIL");
  }
} catch (e) {
  console.log("es6.typed-arrays.prototype.lastIndexOf.js: FAIL: " + e);
}