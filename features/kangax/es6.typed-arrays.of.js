// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-typedarray-objects
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/of
// compat-table: ES6 > built-ins > typed arrays (large) > %TypedArray%.of
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Int8Array.of === "function" &&
      typeof Uint8Array.of === "function" &&
      typeof Uint8ClampedArray.of === "function" &&
      typeof Int16Array.of === "function" &&
      typeof Uint16Array.of === "function" &&
      typeof Int32Array.of === "function" &&
      typeof Uint32Array.of === "function" &&
      typeof Float32Array.of === "function" &&
      typeof Float64Array.of === "function";
}

try {
  if (testCode()) {
    console.log("es6.typed-arrays.of.js: OK");
  } else {
    console.log("es6.typed-arrays.of.js: FAIL");
  }
} catch (e) {
  console.log("es6.typed-arrays.of.js: FAIL: " + e);
}