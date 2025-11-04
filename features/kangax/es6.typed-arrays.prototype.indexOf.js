// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-typedarray-objects
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/indexOf
// compat-table: ES6 > built-ins > typed arrays (large) > %TypedArray%.prototype.indexOf
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Int8Array.prototype.indexOf === "function" &&
      typeof Uint8Array.prototype.indexOf === "function" &&
      typeof Uint8ClampedArray.prototype.indexOf === "function" &&
      typeof Int16Array.prototype.indexOf === "function" &&
      typeof Uint16Array.prototype.indexOf === "function" &&
      typeof Int32Array.prototype.indexOf === "function" &&
      typeof Uint32Array.prototype.indexOf === "function" &&
      typeof Float32Array.prototype.indexOf === "function" &&
      typeof Float64Array.prototype.indexOf === "function";
}

try {
  if (testCode()) {
    console.log("es6.typed-arrays.prototype.indexOf.js: OK");
  } else {
    console.log("es6.typed-arrays.prototype.indexOf.js: FAIL");
  }
} catch (e) {
  console.log("es6.typed-arrays.prototype.indexOf.js: FAIL: " + e);
}