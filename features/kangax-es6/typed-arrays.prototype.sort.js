// compat-table: ES6 > built-ins > typed arrays (large) > %TypedArray%.prototype.sort
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/sort
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-typedarray-objects
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Int8Array.prototype.sort === "function" &&
      typeof Uint8Array.prototype.sort === "function" &&
      typeof Uint8ClampedArray.prototype.sort === "function" &&
      typeof Int16Array.prototype.sort === "function" &&
      typeof Uint16Array.prototype.sort === "function" &&
      typeof Int32Array.prototype.sort === "function" &&
      typeof Uint32Array.prototype.sort === "function" &&
      typeof Float32Array.prototype.sort === "function" &&
      typeof Float64Array.prototype.sort === "function";
}

try {
  if (testCode()) {
    console.log("kangax-es6/typed-arrays.prototype.sort.js: OK");
  } else {
    console.log("kangax-es6/typed-arrays.prototype.sort.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/typed-arrays.prototype.sort.js: exception: " + e);
}
