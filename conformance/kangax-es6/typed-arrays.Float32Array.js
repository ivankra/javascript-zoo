// compat-table: ES6 > built-ins > typed arrays (large) > Float32Array
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float32Array
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-typedarray-objects
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var buffer = new ArrayBuffer(64);
  var view = new Float32Array(buffer);       view[0] = 0.1;
  return view[0] === 0.10000000149011612;
}

try {
  if (testCode()) {
    console.log("kangax-es6/typed-arrays.Float32Array.js: OK");
  } else {
    console.log("kangax-es6/typed-arrays.Float32Array.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/typed-arrays.Float32Array.js: exception: " + e);
}
