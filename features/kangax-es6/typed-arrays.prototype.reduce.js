// compat-table: ES6 > built-ins > typed arrays (large) > %TypedArray%.prototype.reduce
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/reduce
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-typedarray-objects
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Int8Array.prototype.reduce === "function" &&
      typeof Uint8Array.prototype.reduce === "function" &&
      typeof Uint8ClampedArray.prototype.reduce === "function" &&
      typeof Int16Array.prototype.reduce === "function" &&
      typeof Uint16Array.prototype.reduce === "function" &&
      typeof Int32Array.prototype.reduce === "function" &&
      typeof Uint32Array.prototype.reduce === "function" &&
      typeof Float32Array.prototype.reduce === "function" &&
      typeof Float64Array.prototype.reduce === "function";
}

try {
  if (testCode()) {
    console.log("kangax-es6/typed-arrays.prototype.reduce.js: OK");
  } else {
    console.log("kangax-es6/typed-arrays.prototype.reduce.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/typed-arrays.prototype.reduce.js: exception: " + e);
}
