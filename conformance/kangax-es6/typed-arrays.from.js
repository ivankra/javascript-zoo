// compat-table: ES6 > built-ins > typed arrays (large) > %TypedArray%.from
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/from
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-typedarray-objects
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Int8Array.from === "function" &&
      typeof Uint8Array.from === "function" &&
      typeof Uint8ClampedArray.from === "function" &&
      typeof Int16Array.from === "function" &&
      typeof Uint16Array.from === "function" &&
      typeof Int32Array.from === "function" &&
      typeof Uint32Array.from === "function" &&
      typeof Float32Array.from === "function" &&
      typeof Float64Array.from === "function";
}

try {
  if (testCode()) {
    console.log("kangax-es6/typed-arrays.from.js: OK");
  } else {
    console.log("kangax-es6/typed-arrays.from.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/typed-arrays.from.js: exception: " + e);
}
