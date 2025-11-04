// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-typedarray-objects
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/fill
// compat-table: ES6 > built-ins > typed arrays (large) > %TypedArray%.prototype.fill
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Int8Array.prototype.fill === "function" &&
      typeof Uint8Array.prototype.fill === "function" &&
      typeof Uint8ClampedArray.prototype.fill === "function" &&
      typeof Int16Array.prototype.fill === "function" &&
      typeof Uint16Array.prototype.fill === "function" &&
      typeof Int32Array.prototype.fill === "function" &&
      typeof Uint32Array.prototype.fill === "function" &&
      typeof Float32Array.prototype.fill === "function" &&
      typeof Float64Array.prototype.fill === "function";
}

try {
  if (testCode()) {
    console.log("es6.typed-arrays.prototype.fill.js: OK");
  } else {
    console.log("es6.typed-arrays.prototype.fill.js: FAIL");
  }
} catch (e) {
  console.log("es6.typed-arrays.prototype.fill.js: FAIL: " + e);
}