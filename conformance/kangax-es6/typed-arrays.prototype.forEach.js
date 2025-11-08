// compat-table: ES6 > built-ins > typed arrays (large) > %TypedArray%.prototype.forEach
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/forEach
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-typedarray-objects
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Int8Array.prototype.forEach === "function" &&
      typeof Uint8Array.prototype.forEach === "function" &&
      typeof Uint8ClampedArray.prototype.forEach === "function" &&
      typeof Int16Array.prototype.forEach === "function" &&
      typeof Uint16Array.prototype.forEach === "function" &&
      typeof Int32Array.prototype.forEach === "function" &&
      typeof Uint32Array.prototype.forEach === "function" &&
      typeof Float32Array.prototype.forEach === "function" &&
      typeof Float64Array.prototype.forEach === "function";
}

try {
  if (testCode()) {
    console.log("kangax-es6/typed-arrays.prototype.forEach.js: OK");
  } else {
    console.log("kangax-es6/typed-arrays.prototype.forEach.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/typed-arrays.prototype.forEach.js: exception: " + e);
}
