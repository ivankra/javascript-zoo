// compat-table: ES6 > built-ins > typed arrays (large) > %TypedArray%.prototype.values
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/values
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-typedarray-objects
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Int8Array.prototype.values === "function" &&
      typeof Uint8Array.prototype.values === "function" &&
      typeof Uint8ClampedArray.prototype.values === "function" &&
      typeof Int16Array.prototype.values === "function" &&
      typeof Uint16Array.prototype.values === "function" &&
      typeof Int32Array.prototype.values === "function" &&
      typeof Uint32Array.prototype.values === "function" &&
      typeof Float32Array.prototype.values === "function" &&
      typeof Float64Array.prototype.values === "function";
}

try {
  if (testCode()) {
    console.log("kangax-es6/typed-arrays.prototype.values.js: OK");
  } else {
    console.log("kangax-es6/typed-arrays.prototype.values.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/typed-arrays.prototype.values.js: exception: " + e);
}
