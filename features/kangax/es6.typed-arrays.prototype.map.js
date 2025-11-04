// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-typedarray-objects
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/map
// compat-table: ES6 > built-ins > typed arrays (large) > %TypedArray%.prototype.map
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Int8Array.prototype.map === "function" &&
      typeof Uint8Array.prototype.map === "function" &&
      typeof Uint8ClampedArray.prototype.map === "function" &&
      typeof Int16Array.prototype.map === "function" &&
      typeof Uint16Array.prototype.map === "function" &&
      typeof Int32Array.prototype.map === "function" &&
      typeof Uint32Array.prototype.map === "function" &&
      typeof Float32Array.prototype.map === "function" &&
      typeof Float64Array.prototype.map === "function";
}

try {
  if (testCode()) {
    console.log("es6.typed-arrays.prototype.map.js: OK");
  } else {
    console.log("es6.typed-arrays.prototype.map.js: FAIL");
  }
} catch (e) {
  console.log("es6.typed-arrays.prototype.map.js: FAIL: " + e);
}