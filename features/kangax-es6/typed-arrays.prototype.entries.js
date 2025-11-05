// compat-table: ES6 > built-ins > typed arrays (large) > %TypedArray%.prototype.entries
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/entries
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-typedarray-objects
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Int8Array.prototype.entries === "function" &&
      typeof Uint8Array.prototype.entries === "function" &&
      typeof Uint8ClampedArray.prototype.entries === "function" &&
      typeof Int16Array.prototype.entries === "function" &&
      typeof Uint16Array.prototype.entries === "function" &&
      typeof Int32Array.prototype.entries === "function" &&
      typeof Uint32Array.prototype.entries === "function" &&
      typeof Float32Array.prototype.entries === "function" &&
      typeof Float64Array.prototype.entries === "function";
}

try {
  if (testCode()) {
    console.log("kangax-es6/typed-arrays.prototype.entries.js: OK");
  } else {
    console.log("kangax-es6/typed-arrays.prototype.entries.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/typed-arrays.prototype.entries.js: exception: " + e);
}
