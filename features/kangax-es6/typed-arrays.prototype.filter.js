// compat-table: ES6 > built-ins > typed arrays (large) > %TypedArray%.prototype.filter
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/filter
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-typedarray-objects
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Int8Array.prototype.filter === "function" &&
      typeof Uint8Array.prototype.filter === "function" &&
      typeof Uint8ClampedArray.prototype.filter === "function" &&
      typeof Int16Array.prototype.filter === "function" &&
      typeof Uint16Array.prototype.filter === "function" &&
      typeof Int32Array.prototype.filter === "function" &&
      typeof Uint32Array.prototype.filter === "function" &&
      typeof Float32Array.prototype.filter === "function" &&
      typeof Float64Array.prototype.filter === "function";
}

try {
  if (testCode()) {
    console.log("kangax-es6/typed-arrays.prototype.filter.js: OK");
  } else {
    console.log("kangax-es6/typed-arrays.prototype.filter.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/typed-arrays.prototype.filter.js: exception: " + e);
}
