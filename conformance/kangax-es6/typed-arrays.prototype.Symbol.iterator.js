// compat-table: ES6 > built-ins > typed arrays (large) > %TypedArray%.prototype[Symbol.iterator]
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/@@iterator
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-typedarray-objects
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Int8Array.prototype[Symbol.iterator] === "function" &&
      typeof Uint8Array.prototype[Symbol.iterator] === "function" &&
      typeof Uint8ClampedArray.prototype[Symbol.iterator] === "function" &&
      typeof Int16Array.prototype[Symbol.iterator] === "function" &&
      typeof Uint16Array.prototype[Symbol.iterator] === "function" &&
      typeof Int32Array.prototype[Symbol.iterator] === "function" &&
      typeof Uint32Array.prototype[Symbol.iterator] === "function" &&
      typeof Float32Array.prototype[Symbol.iterator] === "function" &&
      typeof Float64Array.prototype[Symbol.iterator] === "function";
}

try {
  if (testCode()) {
    console.log("kangax-es6/typed-arrays.prototype.Symbol.iterator.js: OK");
  } else {
    console.log("kangax-es6/typed-arrays.prototype.Symbol.iterator.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/typed-arrays.prototype.Symbol.iterator.js: exception: " + e);
}
