// compat-table: ES6 > built-ins > typed arrays (large) > %TypedArray%.prototype.join
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/join
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-typedarray-objects
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Int8Array.prototype.join === "function" &&
      typeof Uint8Array.prototype.join === "function" &&
      typeof Uint8ClampedArray.prototype.join === "function" &&
      typeof Int16Array.prototype.join === "function" &&
      typeof Uint16Array.prototype.join === "function" &&
      typeof Int32Array.prototype.join === "function" &&
      typeof Uint32Array.prototype.join === "function" &&
      typeof Float32Array.prototype.join === "function" &&
      typeof Float64Array.prototype.join === "function";
}

try {
  if (testCode()) {
    console.log("kangax-es6/typed-arrays.prototype.join.js: OK");
  } else {
    console.log("kangax-es6/typed-arrays.prototype.join.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/typed-arrays.prototype.join.js: exception: " + e);
}
