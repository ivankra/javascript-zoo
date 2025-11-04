// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-typedarray-objects
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/find
// compat-table: ES6 > built-ins > typed arrays (large) > %TypedArray%.prototype.find
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Int8Array.prototype.find === "function" &&
      typeof Uint8Array.prototype.find === "function" &&
      typeof Uint8ClampedArray.prototype.find === "function" &&
      typeof Int16Array.prototype.find === "function" &&
      typeof Uint16Array.prototype.find === "function" &&
      typeof Int32Array.prototype.find === "function" &&
      typeof Uint32Array.prototype.find === "function" &&
      typeof Float32Array.prototype.find === "function" &&
      typeof Float64Array.prototype.find === "function";
}

try {
  if (testCode()) {
    console.log("es6.typed-arrays.prototype.find.js: OK");
  } else {
    console.log("es6.typed-arrays.prototype.find.js: FAIL");
  }
} catch (e) {
  console.log("es6.typed-arrays.prototype.find.js: FAIL: " + e);
}