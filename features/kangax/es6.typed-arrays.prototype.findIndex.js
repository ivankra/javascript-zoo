// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-typedarray-objects
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/findIndex
// compat-table: ES6 > built-ins > typed arrays (large) > %TypedArray%.prototype.findIndex
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Int8Array.prototype.findIndex === "function" &&
      typeof Uint8Array.prototype.findIndex === "function" &&
      typeof Uint8ClampedArray.prototype.findIndex === "function" &&
      typeof Int16Array.prototype.findIndex === "function" &&
      typeof Uint16Array.prototype.findIndex === "function" &&
      typeof Int32Array.prototype.findIndex === "function" &&
      typeof Uint32Array.prototype.findIndex === "function" &&
      typeof Float32Array.prototype.findIndex === "function" &&
      typeof Float64Array.prototype.findIndex === "function";
}

try {
  if (testCode()) {
    console.log("es6.typed-arrays.prototype.findIndex.js: OK");
  } else {
    console.log("es6.typed-arrays.prototype.findIndex.js: FAIL");
  }
} catch (e) {
  console.log("es6.typed-arrays.prototype.findIndex.js: FAIL: " + e);
}