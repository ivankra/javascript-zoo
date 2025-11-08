// compat-table: ES6 > built-ins > typed arrays (large) > %TypedArray%.prototype.every
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/every
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-typedarray-objects
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Int8Array.prototype.every === "function" &&
      typeof Uint8Array.prototype.every === "function" &&
      typeof Uint8ClampedArray.prototype.every === "function" &&
      typeof Int16Array.prototype.every === "function" &&
      typeof Uint16Array.prototype.every === "function" &&
      typeof Int32Array.prototype.every === "function" &&
      typeof Uint32Array.prototype.every === "function" &&
      typeof Float32Array.prototype.every === "function" &&
      typeof Float64Array.prototype.every === "function";
}

try {
  if (testCode()) {
    console.log("kangax-es6/typed-arrays.prototype.every.js: OK");
  } else {
    console.log("kangax-es6/typed-arrays.prototype.every.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/typed-arrays.prototype.every.js: exception: " + e);
}
