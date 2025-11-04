// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-typedarray-objects
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/reduceRight
// compat-table: ES6 > built-ins > typed arrays (large) > %TypedArray%.prototype.reduceRight
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Int8Array.prototype.reduceRight === "function" &&
      typeof Uint8Array.prototype.reduceRight === "function" &&
      typeof Uint8ClampedArray.prototype.reduceRight === "function" &&
      typeof Int16Array.prototype.reduceRight === "function" &&
      typeof Uint16Array.prototype.reduceRight === "function" &&
      typeof Int32Array.prototype.reduceRight === "function" &&
      typeof Uint32Array.prototype.reduceRight === "function" &&
      typeof Float32Array.prototype.reduceRight === "function" &&
      typeof Float64Array.prototype.reduceRight === "function";
}

try {
  if (testCode()) {
    console.log("es6.typed-arrays.prototype.reduceRight.js: OK");
  } else {
    console.log("es6.typed-arrays.prototype.reduceRight.js: FAIL");
  }
} catch (e) {
  console.log("es6.typed-arrays.prototype.reduceRight.js: FAIL: " + e);
}