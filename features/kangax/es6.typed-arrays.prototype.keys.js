// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-typedarray-objects
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/keys
// compat-table: ES6 > built-ins > typed arrays (large) > %TypedArray%.prototype.keys
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Int8Array.prototype.keys === "function" &&
      typeof Uint8Array.prototype.keys === "function" &&
      typeof Uint8ClampedArray.prototype.keys === "function" &&
      typeof Int16Array.prototype.keys === "function" &&
      typeof Uint16Array.prototype.keys === "function" &&
      typeof Int32Array.prototype.keys === "function" &&
      typeof Uint32Array.prototype.keys === "function" &&
      typeof Float32Array.prototype.keys === "function" &&
      typeof Float64Array.prototype.keys === "function";
}

try {
  if (testCode()) {
    console.log("es6.typed-arrays.prototype.keys.js: OK");
  } else {
    console.log("es6.typed-arrays.prototype.keys.js: FAIL");
  }
} catch (e) {
  console.log("es6.typed-arrays.prototype.keys.js: FAIL: " + e);
}