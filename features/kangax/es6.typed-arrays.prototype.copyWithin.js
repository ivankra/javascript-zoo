// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-typedarray-objects
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/copyWithin
// compat-table: ES6 > built-ins > typed arrays (large) > %TypedArray%.prototype.copyWithin
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Int8Array.prototype.copyWithin === "function" &&
      typeof Uint8Array.prototype.copyWithin === "function" &&
      typeof Uint8ClampedArray.prototype.copyWithin === "function" &&
      typeof Int16Array.prototype.copyWithin === "function" &&
      typeof Uint16Array.prototype.copyWithin === "function" &&
      typeof Int32Array.prototype.copyWithin === "function" &&
      typeof Uint32Array.prototype.copyWithin === "function" &&
      typeof Float32Array.prototype.copyWithin === "function" &&
      typeof Float64Array.prototype.copyWithin === "function";
}

try {
  if (testCode()) {
    console.log("es6.typed-arrays.prototype.copyWithin.js: OK");
  } else {
    console.log("es6.typed-arrays.prototype.copyWithin.js: FAIL");
  }
} catch (e) {
  console.log("es6.typed-arrays.prototype.copyWithin.js: FAIL: " + e);
}